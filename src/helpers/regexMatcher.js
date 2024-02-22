/* eslint-disable no-useless-escape */
export function isEmail(string){
    const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/
    return string.match(emailRegex);
}

export function isValidPassword(string){
    const passwordRegex =/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\!\@\#\$\%\^\&\*\(\)])\S{6,16}$/
    return string.match(passwordRegex);
}