import api from "../../../../api/index";

export function createDiscountRange(employeeID , data) {
    return api(`/api/properties/CreatePropertyDiscountDateRange?employeeID=${employeeID}` , data , 'PUT');
}

export function getDiscountRange(locationID, brokerID) {
    return api(`/api/properties/GetPropertyDiscountDateRanges?locationID=${locationID}&brokerID=${brokerID}`, 'GET');
}
export function updatePropertyDiscountRange(employeeId, data) {
    return api(`/api/properties/UpdatePropertyDiscountDateRange?employeeID=${employeeId}`, data, 'PUT')
}