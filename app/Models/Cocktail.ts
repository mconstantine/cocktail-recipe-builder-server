import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  HasMany,
  hasMany,
} from '@ioc:Adonis/Lucid/Orm'
import Technique from './Technique'
import CocktailIngredient from './CocktailIngredient'

export default class Cocktail extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public techniqueId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Technique)
  public technique: BelongsTo<typeof Technique>

  @hasMany(() => CocktailIngredient)
  public ingredients: HasMany<typeof CocktailIngredient>
}
