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
            from="/NegotiatedAgentView"
            to="/NegotiatedAgentView/list"
          />
        }
        <ContentRoute path="/NegotiatedAgentView/list" component={List} />
      </Switch>
    </Suspense>
  );
}
