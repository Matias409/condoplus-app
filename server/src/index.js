import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import residentsRoutes from './routes/residents.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/residents', residentsRoutes);

// Health check
app.get('/', (req, res) => {
    res.json({ status: 'ok', message: 'CondoPlus Server Running' });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Access from this computer: http://localhost:${PORT}`);
    console.log(`Access from network: http://192.168.1.83:${PORT}`);
});
