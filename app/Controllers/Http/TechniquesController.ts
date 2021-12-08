import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Technique from 'App/Models/Technique'

export default class TechniquesController {
  public async index({}: HttpContextContract) {
    return await Technique.query()
      .preload('ranges', query => query.preload('unit'))
      .orderBy('id')
  }
}
