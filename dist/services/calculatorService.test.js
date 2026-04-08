import { sum, sub, mul, div, calculator, } from '../services/calculatorService';
describe('Calculator Service - Basic Operations', () => {
    describe('sum', () => {
        it('should add two positive numbers', () => {
            expect(sum(2, 3)).toBe(5);
        });
        it('should add two negative numbers', () => {
            expect(sum(-2, -3)).toBe(-5);
        });
        it('should add positive and negative numbers', () => {
            expect(sum(10, -3)).toBe(7);
            expect(sum(-10, 3)).toBe(-7);
        });
        it('should add zero to a number', () => {
            expect(sum(5, 0)).toBe(5);
            expect(sum(0, 5)).toBe(5);
            expect(sum(0, 0)).toBe(0);
        });
        it('should handle decimal numbers', () => {
            expect(sum(1.5, 2.5)).toBe(4);
            expect(sum(0.1, 0.2)).toBeCloseTo(0.3, 5);
        });
        it('should handle large numbers', () => {
            expect(sum(1e10, 1e10)).toBe(2e10);
        });
    });
    describe('sub', () => {
        it('should subtract two positive numbers', () => {
            expect(sub(5, 3)).toBe(2);
            expect(sub(3, 5)).toBe(-2);
        });
        it('should subtract two negative numbers', () => {
            expect(sub(-5, -3)).toBe(-2);
            expect(sub(-3, -5)).toBe(2);
        });
        it('should subtract positive and negative numbers', () => {
            expect(sub(10, -3)).toBe(13);
            expect(sub(-10, 3)).toBe(-13);
        });
        it('should subtract zero from a number', () => {
            expect(sub(5, 0)).toBe(5);
            expect(sub(0, 5)).toBe(-5);
            expect(sub(0, 0)).toBe(0);
        });
        it('should handle decimal numbers', () => {
            expect(sub(5.5, 2.5)).toBe(3);
            expect(sub(0.3, 0.1)).toBeCloseTo(0.2, 5);
        });
        it('should handle large numbers', () => {
            expect(sub(1e10, 5e9)).toBe(5e9);
        });
    });
    describe('mul', () => {
        it('should multiply two positive numbers', () => {
            expect(mul(3, 4)).toBe(12);
            expect(mul(5, 6)).toBe(30);
        });
        it('should multiply two negative numbers', () => {
            expect(mul(-3, -4)).toBe(12);
            expect(mul(-5, -2)).toBe(10);
        });
        it('should multiply positive and negative numbers', () => {
            expect(mul(3, -4)).toBe(-12);
            expect(mul(-3, 4)).toBe(-12);
        });
        it('should multiply by zero', () => {
            expect(mul(5, 0)).toBe(0);
            expect(mul(0, 5)).toBe(0);
            expect(mul(0, 0)).toBe(0);
        });
        it('should multiply by one', () => {
            expect(mul(5, 1)).toBe(5);
            expect(mul(1, 5)).toBe(5);
            expect(mul(1, 1)).toBe(1);
        });
        it('should handle decimal numbers', () => {
            expect(mul(2.5, 4)).toBe(10);
            expect(mul(0.5, 0.5)).toBe(0.25);
        });
        it('should handle large numbers', () => {
            expect(mul(1e5, 1e5)).toBe(1e10);
        });
    });
    describe('div', () => {
        it('should divide two positive numbers', () => {
            expect(div(12, 3)).toBe(4);
            expect(div(10, 2)).toBe(5);
        });
        it('should divide two negative numbers', () => {
            expect(div(-12, -3)).toBe(4);
            expect(div(-10, -2)).toBe(5);
        });
        it('should divide positive and negative numbers', () => {
            expect(div(12, -3)).toBe(-4);
            expect(div(-12, 3)).toBe(-4);
        });
        it('should divide by one', () => {
            expect(div(5, 1)).toBe(5);
            expect(div(1, 1)).toBe(1);
        });
        it('should handle division resulting in decimals', () => {
            expect(div(5, 2)).toBe(2.5);
            expect(div(1, 3)).toBeCloseTo(0.333333, 5);
        });
        it('should handle zero as dividend', () => {
            expect(div(0, 5)).toBe(0);
            expect(Object.is(div(0, -5), 0) || Object.is(div(0, -5), -0)).toBe(true);
        });
        it('should handle division of decimal numbers', () => {
            expect(div(10.5, 2.1)).toBeCloseTo(5, 5);
        });
        it('should throw error when dividing by zero', () => {
            expect(() => div(5, 0)).toThrow();
        });
        it('should throw error when dividing zero by zero', () => {
            expect(() => div(0, 0)).toThrow();
        });
    });
});
describe('Calculator Service - Main Function', () => {
    describe('calculator function', () => {
        describe('addition operator', () => {
            it('should perform addition with + operator', () => {
                expect(calculator(5, 3, '+')).toBe(8);
            });
            it('should perform addition with negative numbers', () => {
                expect(calculator(-5, 3, '+')).toBe(-2);
            });
            it('should perform addition with decimals', () => {
                expect(calculator(1.5, 2.5, '+')).toBe(4);
            });
        });
        describe('subtraction operator', () => {
            it('should perform subtraction with - operator', () => {
                expect(calculator(10, 3, '-')).toBe(7);
            });
            it('should perform subtraction with negative numbers', () => {
                expect(calculator(-10, -3, '-')).toBe(-7);
            });
            it('should perform subtraction with decimals', () => {
                expect(calculator(5.5, 2.5, '-')).toBe(3);
            });
        });
        describe('multiplication operator', () => {
            it('should perform multiplication with * operator', () => {
                expect(calculator(4, 5, '*')).toBe(20);
            });
            it('should perform multiplication with negative numbers', () => {
                expect(calculator(-4, 5, '*')).toBe(-20);
            });
            it('should perform multiplication with zero', () => {
                expect(calculator(5, 0, '*')).toBe(0);
            });
            it('should perform multiplication with decimals', () => {
                expect(calculator(2.5, 4, '*')).toBe(10);
            });
        });
        describe('division operator', () => {
            it('should perform division with / operator', () => {
                expect(calculator(20, 4, '/')).toBe(5);
            });
            it('should perform division with negative numbers', () => {
                expect(calculator(-20, 4, '/')).toBe(-5);
            });
            it('should perform division with decimals', () => {
                expect(calculator(10, 4, '/')).toBe(2.5);
            });
            it('should throw error for division by zero', () => {
                expect(() => calculator(5, 0, '/')).toThrow();
            });
        });
        describe('invalid operators', () => {
            it('should throw error for unknown operator', () => {
                expect(() => calculator(5, 3, '^')).toThrow('Unknown operator: ^');
            });
            it('should throw error for empty operator', () => {
                expect(() => calculator(5, 3, '')).toThrow('Unknown operator: ');
            });
            it('should throw error for multiple character operators', () => {
                expect(() => calculator(5, 3, '++')).toThrow('Unknown operator: ++');
            });
            it('should throw error for invalid operator symbols', () => {
                expect(() => calculator(5, 3, '%')).toThrow('Unknown operator: %');
                expect(() => calculator(5, 3, '&')).toThrow('Unknown operator: &');
                expect(() => calculator(5, 3, '!')).toThrow('Unknown operator: !');
            });
        });
        describe('edge cases', () => {
            it('should handle operations with zero correctly', () => {
                expect(calculator(0, 0, '+')).toBe(0);
                expect(calculator(0, 0, '-')).toBe(0);
                expect(calculator(0, 0, '*')).toBe(0);
            });
            it('should handle very large numbers', () => {
                expect(calculator(1e10, 1e10, '+')).toBe(2e10);
                expect(calculator(1e10, 1e10, '*')).toBe(1e20);
            });
            it('should handle very small decimal numbers', () => {
                expect(calculator(0.001, 0.001, '+')).toBeCloseTo(0.002, 5);
                expect(calculator(0.1, 0.2, '+')).toBeCloseTo(0.3, 5);
            });
            it('should handle scientific notation', () => {
                expect(calculator(1e-5, 1e-5, '+')).toBeCloseTo(2e-5, 10);
            });
        });
    });
});
//# sourceMappingURL=calculatorService.test.js.map