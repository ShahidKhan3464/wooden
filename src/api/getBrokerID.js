import store from "../redux/store";

export default function getBrokerID() {
    return store.getState().auth.user.brokerID;
}
