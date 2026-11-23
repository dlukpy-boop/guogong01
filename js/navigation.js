import { STEPS } from './scene-config.js';

// Navigation is still the original one-click-per-reveal behavior.
export function initNavigation(stage) {
  const prev = document.getElementById('prev');
  const next = document.getElementById('next');
  let ix = 0;
  function go(n) {
    ix = Math.min(STEPS.length - 1, Math.max(0, n));
    const x = STEPS[ix];
    stage.dataset.scene = x.s;
    stage.dataset.reveal = x.r;
    prev.disabled = ix === 0;
    next.disabled = ix === STEPS.length - 1;
    next.title = next.disabled ? '下一站1914尚未製作' : '顯示下一個畫面';
    prev.title = prev.disabled ? '目前是封面' : '回到上一個畫面';
    document.getElementById('scene-indicator').textContent = ix < 2
      ? '國共合作 1.0'
      : `國民黨沿革 · ${x.s === 'history' ? '1905' : '1912'} (${x.r}/3)`;
    document.querySelectorAll('#timeline .t').forEach((el, i) =>
      el.classList.toggle('active', i === (x.s === 'history1912' ? 1 : 0))
    );
  }
  prev.addEventListener('click', () => go(ix - 1));
  next.addEventListener('click', () => go(ix + 1));
  document.getElementById('home').addEventListener('click', () => go(0));
  document.getElementById('choiceK').addEventListener('click', () => go(2));
  addEventListener('keydown', (e) => {
    if (['ArrowRight', 'PageDown', ' '].includes(e.key)) {
      e.preventDefault(); go(ix + 1);
    } else if (['ArrowLeft', 'PageUp'].includes(e.key)) {
      e.preventDefault(); go(ix - 1);
    } else if (e.key === 'Home' || e.key === 'Escape') {
      e.preventDefault(); go(0);
    }
  });
  go(0);
  return { go, steps: STEPS };
}
