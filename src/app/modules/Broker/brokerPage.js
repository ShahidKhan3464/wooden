import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../../../_metronic/layout";
import List from "./pages/list_";
import CreateBroker from './pages/createBroker'

export default function propertyPage({
    EmployeeID,
    BrokerID,
}) {

    return (
        <Suspense fallback={<LayoutSplashScreen />}>
            <Switch>
                {
                    /* Redirect from eCommerce root URL to /customers */
                    <Redirect
                        exact={true}
                        from="/broker"
                        to="/broker/list"
                    />
                }
                <ContentRoute path="/broker/addnewbroker">
                    <CreateBroker
                        EmployeeID={EmployeeID}
                        BrokerID={BrokerID}
                    />
                </ContentRoute>
                <ContentRoute path="/broker/viewbrokerdetail/:id">
                    <CreateBroker
                        EmployeeID={EmployeeID}
                        BrokerID={BrokerID}
                    />
                </ContentRoute>
                <ContentRoute path="/broker/editbroker/:id">
                    <CreateBroker
                        EmployeeID={EmployeeID}
                        BrokerID={BrokerID}
                    />
                </ContentRoute>
                <ContentRoute path="/broker/list">
                    <List
                        EmployeeID={EmployeeID}
                        BrokerID={BrokerID}
                    />
                </ContentRoute>
            </Switch>
        </Suspense>
    );
}