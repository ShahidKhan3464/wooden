import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../../../_metronic/layout";
import List from "./pages/list";

export default function propertyPage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          <Redirect
            exact={true}
            from="/MatchedProperties"
            to="/MatchedProperties/list"
          />
        }
        <ContentRoute path="/MatchedProperties/list" component={List} />
      </Switch>
    </Suspense>
  );
}
