export class LocalStorageSource {
    getToken = () => {
        return (typeof (window) !== 'undefined')
            ? (
                (localStorage.getItem('access_token') !== null)
                    ? localStorage.getItem('access_token')
                    : ''
            )
            : ''
    }

    setToken = (token: string) => {
        if (typeof (window) !== 'undefined') {
            localStorage.setItem('access_token', token)
        }
    }
}