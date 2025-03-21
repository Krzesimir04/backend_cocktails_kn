import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import Category from './category.js'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import Ingredient from './ingredient.js'

export default class Cocktail extends BaseModel {

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare isAlcohol: boolean

  @column()
  declare categoryId: number
// ingredients relation

  @column()
  declare instructions: string

  @column()
  declare imageUrl: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @belongsTo(()=>Category,{
    foreignKey: 'id'
  })
  declare category: BelongsTo<typeof Category>

  @manyToMany(()=>Ingredient,{
    pivotTable: 'cocktail_ingredients',
    localKey: 'id',
    relatedKey: 'id',
    pivotForeignKey: 'cocktail_id',
    pivotRelatedForeignKey: 'ingredient_id',
    pivotColumns: ['quantity']
  })
  declare ingredients_cocktails: ManyToMany<typeof Ingredient>
}