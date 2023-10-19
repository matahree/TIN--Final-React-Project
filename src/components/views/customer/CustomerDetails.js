import React, {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import { getCustomerByIdApiCall } from '../../../apiCalls/customerApiCalls'
import CustomerDetailsData from './CustomerDetailsData'

function CustomerDetails() {

    let { customerId } = useParams()
    customerId = parseInt(customerId)
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [customers, setCustomers] = useState([]);
    const [message, setMessage] = useState([]);



    function fetchCustomerDetails() {
        getCustomerByIdApiCall(customerId)
            .then(res =>{ console.log(res); return res.json();})
            .then(
                (data) => {
                    if (data.message) {
                        setCustomers(null)
                        setMessage(data.message)
                    } else {
                        setCustomers(data)
                        setMessage(null)
                    }
                    setIsLoaded(true)
                },
                (error) => {
                    setIsLoaded(true)
                    setError(error)
                }
            )
    }


    useEffect(() => {
        fetchCustomerDetails()
    }, [])
    let content;



        if (error) {
            content = <p>Error: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Loading customer data</p>
        } else if (message) {
            content = <p>{message}</p>
        } else {
            content = <CustomerDetailsData customer={customers} />
        }
        return (
            <main>
                <h2>Customer details</h2>
                {content}
                <div className="section-buttons">
                    <Link to="/customers" className="list-actions-button-details">Return</Link>
                </div>
            </main>
        )

}
export default CustomerDetails