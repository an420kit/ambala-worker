/**
 * AMBALA WORKER (अम्बाला वर्कर) - ADMIN ADS & BANNERS MANAGER
 * Full UTF-8 monetization management for Upper Top Banners & Side Floating Banners
 * Supports Custom Photo Upload and 10-Second Video/Audio Clips with Audio.
 */

(function () {
  'use strict';

  let currentUploadedMediaUrl = 'assets/hero_banner.jpg';
  let currentUploadedMediaType = 'image';

  // Mount Tab 4 HTML
  function mountAdminAdsTab() {
    const tab = document.getElementById('tab-ads');
    if (!tab) return;

    tab.innerHTML = `
      <!-- Create & Publish New Banner -->
      <div class="bg-slate-800/90 p-5 rounded-3xl border border-slate-700 shadow-md flex flex-col gap-4">
        <div class="flex items-center justify-between pb-3 border-b border-slate-700">
          <div>
            <div class="flex items-center gap-2">
              <span class="text-xl">📢</span>
              <h3 class="text-sm font-bold text-white">नया स्पॉन्सर बैनर / विज्ञापन लाइव करें</h3>
            </div>
            <p class="text-xs text-slate-400 mt-0.5">ऊपर का मुख्य बैनर या साइड बैनर चुनें • कस्टम फोटो व 10-सेकंड ऑडियो क्लिप अपलोड करें</p>
          </div>
          <span class="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 font-bold text-[10px] border border-amber-500/30">2 प्रकार के बैनर</span>
        </div>

        <form id="admin-ad-form" class="flex flex-col gap-3.5" onsubmit="event.preventDefault(); window.handlePublishAd();">
          <!-- 1. Banner Type & Media Type Selection -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="flex flex-col gap-1">
              <label class="text-xs font-bold text-slate-300 flex items-center justify-between">
                <span>1. बैनर का प्रकार (Placement) *</span>
                <span class="text-[10px] text-amber-400 font-semibold">ऊपर या साइड</span>
              </label>
              <select id="select-ad-type" class="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400 font-bold">
                <option value="upper">⭐ ऊपर का मुख्य बैनर (Upper Top Banner)</option>
                <option value="side">📑 साइड बैनर (Side Floating Banner)</option>
                <option value="both">🌐 दोनों जगह (Upper + Side Banners)</option>
              </select>
            </div>

            <div class="flex flex-col gap-1">
              <label class="text-xs font-bold text-slate-300 flex items-center justify-between">
                <span>2. मीडिया प्रकार (Media Type) *</span>
                <span class="text-[10px] text-amber-400 font-semibold">फोटो या 10s क्लिप</span>
              </label>
              <select id="select-ad-mediatype" onchange="window.handleMediaTypeChange()" class="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400 font-bold">
                <option value="image">🖼️ कस्टम फोटो (Custom Photo)</option>
                <option value="video">🎥 10-सेकंड वीडियो/ऑडियो क्लिप (10s Clip with Audio)</option>
              </select>
            </div>
          </div>

          <!-- 2. File Upload & Live Preview Area -->
          <div class="bg-slate-900/90 p-4 rounded-2xl border border-slate-700 flex flex-col gap-3">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span class="text-xs font-bold text-white block">3. मीडिया फ़ाइल अपलोड (फोन/कंप्यूटर से चुनें)</span>
                <span id="ad-media-hint" class="text-[11px] text-slate-400 block mt-0.5">JPG, PNG, WEBP फोटो चुनें (या 10-सेकंड MP4/WEBM वीडियो क्लिप)</span>
              </div>
              <label for="input-ad-file" class="cursor-pointer px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black rounded-xl text-xs shadow-md flex items-center gap-1.5 shrink-0 self-start sm:self-auto transition-all">
                <span>📁</span>
                <span id="btn-ad-file-label">कस्टम फोटो / क्लिप चुनें</span>
              </label>
              <input id="input-ad-file" type="file" accept="image/*,video/*,audio/*" class="hidden" onchange="window.handleAdFileUpload(event)" />
            </div>

            <!-- Live Media Preview Player Box -->
            <div id="ad-preview-box" class="mt-1 p-3 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center gap-3.5">
              <div class="relative w-full sm:w-44 h-32 rounded-xl overflow-hidden bg-black shrink-0 border border-slate-700 flex items-center justify-center">
                <img id="ad-preview-img" src="assets/hero_banner.jpg" class="w-full h-full object-cover" alt="Preview"/>
                <video id="ad-preview-video" loop playsinline muted class="hidden w-full h-full object-cover"></video>
                <button type="button" id="ad-preview-sound-btn" onclick="window.toggleAdPreviewAudio()" class="hidden absolute bottom-2 right-2 px-2 py-1 rounded-lg bg-black/80 text-[10px] font-bold text-amber-400 flex items-center gap-1 shadow">
                  <span id="ad-preview-sound-icon">🔇</span>
                  <span id="ad-preview-sound-text">आवाज टेस्ट</span>
                </button>
                <span id="ad-preview-badge" class="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-emerald-600 text-white font-black text-[9px] uppercase shadow">फोटो</span>
              </div>
              <div class="flex-1 min-w-0">
                <span class="text-xs font-bold text-emerald-400 flex items-center gap-1">
                  <span>✅</span> <span>लाइव मीडिया प्रीव्यू</span>
                </span>
                <p id="ad-preview-status" class="text-[11px] text-slate-300 mt-0.5">डिफ़ॉल्ट हीरो बैनर चुना गया है। आप अपनी नई फोटो या 10s ऑडियो क्लिप अपलोड कर सकते हैं।</p>
                <div class="flex items-center gap-2 mt-2">
                  <span class="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700" id="ad-preview-filename">hero_banner.jpg</span>
                  <span class="text-[10px] text-amber-300 font-bold" id="ad-preview-clip-dur">⏱️ 10s ऑडियो सपोर्ट</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 3. Title, Subtitle, Contact, Target -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="flex flex-col gap-1">
              <label class="text-xs font-bold text-slate-300 flex items-center justify-between">
                <span>4. विज्ञापन शीर्षक (Title) *</span>
                <span class="text-[10px] text-slate-400">आकर्षक नाम</span>
              </label>
              <input id="input-ad-title" class="px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400" placeholder="उदा. मकान पुट्टी-पेंट मेला 15% छूट" required />
            </div>

            <div class="flex flex-col gap-1">
              <label class="text-xs font-bold text-slate-300 flex items-center justify-between">
                <span>5. विज्ञापन विवरण (Subtitle) *</span>
                <span class="text-[10px] text-slate-400">ऑफर का पूरा विवरण</span>
              </label>
              <input id="input-ad-subtitle" class="px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400" placeholder="उदा. Asian Paints अधिकृत कारीगर • तुरंत फ्री कोटेशन" required />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div class="flex flex-col gap-1">
              <label class="text-xs font-bold text-slate-300">6. विज्ञापन कहाँ दिखेगा (Target)</label>
              <select id="select-ad-target" class="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none">
                <option value="both">🌐 दोनों ऐप (Customer + Worker)</option>
                <option value="customer">🛒 सिर्फ ग्राहक ऐप (Customer)</option>
                <option value="worker">👷 सिर्फ लेबर ऐप (Worker)</option>
              </select>
            </div>

            <div class="flex flex-col gap-1">
              <label class="text-xs font-bold text-slate-300">7. कॉल / संपर्क नंबर (Phone) *</label>
              <input id="input-ad-phone" class="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none font-bold" placeholder="9812345000" required />
            </div>

            <div class="flex flex-col gap-1">
              <label class="text-xs font-bold text-slate-300">8. ऑफर बैज (Badge)</label>
              <input id="input-ad-badge" class="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none" value="ऑफर" placeholder="उदा. ऑफर / इमरजेंसी / डिस्काउंट" />
            </div>
          </div>

          <button id="btn-publish-ad" class="mt-2 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black rounded-2xl text-xs transition-all shadow-lg shadow-emerald-500/20 active:scale-95 flex items-center justify-center gap-2" type="submit">
            <span>🚀 विज्ञापन तुरंत लाइव करें (Publish Banner)</span>
            <span class="material-symbols-outlined text-[16px]">campaign</span>
          </button>
        </form>
      </div>

      <!-- Active Ads Management List -->
      <div class="bg-slate-800/90 p-5 rounded-3xl border border-slate-700 shadow-sm flex flex-col gap-3">
        <div class="flex items-center justify-between pb-2 border-b border-slate-700">
          <div class="flex items-center gap-2">
            <h3 class="text-sm font-bold text-white">सक्रिय विज्ञापन व बैनर सूची (Active Ads)</h3>
            <span id="admin-ads-count" class="px-2 py-0.5 rounded-full bg-slate-700 text-slate-300 text-[10px] font-bold">2 विज्ञापन</span>
          </div>
          <span class="text-xs text-slate-400">ऊपर व साइड दोनों बैनर समर्थित</span>
        </div>
        <div class="flex flex-col gap-2.5" id="admin-ads-container">
          <!-- Populated dynamically -->
        </div>
      </div>
    `;
  }

  window.handleMediaTypeChange = function () {
    const type = document.getElementById('select-ad-mediatype').value;
    const hint = document.getElementById('ad-media-hint');
    const fileLabel = document.getElementById('btn-ad-file-label');
    if (type === 'video') {
      if (hint) hint.textContent = 'MP4, WEBM या ऑडियो क्लिप चुनें (अधिकतम 10 सेकंड)';
      if (fileLabel) fileLabel.textContent = '10s वीडियो / ऑडियो चुनें';
    } else {
      if (hint) hint.textContent = 'JPG, PNG, WEBP फोटो चुनें (उच्च गुणवत्ता)';
      if (fileLabel) fileLabel.textContent = 'कस्टम फोटो चुनें';
    }
  };

  window.handleAdFileUpload = function (event) {
    const file = event.target.files[0];
    if (!file) return;

    const isVideo = file.type.startsWith('video') || file.type.startsWith('audio');
    currentUploadedMediaType = isVideo ? 'video' : 'image';
    const mediaTypeSelect = document.getElementById('select-ad-mediatype');
    if (mediaTypeSelect) mediaTypeSelect.value = currentUploadedMediaType;

    const reader = new FileReader();
    reader.onload = function (e) {
      currentUploadedMediaUrl = e.target.result;
      updateAdPreviewUI(file.name, isVideo);
      if (window.showAdminToast) {
        window.showAdminToast(`✅ ${isVideo ? '10-सेकंड क्लिप' : 'कस्टम फोटो'} लोड हो गई!`);
      }
    };
    reader.readAsDataURL(file);
  };

  function updateAdPreviewUI(fileName, isVideo) {
    const img = document.getElementById('ad-preview-img');
    const vid = document.getElementById('ad-preview-video');
    const soundBtn = document.getElementById('ad-preview-sound-btn');
    const badge = document.getElementById('ad-preview-badge');
    const fileEl = document.getElementById('ad-preview-filename');
    const statusEl = document.getElementById('ad-preview-status');

    if (fileEl) fileEl.textContent = fileName || 'Uploaded Media';

    if (isVideo) {
      if (img) img.classList.add('hidden');
      if (vid) {
        vid.classList.remove('hidden');
        vid.src = currentUploadedMediaUrl;
        vid.play().catch(function () {});
      }
      if (soundBtn) soundBtn.classList.remove('hidden');
      if (badge) {
        badge.textContent = '🎥 10s क्लिप';
        badge.className = 'absolute top-2 left-2 px-1.5 py-0.5 rounded bg-rose-600 text-white font-black text-[9px] uppercase shadow';
      }
      if (statusEl) statusEl.textContent = '10-सेकंड वीडियो/ऑडियो क्लिप सफलतापूर्वक लोड हुई! "आवाज टेस्ट" दबाकर साउंड चेक करें।';
    } else {
      if (vid) {
        vid.classList.add('hidden');
        vid.pause();
      }
      if (img) {
        img.classList.remove('hidden');
        img.src = currentUploadedMediaUrl;
      }
      if (soundBtn) soundBtn.classList.add('hidden');
      if (badge) {
        badge.textContent = '🖼️ फोटो';
        badge.className = 'absolute top-2 left-2 px-1.5 py-0.5 rounded bg-emerald-600 text-white font-black text-[9px] uppercase shadow';
      }
      if (statusEl) statusEl.textContent = 'कस्टम फोटो सफलतापूर्वक लोड हुई!';
    }
  }

  window.toggleAdPreviewAudio = function () {
    const vid = document.getElementById('ad-preview-video');
    const icon = document.getElementById('ad-preview-sound-icon');
    const txt = document.getElementById('ad-preview-sound-text');
    if (!vid) return;

    if (vid.muted) {
      vid.muted = false;
      vid.volume = 1.0;
      vid.play().catch(function () {});
      if (icon) icon.textContent = '🔊';
      if (txt) txt.textContent = 'म्यूट';
      if (window.showAdminToast) window.showAdminToast('🔊 ऑडियो साउंड टेस्ट चालू है!');
    } else {
      vid.muted = true;
      if (icon) icon.textContent = '🔇';
      if (txt) txt.textContent = 'आवाज टेस्ट';
    }
  };

  window.handlePublishAd = function () {
    const title = document.getElementById('input-ad-title').value.trim();
    const subtitle = document.getElementById('input-ad-subtitle').value.trim();
    const phone = document.getElementById('input-ad-phone').value.trim();
    const badge = document.getElementById('input-ad-badge').value.trim() || 'ऑफर';
    const bannerType = document.getElementById('select-ad-type').value;
    const mediaType = document.getElementById('select-ad-mediatype').value;
    const target = document.getElementById('select-ad-target').value;

    if (!title || !phone) {
      alert('कृपया विज्ञापन शीर्षक और संपर्क फोन अवश्य भरें');
      return;
    }

    const newAd = {
      id: 'ad-' + Date.now().toString(36),
      titleHi: title,
      subtitleHi: subtitle,
      phone: phone,
      badge: badge,
      bannerType: bannerType,
      mediaType: mediaType,
      mediaUrl: currentUploadedMediaUrl,
      clipDuration: 10,
      audioEnabled: true,
      target: target,
      isActive: true,
      createdAt: new Date().toISOString()
    };

    if (window.AMBALA_DATA && window.AMBALA_DATA.saveAd) {
      window.AMBALA_DATA.saveAd(newAd);
    }

    window.renderAds();
    if (window.showAdminToast) {
      window.showAdminToast(`🎉 नया ${bannerType === 'side' ? 'साइड' : 'ऊपर का'} बैनर तुरंत लाइव हो गया!`);
    }
    document.getElementById('input-ad-title').value = '';
    document.getElementById('input-ad-subtitle').value = '';
  };

  window.toggleAdActive = function (id) {
    if (window.AMBALA_DATA && window.AMBALA_DATA.toggleAd) {
      window.AMBALA_DATA.toggleAd(id);
    }
    window.renderAds();
    if (window.showAdminToast) window.showAdminToast('विज्ञापन स्थिति अपडेट हो गई!');
  };

  window.deleteAdItem = function (id) {
    if (confirm('क्या आप सच में इस विज्ञापन/बैनर को हटाना चाहते हैं?')) {
      if (window.AMBALA_DATA && window.AMBALA_DATA.deleteAd) {
        window.AMBALA_DATA.deleteAd(id);
      }
      window.renderAds();
      if (window.showAdminToast) window.showAdminToast('विज्ञापन हटा दिया गया!');
    }
  };

  window.renderAds = function () {
    const container = document.getElementById('admin-ads-container');
    const countEl = document.getElementById('admin-ads-count');
    if (!container) return;

    const ads = window.AMBALA_DATA ? window.AMBALA_DATA.getStoredAds() : [];
    if (countEl) countEl.textContent = `${ads.length} विज्ञापन`;

    if (ads.length === 0) {
      container.innerHTML = `<div class="p-6 rounded-2xl bg-slate-900 text-center text-slate-400 text-xs">कोई सक्रिय विज्ञापन नहीं है। ऊपर दिए फ़ॉर्म से नया बैनर बनाएं।</div>`;
      return;
    }

    container.innerHTML = ads
      .map(function (a) {
        const isVid = a.mediaType === 'video';
        return `
        <div class="bg-slate-900/80 p-3.5 rounded-2xl border ${a.isActive ? 'border-slate-700' : 'border-rose-900/50 opacity-60'} flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div class="flex items-center gap-3">
            <div class="relative w-16 h-12 rounded-xl overflow-hidden bg-black shrink-0 border border-slate-700 flex items-center justify-center">
              ${
                isVid
                  ? `<video src="${a.mediaUrl}" muted class="w-full h-full object-cover"></video><span class="absolute inset-0 flex items-center justify-center bg-black/40 text-[10px]">🎥 10s</span>`
                  : `<img src="${a.mediaUrl || 'assets/hero_banner.jpg'}" class="w-full h-full object-cover" alt="Ad"/>`
              }
            </div>
            <div>
              <div class="flex items-center gap-1.5 flex-wrap">
                <span class="font-bold text-white">${a.titleHi || a.title || 'अम्बाला ऑफर'}</span>
                <span class="px-1.5 py-0.2 rounded text-[9px] font-black ${a.bannerType === 'side' ? 'bg-amber-400 text-slate-950' : 'bg-blue-500/20 text-blue-300'}">
                  ${a.bannerType === 'side' ? '📑 साइड बैनर' : a.bannerType === 'both' ? '🌐 दोनों' : '⭐ ऊपर बैनर'}
                </span>
                <span class="px-1.5 py-0.2 rounded text-[9px] font-bold ${isVid ? 'bg-rose-500/20 text-rose-300' : 'bg-emerald-500/20 text-emerald-300'}">
                  ${isVid ? '🔊 10s ऑडियो क्लिप' : '🖼️ फोटो'}
                </span>
              </div>
              <span class="text-slate-400 text-[11px] block mt-0.5">${a.subtitleHi || a.subtitle || ''}</span>
              <span class="text-[10px] text-emerald-400 font-mono mt-0.5">📞 ${a.phone} • टारगेट: ${a.target === 'worker' ? '👷 लेबर ऐप' : a.target === 'customer' ? '🛒 ग्राहक ऐप' : '🌐 दोनों ऐप'}</span>
            </div>
          </div>

          <div class="flex items-center gap-2 self-end sm:self-center shrink-0">
            <button type="button" onclick="window.toggleAdActive('${a.id}')" class="px-2.5 py-1 rounded-xl text-[10px] font-bold transition-all ${a.isActive ? 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/40' : 'bg-slate-800 text-slate-400 hover:text-white'}">
              ${a.isActive ? '🟢 लाइव चालू' : '⚪ बंद है'}
            </button>
            <button type="button" onclick="window.deleteAdItem('${a.id}')" class="px-2.5 py-1 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-[10px] font-bold transition-all" title="हटाएं">
              🗑️ हटाएं
            </button>
          </div>
        </div>
      `;
      })
      .join('');
  };

  // Mount on DOMContentLoaded or immediate if DOM already loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      mountAdminAdsTab();
      window.renderAds();
    });
  } else {
    mountAdminAdsTab();
    window.renderAds();
  }
})();
