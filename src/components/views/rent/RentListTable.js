import {useTranslation} from "react-i18next";
import RentListTableRow from "./RentListTableRow";

function RentListTable(props) {
    const rents = props.rentsList
    const { t, i18n } = useTranslation();
    return (
        <table className="table-list">
            <thead>
            <tr>
                <th>{t('rent.fields.carModel')}</th>
                <th>{t('rent.fields.customerData')}</th>
                <th>{t('rent.fields.address')}</th>
                <th>{t('list.actions.title')}</th>
            </tr>
            </thead>
            <tbody>
            {rents.map(rent =>
                <RentListTableRow rentData={rent} key={rent._id} deleteRent={props.deleteRent}/>
            )}
            </tbody>
        </table>
    )
}

export default RentListTable