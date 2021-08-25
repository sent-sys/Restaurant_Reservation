const { KnexTimeoutError } = require("knex");
const knex = require("../db/connection");

function list(date) {
  return knex("reservations").select("*").where({ reservation_date: date });
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

module.exports = {
  list,
  create,
};
