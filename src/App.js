import { useState, useEffect, useRef, useCallback } from "react";

// ─── Super Quality Brand Theme ────────────────────────────────────────────────
const T = {
  // Core brand blues from logo
  navy:     "#1a237e",   // darkest navy
  royal:    "#1e3a8a",   // deep royal blue (main bg)
  mid:      "#1d4ed8",   // mid blue
  bright:   "#2563eb",   // bright blue
  wave:     "#3b82f6",   // wave blue
  light:    "#60a5fa",   // light blue accent
  pale:     "#dbeafe",   // very pale blue
  white:    "#ffffff",

  // UI surfaces
  bg:       "#0f1f5c",   // deep navy background
  surface:  "#162470",   // card surface
  card:     "#1a2b80",   // elevated card
  border:   "#2d43a8",   // border

  // Accents & status
  accent:   "#60a5fa",   // light blue (primary interactive)
  accent2:  "#34d399",   // green for success
  warn:     "#fbbf24",   // amber warning
  danger:   "#f87171",   // red danger
  text:     "#e8f0fe",   // main text
  muted:    "#93afd4",   // muted text

  // Typography
  font:     "'Outfit', sans-serif",
  mono:     "'JetBrains Mono', monospace",
};

// ─── Seed Data ────────────────────────────────────────────────────────────────
const SEED_CUSTOMERS = [
  { id:"c1",  name:"Altwesa Investment",            location:"Malaket",             capacity:"40,000 GPD",            docNo:"SQ-ROQ-0626-003",      amcStart:"2026-02-01", duration:"3 year",   amcEnd:"2029-02-01", emirate:"Abu Dhabi", lat:24.192,lng:55.763,contactNo:"",operatorName:"" },
  { id:"c2",  name:"Altwesa Investment",            location:"Zakher",              capacity:"60,000 GPD",            docNo:"SQ-ROQ-0626-003",      amcStart:"2026-02-01", duration:"3 year",   amcEnd:"2029-02-01", emirate:"Abu Dhabi", lat:24.155,lng:55.712,contactNo:"",operatorName:"" },
  { id:"c3",  name:"Altwesa Investment",            location:"Zakher",              capacity:"60,000 GPD",            docNo:"SQ-ROQ-0626-004",      amcStart:"2026-02-01", duration:"3 year",   amcEnd:"2029-02-01", emirate:"Abu Dhabi", lat:24.153,lng:55.714,contactNo:"",operatorName:"" },
  { id:"c4",  name:"Altwesa Investment",            location:"Zakher",              capacity:"60,000 GPD",            docNo:"SQ-ROQ-0626-005",      amcStart:"2026-02-01", duration:"3 year",   amcEnd:"2029-02-01", emirate:"Abu Dhabi", lat:24.151,lng:55.716,contactNo:"",operatorName:"" },
  { id:"c5",  name:"Altwesa Investment",            location:"Al Saad",             capacity:"80,000 GPD",            docNo:"SQ-ROQ-0626-002",      amcStart:"2026-02-01", duration:"3 year",   amcEnd:"2029-02-01", emirate:"Abu Dhabi", lat:24.206,lng:55.741,contactNo:"",operatorName:"" },
  { id:"c6",  name:"Altwesa Investment",            location:"Al Saad",             capacity:"100,000 GPD",           docNo:"SQ-ROQ-0626-002",      amcStart:"2026-02-01", duration:"3 year",   amcEnd:"2029-02-01", emirate:"Abu Dhabi", lat:24.208,lng:55.743,contactNo:"",operatorName:"" },
  { id:"c7",  name:"Abdualh Alhashmy",              location:"Al Khatem",           capacity:"20,000 GPD",            docNo:"SQ-ROQ-060-001",       amcStart:"2026-01-23", duration:"1 year",   amcEnd:"2027-01-23", emirate:"Abu Dhabi", lat:24.078,lng:55.485,contactNo:"",operatorName:"" },
  { id:"c8",  name:"Tristar RO1",                   location:"Al Khatem",           capacity:"80,000 GPD",            docNo:"SQ-ROM-0522-010",      amcStart:"2025-07-16", duration:"1 year",   amcEnd:"2026-07-16", emirate:"Abu Dhabi", lat:24.075,lng:55.483,contactNo:"",operatorName:"" },
  { id:"c9",  name:"Tristar RO2",                   location:"Al Khatem",           capacity:"80,000 GPD",            docNo:"SQ-ROM-0522-010",      amcStart:"2025-07-16", duration:"1 year",   amcEnd:"2026-07-16", emirate:"Abu Dhabi", lat:24.073,lng:55.481,contactNo:"",operatorName:"" },
  { id:"c10", name:"Hamad Al Mazrouei",             location:"Al Khatem",           capacity:"20,000 GPD",            docNo:"SQ-ROM-0623-002",      amcStart:"2025-07-23", duration:"1 year",   amcEnd:"2026-07-23", emirate:"Abu Dhabi", lat:24.076,lng:55.487,contactNo:"",operatorName:"" },
  { id:"c11", name:"Hameed Nasir Al Shamsi RO-1",   location:"Al Zahra Truck Road", capacity:"20,000 GPD",            docNo:"050-6128585",          amcStart:"2025-07-18", duration:"1 year",   amcEnd:"2026-07-18", emirate:"Abu Dhabi", lat:24.215,lng:55.798,contactNo:"050-6128585",operatorName:"" },
  { id:"c12", name:"Pure Harvest Smart Farms",      location:"Nahel, Al Ain",       capacity:"22,000 GPD (3.5m³/hr)",docNo:"PO#PO21028922",        amcStart:"2025-08-28", duration:"1 year",   amcEnd:"2026-08-28", emirate:"Abu Dhabi", lat:24.312,lng:55.922,contactNo:"",operatorName:"" },
  { id:"c13", name:"Philadelphia Agricultural",     location:"Ajban",               capacity:"40,000 GPD (12k ppm)", docNo:"",                     amcStart:"2025-03-21", duration:"1 year",   amcEnd:"2026-03-21", emirate:"Abu Dhabi", lat:24.523,lng:54.612,contactNo:"",operatorName:"" },
  { id:"c14", name:"Saeed Khalfan Al Kabey",        location:"Al Bahya",            capacity:"",                     docNo:"",                     amcStart:"2025-04-05", duration:"1 year",   amcEnd:"2026-04-05", emirate:"Abu Dhabi", lat:24.488,lng:54.698,contactNo:"",operatorName:"" },
  { id:"c15", name:"Hamd Jasim Al Darwesh Fakhro",  location:"Rahbah",              capacity:"60,000 GPD",           docNo:"SQ-CRO 0519 002",      amcStart:"2025-04-03", duration:"3 year",   amcEnd:"2028-04-03", emirate:"Abu Dhabi", lat:24.352,lng:54.512,contactNo:"",operatorName:"" },
  { id:"c16", name:"Al Farah Contracting",          location:"Asab",                capacity:"100,000 GPD",          docNo:"ROM-0623 003",         amcStart:"2024-03-01", duration:"3 year",   amcEnd:"2027-03-01", emirate:"Abu Dhabi", lat:23.117,lng:53.775,contactNo:"",operatorName:"" },
  { id:"c17", name:"AL HADEEL Old",                 location:"Liwa",                capacity:"20,000 GPD",           docNo:"",                     amcStart:"2025-09-25", duration:"1 year",   amcEnd:"2026-09-25", emirate:"Abu Dhabi", lat:23.129,lng:53.771,contactNo:"",operatorName:"" },
  { id:"c18", name:"AL HADEEL New",                 location:"Liwa",                capacity:"40,000 GPD TDS",       docNo:"",                     amcStart:"2025-01-17", duration:"1 year",   amcEnd:"2026-01-17", emirate:"Abu Dhabi", lat:23.127,lng:53.769,contactNo:"",operatorName:"" },
  { id:"c19", name:"Nasir Al Harthy",               location:"Liwa",                capacity:"3 ROs",                docNo:"",                     amcStart:"2025-10-25", duration:"1 year",   amcEnd:"2026-10-25", emirate:"Abu Dhabi", lat:23.131,lng:53.773,contactNo:"",operatorName:"" },
  { id:"c20", name:"Villa Sultan Al Habtoor",       location:"Dubai - Jumeirah",    capacity:"40,000 GPD",           docNo:"050-7169230",          amcStart:"2025-02-17", duration:"1 year",   amcEnd:"2026-02-17", emirate:"Dubai",     lat:25.186,lng:55.263,contactNo:"050-7169230",operatorName:"" },
  { id:"c21", name:"Philadelphia Agricultural",     location:"Ajban",               capacity:"25,000 GPD (14k ppm)",docNo:"050 871 9131",         amcStart:"2025-05-20", duration:"1 year",   amcEnd:"2026-05-20", emirate:"Abu Dhabi", lat:24.525,lng:54.614,contactNo:"050 871 9131",operatorName:"" },
  { id:"c22", name:"Philadelphia",                  location:"Dubai",               capacity:"",                     docNo:"",                     amcStart:"2025-09-15", duration:"6 Months", amcEnd:"2026-03-15", emirate:"Dubai",     lat:25.188,lng:55.265,contactNo:"",operatorName:"" },
  { id:"c23", name:"Qumra Transport",               location:"Unknown",             capacity:"",                     docNo:"",                     amcStart:"2025-03-05", duration:"1 year",   amcEnd:"2026-03-05", emirate:"Abu Dhabi", lat:24.183,lng:55.752,contactNo:"",operatorName:"" },
  { id:"c24", name:"Philadelphia Agricultural",     location:"Ajban",               capacity:"40,000 GPD (22k ppm)",docNo:"",                     amcStart:"2025-02-28", duration:"1 year",   amcEnd:"2026-02-28", emirate:"Abu Dhabi", lat:24.527,lng:54.616,contactNo:"",operatorName:"" },
  { id:"c25", name:"Emirates Dairy Farm",           location:"Al Ain",              capacity:"50,000 GPD",           docNo:"SQ-ROM-0623-007",      amcStart:"2025-04-04", duration:"1 year",   amcEnd:"2026-04-04", emirate:"Abu Dhabi", lat:24.223,lng:55.831,contactNo:"",operatorName:"" },
  { id:"c26", name:"Blue Gulf",                     location:"Unknown",             capacity:"",                     docNo:"",                     amcStart:"",           duration:"Rental",   amcEnd:"",           emirate:"Dubai",     lat:25.192,lng:55.271,contactNo:"",operatorName:"" },
  { id:"c27", name:"Zakiya",                        location:"Liwa",                capacity:"60,000 GPD @20000ppm", docNo:"",                     amcStart:"",           duration:"1 year",   amcEnd:"",           emirate:"Abu Dhabi", lat:23.133,lng:53.775,contactNo:"",operatorName:"" },
  { id:"c28", name:"Al Ain Palace (Sheikha Moza)",  location:"Al Ain",              capacity:"130,000 GPD @8000ppm", docNo:"SQ-25-09",            amcStart:"",           duration:"1 year",   amcEnd:"",           emirate:"Abu Dhabi", lat:24.228,lng:55.837,contactNo:"",operatorName:"" },
  { id:"c29", name:"Mohamed Al Ketby",              location:"Nahil",               capacity:"80,000 GPD @9000ppm",  docNo:"SQ-25-08",            amcStart:"",           duration:"1 year",   amcEnd:"",           emirate:"Abu Dhabi", lat:24.318,lng:55.928,contactNo:"",operatorName:"" },
  { id:"c30", name:"Agri Tech Agricultural LLC",    location:"Nahil",               capacity:"80,000 GPD @9000ppm",  docNo:"AG-PO-2024-10-00140", amcStart:"2025-11-14", duration:"1 year",   amcEnd:"2026-11-14", emirate:"Abu Dhabi", lat:24.316,lng:55.926,contactNo:"",operatorName:"" },
];

const SEED_USERS = [
  { id:"u1", username:"admin", password:"admin123", role:"admin",      name:"Admin User" },
  { id:"u2", username:"tech1", password:"tech123",  role:"technician", name:"Ahmed Al Mansoori" },
  { id:"u3", username:"tech2", password:"tech456",  role:"technician", name:"Khalid Al Rashidi" },
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
  {key:"DT2",label:"DT2",desc:"Dosing Tank Antiscalant"},
  {key:"DT3",label:"DT3",desc:"Dosing Tank NaOH"},
  {key:"DT4",label:"DT4",desc:"Dosing Tank Chloride"},
  {key:"FM1",label:"FM1",desc:"Flow Meter Production (GPM)"},
  {key:"FM2",label:"FM2",desc:"Flow Meter Rejection (GPM)"},
];

// ─── Utilities ────────────────────────────────────────────────────────────────
const uid = () => `id_${Date.now()}_${Math.random().toString(36).slice(2,7)}`;
const todayStr = () => new Date().toISOString().split("T")[0];
const daysUntil = (d) => { if(!d) return null; return Math.ceil((new Date(d)-new Date())/86400000); };
const expiryBadge = (end) => {
  const d = daysUntil(end);
  if(d===null) return {label:"No Date", color:T.muted};
  if(d<0)      return {label:"EXPIRED",  color:T.danger};
  if(d<=30)    return {label:`${d}d left`,color:T.danger};
  if(d<=90)    return {label:`${d}d left`,color:T.warn};
  return              {label:`${d}d left`,color:T.accent2};
};
const compressImg = async(file,maxW=800)=>{
  const url=await new Promise(r=>{const fr=new FileReader();fr.onload=e=>r(e.target.result);fr.readAsDataURL(file);});
  return new Promise(r=>{const img=new Image();img.onload=()=>{const c=document.createElement("canvas");const ratio=Math.min(maxW/img.width,maxW/img.height,1);c.width=img.width*ratio;c.height=img.height*ratio;c.getContext("2d").drawImage(img,0,0,c.width,c.height);r(c.toDataURL("image/jpeg",0.75));};img.src=url;});
};

// ─── Storage ──────────────────────────────────────────────────────────────────
const store = {
  async get(k){try{const v=localStorage.getItem(k);return v?JSON.parse(v):null;}catch{return null;}},
  async set(k,v){try{localStorage.setItem(k,JSON.stringify(v));return true;}catch{return false;}},
};

// ─── PDF Export ───────────────────────────────────────────────────────────────
const exportPDF = (report) => {
  const win = window.open("","_blank","width=820,height=960");
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&display=swap');
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:'Outfit',sans-serif;background:#fff;color:#1a237e;padding:0}
    .header{background:linear-gradient(135deg,#1a237e 0%,#1d4ed8 60%,#3b82f6 100%);color:#fff;padding:28px 32px;position:relative;overflow:hidden}
    .header::before{content:'';position:absolute;top:-40px;right:-40px;width:200px;height:200px;border-radius:50%;background:rgba(255,255,255,0.07)}
    .header::after{content:'';position:absolute;bottom:-60px;left:20%;width:300px;height:120px;border-radius:50%;background:rgba(255,255,255,0.05)}
    .logo-row{display:flex;align-items:center;gap:14px;margin-bottom:14px}
    .logo-icon{width:48px;height:48px;background:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:24px}
    .company{font-size:20px;font-weight:700;letter-spacing:1px}
    .company span{display:block;font-size:12px;font-weight:400;opacity:.8;letter-spacing:2px}
    .report-title{font-size:15px;font-weight:600;opacity:.9;letter-spacing:1px;margin-top:4px}
    .body{padding:24px 32px}
    .sec{font-size:11px;font-weight:700;color:#1d4ed8;letter-spacing:2px;text-transform:uppercase;border-bottom:2px solid #dbeafe;padding-bottom:5px;margin:18px 0 10px}
    table{width:100%;border-collapse:collapse;margin-bottom:6px;font-size:12px}
    td,th{border:1px solid #dbeafe;padding:7px 10px}
    th{background:#eff6ff;font-weight:700;color:#1a237e;width:40%}
    .readings-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-bottom:6px}
    .reading-box{border:1px solid #dbeafe;border-radius:6px;padding:8px;text-align:center;background:#f8fbff}
    .reading-key{font-size:10px;font-weight:700;color:#1d4ed8}
    .reading-val{font-size:16px;font-weight:700;color:#1a237e;font-family:monospace}
    .reading-desc{font-size:8px;color:#93afd4;margin-top:2px}
    .photos{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:8px}
    .photos img{width:180px;height:120px;object-fit:cover;border-radius:6px;border:1px solid #dbeafe}
    .sig-box{border:1px solid #dbeafe;border-radius:8px;padding:12px;background:#f8fbff;display:inline-block}
    .sig-box img{max-width:240px;max-height:80px}
    .footer{background:#eff6ff;border-top:2px solid #dbeafe;padding:14px 32px;display:flex;justify-content:space-between;align-items:center;font-size:10px;color:#6b7aa1;margin-top:20px}
    .badge{display:inline-block;padding:3px 10px;border-radius:12px;font-size:10px;font-weight:700;background:#dbeafe;color:#1a237e}
  `;
  const rows = (pairs) => pairs.map(([k,v])=>`<tr><th>${k}</th><td>${v||"—"}</td></tr>`).join("");
  win.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Visit Report — ${report.customerName}</title><style>${css}</style></head><body>
    <div class="header">
      <div class="logo-row"><div class="logo-icon">💧</div><div><div class="company">SUPER QUALITY<span>Trading LLC. · superquality-est.com</span></div></div></div>
      <div class="report-title">RO UNIT VISIT REPORT &nbsp;·&nbsp; ${report.customerName} &nbsp;·&nbsp; ${report.date}</div>
    </div>
    <div class="body">
      <div class="sec">Plant Information</div>
      <table>${rows([["Plant / Doc No.",report.plantNo],["Client Name",report.customerName],["Location",report.location],["Capacity",report.capacity],["AMC / Warranty Valid",report.warrantyValid],["Operator Name",report.operatorName],["Technician Name",report.technicianName],["Contact No.",report.contactNo],["Visit Date",report.date],["Last Visited",report.lastVisitDate],["Next Visit",report.nextVisitDate]])}</table>
      <div class="sec">Membrane & Pump Details</div>
      <table>${rows([["Membrane Name",report.membraneName],["Membrane Type",report.membraneType],["No. of Membranes",report.noOfMembrane],...(report.pumpTypes||[]).filter(Boolean).map((p,i)=>[`Pump ${i+1}`,p])])}</table>
      <div class="sec">Pressure, Flow & Dosing Readings</div>
      <div class="readings-grid">${READINGS_META.map(r=>`<div class="reading-box"><div class="reading-key">${r.label}</div><div class="reading-val">${report.readings?.[r.key]||"—"}</div><div class="reading-desc">${r.desc}</div></div>`).join("")}</div>
      <div class="sec">Water Sample Analysis (TDS)</div>
      <table>${rows([["Well 1",report.wellSamples?.well1],["Well 2",report.wellSamples?.well2],["Well 3",report.wellSamples?.well3],["Well 4",report.wellSamples?.well4],["Product Water",report.productWater],["Reject Water",report.rejectWater]])}</table>
      ${report.remarks?`<div class="sec">Remarks & Observations</div><p style="border:1px solid #dbeafe;border-radius:6px;padding:10px;font-size:12px;background:#f8fbff">${report.remarks}</p>`:""}
      ${report.photos?.length?`<div class="sec">Site Photos</div><div class="photos">${report.photos.map(p=>`<img src="${p}"/>`).join("")}</div>`:""}
      ${report.signature?`<div class="sec">Signature</div><div class="sig-box"><img src="${report.signature}"/></div>`:""}
    </div>
    <div class="footer"><span>Generated: ${new Date().toLocaleString()}</span><span>Submitted by: ${report.submittedBy}</span><span class="badge">superquality-est.com</span></div>
  </body></html>`);
  win.document.close();
  setTimeout(()=>win.print(),700);
};

// ─── CSS ──────────────────────────────────────────────────────────────────────
const injectCSS = () => {
  if(document.getElementById("sq-css")) return;
  const s = document.createElement("style"); s.id="sq-css";
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    html,body,#root{height:100%;font-family:'Outfit',sans-serif;background:${T.bg};color:${T.text};-webkit-font-smoothing:antialiased}

    /* Wave background */
    body::before{content:'';position:fixed;top:0;left:0;right:0;height:260px;background:linear-gradient(135deg,${T.navy} 0%,${T.royal} 40%,${T.mid} 100%);z-index:0;pointer-events:none}
    body::after{content:'';position:fixed;top:180px;left:-10%;right:-10%;height:120px;background:${T.bg};border-radius:60% 60% 0 0/40px;z-index:0;pointer-events:none}
    #root{position:relative;z-index:1}

    /* Scrollbar */
    ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:${T.bg}}::-webkit-scrollbar-thumb{background:${T.border};border-radius:4px}

    /* Inputs */
    input,select,textarea{background:${T.surface};color:${T.text};border:1.5px solid ${T.border};border-radius:10px;padding:10px 14px;font-family:'Outfit',sans-serif;font-size:14px;width:100%;outline:none;transition:all .2s}
    input:focus,select:focus,textarea:focus{border-color:${T.accent};box-shadow:0 0 0 3px ${T.accent}20;background:${T.card}}
    input::placeholder{color:${T.muted}}
    select option{background:${T.surface}}

    /* Buttons */
    button{cursor:pointer;font-family:'Outfit',sans-serif;font-weight:600;border:none;border-radius:10px;padding:10px 18px;transition:all .2s;display:inline-flex;align-items:center;gap:6px;letter-spacing:.3px}
    .btn-primary{background:linear-gradient(135deg,${T.mid},${T.bright});color:#fff;box-shadow:0 4px 14px ${T.mid}55}
    .btn-primary:hover{transform:translateY(-1px);box-shadow:0 6px 20px ${T.mid}77}
    .btn-success{background:linear-gradient(135deg,#059669,#34d399);color:#fff;box-shadow:0 4px 14px #05996955}
    .btn-success:hover{transform:translateY(-1px)}
    .btn-danger{background:linear-gradient(135deg,#dc2626,#f87171);color:#fff}
    .btn-danger:hover{transform:translateY(-1px)}
    .btn-ghost{background:transparent;color:${T.accent};border:1.5px solid ${T.border}}
    .btn-ghost:hover{border-color:${T.accent};background:${T.accent}14}
    .btn-soft{background:${T.surface};color:${T.text};border:1.5px solid ${T.border}}
    .btn-soft:hover{border-color:${T.accent}55;color:${T.accent}}

    /* Cards */
    .card{background:${T.card};border:1px solid ${T.border};border-radius:16px;padding:18px}
    .card-glass{background:rgba(26,43,128,0.7);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.12);border-radius:16px;padding:18px}

    /* Tags */
    .tag{display:inline-block;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;letter-spacing:.5px}

    /* Modal */
    .overlay{position:fixed;inset:0;background:rgba(10,20,80,0.85);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;z-index:1000;padding:14px}
    .modal{background:${T.card};border:1px solid ${T.border};border-radius:20px;padding:26px;width:100%;max-width:660px;max-height:92vh;overflow-y:auto;box-shadow:0 25px 60px #00000060}

    /* Form */
    .fg{margin-bottom:14px}
    .fg label{display:block;font-size:11px;color:${T.muted};margin-bottom:5px;font-weight:600;letter-spacing:1.2px;text-transform:uppercase}
    .g2{display:grid;grid-template-columns:1fr 1fr;gap:14px}
    .g4{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}
    @media(max-width:500px){.g2{grid-template-columns:1fr}.g4{grid-template-columns:repeat(2,1fr)}}

    /* Bottom nav */
    .bnav{position:fixed;bottom:0;left:0;right:0;max-width:600px;margin:0 auto;background:${T.navy};border-top:1px solid ${T.border};display:flex;z-index:99;padding-bottom:env(safe-area-inset-bottom,0)}
    .nb{flex:1;display:flex;flex-direction:column;align-items:center;gap:3px;padding:10px 4px 8px;font-size:10px;font-weight:600;color:${T.muted};background:none;border:none;cursor:pointer;font-family:'Outfit',sans-serif;letter-spacing:.5px;transition:color .2s;position:relative}
    .nb.on{color:${T.white}}
    .nb.on::before{content:'';position:absolute;top:0;left:20%;right:20%;height:2px;background:linear-gradient(90deg,${T.mid},${T.light});border-radius:0 0 3px 3px}
    .nb svg{width:21px;height:21px}

    /* Top bar */
    .tbar{padding:14px 16px 12px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:50;background:transparent}

    /* Page */
    .pg{padding:14px 16px 90px;min-height:100vh}

    /* Customer card */
    .cc{background:${T.card};border:1.5px solid ${T.border};border-radius:14px;padding:15px;margin-bottom:10px;transition:all .2s;cursor:pointer}
    .cc:hover{border-color:${T.accent}55;transform:translateY(-1px);box-shadow:0 4px 20px #00000030}

    /* Route stop */
    .rs{background:${T.card};border:1.5px solid ${T.border};border-radius:14px;padding:14px;margin-bottom:10px;display:flex;align-items:center;gap:12px}
    .rn{width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,${T.mid},${T.bright});display:flex;align-items:center;justify-content:center;color:#fff;font-size:13px;font-weight:700;flex-shrink:0;box-shadow:0 3px 10px ${T.mid}55}

    /* Signature */
    .sig-pad{border:1.5px dashed ${T.accent}55;border-radius:10px;background:${T.bg};touch-action:none;display:block;width:100%}

    /* Photo */
    .photo-thumb{width:76px;height:70px;object-fit:cover;border-radius:10px;border:1.5px solid ${T.border};cursor:pointer;transition:transform .2s}
    .photo-thumb:hover{transform:scale(1.05)}
    .photo-wrap{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}

    /* Chip filter */
    .chip{display:inline-flex;align-items:center;gap:4px;padding:5px 13px;border-radius:20px;font-size:11px;font-weight:600;border:1.5px solid ${T.border};color:${T.muted};cursor:pointer;transition:all .2s;background:${T.surface};white-space:nowrap;letter-spacing:.3px}
    .chip.on{border-color:${T.accent};color:#fff;background:linear-gradient(135deg,${T.mid},${T.bright})}

    /* Alert banners */
    .alert-bar{background:${T.danger}18;border:1.5px solid ${T.danger}44;border-radius:12px;padding:11px 15px;margin-bottom:12px;display:flex;align-items:center;gap:10px}
    .warn-bar{background:${T.warn}18;border:1.5px solid ${T.warn}44;border-radius:12px;padding:11px 15px;margin-bottom:12px;display:flex;align-items:center;gap:10px}

    /* Section label */
    .sec-label{font-size:11px;color:${T.muted};font-weight:700;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:12px}

    /* Animations */
    @keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
    @keyframes shimmer{0%,100%{opacity:1}50%{opacity:.4}}
    .fade-up{animation:fadeUp .35s ease both}
    .shimmer{animation:shimmer 1.8s infinite}

    /* Wave SVG divider in login */
    .wave-divider{position:absolute;bottom:0;left:0;right:0;line-height:0}
  `;
  document.head.appendChild(s);
};

// ─── Logo Component ───────────────────────────────────────────────────────────
const Logo = ({ size = 32 }) => (
  <div style={{display:"flex",alignItems:"center",gap:10}}>
    <div style={{width:size,height:size,background:"#fff",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:`0 3px 12px rgba(255,255,255,0.3)`,flexShrink:0}}>
      <svg width={size*0.65} height={size*0.65} viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="16" r="12" fill={T.mid}/>
        <path d="M10 28 Q20 22 30 28 Q20 34 10 28Z" fill={T.mid}/>
        <circle cx="20" cy="16" r="7" fill="white"/>
        <path d="M14 22 Q20 19 26 22" stroke={T.mid} strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      </svg>
    </div>
    <div>
      <div style={{fontSize:size*0.5,fontWeight:800,color:"#fff",lineHeight:1,letterSpacing:1}}>SUPER QUALITY</div>
      <div style={{fontSize:size*0.28,color:"rgba(255,255,255,0.7)",letterSpacing:2,fontWeight:400}}>Trading LLC.</div>
    </div>
  </div>
);

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

// ─── Signature Pad ────────────────────────────────────────────────────────────
const SigPad = ({ onSave, onClear }) => {
  const ref=useRef(); const drawing=useRef(false); const last=useRef(null);
  const getPos=(e,c)=>{const r=c.getBoundingClientRect(),s=e.touches?e.touches[0]:e;return{x:s.clientX-r.left,y:s.clientY-r.top};};
  const start=e=>{e.preventDefault();drawing.current=true;last.current=getPos(e,ref.current);};
  const end=()=>{drawing.current=false;onSave&&onSave(ref.current.toDataURL());};
  const move=e=>{
    if(!drawing.current)return;e.preventDefault();
    const c=ref.current,ctx=c.getContext("2d"),p=getPos(e,c);
    ctx.strokeStyle="#fff";ctx.lineWidth=2.5;ctx.lineCap="round";ctx.lineJoin="round";
    ctx.beginPath();ctx.moveTo(last.current.x,last.current.y);ctx.lineTo(p.x,p.y);ctx.stroke();
    last.current=p;
  };
  const clear=()=>{ref.current.getContext("2d").clearRect(0,0,ref.current.width,ref.current.height);onClear&&onClear();};
  return(
    <div>
      <canvas ref={ref} width={400} height={110} className="sig-pad" style={{height:110}}
        onMouseDown={start} onMouseMove={move} onMouseUp={end}
        onTouchStart={start} onTouchMove={move} onTouchEnd={end}/>
      <button className="btn-ghost" style={{marginTop:7,padding:"4px 12px",fontSize:11}} onClick={clear}>Clear Signature</button>
    </div>
  );
};

// ─── Login Page ───────────────────────────────────────────────────────────────
const Login = ({ onLogin }) => {
  const [u,setU]=useState(""); const [p,setP]=useState(""); const [err,setErr]=useState(""); const [loading,setLoading]=useState(false);
  const go=()=>{
    setLoading(true); setErr("");
    setTimeout(()=>{
      const found=SEED_USERS.find(x=>x.username===u&&x.password===p);
      if(found) onLogin(found); else { setErr("Invalid username or password"); setLoading(false); }
    },400);
  };
  return(
    <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:20,position:"relative",overflow:"hidden"}}>
      {/* Animated wave background */}
      <div style={{position:"absolute",top:0,left:0,right:0,bottom:0,background:`linear-gradient(160deg,${T.navy} 0%,${T.royal} 45%,${T.mid} 100%)`,zIndex:0}}/>
      <svg style={{position:"absolute",bottom:0,left:0,right:0,zIndex:0}} viewBox="0 0 1440 200" preserveAspectRatio="none" height="160">
        <path d="M0,100 C360,160 720,40 1080,100 C1260,130 1380,90 1440,80 L1440,200 L0,200Z" fill={T.bg} opacity="0.6"/>
        <path d="M0,130 C300,80 600,170 900,120 C1100,90 1300,140 1440,120 L1440,200 L0,200Z" fill={T.bg} opacity="0.8"/>
        <path d="M0,160 C240,140 480,180 720,160 C960,140 1200,170 1440,155 L1440,200 L0,200Z" fill={T.bg}/>
      </svg>

      <div style={{position:"relative",zIndex:1,width:"100%",maxWidth:380,animation:"fadeUp .5s ease"}}>
        <div style={{textAlign:"center",marginBottom:36}}>
          <Logo size={38}/>
          <div style={{marginTop:20,fontSize:13,color:"rgba(255,255,255,0.6)",letterSpacing:3}}>AMC MANAGEMENT PORTAL</div>
        </div>

        <div className="card-glass" style={{borderColor:"rgba(255,255,255,0.15)"}}>
          <div style={{fontSize:18,fontWeight:700,color:"#fff",marginBottom:20,textAlign:"center"}}>Sign In</div>
          <div className="fg"><label style={{color:"rgba(255,255,255,0.6)"}}>Username</label>
            <input value={u} onChange={e=>setU(e.target.value)} placeholder="Enter your username" onKeyDown={e=>e.key==="Enter"&&go()} style={{background:"rgba(255,255,255,0.1)",border:"1.5px solid rgba(255,255,255,0.2)",color:"#fff"}}/>
          </div>
          <div className="fg"><label style={{color:"rgba(255,255,255,0.6)"}}>Password</label>
            <input type="password" value={p} onChange={e=>setP(e.target.value)} placeholder="Enter your password" onKeyDown={e=>e.key==="Enter"&&go()} style={{background:"rgba(255,255,255,0.1)",border:"1.5px solid rgba(255,255,255,0.2)",color:"#fff"}}/>
          </div>
          {err&&<div style={{color:"#fca5a5",fontSize:12,marginBottom:12,textAlign:"center"}}>{err}</div>}
          <button className="btn-primary" style={{width:"100%",justifyContent:"center",padding:"13px",fontSize:15,background:"rgba(255,255,255,0.95)",color:T.royal,fontWeight:700,borderRadius:12}} onClick={go} disabled={loading}>
            {loading?"Signing in…":"Sign In →"}
          </button>
          <div style={{marginTop:16,textAlign:"center",fontSize:11,color:"rgba(255,255,255,0.4)"}}>
            admin / admin123 &nbsp;·&nbsp; tech1 / tech123 &nbsp;·&nbsp; tech2 / tech456
          </div>
        </div>

        <div style={{textAlign:"center",marginTop:20,fontSize:11,color:"rgba(255,255,255,0.4)"}}>
          superquality-est.com
        </div>
      </div>
    </div>
  );
};

// ─── Dashboard ────────────────────────────────────────────────────────────────
const Dashboard = ({ customers, reports, user, onTab }) => {
  const total=customers.length;
  const expired=customers.filter(c=>{const d=daysUntil(c.amcEnd);return d!==null&&d<0;}).length;
  const exp30=customers.filter(c=>{const d=daysUntil(c.amcEnd);return d!==null&&d>=0&&d<=30;}).length;
  const active=customers.filter(c=>{const d=daysUntil(c.amcEnd);return d!==null&&d>30;}).length;
  const monthR=reports.filter(r=>(r.date||"").startsWith(new Date().toISOString().slice(0,7))).length;
  const pct=total?Math.round((monthR/total)*100):0;

  return(
    <div className="pg fade-up">
      {/* Header hero */}
      <div style={{marginBottom:24,paddingTop:4}}>
        <div style={{fontSize:13,color:"rgba(255,255,255,0.6)",fontWeight:500}}>Good {new Date().getHours()<12?"morning":"afternoon"},</div>
        <div style={{fontSize:24,fontWeight:800,color:"#fff",lineHeight:1.1}}>{user.name}</div>
        <div style={{fontSize:12,color:"rgba(255,255,255,0.5)",marginTop:2}}>{new Date().toLocaleDateString("en-AE",{weekday:"long",day:"numeric",month:"long",year:"numeric"})}</div>
      </div>

      {expired>0&&<div className="alert-bar"><Ic.Alert/><span style={{color:T.danger,fontWeight:700,fontSize:13}}>{expired} contract{expired>1?"s":""} have EXPIRED — renewal needed!</span></div>}
      {exp30>0&&<div className="warn-bar"><Ic.Bell/><span style={{color:T.warn,fontWeight:700,fontSize:13}}>{exp30} contract{exp30>1?"s":""} expiring within 30 days</span></div>}

      {/* Stats */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}>
        {[{l:"Total Plants",v:total,c:T.light,icon:"🏭"},{l:"Active",v:active,c:T.accent2,icon:"✅"},{l:"Expiring ≤30d",v:exp30,c:T.warn,icon:"⏳"},{l:"Expired",v:expired,c:T.danger,icon:"❌"}].map(s=>(
          <div key={s.l} className="card" style={{cursor:"pointer",borderColor:s.c+"33"}} onClick={()=>onTab("customers")}>
            <div style={{fontSize:11,marginBottom:6}}>{s.icon}</div>
            <div style={{fontSize:36,fontWeight:800,color:s.c,fontFamily:T.mono,lineHeight:1}}>{s.v}</div>
            <div style={{fontSize:11,color:T.muted,marginTop:4,fontWeight:600,letterSpacing:.5}}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Monthly progress */}
      <div className="card" style={{marginBottom:16,background:`linear-gradient(135deg,${T.surface},${T.card})`}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
          <div>
            <div className="sec-label">Monthly Visits</div>
            <div style={{fontSize:32,fontWeight:800,color:"#fff",fontFamily:T.mono}}>{monthR}<span style={{fontSize:14,color:T.muted,fontWeight:400}}> / {total} plants</span></div>
          </div>
          <div style={{fontSize:26,fontWeight:800,color:pct>=80?T.accent2:pct>=50?T.warn:T.accent}}>{pct}%</div>
        </div>
        <div style={{background:T.bg,borderRadius:8,height:8,overflow:"hidden"}}>
          <div style={{width:`${pct}%`,background:`linear-gradient(90deg,${T.mid},${T.light})`,height:"100%",borderRadius:8,transition:"width .6s ease",boxShadow:`0 0 10px ${T.mid}88`}}/>
        </div>
        <div style={{fontSize:11,color:T.muted,marginTop:8}}>Progress for {new Date().toLocaleDateString("en-AE",{month:"long",year:"numeric"})}</div>
      </div>

      {/* Expiry alerts list */}
      <div className="sec-label">⚠ Upcoming Expirations</div>
      {customers.filter(c=>{const d=daysUntil(c.amcEnd);return d!==null&&d<=90;}).sort((a,b)=>daysUntil(a.amcEnd)-daysUntil(b.amcEnd)).slice(0,5).map(c=>{
        const b=expiryBadge(c.amcEnd);
        return(
          <div key={c.id} className="cc" style={{borderColor:b.color+"44"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
              <div>
                <div style={{fontWeight:700,fontSize:14,color:"#fff"}}>{c.name}</div>
                <div style={{fontSize:12,color:T.muted,marginTop:2}}>📍 {c.location} · {c.emirate}</div>
                <div style={{fontSize:11,color:T.muted}}>Ends: {c.amcEnd||"—"}</div>
              </div>
              <span className="tag" style={{background:b.color+"22",color:b.color,border:`1px solid ${b.color}44`}}>{b.label}</span>
            </div>
          </div>
        );
      })}
      {customers.filter(c=>{const d=daysUntil(c.amcEnd);return d!==null&&d<=90;}).length===0&&(
        <div style={{textAlign:"center",padding:"30px 20px",color:T.muted}}>
          <div style={{fontSize:32,marginBottom:8}}>✅</div>
          <div style={{fontSize:14,fontWeight:600}}>All contracts are healthy</div>
        </div>
      )}
    </div>
  );
};

// ─── Customer Form Modal ──────────────────────────────────────────────────────
const CustomerModal = ({ initial, onSave, onClose }) => {
  const blank={name:"",location:"",capacity:"",docNo:"",amcStart:"",duration:"1 year",amcEnd:"",emirate:"Abu Dhabi",lat:"",lng:"",contactNo:"",operatorName:""};
  const [f,setF]=useState(initial||blank);
  const set=(k,v)=>setF(x=>({...x,[k]:v}));
  return(
    <div className="overlay">
      <div className="modal">
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
          <div style={{fontSize:17,fontWeight:800,color:"#fff"}}>{initial?"Edit Plant":"Add New Plant"}</div>
          <button className="btn-ghost" style={{padding:"6px 8px"}} onClick={onClose}><Ic.X/></button>
        </div>
        <div className="g2">
          {[{l:"Plant Name *",k:"name"},{l:"Location *",k:"location"},{l:"Capacity",k:"capacity"},{l:"Doc / Contract No.",k:"docNo"},{l:"Contact No.",k:"contactNo"},{l:"Operator Name",k:"operatorName"}].map(x=>(
            <div key={x.k} className="fg"><label>{x.l}</label><input value={f[x.k]||""} onChange={e=>set(x.k,e.target.value)}/></div>
          ))}
          <div className="fg"><label>Emirate</label><select value={f.emirate} onChange={e=>set("emirate",e.target.value)}>{EMIRATES.map(e=><option key={e}>{e}</option>)}</select></div>
          <div className="fg"><label>AMC Duration</label><select value={f.duration} onChange={e=>set("duration",e.target.value)}>{["6 Months","1 year","2 year","3 year","Rental"].map(d=><option key={d}>{d}</option>)}</select></div>
          <div className="fg"><label>AMC Start Date</label><input type="date" value={f.amcStart} onChange={e=>set("amcStart",e.target.value)}/></div>
          <div className="fg"><label>AMC End Date</label><input type="date" value={f.amcEnd} onChange={e=>set("amcEnd",e.target.value)}/></div>
          <div className="fg"><label>Latitude (GPS)</label><input type="number" step="0.001" value={f.lat||""} onChange={e=>set("lat",e.target.value)} placeholder="e.g. 24.192"/></div>
          <div className="fg"><label>Longitude (GPS)</label><input type="number" step="0.001" value={f.lng||""} onChange={e=>set("lng",e.target.value)} placeholder="e.g. 55.763"/></div>
        </div>
        <div style={{display:"flex",gap:10,marginTop:18}}>
          <button className="btn-primary" style={{flex:1,justifyContent:"center"}} onClick={()=>{if(!f.name||!f.location)return alert("Name & Location required");onSave(f);}}><Ic.Save/> Save Plant</button>
          <button className="btn-soft" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

// ─── Customers Page ───────────────────────────────────────────────────────────
const Customers = ({ customers, setCustomers, user }) => {
  const [search,setSearch]=useState("");
  const [emirate,setEmirate]=useState("All");
  const [modal,setModal]=useState(null);
  const filtered=customers.filter(c=>(emirate==="All"||c.emirate===emirate)&&(c.name.toLowerCase().includes(search.toLowerCase())||c.location.toLowerCase().includes(search.toLowerCase())));
  const save=(f)=>{
    if(modal==="add") setCustomers(cs=>[...cs,{...f,id:uid()}]);
    else setCustomers(cs=>cs.map(c=>c.id===modal.id?{...f,id:c.id}:c));
    setModal(null);
  };
  return(
    <div className="pg fade-up">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
        <div>
          <div style={{fontSize:22,fontWeight:800,color:"#fff"}}>Plants</div>
          <div style={{fontSize:12,color:T.muted}}>{filtered.length} of {customers.length} shown</div>
        </div>
        {user.role==="admin"&&<button className="btn-primary" style={{padding:"9px 15px",fontSize:13}} onClick={()=>setModal("add")}><Ic.Plus/> Add Plant</button>}
      </div>
      <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Search by name or location…" style={{marginBottom:12}}/>
      <div style={{display:"flex",gap:6,overflowX:"auto",marginBottom:16,paddingBottom:4}}>
        {["All",...EMIRATES].map(e=>(
          <button key={e} onClick={()=>setEmirate(e)} className={emirate===e?"chip on":"chip"}>
            {e}{e!=="All"?` (${customers.filter(c=>c.emirate===e).length})` : ` (${customers.length})`}
          </button>
        ))}
      </div>
      {filtered.map(c=>{const b=expiryBadge(c.amcEnd);return(
        <div key={c.id} className="cc">
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
            <div style={{flex:1}}>
              <div style={{fontWeight:700,fontSize:15,color:"#fff"}}>{c.name}</div>
              <div style={{fontSize:12,color:T.muted,marginTop:3,display:"flex",flexWrap:"wrap",gap:"4px 12px"}}>
                <span>📍 {c.location}</span><span>🏛 {c.emirate}</span>
              </div>
              <div style={{fontSize:12,color:T.muted,marginTop:2,display:"flex",flexWrap:"wrap",gap:"4px 12px"}}>
                <span>💧 {c.capacity||"—"}</span><span>📋 {c.docNo||"—"}</span>
              </div>
              <div style={{fontSize:12,color:T.muted,marginTop:2}}>
                🗓 {c.amcStart||"—"} → {c.amcEnd||"—"} <span style={{color:T.muted}}>({c.duration})</span>
              </div>
            </div>
            <span className="tag" style={{background:b.color+"22",color:b.color,border:`1px solid ${b.color}33`,marginLeft:10,flexShrink:0}}>{b.label}</span>
          </div>
          {user.role==="admin"&&(
            <div style={{display:"flex",gap:8,marginTop:4}}>
              <button className="btn-ghost" style={{padding:"5px 13px",fontSize:12}} onClick={()=>setModal(c)}><Ic.Edit/> Edit</button>
              <button className="btn-danger" style={{padding:"5px 11px",fontSize:12}} onClick={()=>{if(window.confirm("Delete this plant?"))setCustomers(cs=>cs.filter(x=>x.id!==c.id));}}><Ic.Trash/></button>
            </div>
          )}
        </div>
      );})}
      {modal&&<CustomerModal initial={modal==="add"?null:modal} onSave={save} onClose={()=>setModal(null)}/>}
    </div>
  );
};

// ─── Route Planner ────────────────────────────────────────────────────────────
const Route = ({ customers }) => {
  const [em,setEm]=useState("Abu Dhabi");
  const EC={"Abu Dhabi":{lat:24.2,lng:55.7},"Dubai":{lat:25.2,lng:55.27},"Sharjah":{lat:25.35,lng:55.41},"Ajman":{lat:25.4,lng:55.44},"Ras Al Khaimah":{lat:25.78,lng:55.94},"Fujairah":{lat:25.12,lng:56.34},"Umm Al Quwain":{lat:25.55,lng:55.55}};
  const plants=customers.filter(c=>c.emirate===em&&c.lat&&c.lng);
  const optimize=(pts)=>{
    if(!pts.length)return[];
    let cur=EC[em]||{lat:24.2,lng:55.7},rem=[...pts],route=[];
    while(rem.length){let ni=0,md=Infinity;rem.forEach((p,i)=>{const d=Math.hypot(p.lat-cur.lat,p.lng-cur.lng);if(d<md){md=d;ni=i;}});route.push(rem[ni]);cur=rem[ni];rem.splice(ni,1);}
    return route;
  };
  const route=optimize(plants);
  const mapsUrl=route.length?`https://www.google.com/maps/dir/${route.map(p=>`${p.lat},${p.lng}`).join("/")}` :"#";
  return(
    <div className="pg fade-up">
      <div style={{marginBottom:16}}>
        <div style={{fontSize:22,fontWeight:800,color:"#fff"}}>Route Planner</div>
        <div style={{fontSize:12,color:T.muted}}>Nearest-neighbor optimization · minimize travel</div>
      </div>
      <div style={{display:"flex",gap:6,overflowX:"auto",marginBottom:16,paddingBottom:4}}>
        {EMIRATES.map(e=>(
          <button key={e} onClick={()=>setEm(e)} className={em===e?"chip on":"chip"}>
            {e} ({customers.filter(c=>c.emirate===e).length})
          </button>
        ))}
      </div>
      <div className="card" style={{marginBottom:16,background:`linear-gradient(135deg,${T.surface},${T.card})`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div>
          <div style={{fontWeight:700,color:"#fff",fontSize:15}}>{em}</div>
          <div style={{fontSize:12,color:T.muted}}>{route.length} stops optimized</div>
        </div>
        {route.length>0&&(
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer"
            style={{background:`linear-gradient(135deg,${T.mid},${T.bright})`,color:"#fff",padding:"9px 16px",borderRadius:10,fontSize:12,fontWeight:700,textDecoration:"none",display:"flex",alignItems:"center",gap:6,boxShadow:`0 4px 14px ${T.mid}55`}}>
            <Ic.Map/> Open Maps
          </a>
        )}
      </div>
      {route.length===0&&<div style={{textAlign:"center",padding:50,color:T.muted}}><div style={{fontSize:40,marginBottom:10}}>🗺</div><div>No GPS-tagged plants in {em}</div><div style={{fontSize:12,marginTop:6}}>Add coordinates via Edit Plant</div></div>}
      {route.map((s,i)=>{const b=expiryBadge(s.amcEnd);const next=route[i+1];const km=next?Math.hypot(next.lat-s.lat,next.lng-s.lng)*111:0;return(
        <div key={s.id} className="rs">
          <div className="rn">{i+1}</div>
          <div style={{flex:1}}>
            <div style={{fontWeight:700,fontSize:14,color:"#fff"}}>{s.name}</div>
            <div style={{fontSize:12,color:T.muted}}>📍 {s.location} · 💧 {s.capacity||"—"}</div>
            {next&&<div style={{fontSize:11,color:T.light,marginTop:3}}>↓ ~{km.toFixed(1)} km to next</div>}
          </div>
          <span className="tag" style={{background:b.color+"22",color:b.color,border:`1px solid ${b.color}33`,fontSize:10}}>{b.label}</span>
        </div>
      );})}
    </div>
  );
};

// ─── Report Form ──────────────────────────────────────────────────────────────
const ReportForm = ({ customer, techName, onSave, onClose }) => {
  const [f,setF]=useState({
    customerId:customer.id,customerName:customer.name,location:customer.location,
    capacity:customer.capacity,operatorName:customer.operatorName||"",technicianName:techName,
    visitDate:todayStr(),lastVisitDate:"",nextVisitDate:"",contactNo:customer.contactNo||"",
    warrantyValid:customer.amcEnd||"",plantNo:customer.docNo||"",
    membraneType:"",membraneName:"",noOfMembrane:"",pumpTypes:["","","","",""],
    readings:{},wellSamples:{well1:"",well2:"",well3:"",well4:""},
    productWater:"",rejectWater:"",remarks:"",signature:"",photos:[],
  });
  const set=(k,v)=>setF(x=>({...x,[k]:v}));
  const fileRef=useRef();
  const addPhotos=async(files)=>{
    const c=await Promise.all(Array.from(files).slice(0,6).map(compressImg));
    setF(x=>({...x,photos:[...(x.photos||[]),...c].slice(0,8)}));
  };

  const SectionLabel=({children})=>(
    <div style={{fontSize:11,color:T.light,fontWeight:700,letterSpacing:1.5,marginBottom:12,marginTop:4,textTransform:"uppercase",display:"flex",alignItems:"center",gap:8}}>
      <div style={{flex:1,height:1,background:`linear-gradient(90deg,${T.border},transparent)`}}/>
      {children}
      <div style={{flex:1,height:1,background:`linear-gradient(90deg,transparent,${T.border})`}}/>
    </div>
  );

  return(
    <div className="overlay" style={{alignItems:"flex-start",paddingTop:10}}>
      <div className="modal" style={{maxWidth:680}}>
        {/* Report header */}
        <div style={{background:`linear-gradient(135deg,${T.navy},${T.mid})`,margin:"-26px -26px 20px",padding:"20px 26px",borderRadius:"20px 20px 0 0",textAlign:"center"}}>
          <div style={{fontSize:11,color:"rgba(255,255,255,0.6)",letterSpacing:2,marginBottom:6}}>RO UNIT VISIT REPORT</div>
          <div style={{fontSize:18,fontWeight:800,color:"#fff"}}>{customer.name}</div>
          <div style={{fontSize:12,color:"rgba(255,255,255,0.6)",marginTop:4}}>📍 {customer.location} &nbsp;·&nbsp; 💧 {customer.capacity||"—"}</div>
        </div>

        <SectionLabel>Plant Information</SectionLabel>
        <div className="g2" style={{marginBottom:6}}>
          {[{l:"Plant No.",k:"plantNo"},{l:"AMC/Warranty Valid",k:"warrantyValid"},{l:"Operator Name",k:"operatorName"},{l:"Technician Name",k:"technicianName"},{l:"Contact No.",k:"contactNo"},{l:"Visit Date",k:"visitDate",t:"date"},{l:"Last Visited",k:"lastVisitDate",t:"date"},{l:"Next Visit",k:"nextVisitDate",t:"date"}].map(x=>(
            <div key={x.k} className="fg"><label>{x.l}</label><input type={x.t||"text"} value={f[x.k]||""} onChange={e=>set(x.k,e.target.value)}/></div>
          ))}
        </div>

        <SectionLabel>Pumps & Membranes</SectionLabel>
        <div className="g2" style={{marginBottom:6}}>
          {f.pumpTypes.map((p,i)=>(
            <div key={i} className="fg"><label>Pump {i+1}</label><input value={p} onChange={e=>{const a=[...f.pumpTypes];a[i]=e.target.value;set("pumpTypes",a);}}/></div>
          ))}
          {[{l:"Membrane Name",k:"membraneName"},{l:"Membrane Type",k:"membraneType"},{l:"No. of Membranes",k:"noOfMembrane"}].map(x=>(
            <div key={x.k} className="fg"><label>{x.l}</label><input value={f[x.k]||""} onChange={e=>set(x.k,e.target.value)}/></div>
          ))}
        </div>

        <SectionLabel>Pressure, Flow & Dosing Readings</SectionLabel>
        <div className="g4" style={{marginBottom:6}}>
          {READINGS_META.map(r=>(
            <div key={r.key} className="fg">
              <label style={{color:T.light}}>{r.label}</label>
              <input value={f.readings[r.key]||""} onChange={e=>setF(x=>({...x,readings:{...x.readings,[r.key]:e.target.value}}))} placeholder="—" style={{textAlign:"center",fontFamily:T.mono}}/>
              <div style={{fontSize:9,color:T.muted,marginTop:3,lineHeight:1.3}}>{r.desc}</div>
            </div>
          ))}
        </div>

        <SectionLabel>Water Samples (TDS)</SectionLabel>
        <div className="g2" style={{marginBottom:6}}>
          {["well1","well2","well3","well4"].map((w,i)=>(
            <div key={w} className="fg"><label>Well {i+1}</label><input value={f.wellSamples[w]} onChange={e=>setF(x=>({...x,wellSamples:{...x.wellSamples,[w]:e.target.value}}))}/></div>
          ))}
          <div className="fg"><label>Product Water TDS</label><input value={f.productWater} onChange={e=>set("productWater",e.target.value)}/></div>
          <div className="fg"><label>Reject Water TDS</label><input value={f.rejectWater} onChange={e=>set("rejectWater",e.target.value)}/></div>
        </div>

        <SectionLabel>Remarks</SectionLabel>
        <div className="fg" style={{marginBottom:6}}><textarea rows={3} value={f.remarks} onChange={e=>set("remarks",e.target.value)} style={{resize:"vertical"}} placeholder="Observations, issues found, work done…"/></div>

        <SectionLabel>Site Photos</SectionLabel>
        <button className="btn-soft" style={{fontSize:13,padding:"9px 16px"}} onClick={()=>fileRef.current.click()}>
          <Ic.Camera/> Attach Photos (max 8)
        </button>
        <input ref={fileRef} type="file" accept="image/*" multiple style={{display:"none"}} onChange={e=>addPhotos(e.target.files)}/>
        {f.photos.length>0&&(
          <div className="photo-wrap">
            {f.photos.map((p,i)=>(
              <div key={i} style={{position:"relative"}}>
                <img src={p} className="photo-thumb" alt="" onClick={()=>window.open(p,"_blank")}/>
                <button onClick={()=>setF(x=>({...x,photos:x.photos.filter((_,j)=>j!==i)}))} style={{position:"absolute",top:-6,right:-6,background:T.danger,color:"#fff",border:"none",borderRadius:"50%",width:20,height:20,fontSize:13,cursor:"pointer",padding:0,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700}}>×</button>
              </div>
            ))}
          </div>
        )}

        <div style={{marginTop:16}}><SectionLabel>Operator / Technician Signature</SectionLabel></div>
        <SigPad onSave={v=>set("signature",v)} onClear={()=>set("signature","")}/>

        <div style={{display:"flex",gap:10,marginTop:22}}>
          <button className="btn-success" style={{flex:1,justifyContent:"center",fontSize:14,padding:"12px"}} onClick={()=>onSave(f)}>
            <Ic.Check/> Submit Report
          </button>
          <button className="btn-soft" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

// ─── Reports Page ─────────────────────────────────────────────────────────────
const Reports = ({ customers, reports, setReports, user }) => {
  const [step,setStep]=useState("list");
  const [selC,setSelC]=useState(null);
  const [view,setView]=useState(null);
  const [month,setMonth]=useState(new Date().toISOString().slice(0,7));
  const [search,setSearch]=useState("");
  const [cSearch,setCSearch]=useState("");

  const filtered=reports.filter(r=>(!month||(r.date||"").startsWith(month))&&(!search||r.customerName?.toLowerCase().includes(search.toLowerCase()))).sort((a,b)=>new Date(b.submittedAt||0)-new Date(a.submittedAt||0));
  const filteredC=customers.filter(c=>c.name.toLowerCase().includes(cSearch.toLowerCase())||c.location.toLowerCase().includes(cSearch.toLowerCase()));

  const save=(f)=>{
    setReports(rs=>[{...f,id:uid(),date:f.visitDate,submittedBy:user.name,submittedAt:new Date().toISOString()},...rs]);
    setStep("list");setSelC(null);
  };

  return(
    <div className="pg fade-up">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
        <div>
          <div style={{fontSize:22,fontWeight:800,color:"#fff"}}>Reports</div>
          <div style={{fontSize:12,color:T.muted}}>{filtered.length} visit reports</div>
        </div>
        <button className="btn-primary" style={{padding:"9px 15px",fontSize:13}} onClick={()=>setStep("selectCustomer")}><Ic.Plus/> New Report</button>
      </div>

      <div style={{display:"flex",gap:8,marginBottom:14}}>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Search plant…" style={{flex:1}}/>
        <input type="month" value={month} onChange={e=>setMonth(e.target.value)} style={{width:150}}/>
      </div>

      {filtered.length===0&&(
        <div style={{textAlign:"center",padding:"50px 20px",color:T.muted}}>
          <div style={{fontSize:40,marginBottom:10}}>📋</div>
          <div style={{fontSize:14,fontWeight:600}}>No reports for this period</div>
          <div style={{fontSize:12,marginTop:4}}>Tap + New Report to get started</div>
        </div>
      )}

      {filtered.map(r=>(
        <div key={r.id} className="cc">
          <div style={{cursor:"pointer"}} onClick={()=>setView(r)}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
              <div>
                <div style={{fontWeight:700,fontSize:15,color:"#fff"}}>{r.customerName}</div>
                <div style={{fontSize:12,color:T.muted,marginTop:3}}>📍 {r.location} &nbsp;·&nbsp; 📅 {r.date}</div>
                <div style={{fontSize:12,color:T.muted}}>👤 {r.submittedBy}{r.photos?.length?` · 📷 ${r.photos.length} photos`:""}</div>
              </div>
              <span className="tag" style={{background:T.accent2+"22",color:T.accent2,border:`1px solid ${T.accent2}33`}}>✔ Done</span>
            </div>
          </div>
          <div style={{display:"flex",gap:8,marginTop:10}}>
            <button className="btn-ghost" style={{padding:"5px 12px",fontSize:12}} onClick={()=>setView(r)}>View</button>
            <button className="btn-soft"  style={{padding:"5px 12px",fontSize:12}} onClick={()=>exportPDF(r)}><Ic.PDF/> PDF</button>
            {user.role==="admin"&&<button className="btn-danger" style={{padding:"5px 10px",fontSize:12}} onClick={()=>{if(window.confirm("Delete report?"))setReports(rs=>rs.filter(x=>x.id!==r.id));}}><Ic.Trash/></button>}
          </div>
        </div>
      ))}

      {/* Select plant modal */}
      {step==="selectCustomer"&&(
        <div className="overlay">
          <div className="modal" style={{maxWidth:460}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
              <div style={{fontSize:16,fontWeight:800,color:"#fff"}}>Select Plant</div>
              <button className="btn-ghost" style={{padding:"6px 8px"}} onClick={()=>setStep("list")}><Ic.X/></button>
            </div>
            <input placeholder="🔍 Search…" value={cSearch} onChange={e=>setCSearch(e.target.value)} style={{marginBottom:12}}/>
            <div style={{maxHeight:420,overflowY:"auto"}}>
              {filteredC.map(c=>(
                <div key={c.id} className="cc" onClick={()=>{setSelC(c);setStep("form");}}>
                  <div style={{fontWeight:600,fontSize:14,color:"#fff"}}>{c.name}</div>
                  <div style={{fontSize:12,color:T.muted}}>📍 {c.location} · {c.emirate}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {step==="form"&&selC&&<ReportForm customer={selC} techName={user.name} onSave={save} onClose={()=>{setStep("list");setSelC(null);}}/>}

      {/* View report modal */}
      {view&&(
        <div className="overlay" style={{alignItems:"flex-start",paddingTop:10}}>
          <div className="modal" style={{maxWidth:680}}>
            <div style={{background:`linear-gradient(135deg,${T.navy},${T.mid})`,margin:"-26px -26px 20px",padding:"20px 26px",borderRadius:"20px 20px 0 0",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div>
                <div style={{fontSize:16,fontWeight:800,color:"#fff"}}>{view.customerName}</div>
                <div style={{fontSize:12,color:"rgba(255,255,255,0.6)"}}>📅 {view.date} · 👤 {view.submittedBy}</div>
              </div>
              <div style={{display:"flex",gap:8}}>
                <button onClick={()=>exportPDF(view)} style={{background:"rgba(255,255,255,0.15)",color:"#fff",border:"none",borderRadius:8,padding:"7px 12px",fontSize:12,cursor:"pointer",fontFamily:T.font,fontWeight:600,display:"flex",alignItems:"center",gap:5}}><Ic.PDF/> PDF</button>
                <button onClick={()=>setView(null)} style={{background:"rgba(255,255,255,0.15)",color:"#fff",border:"none",borderRadius:8,padding:"7px 8px",cursor:"pointer"}}><Ic.X/></button>
              </div>
            </div>

            <div className="g2" style={{marginBottom:14}}>
              {[["Plant",view.customerName],["Location",view.location],["Visit Date",view.date],["Technician",view.technicianName],["Operator",view.operatorName],["Next Visit",view.nextVisitDate],["Product Water",view.productWater],["Reject Water",view.rejectWater]].map(([k,v])=>(
                <div key={k} style={{background:T.bg,border:`1px solid ${T.border}`,borderRadius:10,padding:10}}>
                  <div style={{fontSize:9,color:T.muted,fontWeight:700,letterSpacing:1}}>{k.toUpperCase()}</div>
                  <div style={{fontSize:13,fontWeight:600,color:"#fff",marginTop:2}}>{v||"—"}</div>
                </div>
              ))}
            </div>

            <div style={{fontSize:11,color:T.light,fontWeight:700,letterSpacing:1.5,marginBottom:10}}>READINGS</div>
            <div className="g4" style={{marginBottom:14}}>
              {READINGS_META.map(r=>(
                <div key={r.key} style={{background:T.bg,border:`1px solid ${T.border}`,borderRadius:10,padding:9,textAlign:"center"}}>
                  <div style={{fontSize:9,color:T.muted}}>{r.label}</div>
                  <div style={{fontSize:18,fontWeight:700,color:T.light,fontFamily:T.mono}}>{view.readings?.[r.key]||"—"}</div>
                </div>
              ))}
            </div>

            {view.remarks&&<div style={{background:T.bg,border:`1px solid ${T.border}`,borderRadius:10,padding:12,marginBottom:14}}><div style={{fontSize:9,color:T.muted,fontWeight:700,letterSpacing:1,marginBottom:5}}>REMARKS</div><div style={{fontSize:13}}>{view.remarks}</div></div>}

            {view.photos?.length>0&&(
              <div style={{marginBottom:14}}>
                <div style={{fontSize:11,color:T.light,fontWeight:700,letterSpacing:1.5,marginBottom:10}}>SITE PHOTOS</div>
                <div className="photo-wrap">{view.photos.map((p,i)=><img key={i} src={p} className="photo-thumb" alt="" onClick={()=>window.open(p,"_blank")}/>)}</div>
              </div>
            )}

            {view.signature&&<div style={{marginBottom:14}}><div style={{fontSize:11,color:T.light,fontWeight:700,letterSpacing:1.5,marginBottom:8}}>SIGNATURE</div><img src={view.signature} alt="sig" style={{border:`1px solid ${T.border}`,borderRadius:10,maxWidth:"100%",background:T.bg,maxHeight:110}}/></div>}

            <div style={{fontSize:10,color:T.muted,textAlign:"right"}}>Submitted {new Date(view.submittedAt).toLocaleString()}</div>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Settings Page ────────────────────────────────────────────────────────────
const Settings = ({ user, onLogout, customers, reports }) => {
  const exp=customers.filter(c=>daysUntil(c.amcEnd)!==null&&daysUntil(c.amcEnd)<0);
  const warn60=customers.filter(c=>{const d=daysUntil(c.amcEnd);return d!==null&&d>=0&&d<=60;});

  const Section=({title,children})=>(
    <div className="card" style={{marginBottom:12}}>
      <div style={{fontSize:11,color:T.muted,fontWeight:700,letterSpacing:1.5,marginBottom:12,textTransform:"uppercase"}}>{title}</div>
      {children}
    </div>
  );

  const Row=({label,value,color})=>(
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:`1px solid ${T.border}`}}>
      <span style={{fontSize:13,color:T.muted}}>{label}</span>
      <span style={{fontSize:13,fontWeight:700,fontFamily:T.mono,color:color||T.light}}>{value}</span>
    </div>
  );

  return(
    <div className="pg fade-up">
      <div style={{fontSize:22,fontWeight:800,color:"#fff",marginBottom:16}}>Settings</div>

      {/* Brand card */}
      <div style={{background:`linear-gradient(135deg,${T.navy},${T.mid})`,borderRadius:16,padding:20,marginBottom:12,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-20,right:-20,width:120,height:120,borderRadius:"50%",background:"rgba(255,255,255,0.06)"}}/>
        <Logo size={30}/>
        <div style={{fontSize:11,color:"rgba(255,255,255,0.5)",marginTop:12,letterSpacing:1}}>AMC MANAGEMENT SYSTEM</div>
        <div style={{fontSize:12,color:"rgba(255,255,255,0.6)",marginTop:2}}>superquality-est.com</div>
      </div>

      <Section title="Account">
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12}}>
          <div style={{width:44,height:44,borderRadius:"50%",background:`linear-gradient(135deg,${T.mid},${T.bright})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,fontWeight:700,color:"#fff",flexShrink:0}}>
            {user.name.charAt(0)}
          </div>
          <div>
            <div style={{fontWeight:700,fontSize:15,color:"#fff"}}>{user.name}</div>
            <div style={{fontSize:12,color:T.muted}}>@{user.username}</div>
          </div>
          <span className="tag" style={{marginLeft:"auto",background:user.role==="admin"?T.mid+"44":T.accent2+"22",color:user.role==="admin"?T.light:T.accent2,border:`1px solid ${user.role==="admin"?T.border:T.accent2+"44"}`}}>
            {user.role.toUpperCase()}
          </span>
        </div>
        {user.role==="technician"&&<div style={{fontSize:12,color:T.muted,padding:"8px 12px",background:T.bg,borderRadius:8}}>View-only access to plant records. Contact admin to add or edit plants.</div>}
      </Section>

      <Section title="System Overview">
        <Row label="Total Plants" value={customers.length} color={T.light}/>
        <Row label="Total Reports" value={reports.length} color={T.light}/>
        <Row label="Expired Contracts" value={exp.length} color={exp.length>0?T.danger:T.accent2}/>
        <Row label="Expiring in 60 Days" value={warn60.length} color={warn60.length>0?T.warn:T.accent2}/>
      </Section>

      <Section title="Contract Alerts">
        {exp.length===0&&warn60.length===0?(
          <div style={{display:"flex",alignItems:"center",gap:10,color:T.accent2,fontSize:13,fontWeight:600}}>
            <Ic.Check/> All contracts are up to date
          </div>
        ):[...exp,...warn60].sort((a,b)=>daysUntil(a.amcEnd)-daysUntil(b.amcEnd)).map(c=>{const b=expiryBadge(c.amcEnd);return(
          <div key={c.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:`1px solid ${T.border}`}}>
            <div>
              <div style={{fontSize:13,fontWeight:600,color:"#fff"}}>{c.name}</div>
              <div style={{fontSize:11,color:T.muted}}>{c.location} · {c.amcEnd||"—"}</div>
            </div>
            <span className="tag" style={{background:b.color+"22",color:b.color,border:`1px solid ${b.color}33`}}>{b.label}</span>
          </div>
        );})}
      </Section>

      {user.role==="admin"&&(
        <Section title="App Users">
          {SEED_USERS.map(u=>(
            <div key={u.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:`1px solid ${T.border}`}}>
              <div>
                <div style={{fontSize:13,fontWeight:600,color:"#fff"}}>{u.name}</div>
                <div style={{fontSize:11,color:T.muted}}>@{u.username}</div>
              </div>
              <span className="tag" style={{background:u.role==="admin"?T.mid+"44":T.accent2+"22",color:u.role==="admin"?T.light:T.accent2}}>{u.role}</span>
            </div>
          ))}
        </Section>
      )}

      <button className="btn-danger" style={{width:"100%",justifyContent:"center",padding:"13px",fontSize:15,marginTop:4,borderRadius:14}} onClick={onLogout}>
        <Ic.Out/> Sign Out
      </button>
      <div style={{textAlign:"center",marginTop:16,fontSize:11,color:T.muted}}>Super Quality Trading LLC · superquality-est.com</div>
    </div>
  );
};

// ─── App Root ─────────────────────────────────────────────────────────────────
export default function App() {
  useEffect(()=>injectCSS(),[]);
  const [user,setUser]       = useState(null);
  const [tab,setTab]         = useState("home");
  const [customers,setRawC]  = useState(SEED_CUSTOMERS);
  const [reports,setRawR]    = useState([]);
  const [loading,setLoading] = useState(true);
  const saveTimer            = useRef(null);

  useEffect(()=>{
    (async()=>{
      const [c,r]=await Promise.all([store.get("sq:customers"),store.get("sq:reports")]);
      if(c) setRawC(c);
      if(r) setRawR(r);
      setLoading(false);
    })();
  },[]);

  const setCustomers=useCallback((upd)=>{
    setRawC(prev=>{
      const next=typeof upd==="function"?upd(prev):upd;
      clearTimeout(saveTimer.current);
      saveTimer.current=setTimeout(()=>store.set("sq:customers",next),800);
      return next;
    });
  },[]);

  const setReports=useCallback((upd)=>{
    setRawR(prev=>{
      const next=typeof upd==="function"?upd(prev):upd;
      clearTimeout(saveTimer.current);
      saveTimer.current=setTimeout(()=>store.set("sq:reports",next),800);
      return next;
    });
  },[]);

  const alertCount=customers.filter(c=>{const d=daysUntil(c.amcEnd);return d!==null&&d<=30;}).length;

  const TABS=[
    {id:"home",    label:"Home",    I:Ic.Home},
    {id:"customers",label:"Plants", I:Ic.Plants},
    {id:"route",   label:"Route",   I:Ic.Route},
    {id:"reports", label:"Reports", I:Ic.Reports},
    {id:"settings",label:"Settings",I:Ic.Settings},
  ];

  if(!user) return <Login onLogin={u=>{setUser(u);setTab("home");}}/>;

  if(loading) return(
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:`linear-gradient(135deg,${T.navy},${T.mid})`,flexDirection:"column",gap:20}}>
      <Logo size={36}/>
      <div style={{color:"rgba(255,255,255,0.5)",fontSize:12,letterSpacing:3,animation:"shimmer 1.8s infinite"}}>LOADING…</div>
    </div>
  );

  return(
    <div style={{maxWidth:600,margin:"0 auto",position:"relative",minHeight:"100vh"}}>
      {/* Top bar */}
      <div className="tbar">
        <Logo size={26}/>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          {alertCount>0&&(
            <div style={{position:"relative",cursor:"pointer",color:"rgba(255,255,255,0.8)"}} onClick={()=>setTab("settings")}>
              <Ic.Bell/>
              <span style={{position:"absolute",top:-5,right:-5,background:T.danger,color:"#fff",borderRadius:10,fontSize:9,padding:"1px 5px",fontWeight:800,lineHeight:1.4}}>{alertCount}</span>
            </div>
          )}
          <div style={{width:32,height:32,borderRadius:"50%",background:"rgba(255,255,255,0.15)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:700,color:"#fff",backdropFilter:"blur(8px)"}}>
            {user.name.charAt(0)}
          </div>
        </div>
      </div>

      {/* Pages */}
      {tab==="home"       && <Dashboard customers={customers} reports={reports} user={user} onTab={setTab}/>}
      {tab==="customers"  && <Customers customers={customers} setCustomers={setCustomers} user={user}/>}
      {tab==="route"      && <Route customers={customers}/>}
      {tab==="reports"    && <Reports customers={customers} reports={reports} setReports={setReports} user={user}/>}
      {tab==="settings"   && <Settings user={user} onLogout={()=>{setUser(null);setTab("home");}} customers={customers} reports={reports}/>}

      {/* Bottom nav */}
      <nav className="bnav">
        {TABS.map(t=>(
          <button key={t.id} className={`nb ${tab===t.id?"on":""}`} onClick={()=>setTab(t.id)} style={{position:"relative"}}>
            <t.I/>
            {t.label}
            {t.id==="settings"&&alertCount>0&&<span style={{position:"absolute",top:8,right:"calc(50% - 16px)",width:6,height:6,borderRadius:"50%",background:T.danger}}/>}
          </button>
        ))}
      </nav>
    </div>
  );
}
