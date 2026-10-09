# SCHEME CONNECT

> **Government Scheme Awareness and Eligibility Checker**  
> *A College Major Project Prototype for Educational Equity in India*

[![Node.js](https://img.shields.io/badge/Node.js-v18%2B-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://react.dev/)
[![Express](https://img.shields.io/badge/Express-4.x-black.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas%20Compatible-brightgreen.svg)](https://www.mongodb.com/)
[![Vite](https://img.shields.io/badge/Vite-6.x-purple.svg)](https://vitejs.dev/)

---

## 1. Project Overview

Students in India often miss out on crucial educational scholarships because scheme notifications are scattered across various department portals, eligibility conditions are complex, and documentation requirements are poorly understood.

**SCHEME CONNECT** solves this by consolidating scholarship information into a single, intuitive full-stack web application. A student enters basic academic and socioeconomic information, and our **rule-based eligibility engine** evaluates their details against active government criteria to provide matching scholarships with verified application links, benefits, deadlines, and required documents.

---

## 2. Key Features

- **Dynamic Rule-Based Eligibility Engine**: Evaluates Category, Family Income, Course Level, Academic Percentage, Disability status, and State Domicile on the backend.
- **Clear Eligibility Breakdown**: Displays an itemized checklist of matched criteria (e.g., `✓ Category matched`, `✓ Income requirement satisfied`).
- **Detailed Scheme View**: Modal dialogs displaying scheme descriptions, monetary benefits, verified official sources, and direct application links.
- **Interactive Document Checklist**: 10 commonly required documents with readiness tracking (`X of 10 documents ready`) and progress bar.
- **Bilingual Support (English & मराठी)**: Switch UI labels between English and Marathi for enhanced accessibility.
- **Theme Modes**: Native Light Mode and Dark Mode support with high contrast and smooth transitions.
- **Local Persistence**: Remembers student profile, document checklist state, language preference, and theme in browser `LocalStorage`.
- **Database Architecture**: Powered by MongoDB with verified Maharashtra and Central Government scholarship datasets.
- **Deployment Ready**: Standard REST architecture ready for deployment on Vercel, Render, and MongoDB Atlas.

---

## 3. Technology Stack

### Frontend
- **React 18** (Functional components, hooks)
- **Vite** (Next-generation lightning-fast bundler)
- **React Router DOM 6** (Client-side routing)
- **Lucide React** (Clean, lightweight iconography)
- **Pure CSS / Modern CSS Variables** (Responsive, light & dark theme design)

### Backend
- **Node.js** (JavaScript runtime)
- **Express.js** (REST API framework)
- **Mongoose** (MongoDB ODM)
- **CORS & Dotenv** (Security & environment variable management)

### Database
- **MongoDB** (Local instance or MongoDB Atlas cloud database)

---

## 4. System Architecture

The application implements a decoupled, client-server REST architecture:

```text
Student Profile Input
        ↓
React + Vite Frontend (client/)
        ↓ REST API (HTTP POST)
Node.js + Express Backend (server/)
        ↓
Eligibility Service Engine (eligibilityService.js)
        ↓
MongoDB Scholarship Collection (models/Scholarship.js)
        ↓
Matching Schemes Evaluation Result
        ↓
React Results Display & Details Modal
```

### Viva Summary Statement
> *"SCHEME CONNECT is a dynamic full-stack web application. The React frontend collects student information and communicates with a Node.js/Express REST API. The backend retrieves scholarship data from MongoDB and uses a rule-based eligibility service to compare the student's profile with scholarship criteria. The matching scholarships are then returned to the frontend and displayed to the student."*

---

## 5. Project Directory Structure

```text
scheme-connect/
├── client/                     # Frontend React application
│   ├── public/                 # Static assets & favicon
│   ├── src/
│   │   ├── components/         # Reusable UI (Navbar, Footer, Form, Card, Modal)
│   │   ├── pages/              # Routed pages (Home, Eligibility, Checklist)
│   │   ├── services/           # Centralized API service (api.js)
│   │   ├── styles/             # Global & layout CSS with theme tokens
│   │   ├── utils/              # Translations (en/mr) & LocalStorage helpers
│   │   ├── App.jsx             # App layout & routing
│   │   └── main.jsx            # React root DOM entry
│   ├── package.json
│   ├── vite.config.js
│   └── .env.example
│
├── server/                     # Backend Express server
│   ├── src/
│   │   ├── config/             # Database connection (db.js)
│   │   ├── controllers/        # Route controllers (scholarshipController.js)
│   │   ├── middleware/         # Input validation (validateInput.js)
│   │   ├── models/             # Mongoose schema (Scholarship.js)
│   │   ├── routes/             # API routes (scholarshipRoutes.js)
│   │   ├── seed/               # Seed dataset (seedScholarships.js)
│   │   ├── services/           # Rule-based engine (eligibilityService.js)
│   │   └── server.js           # Server entry point
│   ├── package.json
│   └── .env.example
│
├── docs/                       # Project documentation & viva diagrams
│   ├── diagrams/               # Architecture, Flowchart, ER diagrams
│   ├── project-notes/          # Viva exam notes & boundary analysis
│   └── screenshots/            # Screenshots directory
│
├── .gitignore                  # Git ignore rules
├── README.md                   # Complete documentation
└── package.json                # Root convenience scripts
```

---

## 6. Environment Variables

### Backend (`server/.env`):
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/scheme_connect
CLIENT_URL=http://localhost:5173
```
*(For production, replace `MONGODB_URI` with your MongoDB Atlas connection string).*

### Frontend (`client/.env`):
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 7. Installation & Setup Guide

### Prerequisites
- **Node.js** (v18.0.0 or higher)
- **MongoDB** (Local MongoDB Community Server running or a free MongoDB Atlas URI)
- **npm** (v9 or higher)

### Step 1: Clone the Repository
```bash
git clone https://github.com/your-username/scheme-connect.git
cd scheme-connect
```

### Step 2: Install Backend Dependencies
```bash
cd server
npm install
```

### Step 3: Configure Backend Environment
Create `.env` inside `server/` (or copy from `.env.example`):
```bash
cp .env.example .env
```
Ensure `MONGODB_URI` points to your running MongoDB instance.

### Step 4: Seed the Database
Populate the database with 14 verified scholarships covering Open, EWS, SC, ST, OBC, VJNT, SBC, Minority, and PwD categories:
```bash
npm run seed
```
*Output: `[Seed] Done! Inserted: 14, Updated: 0, Total: 14`*

### Step 5: Install Frontend Dependencies
```bash
cd ../client
npm install
```

### Step 6: Configure Frontend Environment
Create `.env` inside `client/`:
```bash
cp .env.example .env
```

---

## 8. Running the Application

### Start the Backend Server:
```bash
cd server
npm start
# Server runs on http://localhost:5000
```

### Start the Frontend Client:
In a separate terminal:
```bash
cd client
npm run dev
# Client runs on http://localhost:5173
```

Open **http://localhost:5173** in your web browser.

---

## 9. API Documentation

| Method | Endpoint | Description | Payload / Response |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Service health status | `{ "status": "ok", "timestamp": "..." }` |
| `GET` | `/api/schemes` | Fetch all active scholarships | Returns array of all scholarship objects |
| `POST` | `/api/check-eligibility` | Evaluates student eligibility | Receives student profile, returns matching schemes with audit reasons |

### Sample Eligibility Request Payload (`POST /api/check-eligibility`):
```json
{
  "category": "SC",
  "income": 200000,
  "courseLevel": "Undergraduate",
  "percentage": 65,
  "hasDisability": false,
  "state": "Maharashtra"
}
```

### Sample Response:
```json
{
  "success": true,
  "count": 4,
  "schemes": [
    {
      "name": "Government of India Post-Matric Scholarship for Scheduled Caste Students",
      "provider": "Social Justice and Special Assistance Department, Govt. of Maharashtra",
      "benefit": "100% Tuition & Exam Fee waiver plus monthly maintenance allowance...",
      "matchReasons": [
        "Category matched (SC)",
        "Course level matched (Undergraduate)",
        "Income requirement satisfied (₹2,00,000 ≤ ₹2,50,000)",
        "Academic requirement satisfied (65% ≥ 35%)",
        "Open to all disability statuses",
        "State/Domicile requirement satisfied (Maharashtra)"
      ]
    }
  ]
}
```

---

## 10. Rule-Based Eligibility Engine & Boundary Logic

Eligibility evaluation is conducted in `server/src/services/eligibilityService.js` through deterministic criteria matching:

| Criteria | Rule Definition | Boundary Condition Example |
| :--- | :--- | :--- |
| **Category** | Student category is contained in scheme's `eligibleCategories` array or category is `'All'` | SC applicant matches SC schemes; does not match ST-exclusive schemes. |
| **Income** | `student.income <= scheme.maximumIncome` (if income ceiling defined) | For limit ₹8,00,000: ₹8,00,000 is **Eligible**; ₹8,00,001 is **Not Eligible**. |
| **Percentage** | `student.percentage >= scheme.minimumPercentage` | For cutoff 60%: 60.00% is **Eligible**; 59.99% is **Not Eligible**. |
| **Course Level**| `student.courseLevel` is in scheme's `eligibleCourseLevels` array | Postgraduate applicant matches Master schemes. |
| **Disability** | If `scheme.disabilityCondition === 'YES'`, requires `hasDisability === true` | Reserved PwD schemes only match PwD applicants. |
| **State** | Matches configured `stateRequirement` or `'All India'` | Maharashtra domicile matches state schemes. |

---

## 11. Testing & Verification

The application has been verified against the following core test cases:
1. **Open / EWS Student**: Income ₹7,00,000, Professional/Technical, 80% marks → Matches Rajarshi Shahu Maharaj Scheme & Panjabrao Deshmukh Hostel Allowance.
2. **SC Student**: Income ₹2,00,000, Undergraduate, 65% marks → Matches GOI Post-Matric SC Scholarship and Freeship schemes.
3. **ST Student**: Income ₹2,00,000, Undergraduate → Matches Tribal Development Post-Matric ST Scholarship.
4. **Postgraduate Student**: 60% marks, Income ₹75,000 → Matches Eklavya Scholarship.
5. **Exact Income Boundary**: Student at ₹8,00,000 matches 8L ceiling; student at ₹8,00,001 is rejected.
6. **Exact Percentage Boundary**: Student at 50% matches 50% cutoff; student at 49.99% is rejected.
7. **No-Match Handling**: High income (₹20,00,000) with low marks displays a polite "No matching schemes found" card with guidance.
8. **Disability Exclusivity**: PwD-exclusive scholarships are filtered out for students without disability status.
9. **Persistence**: Theme, Language, Profile, and Document Checklist checkboxes persist across page reloads.
10. **Build**: `npm run build` runs cleanly with zero linting or bundling errors.

---

## 12. Deployment Guide

### Deploying Frontend to Vercel
1. Push project to GitHub.
2. Import repository into Vercel.
3. Set **Root Directory** to `client`.
4. Add environment variable:
   - `VITE_API_URL`: Your deployed backend URL (e.g., `https://scheme-connect-api.onrender.com/api`).
5. Deploy.

### Deploying Backend to Render
1. Create a new **Web Service** on Render connected to your GitHub repository.
2. Set **Root Directory** to `server`.
3. Set **Build Command**: `npm install`.
4. Set **Start Command**: `npm start`.
5. Add environment variables:
   - `PORT`: `5000`
   - `MONGODB_URI`: Your MongoDB Atlas URI.
   - `CLIENT_URL`: Your Vercel frontend URL.
6. Deploy.

---

## 13. Limitations & Academic Scope

- **Simplified Eligibility Rules**: This is an educational awareness prototype. Government departments may apply additional micro-criteria (such as family land holding certificates, sibling caps, or hostel residency certificates).
- **Periodic Portal Updates**: Government cutoffs, scheme names, and deadlines change across academic years. Users are reminded to consult official state portals (MahaDBT and NSP) before applying.

---

## 14. Future Enhancements

- Student profile accounts with application deadline tracking alerts.
- College admin dashboard to verify bonafide certificates.
- Automated web scraping / integration with official MahaDBT and NSP RSS feeds.
- Multilingual expansion (Hindi, Gujarati, Tamil, etc.).
- Direct export of eligible scholarship checklists as downloadable PDF reports.

---

## 15. Important Disclaimer

> **Scheme Connect is an educational awareness prototype.**  
> *Please verify current eligibility, required documents, and application deadlines on official government sources (such as [MahaDBT](https://mahadbt.maharashtra.gov.in) and [NSP](https://scholarships.gov.in)) before submitting applications.*
