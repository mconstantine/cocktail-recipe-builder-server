import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Ingredient from 'App/Models/Ingredient'
import Unit from 'App/Models/Unit'
import IngredientStoreValidator from 'App/Validators/IngredientStoreValidator'
import IngredientUpdateValidator from 'App/Validators/IngredientUpdateValidator'

export default class IngredientsController {
  public async index({ request }: HttpContextContract) {
    const query = request.input('query') || ''
    const page = request.input('page') || 1
    const perPage = request.input('perPage') || 20

    let match = Ingredient.query().select('id', 'name').orderBy('name')

    if (query) {
      match = match.where('name', 'like', `%${query}%`)
    }

    return await match.paginate(page, perPage)
  }

  public async store({ request }: HttpContextContract) {
    const abvRange = await Unit.findByOrFail('name', 'ABV')
    const sugarRange = await Unit.findByOrFail('name', 'Sugar')
    const acidRange = await Unit.findByOrFail('name', 'Acid')

    const { name, abv, sugar, acid } = await request.validate(
      IngredientStoreValidator,
    )

    const ingredient = await Ingredient.create({ name })

    await ingredient.related('ranges').createMany([
      {
        unitId: abvRange.id,
        amount: abv,
      },
      {
        unitId: sugarRange.id,
        amount: sugar,
      },
      {
        unitId: acidRange.id,
        amount: acid,
      },
    ])

    return await IngredientsController.getAndFormatIngredient(ingredient.id)
  }

  public async show({ request }: HttpContextContract) {
    const id = request.param('id')
    return await IngredientsController.getIngredient(id)
  }

  public async update({ request }: HttpContextContract) {
    const id = request.param('id')
    const result = await IngredientsController.getIngredient(id)

    const { name, abv, sugar, acid } = await request.validate(
      IngredientUpdateValidator,
    )

    await Database.transaction(async trx => {
      const newRanges: Array<{ id: number; amount: number }> = []

      result.useTransaction(trx)

      if (name) {
        result.merge({ name: name || result.name })
      }

      if (abv) {
        const { id } = await Unit.findByOrFail('name', 'ABV')
        newRanges.push({ id, amount: abv })
      }

      if (sugar) {
        const { id } = await Unit.findByOrFail('name', 'Sugar')
        newRanges.push({ id, amount: sugar })
      }

      if (acid) {
        const { id } = await Unit.findByOrFail('name', 'Acid')
        newRanges.push({ id, amount: acid })
      }

      newRanges.length &&
        (await result.related('ranges').updateOrCreateMany(
          newRanges.map(({ id, amount }) => ({ unitId: id, amount })),
          'unitId',
        ))

      await result.save()
    })

    return await IngredientsController.formatIngredient(result)
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
      .where('id', id)
      .firstOrFail()
  }

  static async formatIngredient(ingredient: Ingredient) {
    return ingredient.serialize({
      relations: {
        ranges: {
          fields: ['id', 'amount'],
        },
      },
    })
  }

  static async getAndFormatIngredient(id: number) {
    const ingredient = await IngredientsController.getIngredient(id)
    return await IngredientsController.formatIngredient(ingredient)
  }
}
