import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../../../_metronic/layout";
import List from "./pages/list_";
import CreateEmployee from './pages/createEmployee'

export default function propertyPage({
    EmployeeID,
    BrokerID,
    TransactionStatusID,
    EmployeeTitles,
    Countries,
    States,
    Roles,
}) {
    return (
        <Suspense fallback={<LayoutSplashScreen />}>
            <Switch>
                {
                    /* Redirect from eCommerce root URL to /customers */
                    <Redirect
                        exact={true}
                        from="/Employee"
                        to="/Employee/list"
                    />
                }
                <ContentRoute path="/Employee/addnewemployee">
                    <CreateEmployee
                        EmployeeID={EmployeeID}
                        BrokerID={BrokerID}
                        TransactionStatusID={TransactionStatusID}
                        EmployeeTitles={EmployeeTitles}
                        Countries={Countries}
                        States={States}
                        Roles={Roles}
                    />
                </ContentRoute>
                <ContentRoute path="/Employee/viewemployeedetail/:id">
                    <CreateEmployee
                        EmployeeID={EmployeeID}
                        BrokerID={BrokerID}
                        TransactionStatusID={TransactionStatusID}
                        EmployeeTitles={EmployeeTitles}
                        Countries={Countries}
                        States={States}
                        Roles={Roles}
                    />
                </ContentRoute>
                <ContentRoute path="/Employee/editemployee/:id">
                    <CreateEmployee
                        EmployeeID={EmployeeID}
                        BrokerID={BrokerID}
                        TransactionStatusID={TransactionStatusID}
                        EmployeeTitles={EmployeeTitles}
                        Countries={Countries}
                        States={States}
                        Roles={Roles}
                    />
                </ContentRoute>
                <ContentRoute path="/Employee/list">
                    <List
                        EmployeeID ={EmployeeID}
                        BrokerID ={BrokerID}
                        TransactionStatusID ={TransactionStatusID}
                        EmployeeTitles={EmployeeTitles}
                        Countries={Countries}
                        States={States}
                        Roles={Roles}
                    />
                </ContentRoute>
            </Switch>
        </Suspense>
    );
}