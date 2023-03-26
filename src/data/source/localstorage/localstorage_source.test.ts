import { describe, expect } from "@jest/globals";
import { LocalStorageSource } from "./localstorage_source";

describe('localstorage module', () => {
    let localStorageSource = new LocalStorageSource()

    test('ture false test', () => {
        expect(localStorageSource.getEmail() || '').toBe('')
    })
})