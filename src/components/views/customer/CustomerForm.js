import React, {useEffect, useState} from "react"
import {useNavigate, useParams} from "react-router-dom"
import { checkRequired, checkTextLengthRange,checkEmail } from '../../../helpers/validationCommon'
import { getCustomerByIdApiCall, updateCustomerApiCall, addCustomerApiCall } from '../../../apiCalls/customerApiCalls'
import FormInput from "../../form/FormInput";

import {useTranslation} from "react-i18next";
import FormMode, {formValidationKeys} from "../../../helpers/formHelper";
import PropTypes from "prop-types";
import FormSelect from "../../form/FormSelect";

export const ROLES = {USER:"user", ADMIN:"admin"}


function FormButtons(props) {
    return null;
}

FormButtons.propTypes = {
    error: PropTypes.any,
    formMode: PropTypes.any,
    cancelPath: PropTypes.string
};

function CustomerForm(){
    const { customerId } = useParams()
    const currentFormMode = customerId ? FormMode.EDIT : FormMode.NEW
    const navigate = useNavigate()
    const { t, i18n } = useTranslation();
    const [customer, setCustomer] = useState({
        'name': '',
        'surname': '',
        'address': '',
        'email': '',
        'role': ROLES.USER,
        ...(!customerId && {password: ''})
    })
    const [errors, setErrors] = useState({
        'name': '',
        'surname': '',
        'address': '',
        'email': '',
        'password': '',
        'role':''
    })
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(null)
    const [message, setMessage] = useState(null)
    const [redirect, setRedirect] = useState(false)





    function fetchCustomerDetails() {
        getCustomerByIdApiCall(customerId)
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
            fetchCustomerDetails()
        }
    }, [])



    function handleChange(event) {
        const { name, value } = event.target
        const errorMessage = validateField(name, value)
        setErrors({
            ...errors,
            [name]: errorMessage
        })
        setCustomer({
            ...customer,
            [name]: value
        })
    }
    function validateField(fieldName, fieldValue) {
        let errorMessage = ''
        if (fieldName === 'name') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkTextLengthRange(fieldValue, 2, 60)) {
                errorMessage = formValidationKeys.len_2_60
            }
        }
        if (fieldName === 'surname') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkTextLengthRange(fieldValue, 2, 60)) {
                errorMessage = formValidationKeys.len_2_60
            }
        }

        if (fieldName === 'address') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkTextLengthRange(fieldValue, 2, 60)) {
                errorMessage = formValidationKeys.len_2_60
            }
        }

        if (fieldName === 'email') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkTextLengthRange(fieldValue, 2, 60)) {
                errorMessage = formValidationKeys.len_2_60
            }else if(!checkEmail(fieldValue)) {
                errorMessage = formValidationKeys.isEmail
            }
        }
        console.log(fieldName)
        console.log(currentFormMode===FormMode.NEW)
        console.log(customer)
        if (fieldName === 'password' && currentFormMode===FormMode.NEW)  {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            }
        }
        return errorMessage;
    }

    function handleSubmit(event) {
        event.preventDefault()
        const isValid = validateForm()
        if (isValid) {
            let promise, response
            if (currentFormMode === FormMode.NEW) {
                promise = addCustomerApiCall(customer)
            } else if (currentFormMode === FormMode.EDIT) {
                promise = updateCustomerApiCall(customerId, customer)
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
                            }else if(response.status === 401){
                                navigate('/noAccess')
                            }
                            else {
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
        Object.entries(customer).forEach(([key, value]) => {
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
            navigate('/customers')
        }
    }, [redirect])


    const errorsSummary = hasErrors() ? 'The form contains errors.' : ''
    const fetchError = error ? `Mistake: ${error.message}` : ''
    const globalErrorMessage = errorsSummary || fetchError || message

    const pageTitle = currentFormMode === FormMode.NEW ? t('customer.form.add.pageTitle') : t('customer.form.edit.pageTitle')
    return (
            <main>
                <h2>{pageTitle}</h2>
                <form className="form" onSubmit={handleSubmit}>
                    <FormInput
                        type="text"
                        label="name"
                        required
                        error={errors.name}
                        name="name"
                        placeholder="2-60 char"
                        onChange={handleChange}
                        value={customer.name}
                    />
                    <FormInput
                        type="text"
                        label="surname"
                        required
                        error={errors.surname}
                        name="surname"
                        placeholder="2-60 char"
                        onChange={handleChange}
                        value={customer.surname}
                    />
                    <FormInput
                        type="text"
                        label="address"
                        required
                        error={errors.address}
                        name="address"
                        placeholder="2-60 char"
                        onChange={handleChange}
                        value={customer.address}
                    />
                    <FormInput
                        type="text"
                        label="email"
                        required
                        error={errors.email}
                        name="email"
                        placeholder="2-60 char"
                        onChange={handleChange}
                        value={customer.email}
                    />
                    <FormInput
                        type="password"
                        label= "password"
                        required={currentFormMode===FormMode.NEW}
                        error={errors.password}
                        name='password'
                        onChange={handleChange}
                    />
                    <FormSelect
                        error={errors.role}
                        label="role"
                        required
                        name='role'
                        options={Object.entries(ROLES).map(([key,value]) =>({label: key, value: value}))}
                        onChange={handleChange}
                        value={customer.role}
                    />
                    <div className="form-buttons">
                        <FormButtons
                            formMode={currentFormMode}
                            error={globalErrorMessage}
                            cancelPath="/customers"
                        />
                    </div>
                    <p className="section-buttons">
                        <a href="/customer/add" className="button-add">Add</a>
                    </p>
                </form>

            </main >
        )
}



export default CustomerForm