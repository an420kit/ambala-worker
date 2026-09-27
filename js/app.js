/**
 * AMBALA WORKER (अम्बाला वर्कर) - MULTI-APP UNIFIED CONTROLLER
 * Powers Customer App, Worker App & Admin Portal with full dynamic syncing.
 */

(function () {
  'use strict';

  // --- APPLICATION STATE ---
  const STATE = {
    currentUser: null,       // Authenticated User Session: { role, id, name, phone, badge, workerData }
    currentRole: 'login',    // 'login' | 'customer' | 'worker' | 'admin'
    customerScreen: 'screen-home',
    activeDuration: 'all',   // 'all' | 'hourly' | 'daily' | 'weekly' | 'monthly'
    activeCategory: 'all',
    activeLocality: 'all',
    localityTypeFilter: 'all', // 'all' | 'village' | 'town' | 'sector'
    localityModalQuery: '',    // in-modal search string
    searchQuery: '',
    selectedWorker: null,
    workers: [],
    jobs: [],
    ads: [],
    localities: [],
    categories: [],
    workerDutyOnline: true,
    language: localStorage.getItem('ambala_mobile_lang') || 'hi'
  };

  // --- AUDIO CHIME & SPEECH HELPER ---
  function playSubtleChime(freq = 520, duration = 0.12) {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {}
  }

  function speakHindi(text) {
    playSubtleChime(580);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'hi-IN';
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    } else {
      showToast(text);
    }
  }

  // --- FLOATING NOTIFICATION TOAST ---
  function showToast(message) {
    const toast = document.getElementById('mobile-toast');
    const toastText = document.getElementById('mobile-toast-text');
    if (!toast || !toastText) return;

    toastText.textContent = message;
    toast.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-2');
    toast.classList.add('opacity-100', 'translate-y-0');
    playSubtleChime(620, 0.15);

    setTimeout(() => {
      toast.classList.remove('opacity-100', 'translate-y-0');
      toast.classList.add('opacity-0', 'pointer-events-none', 'translate-y-2');
    }, 3500);
  }

  // --- DATA INITIALIZATION & SYNC ---
  function initData() {
    // 1. Localities
    STATE.localities = window.AMBALA_DATA.getStoredLocalities();

    // 2. Categories (18+ Universal & Custom)
    STATE.categories = window.AMBALA_DATA.getStoredCategories();

    // 3. Workers
    const savedWorkers = localStorage.getItem('ambala_workers_data');
    if (savedWorkers) {
      try {
        STATE.workers = JSON.parse(savedWorkers);
      } catch (e) {
        STATE.workers = [...window.AMBALA_DATA.workers];
      }
    } else {
      STATE.workers = [...window.AMBALA_DATA.workers];
    }

    // Auto-migrate and sync all workers with high-definition local AI portraits
    const aiAvatarMap = {
      'w-01': 'assets/worker_sunita.jpg',
      'w-02': 'assets/worker_geeta.jpg',
      'w-03': 'assets/worker_ramesh.jpg',
      'w-04': 'assets/worker_babloo.jpg',
      'w-05': 'assets/worker_mohan.jpg',
      'w-06': 'assets/worker_rajesh.jpg',
      'w-07': 'assets/worker_sunita.jpg',
      'w-08': 'assets/worker_jaswinder.jpg',
      'w-09': 'assets/worker_mohan.jpg',
      'w-10': 'assets/worker_manoj.jpg',
      'w-11': 'assets/worker_jaswinder.jpg',
      'w-12': 'assets/worker_babloo.jpg',
      'w-13': 'assets/worker_rajesh.jpg',
      'w-14': 'assets/worker_ramesh.jpg'
    };

    STATE.workers.forEach(w => {
      if (aiAvatarMap[w.id]) {
        w.avatar = aiAvatarMap[w.id];
      } else if (!w.avatar || w.avatar.includes('unsplash.com') || w.avatar.includes('rajesh_electrician.png')) {
        w.avatar = 'assets/worker_rajesh.jpg';
      }
    });
    persistWorkers();

    STATE.selectedWorker = STATE.workers[0] || null;

    // 4. Jobs
    const savedJobs = localStorage.getItem('ambala_posted_jobs');
    if (savedJobs) {
      try {
        STATE.jobs = JSON.parse(savedJobs);
      } catch (e) {
        STATE.jobs = [...window.AMBALA_DATA.postedJobs];
      }
    } else {
      STATE.jobs = [...window.AMBALA_DATA.postedJobs];
    }

    // 5. Ads
    const savedAds = localStorage.getItem('ambala_admin_ads');
    if (savedAds) {
      try {
        STATE.ads = JSON.parse(savedAds);
      } catch (e) {
        STATE.ads = [...window.AMBALA_DATA.ads];
      }
    } else {
      STATE.ads = [...window.AMBALA_DATA.ads];
    }

    // Populate Datalist and Selects
    syncLocalitiesDatalist();
    syncCategorySelects();
    renderCategoryChips();
  }

  function persistWorkers() {
    localStorage.setItem('ambala_workers_data', JSON.stringify(STATE.workers));
  }

  function persistJobs() {
    localStorage.setItem('ambala_posted_jobs', JSON.stringify(STATE.jobs));
  }

  function persistAds() {
    localStorage.setItem('ambala_admin_ads', JSON.stringify(STATE.ads));
  }

  function persistLocalities() {
    localStorage.setItem('ambala_master_localities', JSON.stringify(STATE.localities));
  }

  // Populate Autocomplete Datalist for all Villages, Towns & Sectors
  function syncLocalitiesDatalist() {
    const datalist = document.getElementById('ambala-localities-datalist');
    if (!datalist) return;
    datalist.innerHTML = '';

    STATE.localities.forEach(loc => {
      if (loc.id === 'all') return;
      const opt = document.createElement('option');
      let typeTag = '[गांव]';
      if (loc.type === 'town') typeTag = '[कस्बा]';
      else if (loc.type === 'sector') typeTag = '[सेक्टर]';
      else if (loc.type === 'colony') typeTag = '[कॉलोनी]';

      opt.value = loc.townOrVillage || loc.nameHi;
      opt.label = `${typeTag} ${loc.nameHi} (${loc.zone || 'अम्बाला'})`;
      datalist.appendChild(opt);
    });
  }

  // Populate Category Select dropdowns in Job Posting & Worker Registration
  function syncCategorySelects() {
    const selects = [
      document.getElementById('jobCategorySelect'),
      document.getElementById('wregCategorySelect')
    ];

    selects.forEach(sel => {
      if (!sel) return;
      const currentVal = sel.value;
      sel.innerHTML = '';
      STATE.categories.forEach(cat => {
        if (cat.id === 'all') return;
        const opt = document.createElement('option');
        opt.value = cat.id;
        opt.textContent = `${cat.icon} ${cat.nameHi} (${cat.nameEn || ''})`;
        sel.appendChild(opt);
      });
      if (currentVal) sel.value = currentVal;
    });
  }

  // Render Horizontal Category Chips with '+ नया काम जोड़ें' Button
  function renderCategoryChips() {
    const container = document.getElementById('category-chips-scroll');
    if (!container) return;
    container.innerHTML = '';

    STATE.categories.forEach(cat => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.setAttribute('data-cat', cat.id);
      const isSelected = STATE.activeCategory === cat.id;

      if (isSelected) {
        btn.className = "cat-filter-btn shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-dark text-white border border-dark transition-all active:scale-95 shadow-sm flex items-center gap-1";
      } else {
        btn.className = "cat-filter-btn shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/70 transition-all active:scale-95 flex items-center gap-1";
      }

      btn.innerHTML = `<span>${cat.icon}</span><span>${cat.nameHi}</span>`;
      btn.addEventListener('click', () => {
        if (cat.id === 'all') {
          STATE.activeCategory = 'all';
        } else {
          STATE.activeCategory = STATE.activeCategory === cat.id ? 'all' : cat.id;
        }
        updateFilterPillsUI();
        renderHomeWorkersFeed();
        playSubtleChime(520);
      });

      container.appendChild(btn);
    });

    // Append "+ नया काम जोड़ें" Button
    const addBtn = document.createElement('button');
    addBtn.id = 'btn-open-add-work-type';
    addBtn.type = 'button';
    addBtn.className = "shrink-0 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-300 flex items-center gap-1 active:scale-95 transition-all shadow-xs";
    addBtn.innerHTML = `<span>➕</span><span>नया काम जोड़ें</span>`;
    addBtn.title = "अपनी पसंद का नया काम या ट्रेड बनाएं";
    addBtn.addEventListener('click', () => {
      openAddWorkTypeModal();
    });
    container.appendChild(addBtn);
  }

  // --- UNIFIED GLOBAL BOTTOM DOCK CONTROLLER ---
  function updateBottomNavUI(activeNav) {
    document.querySelectorAll('.unified-nav-btn').forEach(btn => {
      const isTarget = btn.getAttribute('data-nav') === activeNav;
      const icon = btn.querySelector('.material-symbols-outlined');
      const label = btn.querySelector('span:last-child');

      if (isTarget) {
        btn.classList.add('text-dark', 'font-black');
        btn.classList.remove('text-slate-400', 'font-medium');
        if (icon) {
          icon.classList.add('text-emerald-600', 'scale-110');
          icon.classList.remove('text-slate-400');
        }
        if (label) {
          label.classList.add('font-black', 'text-dark');
          label.classList.remove('font-medium', 'text-slate-400');
        }
      } else {
        btn.classList.remove('text-dark', 'font-black');
        btn.classList.add('text-slate-400', 'font-medium');
        if (icon) {
          icon.classList.remove('text-emerald-600', 'scale-110');
          icon.classList.add('text-slate-400');
        }
        if (label) {
          label.classList.remove('font-black', 'text-dark');
          label.classList.add('font-medium', 'text-slate-400');
        }
      }
    });
  }

  // ==========================================================================
  // MULTI-ROLE UNIFIED AUTHENTICATION & CREDENTIAL ROUTER
  // (ID & Password determines whether Admin, Worker or Customer App opens)
  // ==========================================================================

  function detectRoleFromInput(rawInput) {
    if (!rawInput) return null;
    const input = rawInput.trim().toLowerCase();
    if (input.startsWith('admin') || input === '9999999999') return 'admin';
    if (input.startsWith('worker') || input.startsWith('labour')) return 'worker';

    // Check if matches any registered worker's phone or ID
    const matchedWorker = STATE.workers.find(w => 
      (w.phone && w.phone.includes(input)) || 
      (w.id && w.id.toLowerCase() === input)
    );
    if (matchedWorker) return 'worker';

    if (input.startsWith('cust') || input.startsWith('user') || /^\d{10}$/.test(input)) {
      return 'customer';
    }
    return null;
  }

  function authenticateCredentials(idOrPhone, password) {
    if (!idOrPhone || !password) return null;
    const cleanId = idOrPhone.trim().toLowerCase();
    const cleanPass = password.trim();

    // 1. Check Admin Credentials
    if ((cleanId === 'admin' || cleanId === '9999999999' || cleanId === 'admin@ambala.in') && 
        (cleanPass === 'admin123' || cleanPass === 'admin')) {
      return {
        role: 'admin',
        id: 'admin',
        name: 'मुख्य एडमिन (Master Admin)',
        phone: '9999999999',
        badge: '🛡️ एडमिन'
      };
    }

    // 2. Check Worker Credentials (default 'worker' or by phone)
    if ((cleanId === 'worker' || cleanId === 'labour') && 
        (cleanPass === 'worker123' || cleanPass === 'worker')) {
      const defaultWorker = STATE.workers[0] || { name: 'सुनीता देवी', phone: '9812345001' };
      return {
        role: 'worker',
        id: defaultWorker.id || 'w-01',
        name: `${defaultWorker.name}`,
        phone: defaultWorker.phone || '9812345001',
        badge: '👷 कामगार साथी',
        workerData: defaultWorker
      };
    }

    // Check specific worker by phone number or ID in STATE.workers
    const worker = STATE.workers.find(w => 
      (w.phone && w.phone === cleanId) || 
      (w.id && w.id.toLowerCase() === cleanId)
    );
    if (worker && (cleanPass === 'worker123' || cleanPass === worker.phone || cleanPass === '123456')) {
      return {
        role: 'worker',
        id: worker.id,
        name: `${worker.name}`,
        phone: worker.phone,
        badge: '👷 कामगार साथी',
        workerData: worker
      };
    }

    // 3. Check Customer Credentials
    if ((cleanId === 'customer' || cleanId === 'user') && 
        (cleanPass === 'customer123' || cleanPass === 'customer')) {
      return {
        role: 'customer',
        id: 'c-01',
        name: 'आलोक कुमार (ग्राहक)',
        phone: '9876543210',
        badge: '🛒 ग्राहक'
      };
    }

    // Any customer phone with customer123 or same phone as pass
    if (cleanId.length >= 4 && (cleanPass === 'customer123' || cleanPass === '123456' || cleanPass === cleanId)) {
      return {
        role: 'customer',
        id: 'c-' + cleanId,
        name: `ग्राहक (${cleanId})`,
        phone: cleanId,
        badge: '🛒 ग्राहक'
      };
    }

    return null;
  }

  function loginUser(account) {
    STATE.currentUser = account;
    localStorage.setItem('ambala_auth_session', JSON.stringify(account));
    syncAuthUI();
    setAppRole(account.role, true);
    playSubtleChime(640, 0.15);

    let welcomeMsg = `🎉 स्वागत है! ${account.name} के रूप में लॉगिन सफल।`;
    if (account.role === 'admin') {
      welcomeMsg = `🛡️ एडमिन लॉगिन सफल! अम्बाला एडमिन पोर्टल खुला।`;
    } else if (account.role === 'worker') {
      welcomeMsg = `👷 कामगार लॉगिन सफल! आपका लेबर पोर्टल खुला।`;
    } else {
      welcomeMsg = `🛒 ग्राहक लॉगिन सफल! अम्बाला मार्केटप्लेस खुला।`;
    }
    showToast(welcomeMsg);
  }

  function logoutUser() {
    STATE.currentUser = null;
    localStorage.removeItem('ambala_auth_session');
    syncAuthUI();
    setAppRole('login', true);
    playSubtleChime(420, 0.1);
    showToast('👋 सफलतापूर्वक लॉगआउट हो गया।');
  }

  function syncAuthUI() {
    const user = STATE.currentUser;
    const topBadge = document.getElementById('top-user-session-badge');
    const topName = document.getElementById('top-user-name-text');
    const topLogout = document.getElementById('btn-top-logout');
    const topDefaultTag = document.getElementById('top-default-tag');

    const deskBadge = document.getElementById('desktop-user-badge');
    const deskName = document.getElementById('desktop-user-name');
    const deskLogout = document.getElementById('btn-desktop-logout');
    const deskLoginBtn = document.getElementById('btn-desktop-to-login');

    if (user) {
      if (topBadge) {
        topBadge.classList.remove('hidden');
        topBadge.classList.add('flex');
      }
      if (topName) topName.textContent = user.name.split(' ')[0] || user.name;
      if (topLogout) {
        topLogout.classList.remove('hidden');
        topLogout.classList.add('flex');
      }
      if (topDefaultTag) topDefaultTag.classList.add('hidden');

      if (deskBadge) {
        deskBadge.classList.remove('hidden');
        deskBadge.classList.add('flex');
      }
      if (deskName) deskName.textContent = `${user.badge || ''} ${user.name}`;
      if (deskLogout) {
        deskLogout.classList.remove('hidden');
        deskLogout.classList.add('flex');
      }
      const deskSub = document.getElementById('desktop-session-subtitle');
      if (deskSub) {
        if (user.role === 'admin') deskSub.textContent = '🛡️ एडमिन कंट्रोल पोर्टल';
        else if (user.role === 'worker') deskSub.textContent = '👷 कामगार / लेबर पोर्टल';
        else deskSub.textContent = '🛒 ग्राहक सेवा मार्केटप्लेस';
      }
    } else {
      if (topBadge) topBadge.classList.add('hidden');
      if (topLogout) topLogout.classList.add('hidden');
      if (topDefaultTag) topDefaultTag.classList.remove('hidden');

      if (deskBadge) deskBadge.classList.add('hidden');
      if (deskLogout) deskLogout.classList.add('hidden');
      const deskSub = document.getElementById('desktop-session-subtitle');
      if (deskSub) deskSub.textContent = 'सुरक्षित लॉगिन प्रणाली';
    }
  }

  function showRoleRestrictionModal(targetRole) {
    const modal = document.getElementById('modal-role-restricted');
    const title = document.getElementById('modal-restricted-title');
    const msg = document.getElementById('modal-restricted-message');
    if (!modal) return;

    if (targetRole === 'admin') {
      if (title) title.textContent = '🛡️ एडमिन एक्सेस सुरक्षित';
      if (msg) msg.textContent = 'एडमिन कंट्रोल केवल अधिकृत एडमिन ID (admin) व पासवर्ड (admin123) से ही खुल सकता है। कृपया एडमिन क्रेडेंशियल से लॉगिन करें।';
    } else if (targetRole === 'worker') {
      if (title) title.textContent = '👷 कामगार पोर्टल सुरक्षित';
      if (msg) msg.textContent = 'कामगार डैशबोर्ड केवल कामगार ID (worker) व पासवर्ड (worker123) से ही खुल सकता है। कृपया कामगार क्रेडेंशियल से लॉगिन करें।';
    } else {
      if (title) title.textContent = '🔒 अधिकृत लॉगिन आवश्यक';
      if (msg) msg.textContent = 'इस अनुभाग में प्रवेश करने के लिए संबंधित ID व पासवर्ड से लॉगिन करें।';
    }

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    playSubtleChime(380, 0.15);
  }

  // --- GLOBAL ROLE SWITCHER (Login / Customer / Worker / Admin) ---
  function setAppRole(role, bypassAuthCheck = false) {
    if (role === 'labour') role = 'worker'; // Support 'labour' alias

    // Role-based Access Control Enforcement
    if (!bypassAuthCheck) {
      if (role === 'admin') {
        if (!STATE.currentUser || STATE.currentUser.role !== 'admin') {
          showRoleRestrictionModal('admin');
          return;
        }
      } else if (role === 'worker') {
        if (!STATE.currentUser) {
          showRoleRestrictionModal('worker');
          return;
        }
        if (STATE.currentUser.role === 'customer') {
          showRoleRestrictionModal('worker');
          return;
        }
      }
    }

    if (role !== 'customer' && role !== 'worker' && role !== 'admin' && role !== 'login') {
      role = STATE.currentUser ? STATE.currentUser.role : 'login';
    }

    STATE.currentRole = role;
    playSubtleChime(480, 0.08);

    // Update top role switcher buttons (both desktop and mobile)
    document.querySelectorAll('.role-switch-btn').forEach(btn => {
      const btnRole = btn.getAttribute('data-role');
      const isTarget = btnRole === role || (btnRole === 'worker' && role === 'labour');
      if (isTarget) {
        btn.classList.add('bg-white', 'text-dark', 'font-extrabold', 'shadow-md');
        btn.classList.remove('text-slate-300', 'hover:text-white', 'font-medium');
      } else {
        btn.classList.remove('bg-white', 'text-dark', 'font-extrabold', 'shadow-md');
        btn.classList.add('text-slate-300', 'hover:text-white', 'font-medium');
      }
    });

    // Update active role title text
    const titleEl = document.getElementById('current-active-role-title');
    if (titleEl) {
      if (role === 'customer') {
        titleEl.textContent = '🛒 अम्बाला ग्राहक ऐप';
      } else if (role === 'worker') {
        titleEl.textContent = '👷 अम्बाला कामगार पोर्टल';
      } else if (role === 'admin') {
        titleEl.textContent = '🛡️ अम्बाला एडमिन पोर्टल';
      } else if (role === 'login') {
        titleEl.textContent = '🔐 अम्बाला वर्कर — लॉगिन पोर्टल';
      }
    }

    // Toggle Role Views
    document.querySelectorAll('.app-role-view').forEach(v => {
      v.classList.add('hidden');
      v.classList.remove('flex');
    });

    const activeView = document.getElementById(`view-${role}`);
    if (activeView) {
      activeView.classList.remove('hidden');
      activeView.classList.add('flex');
    }

    // Bottom dock is ONLY for Customer App
    const bottomDock = document.getElementById('global-bottom-dock');
    if (bottomDock) {
      if (role === 'customer') {
        bottomDock.classList.remove('hidden');
      } else {
        bottomDock.classList.add('hidden');
      }
    }

    // Render corresponding view data & sync bottom dock
    if (role === 'customer') {
      renderCustomerAdsBanner();
      renderHomeWorkersFeed();
      if (STATE.customerScreen === 'screen-worker-profile') {
        updateBottomNavUI('profile');
      } else if (STATE.customerScreen === 'screen-rate-card') {
        updateBottomNavUI('rates');
      } else {
        updateBottomNavUI('home');
      }
    } else if (role === 'worker') {
      if (STATE.currentUser && STATE.currentUser.workerData) {
        const headerName = document.getElementById('worker-app-header-name');
        if (headerName) {
          headerName.textContent = `${STATE.currentUser.workerData.name} (${STATE.currentUser.workerData.roleHi || 'कारीगर'})`;
        }
      }
      renderWorkerJobsFeed();
      syncWorkerRatesForm();
      updateBottomNavUI('labour');
    } else if (role === 'admin') {
      renderAdminDashboard();
      updateBottomNavUI('admin');
    }

    const shell = document.getElementById('mobile-app-shell');
    if (shell) shell.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ==========================================================================
  // VIEW 1: CUSTOMER APP LOGIC
  // ==========================================================================

  function renderCustomerAdsBanner() {
    const container = document.getElementById('customer-ads-container');
    if (!container) return;

    const activeAds = STATE.ads.filter(a => a.isActive);
    if (activeAds.length === 0) {
      container.innerHTML = '';
      return;
    }

    const ad = activeAds[0]; // Display primary active ad
    container.innerHTML = `
      <div class="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-2xl p-3 shadow-sm border border-slate-800 flex items-center justify-between gap-2">
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-1.5">
            <span class="px-1.5 py-0.5 rounded bg-emerald-500 text-dark font-extrabold text-[9px] uppercase tracking-wider">${ad.badge || 'ऑफर'}</span>
            <h4 class="text-xs font-bold truncate leading-tight">${ad.titleHi}</h4>
          </div>
          <p class="text-[11px] text-slate-300 truncate mt-0.5">${ad.subtitleHi}</p>
        </div>
        <a href="tel:${ad.phone}" class="shrink-0 px-2.5 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-dark rounded-xl text-[11px] font-bold flex items-center gap-1 shadow-sm active:scale-95 transition-all">
          <span class="material-symbols-outlined text-[14px]">call</span>
          <span>कॉल</span>
        </a>
      </div>
    `;
  }

  function navigateCustomerScreen(screenId) {
    STATE.customerScreen = screenId;
    playSubtleChime(500, 0.08);

    document.querySelectorAll('#view-customer .app-screen').forEach(el => {
      el.classList.add('hidden');
      el.classList.remove('block');
    });

    const target = document.getElementById(screenId);
    if (target) {
      target.classList.remove('hidden');
      target.classList.add('block');
    }

    // Sync Bottom Dock state with active customer screen
    if (screenId === 'screen-home') {
      updateBottomNavUI('home');
    } else if (screenId === 'screen-worker-profile') {
      updateBottomNavUI('profile');
    } else if (screenId === 'screen-rate-card') {
      updateBottomNavUI('rates');
    }

    const shell = document.getElementById('mobile-app-shell');
    if (shell) shell.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function renderHomeWorkersFeed() {
    const container = document.getElementById('home-workers-list');
    const countEl = document.getElementById('feed-results-count');
    const clearBtn = document.getElementById('worker-search-clear-btn');
    const filterBadge = document.getElementById('active-filter-badge');
    if (!container) return;
    container.innerHTML = '';

    const dur = STATE.activeDuration;
    const cat = STATE.activeCategory;
    const loc = STATE.activeLocality;
    const query = STATE.searchQuery.trim();

    // Toggle search clear button
    if (clearBtn) {
      if (query.length > 0) {
        clearBtn.classList.remove('hidden');
      } else {
        clearBtn.classList.add('hidden');
      }
    }

    // Dynamic Active Filter Summary Badge
    if (filterBadge) {
      const activeTags = [];
      if (query) activeTags.push(`🔍 "${query}"`);
      if (cat !== 'all') {
        const cObj = STATE.categories.find(c => c.id === cat);
        if (cObj) activeTags.push(`${cObj.icon} ${cObj.nameHi}`);
      }
      if (loc !== 'all') {
        const lObj = STATE.localities.find(l => l.id === loc);
        if (lObj) activeTags.push(`📍 ${lObj.townOrVillage || lObj.nameHi}`);
      }
      if (dur !== 'all') {
        const durNames = { hourly: 'घंटेवार', daily: 'दिहाड़ी', weekly: 'हफ्तेवार', monthly: 'महीनेवार' };
        activeTags.push(`⏱️ ${durNames[dur] || dur}`);
      }

      if (activeTags.length > 0) {
        filterBadge.textContent = activeTags.join(' • ');
        filterBadge.classList.remove('hidden');
      } else {
        filterBadge.classList.add('hidden');
      }
    }

    // Only show approved workers in Customer feed
    const filtered = STATE.workers.filter(w => {
      if (w.status && w.status !== 'approved') return false;

      // 1. Search Query with Intelligent Synonym & Multi-attribute Matcher
      if (query) {
        const matchesQuery = window.AMBALA_DATA.matchWorkerSearch(w, query);
        if (!matchesQuery) return false;
      }

      // 2. Category Filter (If query is present, do not block cross-category search matches)
      if (cat !== 'all' && !query && w.category !== cat) {
        return false;
      }

      // 3. Locality Filter (matches localityId, nameHi or townOrVillage)
      if (loc !== 'all') {
        const matchId = w.localityId === loc;
        const matchName = (w.townOrVillage && w.townOrVillage.toLowerCase().includes(loc.toLowerCase())) ||
                          (w.localityNameHi && w.localityNameHi.toLowerCase().includes(loc.toLowerCase()));
        if (!matchId && !matchName) return false;
      }

      // 4. Duration Filter
      if (dur !== 'all') {
        if (dur === 'hourly' && !w.hourlyRate) return false;
        if (dur === 'daily' && !w.dailyRate) return false;
        if (dur === 'weekly' && !w.weeklyRate) return false;
        if (dur === 'monthly' && !w.monthlyRate) return false;
      }

      return true;
    });

    if (countEl) {
      countEl.textContent = `${filtered.length} कामगार उपलब्ध`;
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="py-10 px-4 text-center border border-dashed border-slate-200 rounded-3xl my-2 bg-slate-50/50">
          <div class="text-3xl mb-1">🔍</div>
          <h4 class="text-xs font-bold text-dark">कोई कामगार नहीं मिला</h4>
          <p class="text-[11px] text-muted mt-0.5">सर्च शब्द बदलें या दूसरा कस्बा, गांव या काम का प्रकार चुनें।</p>
          <div class="flex items-center justify-center gap-2 mt-3">
            <button id="btn-reset-customer-filters" class="px-3 py-1.5 bg-dark text-white text-xs font-semibold rounded-xl" type="button">
              फ़िल्टर हटाएं (सभी देखें)
            </button>
            <button id="btn-empty-open-add-trade" class="px-3 py-1.5 bg-emerald-600 text-white text-xs font-semibold rounded-xl flex items-center gap-1" type="button">
              <span>➕ नया काम जोड़ें</span>
            </button>
          </div>
        </div>
      `;
      const resetBtn = document.getElementById('btn-reset-customer-filters');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          STATE.activeCategory = 'all';
          STATE.activeDuration = 'all';
          STATE.activeLocality = 'all';
          STATE.searchQuery = '';
          const searchInput = document.getElementById('worker-search-input');
          if (searchInput) searchInput.value = '';
          const currentLabel = document.getElementById('current-locality-label');
          if (currentLabel) currentLabel.textContent = 'सभी इलाके';
          updateFilterPillsUI();
          renderHomeWorkersFeed();
        });
      }
      const emptyAddBtn = document.getElementById('btn-empty-open-add-trade');
      if (emptyAddBtn) {
        emptyAddBtn.addEventListener('click', () => openAddWorkTypeModal());
      }
      return;
    }

    filtered.forEach(w => {
      const card = document.createElement('div');
      card.className = "p-3.5 rounded-2xl bg-white border border-slate-100 hover:border-slate-200 shadow-sm cursor-pointer transition-all active:bg-slate-50/50";
      
      const avatarSrc = w.avatar || 'assets/worker_rajesh.jpg';
      const locDisplay = w.townOrVillage || (w.localityNameHi ? w.localityNameHi.split(' - ').pop() : 'अम्बाला');
      
      // Determine Locality Badge Icon & Tag
      let locTagPrefix = '📍 ';
      if (locDisplay.includes('गांव') || locDisplay.includes('Village')) locTagPrefix = '🏡 ';
      else if (locDisplay.includes('कस्बा') || locDisplay.includes('Town')) locTagPrefix = '🏢 ';
      else if (locDisplay.includes('सेक्टर')) locTagPrefix = '🏘️ ';

      // Category Icon
      const catObj = STATE.categories.find(c => c.id === w.category);
      const roleIcon = catObj ? catObj.icon : '👷';

      // Rates display based on active filter or default daily
      let rateBadge = `₹${w.dailyRate} <span class="text-[10px] text-muted font-normal">/ दिन</span>`;
      if (dur === 'hourly' && w.hourlyRate) {
        rateBadge = `₹${w.hourlyRate} <span class="text-[10px] text-muted font-normal">/ घंटा</span>`;
      } else if (dur === 'weekly' && w.weeklyRate) {
        rateBadge = `₹${w.weeklyRate.toLocaleString('en-IN')} <span class="text-[10px] text-muted font-normal">/ हफ्ता</span>`;
      } else if (dur === 'monthly' && w.monthlyRate) {
        rateBadge = `₹${w.monthlyRate.toLocaleString('en-IN')} <span class="text-[10px] text-muted font-normal">/ माह</span>`;
      }

      card.innerHTML = `
        <div class="flex items-center gap-3">
          
          <!-- Avatar -->
          <div class="relative shrink-0">
            <img class="w-12 h-12 rounded-2xl object-cover bg-slate-100 shadow-xs" src="${avatarSrc}" alt="${w.name}" onerror="this.src='assets/worker_rajesh.jpg'"/>
            <span class="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white"></span>
          </div>

          <!-- Info -->
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between gap-1">
              <h4 class="text-xs font-bold text-dark truncate flex items-center gap-1">
                <span>${w.name}</span>
                <span class="text-[10px] text-emerald-600 font-bold" title="सत्यापित">✓</span>
              </h4>
              <span class="text-xs font-bold text-dark whitespace-nowrap">${rateBadge}</span>
            </div>

            <div class="text-[11px] text-slate-500 truncate mt-0.5 flex items-center gap-1">
              <span>${roleIcon}</span>
              <span>${w.roleHi}</span>
            </div>
            
            <div class="flex items-center gap-2 text-[10px] text-muted mt-1">
              <span class="text-slate-700 font-medium">${locTagPrefix}${locDisplay}</span>
              <span>•</span>
              <span class="text-slate-700 font-semibold">★ ${w.rating || '4.8'}</span>
            </div>
          </div>

          <!-- Dual Quick Action CTAs -->
          <div class="flex items-center gap-1 shrink-0 ml-1">
            <a class="btn-card-wa w-8 h-8 rounded-full bg-emerald-50 hover:bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0 active:scale-90 transition-transform" href="https://wa.me/${w.whatsapp || '91' + w.phone}?text=${encodeURIComponent('नमस्ते ' + w.name + ' जी, मुझे आपके काम (' + w.roleHi + ') के लिए बात करनी है।')}" target="_blank" title="व्हाट्सएप">
              <span class="material-symbols-outlined text-[16px]">chat</span>
            </a>
            <a class="btn-card-call w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-dark shrink-0 active:scale-90 transition-transform" href="tel:${w.phone}" title="कॉल करें">
              <span class="material-symbols-outlined text-[16px]">call</span>
            </a>
          </div>

        </div>
      `;

      // Tap card body opens Profile
      card.addEventListener('click', (e) => {
        if (e.target.closest('.btn-card-call') || e.target.closest('.btn-card-wa')) return;
        loadWorkerProfile(w);
        navigateCustomerScreen('screen-worker-profile');
      });

      container.appendChild(card);
    });
  }

  function loadWorkerProfile(worker) {
    STATE.selectedWorker = worker;

    document.getElementById('profile-name').textContent = worker.name;
    document.getElementById('profile-role').textContent = worker.roleHi;
    document.getElementById('profile-exp').textContent = worker.experienceHi || worker.experience || '8 वर्ष';
    document.getElementById('profile-locality').textContent = worker.townOrVillage || worker.localityNameHi || 'अम्बाला';
    
    // 4-Tier Rates
    document.getElementById('profile-hourly-rate').textContent = `₹${worker.hourlyRate || 150} / घंटा`;
    document.getElementById('profile-daily-rate').textContent = `₹${worker.dailyRate || 600} / दिन`;
    document.getElementById('profile-weekly-rate').textContent = `₹${(worker.weeklyRate || (worker.dailyRate * 6)).toLocaleString('en-IN')} / हफ्ता`;
    document.getElementById('profile-monthly-rate').textContent = `₹${(worker.monthlyRate || (worker.dailyRate * 25)).toLocaleString('en-IN')} / माह`;
    
    document.getElementById('profile-bio').textContent = `"${worker.bioHi || worker.bioEn || 'अम्बाला में विश्वसनीय व समय पर कामगार सेवा।'}"`;

    const avatar = document.getElementById('profile-avatar');
    if (avatar) {
      avatar.src = worker.avatar || 'assets/worker_rajesh.jpg';
    }

    const callBtn = document.getElementById('profile-call-btn');
    if (callBtn) callBtn.href = `tel:${worker.phone}`;

    const waBtn = document.getElementById('profile-whatsapp-btn');
    if (waBtn) {
      const msg = `नमस्ते ${worker.name} जी, मैंने आपका प्रोफाइल Ambala Worker ऐप पर देखा। मुझे आपके काम (${worker.roleHi}) के संबंध में बात करनी है।`;
      waBtn.href = `https://wa.me/${worker.whatsapp || '91' + worker.phone}?text=${encodeURIComponent(msg)}`;
    }
  }

  function updateFilterPillsUI() {
    // 4-tier duration pills
    document.querySelectorAll('.duration-tab-pill').forEach(pill => {
      const isDur = pill.getAttribute('data-duration') === STATE.activeDuration;
      if (isDur) {
        pill.className = "duration-tab-pill flex-1 py-1.5 text-center rounded-xl bg-white text-dark font-bold shadow-sm transition-all";
      } else {
        pill.className = "duration-tab-pill flex-1 py-1.5 text-center rounded-xl text-slate-500 hover:text-dark font-medium transition-all";
      }
    });

    // Category chips
    document.querySelectorAll('.cat-filter-btn').forEach(btn => {
      const isCat = btn.getAttribute('data-cat') === STATE.activeCategory;
      if (isCat) {
        btn.className = "cat-filter-btn shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-dark text-white border border-dark transition-all active:scale-95 shadow-sm flex items-center gap-1";
      } else {
        btn.className = "cat-filter-btn shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/70 transition-all active:scale-95 flex items-center gap-1";
      }
    });
  }

  function setupLocalityModal() {
    const modal = document.getElementById('locality-modal');
    const openBtn = document.getElementById('btn-open-locality-modal');
    const closeBtn = document.getElementById('btn-close-locality-modal');
    const optionsList = document.getElementById('locality-options-list');
    const currentLabel = document.getElementById('current-locality-label');
    const searchInput = document.getElementById('locality-modal-search');
    const typePills = document.querySelectorAll('.loc-filter-type-pill');

    if (!modal || !optionsList) return;

    function renderLocalityOptions() {
      optionsList.innerHTML = '';
      const q = STATE.localityModalQuery;
      const typeFilter = STATE.localityTypeFilter;

      const filteredLocs = STATE.localities.filter(loc => {
        if (loc.id === 'all') return true;

        // Type filter
        if (typeFilter !== 'all') {
          if (typeFilter === 'sector') {
            if (loc.type !== 'sector' && loc.type !== 'colony') return false;
          } else if (loc.type !== typeFilter) {
            return false;
          }
        }

        // Search query
        if (q) {
          const text = `${loc.nameHi} ${loc.nameEn || ''} ${loc.zone || ''} ${loc.townOrVillage || ''}`.toLowerCase();
          if (!text.includes(q)) return false;
        }

        return true;
      });

      if (filteredLocs.length === 0) {
        optionsList.innerHTML = `
          <div class="py-6 text-center text-xs text-slate-400">
            कोई कस्बा या गांव नहीं मिला। आप काम पोस्ट करते समय नया गांव लिख सकते हैं!
          </div>
        `;
        return;
      }

      filteredLocs.forEach(loc => {
        const row = document.createElement('button');
        row.className = "w-full p-2.5 rounded-xl text-left text-xs font-medium flex items-center justify-between hover:bg-slate-50 transition-colors border-b border-slate-50";
        row.type = 'button';
        const isSelected = STATE.activeLocality === loc.id;

        // Locality badge
        let badgeHtml = '';
        if (loc.type === 'village') {
          badgeHtml = '<span class="text-[9px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">गांव (Village)</span>';
        } else if (loc.type === 'town') {
          badgeHtml = '<span class="text-[9px] px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 font-bold border border-blue-200">कस्बा (Town)</span>';
        } else if (loc.type === 'sector') {
          badgeHtml = '<span class="text-[9px] px-1.5 py-0.5 rounded bg-purple-50 text-purple-700 font-bold border border-purple-200">सेक्टर</span>';
        } else if (loc.type === 'colony') {
          badgeHtml = '<span class="text-[9px] px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 font-bold border border-amber-200">कॉलोनी</span>';
        }

        row.innerHTML = `
          <div class="flex items-center gap-2 min-w-0">
            <span class="text-sm shrink-0">${loc.id === 'all' ? '🗺️' : (loc.type === 'village' ? '🏡' : '🏢')}</span>
            <div class="truncate">
              <span class="${isSelected ? 'font-bold text-dark' : 'text-slate-700'}">${loc.nameHi}</span>
              ${loc.zone && loc.id !== 'all' ? `<span class="text-[10px] text-slate-400 ml-1">(${loc.zone})</span>` : ''}
            </div>
            ${badgeHtml}
            ${loc.isCustom ? '<span class="text-[9px] px-1 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">नया दर्ज</span>' : ''}
          </div>
          ${isSelected ? '<span class="text-xs font-bold text-dark shrink-0 ml-1">✓</span>' : ''}
        `;

        row.addEventListener('click', () => {
          STATE.activeLocality = loc.id;
          if (currentLabel) {
            currentLabel.textContent = loc.id === 'all' ? 'सभी इलाके' : (loc.townOrVillage || loc.nameHi.split(' - ').pop());
          }
          modal.classList.add('hidden');
          modal.classList.remove('flex');
          renderHomeWorkersFeed();
          playSubtleChime(500);
        });

        optionsList.appendChild(row);
      });
    }

    renderLocalityOptions();

    // In-modal search handler
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        STATE.localityModalQuery = e.target.value.toLowerCase().trim();
        renderLocalityOptions();
      });
    }

    // Type pills filter handler
    typePills.forEach(pill => {
      pill.addEventListener('click', () => {
        const type = pill.getAttribute('data-type');
        STATE.localityTypeFilter = type;

        typePills.forEach(p => {
          p.className = "loc-filter-type-pill px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 hover:text-dark transition-all shrink-0";
        });
        pill.className = "loc-filter-type-pill px-2.5 py-1 rounded-lg bg-dark text-white font-bold transition-all shrink-0";

        renderLocalityOptions();
        playSubtleChime(480);
      });
    });

    if (openBtn) {
      openBtn.addEventListener('click', () => {
        STATE.localityModalQuery = '';
        if (searchInput) searchInput.value = '';
        renderLocalityOptions();
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        playSubtleChime(460);
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
      });
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
      }
    });
  }

  // --- MODAL: CREATE CUSTOM WORK TYPE (+ नया काम जोड़ें) ---
  let selectedNewTradeIcon = '🛠️';

  function openAddWorkTypeModal() {
    const modal = document.getElementById('modal-add-work-type');
    const input = document.getElementById('newTradeNameInput');
    if (!modal) return;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    if (input) {
      input.value = '';
      setTimeout(() => input.focus(), 100);
    }
    playSubtleChime(520);
  }

  function closeAddWorkTypeModal() {
    const modal = document.getElementById('modal-add-work-type');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }

  function setupAddWorkTypeModal() {
    const modal = document.getElementById('modal-add-work-type');
    const closeBtn = document.getElementById('btn-close-add-work-type');
    const form = document.getElementById('addWorkTypeForm');
    const iconButtons = document.querySelectorAll('.trade-icon-choice');
    const regTradeBtn = document.getElementById('btn-reg-add-new-trade');

    if (!modal) return;

    if (closeBtn) closeBtn.addEventListener('click', closeAddWorkTypeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeAddWorkTypeModal();
    });

    if (regTradeBtn) {
      regTradeBtn.addEventListener('click', openAddWorkTypeModal);
    }

    // Icon selector buttons
    iconButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        selectedNewTradeIcon = btn.getAttribute('data-icon') || '🛠️';
        iconButtons.forEach(b => {
          b.classList.remove('border-dark');
          b.classList.add('border-transparent');
        });
        btn.classList.remove('border-transparent');
        btn.classList.add('border-dark');
        playSubtleChime(480);
      });
    });

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.getElementById('newTradeNameInput');
        const tradeName = input ? input.value.trim() : '';

        if (!tradeName) {
          showToast('कृपया काम का नाम लिखें');
          return;
        }

        // Save into master categories repository
        const addedCat = window.AMBALA_DATA.addMasterCategory(tradeName, tradeName, selectedNewTradeIcon);
        STATE.categories = window.AMBALA_DATA.getStoredCategories();

        // Refresh UI everywhere
        renderCategoryChips();
        syncCategorySelects();
        renderAdminCategoriesList();

        // Automatically activate this new category
        STATE.activeCategory = addedCat.id;
        updateFilterPillsUI();
        renderHomeWorkersFeed();

        closeAddWorkTypeModal();
        showToast(`🎉 नया काम প্রকার "${tradeName}" मास्टर लिस्ट में सुरक्षित हो गया!`);
        playSubtleChime(640, 0.2);
        speakHindi(`नया काम प्रकार ${tradeName} सफलतापूर्वक जोड़ दिया गया है।`);
      });
    }
  }

  // Post Job Lead Flow (Customer App)
  function setupPostJobModal() {
    const modal = document.getElementById('post-job-modal');
    const openBtn = document.getElementById('btn-open-post-job-modal');
    const dockBtn = document.getElementById('btn-dock-post-job');
    const closeBtn = document.getElementById('btn-close-post-job-modal');
    const form = document.getElementById('customerPostJobForm');

    if (!modal) return;

    function openModal() {
      syncCategorySelects();
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      playSubtleChime(520);
    }

    function closeModal() {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }

    if (openBtn) openBtn.addEventListener('click', openModal);
    if (dockBtn) dockBtn.addEventListener('click', openModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('jobTitleInput').value.trim();
        const cat = document.getElementById('jobCategorySelect').value;
        const dur = document.getElementById('jobDurationSelect').value;
        const town = document.getElementById('jobTownInput').value.trim();
        const budget = document.getElementById('jobBudgetInput').value.trim();
        const name = document.getElementById('jobCustomerName').value.trim();
        const phone = document.getElementById('jobCustomerPhone').value.trim();
        const desc = document.getElementById('jobDescInput').value.trim();

        if (!title || !town || !budget || !name || !phone) {
          showToast('कृपया सभी आवश्यक विवरण भरें');
          return;
        }

        // Auto-feed Town/Village to Master Localities
        const locAdded = window.AMBALA_DATA.addMasterLocality(town, 'village');
        if (locAdded) {
          STATE.localities = window.AMBALA_DATA.getStoredLocalities();
          syncLocalitiesDatalist();
        }

        const newJob = {
          id: 'job-' + Date.now(),
          titleHi: title,
          titleEn: title,
          category: cat,
          duration: dur,
          localityHi: town,
          townOrVillage: town,
          budget: budget,
          customerName: name,
          customerPhone: phone,
          timeAgoHi: 'अभी-अभी',
          descHi: desc || `${town} में ${title} की जरूरत है।`,
          status: 'open',
          createdAt: new Date().toISOString()
        };

        STATE.jobs.unshift(newJob);
        persistJobs();
        form.reset();
        closeModal();

        showToast('🎉 काम पोस्ट हो गया! कामगार ऐप पर तुरंत लाइव भेजा गया।');
        playSubtleChime(650, 0.2);
        speakHindi("आपका काम पोस्ट हो गया है। अम्बाला के कामगार अब सीधे आपसे संपर्क कर सकेंगे।");
      });
    }
  }


  // ==========================================================================
  // VIEW 2: WORKER APP LOGIC
  // ==========================================================================

  function renderWorkerJobsFeed() {
    const list = document.getElementById('worker-job-leads-list');
    const countEl = document.getElementById('worker-jobs-count');
    if (!list) return;

    list.innerHTML = '';
    const openJobs = STATE.jobs.filter(j => j.status === 'open');

    if (countEl) {
      countEl.textContent = `${openJobs.length} काम उपलब्ध`;
    }

    if (openJobs.length === 0) {
      list.innerHTML = `
        <div class="py-12 px-4 text-center border border-dashed border-slate-200 rounded-3xl bg-white">
          <div class="text-3xl mb-1">💼</div>
          <h4 class="text-xs font-bold text-dark">अभी कोई नया काम नहीं है</h4>
          <p class="text-[11px] text-muted mt-0.5">जैसे ही कोई ग्राहक काम पोस्ट करेगा, आपको यहाँ दिखेगा।</p>
        </div>
      `;
      return;
    }

    openJobs.forEach(job => {
      const card = document.createElement('div');
      card.className = "p-3.5 bg-white rounded-2xl border border-slate-200/80 shadow-xs flex flex-col gap-2";

      const durLabel = {
        hourly: "घंटेवार",
        daily: "दिहाड़ी",
        weekly: "हफ्तेवार",
        monthly: "महीनेवार"
      }[job.duration] || "दिहाड़ी";

      card.innerHTML = `
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-1.5">
            <span class="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">${durLabel}</span>
            <span class="text-[11px] text-slate-500 font-medium">📍 ${job.townOrVillage || job.localityHi}</span>
          </div>
          <span class="text-[10px] text-slate-400 font-medium">${job.timeAgoHi || 'नया'}</span>
        </div>

        <div>
          <h4 class="text-xs font-bold text-dark leading-tight">${job.titleHi}</h4>
          <p class="text-[11px] text-slate-600 mt-1 leading-normal">${job.descHi}</p>
        </div>

        <div class="flex items-center justify-between pt-1 border-t border-slate-100 mt-1">
          <div>
            <span class="text-[10px] text-slate-400 block font-medium">बजट / मजदूरी</span>
            <span class="text-xs font-extrabold text-dark">${job.budget}</span>
          </div>

          <div class="flex items-center gap-1.5">
            <a href="https://wa.me/91${job.customerPhone}?text=${encodeURIComponent('नमस्ते ' + job.customerName + ' जी, मैंने Ambala Worker ऐप पर आपका काम देखा (' + job.titleHi + ')। मैं उपलब्ध हूँ।')}" target="_blank" class="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center gap-1">
              <span class="material-symbols-outlined text-[15px]">chat</span>
              <span>व्हाट्सएप</span>
            </a>
            <a href="tel:${job.customerPhone}" class="px-3 py-1.5 rounded-xl bg-dark hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1 shadow-sm">
              <span class="material-symbols-outlined text-[15px]">call</span>
              <span>कॉल ग्राहक</span>
            </a>
          </div>
        </div>
      `;
      list.appendChild(card);
    });
  }

  function syncWorkerRatesForm() {
    // Fill active technician rates
    const cur = STATE.workers[0] || {};
    const hInput = document.getElementById('workerHourlyRateInput');
    const dInput = document.getElementById('workerDailyRateInput');
    const wInput = document.getElementById('workerWeeklyRateInput');
    const mInput = document.getElementById('workerMonthlyRateInput');

    if (hInput) hInput.value = cur.hourlyRate || 250;
    if (dInput) dInput.value = cur.dailyRate || 800;
    if (wInput) wInput.value = cur.weeklyRate || 4800;
    if (mInput) mInput.value = cur.monthlyRate || 20000;
  }

  function setupWorkerEvents() {
    // Worker Tab Switcher
    document.querySelectorAll('.worker-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');

        document.querySelectorAll('.worker-tab-btn').forEach(b => {
          b.className = "worker-tab-btn flex-1 py-2 text-center rounded-xl text-slate-600 hover:text-dark transition-all";
        });
        btn.className = "worker-tab-btn flex-1 py-2 text-center rounded-xl bg-dark text-white font-bold shadow-sm transition-all";

        document.querySelectorAll('.worker-tab-pane').forEach(p => {
          p.classList.add('hidden');
          p.classList.remove('block');
        });

        const targetPane = document.getElementById(tabId);
        if (targetPane) {
          targetPane.classList.remove('hidden');
          targetPane.classList.add('block');
        }
        playSubtleChime(500);
      });
    });

    // Duty Toggle Switch
    const dutyBtn = document.getElementById('worker-duty-toggle-btn');
    const dutyText = document.getElementById('worker-duty-status-text');
    if (dutyBtn && dutyText) {
      dutyBtn.addEventListener('click', () => {
        STATE.workerDutyOnline = !STATE.workerDutyOnline;
        if (STATE.workerDutyOnline) {
          dutyBtn.className = "px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1.5 transition-all";
          dutyText.textContent = "ऑनलाइन (काम चाहिए)";
          showToast('🟢 आप काम के लिए ऑनलाइन हैं');
        } else {
          dutyBtn.className = "px-3 py-1 rounded-full text-xs font-bold bg-slate-200 text-slate-700 border border-slate-300 flex items-center gap-1.5 transition-all";
          dutyText.textContent = "व्यस्त / ऑफलाइन";
          showToast('🔴 आप अभी व्यस्त स्थिति में हैं');
        }
        playSubtleChime(540);
      });
    }

    // Save 4 Rates
    const saveRatesBtn = document.getElementById('btn-save-worker-rates');
    if (saveRatesBtn) {
      saveRatesBtn.addEventListener('click', () => {
        const h = parseInt(document.getElementById('workerHourlyRateInput').value, 10) || 200;
        const d = parseInt(document.getElementById('workerDailyRateInput').value, 10) || 750;
        const w = parseInt(document.getElementById('workerWeeklyRateInput').value, 10) || 4500;
        const m = parseInt(document.getElementById('workerMonthlyRateInput').value, 10) || 18000;

        if (STATE.workers[0]) {
          STATE.workers[0].hourlyRate = h;
          STATE.workers[0].dailyRate = d;
          STATE.workers[0].weeklyRate = w;
          STATE.workers[0].monthlyRate = m;
          persistWorkers();
        }

        showToast('✓ आपकी 4 मजदूरी दरें सुरक्षित हो गईं!');
        renderHomeWorkersFeed();
      });
    }

    // Worker Registration Form (With Town / Village Auto-Feed)
    const regForm = document.getElementById('newWorkerRegForm');
    if (regForm) {
      regForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('wregNameInput').value.trim();
        const phone = document.getElementById('wregPhoneInput').value.trim();
        const locality = document.getElementById('wregLocalityInput').value.trim();
        const cat = document.getElementById('wregCategorySelect').value;
        const hourly = parseInt(document.getElementById('wregHourlyInput').value, 10) || 150;
        const daily = parseInt(document.getElementById('wregDailyInput').value, 10) || 600;
        const weekly = parseInt(document.getElementById('wregWeeklyInput').value, 10) || (daily * 6);
        const monthly = parseInt(document.getElementById('wregMonthlyInput').value, 10) || (daily * 25);

        if (!name || !phone || !locality) {
          showToast('कृपया नाम, मोबाइल नंबर और गांव/कस्बा अवश्य भरें');
          return;
        }

        // AUTO-FEED TO MASTER LOCATION DATABASE!
        const addedLoc = window.AMBALA_DATA.addMasterLocality(locality, 'village');
        STATE.localities = window.AMBALA_DATA.getStoredLocalities();
        syncLocalitiesDatalist();

        const catObj = window.AMBALA_DATA.categories.find(c => c.id === cat) || { nameHi: "कामगार", nameEn: "Worker" };

        const newWorker = {
          id: 'w-' + Date.now(),
          name: name,
          category: cat,
          roleEn: catObj.nameEn,
          roleHi: catObj.nameHi,
          townOrVillage: locality,
          localityId: addedLoc ? addedLoc.id : 'custom_' + Date.now(),
          localityNameEn: locality,
          localityNameHi: locality,
          phone: phone,
          whatsapp: "91" + phone,
          experience: "5 Years Exp",
          experienceHi: "5 साल अनुभव",
          rating: 5.0,
          reviewsCount: 1,
          isVerified: false,
          status: 'pending', // Starts as pending until Admin approves
          availableToday: true,
          supportedDurations: ["hourly", "daily", "weekly", "monthly"],
          hourlyRate: hourly,
          dailyRate: daily,
          weeklyRate: weekly,
          monthlyRate: monthly,
          bioHi: `${locality} में ${catObj.nameHi} का ईमानदार व समय पर काम।`,
          bioEn: `Reliable ${catObj.nameEn} services in ${locality}, Ambala.`,
          avatar: "assets/worker_rajesh.jpg",
          registeredAt: new Date().toISOString()
        };

        STATE.workers.unshift(newWorker);
        persistWorkers();
        regForm.reset();

        showToast('📝 प्रोफाइल जमा हुई! आपका गांव मास्टर लिस्ट में जुड़ गया। एडमिन अप्रूवल पेंडिंग है।');
        playSubtleChime(620, 0.2);
        speakHindi("धन्यवाद। आपकी प्रोफाइल और गांव अम्बाला मास्टर में दर्ज हो गया है। एडमिन सत्यापन के बाद यह कस्टमर ऐप पर दिखेगा।");
      });
    }
  }


  // ==========================================================================
  // VIEW 3: ADMIN PORTAL LOGIC
  // ==========================================================================

  function renderAdminDashboard() {
    // 1. Stats
    const totalWorkersEl = document.getElementById('admin-stat-total-workers');
    const pendingWorkersEl = document.getElementById('admin-stat-pending-workers');
    const jobsCountEl = document.getElementById('admin-stat-jobs');
    const locCountEl = document.getElementById('admin-stat-locations');

    const pendingWorkers = STATE.workers.filter(w => w.status === 'pending');
    if (totalWorkersEl) totalWorkersEl.textContent = STATE.workers.length;
    if (pendingWorkersEl) pendingWorkersEl.textContent = pendingWorkers.length;
    if (jobsCountEl) jobsCountEl.textContent = STATE.jobs.length;
    if (locCountEl) locCountEl.textContent = STATE.localities.length;

    renderAdminApprovalsList();
    renderAdminLocationsList();
    renderAdminCategoriesList();
    renderAdminAdsList();
    renderAdminJobsList();
  }

  function renderAdminCategoriesList() {
    const list = document.getElementById('admin-categories-list');
    if (!list) return;
    list.innerHTML = '';

    STATE.categories.forEach(cat => {
      if (cat.id === 'all') return;
      const card = document.createElement('div');
      card.className = "p-2.5 bg-white rounded-xl border border-slate-200 flex items-center justify-between text-xs";
      card.innerHTML = `
        <div class="flex items-center gap-2 min-w-0">
          <span class="text-base shrink-0">${cat.icon}</span>
          <div class="truncate">
            <span class="font-bold text-dark block truncate">${cat.nameHi}</span>
            <span class="text-[10px] text-slate-400 block truncate">${cat.nameEn || ''}</span>
          </div>
        </div>
        <div class="shrink-0 ml-1">
          ${cat.isCustom ? '<span class="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[9px] font-bold border border-emerald-200">कस्टम</span>' : '<span class="text-[9px] text-slate-400">मानक</span>'}
        </div>
      `;
      list.appendChild(card);
    });
  }

  function renderAdminApprovalsList() {
    const list = document.getElementById('admin-worker-approval-list');
    if (!list) return;
    list.innerHTML = '';

    const pending = STATE.workers.filter(w => w.status === 'pending');
    const approved = STATE.workers.filter(w => w.status === 'approved');

    if (pending.length === 0) {
      list.innerHTML = `
        <div class="p-4 bg-white rounded-2xl border border-slate-200 text-center text-xs text-slate-500 mb-3">
          ✓ कोई नया कामगार सत्यापन के लिए लंबित नहीं है। सभी सत्यापित हैं!
        </div>
      `;
    } else {
      pending.forEach(w => {
        const item = document.createElement('div');
        item.className = "p-3 bg-white rounded-2xl border-2 border-amber-300 flex flex-col gap-2 shadow-xs";
        item.innerHTML = `
          <div class="flex items-center justify-between">
            <span class="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 font-bold text-[10px]">पेंडिंग सत्यापन (KYC)</span>
            <span class="text-[10px] text-slate-400 font-medium">फोन: ${w.phone}</span>
          </div>

          <div class="flex items-center gap-2.5">
            <div class="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-dark text-sm">
              ${w.name.charAt(0)}
            </div>
            <div class="flex-1 min-w-0">
              <h4 class="text-xs font-bold text-dark truncate">${w.name}</h4>
              <span class="text-[11px] text-slate-500 block">${w.roleHi} • 📍 ${w.townOrVillage || w.localityNameHi}</span>
              <span class="text-[10px] text-slate-700 font-semibold mt-0.5 block">
                दरें: ₹${w.hourlyRate}/घंटा • ₹${w.dailyRate}/दिन • ₹${w.weeklyRate}/हफ्ता • ₹${w.monthlyRate}/माह
              </span>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100 mt-1">
            <button class="btn-admin-approve w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1" data-id="${w.id}">
              <span>स्वीकृत करें (Approve)</span>
              <span>✓</span>
            </button>
            <button class="btn-admin-reject w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs" data-id="${w.id}">
              अस्वीकृत (Reject)
            </button>
          </div>
        `;
        list.appendChild(item);
      });
    }

    // Also list approved workers with active tag
    const approvedSection = document.createElement('div');
    approvedSection.className = "mt-3 flex flex-col gap-1.5";
    approvedSection.innerHTML = `<span class="text-[11px] font-bold uppercase tracking-wider text-slate-400">सत्यापित सक्रिय कामगार (${approved.length})</span>`;
    approved.slice(0, 5).forEach(w => {
      const row = document.createElement('div');
      row.className = "p-2.5 bg-white rounded-xl border border-slate-200 flex items-center justify-between text-xs";
      row.innerHTML = `
        <div class="truncate">
          <span class="font-bold text-dark">${w.name}</span>
          <span class="text-slate-500 text-[11px] ml-1">(${w.roleHi})</span>
        </div>
        <span class="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">स्वीकृत ✓</span>
      `;
      approvedSection.appendChild(row);
    });
    list.appendChild(approvedSection);

    // Attach approve / reject handlers
    list.querySelectorAll('.btn-admin-approve').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const worker = STATE.workers.find(w => w.id === id);
        if (worker) {
          worker.status = 'approved';
          worker.isVerified = true;
          persistWorkers();
          showToast(`🎉 ${worker.name} को स्वीकृत किया गया! अब ग्राहक ऐप पर लाइव है।`);
          renderAdminDashboard();
        }
      });
    });

    list.querySelectorAll('.btn-admin-reject').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        STATE.workers = STATE.workers.filter(w => w.id !== id);
        persistWorkers();
        showToast('कामगार अस्वीकृत कर दिया गया।');
        renderAdminDashboard();
      });
    });
  }

  function renderAdminLocationsList() {
    const list = document.getElementById('admin-locations-list');
    const countEl = document.getElementById('admin-locations-count');
    if (!list) return;
    list.innerHTML = '';

    if (countEl) countEl.textContent = `${STATE.localities.length} इलाके व गांव`;

    STATE.localities.forEach(loc => {
      if (loc.id === 'all') return;
      const item = document.createElement('div');
      item.className = "p-2.5 bg-white rounded-xl border border-slate-200 flex items-center justify-between text-xs";
      item.innerHTML = `
        <div class="flex items-center gap-2">
          <span>📍</span>
          <div>
            <span class="font-bold text-dark">${loc.nameHi}</span>
            <span class="text-[10px] text-slate-400 block">${loc.nameEn || ''}</span>
          </div>
        </div>
        <div>
          ${loc.isCustom ? '<span class="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-semibold text-[10px] border border-emerald-200">कामगार द्वारा जोड़ा गया</span>' : '<span class="text-[10px] text-slate-400">सिस्टम</span>'}
        </div>
      `;
      list.appendChild(item);
    });
  }

  function renderAdminAdsList() {
    const list = document.getElementById('admin-ads-list');
    if (!list) return;
    list.innerHTML = '';

    if (STATE.ads.length === 0) {
      list.innerHTML = `<div class="p-3 text-xs text-slate-400 text-center">कोई विज्ञापन सक्रिय नहीं है</div>`;
      return;
    }

    STATE.ads.forEach(ad => {
      const item = document.createElement('div');
      item.className = "p-3 bg-white rounded-2xl border border-slate-200 flex flex-col gap-1.5";
      item.innerHTML = `
        <div class="flex items-center justify-between">
          <span class="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">${ad.badge || 'विज्ञापन'}</span>
          <button class="btn-toggle-ad text-[11px] font-bold ${ad.isActive ? 'text-emerald-700 underline' : 'text-slate-400 underline'}" data-id="${ad.id}">
            ${ad.isActive ? 'सक्रिय (Active)' : 'बंद (Paused)'}
          </button>
        </div>
        <h4 class="text-xs font-bold text-dark">${ad.titleHi}</h4>
        <p class="text-[11px] text-slate-500">${ad.subtitleHi}</p>
        <div class="flex items-center justify-between pt-1 border-t border-slate-100 text-[11px]">
          <span class="text-slate-600 font-medium">फोन: ${ad.phone}</span>
          <button class="btn-delete-ad text-red-500 hover:text-red-700 font-bold" data-id="${ad.id}">हटाएं</button>
        </div>
      `;
      list.appendChild(item);
    });

    list.querySelectorAll('.btn-toggle-ad').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const ad = STATE.ads.find(a => a.id === id);
        if (ad) {
          ad.isActive = !ad.isActive;
          persistAds();
          renderAdminAdsList();
          renderCustomerAdsBanner();
          showToast(ad.isActive ? 'विज्ञापन सक्रिय हो गया' : 'विज्ञापन रोका गया');
        }
      });
    });

    list.querySelectorAll('.btn-delete-ad').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        STATE.ads = STATE.ads.filter(a => a.id !== id);
        persistAds();
        renderAdminAdsList();
        renderCustomerAdsBanner();
        showToast('विज्ञापन हटाया गया');
      });
    });
  }

  function renderAdminJobsList() {
    const list = document.getElementById('admin-jobs-list');
    const countEl = document.getElementById('admin-jobs-count');
    if (!list) return;
    list.innerHTML = '';

    if (countEl) countEl.textContent = `${STATE.jobs.length} पोस्ट`;

    STATE.jobs.forEach(j => {
      const item = document.createElement('div');
      item.className = "p-3 bg-white rounded-2xl border border-slate-200 flex flex-col gap-1 text-xs";
      item.innerHTML = `
        <div class="flex items-center justify-between">
          <span class="font-bold text-dark">${j.titleHi}</span>
          <span class="text-[10px] text-slate-400">${j.timeAgoHi || 'हाल ही में'}</span>
        </div>
        <div class="flex items-center gap-2 text-[11px] text-slate-500">
          <span>📍 ${j.townOrVillage || j.localityHi}</span>
          <span>•</span>
          <span class="font-bold text-dark">${j.budget}</span>
        </div>
        <div class="text-[11px] text-slate-600 mt-0.5">
          ग्राहक: <span class="font-bold text-dark">${j.customerName}</span> (कॉल: <a href="tel:${j.customerPhone}" class="text-brand-600 underline">${j.customerPhone}</a>)
        </div>
      `;
      list.appendChild(item);
    });
  }

  function setupAdminEvents() {
    // Admin Tabs Switcher
    document.querySelectorAll('.admin-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');

        document.querySelectorAll('.admin-tab-btn').forEach(b => {
          b.className = "admin-tab-btn flex-1 py-1.5 text-center rounded-xl text-slate-600 hover:text-dark transition-all";
        });
        btn.className = "admin-tab-btn flex-1 py-1.5 text-center rounded-xl bg-dark text-white font-bold transition-all shadow-xs";

        document.querySelectorAll('.admin-tab-pane').forEach(p => {
          p.classList.add('hidden');
          p.classList.remove('block');
        });

        const targetPane = document.getElementById(tabId);
        if (targetPane) {
          targetPane.classList.remove('hidden');
          targetPane.classList.add('block');
        }
        playSubtleChime(500);
      });
    });

    // Admin Add Master Location
    const addLocBtn = document.getElementById('btn-admin-add-location');
    const addLocInput = document.getElementById('adminNewLocationInput');
    const addLocType = document.getElementById('adminNewLocationType');
    if (addLocBtn && addLocInput) {
      addLocBtn.addEventListener('click', () => {
        const val = addLocInput.value.trim();
        const type = (addLocType ? addLocType.value : 'village') || 'village';
        if (!val) return;
        const newLoc = window.AMBALA_DATA.addMasterLocality(val, type);
        if (newLoc) {
          STATE.localities = window.AMBALA_DATA.getStoredLocalities();
          syncLocalitiesDatalist();
          addLocInput.value = '';
          showToast(`📍 नया गांव/कस्बा "${val}" मास्टर में जुड़ गया!`);
          renderAdminLocationsList();
          setupLocalityModal();
        }
      });
    }

    // Admin Add Master Category / Work Type
    const addCatBtn = document.getElementById('btn-admin-add-category');
    const addCatInput = document.getElementById('adminNewCategoryInput');
    if (addCatBtn && addCatInput) {
      addCatBtn.addEventListener('click', () => {
        const val = addCatInput.value.trim();
        if (!val) return;
        const newCat = window.AMBALA_DATA.addMasterCategory(val, val, '🛠️');
        if (newCat) {
          STATE.categories = window.AMBALA_DATA.getStoredCategories();
          addCatInput.value = '';
          showToast(`🛠️ नया काम "${val}" मास्टर में जुड़ गया!`);
          renderCategoryChips();
          syncCategorySelects();
          renderAdminCategoriesList();
        }
      });
    }

    // Admin Add New Ad
    const adForm = document.getElementById('adminNewAdForm');
    if (adForm) {
      adForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('adminAdTitleInput').value.trim();
        const sub = document.getElementById('adminAdSubtitleInput').value.trim();
        const phone = document.getElementById('adminAdPhoneInput').value.trim();

        if (!title || !phone) return;

        const newAd = {
          id: 'ad-' + Date.now(),
          titleHi: title,
          subtitleHi: sub || 'विशेष डिस्काउंट व ऑफर',
          phone: phone,
          badge: 'स्पॉन्सर',
          isActive: true
        };

        STATE.ads.unshift(newAd);
        persistAds();
        adForm.reset();

        showToast('📢 नया विज्ञापन कस्टमर ऐप पर लाइव हो गया!');
        renderAdminAdsList();
        renderCustomerAdsBanner();
      });
    }
  }


  // ==========================================================================
  // SHARED GLOBAL EVENTS & INITIALIZATION
  // ==========================================================================

  function setupGlobalEvents() {
    // 1. Role switcher (Customer / Worker / Admin)
    document.querySelectorAll('.role-switch-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const role = btn.getAttribute('data-role');
        if (role) setAppRole(role);
      });
    });

    // 2. Customer Duration Pills (Segmented 4-Tier)
    document.querySelectorAll('.duration-tab-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        STATE.activeDuration = pill.getAttribute('data-duration');
        updateFilterPillsUI();
        renderHomeWorkersFeed();
        playSubtleChime(500);
      });
    });

    // 3. Customer Category Pills
    document.querySelectorAll('.cat-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.getAttribute('data-cat');
        if (cat === 'all') {
          STATE.activeCategory = 'all';
        } else {
          STATE.activeCategory = STATE.activeCategory === cat ? 'all' : cat;
        }
        updateFilterPillsUI();
        renderHomeWorkersFeed();
        playSubtleChime(520);
      });
    });

    // 4. Search, Clear & Voice Mic & Quick Tags
    const searchInput = document.getElementById('worker-search-input');
    const clearSearchBtn = document.getElementById('worker-search-clear-btn');
    const micBtn = document.getElementById('voice-mic-btn');
    const micToast = document.getElementById('mic-toast');
    const micCancel = document.getElementById('mic-cancel-btn');

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        STATE.searchQuery = e.target.value;
        renderHomeWorkersFeed();
      });
    }

    if (clearSearchBtn && searchInput) {
      clearSearchBtn.addEventListener('click', () => {
        searchInput.value = '';
        STATE.searchQuery = '';
        clearSearchBtn.classList.add('hidden');
        renderHomeWorkersFeed();
        playSubtleChime(460);
      });
    }

    // Trending quick-search keyword chips
    document.querySelectorAll('.quick-search-tag').forEach(tag => {
      tag.addEventListener('click', () => {
        const q = tag.getAttribute('data-q') || tag.textContent.replace(/^[^\w\s\u0900-\u097F]+/, '').trim();
        if (searchInput) {
          searchInput.value = q;
          STATE.searchQuery = q;
          if (clearSearchBtn) clearSearchBtn.classList.remove('hidden');
          renderHomeWorkersFeed();
          showToast(`🔍 सर्च: ${q}`);
          playSubtleChime(540);
        }
      });
    });

    if (micBtn && micToast && micCancel) {
      micBtn.addEventListener('click', () => {
        micToast.classList.remove('hidden');
        playSubtleChime(580);
        setTimeout(() => {
          if (!micToast.classList.contains('hidden')) {
            if (searchInput) {
              searchInput.value = "प्लंबर";
              STATE.searchQuery = "प्लंबर";
              if (clearSearchBtn) clearSearchBtn.classList.remove('hidden');
              renderHomeWorkersFeed();
            }
            micToast.classList.add('hidden');
            showToast('सर्च: प्लंबर मिस्त्री दिखाए गए');
          }
        }, 1600);
      });

      micCancel.addEventListener('click', () => {
        micToast.classList.add('hidden');
      });
    }

    // 5. Back to Home from Profile
    const backBtn = document.getElementById('btn-back-to-home');
    if (backBtn) {
      backBtn.addEventListener('click', () => navigateCustomerScreen('screen-home'));
    }

    // 6. Audio Bio
    const voiceBioBtn = document.getElementById('btn-play-voice-bio');
    if (voiceBioBtn) {
      voiceBioBtn.addEventListener('click', () => {
        const w = STATE.selectedWorker || STATE.workers[0];
        const text = `नमस्ते, मैं ${w.name}, ${w.townOrVillage || w.localityNameHi} से। ${w.bioHi || w.roleHi}`;
        speakHindi(text);
      });
    }

    // 7. Rate Card Audio
    const rateAudioBtn = document.getElementById('btn-play-rate-audio');
    if (rateAudioBtn) {
      rateAudioBtn.addEventListener('click', () => {
        const text = "अम्बाला वर्कर मानक दर सूची: बिजली मिस्त्री 250 रुपये विजिट, 800 रुपये दिहाड़ी। काम वाली बाई 1800 से 2500 रुपये माह। दिहाड़ी मजदूर 600 रुपये।";
        speakHindi(text);
      });
    }

    // 8. Rate Card Tabs
    document.querySelectorAll('.rate-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');
        
        document.querySelectorAll('.rate-tab-btn').forEach(b => {
          b.className = "rate-tab-btn flex-1 py-1.5 text-center rounded-lg text-slate-600 hover:text-dark transition-all";
        });
        btn.className = "rate-tab-btn flex-1 py-1.5 text-center rounded-lg bg-white text-dark shadow-sm transition-all";

        document.querySelectorAll('.rate-subtab-content').forEach(sec => {
          sec.classList.add('hidden');
          sec.classList.remove('flex');
        });
        const activeSec = document.getElementById(targetId);
        if (activeSec) {
          activeSec.classList.remove('hidden');
          activeSec.classList.add('flex');
        }
        playSubtleChime(480);
      });
    });

    // 9. Customer Bottom Navigation Dock (Home / Workers / Rates / Post Job)
    document.querySelectorAll('.unified-nav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const nav = btn.getAttribute('data-nav');
        if (nav === 'home') {
          navigateCustomerScreen('screen-home');
        } else if (nav === 'profile') {
          const w = STATE.selectedWorker || STATE.workers[0];
          if (w) loadWorkerProfile(w);
          navigateCustomerScreen('screen-worker-profile');
        } else if (nav === 'rates') {
          navigateCustomerScreen('screen-rate-card');
        }
        playSubtleChime(480);
      });
    });

    // Customer Post Job Nav button
    const postNavBtn = document.getElementById('nav-btn-customer-post');
    if (postNavBtn) {
      postNavBtn.addEventListener('click', () => {
        openPostJobModal();
        playSubtleChime(520);
      });
    }

    // 10. Desktop Frame Mockup Toggle
    const frameToggleBtn = document.getElementById('toggle-frame-btn');
    if (frameToggleBtn) {
      frameToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('desktop-mockup-mode');
        const isMockup = document.body.classList.contains('desktop-mockup-mode');
        frameToggleBtn.textContent = isMockup ? 'Toggle Fullscreen' : 'Toggle Phone Frame';
      });
    }

    // 11. Language Toggle
    const langBtn = document.getElementById('btn-lang-switcher');
    if (langBtn) {
      langBtn.addEventListener('click', () => {
        STATE.language = STATE.language === 'hi' ? 'en' : 'hi';
        localStorage.setItem('ambala_mobile_lang', STATE.language);
        document.getElementById('lang-indicator-text').textContent = STATE.language === 'hi' ? 'हिं' : 'EN';
        showToast(STATE.language === 'hi' ? 'भाषा: हिंदी' : 'Language: English');
      });
    }
  }

  // --- AUTHENTICATION & LOGIN PORTAL EVENTS ---
  function setupAuthEvents() {
    const loginForm = document.getElementById('unified-login-form');
    const idInput = document.getElementById('login-id-input');
    const passInput = document.getElementById('login-pass-input');
    const togglePassBtn = document.getElementById('btn-toggle-login-pass');
    const iconTogglePass = document.getElementById('icon-toggle-pass');
    const rolePreview = document.getElementById('login-role-detector-preview');
    const rolePreviewIcon = document.getElementById('role-preview-icon');
    const rolePreviewText = document.getElementById('role-preview-text');
    const errorAlert = document.getElementById('login-error-alert');
    const errorText = document.getElementById('login-error-text');

    // Live typing role detection indicator
    if (idInput && rolePreview) {
      idInput.addEventListener('input', () => {
        const val = idInput.value.trim().toLowerCase();
        if (errorAlert) errorAlert.classList.add('hidden');

        if (!val) {
          rolePreview.className = "p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-[11px] flex items-center gap-2 text-slate-400 transition-all";
          if (rolePreviewIcon) rolePreviewIcon.textContent = "⚡";
          if (rolePreviewText) rolePreviewText.textContent = "आईडी दर्ज करें, सिस्टम स्वतः संबंधित ऐप तय करेगा";
          return;
        }

        const detected = detectRoleFromInput(val);
        if (detected === 'admin') {
          rolePreview.className = "p-2.5 rounded-xl bg-purple-950/50 border border-purple-500/70 text-[11px] flex items-center gap-2 text-purple-200 transition-all shadow-sm";
          if (rolePreviewIcon) rolePreviewIcon.textContent = "🛡️";
          if (rolePreviewText) rolePreviewText.innerHTML = "<strong>एडमिन क्रेडेंशियल पहचाना:</strong> एडमिन कंट्रोल पैनल (Admin Portal) खुलेगा";
        } else if (detected === 'worker') {
          rolePreview.className = "p-2.5 rounded-xl bg-amber-950/50 border border-amber-500/70 text-[11px] flex items-center gap-2 text-amber-200 transition-all shadow-sm";
          if (rolePreviewIcon) rolePreviewIcon.textContent = "👷";
          if (rolePreviewText) rolePreviewText.innerHTML = "<strong>कामगार क्रेडेंशियल पहचाना:</strong> कामगार / लेबर ऐप (Worker Portal) खुलेगा";
        } else {
          rolePreview.className = "p-2.5 rounded-xl bg-blue-950/50 border border-blue-500/70 text-[11px] flex items-center gap-2 text-blue-200 transition-all shadow-sm";
          if (rolePreviewIcon) rolePreviewIcon.textContent = "🛒";
          if (rolePreviewText) rolePreviewText.innerHTML = "<strong>ग्राहक क्रेडेंशियल पहचाना:</strong> ग्राहक ऐप (Customer Portal) खुलेगा";
        }
      });
    }

    // Toggle password visibility
    if (togglePassBtn && passInput) {
      togglePassBtn.addEventListener('click', () => {
        const isPass = passInput.getAttribute('type') === 'password';
        passInput.setAttribute('type', isPass ? 'text' : 'password');
        if (iconTogglePass) {
          iconTogglePass.textContent = isPass ? 'visibility_off' : 'visibility';
        }
      });
    }

    // Form submit handler
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const idVal = idInput ? idInput.value.trim() : '';
        const passVal = passInput ? passInput.value.trim() : '';

        const account = authenticateCredentials(idVal, passVal);
        if (account) {
          if (errorAlert) errorAlert.classList.add('hidden');
          loginUser(account);
        } else {
          if (errorAlert && errorText) {
            errorText.textContent = 'अमान्य यूजर आईडी या पासवर्ड! कृपया सही क्रेडेंशियल दर्ज करें।';
            errorAlert.classList.remove('hidden');
            loginForm.classList.add('shake');
            setTimeout(() => loginForm.classList.remove('shake'), 500);
          }
          playSubtleChime(260, 0.2);
          showToast('❌ आईडी या पासवर्ड गलत है!');
        }
      });
    }

    // 1-Tap Demo Credentials Chips
    document.querySelectorAll('.demo-credential-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const dId = chip.getAttribute('data-id');
        const dPass = chip.getAttribute('data-pass');
        if (idInput) idInput.value = dId;
        if (passInput) passInput.value = dPass;
        if (idInput) idInput.dispatchEvent(new Event('input'));

        const account = authenticateCredentials(dId, dPass);
        if (account) {
          loginUser(account);
        }
      });
    });

    // Guest Customer Button
    const guestBtn = document.getElementById('btn-login-guest-customer');
    if (guestBtn) {
      guestBtn.addEventListener('click', () => {
        const guestUser = {
          role: 'customer',
          id: 'guest',
          name: 'अतिथि ग्राहक (Guest)',
          phone: '',
          badge: '🛒 अतिथि ग्राहक'
        };
        loginUser(guestUser);
      });
    }

    // Logout Buttons (Top Mobile and Desktop)
    const topLogout = document.getElementById('btn-top-logout');
    if (topLogout) {
      topLogout.addEventListener('click', () => {
        logoutUser();
      });
    }

    const deskLogout = document.getElementById('btn-desktop-logout');
    if (deskLogout) {
      deskLogout.addEventListener('click', () => {
        logoutUser();
      });
    }

    // Desktop to Login Portal button
    const deskToLogin = document.getElementById('btn-desktop-to-login');
    if (deskToLogin) {
      deskToLogin.addEventListener('click', () => {
        setAppRole('login', true);
      });
    }

    // New worker registration link from login screen
    const regLink = document.getElementById('btn-login-open-worker-reg');
    if (regLink) {
      regLink.addEventListener('click', () => {
        setAppRole('worker', true);
        const regTabBtn = document.querySelector('.worker-tab-btn[data-tab="tab-worker-reg"]');
        if (regTabBtn) regTabBtn.click();
      });
    }

    // Role Restriction Modal Buttons
    const closeRestrictedBtn = document.getElementById('btn-close-restricted-modal');
    if (closeRestrictedBtn) {
      closeRestrictedBtn.addEventListener('click', () => {
        const modal = document.getElementById('modal-role-restricted');
        if (modal) {
          modal.classList.add('hidden');
          modal.classList.remove('flex');
        }
      });
    }

    const gotoLoginBtn = document.getElementById('btn-goto-login-portal');
    if (gotoLoginBtn) {
      gotoLoginBtn.addEventListener('click', () => {
        const modal = document.getElementById('modal-role-restricted');
        if (modal) {
          modal.classList.add('hidden');
          modal.classList.remove('flex');
        }
        setAppRole('login', true);
      });
    }
  }

  // --- BOOTSTRAP ---
  document.addEventListener('DOMContentLoaded', () => {
    initData();
    setupGlobalEvents();
    setupAuthEvents();
    setupLocalityModal();
    setupAddWorkTypeModal();
    setupPostJobModal();
    setupWorkerEvents();
    setupAdminEvents();

    // Check saved session in localStorage
    const savedSession = localStorage.getItem('ambala_auth_session');
    if (savedSession) {
      try {
        STATE.currentUser = JSON.parse(savedSession);
        syncAuthUI();
      } catch (e) {
        STATE.currentUser = null;
      }
    }

    // Check URL parameters for direct role loading (e.g., ?role=worker or ?role=admin)
    const urlParams = new URLSearchParams(window.location.search);
    const initialRole = urlParams.get('role');
    if (initialRole) {
      setAppRole(initialRole, true);
    } else if (STATE.currentUser) {
      setAppRole(STATE.currentUser.role, true);
    } else {
      setAppRole('login', true);
    }

    const initialScreen = urlParams.get('screen');
    if (initialScreen) {
      if (initialScreen === 'profile') {
        const w = STATE.selectedWorker || STATE.workers[0];
        if (w) loadWorkerProfile(w);
        navigateCustomerScreen('screen-worker-profile');
      } else if (initialScreen === 'rates') {
        navigateCustomerScreen('screen-rate-card');
      }
    }
  });

  // Expose key helpers to global window for seamless accessibility
  window.setAppRole = setAppRole;
  window.loginUser = loginUser;
  window.logoutUser = logoutUser;
  window.navigateCustomerScreen = navigateCustomerScreen;

})();

