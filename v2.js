/* Visual enhancement only. Conversion and contact behavior remains in script.js. */
(()=>{
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  const menu=document.querySelector('.menu-toggle');
  const nav=document.getElementById('main-nav');
  const closeMenu=()=>{nav.classList.remove('is-open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Abrir menú');};
  menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';nav.classList.toggle('is-open',open);menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');});
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus();}});
  if('IntersectionObserver' in window&&!reduced.matches){
    const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');observer.unobserve(e.target);}}),{threshold:.12});
    document.querySelectorAll('.reveal').forEach(e=>observer.observe(e));
  }
  const slider=document.querySelector('.factory-slider');
  const slides=[...document.querySelectorAll('[data-slide]')];
  const pause=document.querySelector('[data-pause]');
  let current=0,paused=reduced.matches,timer;
  const show=i=>{current=(i+slides.length)%slides.length;slides.forEach((s,n)=>{s.classList.toggle('is-active',n===current);s.setAttribute('aria-hidden',String(n!==current));});document.getElementById('slide-count').textContent=`0${current+1} / 0${slides.length}`;};
  const sync=()=>{pause.setAttribute('aria-pressed',String(paused));pause.setAttribute('aria-label',paused?'Reanudar presentación':'Pausar presentación');pause.textContent=paused?'▷':'Ⅱ';};
  const stop=()=>clearInterval(timer);
  const start=()=>{stop();if(!paused&&!document.hidden)timer=setInterval(()=>show(current+1),6500);};
  document.querySelector('[data-prev]').addEventListener('click',()=>{show(current-1);paused=true;sync();stop();});
  document.querySelector('[data-next]').addEventListener('click',()=>{show(current+1);paused=true;sync();stop();});
  pause.addEventListener('click',()=>{paused=!paused;sync();start();});
  slider.addEventListener('mouseenter',stop);slider.addEventListener('mouseleave',start);
  slider.addEventListener('focusin',stop);slider.addEventListener('focusout',e=>{if(!slider.contains(e.relatedTarget))start();});
  document.addEventListener('visibilitychange',()=>document.hidden?stop():start());
  reduced.addEventListener('change',e=>{if(e.matches){paused=true;sync();stop();}});
  sync();start();
})();
