# ShaadiBio Frontend

React + Vite frontend for ShaadiBio marriage biodata creator.

## 🚀 Quick Start

### Install Dependencies
```bash
npm install
```

### Configure Environment
```bash
cp .env.example .env.local
# Update VITE_API_URL if needed (default: http://localhost:3000/api)
```

### Start Development Server
```bash
npm run dev
```

Frontend runs on: `http://localhost:5173`

## 📦 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🏗️ Project Structure

```
src/
├── components/       # React components
├── pages/           # Page components
├── hooks/           # Custom hooks
├── lib/             # Utilities and API client
├── types/           # TypeScript types
├── assets/          # Images and static files
└── main.tsx         # App entry point
```

## 🔌 API Integration

### API Client (`src/lib/api.ts`)
- Auth endpoints
- Biodata CRUD
- Photo uploads
- PDF generation
- Payment processing

### Auth Context (`src/lib/auth-context.tsx`)
- User state management
- Token persistence
- Login/Register/Logout

### Usage Example
```typescript
import { useAuth } from '@/lib/auth-context';
import { biodataAPI } from '@/lib/api';

function MyComponent() {
  const { user, login } = useAuth();
  
  const handleCreateBiodata = async () => {
    const result = await biodataAPI.create({
      title: 'My Biodata',
      templateType: 'TRADITIONAL',
      formData: { ... }
    });
  };
}
```

## 🎨 UI Components

Using Shadcn/ui components:
- Button
- Card
- Dialog
- Form
- Input
- Select
- Tabs
- And more...

## 🔐 Authentication

- JWT token stored in localStorage
- Automatic token injection in API calls
- Protected routes
- Auto-login on page load

## 📱 Responsive Design

- Mobile-first approach
- Tailwind CSS for styling
- Responsive components
- Touch-friendly UI

## 🧪 Testing

```bash
npm run test      # Run tests
npm run test:ui   # Run tests with UI
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
vercel deploy
```

### Deploy to Netlify
```bash
netlify deploy --prod --dir=dist
```

## 📚 Documentation

- `../FRONTEND_BACKEND_INTEGRATION.md` - Integration guide
- `../README.md` - Project overview

## 🐛 Troubleshooting

**API connection error?**
- Check VITE_API_URL in .env.local
- Verify backend is running on correct port
- Check CORS configuration in backend

**Build fails?**
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear build cache: `rm -rf dist`

**Hot reload not working?**
- Check Vite config
- Restart dev server

---

**Status: ✅ Ready for Development**
