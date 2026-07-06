# AI Build Log — Twitch Design System (Ultraviolet)

Session date: 2026-06-27  
Model: Claude Sonnet 4.6  
Goal: Reverse-engineer Twitch's Core UI design system in Storybook (practice build)

---

## Stack recap

- React + TypeScript, Vite
- **Tailwind CSS v4** (`@tailwindcss/vite`) with `--spacing: 0.2rem` (2px grid) and `html { font-size: 62.5% }` (1rem = 10px)
- Style Dictionary → `tokens.css` → Tailwind `@theme` (CSS custom properties via `--ds-*` prefix)
- Storybook v8 with MDX docs
- CVA (class-variance-authority) for variant components
- Shadcn/ui as component base

---

## Components built

### 1. Button
Variants: `primary` (purple), `secondary`, `ghost`, `destructive`  
Sizes: `sm` / `md` / `lg`  
Features: `loading` prop with spinner, `forwardRef`, CVA  
Stories: 6 individual + AllVariants grid

### 2. Avatar
Sizes: `sm` (24px) / `md` (40px) / `lg` (56px) / `xl` (80px)  
Fallbacks: image → initials → icon (User from lucide)  
Features: `online` prop (green/grey dot, ring-offset against bg-body)  
Stories: 5 individual + AllVariants grid

### 3. Badge / Tag
Variants: `live` (red, uppercase), `category` (dark neutral), `subscriber` (brand purple), `default`  
Sizes: `sm` / `md`  
Stories: 5 individual + AllVariants

### 4. Input
Props: `label`, `helperText`, `error`, `leadingIcon`, `trailingIcon`, `size`  
Features: `forwardRef`, `useId()` for label association, error ring (`ring-red`), focus ring (`ring-purple-9`)  
Sizes: `sm` (28px) / `md` (36px) / `lg` (44px) — matched to Button heights  
Stories: 12 including interactive Password (eye toggle) and SearchWithClear

### 5. Text
Polymorphic `as` prop; CVA variants; named shorthand exports  
Variants: `title` (32px/700) / `header` (20px/700) / `body` (13px/400) / `caption` (12px/400) / `label` (12px/600)  
Color variants: `base` / `alt` / `alt-2` / `link`  
Exports: `Text`, `Title`, `Header`, `Body`, `Caption`, `Label`  
Stories: 8 including Truncated, ColorVariants, Scale

### 6. MediaCard
Shape: 16:9 (`aspect-stream` token)  
Features: hover extrude effect (`group-hover:-translate-y-3 group-hover:shadow-lg` on container + `group-hover:scale-[1.04]` on image), LIVE badge + viewer count overlay (top-left), duration overlay (bottom-right, VODs), placeholder with Tv2 icon  
Props: `thumbnailSrc`, `title`, `streamerName`, `category`, `viewerCount`, `isLive`, `duration`, `href`  
Stories: 7 individual + AllVariants 4-column grid

### 7. CategoryCard
Shape: 3:4 (`aspect-category` token — added to `@theme` to fix Tailwind v4 arbitrary value bug with `/`)  
Features: same hover extrude as MediaCard, Gamepad2 icon placeholder, up to 3 tag badges  
Props: `imageSrc`, `name`, `viewerCount`, `tags`, `href`  
Stories: 5 individual + AllVariants 6-column grid (12 realistic game categories)

### 8. ChannelCard
Shape: vertical, centered avatar  
Features: xl Avatar with `online` indicator, LIVE badge anchored below avatar (`absolute bottom-0 left-1/2 -translate-x-1/2`), `group-hover:scale-105` on avatar, `group-hover:text-purple-8` on name, `login` prop only shown when different from `displayName`, up to 2 tags  
Props: `avatarSrc`, `displayName`, `login`, `category`, `viewerCount`, `isLive`, `tags`, `href`  
Stories: 6 individual + AllVariants 6-column grid

### 9. NavSidebar
Features: expand/collapse toggle (240px ↔ 50px, `transition-[width]`), uncontrolled by default / controlled via `collapsed` + `onCollapse`, section headers, "Show N more / Show less" per section (`maxVisible`), active channel highlight, hover states, native `title` tooltip in collapsed mode  
Sub-components: `NavItem` (avatar sm + name/category/viewer stack), `NavSectionGroup` (section with show-more)  
Props: `sections[]` (`{ id, title, channels[], maxVisible? }`), `collapsed`, `onCollapse`, `activeChannelId`  
Stories: Default, Collapsed, Show More / Less, Interactive (working toggle with useState)

### 10. StreamPlayerShell
Features: 16:9 player area, thumbnail with `opacity-20` dim while "playing", click-to-play, hover-reveal control bar (gradient overlay), LIVE badge + viewer count overlay  
Control bar (live): Play/Pause, Mute, volume slider (`accent-purple-9`), red LIVE pill  
Control bar (VOD): same + progress scrubber with `initialTime` pre-seek, `H:MM:SS / H:MM:SS` timestamps  
Stream info: title (2-line clamp), Follow button (toggles heart fill, primary↔secondary), Subscribe, Bell; Avatar md + streamer name + category link + viewer count; tags row  
Reuses: Avatar, Badge, Button, NavSidebar  
Full-page stories embed NavSidebar alongside the player in a `flex h-screen` shell  
Props: `title`, `streamerName`, `streamerAvatarSrc`, `category`, `viewerCount`, `isLive`, `tags`, `thumbnailSrc`, `duration`, `initialTime`, `subscribeLabel`, `onFollow`, `onSubscribe`  
Stories: Live Stream, VOD, Esports broadcast (1.2M viewers), No Thumbnail, Collapsed sidebar

---

## Key technical learnings

### Tailwind v4 HMR scanning bug
Newly created component files are not rescanned in dev HMR mode — classes only in new files silently produce no CSS.  
**Fix:** `@source "../src"` in `index.css` + `@source inline("...")` safelist for classes that only appear in new files.

### Tailwind v4 + CSS custom properties in `@theme`
Style Dictionary outputs `--ds-*` vars. Direct use as `--color-*` etc. in `@theme` maps them to Tailwind utilities. Arbitrary values like `aspect-[3/4]` can fail when the `/` character confuses the scanner — solved by adding `--aspect-category: var(--ds-aspect-ratio-category)` to `@theme` and using `aspect-category` instead.

### Storybook meta decorators are additive
Story-level `decorators: []` prepends an empty array; it does NOT remove component-level (meta) decorators. A meta decorator with a fixed width (`w-48`) will still constrain `AllVariants` grids.  
**Fix:** Remove width from the meta decorator; add story-level `decorators: [singleCardDecorator]` only to the individual card stories.

### Controlled vs. uncontrolled sidebar
`NavSidebar` uses internal `useState` when `collapsed` prop is omitted (uncontrolled), and defers to the prop when provided (controlled). Standard React pattern — `const collapsed = collapsedProp ?? internalCollapsed`.

### 2px spacing grid
`--spacing: 0.2rem` means every Tailwind spacing unit = 2px. `w-48` = 96px, `w-120` = 240px, `h-[3.6rem]` = 36px. Always verify pixel values when reading class names.

---

## File structure (components)

```
src/components/
├── Button/
├── Avatar/
├── Badge/
├── Input/
├── Text/
├── MediaCard/
├── CategoryCard/
├── ChannelCard/
├── NavSidebar/
└── StreamPlayerShell/
```

Each directory contains `{Name}.tsx` and `{Name}.stories.tsx`.

---

## Token pipeline

```
tokens.json → style-dictionary.config.js → src/styles/tokens.css (--ds-* vars)
                                                      ↓
                                           src/index.css @theme block
                                           (maps --ds-* → --color-*, --text-*, etc.)
                                                      ↓
                                           Tailwind utilities (text-text-base, bg-purple-9, etc.)
```

Run `npm run tokens` to regenerate `tokens.css` after editing `tokens.json`.
