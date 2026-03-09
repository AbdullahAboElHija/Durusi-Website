# دروسي (Durusi)

A platform for finding Islamic religious lessons in Palestinian Arab communities inside Israel (الداخل الفلسطيني).

## Architecture

- **Frontend**: React + TypeScript + Tailwind CSS + wouter (routing)
- **Backend**: Express.js + TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: RTL layout, Cairo font, deep green/gold/warm white color palette

## Structure

```
client/src/
  pages/        - Home, Browse, LessonDetail, AddLesson, About
  components/
    layout/     - Navbar, Footer, Layout wrapper
    ui/         - shadcn/ui components
  data/         - constants (cities, topics, platforms)
  
server/
  index.ts      - Express server setup
  routes.ts     - API routes (/api/lessons, /api/lessons/stats, /api/lessons/:id)
  storage.ts    - Database storage interface (CRUD)
  db.ts         - Drizzle database connection
  seed.ts       - Seed script for initial data

shared/
  schema.ts     - Drizzle schema (lessons table)
```

## API Routes

- `GET /api/lessons` - List lessons (optional query: type, city, topic, search)
- `GET /api/lessons/stats` - Get lesson/city/online counts
- `GET /api/lessons/:id` - Get single lesson
- `POST /api/lessons` - Create a lesson

## Database Schema

- `lessons` table with fields: id (serial), type, title, sheikh, topic, day, time, description, whatsappContact, mosqueName, city, address, platform, link, createdAt

## Key Features

- Full Arabic RTL interface
- Search and filter lessons by type, city, topic
- Add new lessons (mosque or online)
- Lesson detail pages with share/contact functionality
- Responsive mobile-first design
