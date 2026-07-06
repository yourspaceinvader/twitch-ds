# Twitch Design System — CLAUDE.md

This is a practice rebuild of Twitch's Core UI design system (codename: Ultraviolet) in Storybook.
The goal is to learn design engineering by reverse-engineering a real production design system.

## Stack
- **Framework:** React + TypeScript
- **Styling:** Tailwind CSS (consuming CSS custom properties from Style Dictionary)
- **Component base:** Shadcn/ui (customized with Twitch tokens)
- **Storybook:** v8, with MDX docs
- **Token pipeline:** `tokens.json` → Style Dictionary → `src/styles/tokens.css` → Tailwind config

## Project Structure
```
twitch-ds/
├── tokens.json              # Source of truth — all design tokens
├── style-dictionary.config.js
├── src/
│   ├── styles/
│   │   └── tokens.css       # Auto-generated — do not edit manually
│   ├── components/
│   │   └── {ComponentName}/
│   │       ├── {ComponentName}.tsx
│   │       ├── {ComponentName}.stories.tsx
│   │       └── {ComponentName}.mdx   (optional docs)
│   └── lib/
│       └── utils.ts         # cn() helper from shadcn
├── .storybook/
│   ├── main.ts
│   └── preview.ts
└── CLAUDE.md
```

## Design Token System
- Token file: `tokens.json` (in project root / parent folder)
- Twitch's grey ramp is called `hinted-grey` (1=darkest, 15=lightest)
- Twitch's purple ramp is called `twitch-purple` (1=darkest, 15=lightest)
- Brand purple: `#9147ff` (purple-9) — use this as primary
- Primary CTA / link color: `#5c16c5` (purple-7)
- Hover state: `#772ce8` (purple-8)

## Theme Hierarchy (from Twitch's Core UI "Ultraviolet")
Dark theme (default):
- `background-body` → hinted-grey-1 `#0e0e10`
- `background-base` → hinted-grey-2 `#18181b`
- `background-alt`  → hinted-grey-3 `#1f1f23`
- `background-alt-2`→ hinted-grey-4 `#26262c`
- `text-base`       → hinted-grey-14 `#efeff1`
- `text-alt`        → hinted-grey-9  `#adadb8`

Light theme:
- `background-body` → hinted-grey-15 `#f7f7f8`
- `background-base` → white `#ffffff`
- `text-base`       → hinted-grey-1 `#0e0e10`

## Typography
- Font: Roobert (by Displaay) — use **Inter** as fallback during development
- Base size: 13px (Twitch default body)
- Roles: Title (32px/700), Header (20px/700), Body (13px/400), Caption (12px/400), Label (12px/600)

## Content Shapes (important for Media Cards)
- Streams: 16:9
- Categories/Games: 3:4
- Avatars: 1:1 circle

## Component Conventions
- All components consume CSS custom properties, never raw hex values
- Dark theme is default — design dark-first
- Use `cn()` from `src/lib/utils.ts` for conditional classNames
- Storybook story args should match the component's TypeScript props exactly
- Every component needs: default story + all variants + interactive controls
- Target AA contrast minimum in both themes

## Build Order (primitives first)
1. Button (primary, secondary, ghost, destructive + sizes + loading state)
2. Avatar (sizes: sm/md/lg/xl, with online indicator)
3. Badge / Tag (live, category, subscriber)
4. Input + form elements
5. Core Text components (Title, Header, Body, Caption)
6. Media Card (16:9 stream thumbnail with hover extrude effect)
7. Category Card (3:4)
8. Channel Card (avatar + name + category)
9. Nav sidebar
10. Stream player shell

## Key References
- Beyond Purple blog: https://blog.twitch.tv/en/2019/12/03/beyond-purple/
- Kyle Crumrine (principal DS designer): https://kylecrumrine.com/twitch-ds
- tokens.json: ../tokens.json (relative to project root)
- Brand assets: ../Twitch\ Brand/

## Useful Commands
```bash
npm run storybook          # Start Storybook dev server
npm run build-storybook    # Build static Storybook for Netlify deploy
npm run tokens             # Run Style Dictionary to regenerate tokens.css
```
