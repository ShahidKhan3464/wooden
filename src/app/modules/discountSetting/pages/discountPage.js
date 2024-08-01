import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../../../../_metronic/layout";
import List from "./list";
import CreateDiscount from './create';

export default function propertyPage({
    EmployeeID,
    BrokerID,
    TransactionStatusID,
    LeadVerificationStatuses,
    AssignedEmployees,
    LeadSources,
    LeadProfessions,
    Countries,
    States,
    Locations
}) {
    return (
        <Suspense fallback={<LayoutSplashScreen />}>
            <Switch>
                {
                    /* Redirect from eCommerce root URL to /customers */
                    <Redirect exact={true} from="/discountSetting" to="/discountSetting/list" />
                }
                <ContentRoute path="/discountSetting/create">
                    <CreateDiscount
                        EmployeeID={EmployeeID}
                        BrokerID={BrokerID}
                        TransactionStatusID={TransactionStatusID}
                        LeadVerificationStatuses={LeadVerificationStatuses}
                        AssignedEmployees={AssignedEmployees}
                        LeadSources={LeadSources}
                        LeadProfessions={LeadProfessions}
                        Countries={Countries}
                        States={States}
                        Locations={Locations}
                    />
                </ContentRoute>
                <ContentRoute path="/discountSetting/viewDiscountdetail/:id">
                    <CreateDiscount
                        EmployeeID={EmployeeID}
                        BrokerID={BrokerID}
                        TransactionStatusID={TransactionStatusID}
                        LeadVerificationStatuses={LeadVerificationStatuses}
                        AssignedEmployees={AssignedEmployees}
                        LeadSources={LeadSources}
                        LeadProfessions={LeadProfessions}
                        Countries={Countries}
                        States={States}
                        Locations={Locations}
                    />
                </ContentRoute>
                <ContentRoute path="/discountSetting/editDiscount/:id">
                    <CreateDiscount
                        EmployeeID={EmployeeID}
                        BrokerID={BrokerID}
                        TransactionStatusID={TransactionStatusID}
                        LeadVerificationStatuses={LeadVerificationStatuses}
                        AssignedEmployees={AssignedEmployees}
                        LeadSources={LeadSources}
                        LeadProfessions={LeadProfessions}
                        Countries={Countries}
                        States={States}
                        Locations={Locations}
                    />
                </ContentRoute>
                <ContentRoute path="/discountSetting/list">
                    <List
                        EmployeeID={EmployeeID}
                        BrokerID={BrokerID}
                        TransactionStatusID={TransactionStatusID}
                        LeadVerificationStatuses={LeadVerificationStatuses}
                        AssignedEmployees={AssignedEmployees}
                        LeadSources={LeadSources}
                        LeadProfessions={LeadProfessions}
                        Countries={Countries}
                        States={States}
                        Locations={Locations}
                    />
                </ContentRoute>
            </Switch>
        </Suspense>
    );
}
