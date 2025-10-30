/* js/main.js — gedeelde logica
   - Vertraagd tonen van tekstregels (.will-reveal)
   - Knop (.cta) verschijnt later
   - Navigatie via data-next op knop
   - Timings per pagina via <body> data-text-delay, data-button-delay, data-stagger
*/

(function () {
  let started = false;

  function $(sel, scope) { return (scope || document).querySelector(sel); }
  function $all(sel, scope) { return Array.from((scope || document).querySelectorAll(sel)); }

  function revealSequence({ textDelay, buttonDelay, stagger }) {
    const lines = $all('.will-reveal:not(.cta)');
    const btn = $('.cta.will-reveal');

    if (lines.length) {
      setTimeout(() => {
        lines.forEach((el, i) => {
          const extra = Math.max(0, stagger) * i;
          setTimeout(() => el.classList.add('revealed'), extra);
        });
      }, textDelay);
    }
    if (btn) {
      setTimeout(() => {
        btn.classList.add('revealed');
        requestAnimationFrame(() => btn.focus());
      }, buttonDelay);
    }
  }

  function wireButtonNavigation() {
    const btn = $('.cta');
    if (!btn) return;
    const next = btn.getAttribute('data-next');
    if (!next) return;
    btn.addEventListener('click', () => { window.location.href = next; });
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); btn.click(); }
    });
  }

  function initPage() {
    if (started) return;
    started = true;

    const body = document.body;
    const textDelay   = parseInt(body.getAttribute('data-text-delay'), 10)   || 900;
    const buttonDelay = parseInt(body.getAttribute('data-button-delay'), 10) || 2200;
    const stagger     = parseInt(body.getAttribute('data-stagger'), 10)      || 120;

    revealSequence({ textDelay, buttonDelay, stagger });
    wireButtonNavigation();
  }

  window.initPage = initPage;
  document.addEventListener('DOMContentLoaded', initPage);
})();

