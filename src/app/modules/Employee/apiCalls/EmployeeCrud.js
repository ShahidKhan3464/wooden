import api from "../../../../api/index";

export function getEmployees(employeeID, brokerID, transactionStatusID) {
  return api(
    "/api/brokers/GetAllEmployeesAssignedToBroker?brokerID=" +
      brokerID +
      "&transactionStatusID=" +
      transactionStatusID +
      "&employeeID=" +
      employeeID
  );
}

export function readAnEmployee(employeeID, wantedEmployeeID) {
  return api(
    `/api/brokers/GetAnEmployee?employeeID=${employeeID}&getEmployeeID=${wantedEmployeeID}`
  );
}

export function getDataFromAPIs(url) {
  return api(url);
}

export function getPropertyCategoryTypes() {
  return api(`/api/properties/GetPropertyCategoryTypes`);
}

export function getCommissionRateTypes() {
  return api(`/api/appmetrics/GetCommissionRateTypes`);
}

export function createEmployee(employeeID, data) {
  let url = `/api/brokers/CreateEmployees?employeeID=${employeeID}`;
  console.log("url: ", url);
  console.log("data: ", data);
  return api(url, data, "POST");
}

export function updateEmployee(employeeID, brokerID, data) {
  let url = `/api/brokers/UpdateEmployeeInfo?brokerID=${brokerID}&employeeID=${employeeID}`;
  console.log("url: ", url);
  console.log("data: ", data);
  return api(url, data, "PUT");
}

export function deleteEmployee(employeeID, propertyID) {
  let url = ``;
  console.log("url: ", url);
  //api(url, , 'DELETE');
}
