import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {  useNavigate } from "react-router-dom";
import { loginApiCall } from "../../apiCalls/authApiCalls";
import { formValidationKeys } from "../../helpers/formHelper";
import { checkRequired } from "../../helpers/validationCommon";
import FormButtons from "../form/FormButtons";
import FormInput from "../form/FormInput";
import FormMode from '../../helpers/formHelper'

function LoginForm(props) {
    const [user, setUser] = useState(
        {
            email: '',
            password: ''
        }
    )
    const [errors, setErrors] = useState(
        {
            email: '',
            password: ''
        }
    )
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(null)
    const [message, setMessage] = useState(null)
    const [redirect, setRedirect] = useState(false)

    const { t } = useTranslation()
    const navigate = useNavigate()
    const currentFormMode = FormMode.LOGIN;

    function handleChange(event) {
        const { name, value } = event.target
        const errorMessage = validateField(name, value)
        setErrors({
            ...errors,
            [name]: errorMessage
        })
        setUser({
            ...user,
            [name]: value
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
        const isValid = validateForm()

        if (isValid) {
            let response
            loginApiCall(user)
                .then(res => {
                    response = res
                    return res.json()
                })
                .then(
                    (data) => {
                        if (response.status === 200) {
                            if (data.token) {
                                const userString = JSON.stringify(data)
                                props.handleLogin(userString)
                                navigate(-1)
                            }
                        } else if (response.status === 401) {
                            setMessage(data.message)
                        } else if (response.status === 401) {

                            setMessage(t('validation.messages.loginError'));
                        }

                    },
                    (error) => {
                        setIsLoaded(true)
                        setError(error)
                    }
                )
        }
    }

    function validateField(fieldName, fieldValue) {
        let errorMessage = ''
        if (fieldName === 'email') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            }
        }
        if (fieldName === 'password') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            }
        }
        return errorMessage
    }

    function validateForm() {
        let isValid = true
        let serverFieldsErrors = { ...errors }
        Object.entries(user).forEach(([key, value]) => {
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
        let hasErrors = false
        Object.values(errors).forEach((value) => {
            if (value.length > 0) {
                hasErrors = true
            }
        })
        return hasErrors
    }

    useEffect(() => {
        if (redirect) {
            navigate('/customers/add')
        }
    }, [redirect])

    const errorsSummary = hasErrors() ? t('validation.messages.formErrors') : ''
    const fetchError = error ? `${t('error')}: ${error.message}` : ''
    const globalErrorMessage = errorsSummary || fetchError || message


    return (
        <main>
            <div id="login">
                <h2>Login</h2>
                <form className="form" method="post" onSubmit={handleSubmit}>
                    <FormInput
                        name="email"
                        value={user.email}
                        error={errors.email}
                        label="email"
                        onChange={handleChange}
                        type="text"
                    />
                    <FormInput
                        name="password"
                        value={user.password}
                        error={errors.password}
                        label="password"
                        onChange={handleChange}
                        type="password"
                    />
                    <FormButtons
                        cancelPath="/"
                        error = {globalErrorMessage}
                        formMode={currentFormMode}
                        submitButtonLabel={t('form.actions.login')}
                    />
                </form>
            </div>
        </main>
    )
}

export default LoginForm