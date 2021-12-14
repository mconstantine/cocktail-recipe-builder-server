import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Cocktail from './Cocktail'

export default class CocktailRecipe extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public cocktailId: number

  @hasOne(() => Cocktail)
  public cocktail: HasOne<typeof Cocktail>

  @column()
  public index: number

  @column()
  public step: string
}
