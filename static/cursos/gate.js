(function () {
  // Barreira simples de acesso para a área de Cursos.
  // NÃO é segurança real (site estático, sem backend) — apenas afasta
  // visitantes casuais. O código correto nunca fica em texto puro aqui,
  // só o hash SHA-256 dele.
  //
  // Para trocar o código: gere o hash com
  //   python3 -c "import hashlib; print(hashlib.sha256('NOVO_CODIGO'.encode()).hexdigest())"
  // e substitua o valor de CODE_HASH abaixo.
  var CODE_HASH = 'fd53efd8940f305f79e212dc2e0a557d23eab8f2f60fbf219e19e3351b68e732';
  var STORAGE_KEY = 'ia_cursos_unlocked_v1';

  if (localStorage.getItem(STORAGE_KEY) === '1') return;

  document.documentElement.style.visibility = 'hidden';

  function sha256(text) {
    var enc = new TextEncoder().encode(text);
    return crypto.subtle.digest('SHA-256', enc).then(function (buf) {
      return Array.prototype.map
        .call(new Uint8Array(buf), function (b) { return b.toString(16).padStart(2, '0'); })
        .join('');
    });
  }

  function showGate() {
    var overlay = document.createElement('div');
    overlay.id = 'course-gate';
    overlay.innerHTML =
      '<style>' +
      '#course-gate{position:fixed;inset:0;background:#12162B;color:#fff;display:flex;align-items:center;justify-content:center;z-index:99999;font-family:"IBM Plex Sans",sans-serif;visibility:visible;}' +
      '#course-gate .box{text-align:center;max-width:320px;padding:0 20px;}' +
      '#course-gate h2{font-family:"Space Grotesk",sans-serif;font-size:20px;margin:0 0 18px;}' +
      '#course-gate .row{display:flex;gap:8px;justify-content:center;}' +
      '#course-gate input{font-size:18px;padding:10px 14px;border-radius:8px;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.06);color:#fff;text-align:center;width:140px;letter-spacing:0.1em;}' +
      '#course-gate input:focus{outline:2px solid #0EA5A0;}' +
      '#course-gate button{font-size:15px;font-weight:700;font-family:"Space Grotesk",sans-serif;padding:10px 18px;border-radius:8px;border:none;background:#0EA5A0;color:#fff;cursor:pointer;}' +
      '#course-gate .err{color:#E11D74;margin-top:14px;min-height:18px;font-size:14px;}' +
      '</style>' +
      '<div class="box">' +
      '<h2>Digite o código de acesso</h2>' +
      '<div class="row">' +
      '<input id="gate-input" type="text" inputmode="numeric" autocomplete="off" maxlength="12" />' +
      '<button id="gate-btn" type="button">Entrar</button>' +
      '</div>' +
      '<div class="err" id="gate-err"></div>' +
      '</div>';
    document.body.appendChild(overlay);
    document.documentElement.style.visibility = 'visible';

    var input = overlay.querySelector('#gate-input');
    var btn = overlay.querySelector('#gate-btn');
    var err = overlay.querySelector('#gate-err');
    input.focus();

    function tryUnlock() {
      sha256(input.value.trim()).then(function (hash) {
        if (hash === CODE_HASH) {
          localStorage.setItem(STORAGE_KEY, '1');
          overlay.remove();
        } else {
          err.textContent = 'Código incorreto.';
          input.value = '';
          input.focus();
        }
      });
    }

    btn.addEventListener('click', tryUnlock);
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') tryUnlock();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', showGate);
  } else {
    showGate();
  }
})();
