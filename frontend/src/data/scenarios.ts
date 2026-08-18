import { PracticeScenario, EmailCategory } from '../types';

export const CATEGORIES: { name: EmailCategory; icon: string; description: string; domain: 'Business' | 'Academic' | 'Personal' }[] = [
  { name: 'Business Communication', icon: 'Briefcase', description: 'Internal team alignments, budget asks, and executive escalations', domain: 'Business' },
  { name: 'Job Application', icon: 'FileText', description: 'Cold outreach to recruiters, cover letters, and interview follow-ups', domain: 'Business' },
  { name: 'Internship', icon: 'GraduationCap', description: 'Internship applications, mentor check-ins, and recommendation asks', domain: 'Business' },
  { name: 'Client Communication', icon: 'Users', description: 'High-stakes client updates, deliverables, and scope discussions', domain: 'Business' },
  { name: 'Complaint Email', icon: 'AlertCircle', description: 'Professional grievance reporting, service escalations, and vendor issues', domain: 'Business' },
  { name: 'Apology Email', icon: 'HeartHandshake', description: 'Owning delays, missed deadlines, and rebuilding professional trust', domain: 'Business' },
  { name: 'Meeting Request', icon: 'Calendar', description: 'Executive scheduling, 1-on-1 syncs, and pitch meetings with clear agendas', domain: 'Business' },
  { name: 'Leave Request', icon: 'Clock', description: 'Vacation notices, sick leaves, and contingency handover planning', domain: 'Business' },
  { name: 'Project Update', icon: 'Kanban', description: 'Sprint reviews, milestone reports, blocker highlights, and timelines', domain: 'Business' },
  { name: 'Resignation & HR', icon: 'FileText', description: 'Formal resignation letters, performance reviews, and sensitive HR inquiries', domain: 'Business' },
  { name: 'Academic & School', icon: 'BookOpen', description: 'Leave requests to principals, professor queries, recommendation requests', domain: 'Academic' },
  { name: 'Personal & Informal', icon: 'Users', description: 'Party invitations, thanking peers, trip planning, and pen pal letters', domain: 'Personal' },
  { name: 'Customer Support', icon: 'Headphones', description: 'De-escalating angry users, resolving ticket bugs, and refund policies', domain: 'Business' },
  { name: 'Technical Communication', icon: 'Code', description: 'Architecture proposals, system outage post-mortems, and API changes', domain: 'Business' },
];

export const SCENARIOS: PracticeScenario[] = [
  // =========================================================================
  // 20 ADVANCED REAL-WORLD ENTERPRISE TOPICS (WITH CC, BCC & STAKEHOLDER MANAGEMENT)
  // =========================================================================
  
  // 1. Project Deadline Escalation
  {
    id: 'adv-01-deadline-escalation',
    title: 'Project Deadline Escalation & API Dependency Blocker',
    category: 'Project Update',
    difficulty: 'Advanced',
    senderName: 'Alex Morgan',
    senderEmail: 'alex.morgan@xyztech.com (You)',
    senderRole: 'Frontend Engineering Lead',
    recipient: 'Priya Sharma',
    recipientEmail: 'priya.sharma@xyztech.com',
    recipientRole: 'Project Manager',
    recipientExpectations: 'Expects diplomatic framing, factual dependency description, zero individual blaming, and a concrete revised timeline option.',
    targetCc: 'eng.lead@xyztech.com, product.manager@xyztech.com',
    targetCcRole: 'Engineering Lead & Product Manager',
    ccContext: 'Keep engineering leadership and product management aligned on schedule shifts.',
    targetBcc: 'dept.head@xyztech.com',
    targetBccRole: 'Department Head',
    bccContext: 'Provide quiet department oversight without escalating tension publicly on the thread.',
    objective: 'Escalate a critical API integration bottleneck that threatens the launch deadline without blaming individuals, and propose a revised rollout schedule.',
    context: 'A critical client portal release is scheduled for Friday. However, the external Payment Gateway API from the platform services team is 4 days delayed, blocking frontend end-to-end sandbox testing.',
    backstoryDetails: {
      triggerEvent: 'Platform services sprint review confirmed the authentication API endpoint will not be deployed until Wednesday evening.',
      stakes: 'Shipping on Friday with untested payment workflows risks system errors and client transactions.',
      keyPointsToCover: ['Explain the API dependency and downstream test blockage', 'Identify the delay objectively without personal finger-pointing', 'Request expedited mock sandbox stubs', 'Propose moving production cutover to next Tuesday']
    },
    requirements: [
      'Enter Project Manager in To: (priya.sharma@xyztech.com)',
      'Add Engineering Lead and Product Manager in Cc: (eng.lead@xyztech.com, product.manager@xyztech.com)',
      'Add Department Head in Bcc: (dept.head@xyztech.com)',
      'Objectively explain the dependency without blaming individuals',
      'Detail the impact (need 48 hours for secure sandbox testing)',
      'Propose a realistic revised launch date (next Tuesday)',
      'Maintain a collaborative, solution-oriented diplomatic tone'
    ],
    timeLimitMinutes: 12,
    tips: ['Focus on "The API delivery is pending" rather than "Team X failed to deliver"'],
    sampleAnswer: {
      subject: '[Schedule Escalation] Client Portal Launch — API Dependency & Proposed Timeline Adjustment',
      body: `Hi Priya,

I am writing to provide an urgent update regarding the upcoming Friday release of the Client Portal.

Current Dependency & Impact:
Our frontend integration is 95% complete. However, final end-to-end sandbox testing is currently blocked pending the deployment of the Payment Gateway Authentication API endpoint (expected Wednesday evening). As our standard security and QA testing protocol requires a mandatory 48-hour testing window, conducting thorough validation before Friday’s cutover is no longer feasible.

Proposed Resolution & Revised Schedule:
To safeguard transaction integrity and ensure a flawless client rollout, I recommend:
1. Deploying temporary mock API stubs tomorrow morning to validate UI components.
2. Rescheduling the production go-live cutover to Tuesday, October 24th at 9:00 AM EST.

Could we connect for a brief 10-minute sync today at 3:00 PM to align on this revised schedule and update the client advisory?

Best regards,
Alex Morgan
Frontend Engineering Lead, XYZ Technologies`,
      whyItWorks: 'Direct, avoids all finger-pointing, cites concrete QA time requirements (48 hrs), offers mock stubs as an immediate step, and proposes a specific revised date.'
    }
  },

  // 2. Request for Additional Project Budget
  {
    id: 'adv-02-additional-project-budget',
    title: 'Request for Additional Project Budget (Cloud Infrastructure)',
    category: 'Business Communication',
    difficulty: 'Advanced',
    senderName: 'Alex Morgan',
    senderEmail: 'alex.morgan@abctech.com (You)',
    senderRole: 'Lead Cloud Architect',
    recipient: 'Finance Manager',
    recipientEmail: 'finance@abctech.com',
    recipientRole: 'Corporate Finance & Budgeting Manager',
    recipientExpectations: 'Expects rigorous financial metrics: original budget, current spend, unit cost breakdown, ROI justification, and approval deadline.',
    targetCc: 'project.manager@abctech.com, dept.head@abctech.com',
    targetCcRole: 'Project Manager & Department Head',
    ccContext: 'Keep project governance informed of capital expenditure adjustments.',
    targetBcc: 'project.sponsor@abctech.com',
    targetBccRole: 'Executive Project Sponsor',
    bccContext: 'Maintain confidential sponsor oversight on budget changes.',
    objective: 'Request an additional ₹2,00,000 budget due to higher-than-expected cloud data streaming and auto-scaling compute during beta testing.',
    context: 'The enterprise analytics engine beta onboarding grew 300% faster than forecasted, consuming 85% of the allocated cloud compute budget within 2 months.',
    backstoryDetails: {
      triggerEvent: 'AWS cloud billing alarm triggered at 85% of the quarterly allocation due to 12 new enterprise trial accounts running high-frequency ingest.',
      stakes: 'Without additional budget, compute clusters will throttle next week, halting enterprise customer testing.',
      keyPointsToCover: ['Original budget (₹8,00,000) and current expenditure (₹6,80,000)', 'Reason for variance (3x data ingestion volume from 12 tier-1 pilot clients)', 'Requested amount (₹2,00,000)', 'Expected ROI (conversion of ₹18,00,000 in annual recurring enterprise contracts)', 'Approval deadline (Friday, 5 PM)']
    },
    requirements: [
      'Enter Finance Manager in To: (finance@abctech.com)',
      'Add Project Manager and Department Head in Cc:',
      'Add Project Sponsor in Bcc: (project.sponsor@abctech.com)',
      'State original budget (₹8,00,000) and current expenditure (₹6,80,000)',
      'Detail the technical reason for cost surge (300% data throughput growth)',
      'Quantify the business justification & ROI (₹18,00,000 contract conversions)',
      'Set an explicit approval deadline to prevent cluster throttling'
    ],
    timeLimitMinutes: 12,
    tips: ['Finance teams approve requests that show high ROI and clear cost control mechanisms'],
    sampleAnswer: {
      subject: '[Budget Request] Additional Cloud Infrastructure Allocation for Enterprise Analytics Pilot',
      body: `Dear Finance Team,

I am writing to formally request an additional budget allocation of ₹2,00,000 for the Cloud Infrastructure budget of the Enterprise Analytics Platform.

Financial Summary & Variance Breakdown:
• Original Approved Budget: ₹8,00,000
• Current Expenditure to Date: ₹6,80,000 (85% utilized)
• Requested Additional Allocation: ₹2,00,000
• Revised Total Budget: ₹10,00,000

Reason for Cost Increase & Technical Justification:
The pilot rollout experienced unprecedented enterprise adoption, onboarding 12 Tier-1 accounts (300% above initial forecasts). The resulting real-time Kafka data ingestion and auto-scaling compute clusters consumed more GPU hours than modeled in our baseline sandbox environment.

Business Justification & Return on Investment (ROI):
Supporting these 12 enterprise pilot accounts through their 30-day evaluation is projected to yield ₹18,50,000 in Net-New Annual Recurring Revenue (ARR), representing a 9.2x return on this additional infrastructure expenditure.

Approval Timeline:
To prevent automated AWS cluster throttling scheduled at our threshold limit, we kindly request approval by Friday, October 20th, at 5:00 PM IST.

I have attached the detailed AWS cost explorer breakdown and cluster provisioning sheet. Thank you for your review.

Sincerely,
Alex Morgan
Lead Cloud Architect, ABC Tech`,
      whyItWorks: 'Clean table formatting, clear justification of adoption surge, undeniable ROI metrics (9.2x return), and a concrete approval deadline.'
    }
  },

  // 3. Client Complaint Escalation
  {
    id: 'adv-03-client-complaint-escalation',
    title: 'Executive Response to Major Client Service Complaint',
    category: 'Complaint Email',
    difficulty: 'Advanced',
    senderName: 'Alex Morgan',
    senderEmail: 'alex.morgan@globalcorp.com (You)',
    senderRole: 'Senior Client Success Director',
    recipient: 'Client Relationship Manager',
    recipientEmail: 'client.manager@globalcorp.com',
    recipientRole: 'Strategic Account Relationship Manager (Client Side)',
    recipientExpectations: 'Expects immediate ownership, zero corporate excuses, an actionable root cause summary, and a verifiable resolution timeline.',
    targetCc: 'operations.manager@globalcorp.com, support.lead@globalcorp.com',
    targetCcRole: 'Internal Operations Manager & Customer Support Lead',
    ccContext: 'Align delivery leadership on executive commitments made to the client.',
    targetBcc: 'qa.head@globalcorp.com',
    targetBccRole: 'Head of Quality Assurance',
    bccContext: 'Ensure QA leadership tracks defect patterns without alarming the client.',
    objective: 'Respond to an escalated complaint from a Tier-1 enterprise account regarding repeated weekend report delivery delays.',
    context: 'The client’s automated Monday morning compliance digest failed to generate for two consecutive weeks, causing regulatory audits for their trading desk.',
    backstoryDetails: {
      triggerEvent: 'Client Managing Director emailed an ultimatum demanding an immediate executive remediation plan or contract cancellation.',
      stakes: '$350,000 annual contract at immediate risk; regulatory penalties on the client’s trading desk.',
      keyPointsToCover: ['Acknowledge failure and own responsibility without shifting blame', 'Explain the specific technical bottleneck (database query locking during weekend maintenance)', 'Detail 3 corrective steps deployed', 'Provide concrete resolution timeline and schedule a daily status check']
    },
    requirements: [
      'Enter Client Relationship Manager in To: (client.manager@globalcorp.com)',
      'Add Operations Manager and Customer Support Lead in Cc:',
      'Add QA Head in Bcc: (qa.head@globalcorp.com)',
      'Sincerely acknowledge the issue and impact on their trading operations',
      'Explain the corrective actions deployed (dedicated read-replica, automated synthetic checks)',
      'Provide a firm resolution timeline and 24/7 dedicated support bridge',
      'Maintain an executive, accountable, and deeply reassuring tone'
    ],
    timeLimitMinutes: 12,
    tips: ['Never say "our systems had an unexpected glitch" — be specific and detail preventive actions'],
    sampleAnswer: {
      subject: '[Executive Response] Urgent Remediation Plan & Resolution Timeline for Monday Compliance Digest',
      body: `Dear Client Management Team,

Thank you for your candid feedback regarding the recent delays in delivering your Monday morning compliance reports. We understand the critical nature of these digests for your daily trading compliance, and we sincerely apologize for the operational disruption this caused over the past two weeks.

Root Cause Analysis:
Our engineering audit identified that scheduled weekend maintenance routines created transactional locks on the reporting database, causing report generation tasks to queue past the 6:00 AM EST delivery window.

Corrective Measures Deployed Immediately:
1. Dedicated Infrastructure: Migrated all compliance reporting queries to an isolated high-throughput read-replica, ensuring zero interference from background maintenance.
2. Proactive Monitoring: Configured automated synthetic health probes that trigger automated PagerDuty escalations to our senior SRE team if reports are not compiled by 4:00 AM EST.
3. Failover Redundancy: Established a secondary automated script with automated PDF delivery to your backup SFTP server.

Timeline & Reassurance:
These structural enhancements have been fully deployed and validated in our staging environment today. We will conduct a full dry run this Sunday at 2:00 AM EST, and our on-call engineering lead will personally verify your Monday delivery.

I would like to schedule a 15-minute executive review with you tomorrow at 11:00 AM EST to review our monitoring telemetry.

Sincerely,
Alex Morgan
Senior Client Success Director, GlobalCorp`,
      whyItWorks: 'Takes full ownership immediately, explains the technical root cause clearly, outlines 3 preventative safeguards, and sets up personal accountability.'
    }
  },

  // 4. Sensitive Employee Performance Issue
  {
    id: 'adv-04-sensitive-performance-issue',
    title: 'Confidential Employee Performance & PIP Referral',
    category: 'Resignation & HR',
    difficulty: 'Advanced',
    senderName: 'Alex Morgan',
    senderEmail: 'alex.morgan@xyztech.com (You)',
    senderRole: 'Engineering Team Lead',
    recipient: 'HR Manager',
    recipientEmail: 'hr@xyztech.com',
    recipientRole: 'Senior HR Manager',
    recipientExpectations: 'Demands objective, documented facts, chronological timeline, zero emotional bias, and alignment with formal company PIP guidelines.',
    targetCc: 'dept.manager@xyztech.com',
    targetCcRole: 'Department Manager',
    ccContext: 'Keep department management informed of formal personnel processes.',
    targetBcc: 'hrbp.director@xyztech.com',
    targetBccRole: 'HR Business Partner Director',
    bccContext: 'Maintain confidential HRBP governance for legal compliance.',
    objective: 'Report a chronic, documented performance and attendance issue regarding a software engineer and request initiation of a Performance Improvement Plan (PIP).',
    context: 'An engineer on your team has missed 4 consecutive sprint deliverables, arrived 45+ minutes late to core daily standups for 3 weeks, and failed to respond to 1-on-1 coaching notes.',
    backstoryDetails: {
      triggerEvent: 'Sprint 14 retrospective revealed 6 critical user stories assigned to the engineer were abandoned without documentation or PRs.',
      stakes: 'Team velocity dropped 35%, and other engineers are working overtime to cover incomplete tasks.',
      keyPointsToCover: ['Chronological record of dates and missed deliverables', 'Summary of prior informal coaching 1-on-1s on Sept 12 and Oct 3', 'Factual statement of sprint impact', 'Request for formal HR meeting to structure a 30-day PIP']
    },
    requirements: [
      'Enter HR Manager in To: (hr@xyztech.com)',
      'Add Department Manager in Cc: (dept.manager@xyztech.com)',
      'Add HR Business Partner in Bcc: (hrbp.director@xyztech.com)',
      'Present a strictly factual, chronological summary of performance gaps',
      'Document prior informal coaching meetings and lack of progress',
      'Avoid emotional or accusatory adjectives (focus strictly on metrics and attendance logs)',
      'Request a confidential meeting to formalize a 30-day PIP'
    ],
    timeLimitMinutes: 12,
    tips: ['Use neutral phrasing like "Deliverables were not submitted" instead of "Employee showed poor work ethic"'],
    sampleAnswer: {
      subject: '[Confidential] Formal Performance Consultation Request — Engineering Team',
      body: `Dear HR Team,

I am writing to formally request a confidential consultation regarding recurring performance and attendance concerns within the Frontend Engineering squad.

Documented Timeline of Observations:
1. Sprint Deliverables (Sprints 12, 13, and 14):
   • 6 core user stories assigned during sprint planning remained uncompleted without advance blockers raised or pull requests submitted.
2. Daily Standup Attendance (Sept 25 – Oct 15):
   • Absence or late arrival (>40 minutes) recorded across 9 out of 15 scheduled daily alignments, delaying team dependency handoffs.
3. Prior Internal Coaching:
   • September 12: Conducted documented 1-on-1 discussing code review throughput and communication expectations.
   • October 3: Follow-up check-in to review sprint milestone velocity; milestones agreed upon during this session were subsequently missed.

Impact on Operations:
The uncompleted user stories have required adjacent team members to absorb additional sprint workload, impacting overall squad velocity by approximately 35%.

Recommended Next Steps:
I would like to schedule a 30-minute confidential discussion with HR this week to review the documentation and discuss structuring a formal 30-day Performance Improvement Plan (PIP) with clear milestone metrics.

I have attached the sprint velocity logs and meeting notes for your preliminary review.

Sincerely,
Alex Morgan
Engineering Team Lead, XYZ Technologies`,
      whyItWorks: 'Strictly evidence-based, completely devoid of subjective emotional labels, documents prior coaching opportunities, and requests formal HR partnership.'
    }
  },

  // 5. Business Proposal Follow-Up
  {
    id: 'adv-05-proposal-followup',
    title: 'Strategic Enterprise RFP Proposal Follow-Up',
    category: 'Client Communication',
    difficulty: 'Advanced',
    senderName: 'Alex Morgan',
    senderEmail: 'alex.morgan@xyztech.com (You)',
    senderRole: 'Senior Enterprise Solutions Director',
    recipient: 'Procurement Committee',
    recipientEmail: 'procurement@clientcorp.com',
    recipientRole: 'Head of Enterprise Procurement, ClientCorp',
    recipientExpectations: 'Appreciates high-value follow-ups that offer new insights or implementation flexibility rather than generic "just checking in" emails.',
    targetCc: 'sales.manager@xyztech.com, tech.lead@xyztech.com',
    targetCcRole: 'Sales Manager & Technical Lead',
    ccContext: 'Keep deal team updated on commercial engagement.',
    targetBcc: 'sales.director@xyztech.com',
    targetBccRole: 'Global Sales Director',
    bccContext: 'Provide executive sales visibility on enterprise pipeline closure.',
    objective: 'Follow up on a $220,000 enterprise software proposal submitted two weeks ago, offer an interactive ROI benchmark model, and inquire about selection timelines.',
    context: 'You submitted a detailed technical and pricing proposal for ClientCorp’s cloud automation RFP 14 days ago. You have not received an update on the evaluation committee’s decision.',
    backstoryDetails: {
      triggerEvent: '14-day mark passed since RFP submission deadline; vendor selection announcement was originally scheduled for this month.',
      stakes: 'Keeping momentum active without appearing pushy or aggressive.',
      keyPointsToCover: ['Reference Proposal #RFP-CC-2026 submitted on Oct 4th', 'Reaffirm alignment with their key scalability and security criteria', 'Provide an additional value-add (customized ROI calculation sheet attached)', 'Politely inquire about evaluation timelines and offer a clarification Q&A session']
    },
    requirements: [
      'Enter Procurement in To: (procurement@clientcorp.com)',
      'Add Sales Manager and Technical Lead in Cc:',
      'Add Sales Director in Bcc: (sales.director@xyztech.com)',
      'Reference exact RFP Proposal ID and submission date',
      'Provide value-add insights rather than a generic check-in',
      'Politely inquire about committee review timeline',
      'Offer a 20-minute executive Q&A call'
    ],
    timeLimitMinutes: 10,
    tips: ['Never say "Just checking in" — lead with added value or industry benchmarks'],
    sampleAnswer: {
      subject: 'Follow-Up: Enterprise Cloud Automation RFP (#RFP-CC-2026) — XYZ Technologies',
      body: `Dear ClientCorp Procurement Team,

I hope this email finds you well.

Following our submission of the Enterprise Cloud Automation Proposal (Ref: #RFP-CC-2026) on October 4th, I am reaching out to check on the evaluation timeline and offer any additional technical clarification your committee might require.

Since our submission, our solutions architecture team completed a customized Total Cost of Ownership (TCO) model tailored specifically to your hybrid multi-cloud infrastructure. Based on your target migration parameters, this framework projects a 32% reduction in recurring compute overhead within the first 6 months.

I have attached this supplementary TCO modeling sheet for your committee’s convenience.

Could you kindly share an update on the expected vendor selection timeline? We would also be delighted to host a brief 20-minute technical Q&A session with your engineering leads if helpful.

Thank you for your time and consideration.

Warm regards,
Alex Morgan
Senior Enterprise Solutions Director, XYZ Technologies`,
      whyItWorks: 'Elevates a standard follow-up by delivering an unprompted value-add (TCO model), cites the exact RFP ID, and opens the door for a frictionless technical Q&A.'
    }
  },

  // 6. Security Incident Notification
  {
    id: 'adv-06-security-incident-notification',
    title: 'Urgent Internal Security Incident & Credential Anomaly Escalation',
    category: 'Technical Communication',
    difficulty: 'Advanced',
    senderName: 'Alex Morgan',
    senderEmail: 'alex.morgan@xyztech.com (You)',
    senderRole: 'Senior DevOps & Infrastructure Engineer',
    recipient: 'IT Security Manager',
    recipientEmail: 'security@xyztech.com',
    recipientRole: 'Head of Information Security',
    recipientExpectations: 'Expects factual timestamp logs, zero speculation regarding attribution, exact containment status, and immediate escalation protocol.',
    targetCc: 'cto@xyztech.com, it.manager@xyztech.com',
    targetCcRole: 'Chief Technology Officer & IT Manager',
    ccContext: 'Alert senior tech leadership on active system anomalies.',
    targetBcc: 'compliance@xyztech.com',
    targetBccRole: 'Corporate Compliance Officer',
    bccContext: 'Maintain audit trail for SOC2/ISO security log compliance.',
    objective: 'Report anomalous high-frequency credential access attempts detected on an internal production database bastion host.',
    context: 'At 14:22 IST today, security monitoring scripts flagged 1,200 failed SSH login attempts within 4 minutes originating from an unrecognized IP address against internal server `db-bastion-02`.',
    backstoryDetails: {
      triggerEvent: 'Automated Slack alert from intrusion detection system indicated an ongoing brute-force pattern against port 22.',
      stakes: 'Preventing lateral movement across the internal production subnet.',
      keyPointsToCover: ['Exact timestamps and affected hostname', 'Number of attempts and source IP address', 'Immediate containment action (IP blacklisted, SSH port restricted)', 'Mandatory next steps (credential rotation and firewall audit)']
    },
    requirements: [
      'Enter IT Security Manager in To: (security@xyztech.com)',
      'Add CTO and IT Manager in Cc: (cto@xyztech.com, it.manager@xyztech.com)',
      'Add Compliance Officer in Bcc: (compliance@xyztech.com)',
      'State exact time, affected server (`db-bastion-02`), and anomaly metric (1,200 failed SSH attempts)',
      'Detail immediate containment actions already executed',
      'Do not speculate on attacker identity (keep factual)',
      'Request SecOps review and credential rotation'
    ],
    timeLimitMinutes: 10,
    tips: ['Security incident notifications must be structured with clear timestamped sections'],
    sampleAnswer: {
      subject: '[P1 Incident Notification] Anomalous SSH Authentication Spikes on db-bastion-02',
      body: `Dear Security Team,

I am writing to report a Priority-1 security event detected on our internal infrastructure earlier this afternoon.

Incident Details & Timeline:
• Timestamp: October 18, 2026, between 14:22 IST and 14:26 IST.
• Affected Host: db-bastion-02 (Internal IP: 10.0.4.88).
• Event Description: Automated intrusion logs recorded 1,240 consecutive failed SSH authentication attempts across a 4-minute window originating from external IP: 198.51.100.42.

Immediate Containment Actions Taken:
1. Network Ingress: Blacklisted source IP 198.51.100.42 at the AWS Security Group and Cloudflare WAF layers at 14:28 IST.
2. Bastion Isolation: Temporarily restricted SSH ingress exclusively to internal VPN static subnets.
3. Account Verification: Verified that zero unauthorized logins succeeded during the attempt window.

Recommended Next Steps:
• Perform an immediate cryptographic audit of all active SSH keys on db-bastion-02.
• Mandate emergency key rotation for the 4 administrators with bastion access.
• Review secondary VPC flow logs for any lateral network reconnaissance.

Our infrastructure team is on standby on the Incident Bridge (#incident-sec-02).

Sincerely,
Alex Morgan
Senior DevOps & Infrastructure Engineer, XYZ Technologies`,
      whyItWorks: 'Precise timestamps, explicit containment verification, zero speculation, and actionable next steps.'
    }
  },

  // 7. Vendor Contract Negotiation
  {
    id: 'adv-07-vendor-price-negotiation',
    title: 'Vendor Contract Renewal & 20% Price Increase Pushback',
    category: 'Business Communication',
    difficulty: 'Advanced',
    senderName: 'Alex Morgan',
    senderEmail: 'alex.morgan@xyztech.com (You)',
    senderRole: 'IT Procurement Specialist',
    recipient: 'Vendor Account Manager',
    recipientEmail: 'vendor@cloudservices.com',
    recipientRole: 'Enterprise Account Executive, CloudServices',
    recipientExpectations: 'Expects firm commercial pushback backed by budget constraints, multi-year commitment leverage, and competitive market alternatives.',
    targetCc: 'procurement@xyztech.com, finance@xyztech.com',
    targetCcRole: 'Procurement Manager & Finance Manager',
    ccContext: 'Keep internal procurement and finance aligned during active commercial terms negotiation.',
    targetBcc: 'dept.head@xyztech.com',
    targetBccRole: 'Department Head',
    bccContext: 'Maintain internal leadership oversight without showing internal approval hierarchies.',
    objective: 'Negotiate down a proposed 20% annual subscription price increase, counter-offer a 5% cap tied to a 2-year commitment, and maintain a constructive vendor partnership.',
    context: 'CloudServices sent a contract renewal quote with a 20% price hike ($50,000 to $60,000/year). Your annual IT software budget only allows for a maximum 5% increase.',
    backstoryDetails: {
      triggerEvent: 'Received renewal notice with 20% increase citing macro inflation and new AI platform features.',
      stakes: 'Accepting the 20% hike blows the departmental software budget; canceling causes painful platform migration.',
      keyPointsToCover: ['Acknowledge partnership and value of their service', 'Explain enterprise budget constraints that prevent accepting a 20% increase', 'Present counter-proposal (5% increase locked across a 2-year contract or tier optimization)', 'Request a discussion before month-end']
    },
    requirements: [
      'Enter Vendor Account Manager in To: (vendor@cloudservices.com)',
      'Add Procurement Manager and Finance Manager in Cc:',
      'Add Department Head in Bcc: (dept.head@xyztech.com)',
      'Acknowledge the positive relationship while firmly pushing back on the 20% increase',
      'Explain that company budget parameters cap annual license increases at 5%',
      'Propose a win-win counter-offer (e.g. 2-year renewal commitment for price protection)',
      'Suggest a calendar sync this week to finalize terms'
    ],
    timeLimitMinutes: 12,
    tips: ['Use multi-year contract length as leverage to trade for lower annual price increases'],
    sampleAnswer: {
      subject: 'Contract Renewal Discussion: Enterprise Tier Subscription (#CS-2024-918) — XYZ Technologies',
      body: `Dear CloudServices Account Team,

Thank you for sending over the annual renewal proposal for our Enterprise Tier subscription (Ref: #CS-2024-918). We have greatly valued our collaboration and the high platform reliability your team has provided over the past two years.

Regarding the Proposed 20% Rate Adjustment:
After reviewing the proposed increase from $50,000 to $60,000 with our procurement and finance leadership, we are unable to approve a 20% year-over-year adjustment under our current fiscal IT budget parameters, which strictly cap SaaS adjustments at 5%.

Proposed Counter-Proposal:
We are keen to maintain CloudServices as our primary infrastructure partner and would like to propose the following mutually beneficial options:
1. Multi-Year Commitment: We are prepared to execute a 24-month contract renewal immediately at a capped 5% increase ($52,500/year), guaranteeing predictable recurring revenue for CloudServices.
2. Seat Tier Optimization: Alternatively, we can right-size our active user seat allocation to maintain our existing $50,000 annual spend under the new pricing model.

We are confident we can reach an agreement that reflects our growing partnership. Would you have 20 minutes on Thursday at 2:00 PM EST for a quick commercial alignment call?

Best regards,
Alex Morgan
IT Procurement Specialist, XYZ Technologies`,
      whyItWorks: 'Maintains warmth and partnership, firmly states non-negotiable budget realities, and offers concrete commercial value (2-year contract lock) in exchange for the discount.'
    }
  },

  // 8. Major Production Outage
  {
    id: 'adv-08-major-production-outage',
    title: 'Major Production Outage P0 Executive Briefing',
    category: 'Technical Communication',
    difficulty: 'Advanced',
    senderName: 'Alex Morgan',
    senderEmail: 'alex.morgan@xyztech.com (You)',
    senderRole: 'Lead Site Reliability Engineer (Incident Commander)',
    recipient: 'Chief Technology Officer',
    recipientEmail: 'cto@xyztech.com',
    recipientRole: 'Chief Technology Officer',
    recipientExpectations: 'Expects crisp executive situation summary, quantifiable customer impact, active engineering workstreams, estimated time to recovery (ETR), and cadence of updates.',
    targetCc: 'eng.manager@xyztech.com, devops.lead@xyztech.com, customer.support@xyztech.com',
    targetCcRole: 'Engineering Manager, DevOps Lead & Customer Support Lead',
    ccContext: 'Keep engineering leads and customer-facing support aligned on recovery status.',
    targetBcc: 'incident.lead@xyztech.com',
    targetBccRole: 'Global Incident Management Lead',
    bccContext: 'Maintain incident response process governance.',
    objective: 'Send a high-priority executive briefing on an active 2-hour production outage affecting the core transaction processing engine.',
    context: 'The main payment gateway processing cluster suffered a database dead-lock during traffic peak at 11:30 AM, resulting in a 2-hour transaction processing outage affecting 4,200 active users.',
    backstoryDetails: {
      triggerEvent: 'Outage duration surpassed the 120-minute threshold, requiring mandatory CTO executive briefing.',
      stakes: 'Estimated $45,000 in uncompleted checkout carts and high customer ticket volume.',
      keyPointsToCover: ['Current situation and total downtime duration (2 hours)', 'Business impact (4,200 transactions queued, customer checkout failing)', 'Technical mitigation underway (rolling reboot of payment pods, database query thread purging)', 'Estimated Recovery Time (ETR: 14:15 IST)', 'Next briefing schedule (30 minutes)']
    },
    requirements: [
      'Enter CTO in To: (cto@xyztech.com)',
      'Add Engineering Manager, DevOps Lead, and Customer Support in Cc:',
      'Add Incident Management Lead in Bcc: (incident.lead@xyztech.com)',
      'State current incident status, duration (2 hours), and root failure vector',
      'Quantify business impact (4,200 transactions delayed)',
      'Detail technical remediation steps currently running',
      'Provide an estimated recovery ETA (14:15 IST) and commit to a 30-minute update cycle'
    ],
    timeLimitMinutes: 10,
    tips: ['In active P0 outages, bullet points and bold timestamps save executive reading time'],
    sampleAnswer: {
      subject: '[P0 Executive Status Update] Core Payment Processing Outage — Incident #INC-4921',
      body: `Executive Leadership Team,

Please find below the current operational status for the ongoing Priority-0 payment gateway incident.

Incident Overview:
• Status: Active Investigation & Mitigation
• Incident Start Time: 11:30 AM IST (Total Duration: 2 Hours)
• Affected Service: Core Payment Gateway & Transaction Processing Pipeline

Business Impact:
• Approximately 4,200 user checkout transactions are currently queued or experiencing timeouts.
• Customer Support has received 180 inbound tickets; customer-facing status page was updated to "Service Disruption" at 11:38 AM IST.

Technical Diagnosis & Active Workstreams:
• Root Cause: A cascading dead-lock occurred on the primary transactional PostgreSQL cluster during peak load, exhausting connection pool workers.
• Remediation Underway: 
  1. Terminated long-running query locks and restarted backend payment worker pods across all 3 availability zones.
  2. Scaling connection pool capacity via PgBouncer proxy layer.
  3. Queued transactions are being safely held in Kafka topics for automatic replay upon database restoration (zero transaction loss expected).

Estimated Time to Recovery (ETR):
• We anticipate restoring payment processing by 14:15 IST (within 45 minutes).

Next Status Update:
• The next executive briefing will be dispatched at 14:00 IST or immediately upon milestone change.

The live technical war room remains active at bridge: meet.xyztech.com/incident-war-room.

Sincerely,
Alex Morgan
Lead Site Reliability Engineer | Incident Commander, XYZ Technologies`,
      whyItWorks: 'Uses the gold standard incident management format: Status, Business Impact, Root Cause, Active Workstreams, concrete ETR, and explicit next update timestamp.'
    }
  },

  // 9. Request to Change Project Requirements
  {
    id: 'adv-09-change-project-requirements',
    title: 'Late-Stage Client Scope Change Evaluation & Recommendation',
    category: 'Client Communication',
    difficulty: 'Advanced',
    senderName: 'Alex Morgan',
    senderEmail: 'alex.morgan@xyztech.com (You)',
    senderRole: 'Technical Product Lead',
    recipient: 'Product Manager',
    recipientEmail: 'product@xyztech.com',
    recipientRole: 'Principal Product Manager',
    recipientExpectations: 'Expects objective trade-off analysis: sprint velocity impact, release delay risk, technical debt, and clear recommendation to either accept in Phase 2 or delay release.',
    targetCc: 'project.manager@xyztech.com, eng.lead@xyztech.com',
    targetCcRole: 'Project Manager & Engineering Lead',
    ccContext: 'Keep delivery team informed on scope boundary discussions.',
    targetBcc: 'dept.head@xyztech.com',
    targetBccRole: 'Department Head',
    bccContext: 'Provide quiet leadership visibility on client scope management.',
    objective: 'Evaluate a major last-minute client request for multi-currency invoicing 5 days prior to release, and formally recommend deferring it to Phase 2.',
    context: 'A key enterprise client submitted a change request for automated multi-currency invoicing just 5 days before the scheduled v2.0 production launch.',
    backstoryDetails: {
      triggerEvent: 'Client emailed requesting multi-currency support be added before Friday’s v2.0 release.',
      stakes: 'Adding multi-currency now requires redesigning database schemas and re-testing payment webhooks, risking a 3-week overall launch delay.',
      keyPointsToCover: ['Acknowledge client change request', 'Detail technical risks and schedule consequence (3-week delay and regression risk)', 'Provide clear recommendation (defer to Phase 2 / v2.1 two weeks post-launch)', 'Outline a diplomatic client communication strategy']
    },
    requirements: [
      'Enter Product Manager in To: (product@xyztech.com)',
      'Add Project Manager and Engineering Lead in Cc:',
      'Add Department Head in Bcc: (dept.head@xyztech.com)',
      'Clearly describe the requested scope change (multi-currency invoicing)',
      'Explain the concrete risks (database schema overhaul, 3-week launch slip)',
      'Provide a firm, justified recommendation to defer the feature to Phase 2 (v2.1)',
      'Propose a constructive alternative to satisfy the client without delaying v2.0'
    ],
    timeLimitMinutes: 12,
    tips: ['Frame scope decisions around safeguarding launch quality and client timeline commitments'],
    sampleAnswer: {
      subject: '[Scope Evaluation] Client Multi-Currency Request for v2.0 Release — Trade-Off Analysis',
      body: `Hi Product Team,

I am writing to share our technical evaluation regarding the late-stage request received yesterday from Acme Corp to include automated multi-currency invoicing in our v2.0 release, currently scheduled for launch on Friday, October 27th.

Technical Impact Analysis:
Implementing multi-currency support at this stage is a foundational architectural change that requires:
• Modifying core database ledger tables and financial rounding precision logic.
• Re-integrating and auditing 4 third-party currency conversion APIs.
• A complete regression test of the existing billing module (minimum 80 engineering hours).
Incorporating this feature immediately will push our production release date back by at least 3 weeks (to late November) and introduces high regression risk to the 14 other features already QA-approved.

Strategic Recommendation:
I strongly recommend deferring multi-currency invoicing to our Phase 2 (v2.1) release, scheduled for deployment on November 20th.

Proposed Client Action Plan:
1. Deliver the core v2.0 release on schedule this Friday as committed.
2. Provide Acme Corp with an official roadmap commitment and early beta access to the multi-currency build by November 10th.

Please let me know if you agree with this approach so we can coordinate our client messaging.

Best regards,
Alex Morgan
Technical Product Lead, XYZ Technologies`,
      whyItWorks: 'Quantifies engineering hours required (80 hrs), highlights risks to existing QA-approved features, makes an unambiguous recommendation, and offers a proactive Phase 2 roadmap compromise.'
    }
  },

  // 10. Strategic Business Decision Recommendation
  {
    id: 'adv-10-strategic-business-recommendation',
    title: 'Executive Strategic Decision: Build vs. Buy AI Search Infrastructure',
    category: 'Business Communication',
    difficulty: 'Expert',
    senderName: 'Alex Morgan',
    senderEmail: 'alex.morgan@xyztech.com (You)',
    senderRole: 'Principal Architect & Director of AI Engineering',
    recipient: 'Chief Executive Officer',
    recipientEmail: 'ceo@xyztech.com',
    recipientRole: 'Chief Executive Officer',
    recipientExpectations: 'Expects executive-level decision rigor: multi-dimensional comparison table (Cost, Latency, Risk, Time-to-Market), clear single recommendation, and long-term shareholder value justification.',
    targetCc: 'cto@xyztech.com, cfo@xyztech.com, product.director@xyztech.com',
    targetCcRole: 'CTO, CFO & Product Director',
    ccContext: 'Keep executive C-suite aligned on enterprise technology architecture investments.',
    targetBcc: 'project.sponsor@xyztech.com',
    targetBccRole: 'Executive Project Sponsor',
    bccContext: 'Maintain confidential governance record.',
    objective: 'Deliver an executive-level strategic recommendation comparing Custom In-House Vector Search (Option A) vs. Managed Cloud Search API (Option B), recommending Option B.',
    context: 'TechCorp is upgrading enterprise discovery for 2.5 million active users. You completed a 4-week architectural bake-off between building an in-house Milvus/Elastic cluster vs. adopting an enterprise managed vector engine.',
    backstoryDetails: {
      triggerEvent: 'Executive Board requested final technical recommendation before quarterly capital allocation committee on Friday.',
      stakes: '$350,000 multi-year budget commitment and 4-month difference in product launch timing.',
      keyPointsToCover: ['Comparison across Cost, Speed-to-Market, Reliability, Maintenance Burden', 'Why Managed Enterprise Solution wins (3 months faster, $80k annual DevOps savings)', 'Definitive recommendation of Option B', 'Immediate next execution steps']
    },
    requirements: [
      'Enter CEO in To: (ceo@xyztech.com)',
      'Add CTO, CFO, and Product Director in Cc:',
      'Add Project Sponsor in Bcc: (project.sponsor@xyztech.com)',
      'Provide structured comparative analysis across Cost, Latency, Maintenance, and Time-to-Market',
      'Clearly justify why the recommended option delivers superior ROI and faster revenue capture',
      'Make an unambiguous final recommendation (Option B - Managed Cloud Engine)',
      'Outline next steps and request formal executive authorization'
    ],
    timeLimitMinutes: 15,
    tips: ['Executive recommendations should lead with the final verdict in the opening paragraph'],
    sampleAnswer: {
      subject: '[Executive Recommendation] Enterprise AI Search Architecture: Build vs. Buy Strategic Decision',
      body: `Dear Executive Leadership Team,

Following our 4-week architectural evaluation for our enterprise product discovery upgrade, I am pleased to submit our strategic recommendation regarding whether to build a custom in-house vector cluster or adopt a managed enterprise AI search infrastructure.

Executive Summary & Recommendation:
We definitively recommend Option B (Managed Enterprise Vector Engine). While both options satisfy our sub-50ms latency benchmarks, Option B reduces our time-to-market by 3.5 months, saves $85,000 annually in dedicated DevOps maintenance overhead, and allows our engineering team to stay 100% focused on core proprietary ML model differentiation.

Comparative Analysis Matrix:
• Time-to-Market: Option A (In-House) = 5 Months | Option B (Managed) = 6 Weeks (3.5 months faster)
• Initial Implementation Cost: Option A = $140,000 (Engineering hours) | Option B = $25,000
• 3-Year Total Cost of Ownership (TCO): Option A = $420,000 | Option B = $310,000 (26% net savings)
• SLA & Reliability: Option A = Internal On-Call Burden | Option B = Contractual 99.99% Vendor SLA
• Scalability: Option B natively scales to 100M+ embeddings with automated global read-replicas.

Strategic Business Impact:
Adopting Option B accelerates our Q1 product monetization launch, enabling us to capture an estimated $1.2M in projected net-new subscriber conversions three months ahead of competitors.

Next Steps:
With your authorization, we can finalize vendor commercial negotiations and initiate sandbox ingestion next Monday.

I have attached the complete 12-page technical benchmark report for your review.

Sincerely,
Alex Morgan
Principal Architect & Director of AI Engineering, XYZ Technologies`,
      whyItWorks: 'Directly opens with the bottom-line verdict, provides a scannable comparison across 5 key executive dimensions, quantifies 3-year TCO savings, and ties decision to market revenue acceleration.'
    }
  },

  // =========================================================================
  // SECTION 2: ACADEMIC, PERSONAL & EVERYDAY SCENARIOS
  // =========================================================================
  {
    id: 'acad-assignment-extension-prof',
    title: 'Asking a Professor for an Assignment Deadline Extension',
    category: 'Academic & School',
    difficulty: 'Beginner',
    senderName: 'Alex Morgan',
    senderEmail: 'alex.morgan@university.edu (You)',
    senderRole: 'Undergraduate Student, CS-301',
    recipient: 'Prof. Evelyn Davis',
    recipientEmail: 'evelyn.davis@university.edu',
    recipientRole: 'Professor of Computer Science',
    recipientExpectations: 'Expects respectful tone, specific course code, legitimate reason, proof of progress, and a realistic new deadline.',
    objective: 'Request a 48-hour extension on a programming assignment due to documented campus lab server downtime.',
    context: 'The university GPU compute cluster was offline for maintenance over the weekend, preventing you from training your machine learning model for Assignment 3.',
    backstoryDetails: {
      triggerEvent: 'Campus GPU cluster was down from Saturday 10 AM to Monday 8 AM.',
      stakes: 'Assignment 3 is worth 15% of your final semester grade.',
      keyPointsToCover: ['Course code and assignment name', 'Explanation of server outage', 'Current draft completion status', 'New requested submission date']
    },
    requirements: [
      'Enter the Professor in the To: field (evelyn.davis@university.edu)',
      'Include course code (CS-301) and assignment name in subject line',
      'Explain the technical delay politely with reference to cluster downtime',
      'Highlight that 75% of the codebase and report is already drafted',
      'Request a concrete 48-hour extension date'
    ],
    timeLimitMinutes: 10,
    tips: ['Never ask at the last minute; send extension requests at least 24 hours prior to deadline'],
    sampleAnswer: {
      subject: '[CS-301] Extension Request: Assignment 3 – Alex Morgan (ID: #83921)',
      body: `Dear Professor Davis,

I hope you are having a pleasant week.

I am writing to respectfully request a 48-hour deadline extension for Assignment 3 (Neural Network Classifier), currently due on Wednesday, October 21st at 11:59 PM.

Over the weekend, the department GPU cluster experienced an unscheduled 44-hour outage, which delayed the final training epochs of my model. I have already completed the data preprocessing pipelines, algorithm implementation, and 75% of the accompanying analysis report.

Would it be possible to submit the completed assignment by Friday, October 23rd at 11:59 PM? This would allow sufficient compute time to generate the validation curves.

I have attached my current code repository draft and the IT outage notification for your reference. Thank you very much for your time and guidance.

Sincerely,
Alex Morgan
B.S. Computer Science | Student ID: #83921`,
      whyItWorks: 'Includes Course ID, shows substantial prior progress (75%), attaches proof of outage, and asks for a clear 48-hour window.'
    }
  },
  {
    id: 'pers-birthday-party-invite',
    title: 'Inviting a Friend or Family Member to a Birthday Party',
    category: 'Personal & Informal',
    difficulty: 'Beginner',
    senderName: 'Alex',
    senderEmail: 'alex.personal@gmail.com (You)',
    senderRole: 'Friend / Host',
    recipient: 'Jordan & Sam',
    recipientEmail: 'jordan.taylor@gmail.com',
    recipientRole: 'Close Friend',
    recipientExpectations: 'Warm, engaging, fun tone with clear date, time, location, theme, and RSVP deadline.',
    objective: 'Send a vibrant, warm birthday party invitation with all event logistics and food preferences inquiry.',
    context: 'You are celebrating your 25th birthday next Saturday evening with a rooftop barbecue and board games.',
    backstoryDetails: {
      triggerEvent: 'Birthday is coming up next weekend; organizing a casual get-together with close friends.',
      stakes: 'Ensuring everyone has accurate directions and dietary restrictions are accommodated.',
      keyPointsToCover: ['Date and time', 'Location/venue details', 'Theme / food plans', 'RSVP by Wednesday']
    },
    requirements: [
      'Enter your friend in the To: field (jordan.taylor@gmail.com)',
      'Express warm personal excitement and friendly tone',
      'State exact date, start time, and venue location clearly',
      'Mention food/drinks arrangements and ask about dietary preferences',
      'Provide an RSVP deadline date'
    ],
    timeLimitMinutes: 6,
    tips: ['Keep personal emails warm, vibrant, and enthusiastic'],
    sampleAnswer: {
      subject: '🎉 You\'re Invited! Alex\'s 25th Birthday Rooftop BBQ — Next Saturday!',
      body: `Hey Jordan,

I hope you’ve had a great week!

It’s hard to believe another year has flown by, and I’m celebrating my 25th birthday next weekend! I’d love for you to come celebrate with us.

Here are the party details:
📅 Date: Saturday, October 28th
⏰ Time: 6:30 PM onwards
📍 Location: My apartment rooftop (420 Maple Street, Apt 4B)
🍔 Food & Drinks: I’ll be grilling burgers (veggie options too!), snacks, and making some punch.

Feel free to bring your favorite board game or beverage if you’d like. Please let me know if you have any dietary restrictions and RSVP by Wednesday, Oct 25th so I can grab the right amount of groceries.

Really hope you can make it!

Cheers,
Alex
(555) 981-2345`,
      whyItWorks: 'Warm, friendly, uses cheerful emojis, clearly itemizes logistics with icons/bullets, and sets a friendly RSVP deadline.'
    }
  }
];
