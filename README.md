# WattsUpTech.in — Full-Stack Website

Premium Next.js (React + Node) implementation per master prompt.

## Stack
- Next.js 14 App Router (frontend + backend API in one)
- React 18 + TypeScript + Tailwind CSS
- Framer Motion (scroll reveals), Lucide icons
- Three.js via @react-three/fiber + drei (lightweight hero 3D, respects reduced-motion)
- File-based storage in `data/` + optional MongoDB (`lib/mongo.ts`) + email notifications (`lib/mail.ts`)

## Pages (multi-page, dynamic routes)
- `/` — hero (3D) + Spotlight ads + services + tech orbit + process + portfolio preview + why-us + CTA
- `/services` `/technologies` `/portfolio` `/process` `/about` `/faq` `/contact`
- `/start-project` — 5-step wizard, supports `?service=Name` preselect from any Request button
- Shared shell in `app/layout.tsx`: PromoBar (edit text in `lib/site.ts` → `promo`), sticky Navbar with active states, Footer, WattBot, WhatsApp
- 3D: Three.js hero canvas + `Tilt3D` mouse-tilt cards + `TechOrbit` CSS-3D rings + `CssCube` on inner pages
- Fully responsive: mobile-first grids (`grid sm: lg:`), hamburger menu, touch-friendly targets

## Features
- Sticky nav, hero with 3D, services (6), technologies grid, 4-step process
- Portfolio with instant filters (demo-labeled, editable in `lib/data.ts`)
- 5-step Project Builder wizard + review + validation → POST `/api/inquiry`
- Contact form → POST `/api/contact` (server validation, rate-limit, honeypot)
- WattBot AI chatbot (floating) → POST `/api/chat` rule engine + quick replies + localStorage history + actions (open builder, WhatsApp)
- WhatsApp float (configurable `NEXT_PUBLIC_WHATSAPP_NUMBER`), SEO/OG/sitemap/robots, privacy/terms templates

## Run locally
```bash
cd wattsuptech
cp .env.example .env.local   # fill values
npm install
npm run dev    # http://localhost:3000
npm run build && npm start
```

## Must replace before launch
- `NEXT_PUBLIC_SITE_URL` (canonical domain)
- `NEXT_PUBLIC_WHATSAPP_NUMBER` (e.g. 919876543210, no +)
- `NEXT_PUBLIC_BUSINESS_EMAIL`
- Social URLs (or footer icons stay hidden)
- `app/privacy/page.tsx`, `app/terms/page.tsx` final copy
- `lib/data.ts` portfolio → real projects when available
- Storage: works with zero config (JSON in `data/`). For production set `MONGODB_URI` (+ optional `MONGODB_DB`) — check `GET /api/status` for `mongodb-connected`
- Email: set `SMTP_HOST/PORT/USER/PASS/FROM` + `CONTACT_NOTIFY_EMAIL` to get an email on every contact/inquiry. Without it, submissions are only stored (no crash)
- Gmail: use an App Password (Google Account → Security → 2-Step → App passwords), `SMTP_HOST=smtp.gmail.com PORT=587 SECURE=false`

## API
- POST /api/contact {name,email,subject,message,projectType?}
- POST /api/inquiry {projectType,technologies[],title,description,features?,referenceLink?,budget,deadline?,urgency,name,email,phone?,contactMethod}
- POST /api/chat {message}
All return `{ok:true,...}` or `{ok:false,error}` with proper status codes.
