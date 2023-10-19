import React from 'react';
import CustomerListTableRow from './CustomerListTableRow'
import {useTranslation} from "react-i18next";

function CustomerListTable(props) {
    const customers = props.customerList
    const { t, i18n } = useTranslation();
    return (
        <table className="table-list" >
            <thead>
                <tr>
                    <th>{ t('customer.fields.name') }</th>
                    <th>{ t('customer.fields.surname') }</th>
                    <th>{ t('customer.fields.role') }</th>
                    <th>{ t('customer.actions.title') }</th>
                </tr>
            </thead>
            <tbody>
                {customers.map(customer =>
                    <CustomerListTableRow customerData={customer} key={customer.id} deleteCustomer={props.deleteCustomer} />
                )}

            </tbody>

        </table>

    )
}

export default CustomerListTable