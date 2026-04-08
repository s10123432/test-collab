export const sum = (a, b) => a + b;
export const sub = (a, b) => a - b;
export const mul = (a, b) => a * b;
export const div = (a, b) => a / b;
export const calculator = (a, b, operator) => {
    switch (operator) {
        case "+":
            return sum(a, b);
        case "-":
            return sub(a, b);
        case "*":
            return mul(a, b);
        case "/":
            return div(a, b);
        default:
            throw new Error(`Unknown operator: ${operator}`);
    }
};
//# sourceMappingURL=calculatorService.js.map