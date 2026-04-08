export const sum = (a: number, b: number) => a + b;
export const sub = (a: number, b: number) => a - b;
export const mul = (a: number, b: number) => a * b;
export const div = (a: number, b: number) => {
  if (b === 0) {
    throw new Error('Cannot divide by zero');
  }
  return a / b;
};

export const calculator = (a: number, b: number, operator: string): number => {
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
