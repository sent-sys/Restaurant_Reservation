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
  if (!first_name || first_name == "")
    return next({ status: 400, message: `First name is required` });
  if (!last_name || last_name == "")
    return next({ status: 400, message: `Last name is required` });
  if (!mobile_number || (mobile_number == "" && isNaN(mobile_number)))
    return next({ status: 400, message: `Mobile number is required` });
  if (!reservation_date)
    return next({ status: 400, message: `Please select a reservation date` });
  if (!reservation_time)
    return next({ status: 400, message: `Please select a reservation time` });
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
