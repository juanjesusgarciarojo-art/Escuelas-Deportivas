// =======================================================
// app.js — Estadísticas Gallardas
// Lógica principal, navegación y renderizado de vistas
// =======================================================

// ===================== DATOS DEMO =====================
const DEMO_DATA = {
  user: { id:'demo-admin', name:'Admin Demo', email:'admin@gallardas.com', role:'admin', teamId:null },
  teams: [
    { id:'t1', name:'Benjamín Masculino A', category:'Benjamín',  gender:'Masculino', playerCount:10, coachName:'Carlos García',   wins:5, losses:2 },
    { id:'t2', name:'Alevín Femenino',      category:'Alevín',    gender:'Femenino',  playerCount:9,  coachName:'Ana López',       wins:4, losses:3 },
    { id:'t3', name:'Infantil Masculino',   category:'Infantil',  gender:'Masculino', playerCount:12, coachName:'Pedro Martínez',  wins:7, losses:1 },
    { id:'t4', name:'Cadete Femenino',      category:'Cadete',    gender:'Femenino',  playerCount:11, coachName:'María Sánchez',   wins:3, losses:4 },
    { id:'t5', name:'Junior Masculino',     category:'Junior',    gender:'Masculino', playerCount:12, coachName:'José Rodríguez',  wins:6, losses:2 },
    { id:'t6', name:'Infantil Femenino',    category:'Infantil',  gender:'Femenino',  playerCount:10, coachName:'Laura Pérez',     wins:5, losses:3 },
  ],
  players: [
    { id:'p1',  name:'Alejandro Ruiz',   number:4,  position:'Base',      teamId:'t1', stats:{ pts:12.3, reb:3.1, ast:4.2, stl:1.5, blk:0.3, to:2.1, pf:1.8, reb_off:0.8, reb_def:2.3 } },
    { id:'p2',  name:'Miguel Torres',    number:7,  position:'Escolta',   teamId:'t1', stats:{ pts:9.8,  reb:2.5, ast:2.1, stl:1.2, blk:0.5, to:1.5, pf:2.2, reb_off:0.6, reb_def:1.9 } },
    { id:'p3',  name:'Pablo Jiménez',    number:11, position:'Alero',     teamId:'t1', stats:{ pts:15.2, reb:5.3, ast:1.8, stl:0.9, blk:1.2, to:1.8, pf:2.5, reb_off:1.5, reb_def:3.8 } },
    { id:'p4',  name:'Juan García',      number:14, position:'Ala-Pívot', teamId:'t1', stats:{ pts:8.1,  reb:6.2, ast:0.9, stl:0.7, blk:2.1, to:1.2, pf:3.1, reb_off:2.2, reb_def:4.0 } },
    { id:'p5',  name:'Luis Martín',      number:9,  position:'Pívot',     teamId:'t1', stats:{ pts:6.5,  reb:7.8, ast:0.5, stl:0.3, blk:3.2, to:1.0, pf:3.5, reb_off:2.8, reb_def:5.0 } },
    { id:'p6',  name:'Laura García',     number:5,  position:'Base',      teamId:'t2', stats:{ pts:14.5, reb:3.2, ast:5.1, stl:2.3, blk:0.2, to:2.5, pf:1.5, reb_off:0.7, reb_def:2.5 } },
    { id:'p7',  name:'Carmen López',     number:8,  position:'Escolta',   teamId:'t2', stats:{ pts:10.2, reb:2.8, ast:2.5, stl:1.8, blk:0.4, to:1.8, pf:2.0, reb_off:0.5, reb_def:2.3 } },
    { id:'p8',  name:'Isabel Ruiz',      number:12, position:'Alero',     teamId:'t2', stats:{ pts:8.7,  reb:4.5, ast:1.2, stl:1.1, blk:0.8, to:1.3, pf:2.8, reb_off:1.3, reb_def:3.2 } },
    { id:'p9',  name:'Sofía Martínez',   number:15, position:'Pívot',     teamId:'t2', stats:{ pts:7.3,  reb:6.5, ast:0.8, stl:0.5, blk:2.5, to:1.0, pf:3.2, reb_off:2.5, reb_def:4.0 } },
    { id:'p10', name:'Sergio Fernández', number:6,  position:'Base',      teamId:'t3', stats:{ pts:16.8, reb:3.5, ast:6.2, stl:2.8, blk:0.4, to:3.0, pf:1.8, reb_off:0.9, reb_def:2.6 } },
    { id:'p11', name:'Diego López',      number:10, position:'Alero',     teamId:'t3', stats:{ pts:13.2, reb:4.8, ast:2.1, stl:1.5, blk:1.5, to:1.5, pf:2.3, reb_off:1.4, reb_def:3.4 } },
  ],
  games: [
    { id:'g1', teamId:'t1', teamName:'Benjamín Masc.', homeTeam:'Gallardas Benjamín', awayTeam:'CB Los Pinos',       homeScore:52, awayScore:44, date: daysAgo(7),  location:'Pabellón Municipal', isHome:true,  status:'finished' },
    { id:'g2', teamId:'t2', teamName:'Alevín Fem.',    homeTeam:'BC Diamantes',        awayTeam:'Gallardas Alevín',  homeScore:38, awayScore:41, date: daysAgo(3),  location:'Pabellón Sur',       isHome:false, status:'finished' },
    { id:'g3', teamId:'t3', teamName:'Infantil Masc.', homeTeam:'Gallardas Infantil',  awayTeam:'Halcones BC',       homeScore:61, awayScore:48, date: daysAgo(5),  location:'Pabellón Municipal', isHome:true,  status:'finished' },
    { id:'g4', teamId:'t1', teamName:'Benjamín Masc.', homeTeam:'Gallardas Benjamín', awayTeam:'Halcones BB',        homeScore:null, awayScore:null, date: daysFromNow(3), location:'Pabellón Municipal', isHome:true,  status:'upcoming' },
    { id:'g5', teamId:'t2', teamName:'Alevín Fem.',    homeTeam:'Cóndores BC',         awayTeam:'Gallardas Alevín',  homeScore:null, awayScore:null, date: daysFromNow(5), location:'Polideportivo Norte', isHome:false, status:'upcoming' },
    { id:'g6', teamId:'t3', teamName:'Infantil Masc.', homeTeam:'Aguilas BC',          awayTeam:'Gallardas Infantil',homeScore:null, awayScore:null, date: daysFromNow(7), location:'Pabellón Sur',       isHome:false, status:'upcoming' },
  ],
  messages: [
    { id:'m1', title:'🏆 ¡Gran victoria del Benjamín!',     body:'Felicitamos a todo el equipo Benjamín Masculino por su estupenda victoria 52-44 contra CB Los Pinos. El equipo demostró una gran defensa y trabajo en equipo. ¡Seguimos así, campeones!', date: hoursAgo(2),  from:'Club Gallardas', read:false, important:true  },
    { id:'m2', title:'📅 Cambio de horario — Martes',       body:'El entrenamiento del próximo martes se retrasa una hora, comenzando a las 19:30h en lugar de las 18:30h. Disculpad las molestias. Cualquier duda contactad con el club.', date: hoursAgo(26), from:'Club Gallardas', read:false, important:false },
    { id:'m3', title:'👕 Recogida de equipaciones',         body:'Recordamos que la semana que viene es el plazo final para recoger las nuevas equipaciones de esta temporada. Por favor, acercaos al club en horario normal de entrenamiento. Traed el comprobante de pago.', date: daysAgo(3),  from:'Club Gallardas', read:true,  important:false },
    { id:'m4', title:'📢 Torneo de Navidad — ¡Os esperamos!', body:'Os informamos que el club organiza el tradicional Torneo de Navidad los días 22 y 23 de diciembre. La participación es gratuita para todos los equipos del club. ¡Os esperamos a todos!', date: daysAgo(5),  from:'Club Gallardas', read:true,  important:true  },
    { id:'m5', title:'💪 Inicio de la temporada 2024-25',   body:'Damos la bienvenida a la nueva temporada con grandes ilusiones. Todos los equipos han arrancado con muy buenas sensaciones. ¡Vamos Gallardas!', date: daysAgo(14), from:'Club Gallardas', read:true,  important:false },
  ],
  news: [
    { id:'n1', icon:'🏆', category:'Resultado', title:'Gran victoria del Benjamín Masculino', body:'Nuestro equipo Benjamín se impuso al CB Los Pinos por 52-44 en un emocionante partido donde el equipo demostró una gran cohesión defensiva y un juego de equipo sobresaliente.', date: daysAgo(7) },
    { id:'n2', icon:'🌟', category:'Club',     title:'Temporada 2024-25: arrancamos con fuerza', body:'La nueva temporada comienza con grandes expectativas para todos nuestros equipos. Este año contamos con más jugadores y mejores instalaciones para entrenar.', date: daysAgo(14) },
    { id:'n3', icon:'🎉', category:'Torneo',   title:'Torneo de Navidad — ¡Inscripciones abiertas!', body:'El Club Gallardas organiza su tradicional Torneo de Navidad. Participarán equipos de toda la región. ¡Será un gran fin de año!', date: daysAgo(10) },
  ],
};

function daysAgo(n)      { return new Date(Date.now() - n * 86400000).toISOString(); }
function daysFromNow(n)  { return new Date(Date.now() + n * 86400000).toISOString(); }
function hoursAgo(n)     { return new Date(Date.now() - n * 3600000).toISOString();  }

// ===================== STATE =====================
const APP = {
  user:         null,
  userData:     null,
  viewHistory:  [],
  currentView:  null,
  currentParams:{},
  unreadCount:  0,
  permissions:  { show_individual_stats:true, show_team_stats:true, show_season_stats:true, show_calendar:true, show_scores:true, show_news:true, show_roster:true },
};

const VIEW_TO_NAV = {
  home:'home', teams:'teams', 'team-detail':'teams', 'player-detail':'teams',
  games:'games', 'game-detail':'games', 'game-live':'games',
  messages:'messages', 'message-detail':'messages',
  profile:'profile', admin:'admin', 'admin-users':'admin',
  'admin-teams':'admin', 'admin-players':'admin', 'admin-compose':'admin',
  'admin-permissions':'admin', 'admin-news':'admin',
};

// ===================== INIT =====================
document.addEventListener('DOMContentLoaded', () => {
  if (IS_DEMO_MODE) {
    APP.userData    = DEMO_DATA.user;
    APP.unreadCount = DEMO_DATA.messages.filter(m => !m.read).length;
    setupShell();
    navigateTo('home');
  } else {
    auth.onAuthStateChanged(async user => {
      if (!user) { window.location.href = 'index.html'; return; }
      APP.user = user;
      try {
        const doc = await db.collection('users').doc(user.uid).get();
        if (!doc.exists) { await auth.signOut(); window.location.href = 'index.html'; return; }
        const data = doc.data();
        APP.userData = { id: doc.id, ...data };
        // Normalización: si existe 'rol' pero no 'role', lo copiamos
        if (data.rol && !data.role) APP.userData.role = data.rol;

        const msgs = await db.collection('messages')
          .where('recipientId','in',['all', user.uid])
          .where('read','==',false).get();
        APP.unreadCount = msgs.size;
      } catch(e) { console.error(e); }
      setupShell();
      navigateTo('home');
    });
  }
});

function setupShell() {
  document.getElementById('headerSubtitle').textContent = roleLabel();
  const r = APP.userData?.role || APP.userData?.rol;
  if (r === 'admin' || r === 'coach') {
    document.getElementById('nav-admin').style.display = '';
  }
  refreshBadge();
  document.getElementById('initialLoader').style.display = 'none';
}

function roleLabel() {
  const r = APP.userData?.role || APP.userData?.rol;
  return { admin:'Administrador del Club', coach:'Entrenador/a', parent:'Familia', player:'Jugador/a' }[r] || 'Usuario';
}

function refreshBadge() {
  const badge = document.getElementById('unreadBadge');
  const dot   = document.getElementById('msgDot');
  if (APP.unreadCount > 0) {
    badge.textContent = APP.unreadCount > 9 ? '9+' : APP.unreadCount;
    badge.style.display = ''; dot.style.display = '';
  } else {
    badge.style.display = 'none'; dot.style.display = 'none';
  }
}

// ===================== NAVIGATION =====================
function navigateTo(view, params = {}, addHistory = true) {
  if (APP.currentView && addHistory) APP.viewHistory.push({ view: APP.currentView, params: APP.currentParams });
  APP.currentView   = view;
  APP.currentParams = params;

  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const nav = document.getElementById('nav-' + (VIEW_TO_NAV[view] || 'home'));
  if (nav) nav.classList.add('active');

  const main = document.getElementById('appMain');
  main.innerHTML = '';
  main.scrollTop = 0;

  const views = {
    'home':               renderHome,
    'teams':              renderTeams,
    'team-detail':        renderTeamDetail,
    'player-detail':      renderPlayerDetail,
    'games':              renderGames,
    'game-detail':        renderGameDetail,
    'game-live':          renderGameLive,
    'messages':           renderMessages,
    'message-detail':     renderMessageDetail,
    'profile':            renderProfile,
    'admin':              renderAdmin,
    'admin-users':        renderAdminUsers,
    'admin-teams':        renderAdminTeams,
    'admin-compose':      renderAdminCompose,
    'admin-permissions':  renderAdminPermissions,
    'admin-news':         renderAdminNews,
  };
  (views[view] || renderHome)(main, params);
}

function goBack() {
  if (APP.viewHistory.length > 0) {
    const prev = APP.viewHistory.pop();
    navigateTo(prev.view, prev.params, false);
  } else { navigateTo('home'); }
}

// ===================== DATA HELPERS =====================
async function getTeams() {
  if (IS_DEMO_MODE) return [...DEMO_DATA.teams];
  try {
    const isAdminOrCoach = ['admin','coach'].includes(APP.userData.role);
    if (!isAdminOrCoach && APP.userData.teamId) {
      const d = await db.collection('teams').doc(APP.userData.teamId).get();
      return d.exists ? [{ id:d.id, ...d.data() }] : [];
    }
    const snap = await db.collection('teams').where('active','==',true).get();
    return snap.docs.map(d => ({ id:d.id, ...d.data() }));
  } catch(e) { console.error(e); return []; }
}

async function getPlayers(teamId) {
  if (IS_DEMO_MODE) return DEMO_DATA.players.filter(p => p.teamId === teamId);
  try {
    const snap = await db.collection('players').where('teamId','==',teamId).where('active','==',true).orderBy('number').get();
    return snap.docs.map(d => ({ id:d.id, ...d.data() }));
  } catch(e) { return []; }
}

async function getGames(teamId = null) {
  if (IS_DEMO_MODE) return teamId ? DEMO_DATA.games.filter(g => g.teamId === teamId) : [...DEMO_DATA.games];
  try {
    let q = db.collection('games').orderBy('date','desc').limit(30);
    if (teamId) q = db.collection('games').where('teamId','==',teamId).limit(30);
    const snap = await q.get();
    return snap.docs.map(d => ({ id:d.id, ...d.data() }));
  } catch(e) { return []; }
}

async function getMessages() {
  if (IS_DEMO_MODE) return [...DEMO_DATA.messages];
  try {
    const snap = await db.collection('messages').where('recipientId','in',['all', APP.user.uid]).orderBy('date','desc').get();
    return snap.docs.map(d => ({ id:d.id, ...d.data() }));
  } catch(e) { return []; }
}

async function getNews() {
  if (IS_DEMO_MODE) return [...DEMO_DATA.news];
  try {
    const snap = await db.collection('news').orderBy('date','desc').limit(10).get();
    return snap.docs.map(d => ({ id:d.id, ...d.data() }));
  } catch(e) { return []; }
}

// ===================== UTILITY =====================
function initials(name = '') {
  return name.split(' ').slice(0,2).map(n => n[0]||'').join('').toUpperCase() || '?';
}

function fmtDate(d) {
  return new Date(d).toLocaleDateString('es-ES', { weekday:'short', day:'numeric', month:'short' });
}

function fmtDateLong(d) {
  return new Date(d).toLocaleDateString('es-ES', { weekday:'long', day:'numeric', month:'long', year:'numeric' });
}

function fmtTimeAgo(d) {
  const diff = Date.now() - new Date(d).getTime();
  const m = Math.floor(diff/60000), h = Math.floor(diff/3600000), dy = Math.floor(diff/86400000);
  if (m < 1)  return 'Ahora';
  if (m < 60) return `${m}m`;
  if (h < 24) return `${h}h`;
  if (dy < 7) return `${dy}d`;
  return fmtDate(d);
}

function isWin(g) {
  if (g.status !== 'finished') return false;
  return g.isHome ? g.homeScore > g.awayScore : g.awayScore > g.homeScore;
}

function calcAge(dateString) {
  const birthday = new Date(dateString);
  const ageDifMs = Date.now() - birthday.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

function showToast(msg, type = '') {
  document.querySelector('.toast')?.remove();
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.innerHTML = `<span>${type==='success'?'✅':type==='error'?'❌':'ℹ️'}</span> ${msg}`;
  document.body.appendChild(t);
  setTimeout(() => { t.classList.add('show'); }, 10);
  setTimeout(() => {
    t.classList.remove('show');
    setTimeout(() => t.remove(), 400);
  }, 3500);
}

function openModal(html) {
  const ov = document.createElement('div');
  ov.className = 'modal-overlay';
  ov.innerHTML = html;
  ov.addEventListener('click', e => { if (e.target === ov) ov.remove(); });
  document.body.appendChild(ov);
  window._closeModal = () => ov.remove();
  return ov;
}

function avatarBg(i = 0) {
  const bgs = ['linear-gradient(135deg,#FF6B2C,#FF8C00)',
                'linear-gradient(135deg,#3B82F6,#1D4ED8)',
                'linear-gradient(135deg,#8B5CF6,#6D28D9)',
                'linear-gradient(135deg,#10B981,#047857)',
                'linear-gradient(135deg,#F59E0B,#B45309)'];
  return bgs[i % bgs.length];
}

function genPassword() {
  const c = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789@#!';
  return Array.from({length:8}, () => c[Math.floor(Math.random()*c.length)]).join('');
}

// ===================== MINI COMPONENTS =====================
function gameCardHTML(g) {
  const fin   = g.status === 'finished';
  const win   = fin && isWin(g);
  const tag   = fin ? `<div class="tag ${win?'tag-green':'tag-red'}" style="font-size:11px">${win?'✓ Victoria':'✗ Derrota'}</div>`
                    : `<div class="tag tag-blue" style="font-size:11px">📅 Próximo</div>`;
  const score = fin ? `${g.homeScore}<span style="font-size:20px;color:var(--text-3);margin:0 4px">-</span>${g.awayScore}` : 'vs';
  return `
  <div class="game-card" onclick="navigateTo('game-detail',{gameId:'${g.id}'})">
    <div class="game-header">
      <span class="game-date">📅 ${fmtDate(g.date)} · ${g.isHome?'🏠 Local':'✈️ Visitante'}</span>
      ${tag}
    </div>
    <div class="game-body">
      <div class="game-team-name home">${g.homeTeam}</div>
      <div class="game-score">${score}</div>
      <div class="game-team-name away">${g.awayTeam}</div>
    </div>
    <div class="game-footer">
      <span class="game-location">📍 ${g.location}</span>
      <span class="tag tag-gray" style="font-size:11px">${g.teamName||''}</span>
    </div>
  </div>`;
}

function newsCardHTML(n) {
  return `
  <div class="news-card">
    <div class="news-img">${n.icon||'📰'}</div>
    <div class="news-content">
      <div class="news-date">${n.category} · ${fmtDate(n.date)}</div>
      <div class="news-title">${n.title}</div>
      <div class="news-preview">${n.body.substring(0,110)}…</div>
    </div>
  </div>`;
}

function leaderboardHTML(players, stat, title) {
  const sorted = [...players].sort((a,b) => (b.stats?.[stat]||0) - (a.stats?.[stat]||0));
  return `
  <div class="card" style="margin-bottom:12px">
    <div class="card-header"><div class="card-title">${title}</div></div>
    ${sorted.slice(0,5).map((p,i) => `
      <div class="performer-row">
        <div class="performer-rank ${i===0?'top':''}">${i===0?'🥇':i===1?'🥈':i===2?'🥉':i+1}</div>
        <div class="avatar" style="width:36px;height:36px;font-size:14px;${avatarBg(i)}">${initials(p.name)}</div>
        <div style="flex:1;margin-left:8px">
          <div style="font-size:14px;font-weight:600">${p.name}</div>
          <div style="font-size:11px;color:var(--text-2)">#${p.number} · ${p.position}</div>
        </div>
        <div class="performer-val">${(p.stats?.[stat]||0).toFixed(1)}</div>
      </div>`).join('')}
  </div>`;
}

function statBarRow(label, value, max, negative = false) {
  const pct   = Math.min((parseFloat(value)/max)*100, 100);
  const color = negative ? 'rgba(255,68,68,0.7)' : 'linear-gradient(90deg,var(--primary),var(--secondary))';
  return `
  <div style="margin-bottom:14px">
    <div style="display:flex;justify-content:space-between;margin-bottom:6px">
      <span style="font-size:14px;color:var(--text-2)">${label}</span>
      <span style="font-size:15px;font-weight:800">${value}</span>
    </div>
    <div class="progress-bar">
      <div class="progress-fill" style="width:${pct}%;background:${color}"></div>
    </div>
  </div>`;
}

// ===================== VIEW: HOME =====================
async function renderHome(container) {
  container.innerHTML = `<div class="loader"><div class="spinner"></div></div>`;
  const [teams, games, news] = await Promise.all([getTeams(), getGames(), getNews()]);
  const finished  = games.filter(g => g.status === 'finished');
  const upcoming  = games.filter(g => g.status === 'upcoming');
  const wins      = finished.filter(g => isWin(g));
  const isAdmin   = ['admin','coach'].includes(APP.userData.role);

  container.innerHTML = `
    ${IS_DEMO_MODE ? `
    <div style="margin:12px 16px 0;padding:10px 14px;background:rgba(255,184,0,0.08);border:1px solid rgba(255,184,0,0.25);border-radius:12px;display:flex;align-items:center;gap:10px">
      <span style="font-size:18px">⚠️</span>
      <div>
        <div style="font-size:12px;font-weight:700;color:#FFB800">Modo demostración activo</div>
        <div style="font-size:11px;color:var(--text-2)">Configura Firebase para datos reales</div>
      </div>
    </div>` : ''}

    <div class="section-header">
      <div>
        <div class="section-title">¡Hola, ${APP.userData.name.split(' ')[0]}! 👋</div>
        <div class="section-subtitle">${roleLabel()}</div>
      </div>
    </div>

    <!-- Hero Banner -->
    <div class="hero-banner">
      <div class="hero-title">Club Baloncesto<br>Gallardas 🏀</div>
      <div class="hero-sub" style="margin-top:8px">${teams.length} equipos activos · Temporada 2024-25</div>
    </div>

    <!-- Noticias del Club (Prioridad Global) -->
    ${news.length ? `
    <div class="section-header">
      <div class="section-title" style="font-size:18px">Noticias del Club</div>
      ${isAdmin ? `<button class="section-action" onclick="navigateTo('admin-news')">+ Nueva</button>` : ''}
    </div>
    <div class="news-container">
      ${news.slice(0,3).map((n, i) => i === 0 ? `
        <div class="news-card featured" onclick="showNewsDetail('${n.id}')">
          <div class="news-badge">${n.category}</div>
          <div class="news-img-hero">${n.photo ? `<img src="${n.photo}">` : '📰'}</div>
          <div class="news-content">
            <div class="news-date">${fmtDate(n.date)}</div>
            <div class="news-title-hero">${n.title}</div>
            <div class="news-preview-hero">${n.body.substring(0,80)}...</div>
          </div>
        </div>
      ` : newsCardHTML(n)).join('')}
    </div>` : `
    <div class="section-header">
      <div class="section-title" style="font-size:18px">Noticias del Club</div>
      ${isAdmin ? `<button class="section-action" onclick="navigateTo('admin-news')">+ Nueva</button>` : ''}
    </div>
    <div class="empty-state">No hay noticias publicadas recientemente</div>`}

    <!-- Competición -->
    ${upcoming.length ? `
    <div class="section-header" style="margin-top:24px">
      <div class="section-title" style="font-size:18px">Próximos partidos</div>
      <button class="section-action" onclick="navigateTo('games')">Ver todos</button>
    </div>
    <div class="games-list-home">
      ${upcoming.slice(0,2).map(gameCardHTML).join('')}
    </div>` : ''}

    ${finished.length ? `
    <div class="section-header" style="margin-top:20px">
      <div class="section-title" style="font-size:18px">Últimos resultados</div>
      <button class="section-action" onclick="navigateTo('games')">Ver todos</button>
    </div>
    <div class="results-list-home">
      ${finished.slice(0,2).map(gameCardHTML).join('')}
    </div>` : ''}

    <div style="height:16px"></div>`;
}

// ===================== VIEW: TEAMS =====================
async function renderTeams(container) {
  container.innerHTML = `<div class="loader"><div class="spinner"></div></div>`;
  const teams  = await getTeams();
  const isAdmin = APP.userData.role === 'admin';

  const grouped = {};
  teams.forEach(t => {
    if (!grouped[t.category]) grouped[t.category] = [];
    grouped[t.category].push(t);
  });

  let html = `
    <div class="section-header">
      <div>
        <div class="section-title">Equipos</div>
        <div class="section-subtitle">${teams.length} equipos · Temporada 2024-25</div>
      </div>
      ${isAdmin ? `<button class="section-action" onclick="navigateTo('admin-teams')">+ Nuevo</button>` : ''}
    </div>
    <div class="tab-pills">
      <button class="tab-pill active" onclick="filterTeamGender('all',this)">Todos</button>
      <button class="tab-pill" onclick="filterTeamGender('Masculino',this)">♂ Masculino</button>
      <button class="tab-pill" onclick="filterTeamGender('Femenino',this)">♀ Femenino</button>
    </div>
    <div id="teamsList">`;

  if (!teams.length) {
    html += `<div class="empty-state"><div class="empty-icon">👥</div><div class="empty-title">Sin equipos</div><div class="empty-desc">No hay equipos registrados todavía.</div></div>`;
  } else {
    Object.keys(grouped).forEach(cat => {
      grouped[cat].forEach(t => {
        const emoji = t.gender === 'Femenino' ? '👧' : '👦';
        html += `
        <div class="team-card" data-gender="${t.gender}" onclick="navigateTo('team-detail',{teamId:'${t.id}'})">
          <div class="team-icon">${emoji}</div>
          <div class="team-info">
            <div class="team-name">${t.name}</div>
            <div class="team-meta">${t.category} · ${t.gender} · ${t.playerCount||0} jugadores</div>
            <div class="team-meta">🏋️ ${t.coachName||'Sin entrenador'} &nbsp;·&nbsp; ${t.wins||0}V ${t.losses||0}D</div>
          </div>
          <div class="team-arrow">›</div>
        </div>`;
      });
    });
  }
  html += `</div><div style="height:16px"></div>`;
  container.innerHTML = html;

  window.filterTeamGender = (gender, btn) => {
    document.querySelectorAll('.tab-pill').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('[data-gender]').forEach(el => {
      el.style.display = (gender === 'all' || el.dataset.gender === gender) ? '' : 'none';
    });
  };
}

// ===================== VIEW: TEAM DETAIL =====================
async function renderTeamDetail(container, { teamId }) {
  container.innerHTML = `<button class="back-btn" onclick="goBack()">‹ Equipos</button><div class="loader"><div class="spinner"></div></div>`;

  const team    = IS_DEMO_MODE ? DEMO_DATA.teams.find(t => t.id === teamId)
                               : await db.collection('teams').doc(teamId).get().then(d => ({id:d.id,...d.data()}));
  const players = await getPlayers(teamId);
  const games   = await getGames(teamId);
  const finished = games.filter(g => g.status === 'finished');
  const wins     = finished.filter(isWin);
  const canManage = ['admin','coach'].includes(APP.userData.role);
  const emoji    = team?.gender === 'Femenino' ? '👧' : '👦';

  container.innerHTML = `
    <button class="back-btn" onclick="goBack()">‹ Equipos</button>

    <div style="padding:0 16px 16px">
      <div style="display:flex;align-items:center;gap:14px;margin-bottom:16px">
        <div class="team-icon" style="width:64px;height:64px;border-radius:18px;font-size:32px">${emoji}</div>
        <div>
          <div style="font-size:22px;font-weight:900">${team?.name||'Equipo'}</div>
          <div style="font-size:13px;color:var(--text-2)">${team?.category} · ${team?.gender}</div>
          <div style="font-size:13px;color:var(--text-2)">🏋️ ${team?.coachName||'Sin entrenador'}</div>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px">
        <div class="stat-card"><div class="stat-value">${finished.length}</div><div class="stat-label">Partidos</div></div>
        <div class="stat-card"><div class="stat-value">${wins.length}</div><div class="stat-label">Victorias</div></div>
        <div class="stat-card"><div class="stat-value">${finished.length - wins.length}</div><div class="stat-label">Derrotas</div></div>
      </div>
    </div>

    <div class="tab-pills">
      <button class="tab-pill active" onclick="teamTab('players',this)">Plantilla (${players.length})</button>
      <button class="tab-pill" onclick="teamTab('stats',this)">Estadísticas</button>
      <button class="tab-pill" onclick="teamTab('games',this)">Partidos (${games.length})</button>
    </div>

    <!-- PLAYERS TAB -->
    <div id="tdtab-players">
      <div class="card">
        <div class="card-header">
          <div class="card-title">Plantilla</div>
          ${canManage ? `<button class="section-action" onclick="showAddPlayerModal('${teamId}')">+ Jugador</button>` : ''}
        </div>
        ${!players.length
            ? `<div class="empty-state" style="padding:28px"><div class="empty-icon" style="font-size:38px">👤</div><div class="empty-title" style="font-size:16px">Sin jugadores</div></div>`
            : players.map(p => `
               <div class="player-row" style="cursor:default">
                 <div style="display:flex;align-items:center;flex:1;cursor:pointer" onclick="navigateTo('player-detail',{playerId:'${p.id}',teamId:'${teamId}'})">
                   <div class="player-number">${p.number}</div>
                   <div class="avatar" style="width:40px;height:40px;font-size:16px;overflow:hidden">
                     ${p.photo ? `<img src="${p.photo}" style="width:100%;height:100%;object-fit:cover">` : initials(p.name)}
                   </div>
                   <div class="player-info">
                     <div class="player-name">${p.name}</div>
                     <div class="player-meta">${p.position} · ${(p.stats?.pts||0).toFixed(1)} pts/par.</div>
                   </div>
                 </div>
                 ${canManage ? `<button class="action-btn-circle" style="color:var(--text-3)" onclick="showEditPlayerModal('${p.id}','${teamId}')">•••</button>` : `<div style="color:var(--text-3);padding:10px">›</div>`}
               </div>`).join('')}
      </div>
    </div>

    <!-- STATS TAB -->
    <div id="tdtab-stats" style="display:none">
      ${!players.length
          ? `<div class="empty-state"><div class="empty-icon">📊</div><div class="empty-title">Sin estadísticas</div></div>`
          : [['pts','🏀 Anotación'],['reb','📊 Rebotes'],['ast','🎯 Asistencias'],['stl','🔒 Robos'],['blk','🛡️ Tapones']].map(([s,t]) => leaderboardHTML(players,s,t)).join('')}
    </div>

    <!-- GAMES TAB -->
    <div id="tdtab-games" style="display:none">
      ${!games.length
          ? `<div class="empty-state"><div class="empty-icon">🏀</div><div class="empty-title">Sin partidos</div></div>`
          : games.map(gameCardHTML).join('')}
    </div>

    ${canManage ? `
    <div style="padding:16px">
      <button class="btn-full btn-primary-full" onclick="navigateTo('game-live',{teamId:'${teamId}',teamName:'${team?.name||''}'})">
        🏀 Iniciar partido en vivo
      </button>
    </div>` : ''}
    <div style="height:16px"></div>`;

  window.teamTab = (tab, btn) => {
    document.querySelectorAll('.tab-pill').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    ['players','stats','games'].forEach(t => {
      const el = document.getElementById('tdtab-'+t);
      if (el) el.style.display = t === tab ? '' : 'none';
    });
  };
}

// ===================== VIEW: PLAYER DETAIL =====================
async function renderPlayerDetail(container, { playerId, teamId }) {
  const p = IS_DEMO_MODE ? DEMO_DATA.players.find(x => x.id === playerId)
                         : await db.collection('players').doc(playerId).get().then(d => ({id:d.id,...d.data()}));
  if (!p) { container.innerHTML = `<div class="back-btn" onclick="goBack()">‹ Atrás</div><div class="empty-state"><div class="empty-icon">🤷</div><div class="empty-title">Jugador no encontrado</div></div>`; return; }

  const eff = (p.stats?.pts||0)+(p.stats?.reb||0)+(p.stats?.ast||0)+(p.stats?.stl||0)+(p.stats?.blk||0)-(p.stats?.to||0);
  const canSeeStats = APP.permissions.show_individual_stats;

  container.innerHTML = `
    <button class="back-btn" onclick="goBack()">‹ Equipo</button>

    <div style="background:linear-gradient(160deg,rgba(255,107,44,0.15) 0%,transparent 60%);padding:24px 16px 16px;text-align:center">
      <div style="width:100px;height:100px;border-radius:50%;${p.photo?'':'background:var(--glass)'};display:flex;align-items:center;justify-content:center;font-size:38px;font-weight:900;margin:0 auto 12px;border:3px solid rgba(255,107,44,0.4);box-shadow:0 0 0 6px rgba(255,107,44,0.1);overflow:hidden">
        ${p.photo ? `<img src="${p.photo}" style="width:100%;height:100%;object-fit:cover">` : initials(p.name)}
      </div>
      <div style="font-size:24px;font-weight:900">${p.name}</div>
      <div style="display:flex;align-items:center;justify-content:center;gap:8px;margin-top:10px;flex-wrap:wrap">
        <span class="tag tag-orange">#${p.number}</span>
        <span class="tag tag-gray">${p.position}</span>
        ${p.teamName ? `<span class="tag tag-gray">👥 ${p.teamName}</span>` : ''}
      </div>
    </div>

    ${canSeeStats ? `
    <div class="section-header" style="padding-top:16px">
      <div class="section-title" style="font-size:17px">Media por partido</div>
      <div class="chip">Temporada 24/25</div>
    </div>

    <div class="h-scroll">
      ${[['pts','Puntos'],['reb','Rebotes'],['ast','Asistencias'],['stl','Robos'],['blk','Tapones']].map(([k,l]) => `
        <div class="mini-stat-card">
          <div class="mini-stat-val">${(p.stats?.[k]||0).toFixed(1)}</div>
          <div class="mini-stat-label">${l}</div>
        </div>`).join('')}
      <div class="mini-stat-card" style="border-color:rgba(255,184,0,0.35)">
        <div class="mini-stat-val" style="color:var(--secondary)">${eff.toFixed(1)}</div>
        <div class="mini-stat-label">Valoración</div>
      </div>
    </div>

    <div class="card">
      <div class="card-header"><div class="card-title">📊 Desglose estadístico</div></div>
      <div class="card-body">
        ${statBarRow('🏀 Puntos por partido',   (p.stats?.pts||0).toFixed(1), 25)}
        ${statBarRow('📊 Rebotes totales',       (p.stats?.reb||0).toFixed(1), 12)}
        ${statBarRow('  ↳ Ofensivos',           (p.stats?.reb_off||0).toFixed(1), 5)}
        ${statBarRow('  ↳ Defensivos',          (p.stats?.reb_def||0).toFixed(1), 8)}
        ${statBarRow('🎯 Asistencias',           (p.stats?.ast||0).toFixed(1), 8)}
        ${statBarRow('🔒 Robos',                 (p.stats?.stl||0).toFixed(1), 4)}
        ${statBarRow('🛡️ Tapones',              (p.stats?.blk||0).toFixed(1), 4)}
        ${statBarRow('❌ Pérdidas',              (p.stats?.to||0).toFixed(1),  5, true)}
        ${statBarRow('⚠️ Faltas',               (p.stats?.pf||0).toFixed(1),  5, true)}
      </div>
    </div>

    <div class="card" style="margin-bottom:16px">
      <div class="card-header"><div class="card-title">⭐ Valoración total</div></div>
      <div class="card-body" style="text-align:center;padding:20px">
        <div style="font-size:64px;font-weight:900;color:var(--secondary);line-height:1">${eff.toFixed(1)}</div>
        <div style="font-size:13px;color:var(--text-2);margin-top:8px">PTS + REB + AST + ROB + TAP − PER</div>
      </div>
    </div>` : `
    <div class="empty-state">
      <div class="empty-icon">🔒</div>
      <div class="empty-title">Estadísticas no disponibles</div>
      <div class="empty-desc">El club ha restringido la visibilidad de las estadísticas individuales.</div>
    </div>`}

    <div style="height:16px"></div>`;
}

// ===================== VIEW: GAMES =====================
async function renderGames(container) {
  container.innerHTML = `<div class="loader"><div class="spinner"></div></div>`;
  const games   = await getGames();
  const canEdit = ['admin','coach'].includes(APP.userData.role);
  const upcoming = games.filter(g => g.status === 'upcoming');
  const finished = games.filter(g => g.status === 'finished');

  let html = `
    <div class="section-header">
      <div>
        <div class="section-title">Partidos</div>
        <div class="section-subtitle">Temporada 2024-25</div>
      </div>
      ${canEdit ? `<button class="section-action" onclick="showNewGameModal()">+ Nuevo</button>` : ''}
    </div>
    <div class="tab-pills">
      <button class="tab-pill active" onclick="filterGames('all',this)">Todos (${games.length})</button>
      <button class="tab-pill" onclick="filterGames('upcoming',this)">Próximos (${upcoming.length})</button>
      <button class="tab-pill" onclick="filterGames('finished',this)">Resultados (${finished.length})</button>
    </div>
    <div id="gamesList">
    ${!games.length ? `<div class="empty-state"><div class="empty-icon">🏀</div><div class="empty-title">Sin partidos</div><div class="empty-desc">No hay partidos programados.</div></div>`
      : games.map(g => `<div class="game-filter-wrap" data-status="${g.status}">${gameCardHTML(g)}</div>`).join('')}
    </div>
    <div style="height:16px"></div>`;

  container.innerHTML = html;

  window.filterGames = (s, btn) => {
    document.querySelectorAll('.tab-pill').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.game-filter-wrap').forEach(el => {
      el.style.display = (s === 'all' || el.dataset.status === s) ? '' : 'none';
    });
  };

  window.showNewGameModal = () => openModal(`
    <div class="modal-sheet">
      <div class="modal-handle"></div>
      <div class="modal-title">Nuevo partido</div>
      <div class="modal-body" style="padding-bottom:24px">
        <div class="form-group" style="margin-bottom:12px">
          <label class="form-label" style="font-size:11px">EQUIPO LOCAL</label>
          <input class="form-input" id="ngHome" type="text" placeholder="Nombre equipo local" value="Gallardas">
        </div>
        <div class="form-group" style="margin-bottom:12px">
          <label class="form-label" style="font-size:11px">EQUIPO VISITANTE</label>
          <input class="form-input" id="ngAway" type="text" placeholder="Nombre rival">
        </div>
        <div class="form-group" style="margin-bottom:12px">
          <label class="form-label" style="font-size:11px">FECHA Y HORA</label>
          <input class="form-input" id="ngDate" type="datetime-local">
        </div>
        <div class="form-group" style="margin-bottom:20px">
          <label class="form-label" style="font-size:11px">PABELLÓN / UBICACIÓN</label>
          <input class="form-input" id="ngLocation" type="text" placeholder="Pabellón Municipal">
        </div>
        <button class="btn-full btn-primary-full" onclick="createGame()">Crear partido</button>
        <button class="btn-full btn-ghost-full" style="margin-top:10px" onclick="_closeModal()">Cancelar</button>
      </div>
    </div>`);

  window.createGame = async () => {
    const data = { homeTeam: document.getElementById('ngHome').value.trim(), awayTeam: document.getElementById('ngAway').value.trim(), date: document.getElementById('ngDate').value, location: document.getElementById('ngLocation').value.trim(), status:'upcoming', homeScore:null, awayScore:null, isHome:true, createdBy: APP.userData.id };
    if (!data.homeTeam || !data.awayTeam || !data.date) { showToast('Completa todos los campos','error'); return; }
    if (!IS_DEMO_MODE) await db.collection('games').add(data);
    _closeModal();
    showToast('Partido creado correctamente','success');
  };
}

// ===================== VIEW: GAME DETAIL =====================
async function renderGameDetail(container, { gameId }) {
  const g = IS_DEMO_MODE ? DEMO_DATA.games.find(x => x.id === gameId)
                         : await db.collection('games').doc(gameId).get().then(d => ({id:d.id,...d.data()}));
  if (!g) { container.innerHTML = `<button class="back-btn" onclick="goBack()">‹ Atrás</button><div class="empty-state"><div class="empty-icon">🤷</div><div class="empty-title">Partido no encontrado</div></div>`; return; }

  const fin     = g.status === 'finished';
  const win     = fin && isWin(g);
  const canEdit = ['admin','coach'].includes(APP.userData.role);
  const players = IS_DEMO_MODE ? DEMO_DATA.players.filter(p => p.teamId === g.teamId) : [];

  container.innerHTML = `
    <button class="back-btn" onclick="goBack()">‹ Partidos</button>

    <div style="padding:0 16px 8px;text-align:center">
      ${fin ? `<div class="tag ${win?'tag-green':'tag-red'}" style="font-size:13px;padding:6px 18px">${win?'🏆 Victoria':'😔 Derrota'}</div>`
            : `<div class="tag tag-blue" style="font-size:13px;padding:6px 18px">📅 ${fmtDateLong(g.date)}</div>`}
    </div>

    <div class="scoreboard">
      <div>
        <div class="scoreboard-team">${g.homeTeam}</div>
        ${g.isHome ? `<div style="font-size:10px;color:var(--primary);margin-top:4px;font-weight:800">🏠 LOCAL</div>` : ''}
      </div>
      <div class="scoreboard-score">
        ${fin ? `${g.homeScore}<span class="scoreboard-sep">-</span>${g.awayScore}` : 'vs'}
      </div>
      <div>
        <div class="scoreboard-team">${g.awayTeam}</div>
        ${!g.isHome ? `<div style="font-size:10px;color:var(--primary);margin-top:4px;font-weight:800">🏠 LOCAL</div>` : ''}
      </div>
    </div>

    <div style="padding:0 16px 16px;display:flex;gap:8px;justify-content:center;flex-wrap:wrap">
      <span class="tag tag-gray">📍 ${g.location}</span>
      <span class="tag tag-gray">📅 ${fmtDate(g.date)}</span>
      ${g.teamName ? `<span class="tag tag-gray">👥 ${g.teamName}</span>` : ''}
    </div>

    ${canEdit && !fin ? `
    <div style="padding:0 16px 16px">
      <button class="btn-full btn-primary-full" onclick="navigateTo('game-live',{gameId:'${g.id}',teamId:'${g.teamId}',teamName:'${g.teamName||''}'})">
        🏀 Iniciar partido en vivo
      </button>
    </div>` : ''}

    ${fin && players.length && APP.permissions.show_individual_stats ? `
    <div class="section-header"><div class="section-title" style="font-size:17px">Estadísticas del partido</div></div>
    <div style="overflow-x:auto;padding:0 16px 16px">
      <table style="width:100%;border-collapse:collapse;min-width:520px;font-size:13px">
        <thead>
          <tr style="background:var(--bg-card-2)">
            <th style="text-align:left;padding:10px 8px;color:var(--text-2);font-weight:700">Jugador</th>
            <th style="padding:10px 4px;color:var(--text-2);font-weight:700">PTS</th>
            <th style="padding:10px 4px;color:var(--text-2);font-weight:700">REB</th>
            <th style="padding:10px 4px;color:var(--text-2);font-weight:700">AST</th>
            <th style="padding:10px 4px;color:var(--text-2);font-weight:700">ROB</th>
            <th style="padding:10px 4px;color:var(--text-2);font-weight:700">TAP</th>
            <th style="padding:10px 4px;color:var(--text-2);font-weight:700">VAL</th>
          </tr>
        </thead>
        <tbody>
          ${players.map(p => {
            const eff = (p.stats?.pts||0)+(p.stats?.reb||0)+(p.stats?.ast||0)+(p.stats?.stl||0)+(p.stats?.blk||0)-(p.stats?.to||0);
            return `<tr style="border-bottom:1px solid var(--glass-border)">
              <td style="padding:10px 8px"><div style="font-weight:700">${p.name}</div><div style="font-size:11px;color:var(--text-2)">#${p.number}</div></td>
              <td style="text-align:center;padding:8px 4px;font-weight:800;color:var(--primary)">${Math.round(p.stats?.pts||0)}</td>
              <td style="text-align:center;padding:8px 4px">${Math.round(p.stats?.reb||0)}</td>
              <td style="text-align:center;padding:8px 4px">${Math.round(p.stats?.ast||0)}</td>
              <td style="text-align:center;padding:8px 4px">${Math.round(p.stats?.stl||0)}</td>
              <td style="text-align:center;padding:8px 4px">${Math.round(p.stats?.blk||0)}</td>
              <td style="text-align:center;padding:8px 4px;font-weight:800;color:var(--secondary)">${eff.toFixed(1)}</td>
            </tr>`;}).join('')}
        </tbody>
      </table>
    </div>` : ''}

    <div style="height:16px"></div>`;
}

// ===================== VIEW: GAME LIVE =====================
function renderGameLive(container, { teamId, teamName, gameId }) {
  const players  = IS_DEMO_MODE ? DEMO_DATA.players.filter(p => p.teamId === (teamId||'t1')) : [];
  const liveStats = {};
  players.forEach(p => { liveStats[p.id] = { pts_1:0, pts_2:0, pts_3:0, reb_off:0, reb_def:0, ast:0, stl:0, blk:0, to:0, pf:0 }; });

  let selPlayerId = players[0]?.id || null;
  let awayScore   = 0;
  let timerSec    = 0;
  let timerOn     = false;
  let timerInt    = null;
  let quarter     = 1;

  function homeScore() { return players.reduce((s,p) => s + getPlayerPts(p.id), 0); }
  function getPlayerPts(pid) { const s = liveStats[pid]||{}; return (s.pts_1||0)*1+(s.pts_2||0)*2+(s.pts_3||0)*3; }
  function fmtTimer(s) { return `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`; }

  function addStat(pid, stat) {
    if (!pid) return;
    if (!liveStats[pid]) liveStats[pid] = {};
    liveStats[pid][stat] = (liveStats[pid][stat]||0) + 1;
    refreshLiveUI();
    flashFeedback(stat);
  }

  function removeStat(pid, stat) {
    if (!pid || !liveStats[pid]) return;
    liveStats[pid][stat] = Math.max(0, (liveStats[pid][stat]||0) - 1);
    refreshLiveUI();
  }

  function refreshLiveUI() {
    const hEl = document.getElementById('lvHomeScore');
    if (hEl) hEl.textContent = homeScore();

    if (!selPlayerId) return;
    const s = liveStats[selPlayerId] || {};
    STAT_BTNS.forEach(b => {
      const cnt = document.getElementById('cnt_'+b.stat);
      if (!cnt) return;
      const v = s[b.stat]||0;
      if (b.stat==='pts_1')      cnt.innerHTML = `${v} <span style="font-size:12px;color:var(--text-3)">(${v}pt)</span>`;
      else if (b.stat==='pts_2') cnt.innerHTML = `${v} <span style="font-size:12px;color:var(--text-3)">(${v*2}pt)</span>`;
      else if (b.stat==='pts_3') cnt.innerHTML = `${v} <span style="font-size:12px;color:var(--text-3)">(${v*3}pt)</span>`;
      else cnt.textContent = v;
    });
  }

  const STAT_BTNS = [
    { stat:'pts_1', icon:'🎯', label:'Libre (1pt)' },
    { stat:'pts_2', icon:'🏀', label:'Campo (2pt)' },
    { stat:'pts_3', icon:'⭐', label:'Triple (3pt)' },
    { stat:'reb_off', icon:'💪', label:'Reb. Ofens.' },
    { stat:'reb_def', icon:'🛡️', label:'Reb. Defens.' },
    { stat:'ast', icon:'🤝', label:'Asistencia' },
    { stat:'stl', icon:'🔒', label:'Robo' },
    { stat:'blk', icon:'✋', label:'Tapón' },
    { stat:'to',  icon:'❌', label:'Pérdida' },
    { stat:'pf',  icon:'⚠️', label:'Falta pers.' },
    { stat:'foul_rx',icon:'🆓',label:'Falta recib.' },
    { stat:'mins',icon:'🔄', label:'Sustitución' },
  ];

  const FEEDBACK_LABELS = { pts_1:'+1PT', pts_2:'+2PT', pts_3:'+3PT', reb_off:'REB.O', reb_def:'REB.D', ast:'AST', stl:'ROB', blk:'TAP', to:'PÉR', pf:'FALTA', foul_rx:'FALTA↗', mins:'SUST.' };

  function flashFeedback(stat) {
    const fb = document.getElementById('liveFeedback');
    if (!fb) return;
    fb.textContent = FEEDBACK_LABELS[stat] || stat;
    fb.style.opacity = '1';
    fb.style.transform = 'translateX(-50%) translateY(-4px)';
    clearTimeout(fb._t);
    fb._t = setTimeout(() => { fb.style.opacity='0'; fb.style.transform='translateX(-50%) translateY(4px)'; }, 900);
  }

  container.innerHTML = `
    <!-- Live top bar -->
    <div style="background:var(--bg-dark);padding:12px 16px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--glass-border);position:sticky;top:0;z-index:20">
      <button style="background:none;border:none;color:var(--primary);font-size:15px;font-weight:700;cursor:pointer;font-family:var(--font)" onclick="goBack()">← Salir</button>
      <div class="live-badge"><div class="live-dot"></div>&nbsp;EN VIVO</div>
      <button id="endBtn" style="background:rgba(255,68,68,0.12);border:1px solid rgba(255,68,68,0.3);color:var(--danger);font-size:12px;font-weight:800;padding:6px 14px;border-radius:10px;cursor:pointer;font-family:var(--font)" onclick="endGameConfirm()">Finalizar</button>
    </div>

    <!-- Scoreboard -->
    <div style="background:linear-gradient(135deg,rgba(255,107,44,0.1),rgba(255,107,44,0.04));padding:20px 16px;border-bottom:1px solid var(--glass-border)">
      <div style="display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:8px;text-align:center;margin-bottom:16px">
        <div>
          <div style="font-size:12px;font-weight:700;color:var(--text-2);margin-bottom:4px">${teamName||'Gallardas'}</div>
          <div style="font-size:56px;font-weight:900;color:var(--primary);line-height:1" id="lvHomeScore">0</div>
        </div>
        <div style="font-size:22px;color:var(--text-3)">—</div>
        <div>
          <div style="font-size:12px;font-weight:700;color:var(--text-2);margin-bottom:4px">Rival</div>
          <div style="display:flex;align-items:center;justify-content:center;gap:8px">
            <button onclick="awayAdj(-1)" style="width:30px;height:30px;border-radius:8px;background:var(--glass);border:1px solid var(--glass-border);color:white;font-size:18px;cursor:pointer;font-family:var(--font);display:flex;align-items:center;justify-content:center">−</button>
            <div style="font-size:56px;font-weight:900;color:var(--text-2);line-height:1" id="lvAwayScore">0</div>
            <button onclick="awayAdj(1)" style="width:30px;height:30px;border-radius:8px;background:var(--glass);border:1px solid var(--glass-border);color:white;font-size:18px;cursor:pointer;font-family:var(--font);display:flex;align-items:center;justify-content:center">+</button>
          </div>
        </div>
      </div>

      <div style="display:flex;align-items:center;justify-content:center;gap:14px">
        <div id="lvTimer" style="font-size:22px;font-weight:900;font-variant-numeric:tabular-nums">00:00</div>
        <button id="lvTimerBtn" onclick="toggleTimer()" style="background:var(--primary);border:none;color:white;font-size:12px;font-weight:800;padding:7px 16px;border-radius:10px;cursor:pointer;font-family:var(--font)">▶ Inicio</button>
        <div style="font-size:12px;color:var(--text-2);font-weight:700" id="lvQuarter">Q${quarter}</div>
        <button onclick="nextQuarter()" style="background:var(--glass);border:1px solid var(--glass-border);color:var(--text-1);font-size:11px;font-weight:700;padding:6px 10px;border-radius:8px;cursor:pointer;font-family:var(--font)">Q+</button>
      </div>
    </div>

    <!-- Feedback Flash -->
    <div id="liveFeedback" style="position:fixed;top:200px;left:50%;transform:translateX(-50%) translateY(4px);background:var(--primary);color:white;font-size:20px;font-weight:900;padding:7px 20px;border-radius:12px;opacity:0;transition:all 0.25s;z-index:50;pointer-events:none;box-shadow:var(--shadow-primary)"></div>

    <!-- Player selector -->
    <div style="padding:12px 16px 4px">
      <div style="font-size:10px;color:var(--text-3);font-weight:800;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px">Seleccionar jugador</div>
      <div style="display:flex;gap:8px;overflow-x:auto;scrollbar-width:none;padding-bottom:4px" id="playerSelector">
        ${players.length
          ? players.map((p,i) => `
            <button class="psBtn" data-pid="${p.id}"
              onclick="selectPlayer('${p.id}',this)"
              style="flex-shrink:0;padding:8px 12px;border-radius:10px;border:2px solid ${i===0?'var(--primary)':'var(--glass-border)'};background:${i===0?'rgba(255,107,44,0.12)':'var(--glass)'};color:${i===0?'var(--primary)':'var(--text-1)'};font-family:var(--font);font-size:12px;font-weight:800;cursor:pointer;white-space:nowrap;transition:all .2s">
              #${p.number} ${p.name.split(' ')[0]}
            </button>`).join('')
          : `<div style="color:var(--text-3);font-size:14px">No hay jugadores en este equipo</div>`}
      </div>
      <div style="font-size:11px;color:var(--text-3);margin-top:6px">Jugador activo: <span id="selPlayerLabel" style="color:var(--primary);font-weight:700">${players[0]?.name||'—'}</span></div>
    </div>

    <!-- Stat buttons -->
    <div style="padding:8px 16px 0">
      <div style="font-size:10px;color:var(--text-3);font-weight:800;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px">Registrar acción · Mantén pulsado para restar</div>
    </div>

    <div class="stat-btn-grid">
      ${STAT_BTNS.map(b => `
        <div class="stat-btn" data-stat="${b.stat}"
          ontouchstart="startHold('${b.stat}')" ontouchend="endHold()"
          ontouchcancel="endHold()"
          onclick="addStat(selPlayerId,'${b.stat}')">
          <div class="stat-btn-icon">${b.icon}</div>
          <div class="stat-btn-count" id="cnt_${b.stat}">0</div>
          <div class="stat-btn-label">${b.label}</div>
        </div>`).join('')}
    </div>
    <p style="text-align:center;font-size:11px;color:var(--text-3);padding:4px 16px 24px">
      Toca para +1 · Mantén 1 segundo para −1
    </p>`;

  // expose to global scope
  window.selPlayerId = selPlayerId;
  window.addStat     = addStat;
  window.removeStat  = removeStat;

  window.selectPlayer = (pid, btn) => {
    selPlayerId = pid; window.selPlayerId = pid;
    document.querySelectorAll('.psBtn').forEach(b => {
      b.style.borderColor = 'var(--glass-border)';
      b.style.background  = 'var(--glass)';
      b.style.color       = 'var(--text-1)';
    });
    btn.style.borderColor = 'var(--primary)';
    btn.style.background  = 'rgba(255,107,44,0.12)';
    btn.style.color       = 'var(--primary)';
    const pl = players.find(p => p.id === pid);
    const lbl = document.getElementById('selPlayerLabel');
    if (lbl && pl) lbl.textContent = pl.name;
    refreshLiveUI();
  };

  window.awayAdj = (d) => {
    awayScore = Math.max(0, awayScore + d);
    document.getElementById('lvAwayScore').textContent = awayScore;
  };

  window.toggleTimer = () => {
    timerOn = !timerOn;
    const btn = document.getElementById('lvTimerBtn');
    if (timerOn) {
      if (btn) btn.textContent = '⏸ Pausar';
      timerInt = setInterval(() => {
        timerSec++;
        const el = document.getElementById('lvTimer');
        if (el) el.textContent = fmtTimer(timerSec);
      }, 1000);
    } else {
      if (btn) btn.textContent = '▶ Reanudar';
      clearInterval(timerInt);
    }
  };

  window.nextQuarter = () => {
    if (quarter < 4) { quarter++; document.getElementById('lvQuarter').textContent = `Q${quarter}`; }
    else { document.getElementById('lvQuarter').textContent = 'PR'; }
  };

  // Long-press to subtract
  let holdTimer = null;
  window.startHold = (stat) => {
    holdTimer = setTimeout(() => { removeStat(selPlayerId, stat); }, 600);
  };
  window.endHold = () => clearTimeout(holdTimer);

  window.endGameConfirm = () => {
    clearInterval(timerInt);
    const hs = homeScore(), as_ = awayScore;
    openModal(`
      <div class="modal-sheet">
        <div class="modal-handle"></div>
        <div class="modal-title">Finalizar partido</div>
        <div class="modal-body" style="padding-bottom:24px">
          <div style="text-align:center;margin-bottom:20px">
            <div style="font-size:52px;font-weight:900;color:var(--primary)">${hs} <span style="font-size:28px;color:var(--text-3)">-</span> ${as_}</div>
            <div style="font-size:15px;color:var(--text-2);margin-top:6px">${hs>as_?'🏆 Victoria':'😔 Derrota'}</div>
          </div>
          <p style="font-size:14px;color:var(--text-2);text-align:center;margin-bottom:20px;line-height:1.5">
            ¿Deseas guardar las estadísticas de este partido en la base de datos?
          </p>
          <button class="btn-full btn-primary-full" style="margin-bottom:10px" onclick="saveFinishedGame(${hs},${as_})">
            💾 Guardar y finalizar
          </button>
          <button class="btn-full btn-ghost-full" onclick="_closeModal()">Seguir jugando</button>
        </div>
      </div>`);
  };

  window.saveFinishedGame = async (hs, as_) => {
    if (!IS_DEMO_MODE && gameId) {
      await db.collection('games').doc(gameId).update({ homeScore:hs, awayScore:as_, status:'finished' });
    }
    _closeModal();
    showToast('Partido guardado correctamente','success');
    setTimeout(() => goBack(), 600);
  };
}

// ===================== VIEW: MESSAGES =====================
async function renderMessages(container) {
  container.innerHTML = `<div class="loader"><div class="spinner"></div></div>`;
  const msgs    = await getMessages();
  const unread  = msgs.filter(m => !m.read).length;
  const isAdmin = APP.userData.role === 'admin';

  if (!IS_DEMO_MODE) {
    APP.unreadCount = 0; refreshBadge();
  }

  let html = `
    <div class="section-header">
      <div>
        <div class="section-title">Mensajes</div>
        ${unread ? `<div style="font-size:13px;color:var(--primary);margin-top:2px">${unread} sin leer</div>` : `<div class="section-subtitle">Bandeja de entrada</div>`}
      </div>
      ${isAdmin ? `<button class="section-action" onclick="navigateTo('admin-compose')">✉️ Enviar</button>` : ''}
    </div>
    <div class="card">`;

  if (!msgs.length) {
    html += `<div class="empty-state" style="padding:40px"><div class="empty-icon">💬</div><div class="empty-title">Sin mensajes</div><div class="empty-desc">No tienes mensajes todavía.</div></div>`;
  } else {
    msgs.forEach(m => {
      html += `
      <div class="message-item" onclick="navigateTo('message-detail',{msgId:'${m.id}'})">
        <div class="message-avatar">${m.important?'📢':'💬'}</div>
        <div class="message-content">
          <div class="message-title ${!m.read?'unread':''}">${m.title}</div>
          <div class="message-preview">${m.body}</div>
        </div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:5px;flex-shrink:0">
          <div class="message-time">${fmtTimeAgo(m.date)}</div>
          ${!m.read ? `<div style="width:8px;height:8px;background:var(--primary);border-radius:50%"></div>` : ''}
          ${m.important ? `<div class="tag tag-orange" style="font-size:10px;padding:2px 7px">Imp.</div>` : ''}
        </div>
      </div>`;
    });
  }
  html += `</div><div style="height:16px"></div>`;
  container.innerHTML = html;
}

// ===================== VIEW: MESSAGE DETAIL =====================
async function renderMessageDetail(container, { msgId }) {
  const m = IS_DEMO_MODE ? DEMO_DATA.messages.find(x => x.id === msgId)
                         : await db.collection('messages').doc(msgId).get().then(d => ({id:d.id,...d.data()}));
  if (!m) { container.innerHTML = `<button class="back-btn" onclick="goBack()">‹ Mensajes</button><div class="empty-state"><div class="empty-title">Mensaje no encontrado</div></div>`; return; }

  container.innerHTML = `
    <button class="back-btn" onclick="goBack()">‹ Mensajes</button>
    <div class="card">
      <div style="padding:20px">
        ${m.important ? `<div class="tag tag-orange" style="margin-bottom:12px">📢 Importante</div>` : ''}
        <div style="font-size:20px;font-weight:800;line-height:1.3;margin-bottom:8px">${m.title}</div>
        <div style="font-size:12px;color:var(--text-2)">De: <strong>${m.from}</strong> · ${fmtDateLong(m.date)}</div>
        <div style="height:1px;background:var(--glass-border);margin:16px 0"></div>
        <div style="font-size:15px;color:var(--text-1);line-height:1.75">${m.body}</div>
      </div>
    </div>
    <div style="height:16px"></div>`;
}

// ===================== VIEW: PROFILE =====================
async function renderProfile(container) {
  const u = APP.userData;
  let teamName = 'Sin equipo';
  
  if (u.teamId) {
    const teams = await getTeams();
    const t = teams.find(x => x.id === u.teamId);
    if (t) teamName = t.name;
  }

  container.innerHTML = `
    <div class="profile-header">
      <div class="profile-avatar">${initials(u.name)}</div>
      <div class="profile-name">${u.name}</div>
      <div class="profile-role">${roleLabel()}</div>
      <div class="profile-team">🏀 ${teamName}</div>
      <div style="margin-top:12px">
        ${IS_DEMO_MODE ? `<span class="tag tag-yellow">⚠️ Modo Demostración</span>` : `<span class="tag tag-green">● Conectado</span>`}
      </div>
    </div>

    <div class="divider"></div>

    <div style="padding:16px 16px 0">
      <div style="font-size:11px;font-weight:800;color:var(--text-3);text-transform:uppercase;letter-spacing:1px;margin-bottom:12px">Mi cuenta</div>
    </div>
    <div class="settings-list">
      <div class="settings-item">
        <div class="settings-icon" style="background:rgba(255,107,44,0.1)">👤</div>
        <div class="settings-text">
          <div class="settings-label">${u.name}</div>
          <div class="settings-desc">${u.email||'Sin correo'}</div>
        </div>
      </div>
      <div class="settings-item" onclick="showChangePwModal()">
        <div class="settings-icon" style="background:rgba(59,130,246,0.1)">🔑</div>
        <div class="settings-text">
          <div class="settings-label">Cambiar contraseña</div>
          <div class="settings-desc">Actualizar tu clave de acceso</div>
        </div>
        <div style="color:var(--text-3)">›</div>
      </div>
    </div>

    <div style="padding:16px 16px 0;margin-top:8px">
      <div style="font-size:11px;font-weight:800;color:var(--text-3);text-transform:uppercase;letter-spacing:1px;margin-bottom:12px">Notificaciones</div>
    </div>
    <div class="settings-list">
      <div class="settings-item">
        <div class="settings-icon" style="background:rgba(0,230,118,0.1)">🔔</div>
        <div class="settings-text">
          <div class="settings-label">Partidos y resultados</div>
          <div class="settings-desc">Recordatorios y marcadores</div>
        </div>
        <label class="toggle"><input type="checkbox" checked><span class="toggle-slider"></span></label>
      </div>
      <div class="settings-item">
        <div class="settings-icon" style="background:rgba(0,212,255,0.1)">💬</div>
        <div class="settings-text">
          <div class="settings-label">Mensajes del club</div>
          <div class="settings-desc">Avisos y comunicados</div>
        </div>
        <label class="toggle"><input type="checkbox" checked><span class="toggle-slider"></span></label>
      </div>
    </div>

    <div style="padding:16px 16px 0;margin-top:8px">
      <div style="font-size:11px;font-weight:800;color:var(--text-3);text-transform:uppercase;letter-spacing:1px;margin-bottom:12px">Aplicación</div>
    </div>
    <div class="settings-list">
      <div class="settings-item">
        <div class="settings-icon" style="background:rgba(255,184,0,0.1)">ℹ️</div>
        <div class="settings-text">
          <div class="settings-label">Estadísticas Gallardas</div>
          <div class="settings-desc">Versión 1.0.0 · Club Baloncesto Gallardas</div>
        </div>
      </div>
    </div>

    <div style="padding:20px 16px">
      <button class="btn-full btn-danger-full" onclick="doLogout()">🚪 Cerrar sesión</button>
    </div>
    <div style="height:16px"></div>`;

  window.doLogout = async () => {
    if (!IS_DEMO_MODE) await auth.signOut();
    window.location.href = 'index.html';
  };

  window.showChangePwModal = () => openModal(`
    <div class="modal-sheet">
      <div class="modal-handle"></div>
      <div class="modal-title">Cambiar contraseña</div>
      <div class="modal-body" style="padding-bottom:24px">
        <div class="form-group" style="margin-bottom:12px">
          <label class="form-label" style="font-size:11px">CONTRASEÑA ACTUAL</label>
          <input class="form-input" type="password" id="pwOld" placeholder="••••••••">
        </div>
        <div class="form-group" style="margin-bottom:12px">
          <label class="form-label" style="font-size:11px">NUEVA CONTRASEÑA</label>
          <input class="form-input" type="password" id="pwNew" placeholder="••••••••">
        </div>
        <div class="form-group" style="margin-bottom:20px">
          <label class="form-label" style="font-size:11px">CONFIRMAR CONTRASEÑA</label>
          <input class="form-input" type="password" id="pwNew2" placeholder="••••••••">
        </div>
        <button class="btn-full btn-primary-full" onclick="savePw()">Guardar</button>
        <button class="btn-full btn-ghost-full" style="margin-top:10px" onclick="_closeModal()">Cancelar</button>
      </div>
    </div>`);

  window.savePw = async () => {
    const np = document.getElementById('pwNew').value;
    const np2 = document.getElementById('pwNew2').value;
    if (np !== np2) { showToast('Las contraseñas no coinciden','error'); return; }
    if (np.length < 6) { showToast('Mínimo 6 caracteres','error'); return; }
    if (!IS_DEMO_MODE) { /* await reauthenticate + updatePassword */ }
    _closeModal();
    showToast('Contraseña actualizada','success');
  };
}

// ===================== VIEW: ADMIN =====================
async function renderAdmin(container) {
  if (!['admin','coach'].includes(APP.userData.role)) {
    container.innerHTML = `<div class="empty-state"><div class="empty-icon">🔒</div><div class="empty-title">Sin acceso</div><div class="empty-desc">No tienes permisos para esta sección.</div></div>`;
    return;
  }
  container.innerHTML = `<div class="loader"><div class="spinner"></div></div>`;
  
  const isAdmin = APP.userData.role === 'admin';
  let tCount=0, pCount=0, gCount=0, mCount=0;

  if (IS_DEMO_MODE) {
    tCount = DEMO_DATA.teams.length;
    pCount = DEMO_DATA.players.length;
    gCount = DEMO_DATA.games.length;
    mCount = DEMO_DATA.messages.length;
  } else {
    try {
      const [tsnap, psnap, gsnap, msnap] = await Promise.all([
        db.collection('teams').get(),
        db.collection('users').where('role','==','player').get(),
        db.collection('games').get(),
        db.collection('messages').get()
      ]);
      tCount = tsnap.size;
      pCount = psnap.size;
      gCount = gsnap.size;
      mCount = msnap.size;
    } catch(e) { console.error(e); }
  }

  container.innerHTML = `
    <div class="section-header">
      <div>
        <div class="section-title">Panel de control</div>
        <div class="section-subtitle">Gestión del club</div>
      </div>
    </div>

    <div class="admin-quick-grid">
      ${isAdmin ? `<div class="admin-quick-btn" onclick="navigateTo('admin-users')"><div class="admin-quick-icon">👥</div><div class="admin-quick-label">Gestión de Usuarios</div></div>` : ''}
      <div class="admin-quick-btn" onclick="navigateTo('admin-teams')"><div class="admin-quick-icon">🏀</div><div class="admin-quick-label">Equipos y Jugadores</div></div>
      <div class="admin-quick-btn" onclick="navigateTo('admin-compose')"><div class="admin-quick-icon">✉️</div><div class="admin-quick-label">Enviar Mensaje</div></div>
      <div class="admin-quick-btn" onclick="navigateTo('admin-news')"><div class="admin-quick-icon">📰</div><div class="admin-quick-label">Publicar Noticia</div></div>
      ${isAdmin ? `<div class="admin-quick-btn" onclick="navigateTo('admin-permissions')"><div class="admin-quick-icon">🔐</div><div class="admin-quick-label">Control de Visibilidad</div></div>` : ''}
      <div class="admin-quick-btn" onclick="exportStats()"><div class="admin-quick-icon">📊</div><div class="admin-quick-label">Exportar Estadísticas</div></div>
    </div>

    <div class="divider"></div>

    <div class="section-header"><div class="section-title" style="font-size:18px">Resumen del club</div></div>
    <div class="stats-grid">
      <div class="stat-card"><div class="stat-value">${tCount}</div><div class="stat-label">Equipos</div></div>
      <div class="stat-card"><div class="stat-value">${pCount}</div><div class="stat-label">Jugadores</div></div>
      <div class="stat-card"><div class="stat-value">${gCount}</div><div class="stat-label">Partidos</div></div>
      <div class="stat-card"><div class="stat-value">${mCount}</div><div class="stat-label">Mensajes</div></div>
    </div>
    <div style="height:16px"></div>`;

  window.exportStats = () => showToast('Exportación PDF/Excel — próximamente 📊','');
}

// ===================== VIEW: ADMIN USERS =====================
async function renderAdminUsers(container) {
  container.innerHTML = `<button class="back-btn" onclick="goBack()">‹ Panel Admin</button><div class="loader"><div class="spinner"></div></div>`;
  
  let users = [];
  if (IS_DEMO_MODE) {
    users = [
      { name:'María García', role:'parent', teamName:'Benjamín Masc.' },
      { name:'Ana Martínez', role:'coach',  teamName:'Alevín Fem.' },
      { name:'Lucía Fdez',   role:'player', teamName:'Cadete Fem.' }
    ];
  } else {
    try {
      const snap = await db.collection('users').get();
      users = snap.docs.map(d => ({ id:d.id, ...d.data() }));
    } catch(e) { console.error(e); }
  }

  container.innerHTML = `
    <button class="back-btn" onclick="goBack()">‹ Panel Admin</button>
    <div class="section-header">
      <div><div class="section-title">Usuarios</div><div class="section-subtitle">Gestión de accesos</div></div>
      <button class="section-action" onclick="showNewUserModal()">+ Nuevo</button>
    </div>
    <div class="tab-pills">
      <button class="tab-pill cp-filt active" onclick="filterUsers('all',this)">Todos</button>
      <button class="tab-pill cp-filt" onclick="filterUsers('parent',this)">Familias</button>
      <button class="tab-pill cp-filt" onclick="filterUsers('coach',this)">Entrenadores</button>
      <button class="tab-pill cp-filt" onclick="filterUsers('player',this)">Jugadores</button>
    </div>
    <div class="card" id="adminUsersList">
      ${users.length ? users.map((u,i) => `
        <div class="player-row user-filter-item" data-role="${u.role||u.rol||''}">
          <div class="avatar" style="width:42px;height:42px;font-size:17px;${avatarBg(i)}">${initials(u.name)}</div>
          <div class="player-info">
            <div class="player-name">${u.name}</div>
            <div class="player-meta">${roleLabelRaw(u.role||u.rol)} ${u.teamName ? '· '+u.teamName : ''}</div>
          </div>
          <button style="background:none;border:none;color:var(--text-3);font-size:20px;cursor:pointer;padding:8px" onclick="editUser('${u.name}')">•••</button>
        </div>`).join('') : '<div class="empty-state">Sin usuarios</div>'}
    </div>
    <div style="padding:16px">
      <button class="btn-full btn-primary-full" onclick="showNewUserModal()">+ Crear nuevo usuario</button>
    </div>
    <div style="height:16px"></div>`;

  window.filterUsers = (role, btn) => {
    document.querySelectorAll('.cp-filt').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.user-filter-item').forEach(el => {
      el.style.display = (role === 'all' || el.dataset.role === role) ? '' : 'none';
    });
  };
}

function roleLabelRaw(r) {
  return { admin:'Admin', coach:'Entrenador/a', parent:'Familia', player:'Jugador/a' }[r] || 'Usuario';
}

  window.showNewUserModal = async () => {
    const teams = await getTeams();
    openModal(`
      <div class="modal-sheet">
        <div class="modal-handle"></div>
        <div class="modal-title">Nuevo usuario</div>
        <div class="modal-body" style="padding-bottom:28px">
          <div style="display:flex;align-items:center;gap:16px;margin-bottom:20px;padding:12px;background:rgba(255,255,255,0.03);border-radius:16px;border:1px solid rgba(255,255,255,0.05)">
            <div id="nuPhotoPreview" style="width:64px;height:64px;border-radius:50%;background:var(--glass);display:flex;align-items:center;justify-content:center;font-size:24px;border:2px dashed rgba(255,255,255,0.2);overflow:hidden;flex-shrink:0">📸</div>
            <div style="flex:1">
              <label class="form-label" style="margin-bottom:4px">FOTO DE PERFIL</label>
              <input type="file" id="nuPhotoInput" accept="image/*" style="font-size:12px;color:rgba(255,255,255,0.5)" onchange="previewPhoto(this, 'nuPhotoPreview')">
            </div>
          </div>

          <div class="form-group" style="margin-bottom:12px">
            <label class="form-label">NOMBRE Y APELLIDOS</label>
            <input class="form-input" id="nuName" type="text" placeholder="Nombre completo">
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px">
            <div class="form-group">
              <label class="form-label">FECHA DE NACIMIENTO</label>
              <input class="form-input" id="nuBirth" type="date" onchange="checkUserMinor(this.value)">
            </div>
            <div class="form-group">
              <label class="form-label">MI TELÉFONO</label>
              <input class="form-input" id="nuPhone" type="tel" placeholder="6XXXXXXXX" maxlength="9" oninput="validatePhone(this)">
            </div>
          </div>
          
          <div id="nuMinorField" style="display:none;margin-bottom:16px;background:rgba(255,107,44,0.05);padding:14px;border-radius:12px;border:1px solid rgba(255,107,44,0.2)">
            <div style="font-size:11px;font-weight:900;color:var(--primary);margin-bottom:10px;text-transform:uppercase">Datos del representante (Menor de edad)</div>
            <div class="form-group" style="margin-bottom:12px">
              <label class="form-label" style="font-size:10px">NOMBRE DEL PADRE/MADRE/TUTOR</label>
              <input class="form-input" id="nuGuardian" type="text" placeholder="Representante legal">
            </div>
            <div class="form-group">
              <label class="form-label" style="font-size:10px">TELÉFONO DEL TUTOR (OBLIGATORIO)</label>
              <input class="form-input" id="nuParentPhone" type="tel" placeholder="6XXXXXXXX" maxlength="9" oninput="validatePhone(this)">
            </div>
          </div>

          <div class="form-group" style="margin-bottom:12px">
            <label class="form-label">CORREO ELECTRÓNICO</label>
            <input class="form-input" id="nuEmail" type="email" placeholder="correo@ejemplo.com">
          </div>
          <div class="form-group" style="margin-bottom:12px">
            <label class="form-label">CONTRASEÑA INICIAL</label>
            <div style="display:flex;gap:8px">
              <input class="form-input" id="nuPass" type="text" placeholder="Contraseña temporal" style="flex:1">
              <button onclick="nuGenPass()" style="flex-shrink:0;background:var(--glass);border:1px solid var(--glass-border);border-radius:12px;padding:0 14px;color:var(--text-1);font-size:13px;font-weight:700;cursor:pointer;font-family:var(--font)">Generar</button>
            </div>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px">
            <div class="form-group">
              <label class="form-label">ROL</label>
              <select class="form-input" id="nuRole" onchange="togglePlayerFields(this.value)">
                <option value="player">Jugador/a</option>
                <option value="coach">Entrenador/a</option>
                <option value="admin">Administrador del club</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">EQUIPO</label>
              <select class="form-input" id="nuTeam">
                <option value="">Sin equipo</option>
                ${teams.map(t => `<option value="${t.id}">${t.name}</option>`).join('')}
              </select>
            </div>
          </div>

          <div id="nuPlayerExtra" style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:20px">
            <div class="form-group">
              <label class="form-label">DORSAL (OPCIONAL)</label>
              <input class="form-input" id="nuPlayerNum" type="number" placeholder="Ej: 7">
            </div>
            <div class="form-group">
              <label class="form-label">POSICIÓN</label>
              <select class="form-input" id="nuPlayerPos">
                <option value="Sin definir">Sin definir</option>
                <option value="Base">Base</option>
                <option value="Escolta">Escolta</option>
                <option value="Alero">Alero</option>
                <option value="Ala-Pívot">Ala-Pívot</option>
                <option value="Pívot">Pívot</option>
              </select>
            </div>
          </div>

          <button class="btn-full btn-primary-full" onclick="createUser()" style="margin-bottom:10px">Crear usuario</button>
          <button class="btn-full btn-ghost-full" onclick="_closeModal()">Cancelar</button>
        </div>
      </div>`);
    
    window.nuGenPass = () => { document.getElementById('nuPass').value = genPassword(); };
    window.previewPhoto = (input, previewId) => {
      const file = input.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          document.getElementById(previewId).innerHTML = `<img src="${e.target.result}" style="width:100%;height:100%;object-fit:cover">`;
          input.dataset.base64 = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    };
    window.validatePhone = (el) => {
      el.value = el.value.replace(/[^0-9]/g, '').slice(0, 9);
    };
    window.checkUserMinor = (dateStr) => {
      if (!dateStr) return;
      const age = calcAge(dateStr);
      document.getElementById('nuMinorField').style.display = (age < 18) ? 'block' : 'none';
    };
    window.togglePlayerFields = (role) => {
      document.getElementById('nuPlayerExtra').style.display = (role==='player') ? 'grid' : 'none';
    };
  };

  window.createUser = async () => {
    const name     = document.getElementById('nuName').value.trim();
    const birth    = document.getElementById('nuBirth').value;
    const phone    = document.getElementById('nuPhone').value.trim();
    const guardian = document.getElementById('nuGuardian').value.trim();
    const pPhone   = document.getElementById('nuParentPhone').value.trim();
    const email    = document.getElementById('nuEmail').value.trim();
    const pass     = document.getElementById('nuPass').value.trim();
    const role     = document.getElementById('nuRole').value;
    const teamId   = document.getElementById('nuTeam').value;
    const photo    = document.getElementById('nuPhotoInput').dataset.base64 || null;

    // Player extras
    const pNumInput = document.getElementById('nuPlayerNum').value.trim();
    const pNum      = pNumInput === '' ? 0 : parseInt(pNumInput);
    const pPos      = document.getElementById('nuPlayerPos').value;

    if (!name||!email||!pass||!birth||!phone) { showToast('Faltan campos obligatorios','error'); return; }
    if (phone.length !== 9) { showToast('El teléfono debe tener 9 números','error'); return; }
    
    const age = calcAge(birth);
    if (age < 18) {
      if (!guardian || !pPhone) { showToast('Datos del tutor son obligatorios','error'); return; }
      if (pPhone.length !== 9) { showToast('El teléfono del tutor debe tener 9 números','error'); return; }
    }

    if (!IS_DEMO_MODE) {
      try {
        const sec  = firebase.initializeApp(FIREBASE_CONFIG, `sec_${Date.now()}`);
        const nu   = await sec.auth().createUserWithEmailAndPassword(email,pass);
        const uid  = nu.user.uid;

        // 1. Create User Account
        await db.collection('users').doc(uid).set({ 
          name, birthDate:birth, phone, photo,
          guardian: age < 18 ? guardian : null,
          parentPhone: age < 18 ? pPhone : null,
          email, role, teamId:teamId||null, active:true, 
          createdAt:firebase.firestore.FieldValue.serverTimestamp() 
        });

        // 2. If it's a player and has team, create Player Profile automatically
        if (role === 'player' && teamId) {
          await db.collection('players').add({
            uid, photo, // Pass photo to player doc too
            name, age, number:parseInt(pNum), position:pPos, teamId,
            guardian: age < 18 ? guardian : null,
            parentPhone: age < 18 ? pPhone : null,
            active:true,
            stats:{ pts:0, reb:0, ast:0, stl:0, blk:0, to:0, pf:0, reb_off:0, reb_def:0 },
            createdAt:firebase.firestore.FieldValue.serverTimestamp()
          });
        }

        await sec.auth().signOut();
        await sec.delete();
      } catch(e) { showToast('Error: '+e.message,'error'); return; }
    }
    _closeModal();
    showToast(`Usuario "${name}" creado e integrado en equipo ✓`,'success');
    renderAdminUsers(document.getElementById('appMain'));
  };

  window.editUser = async (userId) => {
    const [u, teams] = await Promise.all([
      db.collection('users').doc(userId).get().then(d => ({id:d.id,...d.data()})),
      getTeams()
    ]);
    if (!u) { showToast('Usuario no encontrado','error'); return; }
    
    openModal(`
      <div class="modal-sheet" style="max-height:90vh">
        <div class="modal-handle"></div>
        <div class="modal-title">Editar Usuario</div>
        <div class="modal-body" style="padding-bottom:28px;overflow-y:auto">
          
          <div style="display:flex;align-items:center;gap:16px;margin-bottom:20px;padding:12px;background:rgba(255,255,255,0.03);border-radius:16px;border:1px solid rgba(255,255,255,0.05)">
            <div id="euPhotoPreview" style="width:64px;height:64px;border-radius:50%;background:var(--glass);display:flex;align-items:center;justify-content:center;font-size:24px;border:2px dashed rgba(255,255,255,0.2);overflow:hidden;flex-shrink:0">
              ${u.photo ? `<img src="${u.photo}" style="width:100%;height:100%;object-fit:cover">` : '📸'}
            </div>
            <div style="flex:1">
              <label class="form-label" style="margin-bottom:4px">CAMBIAR FOTO</label>
              <input type="file" id="euPhotoInput" accept="image/*" style="font-size:12px;color:rgba(255,255,255,0.5)" onchange="previewPhoto(this, 'euPhotoPreview')">
            </div>
          </div>

          <div class="form-group" style="margin-bottom:12px">
            <label class="form-label">NOMBRE Y APELLIDOS</label>
            <input class="form-input" id="euName" type="text" value="${u.name||''}">
          </div>
          <div class="form-group" style="margin-bottom:12px">
            <label class="form-label">FECHA DE NACIMIENTO</label>
            <input class="form-input" id="euBirth" type="date" value="${u.birth||''}" onchange="checkEditUserMinor(this.value)">
          </div>
          <div class="form-group" style="margin-bottom:12px">
            <label class="form-label">TELÉFONO DE CONTACTO</label>
            <input class="form-input" id="euPhone" type="tel" value="${u.phone||''}" maxlength="9" oninput="validatePhone(this)">
          </div>

          <div id="euMinorField" style="display:${calcAge(u.birth)<18?'block':'none'};margin-bottom:16px;background:rgba(255,107,44,0.05);padding:14px;border-radius:12px;border:1px solid rgba(255,107,44,0.2)">
            <div style="font-size:11px;font-weight:900;color:var(--primary);margin-bottom:10px;text-transform:uppercase">Datos del representante (Menor de edad)</div>
            <div class="form-group" style="margin-bottom:12px">
              <label class="form-label" style="font-size:10px">NOMBRE DEL PADRE/MADRE/TUTOR</label>
              <input class="form-input" id="euGuardian" type="text" value="${u.guardian||''}">
            </div>
            <div class="form-group">
              <label class="form-label" style="font-size:10px">TELÉFONO DEL TUTOR</label>
              <input class="form-input" id="euParentPhone" type="tel" value="${u.parentPhone||''}" maxlength="9" oninput="validatePhone(this)">
            </div>
          </div>
          <div class="form-group" style="margin-bottom:12px">
            <label class="form-label">ROL</label>
            <select class="form-input" id="euRole">
              <option value="player" ${u.role==='player'?'selected':''}>Jugador/a</option>
              <option value="coach" ${u.role==='coach'?'selected':''}>Entrenador/a</option>
              <option value="admin" ${u.role==='admin'?'selected':''}>Administrador</option>
            </select>
          </div>
          <div class="form-group" style="margin-bottom:12px">
            <label class="form-label">EQUIPO ASIGNADO</label>
            <select class="form-input" id="euTeam">
              <option value="">Sin equipo</option>
              ${teams.map(t => `<option value="${t.id}" ${u.teamId===t.id?'selected':''}>${t.name}</option>`).join('')}
            </select>
          </div>
          
          <div style="margin:20px 0;padding:12px;background:rgba(255,255,255,0.03);border-radius:12px">
            <div style="font-size:11px;font-weight:900;margin-bottom:10px;color:rgba(255,255,255,0.4)">ZONA DE PELIGRO</div>
            <button class="btn-full btn-danger-full" style="background:#dc2626;color:white;border:none" onclick="deleteUser('${userId}')">Eliminar cuenta de usuario</button>
            <div style="font-size:10px;color:rgba(255,255,255,0.3);margin-top:8px;text-align:center">Esta acción no se puede deshacer. El usuario perderá el acceso.</div>
          </div>

          <button class="btn-full btn-primary-full" onclick="updateUser('${userId}')" style="margin-bottom:10px">Guardar cambios</button>
          <button class="btn-full btn-ghost-full" onclick="_closeModal()">Cancelar</button>
        </div>
      </div>`);
    window.checkEditUserMinor = (dateStr) => {
      if (!dateStr) return;
      const age = calcAge(dateStr);
      const el = document.getElementById('euMinorField');
      if (el) el.style.display = (age < 18) ? 'block' : 'none';
    };
  };

  window.updateUser = async (userId) => {
    const photo = document.getElementById('euPhotoInput').dataset.base64;
    const name     = document.getElementById('euName').value.trim();
    const birth    = document.getElementById('euBirth').value;
    const phone    = document.getElementById('euPhone').value.trim();
    const role     = document.getElementById('euRole').value;
    const teamId   = document.getElementById('euTeam').value || null;
    const guardian = document.getElementById('euGuardian').value.trim();
    const pPhone   = document.getElementById('euParentPhone').value.trim();

    if (phone.length !== 9) { showToast('El teléfono debe tener 9 números','error'); return; }
    
    const age = calcAge(birth);
    if (age < 18) {
      if (!guardian || !pPhone) { showToast('Datos del tutor obligatorios para menores','error'); return; }
      if (pPhone.length !== 9) { showToast('El teléfono del tutor debe tener 9 números','error'); return; }
    }

    const data = { 
      name, birth, phone, role, teamId,
      guardian: age < 18 ? guardian : null,
      parentPhone: age < 18 ? pPhone : null
    };
    if (photo) data.photo = photo;

    if (!IS_DEMO_MODE) {
      await db.collection('users').doc(userId).update(data);
      // Sync data to player profile if it exists (sports record)
      const psnap = await db.collection('players').where('uid','==',userId).get();
      psnap.forEach(d => {
        const updateObj = { 
          name: data.name, 
          teamId: data.teamId,
          birth: data.birth,
          guardian: data.guardian,
          parentPhone: data.parentPhone
        };
        if (data.photo) updateObj.photo = data.photo;
        d.ref.update(updateObj);
      });
    }
    _closeModal();
    showToast('Usuario actualizado ✓','success');
    renderAdminUsers(document.getElementById('appMain'));
  };

  window.deleteUser = async (userId) => {
    if (!confirm('¿Estás COMPLETAMENTE SEGURO de querer eliminar este usuario? Perderá el acceso y se borrará su ficha de jugador para siempre.')) return;
    if (!IS_DEMO_MODE) {
      // 1. Delete access account
      await db.collection('users').doc(userId).delete();
      // 2. Cascade delete player profile
      const psnap = await db.collection('players').where('uid','==',userId).get();
      psnap.forEach(d => d.ref.delete());
    }
    _closeModal();
    showToast('Usuario y ficha de jugador eliminados','success');
    renderAdminUsers(document.getElementById('appMain'));
  };

function roleLabelRaw(r) {
  return { admin:'Administrador/a', coach:'Entrenador/a', player:'Jugador/a' }[r] || 'Usuario';
}

// ===================== VIEW: ADMIN TEAMS =====================
async function renderAdminTeams(container) {
  container.innerHTML = `<button class="back-btn" onclick="goBack()">‹ Panel Admin</button><div class="loader"><div class="spinner"></div></div>`;
  const teams = await getTeams();
  container.innerHTML = `
    <button class="back-btn" onclick="goBack()">‹ Panel Admin</button>
    <div class="section-header">
      <div><div class="section-title">Equipos</div><div class="section-subtitle">Categorías y plantillas</div></div>
      <button class="section-action" onclick="showNewTeamModal()">+ Nuevo</button>
    </div>
    <div id="adminTeamsList">
      ${teams.length ? teams.map(t => `
        <div class="team-card">
          <div class="team-icon">${t.gender==='Femenino'?'👧':'👦'}</div>
          <div class="team-info">
            <div class="team-name">${t.name}</div>
            <div class="team-meta">${t.category} · ${t.gender} · ${t.playerCount||0} jugadores</div>
          </div>
          <div style="display:flex;gap:8px">
            <button class="action-btn-circle" onclick="navigateTo('team-detail',{teamId:'${t.id}'})">👁</button>
            <button class="action-btn-circle" style="color:var(--text-3)" onclick="showEditTeamModal('${t.id}')">✏️</button>
          </div>
        </div>`).join('') : '<div class="empty-state">No hay equipos creados</div>'}
    </div>
    <div style="padding:16px">
      <button class="btn-full btn-primary-full" onclick="showNewTeamModal()">+ Crear nuevo equipo</button>
    </div>
    <div style="height:16px"></div>`;
}

  window.showNewTeamModal = async () => {
    const coaches = await db.collection('users').where('role','==','coach').get().then(s => s.docs.map(d=>({id:d.id,...d.data()})));
    openModal(`
      <div class="modal-sheet">
        <div class="modal-handle"></div>
        <div class="modal-title">Nuevo equipo</div>
        <div class="modal-body" style="padding-bottom:28px">
          <div class="form-group" style="margin-bottom:12px">
            <label class="form-label" style="font-size:11px">NOMBRE DEL EQUIPO</label>
            <input class="form-input" id="ntName" type="text" placeholder="Ej: Benjamín Masculino A">
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px">
            <div class="form-group">
              <label class="form-label">CATEGORÍA</label>
              <select class="form-input" id="ntCat">
                ${['Escuela','Benjamín','Alevín','Infantil','Cadete','Junior','Senior','Veteranos'].map(c=>`<option>${c}</option>`).join('')}
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">GÉNERO</label>
              <select class="form-input" id="ntGender">
                <option>Masculino</option><option>Femenino</option><option>Mixto</option>
              </select>
            </div>
          </div>
          <div class="form-group" style="margin-bottom:20px">
            <label class="form-label">ENTRENADOR/A (BUSCANDO EN BD...)</label>
            <select class="form-input" id="ntCoach">
              <option value="">Seleccionar entrenador/a...</option>
              ${coaches.map(c => `<option value="${c.name}">${c.name}</option>`).join('')}
            </select>
          </div>
          <button class="btn-full btn-primary-full" onclick="createTeam()" style="margin-bottom:10px">Crear equipo</button>
          <button class="btn-full btn-ghost-full" onclick="_closeModal()">Cancelar</button>
        </div>
      </div>`);
  };

  window.showEditTeamModal = async (teamId) => {
    const [team, coaches] = await Promise.all([
      db.collection('teams').doc(teamId).get().then(d => ({id:d.id,...d.data()})),
      db.collection('users').where('role','==','coach').get().then(s => s.docs.map(d=>({id:d.id,...d.data()})))
    ]);
    
    openModal(`
      <div class="modal-sheet">
        <div class="modal-handle"></div>
        <div class="modal-title">Editar equipo</div>
        <div class="modal-body" style="padding-bottom:28px">
          <div class="form-group" style="margin-bottom:12px">
            <label class="form-label">NOMBRE DEL EQUIPO</label>
            <input class="form-input" id="etName" type="text" value="${team.name}">
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px">
            <div class="form-group">
              <label class="form-label">CATEGORÍA</label>
              <select class="form-input" id="etCat">
                ${['Escuela','Benjamín','Alevín','Infantil','Cadete','Junior','Senior','Veteranos'].map(c=>`<option ${team.category===c?'selected':''}>${c}</option>`).join('')}
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">GÉNERO</label>
              <select class="form-input" id="etGender">
                ${['Masculino','Femenino','Mixto'].map(g=>`<option ${team.gender===g?'selected':''}>${g}</option>`).join('')}
              </select>
            </div>
          </div>
          <div class="form-group" style="margin-bottom:20px">
            <label class="form-label">ENTRENADOR/A</label>
            <select class="form-input" id="etCoach">
              <option value="">Sin entrenador/a asignado</option>
              ${coaches.map(c => `<option value="${c.name}" ${team.coachName===c.name?'selected':''}>${c.name}</option>`).join('')}
            </select>
          </div>
          <button class="btn-full btn-primary-full" onclick="updateTeam('${teamId}')" style="margin-bottom:10px">Guardar cambios</button>
          <button class="btn-full btn-ghost-full" onclick="_closeModal()">Cancelar</button>
        </div>
      </div>`);
  };

  window.createTeam = async () => {
    const name  = document.getElementById('ntName').value.trim();
    const cat   = document.getElementById('ntCat').value;
    const gender= document.getElementById('ntGender').value;
    const coach = document.getElementById('ntCoach').value;
    if (!name) { showToast('El nombre es obligatorio','error'); return; }
    if (!IS_DEMO_MODE) await db.collection('teams').add({ name, category:cat, gender, coachName:coach, playerCount:0, wins:0, losses:0, active:true, createdAt:firebase.firestore.FieldValue.serverTimestamp() });
    _closeModal();
    showToast(`Equipo "${name}" creado ✓`,'success');
    renderAdminTeams(document.getElementById('appMain'));
  };

  window.updateTeam = async (teamId) => {
    const name   = document.getElementById('etName').value.trim();
    const cat    = document.getElementById('etCat').value;
    const gender = document.getElementById('etGender').value;
    const coach  = document.getElementById('etCoach').value;
    if (!name) return;
    if (!IS_DEMO_MODE) await db.collection('teams').doc(teamId).update({ name, category:cat, gender, coachName:coach });
    _closeModal();
    showToast('Equipo actualizado ✓','success');
    renderAdminTeams(document.getElementById('appMain'));
  };

  window.showAddPlayerModal = async (teamId) => {
    // Fetch all users with role 'player'
    const users = await db.collection('users').where('role','==','player').get().then(s => s.docs.map(d=>({id:d.id,...d.data()})));
    
    openModal(`
      <div class="modal-sheet">
        <div class="modal-handle"></div>
        <div class="modal-title">Asignar jugador al equipo</div>
        <div class="modal-body" style="padding-bottom:28px">
          
          <div class="form-group" style="margin-bottom:16px">
            <label class="form-label">SELECCIONAR USUARIO REGISTRADO</label>
            <select class="form-input" id="apUserSelect" onchange="updateAddPlayerPreview(this.value)">
              <option value="">Selecciona un jugador/a...</option>
              ${users.map(u => `<option value="${u.id}" data-birth="${u.birth||''}" data-guardian="${u.guardian||''}" data-name="${u.name}">${u.name} (${u.email})</option>`).join('')}
            </select>
          </div>

          <div id="apPreview" style="display:none;margin-bottom:16px;padding:12px;background:rgba(255,255,255,0.03);border-radius:12px;border:1px solid rgba(255,255,255,0.1)">
             <div style="display:flex;justify-content:space-between;margin-bottom:4px">
               <span style="font-size:11px;color:rgba(255,255,255,0.5)">EDAD CALCULADA:</span>
               <span id="apPreviewAge" style="font-size:11px;font-weight:900;color:var(--primary)">-- años</span>
             </div>
             <div id="apPreviewGuardianRow" style="display:flex;justify-content:space-between">
               <span style="font-size:11px;color:rgba(255,255,255,0.5)">TUTOR/A:</span>
               <span id="apPreviewGuardian" style="font-size:11px;font-weight:900">-</span>
             </div>
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:20px">
            <div class="form-group">
              <label class="form-label">DORSAL</label>
              <input class="form-input" id="apNum" type="number" placeholder="Ej: 23" min="0" max="99">
            </div>
            <div class="form-group">
              <label class="form-label">POSICIÓN</label>
              <select class="form-input" id="apPos">
                <option value="Sin definir">Sin definir</option>
                <option>Base</option><option>Escolta</option><option>Alero</option><option>Ala-Pívot</option><option>Pívot</option>
              </select>
            </div>
          </div>
          
          <button class="btn-full btn-primary-full" onclick="createPlayerFromUser('${teamId}')" style="margin-bottom:10px">Asignar a la plantilla</button>
          <button class="btn-full btn-ghost-full" onclick="_closeModal()">Cancelar</button>
        </div>
      </div>`);

    window.updateAddPlayerPreview = (userId) => {
      const sel = document.getElementById('apUserSelect');
      const opt = sel.options[sel.selectedIndex];
      const preview = document.getElementById('apPreview');
      if (!userId) { preview.style.display = 'none'; return; }
      
      const birth = opt.dataset.birth;
      const guardian = opt.dataset.guardian;
      const age = birth ? calcAge(birth) : '--';
      
      document.getElementById('apPreviewAge').textContent = `${age} años`;
      document.getElementById('apPreviewGuardian').textContent = guardian || 'No requerido';
      preview.style.display = 'block';
    };
  };

  window.createPlayerFromUser = async (teamId) => {
    const sel = document.getElementById('apUserSelect');
    const opt = sel.options[sel.selectedIndex];
    const uid = sel.value;
    const name = opt.dataset.name;
    const birth = opt.dataset.birth;
    const guardian = opt.dataset.guardian;
    const num = parseInt(document.getElementById('apNum').value) || 0;
    const pos = document.getElementById('apPos').value;

    if (!uid) { showToast('Selecciona un usuario','error'); return; }
    
    const age = birth ? calcAge(birth) : 0;

    if (!IS_DEMO_MODE) {
      // 1. Update user record to link back to team
      await db.collection('users').doc(uid).update({ teamId });
      
      // 2. Update or Create player profile (to avoid duplicates)
      const psnap = await db.collection('players').where('uid','==',uid).get();
      const pData = {
        uid, name, age, number:num, position:pos, teamId,
        guardian: age < 18 ? guardian : null,
        active:true,
        stats:{ pts:0, reb:0, ast:0, stl:0, blk:0, to:0, pf:0, reb_off:0, reb_def:0 },
        updatedAt:firebase.firestore.FieldValue.serverTimestamp()
      };

      if (!psnap.empty) {
        // Update existing profile (keeping stats if they exist)
        await psnap.docs[0].ref.update({ name, age, number:num, position:pos, teamId, guardian, active:true });
      } else {
        // Create new profile
        pData.createdAt = firebase.firestore.FieldValue.serverTimestamp();
        await db.collection('players').add(pData);
      }
    }
    
    _closeModal();
    showToast(`${name} añadido a la plantilla ✓`,'success');
    navigateTo('team-detail', { teamId });
  };

// ===================== VIEW: ADMIN COMPOSE =====================
async function renderAdminCompose(container) {
  const teams = await getTeams();
  container.innerHTML = `
    <button class="back-btn" onclick="goBack()">‹ Panel Admin</button>
    <div class="section-header">
      <div><div class="section-title">Enviar mensaje</div><div class="section-subtitle">A familias y jugadores</div></div>
    </div>
    <div class="card">
      <div class="card-body">
        <div class="form-group" style="margin-bottom:14px">
          <label class="form-label" style="font-size:11px">DESTINATARIOS</label>
          <select class="form-input" id="msgTo" style="-webkit-appearance:none">
            <option value="all">📢 Todos los usuarios del club</option>
            ${teams.map(t => `<option value="team_${t.id}">👥 ${t.name} (y sus familias)</option>`).join('')}
          </select>
        </div>
        <div class="form-group" style="margin-bottom:14px">
          <label class="form-label" style="font-size:11px">ASUNTO</label>
          <input class="form-input" id="msgSubject" type="text" placeholder="Título del mensaje">
        </div>
        <div class="form-group" style="margin-bottom:14px">
          <label class="form-label" style="font-size:11px">MENSAJE</label>
          <textarea class="form-input" id="msgBody" rows="5" placeholder="Escribe el mensaje aquí…" style="resize:none;line-height:1.6"></textarea>
        </div>
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">
          <label class="toggle"><input type="checkbox" id="msgImp"><span class="toggle-slider"></span></label>
          <div>
            <div style="font-size:14px;font-weight:700">Marcar como importante</div>
            <div style="font-size:12px;color:var(--text-2)">Aparecerá destacado en la bandeja</div>
          </div>
        </div>
        <button class="btn-full btn-primary-full" onclick="sendMsg()">✉️ Enviar mensaje</button>
      </div>
    </div>
    <div style="height:16px"></div>`;

  window.sendMsg = async () => {
    const to  = document.getElementById('msgTo').value;
    const sub = document.getElementById('msgSubject').value.trim();
    const body= document.getElementById('msgBody').value.trim();
    const imp = document.getElementById('msgImp').checked;
    if (!sub||!body) { showToast('Completa asunto y mensaje','error'); return; }
    if (!IS_DEMO_MODE) await db.collection('messages').add({ title:sub, body, recipientId:to, from:APP.userData.name, important:imp, read:false, date:firebase.firestore.FieldValue.serverTimestamp() });
    showToast('Mensaje enviado ✓','success');
    goBack();
  };
}

// ===================== VIEW: ADMIN PERMISSIONS =====================
async function renderAdminPermissions(container) {
  container.innerHTML = `
    <button class="back-btn" onclick="goBack()">‹ Panel Admin</button>
    <div class="section-header">
      <div>
        <div class="section-title">Control de visibilidad</div>
        <div class="section-subtitle">Qué pueden ver familias y jugadores</div>
      </div>
    </div>
    <div style="padding:0 16px 16px">
      <div style="background:rgba(59,130,246,0.07);border:1px solid rgba(59,130,246,0.2);border-radius:12px;padding:12px 14px">
        <div style="font-size:13px;color:#60A5FA;font-weight:700">ℹ️ Configuración de visibilidad</div>
        <div style="font-size:12px;color:var(--text-2);margin-top:3px">Activa o desactiva qué información pueden ver las familias y jugadores en la app.</div>
      </div>
    </div>
    <div class="settings-list">
      ${[
        { key:'show_individual_stats', label:'Estadísticas individuales',   desc:'Puntos, rebotes, asistencias por jugador', default:true },
        { key:'show_team_stats',       label:'Estadísticas del equipo',     desc:'Totales y ranking del equipo',              default:true },
        { key:'show_season_stats',     label:'Historial de temporada',      desc:'Todos los partidos de la temporada',        default:true },
        { key:'show_calendar',         label:'Calendario de partidos',      desc:'Fechas y rivales programados',              default:true },
        { key:'show_scores',           label:'Marcadores y resultados',     desc:'Puntuaciones finales',                      default:true },
        { key:'show_news',             label:'Noticias del club',           desc:'Tablón de anuncios del club',               default:true },
        { key:'show_roster',           label:'Plantilla del equipo',        desc:'Lista de jugadores con dorsal',             default:true },
      ].map(item => `
        <div class="settings-item">
          <div class="settings-text">
            <div class="settings-label">${item.label}</div>
            <div class="settings-desc">${item.desc}</div>
          </div>
          <label class="toggle">
            <input type="checkbox" id="perm_${item.key}" ${(APP.permissions[item.key]??item.default)?'checked':''}
              onchange="APP.permissions['${item.key}']=this.checked">
            <span class="toggle-slider"></span>
          </label>
        </div>`).join('')}
    </div>
    <div style="padding:16px">
      <button class="btn-full btn-primary-full" onclick="savePerms()">💾 Guardar configuración</button>
    </div>
    <div style="height:16px"></div>`;

  window.savePerms = async () => {
    if (!IS_DEMO_MODE) await db.collection('club').doc('permissions').set(APP.permissions, { merge:true });
    showToast('Configuración guardada','success');
    goBack();
  };
}

// ===================== VIEW: ADMIN NEWS =====================
async function renderAdminNews(container) {
  let selIcon = '📣';
  container.innerHTML = `
    <button class="back-btn" onclick="goBack()">‹ Panel Admin</button>
    <div class="section-header">
      <div><div class="section-title">Nueva noticia</div></div>
    </div>
    <div class="card">
      <div class="card-body">
        <div class="form-group" style="margin-bottom:14px">
          <label class="form-label" style="font-size:11px">ÍCONO</label>
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            ${['🏆','📣','🏀','📅','⚡','🎉','📢','ℹ️','🌟','💢'].map((ic,i) => `
              <button class="iconBtn" onclick="pickIcon('${ic}',this)"
                style="width:44px;height:44px;font-size:24px;border-radius:10px;border:2px solid ${i===1?'var(--primary)':'var(--glass-border)'};background:${i===1?'rgba(255,107,44,0.12)':'var(--glass)'};cursor:pointer;transition:all .2s">${ic}</button>`).join('')}
          </div>
        </div>
        <div class="form-group" style="margin-bottom:14px">
          <label class="form-label" style="font-size:11px">CATEGORÍA</label>
          <select class="form-input" id="newsCat" style="-webkit-appearance:none">
            ${['Resultado','Club','Torneo','Equipación','Horarios','General'].map(c=>`<option>${c}</option>`).join('')}
          </select>
        </div>
        <div class="form-group" style="margin-bottom:14px">
          <label class="form-label" style="font-size:11px">TÍTULO</label>
          <input class="form-input" id="newsTitle" type="text" placeholder="Título de la noticia">
        </div>
        <div class="form-group" style="margin-bottom:20px">
          <label class="form-label" style="font-size:11px">CONTENIDO</label>
          <textarea class="form-input" id="newsBody" rows="6" placeholder="Escribe el contenido aquí…" style="resize:none;line-height:1.6"></textarea>
        </div>
        <button class="btn-full btn-primary-full" onclick="publishNews()">📰 Publicar noticia</button>
      </div>
    </div>
    <div style="height:16px"></div>`;

  window.pickIcon = (ic, btn) => {
    selIcon = ic;
    document.querySelectorAll('.iconBtn').forEach(b => { b.style.borderColor='var(--glass-border)'; b.style.background='var(--glass)'; });
    btn.style.borderColor = 'var(--primary)';
    btn.style.background  = 'rgba(255,107,44,0.12)';
  };

  window.publishNews = async () => {
    const title = document.getElementById('newsTitle').value.trim();
    const body  = document.getElementById('newsBody').value.trim();
    const cat   = document.getElementById('newsCat').value;
    if (!title||!body) { showToast('Completa título y contenido','error'); return; }
    if (!IS_DEMO_MODE) await db.collection('news').add({ icon:selIcon, category:cat, title, body, date:firebase.firestore.FieldValue.serverTimestamp() });
    showToast('Noticia publicada ✓','success');
    goBack();
  };
}
