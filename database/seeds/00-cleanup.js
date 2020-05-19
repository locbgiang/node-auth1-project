const cleaner = require('knex-cleaner');

exports.seed = function (knex) {
  return cleaner 
    .clean(knex, {
      mode: "delete",
      restartIdentity: true, // ask PosgreSQL to reset primary keys back to 0
      ignoreTables: ['knex_migrations', 'knex_migrations_lock']
    }).then(()=> console.log('\n All table truncated, ready to seed\n'));
}