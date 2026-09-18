/* Visual enhancement only. Conversion and contact behavior remains in script.js. */
(()=>{
  let pageMotionPaused=false;
  document.documentElement.classList.add('motion-ready');
  const motionToggle=document.querySelector('.motion-toggle');
  const menu=document.querySelector('.menu-toggle');
  const nav=document.getElementById('main-nav');
  const closeMenu=()=>{nav.classList.remove('is-open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Abrir menú');};
  menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';nav.classList.toggle('is-open',open);menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');});
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus();}});
  const revealTargets=document.querySelectorAll('.reveal,.service-card,.development-heading,.development-body,.process-visual,.process-content,.company-top,.factory-slider,.trust-heading,.trust-grid article,.trust-note,.quote-copy,.form-panel,.faq>div,.contact>div');
  if('IntersectionObserver' in window){
    const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');observer.unobserve(e.target);}}),{threshold:.1,rootMargin:'0px 0px -5%'});
    revealTargets.forEach((e,n)=>{e.classList.add('scroll-reveal');e.style.setProperty('--reveal-delay',`${Math.min(n%3,2)*70}ms`);observer.observe(e);});
  }else revealTargets.forEach(e=>e.classList.add('is-visible'));

  const hero=document.querySelector('[data-hero-slideshow]');
  const heroShots=[...document.querySelectorAll('[data-hero-shot]')];
  const heroDots=[...document.querySelectorAll('[data-hero-dot]')];
  const heroCount=document.querySelector('[data-hero-count]');
  let heroIndex=0,heroTimer;
  const showHero=i=>{heroIndex=(i+heroShots.length)%heroShots.length;heroShots.forEach((shot,n)=>{const active=n===heroIndex;shot.classList.toggle('is-active',active);shot.setAttribute('aria-hidden',String(!active));});heroDots.forEach((dot,n)=>{dot.classList.toggle('is-active',n===heroIndex);if(n===heroIndex)dot.setAttribute('aria-current','true');else dot.removeAttribute('aria-current');});heroCount.textContent=`INP / 0${heroIndex+1}`;};
  const stopHero=()=>clearInterval(heroTimer);
  const startHero=()=>{stopHero();if(!pageMotionPaused&&!document.hidden)heroTimer=setInterval(()=>showHero(heroIndex+1),5600);};
  heroDots.forEach((dot,n)=>dot.addEventListener('click',()=>{showHero(n);startHero();}));
  hero.addEventListener('mouseenter',stopHero);hero.addEventListener('mouseleave',startHero);
  hero.addEventListener('focusin',stopHero);hero.addEventListener('focusout',e=>{if(!hero.contains(e.relatedTarget))startHero();});
  startHero();
  const slider=document.querySelector('.factory-slider');
  const slides=[...document.querySelectorAll('[data-slide]')];
  const pause=document.querySelector('[data-pause]');
  let current=0,paused=false,timer;
  const show=i=>{current=(i+slides.length)%slides.length;slides.forEach((s,n)=>{s.classList.toggle('is-active',n===current);s.setAttribute('aria-hidden',String(n!==current));});document.getElementById('slide-count').textContent=`0${current+1} / 0${slides.length}`;};
  const sync=()=>{pause.setAttribute('aria-pressed',String(paused));pause.setAttribute('aria-label',paused?'Reanudar presentación':'Pausar presentación');pause.textContent=paused?'▷':'Ⅱ';};
  const stop=()=>clearInterval(timer);
  const start=()=>{stop();if(!paused&&!pageMotionPaused&&!document.hidden)timer=setInterval(()=>show(current+1),6500);};
  document.querySelector('[data-prev]').addEventListener('click',()=>{show(current-1);paused=true;sync();stop();});
  document.querySelector('[data-next]').addEventListener('click',()=>{show(current+1);paused=true;sync();stop();});
  pause.addEventListener('click',()=>{paused=!paused;sync();start();});
  slider.addEventListener('mouseenter',stop);slider.addEventListener('mouseleave',start);
  slider.addEventListener('focusin',stop);slider.addEventListener('focusout',e=>{if(!slider.contains(e.relatedTarget))start();});
  document.addEventListener('visibilitychange',()=>{if(document.hidden){stop();stopHero();}else{start();startHero();}});
  sync();start();

  const syncPageMotion=()=>{document.documentElement.classList.toggle('motion-paused',pageMotionPaused);motionToggle.setAttribute('aria-pressed',String(pageMotionPaused));motionToggle.setAttribute('aria-label',pageMotionPaused?'Reanudar animaciones':'Pausar animaciones');motionToggle.querySelector('span').textContent=pageMotionPaused?'▷':'Ⅱ';if(pageMotionPaused){stop();stopHero();}else{start();startHero();}};
  motionToggle.addEventListener('click',()=>{pageMotionPaused=!pageMotionPaused;syncPageMotion();});

  const progress=document.querySelector('.scroll-progress i');
  const parallaxItems=[...document.querySelectorAll('.hero-shots,.process-visual>img,.factory-slide img')];
  let ticking=false;
  const updateScroll=()=>{const max=Math.max(document.documentElement.scrollHeight-innerHeight,1);const ratio=Math.min(scrollY/max,1);progress.style.transform=`scaleX(${ratio})`;if(!pageMotionPaused){parallaxItems.forEach(item=>{const rect=item.closest('.hero-visual,.process-visual,.factory-slider').getBoundingClientRect();if(rect.bottom>0&&rect.top<innerHeight){const offset=(rect.top+rect.height/2-innerHeight/2)*-.035;item.style.setProperty('--parallax',`${offset.toFixed(1)}px`);}});}ticking=false;};
  addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(updateScroll);ticking=true;}},{passive:true});
  addEventListener('resize',updateScroll,{passive:true});
  updateScroll();
})();
