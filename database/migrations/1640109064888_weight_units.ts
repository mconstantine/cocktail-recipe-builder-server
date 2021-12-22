import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import Unit, { UnitType } from 'App/Models/Unit'

export default class WeightUnits extends BaseSchema {
  public async up() {
    this.schema
      .createTable('units_clone', table => {
        table.increments('id').primary()
        table.string('name').notNullable()
        table.string('unit').notNullable()
        table
          .enum('type', [UnitType.PERCENTAGE, UnitType.VOLUME, UnitType.WEIGHT])
          .notNullable()
        table.float('ml').defaultTo(null)
      })
      .raw(`INSERT INTO units_clone SELECT * FROM ${Unit.table}`)
      .dropTable(Unit.table)
      .renameTable('units_clone', Unit.table)
  }

  public async down() {
    this.schema
      .raw(`DELETE FROM ${Unit.table} WHERE type = '${UnitType.WEIGHT}'`)
      .createTable('units_clone', table => {
        table.increments('id').primary()
        table.string('name').notNullable()
        table.string('unit').notNullable()
        table.enum('type', [UnitType.PERCENTAGE, UnitType.VOLUME]).notNullable()
        table.float('ml').defaultTo(null)
      })
      .raw(`INSERT INTO units_clone SELECT * FROM ${Unit.table}`)
      .dropTable(Unit.table)
      .renameTable('units_clone', Unit.table)
  }
}
