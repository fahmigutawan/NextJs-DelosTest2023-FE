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

    getEmail = () => {
        return this.localStorageSource.getEmail()
    }

    setEmail = (email: string) => {
        this.localStorageSource.setEmail(email)
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

    getUserByEmail = (email: string, onSuccess: (data: { email: string; name: string; coin: string; }) => void, onFailed: (message: string) => void) => {
        return this.supabaseSource.getUserByEmail(email, onSuccess, onFailed)
    }

    getArticleByPage = (
        email:string, 
        page: string | string[] | undefined,
        onSuccess: (data: Array<{ article_id: string; image: string; title: string; article_value: string; modified_time_inmillis: number; author: string; total_page: number; abstract: string; owned:boolean }>) => void,
        onFailed: (message: string) => void) => {
        let rawPage = (typeof (page) === 'undefined') ? '-1' : (page[0] || '')
        const intPage = parseInt(rawPage)

        if (!isNaN(intPage)) {
            if (intPage > 0) {
                return this.supabaseSource.getArticleByPage(email, intPage, onSuccess, onFailed)
            }
        } else {
            return this.supabaseSource.getArticleByPage(email, 1, onSuccess, onFailed)
        }
    }

    getArticleByPageAndQuery = (
        email:string,
        page: string | string[] | undefined,
        query: string | string[] | undefined,
        onSuccess: (data: Array<{ article_id: string; image: string; title: string; article_value: string; modified_time_inmillis: number; author: string; total_page: number; abstract: string; owned:boolean }>) => void,
        onFailed: (message: string) => void
    ) => {
        let rawPage = (typeof (page) === 'undefined')
            ? '-1'
            : (typeof (page) === 'string') ? page : '1'
        let rawQuery = (typeof (query) === 'undefined')
            ? 'UNDEFINED'
            : (typeof (query) === 'string') ? query : ''
        const intPage = parseInt(rawPage)

        if (!isNaN(intPage)) {
            if (intPage > 0) {
                if (rawQuery !== 'UNDEFINED') {
                    return this.supabaseSource.getArticleByPageAndQuery(email, intPage, rawQuery, onSuccess, onFailed)
                }
            }
        } else {
            if (rawQuery !== 'UNDEFINED') {
                return this.supabaseSource.getArticleByPageAndQuery(email, 1, rawQuery, onSuccess, onFailed)
            }
        }
    }

    getArticleById = (
        email:string,
        id: string | string[] | undefined,
        onSuccess: (data: { article_id: string; image: string; title: string; article_value: string; modified_time_inmillis: number; author: string; abstract: string; date: string; owned:boolean }) => void,
        onFailed: (message: string) => void
    ) => {
        const rawId = (typeof (id) === 'undefined')
            ? 'UNDEFINED'
            : (typeof (id) !== 'string')
                ? 'UNDEFINED'
                : id

        this.supabaseSource.getArticleById(email, rawId, onSuccess, onFailed)
    }

    addArticleToCart = (
        email: string,
        id: string | string[] | undefined,
        onSuccess: () => void,
        onFailed: (message: string) => void
    ) => {
        const rawId = (typeof (id) === 'undefined')
            ? 'UNDEFINED'
            : (typeof (id) !== 'string')
                ? 'UNDEFINED'
                : id

        this.supabaseSource.addArticleToCart(email, rawId, onSuccess, onFailed)
    }
}