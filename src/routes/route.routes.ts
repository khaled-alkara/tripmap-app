// src/routes/route.routes.ts
import { Router } from 'express';
import { getRoutes, createRoute, getRouteById } from '../controllers/route.controller';

const router = Router();

/**
 * @openapi
 * /routes:
 *   get:
 *     summary: Get all trip routes
 *     responses:
 *       200:
 *         description: List of all routes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TripRoute'
 */
router.get('/', getRoutes);           // GET /api/routes


/**
 * @openapi
 * /routes/{id}:
 *   get:
 *     summary: Get a specific trip route by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Unique ID of the route
 *     responses:
 *       200:
 *         description: Successfully returned the route
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TripRoute'
 *       404:
 *         description: Route not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Route not found
 */
router.get('/:id', getRouteById);    // ✅ GET /api/routes/5


/**
 * @openapi
 * /routes:
 *   post:
 *     summary: Create a new trip route
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TripRoute'
 *     responses:
 *       201:
 *         description: Route created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TripRoute'
 */
router.post('/', createRoute);       // POST /api/routes

export default router;