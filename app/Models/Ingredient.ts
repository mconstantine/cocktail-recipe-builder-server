import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import IngredientRange from './IngredientRange'
import IngredientRecipe from './IngredientRecipe'
import IngredientIngredient from './IngredientIngredient'

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

  @hasMany(() => IngredientIngredient, { foreignKey: 'parentId' })
  public ingredients: HasMany<typeof IngredientIngredient>

  @hasMany(() => IngredientRecipe)
  public recipe: HasMany<typeof IngredientRecipe>
}
