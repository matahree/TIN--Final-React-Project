import { Link } from 'react-router-dom';
import FormMode from '../../helpers/formHelper'
import { useTranslation } from 'react-i18next';

function FormButtons(props) {
    const { t, i18n } = useTranslation();
    console.log(props);
    const ButtonLabel = props.formMode === FormMode.NEW ? t('form.actions.add') :  t('form.actions.edit')
    const submitButtonLabel = props.formMode === FormMode.LOGIN ? t('form.actions.login') : ButtonLabel;

    return (
        <div className="form-buttons">
            <p id="errorsSummary" className="errors-text">{props.error}</p>
            <input className="form-button-submit" type="submit" value={submitButtonLabel} />
            <Link to={props.cancelPath} className="form-button-cancel">Cancel</Link>
        </div>
    )
}

export default FormButtons