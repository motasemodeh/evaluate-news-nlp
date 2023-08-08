
import "babel-polyfill";

// Import the js file to test
import { polarityChecker } from "../src/client/js/formHandler.js"

describe('Testing polarity translation functionality', () => {
    test('Testing the polarityChecker() function', () => {

        expect(polarityChecker('P+')).toBe('STRONG POSITIVE')
    })

    test('Testing the polarityChecker() function', () => {
        expect(polarityChecker('P')).toBe('POSITIVE')
    })

    test('Testing the polarityChecker() function', () => {
        expect(polarityChecker('NEW')).toBe('NEUTRAL')
    })

    test('Testing the polarityChecker() function', () => {
        expect(polarityChecker('N')).toBe('NEGATIVE')
    })

    test('Testing the polarityChecker() function', () => {
        expect(polarityChecker('N+')).toBe('STRONG NEGATIVE')
    })

    test('Testing the polarityChecker() function', () => {
        expect(polarityChecker('NONE')).toBe('NO SENTIMENT')
    })

    test('Testing the polarityChecker() function', () => {
        expect(polarityChecker).toBeDefined();
    })

});