import api from "../../../../api/index";

export function getFeaturedProperties(brokerID, locationID) {
    return api(
        `/api/properties/GetFeaturedPropertiesByLocation?brokerID=${brokerID}&locationID=${locationID}`
    );
}


export function getProperties(brokerID, transactionStatusID) {
    return api(
        `/api/properties/ViewAllProperties?brokerID=${brokerID}&transactionStatusID=${transactionStatusID}`
    );
}

export function updateFeatureProperty(employeeID, data) {
    return api(`/api/properties/CreateFeaturedPropertiesByLocation?employeeID=${employeeID}`, data, "POST");
}

export function createFeaturedProperty(employeeID , data) {
    return api(`/api/properties/CreateFeaturedPropertiesByLocation?employeeID=${employeeID}` , data , 'POST' )
}