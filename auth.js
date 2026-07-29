(function () {
  'use strict';

  var STORAGE_KEY = 'npns-authenticated';
  var PASSWORD_HASH = 'eff4180cd31eaf89b9b6ab86851254f4aae802e1a6953ccbe33cd6ce54c09e8c';

  function unlock() {
    sessionStorage.setItem(STORAGE_KEY, 'true');
    document.documentElement.classList.add('auth-granted');
  }

  function hashPassword(value) {
    if (!window.crypto || !window.crypto.subtle) {
      return Promise.reject(new Error('secure-context-required'));
    }

    var encoded = new TextEncoder().encode(value);
    return crypto.subtle.digest('SHA-256', encoded).then(function (buffer) {
      return Array.from(new Uint8Array(buffer))
        .map(function (byte) { return byte.toString(16).padStart(2, '0'); })
        .join('');
    });
  }

  function showSecureContextError(errorEl) {
    if (!errorEl) {
      return;
    }
    errorEl.textContent = 'Open this site via http://localhost (not as a file) to use the password gate.';
    errorEl.hidden = false;
  }

  function initGate() {
    var form = document.getElementById('auth-form');
    var input = document.getElementById('auth-password');
    var error = document.getElementById('auth-error');

    if (!form || !input) {
      return;
    }

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (error) {
        error.hidden = true;
      }

      hashPassword(input.value).then(function (digest) {
        if (digest === PASSWORD_HASH) {
          unlock();
          input.value = '';
        } else if (error) {
          error.textContent = 'Incorrect password. Please try again.';
          error.hidden = false;
          input.focus();
          input.select();
        }
      }).catch(function () {
        showSecureContextError(error);
      });
    });
  }

  if (sessionStorage.getItem(STORAGE_KEY) === 'true') {
    document.documentElement.classList.add('auth-granted');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGate);
  } else {
    initGate();
  }
})();
