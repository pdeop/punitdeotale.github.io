// Close mobile nav on link click
document.querySelectorAll('.site-nav a').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('.site-nav').classList.remove('open');
  });
});
