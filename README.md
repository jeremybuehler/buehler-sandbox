# TWAIN Cert Platform — Reviewer Console

A comprehensive React-based web application for managing TWAIN scanner certification testing and human-in-the-loop (HITL) review processes.

## What This App Does

The **TWAIN Cert Platform Reviewer Console** is a professional dashboard for managing the certification testing of TWAIN-compatible scanners. It provides certification engineers and reviewers with a complete interface to:

### 📊 **Dashboard & Analytics**
- Real-time KPIs: daily runs, pass rates, average confidence index (CI), and HITL queue size
- 7-day trend analysis with interactive charts
- Queue breakdown by likelihood (pass/borderline/fail)
- Top flaky tests identification with failure rates

### 🔬 **Test Run Management**
- Comprehensive runs table with search and filtering capabilities
- Detailed run inspection with expandable drawer interface
- Individual test results with confidence scoring
- Artifact management (TIFF files, PDFs, logs)
- Security validation (TLS, cipher suites, signatures)

### ✅ **Human-in-the-Loop Reviews**
- Intelligent review queue based on confidence index thresholds
- **HITL Policy**: Auto-pass CI ≥ 0.85, review 0.65-0.85, plus 8% random sampling
- One-click approve/reject with audit trail
- AI-powered executive summaries and recommendations
- Subset re-run capabilities for failed components

### 🖨️ **Device & Lab Management**
- Multi-lab device tracking (Pensacola, Tokyo, Zurich, Remote)
- Real-time device status monitoring (online/offline/maintenance)
- Firmware version tracking
- Last-seen timestamps and connectivity status

### 📝 **Test Catalog & Standards**
- Organized test suites: Basic (A), Advanced (B), Workflow (C)
- TWAIN specification compliance testing
- PDF/A document format validation
- OCR accuracy and speed benchmarking
- Security and encryption standard verification

### 🤖 **AI Integration**
- Model routing through vision_pool → function_pool → adjudicator
- Low-confidence sentence identification
- Automated report generation with executive summaries
- Pattern recognition for recurring issues

## Technical Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with modern design system
- **Architecture**: Single-component with comprehensive state management
- **Development**: Hot reload, TypeScript strict mode, built-in validation tests
- **Production**: Optimized build (169KB JS, 14KB CSS)

## Dev
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## Deploy
### Vercel
- Import the repo/folder
- Framework: **Vite**
- Build: `npm run build`
- Output directory: `dist`
- `vercel.json` is included.

### Netlify
- Create new site from Git or drag & drop the project
- Build command: `npm run build`
- Publish directory: `dist`
- `netlify.toml` is included.