/**
 * In-Demo Identity Guardian & Session Countdown Engine
 * Monitors 1-hour viewing window, renders executive HUD,
 * syncs heartbeats with server, and handles graceful termination.
 */

(function () {
  'use strict';

  var session = window.DEMO_SESSION || null;
  var timerInterval = null;
  var heartbeatInterval = null;
  var toastShown = false;

  function formatTime(seconds) {
    if (seconds <= 0) return '00:00';
    var m = Math.floor(seconds / 60);
    var s = seconds % 60;
    var mm = m < 10 ? '0' + m : '' + m;
    var ss = s < 10 ? '0' + s : '' + s;
    return mm + ':' + ss;
  }

  function createHud(expiresAt) {
    var existing = document.getElementById('demo-guardian-hud');
    if (existing) return existing;

    var hud = document.createElement('div');
    hud.id = 'demo-guardian-hud';
    hud.setAttribute('role', 'region');
    hud.setAttribute('aria-label', 'Demo Session Countdown');

    var cafeLabel = 'Preview';
    if (session && session.cafe) {
      if (session.cafe === 'caffe-nero') cafeLabel = 'Caffè Nero';
      else if (session.cafe === 'one-club-row') cafeLabel = 'One Club Row';
      else if (session.cafe === 'yeah-man-caribbean') cafeLabel = 'Yeah Man';
    }

    hud.innerHTML = `
      <div class="hud-status">
        <span class="hud-dot" id="guardian-dot"></span>
        <span class="hud-label">${cafeLabel} Pass</span>
      </div>
      <span class="hud-timer" id="guardian-timer">--:--</span>
      <button type="button" class="hud-btn-end" id="guardian-btn-end" title="Conclude viewing pass">End</button>
    `;

    document.body.appendChild(hud);

    var endBtn = document.getElementById('guardian-btn-end');
    if (endBtn) {
      endBtn.addEventListener('click', function () {
        if (confirm('Conclude your viewing session and lock this demo pass?')) {
          expireSession('user_terminated');
        }
      });
    }

    return hud;
  }

  function createTransitionOverlay() {
    var existing = document.getElementById('demo-transition-overlay');
    if (existing) return existing;

    var overlay = document.createElement('div');
    overlay.id = 'demo-transition-overlay';
    overlay.innerHTML = `
      <div style="max-width: 440px; margin: 0 auto; text-align: center;">
        <div style="display:inline-block; width:16px; height:16px; border-radius:50%; background:#F43F5E; box-shadow:0 0 15px #F43F5E; margin-bottom:18px;"></div>
        <h2 style="font-size: 1.7rem; font-weight:700; margin-bottom:12px; color:#FFFFFF;">Viewing Window Concluded</h2>
        <p style="color: #94A3B8; font-size: 0.95rem; line-height: 1.6; margin-bottom: 24px;">
          Your 1-hour exclusive demonstration session has reached its time limit. Preparing your summary report...
        </p>
      </div>
    `;
    document.body.appendChild(overlay);
    return overlay;
  }

  function showToast(message) {
    if (toastShown) return;
    toastShown = true;
    var toast = document.createElement('div');
    toast.style.cssText = 'position:fixed; bottom:24px; left:50%; transform:translateX(-50%); background:rgba(245,158,11,0.92); backdrop-filter:blur(10px); color:#000; font-weight:700; padding:12px 24px; border-radius:9999px; box-shadow:0 10px 25px rgba(0,0,0,0.5); z-index:9999999; font-size:0.88rem; transition:opacity 0.4s ease;';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(function () {
      toast.style.opacity = '0';
      setTimeout(function () {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 500);
    }, 6000);
  }

  function expireSession(reason) {
    if (timerInterval) clearInterval(timerInterval);
    if (heartbeatInterval) clearInterval(heartbeatInterval);

    var overlay = createTransitionOverlay();
    overlay.classList.add('visible');

    // Fire background logout to clear cookies
    try {
      fetch('/api/auth/logout', { method: 'POST' }).catch(function () {});
    } catch (e) {}

    var targetUrl = '/expired.html?reason=' + encodeURIComponent(reason || 'expired');
    if (session && session.cafe) {
      targetUrl += '&cafe=' + encodeURIComponent(session.cafe);
    }

    setTimeout(function () {
      window.location.href = targetUrl;
    }, 1400);
  }

  function updateTick(expiresAt) {
    var now = Date.now();
    var remainingSeconds = Math.max(0, Math.floor((expiresAt - now) / 1000));

    var timerEl = document.getElementById('guardian-timer');
    var dotEl = document.getElementById('guardian-dot');

    if (timerEl) {
      timerEl.textContent = formatTime(remainingSeconds);
    }

    if (remainingSeconds <= 300) { // Under 5 minutes
      if (dotEl) {
        dotEl.className = 'hud-dot danger';
      }
      if (timerEl) {
        timerEl.className = 'hud-timer danger';
      }
      showToast('⚠️ 5 minutes remaining in your demo session');
    } else if (remainingSeconds <= 600) { // Under 10 minutes
      if (dotEl) {
        dotEl.className = 'hud-dot warning';
      }
    }

    if (remainingSeconds <= 0) {
      expireSession('time_expired');
    }
  }

  function checkServerSession() {
    fetch('/api/auth/session')
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (!data.active) {
          expireSession(data.reason || 'session_invalid');
        } else if (data.expiresAt) {
          session = session || {};
          session.expiresAt = data.expiresAt;
        }
      })
      .catch(function () {
        // Network blip, continue local timer
      });
  }

  function init() {
    if (session && session.expiresAt) {
      createHud(session.expiresAt);
      updateTick(session.expiresAt);

      timerInterval = setInterval(function () {
        updateTick(session.expiresAt);
      }, 1000);

      // Server heartbeat every 30s
      heartbeatInterval = setInterval(checkServerSession, 30000);
    } else {
      // Fetch session from server
      fetch('/api/auth/session')
        .then(function (res) { return res.json(); })
        .then(function (data) {
          if (!data.active) {
            window.location.href = '/?error=unauthorized';
            return;
          }
          session = data;
          createHud(session.expiresAt);
          updateTick(session.expiresAt);

          timerInterval = setInterval(function () {
            updateTick(session.expiresAt);
          }, 1000);

          heartbeatInterval = setInterval(checkServerSession, 30000);
        })
        .catch(function () {
          window.location.href = '/?error=connection_failed';
        });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
