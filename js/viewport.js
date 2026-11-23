// Preserve the original 1600 × 900 canvas and fit scaling.
export function initViewport(stage) {
  function fit() {
    const f = Math.min(innerWidth / 1600, innerHeight / 900);
    stage.style.transform = `translate(-50%,-50%) scale(${f})`;
  }
  addEventListener('resize', fit);
  fit();
}
