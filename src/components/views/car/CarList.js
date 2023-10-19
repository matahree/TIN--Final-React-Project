import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import {getCarsApiCall} from '../../../apiCalls/carApiCalls'
import {useTranslation} from "react-i18next";
import CarListTable from "./CarListTable";


function CarList() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [cars, setCars] = useState([]);
    let content;
    const { t, i18n } = useTranslation();

    function fetchCarList() {
        getCarsApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    setIsLoaded(true)
                    setCars(data)
                },
                (error) => {
                    setIsLoaded(true)
                    setError(error)
                }
            )
    }


    useEffect(() => {
        fetchCarList()
    }, [])


    if (error) {
        content = <p>Mistake: {error.message}</p>
    } else if (!isLoaded) {
        content = <p>{t('car.details.loading')}</p>
    } else {
        content = <CarListTable carList={cars} />
    }



    return (
        <main>
            <h2>{t('car.list.pageTitle')}</h2>
            { content}
            <p className="section-buttons">
                <Link to="/cars/add" className="button-add">{t('car.list.addNew')}</Link>
            </p>
        </main>
    )

}

export default CarList