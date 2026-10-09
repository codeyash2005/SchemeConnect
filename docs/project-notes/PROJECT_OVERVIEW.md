# Project Overview & Viva Examination Notes

## 1. Project Identity & Objective
**SCHEME CONNECT** is a dynamic full-stack web application designed to solve scholarship information fragmentation for students in India (specifically Maharashtra). It replaces confusing manual eligibility comparisons with a deterministic, rule-based matching engine connected to a MongoDB scholarship database.

## 2. Viva Summary Statement
> "SCHEME CONNECT is a dynamic full-stack web application. The React frontend collects student information and communicates with a Node.js/Express REST API. The backend retrieves scholarship data from MongoDB and uses a rule-based eligibility service to compare the student's profile with scholarship criteria. The matching scholarships are then returned to the frontend and displayed to the student."

## 3. Realistic Performance & Traffic Handling Claim
> "A dynamic full-stack web application designed for responsive normal student usage, with a separated React frontend, Express backend, MongoDB database and rule-based eligibility service. The architecture allows future scaling as the number of users and scholarship records increases."

*Note: We do not claim 'unlimited users' or 'AI magic' — the system is deterministic, auditable, and lightweight.*

## 4. Why Rule-Based Rather Than AI?
1. **Determinism**: Government eligibility criteria have strict legal thresholds (e.g., income ceiling of ₹2,50,000 or qualifying marks of 60%). An AI model can hallucinate or fluctuate; a rule-based engine will never grant or deny eligibility unpredictably.
2. **Auditability**: For any scheme returned, the application generates a clear, explainable audit trail of verified conditions:
   - `✓ Category matched (SC)`
   - `✓ Income requirement satisfied (₹2,00,000 ≤ ₹2,50,000)`
   - `✓ Course requirement satisfied (Undergraduate)`
   - `✓ Academic requirement satisfied (65% ≥ 35%)`
3. **No External API Latency / Costs**: Eliminates recurring billing, API quota failures, and rate limits.

## 5. Boundary Condition Handling
- **Income Limit**: For a scheme with maximum income ₹2,50,000:
  - Student with ₹2,50,000 is **Eligible** (`<=` comparison).
  - Student with ₹2,50,001 is **Not Eligible**.
- **Percentage Cutoff**: For a scheme with minimum percentage 60%:
  - Student with 60.00% is **Eligible** (`>=` comparison).
  - Student with 59.99% is **Not Eligible**.
- **Social Category**: Case-insensitive exact match or inclusion in allowed list (`['Open', 'EWS', ...]`).
- **Disability Status**: Schemes marked `disabilityCondition: 'YES'` require `hasDisability === true`.
- **Domicile**: Matched against `'Maharashtra'` or `'All India'`.

## 6. Document Checklist & User Experience
- 10 commonly required documents with interactive checkboxes.
- LocalStorage persistence prevents loss of student input upon page refresh.
- Bilingual UI (English & मराठी) provides accessibility for rural and first-generation learners.
- Light and Dark modes guarantee accessibility in varied ambient environments.
