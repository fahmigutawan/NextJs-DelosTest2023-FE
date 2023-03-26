const { beforeEach } = require('node:test');
const Repository = require('./repository');
const SupabaseSource = require('../source/supabase/supabase_source')
const ApiSource = require('../source/api/api_source')
const LocalStorageSource = require('../source/localstorage/localstorage_source')

describe('test repository', () => {
    let repository;
    let apiSource;
    let localStorageSource;
    let supabaseSource;

    beforeEach(() => {
        apiSource = new ApiSource()
        supabaseSource = new SupabaseSource()
        localStorageSource = new LocalStorageSource()

        repository = new Repository(apiSource, localStorageSource, supabaseSource)
    })

    test('true false case', () => {
        expect(true).toBe(true)
    })
})