import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import {deleteCustomerApiCall, getCustomersApiCall} from '../../../apiCalls/customerApiCalls'
import CustomerListTable from './CustomerListTable'



function CustomerList() {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [customers, setCustomers] = useState([]);
    let content;


    function fetchCustomerList() {
        getCustomersApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    setIsLoaded(true)
                    setCustomers(data)
                },
                (error) => {
                    setIsLoaded(true)
                    setError(error)
                }
            )
    }
    function deleteCustomer(e, id) {
        e.preventDefault();
        deleteCustomerApiCall(id)
            .then(res => res.json())
            .then(
                (data) => {
                    fetchCustomerList()
                },
                (error) => {
                    setError(error)
                }
            )
    }

    useEffect(() => {
        fetchCustomerList()
    }, [])

    if (error) {
        content = <p>Mistake: {error.message}</p>
    } else if (!isLoaded) {
        content = <p>Loading customer data...</p>
    } else {
        content = <CustomerListTable customerList={customers} deleteCustomer={deleteCustomer} />
    }



        return (
            <main>
                <h2>Customer List</h2>
                { content}
                <p className="section-buttons">
                    <Link to="/customers/add" className="button-add">Add a new customer</Link>
                </p>
            </main >
        )
    }


export default CustomerList