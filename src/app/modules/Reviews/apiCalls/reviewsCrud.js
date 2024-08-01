import api from "../../../../api/index";




export function getAnReviews(employeeID, brokerID) {
    return api(
        `/api/brokers/GetAllBrokerReviews?brokerID=${brokerID}&employeeID=${employeeID}`
    );
}


export function createReview(employeeID, data) {
    return api(
        `/api/Brokers/CreateBrokerReviews?employeeID=${employeeID}`, data, "POST"
    );
}

export function updateReview(employeeID, data) {
    return api(
        `/api/Brokers/UpdateBrokerReview?employeeID=${employeeID}`, data, "PUT"
    );
}