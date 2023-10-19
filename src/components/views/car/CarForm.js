import React, {useEffect, useState} from "react"
import { useNavigate, useParams} from "react-router-dom"
import {useTranslation} from "react-i18next";
import FormMode, {formValidationKeys} from "../../../helpers/formHelper";
import FormInput from "../../form/FormInput";
import {addCarApiCall, getCarByIdApiCall, updateCarApiCall} from "../../../apiCalls/carApiCalls";
import FormButtons from "../../form/FormButtons";

function CarForm() {
    const { carId } = useParams()
    const navigate = useNavigate()
    const { t, i18n } = useTranslation();
    const currentFormMode = carId ? FormMode.EDIT : FormMode.NEW
    const [car, setCar] = useState({
        'carModel': '',
        'VIN': '',
        'manufactured': '',
        'color': '',
    })
    const [errors, setErrors] = useState({
        'carModel': '',
        'VIN': '',
        'manufactured': '',
        'color': '',
    })
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(null)
    const [message, setMessage] = useState(null)
    const [redirect, setRedirect] = useState(false)



    function fetchCarDetails() {
        getCarByIdApiCall(carId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        setMessage(data.message)
                    } else {
                        setCar(data)
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
            fetchCarDetails()
        }
    }, [])


    function validateField(fieldName, fieldValue) {
        let errorMessage = ''
        if (fieldName === 'carModel') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkTextLengthRange(fieldValue, 2, 60)) {
                errorMessage = formValidationKeys.len_2_60
            }
        }
        if (fieldName === 'VIN') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkTextLengthRange(fieldValue, 2, 60)) {
                errorMessage = formValidationKeys.len_2_60
            }
        }
        if (fieldName === 'manufactured') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkTextLengthRange(fieldValue, 2, 60)) {
                errorMessage = formValidationKeys.len_2_60
            }
        }
        if (fieldName === 'color') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkTextLengthRange(fieldValue, 2, 60)) {
                errorMessage = formValidationKeys.len_2_60
            }
        }
        console.log(fieldName)
        console.log(currentFormMode===FormMode.NEW)
        console.log(car)

        return errorMessage;
    }

    function handleChange(event) {
        const { name, value } = event.target
        const errorMessage = validateField(name, value)
        setErrors({
            ...errors,
            [name]: errorMessage
        })
        setCar({
            ...car,
            [name]: value
        })
    }
    function handleSubmit(event) {
        event.preventDefault()
        const isValid = validateForm()
        if (isValid) {
            let promise, response
            if (currentFormMode === FormMode.NEW) {
                promise = addCarApiCall(car)
            } else if (currentFormMode === FormMode.EDIT) {
                promise = updateCarApiCall(carId, car)
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
        Object.entries(car).forEach(([key, value]) => {
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
            navigate('/cars')
        }
    }, [redirect])


    const errorsSummary = hasErrors() ? 'Form contains errors.' : ''
    const fetchError = error ? `Mistake: ${error.message}` : ''
    const globalErrorMessage = errorsSummary || fetchError || message

    const pageTitle = currentFormMode === FormMode.NEW ? t('car.form.add.pageTitle') : t('car.form.edit.pageTitle')
    return (
        <main>
            <h2>{pageTitle}</h2>
            <form className="form" onSubmit={handleSubmit}>
                <FormInput
                    type="text"
                    label="Car Model"
                    required
                    error={errors.carModel}
                    name='carModel'
                    placeholder= "Car Model"
                    onChange={handleChange}
                    value={car.carModel}
                />
                <FormInput
                    type="text"
                    label="VIN"
                    required
                    error={errors.VIN}
                    name='VIN'
                    placeholder="VIN"
                    onChange={handleChange}
                    value={car.VIN}
                />
                <FormInput
                    type="text"
                    label="manufactured"
                    required
                    error={errors.manufactured}
                    name='manufactured'
                    placeholder="manufactured"
                    onChange={handleChange}
                    value={car.manufactured}
                />
                <FormInput
                    type="text"
                    label="color"
                    required
                    error={errors.color}
                    name='color'
                    placeholder="color"
                    onChange={handleChange}
                    value={car.color}
                />

                <div className="form-buttons">
                    <FormButtons
                        formMode={currentFormMode}
                        error={globalErrorMessage}
                        cancelPath="/cars"
                    />
                </div>
            </form>
        </main >
    )
}

export default CarForm