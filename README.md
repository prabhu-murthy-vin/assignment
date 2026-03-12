# Drug Discovery Dashboard

A full-stack drug discovery program management dashboard with a modern frontend and scalable backend API.

## Overview

This project provides a comprehensive platform for managing drug discovery programs, studies, and milestones. It features a responsive next-generation frontend dashboard and a robust Express backend with Prisma ORM for data management.

## Project Structure

```
drug-discovery-dashboard/
├── frontend-app/          # Next.js 13 dashboard application
├── backend-service/       # Express API with Prisma ORM
└── README.md             # This file
```

## Getting Started

### Frontend Setup

Navigate to the frontend application and follow the setup instructions:

📖 [Frontend Documentation](frontend-app/readme.MD)

- Next.js 13 with App Router
- CSS Modules for styling
- Server-side rendering
- Minimal dependencies

### Backend Setup

Navigate to the backend service and follow the setup instructions:

📖 [Backend Documentation](backend-service/readme.md)

- Express API
- Prisma ORM with MySQL
- Docker & Docker Compose
- Automated migrations and seeding

## Technology Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 13, React, CSS Modules |
| Backend | Express, TypeScript, Prisma |
| Database | MySQL |
| Containerization | Docker & Docker Compose |
| Package Manager | Bun |

## Quick Start

1. **Backend**: `cd backend-service && docker-compose up -d`
2. **Frontend**: `cd frontend-app && bun install && bun run dev`

For detailed instructions, see the respective README files above.
