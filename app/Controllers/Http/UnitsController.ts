import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Unit from 'App/Models/Unit'

export default class UnitsController {
  async index({}: HttpContextContract) {
    return Unit.query()
      .whereNotIn('name', ['ABV', 'Acid', 'Dilution', 'Sugar'])
      .orderBy('id')
  }
}
