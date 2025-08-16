// src/routes/operator.routes.ts
import { Router } from 'express';
import { createOperator, getAllOperators } from '../controllers/operator.controller';

const router = Router();

/**
 * @openapi
 * /operators:
 *   get:
 *     summary: Get all tour operators
 *     responses:
 *       200:
 *         description: List of all tour operators
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TourOperator'
 */
router.get('/', getAllOperators);

/**
 * @openapi
 * /operators:
 *   post:
 *     summary: Create a new tour operator
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TourOperator'
 *     responses:
 *       201:
 *         description: Operator created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TourOperator'
 */
router.post('/', createOperator);

export default router;