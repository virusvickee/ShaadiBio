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
  - email (VARCHAR, UNIQUE, INDEX)
  - password_hash (VARCHAR)
  - name (VARCHAR)
  - phone (VARCHAR)
  - subscription_tier (ENUM: free, premium, custom)
  - subscription_expires_at (TIMESTAMP)
  - created_at (TIMESTAMP)
  - updated_at (TIMESTAMP)
  - deleted_at (TIMESTAMP, nullable) -- soft delete
  - updated_by (UUID, nullable) -- audit trail
```

### Biodatas Table
```sql
biodatas
  - id (UUID, PK)
  - user_id (UUID, FK -> users ON DELETE CASCADE, INDEX)
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
  - created_at (TIMESTAMP, INDEX)
  - updated_at (TIMESTAMP)
  - deleted_at (TIMESTAMP, nullable) -- soft delete
  - updated_by (UUID, nullable) -- audit trail
```

### Photos Table
```sql
photos
  - id (UUID, PK)
  - biodata_id (UUID, FK -> biodatas ON DELETE CASCADE, INDEX)
  - url (VARCHAR)
  - crop_data (JSONB)
  - file_size (INTEGER)
  - uploaded_at (TIMESTAMP)
  - deleted_at (TIMESTAMP, nullable) -- soft delete
```

### PDFs Table
```sql
pdfs
  - id (UUID, PK)
  - biodata_id (UUID, FK -> biodatas ON DELETE CASCADE, INDEX)
  - url (VARCHAR)
  - has_watermark (BOOLEAN)
  - download_count (INTEGER)
  - generated_at (TIMESTAMP)
  - deleted_at (TIMESTAMP, nullable) -- soft delete
```

### Payments Table
```sql
payments
  - id (UUID, PK)
  - user_id (UUID, FK -> users ON DELETE RESTRICT, INDEX)
  - amount (DECIMAL)
  - currency (VARCHAR)
  - status (ENUM: pending, completed, failed, refunded)
  - payment_gateway_id (VARCHAR, UNIQUE) -- prevent duplicates
  - plan_type (ENUM: premium, custom)
  - created_at (TIMESTAMP)
  - updated_at (TIMESTAMP) -- audit status changes
```

## API Endpoints

### Health Check
```
GET    /api/health                # Health check for monitoring
```

### Authentication
```
POST   /api/v1/auth/register
POST   /api/v1/auth/login
POST   /api/v1/auth/logout
POST   /api/v1/auth/refresh-token
POST   /api/v1/auth/forgot-password
POST   /api/v1/auth/reset-password
GET    /api/v1/auth/me
```

### Biodata Management
```
GET    /api/v1/biodatas              # List user's biodatas
                                     # Query params: ?page=1&limit=10&sort=created_at:desc&filter=status:active&q=search
POST   /api/v1/biodatas              # Create new biodata
GET    /api/v1/biodatas/:id          # Get single biodata
PUT    /api/v1/biodatas/:id          # Update biodata
DELETE /api/v1/biodatas/:id          # Delete biodata
POST   /api/v1/biodatas/:id/duplicate # Duplicate biodata
```

### PDF Generation
```
POST   /api/v1/biodatas/:id/generate-pdf    # Generate PDF
GET    /api/v1/biodatas/:id/download        # Download PDF
GET    /api/v1/biodatas/:id/pdf-status      # Check generation status
```

### File Upload
```
POST   /api/v1/upload/photo          # Upload photo
DELETE /api/v1/upload/photo/:id      # Delete photo
POST   /api/v1/upload/crop           # Crop uploaded photo
```

### Payments
```
POST   /api/v1/payments/create-order      # Create payment order
POST   /api/v1/payments/verify            # Verify payment
GET    /api/v1/payments/history           # Payment history (supports ?page=1&limit=10)
GET    /api/v1/payments/invoice/:id       # Download invoice
```

### User Profile
```
GET    /api/v1/user/profile
PUT    /api/v1/user/profile
GET    /api/v1/user/subscription
DELETE /api/v1/user/account
GET    /api/v1/user/export-data          # GDPR data export
```

## Core Features

### Phase 1 - MVP (Week 1-2)
- [ ] User registration & login
- [ ] JWT authentication
- [ ] Rate limiting
- [ ] Input validation & sanitization
- [ ] Email verification
- [ ] Save/load biodata drafts
- [ ] Basic CRUD for biodatas
- [ ] Photo upload to S3
- [ ] Client-side PDF generation (existing)

### Phase 2 - Essential (Week 3-4)
- [ ] Server-side PDF generation with Puppeteer
- [ ] Watermark management
- [ ] Password reset flow

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
- CSRF protection (csurf middleware or double-submit cookie pattern on POST/PUT/DELETE)
- File upload validation (size, type, malware scan)
- HTTPS only in production
- Environment variables for secrets
- Data encryption at rest (field-level for PII: email/phone, DB encryption)
- Secret rotation strategy (JWT secret versioning, API key rotation, DB credential rotation via secrets manager)

### GDPR & Data Privacy
- Data Retention Policy (define retention periods)
- Right to Erasure (DELETE /api/v1/user/account with audit logging)
- Data Export (GET /api/v1/user/export-data)
- Cookie consent handling
- Privacy Policy compliance
- Audit logging for all erasure/export/rotation operations

## Environment Variables

```env
# Server
NODE_ENV=development
PORT=3000
API_URL=http://localhost:3000

# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/shaadibio

# JWT - Generate with: openssl rand -base64 32
# IMPORTANT: Use secrets manager in production (AWS Secrets Manager, HashiCorp Vault)
# Rotate periodically and implement token versioning/blacklist
JWT_SECRET=REPLACE_WITH_GENERATED_SECRET
JWT_REFRESH_SECRET=REPLACE_WITH_GENERATED_SECRET
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# CORS
CORS_ORIGIN=http://localhost:5173
FRONTEND_URL=http://localhost:5173

# AWS S3 - Generate with: aws iam create-access-key
# Use IAM roles in production, rotate keys regularly
AWS_ACCESS_KEY_ID=REPLACE_WITH_AWS_KEY
AWS_SECRET_ACCESS_KEY=REPLACE_WITH_AWS_SECRET
AWS_REGION=<your-region>
AWS_S3_BUCKET=<your-bucket-name>

# Razorpay - Obtain from Razorpay dashboard
# Store in secrets manager, never commit to source control
RAZORPAY_KEY_ID=REPLACE_WITH_RAZORPAY_KEY
RAZORPAY_KEY_SECRET=REPLACE_WITH_RAZORPAY_SECRET

# Email (SendGrid/AWS SES) - Generate API key from provider
# Rotate regularly, use least-privilege access
EMAIL_FROM=noreply@example.com
SENDGRID_API_KEY=REPLACE_WITH_SENDGRID_KEY

# Redis (optional)
REDIS_URL=redis://localhost:6379
```

**Production Secret Management:**
- Use AWS Secrets Manager, HashiCorp Vault, or CI/CD secret injection
- Implement least-privilege access policies
- Rotate secrets regularly (90-day cycle recommended)
- Never commit secrets to source control
- Use environment-specific configurations

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
