import { ApiSource } from "../source/api/api_source";
import { LocalStorageSource } from "../source/localstorage/localstorage_source";
import { SupabaseSource } from "../source/supabase/supabase_source";

export class Repository {
    apiSource: ApiSource;
    localStorageSource: LocalStorageSource;
    supabaseSource: SupabaseSource

    constructor(apiSource: ApiSource, localStorageSource: LocalStorageSource, supabaseSource: SupabaseSource) {
        this.apiSource = apiSource
        this.localStorageSource = localStorageSource
        this.supabaseSource = supabaseSource
    }

    getLoginState = () => {
        return this.localStorageSource.getLoginState()
    }

    setLoginState = (isLoggedIn: string) => {
        this.localStorageSource.setLoginState(isLoggedIn)
    }

    register = (email: string, password: string, name: string, onSuccess: () => void, onFailed: (message: string) => void) => {
        return this.supabaseSource
            .register(
                email,
                password,
                name,
                onSuccess,
                onFailed)
    }

    login = (email: string, password: string, onSuccess: () => void, onFailed: (message: string) => void) => {
        return this.supabaseSource.login(
            email, 
            password, 
            onSuccess, 
            onFailed
        )
    }
}