const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./reservations.service");

/**
 * List handler for reservation resources
 */
function resCheck(req, res, next) {
  const {
    data: {
      first_name,
      last_name,
      mobile_number,
      reservation_date,
      reservation_time,
      people,
    },
  } = req.body;
  const today = Date.now();
  const submitDate = new Date(reservation_date + " " + reservation_time);
  const errs = [];
  let goNext = false;
  if (!first_name || first_name == "") {
    goNext = true;
    errs.push(`First name is required`);
  }
  if (!last_name || last_name == "") {
    goNext = true;
    errs.push(`Last name is required`);
  }
  if (!mobile_number || mobile_number == "" || isNaN(Number(mobile_number))) {
    goNext = true;
    errs.push(`Mobile number is required`);
  }
  if (!reservation_date || reservation_date == "") {
    goNext = true;
    errs.push(`Please select a reservation date`);
  }
  if (submitDate < today) {
    goNext = true;
    errs.push(`Please select a valid, future date`);
  }
  if (submitDate.getDay() === 2) {
    goNext = true;
    errs.push(`Restaurant is closed on Tuesdays`);
  }
  if (!reservation_time) {
    goNext = true;
    errs.push(`Please select a reservation time`);
  }
  if (reservation_time < "103000") {
    goNext = true;
    errs.push(`Restaurant does not open until 10:30`);
  }
  if (reservation_time > "213000") {
    goNext = true;
    errs.push(
      `Restaurant closes at 22:30, please choose a time on or before 21:30`
    );
  }
  if (goNext) return next({ status: 400, message: errs });
  res.locals.reservation = {
    first_name,
    last_name,
    mobile_number,
    reservation_date,
    reservation_time,
    people,
  };
  next();
}

async function list(req, res) {
  const { date } = req.query;
  res.json({ data: await service.list(date) });
}

async function create(req, res, next) {
  res.status(201).json({ data: await service.create(res.locals.reservation) });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [resCheck, asyncErrorBoundary(create)],
};
