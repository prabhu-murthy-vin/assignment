# README

## Overview

This project provides a comprehensive setup for Prisma ORM with MySQL as the backend database, integrated with an Express application that serves as the API for the Drug Dashboard. The setup includes automated scripts for database migration, data generation, and seeding, all orchestrated through Docker for seamless development and testing.

---

## Technology Stack

| Component | Technology | Version |
|-----------|-----------|---------|
| **Language** | TypeScript | ES2022 |
| **Package Manager** | Bun | Latest |
| **Runtime** | Node.js | Latest |
| **Database** | MySQL | Latest |
| **Containerization** | Docker & Docker Compose | Latest |
| **ORM** | Prisma | Latest |

---

## Project Structure

```
project-root/
├── prisma/
│   ├── schema.prisma          # Complete database schema
│   ├── seed.ts                # Data seeding script
│   ├── migrations/            # Pre-created migration SQL files
├── data/
│   └── [test data generation scripts]
├── prisma.config.ts        # prisma configuration
├── src                        # Express App
├── docker-compose.yaml        # MySQL & app container orchestration
├── Dockerfile                 # App container configuration
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

## Available Scripts

All scripts are defined in `package.json` and should be executed using Bun:

### `bun run migrate`
Deploys all pending Prisma migrations to the MySQL database.

```bash
bunx --bun prisma migrate deploy
```

### `bun run seed`
Executes the seed script to populate the database with initial test data.

```bash
bunx --bun prisma db seed
```

### `bun run init:db`
Runs the complete setup sequence: migration → seeding.

```bash
bun run migrate && bun run seed
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
- **Data loader Service**: Temporarily runs to execute migrations and seed data
- **Data API**: API for drug dashboard

### Dockerfile.data-loader

Configures the container to:
- Connect to the MySQL database
- Execute migration scripts
- Populate the database with seed data

### Dockerfile.data-api

- Starts the drug dashboard API

---

## Workflow Summary

1. **Build Docker setup** with `docker-compose up build`
2. **Start Docker** with `docker-compose up -d`
3. **Automatic execution** of pre-created migrations and seeding
4. **3 tables created** in the `drug_dashboard` database (Programs, Studies, Milestones)
5. **Database ready** for development
6. **Express API** up and running

---

## Development Notes

- **Prisma acts as the ORM layer**, providing a middle layer for all data access operations (read and write)
- **TypeScript with ES2022** ensures modern JavaScript features and type safety
- **Bun** is used for fast package management and script execution
- All database operations should go through Prisma models defined in `schema.prisma`

---

## Troubleshooting

If migrations fail to deploy:
1. Verify the MySQL container is running: `docker ps`
2. Check Docker logs: `docker-compose logs`
3. Ensure `prisma/migrations/` folder exists and contains migration files
4. Re-run `docker-compose up -d` to retry the complete setup

If you do not see the expected seed logs, verify that:
- The migration step completed successfully
- The `prisma/seed.ts` file exists and is properly configured
- All seed data generation scripts in the `data/` folder are accessible

---

## Additional Resources

- [Prisma Documentation](https://www.prisma.io/docs/)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [Bun Documentation](https://bun.sh/docs)
- [Docker Documentation](https://docs.docker.com/)