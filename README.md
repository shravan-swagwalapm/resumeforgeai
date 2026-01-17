# ResumeForge AI 🚀

AI-powered resume optimization designed specifically for Product Managers.

![ResumeForge AI](https://img.shields.io/badge/Powered%20by-Claude%20AI-purple)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![Supabase](https://img.shields.io/badge/Supabase-Auth-green)

## Features

- ✨ **AI-Powered Analysis** - Claude AI analyzes your resume against job descriptions
- 📊 **Gap Analysis** - See exactly what skills match and what's missing
- 💡 **Smart Suggestions** - Get actionable improvements for your resume
- 🎯 **PM-Specific** - Tailored for Product Manager roles
- 🔒 **Secure** - Google OAuth via Supabase, data not stored permanently

## Quick Start

### 1. Clone and Install

```bash
git clone https://github.com/YOUR_USERNAME/resumeforge-ai.git
cd resumeforge-ai
npm install
```

### 2. Set Up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Go to **Authentication > Providers** and enable **Google**
3. Add your Google OAuth credentials (from Google Cloud Console)
4. Add redirect URL: `https://YOUR_DOMAIN.vercel.app/auth/callback`

### 3. Set Up Environment Variables

Create `.env.local`:

```env
# Supabase (from Project Settings > API)
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# Anthropic (from console.anthropic.com)
ANTHROPIC_API_KEY=your_anthropic_key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deploy to Vercel

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/resumeforge-ai&env=NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY,ANTHROPIC_API_KEY)

### Manual Deploy

1. Push to GitHub
2. Import to [Vercel](https://vercel.com/new)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Post-Deploy

1. Update Supabase redirect URL to your Vercel domain
2. Update Google OAuth redirect URL in Google Cloud Console

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Auth**: Supabase Auth with Google OAuth
- **AI**: Anthropic Claude API
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

## Project Structure

```
├── app/
│   ├── page.tsx          # Landing page
│   ├── login/            # Google OAuth login
│   ├── dashboard/        # Resume input
│   ├── results/          # Analysis results
│   └── api/analyze/      # Claude API endpoint
├── components/
│   ├── ui/               # Button, Card, Textarea
│   └── Navbar.tsx        # Navigation
├── lib/
│   └── supabase/         # Supabase clients
└── middleware.ts         # Auth protection
```

## Built By

[The Swag Wala PM](https://youtube.com/@TheSwagWalaPM) - AI PM Educator

---

Made with ❤️ and Claude AI
