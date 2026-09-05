document.addEventListener("DOMContentLoaded",()=>{
  const m=document.getElementById("teamModal"); if(!m)return;
  const n=document.getElementById("teamModalName"),r=document.getElementById("teamModalRole"),a=document.getElementById("teamModalAvatar"),t=document.getElementById("teamModalText");
  const map={
    Jay:"../assets/images/people/jay.png",
    Mango:"../assets/images/people/mango.png",
    Niloh:"../assets/images/people/niloh.png",
    Yelthe:"../assets/images/people/yelthe.png",
    Wout:"../assets/images/people/Wout.png"
  };
  const info={
    Jay:"Eigenaar van Velora RP",
    Mango:"Eigenares van Velora RP",
    Niloh:"Management & Lead dev",
    Yelthe:"Headstaff",
    Wout:"Web developer"
  };
  const close=()=>{m.classList.remove("show");m.setAttribute("aria-hidden","true");document.body.style.overflow=""};
  document.querySelectorAll(".team-card").forEach(c=>c.addEventListener("click",()=>{
    const name=c.dataset.person; n.textContent=name; r.textContent=c.dataset.role;
    if(t) t.textContent=info[name]||"Onderdeel van het team achter Velora RP.";
    const src=map[name]||""; a.style.backgroundImage=`url("${src}")`;
    m.classList.add("show");m.setAttribute("aria-hidden","false");document.body.style.overflow="hidden";
  }));
  document.getElementById("teamClose")?.addEventListener("click",close);
  m.addEventListener("click",e=>{if(e.target===m)close()});
  document.addEventListener("keydown",e=>{if(e.key==="Escape")close()});
});
