import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CocktailIngredients extends BaseSchema {
  protected tableName = 'cocktail_ingredients'

  public async up() {
    this.schema.createTable(this.tableName, table => {
      table.increments('id').primary()

      table
        .integer('cocktail_id')
        .unsigned()
        .notNullable()
        .references('cocktails.id')
        .onDelete('CASCADE')

      table
        .integer('ingredient_id')
        .unsigned()
        .notNullable()
        .references('ingredients.id')
        .onDelete('CASCADE')

      table
        .integer('unit_id')
        .unsigned()
        .notNullable()
        .references('units.id')
        .onDelete('CASCADE')

      table.float('amount').notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
