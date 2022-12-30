// const palindrome = require('../utils/for_testing').palindrome

import {palindrome} from "../utils/for_testing"

describe('palindrome', () => {
    test('palindrome of a', () => {
        const result = palindrome('a')

        expect(result).toBe('a')
    })

    test('palindrome of react', () => {
        const result = palindrome('react')

        expect(result).toBe('tcaer')
    })

    test('palindrome of releveler', () => {
        const result = palindrome('releveler')

        expect(result).toBe('releveler')
    })

    test('palindrom of react', () => {
        const result = palindrome('react')

        expect(result).toBe('tkaer')
    })
})
