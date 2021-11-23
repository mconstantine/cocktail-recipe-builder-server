import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Ingredient from 'App/Models/Ingredient'

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

  public async store({}: HttpContextContract) {}

  public async show({ request }: HttpContextContract) {
    const id = request.param('id')

    const ingredient = await Ingredient.query()
      .preload('ranges', query => query.preload('unit'))
      .where('id', id)
      .firstOrFail()

    return ingredient.serialize({
      relations: {
        ranges: {
          fields: ['id', 'amount'],
        },
      },
    })
  }

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
