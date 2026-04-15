// auth.js — Lógica de la pantalla de login

// Si ya hay sesión activa → redirigir
if (!IS_DEMO_MODE) {
  firebase.auth().onAuthStateChanged(user => {
    if (user) window.location.href = 'app.html';
  });
} else {
  document.getElementById('demoNotice').style.display = 'block';
}

async function doLogin() {
  const email   = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;
  const errorEl  = document.getElementById('loginError');
  const btn      = document.getElementById('loginBtn');

  errorEl.classList.remove('show');

  if (!email || !password) {
    showLoginError('Por favor, introduce tu correo y contraseña.');
    return;
  }

  btn.textContent = 'Entrando...';
  btn.disabled = true;

  // MODO DEMO: acepta cualquier credencial
  if (IS_DEMO_MODE) {
    setTimeout(() => { window.location.href = 'app.html'; }, 700);
    return;
  }

  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    window.location.href = 'app.html';
  } catch (error) {
    btn.textContent = 'Entrar';
    btn.disabled = false;

    const msgs = {
      'auth/user-not-found':    'Usuario no encontrado. Contacta con el club.',
      'auth/wrong-password':    'Contraseña incorrecta.',
      'auth/invalid-credential':'Credenciales incorrectas.',
      'auth/invalid-email':     'El formato del correo no es válido.',
      'auth/too-many-requests': 'Demasiados intentos. Espera unos minutos.',
      'auth/user-disabled':     'Cuenta desactivada. Contacta con el club.',
      'auth/network-request-failed': 'Sin conexión. Comprueba tu internet.',
    };
    showLoginError(msgs[error.code] || 'Error al iniciar sesión. Inténtalo de nuevo.');
  }
}

function showLoginError(msg) {
  const el = document.getElementById('loginError');
  el.textContent = '⚠️ ' + msg;
  el.style.background    = 'rgba(255,68,68,0.1)';
  el.style.borderColor   = 'rgba(255,68,68,0.3)';
  el.style.color         = '#FF6B6B';
  el.classList.add('show');
}

function showLoginInfo(msg) {
  const el = document.getElementById('loginError');
  el.textContent = 'ℹ️ ' + msg;
  el.style.background    = 'rgba(59,130,246,0.1)';
  el.style.borderColor   = 'rgba(59,130,246,0.3)';
  el.style.color         = '#60A5FA';
  el.classList.add('show');
}

function handleResetPassword() {
  const email = document.getElementById('loginEmail').value.trim();
  if (!email) {
    showLoginInfo('Para recuperar tu contraseña, contacta directamente con el club. Ellos gestionan todos los accesos de la aplicación.');
    return;
  }
  showLoginInfo('Para recuperar tu contraseña contacta con el club. Son ellos quienes gestionan todos los accesos de la app.');
}

// Enter para hacer login
document.addEventListener('keypress', e => {
  if (e.key === 'Enter') doLogin();
});
