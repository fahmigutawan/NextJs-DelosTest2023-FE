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

        test('Register with more than 20 letters password', () => {
            let res = ''
            repository.register(
                'unittest@gmail.com',
                '1234567910111314151617181920',
                'Name Test',
                () => { },
                (error) => {
                    res = error
                }
            )

            expect(res).toBe('Password must less than 20 letters')
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

        test('Register with more than 30 letters', () => {
            let res = ''
            repository.register(
                'unittest@gmail.com',
                '12345678',
                'abaskdflasjdlfjalsjdflajskldfjlasdjflajsldfjlakjsdfljalsdjflasjdlfjasldkfjlaskjdflkjasdflkj',
                () => { },
                (error) => {
                    res = error
                }
            )

            expect(res).toBe('Name too long, must less than 30 letters')
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

    describe('Get user by Email test', () => {
        test('Get user with no email', () => {
            let res = ''
            repository.getUserByEmail(
                '',
                () => { },
                (error) => {
                    res = error
                }
            )

            expect(res).toBe('Input the email')
        })

        test('Get user with wrong email', () => {
            let res = ''
            repository.getUserByEmail(
                'fahmigutawan.com',
                () => { },
                (error) => {
                    res = error
                }
            )

            expect(res).toBe('Input the correct email format')
        })
    })

    describe('Get article by Page test', () => {
        test('Get article by Page with no email', () => {
            let res = ''
            repository.getArticleByPage(
                '',
                '1',
                () => { },
                (error) => {
                    res = error
                }
            )

            expect(res).toBe('Input the email')
        })

        test('Get article by Page with wrong email', () => {
            let res = ''
            repository.getArticleByPage(
                'fahmigutawan.com',
                '1',
                () => { },
                (error) => {
                    res = error
                }
            )

            expect(res).toBe('Input the correct email format')
        })
    })

    describe('Get article by Page with Query test', () => {
        test('Get article by Page with Query with no email', () => {
            let res = ''
            repository.getArticleByPageAndQuery(
                '',
                '1',
                'some query',
                () => { },
                (error) => {
                    res = error
                }
            )

            expect(res).toBe('Input the email')
        })

        test('Get article by Page with Query with wrong email', () => {
            let res = ''
            repository.getArticleByPageAndQuery(
                'fahmigutawan.com',
                '1',
                'some query',
                () => { },
                (error) => {
                    res = error
                }
            )

            expect(res).toBe('Input the correct email format')
        })

        test('Get article by Page with Query with no query', () => {
            let res = ''
            repository.getArticleByPageAndQuery(
                'fahmigutawan@gmail.com',
                '1',
                '',
                () => { },
                (error) => {
                    res = error
                }
            )

            expect(res).toBe('')
        })
    })

    describe('Get article by Id test', () => {
        test('Get article by Id with no email', () => {
            let res = ''
            repository.getArticleById(
                '',
                'Some ID',
                () => { },
                (error) => {
                    res = error
                }
            )

            expect(res).toBe('Input the email')
        })

        test('Get article by Id with wrong email', () => {
            let res = ''
            repository.getArticleById(
                'fahmigutawan.com',
                'Some ID',
                () => { },
                (error) => {
                    res = error
                }
            )

            expect(res).toBe('Input the correct email format')
        })
    })

    describe('Add article to cart test', () => {
        test('Add article to cart with no email', () => {
            let res = ''
            repository.addArticleToCart(
                '',
                'Some ID',
                () => { },
                (error) => {
                    res = error
                }
            )

            expect(res).toBe('Input the email')
        })

        test('Add article to cart with wrong email', () => {
            let res = ''
            repository.addArticleToCart(
                'fahmigutawan.com',
                'Some ID',
                () => { },
                (error) => {
                    res = error
                }
            )

            expect(res).toBe('Input the correct email format')
        })
    })
})