import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TechniqueRanges extends BaseSchema {
  protected tableName = 'technique_ranges'

  public async up() {
    this.schema.createTable(this.tableName, table => {
      table.increments('id')

      table
        .integer('technique_id')
        .unsigned()
        .notNullable()
        .references('techniques.id')
        .onDelete('CASCADE')

      table
        .integer('unit_id')
        .unsigned()
        .notNullable()
        .references('units.id')
        .onDelete('CASCADE')

      table.float('min').notNullable()
      table.float('max').notNullable()

      table.unique(['technique_id', 'unit_id'])
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
