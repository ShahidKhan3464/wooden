import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../../../_metronic/layout";
import List from "./pages/list";
import CreateInquiry from './pages/createInquiry';
import InquiriShared from './pages/inquiriShared';
import MachedProperties from './pages/machedProperties';
import CreateInquiryShare from './pages/createInquiryShare';
import InquiryMatchingProperty from './pages/inquiryMatchingProperty';

export default function inquiryPage({
    EmployeeID,
    BrokerID,
    TransactionStatusID,
    Leads,
    Zipcodes,
    Amenities,
}) {
    return (
        <Suspense fallback={<LayoutSplashScreen />}>
            <Switch>
                {
                    /* Redirect from eCommerce root URL to /customers */
                    <Redirect
                        exact={true}
                        from="/inquiry"
                        to="/inquiry/list"
                    />
                }
                <ContentRoute path="/inquiry/addnewinquiry">
                    <CreateInquiry
                        EmployeeID={EmployeeID}
                        BrokerID={BrokerID}
                        TransactionStatusID={TransactionStatusID}
                    />
                </ContentRoute>
                <ContentRoute path="/inquiry/createinquiryshare">
                    <CreateInquiryShare
                        EmployeeID={EmployeeID}
                        BrokerID={BrokerID}
                        TransactionStatusID={TransactionStatusID}
                    />
                </ContentRoute>
                <ContentRoute path="/inquiry/inquirymatchingproperty">
                    <InquiryMatchingProperty
                        EmployeeID={EmployeeID}
                        BrokerID={BrokerID}
                        TransactionStatusID={TransactionStatusID}
                    />
                </ContentRoute>
                <ContentRoute path="/inquiry/viewinquirydetail/:id">
                    <CreateInquiry
                        EmployeeID={EmployeeID}
                        BrokerID={BrokerID}
                        TransactionStatusID={TransactionStatusID}
                    />
                </ContentRoute>
                <ContentRoute path="/inquiry/editinquiry/:id">
                    <CreateInquiry
                        EmployeeID={EmployeeID}
                        BrokerID={BrokerID}
                        TransactionStatusID={TransactionStatusID}
                    />
                </ContentRoute>
                <ContentRoute path="/inquiry/list">
                    <List
                        EmployeeID={EmployeeID}
                        BrokerID={BrokerID}
                        TransactionStatusID={TransactionStatusID}

                    />
                </ContentRoute>
                <ContentRoute path="/inquiry/matchedProperties">
                    <MachedProperties
                        EmployeeID={EmployeeID}
                        BrokerID={BrokerID}
                        TransactionStatusID={TransactionStatusID}

                    />
                </ContentRoute>
                <ContentRoute path="/inquiry/inquiriShared">
                    <InquiriShared
                        EmployeeID={EmployeeID}
                        BrokerID={BrokerID}
                        TransactionStatusID={TransactionStatusID}

                    />
                </ContentRoute>
            </Switch>
        </Suspense>
    );
}