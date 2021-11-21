import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class IngredientRanges extends BaseSchema {
  protected tableName = 'ingredient_ranges'

  public async up() {
    this.schema.createTable(this.tableName, table => {
      table.increments('id').primary()

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

      table.unique(['ingredient_id', 'unit_id'])
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
