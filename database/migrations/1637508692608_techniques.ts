import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { TechniqueCode } from 'App/Models/Technique'

export default class Techniques extends BaseSchema {
  protected tableName = 'techniques'

  public async up() {
    this.schema.createTable(this.tableName, table => {
      table.increments('id').primary()
      table.string('name').notNullable()
      table.enum('code', Object.keys(TechniqueCode)).notNullable()

      table.unique(['code'])
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
