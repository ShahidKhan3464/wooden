import api from "../../../../api/index";

export function GetAPropertyDetails(propertyID, name) {

    return api(
        `/api/properties/GetAPropertyDetails?propertyID=${propertyID}&propertyFriendlyName=${name}`
    );
}


export function ViewAProperty(propertyID) {
    return api(
        `/api/properties/ViewAProperty?propertyID=${propertyID}`
    );
}

export function GetMy3rdPartyCommissionAgents(propertyID) {
    return api(
        `/api/brokers/GetMy3rdPartyCommissionAgents?brokerID=1&employeeID=6`
    );
}

export function createNegotiatedBookings(data, brokerID, employeeID) {
    return api(`/api/inquiries/CreateNegotiatedBookings?brokerID=${brokerID}&employeeID=${employeeID}`, data, "POST");
}