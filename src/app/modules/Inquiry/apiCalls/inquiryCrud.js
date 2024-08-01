import api from "../../../../api/index";
import getUserRoles from "./../../../../api/getUserRoles";

export function getInquiries(employeeID, brokerID) {
  let role = getUserRoles();
  let url;
  //console.log(role);
  if (role.includes("leadsAdmin")) {
    url = `/api/inquiries/ViewAllInquiries?brokerID=${brokerID}&employeeID=${employeeID}`;
  }

  if (role.includes("regularAgent")) {
    url = `/api/brokers/GetRegularAgentActiveInquriesDashboard?brokerID=${brokerID}&employeeID=${employeeID}`;
  }

  return api(url);
}

export function readAnInquiry(employeeID, inquiryID) {
  return api(
    `/api/inquiries/GetAnInquiry?employeeID=${employeeID}&inquiryID=${inquiryID}`
  );
}

export function getAnInquiry() {
  //Todo : We Should get this from the server
  return api(`/api/properties/GetAmenities`);
}

export function getDataFromAPIs(url) {
  return api(url);
}

export function createInquiry(employeeID, brokerID, data) {
  let url = `/api/inquiries/CreateInquiries?brokerID=${brokerID}&employeeID=${employeeID}`;
  console.log("url: ", url);
  console.log("data: ", data);
  return api(url, data, "POST");
}

export function updateInquiry(employeeID, brokerID, data) {
  let url = `/api/inquiries/UpdateInquiryInfo?brokerID=${brokerID}&employeeID=${employeeID}`;
  console.log("url: ", url);
  console.log("data: ", data);
  return api(url, data, "PUT");
}

export function deleteInquiry(employeeID, propertyID) {
  let url = `/api/inquiries/DeleteInquiry`;
  console.log("url: ", url);
  //api(url, , 'DELETE');
}
