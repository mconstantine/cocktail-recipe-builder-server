import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class TechniqueRange extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  techniqueId: number

  @column()
  unitId: number

  @column()
  min: number

  @column()
  max: number
}
