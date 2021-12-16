import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import Cocktail from 'App/Models/Cocktail'

export default class CocktailGarnishes extends BaseSchema {
  protected tableName = 'cocktail_garnishes'

  public async up() {
    this.schema.alterTable(Cocktail.table, table => {
      table.string('garnish').defaultTo(null)
    })
  }

  public async down() {
    this.schema.alterTable(Cocktail.table, table => {
      table.dropColumn('garnish')
    })
  }
}
