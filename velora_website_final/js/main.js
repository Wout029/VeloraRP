document.addEventListener('DOMContentLoaded',()=>{
  const items=document.querySelectorAll('.fade');
  if(!('IntersectionObserver' in window)){items.forEach(i=>i.classList.add('show'));return;}
  const io=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('show');io.unobserve(entry.target);}}),{threshold:.12});
  items.forEach(i=>io.observe(i));
});


// Smooth orange hover glow that follows the mouse inside the hovered element.
document.addEventListener('DOMContentLoaded',()=>{
  const selectors='a,button,.card,.community-card,.changelog-teaser,.team-card,.job-card,.rule,.changelog-card';
  document.querySelectorAll(selectors).forEach(el=>{
    el.classList.add('glow-target');
    el.addEventListener('pointermove',e=>{
      const r=el.getBoundingClientRect();
      el.style.setProperty('--mx',`${((e.clientX-r.left)/Math.max(r.width,1))*100}%`);
      el.style.setProperty('--my',`${((e.clientY-r.top)/Math.max(r.height,1))*100}%`);
    },{passive:true});
    el.addEventListener('pointerleave',()=>{
      el.style.removeProperty('--mx');
      el.style.removeProperty('--my');
    });
  });
});
