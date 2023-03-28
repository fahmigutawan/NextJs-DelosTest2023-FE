import { beforeEach, describe } from "@jest/globals";
import { SupabaseSource } from "./supabase_source";

describe('SupabaseSource test', () => {
    let supabaseSource: SupabaseSource

    beforeEach(() => {
        supabaseSource = new SupabaseSource()
    })

    describe('Register test', () => {
        test('Register with registered email', async () => {
            let res = ''

            supabaseSource.register(
                'test@gmail.com',
                '12345678910',
                'Registered Name',
                () => { },
                (error) => {
                    res = error
                }
            )
            await new Promise((resolve) => setTimeout(resolve, 2000))
            expect(res).toBe('Email has been registered, try another email')
        })
    })

    describe('Get article by Page test', () => {
        test('Get article by Page with NaN Page', () => {
            let res = ''
            supabaseSource.getArticleByPage(
                'test@gmail.com',
                NaN,
                () => { },
                (error) => {
                    res = error
                }
            )

            expect(res).toBe('Insert the correct page')
        })
    })

    describe('Get article by Page and Query test', () => {
        test('Get article by Page and Query with NaN Page', () => {
            let res = ''
            supabaseSource.getArticleByPageAndQuery(
                'test@gmail.com',
                NaN,
                '',
                () => { },
                (error) => {
                    res = error
                }
            )

            expect(res).toBe('Insert the correct page')
        })
    })
})