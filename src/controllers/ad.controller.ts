import { Request, Response } from 'express';
import Advertisement  from '../models';

// Haversine formula to calculate distance between two points (in meters)
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371e3; // Earth radius in meters
  const φ1 = lat1 * Math.PI / 180;
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lng2 - lng1) * Math.PI / 180;

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  return R * c; // in meters
}

export const getNearbyAds = async (req: Request, res: Response) => {
  const { lat, lng, routeId } = req.query;

  const userLat = parseFloat(lat as string);
  const userLng = parseFloat(lng as string);
  const routeIdNum = parseInt(routeId as string, 10);

  if (isNaN(userLat) || isNaN(userLng) || isNaN(routeIdNum)) {
    return res.status(400).json({ message: 'Invalid latitude, longitude, or route ID' });
  }

  try {
    const ads = await Advertisement.Advertisement.findAll({
      where: { routeId: routeIdNum }
    });

    const nearby = ads.filter(ad => {
      const distance = calculateDistance(
        userLat,
        userLng,
        (ad.location as any).lat,
        (ad.location as any).lng
      );
      return distance <= ad.radiusMeters;
    });

    res.json(nearby);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching nearby ads', error: err });
  }
};

// Create a new ad
export const createAd = async (req: Request, res: Response) => {
  try {
    const ad = await Advertisement.Advertisement.create(req.body);
    res.status(201).json(ad);
  } catch (err: any) {
    res.status(400).json({ message: 'Error creating ad', error: err.message });
  }
};

// Get all ads for a route
export const getAdsByRoute = async (req: Request, res: Response) => {
  const { routeId } = req.params;

  try {
    const ads = await Advertisement.Advertisement.findAll({
      where: { routeId }
    });
    res.json(ads);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching ads', error: err });
  }
};

// Update an ad
export const updateAd = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const ad = await Advertisement.Advertisement.findByPk(id);
    if (!ad) {
      return res.status(404).json({ message: 'Ad not found' });
    }

    await ad.update(req.body);
    res.json(ad);
  } catch (err: any) {
    res.status(400).json({ message: 'Error updating ad', error: err.message });
  }
};

// Delete an ad
export const deleteAd = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const ad = await Advertisement.Advertisement.findByPk(id);
    if (!ad) {
      return res.status(404).json({ message: 'Ad not found' });
    }

    await ad.destroy();
    res.status(204).send(); // No content
  } catch (err) {
    res.status(500).json({ message: 'Error deleting ad', error: err });
  }
};