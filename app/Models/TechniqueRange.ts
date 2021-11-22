import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Technique from './Technique'
import Unit from './Unit'

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

  @belongsTo(() => Technique)
  public technique: BelongsTo<typeof Technique>

  @belongsTo(() => Unit)
  public unit: BelongsTo<typeof Unit>
}
