
import { useTranslation } from 'react-i18next';
import {getFormattedDate} from "../../../helpers/dateHelper";

function CarDetailsData({car}) {
    const { t, i18n } = useTranslation();
    return (
        <>
            <p>{t('car.fields.carModel')}: {car.carModel}</p>
            <p>{t('car.fields.VIN')}: {car.VIN} </p>
            <p>{t('car.fields.manufactured')}: {car.manufactured} </p>
            <p>{t('car.fields.color')}: {car.color} </p>
            <table className="table-list">
                <thead>
                <tr>
                    <th>{t('car.form.rent.customer')}</th>
                    <th>{t('car.form.rent.address')}</th>
                    <th>{t('car.form.rent.rentalDate')}</th>
                </tr>
                </thead>
                <tbody>
                {car.rents.map(
                    rents =>
                        <tr key={rents._id}>
                            <td>{rents.customer.name +" "+rents.customer.surname}</td>
                            <td>{rents.address}</td>
                            <td>{rents.rentalDate ? getFormattedDate(rents.rentalDate) : ""}</td>
                        </tr>
                )}
                </tbody>
            </table>
        </>
    )
}

export default CarDetailsData