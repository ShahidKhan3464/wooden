import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../../../_metronic/layout";
import CreateQuickBook from './pages/createQuickBook'
import CreateQuickHold from './pages/createQuickHold'
import List from "./pages/list";

export default function calendarViewPage({ EmployeeID, BrokerID }) {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from eCommerce root URL to /customers */
          <Redirect exact={true} from="/CalendarView" to="/CalendarView/list" />
        }
        <ContentRoute path="/CalendarView/list">
          <List EmployeeID={EmployeeID} BrokerID={BrokerID} />
        </ContentRoute>
        <ContentRoute path="/CalendarView/createQuickBook">
          <CreateQuickBook EmployeeID={EmployeeID} BrokerID={BrokerID}   />
        </ContentRoute>
        <ContentRoute path="/CalendarView/createQuickHold">
          <CreateQuickHold EmployeeID={EmployeeID} BrokerID={BrokerID}  />
        </ContentRoute>
      </Switch>
    </Suspense>
  );
}
