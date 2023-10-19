import {getFormattedDate} from "../../../helpers/dateHelper";
import {useTranslation} from "react-i18next";

function RentDetailsData(props) {
    const { t, i18n } = useTranslation();
    const rent = props.rentData
    const rentalDate = rent.date ? getFormattedDate(rent.date) : ""

    return (
        <>
            <p>{t('rent.fields.carData')}: {rent.carData}</p>
            <p>{t('rent.fields.customerData')}: {rent.customer.name +" "+rent.customer.surname} </p>
            <p>{t('rent.fields.address')}: {rent.address} </p>
            <p>{t('rent.fields.rentalDate')}: {rentalDate} </p>
        </>
    )
}

export default RentDetailsData