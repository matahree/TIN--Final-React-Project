import React from 'react';
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import {getUserCredentials, isAuthenticated} from "../../helpers/authHelper";

function Navigation(props) {
    const { t, i18n } = useTranslation();
    const user = getUserCredentials()

    const changeLanguage = (lang) => {
        localStorage.setItem('language', lang);
        i18n.changeLanguage(lang, (err, t) => {
            if(err) {
                console.log('something went wrong in change language', err);
            }
        });
    }

    const loginLogoutLink = isAuthenticated() ? <button onClick={props.handleLogout}>Log Out</button> : <Link to="/login">Login</Link>


    return (
        <nav>
            <ul>
                <li><Link to="/">{t('nav.main-page')}</Link></li>
                <li><Link to="/cars">{t('nav.cars')}</Link></li>
                <li><Link to="/rents">{t('nav.rent')}</Link></li>
                <li><Link to="/customers">{t('nav.customers')}</Link></li>
                {isAuthenticated() &&
                    <td>
                        <ul className="list-actions">
                            <li>
                                <p>{t('customer.fields.logged')}:<b>{user && (user.name +' '+user.surname)}</b></p>
                            </li>
                        </ul>
                    </td>
                }
                <li className='lang'>{loginLogoutLink}</li>

            </ul>
            <button type="button" onClick={() => changeLanguage('pl')}>PL</button>
            <button type="button" onClick={() => changeLanguage('en')}>EN</button>
        </nav>
    )
}

export default Navigation