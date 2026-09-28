/**
 * AMBALA WORKER (अम्बाला वर्कर) - ENTERPRISE CODE SECURITY & ANTI-TAMPER SHIELD
 * Protects application source code from unauthorized inspection, reverse engineering,
 * right-click scraping, console tampering, and developer tools inspection.
 */

(function () {
  'use strict';

  // 1. Prevent iFrame Embedding (Anti-Clickjacking)
  try {
    if (window.top !== window.self) {
      window.top.location = window.self.location;
    }
  } catch (e) {}

  // 2. Disable Right-Click Context Menu Everywhere
  document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    showSecurityWarning('दायां क्लिक (Right Click) व सोर्स कोड इंस्पेक्शन प्रतिबंधित है।');
    return false;
  }, { capture: true });

  // 3. Block Critical Keyboard Shortcuts for DevTools & Source Viewing
  document.addEventListener('keydown', function (e) {
    const key = e.key ? e.key.toUpperCase() : '';
    const code = e.keyCode || e.which;

    // F12 (DevTools)
    if (code === 123 || key === 'F12') {
      blockAction(e, 'F12 डेवलपर टूल्स ब्लॉक है।');
      return false;
    }

    // Ctrl+Shift+I (Inspect), Ctrl+Shift+J (Console), Ctrl+Shift+C (Element Picker), Ctrl+Shift+K (Firefox)
    if (e.ctrlKey && e.shiftKey && (key === 'I' || key === 'J' || key === 'C' || key === 'K')) {
      blockAction(e, 'सोर्स कोड इंस्पेक्शन शॉर्टकट ब्लॉक है।');
      return false;
    }

    // Mac Cmd+Option+I / Cmd+Option+J / Cmd+Option+C
    if (e.metaKey && e.altKey && (key === 'I' || key === 'J' || key === 'C')) {
      blockAction(e, 'सोर्स कोड इंस्पेक्शन शॉर्टकट ब्लॉक है।');
      return false;
    }

    // Ctrl+U / Cmd+U (View Page Source)
    if ((e.ctrlKey || e.metaKey) && key === 'U') {
      blockAction(e, 'व्यू सोर्स (View Source) अक्षम है।');
      return false;
    }

    // Ctrl+S / Cmd+S (Save Page)
    if ((e.ctrlKey || e.metaKey) && key === 'S') {
      blockAction(e, 'पेज सेव करना प्रतिबंधित है।');
      return false;
    }

    // Ctrl+P / Cmd+P (Print Page Source)
    if ((e.ctrlKey || e.metaKey) && key === 'P') {
      blockAction(e, 'प्रिंट विकल्प सुरक्षा कारणों से बंद है।');
      return false;
    }
  }, { capture: true });

  function blockAction(e, msg) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    showSecurityWarning(msg);
  }

  // 4. Disable Selection & Copying of Sensitive Elements
  document.addEventListener('copy', function (e) {
    const activeEl = document.activeElement;
    if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA')) {
      return; // allow form typing
    }
    e.preventDefault();
    showSecurityWarning('सोर्स व डेटा कॉपी करना प्रतिबंधित है।');
  }, { capture: true });

  document.addEventListener('cut', function (e) {
    const activeEl = document.activeElement;
    if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA')) {
      return;
    }
    e.preventDefault();
  }, { capture: true });

  document.addEventListener('dragstart', function (e) {
    if (e.target && (e.target.tagName === 'IMG' || e.target.tagName === 'SCRIPT')) {
      e.preventDefault();
      return false;
    }
  }, { capture: true });

  // 5. In-App Floating Security Warning Banner (Non-intrusive HUD)
  let lastToastTime = 0;
  function showSecurityWarning(msg) {
    const now = Date.now();
    if (now - lastToastTime < 2500) return; // Debounce
    lastToastTime = now;

    let banner = document.getElementById('ambala-sec-shield-hud');
    if (!banner) {
      banner = document.createElement('div');
      banner.id = 'ambala-sec-shield-hud';
      banner.className = 'ambala-sec-hud';
      banner.style.cssText = `
        position: fixed;
        bottom: 24px;
        left: 50%;
        transform: translateX(-50%) translateY(20px);
        background: rgba(15, 23, 42, 0.96);
        color: #f8fafc;
        border: 1px solid rgba(239, 68, 68, 0.5);
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 0 15px rgba(239, 68, 68, 0.2);
        padding: 10px 18px;
        border-radius: 9999px;
        font-size: 11px;
        font-family: sans-serif;
        font-weight: 700;
        z-index: 999999;
        display: flex;
        align-items: center;
        gap: 8px;
        pointer-events: none;
        opacity: 0;
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      `;
      document.body.appendChild(banner);
    }

    banner.innerHTML = `<span style="color:#ef4444;font-size:14px;">🛡️</span> <span>${msg}</span>`;
    banner.style.opacity = '1';
    banner.style.transform = 'translateX(-50%) translateY(0)';

    setTimeout(() => {
      banner.style.opacity = '0';
      banner.style.transform = 'translateX(-50%) translateY(20px)';
    }, 2800);
  }

  // 6. Console Cloaking & Shielding (Prevent Memory Dumping in Production)
  const isDebugMode = window.location.search.includes('debug=true');
  if (!isDebugMode) {
    try {
      const originalConsoleClear = console.clear;
      const noop = function () {};
      
      // Override console to prevent revealing internal objects
      window.console.log = noop;
      window.console.info = noop;
      window.console.warn = noop;
      window.console.table = noop;
      window.console.dir = noop;

      // Print Official Tamper-Notice
      setTimeout(() => {
        try {
          if (originalConsoleClear) originalConsoleClear();
          console.error(
            '%c🛡️ अम्बाला वर्कर (Ambala Worker) - आधिकारिक सुरक्षित पोर्टल\n%cचेतावनी: एप्लिकेशन का सोर्स कोड कॉपीराइट संरक्षित है। किसी भी अनधिकृत इंस्पेक्शन, डंपिंग या रिवर्स इंजीनियरिंग पर कानूनी कार्रवाई की जा सकती है।',
            'color: #10b981; font-size: 15px; font-weight: bold;',
            'color: #ef4444; font-size: 11px; font-weight: bold;'
          );
        } catch (e) {}
      }, 1000);
    } catch (e) {}
  }

  // 7. Silent Anti-Tamper Protection (No annoying intervals or false alarms)
  // DevTools inspection shortcuts and context menu are strictly blocked above.

  // 8. Prevent Code Tampering on Global Data Namespace
  window.addEventListener('load', function () {
    if (window.AMBALA_DATA && Object.seal) {
      try {
        Object.seal(window.AMBALA_DATA);
      } catch (e) {}
    }
  });

})();
