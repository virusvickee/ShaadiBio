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
- `DATABASE_URL`: PostgreSQL connection string (e.g., `postgresql://user:pass@localhost:5432/shaadibio`)
- `JWT_SECRET`: High-entropy secret (≥256 bits/32 bytes). Generate with: `openssl rand -base64 32` or `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`. Store in secrets manager (AWS Secrets Manager, HashiCorp Vault) in production. Rotate periodically (90-day cycle) with token versioning/blacklist.
- `JWT_REFRESH_SECRET`: High-entropy secret (≥256 bits/32 bytes). Generate same as JWT_SECRET. Never use predictable passphrases.
- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment (development/production)
- `FRONTEND_URL`: Frontend URL for CORS (e.g., `http://localhost:5173`)

**Security Note:** Never commit secrets to source control. Use environment-specific configurations.

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

#### Password Requirements
- Minimum 8 characters
- (Optional: Add uppercase, lowercase, number, special character requirements)

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "name": "John Doe",
  "phone": "+919876543210"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "John Doe",
      "subscriptionTier": "FREE"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "John Doe",
      "subscriptionTier": "FREE"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Usage:** Take the `token` value from the response and use it in the `Authorization` header as `Bearer <token>` for subsequent requests.

#### Refresh Token
```http
POST /api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

Response:
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Logout
```http
POST /api/auth/logout
Authorization: Bearer <token>
```

Response:
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

Response:
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "subscriptionTier": "FREE"
  }
}
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

### File Upload

#### Upload Photo
```http
POST /api/upload/photo
Authorization: Bearer <token>
Content-Type: multipart/form-data

Form Data:
- photo: File (max 5MB, JPEG/PNG/WebP)
- biodataId: string
- cropData: JSON string (optional)
```

#### Delete Photo
```http
DELETE /api/upload/photo/:id
Authorization: Bearer <token>
```

#### Get Photos for Biodata
```http
GET /api/upload/photos/:biodataId
Authorization: Bearer <token>
```

## Rate Limiting

All endpoints are rate limited:
- **General API**: 100 requests per 15 minutes
- **Auth endpoints** (login/register): 5 attempts per 15 minutes
- **Upload endpoints**: 20 uploads per hour

Rate limit info is returned in headers:
- `X-RateLimit-Limit`: Maximum requests allowed
- `X-RateLimit-Remaining`: Requests remaining
- `X-RateLimit-Reset`: Time when limit resets

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
- **Validation**: Zod
- **File Upload**: Multer + AWS S3
- **Rate Limiting**: express-rate-limit
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

### ✅ Completed (Step 2)
- ✅ **Rate limiting** - express-rate-limit for auth (5/15min), API (100/15min), uploads (20/hour)
- ✅ **Input validation with Zod** - All auth and biodata endpoints validated
- ✅ **File upload system** - Multer + S3 integration with local fallback

### In Progress (Step 3)
- [ ] **PDF generation** - Puppeteer for server-side PDF generation
- [ ] **Email notifications** - SendGrid/AWS SES integration
- [ ] **Unit tests** - Jest/Vitest with target coverage ≥80%

### Planned
- [ ] Add payment integration (Razorpay)
- [ ] Add API documentation (Swagger)
