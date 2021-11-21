import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Technique, { TechniqueCode } from 'App/Models/Technique'
import Unit from 'App/Models/Unit'

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

    const [volume, abv, sugar, acid, dilution] = await Unit.createMany([
      { name: 'Volume', unit: 'oz' },
      { name: 'ABV', unit: '%' },
      { name: 'Sugar', unit: 'g/100ml' },
      { name: 'Acid', unit: '%' },
      { name: 'Dilution', unit: '%' },
    ])

    await built.related('ranges').createMany([
      { unitId: volume.id, min: 2.33, max: 2.5 },
      { unitId: abv.id, min: 34, max: 40 },
      { unitId: sugar.id, min: 9.5, max: 9.5 },
      { unitId: acid.id, min: 0, max: 0 },
      { unitId: dilution.id, min: 24, max: 24 },
    ])

    await stirred.related('ranges').createMany([
      { unitId: volume.id, min: 3, max: 3.25 },
      { unitId: abv.id, min: 29, max: 43 },
      { unitId: sugar.id, min: 5.3, max: 8 },
      { unitId: acid.id, min: 0.15, max: 0.2 },
      { unitId: dilution.id, min: 41, max: 49 },
    ])

    await shaken.related('ranges').createMany([
      { unitId: volume.id, min: 3.25, max: 3.75 },
      { unitId: abv.id, min: 23, max: 31.5 },
      { unitId: sugar.id, min: 8, max: 13.5 },
      { unitId: acid.id, min: 1.2, max: 1.4 },
      { unitId: dilution.id, min: 51, max: 60 },
    ])

    await shakenWithEgg.related('ranges').createMany([
      { unitId: volume.id, min: 4.33, max: 4.75 },
      { unitId: abv.id, min: 18, max: 23 },
      { unitId: sugar.id, min: 10, max: 13.2 },
      { unitId: acid.id, min: 0.73, max: 1 },
      { unitId: dilution.id, min: 46, max: 49 },
    ])

    await blended.related('ranges').createMany([
      { unitId: volume.id, min: 0.75, max: 0.75 },
      { unitId: abv.id, min: 28.6, max: 32.8 },
      { unitId: sugar.id, min: 15, max: 15.4 },
      { unitId: acid.id, min: 1.08, max: 1.09 },
      { unitId: dilution.id, min: 90, max: 90 },
    ])

    await carbonated.related('ranges').createMany([
      { unitId: volume.id, min: 5, max: 5 },
      { unitId: abv.id, min: 14, max: 16 },
      { unitId: sugar.id, min: 5, max: 7.5 },
      { unitId: acid.id, min: 0.38, max: 0.51 },
      { unitId: dilution.id, min: 0, max: 0 },
    ])
  }
}
