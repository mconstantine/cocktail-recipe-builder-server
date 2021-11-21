import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  HasOne,
  hasOne,
  ManyToMany,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import Ingredient from './Ingredient'
import Technique from './Technique'

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

  @hasOne(() => Technique)
  public technique: HasOne<typeof Technique>

  @manyToMany(() => Ingredient)
  public ingredients: ManyToMany<typeof Ingredient>
}
