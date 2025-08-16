// src/controllers/route.controller.ts
import { Request, Response } from 'express';
import TripRoute  from '../models';
import TourOperator from '../models/tour-operator.model';

export const getRoutes = async (req: Request, res: Response) => {
  try {
    
    const routes = await TripRoute.TripRoute.findAll({
      include: [{ model: TourOperator, as: 'operator' }],
    });
    res.json(routes);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching routes', error: err });
  }
};

export const createRoute = async (req: Request, res: Response) => {
  try {
    const { operatorId } = req.body;

    const operator = await TourOperator.findByPk(operatorId);
    if (!operator) {
      return res.status(400).json({ message: `Operator with id ${operatorId} not found.` });
    }

    const route = await TripRoute.TripRoute.create(req.body);
    res.status(201).json(route);
  } catch (err: any) {
    res.status(400).json({ message: 'Error creating route', error: err.message });
  }
};

export const getRouteById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const route = await TripRoute.TripRoute.findByPk(id, {
      include: [{ model: TourOperator, as: 'operator' }]
    });

    if (!route) {
      return res.status(404).json({ message: 'Route not found' });
    }

    res.json(route);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching route', error: err });
  }
};