//deciding the knex environment
const knex = require('knex');

const knexfile = require('../knexfile');
const environment = process.env.NODE_ENV || 'development';

module.exports = knex(knexfile[environment]);