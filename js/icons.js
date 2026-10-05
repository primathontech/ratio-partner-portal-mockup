/* Ratio Partner Portal mockup — icon set v2.
   Stroke-outline icons (24px grid, currentColor stroke) matching the current
   Ratio design system (see naman-prima/ratio-website: src/components/admin/ui.tsx).
   Paths are reused verbatim from that design system where a direct match
   exists; a few (lock, eye, info, kebab) are hand-authored in the same style
   since the source set doesn't define them. */
const ICON_PATHS = {
  home: 'M4 10.5 12 4l8 6.5V20h-5.5v-5.5h-5V20H4z',
  apps: 'M4 4h7v7H4zm9 0h7v7h-7zM4 13h7v7H4zm9 3.5h7M16.5 13v7',
  stores: 'M4 10v10h16V10M3 10l2-6h14l2 6M3 10c0 1.7 1.3 3 3 3s3-1.3 3-3c0 1.7 1.3 3 3 3s3-1.3 3-3c0 1.7 1.3 3 3 3s3-1.3 3-3',
  team: 'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 10a7 7 0 0 1 14 0m1-10a3 3 0 1 0 0-6m3 16a6 6 0 0 0-3-5',
  settings: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm7.4-3a7.4 7.4 0 0 0-.1-1.2l2-1.6-2-3.4-2.4 1a7.3 7.3 0 0 0-2-1.2L14.5 3h-4l-.4 2.6a7.3 7.3 0 0 0-2 1.2l-2.4-1-2 3.4 2 1.6a7.4 7.4 0 0 0 0 2.4l-2 1.6 2 3.4 2.4-1a7.3 7.3 0 0 0 2 1.2l.4 2.6h4l.4-2.6a7.3 7.3 0 0 0 2-1.2l2.4 1 2-3.4-2-1.6c.1-.4.1-.8.1-1.2Z',
  search: 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm5-2 5 5',
  bell: 'M6 16V11a6 6 0 1 1 12 0v5l1.5 2h-15zM10 20.5a2 2 0 0 0 4 0',
  caret: 'm6 9 6 6 6-6',
  plus: 'M12 5v14M5 12h14',
  check: 'm5 12 5 5 9-10',
  close: 'M6 6l12 12M18 6 6 18',
  kebab: 'M12 5h.01M12 12h.01M12 19h.01',
  lock: 'M6 10V7a6 6 0 1 1 12 0v3M5 10h14v10H5z',
  eye: 'M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z',
  copy: 'M9 9h11v11H9zM5 15H4V4h11v1',
  trend: 'M4 20V10m6 10V4m6 16v-7m4 7H2',
  upload: 'M12 15V4m0 0L8 8m4-4 4 4M5 19h14',
  download: 'M12 4v11m0 0-4-4m4 4 4-4M5 19h14',
  externalLink: 'M14 4h6v6M20 4l-9 9M18 14v6H4V6h6',
  card: 'M3 6h18v12H3zM3 10h18M7 15h3',
  info: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 11v6M12 7h.01',
  menu: 'M4 7h16M4 12h16M4 17h16'
};

function icon(name, size) {
  size = size || 16;
  var d = ICON_PATHS[name];
  if (!d) return '';
  var svg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="' + d + '"/></svg>';
  return '<span class="rp-icon" style="width:' + size + 'px;height:' + size + 'px">' + svg + '</span>';
}

/* Shared mobile nav toggle for the pre-auth marketing pages (landing, docs,
   pricing, support, changelog, terms, privacy) — none of them load shell.js. */
function toggleMarketingNav() {
  var el = document.getElementById('marketing-mobile-panel');
  if (el) el.classList.toggle('open');
}
