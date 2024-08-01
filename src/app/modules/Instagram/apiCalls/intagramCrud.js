import api from "../../../../api/index";




export function getAnInstagram(employeeID, brokerID) {
    return api(
        `/api/brokers/GetAllBrokerInstagrams?brokerID=${brokerID}&employeeID=${employeeID}`
    );
}


export function createInstagram(employeeID, data) {
    return api(
        `/api/Brokers/CreateBrokerInstagrams?employeeID=${employeeID}`, data, "POST"
    );
}

export function updateInstagram(employeeID, data) {
    return api(
        `/api/Brokers/UpdateBrokerInstagram?employeeID=${employeeID}`, data, "PUT"
    );
}