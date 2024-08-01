import React, { Suspense, lazy, useEffect, useState } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../_metronic/layout";
import { BuilderPage } from "./pages/BuilderPage";
import { MyPage } from "./pages/MyPage";
import DashboardPage from "./modules/MainPage/pages/DashboardPage";
import getBrokerID from "./../api/getBrokerID";
import getEmployeeID from "./../api/getEmployeeID";
import { useDispatch } from 'react-redux'
import {
  getLocations,
  getOwners,
  getAssignedEmployees,
  getPropertySearchTypes,
  getAmenities,
  getLeads,
  getLeadVerificationStatuses,
  getLeadSources,
  getLeadProfessions,
  getCountries,
  getStates,
  getZipcodes,
  getEmployeeTitles,
  getRoles,
} from "./../api/generalCrud";

import getUserRoles from "./../api/getUserRoles";
import { actions } from '../redux/basePageSlice'


const GoogleMaterialPage = lazy(() =>
  import("./modules/GoogleMaterialExamples/GoogleMaterialPage")
);
const ReactBootstrapPage = lazy(() =>
  import("./modules/ReactBootstrapExamples/ReactBootstrapPage")
);
const ECommercePage = lazy(() =>
  import("./modules/ECommerce/pages/eCommercePage")
);
const UserProfilePage = lazy(() =>
  import("./modules/UserProfile/UserProfilePage")
);

const PropertyList = lazy(() => import("./modules/Property/propertyPage"));
const FeaturedPropertyList = lazy(() => import("./modules/FeaturedProperty/featuredPropertyPage"));
const Discount = lazy(() => import("./modules/discount"));
const DiscountSetting = lazy(() => import('./modules/discountSetting/pages/discountPage'))
const InstagramPage = lazy(() => import("./modules/Instagram/InstagramPage"));
const ReviewsPage = lazy(() => import("./modules/Reviews/reviewsPage"));

const CalendarView = lazy(() =>
  import("./modules/CalendarView/CalendarViewPage")
);

const InquiryList = lazy(() => import("./modules/Inquiry/inquiryPage"));

const MatchedProperties = lazy(() =>
  import("./modules/MatchedProperties/MatchedPropertiesPage")
);

const InquiriesShares = lazy(() =>
  import("./modules/InquiriesShares/InquiriesSharesPage")
);

const NegotiatedAgentView = lazy(() =>
  import("./modules/NegotiatedAgentView/NegotiatedAgentViewPage")
);

const LeadList = lazy(() => import("./modules/Lead/leadPage"));

const OwnerList = lazy(() => import("./modules/Owner/ownerPage"));

const BrokerList = lazy(() => import("./modules/Broker/brokerPage"));

const ThirdPartyAgentsList = lazy(() => import("./modules/3rdPartyAgents/3rdpartyagentsPage"));

const EmployeeList = lazy(() => import("./modules/Employee/EmployeePage"));


const CarList = lazy(() => import("./modules/Car/carPage"));
const YachtList = lazy(() => import("./modules/Yacht/yachtPage"));



export default function BasePage() {
  const dispatch = useDispatch()
  const EmployeeID = getEmployeeID();
  const BrokerID = getBrokerID();
  // take care we are still using a static value for TransactionStatusID
  const TransactionStatusID = 1;
  const [Locations, setLocations] = useState(null);
  const [Owners, setOwners] = useState(null);
  const [AssignedEmployees, setAssignedEmployees] = useState(null);
  const [PropertySearchTypes, setPropertySearchTypes] = useState(null);
  const [Amenities, setAmenities] = useState(null);

  const [Leads, setLeads] = useState(null);

  const [LeadVerificationStatuses, setLeadVerificationStatuses] = useState(
    null
  );
  const [LeadSources, setLeadSources] = useState(null);
  const [LeadProfessions, setLeadProfessions] = useState(null);
  const [Countries, setCountries] = useState(null);
  const [States, setStates] = useState(null);

  const [Zipcodes, setZipcodes] = useState(null);

  const [EmployeeTitles, setEmployeeTitles] = useState(null);
  const [Roles, setRoles] = useState(null);

  let userRole = getUserRoles();

  useEffect(() => {
    getLocations(BrokerID)
      .then((data) => {
        dispatch(actions.locations(data.Data))
        setLocations(data.Data);
      })
      .catch((err) => {
        console.log(err);
      });
    getOwners(BrokerID)
      .then((data) => {
        dispatch(actions.owners(data.Data))
        setOwners(data.Data);
      })
      .catch((err) => {
        console.log(err);
      });
    getAssignedEmployees(BrokerID, EmployeeID)
      .then((data) => {
        dispatch(actions.assignedEmployees(data.Data))
        setAssignedEmployees(data.Data);
      })
      .catch((err) => {
        console.log(err);
      });
    getPropertySearchTypes()
      .then((data) => {
        dispatch(actions.allPropertySearchType(data.Data))
        setPropertySearchTypes(data.Data);
      })
      .catch((err) => {
        console.log(err);
      });
    getAmenities()
      .then((data) => {
        dispatch(actions.allAmenties(data.Data))
        setAmenities(data.Data);
      })
      .catch((err) => {
        console.log(err);
      });
    getLeads(EmployeeID, BrokerID, TransactionStatusID)
      .then((data) => {
        dispatch(actions.allLeads(data.Data))
        setLeads(data.Data);
      })
      .catch((err) => {
        console.log(err);
      });
    getLeadVerificationStatuses()
      .then((data) => {
        dispatch(actions.leadVarificationStatus(data.Data))
        setLeadVerificationStatuses(data.Data);
      })
      .catch((err) => {
        console.log(err);
      });
    getLeadSources()
      .then((data) => {
        dispatch(actions.leadsSources(data.Data))
        setLeadSources(data.Data);
      })
      .catch((err) => {
        console.log(err);
      });
    getLeadProfessions()
      .then((data) => {
        dispatch(actions.leadProfessions(data.Data))
        setLeadProfessions(data.Data);
      })
      .catch((err) => {
        console.log(err);
      });
    getCountries()
      .then((data) => {
        dispatch(actions.allCountries(data.Data))
        setCountries(data.Data);
      })
      .catch((err) => {
        console.log(err);
      });
    getStates()
      .then((data) => {
        dispatch(actions.allStates(data.Data))
        setStates(data.Data);
      })
      .catch((err) => {
        console.log(err);
      });
    getZipcodes(BrokerID)
      .then((data) => {
        dispatch(actions.allZipCodes(data.Data))
        setZipcodes(data.Data);
      })
      .catch((err) => {
        console.log(err);
      });

    if (userRole.includes("leadsAdmin")) {
      getEmployeeTitles()
        .then((data) => {
          dispatch(actions.employeeTitle(data.Data))
          setEmployeeTitles(data.Data);
        })
        .catch((err) => {
          console.log(err);
        });
      getRoles()
        .then((data) => {
          dispatch(actions.allRoles(data.Data))
          setRoles(data.Data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [BrokerID, EmployeeID]);
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from root URL to /dashboard. */
          <Redirect exact from="/" to="/dashboard" />
        }
        <ContentRoute path="/dashboard">
          <DashboardPage EmployeeID={1} BrokerID={1} />
        </ContentRoute>
        <ContentRoute path="/builder" component={BuilderPage} />
        <ContentRoute path="/my-page" component={MyPage} />
        <Route path="/google-material" component={GoogleMaterialPage} />
        <Route path="/react-bootstrap" component={ReactBootstrapPage} />
        <Route path="/e-commerce" component={ECommercePage} />
        <Route path="/user-profile" component={UserProfilePage} />
        <Route path="/property">
          <PropertyList
            EmployeeID={EmployeeID}
            BrokerID={BrokerID}
            TransactionStatusID={TransactionStatusID}
            Locations={Locations}
            Owners={Owners}
            AssignedEmployees={AssignedEmployees}
            PropertySearchTypes={PropertySearchTypes}
            Amenities={Amenities}
          />
        </Route>
        <Route path="/featuredproperties">
          <FeaturedPropertyList
            EmployeeID={EmployeeID}
            BrokerID={BrokerID}
            TransactionStatusID={TransactionStatusID}
            Locations={Locations}
            Owners={Owners}
            AssignedEmployees={AssignedEmployees}
            PropertySearchTypes={PropertySearchTypes}
            Amenities={Amenities}
          />
        </Route>
        <Route path="/discounts">
          <Discount
            EmployeeID={EmployeeID}
            BrokerID={BrokerID}
            TransactionStatusID={TransactionStatusID}
            Locations={Locations}
            Owners={Owners}
            AssignedEmployees={AssignedEmployees}
            PropertySearchTypes={PropertySearchTypes}
            Amenities={Amenities}
          />
        </Route>
        <Route path="/discountSetting">
          <DiscountSetting
            EmployeeID={EmployeeID}
            BrokerID={BrokerID}
            TransactionStatusID={TransactionStatusID}
            Locations={Locations}
            Owners={Owners}
            AssignedEmployees={AssignedEmployees}
            PropertySearchTypes={PropertySearchTypes}
            Amenities={Amenities}
          />
        </Route>
        <Route path="/instagram">
          <InstagramPage
            EmployeeID={EmployeeID}
            BrokerID={BrokerID}
            TransactionStatusID={TransactionStatusID}
          />
        </Route>
        <Route path="/reviews">
          <ReviewsPage
            EmployeeID={EmployeeID}
            BrokerID={BrokerID}
            TransactionStatusID={TransactionStatusID}
          />
        </Route>
        <Route path="/car">
          <CarList
            EmployeeID={EmployeeID}
            BrokerID={BrokerID}
            TransactionStatusID={TransactionStatusID}
          />
        </Route>
        <Route path="/yacht">
          <YachtList
            EmployeeID={EmployeeID}
            BrokerID={BrokerID}
            TransactionStatusID={TransactionStatusID}
          />
        </Route>
        <Route path="/CalendarView">
          <CalendarView EmployeeID={EmployeeID} BrokerID={BrokerID} />
        </Route>
        <Route path="/inquiry">
          <InquiryList
            EmployeeID={EmployeeID}
            BrokerID={BrokerID}
            TransactionStatusID={TransactionStatusID}
            Leads={Leads}
            Zipcodes={Zipcodes}
            Amenities={Amenities}
          />
        </Route>
        <Route
          path="/MatchedProperties"
          component={() => (
            <MatchedProperties EmployeeID={EmployeeID} BrokerID={BrokerID} />
          )}
        />
        <Route
          path="/InquiriesShares"
          component={() => (
            <InquiriesShares EmployeeID={EmployeeID} BrokerID={BrokerID} />
          )}
        />

        <Route
          path="/NegotiatedAgentView"
          component={() => (
            <NegotiatedAgentView EmployeeID={EmployeeID} BrokerID={BrokerID} />
          )}
        />
        <Route path="/lead">
          <LeadList
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
        </Route>
        <Route path="/owner">
          <OwnerList
            EmployeeID={EmployeeID}
            BrokerID={BrokerID}
            TransactionStatusID={TransactionStatusID}
            Countries={Countries}
            States={States}
          />
        </Route>

        <Route path="/broker">
          <BrokerList
            EmployeeID={EmployeeID}
            BrokerID={BrokerID}
          />
        </Route>

        <Route path="/3rd-party-agents">
          <ThirdPartyAgentsList
            EmployeeID={EmployeeID}
            BrokerID={BrokerID}
          />
        </Route>

        {/* <Route path="/broker" component={brokerList} /> */}
        {/* <Route path="/3rd-party-agents" component={ThirdPartyAgentsList} /> */}
        <Route path="/Employee">
          <EmployeeList
            EmployeeID={EmployeeID}
            BrokerID={BrokerID}
            TransactionStatusID={TransactionStatusID}
            EmployeeTitles={EmployeeTitles}
            Countries={Countries}
            States={States}
            Roles={Roles}
          />
        </Route>
        <Redirect to="error/error-v1" />
      </Switch>
    </Suspense>
  );
}
