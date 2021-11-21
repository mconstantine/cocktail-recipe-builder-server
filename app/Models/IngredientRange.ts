import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class IngredientRange extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public ingredientId: number

  @column()
  public unitId: number

  @column()
  public amount: number
}
