import { RouteHandler } from '@ioc:Adonis/Core/Route'
import Unit, { UnitType } from 'App/Models/Unit'

export const cocktailUnitsRoute: RouteHandler = () => {
  return Unit.query().where('type', UnitType.VOLUME).orderBy('id')
}
