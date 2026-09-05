document.addEventListener("DOMContentLoaded",()=>{
  const targets=[...document.querySelectorAll(".server-live")]; if(!targets.length)return;
  const endpoints=["../api/server-status.php","/api/server-status.php","https://frontend.cfx-services.net/api/servers/single/3ygare8","https://servers-frontend.fivem.net/api/servers/single/3ygare8"];
  const paint=(state,count,max)=>targets.forEach(el=>{
    el.classList.remove("online","offline","checking"); el.classList.add(state);
    const s=el.querySelector("[data-status]"),p=el.querySelector("[data-players]");
    if(s)s.textContent=state==="online"?"ONLINE":state==="offline"?"OFFLINE":"SERVER CHECK";
    if(p)p.textContent=count==null?"Niet bereikbaar":max?`${count} / ${max} spelers`:`${count} spelers`;
  });
  async function check(){
    paint("checking",null,null);
    for(const url of endpoints){
      try{
        const r=await fetch(url,{headers:{Accept:"application/json"},cache:"no-store"}); if(!r.ok)continue;
        const j=await r.json(); const d=j.Data||j;
        const count=Number(d.clients ?? d.players?.length ?? d.players?.count); const max=Number(d.svMaxclients ?? d.maxclients ?? d.slots);
        if(Number.isFinite(count)){paint("online",count,Number.isFinite(max)&&max>0?max:null);return;}
      }catch(e){}
    }
    paint("offline",null,null);
  }
  check();setInterval(check,30000);
});
