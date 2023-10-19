import React from 'react';
import { getFormattedDate } from '../../../helpers/dateHelper';
import {t} from "i18next";

function CustomerDetailsData(customer) {

    return (
        <>
            <p>{t('customer.fields.name')}: {customer.name}</p>
            <p>{t('customer.fields.surname')}: {customer.surname} </p>
            <p>{t('customer.fields.email')}: {customer.email} </p>
            <p>{t('customer.fields.role')}: {customer.role == "user"?t('customer.fields.user') : t('customer.fields.admin')} </p>
            <table className="table-list">
                <thead>
                    <tr>
                    <th>{t('customer.form.rent.car.carModel')}</th>
                    <th>{t('customer.form.rent.customer')}</th>
                    <th>{t('customer.form.rent.address')}</th>
                    <th>{t('customer.form.rent.rentalDate')}</th>

                     </tr>
                </thead>
                <tbody>

                    {customer.rents.map(
                        rent =>
                            <tr key={rent.id}>
                                <td>{rent.car.carModel}</td>
                                <td>{rent.address}</td>
                                <td>{rent.rentalDate ? getFormattedDate(rent.rentalDate) : ""}</td>
                            </tr>
                    )}
                </tbody>
            </table>
        </>
    )
}

export default CustomerDetailsData