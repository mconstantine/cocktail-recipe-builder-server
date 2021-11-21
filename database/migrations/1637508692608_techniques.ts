import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { TechniqueCode } from 'App/Models/Technique'

export default class Techniques extends BaseSchema {
  protected tableName = 'techniques'

  public async up() {
    this.schema.createTable(this.tableName, table => {
      table.increments('id')
      table.string('name').notNullable()
      table.enum('code', Object.keys(TechniqueCode)).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
