import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import authRoutes from './routes/authRoutes';
import contractRoutes from './routes/contractRoutes';
import billRoutes from './routes/billRoutes';
import { authenticate } from './middlewares/auth';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// Health check route
app.get('/', (req, res) => {
  res.json({ message: 'SyndicCheck API is running' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/contracts', contractRoutes);
app.use('/api/bills', billRoutes);

// Serve static files from the uploads directory (with authentication)
app.use('/api/uploads', authenticate, express.static(path.join(__dirname, '../uploads')));

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});