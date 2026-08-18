# 📬 MailPractice — Write First. Learn From Mistakes. Master Workplace Communication.

<div align="center">

[![Live Demo](https://img.shields.io/badge/🚀_Try_It_Live-mailpractice.vercel.app-6366F1?style=for-the-badge&logo=vercel&logoColor=white)](https://mailpractice.vercel.app/)

[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Groq AI](https://img.shields.io/badge/AI_Engine-Groq_Cloud-orange)](https://groq.com/)

### *"Don't let AI write for you. Let AI teach you."*

An AI-powered email writing coach that puts you in realistic workplace scenarios, times your response, then grades every sentence across 8 professional dimensions — so you build real skill, not copy-paste habits.

**[Launch App →](https://mailpractice.vercel.app/)**  ·  [Features](#-what-makes-it-different)  ·  [Curriculum](#-progressive-learning-path)  ·  [Architecture](#%EF%B8%8F-system-architecture)  ·  [Run Locally](#-run-it-yourself)

</div>

---

## 💡 Why This Exists

Every workplace runs on email. A clear, well-structured message can close a deal, unblock a release, or resolve a conflict before it escalates. A sloppy one creates confusion, delays, and erodes trust.

**The problem?** Tools like ChatGPT made it effortless to generate polished emails with one click — but that convenience comes at a cost:

* You stop thinking about tone, structure, and audience.
* Your instinct for diplomatic phrasing weakens over time.
* You never learn *when* to CC someone vs. BCC them vs. leave them off entirely.

**MailPractice flips that model.** The AI doesn't write for you — it watches you write, then coaches you on what you got right and where you fell short.

```
 You get a scenario        You write under        AI grades your email
 with real stakes    →     a timed clock     →    across 8 dimensions
 and stakeholder                                  + stakeholder routing
 expectations                                     + business judgment
```

---

## ✨ What Makes It Different

### 🎓 Progressive Learning Path
Not a random grab-bag of prompts. A structured curriculum that scales difficulty as your scores improve:

```
                         ⭐ MASTER — Enterprise Crisis (5 min, zero hints)
                                │
                         🔒 EXPERT — C-Suite Memos & Trade-offs (7 min)
                                │
                         🔒 ADVANCED — To/Cc/Bcc Routing & Escalations (8 min)
                                │
                         🔒 INTERMEDIATE — BLUF Method & Deadlines (10 min)
                                │
                         ✅ BEGINNER — Email Anatomy & Formal Tone (15 min)
```

Each level unlocks only after you consistently score above threshold. No skipping ahead.

| Level | Stages | What You Practice |
| :--- | :---: | :--- |
| **Beginner** | 10 | Introductions, leave notices, document requests, meeting requests |
| **Intermediate** | 12 | BLUF sprint updates, deadline extensions, customer de-escalation |
| **Advanced** | 14 | Stakeholder routing (`To/Cc/Bcc`), vendor pushback, P0 outage briefs |
| **Expert** | 12 | Build-vs-buy strategy memos, competing stakeholder demands |
| **Master** | 1 | $500K contract crisis — zero prompts, full autonomy |

---

### 🧠 8-Dimension AI Grading Engine
Every submission is scored across these dimensions:

| Dimension | What Gets Evaluated |
| :--- | :--- |
| **Grammar** | Subject-verb agreement, tense consistency, syntax |
| **Spelling** | Typos, punctuation, capitalization |
| **Clarity & BLUF** | Bottom-line up front, logical flow, signal-to-noise |
| **Professionalism** | Diplomatic tone, constructive phrasing, composure |
| **Structure** | Salutation, paragraph flow, sign-off |
| **Vocabulary** | Replacing weak filler with precise workplace language |
| **Requirements** | Did you actually address every point in the scenario? |
| **Conciseness** | Cutting fluff without losing substance |

Plus a **Stakeholder Routing Scorecard** (/40) for `To:`, `Cc:`, and `Bcc:` accuracy, and an **Executive Judgment Score** (/100) for diplomacy and strategic framing.

---

### 🛡️ Anti-Cheat Guard
Scores reflect genuine writing ability:
* **Copy-paste blocked** — no `Ctrl+V` shortcuts in the editor
* **Live WPM tracking** — real-time typing speed and word count
* **Gibberish detection** — keyboard mashing (`asdf ;lkj`) gets flagged and scored near zero

---

### 🎭 20+ Scenarios + Custom Generator
* Curated workplace backstories with realistic personas, trigger events, and stakes
* **Strategic Decision Mode** (Advanced+): The "Primary Goal" is hidden — you deduce the strategy from context
* **Custom Scenario AI**: Type any topic (*"negotiating freelance rates"*, *"requesting paternity leave"*) and get a fully generated scenario with names, emails, expectations, and backstory

---

### 🔒 Privacy-First
* **No account required** — start writing in 5 seconds
* **All progress stored locally** in your browser's `localStorage`
* **Stateless API** — the backend evaluates and forgets; nothing is stored server-side

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Browser (Frontend)                       │
│  React 18 · Vite · Tailwind CSS                             │
│  localStorage for progress, drafts, streaks                 │
│  Anti-paste guard · Live WPM tracker · Timer                │
└──────────────────────────┬──────────────────────────────────┘
                           │  POST /api/evaluate
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                  Node.js / Express Backend                   │
│  Gibberish & authenticity filter                            │
│  Dual-key Groq AI evaluation service                        │
└──────────────────────────┬──────────────────────────────────┘
                           │
          ┌────────────────┴────────────────┐
          ▼                                 ▼
   Primary Groq Key               Backup Groq Key
   (qwen · gpt-oss · compound)    (automatic failover)
                                          │
                                          ▼ (if both exhausted)
                                   Built-in Rule Engine
                                   (8-dimension fallback)
```

The backend tries the primary API key across multiple models. If rate-limited, it silently switches to the backup key. If both keys fail, a local rule-based evaluator takes over — so the app never breaks.

---

## 🚀 Run It Yourself

### Prerequisites
* [Node.js](https://nodejs.org/) v18+
* A free [Groq API Key](https://console.groq.com/)

### 1. Clone & Configure
```bash
git clone https://github.com/MusaleTejas/MailPractice.git
cd MailPractice/backend
cp .env.example .env
```

Add your key(s) to `backend/.env`:
```env
PORT=5000
GROQ_API_KEY=your_key_here
GROQ_API_KEY_BACKUP=your_backup_key_here   # optional
```

### 2. Start Backend
```bash
npm install && npm run dev
```

### 3. Start Frontend
```bash
cd ../frontend
npm install && npm run dev
```

Open **http://localhost:5173** and start practicing.

---

## 👤 Built by

<div align="center">



### **Tejas Musale**

Data Science Engineer · AI & ML Practitioner

[![GitHub](https://img.shields.io/badge/GitHub-MusaleTejas-181717?style=flat&logo=github)](https://github.com/MusaleTejas)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=flat&logo=linkedin)](https://github.com/MusaleTejas)

</div>

> I kept watching smart engineers struggle — not because they lacked ideas, but because they couldn't put those ideas into a clear email. Then I watched everyone start copy-pasting from ChatGPT instead of learning to write better. That felt like the wrong fix.
>
> So I built the tool I wished existed: one that makes you write first, then shows you exactly where you went wrong. No shortcuts. Just practice.
>
> If this helps even one person send a better email tomorrow, it was worth building.
>
> — *Tejas*

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
