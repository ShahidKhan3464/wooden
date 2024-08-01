import api from "../../../../api/index";

export function getYachts(brokerID, employeeID) {
  return api(`/api/transportation/GetTObjectList?brokerID=${brokerID}&tObjectTypeID=2&employeeID=${employeeID}`);
}

export function readAnYacht(rowId, employeeID, brokerID) {
  let url = `/api/transportation/GetATObject?transportationObjectID=${rowId}&employeeID=${employeeID}&brokerID=${brokerID}`;
  //let data = { ownerID: 14 };
  return api(url /*, data*/);
}

export function getDataFromAPIs(url) {
  return api(url);
}

export function createYacht(employeeID, brokerID, data) {
  let url = `/api/transportation/CreateATObject?employeeID=${employeeID}&brokerID=${brokerID}`;
  return api(url, data, "POST");
}

export function updateYacht(employeeID, brokerID, data) {
  let url = `/api/transportation/UpdateTransportationObject?brokerID=${brokerID}&employeeID=${employeeID}`;
  return api(url, data, "PUT");
}

export function deleteYacht(employeeID, transportationObjectID) {
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