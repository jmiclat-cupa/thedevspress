import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Category from './Category'
import User from './User'
import Reply from './Reply'
import Like from './Like'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public categoryId: number

  @column()
  public title: string

  @column()
  public content: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Category)
  public category: BelongsTo<typeof Category>

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @hasMany(() => Reply)
  public replies: HasMany<typeof Reply>

  @hasMany(() => Like)
  public likes: HasMany<typeof Like>
}
