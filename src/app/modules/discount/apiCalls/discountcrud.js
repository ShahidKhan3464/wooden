import api from "../../../../api/index";


export function httpGetPropertiesDiscount(discountrangeid , brokerId) {
    return api(`/api/properties/GetPropertyDiscounts?propertyDiscountDateRangeID=${discountrangeid}&brokerID=${brokerId}`);
}

export function httpGetPropertyDiscountDateRange(locationId , brokerId){
    return api(`/api/properties/GetPropertyDiscountDateRanges?locationID=${locationId}&brokerID=${brokerId}`);
}

export function httpCreatePropertyDiscount(employeeID) {
    return api(`}/api/properties/CreatePropertyDiscounts?employeeID=${employeeID}`);
}