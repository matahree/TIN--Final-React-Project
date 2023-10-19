import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom'

function CustomerAccessDenied(props) {
    const { t, i18n } = useTranslation();
    return (
        <main>
            <table className="table-list" >
                <thead>
                <tr>
                    <th>Lack of access.</th>
                </tr>
                </thead>
                <tbody>
                <th>Log in to the admin account.</th>
                </tbody>
            </table><br></br>
            <div className="section-buttons">
                <Link to="/customers" className="form-button-cancel">{t('form.actions.return')}</Link>
            </div>

        </main>
    )
}

export default CustomerAccessDenied