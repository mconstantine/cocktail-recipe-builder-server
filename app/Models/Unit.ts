import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'

export enum UnitType {
  VOLUME = 'VOLUME',
  PERCENTAGE = 'PERCENTAGE',
  WEIGHT = 'WEIGHT',
}

export default class Unit extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public unit: string

  @column()
  public type: UnitType

  @column()
  public ml: number | null

  @beforeSave()
  public static ensureMlIfVolume(unit: Unit) {
    const data = {
      ...unit.toObject(),
      ...unit.$dirty,
    }

    if (data.type === UnitType.VOLUME && !data.ml) {
      throw new Error('ml is required for volumetric units')
    }
  }
}
