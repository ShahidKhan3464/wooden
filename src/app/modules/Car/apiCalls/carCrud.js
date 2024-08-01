import api from "../../../../api/index";

export function getCars(brokerID, employeeID) {
  return api(`/api/transportation/GetTObjectList?brokerID=${brokerID}&tObjectTypeID=1&employeeID=${employeeID}`);
}

export function readAnCar(rowId, employeeID, brokerID) {
  let url = `/api/transportation/GetATObject?transportationObjectID=${rowId}&employeeID=${employeeID}&brokerID=${brokerID}`;
  //let data = { ownerID: 14 };
  return api(url /*, data*/);
}

export function getDataFromAPIs(url) {
  return api(url);
}

export function createCar(employeeID, brokerID, data) {
  let url = `/api/transportation/CreateATObject?employeeID=${employeeID}&brokerID=${brokerID}`;
  return api(url, data, "POST");
}

export function updateCar(employeeID, brokerID, data) {
  let url = `/api/transportation/UpdateTransportationObject?employeeID=${employeeID}&brokerID=${brokerID}`;
  return api(url, data, "PUT");
}

export function deleteCar(employeeID, transportationObjectID) {
  let url = `/api/transportation/DeleteTransportationObject?employeeID=${employeeID}&transportationObjectID=${transportationObjectID}`;
  //console.log("url: ", url);
  api(url,'DELETE');
}

export function GetTransportationTypesData(brokerID, TransactionStatusID) {
  return api(`/api/transportation/GetTransportationTypesData?brokerID=${brokerID}&objectTypeID=1&locationID=3&transactionStatusID=${TransactionStatusID}`);
}

export function UpdateTransportationSecondaryImages(employeeID, data) {
  return api(`/api/transportation/UpdateTransportationObjectSecondaryImages?employeeID=${employeeID}`, data, "PUT");
}
