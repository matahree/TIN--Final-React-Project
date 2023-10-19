import {getCurrentUser} from "../helpers/authHelper";

const rentsBaseUrl = 'http://localhost:3000/api/rents'

export function getRentsApiCall() {
    const promise = fetch(rentsBaseUrl)
    return promise;
}

export function getRentByIdApiCall(customerId) {
    const url = `${rentsBaseUrl}/${customerId}`;
    const promise = fetch(url);
    return promise;
}

export function addRentApiCall(rent) {
    const ordString = JSON.stringify(rent)
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: ordString
    }
    const promise = fetch(rentsBaseUrl, options);
    return promise;
}

export function updateRentApiCall(rentId, rent) {
    const url = `${rentsBaseUrl}/${rentId}`
    const ordString = JSON.stringify(rent)
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: ordString
    }
    const promise = fetch(url, options);
    return promise;
}

export function deleteRentApiCall(rentId) {
    const user = getCurrentUser()
    let token
    if (user && user.token) {
        token = user.token
    }
    const url = `${rentsBaseUrl}/${rentId}`
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }
    const promise = fetch(url, options);
    return promise;
}