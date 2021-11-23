import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cocktail from 'App/Models/Cocktail'

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

  public async store({}: HttpContextContract) {}

  public async show({ request }: HttpContextContract) {
    const id = request.param('id')

    const cocktail = await Cocktail.query()
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

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
