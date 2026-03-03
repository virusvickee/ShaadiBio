# Backend Build Plan - ShaadiBio

## Tech Stack

- **Runtime**: Node.js 20+ with TypeScript
- **Framework**: Express.js or Fastify
- **Database**: PostgreSQL 15+
- **ORM**: Prisma
- **Storage**: AWS S3 / Cloudflare R2
- **Auth**: JWT + bcrypt
- **PDF**: Puppeteer
- **Payment**: Razorpay (India) / Stripe
- **Cache**: Redis (optional)

## Database Schema

### Users Table
```sql
users
  - id (UUID, PK)
  - email (VARCHAR, UNIQUE)
  - password_hash (VARCHAR)
  - name (VARCHAR)
  - phone (VARCHAR)
  - subscription_tier (ENUM: free, premium, custom)
  - subscription_expires_at (TIMESTAMP)
  - created_at (TIMESTAMP)
  - updated_at (TIMESTAMP)
```

### Biodatas Table
```sql
biodatas
  - id (UUID, PK)
  - user_id (UUID, FK -> users)
  - title (VARCHAR)
  - template_type (ENUM: traditional, modern, minimalist)
  - form_data (JSONB)
  - customization (JSONB)
    {
      accentColor: string,
      fontFamily: string,
      language: string
    }
  - is_published (BOOLEAN)
  - created_at (TIMESTAMP)
  - updated_at (TIMESTAMP)
```

### Photos Table
```sql
photos
  - id (UUID, PK)
  - biodata_id (UUID, FK -> biodatas)
  - url (VARCHAR)
  - crop_data (JSONB)
  - file_size (INTEGER)
  - uploaded_at (TIMESTAMP)
```

### PDFs Table
```sql
pdfs
  - id (UUID, PK)
  - biodata_id (UUID, FK -> biodatas)
  - url (VARCHAR)
  - has_watermark (BOOLEAN)
  - download_count (INTEGER)
  - generated_at (TIMESTAMP)
```

### Payments Table
```sql
payments
  - id (UUID, PK)
  - user_id (UUID, FK -> users)
  - amount (DECIMAL)
  - currency (VARCHAR)
  - status (ENUM: pending, completed, failed, refunded)
  - payment_gateway_id (VARCHAR)
  - plan_type (ENUM: premium, custom)
  - created_at (TIMESTAMP)
```

## API Endpoints

### Authentication
```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/refresh-token
POST   /api/auth/forgot-password
POST   /api/auth/reset-password
GET    /api/auth/me
```

### Biodata Management
```
GET    /api/biodatas              # List user's biodatas
POST   /api/biodatas              # Create new biodata
GET    /api/biodatas/:id          # Get single biodata
PUT    /api/biodatas/:id          # Update biodata
DELETE /api/biodatas/:id          # Delete biodata
POST   /api/biodatas/:id/duplicate # Duplicate biodata
```

### PDF Generation
```
POST   /api/biodatas/:id/generate-pdf    # Generate PDF
GET    /api/biodatas/:id/download        # Download PDF
GET    /api/biodatas/:id/pdf-status      # Check generation status
```

### File Upload
```
POST   /api/upload/photo          # Upload photo
DELETE /api/upload/photo/:id      # Delete photo
POST   /api/upload/crop           # Crop uploaded photo
```

### Payments
```
POST   /api/payments/create-order      # Create payment order
POST   /api/payments/verify            # Verify payment
GET    /api/payments/history           # Payment history
GET    /api/payments/invoice/:id       # Download invoice
```

### User Profile
```
GET    /api/user/profile
PUT    /api/user/profile
GET    /api/user/subscription
DELETE /api/user/account
```

## Core Features

### Phase 1 - MVP (Week 1-2)
- [ ] User registration & login
- [ ] JWT authentication
- [ ] Save/load biodata drafts
- [ ] Basic CRUD for biodatas
- [ ] Photo upload to S3
- [ ] Client-side PDF generation (existing)

### Phase 2 - Essential (Week 3-4)
- [ ] Server-side PDF generation with Puppeteer
- [ ] Watermark management
- [ ] Email verification
- [ ] Password reset flow
- [ ] Rate limiting
- [ ] Input validation & sanitization

### Phase 3 - Premium (Week 5-6)
- [ ] Razorpay integration
- [ ] Subscription management
- [ ] Premium feature gates
- [ ] Invoice generation
- [ ] Payment webhooks

### Phase 4 - Enhancement (Week 7-8)
- [ ] Analytics dashboard
- [ ] Download tracking
- [ ] Email notifications
- [ ] Template versioning
- [ ] Biodata sharing links
- [ ] Export to multiple formats

## Security Considerations

- Password hashing with bcrypt (12 rounds)
- JWT with short expiry (15min access, 7d refresh)
- CORS configuration
- Rate limiting (express-rate-limit)
- Input validation (Zod)
- SQL injection prevention (Prisma)
- XSS protection (helmet.js)
- File upload validation (size, type, malware scan)
- HTTPS only in production
- Environment variables for secrets

## Environment Variables

```env
# Server
NODE_ENV=development
PORT=3000
API_URL=http://localhost:3000

# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/shaadibio

# JWT
JWT_SECRET=your-secret-key
JWT_REFRESH_SECRET=your-refresh-secret
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# AWS S3
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=ap-south-1
AWS_S3_BUCKET=shaadibio-uploads

# Razorpay
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=

# Email (SendGrid/AWS SES)
EMAIL_FROM=noreply@shaadibio.com
SENDGRID_API_KEY=

# Redis (optional)
REDIS_URL=redis://localhost:6379
```

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── database.ts
│   │   ├── s3.ts
│   │   └── redis.ts
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── biodata.controller.ts
│   │   ├── pdf.controller.ts
│   │   ├── upload.controller.ts
│   │   └── payment.controller.ts
│   ├── middleware/
│   │   ├── auth.middleware.ts
│   │   ├── validation.middleware.ts
│   │   ├── rateLimit.middleware.ts
│   │   └── error.middleware.ts
│   ├── models/
│   │   └── (Prisma schema)
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   ├── biodata.routes.ts
│   │   ├── pdf.routes.ts
│   │   ├── upload.routes.ts
│   │   └── payment.routes.ts
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── biodata.service.ts
│   │   ├── pdf.service.ts
│   │   ├── upload.service.ts
│   │   ├── payment.service.ts
│   │   └── email.service.ts
│   ├── utils/
│   │   ├── jwt.ts
│   │   ├── validation.ts
│   │   └── helpers.ts
│   ├── types/
│   │   └── index.ts
│   └── app.ts
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── tests/
├── .env
├── .env.example
├── package.json
└── tsconfig.json
```

## Deployment

### Development
```bash
npm run dev
```

### Production Options
- **VPS**: DigitalOcean, AWS EC2, Linode
- **PaaS**: Railway, Render, Fly.io
- **Serverless**: AWS Lambda + API Gateway (for specific endpoints)

### CI/CD
- GitHub Actions
- Automated tests
- Database migrations
- Environment-based deployments

## Performance Optimization

- Database indexing (user_id, email, created_at)
- Redis caching for frequently accessed data
- CDN for static assets and PDFs
- Connection pooling
- Lazy loading for large JSONB fields
- Background jobs for PDF generation (Bull/BullMQ)

## Monitoring & Logging

- Winston for logging
- Sentry for error tracking
- PM2 for process management
- Database query monitoring
- API response time tracking

## Cost Estimation (Monthly)

**MVP (Free Tier)**
- Railway/Render: $0-5
- PostgreSQL: $0 (Railway free tier)
- S3: $1-5 (1GB storage)
- **Total: ~$5-10/month**

**Production (1000 users)**
- Server: $20-50
- Database: $15-25
- S3: $10-20
- Razorpay: Transaction fees
- **Total: ~$50-100/month**

## Next Steps

1. Initialize Node.js project with TypeScript
2. Setup Prisma with PostgreSQL
3. Implement authentication endpoints
4. Create biodata CRUD operations
5. Setup S3 for file uploads
6. Integrate Razorpay for payments
7. Deploy to Railway/Render
8. Connect frontend to backend APIs
