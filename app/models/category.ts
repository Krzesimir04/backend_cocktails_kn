import { DateTime } from 'luxon'
import { BaseModel, column,hasMany } from '@adonisjs/lucid/orm'
import Cocktail from './cocktail.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Category extends BaseModel {
  public static table = 'categories'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @hasMany(()=> Cocktail)
  declare cocktail: HasMany<typeof Cocktail>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
}