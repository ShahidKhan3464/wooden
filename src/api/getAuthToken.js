import store from "../redux/store";

export default function getAuthToken() {
  return store.getState().auth.authToken;
}
