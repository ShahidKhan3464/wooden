import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../../../_metronic/layout";
import List from "./pages/list";
import Create from './pages/create'

export default function inquiryPage({
  EmployeeID,
  BrokerID,
  TransactionStatusID,
}) {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from eCommerce root URL to /customers */
          <Redirect
            exact={true}
            from="/reviews"
            to="/reviews/list"
          />
        }
        <ContentRoute path="/reviews/addnewreviews">
          <Create
            EmployeeID={EmployeeID}
            BrokerID={BrokerID}
            TransactionStatusID={TransactionStatusID}
          />
        </ContentRoute>
        <ContentRoute path="/reviews/viewreviewsdetail/:id">
          <Create
            EmployeeID={EmployeeID}
            BrokerID={BrokerID}
            TransactionStatusID={TransactionStatusID}
          />
        </ContentRoute>
        <ContentRoute path="/reviews/editreviews/:id">
          <Create
            EmployeeID={EmployeeID}
            BrokerID={BrokerID}
            TransactionStatusID={TransactionStatusID}
          />
        </ContentRoute>
        <ContentRoute path="/reviews/list">
          <List
            EmployeeID={EmployeeID}
            BrokerID={BrokerID}
            TransactionStatusID={TransactionStatusID}

          />
        </ContentRoute>
      </Switch>
    </Suspense>
  );
}