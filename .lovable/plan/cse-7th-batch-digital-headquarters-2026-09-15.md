# CSE 7th Batch Digital Headquarters

## Goal
Build a polished, single-page digital headquarters for **CSE 7th Batch** with a restrained sci-fi command-center identity. The site will remain fast, accessible, responsive, and simple to maintain by editing centralized data files.

## What will be built
- Sticky compacting navigation with desktop and mobile menus, online status, and section links.
- Cinematic full-viewport introduction with moving grid, restrained particles/data marks, two calls to action, and a HUD status readout.
- Batch introduction and editable digital counters without fabricated statistics.
- Searchable, sortable, filterable member directory with live result count, missing-photo fallback, optional-field handling, and an accessible profile dialog.
- Mission Log achievement timeline, Memory Core masonry gallery with filters and lightbox, editable batch timeline, Build Lab projects, and Batch Wall quotes.
- Contact/footer area with clearly labeled placeholders and the requested terminal sign-off.
- Secret `sudo batch` keyboard sequence and restrained terminal-command details.

## Content architecture
- Create typed data modules for members, achievements, memories, timeline events, projects, quotes, stats, and site details.
- All unknown names, IDs, dates, institutions, contact details, counts, and records stay visibly marked placeholders.
- Adding one member object automatically updates directory results, filters, counts, and profile views.
- Use `/public/members/` paths for manually managed student photos; failed images render a designed default avatar.

## Visual system
- Deep near-black/navy surfaces with semantic cyan, blue, and restrained violet accents.
- Thin HUD lines, grid overlays, glass surfaces, scan details, and quiet glow—without noisy gaming-style neon.
- Distinct display and monospaced typography loaded efficiently.
- Motion limited to purposeful entrance, scan, counter, image, grid, and menu transitions, with full reduced-motion support.
- Stable, dedicated layouts for desktop, tablet, and mobile; directory scales from four columns to one.

## Technical approach
- Keep the existing TanStack Start, React 19, TypeScript, Tailwind v4, and Radix/shadcn foundation.
- Implement small section and directory components rather than one oversized page file.
- Use semantic design tokens in the global style system; no hardcoded presentation colors in components.
- Use accessible native controls and existing Button/Dialog/Input/Select primitives for interactions.
- Keep the page lightweight: CSS-based ambient effects, lazy-loaded images, no video, no heavy animation dependency.
- Add route-specific title, description, Open Graph fields, canonical URL, and Twitter card metadata.
- Replace the generic favicon with an original `CSE // 07` mark.

## Validation
- Verify search, sorting, role filtering, profile dialog, gallery filtering/lightbox, navigation, mobile menu, image fallback, and Easter egg.
- Check desktop and mobile screenshots for readability, spacing, overflow, and section continuity.
- Confirm keyboard focus, dialog behavior, semantic headings, alt text, and reduced-motion behavior.
- Finish only with a clean preview build and no visible runtime errors.
