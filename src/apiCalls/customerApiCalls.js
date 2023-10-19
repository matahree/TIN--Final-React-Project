
import {getCurrentUser} from "../helpers/authHelper";
const customersBaseUrl = 'http://localhost:3000/api/customers'

export function getCustomersApiCall() {
    const promise = fetch(customersBaseUrl)
    return promise;
}

 export function getCustomerByIdApiCall(customerId) {
     const url = `${customersBaseUrl}/${customerId}`;
     const promise = fetch(url);
     return promise;
 }

export function addCustomerApiCall(customer) {
    const currentUser = getCurrentUser();
    console.log(customer);
    const customerString = JSON.stringify(customer)
    let token;
    if(currentUser && currentUser.token){
        token = customer.token;
    }
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
        },
        body: customerString,
    }
    const promise = fetch(customersBaseUrl, options);
    return promise;
}

export function updateCustomerApiCall(customerId, customer) {
    const url = `${customersBaseUrl}/${customerId}`
    const customerString = JSON.stringify(customer)
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: customerString
    }
    const promise = fetch(url, options);
    return promise;
}

export function deleteCustomerByIdApiCall(customerId) {
    const promise = fetch(`${customersBaseUrl}/${customerId}`, { method: 'DELETE' });
    return promise;
}

export function deleteCustomerApiCall(customerId) {
    const user = getCurrentUser()
    let token
    if (user && user.token) {
        token = user.token
    }
    const url = `${customersBaseUrl}/${customerId}`
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