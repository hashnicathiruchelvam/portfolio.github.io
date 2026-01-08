(function(){
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImg');
  const lbCap = document.getElementById('lbCap');
  const lbClose = document.getElementById('lbClose');

  function openLightbox(src, cap){
    lbImg.src = src;
    lbImg.alt = cap || 'Portfolio image';
    lbCap.textContent = cap || '';
    lb.classList.add('is-open');
    lb.setAttribute('aria-hidden','false');
  }

  function closeLightbox(){
    lb.classList.remove('is-open');
    lb.setAttribute('aria-hidden','true');
    lbImg.src = '';
    lbCap.textContent = '';
  }

  document.querySelectorAll('[data-lightbox]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      openLightbox(btn.dataset.lightbox, btn.dataset.caption);
    });
  });

  lbClose?.addEventListener('click', closeLightbox);
  lb?.addEventListener('click', (e)=>{ if(e.target === lb) closeLightbox(); });
  document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') closeLightbox(); });

  // active link highlighting (simple)
  const links = Array.from(document.querySelectorAll('.nav__link'));
  const sections = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);

  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const id = '#'+entry.target.id;
        links.forEach(l=>l.style.borderColor = (l.getAttribute('href')===id) ? 'rgba(74,52,38,.22)' : 'transparent');
        links.forEach(l=>l.style.background = (l.getAttribute('href')===id) ? 'rgba(181,186,145,.18)' : 'transparent');
      }
    });
  }, {rootMargin: '-45% 0px -45% 0px', threshold: 0.01});

  sections.forEach(s=>io.observe(s));
})();