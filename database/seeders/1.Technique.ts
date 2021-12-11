import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Technique, { TechniqueCode } from 'App/Models/Technique'
import Unit, { UnitType } from 'App/Models/Unit'

export default class TechniqueSeeder extends BaseSeeder {
  public async run() {
    const [built, stirred, shaken, shakenWithEgg, blended, carbonated] =
      await Technique.createMany([
        { name: 'Built', code: TechniqueCode.BUILT },
        { name: 'Stirred', code: TechniqueCode.STIRRED },
        { name: 'Shaken', code: TechniqueCode.SHAKEN },
        { name: 'Shaken with egg white', code: TechniqueCode.SHAKEN_WITH_EGG },
        { name: 'Blended', code: TechniqueCode.BLENDED },
        { name: 'Carbonated', code: TechniqueCode.CARBONATED },
      ])

    const [oz, abv, sugar, acid, dilution] = await Unit.createMany([
      { name: 'Ounce', unit: 'oz', type: UnitType.VOLUME, ml: 30 },
      { name: 'ABV', unit: '%', type: UnitType.PERCENTAGE },
      { name: 'Sugar', unit: '%', type: UnitType.PERCENTAGE },
      { name: 'Acid', unit: '%', type: UnitType.PERCENTAGE },
      { name: 'Dilution', unit: '%', type: UnitType.PERCENTAGE },
      { name: 'Milliliter', unit: 'ml', type: UnitType.VOLUME, ml: 1 },
      { name: 'Centiliter', unit: 'cl', type: UnitType.VOLUME, ml: 10 },
      { name: 'Dash', unit: 'dash', type: UnitType.VOLUME, ml: 0.9 },
      { name: 'Drop', unit: 'drop', type: UnitType.VOLUME, ml: 0.05 },
      { name: 'Teaspoon', unit: 'tsp', type: UnitType.VOLUME, ml: 5 },
    ])

    await built.related('ranges').createMany([
      { unitId: oz.id, min: 2.9, max: 3.1 },
      { unitId: abv.id, min: 27, max: 32 },
      { unitId: sugar.id, min: 7, max: 8 },
      { unitId: acid.id, min: 0, max: 0 },
      { unitId: dilution.id, min: 23, max: 25 },
    ])

    await stirred.related('ranges').createMany([
      { unitId: oz.id, min: 4.33, max: 4.75 },
      { unitId: abv.id, min: 21, max: 29 },
      { unitId: sugar.id, min: 3.7, max: 5.6 },
      { unitId: acid.id, min: 0.1, max: 0.14 },
      { unitId: dilution.id, min: 41, max: 49 },
    ])

    await shaken.related('ranges').createMany([
      { unitId: oz.id, min: 5.2, max: 5.9 },
      { unitId: abv.id, min: 15, max: 19.7 },
      { unitId: sugar.id, min: 5, max: 8.9 },
      { unitId: acid.id, min: 0.76, max: 0.94 },
      { unitId: dilution.id, min: 51, max: 60 },
    ])

    await shakenWithEgg.related('ranges').createMany([
      { unitId: oz.id, min: 6.66, max: 7 },
      { unitId: abv.id, min: 12.1, max: 15.2 },
      { unitId: sugar.id, min: 6.7, max: 9 },
      { unitId: acid.id, min: 0.49, max: 0.68 },
      { unitId: dilution.id, min: 46, max: 49 },
    ])

    await blended.related('ranges').createMany([
      { unitId: oz.id, min: 5.25, max: 5.25 },
      { unitId: abv.id, min: 15, max: 17.2 },
      { unitId: sugar.id, min: 7.9, max: 8.1 },
      { unitId: acid.id, min: 0.5, max: 0.6 },
      { unitId: dilution.id, min: 90, max: 90 },
    ])

    await carbonated.related('ranges').createMany([
      { unitId: oz.id, min: 5, max: 5 },
      { unitId: abv.id, min: 14, max: 16 },
      { unitId: sugar.id, min: 5, max: 7.5 },
      { unitId: acid.id, min: 0.38, max: 0.51 },
      { unitId: dilution.id, min: 51, max: 60 },
    ])
  }
}
