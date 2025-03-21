import { DateTime } from 'luxon'
import { BaseModel, column,manyToMany } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import Cocktail from './cocktail.js'

export default class Ingredient extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare description: string

  @column()
  declare isAlcohol: boolean

  @column()
  declare imageUrl: string


    @manyToMany(()=>Cocktail,{
      pivotTable: 'cocktail_ingredients',
      localKey: 'id',
      relatedKey: 'id',
      pivotForeignKey: 'ingredient_id',
      pivotRelatedForeignKey: 'cocktail_id',
      pivotColumns: ['quantity']
    })
    declare ingredients_cocktails: ManyToMany<typeof Cocktail>

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}