import store from "../redux/store";

export default function getEmployeeID() {
  return store.getState().auth.user.employeeID;
}
