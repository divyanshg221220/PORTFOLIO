// Main JS for portfolio
// - toggles dark theme
// - toggles mobile header menu
// - smooth-scroll for internal links

(function(){
  'use strict';

  const body = document.body;
  const themeToggle = document.getElementById('theme-toggle');
  const headerToggle = document.getElementById('header-toggle');
  const headerMenu = document.getElementById('header-menu');

  // Load saved theme
  try{
    const saved = localStorage.getItem('theme');
    if(saved === 'dark') body.classList.add('dark');
  }catch(e){/* ignore */}

  if(themeToggle){
    themeToggle.addEventListener('click', ()=>{
      body.classList.toggle('dark');
      try{ localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light'); }catch(e){}
    });
  }

  if(headerToggle && headerMenu){
    headerToggle.addEventListener('click', ()=>{
      headerMenu.classList.toggle('open');
    });
  }

  // Smooth scroll for in-page links
  document.addEventListener('click', (e)=>{
    const a = e.target.closest('a[href^="#"]');
    if(!a) return;
    const href = a.getAttribute('href');
    if(href === '#' || href === '') return;
    const target = document.querySelector(href);
    if(target){
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth',block:'start'});
    }
  });

})();
