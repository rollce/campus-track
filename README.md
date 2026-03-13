# Campus Track

Campus Track is a multi-page academic project operations app for student teams, with task lifecycle management and delivery analytics.

Live: https://track.rollsev.work

## Why this project exists

Student teams often lose deadlines because ownership and task state are unclear. Campus Track models a lightweight academic operations system with explicit workflows and role-aware structure.

## Product goals

- Track task lifecycle from backlog to completion
- Keep project status visible for mentors and teams
- Reduce deadline risk with analytics views
- Demonstrate fullstack route-handler architecture for portfolio review

## Pages and user flows

- `/` Overview
  - Product framing, KPI summary, and route navigation
- `/projects`
  - Project registry with completion and health indicators
- `/tasks`
  - Task operations: create tasks, filter by status, move task state
- `/analytics`
  - Velocity snapshots, risk queue, overdue indicators

## API surface

### `GET /api/projects`
Returns project list and update timestamp.

### `GET /api/tasks?status=Backlog|In Progress|Review|Done`
Returns filtered tasks and total count.

### `POST /api/tasks`
Creates a task.

Required fields:
- `title`
- `course`
- `owner`
- `deadline`

Optional:
- `priority` (`Low`, `Medium`, `High`, default `Medium`)

### `PATCH /api/tasks/[taskId]`
Updates task status.

Body:
```json
{ "status": "In Progress" }
```

Valid statuses:
- `Backlog`
- `In Progress`
- `Review`
- `Done`

## Data model (demo store)

Task shape:
- `id`, `title`, `course`, `owner`, `deadline`, `status`, `priority`

Project shape:
- `id`, `name`, `owner`, `completion`, `health`, `nextReview`

Note: current implementation uses in-memory mock storage (`src/lib/mock-db.ts`) for demonstration and admissions portfolio presentation.

## UI / UX stack

- Ant Design (`Table`, `Card`, `Progress`, `Statistic`, `Tag`, `Form`)
- Framer Motion for transitions
- Tailwind CSS utility styling

## Technical stack

- Next.js 16 (App Router + Route Handlers)
- TypeScript
- Tailwind CSS 4
- Ant Design
- Framer Motion

## Run locally

```bash
npm install
npm run dev
```

Open: http://localhost:3000

## Quality checks

```bash
npm run lint
npm run build
```

## Deployment

- Deployed on Railway
- Public domain: `track.rollsev.work`

## Portfolio value

Campus Track demonstrates an end-to-end workflow product: interface, API validation, task-state transitions, and analytics context in one deployable app.

## Roadmap

- Add persistent database (PostgreSQL)
- Add role-based permissions
- Add team activity logs and audit trail
