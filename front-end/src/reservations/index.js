import { useState } from "react";
import { useHistory } from "react-router";
import { createReservation } from "../utils/api";

export default function Reserve({
  initialState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  },
}) {
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState();
  const [table, setTable] = useState(initialState);

  function changeHandler({ target: { name, value } }) {
    setTable((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function cancel() {
    history.goBack();
  }

  function submitHandler(event) {
    event.preventDefault();
    createReservation(table)
      .then(() => history.push(`/dashboard?date=${table.reservation_date}`))
      .catch(setErrorMessage);
  }

  return (
    <main className="container-fluid mt-3">
      <form onSubmit={submitHandler}>
        <h1 className="mx-2 mt-4">Create Reservation</h1>
        {errorMessage &&
          errorMessage.message.map((err, i) => (
            <p key={i} className="alert alert-danger">
              {err}
            </p>
          ))}
        <fieldset className="mt-3">
          <div className="form-group">
            <label htmlFor="first_name" className="m-2">
              First Name:
            </label>
            <input
              type="text"
              placeholder="Firston"
              name="first_name"
              id="first_name"
              required={true}
              value={table.first_name}
              onChange={changeHandler}
            />
            <label htmlFor="last_name" className="m-2">
              Last Name:
            </label>
            <input
              type="text"
              placeholder="Lastly"
              name="last_name"
              id="last_name"
              required={true}
              value={table.last_name}
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="mobile_number" className="m-2">
              Mobile Number:
            </label>
            <input
              type="text"
              placeholder="000-000-0000"
              name="mobile_number"
              id="mobile_number"
              required={true}
              value={table.mobile_number}
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="reservation_date" className="m-2">
              Date:
            </label>
            <input
              type="date"
              name="reservation_date"
              id="reservation_date"
              required={true}
              value={table.reservation_date}
              onChange={changeHandler}
            />
            <label htmlFor="reservation_time" className="m-2">
              Time:
            </label>
            <input
              type="time"
              name="reservation_time"
              id="reservation_time"
              required={true}
              value={table.reservation_time}
              onChange={changeHandler}
            />
            <label htmlFor="people" className="m-2">
              Seats:
            </label>
            <input
              type="number"
              min="1"
              max="10"
              name="people"
              id="people"
              placeholder="1"
              required={true}
              value={table.people}
              onChange={changeHandler}
            />
          </div>
          <button
            type="button"
            className="btn btn-danger mx-2"
            onClick={cancel}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary mx-2">
            Submit
          </button>
        </fieldset>
      </form>
    </main>
  );
}
