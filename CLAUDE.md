# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static personal portfolio website for Parsa (kurdishrag.ca) with a refined retro aesthetic. It's a single-page application showcasing work across leatherworking, music, and writing, built with vanilla HTML, CSS, and JavaScript with no build system or dependencies.

## Architecture

### Tab Navigation System
- Client-side routing via `showTab(id)` function in script.js
- All sections are loaded in the DOM, only one visible at a time using `display: none/block`
- Navigation handled by inline `onclick` handlers in nav links
- Active tab highlighting with CSS class `.active`
- URL hash support for browser back/forward navigation
- Smooth fade-in animations on tab transitions (CSS animation in style.css:127-136)
- On page load, checks URL hash or defaults to 'main' section

### File Structure
```
Personal-website/
├── index.html          # Main HTML with all content sections
├── style.css           # Complete styling with CSS custom properties
├── script.js           # Tab navigation, form handling, gallery init
├── projects.js         # Project data and rendering functions
├── CNAME              # GitHub Pages custom domain (kurdishrag.ca)
└── assets/            # Image assets for projects
    ├── leatherwork/
    ├── music/
    └── writing/
```

### Design System (CSS Custom Properties)

**Color Palette:**
- Softer retro colors replacing harsh yellow/orange
- Primary: `#ffd4a3` (warm peach)
- Secondary: `#ffb5a7` (soft pink)
- Accent: `#a8dadc` (soft teal)
- Background: `#f1e3cb` (cream) with diagonal stripe pattern
- Text: `#2d3142` (soft black), `#5a5766` (medium gray)

**Typography:**
- Headings: 'Press Start 2P' pixel font
- Body: 'Space Mono' monospace font
- Size scale: xs (10px) → sm (12px) → base (14px) → md (16px) → lg (20px) → xl (28px)

**Spacing System:**
- xs: 8px, sm: 12px, md: 20px, lg: 32px, xl: 48px
- All defined in CSS custom properties (style.css:6-36)

### Key Features

**1. Project Galleries (projects.js)**
- Data-driven galleries for leatherwork, music, and writing
- Project objects stored in `projects` object, keyed by category
- `renderGallery(category, containerId)` dynamically generates gallery HTML
- Placeholder images with fallback SVG if image missing
- Gallery items are clickable (currently opens image in new tab)

**2. Blog System (projects.js)**
- Blog posts stored in `blogPosts` array with title, date, excerpt, content
- `renderBlogPosts()` generates blog post cards
- Date formatting via `formatDate()` helper
- "Read More" links (currently placeholders)

**3. Contact Form (index.html:73-97, script.js)**
- Form submits to Formspree endpoint (requires setup)
- Async form submission with `initContactForm()` in script.js
- Success/error messaging with styled alerts
- Form validation using HTML5 required attributes
- **Setup needed:** Replace `YOUR_FORM_ID` in index.html:73 with actual Formspree form ID

**4. Responsive Design**
- Mobile-first approach with breakpoints at 768px and 480px
- Sticky navigation bar with shadow
- Grid galleries collapse to single column on mobile
- Typography and spacing scales down for smaller screens

## Development

### Local Development
Preview the site locally using a simple HTTP server:
```bash
python3 -m http.server 8000
# or
npx serve
```
Then open `http://localhost:8000` in a browser.

### Making Changes

**Content Updates:**
- Page copy: Edit the relevant `<section>` in index.html
- Project portfolio: Update `projects` object in projects.js
- Blog posts: Add to `blogPosts` array in projects.js

**Adding Project Images:**
1. Add image files to appropriate `assets/` subdirectory
2. Update image paths in projects.js entries
3. Images will auto-fallback to placeholder SVG if missing

**Styling:**
- Modify CSS custom properties in style.css:6-36 for global changes
- Component-specific styles organized by section in style.css

**New Tabs:**
1. Add `<section id="new-tab">` to index.html
2. Add nav link: `<a onclick="showTab('new-tab')">NEW TAB</a>`
3. Section will inherit fade-in animation automatically

### Contact Form Setup

To enable the contact form:
1. Sign up at https://formspree.io (free tier available)
2. Create a new form and get your form ID
3. Replace `YOUR_FORM_ID` in index.html:73 with your actual form ID
4. Test submission - you'll receive emails at your registered address

## Deployment

The site is deployed via GitHub Pages with a custom domain (kurdishrag.ca). Changes pushed to the main branch are automatically published.

## Project Data Management

Projects and blog posts are managed via JavaScript objects in projects.js rather than a CMS or markdown files. To scale beyond ~20 entries per category, consider migrating to a static site generator (11ty, Hugo, Astro) or headless CMS.
