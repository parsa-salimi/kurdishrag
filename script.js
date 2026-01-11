// Main JavaScript for Personal Website
// Handles tab navigation, gallery, and form functionality

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
    // Trigger reflow to restart fade-in animation
    void targetSection.offsetWidth;
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
  // Check if there's a hash in the URL
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

// Contact Form Handler
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('.submit-btn');
    const formMessage = form.querySelector('.form-message');
    const formData = new FormData(form);

    // Disable button during submission
    submitBtn.disabled = true;
    submitBtn.textContent = 'SENDING...';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        formMessage.textContent = 'Message sent successfully! I\'ll get back to you soon.';
        formMessage.className = 'form-message success';
        form.reset();
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      formMessage.textContent = 'Oops! Something went wrong. Please try again.';
      formMessage.className = 'form-message error';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'SEND MESSAGE';
    }
  });
}

// Initialize contact form when DOM is ready
window.addEventListener('DOMContentLoaded', initContactForm);

// Gallery Lightbox (optional enhancement)
function initGallery() {
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (img) {
        // Simple lightbox - could be enhanced with a modal
        window.open(img.src, '_blank');
      }
    });
  });
}

// Initialize gallery when DOM is ready
window.addEventListener('DOMContentLoaded', initGallery);
