// src/controllers/operator.controller.ts
import { Request, Response } from 'express';
import TourOperator from '../models/tour-operator.model';

export const createOperator = async (req: Request, res: Response) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required.' });
    }

    const operator = await TourOperator.create({ name, email, phone });
    res.status(201).json(operator);
  } catch (err: any) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'Email already exists.' });
    }
    res.status(500).json({ message: 'Error creating operator', error: err.message });
  }
};

export const getAllOperators = async (_: Request, res: Response) => {
  try {
    const operators = await TourOperator.findAll();
    res.json(operators);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching operators', error: err });
  }
};