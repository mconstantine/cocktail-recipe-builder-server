import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cocktail from 'App/Models/Cocktail'
import Ingredient from 'App/Models/Ingredient'
import Technique from 'App/Models/Technique'
import CocktailStoreValidator from 'App/Validators/CocktailStoreValidator'
import { Exception } from '@adonisjs/core/build/standalone'
import Unit from 'App/Models/Unit'

export default class CocktailsController {
  public async index({ request }: HttpContextContract) {
    const page = request.input('page') || 1
    const perPage = request.input('perPage') || 20
    const query = request.input('query') || ''

    let match = Cocktail.query().orderBy('name')

    if (query) {
      match = match.where('name', 'like', `%${query}%`)
    }

    const cocktails = await match.paginate(page, perPage)

    return cocktails.serialize({
      fields: ['id', 'name'],
    })
  }

  public async store({ request }: HttpContextContract) {
    const data = await request.validate(CocktailStoreValidator)
    const { name } = data
    const technique = await Technique.findByOrFail('code', data.technique_code)

    const ingredients = await Ingredient.query().whereIn(
      'id',
      data.ingredients.map(({ id }) => id),
    )

    const providedUnits = [...new Set(data.ingredients.map(({ unit }) => unit))]
    const units = await Unit.query().whereIn('unit', providedUnits)

    if (ingredients.length !== data.ingredients.length) {
      throw new Exception('Invalid ingredients', 400, 'E_ROW_NOT_FOUND')
    }

    if (providedUnits.length !== units.length) {
      throw new Exception('Invalid units', 400, 'E_ROW_NOT_FOUND')
    }

    const cocktail = await Cocktail.create({ name, techniqueId: technique.id })

    await cocktail.related('ingredients').createMany(
      data.ingredients.map(ingredient => ({
        cocktailId: cocktail.id,
        ingredientId: ingredient.id,
        amount: ingredient.amount,
        unitId: units.find(({ unit }) => unit === ingredient.unit)!.id,
      })),
    )

    return await CocktailsController.getAndFormatCocktail(cocktail.id)
  }

  public async show({ request }: HttpContextContract) {
    const id = request.param('id')
    return await CocktailsController.getAndFormatCocktail(id)
  }

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}

  static async getCocktail(id: number) {
    return await Cocktail.query()
      .where('id', id)
      .preload('technique', query =>
        query.preload('ranges', query => query.preload('unit')),
      )
      .preload('ingredients', query =>
        query
          .preload('ingredient', query =>
            query.preload('ranges', query => query.preload('unit')),
          )
          .preload('unit'),
      )
      .firstOrFail()
  }

  static formatCocktail(cocktail: Cocktail) {
    return cocktail.serialize({
      fields: ['id', 'name', 'created_at', 'updated_at'],
      relations: {
        technique: {
          relations: {
            ranges: {
              fields: ['id', 'min', 'max'],
            },
          },
        },
        ingredients: {
          fields: ['id', 'amount'],
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

  static async getAndFormatCocktail(id: number) {
    return this.formatCocktail(await this.getCocktail(id))
  }
}
