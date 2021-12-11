import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import CocktailIngredient from 'App/Models/CocktailIngredient'

export default class AfterTechnique extends BaseSchema {
  public async up() {
    this.schema.alterTable(CocktailIngredient.table, table => {
      table.boolean('after_technique').notNullable().defaultTo(false)
    })
  }

  public async down() {
    this.schema.alterTable(CocktailIngredient.table, table => {
      table.dropColumn('after_technique')
    })
  }
}
