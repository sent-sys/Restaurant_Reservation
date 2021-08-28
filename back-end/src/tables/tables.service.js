const { KnexTimeoutError } = require("knex");
const knex = require("../db/connection");

function list() {
  return knex("tables").select("*").orderBy("table_name");
}

function read(tableId) {
  return knex("tables").where({ table_id: tableId }).first();
}

function create(table) {
  return knex("tables")
    .insert(table, "*")
    .then((created) => created[0]);
}

module.exports = {
  list,
  create,
  read,
};
