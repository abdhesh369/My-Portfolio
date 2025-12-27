# Portfolio Website - Abdhesh

## Overview
A personal portfolio website built with React, Express, and PostgreSQL. The application showcases projects, skills, and professional experience.

## Tech Stack
- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Express.js, Node.js
- **Database**: PostgreSQL with Drizzle ORM
- **UI Components**: Radix UI, shadcn/ui

## Project Structure
My Portfolio/
│
├── frontend/                 # React + Vite frontend
│   ├── src/
│   │   ├── components/       # UI components
│   │   ├── hooks/            # Custom React hooks
│   │   ├── lib/              # Utilities, API helpers
│   │   └── pages/            # Page-level components
│   ├── index.html
│   ├── vite.config.ts
│   └── package.json
│
├── backend/                  # Express backend
│   ├── src/
│   │   ├── index.ts          # Server entry point
│   │   ├── routes.ts         # API routes
│   │   ├── db.ts             # Database connection
│   │   ├── storage.ts        # Data access layer
│   │   ├── static.ts         # Serve built frontend
│   │   └── vite.ts           # Vite dev integration
│   ├── tsconfig.json
│   └── package.json
│
├── shared/                   # Shared types & schemas
│   ├── schema.ts             # Drizzle database schema
│   └── routes.ts             # Shared API route definitions
│
├── resources/                # Static assets
│   ├── images/
│   └── documents/
│
├── extra/                    # Old scripts, references, notes
│
└── README.md

```

## Development
- **Start dev server**: `npx tsx server/index.ts`
- **Database push**: `npm run db:push`
- **Build for production**: `npm run build`
- **Run production**: `npm run start`

## Environment Variables
- `DATABASE_URL`: PostgreSQL connection string (automatically provided)

## Deployment
Configured for autoscale deployment on Replit. The production build compiles the frontend and bundles the server.
