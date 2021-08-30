const { KnexTimeoutError } = require("knex");
const knex = require("../db/connection");

function list(date) {
  return knex("reservations")
    .select("*")
    .where({ reservation_date: date })
    .orderBy("reservation_time");
}

function create(reservation) {
  return knex("reservations")
    .insert(
      {
        first_name: reservation.first_name,
        last_name: reservation.last_name,
        mobile_number: reservation.mobile_number,
        reservation_date: reservation.reservation_date,
        reservation_time: reservation.reservation_time,
        people: reservation.people,
      },
      "*"
    )
    .then((created) => created[0]);
}

function read(reservation_id) {
  return knex("reservations").where({ reservation_id: reservation_id }).first();
}

module.exports = {
  list,
  create,
  read,
};
