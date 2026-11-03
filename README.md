# Claim Processor UI

React + TypeScript frontend for the Claim Processor application. Provides dashboards for claim submission, tracking, eligibility verification, and adjudication status.

## Features
- Claim submission form (837P/I compatible fields)
- Claims dashboard with status tracking
- Eligibility inquiry (270/271)
- Adjudication results viewer
- Remittance (835) summary

## Tech Stack
- React 18 + TypeScript
- Vite
- React Router v6
- TanStack Query (data fetching)
- Axios (API client)

## Getting Started

```bash
npm install
npm run dev
```

App runs at `http://localhost:5173`. Requires `claim-processor-api` running at `http://localhost:8080`.

## Project Structure
```
src/
  api/          # Axios client + API functions
  components/   # Reusable UI components
  pages/        # Route-level page components
  types/        # TypeScript interfaces
```

## Environment Variables
```
VITE_API_BASE_URL=http://localhost:8080/api
```
