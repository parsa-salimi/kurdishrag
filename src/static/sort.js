// Client-side re-sort for the /albums/ index page.
document.querySelectorAll('.sort-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const container = document.getElementById('album-reviews');
    if (!container) return;
    const items = Array.from(container.querySelectorAll('.review'));
    const sort = btn.dataset.sort;

    document.querySelectorAll('.sort-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    items.sort((a, b) => {
      if (sort === 'rating') {
        return parseFloat(b.dataset.rating) - parseFloat(a.dataset.rating);
      }
      if (sort === 'artist') {
        return a.dataset.sortKey.localeCompare(b.dataset.sortKey);
      }
      return (b.dataset.date || '').localeCompare(a.dataset.date || '');
    });

    items.forEach((el) => container.appendChild(el));
  });
});
