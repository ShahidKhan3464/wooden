import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../../../_metronic/layout";
import List from "./pages/list";
import CreateLead from './pages/createLead';

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
}) {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from eCommerce root URL to /customers */
          <Redirect exact={true} from="/lead" to="/lead/list" />
        }
        <ContentRoute path="/lead/addnewlead">
          <CreateLead
            EmployeeID={EmployeeID}
            BrokerID={BrokerID}
            TransactionStatusID={TransactionStatusID}
            LeadVerificationStatuses={LeadVerificationStatuses}
            AssignedEmployees={AssignedEmployees}
            LeadSources={LeadSources}
            LeadProfessions={LeadProfessions}
            Countries={Countries}
            States={States}
          />
        </ContentRoute>
        <ContentRoute path="/lead/viewleaddetail/:id">
          <CreateLead
            EmployeeID={EmployeeID}
            BrokerID={BrokerID}
            TransactionStatusID={TransactionStatusID}
            LeadVerificationStatuses={LeadVerificationStatuses}
            AssignedEmployees={AssignedEmployees}
            LeadSources={LeadSources}
            LeadProfessions={LeadProfessions}
            Countries={Countries}
            States={States}
          />
        </ContentRoute>
        <ContentRoute path="/lead/editlead/:id">
          <CreateLead
            EmployeeID={EmployeeID}
            BrokerID={BrokerID}
            TransactionStatusID={TransactionStatusID}
            LeadVerificationStatuses={LeadVerificationStatuses}
            AssignedEmployees={AssignedEmployees}
            LeadSources={LeadSources}
            LeadProfessions={LeadProfessions}
            Countries={Countries}
            States={States}
          />
        </ContentRoute>
        <ContentRoute path="/lead/list">
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
          />
        </ContentRoute>
      </Switch>
    </Suspense>
  );
}
