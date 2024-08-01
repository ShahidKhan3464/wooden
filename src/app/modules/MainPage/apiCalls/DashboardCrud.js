import api from "../../../../api/index";
import getUserRoles from "./../../../../api/getUserRoles";

export function getHoldsForAdminDashboard(
  employeeID,
  brokerID,
  role,
  holdStatusIDs
) {
  let url;
  //console.log(employeeID, brokerID, holdStatusIDs);

  if (role.includes("leadsAdmin") || role.includes("financeAdmin")) {
    url = `/api/inquiries/GetHoldsForAdminDashboard?brokerID=${brokerID}&employeeID=${employeeID}&holdStatusIDs=${holdStatusIDs}`;
  }

  if (role.includes("regularAgent")) {
    url = `/api/inquiries/GetApprovedHoldsForAgentDashboard?brokerID=${brokerID}&employeeID=${employeeID}&holdStatusIDs=${holdStatusIDs}`;
  }

  return api(url);
}

export function updatePropertyHoldStatus(employeeID, brokerID, data) {
  console.log(data);
  return api(
    `/api/inquiries/UpdatePropertyHoldStatus?brokerID=${brokerID}&employeeID=${employeeID}`,
    data,
    "PUT"
  );
}

export function deletePropertyHold(propertyHoldID, employeeID) {
  return api(
      `/api/inquiries/DeleteHold?propertyHoldID=${propertyHoldID}&employeeID=${employeeID}`,
      {},
      "DELETE"
  );
}

export function createBookings(data) {
  //console.log(data);
  return api(`/api/inquiries/CreateBookings`, data, "PUT");
}
