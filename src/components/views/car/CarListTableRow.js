import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function CarListTableRow(props) {
    const car = props.carData
    const { t, i18n } = useTranslation();
    return (
        <tr>
            <td>{car.carModel}</td>
            <td>{car.VIN}</td>
                <td>
                    <ul className="list-actions">
                        <li><Link to={`details/${car._id}`} className="list-actions-button-details">{t('list.actions.details')}</Link></li>
                        <li><Link to={`/cars/edit/${car._id}`} className="list-actions-button-edit">{t('list.actions.edit')}</Link></li>
                        <li><Link to={`/cars/delete/${car._id}`} className="list-actions-button-delete">{t('list.actions.delete')}</Link></li>
                    </ul>
                </td>
        </tr>
    )
}

export default CarListTableRow