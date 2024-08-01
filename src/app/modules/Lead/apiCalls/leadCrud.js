import api from "../../../../api/index";
import getUserRoles from "./../../../../api/getUserRoles";

export function getLeads(employeeID, brokerID, transactionStatusID = 1) {
  let role = getUserRoles();
  let url;
  //console.log(employeeID, brokerID, transactionStatusID);
  if (role.includes("leadsAdmin")) {
    url = `/api/leads/GetAllLeadsAssignedToBroker?employeeID=${employeeID}`;
  }

  if (role.includes("regularAgent")) {
    url = `/api/leads/GetAllLeadsAssignedToEmployee?assignedEmployeeID=${employeeID}&brokerID=${brokerID}&transactionStatusID=${transactionStatusID}`;
  }

  return api(url);
}

export function readALead(employeeID, leadID) {
  return api(`/api/leads/GetALead?employeeID=${employeeID}&leadID=${leadID}`);
}

export function getDataFromAPIs(url) {
  return api(url);
}

export function createLead(employeeID, data) {
  let url = `/api/leads/CreateLeads?employeeID=${employeeID}&contactPreferenceTypeID=3`;
  console.log("url: ", url);
  console.log("data: ", data);
  return api(url, data, "POST");
}

export function updateLead(employeeID, brokerID, data) {
  let url = `/api/leads/UpdateLeadInfo?brokerID=${brokerID}&employeeID=${employeeID}&contactPreferenceTypeID=3`;
  console.log("url: ", url);
  console.log("data: ", data);
  return api(url, data, "PUT");
}

export function deleteLead() {
  //api(url, data, 'PUT');
}

export function contactPreferences(){
  return api(`/api/leads/GetContactPreferences`);
}
