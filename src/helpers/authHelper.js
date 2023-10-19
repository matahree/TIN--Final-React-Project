export function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

export function getCurrentUser() {
    let userJSON
    const user = localStorage.getItem('user')
    try {
        userJSON = JSON.parse(user)
    } catch (e) {
        return undefined
    }
    return userJSON
}


export function getUserCredentials() {
    let userJSON
    const user = localStorage.getItem('user')
    try {
        userJSON = parseJwt(user)
    } catch (e) {
        return undefined
    }
    return userJSON
}

export function isAuthenticated() {
    const user = getCurrentUser()
    if(user) {
        return true
    }
    return false
}