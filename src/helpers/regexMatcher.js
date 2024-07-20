/* eslint-disable no-useless-escape */

export function isValidEmail(string) {
    const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/
    return string.match(emailRegex)
}

export function isValidPassword(string) {
    const passwordRegex =
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\!\@\#\$\%\^\&\*\(\)])\S{6,16}$/
    return string.match(passwordRegex)
}

export function isValidUsername(string) {
    const usernameRegex = /^[a-zA-Z0-9]{5,23}$/
    return string.match(usernameRegex)
}
