import api from "../../../../../api";
import moment from "moment";
// if the role is not a regular agent I should path 0 for the assignedEmployeeId
// if role is regular agent assignedEmployeeId = EmployeeID
let year = "";
let month = "";
let brokerId = "";
let employeeID = "";
export const BROKERS_URI = "/api/brokers/GetAllEmployeesBooksByMonthByBroker?monthID=10&brokerID=1&employeeID=1";
const DASHBOARD_DATA_URI = "/api/brokers/GetDashboard?brokerID=1&month=12&year=2020&assignedEmployeeID=23&employeeID=6";
// Todo : these request data are hard coded needs to be changed
export function getEmployeesBooks() {
  return api(BROKERS_URI)
}

export function getDashboardData(){
  let month=moment().format("MM");
  let year=moment().format("Y");
  return api(`/api/brokers/GetDashboard?brokerID=1&month=${month}&year=${year}&assignedEmployeeID=23&employeeID=6`);
}
