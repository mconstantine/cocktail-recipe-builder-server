import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Units extends BaseSchema {
  protected tableName = 'units'

  public async up() {
    this.schema.createTable(this.tableName, table => {
      table.increments('id')
      table.string('name').notNullable()
      table.string('unit').notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
