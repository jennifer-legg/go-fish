export function up(knex) {
  return knex.schema.createTable('player', (table) => {
    table.string('game_id').references('game.id')
    table.string('username')
    table.json('hand')
    table.string('avatar')
    table.integer('sets')
    table.string('socket_id')
    table.boolean('active')
  })
}

export function down(knex) {
  return knex.schema.dropTable('player')
}
