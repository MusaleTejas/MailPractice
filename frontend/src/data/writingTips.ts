export interface WritingTip {
  id: string;
  category: string;
  title: string;
  summary: string;
  doList: string[];
  dontList: string[];
  templateExample: {
    bad: string;
    good: string;
    why: string;
  };
}

export const WRITING_TIPS: WritingTip[] = [
  {
    id: 'tip-subject-lines',
    category: 'Structure & Openings',
    title: 'High-Impact Subject Lines That Get Opened and Acted On',
    summary: 'A subject line must convey context, urgency, and expected action in under 7 words.',
    doList: [
      'Use action tags like [Action Required], [Decision Needed], [Update], [Time-Sensitive]',
      'Include specific project names, client identifiers, or exact deadlines',
      'Keep it searchable so colleagues can quickly locate it 3 weeks later'
    ],
    dontList: [
      'Do not send single-word vague subjects like "Quick question", "Hey", or "Update"',
      'Do not use ALL CAPS which triggers spam filters and appears aggressive',
      'Do not bury the core request in the 5th sentence of the body without reflecting it in the subject'
    ],
    templateExample: {
      bad: 'Subject: Meeting tomorrow???',
      good: 'Subject: [Review Needed] Q3 AI Strategy Roadmap — Sync on Wed 2 PM',
      why: 'The good subject line specifies the document, the purpose (Review Needed), and proposed timing before opening.'
    }
  },
  {
    id: 'tip-bluf-rule',
    category: 'Executive Clarity',
    title: 'The BLUF Principle (Bottom Line Up Front)',
    summary: 'Senior executives and busy clients scan emails on mobile in under 10 seconds. Lead with the core conclusion or request in your first 2 sentences.',
    doList: [
      'State what you need or what changed in line 1',
      'Follow with 2-3 concise supporting bullet points',
      'End with clear next steps, dates, and ownership'
    ],
    dontList: [
      'Avoid long chronological backstories before getting to the main point',
      'Avoid dense walls of uninterrupted text without paragraphs or whitespace'
    ],
    templateExample: {
      bad: 'Hi Sarah, so as you know last Tuesday we were discussing how the vendor API has been throwing occasional 500 errors and our engineers looked at it and then on Friday we met with them and...',
      good: 'Hi Sarah,\n\nBottom Line: We need to postpone the client demo by 2 days (to Thursday 3 PM) due to a third-party API outage.\n\n• Impact: Core checkout is currently blocked in staging\n• Fix ETA: Tuesday 6 PM from the vendor team\n• Action needed: Confirm if Thursday 3 PM works for your calendar',
      why: 'Immediately provides the decision needed and supporting rationale with zero fluff.'
    }
  },
  {
    id: 'tip-tone-calibration',
    category: 'Tone & Diplomacy',
    title: 'Calibrating Assertive vs. Collaborative Professional Tone',
    summary: 'Strike the perfect balance between politeness and firm executive authority without sounding passive or defensive.',
    doList: [
      'Replace weak fillers ("Sorry to bother you", "I just wanted to...") with confident phrasing ("I am following up on...")',
      'Use courteous modal framing ("Could you please confirm if X is viable...")',
      'Acknowledge delays with appreciation: "Thank you for your patience while we resolved this."'
    ],
    dontList: [
      'Do not overuse passive qualifiers: "I am probably wrong, but maybe we could..."',
      'Do not use abrasive imperative commands: "Send this right now."',
      'Do not use passive-aggressive phrases: "As per my previous email..."'
    ],
    templateExample: {
      bad: 'Sorry to bother you again, I know you are super busy, but did you look at the deck I sent last week? Revert back asap.',
      good: 'Following up on the Q3 strategic deck sent on Monday. Could you please review slides 4-6 and share your feedback by Wednesday 3 PM?',
      why: 'Respects time while being direct, professional, and actionable.'
    }
  },
  {
    id: 'tip-professional-apologies',
    category: 'Crisis & Apologies',
    title: 'The 4-A Framework for Professional Workplace Apologies',
    summary: 'When mistakes or delays happen, protect professional credibility using: Acknowledge, Apologize, Act, and Assure.',
    doList: [
      'Acknowledge the specific error directly without blaming teammates or third parties',
      'Apologize concisely without excessive self-deprecation',
      'State the exact immediate corrective action underway',
      'Assure the recipient with systemic safeguards preventing recurrence'
    ],
    dontList: [
      'Never make excuses or blame "the system" or "my intern"',
      'Do not ignore the emotional or financial impact on the recipient',
      'Do not leave resolution timelines open-ended'
    ],
    templateExample: {
      bad: 'The invoice was wrong because our billing software had a bug. It wasn’t my fault. Here is the new one.',
      good: 'Thank you for bringing the invoice discrepancy to our attention. I sincerely apologize for the overcharge error. I have attached the corrected invoice and credited your account immediately. We have also updated our automated billing verification rules to ensure this does not happen again.',
      why: 'Demonstrates accountability, immediate resolution, and preventive measures.'
    }
  }
];
