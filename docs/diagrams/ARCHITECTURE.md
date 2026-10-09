# System Architecture Diagram

SCHEME CONNECT is designed as a clean, decoupled 3-tier full-stack web application.

```mermaid
graph TD
    subgraph ClientLayer ["Frontend Client (React + Vite)"]
        UI["User Interface Components"]
        Form["Eligibility Form"]
        Store["LocalStorage (Theme, Lang, Checklist)"]
        APIService["api.js Service"]
        UI --> Form
        UI --> Store
        Form --> APIService
    end

    subgraph ServerLayer ["Backend Server (Node.js + Express)"]
        Router["Express Router (/api)"]
        Validator["Input Validation Middleware"]
        Controller["Scholarship Controller"]
        Engine["Rule-Based Eligibility Engine (eligibilityService.js)"]
        
        APIService -->|HTTP REST: POST /api/check-eligibility| Router
        Router --> Validator
        Validator --> Controller
        Controller --> Engine
    end

    subgraph DatabaseLayer ["Database (MongoDB / Atlas)"]
        DB[(Scholarships Collection)]
        Model["Mongoose Scholarship Model"]
        
        Controller -->|Query Active Schemes| Model
        Model --> DB
        DB --> Model
        Model -->|Scholarship Records Array| Engine
    end

    Engine -->|Evaluated & Filtered Matching Schemes| Controller
    Controller -->|JSON Response with match reasons| APIService
    APIService -->|Render Matching Cards| UI
```

## Architecture Summary for Viva

1. **Presentation Layer (React + Vite)**:
   - Captures user inputs (category, income, education level, percentage, disability status, domicile).
   - Manages interactive local state (English/Marathi translations, light/dark themes, document checklist progress).
   - Communicates exclusively via a centralized API service module.

2. **Application / Business Logic Layer (Node.js + Express)**:
   - Validates input format and boundaries.
   - Houses the deterministic rule-based evaluation engine.
   - Does not rely on black-box AI; uses clear boundary conditions that are auditable and easily verified.

3. **Data Layer (MongoDB + Mongoose)**:
   - Houses verified scholarship records with criteria fields (`eligibleCategories`, `maximumIncome`, `minimumPercentage`, etc.).
   - Schema-indexed on categorical fields for efficient queries.
