import React from "react";

import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import Reservations from "../reservations";
import Tables from "../Tables";
import Seating from "../reservations/Seating";
import Edit from "../reservations/Edit";
import Read from "../reservations/Read";
import { today } from "../utils/date-time";
import useQuery from "../utils/useQuery";
import Search from "../Search";

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
        <Dashboard date={query.get("date") || today()} />
      </Route>
      <Route path="/reservations/new">
        <Reservations />
      </Route>
      <Route path="/tables/new">
        <Tables />
      </Route>
      <Route path="/reservations/:reservation_id/seat">
        <Seating />
      </Route>
      <Route path="/reservations/:reservation_id/edit">
        <Edit />
      </Route>
      <Route path="/reservations/:reservation_id">
        <Read />
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
