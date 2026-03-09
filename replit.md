# دروسي (Durusi)

A platform for finding Islamic religious lessons in Palestinian Arab communities inside Israel (الداخل الفلسطيني).

## Architecture

- **Frontend**: React + TypeScript + Tailwind CSS + wouter (routing)
- **Backend**: Express.js + TypeScript
- **Database**: MongoDB Atlas with Mongoose ODM
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
  index.ts      - Express server setup (connects to MongoDB on start)
  routes.ts     - API routes (/api/lessons, /api/lessons/stats, /api/lessons/:id)
  storage.ts    - MongoDB storage interface (CRUD via Mongoose)
  db.ts         - Mongoose connection using MONGODB_URI
  seed.ts       - Seed script for initial data
  models/
    Lesson.ts   - Mongoose schema/model for lessons

shared/
  schema.ts     - Zod validation schemas and TypeScript types
```

## Environment Variables

- `MONGODB_URI` - MongoDB Atlas connection string

## API Routes

- `GET /api/lessons` - List lessons (optional query: type, city, topic, search)
- `GET /api/lessons/stats` - Get lesson/city/online counts
- `GET /api/lessons/:id` - Get single lesson by MongoDB ObjectId
- `POST /api/lessons` - Create a lesson

## Database

MongoDB collection: `lessons`
Fields: _id (ObjectId), type, title, sheikh, topic, day, time, description, whatsappContact, mosqueName, city, address, platform, link, createdAt, updatedAt

## Key Features

- Full Arabic RTL interface
- Search and filter lessons by type, city, topic
- Add new lessons (mosque or online)
- Lesson detail pages with share/contact functionality
- Responsive mobile-first design
