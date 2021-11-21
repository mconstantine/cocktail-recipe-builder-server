import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { UnitType } from 'App/Models/Unit'

export default class Units extends BaseSchema {
  protected tableName = 'units'

  public async up() {
    this.schema.createTable(this.tableName, table => {
      table.increments('id').primary()
      table.string('name').notNullable()
      table.string('unit').notNullable()
      table.enum('type', Object.keys(UnitType)).notNullable()
      table.float('ml').defaultTo(null)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
