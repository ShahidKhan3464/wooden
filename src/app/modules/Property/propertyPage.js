import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";

import { LayoutSplashScreen, ContentRoute } from "../../../_metronic/layout";
import List from "./pages/list";
import ParticularProductDetail from "./pages/particularProductDetail";
import AddProperty from "./pages/addProperty";

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
          <Redirect exact={true} from='/property' to='/property/list' />
        }
        <ContentRoute path='/property/propertyDetail/:propertyIdParam/:transactionIdParam'>
          <AddProperty
            BrokerID={BrokerID}
            EmployeeID={EmployeeID}
            TransactionStatusID={TransactionStatusID}
          />
        </ContentRoute>
        <ContentRoute path='/property/propertycalender/:propertyIdParam/:transactionIdParam'>
          <ParticularProductDetail />
        </ContentRoute>
        <ContentRoute path='/property/editProperty/:id'>
          <AddProperty
            BrokerID={BrokerID}
            EmployeeID={EmployeeID}
            TransactionStatusID={TransactionStatusID}
          />
        </ContentRoute>
        <ContentRoute path='/property/list'>
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
        <ContentRoute path='/property/addProperty'>
          <AddProperty
            BrokerID={BrokerID}
            EmployeeID={EmployeeID}
            TransactionStatusID={TransactionStatusID}
          />
        </ContentRoute>
      </Switch>
    </Suspense>
  );
}

export default PropertyPage;
