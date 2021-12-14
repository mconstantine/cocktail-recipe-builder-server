import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CocktailRecipes extends BaseSchema {
  protected tableName = 'cocktail_recipes'

  public async up() {
    this.schema.createTable(this.tableName, table => {
      table.increments('id')

      table
        .integer('cocktail_id')
        .unsigned()
        .notNullable()
        .references('cocktails.id')
        .onDelete('CASCADE')

      table.integer('index').notNullable()
      table.string('step').notNullable()
      table.unique(['cocktail_id', 'index'])
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
