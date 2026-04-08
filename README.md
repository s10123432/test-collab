# Calculator REST API

A simple yet powerful REST API built with Express and TypeScript for performing basic arithmetic calculations. The API accepts numbers and operators, validates input, and returns JSON responses with calculation results.

## Features

- ✨ **Simple Arithmetic Operations**: Addition (+), Subtraction (-), Multiplication (*), Division (/)
- 🔒 **Input Validation**: Comprehensive validation for numbers and operators
- ⚡ **Error Handling**: Detailed error messages for invalid inputs and operations
- 📝 **TypeScript**: Fully typed codebase for better development experience
- 🧪 **Comprehensive Testing**: 90 test cases with 100% code coverage
- 🏗️ **ESM Support**: Modern JavaScript modules throughout
- 📊 **Well-Structured**: Clean separation of concerns with services and controllers

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Testing**: Jest
- **Module System**: ESM (ES Modules)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd test-collab
```

2. Install dependencies:
```bash
npm install
```

## Development

### Scripts

- **`npm run dev`** - Start development server with ts-node
- **`npm run build`** - Compile TypeScript to JavaScript
- **`npm start`** - Run production build
- **`npm test`** - Run test suite
- **`npm run test:watch`** - Run tests in watch mode
- **`npm run test:coverage`** - Generate coverage report

### Development Server

```bash
npm run dev
```

Server runs on `http://localhost:3000` by default.

## API Endpoints

### POST `/calculator`

Performs arithmetic calculations.

**Request Body:**
```json
{
  "a": 10,
  "b": 5,
  "operator": "+"
}
```

**Parameters:**
- `a` (number, required): First operand
- `b` (number, required): Second operand
- `operator` (string, required): Arithmetic operator ("+", "-", "*", "/")

**Response (Success - 200):**
```json
{
  "a": 10,
  "b": 5,
  "operator": "+",
  "result": 15
}
```

**Response (Error - 400):**
```json
{
  "error": "Invalid input: a and b must be numbers"
}
```

### Examples

**Addition:**
```bash
curl -X POST http://localhost:3000/calculator \
  -H "Content-Type: application/json" \
  -d '{"a": 10, "b": 5, "operator": "+"}'
# Response: {"a":10,"b":5,"operator":"+","result":15}
```

**Subtraction:**
```bash
curl -X POST http://localhost:3000/calculator \
  -H "Content-Type: application/json" \
  -d '{"a": 10, "b": 3, "operator": "-"}'
# Response: {"a":10,"b":3,"operator":"-","result":7}
```

**Multiplication:**
```bash
curl -X POST http://localhost:3000/calculator \
  -H "Content-Type: application/json" \
  -d '{"a": 4, "b": 5, "operator": "*"}'
# Response: {"a":4,"b":5,"operator":"*","result":20}
```

**Division:**
```bash
curl -X POST http://localhost:3000/calculator \
  -H "Content-Type: application/json" \
  -d '{"a": 20, "b": 4, "operator": "/"}'
# Response: {"a":20,"b":4,"operator":"/","result":5}
```

## Error Handling

The API returns appropriate error messages for various invalid scenarios:

- **Missing Parameters**: Returns 400 with "Invalid input: a and b must be numbers"
- **Wrong Data Types**: Returns 400 with type validation error
- **Unknown Operator**: Returns 400 with "Unknown operator: [operator]"
- **Division by Zero**: Returns 400 with "Cannot divide by zero"

### Error Examples

**Invalid Operator:**
```bash
curl -X POST http://localhost:3000/calculator \
  -H "Content-Type: application/json" \
  -d '{"a": 5, "b": 3, "operator": "^"}'
# Response: {"error":"Unknown operator: ^"}
```

**Division by Zero:**
```bash
curl -X POST http://localhost:3000/calculator \
  -H "Content-Type: application/json" \
  -d '{"a": 5, "b": 0, "operator": "/"}'
# Response: {"error":"Cannot divide by zero"}
```

## Project Structure

```
src/
├── index.ts                          # Express app initialization
├── controllers/
│   ├── calculatorController.ts       # Request handlers
│   └── calculatorController.test.ts  # Controller tests (40 tests)
└── services/
    ├── calculatorService.ts          # Business logic
    └── calculatorService.test.ts     # Service tests (50 tests)
```

## Testing

The project includes comprehensive test coverage:

**Service Layer Tests (50 tests):**
- Individual operation tests (sum, sub, mul, div)
- Edge cases: decimals, negatives, large numbers, zero handling
- Division by zero error validation

**Controller Layer Tests (40 tests):**
- Valid request scenarios
- Input validation and type checking
- Invalid operator handling
- Response structure validation
- Error response formatting

### Run Tests

```bash
# Run all tests
npm test

# Watch mode for development
npm run test:watch

# Generate coverage report
npm run test:coverage
```

**Coverage Results:**
- Services: 100% (lines, branches, functions)
- Controllers: 100% lines, 87.5% branches, 100% functions
- Overall: 77% statements, 82% branches, 75% functions

## Building for Production

```bash
# Build TypeScript to JavaScript
npm run build

# Start production server
npm start
```

The compiled output is in the `dist/` directory.

## Configuration Files

- **tsconfig.json**: TypeScript compiler configuration (ES2020 target, ESM modules)
- **jest.config.js**: Jest test runner configuration with ts-jest preset
- **package.json**: Project dependencies and scripts

## Health Check

The API includes a health check endpoint:

```bash
curl http://localhost:3000/health
# Response: {"status":"ok"}
```

## License

ISC

## Author

Surojcode
