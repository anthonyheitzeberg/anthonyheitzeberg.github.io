// Small interactive helpers: theme toggle, reveal on scroll, year
(function(){
  // Year in footer
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // Theme toggle (simple)
  const toggle = document.getElementById('theme-toggle');
  const root = document.documentElement;
  toggle?.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    if(current === 'dark'){ root.removeAttribute('data-theme'); localStorage.removeItem('theme'); }
    else { root.setAttribute('data-theme','dark'); localStorage.setItem('theme','dark'); }
  });
  if(localStorage.getItem('theme') === 'dark') root.setAttribute('data-theme','dark');

  // Reveal on scroll (IntersectionObserver)
  const io = new IntersectionObserver(entries => {
    for(const e of entries){
      if(e.isIntersecting) e.target.classList.add('visible');
    }
  }, {threshold: 0.12});
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if(href.length > 1){
        e.preventDefault();
        const el = document.querySelector(href);
        if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });
})();