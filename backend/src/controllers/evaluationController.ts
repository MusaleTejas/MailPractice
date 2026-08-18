import { Request, Response } from 'express';
import { evaluateEmailWithGroq } from '../services/groqService.js';
import { EvaluationRequest } from '../types/index.js';

export async function handleEvaluateEmail(req: Request, res: Response): Promise<void> {
  try {
    const { scenario, toField, ccField, bccField, subject, body, timeSpentSeconds, wpm } = req.body as EvaluationRequest;

    if (!scenario || !scenario.id || subject === undefined || body === undefined) {
      res.status(400).json({ error: 'Invalid request: scenario, subject, and body are required.' });
      return;
    }

    const evaluation = await evaluateEmailWithGroq({
      scenario,
      toField: toField || '',
      ccField: ccField || '',
      bccField: bccField || '',
      subject: subject || '',
      body: body || '',
      timeSpentSeconds: Number(timeSpentSeconds) || 0,
      wpm: Number(wpm) || 0
    });

    res.json(evaluation);
  } catch (err: any) {
    console.error('Error handling email evaluation:', err);
    res.status(500).json({ error: 'Failed to evaluate email. Please try again.' });
  }
}
