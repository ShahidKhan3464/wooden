import api from '../../../../api/index';

export function get3rdPartyAgents(brokerID, employeeID) {
  // let employeeID = 6;
  // let brokerID = 1;
  return api(`/api/brokers/GetMy3rdPartyCommissionAgents?brokerID=${brokerID}&employeeID=${employeeID}`);
}

export function read3rdPartyAgent(employeeID, brokerID) {
  // let brokerID = 1;
  return api(`/api/brokers/GetMy3rdPartyCommissionAgents?brokerID=${brokerID}&employeeID=${employeeID}`);
}

export function create3rdPartyAgent(brokerID, data) {
  console.log("3rd party agent", brokerID, data);
  let employeeID = 6;
  return api(`/api/brokers/CreateMy3rdPartyCommissionAgent?employeeID=${employeeID}`,data, "POST" );
}

export function updateMy3rdPartyAgent(employeeID, data) {
  // console.log("3rd party agent", brokerID, data);
  // let employeeID = 44;
  return api(`/api/brokers/UpdateMy3rdPartyCommissionAgent?employeeID=${employeeID}`, data, "PUT" );
}

export function GetAvailable3rdPartyCommissionAgents(brokerID, employeeID) {
  // let employeeID = 6;
  // let brokerID = 1;
  return api(`/api/brokers/GetAvailable3rdPartyCommissionAgents?brokerID=${brokerID}&employeeID=${employeeID}`)
}

export function GetPropertyCategoryTypes () {
  return api (`/api/properties/GetPropertyCategoryTypes`)
}