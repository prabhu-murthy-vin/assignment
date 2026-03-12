# README

## Overview

This project provides a complete setup for **Prisma ORM with MySQL** as the backend database, plus an **Express API** for interacting with the data. It includes automated scripts for database migration, data generation, and seeding, all orchestrated through Docker for seamless development and testing.

---

## Technology Stack

| Component         | Technology   | Version   |
|-------------------|--------------|-----------|
| **Language**      | TypeScript   | ES2022    |
| **Package Manager** | Bun         | Latest    |
| **Runtime**       | Node.js      | Latest    |
| **Database**      | MySQL        | Latest    |
| **Containerization** | Docker & Docker Compose | Latest |
| **ORM**           | Prisma       | Latest    |
| **API Framework** | Express      | Latest    |

---

## Project Structure

```
project-root/
├── prisma/
│   ├── schema.prisma          # Complete database schema
│   ├── seed.ts                # Data seeding script
│   └── migrations/            # Pre-created migration SQL files
├── src/
│   ├── db.ts                  # Database client initialization
│   ├── index.ts               # Express app entry point
│   ├── middleware/            # Express middleware
│   └── routes/                # API route definitions
├── data/
│   └── scripts/               # Test data generation scripts
├── prisma.config.ts           # Prisma configuration
├── docker-compose.yml         # MySQL & app container orchestration
├── Dockerfile.data-api        # Data API container configuration
├── Dockerfile.data-loader     # Data loader container configuration
├── .env                       # Environment variables
└── package.json               # Project scripts & dependencies
```

---

## Setup Instructions

### Prerequisites

Ensure you have the following installed on your system:
- **Docker** and **Docker Compose**
- **Bun** package manager
- **Node.js**

### Initial Setup

#### Step 1: Boot Docker Environment

Start the MySQL container and automatically populate the database:

```bash
docker-compose up -d
```

The `docker-compose.yaml` file will:
- Spin up a **MySQL container** (`drug_dashboard` instance) with the database
- Temporarily spin up an **app container** to execute migrations and seed data
- Automatically load all initial data into the database
- Create **3 tables** as defined in the pre-created migration scripts

#### Step 2: Configure Environment Variables

Copy `.env.example` to `.env` and update the values:

```env
DATABASE_URL="mysql://user:password@localhost:3306/drug_dashboard"
PORT=3000
NODE_ENV=development
```

---

## Verification

Once the Docker setup completes successfully, you should see the following logs in the app container:

```
The following migration(s) have been applied:

migrations/
  └─ 20260309174936_init/
    └─ migration.sql

All migrations have been successfully applied.

$ bunx --bun prisma db seed

Loaded Prisma config from prisma.config.ts.

Running seed command `bun prisma/seed.ts` ...

Programs seeded.
Studies seeded.
Milestones seeded.

🌱  The seed command has been executed.
```

These logs confirm that:
- ✅ Migrations have been applied successfully
- ✅ All **3 tables** (Programs, Studies, Milestones) have been created
- ✅ Seed data has been populated into the database

---

## Running the API

### Development Mode (with hot reload)

```bash
bun run dev
```

The server will start on **http://localhost:3000** and automatically reload on file changes.

### Production Mode

```bash
bun run start
```

### Build for Production

```bash
bun run build
```

This creates an optimized bundle in the **dist/** directory.

---

## Available Scripts

All scripts are defined in `package.json` and should be executed using Bun:

| Script | Description |
|--------|-------------|
| `bun run migrate` | Deploys all pending Prisma migrations to the MySQL database. |
| `bun run seed` | Executes the seed script to populate the database with initial test data. |
| `bun run init:db` | Runs the complete setup sequence: migration → seeding. |
| `bun run dev` | Starts the Express API in development mode with hot reload. |
| `bun run start` | Starts the Express API in production mode. |
| `bun run build` | Builds the Express API for production. |

---

## API Endpoints

| Resource   | Method | Endpoint                     | Description                     |
|------------|--------|------------------------------|---------------------------------|
| Programs   | GET    | `/api/programs`              | Get all programs with studies   |
| Programs   | GET    | `/api/programs/:id`          | Get program by ID               |
| Programs   | POST   | `/api/programs`              | Create new program              |
| Programs   | PUT    | `/api/programs/:id`          | Update program                  |
| Programs   | DELETE | `/api/programs/:id`          | Delete program                  |
| Studies    | GET    | `/api/studies`               | Get all studies                 |
| Studies    | GET    | `/api/studies/program/:programId` | Get studies by program      |
| Studies    | GET    | `/api/studies/:id`           | Get study by ID                 |
| Studies    | POST   | `/api/studies`               | Create new study                |
| Studies    | PUT    | `/api/studies/:id`           | Update study                    |
| Studies    | DELETE | `/api/studies/:id`           | Delete study                    |
| Milestones | GET    | `/api/milestones`            | Get all milestones              |
| Milestones | GET    | `/api/milestones/study/:studyId` | Get milestones by study     |
| Milestones | GET    | `/api/milestones/:id`        | Get milestone by ID             |
| Milestones | POST   | `/api/milestones`            | Create new milestone            |
| Milestones | PUT    | `/api/milestones/:id`        | Update milestone                |
| Milestones | DELETE | `/api/milestones/:id`        | Delete milestone                |

---

## Health Check

Verify the API is running:

```bash
curl http://localhost:3000/health
```

**Response:**

```json
{ "status": "ok" }
```

---

## Example Requests

### Create a Program

```bash
curl -X POST http://localhost:3000/api/programs \
  -H "Content-Type: application/json" \
  -d '{
    "name": "TRIAL-2024",
    "therapeuticArea": "Oncology",
    "phase": "Phase III",
    "startDate": "2024-01-01T00:00:00Z",
    "endDate": "2025-12-31T00:00:00Z",
    "status": "Active",
    "manager": "Dr. Smith"
  }'
```

### Get All Programs

```bash
curl http://localhost:3000/api/programs
```

### Update a Program

```bash
curl -X PUT http://localhost:3000/api/programs/{id} \
  -H "Content-Type: application/json" \
  -d '{
    "status": "Completed"
  }'
```

---

## Database Configuration

### Prisma Schema

The complete database schema is defined in `prisma/schema.prisma`. This file contains:
- All table definitions (Programs, Studies, Milestones)
- Relationships and constraints
- Field types and validations

### Prisma Configuration

The primary configuration file is `prisma/prisma.config.ts` (located at project root). This file manages:
- Database connection settings
- ORM behavior and defaults
- Provider-specific options

### Database Migrations

Pre-created migration SQL files are stored in `prisma/migrations/`. These scripts:
- Create the initial schema with **3 tables** (Programs, Studies, Milestones) on first run
- Track all schema changes over time
- Enable version control of database structure

### Data Seeding

The `prisma/seed.ts` file contains the logic to generate and populate test data for:
- **Programs**
- **Studies**
- **Milestones**

It is executed automatically during the Docker setup and can be manually triggered with `bun run seed`.

---

## Docker Architecture

### docker-compose.yaml

Orchestrates the complete containerized environment:
- **MySQL Service**: Runs the database container (`drug_dashboard`) with persistent storage
- **App Service**: Temporarily runs to execute migrations and seed data

### Dockerfiles

**Dockerfile.data-loader** – Configures the data loader container to:
- Connect to the MySQL database
- Execute migration scripts
- Populate the database with seed data

**Dockerfile.data-api** – Configures the API container to:
- Start the Express API server

---

## Workflow Summary

1. **Start Docker** with `docker-compose up -d`
2. **Automatic execution** of pre-created migrations and seeding
3. **3 tables created** in the `drug_dashboard` database (Programs, Studies, Milestones)
4. **Database ready** for development and testing
5. **Start the API** with `bun run dev` or `bun run start`

---

## Development Notes

- **Prisma acts as the ORM layer**, providing a middle layer for all data access operations (read and write)
- **TypeScript with ES2022** ensures modern JavaScript features and type safety
- **Bun** is used for fast package management and script execution
- **Express** provides a robust API layer for all CRUD operations
- All database operations should go through Prisma models defined in `schema.prisma`

---

## Troubleshooting

If migrations fail to deploy:
1. Verify the MySQL container is running: `docker ps`
2. Check Docker logs: `docker-compose logs`
3. Ensure `prisma/migrations/` folder exists and contains migration files
4. Re-run `docker-compose up -d` to retry the complete setup

If the API fails to start:
1. Verify `.env` is present and correctly configured
2. Check for port conflicts on `PORT=3000`
3. Ensure all dependencies are installed: `bun install`

---

## Additional Resources

- [Prisma Documentation](https://www.prisma.io/docs/)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [Bun Documentation](https://bun.sh/docs)
- [Docker Documentation](https://docs.docker.com/)
- [Express Documentation](https://expressjs.com/)