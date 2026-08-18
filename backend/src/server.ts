import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './routes/api.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));

app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'MailPractice API is running.',
    endpoints: {
      health: 'GET /api/health',
      evaluate: 'POST /api/evaluate',
      generateScenario: 'POST /api/scenarios/generate'
    }
  });
});

app.listen(PORT, () => {
  console.log(`=========================================`);
  console.log(`🚀 MailPractice Backend Server active`);
  console.log(`📡 URL: http://localhost:${PORT}`);
  console.log(`🔑 Groq API Key: ${process.env.GROQ_API_KEY ? 'Configured' : 'Using Intelligent Fallback Evaluator'}`);
  console.log(`=========================================`);
});
