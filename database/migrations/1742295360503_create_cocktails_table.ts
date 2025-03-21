import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'cocktails'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('name', 100).unique().notNullable()
      table.boolean('is_alcohol').notNullable().defaultTo(true)
      table.integer('category_id').unsigned().references('categories.id')
      // table.integer('ingredients').unsigned().references('category.id')
      table.text('instructions').notNullable().defaultTo('')
      table.string('image_url').nullable()
      table.timestamp('created_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}