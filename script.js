// Menu toggle
const menu = document.getElementById("menu");
document.getElementById("burger").onclick = () => menu.classList.toggle("open");
menu.querySelectorAll("a").forEach(a => a.onclick = () => menu.classList.remove("open"));

// Services (Flask API, fallback if opened as plain file)
const FALLBACK = [
  {icon:"🚗",title:"Ride Services",text:"Bikes, cars aur rickshaw ke liye verified drivers."},
  {icon:"🛒",title:"E-Commerce Marketplace",text:"Verified vendors ke saath digital store."},
  {icon:"👛",title:"Digital Wallet",text:"Instant top-up, transfer aur cashout."},
  {icon:"🎁",title:"Daily Rewards",text:"Loyalty points aur daily bonus."},
  {icon:"⚖️",title:"Legal Services",text:"Licensed lawyers se rabta."},
  {icon:"🏠",title:"Real Estate",text:"Property buy, sell aur rent."}
];
function renderServices(list){
  document.getElementById("serviceGrid").innerHTML = list.map(s =>
    `<div class="card reveal"><div class="ic">${s.icon}</div><h3>${s.title}</h3><p>${s.text}</p></div>`).join("");
  observe();
}
fetch("/api/services").then(r=>r.json()).then(renderServices).catch(()=>renderServices(FALLBACK));

// Scroll reveal + counters
function observe(){
  const io = new IntersectionObserver(es => es.forEach(e => {
    if(e.isIntersecting){e.target.classList.add("show");io.unobserve(e.target);}
  }),{threshold:.15});
  document.querySelectorAll(".reveal:not(.show)").forEach(el=>io.observe(el));
}
document.querySelectorAll(".card,.shot,.stat").forEach(el=>el.classList.add("reveal"));
observe();
document.querySelectorAll("[data-n]").forEach(el=>{
  const end=+el.dataset.n;let n=0;const step=Math.max(1,Math.ceil(end/60));
  const t=setInterval(()=>{n=Math.min(end,n+step);el.textContent=n;if(n>=end)clearInterval(t)},25);
});

// Chat
const box=document.getElementById("chatBox"),msgs=document.getElementById("msgs"),inp=document.getElementById("chatInput");
document.getElementById("chatBtn").onclick=()=>box.hidden=!box.hidden;
document.getElementById("chatClose").onclick=()=>box.hidden=true;
function add(t,c){const d=document.createElement("div");d.className="msg "+c;d.textContent=t;msgs.appendChild(d);msgs.scrollTop=msgs.scrollHeight;}
document.getElementById("chatForm").onsubmit=async e=>{
  e.preventDefault();const m=inp.value.trim();if(!m)return;add(m,"me");inp.value="";
  try{
    const r=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:m})});
    add((await r.json()).reply,"bot");
  }catch{add("Demo reply: server connect nahi hai, lekin chat UI kaam kar rahi hai.","bot");}
};
