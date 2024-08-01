import api from '../../../../api/index';

export function getBrokers() {
  let employeeID = 2 ;
  return api(`/api/brokers/GetAllBrokers?employeeID=${employeeID}`);
}

export function getBrokersByEmployee(employeeID) {
  return api(`/api/brokers/GetAllBrokers?employeeID=${employeeID}`);
}

export function readABroker(brokerID, employeeID) {
  return api(`/api/brokers/GetABroker?brokerID=${brokerID}&employeeID=${employeeID}`);
}

export function getDataFromAPIs(url) {
  return api(url);
}

export function createBroker(employeeID, brokerID, data){

  return api(`/api/brokers/CreateBrokers?employeeID=${employeeID}`,data, "POST")
}

export function updateBroker(employeeID, brokerID, data){
  
  return api(`/api/brokers/UpdateBrokerInfo?employeeID=${employeeID}`,data, "PUT")
}

export function deleteBroker(employeeID, propertyID){
  let url = ``;
  console.log("url: ", url);
  //api(url, , 'DELETE');
}