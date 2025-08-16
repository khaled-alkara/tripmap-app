import { Router } from 'express';
import { 
  getNearbyAds, 
  createAd, 
  getAdsByRoute, 
  updateAd, 
  deleteAd 
} from '../controllers/ad.controller';

const router = Router();

/**
 * @openapi
 * /ads/nearby:
 *   get:
 *     summary: Get advertisements near a location
 *     description: Returns a list of ads within the radius of the given coordinates, filtered by route.
 *     parameters:
 *       - in: query
 *         name: lat
 *         required: true
 *         schema:
 *           type: number
 *           format: double
 *         description: Latitude of the user's current location
 *       - in: query
 *         name: lng
 *         required: true
 *         schema:
 *           type: number
 *           format: double
 *         description: Longitude of the user's current location
 *       - in: query
 *         name: routeId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the trip route
 *     responses:
 *       200:
 *         description: List of nearby ads
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Advertisement'
 *       400:
 *         description: Invalid or missing parameters (lat, lng, routeId)
 *       500:
 *         description: Internal server error
 */
router.get('/nearby', getNearbyAds);

/**
 * @openapi
 * /ads/route/{routeId}:
 *   get:
 *     summary: Get all ads for a specific route
 *     parameters:
 *       - in: path
 *         name: routeId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the route
 *     responses:
 *       200:
 *         description: List of ads for the route
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Advertisement'
 */
router.get('/route/:routeId', getAdsByRoute);     // GET /api/ads/route/5

/** 
* @openapi
 * /ads:
 *   post:
 *     summary: Create a new advertisement
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Advertisement'
 *     responses:
 *       201:
 *         description: Ad created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Advertisement'
 */
router.post('/', createAd);                       // POST /api/ads

/**
 * @openapi
 * /ads/{id}:
 *   put:
 *     summary: Update an advertisement by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Unique ID of the advertisement
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Advertisement'
 *     responses:
 *       200:
 *         description: Ad updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Advertisement'
 *       404:
 *         description: Ad not found
 *       400:
 *         description: Invalid data
 */
router.put('/:id', updateAd);                     // PUT /api/ads/3

/**
 * @openapi
 * /ads/{id}:
 *   delete:
 *     summary: Delete an advertisement by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Unique ID of the advertisement
 *     responses:
 *       204:
 *         description: Ad deleted successfully
 *       404:
 *         description: Ad not found
 */
router.delete('/:id', deleteAd);                  // DELETE /api/ads/3

export default router;