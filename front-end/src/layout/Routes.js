import React from "react";

import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "../Errors/NotFound";
import ReservationsForm from "../reservations/ReservationForm";
import TablesForm from "../Tables/TableForm";
import Seating from "../dashboard/Seating";
import { today } from "../utils/date-time";
import useQuery from "../utils/useQuery";
import Search from "../dashboard/Search";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  const query = useQuery();
  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/dashboard">
        <Dashboard date={today()} />
      </Route>
      <Route exact={true} path="/reservations/new">
        <ReservationsForm type="Create new" />
      </Route>
      <Route path="/tables/new">
        <TablesForm />
      </Route>
      <Route path="/reservations/:reservation_id/seat">
        <Seating />
      </Route>
      <Route path="/reservations/:reservation_id/edit">
        <ReservationsForm type="Edit" />
      </Route>
      <Route path="/search">
        <Search />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
