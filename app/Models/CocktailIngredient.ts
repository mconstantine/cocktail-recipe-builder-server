import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Cocktail from './Cocktail'
import Ingredient from './Ingredient'
import Unit from './Unit'

export default class CocktailIngredient extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public cocktailId: number

  @column()
  public ingredientId: number

  @column()
  public amount: number

  @column()
  public unitId: number

  @hasOne(() => Cocktail)
  public cocktail: HasOne<typeof Cocktail>

  @hasOne(() => Ingredient)
  public ingredient: HasOne<typeof Ingredient>

  @hasOne(() => Unit)
  public unit: HasOne<typeof Unit>
}
