import { Exception } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Ingredient from 'App/Models/Ingredient'
import IngredientIngredient from 'App/Models/IngredientIngredient'
import IngredientRecipe from 'App/Models/IngredientRecipe'
import Unit from 'App/Models/Unit'
import IngredientStoreValidator from 'App/Validators/IngredientStoreValidator'
import IngredientUpdateValidator from 'App/Validators/IngredientUpdateValidator'

export default class IngredientsController {
  public async index({ request }: HttpContextContract) {
    const query = request.input('query') || ''
    const page = request.input('page') || 1
    const perPage = request.input('perPage') || 20

    let match = Ingredient.query()
      .preload('ranges', query => query.preload('unit'))
      .orderBy('name')

    if (query) {
      match = match.where('name', 'like', `%${query}%`)
    }

    return await match.paginate(page, perPage)
  }

  public async store({ request }: HttpContextContract) {
    const abvRange = await Unit.findByOrFail('name', 'ABV')
    const sugarRange = await Unit.findByOrFail('name', 'Sugar')
    const acidRange = await Unit.findByOrFail('name', 'Acid')

    const data = await request.validate(IngredientStoreValidator)
    const ingredients = data.ingredients || []
    const recipe = data.recipe || []

    const units: Record<string, Unit> = {}

    for (const ingredientData of ingredients) {
      if (!(await Ingredient.find(ingredientData.id))) {
        throw new Exception(
          `Ingredient with ID ${ingredientData.id} not found.`,
          422,
        )
      }

      const unit =
        units[ingredientData.unit] ||
        (await Unit.findBy('unit', ingredientData.unit))

      if (!unit) {
        throw new Exception(
          `Unit with ID ${ingredientData.unit} not found.`,
          422,
        )
      }

      units[unit.unit] = unit
    }

    const ingredient = await Ingredient.create({ name: data.name })

    await ingredient.related('ranges').createMany([
      {
        unitId: abvRange.id,
        amount: data.abv,
      },
      {
        unitId: sugarRange.id,
        amount: data.sugar,
      },
      {
        unitId: acidRange.id,
        amount: data.acid,
      },
    ])

    if (ingredients.length) {
      await IngredientIngredient.createMany(
        ingredients.map(({ id, amount, unit }) => ({
          parentId: ingredient.id,
          ingredientId: id,
          amount,
          unitId: units[unit].id,
        })),
      )
    }

    if (recipe.length) {
      await ingredient
        .related('recipe')
        .createMany(recipe.map((step, index) => ({ index, step })))
    }

    return await IngredientsController.getAndFormatIngredient(ingredient.id)
  }

  public async show({ request }: HttpContextContract) {
    const id = request.param('id')
    return await IngredientsController.getIngredient(id)
  }

  public async update({ request }: HttpContextContract) {
    const id = request.param('id')

    const ingredient = await Ingredient.query()
      .preload('ingredients')
      .preload('recipe')
      .where('id', id)
      .firstOrFail()

    const data = await request.validate(IngredientUpdateValidator)

    await Database.transaction(async trx => {
      const newRanges: Array<{ unitId: number; amount: number }> = []

      ingredient.useTransaction(trx)

      if (data.name) {
        ingredient.merge({ name: data.name || ingredient.name })
      }

      if (data.abv) {
        const { id } = await Unit.findByOrFail('name', 'ABV', { client: trx })
        newRanges.push({ unitId: id, amount: data.abv })
      }

      if (data.sugar) {
        const { id } = await Unit.findByOrFail('name', 'Sugar', { client: trx })
        newRanges.push({ unitId: id, amount: data.sugar })
      }

      if (data.acid) {
        const { id } = await Unit.findByOrFail('name', 'Acid', { client: trx })
        newRanges.push({ unitId: id, amount: data.acid })
      }

      if (newRanges.length) {
        await ingredient
          .related('ranges')
          .updateOrCreateMany(newRanges, 'unitId')
      }

      if (data.ingredients) {
        const ingredients = await Ingredient.query({ client: trx }).whereIn(
          'id',
          data.ingredients.map(({ id }) => id),
        )

        if (ingredients.length !== data.ingredients.length) {
          throw new Exception('Invalid ingredients', 400, 'E_ROW_NOT_FOUND')
        }

        const providedUnits = [
          ...new Set(data.ingredients.map(({ unit }) => unit)),
        ]
        const units = await Unit.query({ client: trx }).whereIn(
          'unit',
          providedUnits,
        )

        if (providedUnits.length !== units.length) {
          throw new Exception('Invalid units', 400, 'E_ROW_NOT_FOUND')
        }

        await IngredientIngredient.updateOrCreateMany(
          ['parentId', 'ingredientId'],
          data.ingredients.map(({ id, amount, unit }) => ({
            parentId: ingredient.id,
            ingredientId: id,
            amount,
            unitId: units.find(({ unit: u }) => unit === u)!.id,
          })),
          { client: trx },
        )

        const toDelete = ingredient.ingredients.filter(
          ingredient =>
            !data.ingredients!.find(({ id }) => ingredient.ingredientId === id),
        )

        if (toDelete.length) {
          await IngredientIngredient.query({ client: trx })
            .where('parentId', ingredient.id)
            .whereIn(
              'ingredientId',
              toDelete.map(({ ingredientId }) => ingredientId),
            )
            .delete()
        }
      }

      if (data.recipe) {
        await ingredient.related('recipe').updateOrCreateMany(
          data.recipe.map((step, index) => ({ step, index })),
          ['ingredientId', 'index'],
        )

        if (ingredient.recipe.length !== data.recipe.length) {
          const toDelete = ingredient.recipe.filter(
            ({ index }) => index > data.recipe!.length - 1,
          )

          if (toDelete.length) {
            await IngredientRecipe.query({ client: trx })
              .where('ingredientId', ingredient.id)
              .whereIn(
                'index',
                toDelete.map(({ index }) => index),
              )
              .delete()
          }
        }
      }

      await ingredient.save()
    })

    return await IngredientsController.getAndFormatIngredient(ingredient.id)
  }

  public async destroy({ request }: HttpContextContract) {
    const id = request.param('id')
    const ingredient = await IngredientsController.getIngredient(id)

    await ingredient.delete()

    return IngredientsController.formatIngredient(ingredient)
  }

  static async getIngredient(id: number) {
    return await Ingredient.query()
      .preload('ranges', query => query.preload('unit'))
      .preload('ingredients', query =>
        query
          .preload('ingredient', query =>
            query.preload('ranges', query => query.preload('unit')),
          )
          .preload('unit'),
      )
      .preload('recipe')
      .where('id', id)
      .firstOrFail()
  }

  static async formatIngredient(ingredient: Ingredient) {
    return ingredient.serialize({
      relations: {
        ranges: {
          fields: ['id', 'amount'],
        },
        recipe: {
          fields: ['index', 'step'],
        },
        ingredients: {
          fields: ['amount'],
          relations: {
            ingredient: {
              fields: ['id', 'name'],
              relations: {
                ranges: {
                  fields: ['id', 'amount'],
                },
              },
            },
          },
        },
      },
    })
  }

  static async getAndFormatIngredient(id: number) {
    const ingredient = await IngredientsController.getIngredient(id)
    return await IngredientsController.formatIngredient(ingredient)
  }
}
