// src/server.ts
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import sequelize from './config/database';
import swaggerUi from 'swagger-ui-express';
import swaggerOptions from './config/swaggerConfig';
import swaggerJsdoc from 'swagger-jsdoc';
import routeRoutes from './routes/route.routes';
import operatorRoutes from './routes/operator.routes';
import adRoutes from './routes/ad.routes';

const app = express();
const PORT = process.env.PORT || 3000;

// Create swagger spec
const swaggerSpec = swaggerJsdoc(swaggerOptions);

const allowedOrigins = [
  'http://localhost:4200', // dev
  'https://your-angular-app.onrender.com', // or Vercel, etc.
];

// Middleware
app.use(cors());

app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/routes', routeRoutes);
app.use('/api/operators', operatorRoutes);
app.use('/api/ads', adRoutes);

// after the routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/api-docs-json', (req, res) => {
  res.json(swaggerSpec);
});

// Test DB connection
app.get('/health', async (req, res) => {
  try {
    await sequelize.authenticate();
    res.json({ status: 'OK', db: 'Connected' });
  } catch (err) {
    res.status(500).json({ status: 'ERROR', db: 'Not Connected' });
  }
});

// Sync DB (only for dev)
sequelize.sync({ alter: true }).then(() => {
  console.log('✅ Database & tables synced');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`👉 Visit http://localhost:${PORT}/health to check DB`);
});
