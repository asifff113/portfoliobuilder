# ✨ AMCV - Futuristic CV & Portfolio Builder

A modern, stylish, and colorful CV & Portfolio builder web application featuring neon gradients, glassmorphism, and a futuristic design aesthetic.

![NeonCV](./public/screenshot.png)

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router) + React 19 + TypeScript (strict mode)
- **Styling**: Tailwind CSS 4.1 + shadcn/ui components
- **Icons**: Lucide React
- **Package Manager**: pnpm
- **Deployment**: Vercel-ready (no Docker)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── globals.css        # Global styles + theme
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui base components
│   ├── builder/          # CV/Portfolio builder components
│   ├── common/           # Shared components
│   └── layout/           # Layout components
├── features/             # Feature-specific modules
│   ├── auth/            # Authentication
│   ├── cv/              # CV builder
│   ├── portfolio/       # Portfolio builder
│   ├── templates/       # Template management
│   ├── themes/          # Theme customization
│   └── export/          # PDF, DOCX, JSON export
├── lib/                  # Utilities and helpers
│   ├── supabase/        # Supabase client (coming soon)
│   └── utils.ts         # Utility functions
├── server/              # Server-side code
│   ├── repositories/    # Data access layer
│   └── actions/         # Server actions
├── types/               # TypeScript type definitions
└── styles/              # Additional style configurations
```

## 🎨 Design System

NeonCV features a vibrant, futuristic design with:

- **Neon Colors**: Electric purple, hot pink, cyber cyan, neon green, and more
- **Glassmorphism**: Frosted glass effects with backdrop blur
- **Gradients**: Vibrant gradient text, borders, and backgrounds
- **Animations**: Floating orbs, pulse glow, gradient shifts
- **Dark Mode**: Default cyberpunk aesthetic with light mode support

### Available Utility Classes

```css
/* Glassmorphism */
.glass          /* Standard glass effect */
.glass-strong   /* Stronger blur effect */

/* Neon Glow */
.glow-sm        /* Subtle glow */
.glow-md        /* Medium glow */
.glow-lg        /* Large glow */
.glow-cyan      /* Cyan-colored glow */
.glow-pink      /* Pink-colored glow */

/* Gradient Text */
.text-gradient       /* Purple → Pink → Cyan */
.text-gradient-cyan  /* Cyan → Blue */

/* Backgrounds */
.bg-mesh       /* Colorful mesh gradient */
.bg-grid       /* Subtle grid pattern */
.border-gradient  /* Animated gradient border */

/* Animations */
.animate-float       /* Floating animation */
.animate-pulse-glow  /* Pulsing glow effect */
.animate-gradient    /* Moving gradient */
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 20+
- pnpm (package manager)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd neoncv

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

### Available Scripts

```bash
pnpm dev          # Start dev server with Turbopack
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm lint:fix     # Fix ESLint errors
pnpm format       # Format code with Prettier
pnpm format:check # Check code formatting
pnpm typecheck    # Run TypeScript type checking
pnpm check        # Run all quality checks
```

## 🌐 Environment Variables

Create a `.env.local` file with:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key  # For server-side operations

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 🗄️ Database Setup

NeonCV uses Supabase for backend (auth, database, storage).

### Option 1: Supabase Cloud (Recommended)

1. Create a project at [supabase.com](https://supabase.com)
2. Go to SQL Editor
3. Run the migration script: `supabase/migrations/00001_initial_schema.sql`
4. Copy your project URL and anon key to `.env.local`

### Option 2: Supabase Local (Development)

```bash
# Install Supabase CLI
npm install -g supabase

# Start local Supabase
supabase start

# Apply migrations
supabase db push
```

### Database Schema

The schema includes:

| Table | Description |
|-------|-------------|
| `profiles` | User profile info (linked to auth.users) |
| `cvs` | CV metadata (title, slug, template, theme) |
| `cv_sections` | Sections within CVs (experience, education, etc.) |
| `cv_items` | Items within sections (JSONB for flexibility) |
| `portfolios` | Portfolio metadata |
| `portfolio_blocks` | Customizable portfolio sections |
| `featured_projects` | Projects showcased in portfolios |
| `themes` | User and system themes |
| `cv_templates` | Pre-designed CV templates |
| `portfolio_templates` | Pre-designed portfolio templates |

**Multi-CV/Portfolio Support**: Each user can have multiple CVs and portfolios. Portfolios can optionally link to a CV to inherit data.

## 📦 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in Vercel
3. Set environment variables
4. Deploy!

No Docker configuration is needed - the app is designed to run with plain Node.js commands.

## 📝 License

MIT License - feel free to use this for personal and commercial projects.

---

Built with 💜 using Next.js, React, and Tailwind CSS
