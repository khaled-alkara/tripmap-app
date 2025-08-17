// src/config/swaggerConfig.ts
import { Options } from 'swagger-jsdoc';
import path from 'path';

const projectRoot = process.cwd(); // 👈 Current working directory
const options: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TripMap API',
      version: '1.0.0',
      description: 'Backend API for TripMap - Route management, ads, and geolocation',
      contact: {
        name: 'TripMap Support',
        email: 'support@tripmap.example.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Development Server',
      },
    ],
    components: {
      schemas: {
        Location: {
  type: 'object',
  required: ['lat', 'lng'],
  properties: {
    lat: { type: 'number', example: 37.7749 },
    lng: { type: 'number', example: -122.4194 }
  }
},
        TourOperator: {
  type: 'object',
  required: ['name', 'email'],
  properties: {
    id: {
      type: 'integer',
      example: 1,
      description: 'Auto-generated unique ID'
    },
    name: {
      type: 'string',
      example: 'Sierra Adventure Tours',
      description: 'Name of the tour company'
    },
    email: {
      type: 'string',
      format: 'email',
      example: 'contact@sierratours.com',
      description: 'Contact email (must be unique)'
    },
    phone: {
      type: 'string',
      example: '+15551234567',
      description: 'Phone number (optional)'
    },
    createdAt: {
      type: 'string',
      format: 'date-time',
      example: '2025-04-05T10:00:00.000Z',
      description: 'When the operator was created'
    },
    updatedAt: {
      type: 'string',
      format: 'date-time',
      example: '2025-04-05T10:00:00.000Z',
      description: 'When the operator was last updated'
    }
  },
  description: 'A tour operator company that offers short trips'
},
        TripRoute: {
          type: 'object',
          required: ['name', 'startLocation', 'endLocation'],
          properties: {
            id: { type: 'integer', example: 1 },
            operatorId: { type: 'integer', example: 1 },
            name: { type: 'string', example: 'Yosemite Adventure' },
            description: { type: 'string', example: 'A scenic loop through the valley' },
            startLocation: {
$ref: '#/components/schemas/Location' 
            },
            endLocation: {
$ref: '#/components/schemas/Location' 
            },
            waypoints: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  lat: { type: 'number' },
                  lng: { type: 'number' },
                  name: { type: 'string' },
                  type: { type: 'string' }
                }
              },
              example: [
                { lat: 37.8, lng: -120, name: 'Waterfall View', type: 'scenic' }
              ]
            },
            distanceKm: { type: 'number', example: 240.5 },
            durationMinutes: { type: 'integer', example: 240 },
                operator: {
      $ref: '#/components/schemas/TourOperator'
    }
          }
        },
        Advertisement: {
          type: 'object',
          required: ['title', 'businessName', 'location', 'category', 'routeId'],
          properties: {
            id: { type: 'integer', example: 1 },
            routeId: { type: 'integer', example: 1 },
            title: { type: 'string', example: 'Great Coffee Stop' },
            description: { type: 'string', example: 'Fresh coffee with a view' },
            businessName: { type: 'string', example: 'Mountain Brew Café' },
            location: {
$ref: '#/components/schemas/Location' 
            },
            category: {
              type: 'string',
              enum: ['restaurant', 'rest_stop', 'park', 'gift_shop', 'museum'],
              example: 'restaurant'
            },
            imageUrl: { type: 'string', format: 'uri', example: 'https://example.com/coffee.jpg' },
            website: { type: 'string', format: 'uri', example: 'https://mountainbrew.example.com' },
            radiusMeters: { type: 'integer', example: 200 }
          }
        }
      }
    }
  },
  apis: [
    path.join(projectRoot, 'src', 'routes', '*.ts'),
    path.join(projectRoot, 'src', 'controllers', '*.ts')
  ],
};

export default options;
