# ShaadiBio Backend API

Backend API for ShaadiBio - Marriage Biodata Creator

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Setup Environment Variables

Copy `.env.example` to `.env` and update the values:

```bash
cp .env.example .env
```

Required variables:
- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `JWT_REFRESH_SECRET`: Secret key for refresh tokens

### 3. Setup Database

Make sure PostgreSQL is running, then:

```bash
# Generate Prisma Client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# (Optional) Open Prisma Studio to view database
npm run prisma:studio
```

### 4. Start Development Server

```bash
npm run dev
```

Server will start on `http://localhost:3000`

## API Endpoints

### Authentication

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe",
  "phone": "+919876543210"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

### Biodata Management

#### Create Biodata
```http
POST /api/biodatas
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "My Biodata",
  "templateType": "TRADITIONAL",
  "formData": {
    "personalInfo": {
      "name": "John Doe",
      "age": 28
    }
  },
  "customization": {
    "accentColor": "#8B5CF6",
    "fontFamily": "Inter"
  }
}
```

#### Get All Biodatas
```http
GET /api/biodatas
Authorization: Bearer <token>
```

#### Get Single Biodata
```http
GET /api/biodatas/:id
Authorization: Bearer <token>
```

#### Update Biodata
```http
PUT /api/biodatas/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "formData": { ... }
}
```

#### Delete Biodata
```http
DELETE /api/biodatas/:id
Authorization: Bearer <token>
```

#### Duplicate Biodata
```http
POST /api/biodatas/:id/duplicate
Authorization: Bearer <token>
```

## Database Schema

- **Users**: User accounts with authentication
- **Biodatas**: Marriage biodata documents
- **Photos**: Uploaded photos for biodatas
- **PDFs**: Generated PDF files
- **Payments**: Payment transactions

## Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Auth**: JWT + bcrypt
- **Validation**: Zod (planned)

## Development

```bash
# Run in development mode with auto-reload
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Next Steps

- [ ] Add file upload endpoints (S3/local storage)
- [ ] Add PDF generation endpoints
- [ ] Add payment integration (Razorpay)
- [ ] Add email notifications
- [ ] Add rate limiting
- [ ] Add input validation with Zod
- [ ] Add unit tests
- [ ] Add API documentation (Swagger)
