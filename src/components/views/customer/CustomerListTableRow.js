import React from 'react';
import { Link } from 'react-router-dom';
import {isAuthenticated} from "../../../helpers/authHelper";
import {useTranslation} from "react-i18next";

function CustomerListTableRow(props) {
    const customer = props.customerData
    const { t, i18n } = useTranslation();
    return (
        <tr>
            <td>{customer.name}</td>
            <td>{customer.surname}</td>
            <td>{customer.role == "user"?t('customer.fields.user') : t('customer.fields.admin')}</td>
            {isAuthenticated() &&
                <td>
                    <ul className="list-actions">
                        <li><Link to={`/customers/details/${customer._id}`} className="list-actions-button-details">{t('list.actions.details')}</Link></li>
                        <li><Link to={`/customers/edit/${customer._id}`} className="list-actions-button-edit">{t('list.actions.edit')}</Link></li>
                        <li><Link onClick={(e)=>props.deleteCustomer(e,customer._id)} className="list-actions-button-delete">{t('list.actions.delete')}</Link></li>
                    </ul>
                </td>
            }
            {!isAuthenticated() &&
                <td>
                    <ul className="list-actions">
                        <li>{t('auth.status')}</li>
                    </ul>
                </td>
            }
        </tr>

    )
}

export default CustomerListTableRow