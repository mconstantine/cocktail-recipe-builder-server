import { RouteHandler } from '@ioc:Adonis/Core/Route'
import Unit, { UnitType } from 'App/Models/Unit'

export const ingredientUnitsRoute: RouteHandler = () => {
  return Unit.query()
    .whereIn('type', [UnitType.VOLUME, UnitType.WEIGHT])
    .orderBy('id')
}
