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

## Publishing Workflow (plaintext requests)

The site's owner often asks Claude to publish new content in plain English — e.g. "publish a music review of Fontaines D.C.'s Romance, 8.5, <prose>" or "add a list called 'Best debut albums' with these entries...". Follow this workflow end-to-end **without asking for confirmation on routine details** — only pause to ask when a required field is genuinely missing (see "When to ask vs assume" below).

### 1. Classify the request

Map the request to exactly one of the four arrays in `projects.js`:

| Cue words in the request | Target array |
|---|---|
| "review", "album", "record", artist + album, music | `musicReviews` |
| "book review", author + title, novel, essay collection, poetry | `bookReviews` |
| "list", "favourites", "top N", "best X", ranked/unranked enumeration | `lists` |
| "journal", "note", "essay", "primer", "guide", "write-up about…" | `journalEntries` |

If the user says "publish" without specifying a type, infer from content. If genuinely ambiguous (e.g. a piece that could be a long review or a journal essay), default to the more specific type that matches the structure of the prose: does it focus on a single work with a rating? → review. Does it wander across multiple works or ideas? → journal.

### 2. Build the object

Use the schemas from the "Data Model" section above. Field-specific rules:

- **`date`** — Always use today's date (`YYYY-MM-DD`) from the environment's current-date context. Do not ask the user.
- **`year`** — The release year of the album / publication year of the book. If the user didn't specify and it's a well-known work, fill it in from your own knowledge. If obscure or ambiguous, ask.
- **`rating`** — Required for reviews. Number 0–10, half-points allowed. If the user didn't give one, ask (the rating drives colour bucketing and sort order; there is no sensible default).
- **`genre`** — Optional but strongly preferred. Infer from your knowledge of the artist/book. Keep it short ("Art Rock", "Jazz / Hip-Hop", "Short Stories", "Poetry").
- **`review` / `content`** — Use the user's prose verbatim unless they ask for light editing. Preserve paragraph breaks with blank lines (`\n\n`) inside the template literal. Do **not** add a rating recap or boilerplate intro/outro — the prose stands on its own.
- **`list.items`** — If the user gave a ranked list, number items 1…N in `position`. If unranked ("in no particular order"), omit `position` on all items. `primary` is the thing (album title / book title / film title / short label); `secondary` is the creator (artist / author / director) when applicable. Include `year` when known.

### 3. Insert into `projects.js`

- **Reviews and journal entries:** Prepend the new object to the **top** of its array. Sorting is date-desc, so placement is cosmetic for the data file — but keeping newest-first matches how the file reads on screen.
- **Lists:** Append to the end of the `lists` array unless the user specifies positioning among the existing lists.

Use the `Edit` tool (not `Write`) to keep the diff minimal.

### 4. Commit and deploy

The site publishes via GitHub Pages from `main`. For plaintext publish requests, commit **directly to `main`** so the post goes live immediately — no feature branch, no PR. Sequence:

```bash
# from main (or after checkout main)
git add projects.js
git commit -m "Publish <type>: <title or list name>"
git push origin main
```

Commit message format:
- `Publish music review: Artist — Album`
- `Publish book review: Author — Title`
- `Publish list: <LIST TITLE>`
- `Publish journal entry: <entry title>`

If the user is working on a non-`main` branch (check `git branch --show-current`), commit there instead and tell the user the post will go live when the branch merges.

### 5. Confirm to the user

One-sentence summary: what was added, where it appears, and that it is live (or pending merge). Include the commit SHA if helpful. Do not paste the full object back.

### When to ask vs assume

**Ask** (only when required info is missing):
- Rating for a review, if unspecified
- Year of release/publication, if the work is obscure and you don't know it
- Whether a list is ranked, if the user gave items without order cues

**Assume** (don't bother the user):
- Today's date
- Genre (infer from artist/book)
- Paragraph breaks in prose (insert at natural pauses if the user gave a block of text)
- Which array to target (classify from cues)
- That the commit goes to `main` for immediate deploy

### Worked example

User says: *"Publish a music review of Mount Eerie's A Crow Looked at Me, 9/10. It's the hardest listen I've had in years — Phil Elverum writing through the death of his wife, no metaphor, no poetic remove. Not something to put on casually. But as a record about grief it has no peer."*

Resulting object (prepended to `musicReviews`):
```js
{
  artist: 'Mount Eerie',
  album: 'A Crow Looked at Me',
  year: 2017,
  rating: 9,
  genre: 'Folk',
  date: '<today>',
  review: `It's the hardest listen I've had in years — Phil Elverum writing through the death of his wife, no metaphor, no poetic remove. Not something to put on casually. But as a record about grief it has no peer.`
}
```

Then: commit to `main` with `Publish music review: Mount Eerie — A Crow Looked at Me`, push, confirm.

## Deployment

Pushed to GitHub Pages with custom domain kurdishrag.ca. Changes on the main branch publish automatically.

## Scaling Notes

Content lives in a single JS file for simplicity. If the catalogue grows past ~50 reviews per category, consider:
- Splitting data into `data/music.js`, `data/books.js`, etc.
- Or migrating to a static site generator (11ty, Astro) with Markdown-per-review.
