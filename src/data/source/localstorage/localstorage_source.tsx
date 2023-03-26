export class LocalStorageSource {
    //ONLY USED IF USING REAL API
    getToken = () => {
        return (typeof (window) !== 'undefined')
            ? (
                (localStorage.getItem('access_token') !== null)
                    ? localStorage.getItem('access_token')
                    : ''
            )
            : ''
    }

    //ONLY USED IF USING REAL API
    setToken = (token: string) => {
        if (typeof (window) !== 'undefined') {
            localStorage.setItem('access_token', token)
        }
    }

    getLoginState = () => {
        return (typeof (window) !== 'undefined')
            ? (
                (localStorage.getItem('login_state') !== null)
                    ? localStorage.getItem('login_state')
                    : 'false'
            )
            : ''
    }

    setLoginState = (isLoggedIn: string) => {
        if (typeof (window) !== 'undefined') {
            localStorage.setItem('login_state', isLoggedIn)
        }
    }

    getEmail = () => {
        return (typeof (window) !== 'undefined')
            ? (
                (localStorage.getItem('email') !== null)
                    ? localStorage.getItem('email')
                    : 'false'
            )
            : ''
    }

    setEmail = (email: string) => {
        if (typeof (window) !== 'undefined') {
            localStorage.setItem('email', email)
        }
    }
}