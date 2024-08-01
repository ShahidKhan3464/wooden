import api from "../../../../api/index";
import getAuthToken from "./../../../../api/getAuthToken";

export function getProperties(brokerID, transactionStatusID) {
  return api(
    `/api/properties/ViewAllProperties?brokerID=${brokerID}&transactionStatusID=${transactionStatusID}`
  );
}

export function readAProperty(id) {
  return api(`/api/properties/ViewAProperty?propertyID=${id}`);
}

export function getAllBedTypes() {
  return api('/api/properties/GetAllBedTypes')
}

export function getPropertyCalendarEvents(propertyID, employeeID) {
  return api(
    `/api/properties/GetPropertyCalendarEvents?propertyID=${propertyID}&employeeID=${employeeID}`
  );
}

export function createProperty(employeeID, data) {
  let url = `/api/properties/CreateProperties?employeeID=${employeeID}`;
  console.log(url, data);
  return api(url, data, "POST", true);
}

export function getAllSecondaryImages(propertyID) {
  let url = `/api/properties/GetAPropertiesSecondaryImages?propertyID=${propertyID}`;
  return api(url, "GET");
}

export function updateProperty(employeeID, brokerID, data) {
  let url = `/api/properties/UpdatePropertyInfo?brokerID=${brokerID}&employeeID=${employeeID}`;
  return api(url, data, "PUT");
}

export function updatePropertySecondaryImages(employeeID, data) {
  let url = `/api/properties/UpdatePropertySecondaryImages?employeeID=${employeeID}`;
  return api(url, data, "PUT");
}

export function createBlockedCalendarDates(employeeID, data) {
  let url = `/api/properties/CreateBlockedCalendarDates?employeeID=${employeeID}`;
  return fetchData(url, data, "PUT");
}

export function updatePropertyPrice(employeeID, data) {
  let url = `/api/properties/UpdatePropertyDailyPrices?employeeID=${employeeID}`;
  return api(url, data, "PUT");
}
export function getPropertyCategoryTypes() {
  return api(`/api/properties/GetPropertyCategoryTypes`);
}

async function fetchData(url = "", data = {}, method) {
  const authToken = getAuthToken();
  const base_url = process.env.REACT_APP_MAIN_URL;

  const response = await fetch(base_url + url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + authToken,
    },
    body: JSON.stringify(data),
  });
  return response;
}

/* ******************************************* */
/* ******************************************* */
/* ******************************************* */
/* ******************************************* */
/* ******************************************* */

export function getDataFromAPIs(url) {
  return api(url);
}

export function deleteProperty(employeeID, propertyID) {
  let url = `/api/properties/DeleteProperty?propertyID=${propertyID}&employeeID=${employeeID}`;
  return api(url, null, 'DELETE');
  
}

// ********************************************//
export function GetAvailableBuyerAgents() {
  const propertyID = 17;
  const employeeID = 6;
  return api(`/api/brokers/GetAvailableBuyerAgents?propertyID=${propertyID}&employeeID=${employeeID}`);
}

export function GetBuyersAgentsForThisProperty() {
  const propertyID = 17;
  const employeeID = 6;
  return api(`/api/brokers/GetBuyersAgentsForThisProperty?propertyID=${propertyID}&employeeID=${employeeID}`);
}


export function updateFeatureProperty(employeeID, data) {
  return api(`/api/properties/CreateFeaturedPropertiesByLocation?employeeID=${employeeID}`, data, "POST");
}

export function getPropertySearchTypes(){
  return api('/api/properties/GetPropertySearchTypes' , 'GET')
}

export function getAllImageCategoryByProperty(propertyID , brokerID) {
  return api(`/api/properties/GetAllImageCategoriesByProperty?propertyID=${propertyID}&brokerID=${brokerID}`)
}