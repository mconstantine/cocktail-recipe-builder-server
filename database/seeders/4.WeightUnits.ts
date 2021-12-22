import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Unit, { UnitType } from 'App/Models/Unit'

export default class WeightUnitsSeeder extends BaseSeeder {
  public async run() {
    await Unit.createMany([
      { name: 'Gram', unit: 'g', type: UnitType.WEIGHT, ml: null },
      { name: 'Milligram', unit: 'mg', type: UnitType.WEIGHT, ml: null },
      { name: 'Kilogram', unit: 'kg', type: UnitType.WEIGHT, ml: null },
    ])
  }
}
