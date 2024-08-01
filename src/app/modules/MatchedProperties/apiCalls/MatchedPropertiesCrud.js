import api from "../../../../api/index";
import getAuthToken from "./../../../../api/getAuthToken";

export function getMatchedProperties(employeeID, brokerID, inquiryID) {
  return api(
    `/api/inquiries/MatchedInquiries?brokerID=${brokerID}&employeeID=${employeeID}&inquiryID=${inquiryID}&fuzzyDays=0&fuzzyGuests=0`,
    null,
    "PUT"
  );
}

export function createInquiriesShare(employeeID, data) {
  return fetchData(
    `/api/inquiries/CreateInquiryShares?employeeID=${employeeID}`,
    data,
    "POST"
  );
}

async function fetchData(url = "", data = {}, method) {
  const authToken = getAuthToken();
  const base_url = process.env.REACT_APP_MAIN_URL;

  const response = await fetch(base_url + url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + authToken,
    },
    body: JSON.stringify(data),
  });
  return response;
}
