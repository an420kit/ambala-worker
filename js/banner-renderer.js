/**
 * AMBALA WORKER (अम्बाला वर्कर) - DYNAMIC BANNER & ADVERTISEMENT ENGINE
 * Supports Upper Top Banner and Side Floating Banner with custom photo & 10s audio/video clip.
 */

(function () {
  'use strict';

  // Toggle audio playback on video/audio elements
  window.toggleBannerAudio = function (videoElId, btnEl) {
    const vid = document.getElementById(videoElId);
    if (!vid) return;

    const icon = btnEl ? btnEl.querySelector('.banner-sound-icon') : null;
    const lbl = btnEl ? btnEl.querySelector('.banner-sound-lbl') : null;

    if (vid.muted) {
      vid.muted = false;
      vid.volume = 1.0;
      vid.play().catch(function () {});
      if (icon) icon.textContent = '🔊';
      if (lbl) lbl.textContent = 'आवाज बंद करें';
      if (btnEl) {
        btnEl.classList.remove('bg-black/80', 'text-amber-400');
        btnEl.classList.add('bg-emerald-600', 'text-white');
      }
      showBannerToast('🔊 10-सेकंड ऑडियो क्लिप चालू है!');
    } else {
      vid.muted = true;
      if (icon) icon.textContent = '🔇';
      if (lbl) lbl.textContent = '10s आवाज सुनें';
      if (btnEl) {
        btnEl.classList.remove('bg-emerald-600', 'text-white');
        btnEl.classList.add('bg-black/80', 'text-amber-400');
      }
      showBannerToast('🔇 ऑडियो म्यूट किया गया');
    }
  };

  // Toggle side banner floating drawer
  window.toggleBannerDrawer = function (drawerId, badgeId) {
    const drawer = document.getElementById(drawerId);
    const badge = document.getElementById(badgeId);
    if (!drawer) return;

    if (drawer.classList.contains('hidden')) {
      drawer.classList.remove('hidden');
      if (badge) badge.classList.add('hidden');
    } else {
      drawer.classList.add('hidden');
      if (badge) badge.classList.remove('hidden');
    }
  };

  // Toast Notification for Banner Actions
  function showBannerToast(msg) {
    let toast = document.getElementById('ambala-banner-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'ambala-banner-toast';
      toast.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%) translateY(-20px);
        background: rgba(15, 23, 42, 0.95);
        color: #f8fafc;
        border: 1px solid rgba(245, 158, 11, 0.5);
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);
        padding: 10px 18px;
        border-radius: 9999px;
        font-size: 12px;
        font-weight: 700;
        z-index: 99999;
        display: flex;
        align-items: center;
        gap: 8px;
        opacity: 0;
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        pointer-events: none;
      `;
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';

    setTimeout(function () {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(-20px)';
    }, 2500);
  }

  // Main Render Function for Upper and Side Banners
  window.renderAmbalaBanners = function (options) {
    const opts = options || {};
    const portal = opts.portal || 'customer'; // 'customer' or 'worker'
    const upperContainer = document.getElementById(opts.upperContainerId || 'customer-upper-banner-container');
    const sideContainer = document.getElementById(opts.sideContainerId || 'customer-side-banner-container');

    const ads = window.AMBALA_DATA ? window.AMBALA_DATA.getStoredAds() : [];
    const activeAds = ads.filter(function (a) {
      return a.isActive && (a.target === 'both' || a.target === portal);
    });

    // 1. RENDER UPPER BANNER
    if (upperContainer) {
      const upperAd = activeAds.find(function (a) {
        return a.bannerType === 'upper' || a.bannerType === 'both';
      }) || activeAds[0];

      if (upperAd) {
        const vidId = portal + '-upper-vid';
        const isVideo = upperAd.mediaType === 'video';

        upperContainer.innerHTML = `
          <div class="relative bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-3.5 text-white shadow-lg border border-indigo-500/30 overflow-hidden">
            <div class="flex flex-col sm:flex-row items-center gap-3.5">
              <div class="relative w-full sm:w-48 h-36 rounded-2xl overflow-hidden bg-black shrink-0 border border-slate-700">
                ${
                  isVideo
                    ? `
                  <video id="${vidId}" src="${upperAd.mediaUrl}" loop playsinline autoplay muted class="w-full h-full object-cover"></video>
                  <button type="button" onclick="toggleBannerAudio('${vidId}', this)" class="absolute bottom-2 right-2 px-2.5 py-1 rounded-lg bg-black/80 hover:bg-black text-[10px] font-bold text-amber-400 flex items-center gap-1 shadow-md transition-all">
                    <span class="banner-sound-icon">🔇</span>
                    <span class="banner-sound-lbl">10s आवाज सुनें</span>
                  </button>
                  <div class="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-rose-600 text-white font-black text-[9px] uppercase tracking-wider flex items-center gap-1 shadow-sm">
                    <span class="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                    <span>10s क्लिप</span>
                  </div>
                `
                    : `
                  <img src="${upperAd.mediaUrl || 'assets/hero_banner.jpg'}" class="w-full h-full object-cover" alt="Banner Ad" />
                `
                }
              </div>
              <div class="flex-1 min-w-0 flex flex-col justify-between py-1">
                <div>
                  <div class="flex items-center gap-1.5 mb-1">
                    <span class="text-[9px] px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black">${upperAd.badge || 'ऑफर'}</span>
                    <span class="text-[10px] text-emerald-400 font-bold">⭐ मुख्य स्पॉन्सर</span>
                  </div>
                  <h3 class="text-sm sm:text-base font-extrabold text-white leading-tight">${upperAd.titleHi}</h3>
                  <p class="text-xs text-slate-300 mt-1 line-clamp-2">${upperAd.subtitleHi}</p>
                </div>
                <div class="flex items-center gap-2 mt-3">
                  <a href="tel:${upperAd.phone}" class="px-3.5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl text-xs font-black shadow-sm flex items-center gap-1 active:scale-95 transition-all">
                    <span>📞 तुरंत कॉल करें</span>
                  </a>
                  <a href="https://wa.me/91${upperAd.phone}" target="_blank" class="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-emerald-500/30 rounded-xl text-xs font-bold flex items-center gap-1 active:scale-95 transition-all">
                    <span>💬 व्हाट्सएप</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        `;
      } else {
        upperContainer.innerHTML = '';
      }
    }

    // 2. RENDER SIDE FLOATING BANNER
    if (sideContainer) {
      const sideAd = activeAds.find(function (a) {
        return a.bannerType === 'side' || a.bannerType === 'both';
      });

      if (sideAd) {
        const sideBadgeId = portal + '-side-banner-badge';
        const sideDrawerId = portal + '-side-banner-drawer';
        const sideVidId = portal + '-side-vid';
        const isVideo = sideAd.mediaType === 'video';

        sideContainer.innerHTML = `
          <!-- Floating Badge on Right Side -->
          <button id="${sideBadgeId}" type="button" onclick="toggleBannerDrawer('${sideDrawerId}', '${sideBadgeId}')" class="fixed top-1/3 right-0 z-40 bg-gradient-to-l from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-[11px] py-2.5 px-3 rounded-l-2xl shadow-2xl flex items-center gap-1.5 active:scale-95 transition-all border-y border-l border-amber-300/40">
            <span class="animate-bounce">📢</span>
            <span>विशेष ऑफर</span>
            ${isVideo ? '<span class="text-[9px] px-1 py-0.5 rounded bg-slate-950 text-amber-300 font-bold">10s ऑडियो</span>' : ''}
          </button>

          <!-- Expandable Floating Drawer -->
          <div id="${sideDrawerId}" class="hidden fixed bottom-20 right-4 z-50 w-72 bg-slate-900/95 backdrop-blur-xl border-2 border-amber-400 rounded-3xl p-3.5 text-white shadow-2xl transition-all">
            <div class="flex items-center justify-between pb-2 border-b border-slate-800">
              <div class="flex items-center gap-1.5">
                <span class="text-sm">⚡</span>
                <span class="text-xs font-black text-amber-400">विशेष साइड स्पॉन्सर</span>
              </div>
              <button type="button" onclick="toggleBannerDrawer('${sideDrawerId}', '${sideBadgeId}')" class="w-6 h-6 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center text-xs font-bold">✕</button>
            </div>

            <div class="mt-2.5 flex flex-col gap-2">
              <div class="relative w-full h-36 rounded-2xl overflow-hidden bg-black border border-slate-700">
                ${
                  isVideo
                    ? `
                  <video id="${sideVidId}" src="${sideAd.mediaUrl}" loop playsinline autoplay muted class="w-full h-full object-cover"></video>
                  <button type="button" onclick="toggleBannerAudio('${sideVidId}', this)" class="absolute bottom-1.5 right-1.5 px-2 py-1 rounded-lg bg-black/80 text-[10px] font-bold text-amber-400 flex items-center gap-1">
                    <span class="banner-sound-icon">🔇</span>
                    <span class="banner-sound-lbl">10s आवाज सुनें</span>
                  </button>
                  <div class="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-rose-600 text-white font-black text-[9px] uppercase tracking-wider flex items-center gap-1 shadow-sm">
                    <span class="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                    <span>10s क्लिप</span>
                  </div>
                `
                    : `
                  <img src="${sideAd.mediaUrl || 'assets/worker_rajesh.jpg'}" class="w-full h-full object-cover" alt="Side Ad" />
                `
                }
              </div>

              <div>
                <span class="text-[9px] px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black">${sideAd.badge || 'इमरजेंसी'}</span>
                <h4 class="text-xs font-bold text-white leading-tight mt-1">${sideAd.titleHi}</h4>
                <p class="text-[11px] text-slate-300 mt-0.5">${sideAd.subtitleHi}</p>
              </div>

              <div class="grid grid-cols-2 gap-2 mt-1">
                <a href="tel:${sideAd.phone}" class="py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-1 text-center shadow-sm">
                  <span>📞 कॉल</span>
                </a>
                <a href="https://wa.me/91${sideAd.phone}" target="_blank" class="py-2 bg-slate-800 hover:bg-slate-700 text-emerald-400 font-bold border border-emerald-500/30 rounded-xl text-xs flex items-center justify-center gap-1 text-center">
                  <span>💬 व्हाट्सएप</span>
                </a>
              </div>
            </div>
          </div>
        `;
      } else {
        sideContainer.innerHTML = '';
      }
    }
  };
})();
