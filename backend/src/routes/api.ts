import { Router } from 'express';
import { handleEvaluateEmail } from '../controllers/evaluationController.js';
import { handleGenerateScenario } from '../controllers/scenarioController.js';

const router = Router();

router.post('/evaluate', handleEvaluateEmail);
router.post('/scenarios/generate', handleGenerateScenario);
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    appName: 'MailPractice API',
    groqConfigured: !!(process.env.GROQ_API_KEY && process.env.GROQ_API_KEY.trim() !== '')
  });
});

export default router;
