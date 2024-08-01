import api from "./index";
import getUserRoles from "./getUserRoles";
export function getCitiesByLocation(locationID) {
  let url = `/api/properties/GetPropertyCitiesByLocation?locationID=${locationID}`;
  return api(url);
}

export function getZipCodesByCity(cityID) {
  let url = `/api/properties/GetPropertyZipCodesByCity?cityID=${cityID}`;
  return api(url);
}

export function getLocations(brokerID) {
  return api(`/api/properties/GetLocations?brokerID=${brokerID}`);
}

export function getOwners(brokerID) {
  return api(`/api/brokers/GetOwnersABrokerCanEdit?brokerID=${brokerID}`);
}

export function getAssignedEmployees(brokerID, employeeID) {
  let transactionStatusID = 1;
  return api(
    `/api/brokers/GetAllEmployeesAssignedToBroker?brokerID=${brokerID}&transactionStatusID=${transactionStatusID}&employeeID=${employeeID}`
  );
}

export function getPropertySearchTypes() {
  return api(`/api/properties/GetPropertySearchTypes`);
}

export function getAmenities() {
  return api(`/api/properties/GetAmenities`);
}

export function getLeads(employeeID, brokerID, transactionStatusID) {
  let roles = getUserRoles(); /* regularAgent or leadsAdmin */ /*'leadsAdmin'*/
  let url;
  if (roles === "regularAgent") {
    url = `/api/leads/GetAllLeadsAssignedToEmployee?assignedEmployeeID=${employeeID}&brokerID=${brokerID}&transactionStatusID=${transactionStatusID}`;
  } else {
    url = `/api/leads/GetAllLeadsAssignedToBroker?employeeID=${employeeID}`;
  }
  return api(url);
}

export function getLeadVerificationStatuses() {
  return api(`/api/leads/GetLeadVerificationStatuses`);
}

export function getLeadSources() {
  return api(`/api/leads/GetLeadSources`);
}

export function getLeadProfessions() {
  return api(`/api/leads/GetLeadProfessions`);
}

export function getCountries() {
  return api(`/api/brokers/GetAllCountries`);
}

export function getStates() {
  return api(`/api/brokers/GetAllStates?countryID=1`);
}

export function getZipcodes(brokerID) {
  return api(`/api/brokers/GetPostal?brokerID=${brokerID}`);
}

export function getEmployeeTitles() {
  return api(`/api/brokers/GetEmployeeTitles`);
}

export function getRoles() {
  return api(`/api/brokers/GetRoles`);
}
