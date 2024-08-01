import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../../../_metronic/layout";
import List from "./pages/list";
import Create3rdParty from './pages/create3rdParty'

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
                        from="/3rd-party-agents"
                        to="/3rd-party-agents/list"
                    />
                }
                <ContentRoute path="/3rd-party-agents/addnewpartyagent">
                    <Create3rdParty
                        EmployeeID={EmployeeID}
                        BrokerID={BrokerID}
                    />
                </ContentRoute>
                <ContentRoute path="/3rd-party-agents/viewpartyagentdetail/:id">
                    <Create3rdParty
                        EmployeeID={EmployeeID}
                        BrokerID={BrokerID}
                    />
                </ContentRoute>
                <ContentRoute path="/3rd-party-agents/editpartyagent/:id">
                    <Create3rdParty
                        EmployeeID={EmployeeID}
                        BrokerID={BrokerID}
                    />
                </ContentRoute>
                 <ContentRoute path="/3rd-party-agents/list">
                    <List
                        EmployeeID={EmployeeID}
                        BrokerID={BrokerID}
                    />
                </ContentRoute>
            </Switch>
        </Suspense>
    );
}