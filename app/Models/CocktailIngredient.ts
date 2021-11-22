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
  public unitId: number

  @column()
  public amount: number

  @hasOne(() => Cocktail, { localKey: 'cocktailId', foreignKey: 'id' })
  public cocktail: HasOne<typeof Cocktail>

  @hasOne(() => Ingredient, { localKey: 'ingredientId', foreignKey: 'id' })
  public ingredient: HasOne<typeof Ingredient>

  @hasOne(() => Unit, { localKey: 'unitId', foreignKey: 'id' })
  public unit: HasOne<typeof Unit>
}
