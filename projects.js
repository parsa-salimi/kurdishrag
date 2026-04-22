// Content data: album reviews, lists, essays.
// Everything below is user-written. The rendering code at the bottom reads
// these arrays and builds the pages.

// ---------- ALBUM REVIEWS ----------
// { artist, album, year, rating, genre, date, review }
// rating: 0–10 (half-points allowed). review supports paragraph breaks (\n\n).
const albumReviews = [];

// ---------- LISTS ----------
// { id, title, description?, date?, items: [{ position?, primary, secondary?, year?, note? }] }
// Items with any `position` render as ranked; otherwise unranked.
// An optional top-level `date` makes the list surface in the "LATEST" feed.
const lists = [];

// ---------- ESSAYS ----------
// { title, date, content }
const essays = [];

// ============================================================
// RENDERING
// ============================================================

function ratingColor(rating) {
  if (rating >= 9) return 'rating-hi';
  if (rating >= 7) return 'rating-mid';
  return 'rating-lo';
}

function formatDate(dateString) {
  if (!dateString) return '';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

function renderParagraphs(text) {
  return text
    .split(/\n\s*\n/)
    .map(p => `<p>${p.trim().replace(/\n/g, '<br>')}</p>`)
    .join('');
}

// Essay content: same paragraph rules as reviews, plus markdown-style
// images on their own line: ![caption](path/to/image.jpg)
function renderEssayContent(text) {
  return text
    .split(/\n\s*\n/)
    .map(block => {
      const trimmed = block.trim();
      const imgMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
      if (imgMatch) {
        const [, caption, src] = imgMatch;
        const captionHtml = caption ? `<figcaption>${caption}</figcaption>` : '';
        const altText = caption || '';
        return `<figure class="essay-figure"><img src="${src}" alt="${altText}" loading="lazy">${captionHtml}</figure>`;
      }
      return `<p>${trimmed.replace(/\n/g, '<br>')}</p>`;
    })
    .join('');
}

function emptyState(message) {
  return `<p class="empty-state">${message}</p>`;
}

function renderAlbumReview(r) {
  return `
    <article class="review" data-rating="${r.rating}" data-date="${r.date}" data-sort-key="${r.artist.toLowerCase()}">
      <header class="review-header">
        <div class="review-title-block">
          <div class="review-primary">${r.artist}</div>
          <div class="review-secondary">${r.album} <span class="review-year">(${r.year})</span></div>
          ${r.genre ? `<div class="review-tag">${r.genre}</div>` : ''}
        </div>
        <div class="review-rating ${ratingColor(r.rating)}">${r.rating.toFixed(1)}<span class="rating-slash">/10</span></div>
      </header>
      <div class="review-body">${renderParagraphs(r.review)}</div>
    </article>
  `;
}

function renderReviews() {
  const container = document.getElementById('album-reviews');
  if (!container) return;
  if (!albumReviews.length) {
    container.innerHTML = emptyState('No reviews yet.');
    return;
  }
  const sorted = [...albumReviews].sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  container.innerHTML = sorted.map(renderAlbumReview).join('');
}

function renderLists() {
  const container = document.getElementById('lists-container');
  if (!container) return;
  if (!lists.length) {
    container.innerHTML = emptyState('No lists yet.');
    return;
  }

  container.innerHTML = lists.map(list => {
    const hasRanks = list.items.some(i => typeof i.position === 'number');
    const itemsHTML = list.items.map(item => {
      const rank = hasRanks && item.position ? `<span class="list-rank">${String(item.position).padStart(2, '0')}</span>` : '';
      const year = item.year ? ` <span class="list-year">(${item.year})</span>` : '';
      const secondary = item.secondary ? ` — <span class="list-secondary">${item.secondary}</span>` : '';
      const note = item.note ? `<div class="list-note">${item.note}</div>` : '';
      return `<li class="list-item">${rank}<span class="list-primary">${item.primary}</span>${secondary}${year}${note}</li>`;
    }).join('');

    return `
      <article class="favlist">
        <h3>${list.title}</h3>
        ${list.description ? `<p class="list-desc">${list.description}</p>` : ''}
        <ol class="favlist-items ${hasRanks ? 'ranked' : 'unranked'}">${itemsHTML}</ol>
      </article>
    `;
  }).join('');
}

function renderEssays() {
  const container = document.getElementById('essays-container');
  if (!container) return;
  if (!essays.length) {
    container.innerHTML = emptyState('No essays yet.');
    return;
  }

  const sorted = [...essays].sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  container.innerHTML = sorted.map(entry => `
    <article class="journal-entry">
      <div class="journal-date">${formatDate(entry.date)}</div>
      <h3>${entry.title}</h3>
      <div class="journal-body">${renderEssayContent(entry.content)}</div>
    </article>
  `).join('');
}

function renderLatest() {
  const container = document.getElementById('latest-feed');
  if (!container) return;

  const items = [
    ...albumReviews.map(r => ({ type: 'album', date: r.date, primary: r.artist, secondary: r.album, rating: r.rating, target: 'albums' })),
    ...lists.filter(l => l.date).map(l => ({ type: 'list', date: l.date, primary: l.title, secondary: '', target: 'lists' })),
    ...essays.map(e => ({ type: 'essay', date: e.date, primary: e.title, secondary: '', target: 'essays' }))
  ].sort((a, b) => (b.date || '').localeCompare(a.date || '')).slice(0, 10);

  if (!items.length) {
    container.innerHTML = emptyState('Nothing here yet.');
    return;
  }

  container.innerHTML = items.map(i => {
    const label = i.type === 'album' ? 'ALBUM' : i.type === 'list' ? 'LIST' : 'ESSAY';
    const rating = typeof i.rating === 'number' ? `<span class="feed-rating ${ratingColor(i.rating)}">${i.rating.toFixed(1)}</span>` : '';
    const sec = i.secondary ? ` — <em>${i.secondary}</em>` : '';
    return `
      <div class="feed-item" onclick="showTab('${i.target}')">
        <span class="feed-label">${label}</span>
        <span class="feed-date">${formatDate(i.date)}</span>
        <div class="feed-title">${i.primary}${sec} ${rating}</div>
      </div>
    `;
  }).join('');
}

// ---------- SORTING ----------
function sortReviews(_targetId, sortKey) {
  const container = document.getElementById('album-reviews');
  if (!container) return;
  const items = Array.from(container.querySelectorAll('.review'));

  items.sort((a, b) => {
    if (sortKey === 'rating') {
      return parseFloat(b.dataset.rating) - parseFloat(a.dataset.rating);
    } else if (sortKey === 'artist') {
      return a.dataset.sortKey.localeCompare(b.dataset.sortKey);
    } else {
      return (b.dataset.date || '').localeCompare(a.dataset.date || '');
    }
  });

  items.forEach(el => container.appendChild(el));
}

function initSortButtons() {
  document.querySelectorAll('.sort-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.target;
      const sort = btn.dataset.sort;
      document.querySelectorAll(`.sort-btn[data-target="${target}"]`).forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      sortReviews(target, sort);
    });
  });
}

// ---------- INIT ----------
window.addEventListener('DOMContentLoaded', () => {
  renderReviews();
  renderLists();
  renderEssays();
  renderLatest();
  initSortButtons();
});
