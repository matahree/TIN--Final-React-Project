const FormMode = {
    NEW: 'NEW',
    EDIT: 'EDIT',
    LOGIN: 'LOGIN'
}

export const formValidationKeys = {
    notEmpty: 'notEmpty',
    len_2_60: 'len_2_60',
    isZipCode: 'isZipCode',
    isEmail: 'isEmail'
}

export function getValidationErrorKey(error) {
    return `validation.messages.${error}`
}


export default FormMode