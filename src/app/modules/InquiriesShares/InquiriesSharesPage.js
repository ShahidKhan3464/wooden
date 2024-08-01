import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../../../_metronic/layout";
import List from "./pages/list";

export default function propertyPage({ EmployeeID, BrokerID }) {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          <Redirect
            exact={true}
            from="/InquiriesShares"
            to="/InquiriesShares/list"
          />
        }
        <ContentRoute path="/InquiriesShares/list" component={List} />
        {/*<ContentRoute path="/InquiriesShares/list">
          <List EmployeeID={EmployeeID} BrokerID={BrokerID} />
        </ContentRoute>*/}
      </Switch>
    </Suspense>
  );
}
