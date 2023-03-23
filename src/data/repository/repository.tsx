import { ApiSource } from "../source/api_source";
import { LocalStorageSource } from "../source/localstorage_source";

export class Repository{
    apiSource: ApiSource;
    localStorageSource: LocalStorageSource;
    
    constructor(apiSource:ApiSource, localStorageSource:LocalStorageSource){
        this.apiSource = apiSource
        this.localStorageSource = localStorageSource
    }

    setToken = (token:string) => {
        this.localStorageSource.setToken(token)
    }

    getToken = () => {
        return this.localStorageSource.getToken()
    }
}