import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Ingredient from './Ingredient'
import Unit from './Unit'

export default class IngredientIngredient extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public ingredientId: number

  @column()
  public parentId: number

  @column()
  public amount: number

  @column()
  public unitId: number

  @belongsTo(() => Ingredient)
  public ingredient: BelongsTo<typeof Ingredient>

  @belongsTo(() => Ingredient)
  public parent: BelongsTo<typeof Ingredient>

  @belongsTo(() => Unit)
  public unit: BelongsTo<typeof Unit>
}
