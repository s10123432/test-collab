import { Request, Response } from 'express';
import { calculateHandler } from '../../src/controllers/calculatorController';

describe('Calculator Controller', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let responseJson: jest.Mock;
  let responseStatus: jest.Mock;

  beforeEach(() => {
    responseJson = jest.fn().mockReturnValue(undefined);
    responseStatus = jest.fn().mockReturnValue({
      json: responseJson,
    });

    mockRequest = {
      body: {},
    };

    mockResponse = {
      json: responseJson,
      status: responseStatus,
    };
  });

  describe('Valid Requests', () => {
    it('should handle addition request successfully', () => {
      mockRequest.body = { a: 5, b: 3, operator: '+' };

      calculateHandler(mockRequest as Request, mockResponse as Response);

      expect(responseJson).toHaveBeenCalledWith({
        a: 5,
        b: 3,
        operator: '+',
        result: 8,
      });
    });

    it('should handle subtraction request successfully', () => {
      mockRequest.body = { a: 10, b: 4, operator: '-' };

      calculateHandler(mockRequest as Request, mockResponse as Response);

      expect(responseJson).toHaveBeenCalledWith({
        a: 10,
        b: 4,
        operator: '-',
        result: 6,
      });
    });

    it('should handle multiplication request successfully', () => {
      mockRequest.body = { a: 6, b: 7, operator: '*' };

      calculateHandler(mockRequest as Request, mockResponse as Response);

      expect(responseJson).toHaveBeenCalledWith({
        a: 6,
        b: 7,
        operator: '*',
        result: 42,
      });
    });

    it('should handle division request successfully', () => {
      mockRequest.body = { a: 20, b: 4, operator: '/' };

      calculateHandler(mockRequest as Request, mockResponse as Response);

      expect(responseJson).toHaveBeenCalledWith({
        a: 20,
        b: 4,
        operator: '/',
        result: 5,
      });
    });

    it('should handle decimal numbers in request', () => {
      mockRequest.body = { a: 5.5, b: 2.5, operator: '+' };

      calculateHandler(mockRequest as Request, mockResponse as Response);

      expect(responseJson).toHaveBeenCalledWith({
        a: 5.5,
        b: 2.5,
        operator: '+',
        result: 8,
      });
    });

    it('should handle negative numbers in request', () => {
      mockRequest.body = { a: -10, b: -5, operator: '+' };

      calculateHandler(mockRequest as Request, mockResponse as Response);

      expect(responseJson).toHaveBeenCalledWith({
        a: -10,
        b: -5,
        operator: '+',
        result: -15,
      });
    });

    it('should handle zero values in request', () => {
      mockRequest.body = { a: 0, b: 5, operator: '+' };

      calculateHandler(mockRequest as Request, mockResponse as Response);

      expect(responseJson).toHaveBeenCalledWith({
        a: 0,
        b: 5,
        operator: '+',
        result: 5,
      });
    });

    it('should handle large numbers', () => {
      mockRequest.body = { a: 1e10, b: 1e10, operator: '+' };

      calculateHandler(mockRequest as Request, mockResponse as Response);

      expect(responseJson).toHaveBeenCalledWith({
        a: 1e10,
        b: 1e10,
        operator: '+',
        result: 2e10,
      });
    });
  });

  describe('Invalid Input - Missing Parameters', () => {
    it('should return error when "a" is missing', () => {
      mockRequest.body = { b: 3, operator: '+' };

      calculateHandler(mockRequest as Request, mockResponse as Response);

      expect(responseStatus).toHaveBeenCalledWith(400);
      expect(responseJson).toHaveBeenCalledWith({
        error: 'Invalid input: a and b must be numbers',
      });
    });

    it('should return error when "b" is missing', () => {
      mockRequest.body = { a: 5, operator: '+' };

      calculateHandler(mockRequest as Request, mockResponse as Response);

      expect(responseStatus).toHaveBeenCalledWith(400);
      expect(responseJson).toHaveBeenCalledWith({
        error: 'Invalid input: a and b must be numbers',
      });
    });

    it('should return error when "operator" is missing', () => {
      mockRequest.body = { a: 5, b: 3 };

      calculateHandler(mockRequest as Request, mockResponse as Response);

      expect(responseStatus).toHaveBeenCalledWith(400);
      expect(responseJson).toHaveBeenCalledWith({
        error: 'Invalid input: operator must be a string',
      });
    });

    it('should return error when all parameters are missing', () => {
      mockRequest.body = {};

      calculateHandler(mockRequest as Request, mockResponse as Response);

      expect(responseStatus).toHaveBeenCalledWith(400);
    });
  });

  describe('Invalid Input - Wrong Types', () => {
    it('should return error when "a" is not a number', () => {
      mockRequest.body = { a: 'five', b: 3, operator: '+' };

      calculateHandler(mockRequest as Request, mockResponse as Response);

      expect(responseStatus).toHaveBeenCalledWith(400);
      expect(responseJson).toHaveBeenCalledWith({
        error: 'Invalid input: a and b must be numbers',
      });
    });

    it('should return error when "b" is not a number', () => {
      mockRequest.body = { a: 5, b: 'three', operator: '+' };

      calculateHandler(mockRequest as Request, mockResponse as Response);

      expect(responseStatus).toHaveBeenCalledWith(400);
      expect(responseJson).toHaveBeenCalledWith({
        error: 'Invalid input: a and b must be numbers',
      });
    });

    it('should return error when "a" is null', () => {
      mockRequest.body = { a: null, b: 3, operator: '+' };

      calculateHandler(mockRequest as Request, mockResponse as Response);

      expect(responseStatus).toHaveBeenCalledWith(400);
      expect(responseJson).toHaveBeenCalledWith({
        error: 'Invalid input: a and b must be numbers',
      });
    });

    it('should return error when "b" is null', () => {
      mockRequest.body = { a: 5, b: null, operator: '+' };

      calculateHandler(mockRequest as Request, mockResponse as Response);

      expect(responseStatus).toHaveBeenCalledWith(400);
      expect(responseJson).toHaveBeenCalledWith({
        error: 'Invalid input: a and b must be numbers',
      });
    });

    it('should return error when "a" is undefined', () => {
      mockRequest.body = { a: undefined, b: 3, operator: '+' };

      calculateHandler(mockRequest as Request, mockResponse as Response);

      expect(responseStatus).toHaveBeenCalledWith(400);
      expect(responseJson).toHaveBeenCalledWith({
        error: 'Invalid input: a and b must be numbers',
      });
    });

    it('should return error when "operator" is not a string', () => {
      mockRequest.body = { a: 5, b: 3, operator: 1 };

      calculateHandler(mockRequest as Request, mockResponse as Response);

      expect(responseStatus).toHaveBeenCalledWith(400);
      expect(responseJson).toHaveBeenCalledWith({
        error: 'Invalid input: operator must be a string',
      });
    });

    it('should return error when "operator" is null', () => {
      mockRequest.body = { a: 5, b: 3, operator: null };

      calculateHandler(mockRequest as Request, mockResponse as Response);

      expect(responseStatus).toHaveBeenCalledWith(400);
      expect(responseJson).toHaveBeenCalledWith({
        error: 'Invalid input: operator must be a string',
      });
    });

    it('should return error when "a" is an array', () => {
      mockRequest.body = { a: [5], b: 3, operator: '+' };

      calculateHandler(mockRequest as Request, mockResponse as Response);

      expect(responseStatus).toHaveBeenCalledWith(400);
    });

    it('should return error when "a" is an object', () => {
      mockRequest.body = { a: { value: 5 }, b: 3, operator: '+' };

      calculateHandler(mockRequest as Request, mockResponse as Response);

      expect(responseStatus).toHaveBeenCalledWith(400);
    });

    it('should return error when "a" is boolean', () => {
      mockRequest.body = { a: true, b: 3, operator: '+' };

      calculateHandler(mockRequest as Request, mockResponse as Response);

      expect(responseStatus).toHaveBeenCalledWith(400);
    });
  });

  describe('Invalid Operators', () => {
    it('should return error for unknown operator ^', () => {
      mockRequest.body = { a: 5, b: 3, operator: '^' };

      calculateHandler(mockRequest as Request, mockResponse as Response);

      expect(responseStatus).toHaveBeenCalledWith(400);
      expect(responseJson).toHaveBeenCalledWith({
        error: 'Unknown operator: ^',
      });
    });

    it('should return error for unknown operator %', () => {
      mockRequest.body = { a: 5, b: 3, operator: '%' };

      calculateHandler(mockRequest as Request, mockResponse as Response);

      expect(responseStatus).toHaveBeenCalledWith(400);
      expect(responseJson).toHaveBeenCalledWith({
        error: 'Unknown operator: %',
      });
    });

    it('should return error for empty operator string', () => {
      mockRequest.body = { a: 5, b: 3, operator: '' };

      calculateHandler(mockRequest as Request, mockResponse as Response);

      expect(responseStatus).toHaveBeenCalledWith(400);
      expect(responseJson).toHaveBeenCalledWith({
        error: 'Unknown operator: ',
      });
    });

    it('should return error for multiple character operator', () => {
      mockRequest.body = { a: 5, b: 3, operator: '++' };

      calculateHandler(mockRequest as Request, mockResponse as Response);

      expect(responseStatus).toHaveBeenCalledWith(400);
      expect(responseJson).toHaveBeenCalledWith({
        error: 'Unknown operator: ++',
      });
    });

    it('should be case-sensitive for operators', () => {
      mockRequest.body = { a: 5, b: 3, operator: 'Plus' };

      calculateHandler(mockRequest as Request, mockResponse as Response);

      expect(responseStatus).toHaveBeenCalledWith(400);
      expect(responseJson).toHaveBeenCalledWith({
        error: 'Unknown operator: Plus',
      });
    });
  });

  describe('Division Edge Cases', () => {
    it('should return error when dividing by zero', () => {
      mockRequest.body = { a: 5, b: 0, operator: '/' };

      calculateHandler(mockRequest as Request, mockResponse as Response);

      expect(responseStatus).toHaveBeenCalledWith(400);
      expect(responseJson).toHaveBeenCalledWith({
        error: 'Cannot divide by zero',
      });
    });

    it('should return error when dividing zero by zero', () => {
      mockRequest.body = { a: 0, b: 0, operator: '/' };

      calculateHandler(mockRequest as Request, mockResponse as Response);

      expect(responseStatus).toHaveBeenCalledWith(400);
    });

    it('should handle division with very small divisor', () => {
      mockRequest.body = { a: 1, b: 0.001, operator: '/' };

      calculateHandler(mockRequest as Request, mockResponse as Response);

      expect(responseJson).toHaveBeenCalledWith({
        a: 1,
        b: 0.001,
        operator: '/',
        result: 1000,
      });
    });
  });

  describe('Numeric Edge Cases', () => {
    it('should handle Infinity correctly', () => {
      mockRequest.body = { a: Infinity, b: 5, operator: '+' };

      calculateHandler(mockRequest as Request, mockResponse as Response);

      expect(responseJson).toHaveBeenCalledWith({
        a: Infinity,
        b: 5,
        operator: '+',
        result: Infinity,
      });
    });

    it('should handle NaN in result', () => {
      mockRequest.body = { a: 0, b: 0, operator: '/' };

      calculateHandler(mockRequest as Request, mockResponse as Response);

      expect(responseStatus).toHaveBeenCalledWith(400);
    });
  });

  describe('Response Structure', () => {
    it('should always return status code for valid request', () => {
      mockRequest.body = { a: 5, b: 3, operator: '+' };

      calculateHandler(mockRequest as Request, mockResponse as Response);

      expect(responseJson).toHaveBeenCalled();
    });

    it('should return json response with correct structure', () => {
      mockRequest.body = { a: 5, b: 3, operator: '+' };

      calculateHandler(mockRequest as Request, mockResponse as Response);

      const callArg = responseJson.mock.calls[0][0];
      expect(callArg).toHaveProperty('a');
      expect(callArg).toHaveProperty('b');
      expect(callArg).toHaveProperty('operator');
      expect(callArg).toHaveProperty('result');
    });

    it('should return error object on failure', () => {
      mockRequest.body = { a: 'invalid', b: 3, operator: '+' };

      calculateHandler(mockRequest as Request, mockResponse as Response);

      const callArg = responseJson.mock.calls[0][0];
      expect(callArg).toHaveProperty('error');
      expect(typeof callArg.error).toBe('string');
    });

    it('should not have result property in error response', () => {
      mockRequest.body = { a: 'invalid', b: 3, operator: '+' };

      calculateHandler(mockRequest as Request, mockResponse as Response);

      const callArg = responseJson.mock.calls[0][0];
      expect(callArg).not.toHaveProperty('result');
    });
  });

  describe('Whitespace and Special Characters', () => {
    it('should reject operator with whitespace', () => {
      mockRequest.body = { a: 5, b: 3, operator: ' + ' };

      calculateHandler(mockRequest as Request, mockResponse as Response);

      expect(responseStatus).toHaveBeenCalledWith(400);
      expect(responseJson).toHaveBeenCalledWith({
        error: expect.stringContaining('Unknown operator'),
      });
    });

    it('should handle operator as single space', () => {
      mockRequest.body = { a: 5, b: 3, operator: ' ' };

      calculateHandler(mockRequest as Request, mockResponse as Response);

      expect(responseStatus).toHaveBeenCalledWith(400);
    });
  });

  describe('Extra Parameters in Request', () => {
    it('should ignore extra parameters in request body', () => {
      mockRequest.body = { a: 5, b: 3, operator: '+', extra: 'value' };

      calculateHandler(mockRequest as Request, mockResponse as Response);

      expect(responseJson).toHaveBeenCalledWith({
        a: 5,
        b: 3,
        operator: '+',
        result: 8,
      });
    });

    it('should work with multiple extra parameters', () => {
      mockRequest.body = {
        a: 5,
        b: 3,
        operator: '+',
        extra1: 'value',
        extra2: 123,
      };

      calculateHandler(mockRequest as Request, mockResponse as Response);

      expect(responseJson).toHaveBeenCalledWith({
        a: 5,
        b: 3,
        operator: '+',
        result: 8,
      });
    });
  });
});
