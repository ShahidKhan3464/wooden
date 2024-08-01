import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../../../_metronic/layout";
import List from "./pages/list";
import CreateYatch from './pages/createYatch';

export default function yachtPage({
    EmployeeID,
    BrokerID,
    TransactionStatusID
}) {
    return (
        <Suspense fallback={<LayoutSplashScreen />}>
            <Switch>
                {
                    /* Redirect from eCommerce root URL to /customers */
                    <Redirect
                        exact={true}
                        from="/yacht"
                        to="/yacht/list"
                    />
                }
                <ContentRoute path="/yacht/addNewYatch">
                    <CreateYatch
                        EmployeeID={EmployeeID}
                        BrokerID={BrokerID}
                        TransactionStatusID={TransactionStatusID}
                    />
                </ContentRoute>
                <ContentRoute path="/yacht/viewYachtDetail/:id">
                    <CreateYatch
                        EmployeeID={EmployeeID}
                        BrokerID={BrokerID}
                        TransactionStatusID={TransactionStatusID}
                    />
                </ContentRoute>
                <ContentRoute path="/yacht/editYacht/:id">
                    <CreateYatch
                        EmployeeID={EmployeeID}
                        BrokerID={BrokerID}
                        TransactionStatusID={TransactionStatusID}
                    />
                </ContentRoute>
                <ContentRoute path="/yacht/list">
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