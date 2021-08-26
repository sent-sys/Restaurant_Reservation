import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { useHistory } from "react-router";
import { next, previous, today } from "../utils/date-time";
/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const history = useHistory();

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  const nextDay = () => {
    history.push(`dashboard?date=${next(date)}`);
  };

  const prevDay = () => {
    history.push(`dashboard?date=${previous(date)}`);
  };

  const currentDay = () => {
    history.push(`dashboard?date=${today(date)}`);
  };

  const content = reservations.map((res, i) => (
    <div key={i} className="d-flex">
      <div className="col-2">
        <p>{res.first_name}</p>
      </div>
      <div className="col-2">
        <p>{res.last_name}</p>
      </div>
      <div className="col-2">
        <p>{res.mobile_number}</p>
      </div>
      <div className="col-2">
        <p>{res.reservation_time}</p>
      </div>
      <div className="col-2">
        <p>{res.people}</p>
      </div>
    </div>
  ));

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0 mr-1">Reservations for date: </h4>
        <h4>{date}</h4>
      </div>
      <button
        type="button"
        className="btn btn-secondary mx-1 mb-2"
        onClick={prevDay}
      >
        Previous Day
      </button>
      <button
        type="button"
        className="btn btn-secondary mx-1 mb-2"
        onClick={currentDay}
      >
        Current Day
      </button>
      <button
        type="button"
        className="btn btn-secondary mx-1 mb-2"
        onClick={nextDay}
      >
        Next day
      </button>
      <ErrorAlert error={reservationsError} />
      <div className="d-flex">
        <div className="col-2">
          <h5>First Name</h5>
        </div>
        <div className="col-2">
          <h5>Last Name</h5>
        </div>
        <div className="col-2">
          <h5>Mobile Number</h5>
        </div>
        <div className="col-2">
          <h5>Reservation Time</h5>
        </div>
        <div className="col-2">
          <h5>Seats</h5>
        </div>
      </div>
      <div>{content}</div>
    </main>
  );
}

export default Dashboard;
