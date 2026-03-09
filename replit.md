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
  pages/        - Home, Browse, LessonDetail, AddLesson, About, Admin
  components/
    layout/     - Navbar, Footer, Layout wrapper
    ui/         - shadcn/ui components
  data/         - constants (cities, topics, platforms)
  
server/
  index.ts      - Express server setup (connects to MongoDB on start)
  routes.ts     - API routes (public + admin)
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
- `ADMIN_PASSWORD` - Password for admin dashboard access

## API Routes

### Public
- `GET /api/lessons` - List approved lessons (optional query: type, city, topic, search)
- `GET /api/lessons/stats` - Get approved lesson/city/online counts
- `GET /api/lessons/:id` - Get single lesson by MongoDB ObjectId
- `POST /api/lessons` - Create a lesson (status defaults to "pending")

### Admin (password-protected via `x-admin-password` header)
- `POST /api/admin/login` - Verify admin password
- `GET /api/admin/lessons` - List pending lessons
- `GET /api/admin/stats` - Get pending lesson count
- `PATCH /api/admin/lessons/:id` - Approve or reject a lesson

## Database

MongoDB collection: `lessons`
Fields: _id (ObjectId), type, title, sheikh, topic, day, time, description, whatsappContact, mosqueName, city, address, platform, link, status (pending/approved/rejected), createdAt, updatedAt

## Key Features

- Full Arabic RTL interface
- Search and filter lessons by type, city, topic
- Add new lessons (mosque or online) — submissions are pending until admin approves
- Admin dashboard at /admin with password gate, pending lesson review, approve/reject
- Lesson detail pages with share/contact functionality
- Responsive mobile-first design
