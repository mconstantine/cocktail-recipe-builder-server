import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Ingredient from './Ingredient'
import Unit from './Unit'

export default class IngredientRange extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public ingredientId: number

  @column()
  public unitId: number

  @column()
  public amount: number

  @belongsTo(() => Ingredient)
  public ingredient: BelongsTo<typeof Ingredient>

  @belongsTo(() => Unit)
  public unit: BelongsTo<typeof Unit>
}
