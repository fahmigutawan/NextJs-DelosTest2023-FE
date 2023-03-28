import { beforeEach, describe, expect } from "@jest/globals";
import { ApiSource } from "../source/api/api_source";
import { LocalStorageSource } from "../source/localstorage/localstorage_source";
import { SupabaseSource } from "../source/supabase/supabase_source";
import { Repository } from "./repository";

describe('Repository test', () => {
    let apiSource: ApiSource
    let localStorageSource: LocalStorageSource
    let supabaseSource: SupabaseSource
    let repository: Repository

    beforeEach(() => {
        apiSource = new ApiSource()
        localStorageSource = new LocalStorageSource()
        supabaseSource = new SupabaseSource()

        repository = new Repository(
            apiSource,
            localStorageSource,
            supabaseSource
        )
    })

    describe('Register test', () => {
        test('Register with no email', () => {
            let res = ''
            repository.register(
                '',
                'abc123456',
                'Name Test',
                () => { },
                (error) => {
                    res = error
                }
            )

            expect(res).toBe('Input the email')
        })

        test('Register with wrong email', () => {
            let res = ''
            repository.register(
                'fahmigutawan.com',
                'abc123456',
                'Name Test',
                () => { },
                (error) => {
                    res = error
                }
            )

            expect(res).toBe('Input the correct email format')
        })

        test('Register with no password', () => {
            let res = ''
            repository.register(
                'unittest@gmail.com',
                '',
                'Name Test',
                () => { },
                (error) => {
                    res = error
                }
            )

            expect(res).toBe('Input the password')
        })

        test('Register with less than 8 letters password', () => {
            let res = ''
            repository.register(
                'unittest@gmail.com',
                '1234567',
                'Name Test',
                () => { },
                (error) => {
                    res = error
                }
            )

            expect(res).toBe('Password must contains 8 letters or more')
        })

        test('Register with no name', () => {
            let res = ''
            repository.register(
                'unittest@gmail.com',
                '12345678',
                '',
                () => { },
                (error) => {
                    res = error
                }
            )

            expect(res).toBe('Input your name')
        })
    })

    describe('Login test', () => {
        test('Login with no email', () => {
            let res = ''
            repository.login(
                '',
                'abc123456',
                () => { },
                (error) => {
                    res = error
                }
            )

            expect(res).toBe('Input the email')
        })

        test('Login with wrong email', () => {
            let res = ''
            repository.login(
                'fahmigutawan.com',
                'abc123456',
                () => { },
                (error) => {
                    res = error
                }
            )

            expect(res).toBe('Input the correct email format')
        })

        test('Login with no password', () => {
            let res = ''
            repository.login(
                'unittest@gmail.com',
                '',
                () => { },
                (error) => {
                    res = error
                }
            )

            expect(res).toBe('Input the password')
        })

        test('Login with less than 8 letters password', () => {
            let res = ''
            repository.login(
                'unittest@gmail.com',
                '1234567',
                () => { },
                (error) => {
                    res = error
                }
            )

            expect(res).toBe('Password must contains 8 letters or more')
        })
    })
})