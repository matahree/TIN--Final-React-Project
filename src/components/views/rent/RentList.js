import React, {useEffect, useState} from "react"
import { Link } from 'react-router-dom'
import {deleteRentApiCall, getRentsApiCall} from '../../../apiCalls/rentApiCalls'
import {useTranslation} from "react-i18next";
import {rentList} from "../../../apiCalls/rentApiMockData";
import RentListTable from "./RentListTable";

function RentList() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [rents, setRents] = useState([]);
    let content;
    const { t, i18n } = useTranslation();

    function fetchRentsList() {
        getRentsApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    setIsLoaded(true)
                    setRents(data)
                },
                (error) => {
                    setIsLoaded(true)
                    setError(error)
                }
            )
    }

    function deleteRent(e, id) {
        e.preventDefault();
        deleteRentApiCall(id)
            .then(res => res.json())
            .then(
                (data) => {
                    fetchRentsList()
                },
                (error) => {
                    setError(error)
                }
            )
    }

    useEffect(() => {
        fetchRentsList()
    }, [])

    if (error) {
        content = <p>Mistake: {error.message}</p>
    } else if (!isLoaded) {
        content = <p>{t('car.details.loading')}</p>
    } else if (rents.length === 0) {
        content = <p>{t('rent.list.noData')}</p>
    } else {
        content = <RentListTable rentsList={rents} deleteRent={deleteRent}/>
    }




    return (
        <main>
            <h2>{t('rent.list.pageTitle')}</h2>
            { content }
            <p className="section-buttons">
                <Link to="/rents/add" className="button-add">{t('rent.list.addNew')}</Link>
            </p>
        </main>
    )
}

export default RentList