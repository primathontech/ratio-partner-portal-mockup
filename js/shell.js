/* Ratio Partner Portal mockup — shared app shell v2.
   Sidebar holds everything (logo, search, nav, account, notifications) with
   no persistent desktop top bar — matches the current Ratio design system's
   admin shell (see naman-prima/ratio-website: src/components/admin/shell.tsx).
   On mobile, the sidebar becomes an off-canvas drawer behind a slim fixed bar.
   Expects two elements on the page: #shell-topbar (becomes the mobile bar),
   #shell-sidenav (becomes the sidebar). */

var SHELL_NAV_ITEMS = [
  { key: 'home', label: 'Home', href: 'home.html', icon: 'home' },
  { key: 'apps', label: 'Apps', href: 'apps.html', icon: 'apps' },
  { key: 'stores', label: 'Stores', href: 'stores.html', icon: 'stores' },
  { key: 'team', label: 'Team', href: 'team.html', icon: 'team' },
  { key: 'settings', label: 'Settings', href: 'settings.html', icon: 'settings' }
];

var SHELL_SEARCH_INDEX = [
  { group: 'Apps', label: 'Wishlist Pro', href: 'app-detail.html' },
  { group: 'Apps', label: 'Loyalty Points', href: 'app-detail.html' },
  { group: 'Apps', label: 'Size Finder', href: 'app-detail.html' },
  { group: 'Stores', label: 'Nutristar Digital (dev)', href: 'stores.html' },
  { group: 'Stores', label: 'Wellversed', href: 'stores.html' },
  { group: 'Team', label: 'Asha Rao', href: 'team.html' },
  { group: 'Team', label: 'Karan Shah', href: 'team.html' },
  { group: 'Team', label: 'Priya Nair', href: 'team.html' }
];

function renderShell(opts) {
  opts = opts || {};
  var active = opts.active || 'home';
  var orgName = opts.orgName || 'Nutristar Digital';
  var orgRole = opts.orgRole || 'Organisation Owner';
  var userName = opts.userName || 'Asha Rao';
  var userEmail = opts.userEmail || 'asha@nutristar.in';
  var canApps = opts.canApps !== false;
  var canStores = opts.canStores !== false;
  var canTeam = opts.canTeam !== false;
  var canSettings = opts.canSettings !== false;
  var orgInitials = orgName.split(' ').map(function (w) { return w[0]; }).join('').slice(0, 2).toUpperCase();

  var topbarEl = document.getElementById('shell-topbar');
  var sidenavEl = document.getElementById('shell-sidenav');
  var navItems = SHELL_NAV_ITEMS.filter(function (i) {
    if (i.key === 'apps') return canApps;
    if (i.key === 'stores') return canStores;
    if (i.key === 'team') return canTeam;
    if (i.key === 'settings') return canSettings;
    return true;
  });

  var navHtml = navItems.map(function (i) {
    return '<a href="' + i.href + '" class="' + (i.key === active ? 'active' : '') + '">' + icon(i.icon, 16) + '<span>' + i.label + '</span></a>';
  }).join('');

  var acctMenuHtml =
    '<div id="acct-menu" class="dropdown-panel up" style="left:0;width:260px">' +
      '<div style="padding:8px 6px">' +
        '<div class="menu-item" style="border-radius:6px;background:var(--line-100)"><span class="org-avatar" style="width:24px;height:24px;font-size:11px;margin-right:10px">' + orgInitials + '</span>' + orgName + '<span style="margin-left:auto">' + icon('check', 12) + '</span></div>' +
        '<div class="menu-item" style="border-radius:6px"><span class="org-avatar" style="width:24px;height:24px;font-size:11px;margin-right:10px">WA</span>Wellversed Agency</div>' +
      '</div>' +
      '<div style="border-top:1px solid var(--line-100);padding:6px">' +
        '<div class="menu-item" style="border-radius:6px">' + icon('plus', 14) + '<span style="margin-left:8px">Create organisation</span></div>' +
      '</div>' +
      '<div style="border-top:1px solid var(--line-100);padding:8px 14px 6px"><div style="font:500 14px/20px var(--font-sans);color:var(--ink-900)">' + userName + '</div><div style="font:400 12px/16px var(--font-sans);color:var(--text-muted)">' + userEmail + '</div></div>' +
      '<div style="padding:6px"><div class="menu-item" style="border-radius:6px">Profile</div></div>' +
      '<div style="padding:6px 6px 8px;border-top:1px solid var(--line-100)"><a href="landing.html" class="menu-item" style="border-radius:6px">Log out</a><a href="landing.html" class="menu-item" style="border-radius:6px">Log out everywhere</a></div>' +
    '</div>';

  var notifMenuHtml =
    '<div id="notif-menu" class="dropdown-panel up" style="left:0;width:min(340px,calc(100vw - 24px))">' +
      '<div style="display:flex;align-items:center;justify-content:space-between;padding:12px 14px;border-bottom:1px solid var(--line-100)"><span style="font:500 14px/20px var(--font-sans);color:var(--ink-900)">Notifications</span><span style="font:400 12px/16px var(--font-sans);color:var(--accent);cursor:pointer">Mark all as read</span></div>' +
      '<div>' +
        '<div class="menu-item" style="height:auto;padding:12px 14px;flex-direction:column;align-items:flex-start;gap:2px;border-bottom:1px solid var(--line-100)"><span>You were invited to Wellversed Agency</span><span style="font:400 12px/16px var(--font-sans);color:var(--text-muted)">Team &middot; 2h ago</span></div>' +
        '<div class="menu-item" style="height:auto;padding:12px 14px;flex-direction:column;align-items:flex-start;gap:2px;border-bottom:1px solid var(--line-100)"><span>Collaborator access approved on wellversed.ratio.win</span><span style="font:400 12px/16px var(--font-sans);color:var(--text-muted)">Stores &middot; 5h ago</span></div>' +
        '<div class="menu-item" style="height:auto;padding:12px 14px;flex-direction:column;align-items:flex-start;gap:2px"><span>Grant expires in 7 days on nutristar.ratio.win</span><span style="font:400 12px/16px var(--font-sans);color:var(--text-muted)">Stores &middot; Yesterday</span></div>' +
      '</div>' +
    '</div>';

  var sidenavHtml =
    '<div class="sidenav" id="sidenav-root">' +
      '<a href="home.html" class="sidenav-logo" style="text-decoration:none"><span class="rp-logo">Ratio</span></a>' +
      '<div class="dropdown search-box">' +
        icon('search', 14) +
        '<input id="shell-search-input" placeholder="Search apps, stores and team" oninput="shellSearch(this.value)" onfocus="openDropdown(\'search-results\')">' +
        '<div id="search-results" class="dropdown-panel" style="top:42px;left:0;right:0;max-height:360px;overflow-y:auto;padding:6px 0"></div>' +
      '</div>' +
      '<nav class="sidenav-nav">' + navHtml + '</nav>' +
      '<div class="sidenav-footer">' +
        '<div class="dropdown" style="flex:1;min-width:0">' +
          '<div class="sidenav-account" onclick="toggleDropdown(\'acct-menu\')">' +
            '<span class="org-avatar">' + orgInitials + '</span>' +
            '<span class="org-meta"><span class="name">' + orgName + '</span><span class="role">' + orgRole + '</span></span>' +
            icon('caret', 14) +
          '</div>' +
          acctMenuHtml +
        '</div>' +
        '<div class="dropdown">' +
          '<div class="btn-icon" onclick="toggleDropdown(\'notif-menu\')" style="position:relative">' +
            icon('bell', 16) +
            '<span style="position:absolute;top:5px;right:6px;min-width:14px;height:14px;padding:0 3px;box-sizing:border-box;border-radius:4px;background:var(--accent);box-shadow:0 0 0 1.5px #fff;font:600 9px/14px var(--font-sans);color:#fff;text-align:center">3</span>' +
          '</div>' +
          notifMenuHtml +
        '</div>' +
      '</div>' +
    '</div>';

  if (sidenavEl) sidenavEl.outerHTML = sidenavHtml;

  if (topbarEl) {
    topbarEl.outerHTML =
      '<div class="mobilebar">' +
        '<div class="btn-icon" onclick="openMobileNav()">' + icon('menu', 18) + '</div>' +
        '<a href="landing.html" class="rp-logo" style="text-decoration:none;font-size:17px">Ratio</a>' +
        '<span style="flex:1"></span>' +
        '<div class="dropdown">' +
          '<div class="btn-icon" onclick="toggleDropdown(\'mobile-notif-menu\')" style="position:relative">' +
            icon('bell', 17) +
            '<span style="position:absolute;top:5px;right:6px;min-width:14px;height:14px;padding:0 3px;box-sizing:border-box;border-radius:4px;background:var(--accent);box-shadow:0 0 0 1.5px #fff;font:600 9px/14px var(--font-sans);color:#fff;text-align:center">3</span>' +
          '</div>' +
          notifMenuHtml.replace('id="notif-menu"', 'id="mobile-notif-menu"').replace('dropdown-panel up', 'dropdown-panel').replace('left:0;width:', 'right:0;top:44px;width:') +
        '</div>' +
      '</div>' +
      '<div id="mobile-scrim" class="mobile-scrim" onclick="closeMobileNav()"></div>';
  }
}

function openMobileNav() {
  var el = document.getElementById('sidenav-root');
  if (el) el.classList.add('open');
  var scrim = document.getElementById('mobile-scrim');
  if (scrim) scrim.classList.add('open');
}
function closeMobileNav() {
  var el = document.getElementById('sidenav-root');
  if (el) el.classList.remove('open');
  var scrim = document.getElementById('mobile-scrim');
  if (scrim) scrim.classList.remove('open');
}

function shellSearch(q, panelId) {
  panelId = panelId || 'search-results';
  var panel = document.getElementById(panelId);
  if (!panel) return;
  q = (q || '').trim().toLowerCase();
  if (!q) { panel.innerHTML = ''; closeDropdown(panelId); return; }
  var hits = SHELL_SEARCH_INDEX.filter(function (it) { return it.label.toLowerCase().indexOf(q) !== -1; });
  openDropdown(panelId);
  if (!hits.length) {
    panel.innerHTML = '<div style="padding:14px 12px;font:400 14px/20px var(--font-sans);color:var(--text-muted)">No results for “' + q + '”</div>';
    return;
  }
  var groups = {};
  hits.forEach(function (h) { (groups[h.group] = groups[h.group] || []).push(h); });
  panel.innerHTML = Object.keys(groups).map(function (g) {
    return '<div style="padding:8px 12px 4px;font:500 12px/16px var(--font-sans);text-transform:uppercase;color:var(--text-muted)">' + g + '</div>' +
      groups[g].map(function (it) {
        return '<a href="' + it.href + '" class="menu-item">' + it.label + '</a>';
      }).join('');
  }).join('');
}

/* ---------- Generic interaction helpers (dropdowns, modals, tabs, accordions) ---------- */
function toggleDropdown(id) {
  var el = document.getElementById(id);
  if (!el) return;
  var willOpen = !el.classList.contains('open');
  document.querySelectorAll('.dropdown-panel.open').forEach(function (p) { p.classList.remove('open'); });
  if (willOpen) el.classList.add('open');
}
function openDropdown(id) {
  document.querySelectorAll('.dropdown-panel.open').forEach(function (p) { if (p.id !== id) p.classList.remove('open'); });
  var el = document.getElementById(id);
  if (el) el.classList.add('open');
}
function closeDropdown(id) {
  var el = document.getElementById(id);
  if (el) el.classList.remove('open');
}
document.addEventListener('click', function (e) {
  if (!e.target.closest('.dropdown')) {
    document.querySelectorAll('.dropdown-panel.open').forEach(function (p) { p.classList.remove('open'); });
  }
});

function openModal(id) {
  var el = document.getElementById(id);
  if (el) el.classList.add('open');
}
function closeModal(id) {
  var el = document.getElementById(id);
  if (el) el.classList.remove('open');
}

function switchTab(groupName, key, evt) {
  document.querySelectorAll('[data-tabgroup="' + groupName + '"]').forEach(function (el) {
    el.classList.toggle('active', el.getAttribute('data-tabkey') === key);
  });
  document.querySelectorAll('[data-panelgroup="' + groupName + '"]').forEach(function (el) {
    el.style.display = (el.getAttribute('data-panelkey') === key) ? '' : 'none';
  });
  if (evt) evt.preventDefault();
}

function toggleAccordion(id) {
  var el = document.getElementById(id);
  if (el) el.classList.toggle('open');
}

var _toastTimer = null;
function showToast(text) {
  var el = document.getElementById('toast');
  if (!el) return;
  el.textContent = text;
  el.classList.add('open');
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(function () { el.classList.remove('open'); }, 3200);
}

function toggleCheck(el) {
  if (el.classList.contains('disabled-checked')) return;
  el.classList.toggle('checked');
  el.innerHTML = el.classList.contains('checked') ? icon('check', 9) : '';
  if (el.classList.contains('checked')) {
    el.querySelector('.rp-icon').style.color = '#fff';
  }
}

function toggleSwitch(el) {
  el.classList.toggle('on');
}

/* Auto-fill any statically-marked .checkbox.checked / .disabled-checked that
   has no content yet, so pages don't need a bespoke init line for each one. */
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.checkbox.checked, .checkbox.disabled-checked').forEach(function (el) {
    if (!el.innerHTML.trim()) el.innerHTML = icon('check', 9);
  });
});
