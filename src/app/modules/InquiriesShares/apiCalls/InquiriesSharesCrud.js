import api from "../../../../api/index";

export function getInquiryShares(inquiryID, employeeID) {
  //inquiryID = 1031;
  //console.log(inquiryID, employeeID);
  return api(
    `/api/inquiries/GetInquirySharesList?inquiryID=${inquiryID}&employeeID=${employeeID}`
  );
}

export function getInquiryShareViews(shareID, employeeID) {
  return api(
    `/api/inquiries/ViewInquiryShares?shareID=${shareID}&employeeID=${employeeID}`
  );
}

//export function updatePropertyHoldStatus(employeeID, brokerID, data) {
//  //console.log(data);
//  return api(
//    `/api/inquiries/UpdatePropertyHoldStatus?brokerID=${brokerID}&employeeID=${employeeID}`,
//    data,
//    "PUT"
//  );
//}

export function createHolds(data) {
  //console.log(data);
  return api(`/api/inquiries/CreateHolds`, data, "PUT");
}
