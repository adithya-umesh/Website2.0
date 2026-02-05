# Team Vegavath Official Website

The official website for Team Vegavath, built with Next.js App Router. Features a mobile-first, performance-focused design with interactive 3D elements and comprehensive club information.

## Project Overview

A modern web presence for Team Vegavath showcasing events, team information, and club activities. Built with Next.js 15.5.7 for stability and performance, featuring responsive design patterns optimized for both desktop and mobile experiences.

## What's New (v0.2.0-embedx)

**EmbedX 2.0 Event**
- New `/embedx-2` event page with registration details
- Permanent redirect from `/embedx` to `/embedx-2`
- Home page updated with Upcoming Event card linking to EmbedX 2.0

**Mobile Optimizations**
- Scroll overlap bug mitigation on mobile devices
- Cursor disabled on touch devices (racing cursor desktop-only)
- Improved tap targets and touch interactions
- Reduced aggressive parallax for smoother mobile scrolling
- Overflow protection for better layout stability

**Visual Updates**
- Racing cursor effect (desktop only, automatically disabled on touch devices)
- Footer social icons restored with brand colors on mobile and hover effects on desktop
- Consistent styling across all pages

**Bug Fixes**
- Ignition event date corrected to November 2025
- Next.js rollback from 15.6.4 to 15.5.7 for stability
- Routing improvements for event pages

## Tech Stack

- **Next.js** 15.5.7 (App Router)
- **React** 18
- **TypeScript** 5+
- **Tailwind CSS** with custom theme
- **Framer Motion** for animations
- **Supabase** for backend and database
- **Three.js / React Three Fiber** for 3D elements

## Mobile Optimizations

The site is optimized for mobile devices with the following considerations:

- Racing cursor disabled on touch devices
- Improved tap targets (44x44px minimum)
- Reduced parallax effects on mobile
- Overflow protection for layout stability
- Touch-friendly navigation

**Known Caveat:** Aggressive fast scrolling on mobile may occasionally trigger parallax/overlap behavior. This is documented and mitigated through overflow controls.

## Development

### Prerequisites

- Node.js 18+ recommended
- npm or yarn package manager

### Installation

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

### Build for Production

```bash
npm run build
npm run start
```

## Environment Variables

This project requires a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SITE_URL=
```

**Security Note:** Never commit `.env.local` to version control. Environment variables contain sensitive credentials.

## Project Structure

```
vegavath-site/
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # React components
│   ├── lib/              # Utilities and configurations
│   └── types/            # TypeScript definitions
├── public/
│   └── assets/           # Static assets
└── supabase_schema.sql   # Database schema
```

## Deployment Notes

- Built and tested on desktop and mobile devices
- Vercel deployment recommended for Next.js applications
- Ensure all environment variables are configured in deployment platform
- Build process validates production bundle before deployment

## Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android)
