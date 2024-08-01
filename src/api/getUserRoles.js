import store from "../redux/store";

export default function getUserRoles() {
  return store.getState().auth.user.roles;
}
