import React, {useEffect, useState} from 'react'
import { useNavigate, useParams} from 'react-router-dom'
import { getCustomersApiCall } from '../../../apiCalls/customerApiCalls'
import { getCarsApiCall } from '../../../apiCalls/carApiCalls'
import FormMode, {formValidationKeys} from "../../../helpers/formHelper";
import {useTranslation} from "react-i18next";
import {addRentApiCall, getRentByIdApiCall, updateRentApiCall} from "../../../apiCalls/rentApiCalls";
import FormInput from "../../form/FormInput";
import {getFormattedDate} from "../../../helpers/dateHelper";
import FormButtons from "../../form/FormButtons";

function RentForm() {
    const [rent, setRent] = useState({
        'car_id': '',
        'customer_id': '',
        'address': '',
        'rentalDate': '',

    })
    const [errors, setErrors] = useState({
        'car_id': '',
        'customer_id': '',
        'address': '',
        'rentalDate': '',
    })
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(null)
    const [message, setMessage] = useState(null)
    const [redirect, setRedirect] = useState(false)

    const { rentId } = useParams()
    const currentFormMode = rentId ? FormMode.EDIT : FormMode.NEW
    const navigate = useNavigate()
    const [cars, setCars] = useState([]);
    const [customers, setCustomer] = useState([]);
    const { t, i18n } = useTranslation();


    function fetchRentDetails() {
        getRentByIdApiCall(rentId)
            .then(res => res.json())
            .then(
                (data) => {
                    console.log(data);
                    if (data.message) {
                        setMessage(data.message)
                    } else {
                        setRent(data)
                        setMessage(null)
                    }
                    setIsLoaded(true)
                },
                (error) => {
                    setIsLoaded(true)
                    setError(error)
                })
    }

    function fetchCars(){
        getCarsApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        setMessage(data.message)
                    } else {
                        setCars(data)
                        setMessage(null)
                    }
                    setIsLoaded(true)
                },
                (error) => {
                    setIsLoaded(true)
                    setError(error)
                })
    }

    function fetchCustomers(){
        getCustomersApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        setMessage(data.message)
                    } else {
                        setCustomer(data)
                        setMessage(null)
                    }
                    setIsLoaded(true)
                },
                (error) => {
                    setIsLoaded(true)
                    setError(error)
                })
    }


    useEffect(() => {
        if (currentFormMode === FormMode.EDIT) {
            fetchRentDetails()

        }
        fetchCars()
        fetchCustomers()
    }, [])

    function validateField(fieldName, fieldValue) {
        let errorMessage = ''
        if (fieldName === 'address') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkTextLengthRange(fieldValue, 2, 60)) {
                errorMessage = formValidationKeys.len_2_60
            }
        }
        if (fieldName === 'rentalDate') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            }
        }
        return errorMessage;
    }

    function handleChange(event) {
        const { name, value } = event.target
        const errorMessage = validateField(name, value)
        setErrors({
            ...errors,
            [name]: errorMessage
        })
        setRent({
            ...rent,
            [name]: value
        })
    }

    function handleSubmit(event) {
        rent.car_id = parseInt(rent.car_id);
        rent.customer_id = parseInt(rent.customer_id);
        event.preventDefault()
        const isValid = validateForm()
        if (isValid) {
            let promise, response
            if (currentFormMode === FormMode.NEW) {
                promise = addRentApiCall(rent)
            } else if (currentFormMode === FormMode.EDIT) {
                promise = updateRentApiCall(rentId, rent)
            }
            if (promise) {
                promise
                    .then(
                        (data) => {
                            response = data
                            if (response.status === 201 || response.status === 500) {
                                return data.json()
                            }
                        }
                    )
                    .then(
                        (data) => {
                            if (!response.ok && response.status === 500) {
                                const serverFieldsErrors = {...errors}
                                for (const i in data) {
                                    const errorItem = data[i]
                                    const errorMessage = errorItem.message
                                    const fieldName = errorItem.path
                                    serverFieldsErrors[fieldName] = errorMessage
                                }
                                setErrors(serverFieldsErrors)
                                setError(null)
                            } else {
                                setRedirect(true)
                            }
                        },
                        (error) => {
                            setError(error)
                        }
                    )
            }
        }
    }

    function validateForm() {
        let isValid = true
        let serverFieldsErrors = {...errors}
        Object.entries(rent).forEach(([key, value]) => {
            const errorMessage = validateField(key, value)
            serverFieldsErrors[key] = errorMessage
            if (errorMessage.length > 0) {
                isValid = false
            }
        })
        setErrors(serverFieldsErrors)
        return isValid
    }
    function hasErrors() {
        Object.values(errors).forEach((value) => {
            if (value.length > 0) {
                return true
            }
        })
        return false
    }

    useEffect(() => {
        if (redirect) {
            navigate('/rents')
        }
    }, [redirect])

    const errorsSummary = hasErrors() ? 'The form contains errors.' : ''
    const fetchError = error ? `Mistake: ${error.message}` : ''
    const globalErrorMessage = errorsSummary || fetchError || message

    const pageTitle = currentFormMode === FormMode.NEW ? t('rent.form.add.pageTitle') : t('rent.form.edit.pageTitle')


    return (
        <main>
            <h2>{pageTitle}</h2>
            <form className="form" onSubmit={handleSubmit}>
                <label htmlFor="car_id">Car <abbr title="required" aria-label="required">*</abbr></label>
                <select id="car_id" name="car_id" required onChange={handleChange}>
                    <option value="">--- Choose a car ---</option>

                    {cars.map(car =>
                        (<option key={car._id} value={car._id} label={car.carModel} selected={rent.car_id === car._id} ></option>)
                    )}
                </select>
                <span id="errorCar" className="errors-text"></span>

                <label htmlFor="customer_id">Customer: <abbr title="required" aria-label="required">*</abbr></label>
                <select id="customer_id" name="customer_id" required onChange={handleChange}>
                    <option value="">--- Choose a customer ---</option>
                    {customers.map(customer =>
                        (<option key={customer._id} value={customer._id} label={customer.name + " " + customer.surname} selected={rent.customer_id === customer._id}></option>)
                    )}
                </select>
                <span id="errorCustomer" className="errors-text"></span>

                <FormInput
                    type="date"
                    label="rental date"
                    required
                    error={errors.date}
                    name='rentalDate'
                    onChange={handleChange}
                    value={rent.rentalDate && getFormattedDate(rent.rentalDate)}
                />
                <FormInput
                    type="text"
                    label="address"
                    required
                    error={errors.address}
                    name='address'
                    placeholder= "ex: address1"
                    onChange={handleChange}
                    value={rent.address}
                />

                <div className="form-buttons">
                    <FormButtons
                        formMode={currentFormMode}
                        error={globalErrorMessage}
                        cancelPath="/rents"
                    />
                </div>
            </form>
        </main >
    )
}


export default RentForm