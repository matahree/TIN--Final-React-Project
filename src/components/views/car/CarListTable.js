import React from 'react';
import CarListTableRow from './CarListTableRow'
import { useTranslation } from 'react-i18next';

function CarListTable(props) {
    const cars = props.carList
    const { t, i18n } = useTranslation();
    return (
        <table className="table-list" >
            <thead>
            <tr>
                <th>{t('car.fields.carModel')}</th>
                <th>{t('car.fields.VIN')}</th>
                <th>{t('list.actions.title')}</th>
            </tr>
            </thead>
            <tbody>
            {cars.map(car =>
                <CarListTableRow carData={car} key={car._id} />
            )}
            </tbody>
        </table >
    )
}

export default CarListTable