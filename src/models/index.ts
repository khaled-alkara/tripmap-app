// src/models/index.ts
import TourOperator from './tour-operator.model';
import TripRoute from './trip-route.model';
import Advertisement from './advertisement.model';
import User from './user.model';

// Initialize all models
const models = {
  TourOperator,
  TripRoute,
  Advertisement,
  User,
};

// Setup associations
Object.keys(models).forEach((modelName) => {
  if ((models[modelName as keyof typeof models] as any).associate) {
    (models[modelName as keyof typeof models] as any).associate(models);
  }
});

export default models;