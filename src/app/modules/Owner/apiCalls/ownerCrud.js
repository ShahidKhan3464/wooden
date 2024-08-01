import api from "../../../../api/index";

export function getOwners(brokerID) {
  return api(`/api/brokers/GetOwnersABrokerCanEdit?brokerID=${brokerID}`);
}

export function readAnOwner(employeeID, ownerID) {
  let url = `/api/brokers/GetAnOwner?employeeID=${employeeID}&ownerID=${ownerID}`;
  //let data = { ownerID: 14 };
  return api(url /*, data*/);
}

export function getDataFromAPIs(url) {
  return api(url);
}

export function createOwner(employeeID, data) {
  let url = `/api/brokers/CreateOwners?employeeID=${employeeID}`;
  console.log("url: ", url);
  console.log("data: ", data);
  return api(url, data, "POST");
}

export function updateOwner(employeeID, brokerID, data) {
  let url = `/api/brokers/UpdateOwnerInfo?brokerID=${brokerID}&employeeID=${employeeID}`;
  console.log("url: ", url);
  console.log("data: ", data);
  return api(url, data, "PUT");
}

export function deleteOwner(employeeID, ownerID) {
  let url = `/api/brokers/DeleteOwner?ownerID=${ownerID}&keepProperties=false&employeeID=${employeeID}`;
  /// it's showing error unothorized 401
  return api(url, null , 'DELETE');
}
