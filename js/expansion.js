import { SCENES } from './expansion-data.js';
const byId = Object.fromEntries(SCENES.map(s=>[s.id,s]));
const escapeHTML = s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const labelSide = {k:'國民黨發展',c:'共產黨發展',join:'走向合作',north:'北伐與統一',bridge:'合作的背景'};
function viz(scene){
  const items=scene.visualItems||[];
  let inner='';
  if(scene.type==='flag') {
     inner=`<div class="gg-flagrow"><div class="gg-flag old"><span class="gg-flag-inner">東北原有旗幟</span></div><span class="gg-swap">→</span><div class="gg-flag new"><span class="gg-flag-inner">更換國旗</span></div></div>`;
  } else if(scene.type==='contrast'){
     inner=`<div class="gg-contrasts"><button class="gg-contrast selected" data-view="0" type="button"><b>名義上</b><small>承認同一中央政府</small></button><button class="gg-contrast" data-view="1" type="button"><b>實際上</b><small>地方軍閥仍有實權</small></button></div><div class="gg-contrast-detail" id="gg-contrast-detail">南京國民政府成為全國的中央政府。</div>`;
  } else if(scene.type==='route'){
     inner='<div class="gg-route" role="img" aria-label="北伐路線的非比例示意圖"><div class="gg-route-track"></div>'+
       ['廣州','長沙','武漢','南昌','南京／上海','北京','瀋陽'].map((p,i)=>`<div class="gg-route-node ${scene.id==='north26'&&i===0?'on':''} ${scene.id==='north-win'&&i<=3?'on':''} ${scene.id==='north-resume'&&i<=5?'on':''}"><span>${escapeHTML(p)}</span></div>`).join('')+'</div><div class="gg-maplabel">地點次序示意｜非按真實比例繪製</div>';
  } else if(scene.type==='policies') {
     inner='<div class="gg-policies">'+items.map((v,i)=>`<button type="button" class="gg-policy ${i===0?'selected':''}" data-policy="${i}"><span>${escapeHTML(v)}</span><small>${['向蘇聯尋求支援','讓共產黨員以個人名義加入','重視工人與農民'][i]}</small></button>`).join('')+'</div>';
  } else if(scene.type==='split') {
     inner='<div class="gg-split"><div><b>軍事進展</b><span>攻佔上海、南京</span></div><div><b>政治分裂</b><span>上海清黨、寧漢分裂</span></div></div>';
  } else {
    inner='<div class="gg-steps">'+items.map((v,i)=>`<div class="gg-step"><span class="gg-step-no">${String(i+1).padStart(2,'0')}</span><span>${escapeHTML(v)}</span></div>`).join('')+'</div>';
  }
  return `<div class="gg-visual-heading"><span class="gg-visual-glyph">◇</span> ${escapeHTML(scene.visualTitle)}</div>${inner}<div class="gg-placeholder"><span>▧</span> ${escapeHTML(scene.note||'歷史插畫位置預留')}</div>`;
}
function render(scene){
  const holder=document.getElementById('expansion');
  if(!holder||!scene) return;
  holder.innerHTML=`<div class="gg-exp-header"><div class="gg-kicker">${escapeHTML(labelSide[scene.side])} <span class="gg-kicker-rule"></span> ${escapeHTML(scene.tag)}</div><h1><span class="gg-year">${escapeHTML(scene.year)}</span><i aria-hidden="true"></i>${escapeHTML(scene.title)}</h1><div class="gg-title-rule"><b></b></div></div>
   <section class="gg-left gg-fade">${viz(scene)}</section>
   <section class="gg-right gg-fade"><div class="gg-facts">${scene.facts.map((f,i)=>`<article class="gg-fact"><span class="gg-dot">◆</span><div><strong>${escapeHTML(f[0])}</strong><p>${escapeHTML(f[1])}</p></div></article>`).join('')}</div>${scene.id==='unification'?'<div class="gg-ask">思考：中央政府成立，是否就等於完全統一？</div>':''}</section>
   <footer class="gg-exp-footer"><div class="gg-foot-label">${escapeHTML(labelSide[scene.side])}</div><div class="gg-foot-track"><span class="gg-foot-fill"></span></div><span class="gg-foot-index">${escapeHTML(scene.year)}</span></footer>`;
  holder.querySelectorAll('[data-policy]').forEach(btn=>btn.addEventListener('click',()=>{
    holder.querySelectorAll('[data-policy]').forEach(b=>b.classList.remove('selected'));btn.classList.add('selected');
  }));
  holder.querySelectorAll('[data-view]').forEach(btn=>btn.addEventListener('click',()=>{
    holder.querySelectorAll('[data-view]').forEach(b=>b.classList.remove('selected'));btn.classList.add('selected');
    holder.querySelector('#gg-contrast-detail').textContent=btn.dataset.view==='0'?'南京國民政府成為全國的中央政府。':'地方軍閥仍保留軍隊及地方實際控制權，國共武裝對立未止。';
  }));
}
let activeId='';
export function updateExpansion(x,progress){
  const stage=document.getElementById('stage');
  if(x?.s!=='exp') {stage.removeAttribute('data-branch');return;}
  if(x.id!==activeId){activeId=x.id;render(byId[x.id]);}
  stage.dataset.branch=x.side;
  const f=document.querySelector('#expansion .gg-foot-fill');
  if(f)f.style.width=Math.max(3,Math.min(100,progress*100))+'%';
}
export function entryIndexById(id, steps){return steps.findIndex(x=>x.id===id)};
