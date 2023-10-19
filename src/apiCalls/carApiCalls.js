
import {getCurrentUser} from "../helpers/authHelper";

const carsBaseUrl = 'http://localhost:3000/api/cars'

export function getCarsApiCall() {
    const promise = fetch(carsBaseUrl)
    return promise;
}

export function getCarByIdApiCall(carId) {
    const url = `${carsBaseUrl}/${carId}`;
    const promise = fetch(url);
    return promise;
}

export function addCarApiCall(car) {
    console.log(car)
    const user = getCurrentUser()
    const empString = JSON.stringify(car)
    let token
    if (user && user.token) {
        token = user.token
    }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: empString
    }
    const promise = fetch(carsBaseUrl, options);
    return promise;
}

export function updateCarApiCall(carId, car) {
    const user = getCurrentUser()
    const url = `${carsBaseUrl}/${carId}`
    const carString = JSON.stringify(car)
    let token
    if (user && user.token) {
        token = user.token
    }

    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: carString
    }
    const promise = fetch(url, options);
    return promise;
}

export function deleteCarApiCall(carId) {
    const user = getCurrentUser()
    let token
    if (user && user.token) {
        token = user.token
    }
    const url = `${carsBaseUrl}/${carId}`
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