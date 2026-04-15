// =====================================================
// CONFIGURACIÓN FIREBASE — Estadísticas Gallardas
// =====================================================
// Reemplaza estos valores con los de tu proyecto Firebase
// (Consola Firebase → ⚙️ Configuración → Tu aplicación web)
// =====================================================

const FIREBASE_CONFIG = {
  apiKey:            "AIzaSyD2rnKqiMXEtXM4bK3JeHCTchErLqJFRGU",
  authDomain:        "estadisticas-gallardas.firebaseapp.com",
  projectId:         "estadisticas-gallardas",
  storageBucket:     "estadisticas-gallardas.firebasestorage.app",
  messagingSenderId: "1044058966070",
  appId:             "1:1044058966070:web:8502122ed1227bd605f097"
};

// Detecta si Firebase está configurado
const IS_DEMO_MODE = Object.values(FIREBASE_CONFIG).some(v =>
  typeof v === 'string' && v.includes('PLACEHOLDER')
);

// Inicializa Firebase solo si está configurado
if (!IS_DEMO_MODE) {
  firebase.initializeApp(FIREBASE_CONFIG);
}

// Servicios (null en modo demo)
const auth    = IS_DEMO_MODE ? null : firebase.auth();
const db      = IS_DEMO_MODE ? null : firebase.firestore();
const storage = IS_DEMO_MODE ? null : firebase.storage();
