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
        '<div class="menu-item" style="border-radius:6px"><span class="org-avatar" style="width:24px;height:24px;font-size:11px;margin-right:10px">BC</span>Bloom Commerce</div>' +
      '</div>' +
      '<div style="border-top:1px solid var(--line-100);padding:6px">' +
        '<div class="menu-item" style="border-radius:6px">' + icon('plus', 14) + '<span style="margin-left:8px">Create organisation</span></div>' +
        '<div class="menu-item" style="border-radius:6px" onclick="openModal(\'invites-modal\')">' + icon('team', 14) + '<span style="margin-left:8px">Invitations</span><span id="invites-badge" style="margin-left:auto;min-width:16px;height:16px;padding:0 4px;box-sizing:border-box;border-radius:8px;background:var(--accent);color:#fff;font:600 10px/16px var(--font-sans);text-align:center">1</span></div>' +
      '</div>' +
      '<div style="border-top:1px solid var(--line-100);padding:8px 14px 6px"><div style="font:500 14px/20px var(--font-sans);color:var(--ink-900)">' + userName + '</div><div style="font:400 12px/16px var(--font-sans);color:var(--text-muted)">' + userEmail + '</div></div>' +
      '<div style="padding:6px"><div class="menu-item" style="border-radius:6px" onclick="openModal(\'profile-modal\')">Profile</div></div>' +
      '<div style="padding:6px 6px 8px;border-top:1px solid var(--line-100)"><a href="landing.html" class="menu-item" style="border-radius:6px">Log out</a><a href="landing.html" class="menu-item" style="border-radius:6px">Log out everywhere</a></div>' +
    '</div>';

  var invitesModalHtml =
    '<div id="invites-modal" class="modal-overlay">' +
      '<div class="modal" style="width:420px;padding:24px">' +
        '<div class="modal-title">Your invitations</div>' +
        '<div class="modal-sub">Organisations that have invited you to join.</div>' +
        '<div id="invites-modal-list" style="margin-top:16px">' +
          '<div class="invite-card-shell" data-org="Bloom Commerce" style="border-radius:10px;box-shadow:0 0 0 1px var(--line-100);padding:14px">' +
            '<div style="display:flex;align-items:center;gap:10px">' +
              '<span style="width:38px;height:38px;border-radius:9px;display:flex;align-items:center;justify-content:center;font:600 14px/18px var(--font-sans);color:#fff;flex-shrink:0;background:var(--ink-900)">BC</span>' +
              '<div style="flex:1;min-width:0">' +
                '<div style="font:600 14px/20px var(--font-sans);color:var(--ink-900)">Bloom Commerce</div>' +
                '<div style="font:400 12px/17px var(--font-sans);color:var(--text-muted);margin-top:1px">Priya Nair invited you as <b style="color:var(--ink-800);font-weight:600">App Developer</b> &middot; expires in 6 days</div>' +
              '</div>' +
            '</div>' +
            '<div style="display:flex;gap:8px;margin-top:12px">' +
              '<span class="btn btn-primary btn-sm" style="flex:1;justify-content:center" onclick="acceptShellInvite(this)">Accept</span>' +
              '<span class="btn btn-secondary btn-sm" style="flex:1;justify-content:center" onclick="declineShellInvite(this)">Decline</span>' +
            '</div>' +
          '</div>' +
          '<div id="invites-modal-empty" style="display:none;text-align:center;padding:24px 0;font:400 13px/19px var(--font-sans);color:var(--text-muted)">No pending invitations.</div>' +
        '</div>' +
        '<div style="display:flex;justify-content:flex-end;margin-top:20px">' +
          '<span class="btn btn-secondary" onclick="closeModal(\'invites-modal\')">Close</span>' +
        '</div>' +
      '</div>' +
    '</div>';

  var otpBoxesHtml = '';
  for (var _i = 0; _i < 6; _i++) otpBoxesHtml += '<input class="otp-box" maxlength="1" oninput="otpNext(this)">';

  var profileModalHtml =
    '<div id="profile-modal" class="modal-overlay">' +
      '<div class="modal" style="width:440px;padding:24px;max-height:86vh;overflow-y:auto">' +

        '<div id="profile-main-view">' +
          '<div class="modal-title">Profile</div>' +
          '<div class="modal-sub">Your personal account &mdash; separate from organisation Settings.</div>' +
          '<div style="margin-top:12px;padding:8px 10px;border-radius:6px;background:var(--danger-bg);font:500 12px/17px var(--font-sans);color:var(--danger-text)">Note for engineering: email changes, password changes and Google linking below will require Ellora support to implement &mdash; these are mockups only.</div>' +

          '<div style="display:flex;align-items:center;gap:12px;margin-top:18px">' +
            '<span style="width:52px;height:52px;border-radius:50%;background:var(--accent-tint);color:var(--accent);display:flex;align-items:center;justify-content:center;font:600 16px/20px var(--font-sans);flex-shrink:0">' +
              userName.split(' ').map(function (w) { return w[0]; }).join('').slice(0, 2).toUpperCase() +
            '</span>' +
            '<span class="btn btn-secondary btn-sm">Change photo</span>' +
          '</div>' +
          '<div style="margin-top:16px"><label class="field-label">Full name</label><input class="input" value="' + userName + '"></div>' +

          '<div style="margin-top:14px"><label class="field-label">Email</label><input class="input" id="profile-email-input" value="' + userEmail + '" data-original="' + userEmail + '" oninput="onProfileEmailInput()"></div>' +
          '<div class="field-help" id="profile-email-help">Changing this will require verifying a one-time code.</div>' +

          '<div style="margin-top:16px;display:flex;align-items:center;justify-content:space-between">' +
            '<label class="field-label" style="margin-bottom:0">Password</label>' +
            '<span class="btn btn-secondary btn-sm" onclick="closeModal(\'profile-modal\');openModal(\'change-password-modal\')">Change password</span>' +
          '</div>' +

          '<div style="margin-top:18px;padding-top:16px;border-top:1px solid var(--line-100)">' +
            '<label class="field-label">Google account</label>' +
            '<div id="google-account-row" style="margin-top:6px"></div>' +
          '</div>' +

          '<div style="margin-top:22px;padding-top:18px;border-top:1px solid var(--line-100)">' +
            '<div style="border-radius:10px;box-shadow:0 0 0 1px var(--danger-border) inset;padding:14px">' +
              '<div style="font:600 14px/20px var(--font-sans);color:var(--danger-text)">Delete your account</div>' +
              '<div style="font:400 13px/19px var(--font-sans);color:var(--ink-500);margin-top:4px">Permanently remove your principal and every organisation membership it holds. This cannot be undone.</div>' +
              '<span class="btn btn-danger btn-sm" style="margin-top:12px">Delete account</span>' +
              '<div style="font:400 12px/16px var(--font-sans);color:var(--ink-300);margin-top:6px">Not yet available &mdash; planned for a future release.</div>' +
            '</div>' +
          '</div>' +

          '<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:20px">' +
            '<span class="btn btn-secondary" onclick="closeModal(\'profile-modal\')">Cancel</span>' +
            '<span class="btn btn-primary" id="profile-save-btn" onclick="saveProfileChanges()">Save changes</span>' +
          '</div>' +
        '</div>' +

        '<div id="profile-otp-view" style="display:none;text-align:center">' +
          '<div class="modal-title" style="font-size:16px">Verify your new email</div>' +
          '<div class="modal-sub">We sent a 6-digit code to <b style="color:var(--ink-900)" id="profile-otp-target"></b>.</div>' +
          '<div style="display:flex;gap:8px;justify-content:center;margin-top:18px">' + otpBoxesHtml + '</div>' +
          '<div class="field-help" id="profile-otp-error" style="display:none;color:var(--danger-text);margin-top:8px"></div>' +
          '<div style="display:flex;justify-content:center;gap:8px;margin-top:20px">' +
            '<span class="btn btn-secondary" onclick="cancelEmailVerification()">&larr; Back</span>' +
            '<span class="btn btn-primary" onclick="verifyProfileEmailOtp()">Verify</span>' +
          '</div>' +
        '</div>' +

      '</div>' +
    '</div>';

  var changePasswordModalHtml =
    '<div id="change-password-modal" class="modal-overlay">' +
      '<div class="modal" style="width:400px;padding:24px">' +
        '<div class="modal-title">Change password</div>' +
        '<div class="modal-sub">Choose a new password for your account.</div>' +
        '<div style="margin-top:12px;padding:8px 10px;border-radius:6px;background:var(--danger-bg);font:500 12px/17px var(--font-sans);color:var(--danger-text)">Note for engineering: this flow will require Ellora support to implement.</div>' +
        '<div style="margin-top:16px"><label class="field-label">Current password</label><input class="input" type="password" id="cp-current" oninput="validateChangePassword()"></div>' +
        '<div style="margin-top:14px"><label class="field-label">New password</label><input class="input" type="password" id="cp-new" oninput="validateChangePassword()"></div>' +
        '<div style="margin-top:14px"><label class="field-label">Confirm new password</label><input class="input" type="password" id="cp-confirm" oninput="validateChangePassword()"></div>' +
        '<div class="field-help" id="cp-error" style="display:none;color:var(--danger-text);margin-top:6px"></div>' +
        '<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:20px">' +
          '<span class="btn btn-secondary" onclick="closeModal(\'change-password-modal\');openModal(\'profile-modal\')">Cancel</span>' +
          '<span class="btn btn-primary" id="cp-save-btn" disabled onclick="saveNewPassword()">Save password</span>' +
        '</div>' +
      '</div>' +
    '</div>';

  var NOTIF_ITEMS = [
    { icon: 'team', text: 'You were invited to join Bloom Commerce', cat: 'Team', time: '2h ago', onclick: "openModal('invites-modal')" },
    { icon: 'team', text: 'Priya Nair accepted your invitation and joined Nutristar Digital', cat: 'Team', time: '1d ago', href: 'team.html' },
    { icon: 'stores', text: 'Collaborator access approved on wellversed.ratio.win', cat: 'Stores', time: '5h ago', href: 'stores.html' },
    { icon: 'stores', text: 'Grant expires in 7 days on nutristar.ratio.win', cat: 'Stores', time: 'Yesterday', href: 'stores.html' },
    { icon: 'stores', text: 'Your request for additional permissions on Wellversed was approved', cat: 'Stores', time: '2d ago', href: 'stores.html' },
    { icon: 'apps', text: 'Wishlist Pro was approved and published', cat: 'Apps', time: '3d ago', href: 'app-detail.html' },
    { icon: 'apps', text: 'Loyalty Points needs changes before review can continue', cat: 'Apps', time: '4d ago', href: 'apps.html' },
    { icon: 'apps', text: 'A webhook delivery to Wishlist Pro has been failing for 24 hours', cat: 'Apps', time: '6h ago', href: 'app-detail.html' },
    { icon: 'card', text: 'Payout of ₹18,420 was sent to your account', cat: 'Payouts', time: '5d ago', href: 'settings.html' },
    { icon: 'lock', text: 'New sign-in to your account from a new device', cat: 'Security', time: '1w ago', href: 'settings.html' }
  ];
  var notifItemsHtml = NOTIF_ITEMS.map(function (n, i) {
    var border = (i < NOTIF_ITEMS.length - 1) ? ';border-bottom:1px solid var(--line-100)' : '';
    var commonStyle = 'height:auto;padding:12px 14px;align-items:flex-start;gap:10px' + border;
    var inner =
      '<span style="width:28px;height:28px;border-radius:7px;background:var(--line-100);color:var(--ink-500);display:flex;align-items:center;justify-content:center;flex-shrink:0">' + icon(n.icon, 14) + '</span>' +
      '<span style="flex:1;min-width:0;display:flex;flex-direction:column;gap:2px">' +
        '<span>' + n.text + '</span>' +
        '<span style="font:400 12px/16px var(--font-sans);color:var(--text-muted)">' + n.cat + ' &middot; ' + n.time + '</span>' +
      '</span>';
    return n.href
      ? '<a href="' + n.href + '" class="menu-item" style="' + commonStyle + '">' + inner + '</a>'
      : '<div class="menu-item" style="' + commonStyle + '" onclick="' + n.onclick + '">' + inner + '</div>';
  }).join('');

  var notifMenuHtml =
    '<div id="notif-menu" class="dropdown-panel up" style="left:0;width:min(360px,calc(100vw - 24px))">' +
      '<div style="display:flex;align-items:center;justify-content:space-between;padding:12px 14px;border-bottom:1px solid var(--line-100)"><span style="font:500 14px/20px var(--font-sans);color:var(--ink-900)">Notifications</span><span style="font:400 12px/16px var(--font-sans);color:var(--accent);cursor:pointer">Mark all as read</span></div>' +
      '<div style="max-height:420px;overflow-y:auto">' + notifItemsHtml + '</div>' +
    '</div>';

  var sidenavHtml =
    '<div class="sidenav" id="sidenav-root">' +
      '<a href="home.html" class="sidenav-logo" style="text-decoration:none"><span class="rp-logo">RAT<span class="rp-logo-slash"></span>O</span></a>' +
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

  if (!document.getElementById('invites-modal')) {
    document.body.insertAdjacentHTML('beforeend', invitesModalHtml + profileModalHtml + changePasswordModalHtml);
  }
  updateInviteBadge();
  renderGoogleAccountRow();

  if (topbarEl) {
    topbarEl.outerHTML =
      '<div class="mobilebar">' +
        '<div class="btn-icon" onclick="openMobileNav()">' + icon('menu', 18) + '</div>' +
        '<a href="landing.html" class="rp-logo" style="text-decoration:none;font-size:17px">RAT<span class="rp-logo-slash"></span>O</a>' +
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

var PROFILE_GOOGLE_LINKED = false;
var GOOGLE_ICON_SVG = '<svg width="16" height="16" viewBox="0 0 16 16"><path fill="#4285F4" d="M15.68 8.18c0-.57-.05-1.11-.14-1.64H8v3.1h4.3a3.68 3.68 0 0 1-1.6 2.42v2h2.58c1.51-1.39 2.38-3.44 2.38-5.88Z"/><path fill="#34A853" d="M8 16c2.16 0 3.97-.72 5.29-1.94l-2.58-2c-.72.48-1.63.77-2.71.77-2.08 0-3.85-1.41-4.48-3.3H.86v2.07A8 8 0 0 0 8 16Z"/><path fill="#FBBC05" d="M3.52 9.53a4.8 4.8 0 0 1 0-3.06V4.4H.86a8 8 0 0 0 0 7.2l2.66-2.07Z"/><path fill="#EA4335" d="M8 3.18c1.18 0 2.23.4 3.06 1.2l2.29-2.29A7.95 7.95 0 0 0 8 0 8 8 0 0 0 .86 4.4l2.66 2.07C4.15 4.59 5.92 3.18 8 3.18Z"/></svg>';
function renderGoogleAccountRow() {
  var el = document.getElementById('google-account-row');
  if (!el) return;
  el.innerHTML =
    '<div style="display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:8px;box-shadow:0 0 0 1px var(--line-100) inset">' +
      GOOGLE_ICON_SVG +
      (PROFILE_GOOGLE_LINKED
        ? '<span style="flex:1;font:400 13px/18px var(--font-sans);color:var(--ink-800)">Linked as <b>asha.rao@gmail.com</b></span><span class="btn btn-secondary btn-sm" onclick="toggleGoogleLink()">Unlink</span>'
        : '<span style="flex:1;font:400 13px/18px var(--font-sans);color:var(--ink-500)">Not linked</span><span class="btn btn-secondary btn-sm" onclick="toggleGoogleLink()">Link Google account</span>') +
    '</div>';
}
function toggleGoogleLink() {
  PROFILE_GOOGLE_LINKED = !PROFILE_GOOGLE_LINKED;
  renderGoogleAccountRow();
  showToast(PROFILE_GOOGLE_LINKED ? 'Google account linked.' : 'Google account unlinked.');
}

function onProfileEmailInput() {
  var input = document.getElementById('profile-email-input');
  var changed = input.value.trim() !== input.getAttribute('data-original');
  document.getElementById('profile-email-help').textContent = changed
    ? 'You’ll need to verify this new address before it takes effect.'
    : 'Changing this will require verifying a one-time code.';
}
function saveProfileChanges() {
  var input = document.getElementById('profile-email-input');
  var changed = input.value.trim() !== input.getAttribute('data-original');
  if (changed) {
    document.getElementById('profile-otp-target').textContent = input.value.trim();
    document.getElementById('profile-main-view').style.display = 'none';
    document.getElementById('profile-otp-view').style.display = '';
    document.querySelectorAll('#profile-otp-view .otp-box').forEach(function (b) { b.value = ''; });
    document.getElementById('profile-otp-error').style.display = 'none';
    var first = document.querySelector('#profile-otp-view .otp-box');
    if (first) first.focus();
    return;
  }
  closeModal('profile-modal');
  showToast('Profile updated.');
}
function cancelEmailVerification() {
  var input = document.getElementById('profile-email-input');
  input.value = input.getAttribute('data-original');
  onProfileEmailInput();
  document.getElementById('profile-otp-view').style.display = 'none';
  document.getElementById('profile-main-view').style.display = '';
}
function verifyProfileEmailOtp() {
  var boxes = document.querySelectorAll('#profile-otp-view .otp-box');
  var code = Array.prototype.map.call(boxes, function (b) { return b.value; }).join('');
  var err = document.getElementById('profile-otp-error');
  if (code.length < 6) {
    err.textContent = 'Enter all 6 digits.';
    err.style.display = '';
    return;
  }
  err.style.display = 'none';
  var input = document.getElementById('profile-email-input');
  input.setAttribute('data-original', input.value.trim());
  document.getElementById('profile-otp-view').style.display = 'none';
  document.getElementById('profile-main-view').style.display = '';
  closeModal('profile-modal');
  showToast('Email address updated.');
}
function otpNext(el) {
  if (el.value && el.nextElementSibling) el.nextElementSibling.focus();
}

function validateChangePassword() {
  var cur = document.getElementById('cp-current').value;
  var next = document.getElementById('cp-new').value;
  var confirm = document.getElementById('cp-confirm').value;
  var err = document.getElementById('cp-error');
  var msg = '';
  if (next && next.length < 8) msg = 'New password must be at least 8 characters.';
  else if (confirm && next !== confirm) msg = 'Passwords don’t match.';
  err.textContent = msg;
  err.style.display = msg ? '' : 'none';
  var valid = cur.length > 0 && next.length >= 8 && next === confirm;
  document.getElementById('cp-save-btn').toggleAttribute('disabled', !valid);
  return valid;
}
function saveNewPassword() {
  if (!validateChangePassword()) return;
  ['cp-current', 'cp-new', 'cp-confirm'].forEach(function (id) { document.getElementById(id).value = ''; });
  document.getElementById('cp-save-btn').setAttribute('disabled', '');
  closeModal('change-password-modal');
  showToast('Password updated.');
}

function updateInviteBadge() {
  var n = document.querySelectorAll('.invite-card-shell').length;
  var el = document.getElementById('invites-badge');
  if (!el) return;
  el.textContent = n;
  el.style.display = n ? '' : 'none';
}
function acceptShellInvite(btn) {
  var card = btn.closest('.invite-card-shell');
  var org = card.getAttribute('data-org');
  card.remove();
  var list = document.getElementById('invites-modal-list');
  if (list && !list.querySelector('.invite-card-shell')) {
    document.getElementById('invites-modal-empty').style.display = '';
  }
  updateInviteBadge();
  closeModal('invites-modal');
  showToast('You’ve joined ' + org + ' — switch to it from the organisation menu.');
}
function declineShellInvite(btn) {
  var card = btn.closest('.invite-card-shell');
  card.remove();
  var list = document.getElementById('invites-modal-list');
  if (list && !list.querySelector('.invite-card-shell')) {
    document.getElementById('invites-modal-empty').style.display = '';
  }
  updateInviteBadge();
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
