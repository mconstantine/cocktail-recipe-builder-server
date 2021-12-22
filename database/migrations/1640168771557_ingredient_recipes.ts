import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class IngredientRecipes extends BaseSchema {
  protected tableName = 'ingredient_recipes'

  public async up() {
    this.schema.createTable(this.tableName, table => {
      table.increments('id')

      table
        .integer('ingredient_id')
        .unsigned()
        .notNullable()
        .references('ingredients.id')
        .onDelete('CASCADE')

      table.integer('index').notNullable()
      table.string('step').notNullable()
      table.unique(['ingredient_id', 'index'])
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
