# Drug Discovery Dashboard

A **Next.js 13** drug discovery program management dashboard built with minimal dependencies, atomic component architecture, and server-side rendering for optimal performance.

---

![home](<./readme-assets/home.png>)

## Architecture & Design Philosophy

This project showcases a scalable, extensible frontend architecture built with the following principles:

- **Minimal dependencies**: No third-party UI libraries (no Tailwind). Pure CSS modules + React components for complete control and extensibility
- **Atomic component design**: UI elements broken down into reusable, single-responsibility components
- **Server-side rendering**: Leverages Next.js 13 App Router and Server Components to minimize client-side state
- **Efficient state management**: Minimal client-side state; data flow primarily through Next.js routing and server capabilities
- **Accessibility-first**: Built with semantic HTML and accessibility best practices (note: not responsive)
- **Extensibility**: Architecture designed as a template—easily integrate third-party styling (e.g., Tailwind) or extend components without impacting the broader codebase

---

## Tech Stack

**Frontend:** Next.js 13 (App Router) for framework, SSR, and routing

**Styling:** CSS Modules for component-scoped styling

**State Management:** Next.js Routing + Server Components for minimal client-side state

**Date Handling:** dayjs for date parsing and formatting

**ID Generation:** nanoid for UUID generation

**Class Management:** clsx for conditional CSS class binding

**Backend:** Express Backend (API)

---

## Project Structure

```
├── src/
│   ├── app/
│   │   └── home/
│   │       └── dashboard/             # Dashboard core layout and landing page with programs overview
│   ├── components/
│   │   ├── card/                      # Card wrapper component
│   │   ├── grid/                      # Table grid renderer
│   │   ├── loader/                    # Loading state component
│   │   ├── model/                     # component TypeScript models
│   │   ├── page-components/           # Page-level composite components
│   │   ├── slate/                     # Project highlights display
│   │   ├── tiles/                     # Program tile display
│   │   └── [component-name].module.css # Component-scoped styles
│   ├── lib/
│   │   └── utils.ts                   # Utility functions and helpers
│   └── public/                        # Static assets
│   └── models/                        # typescript modesl
```

### Folder Descriptions

**`app/`** – Next.js App Router pages, server components and layouts. primarily handles routing and server-side data fetching.

**`components/`** – Atomic, single-responsibility React components. Each component is self-contained with its own CSS module and can be used across the application without side effects.

**`lib/utils/`** – Shared utility functions for data transformation, formatting, and business logic.

---

## Key Concepts & Terminology

**Program** – A drug discovery initiative or project. The top-level entity in the hierarchy.

**Study** – A research effort within a program. Each program can have multiple studies managed by scientists.

**Milestone** – A measurable checkpoint within a study (e.g., "In Progress", "Completed", "Failed"). Milestones represent the granular level of tracking.

---

## Core Features

### Programs Overview (Landing Page)

Displays all active drug discovery programs as interactive tiles with a welcome message below the tile list. Click any program to load its detailed view.

### Program Details View

Shows selected program highlights (slate view) and lists all studies associated with the program. Click a study row to navigate to its milestone view.

### Studies Grid

Tabular display of studies for the selected program. Click to drill down into individual study milestones. Rendered using the reusable grid component.

### Milestone View

Displays all milestones for a selected study with status indicators (In Progress, Completed, Failed). Tabular layout with detailed milestone information in a simple, scannable design.

### Global Navigation

App header with logo (top left) and quick-access navigation (top right) to all programs, studies, and milestones. Persistent across all pages.

---

## Component Library

### Reusable Components

**Card** – Generic container for content grouping.

**Grid** – Customizable Table renderer for studies and milestones.

**Loader** – Loading state indicator.

**Slate** – Project highlights display.

**Tiles** – Program card display.

Each component is a pure functional component with its own scoped CSS module, accepts minimal props for maximum reusability, and contains no business logic (receives data as props).

---

## State Management Approach

This app minimizes client-side state by leveraging Next.js capabilities:

**URL-based state** – Selected program/study is encoded in the URL path

**Server components** – Data fetching happens server-side; components receive pre-rendered data

**Client components** – Limited to interactive elements (tile clicks, row selection) that trigger navigation

**No global state library** – No Redux, Zustand, or Context API for data management. This approach can evolve if the app becomes more complex and requires centralized state management.

### Data Flow

1. User clicks a program tile → URL updates
2. Next.js router navigates to `/dashboard/program/<id>`
3. Server component fetches program details from Express API
4. Page re-renders with new data
5. Studies grid, Slate view and milestone view update accordingly

---

## Styling Strategy

All styles are managed via **CSS Modules**, ensuring component scoping, minimal footprint, and easy customization. Styles are automatically namespaced to prevent conflicts, and each component loads only its required styles.

Example structure:
```
components/
├── Card.tsx
└── Card.module.css
```

CSS Modules can be replaced with Tailwind or other frameworks in the future without refactoring components.

---

## Backend Integration

The frontend communicates with an **Express backend** (BFF pattern):

```
Next.js App → Express Server (BFF) → Prisma ORM → Database
```

**Current Implementation:**

**Queries** – Fully implemented (fetch programs, studies, milestones)

**Mutations** – Architecture supports mutations; not yet implemented in this template

**Example API Endpoints:**

`GET /api/programs` – Fetch all programs

`GET /api/programs/:id` – Fetch program details with studies

`GET /api/studies/:id/milestones` – Fetch milestones for a study

---

## UI Screens & Navigation

### App Header

![app header](<./readme-assets/app-header.png>)

Elements: Logo (top left), Navigation menu (top right) with quick links to all programs, studies, and milestones

---

### Tiles View (Programs Overview)

![tiles view](<./readme-assets/tiles.png>)

Elements: Grid of program tiles, each showing program name and summary, clickable to select and populate the dashboard, welcome message below the tiles

---

### Slate View (Program Highlights)

![slate view](<./readme-assets/slate.png>)

Elements: Program summary and key metadata, high-level overview of selected program, positioned above studies grid

---

### Studies Grid

![studies grid](<./readme-assets/studies-grid.png>)

Elements: Table of studies for the selected program, columns include Study Name, Status, Lead Scientist, Start Date, click row to navigate to milestone view

---

### Milestone View

![milestone view](<./readme-assets/milestones.png>)

Elements: Status summary (In Progress, Completed, Failed counts), table of milestones for the selected study, columns include Milestone Name, Status, Target Date, Actual Date

---

## Getting Started

### Prerequisites

Node.js 18+ and bun

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd drug-discovery-dashboard

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env.local

# Run the development server
bun run dev
```

Open [http://localhost:4000](http://localhost:4000) in your browser.

### Build for Production

```bash
bun run build
bun start
```

---

## Extensibility & Customization

### Adding New Components

1. Create a new folder in `components/`
2. Add `YourComponent.tsx` (functional component)
3. Add `YourComponent.module.css` (scoped styles)
4. Export from component index for reusability

```tsx
// components/YourComponent/YourComponent.tsx
import styles from './YourComponent.module.css';

export default function YourComponent({ data }) {
  return <div className={styles.container}>{/* content */}</div>;
}
```

### Integrating Third-Party Styling

To replace CSS Modules with Tailwind or similar:

1. Install the styling framework
2. Update component styles to use framework classes
3. Remove CSS module imports
4. No component logic changes required

Converting to Tailwind requires only style updates; component structure remains unchanged.

### Adding Mutations

Extend the Express backend with POST/PUT/DELETE endpoints, then:

1. Create server actions in `lib/actions.ts`
2. Call from client components via `"use server"`
3. Trigger re-validation of affected data

---

## Accessibility Considerations

This app is built with accessibility as a core principle:

**Semantic HTML** – Proper use of `<button>`, `<table>`, `<nav>` elements

**ARIA labels** – Interactive elements include descriptive labels

**Keyboard navigation** – All features accessible via keyboard

**Focus management** – Clear focus indicators and logical tab order

**Contrast** – Text and interactive elements meet WCAG AA standards

Note: This app is not responsive and is designed for desktop use but can be easily extended / adjusted for different view ports

---

## Project as a Template

This codebase serves as a **template and reference architecture** demonstrating scalable component structure for large applications, minimal dependencies approach, server-side rendering best practices with Next.js 13, atomic design principles in practice, and extensible patterns for adding features.

Use this as a starting point for similar data-driven dashboards or applications requiring a lightweight, extensible frontend.