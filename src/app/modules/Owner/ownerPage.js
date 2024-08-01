import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../../../_metronic/layout";
import List from "./pages/list_";
import CreateOwner from './pages/createOwner'

export default function propertyPage({
    EmployeeID,
    BrokerID,
    TransactionStatusID,
    Countries,
    States,
}) {
    return (
        <Suspense fallback={<LayoutSplashScreen />}>
            <Switch>
                {
                    /* Redirect from eCommerce root URL to /customers */
                    <Redirect
                        exact={true}
                        from="/owner"
                        to="/owner/list"
                    />
                }
                <ContentRoute path="/owner/addnewowner">
                    <CreateOwner
                        EmployeeID={EmployeeID}
                        BrokerID={BrokerID}
                        TransactionStatusID={TransactionStatusID}
                        Countries={Countries}
                        States={States}
                    />
                </ContentRoute>
                <ContentRoute path="/owner/viewownerdetail/:id">
                    <CreateOwner
                        EmployeeID={EmployeeID}
                        BrokerID={BrokerID}
                        TransactionStatusID={TransactionStatusID}
                        Countries={Countries}
                        States={States}
                    />
                </ContentRoute>
                <ContentRoute path="/owner/editowner/:id">
                    <CreateOwner
                        EmployeeID={EmployeeID}
                        BrokerID={BrokerID}
                        TransactionStatusID={TransactionStatusID}
                        Countries={Countries}
                        States={States}
                    />
                </ContentRoute>
                <ContentRoute path="/owner/list">
                    <List
                        EmployeeID={EmployeeID}
                        BrokerID={BrokerID}
                        TransactionStatusID={TransactionStatusID}
                        Countries={Countries}
                        States={States}
                    />
                </ContentRoute>
            </Switch>
        </Suspense>
    );
}