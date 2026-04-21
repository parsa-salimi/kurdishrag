# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A static site (kurdishrag.ca) where Parsa publishes music recommendations, book reviews, and curated favourite lists for visitors to discover new work. Scaruffi-inspired in spirit — opinionated, text-first, minimal — but rendered with a refined retro aesthetic. Built with vanilla HTML, CSS, and JavaScript with no build system or dependencies.

The site's editorial stance: **only recommend, never warn off.** If a record or book isn't on the site, it didn't make the cut. Ratings (out of 10) are a rough signal to help readers navigate, not a verdict.

## Architecture

### Tab Navigation System
- Client-side routing via `showTab(id)` function in script.js
- All sections are loaded in the DOM, only one visible at a time using `display: none/block`
- Navigation via inline `onclick` handlers on nav links
- Active tab highlighting with CSS class `.active`
- URL hash support for browser back/forward navigation
- Smooth fade-in animations on tab transitions
- On page load, checks URL hash or defaults to 'main'

### Sections
- **MAIN** — intro + "latest recommendations" feed (aggregated across music/books/notes)
- **MUSIC** — individual album reviews with rating, genre, prose. Sortable by recent/rating/artist.
- **BOOKS** — same structure, author-keyed
- **LISTS** — curated starting points (favourite albums, favourite novels, favourite films, currently-on-rotation)
- **JOURNAL** — longer-form notes, genre primers, listening guides
- **CONTACT** — Formspree form

### File Structure
```
kurdishrag/
├── index.html          # Section scaffolding + nav + contact form
├── style.css           # Styling with CSS custom properties
├── script.js           # Tab navigation + contact form
├── projects.js         # All content data + rendering functions
├── CNAME               # GitHub Pages custom domain (kurdishrag.ca)
└── assets/             # (legacy) image assets; currently unused by reviews site
```

### Design System (CSS Custom Properties)

**Colour palette** (style.css :root):
- Primary `#ffd4a3` (peach), secondary `#ffb5a7` (pink), accent `#a8dadc` (teal)
- Background `#f1e3cb` (cream) with diagonal stripe, paper `#fbf4e3` for section cards
- Rating colours: hi `#2a9d8f`, mid `#e9b949`, lo `#c77d5a`

**Typography:**
- Headings: 'Press Start 2P' pixel font
- UI/meta: 'Space Mono' monospace
- Long-form review & list body: 'EB Garamond' serif (17px, 1.7 line-height)

### Data Model (projects.js)

All editable content lives at the top of `projects.js` in four arrays:

```js
musicReviews: [{ artist, album, year, rating, genre, date, review }]
bookReviews:  [{ author, title,  year, rating, genre, date, review }]
lists:        [{ id, title, description, items: [{ position?, primary, secondary?, year?, note? }] }]
journalEntries: [{ title, date, content }]
```

- `rating` is a number out of 10; half-points allowed. Colour bucket is hi ≥9, mid ≥7, lo <7.
- `review` / `content` support paragraph breaks via blank lines (`\n\n`).
- `date` (YYYY-MM-DD) drives the recent-sort and the Main-page "latest" feed.
- A list's `items` are auto-ranked when any item has a `position`; otherwise they render as an unordered list.

### Rendering Functions (projects.js)

- `renderMusicReview` / `renderBookReview` — per-entry HTML
- `renderReviews(containerId, data, renderer)` — sorts by date desc and injects
- `renderLists` — iterates `lists`, decides ranked vs unranked per list
- `renderJournal` — journal entries, date-sorted
- `renderLatest` — merges reviews + journal into a 6-item "latest" feed on the main page
- `sortReviews(target, sortKey)` + `initSortButtons` — client-side re-sort by `date | rating | artist | author`

## Development

### Local preview
```bash
python3 -m http.server 8000
# or
npx serve
```
Open `http://localhost:8000`.

### Adding a review
1. Open `projects.js`
2. Add an object to `musicReviews` or `bookReviews`
3. Use today's date (`YYYY-MM-DD`) so it surfaces in the "latest" feed
4. Reload — no build step

### Adding a list
Append a new object to `lists`. Use `position` on items if you want ranked rendering; leave it off for an unordered list. The `id` is cosmetic (not yet used for anchor links).

### Adding a journal entry
Append to `journalEntries`. Paragraphs are separated by blank lines inside the `content` template string.

### Styling
- Global design tokens at the top of style.css
- Review / list / journal blocks have their own sections — edits are usually local

### Contact form
Replace `YOUR_FORM_ID` on `<form>` in index.html with your Formspree ID.

## Deployment

Pushed to GitHub Pages with custom domain kurdishrag.ca. Changes on the main branch publish automatically.

## Scaling Notes

Content lives in a single JS file for simplicity. If the catalogue grows past ~50 reviews per category, consider:
- Splitting data into `data/music.js`, `data/books.js`, etc.
- Or migrating to a static site generator (11ty, Astro) with Markdown-per-review.
