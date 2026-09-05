document.addEventListener("DOMContentLoaded", async () => {
  const list = document.getElementById("changelogList");
  if (!list) return;
  try {
    const r = await fetch("../data/changelog.json", { cache: "no-store" });
    if (!r.ok) throw new Error("Changelog kon niet geladen worden");
    const items = await r.json();
    list.innerHTML = items.map((x, i) => `
      <article class="changelog-card ${i === 0 ? 'is-featured' : ''}" tabindex="0" aria-expanded="false">
        <div class="changelog-icon" aria-hidden="true">${escapeHtml(x.emoji || '📝')}</div>
        <div class="changelog-main">
          <div class="changelog-top">
            <span class="changelog-version">${escapeHtml(x.version || 'Update')}</span>
            <span class="changelog-category">${escapeHtml(x.category || 'Update')}</span>
            <time>${escapeHtml(x.date || '')} · ${escapeHtml(x.time || '')}</time>
          </div>
          <div class="changelog-heading"><span class="changelog-heading-icon" aria-hidden="true">📝</span><h2>${escapeHtml(x.title || 'Nieuwe update')}</h2></div>
          <p>${escapeHtml(x.description || '')}</p>
          <div class="changelog-details">
            <div class="changelog-details-inner">
              <div class="changelog-details-grid">
                ${(x.details || []).map(d => `<div class="detail-row"><span class="detail-emoji">${escapeHtml(d[0] || '•')}</span><span class="detail-copy"><strong>${escapeHtml(d[1] || '')}</strong><span>${escapeHtml(d[2] || '')}</span></span></div>`).join('')}
              </div>
            </div>
          </div>
          <div class="changelog-open-hint">Klik om de volledige update te bekijken <span>＋</span></div>
        </div>
      </article>
    `).join('');

    list.querySelectorAll('.changelog-card').forEach(card => {
      const toggle = () => {
        const open = card.classList.toggle('open');
        card.setAttribute('aria-expanded', String(open));
        const hint = card.querySelector('.changelog-open-hint');
        if (hint) hint.innerHTML = open ? 'Klik om de update te sluiten <span>−</span>' : 'Klik om de volledige update te bekijken <span>＋</span>';
      };
      card.addEventListener('click', e => { if (!e.target.closest('a')) toggle(); });
      card.addEventListener('keydown', e => { if ((e.key === 'Enter' || e.key === ' ') && !e.target.closest('a')) { e.preventDefault(); toggle(); } });
    });
  } catch (e) {
    list.innerHTML = '<div class="empty-changelog">De changelog kon momenteel niet worden geladen.</div>';
  }
  function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]))}
  function escapeAttr(s){return escapeHtml(s).replace(/`/g,'&#096;')}
});
