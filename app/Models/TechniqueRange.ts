import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class TechniqueRange extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public techniqueId: number

  @column()
  public unitId: number

  @column()
  public min: number

  @column()
  public max: number
}