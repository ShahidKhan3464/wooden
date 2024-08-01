import api from "../../../../api/index";
import getUserRoles from "../../../../api/getUserRoles";
import {randomPhoneNumber} from "@material-ui/x-grid-data-generator";

export function getPropertyCalendarEventResources(employeeID, brokerID) {
  return api(
    `/api/properties/GetPropertyCalendarEventResources?brokerID=${brokerID}&employeeID=${employeeID}`
  );
}

export function getPropertyCalendarEvents(employeeID) {
  return api(
    `/api/properties/GetPropertyCalendarEvents?propertyID=0&employeeID=${employeeID}`
  );
}

export function createQuickBook(data ,brokerID ,employeeID) {
  let url = `/api/inquiries/CreateQuickBook?brokerID=${brokerID}&employeeID=${employeeID}`;
  return api(url, data, "POST");
}

export function createQuickHold(data ,brokerID ,employeeID) {
  let url = `/api/inquiries/CreateQuickHold?brokerID=${brokerID}&employeeID=${employeeID}`;
  return api(url, data, "POST");
}

export function deleteCalenderEvent(data) {
  let url = `/api/inquiries/RemoveBookingsByInquiryID`;
  return api(url, data, "PUT");
}
export function deleteCalenderEventHolds(data) {
  let url = `/api/inquiries/RemoveHoldsByInquiryID`;
  return api(url, data, "PUT");
}

export function deactivateBlockedCalendarDates(data, employeeID) {
  let url = `/api/properties/DeactivateBlockedCalendarDates?employeeID=${employeeID}`;
  return api(url, data, "PUT");
}
