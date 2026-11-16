/* Edit this file to publish projects. No GitHub account/API key is needed. */
const PORTFOLIO_PROJECTS = [
  // Add real projects here. Example (remove the // and replace every sample value):
  // { title: "My PCB Project", category: "pcb", description: "Compact PCB design for ...", tags: ["KiCad", "2-layer"], image: "assets/img/my-project.jpg", github: "https://github.com/YOUR_USERNAME/YOUR_REPOSITORY" },
  // { title: "My Firmware Project", category: "firmware", description: "Custom MCU driver for ...", tags: ["STM32", "C++"], image: "assets/img/my-firmware.jpg", github: "https://github.com/YOUR_USERNAME/YOUR_REPOSITORY" },
];

(() => {
 const track=document.getElementById('project-track');if(!track)return;
 const search=document.getElementById('project-search');const count=document.getElementById('project-count');const empty=document.getElementById('project-empty');
 const prev=document.getElementById('project-prev');const next=document.getElementById('project-next');let category='all';
 const validURL=(url)=>{try{const u=new URL(url);return u.protocol==='https:'&&u.hostname==='github.com'&&u.pathname.split('/').filter(Boolean).length>=2}catch{return false}};
 const safeImage=(path)=>typeof path==='string'&&/^(assets\/img\/)[a-z0-9_./-]+\.(png|jpe?g|webp|svg)$/i.test(path)&&!path.includes('..');
 function render(){
  const q=search.value.trim().toLowerCase();const filtered=PORTFOLIO_PROJECTS.filter(p=>(category==='all'||p.category===category)&&[p.title,p.description,...(p.tags||[])].join(' ').toLowerCase().includes(q)&&validURL(p.github));
  track.replaceChildren();empty.hidden=filtered.length!==0;count.textContent=filtered.length+' project'+(filtered.length===1?'':'s');
  if(!PORTFOLIO_PROJECTS.length){empty.querySelector('h3').textContent='Projects coming soon.';empty.querySelector('p').textContent='Our GitHub portfolio will appear here as projects are added.'}
  else{empty.querySelector('h3').textContent='No projects found.';empty.querySelector('p').textContent='Try another keyword or category.'}
  for(const p of filtered){const card=document.createElement('article');card.className='portfolio-card';const link=document.createElement('a');link.className='portfolio-card-image';link.href=p.github;link.target='_blank';link.rel='noopener noreferrer';link.setAttribute('aria-label','View '+p.title+' on GitHub');
   if(safeImage(p.image)){const img=document.createElement('img');img.src=p.image;img.alt=p.title+' project preview';img.loading='lazy';link.append(img)}else{const fallback=document.createElement('div');fallback.className='portfolio-image-placeholder';fallback.textContent=p.category==='pcb'?'PCB DESIGN':'EMBEDDED FIRMWARE';link.append(fallback)}
   const body=document.createElement('div');body.className='portfolio-card-body';const type=document.createElement('div');type.className='portfolio-card-type';type.textContent=p.category==='pcb'?'PCB Design':'Programming';const title=document.createElement('h3');title.textContent=p.title;const desc=document.createElement('p');desc.textContent=p.description;const tags=document.createElement('div');tags.className='portfolio-tags';for(const tag of p.tags||[]){const span=document.createElement('span');span.textContent=tag;tags.append(span)}const repo=document.createElement('a');repo.className='portfolio-github';repo.href=p.github;repo.target='_blank';repo.rel='noopener noreferrer';repo.textContent='View on GitHub ↗';body.append(type,title,desc,tags,repo);card.append(link,body);track.append(card)}
  track.scrollLeft=0;updateArrows();
 }
 function updateArrows(){prev.disabled=track.scrollLeft<5;next.disabled=track.scrollLeft+track.clientWidth>=track.scrollWidth-5}
 document.querySelectorAll('[data-category]').forEach(b=>b.addEventListener('click',()=>{category=b.dataset.category;document.querySelectorAll('[data-category]').forEach(x=>{const selected=x===b;x.classList.toggle('selected',selected);x.setAttribute('aria-pressed',String(selected))});render()}));
 search.addEventListener('input',render);prev.addEventListener('click',()=>track.scrollBy({left:-track.clientWidth*.85,behavior:'smooth'}));next.addEventListener('click',()=>track.scrollBy({left:track.clientWidth*.85,behavior:'smooth'}));track.addEventListener('scroll',updateArrows,{passive:true});window.addEventListener('resize',updateArrows);render();
})();
