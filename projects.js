// Content data: reviews, lists, notes.
// The site is aimed at visitors looking for new music (and some books) to
// discover. Every entry below is a recommendation — if it's here, it's worth
// your time. The rendering code at the bottom reads these arrays and builds
// the pages. Edit freely.

// ---------- MUSIC REVIEWS ----------
// rating is out of 10 (half-points allowed).
// review can contain multiple paragraphs separated by blank lines.
const musicReviews = [
  {
    artist: 'Radiohead',
    album: 'In Rainbows',
    year: 2007,
    rating: 9,
    genre: 'Art Rock',
    date: '2026-04-15',
    review: `If you have only heard OK Computer and Kid A, start here next. After the austerity of those albums and the fatigue of Hail to the Thief, In Rainbows arrives warm-blooded — a record that finally trusts the band's instincts as songwriters rather than architects. "Nude" and "Reckoner" achieve a suspended, weightless quality nothing else in their catalogue matches.

A good autumn record. Put it on late, headphones, and let "Weird Fishes" do its slow build.`
  },
  {
    artist: 'Kendrick Lamar',
    album: 'To Pimp a Butterfly',
    year: 2015,
    rating: 9.5,
    genre: 'Hip-Hop / Jazz',
    date: '2026-04-02',
    review: `The essential 2010s hip-hop record, and the one that opens the most doors once you hear it. The jazz vocabulary is not decoration — it's the argument. Kamasi Washington, Thundercat, Robert Glasper, and Flying Lotus turn it into an ensemble work, which is the only way its political range makes sense.

If it's your first encounter, listen front-to-back. "u" and "Alright" function as a single panic attack and its answer, and splitting them kills the effect. This one will age better than anything else in its decade.`
  },
  {
    artist: 'Aphex Twin',
    album: 'Selected Ambient Works Volume II',
    year: 1994,
    rating: 9,
    genre: 'Ambient',
    date: '2026-03-18',
    review: `If you think you don't like ambient music, this is the record that might change your mind. Music for rooms rather than people — SAW II replaces the melodic warmth of Volume I with a grey, granular weather, Eno's Ambient 4 rewritten by someone with a harder imagination.

Good to fall asleep to, yes. But try listening sitting up, lights off. It becomes a long, quiet horror film.`
  },
  {
    artist: 'Fleet Foxes',
    album: 'Helplessness Blues',
    year: 2011,
    rating: 8,
    genre: 'Folk',
    date: '2026-02-22',
    review: `The right gateway into 2010s indie folk if you missed it the first time around. The harmonies are immaculate, and the title track is still one of the most honest pieces of writing about twentysomething dread I know. The middle thins out on re-listen, but the peaks are genuine — start with "Montezuma," "Helplessness Blues," and "Grown Ocean."`
  },
  {
    artist: 'Godspeed You! Black Emperor',
    album: 'Lift Your Skinny Fists Like Antennas to Heaven',
    year: 2000,
    rating: 9.5,
    genre: 'Post-Rock',
    date: '2026-02-05',
    review: `The post-rock album to hand someone who thinks the genre is just Explosions in the Sky soundtracks. Four movements, each a slow pilgrimage from drone to crescendo, framed by field recordings that refuse easy meaning. The band's politics are loud in interviews and mercifully quiet in the music.

Put it on loud, ignore the clock. 87 minutes, no skips.`
  },
  {
    artist: 'Mohammad Reza Shajarian',
    album: 'Bidād',
    year: 1985,
    rating: 10,
    genre: 'Persian Classical',
    date: '2026-01-11',
    review: `If you have never listened to Persian classical music, this is where to start. Shajarian at the height of his voice, in conversation with Parviz Meshkatian on santur. The avāz sections take their time, and the time is the point — this is not music that rewards skimming.

Sit down. Forty minutes. No phone. You will hear a tradition most Western listeners never encounter.`
  }
];

// ---------- BOOK REVIEWS ----------
const bookReviews = [
  {
    author: 'Jorge Luis Borges',
    title: 'Ficciones',
    year: 1944,
    rating: 10,
    genre: 'Short Stories',
    date: '2026-04-10',
    review: `If you read one book from this list, make it this one. Borges is often praised for his erudition, but his real gift is compression — he writes novels in five pages and never once sounds rushed.

"The Library of Babel" and "Pierre Menard" are the famous ones; "The Garden of Forking Paths" is the most perfect. You can read the whole collection in an afternoon and spend a decade thinking about it.`
  },
  {
    author: 'Roberto Bolaño',
    title: '2666',
    year: 2004,
    rating: 9,
    genre: 'Novel',
    date: '2026-03-30',
    review: `Long, difficult, and worth it. The fourth of five books — "The Part About the Crimes" — is an act of literary endurance that will either break you or change what you think novels are for. Bolaño writes around horror rather than about it, and the effect is more damning than any direct confrontation.

Start with The Savage Detectives if 900 pages feels daunting. Otherwise: set aside a month, read in chunks, don't rush.`
  },
  {
    author: 'Italo Calvino',
    title: 'Invisible Cities',
    year: 1972,
    rating: 9.5,
    genre: 'Novel',
    date: '2026-03-01',
    review: `The perfect bedside book. Short chapters, each a description of an imaginary city, each a small prose poem. You can open it at any page and find something worth the minute it takes to read.

Calvino's cities are really chapters of a single argument — about memory, desire, and the ways imagination organises the world. Give it a week of bedtimes.`
  },
  {
    author: 'Annie Dillard',
    title: 'Pilgrim at Tinker Creek',
    year: 1974,
    rating: 9,
    genre: 'Essays / Nature Writing',
    date: '2026-02-14',
    review: `If you want essays that will slow you down, start here. Dillard pays attention harder than almost anyone writing in English — the book is a year spent watching a single creek in Virginia, and it's more exciting than that description makes it sound. The prose can tip into purple; the observation never does. Read it outdoors if you can.`
  },
  {
    author: 'Forough Farrokhzad',
    title: 'Another Birth',
    year: 1964,
    rating: 10,
    genre: 'Poetry',
    date: '2026-01-20',
    review: `The twentieth-century Persian poet English readers most need to discover. In the original, Forough is a force; in translation, the voltage drops but enough comes through. Sholeh Wolpé's English editions are the best starting point.

"Another Birth" and "Let Us Believe in the Beginning of the Cold Season" belong on any serious poetry shelf, full stop.`
  }
];

// ---------- LISTS ----------
// Each list has a title, optional description, and items.
// items: { position?, primary, secondary?, year?, note? }
// If position is omitted the list renders unranked.
const lists = [
  {
    id: 'favourite-albums',
    title: 'FAVOURITE ALBUMS',
    description: 'If you only listen to ten records from this site, make it these. Ranked, reluctantly — the order shifts, but the names stay.',
    items: [
      { position: 1, primary: 'Bidād', secondary: 'Mohammad Reza Shajarian', year: 1985 },
      { position: 2, primary: 'Kid A', secondary: 'Radiohead', year: 2000 },
      { position: 3, primary: 'Lift Your Skinny Fists...', secondary: 'Godspeed You! Black Emperor', year: 2000 },
      { position: 4, primary: 'To Pimp a Butterfly', secondary: 'Kendrick Lamar', year: 2015 },
      { position: 5, primary: 'Selected Ambient Works Vol. II', secondary: 'Aphex Twin', year: 1994 },
      { position: 6, primary: 'The Köln Concert', secondary: 'Keith Jarrett', year: 1975 },
      { position: 7, primary: 'In Rainbows', secondary: 'Radiohead', year: 2007 },
      { position: 8, primary: 'Music for Airports', secondary: 'Brian Eno', year: 1978 },
      { position: 9, primary: 'Pink Moon', secondary: 'Nick Drake', year: 1972 },
      { position: 10, primary: 'Blonde', secondary: 'Frank Ocean', year: 2016 }
    ]
  },
  {
    id: 'favourite-novels',
    title: 'FAVOURITE NOVELS',
    description: 'Books I would press into your hands, in rough order of how much I want you to read them.',
    items: [
      { position: 1, primary: '2666', secondary: 'Roberto Bolaño', year: 2004 },
      { position: 2, primary: 'Invisible Cities', secondary: 'Italo Calvino', year: 1972 },
      { position: 3, primary: 'Blood Meridian', secondary: 'Cormac McCarthy', year: 1985 },
      { position: 4, primary: 'The Brothers Karamazov', secondary: 'Fyodor Dostoevsky', year: 1880 },
      { position: 5, primary: 'Austerlitz', secondary: 'W. G. Sebald', year: 2001 },
      { position: 6, primary: 'Stoner', secondary: 'John Williams', year: 1965 },
      { position: 7, primary: 'The Blind Owl', secondary: 'Sadegh Hedayat', year: 1937 },
      { position: 8, primary: 'A Personal Matter', secondary: 'Kenzaburō Ōe', year: 1964 }
    ]
  },
  {
    id: 'favourite-films',
    title: 'FAVOURITE FILMS',
    description: 'A shortlist of films worth seeking out — unranked, because ordering films feels wrong. If you have never seen a Kiarostami or a Tarkovsky, start with the ones below.',
    items: [
      { primary: 'Stalker', secondary: 'Andrei Tarkovsky', year: 1979 },
      { primary: 'Close-Up', secondary: 'Abbas Kiarostami', year: 1990 },
      { primary: 'In the Mood for Love', secondary: 'Wong Kar-wai', year: 2000 },
      { primary: 'A Separation', secondary: 'Asghar Farhadi', year: 2011 },
      { primary: 'Tokyo Story', secondary: 'Yasujirō Ozu', year: 1953 },
      { primary: 'The Turin Horse', secondary: 'Béla Tarr', year: 2011 },
      { primary: 'Where Is the Friend\'s House?', secondary: 'Abbas Kiarostami', year: 1987 }
    ]
  },
  {
    id: 'currently',
    title: 'CURRENTLY',
    description: 'What I have had on rotation this month. Try any of it — full reviews to come.',
    items: [
      { primary: 'Listening', secondary: 'Caroline Shaw — Partita for 8 Voices' },
      { primary: 'Listening', secondary: 'Sevdaliza — Shabrang' },
      { primary: 'Reading', secondary: 'Anne Carson — Autobiography of Red' },
      { primary: 'Reading', secondary: 'Franz Kafka — Diaries 1910–1923' },
      { primary: 'Watching', secondary: 'Krzysztof Kieślowski — Dekalog' }
    ]
  }
];

// ---------- JOURNAL ENTRIES ----------
const journalEntries = [
  {
    title: 'How to use this site',
    date: '2026-04-05',
    content: `This isn't a database of everything I've heard. It's a filtered list of music (and some books) I think are worth your time — full stop. Nothing mediocre makes it onto the page.

If you're looking for somewhere to start, go to the lists page. If you want to dig, sort the music reviews by rating and work downward. If you know an artist I've written about, use the A–Z sort. There's no search yet; the catalogue is small enough that you can scan.

Ratings are rough signal, not science. An 8 you love is more useful than a 10 you don't.`
  },
  {
    title: 'A primer: getting into ambient music',
    date: '2026-03-22',
    content: `The most common reason people bounce off ambient is that they try to pay attention to it the way they pay attention to a pop song. Ambient is not failed pop — it's a different relationship with sound. You don't "focus on" it; you let it change the shape of the room you're in.

Start with Brian Eno's Music for Airports (1978). Short, melodic, almost comforting — it's ambient for beginners on purpose. Then Aphex Twin's Selected Ambient Works Volume II (1994) for something colder and stranger. If both of those land, try Stars of the Lid's And Their Refinement of the Decline (2007): two hours of slow, orchestral drift that will either become your favourite record or put you to sleep. Either is a valid outcome.

Headphones, low volume, evening. Give it a week.`
  },
  {
    title: 'Why only the good ones',
    date: '2026-03-10',
    content: `I get asked why I don't review records I disliked. A few reasons. Negative reviews are fun to write, but they aren't useful to you — you came here for something to listen to, not something to avoid. There are already more records being made than any one person can keep up with; the real problem is filtering down, not warning off.

If a record isn't on this site, assume either I haven't heard it or I wasn't moved enough to write about it. The absence isn't a verdict.`
  }
];

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

function renderMusicReview(r) {
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

function renderBookReview(r) {
  return `
    <article class="review" data-rating="${r.rating}" data-date="${r.date}" data-sort-key="${r.author.toLowerCase()}">
      <header class="review-header">
        <div class="review-title-block">
          <div class="review-primary">${r.author}</div>
          <div class="review-secondary"><em>${r.title}</em> <span class="review-year">(${r.year})</span></div>
          ${r.genre ? `<div class="review-tag">${r.genre}</div>` : ''}
        </div>
        <div class="review-rating ${ratingColor(r.rating)}">${r.rating.toFixed(1)}<span class="rating-slash">/10</span></div>
      </header>
      <div class="review-body">${renderParagraphs(r.review)}</div>
    </article>
  `;
}

function renderReviews(containerId, data, renderer) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const sorted = [...data].sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  container.innerHTML = sorted.map(renderer).join('');
}

function renderLists() {
  const container = document.getElementById('lists-container');
  if (!container) return;

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

function renderJournal() {
  const container = document.getElementById('journal-container');
  if (!container) return;

  const sorted = [...journalEntries].sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  container.innerHTML = sorted.map(entry => `
    <article class="journal-entry">
      <div class="journal-date">${formatDate(entry.date)}</div>
      <h3>${entry.title}</h3>
      <div class="journal-body">${renderParagraphs(entry.content)}</div>
    </article>
  `).join('');
}

function renderLatest() {
  const container = document.getElementById('latest-feed');
  if (!container) return;

  const items = [
    ...musicReviews.map(r => ({ type: 'music', date: r.date, primary: r.artist, secondary: r.album, rating: r.rating, target: 'music' })),
    ...bookReviews.map(r => ({ type: 'book', date: r.date, primary: r.author, secondary: r.title, rating: r.rating, target: 'books' })),
    ...journalEntries.map(e => ({ type: 'journal', date: e.date, primary: e.title, secondary: '', target: 'journal' }))
  ].sort((a, b) => (b.date || '').localeCompare(a.date || '')).slice(0, 6);

  container.innerHTML = items.map(i => {
    const label = i.type === 'music' ? 'MUSIC' : i.type === 'book' ? 'BOOK' : 'JOURNAL';
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
function sortReviews(targetId, sortKey) {
  const container = document.getElementById(targetId === 'music' ? 'music-reviews' : 'book-reviews');
  if (!container) return;
  const items = Array.from(container.querySelectorAll('.review'));

  items.sort((a, b) => {
    if (sortKey === 'rating') {
      return parseFloat(b.dataset.rating) - parseFloat(a.dataset.rating);
    } else if (sortKey === 'artist' || sortKey === 'author') {
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
  renderReviews('music-reviews', musicReviews, renderMusicReview);
  renderReviews('book-reviews', bookReviews, renderBookReview);
  renderLists();
  renderJournal();
  renderLatest();
  initSortButtons();
});
