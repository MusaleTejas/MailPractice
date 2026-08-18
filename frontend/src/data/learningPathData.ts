import { LearningLevel } from '../types/learningPath';

export const LEARNING_LEVELS: LearningLevel[] = [
  // ==========================================
  // LEVEL 1: BEGINNER (10 Stages)
  // ==========================================
  {
    id: 'beginner',
    levelNumber: 1,
    name: 'Level 1 — Beginner',
    tagline: 'Start with the fundamentals. Build structure, professional tone, and clarity.',
    goal: 'Learn email structure, subject line formulas, greetings, purposeful requests, and clean closing etiquette.',
    targetScoreToUnlockNext: 70,
    timeLimitMinutes: 15,
    timePressureDesc: '15 Minutes (Low pressure — focus on structure)',
    stages: [
      {
        id: 'beg-stage-01',
        stageNumber: 1,
        title: 'Introducing Yourself to a New Team',
        category: 'Business Communication',
        description: 'Learn standard email structure: Subject → Greeting → Introduction → Background → Closing.',
        targetSkills: ['Email Structure', 'Introductions', 'Professional Greeting'],
        scenario: {
          id: 'beg-01-intro',
          title: 'Introducing Yourself to Your New Engineering Team',
          category: 'Business Communication',
          difficulty: 'Beginner',
          senderName: 'Alex Morgan',
          senderEmail: 'alex.morgan@xyztech.com (You)',
          senderRole: 'Associate Data Analyst',
          recipient: 'Analytics Team',
          recipientEmail: 'analytics-team@xyztech.com',
          recipientRole: 'Data & Analytics Team Members',
          recipientExpectations: 'Looking for a warm, professional introduction detailing your background and enthusiasm to collaborate.',
          objective: 'Send a professional introductory email to your new team on your first day.',
          context: 'You just joined XYZ Technologies as an Associate Data Analyst. You want to introduce yourself to your 8 team members, outline your background in Python/SQL, and express excitement to collaborate.',
          backstoryDetails: {
            triggerEvent: 'First day at XYZ Technologies following morning HR onboarding.',
            stakes: 'First impressions establish rapport with teammates and set a collaborative tone.',
            keyPointsToCover: ['Clear subject line with your name and role', 'Warm professional greeting', '1-2 sentence background', 'Collaborative closing']
          },
          requirements: [
            'Enter the team alias in the To: field (analytics-team@xyztech.com)',
            'Include a clear subject line with your name and new role',
            'Introduce yourself, your background, and your role on the team',
            'Express enthusiasm to collaborate on upcoming analytics initiatives',
            'End with a polite, professional sign-off'
          ],
          timeLimitMinutes: 15,
          tips: ['Subject formula: Introduction: [Your Name] – [Your Role]'],
          sampleAnswer: {
            subject: 'Introduction: Alex Morgan – Associate Data Analyst',
            body: `Hi Team,

I hope you are all having a great week.

My name is Alex Morgan, and I am excited to join XYZ Technologies today as your new Associate Data Analyst. 

Prior to joining, I worked on data processing and dashboard automation using Python, SQL, and Power BI. I am looking forward to collaborating with everyone on our Q4 analytics projects and learning from the team.

Please feel free to connect or say hello on Slack. I look forward to working together!

Best regards,
Alex Morgan
Associate Data Analyst | XYZ Technologies`,
            whyItWorks: 'Follows classic 5-part email anatomy: Subject, Greeting, Introduction, Background, Warm Call-to-Action Closing.'
          }
        }
      },
      {
        id: 'beg-stage-02',
        stageNumber: 2,
        title: 'Asking for Information & Documentation',
        category: 'Business Communication',
        description: 'Master polite, concise inquiries and specific information requests.',
        targetSkills: ['Direct Inquiries', 'Clarity', 'Polite Phrasing'],
        scenario: {
          id: 'beg-02-info-ask',
          title: 'Requesting Onboarding API Documentation',
          category: 'Business Communication',
          difficulty: 'Beginner',
          senderName: 'Alex Morgan',
          senderEmail: 'alex.morgan@xyztech.com (You)',
          senderRole: 'Associate Data Analyst',
          recipient: 'Karan Patel',
          recipientEmail: 'karan.patel@xyztech.com',
          recipientRole: 'Senior Data Engineer',
          recipientExpectations: 'Wants a concise, specific inquiry with clear context so he can share the right repository links.',
          objective: 'Request access links and documentation for the internal customer analytics data warehouse.',
          context: 'You need the setup guide and warehouse schema docs to configure your local SQL environment.',
          backstoryDetails: {
            triggerEvent: 'Starting workstation SQL setup; need internal data dictionary link.',
            stakes: 'Getting the right documentation avoids setting up incorrect database connections.',
            keyPointsToCover: ['Target repository name', 'Why you need it', 'Appreciation for assistance']
          },
          requirements: [
            'Enter Senior Data Engineer in To: (karan.patel@xyztech.com)',
            'Write a specific, searchable subject line',
            'Politely explain why you need the schema documentation',
            'Ask for the Confluence guide link or setup runbook',
            'Include a polite, professional sign-off'
          ],
          timeLimitMinutes: 15,
          tips: ['Be specific about which documentation you need rather than saying "send me docs"'],
          sampleAnswer: {
            subject: 'Request: Customer Data Warehouse Schema & Setup Documentation',
            body: `Hi Karan,

I hope you are doing well.

As part of my onboarding setup for the Analytics team, I am currently configuring my local environment to query our customer database. 

Could you please share the link to the latest data dictionary and SQL connection guide on Confluence when you have a moment?

Thank you for your help!

Best regards,
Alex Morgan`,
            whyItWorks: 'Direct, clear reason for inquiry, polite phrasing, and concise structure.'
          }
        }
      },
      {
        id: 'beg-stage-03',
        stageNumber: 3,
        title: 'Requesting a Confidential Document',
        category: 'Business Communication',
        description: 'Ask for specific files or project briefs while respecting confidentiality.',
        targetSkills: ['Document Requests', 'Purpose Definition', 'Professional Courtesy'],
        scenario: {
          id: 'beg-03-doc-request',
          title: 'Requesting Q3 Regional Performance Report',
          category: 'Business Communication',
          difficulty: 'Beginner',
          senderName: 'Alex Morgan',
          senderEmail: 'alex.morgan@xyztech.com (You)',
          senderRole: 'Associate Data Analyst',
          recipient: 'Meera Sengupta',
          recipientEmail: 'meera.s@xyztech.com',
          recipientRole: 'Operations Analyst Lead',
          recipientExpectations: 'Needs project context and assurance that data will be used strictly for designated analysis.',
          objective: 'Request the Q3 regional revenue spreadsheet from Meera for baseline metric comparisons.',
          context: 'You are preparing the Q4 forecasting baseline model and need the finalized Q3 regional revenue breakdown.',
          backstoryDetails: {
            triggerEvent: 'Quarterly modeling task assigned by your manager.',
            stakes: 'Ensuring you use the officially audited Q3 figures.',
            keyPointsToCover: ['Exact document name', 'Intended use', 'Requested deadline']
          },
          requirements: [
            'Enter Meera in the To: field (meera.s@xyztech.com)',
            'State the exact document name needed (Q3 Regional Performance Report)',
            'Explain how it will be used (Q4 forecasting baseline)',
            'Request the file by end of day tomorrow'
          ],
          timeLimitMinutes: 15,
          tips: ['Always state the exact document title and date of version needed']
        }
      },
      {
        id: 'beg-stage-04',
        stageNumber: 4,
        title: 'Simple 1-on-1 Meeting Request',
        category: 'Meeting Request',
        description: 'Propose meeting times with clear 2-bullet agendas and zero calendar friction.',
        targetSkills: ['Meeting Scheduling', 'Agenda Setting', 'Calendar Courtesy'],
        scenario: {
          id: 'beg-04-meeting-request',
          title: 'Scheduling a 1-on-1 Onboarding Check-In',
          category: 'Meeting Request',
          difficulty: 'Beginner',
          senderName: 'Alex Morgan',
          senderEmail: 'alex.morgan@xyztech.com (You)',
          senderRole: 'Associate Data Analyst',
          recipient: 'Priya Sharma',
          recipientEmail: 'priya.sharma@xyztech.com',
          recipientRole: 'Team Lead',
          recipientExpectations: 'Appreciates 2 concrete time options and a bulleted agenda.',
          objective: 'Schedule a 20-minute weekly 1-on-1 check-in to review first-week onboarding progress.',
          context: 'You have completed your first week of training and need to sync with your manager for 20 minutes.',
          backstoryDetails: {
            triggerEvent: 'First week milestone completed.',
            stakes: 'Aligning on your first sprint goals and feedback.',
            keyPointsToCover: ['Duration (20 mins)', '3 agenda points', '2 specific time slots']
          },
          requirements: [
            'Enter Team Lead in To: (priya.sharma@xyztech.com)',
            'Propose a 20-minute meeting duration',
            'Provide 2 concrete time slots with timezone',
            'Outline a 2-point discussion agenda'
          ],
          timeLimitMinutes: 15,
          tips: ['Never ask "When are you free?" — propose 2 concrete options']
        }
      },
      {
        id: 'beg-stage-05',
        stageNumber: 5,
        title: 'Casual / Sick Leave Request',
        category: 'Leave Request',
        description: 'Learn clean, professional leave notification without oversharing private details.',
        targetSkills: ['Leave Requests', 'Task Coverage', 'Workplace Continuity'],
        scenario: {
          id: 'beg-05-leave-req',
          title: 'Notifying Manager of 1-Day Casual Leave',
          category: 'Leave Request',
          difficulty: 'Beginner',
          senderName: 'Alex Morgan',
          senderEmail: 'alex.morgan@xyztech.com (You)',
          senderRole: 'Associate Data Analyst',
          recipient: 'Priya Sharma',
          recipientEmail: 'priya.sharma@xyztech.com',
          recipientRole: 'Team Lead',
          recipientExpectations: 'Needs clear date, task delegation coverage, and emergency contact details.',
          targetCc: 'hr-leaves@xyztech.com',
          targetCcRole: 'HR Leaves Desk',
          ccContext: 'Keep HR attendance synchronized.',
          objective: 'Request a planned 1-day casual leave next Friday for personal family commitments.',
          context: 'You need next Friday off. You have finished all sprint tasks and arranged for Maya to monitor urgent dashboards.',
          backstoryDetails: {
            triggerEvent: 'Family commitment out of town next Friday.',
            stakes: 'Ensuring seamless dashboard monitoring during absence.',
            keyPointsToCover: ['Exact date', 'Colleague covering urgent tasks', 'Emergency reachability']
          },
          requirements: [
            'Enter Team Lead in To: (priya.sharma@xyztech.com)',
            'Add HR Leaves in Cc: (hr-leaves@xyztech.com)',
            'Specify exact leave date (Friday, Oct 27)',
            'Mention colleague covering urgent queries (Maya)'
          ],
          timeLimitMinutes: 15,
          tips: ['State leave dates clearly in the subject line']
        }
      },
      {
        id: 'beg-stage-06',
        stageNumber: 6,
        title: 'Asking for Help on a Technical Blocker',
        category: 'Business Communication',
        description: 'Demonstrate proof of prior effort before asking for teammate assistance.',
        targetSkills: ['Asking for Help', 'Problem Definition', 'Proof of Effort'],
        scenario: {
          id: 'beg-06-ask-help',
          title: 'Asking a Senior Peer for SQL Query Guidance',
          category: 'Business Communication',
          difficulty: 'Beginner',
          senderName: 'Alex Morgan',
          senderEmail: 'alex.morgan@xyztech.com (You)',
          senderRole: 'Associate Data Analyst',
          recipient: 'Daniel Vance',
          recipientEmail: 'daniel.vance@xyztech.com',
          recipientRole: 'Senior Data Analyst',
          recipientExpectations: 'Appreciates when peers explain what they already tried before asking for time.',
          objective: 'Ask Daniel for 10 minutes of guidance on an aggregate window function query error.',
          context: 'You have spent 45 minutes troubleshooting a PostgreSQL window query syntax error. You reviewed docs and need a quick pair-programming check.',
          backstoryDetails: {
            triggerEvent: 'Query syntax error blocking dashboard view.',
            stakes: 'Fixing query in time for end-of-day sprint review.',
            keyPointsToCover: ['Specific error', 'What you already tried', '10-minute sync ask']
          },
          requirements: [
            'Enter Senior Peer in To: (daniel.vance@xyztech.com)',
            'Specify the exact query topic and error encountered',
            'Mention the steps you already tried to resolve it',
            'Request a 10-minute screen-share slot'
          ],
          timeLimitMinutes: 15,
          tips: ['Show what you tried first so teammates know you did your homework']
        }
      },
      {
        id: 'beg-stage-07',
        stageNumber: 7,
        title: 'Thank-You & Recognition Email',
        category: 'Personal & Informal',
        description: 'Send sincere, memorable appreciation highlighting specific contributions.',
        targetSkills: ['Appreciation', 'Relationship Building', 'Professional Gratitude'],
        scenario: {
          id: 'beg-07-thank-you',
          title: 'Thanking a Colleague for Onboarding Mentorship',
          category: 'Personal & Informal',
          difficulty: 'Beginner',
          senderName: 'Alex Morgan',
          senderEmail: 'alex.morgan@xyztech.com (You)',
          senderRole: 'Associate Data Analyst',
          recipient: 'Maya Lin',
          recipientEmail: 'maya.lin@xyztech.com',
          recipientRole: 'Data Analyst & Onboarding Buddy',
          recipientExpectations: 'Appreciates genuine, specific recognition of time invested.',
          objective: 'Send a heartfelt thank-you email to your onboarding buddy for helping you set up your database pipelines.',
          context: 'Maya spent 2 hours yesterday helping you debug permission credentials and understand the data schema.',
          backstoryDetails: {
            triggerEvent: 'Successfully ran your first production data pipeline.',
            stakes: 'Building strong long-term peer camaraderie.',
            keyPointsToCover: ['Specific assistance given', 'Impact on your setup', 'Warm appreciation']
          },
          requirements: [
            'Enter Maya in To: (maya.lin@xyztech.com)',
            'Express sincere gratitude in the opening lines',
            'Mention specific help provided (database setup and pipeline debugging)',
            'Offer to return the favor whenever possible'
          ],
          timeLimitMinutes: 15,
          tips: ['Specific details make a thank you email impactful and genuine']
        }
      },
      {
        id: 'beg-stage-08',
        stageNumber: 8,
        title: 'Simple Task Follow-Up',
        category: 'Business Communication',
        description: 'Follow up politely on an open task without sounding pushy or impatient.',
        targetSkills: ['Polite Follow-Ups', 'Status Checks', 'Diplomatic Phrasing'],
        scenario: {
          id: 'beg-08-task-followup',
          title: 'Following Up on Access Permissions Approval',
          category: 'Business Communication',
          difficulty: 'Beginner',
          senderName: 'Alex Morgan',
          senderEmail: 'alex.morgan@xyztech.com (You)',
          senderRole: 'Associate Data Analyst',
          recipient: 'IT Helpdesk',
          recipientEmail: 'helpdesk@xyztech.com',
          recipientRole: 'IT Systems Administrator',
          recipientExpectations: 'Needs ticket ID, date submitted, and polite status check.',
          objective: 'Follow up on your Tableau Creator license request submitted 3 days ago (Ticket #IT-8492).',
          context: 'You submitted an access request on Tuesday. You need the license to begin building sprint dashboards on Monday.',
          backstoryDetails: {
            triggerEvent: '3 business days passed since ticket submission.',
            stakes: 'Need license ready for Monday sprint start.',
            keyPointsToCover: ['Ticket #IT-8492', 'Date submitted', 'Polite status inquiry']
          },
          requirements: [
            'Enter IT Helpdesk in To: (helpdesk@xyztech.com)',
            'Reference Ticket ID (#IT-8492) and submission date',
            'Politely inquire about the approval status',
            'Explain why you need it by Monday'
          ],
          timeLimitMinutes: 15,
          tips: ['Always reference the ticket ID in the subject line for easy searchability']
        }
      },
      {
        id: 'beg-stage-09',
        stageNumber: 9,
        title: 'Doctor / Client Appointment Request',
        category: 'Meeting Request',
        description: 'Coordinate an external appointment with clear availability and context.',
        targetSkills: ['External Scheduling', 'Conciseness', 'Clear Time Windows'],
        scenario: {
          id: 'beg-09-appointment',
          title: 'Scheduling an Annual Health Checkup',
          category: 'Meeting Request',
          difficulty: 'Beginner',
          senderName: 'Alex Morgan',
          senderEmail: 'alex.morgan@gmail.com (You)',
          senderRole: 'Patient / Client',
          recipient: 'CityCare Medical Clinic',
          recipientEmail: 'appointments@citycareclinic.com',
          recipientRole: 'Appointment Coordinator',
          recipientExpectations: 'Needs patient ID, appointment type, preferred days, and contact phone number.',
          objective: 'Schedule an annual corporate physical examination with Dr. Reynolds next week.',
          context: 'You want to schedule a 45-minute physical checkup on Tuesday or Thursday morning.',
          backstoryDetails: {
            triggerEvent: 'Annual health checkup window.',
            stakes: 'Securing morning slot before work hours.',
            keyPointsToCover: ['Appointment type', 'Preferred doctor', '2 date options']
          },
          requirements: [
            'Enter Clinic in To: (appointments@citycareclinic.com)',
            'Specify appointment type (Annual Physical Checkup)',
            'Propose 2 preferred morning time slots',
            'Provide patient contact phone number'
          ],
          timeLimitMinutes: 15,
          tips: ['Include patient ID and phone number in the signature']
        }
      },
      {
        id: 'beg-stage-10',
        stageNumber: 10,
        title: 'Basic Professional Apology & Correction',
        category: 'Apology Email',
        description: 'Take immediate responsibility for a minor mistake, correct it, and apologize with poise.',
        targetSkills: ['Apology Etiquette', 'Ownership', 'Rapid Correction'],
        scenario: {
          id: 'beg-10-apology',
          title: 'Correcting an Outdated Meeting Link & Apology',
          category: 'Apology Email',
          difficulty: 'Beginner',
          senderName: 'Alex Morgan',
          senderEmail: 'alex.morgan@xyztech.com (You)',
          senderRole: 'Associate Data Analyst',
          recipient: 'Sprint Attendees',
          recipientEmail: 'sprint-team@xyztech.com',
          recipientRole: 'Sprint Review Attendees',
          recipientExpectations: 'Wants the correct link immediately without lengthy excuses.',
          objective: 'Apologize for sending an expired Zoom link in the calendar invite and provide the active Google Meet link.',
          context: 'You sent out a sprint invite with an expired video link. The meeting starts in 15 minutes.',
          backstoryDetails: {
            triggerEvent: 'Colleague pinged that the calendar link was invalid.',
            stakes: 'Meeting starts in 15 minutes; need everyone on the correct link.',
            keyPointsToCover: ['Direct apology', 'Working link provided', 'Reassurance']
          },
          requirements: [
            'Enter Sprint Team in To: (sprint-team@xyztech.com)',
            'Acknowledge the incorrect link immediately and apologize for the confusion',
            'Provide the working meeting URL clearly in bold',
            'Reconfirm meeting start time (2:00 PM)'
          ],
          timeLimitMinutes: 15,
          tips: ['When fixing an error, put the corrected link right at the top']
        }
      }
    ]
  },

  // ==========================================
  // LEVEL 2: INTERMEDIATE (12 Stages)
  // ==========================================
  {
    id: 'intermediate',
    levelNumber: 2,
    name: 'Level 2 — Intermediate',
    tagline: 'Communicate workplace situations clearly. Balance multiple objectives and deadlines.',
    goal: 'Master structured paragraphs, context-setting, deadline extensions, customer handling, and concise business writing.',
    targetScoreToUnlockNext: 75,
    timeLimitMinutes: 10,
    timePressureDesc: '10 Minutes (Moderate pressure — 2-3 objectives)',
    stages: [
      {
        id: 'int-stage-01',
        stageNumber: 1,
        title: 'Project Sprint Status Update to Manager',
        category: 'Project Update',
        description: 'Provide a structured BLUF update with milestones, blockers, and next steps.',
        targetSkills: ['BLUF Principle', 'Status Metrics', 'Blocker Escalation'],
        scenario: {
          id: 'int-01-sprint-update',
          title: 'Weekly Sprint Status Update on Analytics Engine',
          category: 'Project Update',
          difficulty: 'Intermediate',
          senderName: 'Alex Morgan',
          senderEmail: 'alex.morgan@xyztech.com (You)',
          senderRole: 'Data Analyst',
          recipient: 'Priya Sharma',
          recipientEmail: 'priya.sharma@xyztech.com',
          recipientRole: 'Engineering Manager',
          recipientExpectations: 'Expects clear progress percentages, blocker owners, and launch date confidence.',
          targetCc: 'analytics-leads@xyztech.com',
          targetCcRole: 'Analytics Leadership',
          ccContext: 'Keep leadership informed on weekly milestones.',
          objective: 'Send weekly status report covering 90% dashboard completion, 1 SSO blocker, and next sprint goals.',
          context: 'You are wrapping up Sprint 4. The main dashboards are 90% built, but SSO authorization is awaiting security review.',
          backstoryDetails: {
            triggerEvent: 'Weekly Friday manager update cycle.',
            stakes: 'Confirming sprint goals will be met on time.',
            keyPointsToCover: ['Completed items', 'SSO blocker and ETA', 'Next sprint objectives']
          },
          requirements: [
            'Enter Manager in To: (priya.sharma@xyztech.com)',
            'Add Analytics Leads in Cc: (analytics-leads@xyztech.com)',
            'Use structured sections (Completed, Blocker, Next Steps)',
            'Quantify progress (90% completed)'
          ],
          timeLimitMinutes: 10,
          tips: ['Use bullet points for quick scanning']
        }
      },
      {
        id: 'int-stage-02',
        stageNumber: 2,
        title: 'Rescheduling a Client Strategy Meeting',
        category: 'Meeting Request',
        description: 'Diplomatically reschedule an important client call while maintaining high client trust.',
        targetSkills: ['Diplomatic Rescheduling', 'Client Trust', 'Alternative Options'],
        scenario: {
          id: 'int-02-reschedule',
          title: 'Rescheduling Client Strategy Sync Due to Urgent On-Site Outage',
          category: 'Meeting Request',
          difficulty: 'Intermediate',
          senderName: 'Alex Morgan',
          senderEmail: 'alex.morgan@xyztech.com (You)',
          senderRole: 'Senior Solutions Consultant',
          recipient: 'David Miller',
          recipientEmail: 'david.miller@clientcorp.com',
          recipientRole: 'VP of Commercial Strategy, ClientCorp',
          recipientExpectations: 'Appreciates advance notice, legitimate professional reason, and 2 prompt alternative slots.',
          objective: 'Reschedule tomorrow’s 2 PM client sync to Thursday due to an emergency production deployment.',
          context: 'You need to lead an emergency client database patch tomorrow during the scheduled sync time.',
          backstoryDetails: {
            triggerEvent: 'Emergency maintenance scheduled during client sync.',
            stakes: 'Preserving client relationship while handling emergency.',
            keyPointsToCover: ['Apologize for schedule shift', 'State professional reason', 'Propose 2 alternate slots']
          },
          requirements: [
            'Enter Client VP in To: (david.miller@clientcorp.com)',
            'Give clear advance notice and apologize for the inconvenience',
            'Explain the operational reason professionally',
            'Offer 2 specific alternate dates/times'
          ],
          timeLimitMinutes: 10,
          tips: ['Never cancel last-minute without offering immediate alternative slots']
        }
      },
      {
        id: 'int-stage-03',
        stageNumber: 3,
        title: 'Requesting an Assignment / Project Deadline Extension',
        category: 'Academic & School',
        description: 'Ask for a 48-hour deadline extension backed by legitimate technical justification.',
        targetSkills: ['Deadline Negotiation', 'Proof of Progress', 'Professional Requests'],
        scenario: {
          id: 'int-03-extension',
          title: 'Asking Professor for a 48-Hour Machine Learning Project Extension',
          category: 'Academic & School',
          difficulty: 'Intermediate',
          senderName: 'Alex Morgan',
          senderEmail: 'alex.student@university.edu (You)',
          senderRole: 'Graduate Student, CS-401',
          recipient: 'Prof. Evelyn Davis',
          recipientEmail: 'evelyn.davis@university.edu',
          recipientRole: 'Course Professor',
          recipientExpectations: 'Expects course code, clear explanation of lab outage, and proof of 75% draft progress.',
          objective: 'Request a 48-hour extension on Assignment 3 due to campus GPU server downtime.',
          context: 'The campus compute cluster was offline over the weekend, preventing final model training.',
          backstoryDetails: {
            triggerEvent: '44-hour server maintenance outage over weekend.',
            stakes: 'Assignment is 15% of semester grade.',
            keyPointsToCover: ['Course ID', 'Outage explanation', '75% progress proof', 'New date']
          },
          requirements: [
            'Enter Professor in To: (evelyn.davis@university.edu)',
            'Include Course ID (CS-401) in subject line',
            'Politely explain cluster outage with draft attached',
            'Request explicit 48-hour extension date'
          ],
          timeLimitMinutes: 10,
          tips: ['Demonstrate that you have already completed 75% of the work']
        }
      },
      {
        id: 'int-stage-04',
        stageNumber: 4,
        title: 'Customer Inquiry Response & De-escalation',
        category: 'Customer Support',
        description: 'Resolve a frustrated customer inquiry with empathy, facts, and a clear solution.',
        targetSkills: ['Customer Empathy', 'Conflict De-escalation', 'Actionable Steps'],
        scenario: {
          id: 'int-04-customer-resp',
          title: 'Responding to Billing Overcharge Complaint',
          category: 'Customer Support',
          difficulty: 'Intermediate',
          senderName: 'Alex Morgan',
          senderEmail: 'support@cloudtech.com (You)',
          senderRole: 'Senior Support Specialist',
          recipient: 'Sarah Jenkins',
          recipientEmail: 'sarah.j@enterprise.com',
          recipientRole: 'Customer Account Lead',
          recipientExpectations: 'Wants immediate acknowledgement of billing error and credit invoice confirmation.',
          objective: 'Acknowledge an erroneous $150 seat charge, issue a full refund credit, and explain the fix.',
          context: 'An automated billing script accidentally charged the customer for 3 inactive seats.',
          backstoryDetails: {
            triggerEvent: 'Customer submitted an angry ticket regarding $150 overcharge.',
            stakes: 'Retaining customer trust and preventing churn.',
            keyPointsToCover: ['Validate frustration', 'Explain error and refund credit', 'Confirm new invoice']
          },
          requirements: [
            'Enter Customer in To: (sarah.j@enterprise.com)',
            'Express sincere empathy for the billing error',
            'Confirm $150 refund credit issued to account',
            'Provide updated invoice receipt'
          ],
          timeLimitMinutes: 10,
          tips: ['Own the mistake immediately without making excuses']
        }
      },
      {
        id: 'int-stage-05',
        stageNumber: 5,
        title: 'Client Deliverable Follow-Up',
        category: 'Client Communication',
        description: 'Follow up on pending client feedback with clear milestone timelines.',
        targetSkills: ['Client Engagement', 'Milestone Tracking', 'Polite Urgency'],
        scenario: {
          id: 'int-05-client-followup',
          title: 'Requesting Client Approval on Final UI Wireframes',
          category: 'Client Communication',
          difficulty: 'Intermediate',
          senderName: 'Alex Morgan',
          senderEmail: 'alex.morgan@xyztech.com (You)',
          senderRole: 'Design & Project Lead',
          recipient: 'Mark Sterling',
          recipientEmail: 'mark.sterling@clientcorp.com',
          recipientRole: 'Product Director, ClientCorp',
          recipientExpectations: 'Needs clear reminder of the launch schedule dependency.',
          objective: 'Follow up on wireframe sign-off required by Thursday to begin frontend development on Monday.',
          context: 'You sent the final wireframes on Monday. You need sign-off by Thursday to maintain the launch date.',
          backstoryDetails: {
            triggerEvent: 'Development sprint begins next week.',
            stakes: 'Delays in wireframe approval push the go-live launch.',
            keyPointsToCover: ['Link to wireframes', 'Why Thursday approval matters', 'Offer for quick walkthrough']
          },
          requirements: [
            'Enter Client Director in To: (mark.sterling@clientcorp.com)',
            'Politely reference wireframes submitted on Monday',
            'Explain that Thursday sign-off maintains the launch date',
            'Offer a 15-minute review call'
          ],
          timeLimitMinutes: 10,
          tips: ['Link dependencies to their preferred launch deadline']
        }
      },
      {
        id: 'int-stage-06',
        stageNumber: 6,
        title: 'Work From Home / Remote Work Request',
        category: 'Leave Request',
        description: 'Justify a remote work request focused on deep-work productivity and project delivery.',
        targetSkills: ['Business Justification', 'Workplace Communication', 'Productivity Focus'],
        scenario: {
          id: 'int-06-wfh-request',
          title: 'Requesting 3-Day Remote Deep-Work Window for Model Training',
          category: 'Leave Request',
          difficulty: 'Intermediate',
          senderName: 'Alex Morgan',
          senderEmail: 'alex.morgan@xyztech.com (You)',
          senderRole: 'Data Analyst',
          recipient: 'Priya Sharma',
          recipientEmail: 'priya.sharma@xyztech.com',
          recipientRole: 'Team Lead',
          recipientExpectations: 'Wants reassurance of Slack availability, sprint output, and daily standup presence.',
          objective: 'Request remote work from Wed to Fri to focus on training and documenting the complex customer churn model.',
          context: 'You need 3 uninterrupted days of deep focus to build and validate model algorithms before the sprint ends.',
          backstoryDetails: {
            triggerEvent: 'Critical algorithmic deliverable due next week.',
            stakes: 'Delivering high-accuracy model on time.',
            keyPointsToCover: ['Dates requested', 'Productivity justification', 'Full Slack/meeting availability']
          },
          requirements: [
            'Enter Manager in To: (priya.sharma@xyztech.com)',
            'Specify exact remote dates (Wed, Oct 25 – Fri, Oct 27)',
            'Frame request around deep focus for churn model delivery',
            'Confirm 100% availability for all daily standups and Slack chats'
          ],
          timeLimitMinutes: 10,
          tips: ['Focus on business output and communication availability, not personal preference']
        }
      },
      {
        id: 'int-stage-07',
        stageNumber: 7,
        title: 'Hardware Upgrade Request to IT',
        category: 'Business Communication',
        difficulty: 'Intermediate',
        description: 'Justify hardware upgrade with workload metrics, memory bottlenecks, and ROI.',
        targetSkills: ['Technical Justification', 'ROI Framing', 'Hardware Specifications'],
        scenario: {
          id: 'int-07-hardware-upgrade',
          title: 'Workstation Hardware Upgrade Request to IT Manager',
          category: 'Business Communication',
          difficulty: 'Intermediate',
          senderName: 'Alex Morgan',
          senderEmail: 'alex.morgan@xyztech.com (You)',
          senderRole: 'Data Analyst',
          recipient: 'Rahul Sharma',
          recipientEmail: 'rahul.sharma@xyztech.com',
          recipientRole: 'IT Infrastructure Manager',
          recipientExpectations: 'Expects exact hardware specs (RAM, CPU, SSD, GPU), productivity impact data, and cost ROI.',
          targetCc: 'analytics-lead@xyztech.com',
          targetCcRole: 'Lead Analytics Manager',
          ccContext: 'Keep analytics lead informed on hardware budget asks.',
          objective: 'Request an upgraded 32GB RAM workstation to run Jupyter, SQL, and Power BI on large 5GB datasets without freezing.',
          context: 'Your 4-year-old PC freezes when running multi-app data pipelines for the new predictive churn project.',
          backstoryDetails: {
            triggerEvent: 'Assigned to lead Q4 customer churn predictive model.',
            stakes: 'Memory crashes cause 45-minute query freezes.',
            keyPointsToCover: ['Current 4-year PC limitations', 'New project needs', 'Concrete specs (32GB RAM, SSD, GPU)', 'Expected ROI']
          },
          requirements: [
            'Enter IT Manager in To: (rahul.sharma@xyztech.com)',
            'Add Analytics Lead in Cc: (analytics-lead@xyztech.com)',
            'Detail current hardware limitations (8GB RAM freezes on large datasets)',
            'Specify recommended specs (16–32 GB RAM, SSD, multi-core CPU, dedicated GPU)',
            'Explain business ROI and request IT configuration review'
          ],
          timeLimitMinutes: 10,
          tips: ['Justify hardware with software workload requirements']
        }
      },
      {
        id: 'int-stage-08',
        stageNumber: 8,
        title: 'Internship Application & Cover Letter',
        category: 'Internship',
        description: 'Submit an internship application highlighting coursework, projects, and role passion.',
        targetSkills: ['Internship Outreach', 'Project Highlights', 'Value Alignment'],
        scenario: {
          id: 'int-08-internship-app',
          title: 'Summer Data Science Internship Application',
          category: 'Internship',
          difficulty: 'Intermediate',
          senderName: 'Alex Morgan',
          senderEmail: 'alex.student@university.edu (You)',
          senderRole: 'Undergraduate Computer Science Junior',
          recipient: 'Ms. Rachel Bennett',
          recipientEmail: 'rachel.b@finscale.io',
          recipientRole: 'University Recruiting Lead, FinScale',
          recipientExpectations: 'Looking for specific project examples, technical skills, and enthusiasm for fintech.',
          objective: 'Apply for the Summer 2027 Data Science Internship with your resume and portfolio project links.',
          context: 'FinScale opened applications for summer interns. You built an automated stock sentiment analyzer in Python and want to apply.',
          backstoryDetails: {
            triggerEvent: 'Application portal opened for summer interns.',
            stakes: 'Standing out among hundreds of university applicants.',
            keyPointsToCover: ['Target internship title', 'Key projects/skills', 'Why FinScale', 'Resume attached']
          },
          requirements: [
            'Enter Recruiter in To: (rachel.b@finscale.io)',
            'Reference the exact internship title in the subject line',
            'Highlight 2 relevant technical projects (Python sentiment analyzer, SQL pipelines)',
            'Explain why FinScale’s fintech mission inspires you'
          ],
          timeLimitMinutes: 10,
          tips: ['Mention specific open-source or academic projects with measurable outcomes']
        }
      },
      {
        id: 'int-stage-09',
        stageNumber: 9,
        title: 'Full-Time Job Application Cover Letter',
        category: 'Job Application',
        description: 'Submit an impactful cover letter tailored to a high-growth Senior Analyst role.',
        targetSkills: ['Cover Letters', 'Impact Metrics', 'Executive Tone'],
        scenario: {
          id: 'int-09-job-app',
          title: 'Senior Product Analyst Job Application',
          category: 'Job Application',
          difficulty: 'Intermediate',
          senderName: 'Alex Morgan',
          senderEmail: 'alex.morgan.career@gmail.com (You)',
          senderRole: 'Product Analyst Candidate',
          recipient: 'Katherine Reed',
          recipientEmail: 'katherine.reed@finscale.io',
          recipientRole: 'Head of Talent Acquisition',
          recipientExpectations: 'Expects quantifiable metrics (e.g. 28% churn reduction) and role-specific alignment.',
          targetCc: 'careers@finscale.io',
          targetCcRole: 'Talent Acquisition Team',
          ccContext: 'Ensure HR applicant tracking receives duplicate.',
          objective: 'Apply for the Senior Product Analyst role citing 3.5 years experience and 28% churn reduction achievement.',
          context: 'You are applying for a Senior Product Analyst role at FinScale Technologies.',
          backstoryDetails: {
            triggerEvent: 'Job opening posted on careers portal.',
            stakes: 'Over 150 applicants; need metrics to pass recruiter screen.',
            keyPointsToCover: ['Job title and source', 'Quantified achievements', 'Company alignment', 'Resume attached']
          },
          requirements: [
            'Enter Talent Acquisition in To: (katherine.reed@finscale.io)',
            'Add Careers in Cc: (careers@finscale.io)',
            'Highlight 2 quantifiable achievements (e.g. 28% churn reduction)',
            'Confirm resume and portfolio links are attached'
          ],
          timeLimitMinutes: 10,
          tips: ['Use bullet points for your top 2 career achievements']
        }
      },
      {
        id: 'int-stage-10',
        stageNumber: 10,
        title: 'Project Delay Explanation & Recovery Plan',
        category: 'Project Update',
        description: 'Explain a technical delay objectively and present a solid recovery plan.',
        targetSkills: ['Delay Management', 'Recovery Planning', 'Accountability'],
        scenario: {
          id: 'int-10-delay-recovery',
          title: 'Explaining 3-Day Database Migration Delay & Recovery Roadmap',
          category: 'Project Update',
          difficulty: 'Intermediate',
          senderName: 'Alex Morgan',
          senderEmail: 'alex.morgan@xyztech.com (You)',
          senderRole: 'Lead Implementation Specialist',
          recipient: 'David Chen',
          recipientEmail: 'david.chen@enterprise.com',
          recipientRole: 'VP of Client Operations',
          recipientExpectations: 'Expects transparency on root cause, zero excuses, and exact recovery ETA.',
          objective: 'Inform client of a 3-day migration delay due to data schema reconciliation and present a weekend catch-up plan.',
          context: 'Legacy data inconsistencies required 48 hours of automated cleansing before final production cutover.',
          backstoryDetails: {
            triggerEvent: 'Schema validation script flagged 1,400 malformed customer address rows.',
            stakes: 'Preventing corrupted data migration while maintaining launch confidence.',
            keyPointsToCover: ['Root technical cause', '3-day schedule shift', 'Weekend catch-up plan', 'Launch confidence']
          },
          requirements: [
            'Enter Client VP in To: (david.chen@enterprise.com)',
            'Clearly explain the technical reason for the delay (data cleansing to ensure 100% integrity)',
            'Provide the revised milestone date (Oct 28)',
            'Reaffirm overall go-live launch confidence'
          ],
          timeLimitMinutes: 10,
          tips: ['Frame delays around safeguarding quality and data integrity']
        }
      },
      {
        id: 'int-stage-11',
        stageNumber: 11,
        title: 'Request for Project Resources / Software License',
        category: 'Business Communication',
        description: 'Request enterprise software tooling with productivity and cost-benefit justification.',
        targetSkills: ['Resource Requests', 'Cost-Benefit Justification', 'Team Velocity'],
        scenario: {
          id: 'int-11-resource-ask',
          title: 'Requesting Figma Enterprise License for Design System Migration',
          category: 'Business Communication',
          difficulty: 'Intermediate',
          senderName: 'Alex Morgan',
          senderEmail: 'alex.morgan@xyztech.com (You)',
          senderRole: 'UI/UX Lead',
          recipient: 'Priya Sharma',
          recipientEmail: 'priya.sharma@xyztech.com',
          recipientRole: 'Engineering Manager',
          recipientExpectations: 'Needs annual cost, productivity savings estimate, and budget alignment.',
          objective: 'Request a $45/month Figma Enterprise seat to accelerate design system component standardization.',
          context: 'Your team is building a reusable UI component library across 4 product squads.',
          backstoryDetails: {
            triggerEvent: 'Design system sprint kickoff.',
            stakes: 'Eliminating duplicate UI engineering hours.',
            keyPointsToCover: ['Cost ($45/mo)', 'Expected 20% frontend velocity boost', 'Manager sign-off ask']
          },
          requirements: [
            'Enter Manager in To: (priya.sharma@xyztech.com)',
            'State tool name and subscription cost ($45/month)',
            'Quantify productivity benefit (saves ~6 engineering hours per week)',
            'Request approval to submit expense through procurement'
          ],
          timeLimitMinutes: 10,
          tips: ['Translate software cost into saved engineering hours']
        }
      },
      {
        id: 'int-stage-12',
        stageNumber: 12,
        title: 'Constructive 360 Feedback Request',
        category: 'Business Communication',
        description: 'Request constructive feedback from peers and leadership with targeted questions.',
        targetSkills: ['Feedback Requests', 'Self-Awareness', 'Targeted Questions'],
        scenario: {
          id: 'int-12-feedback-req',
          title: 'Requesting Mid-Year 360 Performance Feedback from Cross-Functional Lead',
          category: 'Business Communication',
          difficulty: 'Intermediate',
          senderName: 'Alex Morgan',
          senderEmail: 'alex.morgan@xyztech.com (You)',
          senderRole: 'Data Analyst',
          recipient: 'Marcus Vance',
          recipientEmail: 'marcus.vance@xyztech.com',
          recipientRole: 'Product Director',
          recipientExpectations: 'Appreciates targeted questions on specific projects rather than vague "how am I doing" asks.',
          objective: 'Ask Marcus for feedback on your data modeling presentation and dashboard usability for Q3.',
          context: 'You collaborated with Marcus on the Q3 Growth Dashboard and want constructive feedback for your review.',
          backstoryDetails: {
            triggerEvent: 'Mid-year performance cycle.',
            stakes: 'Identifying areas for professional skill growth.',
            keyPointsToCover: ['Specific project collaboration', '3 targeted feedback questions', 'Deadline (Friday)']
          },
          requirements: [
            'Enter Product Director in To: (marcus.vance@xyztech.com)',
            'Reference specific collaboration on Q3 Growth Dashboard',
            'Ask 2 targeted questions (e.g. data clarity and meeting communication)',
            'Provide a friendly response deadline'
          ],
          timeLimitMinutes: 10,
          tips: ['Ask specific questions to get actionable feedback']
        }
      }
    ]
  },

  // ==========================================
  // LEVEL 3: ADVANCED (14 Stages - Stakeholder Management & CC/BCC)
  // ==========================================
  {
    id: 'advanced',
    levelNumber: 3,
    name: 'Level 3 — Advanced',
    tagline: 'Master stakeholder routing, CC/BCC etiquette, executive escalation, and commercial negotiation.',
    goal: 'Learn multi-stakeholder management, conflict resolution, sensitive business justification, and strict recipient routing.',
    targetScoreToUnlockNext: 80,
    timeLimitMinutes: 8,
    timePressureDesc: '8 Minutes (High pressure — multiple stakeholders & routing rules)',
    stages: [
      {
        id: 'adv-stage-01',
        stageNumber: 1,
        title: 'Project Deadline Escalation (API Delay)',
        category: 'Project Update',
        description: 'Escalate a cross-team dependency blocking release without blaming individuals.',
        targetSkills: ['Diplomacy', 'CC/BCC Governance', 'Schedule Revision'],
        scenario: {
          id: 'adv-01-escalation',
          title: 'Project Deadline Escalation & API Dependency Blocker',
          category: 'Project Update',
          difficulty: 'Advanced',
          senderName: 'Alex Morgan',
          senderEmail: 'alex.morgan@xyztech.com (You)',
          senderRole: 'Frontend Engineering Lead',
          recipient: 'Priya Sharma',
          recipientEmail: 'priya.sharma@xyztech.com',
          recipientRole: 'Project Manager',
          recipientExpectations: 'Expects diplomatic framing, factual dependency description, zero individual blaming, and a concrete revised timeline.',
          targetCc: 'eng.lead@xyztech.com, product.manager@xyztech.com',
          targetCcRole: 'Engineering Lead & Product Manager',
          ccContext: 'Keep engineering leadership and product management aligned on schedule shifts.',
          targetBcc: 'dept.head@xyztech.com',
          targetBccRole: 'Department Head',
          bccContext: 'Provide quiet department oversight without escalating tension publicly.',
          objective: 'Escalate a critical API integration bottleneck blocking Friday release and propose a revised Tuesday launch.',
          context: 'Payment gateway API is 4 days delayed, blocking 48 hours of mandatory frontend sandbox testing.',
          backstoryDetails: {
            triggerEvent: 'Sprint review confirmed backend API delayed to Wednesday.',
            stakes: 'Shipping untested payment workflows risks transaction failures.',
            keyPointsToCover: ['Explain API dependency', 'Avoid personal blaming', 'Propose Tuesday cutover']
          },
          requirements: [
            'Enter Project Manager in To: (priya.sharma@xyztech.com)',
            'Add Engineering Lead and Product Manager in Cc:',
            'Add Department Head in Bcc: (dept.head@xyztech.com)',
            'Objectively explain the dependency without blaming individuals',
            'Propose a realistic revised launch date (next Tuesday)'
          ],
          timeLimitMinutes: 8,
          tips: ['Focus on "The API delivery is pending" rather than "Team X failed to deliver"']
        }
      },
      {
        id: 'adv-stage-02',
        stageNumber: 2,
        title: 'Budget Increase Request (Cloud Infrastructure)',
        category: 'Business Communication',
        description: 'Request capital budget increase backed by surge metrics and 9.2x ROI conversion.',
        targetSkills: ['Financial Metrics', 'ROI Justification', 'Executive Governance'],
        scenario: {
          id: 'adv-02-budget-ask',
          title: 'Request for Additional Project Budget (Cloud Infrastructure)',
          category: 'Business Communication',
          difficulty: 'Advanced',
          senderName: 'Alex Morgan',
          senderEmail: 'alex.morgan@abctech.com (You)',
          senderRole: 'Lead Cloud Architect',
          recipient: 'Finance Manager',
          recipientEmail: 'finance@abctech.com',
          recipientRole: 'Corporate Finance Manager',
          recipientExpectations: 'Expects original budget, current spend, unit cost breakdown, ROI justification, and approval deadline.',
          targetCc: 'project.manager@abctech.com, dept.head@abctech.com',
          targetCcRole: 'Project Manager & Department Head',
          ccContext: 'Keep project governance informed of capital expenditure adjustments.',
          targetBcc: 'project.sponsor@abctech.com',
          targetBccRole: 'Executive Project Sponsor',
          bccContext: 'Maintain confidential sponsor oversight on budget changes.',
          objective: 'Request an additional ₹2,00,000 budget due to 300% cloud ingest growth from 12 enterprise pilot accounts.',
          context: 'Cloud compute usage reached 85% of quarterly allocation due to heavy enterprise pilot workloads.',
          backstoryDetails: {
            triggerEvent: 'AWS billing alarm triggered at 85% threshold.',
            stakes: 'Preventing compute throttling for 12 enterprise trial clients.',
            keyPointsToCover: ['Original budget (₹8L) and current spend (₹6.8L)', 'Reason for surge', 'ROI (₹18.5L ARR)', 'Approval deadline']
          },
          requirements: [
            'Enter Finance Manager in To: (finance@abctech.com)',
            'Add Project Manager and Department Head in Cc:',
            'Add Project Sponsor in Bcc: (project.sponsor@abctech.com)',
            'State original budget (₹8L), spend (₹6.8L), and requested addition (₹2L)',
            'Quantify expected ROI (₹18.5L in new annual contracts)',
            'Set an explicit approval deadline'
          ],
          timeLimitMinutes: 8,
          tips: ['Finance approvals require clear ROI numbers and cost control explanations']
        }
      },
      {
        id: 'adv-stage-03',
        stageNumber: 3,
        title: 'Vendor Contract 20% Price Increase Pushback',
        category: 'Business Communication',
        description: 'Negotiate down a 20% SaaS price hike using a 2-year contract commitment counter-offer.',
        targetSkills: ['Commercial Negotiation', 'Counter-Proposals', 'Vendor Relations'],
        scenario: {
          id: 'adv-03-vendor-neg',
          title: 'Vendor Contract Renewal & 20% Price Increase Pushback',
          category: 'Business Communication',
          difficulty: 'Advanced',
          senderName: 'Alex Morgan',
          senderEmail: 'alex.morgan@xyztech.com (You)',
          senderRole: 'IT Procurement Specialist',
          recipient: 'Vendor Account Manager',
          recipientEmail: 'vendor@cloudservices.com',
          recipientRole: 'Enterprise Account Executive, CloudServices',
          recipientExpectations: 'Expects firm commercial pushback backed by budget limits and multi-year commitment leverage.',
          targetCc: 'procurement@xyztech.com, finance@xyztech.com',
          targetCcRole: 'Procurement Manager & Finance Manager',
          ccContext: 'Keep internal procurement and finance aligned during commercial terms negotiation.',
          targetBcc: 'dept.head@xyztech.com',
          targetBccRole: 'Department Head',
          bccContext: 'Maintain internal leadership oversight.',
          objective: 'Counter a 20% price increase ($50k to $60k) with a 5% cap ($52.5k) in exchange for a 2-year contract.',
          context: 'Vendor proposed a $10,000 price hike. Your IT software budget caps annual increases at 5%.',
          backstoryDetails: {
            triggerEvent: 'Received annual renewal notice with 20% increase.',
            stakes: 'Preventing budget blowouts while avoiding painful system migration.',
            keyPointsToCover: ['Acknowledge partnership', 'Explain 5% budget cap', 'Propose 2-year 5% counter-offer', 'Schedule call']
          },
          requirements: [
            'Enter Vendor Account Manager in To: (vendor@cloudservices.com)',
            'Add Procurement and Finance in Cc:',
            'Add Department Head in Bcc: (dept.head@xyztech.com)',
            'Firmly reject the 20% increase citing 5% company budget limits',
            'Propose a 2-year contract locked at 5% as a win-win compromise'
          ],
          timeLimitMinutes: 8,
          tips: ['Trade contract duration for lower annual rates']
        }
      },
      {
        id: 'adv-stage-04',
        stageNumber: 4,
        title: 'Executive Client Complaint Remediation',
        category: 'Complaint Email',
        description: 'Respond to an enterprise client complaint regarding repeated weekend digest failures.',
        targetSkills: ['Executive Ownership', 'Root Cause Explanation', 'Remediation Timelines'],
        scenario: {
          id: 'adv-04-client-complaint',
          title: 'Executive Response to Major Client Service Complaint',
          category: 'Complaint Email',
          difficulty: 'Advanced',
          senderName: 'Alex Morgan',
          senderEmail: 'alex.morgan@globalcorp.com (You)',
          senderRole: 'Senior Client Success Director',
          recipient: 'Client Relationship Manager',
          recipientEmail: 'client.manager@globalcorp.com',
          recipientRole: 'Client Account Manager',
          recipientExpectations: 'Expects immediate ownership, zero excuses, actionable root cause summary, and verifiable timeline.',
          targetCc: 'operations.manager@globalcorp.com, support.lead@globalcorp.com',
          targetCcRole: 'Operations Manager & Support Lead',
          ccContext: 'Align internal delivery leads on executive commitments.',
          targetBcc: 'qa.head@globalcorp.com',
          targetBccRole: 'Head of Quality Assurance',
          bccContext: 'Ensure QA tracks defect patterns without alarming the client.',
          objective: 'Respond to a major client complaint about delayed Monday compliance reports and outline 3 technical fixes.',
          context: 'Weekend database maintenance created transactional locks delaying Monday 6 AM report generation for 2 weeks.',
          backstoryDetails: {
            triggerEvent: 'Client Managing Director emailed an ultimatum threatening contract cancellation.',
            stakes: '$350,000 annual account at risk.',
            keyPointsToCover: ['Own responsibility', 'Explain read-replica migration', 'Synthetic monitoring', 'Sunday dry run']
          },
          requirements: [
            'Enter Client Manager in To: (client.manager@globalcorp.com)',
            'Add Operations and Support Leads in Cc:',
            'Add QA Head in Bcc: (qa.head@globalcorp.com)',
            'Acknowledge issue and apologize without making excuses',
            'Detail concrete remediation (read-replica, synthetic probes, failover script)'
          ],
          timeLimitMinutes: 8,
          tips: ['Never say "glitch" — explain the technical root cause and preventive measures']
        }
      },
      {
        id: 'adv-stage-05',
        stageNumber: 5,
        title: 'P0 Major Production Outage Briefing',
        category: 'Technical Communication',
        description: 'Send a high-priority executive briefing on an active 2-hour payment outage.',
        targetSkills: ['Crisis Briefing', 'Incident Telemetry', 'Executive Communication'],
        scenario: {
          id: 'adv-05-prod-outage',
          title: 'Major Production Outage P0 Executive Briefing',
          category: 'Technical Communication',
          difficulty: 'Advanced',
          senderName: 'Alex Morgan',
          senderEmail: 'alex.morgan@xyztech.com (You)',
          senderRole: 'Lead SRE | Incident Commander',
          recipient: 'Chief Technology Officer',
          recipientEmail: 'cto@xyztech.com',
          recipientRole: 'Chief Technology Officer',
          recipientExpectations: 'Expects situation summary, customer impact data, active workstreams, ETR, and next update schedule.',
          targetCc: 'eng.manager@xyztech.com, devops.lead@xyztech.com, customer.support@xyztech.com',
          targetCcRole: 'Engineering Manager, DevOps Lead & Customer Support',
          ccContext: 'Keep engineering leads and customer support aligned on recovery status.',
          targetBcc: 'incident.lead@xyztech.com',
          targetBccRole: 'Global Incident Management Lead',
          bccContext: 'Maintain incident response governance.',
          objective: 'Provide an executive P0 update on a 2-hour payment deadlock outage affecting 4,200 transactions.',
          context: 'Cascading database locks caused payment pod timeouts during peak load.',
          backstoryDetails: {
            triggerEvent: 'Outage surpassed 120 minutes.',
            stakes: 'Estimated $45,000 in uncompleted carts.',
            keyPointsToCover: ['Status and duration (2 hours)', 'Impact (4,200 users)', 'Active mitigation', 'ETR (14:15 IST)', 'Next update (30 mins)']
          },
          requirements: [
            'Enter CTO in To: (cto@xyztech.com)',
            'Add Eng Manager, DevOps Lead, and Support in Cc:',
            'Add Incident Lead in Bcc: (incident.lead@xyztech.com)',
            'State root cause and duration (2 hours)',
            'Quantify business impact (4,200 queued transactions)',
            'Provide estimated recovery ETA and 30-minute update cycle'
          ],
          timeLimitMinutes: 8,
          tips: ['Use standard incident headers: Status, Impact, Workstreams, ETR, Next Update']
        }
      },
      {
        id: 'adv-stage-06',
        stageNumber: 6,
        title: 'Data Quality Anomaly & Executive Report Delay',
        category: 'Business Communication',
        description: 'Escalate a major data inconsistency and recommend delaying the executive board report.',
        targetSkills: ['Data Integrity', 'Executive Advising', 'Risk Prevention'],
        scenario: {
          id: 'adv-06-data-quality',
          title: 'Data Quality Discrepancy & Recommendation to Delay Board Report',
          category: 'Business Communication',
          difficulty: 'Advanced',
          senderName: 'Alex Morgan',
          senderEmail: 'alex.morgan@xyztech.com (You)',
          senderRole: 'Lead Analytics Engineer',
          recipient: 'Data Engineering Manager',
          recipientEmail: 'data.engineering@xyztech.com',
          recipientRole: 'Data Engineering Manager',
          recipientExpectations: 'Needs specific dataset discrepancy details, root cause, and timeline to re-run pipelines.',
          targetCc: 'analytics.manager@xyztech.com, project.manager@xyztech.com',
          targetCcRole: 'Analytics Manager & Project Manager',
          ccContext: 'Keep project and analytics leads informed on board report delay.',
          targetBcc: 'dept.head@xyztech.com',
          targetBccRole: 'Department Head',
          bccContext: 'Provide quiet oversight on reporting risks.',
          objective: 'Report an 18% discrepancy in the Q3 revenue dataset and recommend postponing the board slide deck by 24 hours.',
          context: 'A pipeline ETL bug duplicate-counted European subscription renewals by 18%.',
          backstoryDetails: {
            triggerEvent: 'Discrepancy spotted during pre-board data audit.',
            stakes: 'Presenting erroneous data to the Board of Directors damages company credibility.',
            keyPointsToCover: ['18% revenue anomaly found', 'ETL duplication vector', 'Recommendation to delay report by 24h', 'Pipeline re-run ETA']
          },
          requirements: [
            'Enter Data Engineering Manager in To: (data.engineering@xyztech.com)',
            'Add Analytics Manager and Project Manager in Cc:',
            'Add Department Head in Bcc: (dept.head@xyztech.com)',
            'Quantify the data discrepancy (18% duplicate revenue in EU tier)',
            'Firmly recommend delaying the board report by 24 hours to re-run clean ETL'
          ],
          timeLimitMinutes: 8,
          tips: ['Always prioritize data accuracy over adhering to an arbitrary presentation deadline']
        }
      },
      {
        id: 'adv-stage-07',
        stageNumber: 7,
        title: 'Late-Stage Scope Change Evaluation',
        category: 'Client Communication',
        description: 'Evaluate a late client request 5 days before release and recommend deferral to Phase 2.',
        targetSkills: ['Scope Management', 'Risk Analysis', 'Diplomatic Deferral'],
        scenario: {
          id: 'adv-07-scope-change',
          title: 'Late-Stage Client Scope Change Evaluation & Recommendation',
          category: 'Client Communication',
          difficulty: 'Advanced',
          senderName: 'Alex Morgan',
          senderEmail: 'alex.morgan@xyztech.com (You)',
          senderRole: 'Technical Product Lead',
          recipient: 'Product Manager',
          recipientEmail: 'product@xyztech.com',
          recipientRole: 'Principal Product Manager',
          recipientExpectations: 'Expects trade-off analysis (velocity, delay, regression risk) and clear recommendation.',
          targetCc: 'project.manager@xyztech.com, eng.lead@xyztech.com',
          targetCcRole: 'Project Manager & Engineering Lead',
          ccContext: 'Keep delivery team informed on scope boundary decisions.',
          targetBcc: 'dept.head@xyztech.com',
          targetBccRole: 'Department Head',
          bccContext: 'Provide leadership visibility on client scope management.',
          objective: 'Recommend deferring client request for multi-currency invoicing to Phase 2 to protect Friday launch.',
          context: 'Client requested multi-currency invoicing 5 days before scheduled v2.0 production release.',
          backstoryDetails: {
            triggerEvent: 'Client submitted late change request.',
            stakes: 'Implementing now causes a 3-week delay and regression risks.',
            keyPointsToCover: ['Technical scope impact (80 eng hours)', 'Risk to Friday launch', 'Recommendation for v2.1 Phase 2']
          },
          requirements: [
            'Enter Product Manager in To: (product@xyztech.com)',
            'Add Project Manager and Engineering Lead in Cc:',
            'Add Department Head in Bcc: (dept.head@xyztech.com)',
            'Detail the concrete risk (3-week delay, 80 eng hours)',
            'Recommend delivering v2.0 on schedule and scheduling multi-currency for v2.1'
          ],
          timeLimitMinutes: 8,
          tips: ['Frame scope decisions around safeguarding launch quality and client timeline commitments']
        }
      }
    ]
  },

  // ==========================================
  // LEVEL 4: EXPERT (12 Stages - Ambiguity, Strategy & C-Suite)
  // ==========================================
  {
    id: 'expert',
    levelNumber: 4,
    name: 'Level 4 — Expert',
    tagline: 'Strategic leadership, crisis management, competing priorities, and C-Suite communication.',
    goal: 'Handle situations with competing priorities, incomplete information, executive diplomacy, and high financial stakes.',
    targetScoreToUnlockNext: 85,
    timeLimitMinutes: 7,
    timePressureDesc: '7 Minutes (High pressure — ambiguous business context)',
    stages: [
      {
        id: 'exp-stage-01',
        stageNumber: 1,
        title: 'Executive Recommendation: Build vs. Buy AI Search',
        category: 'Business Communication',
        description: 'Present a strategic build vs. buy recommendation to the CEO with comparative matrices and ROI.',
        targetSkills: ['C-Suite Strategy', 'Build vs Buy', 'Shareholder Value'],
        scenario: {
          id: 'exp-01-build-vs-buy',
          title: 'Executive Strategic Decision: Build vs. Buy AI Search Infrastructure',
          category: 'Business Communication',
          difficulty: 'Expert',
          senderName: 'Alex Morgan',
          senderEmail: 'alex.morgan@xyztech.com (You)',
          senderRole: 'Principal Architect & Director of AI Engineering',
          recipient: 'Chief Executive Officer',
          recipientEmail: 'ceo@xyztech.com',
          recipientRole: 'Chief Executive Officer',
          recipientExpectations: 'Expects multi-dimensional comparison table (Cost, Latency, Risk, Time-to-Market), single recommendation, and long-term shareholder value justification.',
          targetCc: 'cto@xyztech.com, cfo@xyztech.com, product.director@xyztech.com',
          targetCcRole: 'CTO, CFO & Product Director',
          ccContext: 'Keep executive C-suite aligned on technology infrastructure investments.',
          targetBcc: 'project.sponsor@xyztech.com',
          targetBccRole: 'Executive Project Sponsor',
          bccContext: 'Maintain confidential governance record.',
          objective: 'Deliver an executive recommendation comparing In-House Vector Search vs. Managed Cloud Search, recommending Managed Cloud.',
          context: 'You completed a 4-week architectural bake-off for 2.5 million users. Managed option is 3.5 months faster and saves $85k/yr.',
          backstoryDetails: {
            triggerEvent: 'Quarterly board capital allocation meeting on Friday.',
            stakes: '$350,000 multi-year budget and 4-month launch timing difference.',
            keyPointsToCover: ['Matrix comparison', 'Why Managed wins (3.5 months faster, $85k savings)', 'Clear recommendation', 'Next steps']
          },
          requirements: [
            'Enter CEO in To: (ceo@xyztech.com)',
            'Add CTO, CFO, and Product Director in Cc:',
            'Add Project Sponsor in Bcc: (project.sponsor@xyztech.com)',
            'Provide structured comparative analysis across Cost, Latency, Maintenance, and Time-to-Market',
            'Unambiguously recommend Option B (Managed Cloud Engine)',
            'Outline immediate execution steps'
          ],
          timeLimitMinutes: 7,
          tips: ['Executive recommendations should lead with the final verdict in the opening paragraph']
        }
      },
      {
        id: 'exp-stage-02',
        stageNumber: 2,
        title: 'Executive Compensation & Equity Restructuring',
        category: 'Business Communication',
        description: 'Formally submit a compensation review and performance-based equity grant proposal to the Board.',
        targetSkills: ['Executive Negotiation', 'Performance Stock Units', 'Shareholder Alignment'],
        scenario: {
          id: 'exp-02-exec-comp',
          title: 'Executive Compensation & Long-Term Equity Restructuring',
          category: 'Business Communication',
          difficulty: 'Expert',
          senderName: 'Alex Morgan',
          senderEmail: 'alex.morgan@techcorp.com (You)',
          senderRole: 'VP of Product & Machine Learning Engineering',
          recipient: 'Arthur Vance',
          recipientEmail: 'arthur.vance@board-techcorp.com',
          recipientRole: 'Chair of Compensation Committee, Board of Directors',
          recipientExpectations: 'Expects executive poise, verifiable market benchmarking data, quantifiable business ROI delivered ($42M ARR), and shareholder alignment.',
          targetCc: 'linda.sterling@techcorp.com',
          targetCcRole: 'Chief People Officer & Head of Global HR',
          ccContext: 'Ensure HR leadership coordinates compensation committee docket materials.',
          objective: 'Propose a base salary adjustment and Performance Stock Units (PSUs) tied to $100M ARR and positive EBITDA milestones.',
          context: 'Over 24 months, you architected the AI recommendation engine that drove $42M in ARR, scaled the team to 85 engineers (96% retention), and filed 3 patents.',
          backstoryDetails: {
            triggerEvent: 'Annual Board Compensation Committee convenes in 3 weeks.',
            stakes: 'Aligning executive compensation with scale-up market benchmarks.',
            keyPointsToCover: ['Gratitude for partnership', '3 business outcomes ($42M ARR, 85 engineers, 3 patents)', 'Market data', 'PSUs tied to $100M ARR']
          },
          requirements: [
            'Enter Board Committee Chair in To: (arthur.vance@board-techcorp.com)',
            'Add Chief People Officer in Cc: (linda.sterling@techcorp.com)',
            'Detail 3 quantifiable executive milestones delivered ($42M ARR, 85 engineers, patents)',
            'Propose a performance-aligned equity structure (PSUs tied to milestone vesting)',
            'Maintain an exemplary executive poise, collaborative diplomacy, and commercial rigor'
          ],
          timeLimitMinutes: 7,
          tips: ['Anchor equity to future company success (PSUs tied to $100M ARR) to align with board interests']
        }
      }
    ]
  },

  // ==========================================
  // LEVEL 5: MASTER (The Final Mastery Assessment Challenge)
  // ==========================================
  {
    id: 'master',
    levelNumber: 5,
    name: 'Level 5 — Master',
    tagline: 'The Ultimate Mastery Assessment. Zero hints, raw business dilemma, full decision autonomy.',
    goal: 'Test complete professional autonomy in a high-stakes enterprise crisis with competing priorities.',
    targetScoreToUnlockNext: 90,
    timeLimitMinutes: 5,
    timePressureDesc: '5 Minutes (Maximum pressure — full autonomy with zero hints)',
    stages: [
      {
        id: 'master-final-challenge',
        stageNumber: 1,
        title: 'Master Email Writing Challenge: Enterprise Retention Crisis',
        category: 'Client Communication',
        description: 'A major enterprise client is considering terminating their contract over platform failures. Sales wants a 3-day promise; Engineering says 5 days. You must decide everything.',
        targetSkills: ['Crisis Leadership', 'Stakeholder Balancing', 'Business Judgment', 'Total Autonomy'],
        scenario: {
          id: 'master-01-retention-crisis',
          title: 'Master Challenge: High-Stakes Enterprise Contract Retention & Incident Response',
          category: 'Client Communication',
          difficulty: 'Master',
          senderName: 'Alex Morgan',
          senderEmail: 'alex.morgan@analyticsgrid.com (You)',
          senderRole: 'VP of Customer Engineering & Client Operations',
          recipient: 'Enterprise Client Leadership',
          recipientEmail: 'leadership@cliententerprise.com',
          recipientRole: 'Executive VP of Technology, ClientEnterprise',
          recipientExpectations: 'Expects executive honesty, unvarnished technical realities, zero over-promising, concrete mitigation steps, and dedicated executive contact.',
          targetCc: 'sales.vp@analyticsgrid.com, cto@analyticsgrid.com',
          targetCcRole: 'VP of Sales & Chief Technology Officer',
          ccContext: 'Align sales leadership and CTO on technical timeline commitments.',
          targetBcc: 'ceo@analyticsgrid.com, legal@analyticsgrid.com',
          targetBccRole: 'Chief Executive Officer & Corporate Legal',
          bccContext: 'Maintain confidential executive and legal oversight on contract risk.',
          objective: 'Write an executive-level email resolving the crisis: reconcile the sales vs. engineering timeline conflict, own the platform failure, prevent contract termination, and outline an airtight remediation roadmap.',
          context: 'A major $500k/yr enterprise client reported repeated failures in your analytics platform and is actively considering terminating the contract. Your engineering team expects the root fix to take approximately five days to guarantee stability, while your sales VP is pressuring you to promise a three-day resolution to stop them from walking.',
          backstoryDetails: {
            triggerEvent: 'Client EVP sent a formal notice of dissatisfaction requesting an emergency executive resolution plan by 5 PM today.',
            stakes: '$500,000 ARR contract on the line and company reputation in the financial sector.',
            keyPointsToCover: ['Own the platform issue without defensive excuses', 'Balance the 3-day sales promise vs. 5-day engineering reality by deploying a temporary patch in 48 hours and the permanent fix in 5 days', 'Provide dedicated on-call engineering coverage', 'Schedule a daily executive cadence']
          },
          requirements: [
            'Decide and input the correct primary recipient in the To: field',
            'Configure appropriate operational visibility in the Cc: field',
            'Configure appropriate executive/legal oversight in the Bcc: field',
            'Craft an authoritative, non-defensive, and confidence-restoring Subject Line',
            'Reconcile the 3-day vs. 5-day timeline conflict with a pragmatic phased solution (immediate mitigation + hardened permanent fix)',
            'Establish concrete accountability, dedicated monitoring, and executive check-in cadence',
            'Demonstrate master-level business judgment, tone calibration, and persuasion'
          ],
          timeLimitMinutes: 5,
          tips: ['Never over-promise a date engineering cannot deliver; use a phased interim mitigation + permanent fix strategy']
        }
      }
    ]
  }
];
