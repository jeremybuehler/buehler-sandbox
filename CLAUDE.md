# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TWAIN Cert Platform — Reviewer Console is a React-based web application for managing TWAIN scanner certification testing. It provides a comprehensive interface for reviewing certification runs, managing test devices, and performing human-in-the-loop (HITL) reviews.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (port 5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Architecture

### Component Structure

The application uses a single-component architecture with all UI logic contained in `src/components/ReviewerConsole.tsx` (~685 lines). This monolithic component manages:

- **State Management**: Uses React hooks (useState, useMemo, useEffect) for local state
- **Tab Navigation**: Dashboard, Runs, Reviews, Devices, Tests, Analytics, Settings
- **Run Drawer**: Detailed view with sub-tabs (Summary, Tests, Artifacts, Logs, Security, AI, Review)
- **Mock Data**: All data is currently hardcoded as constants at the bottom of the file

### Key Components

- `ReviewerConsole`: Main component containing all application logic
- `TopNav`: Header with branding and action buttons
- `Sidebar`: Navigation menu for main sections
- `Dashboard`: Overview with KPIs and recent runs
- `RunsTable`: Filterable table of certification runs
- `ReviewsQueue`: HITL review queue based on CI scores
- `RunDrawer`: Slide-out panel for detailed run inspection
- `DevTests`: Development testing component that validates mock data

### Data Types

```typescript
type Run = {
  runId: string;
  deviceId: string;
  status: "PASSED" | "WARN" | "FAILED";
  ciAvg: number;  // Confidence Index average (0-1)
  tests: number;
  startedAt: string;
}

type DrawerTab = "summary" | "tests" | "artifacts" | "logs" | "security" | "ai" | "review";
```

### HITL Policy Logic

The review queue filters runs based on:
- CI score between 0.65 and 0.85 (borderline cases)
- Random 8% sampling of all runs
- Runs with WARN status

## Tech Stack

- **React 18**: UI framework with hooks
- **TypeScript**: Type safety with strict mode enabled
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Utility-first styling
- **PostCSS/Autoprefixer**: CSS processing

## Deployment

The project includes configuration for both Vercel and Netlify:

### Vercel
- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Configuration: `vercel.json`

### Netlify
- Build command: `npm run build`
- Publish directory: `dist`
- Configuration: `netlify.toml`

## TypeScript Configuration

- Target: ES2020
- Module: ESNext
- Strict mode enabled
- JSX: react-jsx
- Module resolution: bundler

## Current Limitations

- All data is mocked (no backend integration)
- No state persistence
- No authentication
- Single-file component architecture (may need refactoring for scale)
- Alert placeholders for actions (approve/reject/rerun)

## Future Integration Points

The component includes placeholders for:
- `mcp.hitl.approve` - Approval workflow
- `mcp.hitl.reject` - Rejection workflow
- Orchestrator integration for re-running test subsets