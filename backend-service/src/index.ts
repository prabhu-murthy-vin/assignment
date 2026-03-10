import express from 'express';
import programRoutes from './routes/programs';
import studyRoutes from './routes/studies';
import milestoneRoutes from './routes/milestones';
import { errorHandler } from './middleware/errorHandler';
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());


console.log(process.env.DB_HOST)

// Routes
app.use('/api/programs', programRoutes);
app.use('/api/studies', studyRoutes);
app.use('/api/milestones', milestoneRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Error handling middleware (must be last)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
