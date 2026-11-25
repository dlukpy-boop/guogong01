import { STEPS } from './scene-config.js';
import { updateExpansion, entryIndexById } from './expansion.js';

// 全站共用一套前後頁導航；保留原版1905/1912的逐段揭示。
export function initNavigation(stage) {
  const prev = document.getElementById('prev');
  const next = document.getElementById('next');
  const cStart=entryIndexById('c1917',STEPS);
  let ix=0;
  function go(n){
    ix=Math.max(0,Math.min(STEPS.length-1,n));
    const x=STEPS[ix];
    stage.dataset.scene=x.s;
    stage.dataset.reveal=x.r;
    updateExpansion(x,(ix+1)/STEPS.length);
    prev.disabled=ix===0;
    next.disabled=ix===STEPS.length-1;
    prev.title=prev.disabled?'目前是封面':'上一個畫面';
    next.title=next.disabled?'課堂總結':'下一個畫面';
    const indicator=document.getElementById('scene-indicator');
    indicator.textContent=ix<2?'國共合作 1.0':(x.s==='history'?'國民黨沿革 · 1905':(x.s==='history1912'?'國民黨沿革 · 1912':'國共合作 1.0 · 教學場景'));
    document.querySelectorAll('#timeline .t').forEach((el,i)=>{
      const active=x.s==='history'?i===0:x.s==='history1912'?i===1:x.s==='exp'&&x.id==='k1914'?i===2:x.s==='exp'&&x.id==='k1919'?i===3:false;
      el.classList.toggle('active',active);
    });
    const kChoice=document.getElementById('choiceK');
    const cChoice=document.getElementById('choiceC');
    kChoice?.setAttribute('aria-label','開始國民黨發展');
    cChoice?.setAttribute('aria-label','開始共產黨發展');
    const exp=document.getElementById('expansion');
    if(exp)exp.setAttribute('aria-hidden',x.s==='exp'?'false':'true');
    stage.dataset.step=String(ix+1);
    stage.dataset.total=String(STEPS.length);
  }
  prev.addEventListener('click',()=>go(ix===cStart?1:ix-1));
  next.addEventListener('click',()=>go(ix+1));
  document.getElementById('home').addEventListener('click',()=>go(0));
  document.getElementById('choiceK').addEventListener('click',()=>go(2));
  const cChoice=document.getElementById('choiceC');
  if(cChoice){ cChoice.disabled=false;cChoice.removeAttribute('title');cChoice.addEventListener('click',()=>go(cStart)); }
  addEventListener('keydown',e=>{
    if((['ArrowRight','PageDown'].includes(e.key) || (e.key===' ' && !['BUTTON','A'].includes(document.activeElement?.tagName))) && !['INPUT','TEXTAREA'].includes(document.activeElement?.tagName)) {
      e.preventDefault();go(ix+1);
    }else if(['ArrowLeft','PageUp'].includes(e.key) && !['INPUT','TEXTAREA'].includes(document.activeElement?.tagName)){
      e.preventDefault();go(ix===cStart?1:ix-1);
    }else if(e.key==='Home'||e.key==='Escape'){e.preventDefault();go(0);}
  });
  go(0);
  return {go,steps:STEPS};
}
