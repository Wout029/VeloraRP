document.addEventListener('DOMContentLoaded',()=>{
  const nav=document.getElementById('navlinks');
  const community=document.getElementById('community');
  const communityBtn=document.getElementById('communityBtn');

  communityBtn?.addEventListener('click',e=>{
    e.stopPropagation();
    const open=!community?.classList.contains('open');
    community?.classList.toggle('open',open);
    communityBtn?.setAttribute('aria-expanded',String(open));
  });

  document.addEventListener('click',e=>{
    if(community && !community.contains(e.target)){
      community.classList.remove('open');
      communityBtn?.setAttribute('aria-expanded','false');
    }
  });

  nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
    community?.classList.remove('open');
    communityBtn?.setAttribute('aria-expanded','false');
  }));

  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'){
      community?.classList.remove('open');
      communityBtn?.setAttribute('aria-expanded','false');
    }
  });
});
