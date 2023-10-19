import React, {useEffect, useState} from 'react'
import { Link, useParams } from 'react-router-dom'
import { getCarByIdApiCall } from '../../../apiCalls/carApiCalls'
import { useTranslation } from "react-i18next";

import CarDetailsData from "./CarDetailsData";
function CarDetails() {
    let { carId } = useParams()
    carId = parseInt(carId)
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [cars, setCars] = useState([]);
    const [message, setMessage] = useState([]);
    const { t, i18n } = useTranslation();


    function fetchCarDetails() {
        getCarByIdApiCall(carId)
            .then(res =>{ console.log(res); return res.json();})
            .then(
                (data) => {
                    if (data.message) {
                        setCars(null)
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
                }
            )
    }


    useEffect(() => {
        fetchCarDetails()
    }, [])

    let content;

    if (error) {
        content = <p>Error: {error.message}</p>
    } else if (!isLoaded) {
        content = <p>{t('car.details.loading')}</p>
    } else if (message) {
        content = <p>{message}</p>
    } else {
        content = <CarDetailsData car={cars} />
    }



    return (
        <main>
            <h2>{t('car.list.title')}</h2>
            {content}
            <div className="section-buttons">
                <Link to="/cars" className="list-actions-button-details">{t('form.actions.return')}</Link>
            </div>
        </main>
    )

}
export default CarDetails