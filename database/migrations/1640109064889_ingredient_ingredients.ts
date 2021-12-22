import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class IngredientIngredients extends BaseSchema {
  protected tableName = 'ingredient_ingredients'

  public async up() {
    this.schema.createTable(this.tableName, table => {
      table.increments('id', { primaryKey: true })

      table
        .integer('ingredient_id')
        .unsigned()
        .notNullable()
        .references('ingredients.id')
        .onDelete('CASCADE')

      table
        .integer('parent_id')
        .unsigned()
        .notNullable()
        .references('ingredients.id')
        .onDelete('CASCADE')

      table.float('amount').notNullable()

      table
        .integer('unit_id')
        .unsigned()
        .notNullable()
        .references('units.id')
        .onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
