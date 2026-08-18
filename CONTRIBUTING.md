# Contributing to MailPractice 📬

First off, thank you for considering contributing to **MailPractice**! Open-source projects thrive because of community contributors like you.

Whether you are fixing a bug, adding new workplace scenarios, proposing evaluation improvements, or polishing documentation, your help is warmly welcomed.

---

## 📜 Table of Contents

1. [Code of Conduct](#-code-of-conduct)
2. [How Can I Contribute?](#-how-can-i-contribute)
   - [Reporting Bugs](#reporting-bugs)
   - [Suggesting Scenarios & Features](#suggesting-scenarios--features)
   - [Contributing Code](#contributing-code)
3. [Local Development Setup](#-local-development-setup)
4. [Branch Naming & Workflow](#-branch-naming--workflow)
5. [Git Commit Message Conventions](#-git-commit-message-conventions)
6. [Pull Request (PR) Process](#-pull-request-pr-process)
7. [Code Style & Standards](#-code-style--standards)
8. [Recognition](#-recognition)

---

## 🛡️ Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project, you agree to uphold this standard of empathy, respect, and constructive collaboration.

---

## 💡 How Can I Contribute?

### Reporting Bugs
Before creating an issue, please check existing [GitHub Issues](https://github.com/MusaleTejas/MailPractice/issues) to avoid duplicates.

When reporting a bug, please include:
* A clear and descriptive title.
* Steps to reproduce the problem.
* Expected vs. actual behavior.
* Relevant screenshots, console logs, or browser versions.

### Suggesting Scenarios & Features
MailPractice is continuously expanding its workplace curriculum. If you have an authentic workplace scenario (e.g. cross-functional alignment, C-suite memos, salary negotiation, P0 incident postmortems):
* Open an issue using the **Scenario Proposal** template.
* Include the target audience, difficulty level (`Beginner`, `Intermediate`, `Advanced`, `Expert`, `Master`), stakeholder roles, and requirements.

---

## 💻 Local Development Setup

### Prerequisites
* **Node.js** v18.0 or higher
* **npm** v9.0 or higher
* A free **Groq Cloud API Key** ([console.groq.com](https://console.groq.com/))

### 1. Fork & Clone
```bash
# Clone your fork
git clone https://github.com/<your-username>/MailPractice.git
cd MailPractice
```

### 2. Configure Backend
```bash
cd backend
cp .env.example .env
npm install
```
Add your Groq API key in `backend/.env`:
```env
PORT=5000
GROQ_API_KEY=your_groq_api_key_here
```
Start the backend server:
```bash
npm run dev
```

### 3. Configure Frontend
In a new terminal window:
```bash
cd frontend
npm install
npm run dev
```
Open **`http://localhost:5173`** in your browser.

---

## 🌿 Branch Naming & Workflow

Always create a new branch from `main` with a descriptive prefix:

* `feat/add-salary-negotiation-scenario`
* `fix/anti-paste-mac-command-v`
* `docs/update-contributing-guide`
* `refactor/evaluation-prompt-tuning`
* `perf/improve-wpm-calculation`

```bash
git checkout -b feat/your-feature-name
```

---

## 📝 Git Commit Message Conventions

We adhere to the [Conventional Commits](https://www.conventionalcommits.org/) specification:

| Prefix | Description | Example |
| :--- | :--- | :--- |
| `feat:` | A new user-facing feature or scenario | `feat: add 5 new crisis management scenarios` |
| `fix:` | A bug fix | `fix: resolve mobile navigation backdrop blur` |
| `docs:` | Documentation changes only | `docs: add deployment instructions for Railway` |
| `style:` | Formatting, whitespace, or lint fixes (no logic change) | `style: fix button padding on scenario cards` |
| `refactor:` | Code change that neither fixes a bug nor adds a feature | `refactor: extract scoring rubric to modular service` |
| `perf:` | A code change that improves performance | `perf: optimize scenario search filter memoization` |
| `test:` | Adding or modifying tests | `test: add unit tests for text authenticity evaluator` |

---

## 🚀 Pull Request (PR) Process

Follow these steps when raising a Pull Request:

1. **Keep PRs Focused**: A single PR should address a single feature or bug fix.
2. **Test Locally**: Verify that both the frontend (`npm run build`) and backend start without runtime errors or console warnings.
3. **Rebase from Main**: Ensure your branch is up to date with the latest `main` branch:
   ```bash
   git fetch origin
   git rebase origin/main
   ```
4. **Push to Your Fork**:
   ```bash
   git push origin feat/your-feature-name
   ```
5. **Open a Pull Request**:
   * Navigate to the [MailPractice GitHub Repo](https://github.com/MusaleTejas/MailPractice).
   * Click **Compare & pull request**.
   * Fill out the PR template completely (describe changes, link relevant issues, and attach visual screenshots if UI was modified).
6. **Code Review**: Project maintainers will review your PR, provide constructive feedback, and merge once approved!

---

## 🎨 Code Style & Standards

* **TypeScript**: Use strict types and avoid `any` wherever possible.
* **React**: Use functional components with React Hooks.
* **Tailwind CSS**: Follow existing design tokens (dark slate/navy base with `brand-500` indigo accents). Do not introduce random inline styling.
* **No Secret Leaks**: Never commit API keys, tokens, or environment credentials. Always use `.env.example`.

---

## 🌟 Recognition

All approved contributors will be acknowledged in our release notes and repository documentation. Thank you for helping people around the world master professional communication! 🚀
