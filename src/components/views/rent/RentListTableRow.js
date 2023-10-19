import { Link } from "react-router-dom"
import { useTranslation } from 'react-i18next';

function RentListTableRow(props) {
    const rent = props.rentData
    const { t, i18n } = useTranslation();
    return (
        <tr>
            <td>{rent.car.carModel}</td>
            <td>{rent.customer.name +" "+rent.customer.surname}</td>
            <td>{rent.address}</td>
            <td>
                <ul className="list-actions">
                    <li><Link to={`/rents/details/${rent._id}`} className="list-actions-button-details">{t('list.actions.details')}</Link></li>
                    <li><Link to={`/rents/edit/${rent._id}`} className="list-actions-button-edit">{t('list.actions.edit')}</Link></li>
                    <li><Link onClick={(e)=>props.deleteRent(e,rent._id)} className="list-actions-button-delete">{t('list.actions.delete')}</Link></li>
                </ul>
            </td>
        </tr>
    )
}

export default RentListTableRow