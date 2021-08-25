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
    createReservation(table).then(() =>
      history.push(`/dashboard?date=${table.reservation_date}`)
    );
  }

  return (
    <main className="container mt-3">
      <form onSubmit={submitHandler}>
        <fieldset>
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
              require={true}
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
              require={true}
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
              require={true}
              value={table.reservation_time}
              onChange={changeHandler}
            />
            <label htmlFor="people" className="m-2">
              Seats:
            </label>
            <input
              type="number"
              min="1"
              name="people"
              id="people"
              require={true}
              value={table.people}
              onChange={changeHandler}
            />
          </div>
          <button type="submit" className="btn btn-primary mr-1">
            Submit
          </button>
          <button
            type="button"
            className="btn btn-danger ml-1"
            onClick={cancel}
          >
            Cancel
          </button>
        </fieldset>
      </form>
    </main>
  );
}
