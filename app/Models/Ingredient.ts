import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  HasMany,
  hasMany,
  HasManyThrough,
  hasManyThrough,
} from '@ioc:Adonis/Lucid/Orm'
import IngredientRange from './IngredientRange'
import Unit from './Unit'

export default class Ingredient extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => IngredientRange)
  public ranges: HasMany<typeof IngredientRange>

  @hasManyThrough([() => Unit, () => IngredientRange])
  public units: HasManyThrough<typeof Unit>
}
