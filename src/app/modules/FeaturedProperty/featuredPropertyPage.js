import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";

import { LayoutSplashScreen, ContentRoute } from "../../../_metronic/layout";
import List from "./pages/list";

function PropertyPage({
    BrokerID,
    EmployeeID,
    TransactionStatusID,
    Locations,
    Owners,
    AssignedEmployees,
    PropertySearchTypes,
    Amenities,
}) {
    return (
        <Suspense fallback={<LayoutSplashScreen />}>
            <Switch>
                {
                    /* Redirect from eCommerce root URL to /customers */
                    <Redirect exact={true} from='/featuredproperties' to='/featuredproperties/list' />
                }
                <ContentRoute path='/featuredproperties/list'>
                    <List
                        BrokerID={BrokerID}
                        EmployeeID={EmployeeID}
                        TransactionStatusID={TransactionStatusID}
                        Locations={Locations}
                        Owners={Owners}
                        AssignedEmployees={AssignedEmployees}
                        PropertyContentRouteSearchTypes={PropertySearchTypes}
                        Amenities={Amenities}
                    />
                </ContentRoute>
          
            </Switch>
        </Suspense>
    );
}

export default PropertyPage;
