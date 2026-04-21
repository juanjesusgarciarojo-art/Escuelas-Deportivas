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
  games:'games', 'game-detail':'games', 'game-live':'games', 'game-live-view':'games', 'game-recap':'games',
  messages:'messages', 'message-detail':'messages',
  profile:'profile', admin:'admin', 'admin-users':'admin',
  'admin-teams':'admin', 'admin-players':'admin', 'admin-compose':'admin',
  'admin-permissions':'admin', 'admin-news':'admin', 'admin-practice':'admin',
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
  if (r === 'admin' || r === 'coach' || r === 'gestor') {
    document.getElementById('nav-admin').style.display = '';
  }
  refreshBadge();
  document.getElementById('initialLoader').style.display = 'none';
}

function roleLabel() {
  const r = APP.userData?.role || APP.userData?.rol;
  return { admin:'Administrador del Club', gestor:'Gestor de Club', coach:'Entrenador/a', parent:'Familia', player:'Jugador/a' }[r] || 'Usuario';
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
  if (view === 'game-live' || view === 'game-live-view') {
    const navEl = document.getElementById('bottomNav');
    if (navEl) navEl.style.display = 'none';
  }

  const main = document.getElementById('appMain');
  const navEl = document.getElementById('bottomNav');
  
  if (view === 'game-live') {
    navEl.style.display = 'none';
    main.style.paddingBottom = '0';
  } else {
    navEl.style.display = 'flex';
    main.style.paddingBottom = ''; // Falls back to CSS padding
  }

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
    'admin-practice':     renderAdminPractice,
    'admin-approvals':    renderAdminApprovals,
    'game-live-view':     renderGameLiveViewOnly,
    'game-recap':         renderGameRecap
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
    const role = APP.userData.role;
    let teamsData = [];
    
    if (role === 'admin' || role === 'gestor') {
      const snap = await db.collection('teams').where('active','==',true).get();
      teamsData = snap.docs.map(d => ({ id:d.id, ...d.data() }));
    } else if (role === 'coach') {
      const tIds = APP.userData.teamIds || (APP.userData.teamId ? [APP.userData.teamId] : []);
      if (tIds.length > 0) {
        // Firestore limit for 'in' is 10. For more teams, split queries would be needed.
        const snap = await db.collection('teams').where(firebase.firestore.FieldPath.documentId(), 'in', tIds.slice(0, 10)).get();
        teamsData = snap.docs.map(d => ({ id:d.id, ...d.data() }));
      }
    } else if (APP.userData.teamId) {
      const d = await db.collection('teams').doc(APP.userData.teamId).get();
      if (d.exists) teamsData = [{ id:d.id, ...d.data() }];
    }

    // Dynamic Player Count Update
    const result = await Promise.all(teamsData.map(async (t) => {
      const pSnap = await db.collection('players').where('teamId','==',t.id).where('active','==',true).get();
      return { ...t, playerCount: pSnap.size };
    }));

    return result;
  } catch(e) { console.error(e); return []; }
}

async function getPlayers(teamId) {
  if (IS_DEMO_MODE) return DEMO_DATA.players.filter(p => p.teamId === teamId);
  try {
    // Get all active players for this team
    const snap = await db.collection('players')
      .where('teamId','==',teamId)
      .where('active','==',true)
      .get();
      
    // Sort manually by number to avoid requiring composite indexes in Firestore
    const list = snap.docs.map(d => ({ id:d.id, ...d.data() }));
    return list.sort((a, b) => (a.number || 0) - (b.number || 0));
  } catch(e) { 
    console.error("Error cargando jugadores:", e);
    return []; 
  }
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
    const role = APP.userData.role;
    let q = db.collection('messages');
    if (role !== 'admin' && role !== 'gestor') {
      const tIds = APP.userData.teamIds || (APP.userData.teamId ? [APP.userData.teamId] : []);
      const recipients = ['all', APP.userData.id];
      if (tIds.length > 0) recipients.push(...tIds);
      q = q.where('recipientId', 'in', recipients.slice(0, 10));
    }
    const snap = await q.orderBy('date', 'desc').get();
    return snap.docs.map(d => ({ id:d.id, ...d.data() }));
  } catch(e) { console.error(e); return []; }
}

async function getNews() {
  if (IS_DEMO_MODE) return [...DEMO_DATA.news];
  try {
    const role = APP.userData.role;
    const tIds = APP.userData.teamIds || (APP.userData.teamId ? [APP.userData.teamId] : []);
    
    let q = db.collection('news').orderBy('date','desc').limit(15);
    const snap = await q.get();
    const allNews = snap.docs.map(d => ({ id:d.id, ...d.data() }));

    // If admin or coach or gestor, see global and ALL team news (to manage)
    if (['admin','coach','gestor'].includes(role)) return allNews;

    // If player/family, filter to see only 'all' or their specific team
    return allNews.filter(n => n.target === 'all' || tIds.includes(n.target));
  } catch(e) { console.error("Error cargando noticias:", e); return []; }
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

function calculateVal(s) {
  const pts = (s.pts_1||0)*1 + ((s.pts_layup||0)+(s.pts_jump||0))*2 + (s.pts_3||0)*3;
  const fallos = (s.miss_1||0) + (s.miss_layup||0) + (s.miss_jump||0) + (s.miss_3||0);
  return (pts + (s.reb_off||0) + (s.reb_def||0) + (s.ast||0) + (s.stl||0) + (s.blk||0) + (s.f_drawn||0)) 
         - (fallos + (s.to||0) + (s.pf||0));
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
  const isOwner = APP.userData?.role === 'admin' || (APP.userData?.role === 'coach' && n.authorId === APP.userData?.id);
  const actionsHtml = isOwner ? `
    <div style="display:flex;gap:6px;margin-top:8px" onclick="event.stopPropagation()">
      <button class="btn-full btn-ghost-full" style="flex:1;font-size:11px;padding:6px" onclick="editContent('news','${n.id}', \`${n.body.replace(/`/g, '')}\`)">📝 Editar</button>
      <button class="btn-full" style="flex:1;background:rgba(220,38,38,0.1);color:#ef4444;border:none;font-size:11px;padding:6px;border-radius:12px;font-weight:700" onclick="deleteNews('${n.id}','${n.title}')">🗑️ Borrar</button>
    </div>
  ` : '';
  return `
  <div class="news-card">
    <div class="news-img">${n.icon||'📰'}</div>
    <div class="news-content">
      <div class="news-date">${n.category} · ${fmtDate(n.date)}</div>
      <div class="news-title">${n.title}</div>
      <div class="news-preview" style="white-space:pre-wrap">${n.body}</div>
      ${actionsHtml}
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

  const isStaff = ['admin','coach'].includes(APP.userData.role);
  const canSeeNews = isStaff || APP.permissions.show_news;
  const canSeeScores = isStaff || APP.permissions.show_scores;
  const canSeeCalendar = isStaff || APP.permissions.show_calendar;

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

      <!-- Noticias del Club -->
      ${(canSeeNews && news.length) ? `
      <div class="section-header">
        <div class="section-title" style="font-size:18px">Noticias del Club</div>
        ${isAdmin ? `<button class="section-action" onclick="navigateTo('admin-news')">+ Nueva</button>` : ''}
      </div>
      <div class="news-container">
        ${news.slice(0,3).map((n, i) => {
          const isOwner = APP.userData?.role === 'admin' || (APP.userData?.role === 'coach' && n.authorId === APP.userData?.id);
          const actionsHtml = isOwner ? `
            <div style="display:flex;gap:6px;margin-top:12px" onclick="event.stopPropagation()">
              <button class="btn-full" style="flex:1;background:rgba(0,0,0,0.5);color:#fff;padding:6px;backdrop-filter:blur(4px);border:none;border-radius:12px;font-size:11px" onclick="editContent('news','${n.id}', \`${n.body.replace(/`/g, '')}\`)">📝 Editar</button>
              <button class="btn-full" style="flex:1;background:rgba(220,38,38,0.5);color:#fff;padding:6px;backdrop-filter:blur(4px);border:none;border-radius:12px;font-size:11px" onclick="deleteNews('${n.id}','${n.title}')">🗑️ Borrar</button>
            </div>
          ` : '';
          
          if (i === 0) return `
          <div class="news-card featured">
            <div class="news-badge">${n.category}</div>
            <div class="news-img-hero">${n.photo ? `<img src="${n.photo}">` : '📰'}</div>
            <div class="news-content">
              <div class="news-date">${fmtDate(n.date)}</div>
              <div class="news-title-hero">${n.title}</div>
              <div class="news-preview-hero" style="white-space:pre-wrap">${n.body}</div>
              ${actionsHtml}
            </div>
          </div>
          `; else return newsCardHTML(n);
        }).join('')}
      </div>` : (canSeeNews ? `
      <div class="section-header">
        <div class="section-title" style="font-size:18px">Noticias del Club</div>
        ${isAdmin ? `<button class="section-action" onclick="navigateTo('admin-news')">+ Nueva</button>` : ''}
      </div>
      <div class="empty-state">No hay noticias publicadas recientemente</div>` : '')}

      <!-- Live Games Alert (Siempre para Admin, restringido por canSeeScores para otros) -->
      ${games.filter(g => g.status === 'live').filter(g => isStaff || canSeeScores).map(lg => `
      <div class="live-game-banner" onclick="navigateTo('game-live-view', { gameId:'${lg.id}', teamName:'${lg.teamName||'Gallardas'}' })">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
          <div class="live-badge"><div class="live-dot"></div>&nbsp;PARTIDO EN DIRECTO</div>
          <div style="font-size:11px;font-weight:700;color:rgba(255,255,255,0.6)">${lg.quarter === 'PR' ? 'PRORROGA' : 'CUARTO ' + lg.quarter}</div>
        </div>
        <div style="display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:12px">
          <div style="text-align:right">
            <div style="font-size:11px;color:rgba(255,255,255,0.7);margin-bottom:2px">${lg.teamName||'Gallardas'}</div>
            <div style="font-size:28px;font-weight:900;line-height:1">${lg.homeScore||0}</div>
          </div>
          <div style="font-size:18px;opacity:0.3">VS</div>
          <div style="text-align:left">
            <div style="font-size:11px;color:rgba(255,255,255,0.7);margin-bottom:2px">Rival</div>
            <div style="font-size:28px;font-weight:900;line-height:1">${lg.awayScore||0}</div>
          </div>
        </div>
      </div>`).join('')}

      <!-- Competición -->
      ${(canSeeCalendar && upcoming.length) ? `
      <div class="section-header" style="margin-top:24px">
        <div class="section-title" style="font-size:18px">Próximos partidos</div>
        <button class="section-action" onclick="navigateTo('games')">Ver todos</button>
      </div>
      <div class="games-list-home">
        ${upcoming.slice(0,2).map(gameCardHTML).join('')}
      </div>` : ''}

      <!-- Resultados -->
      ${(canSeeScores && finished.length) ? `
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

  const isStaff = ['admin','coach'].includes(APP.userData.role);
  const canSeeRoster = isStaff || APP.permissions.show_roster;
  const canSeeStats = isStaff || APP.permissions.show_team_stats;

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
      ${canSeeRoster ? `<button class="tab-pill active" onclick="teamTab('players',this)">Plantilla (${players.length})</button>` : ''}
      ${canSeeStats ? `<button class="tab-pill ${!canSeeRoster ? 'active':''}" onclick="teamTab('stats',this)">Estadísticas</button>` : ''}
      <button class="tab-pill ${(!canSeeRoster && !canSeeStats) ? 'active':''}" onclick="teamTab('games',this)">Partidos (${games.length})</button>
    </div>

    <!-- PLAYERS TAB -->
    <div id="tdtab-players" style="${!canSeeRoster ? 'display:none' : ''}">
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
                     <div class="player-meta">${p.position} · ${p.birth ? calcAge(p.birth) : (p.age||'?')} años · ${(p.stats?.pts||0).toFixed(1)} pts/par.</div>
                   </div>
                 </div>
                 ${canManage ? `<button class="action-btn-circle" style="color:var(--text-3)" onclick="showEditPlayerModal('${p.id}','${teamId}')">•••</button>` : `<div style="color:var(--text-3);padding:10px">›</div>`}
               </div>`).join('')}
      </div>
    </div>

    <!-- STATS TAB -->
    <div id="tdtab-stats" style="${(!canSeeStats || !canSeeRoster) ? 'display:none' : ''}">
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

  // Robustecimiento: Si faltan datos en players pero hay UID, buscar en users
  if ((!p.birth || !p.guardian || !p.parentPhone || !p.phone) && p.uid && !IS_DEMO_MODE) {
    const uDoc = await db.collection('users').doc(p.uid).get();
    if (uDoc.exists) {
      const u = uDoc.data();
      p.birth = p.birth || u.birth || u.birthDate;
      p.guardian = p.guardian || u.guardian;
      p.parentPhone = p.parentPhone || u.parentPhone;
      p.phone = p.phone || u.phone;
    }
  }

  const age = p.birth ? calcAge(p.birth) : (p.age || 0);
  const isMinor = age < 18;

  const eff = (p.stats?.pts||0)+(p.stats?.reb||0)+(p.stats?.ast||0)+(p.stats?.stl||0)+(p.stats?.blk||0)-(p.stats?.to||0);
  const isStaff = ['admin','coach','gestor'].includes(APP.userData.role);
  const canSeeStats = isStaff || APP.permissions.show_individual_stats;

  container.innerHTML = `
    <button class="back-btn" onclick="goBack()">‹ Equipo</button>

    <div style="background:linear-gradient(160deg,rgba(255,107,44,0.15) 0%,transparent 60%);padding:24px 16px 16px;text-align:center">
      <div style="width:100px;height:100px;border-radius:50%;${p.photo?'':'background:var(--glass)'};display:flex;align-items:center;justify-content:center;font-size:38px;font-weight:900;margin:0 auto 12px;border:3px solid rgba(255,107,44,0.4);box-shadow:0 0 0 6px rgba(255,107,44,0.1);overflow:hidden">
        ${p.photo ? `<img src="${p.photo}" style="width:100%;height:100%;object-fit:cover">` : initials(p.name)}
      </div>
      <div style="font-size:24px;font-weight:900">${p.name}</div>
      <div style="font-size:12px;color:var(--text-3);font-weight:700;margin-top:2px">${p.birth ? fmtDate(p.birth) : 'Fecha no disp.'} (${age} años)</div>
      <div style="display:flex;align-items:center;justify-content:center;gap:8px;margin-top:10px;flex-wrap:wrap">
        <span class="tag tag-orange">#${p.number}</span>
        <span class="tag tag-gray">${p.position}</span>
        ${p.teamName ? `<span class="tag tag-gray">👥 ${p.teamName}</span>` : ''}
      </div>
    </div>

    <!-- Personal Info (Only for Staff or the player themselves) -->
    ${(isStaff || p.uid === APP.userData.id) ? `
    <div style="padding:0 16px 16px">
      <div class="card" style="padding:14px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.05)">
        <div style="font-size:10px;font-weight:800;color:var(--text-3);margin-bottom:10px;text-transform:uppercase">Información Personal</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
          <div>
            <div style="font-size:10px;color:rgba(255,255,255,0.4)">NACIMIENTO</div>
            <div style="font-size:12px;font-weight:700;color:white">${p.birth ? fmtDate(p.birth) : '---'}</div>
          </div>
          <div>
            <div style="font-size:10px;color:rgba(255,255,255,0.4)">TEL. JUGADOR/A</div>
            <div style="font-size:12px;font-weight:700;color:white">${p.phone || '---'}</div>
          </div>

          ${isMinor ? `
          <div style="grid-column: span 2; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 10px; margin-top: 4px">
            <div style="font-size:10px;color:var(--primary);font-weight:800">TUTOR LEGAL (MENOR)</div>
            <div style="font-size:13px;font-weight:700;color:white;margin-top:2px">${p.guardian || 'Sin asignar'}</div>
            <div style="font-size:12px;color:var(--text-2);margin-top:1px">📞 Tel. Tutor: ${p.parentPhone || 'Sin teléfono'}</div>
          </div>
          ` : `
          <div style="grid-column: span 2; border-top: 1px solid rgba(16, 185, 129, 0.1); padding-top: 10px; margin-top: 4px">
            <div style="font-size:10px;color:#10B981;font-weight:800">MAYORÍA DE EDAD</div>
            <div style="font-size:12px;font-weight:700;color:white">✓ Este usuario es mayor de edad</div>
          </div>
          `}
        </div>
      </div>
    </div>
    ` : ''}

    <div class="section-header" style="padding-top:16px">
      <div class="section-title" style="font-size:17px">Promedio de Temporada</div>
      <div class="chip" style="background:rgba(255,255,255,0.05);padding:4px 10px;border-radius:20px;font-size:10px;font-weight:900">${p.stats?.gp||0} PARTIDOS</div>
    </div>

    <div style="padding:0 16px">
      ${canSeeStats ? `
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px">
        <div style="background:var(--bg-card);border:1px solid var(--glass-border);border-radius:20px;padding:16px;text-align:center">
           <div style="font-size:28px;font-weight:900;color:var(--primary)">${((p.stats?.pts||0)/(p.stats?.gp||1)).toFixed(1)}</div>
           <div style="font-size:10px;font-weight:700;color:var(--text-3);letter-spacing:1px">PUNTOS / PARTIDO</div>
        </div>
        <div style="background:var(--bg-card);border:1px solid var(--glass-border);border-radius:20px;padding:16px;text-align:center">
           <div style="font-size:28px;font-weight:900;color:var(--secondary)">${((p.stats?.val||0)/(p.stats?.gp||1)).toFixed(1)}</div>
           <div style="font-size:10px;font-weight:700;color:var(--text-3);letter-spacing:1px">VALORACIÓN MEDIA</div>
        </div>
      </div>
      
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:20px">
        <div style="background:var(--glass);padding:12px;border-radius:12px;text-align:center">
           <div style="font-weight:800">${((p.stats?.reb||0)/(p.stats?.gp||1)).toFixed(1)}</div><div style="font-size:9px;opacity:0.6">REB</div>
        </div>
        <div style="background:var(--glass);padding:12px;border-radius:12px;text-align:center">
           <div style="font-weight:800">${((p.stats?.ast||0)/(p.stats?.gp||1)).toFixed(1)}</div><div style="font-size:9px;opacity:0.6">AST</div>
        </div>
        <div style="background:var(--glass);padding:12px;border-radius:12px;text-align:center">
           <div style="font-weight:800">${Math.round((p.stats?.mins||0)/(p.stats?.gp||1)/60)}m</div><div style="font-size:9px;opacity:0.6">MIN</div>
        </div>
      </div>
    </div>

    <!-- Specialty Badges -->
    <div style="padding:0 16px 20px">
       <div class="card" style="padding:16px">
          <div style="font-size:12px;font-weight:800;color:var(--text-2);margin-bottom:12px">ESPECIALIDADES DEL JUGADOR</div>
          <div style="display:flex;gap:8px;flex-wrap:wrap">
             ${(p.stats?.pts/p.stats?.gp) > 12 ? '<span class="tag" style="background:rgba(255,107,44,0.1);color:var(--primary)">🔥 ANOTADOR</span>' : ''}
             ${(p.stats?.reb/p.stats?.gp) > 6 ? '<span class="tag" style="background:rgba(59,130,246,0.1);color:#60A5FA">🛡️ BALUARTE</span>' : ''}
             ${(p.stats?.ast/p.stats?.gp) > 4 ? '<span class="tag" style="background:rgba(16,185,129,0.1);color:#10B981">🎯 DIRECTOR</span>' : ''}
             ${(p.stats?.gp) > 0 ? `<span class="tag" style="background:rgba(255,184,0,0.1);color:#FFB800">✨ MVPs: ${p.stats?.mvpCount||0}</span>` : ''}
             <span class="tag" style="background:rgba(255,255,255,0.05);color:var(--text-2)">💪 COMPROMISO</span>
          </div>
       </div>
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

  window.showNewGameModal = async () => {
    const teams = await getTeams();
    openModal(`
      <div class="modal-sheet">
        <div class="modal-handle"></div>
        <div class="modal-title">Nuevo partido</div>
        <div class="modal-body" style="padding-bottom:24px">
          <div class="form-group" style="margin-bottom:12px">
            <label class="form-label" style="font-size:11px">NUESTRO EQUIPO</label>
            <select class="form-input" id="ngTeamId">
              ${teams.map(t => `<option value="${t.id}">${t.name} (${t.category})</option>`).join('')}
            </select>
          </div>
          <div class="form-group" style="margin-bottom:12px">
            <label class="form-label" style="font-size:11px">RIVAL</label>
            <input class="form-input" id="ngAway" type="text" placeholder="Nombre rival">
          </div>
          <div style="display:flex;gap:12px;margin-bottom:12px">
            <div style="flex:1">
              <label class="form-label" style="font-size:11px">¿JUGAMOS EN CASA?</label>
              <select class="form-input" id="ngIsHome">
                <option value="true">Sí (Local)</option>
                <option value="false">No (Visitante)</option>
              </select>
            </div>
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
      </div>
    `);
  };

  window.createGame = async () => {
    const isHome = document.getElementById('ngIsHome').value === 'true';
    const teamSel = document.getElementById('ngTeamId');
    const teamName = teamSel.options[teamSel.selectedIndex]?.text || '';
    const rival = document.getElementById('ngAway').value.trim();
    const data = { 
      teamId: teamSel.value, teamName: teamName, 
      homeTeam: isHome ? teamName : rival, 
      awayTeam: isHome ? rival : teamName, 
      date: document.getElementById('ngDate').value, 
      location: document.getElementById('ngLocation').value.trim(), 
      status:'upcoming', homeScore:null, awayScore:null, isHome:isHome, createdBy: APP.userData.id,
      attendance: {}
    };
    if (!rival || !data.date || !data.teamId) { showToast('Completa todos los campos','error'); return; }
    if (!IS_DEMO_MODE) await db.collection('games').add(data);
    _closeModal();
    showToast('Partido creado correctamente','success');
    navigateTo('games');
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
  let players   = [];
  if (IS_DEMO_MODE && g.teamId) {
    players = DEMO_DATA.players.filter(p => p.teamId === g.teamId);
  } else if (g.teamId) {
    players = await getPlayers(g.teamId);
  }

  // RSVP Logic
  const attendance = g.attendance || {};
  let rsvpWidget = '';
  if (!fin && g.teamId) {
    if (APP.userData.role === 'player' || APP.userData.role === 'parent') {
      const myPlayer = players.find(p => p.uid === (APP.userData.role === 'parent' ? APP.userData.id : APP.userData.id) || p.uid === APP.userData.id); 
      // Si el equipo coincide y es player
      if (myPlayer || (APP.userData.teamId === g.teamId && APP.userData.role==='player')) {
        const actingPlayerId = myPlayer ? myPlayer.id : APP.userData.id;
        const myStatus = attendance[actingPlayerId];
        rsvpWidget = `
          <div class="card" style="margin:0 16px 16px;padding:16px;background:var(--bg-card-2);display:flex;flex-direction:column;align-items:center;">
            <div style="font-size:12px;font-weight:800;color:var(--text-3);margin-bottom:12px">CONFIRMAR ASISTENCIA</div>
            <div style="display:flex;gap:10px;width:100%">
              <button class="btn-full" style="flex:1;background:\${myStatus==='yes' ? '#10B981':'rgba(255,255,255,0.05)'};color:\${myStatus==='yes' ? '#fff':'var(--text-2)'};font-weight:\${myStatus==='yes'?'800':'500'}" onclick="setRSVP('${g.id}','${actingPlayerId}','yes')">✅ Sí voy</button>
              <button class="btn-full" style="flex:1;background:\${myStatus==='no' ? '#EF4444':'rgba(255,255,255,0.05)'};color:\${myStatus==='no' ? '#fff':'var(--text-2)'};font-weight:\${myStatus==='no'?'800':'500'}" onclick="setRSVP('${g.id}','${actingPlayerId}','no')">❌ No asisto</button>
            </div>
            \${myStatus ? \`<div style="font-size:11px;color:var(--primary);margin-top:10px">✅ Respuesta guardada correctamente</div>\` : ''}
          </div>
        `;
      }
    } else if (['admin','coach'].includes(APP.userData.role)) {
      const going = players.filter(p => attendance[p.id] === 'yes' || attendance[p.uid] === 'yes');
      const notGoing = players.filter(p => attendance[p.id] === 'no' || attendance[p.uid] === 'no');
      const unknown = players.filter(p => !attendance[p.id] && !attendance[p.uid]);
      
      rsvpWidget = `
        <div class="card" style="margin:0 16px 16px;padding:16px">
          <div style="font-size:13px;font-weight:800;margin-bottom:12px;display:flex;justify-content:space-between">
            <span>📋 Asistencia de Jugadores</span>
            <span style="color:var(--primary)">\${going.length} confirmados</span>
          </div>
          \${going.length > 0 ? \`
            <div style="font-size:12px;color:#10B981;font-weight:700;margin-top:8px">✅ Van a asistir (\${going.length})</div>
            <div style="font-size:13px;color:var(--text-2);margin-top:4px">\${going.map(p => p.name).join(' • ')}</div>
          \` : ''}
          \${notGoing.length > 0 ? \`
            <div style="font-size:12px;color:#EF4444;font-weight:700;margin-top:12px">❌ Han rechazado (\${notGoing.length})</div>
            <div style="font-size:13px;color:var(--text-2);margin-top:4px">\${notGoing.map(p => p.name).join(' • ')}</div>
          \` : ''}
          \${unknown.length > 0 ? \`
            <div style="font-size:12px;color:var(--text-3);font-weight:700;margin-top:12px">⏳ Por responder (\${unknown.length})</div>
            <div style="font-size:13px;color:var(--text-3);margin-top:4px">\${unknown.map(p => p.name).join(' • ')}</div>
          \` : ''}
        </div>
      `;
    }
  }

  window.setRSVP = async (gameId, playerId, status) => {
    if (IS_DEMO_MODE) { showToast('Acción no disp. en Demo', 'info'); return; }
    try {
      await db.collection('games').doc(gameId).set({ attendance: { [playerId]: status } }, { merge:true });
      showToast('Asistencia actualizada', 'success');
      navigateTo('game-detail', { gameId });
    } catch(e) { showToast('Error al confirmar','error'); }
  };

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

    ${rsvpWidget}

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

    <!-- PRIVATE COACH REPORT -->
    ${['admin','coach','gestor'].includes(APP.userData?.role) ? `
    <div style="padding:0 16px 32px">
      <div style="background:#0F172A;border:1px solid #1E293B;border-radius:24px;padding:20px;box-shadow:0 15px 40px rgba(0,0,0,0.5)">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px">
          <div style="width:32px;height:32px;background:rgba(255,255,255,0.1);border-radius:8px;display:flex;align-items:center;justify-content:center">👔</div>
          <div style="font-size:14px;font-weight:900;color:white;letter-spacing:1px">INFORME TÉCNICO (PRIVADO)</div>
        </div>
        
        <table style="width:100%;font-size:11px;color:rgba(255,255,255,0.7);border-collapse:collapse">
          <thead>
            <tr style="border-bottom:1px solid rgba(255,255,255,0.1)">
              <th style="padding:8px 4px;text-align:left">JUGADOR</th>
              <th style="padding:8px 4px;text-align:center">MINS</th>
              <th style="padding:8px 4px;text-align:center">% FG</th>
              <th style="padding:8px 4px;text-align:center">PÉRD.</th>
              <th style="padding:8px 4px;text-align:center">FALT.</th>
            </tr>
          </thead>
          <tbody>
            ${Object.keys(g.playerStats || {}).map(pid => {
               const s = g.playerStats[pid];
               const attempts = (s.pts_layup||0) + (s.pts_jump||0) + (s.miss_2||0) + (s.pts_3||0) + (s.miss_3||0);
               const made = (s.pts_layup||0) + (s.pts_jump||0) + (s.pts_3||0);
               const pct = attempts > 0 ? Math.round((made/attempts)*100) : 0;
               const pName = players.find(p => p.id === pid)?.name || 'Jugador';
               return `
                <tr style="border-bottom:1px solid rgba(255,255,255,0.05)">
                  <td style="padding:10px 4px;font-weight:700;color:white">${pName.split(' ')[0]}</td>
                  <td style="padding:10px 4px;text-align:center">${Math.floor((s.mins||0)/60)}m</td>
                  <td style="padding:10px 4px;text-align:center;color:${pct < 30 ? '#FF4444' : (pct > 50 ? '#4CAF50' : 'white')}">${pct}%</td>
                  <td style="padding:10px 4px;text-align:center">${s.to||0}</td>
                  <td style="padding:10px 4px;text-align:center">${s.pf||0}</td>
                </tr>
               `;
            }).join('')}
          </tbody>
        </table>
        <div style="margin-top:20px;padding:12px;background:rgba(255,255,255,0.03);border-radius:12px;font-size:10px;line-height:1.5;color:rgba(255,255,255,0.5)">
           💡 <b>Consejo Técnico:</b> Los porcentajes de acierto en rojo indican una selección de tiro mejorable. Las pérdidas superiores a 3 por jugador sugieren necesidad de trabajar el bote bajo presión.
        </div>
      </div>
    </div>` : ''}

    <div style="padding:0 16px 40px">
       <button class="btn-full btn-primary-full" onclick="navigateTo('team-detail',{teamId:'${g.teamId}'})">Volver a la plantilla</button>
    </div>
  `;
}

// ===================== VIEW: GAME LIVE =====================
const STAT_BTNS = [
  { stat:'pts_1',     label:'Tiro Libre', icon:'🎯' },
  { stat:'miss_1',    label:'TL Fallado', icon:'❌' },
  { stat:'pts_layup', label:'Entrada',    icon:'🏃' },
  { stat:'pts_jump',  label:'Tiro Media', icon:'🏀' },
  { stat:'miss_2',    label:'2p Fallado', icon:'✖️' },
  { stat:'pts_3',     label:'Triple',      icon:'👌' },
  { stat:'miss_3',    label:'3p Fallado', icon:'🔥' },
  { stat:'reb_off',   label:'Reb. Off',   icon:'⏫' },
  { stat:'reb_def',   label:'Reb. Def',   icon:'⏬' },
  { stat:'ast',       label:'Asist.',     icon:'🤝' },
  { stat:'stl',       label:'Robo',       icon:'🔒' },
  { stat:'blk',       label:'Tapón',      icon:'🛡️' },
  { stat:'to',        label:'Pérdida',    icon:'⚠️' },
  { stat:'pf',        label:'F. Comit.',  icon:'🚫' },
  { stat:'f_drawn',   label:'F. Recib.',  icon:'🩹' },
  { stat:'mins',      label:'Sustit.',    icon:'🔄' },
];

async function renderGameLive(container, { teamId, teamName, gameId, isPractice }) {
  window._isPractice = !!isPractice;
  container.innerHTML = `<div class="loader"><div class="spinner"></div></div>`;
  
  let players = [];
  if (IS_DEMO_MODE) {
    players = DEMO_DATA.players.filter(p => p.teamId === (teamId||'t1'));
  } else {
    try {
      players = await getPlayers(teamId);
    } catch(e) {
      console.error("Error fetching players:", e);
      showToast("Error al cargar jugadores", "error");
    }
  }

  const liveStats = {};
  players.forEach(p => { 
    liveStats[p.id] = { 
      pts_1:0, pts_layup:0, pts_jump:0, pts_3:0, 
      miss_1:0, miss_layup:0, miss_jump:0, miss_3:0,
      reb_off:0, reb_def:0, ast:0, stl:0, blk:0, to:0, pf:0, f_drawn:0,
      mins: 0, plusMinus: 0, onCourt: false, qMins: {}
    }; 
  });

  let selPlayerId = players[0]?.id || null;
  let awayScore   = 0;
  let teamFouls   = 0;
  let timerSec    = 0;
  let timerOn     = false;
  let timerInt    = null;
  let quarter     = 1;
  const actionHistory = [];

  window.undoLastAction = () => {
    if (actionHistory.length === 0) { showToast('No hay nada que deshacer','info'); return; }
    const last = actionHistory.pop();
    const pid = last.pid;
    const stat = last.stat;
    
    if (liveStats[pid]) {
      if (stat === 'mins') {
        liveStats[pid].onCourt = !liveStats[pid].onCourt;
      } else {
        liveStats[pid][stat] = Math.max(0, (liveStats[pid][stat]||0) - 1);
        if (last.fromCourt && liveStats[pid].shots) {
          liveStats[pid].shots.pop();
        }
        // Reverse Plus/Minus
        if (stat.startsWith('pts_')) {
          let pts = stat === 'pts_1' ? 1 : (stat === 'pts_3' ? 3 : 2);
          updatePlusMinus(-pts, true);
        }
        if (stat === 'pf') teamFouls = Math.max(0, teamFouls - 1);
      }
      showToast('Acción deshecha','info');
      refreshLiveUI();
      syncLiveToFirebase();
    }
  };

  function homeScore() { return players.reduce((s,p) => s + getPlayerPts(p.id), 0); }
  function getPlayerPts(pid) { 
    const s = liveStats[pid]||{}; 
    return (s.pts_1||0)*1 + (s.pts_layup||0)*2 + (s.pts_jump||0)*2 + (s.pts_3||0)*3; 
  }
  function fmtTimer(s) { 
    let m = Math.floor(s/60);
    let sec = s%60;
    return `${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`; 
  }

  async function syncLiveToFirebase() {
    if (IS_DEMO_MODE || !gameId || window._isPractice) return;
    const update = {
      homeScore: homeScore(),
      awayScore: awayScore,
      timer: timerSec,
      quarter: quarter,
      status: 'live',
      lastUpdate: firebase.firestore.FieldValue.serverTimestamp(),
      liveFouls: players.map(p => ({ pid:p.id, name:p.name, pf:liveStats[p.id].pf, on:liveStats[p.id].onCourt }))
    };
    db.collection('games').doc(gameId).update(update).catch(e => console.error(e));
  }

  function addStat(pid, stat, fromCourt = false) {
    if (!pid || !liveStats[pid]) return;
    actionHistory.push({ pid, stat, fromCourt, quarter });
    
    if (stat === 'mins') {
      if (!liveStats[pid].onCourt && liveStats[pid].pf >= 5) {
        showToast('No se puede sacar a pista a una jugadora expulsada', 'error');
        return;
      }
      liveStats[pid].onCourt = !liveStats[pid].onCourt;
      showToast(liveStats[pid].onCourt ? 'Entra a pista' : 'Sale al banquillo', 'info');
    } else {
      liveStats[pid][stat] = (liveStats[pid][stat]||0) + 1;
      if (stat.startsWith('pts_')) {
        let pts = stat === 'pts_1' ? 1 : (stat === 'pts_3' ? 3 : 2);
        updatePlusMinus(pts, true);
      }
      if (stat === 'pf') {
        teamFouls++;
        if (teamFouls >= 4) showToast('¡EN BONUS! El equipo rival tira tiros libres.', 'warning');
        
        // Regla de las 5 faltas
        if (liveStats[pid].pf === 5) {
          showToast(`¡EXPULSADA! ${players.find(p=>p.id===pid).name} ha cometido su 5ª falta`, 'error');
          setTimeout(() => window.forceSubstitution(pid), 500);
        }
      }
      flashFeedback(stat);
    }
    refreshLiveUI();
    syncLiveToFirebase();
  }

  function updatePlusMinus(points, isHomeScore) {
    players.forEach(p => {
      if (liveStats[p.id].onCourt) {
        if (isHomeScore) liveStats[p.id].plusMinus += points;
        else liveStats[p.id].plusMinus -= points;
      }
    });
  }

  const setupEventListeners = () => {
    const shotCourt = document.getElementById('shotCourt');
    if (shotCourt) {
      shotCourt.onclick = (e) => {
        if (!selPlayerId) { showToast('Selecciona un jugador primero','info'); return; }
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        let type = '2p';
        const dist = Math.sqrt(Math.pow(x-50,2) + Math.pow(y-10,2));
        if (dist > 42 || x < 5 || x > 95) type = '3p';
        else if (dist < 18) type = 'entrada';
        openShotModal(x, y, type);
      };
    }
  };

  const openShotModal = (x, y, type) => {
    openModal(`
      <div class="modal-sheet">
        <div class="modal-handle"></div>
        <div class="modal-title">${type.toUpperCase()} registrada</div>
        <div class="modal-body" style="padding-bottom:32px;display:flex;gap:12px">
           <button class="btn-full" style="background:#4CAF50;color:white" onclick="recordShot(true,'${type}',${x},${y})">✅ ANOTADA</button>
           <button class="btn-full" style="background:#FF4444;color:white" onclick="recordShot(false,'${type}',${x},${y})">❌ FALLADA</button>
        </div>
      </div>`);
  };

  window.recordShot = (made, type, x, y) => {
    const pid = selPlayerId;
    if (!liveStats[pid].shots) liveStats[pid].shots = [];
    liveStats[pid].shots.push({ x, y, made, type });
    if (made) {
      if (type === '3p') addStat(pid, 'pts_3', true);
      else if (type === 'entrada') addStat(pid, 'pts_layup', true);
      else addStat(pid, 'pts_jump', true);
    } else {
      if (type === '3p') addStat(pid, 'miss_3', true);
      else addStat(pid, 'miss_2', true);
    }
    _closeModal();
    showToast(`${made ? '¡Canasta!' : 'Fallo...'} registrada ✓`, made ? 'success' : 'info');
  };

  function refreshLiveUI() {
    const hEl = document.getElementById('lvHomeScore');
    if (hEl) hEl.textContent = homeScore();
    
    const psList = document.getElementById('playerQuickStats');
    if (psList) {
      psList.innerHTML = players.map(p => {
        const s = liveStats[p.id];
        const val = calculateVal(s);
        const foulWarn = s.pf >= 4 ? 'color:#FF4444;font-weight:900;animation:pulse 1s infinite' : '';
        return `
          <div class="psBtn" onclick="selectPlayer('${p.id}', this)" style="${p.id === selPlayerId ? 'border-color:var(--primary);background:rgba(255,107,44,0.12);color:var(--primary)' : ''}">
            <div style="display:flex;justify-content:space-between;align-items:center;width:100%;text-align:left;padding-bottom:2px">
               <span style="font-size:10px;font-weight:800;opacity:0.8">${p.number||'00'}</span>
               <span style="width:6px;height:6px;border-radius:50%;background:${s.onCourt ? '#4CAF50' : '#888'}"></span>
            </div>
            <div style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;width:100%;font-size:11px;font-weight:700">${p.name.split(' ')[0]}</div>
            <div style="font-size:9px;opacity:0.6;display:flex;justify-content:space-between;width:100%;padding-top:4px">
               <span>+/- ${s.plusMinus > 0 ? '+' : ''}${s.plusMinus}</span>
               <span style="${foulWarn}">F:${s.pf}</span>
               <span style="font-weight:700">VAL:${val}</span>
            </div>
          </div>
        `;
      }).join('');
    }

    const bonusEl = document.getElementById('teamBonus');
    if (bonusEl) {
      if (teamFouls >= 4) {
        bonusEl.innerHTML = `<span style="background:var(--primary);color:white;padding:2px 8px;border-radius:6px;font-size:10px;font-weight:900">BONUS</span>`;
      } else {
        bonusEl.innerHTML = `<div style="display:flex;gap:3px">${Array(4).fill(0).map((_,i)=>`<div style="width:6px;height:6px;border-radius:50%;background:${i<teamFouls?'var(--primary)':'rgba(255,255,255,0.1)'}"></div>`).join('')}</div>`;
      }
    }

    if (!selPlayerId) return;
    const s = liveStats[selPlayerId] || {};
    STAT_BTNS.forEach(b => {
      const cnt = document.getElementById('cnt_'+b.stat);
      if (cnt) cnt.textContent = s[b.stat]||0;
    });

    // Actualizar puntos en el mapa de calor en vivo
    const courtSvg = document.getElementById('courtDynamicShots');
    if (courtSvg) {
      const shots = s.shots || [];
      courtSvg.innerHTML = shots.map(sh => `
        <circle cx="${sh.x}" cy="${sh.y}" r="2" fill="${sh.made?'#22c55e':'#ef4444'}" style="filter:drop-shadow(0 0 2px ${sh.made?'#22c55e':'#ef4444'})" />
      `).join('');
    }
  }

  const FEEDBACK_LABELS = { pts_1:'+1PT', miss_1:'MISS', pts_layup:'+2PT', pts_jump:'+2PT', miss_2:'MISS', pts_3:'+3PT', miss_3:'MISS', reb_off:'REB.O', reb_def:'REB.D', ast:'AST', stl:'ROB', blk:'TAP', to:'PÉR', pf:'FALTA', f_drawn:'FALTA↗', mins:'SUST.' };

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
    <div style="background:var(--bg-dark);padding:12px 16px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--glass-border);position:sticky;top:0;z-index:20">
      <button style="background:none;border:none;color:var(--primary);font-size:15px;font-weight:700;cursor:pointer;font-family:var(--font)" onclick="goBack()">← Salir</button>
      <div class="live-badge"><div class="live-dot"></div>&nbsp;EN VIVO</div>
      <div style="display:flex;gap:8px">
        <button onclick="undoLastAction()" style="background:rgba(59,130,246,0.12);border:1px solid rgba(59,130,246,0.3);color:#60A5FA;width:34px;height:34px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:16px" title="Deshacer">↩️</button>
        <button id="endBtn" style="background:rgba(255,68,68,0.12);border:1px solid rgba(255,68,68,0.3);color:var(--danger);font-size:12px;font-weight:800;padding:6px 14px;border-radius:10px;cursor:pointer;font-family:var(--font)" onclick="endGameConfirm()">Finalizar</button>
      </div>
    </div>

    <div style="background:linear-gradient(135deg,rgba(255,107,44,0.1),rgba(255,107,44,0.04));padding:20px 16px;border-bottom:1px solid var(--glass-border)">
      <div style="display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:8px;text-align:center;margin-bottom:16px">
        <div>
          <div style="font-size:12px;font-weight:700;color:var(--text-2);margin-bottom:4px">${teamName||'Gallardas'}</div>
          <div style="font-size:56px;font-weight:900;color:var(--primary);line-height:1" id="lvHomeScore">0</div>
        </div>
        <div style="font-size:22px;color:var(--text-3)">—</div>
        <div style="text-align:right">
            <div style="font-size:12px;color:rgba(255,255,255,0.6);font-weight:700;margin-bottom:4px">Rival</div>
            <div style="display:flex;align-items:center;gap:12px">
               <button onclick="awayAdj(-1)" style="width:30px;height:30px;border-radius:8px;background:var(--glass);border:1px solid var(--glass-border);color:white;font-size:18px;cursor:pointer;font-family:var(--font);display:flex;align-items:center;justify-content:center">−</button>
               <div id="lvAwayScore" style="font-size:48px;font-weight:900;color:white;line-height:1">0</div>
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
      <div style="display:flex;justify-content:center;margin-top:4px" id="teamBonus"></div>
    </div>

    <div id="liveFeedback" style="position:fixed;top:200px;left:50%;transform:translateX(-50%) translateY(4px);background:var(--primary);color:white;font-size:20px;font-weight:900;padding:7px 20px;border-radius:12px;opacity:0;transition:all 0.25s;z-index:50;pointer-events:none;box-shadow:var(--shadow-primary)"></div>

    <div style="padding:0 16px 16px">
      <div style="font-size:10px;color:var(--text-3);font-weight:800;text-transform:uppercase;letter-spacing:1px;margin-bottom:10px">Ubicación del tiro (Mapa de Calor)</div>
      <div id="shotCourt" style="width:100%;aspect-ratio:1.1;background:#1E293B;border-radius:16px;position:relative;border:2px solid var(--glass-border);overflow:hidden;cursor:crosshair">
        <svg viewBox="0 0 100 100" style="width:100%;height:100%;pointer-events:none">
          <rect x="0" y="0" width="100" height="100" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
          <path d="M 5,0 L 5,10 A 45 45 0 0 0 95,10 L 95,0" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="1.5"/>
          <rect x="35" y="0" width="30" height="40" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
          <circle cx="50" cy="40" r="15" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
          <circle cx="50" cy="10" r="2.5" fill="none" stroke="var(--primary)" stroke-width="2"/>
        </svg>
        <svg id="courtDynamicShots" viewBox="0 0 100 100" style="width:100%;height:100%;position:absolute;top:0;left:0;pointer-events:none"></svg>
      </div>
    </div>

    <div style="padding:0 16px 20px">
      <div style="font-size:10px;color:var(--text-3);font-weight:800;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px">Seleccionar Jugadora</div>
      <div style="display:flex;gap:8px;overflow-x:auto;padding-bottom:10px;scrollbar-width:none" id="playerQuickStats"></div>
    </div>

    <div style="background:var(--bg-card);border-radius:28px 28px 0 0;padding-top:16px;margin-top:0">
      <div style="padding:0 16px 12px;text-align:center">
         <span id="selPlayerLabel" style="font-size:16px;font-weight:900;color:var(--primary)">${players.find(p=>p.id===selPlayerId)?.name || 'Selecciona Jugadora'}</span>
      </div>
      <div class="stat-btn-grid">
        ${STAT_BTNS.map(b => `
          <div class="stat-btn" data-stat="${b.stat}"
            onclick="addStat(selPlayerId,'${b.stat}')">
            <div class="stat-btn-icon">${b.icon}</div>
            <div class="stat-btn-count" id="cnt_${b.stat}">0</div>
            <div class="stat-btn-label">${b.label}</div>
          </div>`).join('')}
      </div>
    </div>`;

  setupEventListeners();
  refreshLiveUI();

  // Abrir modal de quinteto si es el inicio del partido
  if (timerSec === 0) {
    setTimeout(() => window.openStartingFiveModal(), 400);
  }

  window.selPlayerId = selPlayerId;
  window.addStat     = addStat;

  window.selectPlayer = (pid, btn) => {
    selPlayerId = pid; window.selPlayerId = pid;
    const pl = players.find(p => p.id === pid);
    const lbl = document.getElementById('selPlayerLabel');
    if (lbl && pl) lbl.textContent = pl.name;
    refreshLiveUI();
  };

  window.awayAdj = (d) => {
    awayScore = Math.max(0, awayScore + d);
    document.getElementById('lvAwayScore').textContent = awayScore;
    if (d > 0) updatePlusMinus(d, false);
  };

  window.nextQuarter = () => {
    if (timerOn) window.toggleTimer();
    quarter++;
    teamFouls = 0;
    timerSec = 0;
    const el = document.getElementById('lvQuarter');
    if (el) el.textContent = 'Q' + quarter;
    const tEl = document.getElementById('lvTimer');
    if (tEl) tEl.textContent = '00:00';
    showToast(`Empezando Cuarto ${quarter}. Bonus reseteado.`, 'info');
    refreshLiveUI();
    syncLiveToFirebase();
  };

  window.toggleTimer = () => {
    const onCourtCount = players.filter(p => liveStats[p.id].onCourt).length;
    if (onCourtCount !== 5 && !timerOn && timerSec === 0) {
      showToast('Debes seleccionar el quinteto inicial primero', 'warning');
      window.openStartingFiveModal();
      return;
    }

    timerOn = !timerOn;
    const btn = document.getElementById('lvTimerBtn');
    if (timerOn) {
      if (btn) btn.textContent = '⏸ Pausar';
      timerInt = setInterval(() => {
        timerSec++;
        players.forEach(p => { if (liveStats[p.id].onCourt) liveStats[p.id].mins++; });
        const el = document.getElementById('lvTimer');
        if (el) el.textContent = fmtTimer(timerSec);
        if (timerSec % 10 === 0) syncLiveToFirebase();
      }, 1000);
    } else {
      if (btn) btn.textContent = '▶ Reanudar';
      clearInterval(timerInt);
      syncLiveToFirebase();
    }
  };

  window.openStartingFiveModal = () => {
    const selected = new Set();
    players.forEach(p => { if (liveStats[p.id].onCourt) selected.add(p.id); });

    openModal(`
      <div class="modal-sheet" style="max-height:90vh">
        <div class="modal-handle"></div>
        <div class="modal-title">Quinteto Inicial</div>
        <div class="modal-body" style="padding-bottom:28px">
          <p style="font-size:12px;color:var(--text-3);margin-bottom:16px;text-align:center">Selecciona las 5 jugadoras que inician el partido</p>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:20px" id="s5grid">
            ${players.map(p => `
              <div class="s5-card ${selected.has(p.id)?'active':''}" id="s5_${p.id}" onclick="toggleS5Selection('${p.id}')">
                <div style="font-weight:900;color:var(--primary)">${p.number||'00'}</div>
                <div style="font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${p.name.split(' ')[0]}</div>
              </div>
            `).join('')}
          </div>
          <button class="btn-full btn-primary-full" id="confirmS5Btn" onclick="confirmStartingFive()">Confirmar Quinteto (0/5)</button>
        </div>
      </div>
    `);

    window.toggleS5Selection = (pid) => {
      if (selected.has(pid)) selected.delete(pid);
      else if (selected.size < 5) selected.add(pid);
      else { showToast('Máximo 5 jugadoras','info'); return; }
      
      document.querySelectorAll('.s5-card').forEach(c => c.classList.remove('active'));
      selected.forEach(id => document.getElementById('s5_'+id).classList.add('active'));
      const btn = document.getElementById('confirmS5Btn');
      if (btn) {
        btn.textContent = `Confirmar Quinteto (${selected.size}/5)`;
        btn.style.opacity = selected.size === 5 ? '1' : '0.5';
      }
    };

    window.confirmStartingFive = () => {
      if (selected.size !== 5) { showToast('Selecciona exactamente 5 jugadoras','warning'); return; }
      players.forEach(p => {
        liveStats[p.id].onCourt = selected.has(p.id);
        if (selected.has(p.id)) liveStats[p.id].isStarter = true;
      });
      _closeModal();
      refreshLiveUI();
      showToast('Quinteto inicial confirmado ✓','success');
    };

    // Estilo temporal para el grid
    const s = document.createElement('style');
    s.innerHTML = `
      .s5-card { background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-radius:12px; padding:12px; text-align:center; cursor:pointer; transition:all 0.2s; }
      .s5-card.active { border-color:var(--primary); background:rgba(255,107,44,0.1); }
    `;
    document.head.appendChild(s);
  };

  window.forceSubstitution = (expelledId) => {
    const expelled = players.find(p => p.id === expelledId);
    const bench = players.filter(p => !liveStats[p.id].onCourt && liveStats[p.id].pf < 5);
    
    if (bench.length === 0) {
      showToast('No hay jugadoras disponibles en el banquillo para sustituir', 'error');
      liveStats[expelledId].onCourt = false;
      refreshLiveUI();
      return;
    }

    openModal(`
      <div class="modal-sheet">
        <div class="modal-handle"></div>
        <div class="modal-title" style="color:var(--danger)">Sustitución Obligatoria</div>
        <div class="modal-body" style="padding-bottom:28px; text-align:center">
          <p style="font-size:13px;margin-bottom:20px;opacity:0.8"><b>${expelled.name}</b> ha sido expulsada. Selecciona quién entra en su lugar:</p>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:20px">
            ${bench.map(p => `
              <div class="s5-card" onclick="applyExpulsionSwap('${expelledId}', '${p.id}')">
                <div style="font-weight:900;color:var(--primary)">${p.number||'00'}</div>
                <div style="font-size:11px">${p.name.split(' ')[0]}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `);

    window.applyExpulsionSwap = (oldId, newId) => {
      liveStats[oldId].onCourt = false;
      liveStats[newId].onCourt = true;
      _closeModal();
      refreshLiveUI();
      showToast('Sustitución realizada tras expulsión ✓', 'success');
      syncLiveToFirebase();
    };
  };

  window.endGameConfirm = async () => {
    clearInterval(timerInt);
    const hs = homeScore();
    const as_ = awayScore;
    if (!confirm(`¿Finalizar partido? Resultado: ${hs} - ${as_}`)) return;
    
    showToast('Calculando estadísticas y MVP...', 'info');
    
    let mvp = null;
    let maxVal = -999;
    
    const playersStatsUpdates = players.map(p => {
      const s = liveStats[p.id];
      const pts = (s.pts_1*1) + (s.pts_layup*2) + (s.pts_jump*2) + (s.pts_3*3);
      const val = calculateVal(s);
      if (val > maxVal) { maxVal = val; mvp = { id:p.id, name:p.name, val:val, pts:pts }; }
      return { id:p.id, stats: { ...s, pts, val } };
    });

    if (window._isPractice) {
       window._practiceData = { 
         playerStats: playersStatsUpdates.reduce((acc,p)=>{acc[p.id]=p.stats; return acc;}, {}), 
         mvp, 
         homeScore: hs, 
         awayScore: as_,
         teamId: teamId,
         teamName: teamName,
         players: players 
       };
       showToast('Simulacro finalizado. Datos no guardados en el club.','info');
       navigateTo('game-recap', { gameId: 'practice' }); 
       return;
    }

    if (!IS_DEMO_MODE && gameId) {
      try {
        await db.collection('games').doc(gameId).update({ 
          homeScore: hs, awayScore: as_, status: 'finished', 
          mvp: mvp, playerStats: playersStatsUpdates.reduce((acc,p)=>{acc[p.id]=p.stats; return acc;}, {}),
          lastUpdate: firebase.firestore.FieldValue.serverTimestamp()
        });

        for (const p of playersStatsUpdates) {
          const pRef = db.collection('players').doc(p.id);
          const pDoc = await pRef.get();
          if (pDoc.exists) {
            const old = pDoc.data().stats || {};
            const news = p.stats;
            const updated = {};
            Object.keys(news).forEach(k => {
              if (typeof news[k] === 'number') updated[k] = (old[k] || 0) + news[k];
            });
            updated.gp = (old.gp || 0) + 1;
            await pRef.update({ stats: updated });
          }
        }

        const tRef = db.collection('teams').doc(teamId);
        const tDoc = await tRef.get();
        if (tDoc.exists) {
          const tData = tDoc.data();
          await tRef.update({ 
            wins: (tData.wins || 0) + (hs > as_ ? 1 : 0), 
            losses: (tData.losses || 0) + (hs < as_ ? 1 : 0) 
          });
        }
        
        showToast('🚀 ¡Partido registrado con éxito en el Club!', 'success');
      } catch (err) {
        console.error(err);
        openModal(`
          <div style="padding:24px;text-align:center">
            <div style="font-size:40px;margin-bottom:15px">📡❌</div>
            <div style="font-size:18px;font-weight:900;color:white;margin-bottom:10px">¡Error de Sincronización!</div>
            <p style="font-size:13px;color:rgba(255,255,255,0.6);margin-bottom:20px">
              Parece que no hay internet. No cierres la app o se perderán los datos.
            </p>
            <button class="btn-full btn-primary-full" onclick="endGameConfirm()">🔄 Reintentar Registro</button>
          </div>
        `);
        return;
      }
    }
    navigateTo('game-recap', { gameId });
  };
}

// ===================== VIEW: GAME RECAP (POST-PARTIDO) =====================
async function renderGameRecap(container, { gameId }) {
  container.innerHTML = `<div class="loader"><div class="spinner"></div></div>`;
  
  let g, team, players;
  if (gameId === 'practice') {
    g = { ...window._practiceData, id: 'practice' };
    team = { name: g.teamName || 'Simulacro' };
    players = g.players || [];
  } else {
    const snap = await db.collection('games').doc(gameId).get();
    g = { id: snap.id, ...snap.data() };
    team = await db.collection('teams').doc(g.teamId).get().then(d => d.data());
    players = await db.collection('players').where('teamId', '==', g.teamId).get().then(s => s.docs.map(d => ({id:d.id,...d.data()})));
  }
  
  container.innerHTML = `
    <div style="background:var(--bg-dark);padding:12px 16px;display:flex;align-items:center;border-bottom:1px solid var(--glass-border);position:sticky;top:0;z-index:20">
      <button class="back-btn" style="margin:0" onclick="navigateTo('team-detail',{teamId:'${g.teamId}'})">‹ Salir</button>
      <div style="margin-left:auto;font-size:12px;font-weight:800;color:var(--text-3)">INFORME FINAL</div>
    </div>

    <div style="background:linear-gradient(180deg, rgba(255,107,44,0.1) 0%, transparent 100%);padding:40px 16px;text-align:center">
      <div style="font-size:12px;font-weight:900;color:var(--primary);letter-spacing:2px;margin-bottom:12px">RESULTADO FINAL</div>
      <div style="display:flex;align-items:center;justify-content:center;gap:20px">
        <div><div style="font-size:14px;font-weight:700;margin-bottom:4px;color:rgba(255,255,255,0.6)">${team.name}</div><div style="font-size:48px;font-weight:900;line-height:1">${g.homeScore}</div></div>
        <div style="font-size:24px;opacity:0.2">vs</div>
        <div><div style="font-size:14px;font-weight:700;margin-bottom:4px;color:rgba(255,255,255,0.6)">RIVAL</div><div style="font-size:48px;font-weight:900;line-height:1">${g.awayScore}</div></div>
      </div>
    </div>

    ${g.mvp ? `
    <div style="padding:0 16px 24px">
      <div style="background:linear-gradient(135deg,rgba(255,184,0,0.1),rgba(255,184,0,0.02));border:1px solid rgba(255,184,0,0.2);border-radius:24px;padding:24px;text-align:center">
        <div style="font-size:40px;margin-bottom:8px">👑</div>
        <div style="font-size:18px;font-weight:900;color:#FFB800;margin-bottom:4px">${g.mvp.name}</div>
        <div style="font-size:12px;color:rgba(255,184,0,0.8);font-weight:700">MVP DEL PARTIDO · VAL: ${g.mvp.val}</div>
      </div>
    </div>` : ''}

    <div style="padding:0 16px 24px">
      <div class="section-title" style="margin-bottom:12px;font-size:14px">INDICADORES DE ÉXITO 🚀</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
        ${(() => {
          let tFGM=0, tFGA=0, t3PM=0, tPaint=0, tAst=0, sPts=0, bPts=0;
          Object.keys(g.playerStats || {}).forEach(pid => {
            const s = g.playerStats[pid];
            const made = (s.pts_layup||0) + (s.pts_jump||0) + (s.pts_3||0);
            const missed = (s.miss_2||0) + (s.miss_3||0);
            tFGM += made; tFGA += (made + missed); t3PM += (s.pts_3||0);
            tPaint += (s.pts_layup||0) * 2;
            tAst += (s.ast||0);
            if (s.isStarter) sPts += (s.pts||0); else bPts += (s.pts||0);
          });
          const eFG = tFGA > 0 ? Math.round(((tFGM + 0.5 * t3PM) / tFGA) * 100) : 0;
          const astPct = tFGM > 0 ? Math.round((tAst / tFGM) * 100) : 0;

          return `
            <div class="stat-card" style="padding:16px;text-align:left;background:rgba(59,130,246,0.05);border:1px solid rgba(59,130,246,0.1)">
              <div style="font-size:24px;font-weight:900;color:#60A5FA">${eFG}%</div>
              <div style="font-size:10px;font-weight:800;opacity:0.6;margin-top:4px">EFECTIVIDAD REAL (eFG%)</div>
            </div>
            <div class="stat-card" style="padding:16px;text-align:left;background:rgba(34,197,94,0.05);border:1px solid rgba(34,197,94,0.1)">
              <div style="font-size:24px;font-weight:900;color:#4CAF50">${tPaint}</div>
              <div style="font-size:10px;font-weight:800;opacity:0.6;margin-top:4px">PUNTOS EN PINTURA</div>
            </div>
            <div class="stat-card" style="padding:16px;text-align:left;background:rgba(168,85,247,0.05);border:1px solid rgba(168,85,247,0.1)">
              <div style="font-size:24px;font-weight:900;color:#A855F7">${astPct}%</div>
              <div style="font-size:10px;font-weight:800;opacity:0.6;margin-top:4px">CANASTAS ASISTIDAS</div>
            </div>
            <div class="stat-card" style="padding:16px;text-align:left;background:rgba(255,107,44,0.05);border:1px solid rgba(255,107,44,0.1)">
              <div style="font-size:24px;font-weight:900;color:var(--primary)">${bPts}</div>
              <div style="font-size:10px;font-weight:800;opacity:0.6;margin-top:4px">PUNTOS DEL BANQUILLO</div>
            </div>
          `;
        })()}
      </div>
    </div>

    <div style="padding:0 16px 32px">
      <div class="section-title" style="margin-bottom:16px;font-size:14px">MAPA DE TIRO DEL PARTIDO 🎯</div>
      <div style="background:#1E293B;border-radius:24px;border:1px solid var(--glass-border);position:relative;aspect-ratio:1.1;overflow:hidden">
        <svg viewBox="0 0 100 100" style="width:100%;height:100%">
          <rect x="0" y="0" width="100" height="100" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
          <path d="M 5,0 L 5,10 A 45 45 0 0 0 95,10 L 95,0" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
          <circle cx="50" cy="10" r="2.5" fill="none" stroke="var(--primary)" stroke-width="1.5"/>
          ${Object.keys(g.playerStats || {}).map(pid => {
            const shots = g.playerStats[pid].shots || [];
            return shots.map(s => `<circle cx="${s.x}" cy="${s.y}" r="1.8" fill="${s.made?'#4CAF50':'#FF4444'}" style="opacity:0.8"/>`).join('');
          }).join('')}
        </svg>
      </div>
    </div>

    ${(['admin','coach','gestor'].includes(APP.userData?.role) || gameId === 'practice') ? `
    <div style="padding:16px">
      <div style="background:#0F172A;border:1px solid #1E293B;border-radius:24px;padding:20px;overflow:hidden">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:20px">
          <div style="width:36px;height:36px;background:rgba(255,255,255,0.1);border-radius:10px;display:flex;align-items:center;justify-content:center">👨‍🏫</div>
          <div style="font-size:14px;font-weight:900;color:white">ANÁLISIS TÉCNICO DETALLADO</div>
        </div>
        <div style="overflow-x:auto;margin:0 -20px;padding:0 20px">
          <table style="width:100%;font-size:11px;color:rgba(255,255,255,0.7);border-collapse:collapse;min-width:500px">
            <thead>
              <tr style="border-bottom:1px solid rgba(255,255,255,0.1);text-align:left;color:var(--text-3)">
                <th style="padding:10px 4px">JUGADORA</th>
                <th style="padding:10px 4px">MIN</th>
                <th style="padding:10px 4px">PTS</th>
                <th style="padding:10px 4px">REB</th>
                <th style="padding:10px 4px">AST</th>
                <th style="padding:10px 4px">FAL</th>
                <th style="padding:10px 4px;text-align:center">VAL</th>
                <th style="padding:10px 4px;text-align:center">+/-</th>
              </tr>
            </thead>
            <tbody>
              ${(() => {
                let tPts=0, tReb=0, tAst=0, tF=0, tVal=0, tMin=0;
                const rows = Object.keys(g.playerStats || {}).map(pid => {
                   const s = g.playerStats[pid];
                   const p = players.find(x => x.id === pid) || {name:'?'};
                   const val = calculateVal(s);
                   const reb = (s.reb_off||0) + (s.reb_def||0);
                   tPts += (s.pts||0); tReb += reb; tAst += (s.ast||0); tF += (s.pf||0); tVal += val; tMin += (s.mins||0);
                   
                   return `
                    <tr style="border-bottom:1px solid rgba(255,255,255,0.05)">
                      <td style="padding:14px 4px;font-weight:700;color:white">${p.name.split(' ')[0]}</td>
                      <td style="padding:14px 4px;opacity:0.6">${Math.floor((s.mins||0)/60)}'</td>
                      <td style="padding:14px 4px;font-weight:900;color:var(--primary)">${s.pts||0}</td>
                      <td style="padding:14px 4px">${reb}</td>
                      <td style="padding:14px 4px">${s.ast||0}</td>
                      <td style="padding:14px 4px">${s.pf||0}</td>
                      <td style="padding:14px 4px;text-align:center;font-weight:900;color:${val>15?'#4CAF50':'white'}">${val}</td>
                      <td style="padding:14px 4px;text-align:center;font-weight:700;color:${s.plusMinus>0?'#4CAF50':(s.plusMinus<0?'#FF4444':'white')}">${s.plusMinus>0?'+':''}${s.plusMinus}</td>
                    </tr>`;
                }).join('');
                
                return rows + `
                  <tr style="background:rgba(255,255,255,0.03);font-weight:900;color:white">
                    <td style="padding:14px 4px">TOTAL EQUIPO</td>
                    <td style="padding:14px 4px">${Math.floor(tMin/60)}'</td>
                    <td style="padding:14px 4px;color:var(--primary)">${tPts}</td>
                    <td style="padding:14px 4px">${tReb}</td>
                    <td style="padding:14px 4px">${tAst}</td>
                    <td style="padding:14px 4px">${tF}</td>
                    <td style="padding:14px 4px;text-align:center">${tVal}</td>
                    <td style="padding:14px 4px;text-align:center">-</td>
                  </tr>`;
              })()}
            </tbody>
          </table>
        </div>
      </div>
    </div>` : ''}

    <div style="padding:20px 16px 40px">
       <button class="btn-full btn-primary-full" onclick="navigateTo('team-detail',{teamId:'${g.teamId}'})">${gameId==='practice'?'Terminar simulacro':'Volver a plantilla'}</button>
    </div>
  `;
}

// ===================== VIEW: GAME LIVE (VIEW ONLY FOR PARENTS) =====================
async function renderGameLiveViewOnly(container, { gameId, teamName }) {
  container.innerHTML = `
    <div style="background:var(--bg-dark);padding:12px 16px;display:flex;align-items:center;border-bottom:1px solid var(--glass-border);position:sticky;top:0;z-index:20">
      <button class="back-btn" style="margin:0" onclick="goBack()">‹ Volver</button>
      <div style="margin-left:auto;display:flex;align-items:center" class="live-badge"><div class="live-dot"></div>&nbsp;EN VIVO</div>
    </div>
    <div class="loader"><div class="spinner"></div></div>`;

  if (IS_DEMO_MODE) {
    container.innerHTML = `<div class="empty-state">Modo demo activo. Configura Firebase para ver partidos en vivo.</div>`;
    return;
  }

  const unsubscribe = db.collection('games').doc(gameId).onSnapshot(doc => {
    if (!doc.exists) return;
    const g = doc.data();
    if (g.status === 'finished') {
       unsubscribe();
       showToast('El partido ha finalizado', 'info');
       navigateTo('team-detail', { teamId: g.teamId });
       return;
    }

    const timerMin = Math.floor((g.timer||0)/60);
    const timerSec = (g.timer||0)%60;
    const fmtTime = `${String(timerMin).padStart(2,'0')}:${String(timerSec).padStart(2,'0')}`;

    const playersOn = (g.liveFouls || []).filter(p => p.on);
    const playersOff = (g.liveFouls || []).filter(p => !p.on);

    container.innerHTML = `
      <div style="background:var(--bg-dark);padding:12px 16px;display:flex;align-items:center;border-bottom:1px solid var(--glass-border);position:sticky;top:0;z-index:20">
        <button class="back-btn" style="margin:0" onclick="goBack()">‹ Volver</button>
        <div style="margin-left:auto;display:flex;align-items:center" class="live-badge"><div class="live-dot"></div>&nbsp;EN VIVO</div>
      </div>

      <div style="background:linear-gradient(135deg, var(--primary), #FF8A00);padding:32px 16px;text-align:center;color:white;box-shadow: 0 10px 30px rgba(0,0,0,0.3)">
        <div style="font-size:12px;font-weight:800;letter-spacing:2px;text-transform:uppercase;opacity:0.8;margin-bottom:20px">
           ${g.quarter === 'PR' ? 'PRÓRROGA' : 'CUARTO ' + (g.quarter||1)} &nbsp;•&nbsp; ${fmtTime}
        </div>
        <div style="display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:10px">
           <div>
             <div style="font-size:14px;font-weight:700;margin-bottom:8px">${teamName}</div>
             <div style="font-size:64px;font-weight:900;line-height:1">${g.homeScore||0}</div>
           </div>
           <div style="font-size:32px;opacity:0.4;font-weight:200">:</div>
           <div>
             <div style="font-size:14px;font-weight:700;margin-bottom:8px">RIVAL</div>
             <div style="font-size:64px;font-weight:900;line-height:1">${g.awayScore||0}</div>
           </div>
        </div>
      </div>

      <div style="padding:24px 16px 8px">
        <div class="section-title" style="font-size:14px;color:var(--primary)">🔥 EN PISTA</div>
      </div>
      <div style="padding:0 16px">
        ${playersOn.length ? playersOn.map(p => `
          <div style="background:var(--glass);border:1px solid var(--glass-border);padding:14px;border-radius:16px;margin-bottom:10px;display:flex;align-items:center;gap:12px">
            <div style="width:36px;height:36px;background:rgba(255,107,44,0.1);color:var(--primary);border-radius:10px;display:flex;align-items:center;justify-content:center;font-weight:900">#${p.number||'?'}</div>
            <div style="flex:1">
               <div style="font-weight:700;font-size:15px">${p.name}</div>
               <div style="display:flex;gap:4px;margin-top:4px">
                  ${Array(5).fill(0).map((_,i) => `
                    <div style="width:8px;height:8px;border-radius:50%;background:${i < p.pf ? (p.pf >= 4 ? 'var(--danger)' : 'var(--primary)') : 'rgba(255,255,255,0.1)'}"></div>
                  `).join('')}
               </div>
            </div>
            <div style="text-align:right">
               <div style="font-size:10px;color:var(--text-3);font-weight:700">FALTAS</div>
               <div style="font-size:16px;font-weight:900;color:${p.pf >= 4 ? 'var(--danger)' : 'var(--text-1)'}">${p.pf}/5</div>
            </div>
          </div>
        `).join('') : '<div style="padding:20px;text-align:center;color:var(--text-3);font-size:13px">Esperando rotación...</div>'}
      </div>

      <div style="padding:20px 16px 8px">
        <div class="section-title" style="font-size:14px;opacity:0.6">🛋️ BANQUILLO</div>
      </div>
      <div style="padding:0 16px">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
          ${playersOff.map(p => `
            <div style="background:rgba(255,255,255,0.03);padding:10px;border-radius:12px;display:flex;align-items:center;gap:8px">
              <div style="font-size:11px;font-weight:900;color:var(--text-3)">#${p.number||'?'}</div>
              <div style="font-size:13px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${p.name.split(' ')[0]}</div>
              <div style="margin-left:auto;font-size:11px;color:var(--text-3)">${p.pf}F</div>
            </div>
          `).join('')}
        </div>
      </div>
      <div style="height:32px"></div>
    `;
  });
  APP.currentUnsubscribe = unsubscribe;
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
      <button class="section-action" onclick="navigateTo('admin-compose')">✉️ Enviar</button>
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
          ${isAdmin ? `<div style="font-size:9px;color:var(--primary);font-weight:900;margin-top:4px;text-transform:uppercase">PARA: ${m.recipientId === 'all' ? 'TODO EL CLUB' : (m.targetName || m.recipientId)}</div>` : ''}
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
        <div style="font-size:15px;color:var(--text-1);line-height:1.75;white-space:pre-wrap">${m.body}</div>
        
        ${(APP.userData.role === 'admin' || (APP.userData.role === 'coach' && m.senderId === APP.userData.id)) ? `
          <div style="height:1px;background:var(--glass-border);margin:20px 0"></div>
          <div style="display:flex;gap:10px">
            <button class="btn-full btn-ghost-full" style="flex:1;font-size:13px;padding:8px" onclick="editContent('messages','${m.id}', \`${m.body.replace(/`/g, '')}\`)">📝 Editar</button>
            <button class="btn-full" style="flex:1;background:rgba(220,38,38,0.1);color:#ef4444;border:none;font-size:13px;padding:8px;border-radius:12px;font-weight:700" onclick="deleteMessage('${m.id}','${m.title}')">🗑️ Borrar</button>
          </div>
        ` : ''}
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
      <div class="settings-item">
        <div class="settings-icon" style="background:rgba(255,255,255,0.05)">📅</div>
        <div class="settings-text">
          <div class="settings-label">Nacimiento: ${u.birth ? fmtDate(u.birth) : 'No definida'}</div>
          <div class="settings-desc">${u.birth ? calcAge(u.birth) + ' años' : '---'}</div>
        </div>
      </div>
      ${u.guardian ? `
      <div class="settings-item">
        <div class="settings-icon" style="background:rgba(255,107,44,0.05)">🛡️</div>
        <div class="settings-text">
          <div class="settings-label">Tutor: ${u.guardian}</div>
          <div class="settings-desc">Tel: ${u.parentPhone}</div>
        </div>
      </div>` : ''}
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

    <div class="stats-grid" style="margin-bottom:24px">
      <div class="stat-card" onclick="navigateTo('admin-teams')">
        <div class="stat-value">🛡️</div>
        <div class="stat-label">Equipos</div>
      </div>
      <div class="stat-card" onclick="navigateTo('admin-users')">
        <div class="stat-value">👥</div>
        <div class="stat-label">Jugadores</div>
      </div>
      <div class="stat-card" onclick="navigateTo('admin-practice')">
        <div class="stat-value">📋</div>
        <div class="stat-label">Simulacro</div>
      </div>
      <div class="stat-card" onclick="navigateTo('admin-news')">
        <div class="stat-value">📢</div>
        <div class="stat-label">Noticias</div>
      </div>
    </div>

    <div class="admin-quick-grid">
      ${(isAdmin || APP.userData.role === 'gestor') ? `<div class="admin-quick-btn" onclick="navigateTo('admin-users')"><div class="admin-quick-icon">👥</div><div class="admin-quick-label">Gestión de Usuarios</div></div>` : ''}
      <div class="admin-quick-btn" onclick="navigateTo('admin-teams')"><div class="admin-quick-icon">🏀</div><div class="admin-quick-label">Equipos y Jugadores</div></div>
      <div class="admin-quick-btn" onclick="navigateTo('admin-compose')"><div class="admin-quick-icon">✉️</div><div class="admin-quick-label">Enviar Mensaje</div></div>
      <div class="admin-quick-btn" onclick="navigateTo('admin-news')"><div class="admin-quick-icon">📰</div><div class="admin-quick-label">Publicar Noticia</div></div>
      ${isAdmin ? `<div class="admin-quick-btn" onclick="navigateTo('admin-approvals')"><div class="admin-quick-icon" style="position:relative">📑<div id="approvalsBadge" style="display:none;position:absolute;top:-5px;right:-5px;background:var(--danger);color:white;font-size:10px;padding:2px 6px;border-radius:10px">0</div></div><div class="admin-quick-label">Aprobaciones Pendientes</div></div>` : ''}
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
  let allTeams = [];
  if (IS_DEMO_MODE) {
    users = [
      { name:'María García', role:'parent', teamName:'Benjamín Masc.' },
      { name:'Ana Martínez', role:'coach',  teamName:'Alevín Fem.' },
      { name:'Lucía Fdez',   role:'player', teamName:'Cadete Fem.' }
    ];
  } else {
    try {
      const [uSnap, tSnap] = await Promise.all([
        db.collection('users').get(),
        db.collection('teams').get()
      ]);
      users = uSnap.docs.map(d => ({ id:d.id, ...d.data() }));
      allTeams = tSnap.docs.map(d => ({ id:d.id, ...d.data() }));
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
      ${users.length ? users.map((u,i) => {
        const role = u.role || u.rol;
        let tNames = [];
        if (role === 'coach') {
          const tIds = u.teamIds || (u.teamId ? [u.teamId] : []);
          tNames = tIds.map(tid => allTeams.find(t => t.id === tid)?.name).filter(Boolean);
        } else if (u.teamId) {
          const tName = allTeams.find(t => t.id === u.teamId)?.name;
          if (tName) tNames.push(tName);
        }
        
        return `
        <div class="player-row user-filter-item" data-role="${role || ''}">
          <div class="avatar" style="width:42px;height:42px;font-size:17px;${avatarBg(i)}">${initials(u.name)}</div>
          <div class="player-info">
            <div class="player-name">${u.name}</div>
            <div class="player-meta">${roleLabelRaw(role)} ${tNames.length ? '· '+tNames.join(', ') : ''}</div>
          </div>
          <button style="background:none;border:none;color:var(--text-3);font-size:20px;cursor:pointer;padding:8px;z-index:99" onclick="editUser('${u.id}')">•••</button>
        </div>`;
      }).join('') : '<div class="empty-state">Sin usuarios</div>'}
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
              <label class="form-label">MI TELÉFONO PERSONAL</label>
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
              <select class="form-input" id="nuRole" onchange="updateTeamField(this.value)">
                <option value="player">Jugador/a</option>
                <option value="coach">Entrenador/a</option>
                <option value="admin">Administrador del club</option>
              </select>
            </div>
            <div class="form-group" id="nuTeamContainer">
              <label class="form-label" id="nuTeamLabel">EQUIPO</label>
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
    
    // Store teams for dynamic UI changes
    document.getElementById('nuTeamContainer').dataset.teams = JSON.stringify(teams);

    window.updateTeamField = (role) => {
      const container = document.getElementById('nuTeamContainer');
      const teams = JSON.parse(container.dataset.teams || '[]');
      
      if (role === 'coach') {
         container.innerHTML = `
            <label class="form-label">EQUIPOS ASIGNADOS</label>
            <select class="form-input" id="nuTeam" multiple style="height:100px;padding:8px">
               ${teams.map(t => `<option value="${t.id}">${t.name}</option>`).join('')}
            </select>
            <div style="font-size:10px;color:rgba(255,107,44,0.7);margin-top:4px;font-weight:700">Selección múltiple activada 🖱️ (Mantén Ctrl/Cmd)</div>
         `;
      } else {
         container.innerHTML = `
            <label class="form-label">EQUIPO</label>
            <select class="form-input" id="nuTeam">
               <option value="">Sin equipo</option>
               ${teams.map(t => `<option value="${t.id}">${t.name}</option>`).join('')}
            </select>
         `;
      }
      document.getElementById('nuPlayerExtra').style.display = (role === 'player') ? 'grid' : 'none';
    };

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
    const photo    = document.getElementById('nuPhotoInput').dataset.base64 || null;

    const teamEl = document.getElementById('nuTeam');
    let teamId = null;
    let teamIds = null;
    if (teamEl.multiple) {
      teamIds = Array.from(teamEl.selectedOptions).map(opt => opt.value).filter(val => val !== '');
      teamId = teamIds[0] || null;
    } else {
      teamId = teamEl.value || null;
      teamIds = teamId ? [teamId] : [];
    }

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

    const userDataObj = { 
      name, birthDate:birth, phone, photo, guardian: age<18?guardian:null, parentPhone: age<18?pPhone:null, 
      email, role, teamId, teamIds, active:true,
      createdAt:firebase.firestore.FieldValue.serverTimestamp()
    };

    if (APP.userData.role === 'gestor') {
       const proposal = {
          type: 'CREATE',
          targetCollection: 'users',
          name: name,
          data: { ...userDataObj, pass, pNum, pPos },
          requestedBy: APP.userData.name,
          requestedById: APP.userData.id,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
       };
       await db.collection('pending_approvals').add(proposal);
       _closeModal();
       showToast('Solicitud de creación enviada al Administrador','info');
       return;
    }

    if (!IS_DEMO_MODE) {
      try {
        const sec  = firebase.initializeApp(FIREBASE_CONFIG, `sec_${Date.now()}`);
        const nu   = await sec.auth().createUserWithEmailAndPassword(email,pass);
        const uid  = nu.user.uid;

        await db.collection('users').doc(uid).set(userDataObj);

        if (role === 'coach' && teamIds) {
          for (const tid of teamIds) {
            await db.collection('teams').doc(tid).update({ coachId: uid, coachName: name });
          }
        }

        if (role === 'player' && teamId) {
          await db.collection('players').add({
            uid, photo,
            name, age, birth, phone, number:parseInt(pNum), position:pPos, teamId,
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
    
    const birthVal = u.birth || u.birthDate || '';
    const ageVal = birthVal ? calcAge(birthVal) : 99;

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
            <input class="form-input" id="euBirth" type="date" value="${birthVal}" onchange="checkEditUserMinor(this.value)">
          </div>
          <div class="form-group" style="margin-bottom:12px">
            <label class="form-label">CORREO ELECTRÓNICO</label>
            <input class="form-input" id="euEmail" type="email" value="${u.email||''}" placeholder="correo@ejemplo.com">
          </div>
          <div class="form-group" style="margin-bottom:12px">
            <label class="form-label">CONTRASEÑA (Dejar en blanco para mantener)</label>
            <div style="display:flex;gap:8px">
              <input class="form-input" id="euPass" type="text" placeholder="Nueva contraseña..." style="flex:1">
              <button onclick="document.getElementById('euPass').value = genPassword()" style="flex-shrink:0;background:var(--glass);border:1px solid var(--glass-border);border-radius:12px;padding:0 14px;color:var(--text-1);font-size:13px;font-weight:700;cursor:pointer;font-family:var(--font)">Generar</button>
            </div>
          </div>
          
          <div class="form-group" style="margin-bottom:12px">
            <label class="form-label">TELÉFONO DE CONTACTO (USUARIO/A)</label>
            <input class="form-input" id="euPhone" type="tel" value="${u.phone||''}" maxlength="9" oninput="validatePhone(this)" placeholder="6XXXXXXXX">
          </div>

          <div id="euMinorField" style="display:${ageVal < 18 ? 'block' : 'none'};margin-bottom:16px;background:rgba(255,107,44,0.05);padding:14px;border-radius:12px;border:1px solid rgba(255,107,44,0.2)">
            <div style="font-size:11px;font-weight:900;color:var(--primary);margin-bottom:10px;text-transform:uppercase">Datos del representante (Menor de edad)</div>
            <div class="form-group" style="margin-bottom:12px">
              <label class="form-label" style="font-size:10px">NOMBRE DEL PADRE/MADRE/TUTOR</label>
              <input class="form-input" id="euGuardian" type="text" value="${u.guardian||''}">
            </div>
            <div class="form-group">
              <label class="form-label" style="font-size:10px">TELÉFONO DEL TUTOR (OBLIGATORIO)</label>
              <input class="form-input" id="euParentPhone" type="tel" value="${u.parentPhone||''}" maxlength="9" oninput="validatePhone(this)" placeholder="6XXXXXXXX">
            </div>
          </div>
          <div class="form-group" style="margin-bottom:12px">
            <label class="form-label">ROL</label>
            <select class="form-input" id="euRole" onchange="editUpdateTeamField(this.value)">
              <option value="player" ${u.role==='player'?'selected':''}>Jugador/a</option>
              <option value="coach" ${u.role==='coach'?'selected':''}>Entrenador/a</option>
              <option value="admin" ${u.role==='admin'?'selected':''}>Administrador</option>
              <option value="gestor" ${u.role==='gestor'?'selected':''}>Gestor</option>
            </select>
          </div>
          <div class="form-group" id="euTeamContainer" style="margin-bottom:12px"></div>
          
          <div style="margin:20px 0;padding:12px;background:rgba(255,255,255,0.03);border-radius:12px">
            <div style="font-size:11px;font-weight:900;margin-bottom:10px;color:rgba(255,255,255,0.4)">ZONA DE PELIGRO</div>
            <button class="btn-full btn-danger-full" style="background:#dc2626;color:white;border:none" onclick="deleteUser('${userId}')">Eliminar cuenta de usuario</button>
            <div style="font-size:10px;color:rgba(255,255,255,0.3);margin-top:8px;text-align:center">Esta acción no se puede deshacer. El usuario perderá el acceso.</div>
          </div>

          <button class="btn-full btn-primary-full" onclick="updateUser('${userId}')" style="margin-bottom:10px">Guardar cambios</button>
          <button class="btn-full btn-ghost-full" onclick="_closeModal()">Cancelar</button>
        </div>
      </div>`);
    window.editUpdateTeamField = (role) => {
      const container = document.getElementById('euTeamContainer');
      const teamsList = JSON.parse(container.dataset.teams);
      const userTId = container.dataset.userTeamId;
      const userTIds = JSON.parse(container.dataset.userTeamIds || '[]');

      if (role === 'coach') {
        container.innerHTML = `
          <label class="form-label">EQUIPOS ASIGNADOS</label>
          <select class="form-input" id="euTeam" multiple style="height:100px;padding:8px">
            ${teamsList.map(t => `<option value="${t.id}" ${(userTIds.includes(t.id) || userTId === t.id)?'selected':''}>${t.name}</option>`).join('')}
          </select>
          <div style="font-size:10px;color:rgba(255,107,44,0.7);margin-top:4px;font-weight:700">Selección múltiple (Ctrl/Cmd click) 🖱️</div>
        `;
      } else {
        container.innerHTML = `
          <label class="form-label">EQUIPO ASIGNADO</label>
          <select class="form-input" id="euTeam">
            <option value="">Sin equipo</option>
            ${teamsList.map(t => `<option value="${t.id}" ${userTId === t.id ? 'selected' : ''}>${t.name}</option>`).join('')}
          </select>
        `;
      }
    };

    const euCont = document.getElementById('euTeamContainer');
    euCont.dataset.teams = JSON.stringify(teams);
    euCont.dataset.userTeamId = u.teamId || '';
    euCont.dataset.userTeamIds = JSON.stringify(u.teamIds || []);
    editUpdateTeamField(u.role || u.rol || 'player');

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
    const email    = document.getElementById('euEmail').value.trim();
    const newPass  = document.getElementById('euPass').value.trim();
    const role     = document.getElementById('euRole').value;
    const teamEl = document.getElementById('euTeam');
    let teamId = null;
    let teamIds = null;
    if (teamEl.multiple) {
      teamIds = Array.from(teamEl.selectedOptions).map(opt => opt.value).filter(val => val !== '');
      teamId = teamIds[0] || null;
    } else {
      teamId = teamEl.value || null;
      teamIds = teamId ? [teamId] : [];
    }

    const guardian = document.getElementById('euGuardian').value.trim();
    const pPhone   = document.getElementById('euParentPhone').value.trim();

    if (phone.length !== 9) { showToast('El teléfono debe tener 9 números','error'); return; }
    if (!email.includes('@')) { showToast('Introduce un correo electrónico válido','error'); return; }
    
    const age = calcAge(birth);
    if (age < 18) {
      if (!guardian || !pPhone) { showToast('Datos del tutor obligatorios para menores','error'); return; }
      if (pPhone.length !== 9) { showToast('El teléfono del tutor debe tener 9 números','error'); return; }
    }

    const data = { 
      name, birth, birthDate: birth, phone, role, teamId, teamIds, email,
      guardian: age < 18 ? guardian : null,
      parentPhone: age < 18 ? pPhone : null
    };
    if (photo) data.photo = photo;
    if (newPass) data.requestedPassword = newPass;

    if (APP.userData.role === 'gestor') {
       const oldData = (await db.collection('users').doc(userId).get()).data();
       const proposal = {
          type: 'UPDATE',
          targetCollection: 'users',
          targetId: userId,
          name: name,
          newData: data,
          oldData: oldData,
          requestedBy: APP.userData.name,
          requestedById: APP.userData.id,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
       };
       await db.collection('pending_approvals').add(proposal);
       _closeModal();
       showToast('Solicitud de modificación enviada al Administrador','info');
       return;
    }

    if (!IS_DEMO_MODE) {
      const oldUserSnap = await db.collection('users').doc(userId).get();
      const oldData = oldUserSnap.data();
      await db.collection('users').doc(userId).update(data);

      // --- COACH SYNCHRONIZATION ---
      if (role === 'coach' || oldData.role === 'coach') {
        const oldTIds = oldData.teamIds || (oldData.teamId ? [oldData.teamId] : []);
        const newTIds = data.teamIds || (data.teamId ? [data.teamId] : []);

        // 1. Update name on ALL current teams if name changed
        if (data.name !== oldData.name) {
          for (const tid of newTIds) {
            await db.collection('teams').doc(tid).update({ coachName: data.name });
          }
        }

        // 2. Added teams: Set this coach
        const added = newTIds.filter(id => !oldTIds.includes(id));
        for (const tid of added) {
          await db.collection('teams').doc(tid).update({ coachId: userId, coachName: data.name });
        }

        // 3. Removed teams: Clear coach if it's still THIS coach
        const removed = oldTIds.filter(id => !newTIds.includes(id));
        for (const tid of removed) {
          const tDoc = await db.collection('teams').doc(tid).get();
          if (tDoc.exists && tDoc.data().coachId === userId) {
            await db.collection('teams').doc(tid).update({ coachId: null, coachName: '' });
          }
        }
      }

      const psnap = await db.collection('players').where('uid','==',userId).get();
      if (!psnap.empty) {
        psnap.forEach(d => {
          const updateObj = { 
            name: data.name, 
            teamId: data.teamId,
            birth: data.birth,
            phone: data.phone,
            guardian: data.guardian,
            parentPhone: data.parentPhone
          };
          if (data.photo) updateObj.photo = data.photo;
          d.ref.update(updateObj);
        });
      } else if (data.role === 'player' && data.teamId) {
        await db.collection('players').add({
          uid: userId, photo: data.photo || null,
          name: data.name, age: calcAge(data.birth), number: 0, position: 'Sin definir', teamId: data.teamId,
          guardian: data.guardian, parentPhone: data.parentPhone, active: true,
          stats: { pts:0, reb:0, ast:0, stl:0, blk:0, to:0, pf:0, reb_off:0, reb_def:0 },
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
      }
    }
    _closeModal();
    showToast('Usuario actualizado ✓','success');
    renderAdminUsers(document.getElementById('appMain'));
  };

  window.deleteUser = async (userId) => {
    if (!confirm('¿Estás COMPLETAMENTE SEGURO de querer eliminar este usuario? Perderá el acceso y se borrará su ficha de jugador para siempre.')) return;
    
    if (APP.userData.role === 'gestor') {
       const u = (await db.collection('users').doc(userId).get()).data();
       const proposal = {
          type: 'DELETE',
          targetCollection: 'users',
          targetId: userId,
          name: u.name,
          requestedBy: APP.userData.name,
          requestedById: APP.userData.id,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
       };
       await db.collection('pending_approvals').add(proposal);
       _closeModal();
       showToast('Solicitud de eliminación enviada al Administrador','info');
       return;
    }

    if (!IS_DEMO_MODE) {
      const uDoc = await db.collection('users').doc(userId).get();
      if (uDoc.exists) {
        const uData = uDoc.data();
        if (uData.role === 'coach') {
          const tIds = uData.teamIds || (uData.teamId ? [uData.teamId] : []);
          for (const tid of tIds) {
            const tDoc = await db.collection('teams').doc(tid).get();
            if (tDoc.exists && tDoc.data().coachId === userId) {
              await db.collection('teams').doc(tid).update({ coachId: null, coachName: '' });
            }
          }
        }
      }
      await db.collection('users').doc(userId).delete();
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
            <label class="form-label">ENTRENADOR/A</label>
            <select class="form-input" id="ntCoach">
              <option value="">Seleccionar entrenador/a...</option>
              ${coaches.map(c => `<option value="${c.id}" data-name="${c.name}">${c.name}</option>`).join('')}
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
              ${coaches.map(c => `<option value="${c.id}" data-name="${c.name}" ${team.coachId===c.id?'selected':''}>${c.name}</option>`).join('')}
            </select>
          </div>
          <button class="btn-full btn-primary-full" onclick="updateTeam('${teamId}')" style="margin-bottom:10px">Guardar cambios</button>
          <button class="btn-full btn-ghost-full" onclick="_closeModal()">Cancelar</button>
        </div>
      </div>`);
  };

  window.createTeam = async () => {
    const name   = document.getElementById('ntName').value.trim();
    const cat    = document.getElementById('ntCat').value;
    const gender = document.getElementById('ntGender').value;
    const cSel   = document.getElementById('ntCoach');
    const coachId = cSel.value;
    const coachName = coachId ? cSel.options[cSel.selectedIndex].dataset.name : '';

    if (!name) { showToast('El nombre es obligatorio','error'); return; }
    if (!IS_DEMO_MODE) {
      const teamRef = await db.collection('teams').add({ 
        name, category:cat, gender, coachId, coachName, 
        playerCount:0, wins:0, losses:0, active:true, 
        createdAt:firebase.firestore.FieldValue.serverTimestamp() 
      });
      
      if (coachId) {
        const uRef = db.collection('users').doc(coachId);
        const uDoc = await uRef.get();
        if (uDoc.exists) {
          const uData = uDoc.data();
          const tIds = uData.teamIds || (uData.teamId ? [uData.teamId] : []);
          if (!tIds.includes(teamRef.id)) {
            tIds.push(teamRef.id);
            await uRef.update({ teamIds: tIds, teamId: tIds[0] });
          }
        }
      }
    }
    _closeModal();
    showToast(`Equipo "${name}" creado ✓`,'success');
    renderAdminTeams(document.getElementById('appMain'));
  };

  window.updateTeam = async (teamId) => {
    const name   = document.getElementById('etName').value.trim();
    const cat    = document.getElementById('etCat').value;
    const gender = document.getElementById('etGender').value;
    const cSel   = document.getElementById('etCoach');
    const coachId = cSel.value;
    const coachName = coachId ? cSel.options[cSel.selectedIndex].dataset.name : '';

    if (!name) return;
    if (!IS_DEMO_MODE) {
      const oldTeam = (await db.collection('teams').doc(teamId).get()).data();
      const oldCoachId = oldTeam.coachId;

      await db.collection('teams').doc(teamId).update({ name, category:cat, gender, coachId, coachName });

      // Synchronize New Coach
      if (coachId && coachId !== oldCoachId) {
        const uRef = db.collection('users').doc(coachId);
        const uDoc = await uRef.get();
        if (uDoc.exists) {
          const tIds = uDoc.data().teamIds || (uDoc.data().teamId ? [uDoc.data().teamId] : []);
          if (!tIds.includes(teamId)) {
            tIds.push(teamId);
            await uRef.update({ teamIds: tIds, teamId: tIds[0] });
          }
        }
      }
      // Synchronize Old Coach (Remove team from their list)
      if (oldCoachId && oldCoachId !== coachId) {
        const uRef = db.collection('users').doc(oldCoachId);
        const uDoc = await uRef.get();
        if (uDoc.exists) {
          const tIds = (uDoc.data().teamIds || []).filter(id => id !== teamId);
          await uRef.update({ teamIds: tIds, teamId: tIds[0] || null });
        }
      }
    }
    _closeModal();
    showToast('Equipo actualizado ✓','success');
    renderAdminTeams(document.getElementById('appMain'));
  };

  window.showAddPlayerModal = async (teamId) => {
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
              ${users.map(u => `<option value="${u.id}" data-birth="${u.birth||''}" data-guardian="${u.guardian||''}" data-parent-phone="${u.parentPhone||''}" data-name="${u.name}">${u.name} (${u.email})</option>`).join('')}
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
      await db.collection('users').doc(uid).update({ teamId });
      const psnap = await db.collection('players').where('uid','==',uid).get();
      const pData = {
        uid, name, age, number:num, position:pos, teamId,
        guardian: age < 18 ? guardian : null,
        active:true,
        stats:{ pts:0, reb:0, ast:0, stl:0, blk:0, to:0, pf:0, reb_off:0, reb_def:0 },
        updatedAt:firebase.firestore.FieldValue.serverTimestamp()
      };

      if (!psnap.empty) {
        await psnap.docs[0].ref.update({ name, age, birth, number:num, position:pos, teamId, guardian, parentPhone: age < 18 ? opt.dataset.parentPhone || '' : null, active:true });
      } else {
        pData.birth = birth;
        pData.parentPhone = age < 18 ? opt.dataset.parentPhone || '' : null;
        pData.createdAt = firebase.firestore.FieldValue.serverTimestamp();
        await db.collection('players').add(pData);
      }
    }
    
    _closeModal();
    showToast(`${name} añadido a la plantilla ✓`,'success');
    navigateTo('team-detail', { teamId });
  };

window.showEditPlayerModal = async (playerId, teamId) => {
    const p = IS_DEMO_MODE ? DEMO_DATA.players.find(x => x.id === playerId)
                           : await db.collection('players').doc(playerId).get().then(d => ({id:d.id, ...d.data()}));
    if (!p) return;

    openModal(`
      <div class="modal-sheet">
        <div class="modal-handle"></div>
        <div class="modal-title">Editar Jugador/a</div>
        <div class="modal-body" style="padding-bottom:28px">
          
          <div class="form-group" style="margin-bottom:12px">
            <label class="form-label">NOMBRE</label>
            <input class="form-input" type="text" value="${p.name}" disabled style="opacity:0.6">
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:20px">
            <div class="form-group">
              <label class="form-label">DORSAL</label>
              <input class="form-input" id="epNum" type="number" value="${p.number || 0}" min="0" max="99">
            </div>
            <div class="form-group">
              <label class="form-label">POSICIÓN</label>
              <select class="form-input" id="epPos">
                <option value="Sin definir" ${p.position === 'Sin definir' ? 'selected' : ''}>Sin definir</option>
                <option ${p.position === 'Base' ? 'selected' : ''}>Base</option>
                <option ${p.position === 'Escolta' ? 'selected' : ''}>Escolta</option>
                <option ${p.position === 'Alero' ? 'selected' : ''}>Alero</option>
                <option ${p.position === 'Ala-Pívot' ? 'selected' : ''}>Ala-Pívot</option>
                <option ${p.position === 'Pívot' ? 'selected' : ''}>Pívot</option>
              </select>
            </div>
          </div>
          
          <div style="margin-bottom:20px;padding:12px;background:rgba(255,255,255,0.03);border-radius:12px">
            <div style="font-size:11px;font-weight:900;margin-bottom:10px;color:rgba(255,255,255,0.4)">OPCIONES DE FICHA</div>
            <button class="btn-full" style="background:rgba(220,38,38,0.1);color:#ef4444;border:none;margin-bottom:8px" onclick="removePlayerFromTeam('${playerId}','${teamId}')">Quitar del equipo</button>
            <div style="font-size:10px;color:rgba(255,255,255,0.3);text-align:center">Se mantendrá el usuario pero dejará de aparecer en este equipo.</div>
          </div>

          <button class="btn-full btn-primary-full" onclick="updatePlayerStatsInfo('${playerId}','${teamId}')" style="margin-bottom:10px">Guardar cambios</button>
          <button class="btn-full btn-ghost-full" onclick="_closeModal()">Cancelar</button>
        </div>
      </div>`);
};

window.updatePlayerStatsInfo = async (playerId, teamId) => {
    const num = parseInt(document.getElementById('epNum').value) || 0;
    const pos = document.getElementById('epPos').value;

    if (!IS_DEMO_MODE) {
        await db.collection('players').doc(playerId).update({
            number: num,
            position: pos,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
    }
    _closeModal();
    showToast('Ficha de jugador actualizada ✓', 'success');
    navigateTo('team-detail', { teamId });
};

window.removePlayerFromTeam = async (playerId, teamId) => {
    if (!confirm('¿Quitar a este jugador del equipo?')) return;
    
    if (!IS_DEMO_MODE) {
        const p = (await db.collection('players').doc(playerId).get()).data();
        await db.collection('players').doc(playerId).delete();
        if (p.uid) {
            await db.collection('users').doc(p.uid).update({ teamId: null });
        }
    }
    _closeModal();
    showToast('Jugador quitado del equipo', 'success');
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
            ${['admin','coach'].includes(APP.userData.role) ? `
              <option value="all">📢 Todos los usuarios del club</option>
              ${teams.map(t => `<option value="team_${t.id}">👥 ${t.name} (y sus familias)</option>`).join('')}
            ` : `
              <option value="admins">🏢 Administración del Club</option>
              ${APP.userData.teamId ? `<option value="coach_${APP.userData.teamId}">📋 Entrenador/a de mi equipo</option>` : ''}
            `}
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
    if (!IS_DEMO_MODE) await db.collection('messages').add({ title:sub, body, recipientId:to, senderId:APP.userData.id, from:APP.userData.name, important:imp, read:false, date:firebase.firestore.FieldValue.serverTimestamp() });
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

async function renderAdminNews(container) {
  let selIcon = '📣';
  const teams = await getTeams();
  container.innerHTML = `
    <button class="back-btn" onclick="goBack()">‹ Panel Admin</button>
    <div class="section-header">
      <div><div class="section-title">Nueva publicación</div><div class="section-subtitle">Gestiona noticias y fotos</div></div>
    </div>
    <div class="card">
      <div class="card-body">
        
        <div style="display:flex;align-items:center;gap:16px;margin-bottom:20px;padding:12px;background:rgba(255,255,255,0.03);border-radius:16px;border:1px solid rgba(255,255,255,0.05)">
          <div id="newsPhotoPreview" style="width:70px;height:70px;border-radius:12px;background:var(--glass);display:flex;align-items:center;justify-content:center;font-size:24px;border:2px dashed rgba(255,255,255,0.2);overflow:hidden;flex-shrink:0">📸</div>
          <div style="flex:1">
            <label class="form-label" style="margin-bottom:4px">FOTO DEL EVENTO/EQUIPO</label>
            <input type="file" id="newsPhotoInput" accept="image/*" style="font-size:12px;color:rgba(255,255,255,0.5)" onchange="previewPhoto(this, 'newsPhotoPreview')">
          </div>
        </div>

        <div class="form-group" style="margin-bottom:14px">
          <label class="form-label" style="font-size:11px">ENVIAR A:</label>
          <select class="form-input" id="newsTarget" style="-webkit-appearance:none">
            <option value="all">📢 Todo el Club (Público)</option>
            ${teams.map(t => `<option value="${t.id}">👥 Solo al ${t.name}</option>`).join('')}
          </select>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px">
          <div class="form-group">
            <label class="form-label" style="font-size:11px">ÍCONO</label>
            <select class="form-input" id="newsIcon">
              ${['📣','🏆','🏀','📅','⚡','🎉','📢','ℹ️','🌟'].map(ic => `<option>${ic}</option>`).join('')}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label" style="font-size:11px">CATEGORÍA</label>
            <select class="form-input" id="newsCat">
              ${['Resultado','Club','Torneo','FOTOS','Aviso','Próximo'].map(c=>`<option>${c}</option>`).join('')}
            </select>
          </div>
        </div>

        <div class="form-group" style="margin-bottom:14px">
          <label class="form-label" style="font-size:11px">TÍTULO</label>
          <input class="form-input" id="newsTitle" type="text" placeholder="Ej: ¡Campeones de Copa!">
        </div>
        <div class="form-group" style="margin-bottom:20px">
          <label class="form-label" style="font-size:11px">CONTENIDO</label>
          <textarea class="form-input" id="newsBody" rows="5" placeholder="Cuéntanos qué ha pasado…" style="resize:none;line-height:1.6"></textarea>
        </div>
        <button class="btn-full btn-primary-full" onclick="publishNews()">📰 Publicar en la App</button>
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
    const target= document.getElementById('newsTarget').value;
    const icon  = document.getElementById('newsIcon').value;
    const photo = document.getElementById('newsPhotoInput').dataset.base64 || null;

    if (!title||!body) { showToast('Completa título y contenido','error'); return; }
    
    if (!IS_DEMO_MODE) {
      await db.collection('news').add({ 
        icon, category:cat, title, body, target, photo,
        authorId:APP.userData.id, authorName:APP.userData.name,
        date:firebase.firestore.FieldValue.serverTimestamp() 
      });
    }
    showToast('¡Noticia publicada con éxito! ✓','success');
    goBack();
  };
}

// ===================== VIEW: ADMIN PRACTICE (SIMULACRO) =====================
async function renderAdminPractice(container) {
  const teams = await getTeams();
  container.innerHTML = `
    <button class="back-btn" onclick="goBack()">‹ Volver</button>
    <div class="section-header">
      <div><div class="section-title">Modo Simulacro</div><div class="section-subtitle">Practica sin afectar a las estadísticas</div></div>
    </div>
    <div style="padding:0 16px 20px">
       <div style="background:rgba(255,184,0,0.1);border:1px solid rgba(255,184,0,0.2);padding:14px;border-radius:12px;color:#FFB800;font-size:13px;line-height:1.5">
         ⚠️ <b>¿Cómo funciona?</b> Selecciona un equipo y anota como si fuera un partido real. Al terminar, verás los informes tácticos pero <b>los puntos no se sumarán</b> a los perfiles de los jugadores.
       </div>
    </div>
    <div style="padding:0 16px">
      <div style="font-size:11px;font-weight:800;color:var(--text-3);text-transform:uppercase;letter-spacing:1px;margin-bottom:12px">Elige un equipo para practicar</div>
      <div class="card">
        ${teams.map(t => `
          <div class="list-item" onclick="startPractice('${t.id}','${t.name}')">
            <div style="font-weight:700">🏀 ${t.name}</div>
            <div style="font-size:12px;color:var(--text-3)">Pincha para empezar simulacro ›</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  window.startPractice = (teamId, teamName) => {
    navigateTo('game-live', { teamId, teamName, gameId: 'practice', isPractice: true });
  };
}

// ===================== VIEW: ADMIN APPROVALS =====================
async function renderAdminApprovals(container) {
  container.innerHTML = `<button class="back-btn" onclick="goBack()">‹ Panel Admin</button><div class="loader"><div class="spinner"></div></div>`;
  const snap = await db.collection('pending_approvals').orderBy('timestamp','desc').get();
  const reqs = snap.docs.map(d => ({id:d.id, ...d.data()}));

  container.innerHTML = `
    <button class="back-btn" onclick="goBack()">‹ Panel Admin</button>
    <div class="section-header">
      <div><div class="section-title">Aprobaciones</div><div class="section-subtitle">Peticiones de Gestores</div></div>
    </div>
    <div id="approvalsList" style="padding:0 16px 80px">
      ${reqs.length ? reqs.map(r => `
        <div class="card" style="margin-bottom:16px;border:1px solid rgba(255,255,255,0.05);position:relative">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
            <span style="font-size:10px;font-weight:900;color:var(--primary);letter-spacing:1px;background:rgba(255,107,44,0.1);padding:4px 8px;border-radius:6px">${r.type}</span>
            <span style="font-size:10px;opacity:0.5">${r.timestamp?.toDate().toLocaleString() || ''}</span>
          </div>
          <div style="font-size:14px;font-weight:800;margin-bottom:8px">${r.name}</div>
          <div style="font-size:11px;opacity:0.6;margin-bottom:12px">Solicitado por: <b>${r.requestedBy}</b></div>
          
          <div style="background:var(--bg-dark);padding:12px;border-radius:12px;font-family:monospace;font-size:11px;border:1px solid rgba(255,255,255,0.05);margin-bottom:16px;max-height:200px;overflow-y:auto">
            ${renderDiffLocal(r)}
          </div>

          <div style="display:flex;gap:10px">
            <button class="btn-full btn-ghost-full" style="flex:1" onclick="rejectApproval('${r.id}')">Rechazar</button>
            <button class="btn-full btn-primary-full" style="flex:1;background:#22c55e" onclick="approveRequest('${r.id}')">Aprobar</button>
          </div>
        </div>
      `).join('') : '<div class="empty-state">No hay solicitudes pendientes</div>'}
    </div>`;

  function renderDiffLocal(r) {
    if (r.type === 'CREATE') return `<div style="color:#22c55e">✓ Nuevo usuario: ${r.data.email}<br>✓ Rol: ${r.data.role}</div>`;
    if (r.type === 'DELETE') return `<div style="color:var(--danger)">⚠️ ELIMINAR CUENTA COMPLETAMENTE</div>`;
    
    return Object.keys(r.newData).map(k => {
      if (JSON.stringify(r.newData[k]) !== JSON.stringify(r.oldData[k])) {
        return `<div style="margin-bottom:6px"><b>${k.toUpperCase()}:</b><br><span style="text-decoration:line-through;color:var(--danger)">${r.oldData[k] || '(vacío)'}</span><br><span style="color:#22c55e">${r.newData[k]}</span></div>`;
      }
      return '';
    }).join('');
  }

  window.rejectApproval = async (id) => {
    if (!confirm('¿Rechazar esta solicitud? Se eliminará de la lista.')) return;
    await db.collection('pending_approvals').doc(id).delete();
    renderAdminApprovals(container);
    showToast('Solicitud rechazada y eliminada','info');
  };

  window.approveRequest = async (id) => {
    const r = (await db.collection('pending_approvals').doc(id).get()).data();
    showToast('Procesando aprobación...', 'info');

    try {
      if (r.type === 'CREATE') {
        const d = r.data;
        const sec = firebase.initializeApp(FIREBASE_CONFIG, `approve_${Date.now()}`);
        const nu = await sec.auth().createUserWithEmailAndPassword(d.email, d.pass);
        const uid = nu.user.uid;

        await db.collection('users').doc(uid).set({ 
          name:d.name, birthDate:d.birthDate, birth:d.birthDate, phone:d.phone, photo:d.photo, guardian:d.guardian, parentPhone:d.parentPhone,
          email:d.email, role:d.role, teamId:d.teamId, active:true, createdAt:firebase.firestore.FieldValue.serverTimestamp() 
        });

        if (d.role === 'player' && d.teamId) {
          await db.collection('players').add({
            uid, photo:d.photo, name:d.name, age:calcAge(d.birthDate), birth:d.birthDate, number:parseInt(d.pNum), position:d.pPos, teamId:d.teamId,
            guardian:d.guardian, parentPhone:d.parentPhone, active:true, stats:{pts:0,reb:0,ast:0,stl:0,blk:0,to:0,pf:0,reb_off:0,reb_def:0},
            createdAt:firebase.firestore.FieldValue.serverTimestamp()
          });
        }
        if (d.role === 'coach' && d.teamIds) {
          for (const tid of d.teamIds) {
            await db.collection('teams').doc(tid).update({ coachId: uid, coachName: d.name });
          }
        }
        await sec.auth().signOut();
        await sec.delete();
      } 
      else if (r.type === 'UPDATE') {
        const oldUserSnap = await db.collection('users').doc(r.targetId).get();
        const oldData = oldUserSnap.data();
        await db.collection('users').doc(r.targetId).update(r.newData);

        // Coach Sync in Approval
        const role = r.newData.role;
        const name = r.newData.name;
        if (role === 'coach' || oldData.role === 'coach') {
          const oldTIds = oldData.teamIds || (oldData.teamId ? [oldData.teamId] : []);
          const newTIds = r.newData.teamIds || (r.newData.teamId ? [r.newData.teamId] : []);

          if (name !== oldData.name) {
            for (const tid of newTIds) await db.collection('teams').doc(tid).update({ coachName: name });
          }
          const added = newTIds.filter(id => !oldTIds.includes(id));
          for (const tid of added) await db.collection('teams').doc(tid).update({ coachId: r.targetId, coachName: name });
          
          const removed = oldTIds.filter(id => !newTIds.includes(id));
          for (const tid of removed) {
            const tDoc = await db.collection('teams').doc(tid).get();
            if (tDoc.exists && tDoc.data().coachId === r.targetId) {
              await db.collection('teams').doc(tid).update({ coachId: null, coachName: '' });
            }
          }
        }

        const psnap = await db.collection('players').where('uid','==',r.targetId).get();
        if (!psnap.empty) {
          psnap.forEach(d => {
            const up = { name:r.newData.name, teamId:r.newData.teamId, birth:r.newData.birth, guardian:r.newData.guardian, parentPhone:r.newData.parentPhone };
            if (r.newData.photo) up.photo = r.newData.photo;
            d.ref.update(up);
          });
        } else if (r.newData.role === 'player' && r.newData.teamId) {
          await db.collection('players').add({
            uid: r.targetId, photo: r.newData.photo || null,
            name: r.newData.name, age: calcAge(r.newData.birth), birth: r.newData.birth, number: 0, position: 'Sin definir', teamId: r.newData.teamId,
            guardian: r.newData.guardian || null, parentPhone: r.newData.parentPhone || null, active: true,
            stats: { pts:0, reb:0, ast:0, stl:0, blk:0, to:0, pf:0, reb_off:0, reb_def:0 },
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
          });
        }
      }
      else if (r.type === 'DELETE') {
        await db.collection('users').doc(r.targetId).delete();
        const psnap = await db.collection('players').where('uid','==',r.targetId).get();
        psnap.forEach(d => d.ref.delete());
      }
      else if (r.type === 'DELETE_NEWS' || r.type === 'DELETE_MESSAGE') {
        await db.collection(r.targetCollection).doc(r.targetId).delete();
      }

      await db.collection('pending_approvals').doc(id).delete();
      showToast('¡Solicitud aprobada y ejecutada!','success');
      renderAdminApprovals(container);
    } catch(e) {
      showToast('Error al aprobar: ' + e.message, 'error');
    }
  };
}

// Global actions for News and Messages
window.deleteNews = async (id, title) => {
  if (APP.userData.role === 'admin') {
    if (confirm('¿Eliminar esta noticia?')) {
      if (!IS_DEMO_MODE) await db.collection('news').doc(id).delete();
      showToast('Noticia eliminada', 'success');
      navigateTo('home');
    }
  } else if (APP.userData.role === 'coach') {
    if (confirm('¿Solicitar a un Administrador que borre esta noticia?')) {
      if (!IS_DEMO_MODE) await db.collection('pending_approvals').add({
        type: 'DELETE_NEWS', targetCollection: 'news', targetId: id, name: title,
        requestedBy: APP.userData.name, requestedById: APP.userData.id, timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
      showToast('Solicitud enviada al Administrador', 'info');
    }
  }
};

window.deleteMessage = async (id, title) => {
  if (APP.userData.role === 'admin') {
    if (confirm('¿Retirar este mensaje para todos?')) {
      if (!IS_DEMO_MODE) await db.collection('messages').doc(id).delete();
      showToast('Mensaje retirado', 'success');
      goBack();
    }
  } else if (APP.userData.role === 'coach') {
    if (confirm('¿Solicitar a un Administrador que retire este mensaje?')) {
      if (!IS_DEMO_MODE) await db.collection('pending_approvals').add({
        type: 'DELETE_MESSAGE', targetCollection: 'messages', targetId: id, name: title,
        requestedBy: APP.userData.name, requestedById: APP.userData.id, timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
      showToast('Solicitud enviada al Administrador', 'info');
    }
  }
};

window.editContent = async (collection, id, currentBody) => {
  const newVal = prompt("Edita el texto del contenido:", currentBody || "");
  if (newVal !== null && newVal.trim() !== "") {
    if (!IS_DEMO_MODE) await db.collection(collection).doc(id).update({ body: newVal.trim() });
    showToast('Contenido actualizado correctamente', 'success');
    if (collection === 'news') navigateTo('home'); 
    else goBack();
  }
};
