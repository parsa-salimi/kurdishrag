# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A static site (kurdishrag.ca) where Parsa publishes **music writing** — album reviews, favourite lists, and longer essays. Scaruffi-inspired in spirit: opinionated, text-first, minimal — rendered with a paper/typewriter aesthetic (Georgia + Courier, hot magenta accent, pale-yellow paper background).

Editorial stance: **only recommend, never warn off.** If a record isn't on the site, it didn't make the cut. Ratings (out of 10) are a rough signal, not a verdict. The site is music-only.

## Stack

- **[Eleventy 3](https://www.11ty.dev/)** — static site generator, renders `.md` with YAML frontmatter into HTML
- **Nunjucks** — template engine for layouts (`src/_includes/`)
- **markdown-it** — markdown → HTML, with a custom rule that wraps block-level images in `<figure>` + `<figcaption>`
- **@11ty/eleventy-plugin-rss** — Atom feed filters
- **GitHub Pages + Actions** — push to `main` triggers a build and deploy (`.github/workflows/deploy.yml`)

## File Structure

```
kurdishrag/
├── .eleventy.js                 # Eleventy config, filters, latest collection
├── package.json                 # npm deps, scripts (dev, build)
├── .github/workflows/deploy.yml # CI: build + deploy to GitHub Pages
├── .gitignore                   # node_modules, _site
├── style.css                    # Single stylesheet, passthrough-copied to /
├── images/essays/               # Essay images, passthrough-copied to /images/essays/
├── CNAME                        # GitHub Pages custom domain
└── src/                         # Eleventy input directory
    ├── _includes/
    │   ├── base.njk             # HTML shell: header + nav + footer
    │   └── layouts/
    │       ├── album.njk        # Single album review page
    │       ├── essay.njk        # Single essay page
    │       └── list.njk         # Single list page
    ├── albums/
    │   ├── albums.11tydata.json # Applies album layout + tag to every .md in this dir
    │   └── *.md                 # Individual album reviews
    ├── essays/
    │   ├── essays.11tydata.json
    │   └── *.md
    ├── lists/
    │   ├── lists.11tydata.json
    │   └── *.md
    ├── static/
    │   └── sort.js              # Client-side sort for /albums/ index
    ├── index.njk                # Home page at /
    ├── albums.njk               # Albums index at /albums/
    ├── lists.njk                # Lists index at /lists/
    ├── essays.njk               # Essays index at /essays/
    ├── contact.njk              # /contact/
    └── feed.njk                 # /feed.xml Atom feed
```

Build output goes to `_site/` (gitignored).

## Development

### Local preview
```bash
npm install           # first time only
npm run dev           # starts eleventy --serve on http://localhost:8080
```
The dev server auto-rebuilds on save.

### Production build
```bash
npm run build         # writes to _site/
```

### Deploy
Push to `main`. GitHub Actions runs `npm ci && npm run build`, uploads `_site/`, deploys to GitHub Pages. Typical turnaround ~1 minute.

**Required GitHub Pages setting:** Settings → Pages → Build and deployment → Source: **"GitHub Actions"** (not "Deploy from a branch"). Without this, the Action runs but nothing goes live.

## Content Model

Each post is one markdown file with YAML frontmatter. Eleventy auto-generates routes from the filename: `src/albums/fontaines-romance.md` → `/albums/fontaines-romance/`.

### Album review — `src/albums/slug.md`

```markdown
---
artist: Fontaines D.C.
album: Romance
year: 2024
rating: 8.5
genre: Post-Punk
date: 2026-04-22
---

First paragraph. Full markdown supported — **bold**, *italics*,
[links](https://example.com), footnotes, lists.

Second paragraph.
```

- `rating` — number out of 10, half-points OK. Colour bucket: hi ≥9 (green), mid ≥7 (mustard), lo <7 (brick).
- `date` — `YYYY-MM-DD`. Drives the home-page LATEST feed and feed.xml.
- `genre` — optional but preferred.

### Essay — `src/essays/slug.md`

```markdown
---
title: Why I still buy vinyl
date: 2026-04-22
---

A paragraph of writing.

![Nils Frahm at Funkhaus, 2019](/images/essays/nils-frahm.jpg)

Any markdown image on its own line (with blank lines around it) renders as a `<figure>` with the alt text as an uppercase `<figcaption>` below the image. Use absolute paths starting with `/images/essays/`, not relative paths.

Paragraph after the photo.
```

Put the image files in `images/essays/` at the repo root. Commit them alongside the `.md` file.

### List — `src/lists/slug.md`

```markdown
---
id: best-debuts
title: BEST DEBUT ALBUMS
description: An optional italic intro line.
date: 2026-04-22       # optional — include to surface in the LATEST feed
items:
  - position: 1
    primary: Illmatic
    secondary: Nas
    year: 1994
  - position: 2
    primary: The Velvet Underground & Nico
    secondary: The Velvet Underground
    year: 1967
---
```

- With `position` on any item, the list renders ranked; without, it renders bulleted.
- `primary` is the album/title; `secondary` is the artist.
- Body below the frontmatter is optional; if present it renders as a trailing note.

## Latest feed

`.eleventy.js` defines a custom collection `latest` that aggregates the ten most recent items across `albums`, `essays`, and any `list` with a top-level `date`. Used by both the home page and the Atom feed.

## Publishing Workflow (plaintext requests)

The owner often asks Claude to publish new content in plain English — e.g. *"publish a review of Fontaines D.C.'s Romance, 8.5, \<prose>"*. Execute end-to-end **without asking for confirmation on routine details**.

### 1. Classify the request

| Cue words | Target folder |
|---|---|
| "review", "album", artist + album | `src/albums/` |
| "list", "favourites", "top N", "best X" | `src/lists/` |
| "essay", "primer", "guide", "piece on…" | `src/essays/` |

If it's ambiguous: single work + rating → review. Enumeration → list. Discursive prose → essay.

The site is **music-only**. If the request is off-topic (film, book, non-music), decline before writing.

### 2. Build the file

**Slug rules:** lowercase, words separated by hyphens, ASCII only. Examples: `fontaines-dc-romance.md`, `best-debut-albums.md`, `why-i-buy-vinyl.md`. Slug becomes the URL.

**Field rules:**
- `date`: today's `YYYY-MM-DD`. Don't ask.
- `year` (albums only): if the album is well-known, fill it; if obscure, ask.
- `rating` (albums only): required. If the user didn't give one, ask.
- `genre` (albums only): infer from your knowledge of the artist. Short — "Ambient", "Post-Rock", "Hip-Hop / Jazz".
- `review` body: the user's prose verbatim. Preserve paragraph breaks (blank lines). Markdown is allowed — use *italics* for album titles in running prose, `[link](url)` for references.
- `list.items`: if ranked, number 1…N in `position`. If unranked, omit `position` on all items.

### 3. Write the file

Use the `Write` tool with the full YAML frontmatter + body. Never mix multiple posts into one file.

### 4. Commit and push

```bash
git add src/<folder>/<slug>.md            # + any image files
git commit -m "Publish <type>: <title>"
git push origin main
```

Commit-message format:
- `Publish album review: Artist — Album`
- `Publish list: <LIST TITLE>`
- `Publish essay: <essay title>`

GitHub Actions builds + deploys; live in ~1 min.

### 5. Confirm to the user

One sentence: what was added, the URL it will live at (e.g. `/albums/fontaines-romance/`), and that the build is running.

### When to ask vs assume

**Ask** if missing:
- Rating (albums)
- Year, when the work is obscure and you don't know it
- Whether a list is ranked, if unclear

**Assume**:
- Today's date
- Genre (infer)
- Slug (derive from artist + album / title)
- Paragraph breaks
- Which folder to target
- Direct-to-main commit

### Worked example

User: *"Publish a review of Mount Eerie's A Crow Looked at Me, 9. Phil Elverum writing through the death of his wife, no metaphor, no poetic remove. As a record about grief it has no peer."*

Write `src/albums/mount-eerie-a-crow-looked-at-me.md`:

```markdown
---
artist: Mount Eerie
album: A Crow Looked at Me
year: 2017
rating: 9
genre: Folk
date: <today>
---

Phil Elverum writing through the death of his wife, no metaphor, no poetic remove. As a record about grief it has no peer.
```

Commit `Publish album review: Mount Eerie — A Crow Looked at Me`, push, confirm.

## Styling

All styles live in `style.css` at the repo root. Design tokens (colours, fonts, spacing) are at the top in `:root`. Most edits are local to a section.

## Contact

`src/contact.njk` holds a single `mailto:hello@kurdishrag.ca` link. To change the address, edit both occurrences in that file.
