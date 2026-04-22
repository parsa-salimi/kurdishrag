# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A static site (kurdishrag.ca) where Parsa publishes **music writing** — album reviews, favourite lists, and longer essays. Scaruffi-inspired in spirit: opinionated, text-first, minimal — rendered with a refined retro aesthetic. Vanilla HTML/CSS/JS, no build system, no dependencies.

Editorial stance: **only recommend, never warn off.** If a record isn't on the site, it didn't make the cut. Ratings (out of 10) are a rough signal, not a verdict. The site is music-only.

## Architecture

### Tab Navigation System
- Client-side routing via `showTab(id)` in script.js
- All sections in the DOM; one visible at a time (`display: none/block`)
- Inline `onclick` handlers on nav links; `.active` class for the current tab
- URL hash support for browser back/forward
- Fade-in animation on tab transitions
- On load, reads URL hash or defaults to `main`

### Sections
- **MAIN** — brief intro + "latest" feed aggregated across album reviews and essays
- **ALBUMS** — individual album reviews (rating, genre, prose). Sortable by recent / rating / artist A–Z.
- **LISTS** — curated lists (favourite albums, gateway records for a genre, on-rotation, etc.). Ranked auto-detected per list.
- **ESSAYS** — longer-form pieces: primers, listening guides, scene write-ups.
- **CONTACT** — Formspree form.

### File Structure
```
kurdishrag/
├── index.html          # Section scaffolding + nav + contact form
├── style.css           # Styling with CSS custom properties
├── script.js           # Tab navigation + contact form
├── projects.js         # All content data + rendering functions
├── CNAME               # GitHub Pages custom domain (kurdishrag.ca)
└── assets/             # (legacy) image assets; unused by current site
```

### Design System (CSS Custom Properties)

**Colour palette** (style.css `:root`):
- Primary `#ffd4a3` (peach), secondary `#ffb5a7` (pink), accent `#a8dadc` (teal)
- Background `#f1e3cb` (cream) with diagonal stripe, paper `#fbf4e3` for section cards
- Rating colours: hi `#2a9d8f`, mid `#e9b949`, lo `#c77d5a`

**Typography:**
- Headings / UI: `Press Start 2P` pixel font
- Meta / mono: `Space Mono`
- Long-form review & essay body: `EB Garamond` serif (17px, 1.7 line-height)

### Data Model (projects.js)

All editable content lives at the top of `projects.js` in three arrays:

```js
albumReviews: [{ artist, album, year, rating, genre, date, review }]
lists:        [{ id, title, description?, date?, items: [{ position?, primary, secondary?, year?, note? }] }]
essays:       [{ title, date, content }]
```

- `rating` — number out of 10, half-points allowed. Colour bucket: hi ≥9, mid ≥7, lo <7.
- `review` / `content` — paragraph breaks via blank lines (`\n\n`) inside the template literal.
- `date` — `YYYY-MM-DD`. Drives date-desc sort and the Main-page "latest" feed. Required on album reviews and essays; optional on lists (set it to have the list surface in the latest feed).
- `lists[].items` — render as ranked when any item has a `position`; otherwise unranked.
- Empty arrays render a small "No reviews yet." / "No lists yet." / "No essays yet." message.

### Latest feed

The main page's LATEST section aggregates the ten most recent items across `albumReviews`, `essays`, and any list that has a top-level `date`. When publishing a list you want featured on the main page, include a `date: 'YYYY-MM-DD'` at the list level.

### Rendering Functions (projects.js)

- `renderAlbumReview(r)` — per-review HTML
- `renderReviews()` — sorts `albumReviews` by date desc and injects into `#album-reviews`
- `renderLists()` — iterates `lists`, decides ranked vs unranked per list
- `renderEssays()` — essays, date-sorted, into `#essays-container`
- `renderLatest()` — merges album reviews + essays into a 6-item feed on the main page
- `sortReviews(target, sortKey)` + `initSortButtons()` — client-side re-sort by `date | rating | artist`

## Development

### Local preview
```bash
python3 -m http.server 8000
# or
npx serve
```
Open `http://localhost:8000`.

### Adding an album review
1. Open `projects.js`
2. Prepend an object to `albumReviews`
3. Use today's date (`YYYY-MM-DD`) so it surfaces in "latest"
4. Reload — no build step

### Adding a list
Append a new object to `lists`. Use `position` on items for ranked rendering; omit for unranked. The `id` is cosmetic.

### Adding an essay
Prepend to `essays`. Paragraphs are separated by blank lines inside the `content` template string.

### Styling
- Global design tokens at the top of `style.css`
- Review / list / essay blocks each have their own section — edits are usually local

### Contact
The contact section is a plain `mailto:` link in `index.html`. To change the address, edit both occurrences of `hello@kurdishrag.ca` in the contact section (the `href` and the visible text).

## Publishing Workflow (plaintext requests)

The owner often asks Claude to publish new content in plain English — e.g. "publish a review of Fontaines D.C.'s Romance, 8.5, <prose>" or "add a list called 'Best debut albums' with these entries...". Execute end-to-end **without asking for confirmation on routine details**. Only pause for genuinely missing required fields (see "When to ask vs assume" below).

### 1. Classify the request

Map the request to exactly one of the three content arrays:

| Cue words | Target array |
|---|---|
| "review", "album", "record", artist + album name | `albumReviews` |
| "list", "favourites", "top N", "best X", gateway records, ranked/unranked enumeration | `lists` |
| "essay", "primer", "guide", "write-up about…", "piece on…", "scene…" | `essays` |

If "publish" is used without a type, infer from structure: single work + rating → album review. Multiple works or discursive prose without a rating → essay. Enumeration of items → list.

The site is **music-only**. If a request is for something off-topic (film, book, unrelated personal writing), politely note that the site only handles music writing before doing anything.

### 2. Build the object

Field rules:

- **`date`** — Always today's `YYYY-MM-DD` from the environment context. Do not ask.
- **`year`** — Release year. If well-known, fill from your own knowledge. If obscure/ambiguous, ask.
- **`rating`** — Required for album reviews. Number 0–10, half-points allowed. If unspecified, ask — there is no sensible default.
- **`genre`** — Optional but strongly preferred. Infer from the artist. Keep it short ("Art Rock", "Ambient", "Hip-Hop / Jazz", "Post-Rock").
- **`review` / `content`** — Use the user's prose verbatim unless light editing is requested. Preserve paragraph breaks with blank lines (`\n\n`). No boilerplate intros/outros, no rating recap — the prose stands alone.
- **`list.items`** — If ranked, number 1…N in `position`. If unranked ("no particular order"), omit `position` on all items. `primary` is the album title / label; `secondary` is the artist. Include `year` when known.

### 3. Insert into `projects.js`

- **Album reviews and essays:** Prepend to the **top** of the array (sort is date-desc, so placement is cosmetic, but newest-first matches on-screen order).
- **Lists:** Append to `lists` unless the user specifies positioning.

Use the `Edit` tool, not `Write`, to keep the diff tight.

### 4. Commit and deploy

The site publishes via GitHub Pages from `main`. For plaintext publish requests, commit **directly to `main`** so it goes live immediately — no feature branch, no PR.

```bash
git add projects.js
git commit -m "Publish <type>: <title or list name>"
git push origin main
```

Commit message format:
- `Publish album review: Artist — Album`
- `Publish list: <LIST TITLE>`
- `Publish essay: <essay title>`

If currently on a non-`main` branch (check `git branch --show-current`), commit there and tell the user the post will go live when the branch merges.

### 5. Confirm to the user

One sentence: what was added, where it appears, that it's live (or pending). Include the commit SHA if useful. Do **not** paste the full object back.

### When to ask vs assume

**Ask** (only when required info is missing):
- Rating for an album review, if unspecified
- Year, if the work is obscure and you don't know it
- Whether a list is ranked, when item order is unclear

**Assume** (don't bother the user):
- Today's date
- Genre (infer from the artist)
- Paragraph breaks in prose (split at natural pauses)
- Which array to target (classify from cues)
- That the commit goes to `main` for immediate deploy

### Worked example

User says: *"Publish a review of Mount Eerie's A Crow Looked at Me, 9. Phil Elverum writing through the death of his wife, no metaphor, no poetic remove. As a record about grief it has no peer."*

Resulting object (prepended to `albumReviews`):
```js
{
  artist: 'Mount Eerie',
  album: 'A Crow Looked at Me',
  year: 2017,
  rating: 9,
  genre: 'Folk',
  date: '<today>',
  review: `Phil Elverum writing through the death of his wife, no metaphor, no poetic remove. As a record about grief it has no peer.`
}
```

Then commit to `main` with `Publish album review: Mount Eerie — A Crow Looked at Me`, push, confirm.

## Deployment

GitHub Pages with custom domain `kurdishrag.ca`. Pushes to `main` publish automatically.

## Scaling Notes

Content lives in a single JS file for simplicity. Past ~50 album reviews, consider:
- Splitting `projects.js` into `data/albums.js`, `data/lists.js`, `data/essays.js`
- Migrating to a static site generator (11ty, Astro) with Markdown-per-review
