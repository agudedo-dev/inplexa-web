(() => {
  const button = document.querySelector('.menu-toggle');
  const nav = document.getElementById('main-nav');
  if (!button || !nav) return;
  document.documentElement.classList.add('nav-ready');
  const setOpen = open => {
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    nav.classList.toggle('is-open', open);
  };
  button.addEventListener('click', () => setOpen(button.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', event => {
    if (event.target.closest('a')) setOpen(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      button.focus();
    }
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.header-inner')) setOpen(false);
  });
  window.matchMedia('(max-width: 760px)').addEventListener('change', () => setOpen(false));
})();
