// Main JavaScript for Personal Website
// Handles tab navigation.

// Tab Navigation System
function showTab(tabId) {
  // Hide all sections
  document.querySelectorAll('section').forEach(section => {
    section.style.display = 'none';
  });

  // Remove active class from all nav links
  document.querySelectorAll('nav a').forEach(link => {
    link.classList.remove('active');
  });

  // Show the selected section
  const targetSection = document.getElementById(tabId);
  if (targetSection) {
    targetSection.style.display = 'block';
  }

  // Add active class to clicked nav link
  const activeLink = document.querySelector(`nav a[onclick*="${tabId}"]`);
  if (activeLink) {
    activeLink.classList.add('active');
  }

  // Update URL hash without scrolling
  history.replaceState(null, null, `#${tabId}`);
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
  const hash = window.location.hash.substring(1);
  const initialTab = hash || 'main';
  showTab(initialTab);
});

// Handle browser back/forward buttons
window.addEventListener('hashchange', () => {
  const hash = window.location.hash.substring(1);
  if (hash) {
    showTab(hash);
  }
});

