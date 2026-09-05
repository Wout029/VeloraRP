document.addEventListener("DOMContentLoaded",()=>{
  const modal=document.getElementById("trailerModal");
  const open=document.getElementById("openTrailer");
  const closeBtn=document.getElementById("closeTrailer");
  const video=document.getElementById("trailerVideo");
  if(!modal||!open||!closeBtn||!video)return;
  const close=()=>{ modal.classList.remove("show"); modal.setAttribute("aria-hidden","true"); document.body.style.overflow=""; video.pause(); video.currentTime=0; };
  open.addEventListener("click", async()=>{ modal.classList.add("show"); modal.setAttribute("aria-hidden","false"); document.body.style.overflow="hidden"; video.currentTime=0; try{await video.play();}catch(e){} });
  closeBtn.addEventListener("click",close);
  modal.addEventListener("click",e=>{if(e.target===modal)close();});
  document.addEventListener("keydown",e=>{if(e.key==="Escape")close();});
});
