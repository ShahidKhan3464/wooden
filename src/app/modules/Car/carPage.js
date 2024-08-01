import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../../../_metronic/layout";
import List from "./pages/list";
import CreateCar from './pages/create'

export default function carPage({
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
                        from="/car"
                        to="/car/list"
                    />
                }
                <ContentRoute path="/car/addNewCar">
                    <CreateCar
                        EmployeeID={EmployeeID}
                        BrokerID={BrokerID}
                        TransactionStatusID={TransactionStatusID}
                    />
                </ContentRoute>
                <ContentRoute path="/car/viewCarDetail/:id">
                    <CreateCar
                        EmployeeID={EmployeeID}
                        BrokerID={BrokerID}
                        TransactionStatusID={TransactionStatusID}
                    />
                </ContentRoute>
                <ContentRoute path="/car/editCar/:id">
                    <CreateCar
                        EmployeeID={EmployeeID}
                        BrokerID={BrokerID}
                        TransactionStatusID={TransactionStatusID}
                    />
                </ContentRoute>
                <ContentRoute path="/car/list">
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