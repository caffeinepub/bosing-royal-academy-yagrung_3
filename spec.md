# Bosing Royal Academy Yagrung

## Current State
A fully-built school website with static content: hero section, announcements (3 cards), academic highlights (3 cards), discover gallery (4 tiles), about section, admissions CTA, contact section, and footer. All content is hardcoded in `App.tsx`. No backend.

## Requested Changes (Diff)

### Add
- Backend: store all editable content in Motoko (announcements, highlights, hero text/motto, about text, contact details, discover tile labels, footer motto)
- Backend: store a 4-digit admin security PIN (default: 1234)
- Backend: PIN verification query; content read/write update calls
- Frontend: hidden admin panel accessible via a floating lock icon button
- Frontend: PIN entry modal (4-digit keypad or input) gating the admin panel
- Frontend: admin dashboard with tabbed sections to edit every content area: Hero, Announcements, Academic Highlights, About, Admissions, Contact, Discover tiles
- Frontend: ability to change the admin PIN from the panel
- Frontend: public-facing site reads content from backend instead of static constants

### Modify
- App.tsx: replace hardcoded ANNOUNCEMENTS, HIGHLIGHTS, DISCOVER, hero/about/contact text with data fetched from backend

### Remove
- Nothing removed

## Implementation Plan
1. Backend: Define content types and stable storage for all sections; expose query/update functions; add PIN store with verify and change functions
2. Frontend: On load, fetch all content from backend and populate the site
3. Frontend: Floating admin lock button (bottom-right corner)
4. Frontend: PIN modal with 4-digit input; on success sets `adminUnlocked` state
5. Frontend: Admin panel (full-screen or side drawer) with sections matching every editable content area
6. Frontend: Save buttons per section call backend update functions
7. Frontend: Change PIN form in admin panel
