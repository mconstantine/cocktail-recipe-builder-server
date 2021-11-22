import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import TechniqueRange from './TechniqueRange'

export enum TechniqueCode {
  BUILT = 'BUILT',
  STIRRED = 'STIRRED',
  SHAKEN = 'SHAKEN',
  SHAKEN_WITH_EGG = 'SHAKEN_WITH_EGG',
  BLENDED = 'BLENDED',
  CARBONATED = 'CARBONATED',
}

export default class Technique extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public code: TechniqueCode

  @hasMany(() => TechniqueRange)
  public ranges: HasMany<typeof TechniqueRange>
}
