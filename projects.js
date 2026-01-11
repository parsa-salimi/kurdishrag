// Project Data
// Add your actual project details and image paths here

const projects = {
  leatherwork: [
    {
      title: 'Custom Wallet',
      description: 'Handcrafted leather wallet with card slots',
      image: 'assets/leatherwork/wallet-placeholder.jpg',
      date: '2025-01'
    },
    {
      title: 'Leather Purse',
      description: 'Minimalist crossbody purse design',
      image: 'assets/leatherwork/purse-placeholder.jpg',
      date: '2024-12'
    },
    {
      title: 'Card Holder',
      description: 'Slim card holder for everyday carry',
      image: 'assets/leatherwork/cardholder-placeholder.jpg',
      date: '2024-11'
    }
  ],

  music: [
    {
      title: 'Track Title 1',
      description: 'Genre: Electronic | Duration: 3:45',
      image: 'assets/music/album1-placeholder.jpg',
      audioUrl: 'https://soundcloud.com/yourusername/track1',
      date: '2025-01'
    },
    {
      title: 'Track Title 2',
      description: 'Genre: Ambient | Duration: 4:20',
      image: 'assets/music/album2-placeholder.jpg',
      audioUrl: 'https://soundcloud.com/yourusername/track2',
      date: '2024-12'
    }
  ],

  writing: [
    {
      title: 'Essay Title',
      description: 'A reflection on creativity and craftsmanship',
      image: 'assets/writing/essay-placeholder.jpg',
      url: '#',
      date: '2025-01'
    },
    {
      title: 'Short Story',
      description: 'A brief tale about resilience',
      image: 'assets/writing/story-placeholder.jpg',
      url: '#',
      date: '2024-11'
    }
  ]
};

// Blog/News Posts Data
const blogPosts = [
  {
    title: 'Welcome to My Portfolio',
    date: '2025-01-11',
    excerpt: 'I\'m excited to share this new space where I can showcase my work in leatherworking, music, and writing. This site will be regularly updated with new projects and thoughts.',
    content: '' // Full content can be added later
  },
  {
    title: 'New Leatherwork Commission',
    date: '2024-12-15',
    excerpt: 'Just completed a custom wallet commission with unique tooling patterns. If you\'re interested in a custom piece, reach out!',
    content: ''
  }
];

// Render Gallery Function
function renderGallery(category, containerId) {
  const container = document.getElementById(containerId);
  if (!container || !projects[category]) return;

  const galleryHTML = projects[category].map(project => `
    <div class="gallery-item">
      <img src="${project.image}" alt="${project.title}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22250%22 height=%22200%22%3E%3Crect width=%22250%22 height=%22200%22 fill=%22%23f1e3cb%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-family=%22Arial%22 font-size=%2214%22 fill=%22%232d3142%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22%3EImage Coming Soon%3C/text%3E%3C/svg%3E'">
      <div class="gallery-item-content">
        <h4>${project.title}</h4>
        <p>${project.description}</p>
      </div>
    </div>
  `).join('');

  container.innerHTML = galleryHTML;
}

// Render Blog Posts Function
function renderBlogPosts() {
  const container = document.getElementById('blog-container');
  if (!container) return;

  const postsHTML = blogPosts.map(post => `
    <article class="blog-post">
      <div class="blog-post-date">${formatDate(post.date)}</div>
      <h3>${post.title}</h3>
      <p class="blog-post-excerpt">${post.excerpt}</p>
      <a href="#" class="read-more">READ MORE →</a>
    </article>
  `).join('');

  container.innerHTML = postsHTML;
}

// Format date helper
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

// Initialize all galleries and blog on page load
window.addEventListener('DOMContentLoaded', () => {
  renderGallery('leatherwork', 'leatherwork-gallery');
  renderGallery('music', 'music-gallery');
  renderGallery('writing', 'writing-gallery');
  renderBlogPosts();
});
