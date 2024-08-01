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
                        from="/instagram"
                        to="/instagram/list"
                    />
                }
                <ContentRoute path="/instagram/addnewinstagram">
                    <Create
                        EmployeeID={EmployeeID}
                        BrokerID={BrokerID}
                        TransactionStatusID={TransactionStatusID}
                    />
                </ContentRoute>
                <ContentRoute path="/instagram/viewinstagramdetail/:id">
                    <Create
                        EmployeeID={EmployeeID}
                        BrokerID={BrokerID}
                        TransactionStatusID={TransactionStatusID}
                    />
                </ContentRoute>
                <ContentRoute path="/instagram/editinstagram/:id">
                    <Create
                        EmployeeID={EmployeeID}
                        BrokerID={BrokerID}
                        TransactionStatusID={TransactionStatusID}
                    />
                </ContentRoute>
                <ContentRoute path="/instagram/list">
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