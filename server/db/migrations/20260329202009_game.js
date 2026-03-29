export function up(knex) {
  return knex.schema.createTable('game', (table) => {
    table.string('id').primary().unique()
    table.json('pond')
  })
}

export function down(knex) {
  return knex.schema.dropTable('game')
}
