import { ApiSource } from "../source/api/api_source";
import { LocalStorageSource } from "../source/localstorage/localstorage_source";

export class Repository {
    apiSource: ApiSource;
    localStorageSource: LocalStorageSource;

    constructor(apiSource: ApiSource, localStorageSource: LocalStorageSource) {
        this.apiSource = apiSource
        this.localStorageSource = localStorageSource
    }

    setToken = (token: string) => {
        this.localStorageSource.setToken(token)
    }

    getToken = () => {
        return this.localStorageSource.getToken()
    }

    login = async (email: string, password: string) => {
        return this.apiSource.login(email, password)
    }

    register = async (email: string, password: string, name: string) => {
        return this.apiSource.register(email, password, name)
    }

    getUserByUid =async (token:string) => {
        return this.apiSource.getUserByUid(token)
    }
}