document.addEventListener('DOMContentLoaded',()=>{
  const cards=document.querySelectorAll('.discord-card, .main-discord-card');
  cards.forEach((card,i)=>{
    card.style.animation=`floatIn .72s ${i*.1}s both`;
    card.addEventListener('pointermove',e=>{
      if(window.matchMedia('(max-width: 900px)').matches) return;
      const r=card.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width-.5;
      const y=(e.clientY-r.top)/r.height-.5;
      card.style.setProperty('--tilt-x',`${(-y*1.8).toFixed(2)}deg`);
      card.style.setProperty('--tilt-y',`${(x*1.8).toFixed(2)}deg`);
    },{passive:true});
    card.addEventListener('pointerleave',()=>{card.style.removeProperty('--tilt-x');card.style.removeProperty('--tilt-y');});
  });
});
