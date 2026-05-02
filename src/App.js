import { useState, useEffect, useRef, useCallback } from "react";

// ─── IMPORTANT: Replace with your Firebase config ─────────────────────────────
// Get it from: console.firebase.google.com → Your Project → Settings → Config
const FIREBASE_CONFIG = {
   apiKey: "AIzaSyDHfrAHgFyYpqOoX3RGs3SmP51_h84QuuE",
  authDomain: "sq-amc.firebaseapp.com",
  databaseURL: "https://sq-amc-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "sq-amc",
  storageBucket: "sq-amc.firebasestorage.app",
  messagingSenderId: "621775970529",
  appId: "1:621775970529:web:f42c996242ffb8941057a0",
  measurementId: "G-4W3QF0CPQN"
};
const FIREBASE_ENABLED = FIREBASE_CONFIG.apiKey !== "AIzaSyDHfrAHgFyYpqOoX3RGs3SmP51_h84QuuE";

// ─── Brand ────────────────────────────────────────────────────────────────────
const T = {
  navy:"#1a237e", royal:"#1e3a8a", mid:"#1d4ed8", bright:"#2563eb",
  light:"#60a5fa", bg:"#0f1f5c", surface:"#162470", card:"#1a2b80",
  border:"#2d43a8", accent:"#60a5fa", accent2:"#34d399", warn:"#fbbf24",
  danger:"#f87171", text:"#e8f0fe", muted:"#93afd4",
  font:"'Outfit',sans-serif", mono:"'JetBrains Mono',monospace",
};

// ─── Seed Customers ───────────────────────────────────────────────────────────
const SEED_CUSTOMERS = [
  {id:"c1", name:"Altwesa Investment",           location:"Malaket",            capacity:"40,000 GPD",           docNo:"SQ-ROQ-0626-003",     amcStart:"2026-02-01",duration:"3 year",  amcEnd:"2029-02-01",emirate:"Abu Dhabi",lat:24.192,lng:55.763,contactNo:"",operatorName:""},
  {id:"c2", name:"Altwesa Investment",           location:"Zakher",             capacity:"60,000 GPD",           docNo:"SQ-ROQ-0626-003",     amcStart:"2026-02-01",duration:"3 year",  amcEnd:"2029-02-01",emirate:"Abu Dhabi",lat:24.155,lng:55.712,contactNo:"",operatorName:""},
  {id:"c3", name:"Altwesa Investment",           location:"Zakher",             capacity:"60,000 GPD",           docNo:"SQ-ROQ-0626-004",     amcStart:"2026-02-01",duration:"3 year",  amcEnd:"2029-02-01",emirate:"Abu Dhabi",lat:24.153,lng:55.714,contactNo:"",operatorName:""},
  {id:"c4", name:"Altwesa Investment",           location:"Zakher",             capacity:"60,000 GPD",           docNo:"SQ-ROQ-0626-005",     amcStart:"2026-02-01",duration:"3 year",  amcEnd:"2029-02-01",emirate:"Abu Dhabi",lat:24.151,lng:55.716,contactNo:"",operatorName:""},
  {id:"c5", name:"Altwesa Investment",           location:"Al Saad",            capacity:"80,000 GPD",           docNo:"SQ-ROQ-0626-002",     amcStart:"2026-02-01",duration:"3 year",  amcEnd:"2029-02-01",emirate:"Abu Dhabi",lat:24.206,lng:55.741,contactNo:"",operatorName:""},
  {id:"c6", name:"Altwesa Investment",           location:"Al Saad",            capacity:"100,000 GPD",          docNo:"SQ-ROQ-0626-002",     amcStart:"2026-02-01",duration:"3 year",  amcEnd:"2029-02-01",emirate:"Abu Dhabi",lat:24.208,lng:55.743,contactNo:"",operatorName:""},
  {id:"c7", name:"Abdualh Alhashmy",             location:"Al Khatem",          capacity:"20,000 GPD",           docNo:"SQ-ROQ-060-001",      amcStart:"2026-01-23",duration:"1 year",  amcEnd:"2027-01-23",emirate:"Abu Dhabi",lat:24.078,lng:55.485,contactNo:"",operatorName:""},
  {id:"c8", name:"Tristar RO1",                  location:"Al Khatem",          capacity:"80,000 GPD",           docNo:"SQ-ROM-0522-010",     amcStart:"2025-07-16",duration:"1 year",  amcEnd:"2026-07-16",emirate:"Abu Dhabi",lat:24.075,lng:55.483,contactNo:"",operatorName:""},
  {id:"c9", name:"Tristar RO2",                  location:"Al Khatem",          capacity:"80,000 GPD",           docNo:"SQ-ROM-0522-010",     amcStart:"2025-07-16",duration:"1 year",  amcEnd:"2026-07-16",emirate:"Abu Dhabi",lat:24.073,lng:55.481,contactNo:"",operatorName:""},
  {id:"c10",name:"Hamad Al Mazrouei",            location:"Al Khatem",          capacity:"20,000 GPD",           docNo:"SQ-ROM-0623-002",     amcStart:"2025-07-23",duration:"1 year",  amcEnd:"2026-07-23",emirate:"Abu Dhabi",lat:24.076,lng:55.487,contactNo:"",operatorName:""},
  {id:"c11",name:"Hameed Nasir Al Shamsi RO-1",  location:"Al Zahra Truck Road",capacity:"20,000 GPD",           docNo:"050-6128585",         amcStart:"2025-07-18",duration:"1 year",  amcEnd:"2026-07-18",emirate:"Abu Dhabi",lat:24.215,lng:55.798,contactNo:"050-6128585",operatorName:""},
  {id:"c12",name:"Pure Harvest Smart Farms",     location:"Nahel, Al Ain",      capacity:"22,000 GPD",           docNo:"PO#PO21028922",       amcStart:"2025-08-28",duration:"1 year",  amcEnd:"2026-08-28",emirate:"Abu Dhabi",lat:24.312,lng:55.922,contactNo:"",operatorName:""},
  {id:"c13",name:"Philadelphia Agricultural",    location:"Ajban",              capacity:"40,000 GPD (12k ppm)",docNo:"",                    amcStart:"2025-03-21",duration:"1 year",  amcEnd:"2026-03-21",emirate:"Abu Dhabi",lat:24.523,lng:54.612,contactNo:"",operatorName:""},
  {id:"c14",name:"Saeed Khalfan Al Kabey",       location:"Al Bahya",           capacity:"",                    docNo:"",                    amcStart:"2025-04-05",duration:"1 year",  amcEnd:"2026-04-05",emirate:"Abu Dhabi",lat:24.488,lng:54.698,contactNo:"",operatorName:""},
  {id:"c15",name:"Hamd Jasim Al Darwesh Fakhro", location:"Rahbah",             capacity:"60,000 GPD",           docNo:"SQ-CRO 0519 002",    amcStart:"2025-04-03",duration:"3 year",  amcEnd:"2028-04-03",emirate:"Abu Dhabi",lat:24.352,lng:54.512,contactNo:"",operatorName:""},
  {id:"c16",name:"Al Farah Contracting",         location:"Asab",               capacity:"100,000 GPD",          docNo:"ROM-0623 003",        amcStart:"2024-03-01",duration:"3 year",  amcEnd:"2027-03-01",emirate:"Abu Dhabi",lat:23.117,lng:53.775,contactNo:"",operatorName:""},
  {id:"c17",name:"AL HADEEL Old",                location:"Liwa",               capacity:"20,000 GPD",           docNo:"",                    amcStart:"2025-09-25",duration:"1 year",  amcEnd:"2026-09-25",emirate:"Abu Dhabi",lat:23.129,lng:53.771,contactNo:"",operatorName:""},
  {id:"c18",name:"AL HADEEL New",                location:"Liwa",               capacity:"40,000 GPD TDS",       docNo:"",                    amcStart:"2025-01-17",duration:"1 year",  amcEnd:"2026-01-17",emirate:"Abu Dhabi",lat:23.127,lng:53.769,contactNo:"",operatorName:""},
  {id:"c19",name:"Nasir Al Harthy",              location:"Liwa",               capacity:"3 ROs",                docNo:"",                    amcStart:"2025-10-25",duration:"1 year",  amcEnd:"2026-10-25",emirate:"Abu Dhabi",lat:23.131,lng:53.773,contactNo:"",operatorName:""},
  {id:"c20",name:"Villa Sultan Al Habtoor",      location:"Dubai - Jumeirah",   capacity:"40,000 GPD",           docNo:"050-7169230",         amcStart:"2025-02-17",duration:"1 year",  amcEnd:"2026-02-17",emirate:"Dubai",    lat:25.186,lng:55.263,contactNo:"050-7169230",operatorName:""},
  {id:"c21",name:"Philadelphia Agricultural",    location:"Ajban",              capacity:"25,000 GPD (14k ppm)",docNo:"050 871 9131",        amcStart:"2025-05-20",duration:"1 year",  amcEnd:"2026-05-20",emirate:"Abu Dhabi",lat:24.525,lng:54.614,contactNo:"",operatorName:""},
  {id:"c22",name:"Philadelphia",                 location:"Dubai",              capacity:"",                    docNo:"",                    amcStart:"2025-09-15",duration:"6 Months",amcEnd:"2026-03-15",emirate:"Dubai",    lat:25.188,lng:55.265,contactNo:"",operatorName:""},
  {id:"c23",name:"Qumra Transport",              location:"Unknown",            capacity:"",                    docNo:"",                    amcStart:"2025-03-05",duration:"1 year",  amcEnd:"2026-03-05",emirate:"Abu Dhabi",lat:24.183,lng:55.752,contactNo:"",operatorName:""},
  {id:"c24",name:"Philadelphia Agricultural",    location:"Ajban",              capacity:"40,000 GPD (22k ppm)",docNo:"",                   amcStart:"2025-02-28",duration:"1 year",  amcEnd:"2026-02-28",emirate:"Abu Dhabi",lat:24.527,lng:54.616,contactNo:"",operatorName:""},
  {id:"c25",name:"Emirates Dairy Farm",          location:"Al Ain",             capacity:"50,000 GPD",           docNo:"SQ-ROM-0623-007",    amcStart:"2025-04-04",duration:"1 year",  amcEnd:"2026-04-04",emirate:"Abu Dhabi",lat:24.223,lng:55.831,contactNo:"",operatorName:""},
  {id:"c26",name:"Blue Gulf",                    location:"Unknown",            capacity:"",                    docNo:"",                    amcStart:"",          duration:"Rental",  amcEnd:"",          emirate:"Dubai",    lat:25.192,lng:55.271,contactNo:"",operatorName:""},
  {id:"c27",name:"Zakiya",                       location:"Liwa",               capacity:"60,000 GPD @20000ppm",docNo:"",                   amcStart:"",          duration:"1 year",  amcEnd:"",          emirate:"Abu Dhabi",lat:23.133,lng:53.775,contactNo:"",operatorName:""},
  {id:"c28",name:"Al Ain Palace (Sheikha Moza)", location:"Al Ain",             capacity:"130,000 GPD @8000ppm",docNo:"SQ-25-09",           amcStart:"",          duration:"1 year",  amcEnd:"",          emirate:"Abu Dhabi",lat:24.228,lng:55.837,contactNo:"",operatorName:""},
  {id:"c29",name:"Mohamed Al Ketby",             location:"Nahil",              capacity:"80,000 GPD @9000ppm", docNo:"SQ-25-08",           amcStart:"",          duration:"1 year",  amcEnd:"",          emirate:"Abu Dhabi",lat:24.318,lng:55.928,contactNo:"",operatorName:""},
  {id:"c30",name:"Agri Tech Agricultural LLC",   location:"Nahil",              capacity:"80,000 GPD @9000ppm", docNo:"AG-PO-2024-10-00140",amcStart:"2025-11-14",duration:"1 year",  amcEnd:"2026-11-14",emirate:"Abu Dhabi",lat:24.316,lng:55.926,contactNo:"",operatorName:""},
];

const USERS = [
  {id:"u1",username:"admin", password:"SQ@admin2024",   role:"admin",      name:"Admin User"},
  {id:"u2",username:"tech1", password:"SQ@tech1#field", role:"technician", name:"Ahmed Al Mansoori"},
  {id:"u3",username:"tech2", password:"SQ@tech2#field", role:"technician", name:"Khalid Al Rashidi"},
];

const EMIRATES = ["Abu Dhabi","Dubai","Sharjah","Ajman","Umm Al Quwain","Ras Al Khaimah","Fujairah"];
const READINGS_META = [
  {key:"P1", label:"P1", desc:"Before MMF (PSI)"},
  {key:"P2", label:"P2", desc:"Cartridge Filter (PSI)"},
  {key:"P3", label:"P3", desc:"Before HP (PSI)"},
  {key:"P4", label:"P4", desc:"After HP (PSI)"},
  {key:"P5", label:"P5", desc:"After Membrane"},
  {key:"TDS",label:"TDS",desc:"Total Dissolved Solids"},
  {key:"pH1",label:"pH1",desc:"Inlet Source Water"},
  {key:"pH2",label:"pH2",desc:"Outlet Product Water"},
  {key:"DT1",label:"DT1",desc:"Dosing Tank H₂SO₄"},
  {key:"DT2",label:"DT2",desc:"Antiscalant"},
  {key:"DT3",label:"DT3",desc:"Dosing Tank NaOH"},
  {key:"DT4",label:"DT4",desc:"Dosing Tank Chloride"},
  {key:"FM1",label:"FM1",desc:"Flow Meter Production (GPM)"},
  {key:"FM2",label:"FM2",desc:"Flow Meter Rejection (GPM)"},
];

// ─── Utils ────────────────────────────────────────────────────────────────────
const uid = () => `id_${Date.now()}_${Math.random().toString(36).slice(2,7)}`;
const todayStr = () => new Date().toISOString().split("T")[0];
const daysUntil = d => { if(!d) return null; return Math.ceil((new Date(d)-new Date())/86400000); };
const expiryBadge = end => {
  const d = daysUntil(end);
  if(d===null) return {label:"No Date",  color:T.muted};
  if(d<0)      return {label:"EXPIRED",  color:T.danger};
  if(d<=30)    return {label:`${d}d left`,color:T.danger};
  if(d<=90)    return {label:`${d}d left`,color:T.warn};
  return              {label:`${d}d left`,color:T.accent2};
};
const compressImg = async (file, maxW=800) => {
  const url = await new Promise(r=>{const fr=new FileReader();fr.onload=e=>r(e.target.result);fr.readAsDataURL(file);});
  return new Promise(r=>{
    const img=new Image();
    img.onload=()=>{
      const c=document.createElement("canvas");
      const ratio=Math.min(maxW/img.width,maxW/img.height,1);
      c.width=img.width*ratio; c.height=img.height*ratio;
      c.getContext("2d").drawImage(img,0,0,c.width,c.height);
      r(c.toDataURL("image/jpeg",0.72));
    };
    img.src=url;
  });
};

// ─── Local Storage ────────────────────────────────────────────────────────────
const local = {
  get: k => { try { const v=localStorage.getItem(k); return v?JSON.parse(v):null; } catch { return null; } },
  set: (k,v) => { try { localStorage.setItem(k,JSON.stringify(v)); } catch {} },
  del: k => { try { localStorage.removeItem(k); } catch {} },
};

// ─── Firebase helpers (loaded dynamically to avoid build errors) ──────────────
let _db = null;
const getDb = () => _db;

const fbInit = async () => {
  if(!FIREBASE_ENABLED) return false;
  try {
    const { initializeApp, getApps } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js");
    const { getDatabase, ref, set, onValue, get } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js");
    if(!getApps().length) initializeApp(FIREBASE_CONFIG);
    else initializeApp(FIREBASE_CONFIG, `app_${Date.now()}`);
    _db = getDatabase();
    window._fbRef = ref; window._fbSet = set; window._fbOnValue = onValue; window._fbGet = get;
    return true;
  } catch(e) { console.warn("Firebase init failed:", e); return false; }
};

const fbSet = (path, val) => {
  if(!_db) return;
  try { window._fbSet(window._fbRef(_db, path), val); } catch(e) { console.warn("fbSet error", e); }
};

const fbListen = (path, cb) => {
  if(!_db) return () => {};
  try {
    const r = window._fbRef(_db, path);
    const unsub = window._fbOnValue(r, snap => cb(snap.exists() ? snap.val() : null));
    return unsub;
  } catch { return () => {}; }
};

// ─── CSS ──────────────────────────────────────────────────────────────────────
const injectCSS = () => {
  if(document.getElementById("sq-css3")) return;
  const s = document.createElement("style"); s.id = "sq-css3";
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    html,body,#root{height:100%;font-family:'Outfit',sans-serif;background:${T.bg};color:${T.text};-webkit-font-smoothing:antialiased}

    /* App shell */
    .shell{display:flex;flex-direction:column;min-height:100vh;max-width:1280px;margin:0 auto}

    /* Top bar */
    .tbar{padding:11px 20px;display:flex;align-items:center;justify-content:space-between;background:${T.navy};border-bottom:1px solid ${T.border};position:sticky;top:0;z-index:50;flex-shrink:0}

    /* Body layout */
    .body-layout{display:flex;flex:1;overflow:hidden}

    /* Sidebar — hidden on mobile, shown on tablet+ */
    .sidebar{width:210px;background:${T.navy};border-right:1px solid ${T.border};display:none;flex-direction:column;padding:16px 10px;gap:3px;flex-shrink:0;position:sticky;top:57px;height:calc(100vh - 57px);overflow-y:auto}
    @media(min-width:768px){.sidebar{display:flex}}
    .sitem{display:flex;align-items:center;gap:10px;padding:10px 13px;border-radius:10px;font-size:13px;font-weight:600;color:${T.muted};cursor:pointer;border:none;background:none;font-family:'Outfit',sans-serif;width:100%;text-align:left;transition:all .18s}
    .sitem:hover{background:${T.surface};color:${T.text}}
    .sitem.on{background:linear-gradient(135deg,${T.mid}33,${T.bright}22);color:#fff;border:1px solid ${T.border}}
    .sitem svg{width:17px;height:17px;flex-shrink:0}
    .slabel{font-size:10px;color:${T.muted};font-weight:700;letter-spacing:2px;padding:12px 13px 5px;text-transform:uppercase}

    /* Main content */
    .main{flex:1;overflow-y:auto;min-width:0}
    .pg{padding:20px;padding-bottom:85px}
    @media(min-width:768px){.pg{padding:24px;padding-bottom:28px}}
    @media(min-width:1024px){.pg{padding:28px 36px}}

    /* Bottom nav — mobile only */
    .bnav{position:fixed;bottom:0;left:0;right:0;background:${T.navy};border-top:1px solid ${T.border};display:flex;z-index:99;padding-bottom:env(safe-area-inset-bottom,0)}
    @media(min-width:768px){.bnav{display:none}}
    .nb{flex:1;display:flex;flex-direction:column;align-items:center;gap:2px;padding:9px 4px 7px;font-size:10px;font-weight:600;color:${T.muted};background:none;border:none;cursor:pointer;font-family:'Outfit',sans-serif;transition:color .18s;position:relative}
    .nb.on{color:#fff}
    .nb.on::before{content:'';position:absolute;top:0;left:22%;right:22%;height:2px;background:linear-gradient(90deg,${T.mid},${T.light});border-radius:0 0 3px 3px}
    .nb svg{width:20px;height:20px}

    /* Responsive grids */
    .g2{display:grid;grid-template-columns:1fr 1fr;gap:14px}
    .g3{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
    .g4{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}
    .stat-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}
    @media(min-width:640px){.stat-grid{grid-template-columns:repeat(4,1fr)}}
    @media(max-width:480px){.g2{grid-template-columns:1fr}.g4{grid-template-columns:repeat(2,1fr)}}

    /* Cards */
    .card{background:${T.card};border:1px solid ${T.border};border-radius:14px;padding:18px}
    .card-glass{background:rgba(26,43,128,0.75);backdrop-filter:blur(14px);border:1px solid rgba(255,255,255,0.13);border-radius:16px;padding:22px}
    .cc{background:${T.card};border:1.5px solid ${T.border};border-radius:13px;padding:14px;margin-bottom:10px;transition:all .2s}
    .cc:hover{border-color:${T.accent}55;box-shadow:0 4px 18px #00000028}

    /* Inputs */
    input,select,textarea{background:${T.surface};color:${T.text};border:1.5px solid ${T.border};border-radius:9px;padding:9px 13px;font-family:'Outfit',sans-serif;font-size:14px;width:100%;outline:none;transition:all .2s}
    input:focus,select:focus,textarea:focus{border-color:${T.accent};box-shadow:0 0 0 3px ${T.accent}1a}
    input::placeholder{color:${T.muted}}
    select option{background:${T.surface}}
    .fg{margin-bottom:13px}
    .fg label{display:block;font-size:11px;color:${T.muted};margin-bottom:5px;font-weight:700;letter-spacing:1px;text-transform:uppercase}

    /* Buttons */
    button{cursor:pointer;font-family:'Outfit',sans-serif;font-weight:600;border:none;border-radius:9px;padding:9px 17px;transition:all .2s;display:inline-flex;align-items:center;gap:6px}
    .btn-p{background:linear-gradient(135deg,${T.mid},${T.bright});color:#fff;box-shadow:0 4px 12px ${T.mid}44}
    .btn-p:hover{transform:translateY(-1px);box-shadow:0 6px 18px ${T.mid}66}
    .btn-s{background:linear-gradient(135deg,#059669,${T.accent2});color:#fff}
    .btn-s:hover{transform:translateY(-1px)}
    .btn-d{background:linear-gradient(135deg,#dc2626,${T.danger});color:#fff}
    .btn-g{background:transparent;color:${T.accent};border:1.5px solid ${T.border}}
    .btn-g:hover{border-color:${T.accent};background:${T.accent}14}
    .btn-soft{background:${T.surface};color:${T.text};border:1.5px solid ${T.border}}
    .btn-soft:hover{border-color:${T.accent}44}

    /* Misc */
    .tag{display:inline-block;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;letter-spacing:.4px}
    .overlay{position:fixed;inset:0;background:rgba(8,16,70,0.88);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;z-index:1000;padding:14px}
    .modal{background:${T.card};border:1px solid ${T.border};border-radius:18px;padding:24px;width:100%;max-width:680px;max-height:93vh;overflow-y:auto;box-shadow:0 24px 60px #00000060}
    .chip{display:inline-flex;align-items:center;padding:5px 12px;border-radius:20px;font-size:11px;font-weight:600;border:1.5px solid ${T.border};color:${T.muted};cursor:pointer;transition:all .18s;background:${T.surface};white-space:nowrap}
    .chip.on{border-color:${T.accent};color:#fff;background:linear-gradient(135deg,${T.mid},${T.bright})}
    .sig-pad{border:1.5px dashed ${T.accent}44;border-radius:9px;background:${T.bg};touch-action:none;display:block;width:100%}
    .photo-thumb{width:74px;height:68px;object-fit:cover;border-radius:9px;border:1.5px solid ${T.border};cursor:pointer;transition:transform .18s}
    .photo-thumb:hover{transform:scale(1.06)}
    .photo-wrap{display:flex;flex-wrap:wrap;gap:8px;margin-top:9px}
    .ab{background:${T.danger}16;border:1.5px solid ${T.danger}44;border-radius:11px;padding:10px 14px;margin-bottom:11px;display:flex;align-items:center;gap:9px}
    .wb{background:${T.warn}16;border:1.5px solid ${T.warn}44;border-radius:11px;padding:10px 14px;margin-bottom:11px;display:flex;align-items:center;gap:9px}
    .sec-lbl{font-size:10px;color:${T.muted};font-weight:700;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:11px}
    .divr{display:flex;align-items:center;gap:8px;margin:14px 0 11px}
    .divr::before,.divr::after{content:'';flex:1;height:1px;background:${T.border}}
    .divr span{font-size:10px;color:${T.muted};font-weight:700;letter-spacing:1.5px;text-transform:uppercase;white-space:nowrap}
    .dot-live{width:8px;height:8px;border-radius:50%;background:${T.accent2};box-shadow:0 0 7px ${T.accent2};display:inline-block;flex-shrink:0}
    .rs{background:${T.card};border:1.5px solid ${T.border};border-radius:13px;padding:13px;margin-bottom:9px;display:flex;align-items:center;gap:11px}
    .rn{width:33px;height:33px;border-radius:50%;background:linear-gradient(135deg,${T.mid},${T.bright});display:flex;align-items:center;justify-content:center;color:#fff;font-size:13px;font-weight:700;flex-shrink:0}
    @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
    @keyframes spin{to{transform:rotate(360deg)}}
    .fade-up{animation:fadeUp .3s ease both}
    .spinner{width:16px;height:16px;border:2px solid rgba(255,255,255,0.3);border-top-color:#fff;border-radius:50%;animation:spin .8s linear infinite;display:inline-block}
  `;
  document.head.appendChild(s);
};

// ─── PDF Export ───────────────────────────────────────────────────────────────
const exportPDF = report => {
  const win = window.open("","_blank","width=820,height=960");
  const rows = pairs => pairs.map(([k,v])=>`<tr><th>${k}</th><td>${v||"—"}</td></tr>`).join("");
  win.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Visit Report</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&display=swap');
    *{box-sizing:border-box;margin:0;padding:0}body{font-family:'Outfit',sans-serif;color:#1a237e;font-size:12px}
    .hdr{background:linear-gradient(135deg,#1a237e,#1d4ed8 60%,#3b82f6);color:#fff;padding:22px 30px}
    .logo-row{display:flex;align-items:center;gap:11px;margin-bottom:11px}
    .logo-circle{width:42px;height:42px;background:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:20px}
    .co{font-size:17px;font-weight:700}.co span{display:block;font-size:9px;opacity:.7;letter-spacing:2px}
    .rt{font-size:12px;opacity:.85;letter-spacing:.5px}
    .body{padding:18px 30px}
    .sec{font-size:10px;font-weight:700;color:#1d4ed8;letter-spacing:2px;text-transform:uppercase;border-bottom:2px solid #dbeafe;padding-bottom:4px;margin:14px 0 8px}
    table{width:100%;border-collapse:collapse;margin-bottom:4px}
    td,th{border:1px solid #dbeafe;padding:6px 9px;font-size:11px}th{background:#eff6ff;font-weight:700;color:#1a237e;width:38%}
    .rg{display:grid;grid-template-columns:repeat(4,1fr);gap:5px;margin-bottom:4px}
    .rb{border:1px solid #dbeafe;border-radius:5px;padding:7px;text-align:center;background:#f8fbff}
    .rk{font-size:9px;font-weight:700;color:#1d4ed8}.rv{font-size:14px;font-weight:700;color:#1a237e;font-family:monospace}.rd{font-size:8px;color:#93afd4;margin-top:1px}
    .photos{display:flex;flex-wrap:wrap;gap:6px}.photos img{width:155px;height:105px;object-fit:cover;border-radius:5px;border:1px solid #dbeafe}
    .sig img{max-width:210px;max-height:70px;border:1px solid #dbeafe;border-radius:4px}
    .ftr{background:#eff6ff;border-top:2px solid #dbeafe;padding:11px 30px;display:flex;justify-content:space-between;font-size:9px;color:#6b7aa1;margin-top:14px}
  </style></head><body>
  <div class="hdr">
    <div class="logo-row"><div class="logo-circle">💧</div><div><div class="co">SUPER QUALITY<span>TRADING LLC. · superquality-est.com</span></div></div></div>
    <div class="rt">RO UNIT VISIT REPORT &nbsp;·&nbsp; ${report.customerName} &nbsp;·&nbsp; ${report.date||""}</div>
  </div>
  <div class="body">
    <div class="sec">Plant Information</div>
    <table>${rows([["Plant/Doc No.",report.plantNo],["Client",report.customerName],["Location",report.location],["Capacity",report.capacity],["AMC Valid",report.warrantyValid],["Operator",report.operatorName],["Technician",report.technicianName],["Contact",report.contactNo],["Visit Date",report.date],["Last Visit",report.lastVisitDate],["Next Visit",report.nextVisitDate]])}</table>
    <div class="sec">Membrane & Pumps</div>
    <table>${rows([["Membrane Name",report.membraneName],["Membrane Type",report.membraneType],["No. of Membranes",report.noOfMembrane],...(report.pumpTypes||[]).filter(Boolean).map((p,i)=>[`Pump ${i+1}`,p])])}</table>
    <div class="sec">Readings</div>
    <div class="rg">${READINGS_META.map(r=>`<div class="rb"><div class="rk">${r.label}</div><div class="rv">${report.readings?.[r.key]||"—"}</div><div class="rd">${r.desc}</div></div>`).join("")}</div>
    <div class="sec">Water Samples (TDS)</div>
    <table>${rows([["Well 1",report.wellSamples?.well1],["Well 2",report.wellSamples?.well2],["Well 3",report.wellSamples?.well3],["Well 4",report.wellSamples?.well4],["Product Water",report.productWater],["Reject Water",report.rejectWater]])}</table>
    ${report.remarks?`<div class="sec">Remarks</div><p style="border:1px solid #dbeafe;border-radius:5px;padding:8px;font-size:11px;background:#f8fbff">${report.remarks}</p>`:""}
    ${report.photos?.length?`<div class="sec">Site Photos</div><div class="photos">${report.photos.map(p=>`<img src="${p}"/>`).join("")}</div>`:""}
    ${report.signature?`<div class="sec">Signature</div><div class="sig"><img src="${report.signature}"/></div>`:""}
  </div>
  <div class="ftr"><span>Generated: ${new Date().toLocaleString()}</span><span>By: ${report.submittedBy}</span><span>superquality-est.com</span></div>
  </body></html>`);
  win.document.close(); setTimeout(()=>win.print(), 700);
};

// ─── Icons ────────────────────────────────────────────────────────────────────
const Ic = {
  Home:    ()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Plants:  ()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>,
  Route:   ()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="5" cy="6" r="2"/><circle cx="19" cy="18" r="2"/><path d="M5 8v4a4 4 0 0 0 4 4h6a4 4 0 0 0 4-4V8"/><line x1="19" y1="8" x2="19" y2="16"/></svg>,
  Reports: ()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  Settings:()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93l-1.41 1.41M4.93 4.93l1.41 1.41M20.49 12H22M2 12h1.51M19.07 19.07l-1.41-1.41M4.93 19.07l1.41-1.41M12 20.49V22M12 2v1.51"/></svg>,
  Plus:    ()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Edit:    ()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  Trash:   ()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>,
  X:       ()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Bell:    ()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  Camera:  ()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>,
  PDF:     ()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
  Save:    ()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/></svg>,
  Out:     ()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  Check:   ()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>,
  Alert:   ()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  Map:     ()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
};

// ─── Logo ─────────────────────────────────────────────────────────────────────
const Logo = ({size=28}) => (
  <div style={{display:"flex",alignItems:"center",gap:9}}>
    <div style={{width:size,height:size,background:"#fff",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,boxShadow:"0 2px 10px rgba(255,255,255,0.22)"}}>
      <span style={{fontSize:size*0.52}}>💧</span>
    </div>
    <div>
      <div style={{fontSize:size*0.5,fontWeight:800,color:"#fff",lineHeight:1,letterSpacing:.5}}>SUPER QUALITY</div>
      <div style={{fontSize:size*0.27,color:"rgba(255,255,255,0.58)",letterSpacing:1.5}}>Trading LLC.</div>
    </div>
  </div>
);

// ─── Sig Pad ──────────────────────────────────────────────────────────────────
const SigPad = ({onSave,onClear}) => {
  const ref=useRef(),drawing=useRef(false),last=useRef(null);
  const pos=(e,c)=>{const r=c.getBoundingClientRect(),s=e.touches?e.touches[0]:e;return{x:s.clientX-r.left,y:s.clientY-r.top};};
  const start=e=>{e.preventDefault();drawing.current=true;last.current=pos(e,ref.current);};
  const end=()=>{drawing.current=false;onSave&&onSave(ref.current.toDataURL());};
  const move=e=>{if(!drawing.current)return;e.preventDefault();const c=ref.current,ctx=c.getContext("2d"),p=pos(e,c);ctx.strokeStyle="#fff";ctx.lineWidth=2.5;ctx.lineCap="round";ctx.beginPath();ctx.moveTo(last.current.x,last.current.y);ctx.lineTo(p.x,p.y);ctx.stroke();last.current=p;};
  return(
    <div>
      <canvas ref={ref} width={500} height={110} className="sig-pad" style={{height:110}} onMouseDown={start} onMouseMove={move} onMouseUp={end} onTouchStart={start} onTouchMove={move} onTouchEnd={end}/>
      <button className="btn-g" style={{marginTop:7,padding:"4px 12px",fontSize:11}} onClick={()=>{ref.current.getContext("2d").clearRect(0,0,500,110);onClear&&onClear();}}>Clear</button>
    </div>
  );
};

// ─── Login ────────────────────────────────────────────────────────────────────
const Login = ({onLogin,firebaseOk}) => {
  const [u,setU]=useState(""), [p,setP]=useState(""), [err,setErr]=useState(""), [loading,setLoading]=useState(false);
  const go = () => {
    if(!u||!p){setErr("Please enter username and password");return;}
    setLoading(true); setErr("");
    setTimeout(()=>{
      const found = USERS.find(x=>x.username===u&&x.password===p);
      if(found){ local.set("sq_session",{user:found,ts:Date.now()}); onLogin(found); }
      else { setErr("Incorrect username or password"); setLoading(false); }
    }, 380);
  };
  return(
    <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:20,background:`linear-gradient(155deg,${T.navy} 0%,${T.royal} 50%,${T.mid} 100%)`,position:"relative",overflow:"hidden"}}>
      {/* Decorative blobs */}
      <div style={{position:"absolute",top:"-8%",left:"-8%",width:280,height:280,borderRadius:"50%",background:"rgba(255,255,255,0.05)",pointerEvents:"none"}}/>
      <div style={{position:"absolute",bottom:"10%",right:"-5%",width:200,height:200,borderRadius:"50%",background:"rgba(255,255,255,0.04)",pointerEvents:"none"}}/>
      <svg style={{position:"absolute",bottom:0,left:0,right:0,pointerEvents:"none"}} viewBox="0 0 1440 140" preserveAspectRatio="none" height="110">
        <path d="M0,70 C360,130 720,10 1080,70 C1260,100 1380,60 1440,50 L1440,140 L0,140Z" fill={T.bg} opacity="0.5"/>
        <path d="M0,100 C300,50 600,140 900,90 C1100,60 1300,110 1440,90 L1440,140 L0,140Z" fill={T.bg} opacity="0.75"/>
        <path d="M0,120 C240,108 480,135 720,120 C960,105 1200,130 1440,118 L1440,140 L0,140Z" fill={T.bg}/>
      </svg>

      <div style={{position:"relative",zIndex:1,width:"100%",maxWidth:390,animation:"fadeUp .4s ease"}}>
        <div style={{textAlign:"center",marginBottom:30}}>
          <Logo size={34}/>
          <div style={{marginTop:16,fontSize:11,color:"rgba(255,255,255,0.45)",letterSpacing:3}}>AMC MANAGEMENT PORTAL</div>
        </div>
        <div className="card-glass">
          <div style={{fontSize:19,fontWeight:700,color:"#fff",marginBottom:20,textAlign:"center"}}>Welcome Back</div>
          <div className="fg">
            <label style={{color:"rgba(255,255,255,0.55)"}}>Username</label>
            <input value={u} onChange={e=>setU(e.target.value)} placeholder="Enter username" onKeyDown={e=>e.key==="Enter"&&go()} style={{background:"rgba(255,255,255,0.1)",border:"1.5px solid rgba(255,255,255,0.2)",color:"#fff"}}/>
          </div>
          <div className="fg">
            <label style={{color:"rgba(255,255,255,0.55)"}}>Password</label>
            <input type="password" value={p} onChange={e=>setP(e.target.value)} placeholder="Enter password" onKeyDown={e=>e.key==="Enter"&&go()} style={{background:"rgba(255,255,255,0.1)",border:"1.5px solid rgba(255,255,255,0.2)",color:"#fff"}}/>
          </div>
          {err&&<div style={{color:"#fca5a5",fontSize:12,marginBottom:12,textAlign:"center",padding:"8px 10px",background:"rgba(248,113,113,0.1)",borderRadius:8}}>{err}</div>}
          <button className="btn-p" style={{width:"100%",justifyContent:"center",padding:"13px",fontSize:15,background:"rgba(255,255,255,0.94)",color:T.royal,fontWeight:700,borderRadius:11}} onClick={go} disabled={loading}>
            {loading?<><span className="spinner" style={{borderTopColor:T.royal,borderColor:`${T.royal}33`}}/> Signing in…</>:"Sign In →"}
          </button>
          {!firebaseOk&&(
            <div style={{marginTop:13,padding:"9px 12px",background:"rgba(251,191,36,0.1)",border:"1px solid rgba(251,191,36,0.28)",borderRadius:8,fontSize:11,color:T.warn,textAlign:"center"}}>
              ⚠ Firebase not configured — reports save locally only
            </div>
          )}
        </div>
        <div style={{textAlign:"center",marginTop:14,fontSize:10,color:"rgba(255,255,255,0.28)"}}>superquality-est.com</div>
      </div>
    </div>
  );
};

// ─── Customer Modal ───────────────────────────────────────────────────────────
const CustomerModal = ({initial,onSave,onClose}) => {
  const blank={name:"",location:"",capacity:"",docNo:"",amcStart:"",duration:"1 year",amcEnd:"",emirate:"Abu Dhabi",lat:"",lng:"",contactNo:"",operatorName:""};
  const [f,setF]=useState(initial||blank);
  const set=(k,v)=>setF(x=>({...x,[k]:v}));
  return(
    <div className="overlay">
      <div className="modal">
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
          <div style={{fontSize:16,fontWeight:800,color:"#fff"}}>{initial?"Edit Plant":"Add New Plant"}</div>
          <button className="btn-g" style={{padding:"5px 8px"}} onClick={onClose}><Ic.X/></button>
        </div>
        <div className="g2">
          {[{l:"Plant Name *",k:"name"},{l:"Location *",k:"location"},{l:"Capacity",k:"capacity"},{l:"Doc / Contract No.",k:"docNo"},{l:"Contact No.",k:"contactNo"},{l:"Operator Name",k:"operatorName"}].map(x=>(
            <div key={x.k} className="fg"><label>{x.l}</label><input value={f[x.k]||""} onChange={e=>set(x.k,e.target.value)}/></div>
          ))}
          <div className="fg"><label>Emirate</label><select value={f.emirate} onChange={e=>set("emirate",e.target.value)}>{EMIRATES.map(e=><option key={e}>{e}</option>)}</select></div>
          <div className="fg"><label>Duration</label><select value={f.duration} onChange={e=>set("duration",e.target.value)}>{["6 Months","1 year","2 year","3 year","Rental"].map(d=><option key={d}>{d}</option>)}</select></div>
          <div className="fg"><label>AMC Start</label><input type="date" value={f.amcStart} onChange={e=>set("amcStart",e.target.value)}/></div>
          <div className="fg"><label>AMC End</label><input type="date" value={f.amcEnd} onChange={e=>set("amcEnd",e.target.value)}/></div>
          <div className="fg"><label>Latitude</label><input type="number" step="0.001" value={f.lat||""} onChange={e=>set("lat",e.target.value)} placeholder="e.g. 24.192"/></div>
          <div className="fg"><label>Longitude</label><input type="number" step="0.001" value={f.lng||""} onChange={e=>set("lng",e.target.value)} placeholder="e.g. 55.763"/></div>
        </div>
        <div style={{display:"flex",gap:10,marginTop:16}}>
          <button className="btn-p" style={{flex:1,justifyContent:"center"}} onClick={()=>{if(!f.name||!f.location)return alert("Name & Location required");onSave(f);}}><Ic.Save/> Save</button>
          <button className="btn-soft" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

// ─── Dashboard ────────────────────────────────────────────────────────────────
const Dashboard = ({customers,reports,user,onTab,firebaseOk}) => {
  const total=customers.length;
  const expired=customers.filter(c=>{const d=daysUntil(c.amcEnd);return d!==null&&d<0;}).length;
  const exp30=customers.filter(c=>{const d=daysUntil(c.amcEnd);return d!==null&&d>=0&&d<=30;}).length;
  const active=customers.filter(c=>{const d=daysUntil(c.amcEnd);return d!==null&&d>30;}).length;
  const monthR=reports.filter(r=>(r.date||"").startsWith(new Date().toISOString().slice(0,7))).length;
  const pct=total?Math.round((monthR/total)*100):0;
  return(
    <div className="pg fade-up">
      <div style={{marginBottom:20}}>
        <div style={{fontSize:13,color:T.muted}}>Good {new Date().getHours()<12?"morning":"afternoon"},</div>
        <div style={{fontSize:26,fontWeight:800,color:"#fff"}}>{user.name}</div>
        <div style={{fontSize:12,color:T.muted,marginTop:3,display:"flex",alignItems:"center",gap:8}}>
          <span className="dot-live"/>
          {firebaseOk?"Live sync active · all devices":"Local mode — Firebase not configured"} &nbsp;·&nbsp;
          {new Date().toLocaleDateString("en-AE",{weekday:"long",day:"numeric",month:"long"})}
        </div>
      </div>
      {expired>0&&<div className="ab"><Ic.Alert/><span style={{color:T.danger,fontWeight:700,fontSize:13}}>{expired} contract{expired>1?"s":""} EXPIRED — renewal needed!</span></div>}
      {exp30>0&&<div className="wb"><Ic.Bell/><span style={{color:T.warn,fontWeight:700,fontSize:13}}>{exp30} expiring within 30 days</span></div>}
      <div className="stat-grid" style={{marginBottom:16}}>
        {[{l:"Total Plants",v:total,c:T.light,e:"🏭"},{l:"Active",v:active,c:T.accent2,e:"✅"},{l:"Expiring ≤30d",v:exp30,c:T.warn,e:"⏳"},{l:"Expired",v:expired,c:T.danger,e:"❌"}].map(s=>(
          <div key={s.l} className="card" style={{cursor:"pointer",borderColor:s.c+"33"}} onClick={()=>onTab("customers")}>
            <div style={{fontSize:11,marginBottom:4}}>{s.e}</div>
            <div style={{fontSize:34,fontWeight:800,color:s.c,fontFamily:T.mono,lineHeight:1}}>{s.v}</div>
            <div style={{fontSize:11,color:T.muted,marginTop:5,fontWeight:600}}>{s.l}</div>
          </div>
        ))}
      </div>
      <div className="card" style={{marginBottom:16}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
          <div><div className="sec-lbl">Monthly Visits</div><div style={{fontSize:30,fontWeight:800,color:"#fff",fontFamily:T.mono}}>{monthR}<span style={{fontSize:14,color:T.muted,fontWeight:400}}> / {total}</span></div></div>
          <div style={{fontSize:28,fontWeight:800,color:pct>=80?T.accent2:pct>=50?T.warn:T.accent}}>{pct}%</div>
        </div>
        <div style={{background:T.bg,borderRadius:8,height:8,overflow:"hidden"}}>
          <div style={{width:`${pct}%`,background:`linear-gradient(90deg,${T.mid},${T.light})`,height:"100%",borderRadius:8,transition:"width .6s"}}/>
        </div>
        <div style={{fontSize:11,color:T.muted,marginTop:8}}>{new Date().toLocaleDateString("en-AE",{month:"long",year:"numeric"})}</div>
      </div>
      <div className="sec-lbl">⚠ Upcoming Expirations</div>
      {customers.filter(c=>{const d=daysUntil(c.amcEnd);return d!==null&&d<=90;}).sort((a,b)=>daysUntil(a.amcEnd)-daysUntil(b.amcEnd)).slice(0,6).map(c=>{
        const b=expiryBadge(c.amcEnd);
        return(
          <div key={c.id} className="cc" style={{borderColor:b.color+"44"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
              <div><div style={{fontWeight:700,fontSize:14,color:"#fff"}}>{c.name}</div><div style={{fontSize:12,color:T.muted,marginTop:2}}>📍 {c.location} · {c.emirate} · Ends: {c.amcEnd||"—"}</div></div>
              <span className="tag" style={{background:b.color+"22",color:b.color,border:`1px solid ${b.color}33`,flexShrink:0,marginLeft:10}}>{b.label}</span>
            </div>
          </div>
        );
      })}
      {customers.filter(c=>{const d=daysUntil(c.amcEnd);return d!==null&&d<=90;}).length===0&&(
        <div style={{textAlign:"center",padding:"30px 20px",color:T.muted}}><div style={{fontSize:32,marginBottom:8}}>✅</div><div style={{fontSize:14,fontWeight:600,color:T.accent2}}>All contracts healthy</div></div>
      )}
    </div>
  );
};

// ─── Customers ────────────────────────────────────────────────────────────────
const Customers = ({customers,setCustomers,user}) => {
  const [search,setSearch]=useState(""), [em,setEm]=useState("All"), [modal,setModal]=useState(null);
  const filtered=customers.filter(c=>(em==="All"||c.emirate===em)&&(c.name.toLowerCase().includes(search.toLowerCase())||c.location.toLowerCase().includes(search.toLowerCase())));
  const save=f=>{ if(modal==="add") setCustomers(cs=>[...cs,{...f,id:uid()}]); else setCustomers(cs=>cs.map(c=>c.id===modal.id?{...f,id:c.id}:c)); setModal(null); };
  return(
    <div className="pg fade-up">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
        <div><div style={{fontSize:22,fontWeight:800,color:"#fff"}}>Plants</div><div style={{fontSize:12,color:T.muted}}>{filtered.length} of {customers.length}</div></div>
        {user.role==="admin"&&<button className="btn-p" style={{padding:"8px 14px",fontSize:13}} onClick={()=>setModal("add")}><Ic.Plus/> Add Plant</button>}
      </div>
      <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Search name or location…" style={{marginBottom:11}}/>
      <div style={{display:"flex",gap:6,overflowX:"auto",marginBottom:14,paddingBottom:4}}>
        {["All",...EMIRATES].map(e=><button key={e} onClick={()=>setEm(e)} className={em===e?"chip on":"chip"}>{e}{e!=="All"?` (${customers.filter(c=>c.emirate===e).length})`:""}</button>)}
      </div>
      {filtered.map(c=>{const b=expiryBadge(c.amcEnd);return(
        <div key={c.id} className="cc">
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:user.role==="admin"?8:0}}>
            <div style={{flex:1}}>
              <div style={{fontWeight:700,fontSize:15,color:"#fff"}}>{c.name}</div>
              <div style={{fontSize:12,color:T.muted,marginTop:3}}>📍 {c.location} · 🏛 {c.emirate}</div>
              <div style={{fontSize:12,color:T.muted}}>💧 {c.capacity||"—"} · 📋 {c.docNo||"—"}</div>
              <div style={{fontSize:12,color:T.muted}}>🗓 {c.amcStart||"—"} → {c.amcEnd||"—"} ({c.duration})</div>
            </div>
            <span className="tag" style={{background:b.color+"22",color:b.color,border:`1px solid ${b.color}33`,marginLeft:10,flexShrink:0}}>{b.label}</span>
          </div>
          {user.role==="admin"&&(
            <div style={{display:"flex",gap:8}}>
              <button className="btn-g" style={{padding:"5px 12px",fontSize:12}} onClick={()=>setModal(c)}><Ic.Edit/> Edit</button>
              <button className="btn-d" style={{padding:"5px 10px",fontSize:12}} onClick={()=>{if(window.confirm("Delete this plant?"))setCustomers(cs=>cs.filter(x=>x.id!==c.id));}}><Ic.Trash/></button>
            </div>
          )}
        </div>
      );})}
      {modal&&<CustomerModal initial={modal==="add"?null:modal} onSave={save} onClose={()=>setModal(null)}/>}
    </div>
  );
};

// ─── Route Planner ────────────────────────────────────────────────────────────
const Route = ({customers}) => {
  const [em,setEm]=useState("Abu Dhabi");
  const EC={"Abu Dhabi":{lat:24.2,lng:55.7},"Dubai":{lat:25.2,lng:55.27},"Sharjah":{lat:25.35,lng:55.41},"Ajman":{lat:25.4,lng:55.44},"Ras Al Khaimah":{lat:25.78,lng:55.94},"Fujairah":{lat:25.12,lng:56.34},"Umm Al Quwain":{lat:25.55,lng:55.55}};
  const plants=customers.filter(c=>c.emirate===em&&c.lat&&c.lng);
  const optimize=pts=>{if(!pts.length)return[];let cur=EC[em]||{lat:24.2,lng:55.7},rem=[...pts],route=[];while(rem.length){let ni=0,md=Infinity;rem.forEach((p,i)=>{const d=Math.hypot(p.lat-cur.lat,p.lng-cur.lng);if(d<md){md=d;ni=i;}});route.push(rem[ni]);cur=rem[ni];rem.splice(ni,1);}return route;};
  const route=optimize(plants);
  return(
    <div className="pg fade-up">
      <div style={{marginBottom:14}}><div style={{fontSize:22,fontWeight:800,color:"#fff"}}>Route Planner</div><div style={{fontSize:12,color:T.muted}}>Nearest-neighbor optimization · minimize travel</div></div>
      <div style={{display:"flex",gap:6,overflowX:"auto",marginBottom:14,paddingBottom:4}}>
        {EMIRATES.map(e=><button key={e} onClick={()=>setEm(e)} className={em===e?"chip on":"chip"}>{e} ({customers.filter(c=>c.emirate===e).length})</button>)}
      </div>
      <div className="card" style={{marginBottom:14,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div><div style={{fontWeight:700,color:"#fff",fontSize:15}}>{em}</div><div style={{fontSize:12,color:T.muted}}>{route.length} stops optimized</div></div>
        {route.length>0&&<a href={`https://www.google.com/maps/dir/${route.map(p=>`${p.lat},${p.lng}`).join("/")}`} target="_blank" rel="noopener noreferrer" style={{background:`linear-gradient(135deg,${T.mid},${T.bright})`,color:"#fff",padding:"9px 15px",borderRadius:9,fontSize:12,fontWeight:700,textDecoration:"none",display:"flex",alignItems:"center",gap:6}}><Ic.Map/> Open Maps</a>}
      </div>
      {route.length===0&&<div style={{textAlign:"center",padding:50,color:T.muted}}><div style={{fontSize:36,marginBottom:8}}>🗺</div>No GPS-tagged plants in {em}<div style={{fontSize:12,marginTop:5}}>Add coordinates via Edit Plant</div></div>}
      {route.map((s,i)=>{const b=expiryBadge(s.amcEnd);const next=route[i+1];return(
        <div key={s.id} className="rs">
          <div className="rn">{i+1}</div>
          <div style={{flex:1}}>
            <div style={{fontWeight:700,color:"#fff",fontSize:14}}>{s.name}</div>
            <div style={{fontSize:12,color:T.muted}}>📍 {s.location} · 💧 {s.capacity||"—"}</div>
            {next&&<div style={{fontSize:11,color:T.light,marginTop:3}}>↓ ~{(Math.hypot(next.lat-s.lat,next.lng-s.lng)*111).toFixed(1)} km to next</div>}
          </div>
          <span className="tag" style={{background:b.color+"22",color:b.color,fontSize:10}}>{b.label}</span>
        </div>
      );})}
    </div>
  );
};

// ─── Report Form ──────────────────────────────────────────────────────────────
const ReportForm = ({customer,techName,onSave,onClose}) => {
  const [f,setF]=useState({customerId:customer.id,customerName:customer.name,location:customer.location,capacity:customer.capacity,operatorName:customer.operatorName||"",technicianName:techName,visitDate:todayStr(),lastVisitDate:"",nextVisitDate:"",contactNo:customer.contactNo||"",warrantyValid:customer.amcEnd||"",plantNo:customer.docNo||"",membraneType:"",membraneName:"",noOfMembrane:"",pumpTypes:["","","","",""],readings:{},wellSamples:{well1:"",well2:"",well3:"",well4:""},productWater:"",rejectWater:"",remarks:"",signature:"",photos:[]});
  const set=(k,v)=>setF(x=>({...x,[k]:v}));
  const fileRef=useRef();
  const addPhotos=async files=>{const c=await Promise.all(Array.from(files).slice(0,6).map(compressImg));setF(x=>({...x,photos:[...(x.photos||[]),...c].slice(0,8)}));};
  const D=({t})=>(<div className="divr"><span>{t}</span></div>);
  return(
    <div className="overlay" style={{alignItems:"flex-start",paddingTop:10}}>
      <div className="modal" style={{maxWidth:700}}>
        <div style={{background:`linear-gradient(135deg,${T.navy},${T.mid})`,margin:"-24px -24px 20px",padding:"18px 24px",borderRadius:"18px 18px 0 0",textAlign:"center"}}>
          <div style={{fontSize:10,color:"rgba(255,255,255,0.5)",letterSpacing:2}}>RO UNIT VISIT REPORT</div>
          <div style={{fontSize:17,fontWeight:800,color:"#fff",marginTop:4}}>{customer.name}</div>
          <div style={{fontSize:12,color:"rgba(255,255,255,0.55)",marginTop:3}}>📍 {customer.location} · 💧 {customer.capacity||"—"}</div>
        </div>
        <D t="PLANT INFORMATION"/>
        <div className="g2">
          {[{l:"Plant No.",k:"plantNo"},{l:"AMC/Warranty Valid",k:"warrantyValid"},{l:"Operator Name",k:"operatorName"},{l:"Technician Name",k:"technicianName"},{l:"Contact No.",k:"contactNo"},{l:"Visit Date",k:"visitDate",t:"date"},{l:"Last Visited",k:"lastVisitDate",t:"date"},{l:"Next Visit",k:"nextVisitDate",t:"date"}].map(x=>(
            <div key={x.k} className="fg"><label>{x.l}</label><input type={x.t||"text"} value={f[x.k]||""} onChange={e=>set(x.k,e.target.value)}/></div>
          ))}
        </div>
        <D t="PUMPS & MEMBRANES"/>
        <div className="g2">
          {f.pumpTypes.map((p,i)=><div key={i} className="fg"><label>Pump {i+1}</label><input value={p} onChange={e=>{const a=[...f.pumpTypes];a[i]=e.target.value;set("pumpTypes",a);}}/></div>)}
          {[{l:"Membrane Name",k:"membraneName"},{l:"Membrane Type",k:"membraneType"},{l:"No. of Membranes",k:"noOfMembrane"}].map(x=><div key={x.k} className="fg"><label>{x.l}</label><input value={f[x.k]||""} onChange={e=>set(x.k,e.target.value)}/></div>)}
        </div>
        <D t="PRESSURE, FLOW & DOSING READINGS"/>
        <div className="g4">
          {READINGS_META.map(r=><div key={r.key} className="fg"><label style={{color:T.light}}>{r.label}</label><input value={f.readings[r.key]||""} onChange={e=>setF(x=>({...x,readings:{...x.readings,[r.key]:e.target.value}}))} placeholder="—" style={{textAlign:"center",fontFamily:T.mono}}/><div style={{fontSize:9,color:T.muted,marginTop:2}}>{r.desc}</div></div>)}
        </div>
        <D t="WATER SAMPLES (TDS)"/>
        <div className="g2">
          {["well1","well2","well3","well4"].map((w,i)=><div key={w} className="fg"><label>Well {i+1}</label><input value={f.wellSamples[w]} onChange={e=>setF(x=>({...x,wellSamples:{...x.wellSamples,[w]:e.target.value}}))}/></div>)}
          <div className="fg"><label>Product Water TDS</label><input value={f.productWater} onChange={e=>set("productWater",e.target.value)}/></div>
          <div className="fg"><label>Reject Water TDS</label><input value={f.rejectWater} onChange={e=>set("rejectWater",e.target.value)}/></div>
        </div>
        <D t="REMARKS & OBSERVATIONS"/>
        <div className="fg"><textarea rows={3} value={f.remarks} onChange={e=>set("remarks",e.target.value)} style={{resize:"vertical"}} placeholder="Issues found, work done, next steps…"/></div>
        <D t="SITE PHOTOS"/>
        <button className="btn-soft" style={{fontSize:13}} onClick={()=>fileRef.current.click()}><Ic.Camera/> Attach Photos (max 8)</button>
        <input ref={fileRef} type="file" accept="image/*" multiple style={{display:"none"}} onChange={e=>addPhotos(e.target.files)}/>
        {f.photos.length>0&&<div className="photo-wrap">{f.photos.map((p,i)=><div key={i} style={{position:"relative"}}><img src={p} className="photo-thumb" alt="" onClick={()=>window.open(p,"_blank")}/><button onClick={()=>setF(x=>({...x,photos:x.photos.filter((_,j)=>j!==i)}))} style={{position:"absolute",top:-6,right:-6,background:T.danger,color:"#fff",border:"none",borderRadius:"50%",width:20,height:20,fontSize:12,cursor:"pointer",padding:0,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700}}>×</button></div>)}</div>}
        <D t="OPERATOR / TECHNICIAN SIGNATURE"/>
        <SigPad onSave={v=>set("signature",v)} onClear={()=>set("signature","")}/>
        <div style={{display:"flex",gap:10,marginTop:20}}>
          <button className="btn-s" style={{flex:1,justifyContent:"center",fontSize:14,padding:"12px"}} onClick={()=>onSave(f)}><Ic.Check/> Submit Report</button>
          <button className="btn-soft" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

// ─── Reports ──────────────────────────────────────────────────────────────────
const Reports = ({customers,reports,setReports,user}) => {
  const [step,setStep]=useState("list"), [selC,setSelC]=useState(null), [view,setView]=useState(null);
  const [month,setMonth]=useState(new Date().toISOString().slice(0,7));
  const [search,setSearch]=useState(""), [cSearch,setCSearch]=useState("");
  const filtered=reports.filter(r=>(!month||(r.date||"").startsWith(month))&&(!search||r.customerName?.toLowerCase().includes(search.toLowerCase()))).sort((a,b)=>new Date(b.submittedAt||0)-new Date(a.submittedAt||0));
  const save=f=>{setReports(rs=>[{...f,id:uid(),date:f.visitDate,submittedBy:user.name,submittedAt:new Date().toISOString()},...rs]);setStep("list");setSelC(null);};
  return(
    <div className="pg fade-up">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
        <div><div style={{fontSize:22,fontWeight:800,color:"#fff"}}>Reports</div><div style={{fontSize:12,color:T.muted}}>{filtered.length} visit reports</div></div>
        <button className="btn-p" style={{padding:"8px 14px",fontSize:13}} onClick={()=>setStep("selectCustomer")}><Ic.Plus/> New Report</button>
      </div>
      <div style={{display:"flex",gap:8,marginBottom:13,flexWrap:"wrap"}}>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Search plant…" style={{flex:1,minWidth:150}}/>
        <input type="month" value={month} onChange={e=>setMonth(e.target.value)} style={{width:155}}/>
      </div>
      {filtered.length===0&&<div style={{textAlign:"center",padding:50,color:T.muted}}><div style={{fontSize:36,marginBottom:8}}>📋</div>No reports found</div>}
      {filtered.map(r=>(
        <div key={r.id} className="cc">
          <div style={{cursor:"pointer"}} onClick={()=>setView(r)}>
            <div style={{display:"flex",justifyContent:"space-between"}}>
              <div><div style={{fontWeight:700,fontSize:14,color:"#fff"}}>{r.customerName}</div><div style={{fontSize:12,color:T.muted}}>📍 {r.location} · 📅 {r.date}</div><div style={{fontSize:12,color:T.muted}}>👤 {r.submittedBy}{r.photos?.length?` · 📷 ${r.photos.length}`:""}</div></div>
              <span className="tag" style={{background:T.accent2+"22",color:T.accent2,flexShrink:0,alignSelf:"flex-start"}}>✔ Done</span>
            </div>
          </div>
          <div style={{display:"flex",gap:7,marginTop:10}}>
            <button className="btn-g" style={{padding:"5px 12px",fontSize:12}} onClick={()=>setView(r)}>View</button>
            <button className="btn-soft" style={{padding:"5px 12px",fontSize:12}} onClick={()=>exportPDF(r)}><Ic.PDF/> PDF</button>
            {user.role==="admin"&&<button className="btn-d" style={{padding:"5px 9px",fontSize:12}} onClick={()=>{if(window.confirm("Delete this report?"))setReports(rs=>rs.filter(x=>x.id!==r.id));}}><Ic.Trash/></button>}
          </div>
        </div>
      ))}

      {step==="selectCustomer"&&(
        <div className="overlay"><div className="modal" style={{maxWidth:460}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
            <div style={{fontSize:16,fontWeight:800,color:"#fff"}}>Select Plant</div>
            <button className="btn-g" style={{padding:"5px 8px"}} onClick={()=>setStep("list")}><Ic.X/></button>
          </div>
          <input placeholder="🔍 Search…" value={cSearch} onChange={e=>setCSearch(e.target.value)} style={{marginBottom:11}}/>
          <div style={{maxHeight:430,overflowY:"auto"}}>
            {customers.filter(c=>c.name.toLowerCase().includes(cSearch.toLowerCase())||c.location.toLowerCase().includes(cSearch.toLowerCase())).map(c=>(
              <div key={c.id} className="cc" style={{cursor:"pointer"}} onClick={()=>{setSelC(c);setStep("form");}}>
                <div style={{fontWeight:600,color:"#fff",fontSize:14}}>{c.name}</div>
                <div style={{fontSize:12,color:T.muted}}>📍 {c.location} · {c.emirate}</div>
              </div>
            ))}
          </div>
        </div></div>
      )}
      {step==="form"&&selC&&<ReportForm customer={selC} techName={user.name} onSave={save} onClose={()=>{setStep("list");setSelC(null);}}/>}

      {view&&(
        <div className="overlay" style={{alignItems:"flex-start",paddingTop:10}}>
          <div className="modal" style={{maxWidth:700}}>
            <div style={{background:`linear-gradient(135deg,${T.navy},${T.mid})`,margin:"-24px -24px 20px",padding:"18px 24px",borderRadius:"18px 18px 0 0",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div><div style={{fontSize:16,fontWeight:800,color:"#fff"}}>{view.customerName}</div><div style={{fontSize:12,color:"rgba(255,255,255,0.55)"}}>📅 {view.date} · 👤 {view.submittedBy}</div></div>
              <div style={{display:"flex",gap:7}}>
                <button onClick={()=>exportPDF(view)} style={{background:"rgba(255,255,255,0.14)",color:"#fff",border:"none",borderRadius:8,padding:"7px 11px",fontSize:12,cursor:"pointer",fontFamily:T.font,fontWeight:600,display:"flex",alignItems:"center",gap:5}}><Ic.PDF/> PDF</button>
                <button onClick={()=>setView(null)} style={{background:"rgba(255,255,255,0.14)",color:"#fff",border:"none",borderRadius:8,padding:"7px 8px",cursor:"pointer",display:"flex",alignItems:"center"}}><Ic.X/></button>
              </div>
            </div>
            <div className="g2" style={{marginBottom:13}}>
              {[["Plant",view.customerName],["Location",view.location],["Visit Date",view.date],["Technician",view.technicianName],["Operator",view.operatorName],["Next Visit",view.nextVisitDate],["Product Water",view.productWater],["Reject Water",view.rejectWater]].map(([k,v])=>(
                <div key={k} style={{background:T.bg,border:`1px solid ${T.border}`,borderRadius:9,padding:10}}><div style={{fontSize:9,color:T.muted,fontWeight:700,letterSpacing:1}}>{k.toUpperCase()}</div><div style={{fontSize:13,fontWeight:600,color:"#fff",marginTop:2}}>{v||"—"}</div></div>
              ))}
            </div>
            <div className="sec-lbl">READINGS</div>
            <div className="g4" style={{marginBottom:13}}>
              {READINGS_META.map(r=><div key={r.key} style={{background:T.bg,border:`1px solid ${T.border}`,borderRadius:9,padding:8,textAlign:"center"}}><div style={{fontSize:9,color:T.muted}}>{r.label}</div><div style={{fontSize:17,fontWeight:700,color:T.light,fontFamily:T.mono}}>{view.readings?.[r.key]||"—"}</div></div>)}
            </div>
            {view.remarks&&<div style={{background:T.bg,border:`1px solid ${T.border}`,borderRadius:9,padding:11,marginBottom:13}}><div style={{fontSize:9,color:T.muted,fontWeight:700,letterSpacing:1,marginBottom:4}}>REMARKS</div><div style={{fontSize:13}}>{view.remarks}</div></div>}
            {view.photos?.length>0&&<div style={{marginBottom:13}}><div className="sec-lbl">SITE PHOTOS</div><div className="photo-wrap">{view.photos.map((p,i)=><img key={i} src={p} className="photo-thumb" alt="" onClick={()=>window.open(p,"_blank")}/>)}</div></div>}
            {view.signature&&<div style={{marginBottom:13}}><div className="sec-lbl">SIGNATURE</div><img src={view.signature} alt="sig" style={{border:`1px solid ${T.border}`,borderRadius:9,maxWidth:"100%",background:T.bg,maxHeight:110}}/></div>}
            <div style={{fontSize:10,color:T.muted,textAlign:"right"}}>Submitted {new Date(view.submittedAt).toLocaleString()}</div>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Settings ─────────────────────────────────────────────────────────────────
const Settings = ({user,onLogout,customers,reports,firebaseOk}) => {
  const exp=customers.filter(c=>daysUntil(c.amcEnd)!==null&&daysUntil(c.amcEnd)<0);
  const warn60=customers.filter(c=>{const d=daysUntil(c.amcEnd);return d!==null&&d>=0&&d<=60;});
  const Row=({l,v,c})=>(<div style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:`1px solid ${T.border}`}}><span style={{fontSize:13,color:T.muted}}>{l}</span><span style={{fontSize:13,fontWeight:700,color:c||T.light,fontFamily:T.mono}}>{v}</span></div>);
  return(
    <div className="pg fade-up">
      <div style={{fontSize:22,fontWeight:800,color:"#fff",marginBottom:16}}>Settings</div>
      <div style={{background:`linear-gradient(135deg,${T.navy},${T.mid})`,borderRadius:14,padding:20,marginBottom:12,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-18,right:-18,width:90,height:90,borderRadius:"50%",background:"rgba(255,255,255,0.06)"}}/>
        <Logo size={26}/>
        <div style={{fontSize:10,color:"rgba(255,255,255,0.42)",marginTop:10,letterSpacing:1}}>AMC MANAGEMENT SYSTEM</div>
        <div style={{fontSize:11,color:"rgba(255,255,255,0.45)",marginTop:2}}>superquality-est.com</div>
      </div>

      <div className="card" style={{marginBottom:12}}>
        <div className="sec-lbl">Account</div>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:10}}>
          <div style={{width:42,height:42,borderRadius:"50%",background:`linear-gradient(135deg,${T.mid},${T.bright})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,fontWeight:700,color:"#fff",flexShrink:0}}>{user.name.charAt(0)}</div>
          <div><div style={{fontWeight:700,fontSize:15,color:"#fff"}}>{user.name}</div><div style={{fontSize:12,color:T.muted}}>@{user.username}</div></div>
          <span className="tag" style={{marginLeft:"auto",background:user.role==="admin"?T.mid+"44":T.accent2+"22",color:user.role==="admin"?T.light:T.accent2}}>{user.role.toUpperCase()}</span>
        </div>
        {user.role==="technician"&&<div style={{fontSize:12,color:T.muted,padding:"8px 11px",background:T.bg,borderRadius:8}}>View-only access. Contact admin to add or edit plants.</div>}
      </div>

      <div className="card" style={{marginBottom:12}}>
        <div className="sec-lbl">Data Sync</div>
        <div style={{display:"flex",alignItems:"center",gap:10,padding:"6px 0"}}>
          <span style={{width:10,height:10,borderRadius:"50%",background:firebaseOk?T.accent2:T.warn,boxShadow:firebaseOk?`0 0 8px ${T.accent2}`:undefined,display:"inline-block",flexShrink:0}}/>
          <div>
            <div style={{fontSize:13,fontWeight:600,color:"#fff"}}>{firebaseOk?"Firebase Connected — Live Sync":"Local Storage Only"}</div>
            <div style={{fontSize:11,color:T.muted}}>{firebaseOk?"Reports sync across all devices in real time":"Set up Firebase to share reports between users"}</div>
          </div>
        </div>
      </div>

      <div className="card" style={{marginBottom:12}}>
        <div className="sec-lbl">System Stats</div>
        <Row l="Total Plants" v={customers.length} c={T.light}/>
        <Row l="Total Reports" v={reports.length} c={T.light}/>
        <Row l="Expired Contracts" v={exp.length} c={exp.length>0?T.danger:T.accent2}/>
        <Row l="Expiring ≤60 Days" v={warn60.length} c={warn60.length>0?T.warn:T.accent2}/>
      </div>

      <div className="card" style={{marginBottom:12}}>
        <div className="sec-lbl">Contract Alerts</div>
        {exp.length===0&&warn60.length===0?<div style={{color:T.accent2,fontSize:13,display:"flex",alignItems:"center",gap:8}}><Ic.Check/> All contracts up to date</div>
        :[...exp,...warn60].sort((a,b)=>daysUntil(a.amcEnd)-daysUntil(b.amcEnd)).map(c=>{const b=expiryBadge(c.amcEnd);return(
          <div key={c.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:`1px solid ${T.border}`}}>
            <div><div style={{fontSize:13,fontWeight:600,color:"#fff"}}>{c.name}</div><div style={{fontSize:11,color:T.muted}}>{c.location} · {c.amcEnd||"—"}</div></div>
            <span className="tag" style={{background:b.color+"22",color:b.color}}>{b.label}</span>
          </div>
        );})}
      </div>

      {user.role==="admin"&&(
        <div className="card" style={{marginBottom:12}}>
          <div className="sec-lbl">App Users</div>
          {USERS.map(u=>(
            <div key={u.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:`1px solid ${T.border}`}}>
              <div><div style={{fontSize:13,fontWeight:600,color:"#fff"}}>{u.name}</div><div style={{fontSize:11,color:T.muted}}>@{u.username}</div></div>
              <span className="tag" style={{background:u.role==="admin"?T.mid+"44":T.accent2+"22",color:u.role==="admin"?T.light:T.accent2}}>{u.role}</span>
            </div>
          ))}
        </div>
      )}
      <button className="btn-d" style={{width:"100%",justifyContent:"center",padding:"13px",fontSize:15,borderRadius:12,marginTop:4}} onClick={onLogout}><Ic.Out/> Sign Out</button>
      <div style={{textAlign:"center",marginTop:14,fontSize:10,color:T.muted}}>Super Quality Trading LLC · superquality-est.com</div>
    </div>
  );
};

// ─── App Root ─────────────────────────────────────────────────────────────────
export default function App() {
  useEffect(()=>injectCSS(),[]);

  const [firebaseOk, setFirebaseOk] = useState(false);
  const [user, setUser]             = useState(null);
  const [tab, setTab]               = useState("home");
  const [customers, setRawC]        = useState(SEED_CUSTOMERS);
  const [reports, setRawR]          = useState([]);
  const [loading, setLoading]       = useState(true);

  // ── Init Firebase ────────────────────────────────────────────────────────────
  useEffect(()=>{
    fbInit().then(ok=>{
      setFirebaseOk(ok);
      if(ok){
        fbListen("sq_customers", data=>{ if(data) setRawC(Object.values(data)); });
        fbListen("sq_reports",   data=>{ if(data) setRawR(Object.values(data).sort((a,b)=>new Date(b.submittedAt||0)-new Date(a.submittedAt||0))); });
      } else {
        const c=local.get("sq:customers"); if(c) setRawC(c);
        const r=local.get("sq:reports");   if(r) setRawR(r);
      }
      setLoading(false);
    });
  },[]);

  // ── Restore login session on page refresh ────────────────────────────────────
  useEffect(()=>{
    const s = local.get("sq_session");
    if(s?.user && (Date.now()-s.ts < 8*60*60*1000)){
      setUser(s.user);  // stays logged in for 8 hours
    }
  },[]);

  // ── Persist customers ────────────────────────────────────────────────────────
  const setCustomers = useCallback(upd=>{
    setRawC(prev=>{
      const next = typeof upd==="function" ? upd(prev) : upd;
      if(firebaseOk){ const o={}; next.forEach(c=>{ o[c.id]=c; }); fbSet("sq_customers",o); }
      else { local.set("sq:customers",next); }
      return next;
    });
  },[firebaseOk]);

  // ── Persist reports ──────────────────────────────────────────────────────────
  const setReports = useCallback(upd=>{
    setRawR(prev=>{
      const next = typeof upd==="function" ? upd(prev) : upd;
      if(firebaseOk){ const o={}; next.forEach(r=>{ o[r.id]=r; }); fbSet("sq_reports",o); }
      else { local.set("sq:reports",next); }
      return next;
    });
  },[firebaseOk]);

  const logout = () => { local.del("sq_session"); setUser(null); setTab("home"); };
  const alertCount = customers.filter(c=>{const d=daysUntil(c.amcEnd);return d!==null&&d<=30;}).length;

  const TABS = [
    {id:"home",     label:"Home",    I:Ic.Home},
    {id:"customers",label:"Plants",  I:Ic.Plants},
    {id:"route",    label:"Route",   I:Ic.Route},
    {id:"reports",  label:"Reports", I:Ic.Reports},
    {id:"settings", label:"Settings",I:Ic.Settings},
  ];

  if(!user) return <Login onLogin={u=>{setUser(u);setTab("home");}} firebaseOk={firebaseOk}/>;

  if(loading) return(
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:`linear-gradient(135deg,${T.navy},${T.mid})`,flexDirection:"column",gap:20}}>
      <Logo size={32}/><div style={{color:"rgba(255,255,255,0.38)",fontSize:11,letterSpacing:3}}>LOADING…</div>
    </div>
  );

  const pp = {customers,reports,user,firebaseOk};

  return(
    <div className="shell">
      {/* Top bar */}
      <div className="tbar">
        <Logo size={22}/>
        <div style={{display:"flex",alignItems:"center",gap:11}}>
          {alertCount>0&&<div style={{position:"relative",cursor:"pointer",color:T.warn,display:"flex"}} onClick={()=>setTab("settings")}><Ic.Bell/><span style={{position:"absolute",top:-5,right:-5,background:T.danger,color:"#fff",borderRadius:10,fontSize:9,padding:"1px 5px",fontWeight:800,lineHeight:1.5}}>{alertCount}</span></div>}
          <div style={{display:"flex",alignItems:"center",gap:7}}>
            <span className="dot-live"/>
            <div style={{width:30,height:30,borderRadius:"50%",background:`linear-gradient(135deg,${T.mid},${T.bright})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:"#fff"}}>{user.name.charAt(0)}</div>
            <span style={{fontSize:12,color:T.muted,display:"none",["@media(min-width:640px)"]:{display:"block"}}}>{user.name}</span>
          </div>
        </div>
      </div>

      {/* Body: sidebar + main */}
      <div style={{display:"flex",flex:1,overflow:"hidden"}}>
        {/* Sidebar — tablet/desktop */}
        <aside style={{width:205,background:T.navy,borderRight:`1px solid ${T.border}`,display:"none",flexDirection:"column",padding:"14px 10px",gap:3,position:"sticky",top:53,height:"calc(100vh - 53px)",overflowY:"auto",flexShrink:0}} className="sidebar-desktop" id="sidebar">
          <div style={{fontSize:9,color:T.muted,fontWeight:700,letterSpacing:2,padding:"10px 13px 5px",textTransform:"uppercase"}}>Navigation</div>
          {TABS.map(t=>(
            <button key={t.id} className={`sitem ${tab===t.id?"on":""}`} onClick={()=>setTab(t.id)}>
              <t.I/> {t.label}
              {t.id==="settings"&&alertCount>0&&<span style={{marginLeft:"auto",width:17,height:17,borderRadius:"50%",background:T.danger,color:"#fff",fontSize:9,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800}}>{alertCount}</span>}
            </button>
          ))}
          <div style={{marginTop:"auto",paddingTop:14,borderTop:`1px solid ${T.border}`}}>
            <div style={{fontSize:12,color:"#fff",fontWeight:600,padding:"0 13px 2px"}}>{user.name}</div>
            <div style={{fontSize:10,color:T.muted,padding:"0 13px 10px"}}>@{user.username} · {user.role}</div>
            <button className="btn-soft" style={{width:"100%",justifyContent:"center",fontSize:12,padding:"8px"}} onClick={logout}><Ic.Out/> Sign Out</button>
          </div>
        </aside>

        {/* Main content */}
        <main style={{flex:1,overflowY:"auto",minWidth:0}}>
          {tab==="home"       && <Dashboard  {...pp} onTab={setTab}/>}
          {tab==="customers"  && <Customers  {...pp} setCustomers={setCustomers}/>}
          {tab==="route"      && <Route      customers={customers}/>}
          {tab==="reports"    && <Reports    {...pp} setReports={setReports}/>}
          {tab==="settings"   && <Settings   {...pp} onLogout={logout}/>}
        </main>
      </div>

      {/* Bottom nav — mobile only */}
      <nav className="bnav">
        {TABS.map(t=>(
          <button key={t.id} className={`nb ${tab===t.id?"on":""}`} onClick={()=>setTab(t.id)}>
            <t.I/>{t.label}
            {t.id==="settings"&&alertCount>0&&<span style={{position:"absolute",top:8,right:"calc(50% - 15px)",width:6,height:6,borderRadius:"50%",background:T.danger}}/>}
          </button>
        ))}
      </nav>

      {/* Inject sidebar show/hide via media query */}
      <style>{`@media(min-width:768px){#sidebar{display:flex!important}}`}</style>
    </div>
  );
}
