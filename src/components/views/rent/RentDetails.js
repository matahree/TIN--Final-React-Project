import React, {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import { getRentByIdApiCall } from '../../../apiCalls/rentApiCalls'
import {useTranslation} from "react-i18next";
import RentDetailsData from "./RentDetailsData";

function RentDetails() {
    let { rentId } = useParams()
    rentId = parseInt(rentId)
    const [rents, setRent] = useState({});
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [message, setMessage] = useState(null);
    const { t, i18n } = useTranslation();

    function fetchRentDetails() {
        getRentByIdApiCall(rentId)
            .then(res =>{ console.log(res); return res.json();})
            .then(
                (data) => {
                    if (data.message) {
                        setRent(null)
                        setRent(data.message)
                    } else {
                        setRent(data)
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
        fetchRentDetails()
    }, [])

    let content
    if (error) {
        content = <p>Mistake: {error.message}</p>
    } else if (!isLoaded) {
        content = <p>{t('rent.details.loading')}</p>
    } else {
        content = <RentDetailsData rentData={rents} />
    }


    return (
        <main>
            <h2>{t('rent.list.title')}</h2>
            { content }
            <div className="section-buttons">
                <Link to="/rents" className="list-actions-button-details">{t('form.actions.return')}</Link>
            </div>
        </main>
    )
}

export default RentDetails
