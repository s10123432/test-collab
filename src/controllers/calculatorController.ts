import { Request, Response } from 'express';
import { calculator } from '../services/calculatorService.js';

export const calculateHandler = (req: Request, res: Response): void => {
  try {
    const { a, b, operator } = req.body;

    // Validate input
    if (typeof a !== 'number' || typeof b !== 'number') {
      res.status(400).json({
        error: 'Invalid input: a and b must be numbers',
      });
      return;
    }

    if (typeof operator !== 'string') {
      res.status(400).json({
        error: 'Invalid input: operator must be a string',
      });
      return;
    }

    const result = calculator(a, b, operator);

    res.json({
      a,
      b,
      operator,
      result,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    res.status(400).json({
      error: message,
    });
  }
};
