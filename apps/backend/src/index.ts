import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import authRoutes from './routes/authRoutes';
import productRoutes from './routes/productRoutes';
import categoryRoutes from './routes/categoryRoutes';
import { authenticate } from './middlewares/auth';
import { swaggerSpec } from './config/swagger';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// Swagger documentation
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Cherio API Documentation',
  })
);

// Health check route
app.get('/', (req, res) => {
  res.json({
    message: 'Cherio API is running',
    documentation: '/api-docs',
  });
});

// Routes
app.use(authRoutes);
app.use(productRoutes);
app.use(categoryRoutes);

// Serve static files from the uploads directory (with authentication)
app.use('/api/uploads', authenticate, express.static(path.join(__dirname, '../uploads')));

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`API Documentation available at http://localhost:${port}/api-docs`);
});
