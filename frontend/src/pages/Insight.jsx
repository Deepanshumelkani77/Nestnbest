import React, { useState, useMemo } from "react";
import {
  Calculator,
  TrendingUp,
  ShieldCheck,
  ArrowLeftRight,
  Sofa,
  FileText,
  Ruler,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/* ---------------- helpers ---------------- */
const fmtINR = (n) => "₹ " + Math.round(n).toLocaleString("en-IN");
const fmtINRshort = (n) => Math.round(n).toLocaleString("en-IN");

function calcEMI(P, annualRate, years) {
  const r = annualRate / 12 / 100;
  const n = years * 12;
  if (r === 0) return P / n;
  return (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

function eligibleLoan(emi, annualRate, years) {
  const r = annualRate / 12 / 100;
  const n = years * 12;
  if (r === 0) return emi * n;
  return (emi * (Math.pow(1 + r, n) - 1)) / (r * Math.pow(1 + r, n));
}

const RATE_MONTHS = ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];
const RATE_SERIES = [8.65, 8.6, 8.55, 8.55, 8.5, 8.5, 8.45, 8.4, 8.35, 8.35, 8.35, 8.35];
const RATE_CHART_DATA = RATE_MONTHS.map((m, i) => ({ month: m, rate: RATE_SERIES[i] }));

const INTERIOR_LEVELS = [
  { key: "basic", label: "Basic", rate: 1200 },
  { key: "standard", label: "Standard", rate: 1800 },
  { key: "premium", label: "Premium", rate: 2800 },
];

const INTERIOR_CATEGORIES = [
  { name: "Modular Kitchen", pct: 22, color: "#B4874A" },
  { name: "Wardrobes", pct: 18, color: "#4C7566" },
  { name: "False Ceiling & Electrical", pct: 15, color: "#A15139" },
  { name: "Flooring", pct: 12, color: "#8C6634" },
  { name: "Painting", pct: 10, color: "#6B6F76" },
  { name: "Furniture & Decor", pct: 15, color: "#D9B77C" },
  { name: "Contingency", pct: 8, color: "#DAD7CB" },
];

const STAMP_STATES = {
  Delhi: { male: 6, female: 4 },
  "Uttar Pradesh": { male: 7, female: 6 },
  Haryana: { male: 7, female: 5 },
  Maharashtra: { male: 6, female: 6 },
  Karnataka: { male: 5, female: 5 },
  "Tamil Nadu": { male: 7, female: 7 },
};

const AREA_TO_SQFT = {
  sqft: 1,
  sqm: 10.7639,
  sqyd: 9,
  acre: 43560,
  hectare: 107639.104,
  guntha: 1089,
};
const AREA_LABELS = {
  sqft: "Square Feet",
  sqm: "Square Metre",
  sqyd: "Square Yard",
  acre: "Acre",
  hectare: "Hectare",
  guntha: "Guntha",
};

const NAV_GROUPS = [
  {
    label: "Financing",
    items: [
      { key: "emi", label: "EMI Calculator", Icon: Calculator },
      { key: "rates", label: "Rates & Trends", Icon: TrendingUp },
      { key: "eligibility", label: "Loan Eligibility", Icon: ShieldCheck },
    ],
  },
  {
    label: "Decisions",
    items: [
      { key: "rentbuy", label: "Rent vs Buy", Icon: ArrowLeftRight },
      { key: "interior", label: "Interior Budget", Icon: Sofa },
    ],
  },
  {
    label: "Reference",
    items: [
      { key: "stamp", label: "Stamp Duty", Icon: FileText },
      { key: "area", label: "Area Converter", Icon: Ruler },
    ],
  },
];

/* ---------------- small building blocks ---------------- */
function Field({ label, value, children }) {
  return (
    <div className="field">
      <div className="field-label">
        <span>{label}</span>
        {value !== undefined && <span className="val">{value}</span>}
      </div>
      {children}
    </div>
  );
}

function Range(props) {
  return <input type="range" {...props} />;
}

function LedgerRow({ k, v, strong }) {
  return (
    <div className="ledger-row" style={strong ? { borderTop: "2px solid var(--ink)", marginTop: 6, paddingTop: 14 } : undefined}>
      <span className="k" style={strong ? { fontWeight: 600, color: "var(--ink)" } : undefined}>{k}</span>
      <span className="v mono" style={strong ? { fontSize: 19 } : undefined}>{v}</span>
    </div>
  );
}

/* ================================================================== */

export default function InsightsPage() {
  const [tool, setTool] = useState("emi");

  /* ---------- EMI ---------- */
  const [emiP, setEmiP] = useState(5000000);
  const [emiR, setEmiR] = useState(8.5);
  const [emiN, setEmiN] = useState(20);
  const emi = useMemo(() => {
    const value = calcEMI(emiP, emiR, emiN);
    const totalPayment = value * emiN * 12;
    const totalInterest = totalPayment - emiP;
    const pPct = Math.max(4, Math.min(96, (emiP / totalPayment) * 100));
    return { value, totalPayment, totalInterest, pPct };
  }, [emiP, emiR, emiN]);

  /* ---------- Rent vs Buy ---------- */
  const [rbRent, setRbRent] = useState(28000);
  const [rbPrice, setRbPrice] = useState(7500000);
  const [rbDp, setRbDp] = useState(20);
  const [rbRate, setRbRate] = useState(8.5);
  const [rbYears, setRbYears] = useState(10);
  const [rbApprec, setRbApprec] = useState(5);
  const [rbRentEsc, setRbRentEsc] = useState(6);
  const rentBuy = useMemo(() => {
    const dp = (rbPrice * rbDp) / 100;
    const loan = rbPrice - dp;
    const emiVal = calcEMI(loan, rbRate, Math.max(rbYears, 1));
    const totalEMI = emiVal * rbYears * 12;
    const maintenance = rbPrice * 0.01 * rbYears;
    const buyOutflow = dp + totalEMI + maintenance;

    let rentOutflow = 0;
    let currentRent = rbRent;
    for (let y = 0; y < rbYears; y++) {
      rentOutflow += currentRent * 12;
      currentRent *= 1 + rbRentEsc / 100;
    }

    const futureValue = rbPrice * Math.pow(1 + rbApprec / 100, rbYears);
    const gain = futureValue - rbPrice;
    const netBuyCost = buyOutflow - gain;
    const buyingWins = netBuyCost < rentOutflow;

    return { buyOutflow, rentOutflow, gain, netBuyCost, buyingWins };
  }, [rbRent, rbPrice, rbDp, rbRate, rbYears, rbApprec, rbRentEsc]);

  /* ---------- Loan Eligibility ---------- */
  const [elIncome, setElIncome] = useState(120000);
  const [elExisting, setElExisting] = useState(10000);
  const [elFoir, setElFoir] = useState(50);
  const [elRate, setElRate] = useState(8.5);
  const [elTenure, setElTenure] = useState(20);
  const eligibility = useMemo(() => {
    const maxEMI = Math.max(0, (elIncome * elFoir) / 100 - elExisting);
    const loan = eligibleLoan(maxEMI, elRate, elTenure);
    return { maxEMI, loan };
  }, [elIncome, elExisting, elFoir, elRate, elTenure]);

  /* ---------- Interior Budget ---------- */
  const [inArea, setInArea] = useState(1000);
  const [inLevel, setInLevel] = useState("standard");
  const interior = useMemo(() => {
    const rate = INTERIOR_LEVELS.find((l) => l.key === inLevel).rate;
    const total = inArea * rate;
    const rows = INTERIOR_CATEGORIES.map((c) => ({ ...c, amount: (total * c.pct) / 100 }));
    return { total, rows };
  }, [inArea, inLevel]);

  /* ---------- Stamp Duty ---------- */
  const [sdPrice, setSdPrice] = useState(6000000);
  const [sdStateName, setSdStateName] = useState("Uttar Pradesh");
  const [sdGender, setSdGender] = useState("male");
  const stamp = useMemo(() => {
    const rates = STAMP_STATES[sdStateName];
    const dutyPct = sdGender === "female" ? rates.female : rates.male;
    const duty = (sdPrice * dutyPct) / 100;
    const reg = sdPrice * 0.01;
    return { dutyPct, duty, reg, total: duty + reg };
  }, [sdPrice, sdStateName, sdGender]);

  /* ---------- Area Converter ---------- */
  const [acValue, setAcValue] = useState(1000);
  const [acFrom, setAcFrom] = useState("sqft");
  const [acTo, setAcTo] = useState("sqm");
  const acResult = useMemo(() => {
    const v = Number(acValue) || 0;
    const result = (v * AREA_TO_SQFT[acFrom]) / AREA_TO_SQFT[acTo];
    return result.toLocaleString("en-IN", { maximumFractionDigits: 3 });
  }, [acValue, acFrom, acTo]);

  const crumbLabel = useMemo(() => {
    for (const g of NAV_GROUPS) {
      const found = g.items.find((i) => i.key === tool);
      if (found) return found.label;
    }
    return "";
  }, [tool]);

  return (
    <div className="nb-root pt-20">
      <style>{`
        .nb-root{
          --ink:#12161F; --ink-2:#1B2130; --paper:#EFF0EA; --card:#F8F7F2;
          --line:#DAD7CB; --line-soft:#E4E2D8; --text:#1B1F27; --text-muted:#6B6F76;
          --text-soft:#8A8D93; --brass:#B4874A; --brass-light:#D9B77C; --brass-dark:#8C6634;
          --sage:#4C7566; --sage-light:#E4EDE8; --rust:#A15139; --rust-light:#F1E2DC; --radius:2px;
          font-family:'Outfit',sans-serif; color:var(--text); background:var(--paper);
          display:grid; grid-template-columns:272px 1fr; min-height:calc(100vh - 64px);
        }
        .nb-root *{box-sizing:border-box;}
        .nb-root .mono{font-family:'IBM Plex Mono',monospace; font-variant-numeric:tabular-nums;}
        .nb-root .serif{font-family:'Fraunces',serif;}

        #nb-sidebar{ background:var(--ink); color:#EDEDE8; position:sticky; top:80px; height:calc(100vh - 80px);
          overflow-y:auto; display:flex; flex-direction:column; padding:68px 0 20px; }
        .nb-brand{ display:flex; align-items:center; gap:12px; padding:0 24px 22px;
          border-bottom:1px solid rgba(255,255,255,0.09); margin-bottom:14px; }
        .nb-brand-mark{ width:38px; height:38px; border:1px solid var(--brass-light); display:flex;
          align-items:center; justify-content:center; font-family:'Outfit',sans-serif; font-size:16px;
          color:var(--brass-light); flex:none; }
        .nb-brand-name{ font-family:'Outfit',sans-serif; font-size:17px; letter-spacing:0.01em; line-height:1.15; }
        .nb-brand-sub{ font-size:10.5px; text-transform:uppercase; letter-spacing:0.12em; color:#8B8F98; margin-top:3px; }

        .nb-pulse{ margin:0 24px 22px; padding:10px 12px; border:1px solid rgba(255,255,255,0.1);
          background:rgba(255,255,255,0.03); display:flex; align-items:center; gap:9px; }
        .nb-pulse-dot{ width:6px; height:6px; border-radius:50%; background:var(--sage); flex:none;
          box-shadow:0 0 0 3px rgba(76,117,102,0.25); }
        .nb-pulse-text{ font-size:11px; line-height:1.4; color:#B8BBC2; }
        .nb-pulse-text b{ color:#EDEDE8; font-family:'IBM Plex Mono',monospace; font-weight:600; }

        .nb-nav{ padding:0 12px; flex:1; }
        .nb-nav-label{ font-size:10px; text-transform:uppercase; letter-spacing:0.14em; color:#6E717A; padding:6px 12px 10px; }
        .nb-nav-item{ display:flex; align-items:center; gap:12px; width:100%; padding:11px 12px;
          background:none; border:none; color:#C7C9CE; font-family:'Outfit',sans-serif; font-size:13.5px;
          text-align:left; cursor:pointer; border-left:2px solid transparent;
          transition:background .15s ease, color .15s ease, border-color .15s ease; }
        .nb-nav-item svg{ flex:none; width:17px; height:17px; opacity:.85; }
        .nb-nav-item:hover{ background:rgba(255,255,255,0.04); color:#EDEDE8; }
        .nb-nav-item.active{ background:rgba(180,135,74,0.1); color:#F3E7D3; border-left-color:var(--brass); }
        .nb-nav-item.active svg{ opacity:1; color:var(--brass-light); }
        .nb-sidebar-foot{ padding:16px 24px 0; border-top:1px solid rgba(255,255,255,0.09); margin-top:14px;
          font-size:11px; color:#6E717A; line-height:1.6; }

        #nb-main{ padding:44px 56px 80px; max-width:900px; }
        .nb-crumb{ font-size:11.5px; color:var(--text-soft); text-transform:uppercase; letter-spacing:0.1em; margin-bottom:10px; }
        .nb-crumb b{ color:var(--brass-dark); }
        .nb-title{ font-family:'Outfit',sans-serif; font-weight:600; font-size:34px; margin:0 0 8px; letter-spacing:-0.01em; }
        .nb-desc{ color:var(--text-muted); font-size:14.5px; line-height:1.6; max-width:560px; margin:0 0 30px; }

        .nb-panel{ animation:nbfadein .35s ease; }
        @keyframes nbfadein{ from{opacity:0; transform:translateY(4px);} to{opacity:1; transform:translateY(0);} }

        .nb-card{ background:var(--card); border:1px solid var(--line); padding:28px; margin-bottom:20px; }
        .nb-card-row{ display:grid; grid-template-columns:1fr 1fr; gap:28px; }
        @media(max-width:700px){ .nb-card-row{ grid-template-columns:1fr; } }

        .nb-root .field{ margin-bottom:20px; }
        .nb-root .field:last-child{ margin-bottom:0; }
        .nb-root .field-label{ display:flex; justify-content:space-between; align-items:baseline; font-size:12.5px;
          color:var(--text-muted); margin-bottom:8px; text-transform:uppercase; letter-spacing:.05em; }
        .nb-root .field-label .val{ font-family:'IBM Plex Mono',monospace; color:var(--ink); font-size:13px; font-weight:600; letter-spacing:0; }

        .nb-root input[type=range]{ -webkit-appearance:none; appearance:none; width:100%; height:2px;
          background:var(--line); outline:none; margin:6px 0; }
        .nb-root input[type=range]::-webkit-slider-thumb{ -webkit-appearance:none; appearance:none; width:15px; height:15px;
          border-radius:50%; background:var(--brass); border:2px solid var(--card); box-shadow:0 0 0 1px var(--brass); cursor:pointer; }
        .nb-root input[type=range]::-moz-range-thumb{ width:13px; height:13px; border-radius:50%; background:var(--brass);
          border:2px solid var(--card); box-shadow:0 0 0 1px var(--brass); cursor:pointer; }
        .nb-root input[type=number], .nb-root select{ width:100%; padding:10px 12px; border:1px solid var(--line);
          background:#fff; font-family:'IBM Plex Mono',monospace; font-size:14px; color:var(--ink); border-radius:var(--radius); }
        .nb-root input[type=number]:focus, .nb-root select:focus{ outline:2px solid var(--brass-light); outline-offset:1px; }

        .nb-segmented{ display:flex; border:1px solid var(--line); overflow:hidden; }
        .nb-segmented button{ flex:1; padding:10px 8px; background:#fff; border:none; font-family:'Outfit',sans-serif;
          font-size:12.5px; color:var(--text-muted); cursor:pointer; border-left:1px solid var(--line); }
        .nb-segmented button:first-child{ border-left:none; }
        .nb-segmented button.active{ background:var(--ink); color:var(--brass-light); font-weight:600; }

        .nb-root .ledger{ border-top:1px solid var(--line); margin-top:24px; padding-top:20px; }
        .nb-root .ledger-row{ display:flex; justify-content:space-between; align-items:baseline; padding:10px 0;
          border-bottom:1px dashed var(--line-soft); }
        .nb-root .ledger-row:last-child{ border-bottom:none; }
        .nb-root .ledger-row .k{ font-size:12.5px; color:var(--text-muted); }
        .nb-root .ledger-row .v{ font-family:'IBM Plex Mono',monospace; font-size:15px; font-weight:600; }
        .nb-hero{ display:flex; justify-content:space-between; align-items:flex-end; padding:2px 0 20px;
          border-bottom:2px solid var(--ink); margin-bottom:4px; }
        .nb-hero .k{ font-size:12px; text-transform:uppercase; letter-spacing:.08em; color:var(--text-muted); }
        .nb-hero .v{ font-family:'IBM Plex Mono',monospace; font-size:40px; font-weight:600; color:var(--ink); line-height:1; }
        .nb-hero .v span{ font-size:20px; color:var(--brass-dark); font-weight:500; }

        .nb-bar-split{ display:flex; height:10px; width:100%; overflow:hidden; margin:14px 0 8px; border:1px solid var(--line); }
        .nb-bar-split div{ height:100%; transition:width .25s ease; }
        .nb-legend{ display:flex; gap:20px; font-size:12px; color:var(--text-muted); }
        .nb-legend span{ display:inline-flex; align-items:center; gap:6px; }
        .nb-legend i{ width:9px; height:9px; display:inline-block; }

        .nb-note{ font-size:12px; color:var(--text-soft); border-left:2px solid var(--line); padding:2px 0 2px 12px;
          margin-top:18px; line-height:1.6; }
        .nb-verdict{ margin-top:18px; padding:16px 18px; background:var(--sage-light); border-left:3px solid var(--sage);
          font-size:13.5px; color:#2E4A3F; line-height:1.6; }
        .nb-verdict.warn{ background:var(--rust-light); border-left-color:var(--rust); color:#5C2C1B; }

        .nb-root table{ width:100%; border-collapse:collapse; font-size:13px; }
        .nb-root th{ text-align:left; font-size:11px; text-transform:uppercase; letter-spacing:.06em; color:var(--text-soft);
          font-weight:600; padding:0 0 10px; border-bottom:1px solid var(--line); }
        .nb-root td{ padding:12px 0; border-bottom:1px solid var(--line-soft); }
        .nb-root tr:last-child td{ border-bottom:none; }
        .nb-tag{ font-size:10px; padding:3px 7px; border:1px solid var(--sage); color:var(--sage); text-transform:uppercase; letter-spacing:.05em; }
        .nb-tag.down{ border-color:var(--rust); color:var(--rust); }

        .nb-chart-wrap{ height:230px; margin-top:6px; }
        .nb-foot-disclaimer{ margin-top:36px; padding-top:20px; border-top:1px solid var(--line); font-size:11.5px;
          color:var(--text-soft); line-height:1.7; max-width:640px; }

        @media(max-width:880px){
          .nb-root{ grid-template-columns:1fr; }
          #nb-sidebar{ position:relative; height:auto; padding:20px 0; }
          .nb-brand{ padding:0 20px 16px; }
          .nb-pulse{ margin:0 20px 16px; }
          .nb-nav{ display:flex; overflow-x:auto; padding:0 12px 4px; gap:2px; }
          .nb-nav-label{ display:none; }
          .nb-nav-item{ flex:none; white-space:nowrap; border-left:none; border-bottom:2px solid transparent; }
          .nb-nav-item.active{ border-left:none; border-bottom-color:var(--brass); }
          .nb-sidebar-foot{ display:none; }
          #nb-main{ padding:32px 20px 60px; }
          .nb-title{ font-size:27px; }
        }
      `}</style>

      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600;700&display=swap"
      />

      <aside id="nb-sidebar">
        <div className="nb-brand">
          <div className="nb-brand-mark">N</div>
          <div>
            <div className="nb-brand-name">NestNBest</div>
            <div className="nb-brand-sub">Insights &amp; Tools</div>
          </div>
        </div>

        <div className="nb-pulse">
          <span className="nb-pulse-dot" />
          <span className="nb-pulse-text">
            Market pulse — <b>steady</b> this week <span style={{ color: "#6E717A" }}>(sample feed)</span>
          </span>
        </div>

        <nav className="nb-nav">
          {NAV_GROUPS.map((group) => (
            <React.Fragment key={group.label}>
              <div className="nb-nav-label">{group.label}</div>
              {group.items.map(({ key, label, Icon }) => (
                <button
                  key={key}
                  className={"nb-nav-item" + (tool === key ? " active" : "")}
                  onClick={() => setTool(key)}
                >
                  <Icon />
                  {label}
                </button>
              ))}
            </React.Fragment>
          ))}
        </nav>

 
      </aside>

      <main id="nb-main">
        <div className="nb-crumb">
          Insights / <b>{crumbLabel}</b>
        </div>

        {tool === "emi" && (
          <div className="nb-panel" key="emi">
            <h1 className="nb-title">Home Loan EMI Calculator</h1>
            <p className="nb-desc">
              Work out your monthly instalment, and see how much of it goes to interest versus principal over the life of the loan.
            </p>
            <div className="nb-card">
              <div className="nb-card-row">
                <div>
                  <Field label="Loan amount" value={fmtINR(emiP)}>
                    <Range min={500000} max={30000000} step={50000} value={emiP} onChange={(e) => setEmiP(+e.target.value)} />
                  </Field>
                  <Field label="Interest rate (p.a.)" value={emiR + "%"}>
                    <Range min={6} max={14} step={0.05} value={emiR} onChange={(e) => setEmiR(+e.target.value)} />
                  </Field>
                  <Field label="Tenure" value={emiN + " years"}>
                    <Range min={1} max={30} step={1} value={emiN} onChange={(e) => setEmiN(+e.target.value)} />
                  </Field>
                </div>
                <div>
                  <div className="nb-hero">
                    <span className="k">Monthly EMI</span>
                    <span className="v mono">
                      <span>₹</span> {fmtINRshort(emi.value)}
                    </span>
                  </div>
                  <div className="nb-bar-split">
                    <div style={{ background: "var(--sage)", width: emi.pPct + "%" }} />
                    <div style={{ background: "var(--brass)", width: 100 - emi.pPct + "%" }} />
                  </div>
                  <div className="nb-legend">
                    <span><i style={{ background: "var(--sage)" }} />Principal</span>
                    <span><i style={{ background: "var(--brass)" }} />Interest</span>
                  </div>
                  <div className="ledger">
                    <LedgerRow k="Total interest payable" v={fmtINR(emi.totalInterest)} />
                    <LedgerRow k="Total amount payable" v={fmtINR(emi.totalPayment)} />
                  </div>
                </div>
              </div>
              <div className="nb-note">
                Assumes a fixed rate and equal monthly instalments. Actual EMI may vary by lender processing rules and rate resets on floating loans.
              </div>
            </div>
          </div>
        )}

        {tool === "rates" && (
          <div className="nb-panel" key="rates">
            <h1 className="nb-title">Rates &amp; Market Trends</h1>
            <p className="nb-desc">
              A snapshot of prevailing lending rates and how home loan interest rates have moved over the past year.
            </p>
            <div className="nb-card">
              <table>
                <thead>
                  <tr><th>Loan category</th><th>Indicative rate</th><th>12-mo trend</th></tr>
                </thead>
                <tbody>
                  <tr><td>Home loan — floating</td><td className="mono">8.35% – 9.10%</td><td><span className="nb-tag">↓ easing</span></td></tr>
                  <tr><td>Home loan — fixed</td><td className="mono">9.25% – 10.00%</td><td><span className="nb-tag">flat</span></td></tr>
                  <tr><td>Loan against property</td><td className="mono">9.50% – 11.25%</td><td><span className="nb-tag down">↑ firming</span></td></tr>
                  <tr><td>Top-up loan</td><td className="mono">9.75% – 11.50%</td><td><span className="nb-tag">flat</span></td></tr>
                </tbody>
              </table>
              <div className="nb-note">Sample data for illustration — connect your live rate feed to keep this table current automatically.</div>
            </div>

            <div className="nb-card">
              <div className="field-label" style={{ marginBottom: 2 }}>
                <span>Average floating home loan rate — last 12 months</span>
              </div>
              <div className="nb-chart-wrap">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={RATE_CHART_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <CartesianGrid stroke="#E4E2D8" vertical={false} />
                    <XAxis dataKey="month" tick={{ fontFamily: "Inter", fontSize: 11, fill: "#6B6F76" }} axisLine={{ stroke: "#DAD7CB" }} tickLine={false} />
                    <YAxis
                      domain={["dataMin - 0.1", "dataMax + 0.1"]}
                      tickFormatter={(v) => v + "%"}
                      tick={{ fontFamily: "IBM Plex Mono", fontSize: 11, fill: "#6B6F76" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip formatter={(v) => v + "%"} contentStyle={{ fontFamily: "IBM Plex Mono", fontSize: 12, border: "1px solid #DAD7CB" }} />
                    <Line type="monotone" dataKey="rate" stroke="#B4874A" strokeWidth={2} dot={{ r: 3, fill: "#B4874A" }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {tool === "rentbuy" && (
          <div className="nb-panel" key="rentbuy">
            <h1 className="nb-title">Rent vs Buy Calculator</h1>
            <p className="nb-desc">
              Compare the true cost of renting against buying over a chosen time horizon, accounting for appreciation and rent escalation.
            </p>
            <div className="nb-card">
              <div className="nb-card-row">
                <div>
                  <Field label="Current monthly rent" value={fmtINR(rbRent)}>
                    <Range min={5000} max={150000} step={1000} value={rbRent} onChange={(e) => setRbRent(+e.target.value)} />
                  </Field>
                  <Field label="Home price" value={fmtINR(rbPrice)}>
                    <Range min={1500000} max={50000000} step={100000} value={rbPrice} onChange={(e) => setRbPrice(+e.target.value)} />
                  </Field>
                  <Field label="Down payment" value={rbDp + "%"}>
                    <Range min={10} max={50} step={5} value={rbDp} onChange={(e) => setRbDp(+e.target.value)} />
                  </Field>
                  <Field label="Loan interest rate" value={rbRate + "%"}>
                    <Range min={6} max={14} step={0.1} value={rbRate} onChange={(e) => setRbRate(+e.target.value)} />
                  </Field>
                </div>
                <div>
                  <Field label="Years to compare" value={rbYears + " years"}>
                    <Range min={3} max={25} step={1} value={rbYears} onChange={(e) => setRbYears(+e.target.value)} />
                  </Field>
                  <Field label="Annual home appreciation" value={rbApprec + "%"}>
                    <Range min={0} max={12} step={0.5} value={rbApprec} onChange={(e) => setRbApprec(+e.target.value)} />
                  </Field>
                  <Field label="Annual rent escalation" value={rbRentEsc + "%"}>
                    <Range min={0} max={12} step={0.5} value={rbRentEsc} onChange={(e) => setRbRentEsc(+e.target.value)} />
                  </Field>
                  <div className="ledger" style={{ marginTop: 24, paddingTop: 0, borderTop: "none" }}>
                    <LedgerRow k="Total outflow — buying" v={fmtINR(rentBuy.buyOutflow)} />
                    <LedgerRow k="Total outflow — renting" v={fmtINR(rentBuy.rentOutflow)} />
                    <LedgerRow k="Est. property value gain" v={fmtINR(rentBuy.gain)} />
                  </div>
                </div>
              </div>
              <div className={"nb-verdict" + (rentBuy.buyingWins ? "" : " warn")}>
                {rentBuy.buyingWins
                  ? `Over ${rbYears} years, buying looks favourable — net cost after estimated appreciation is roughly ${fmtINR(rentBuy.rentOutflow - rentBuy.netBuyCost)} lower than renting.`
                  : `Over ${rbYears} years, renting looks lighter on cash outflow by roughly ${fmtINR(rentBuy.netBuyCost - rentBuy.rentOutflow)} — though buying builds equity in an owned asset.`}
              </div>
              <div className="nb-note">
                Buying outflow includes down payment, EMIs and 1% p.a. maintenance. Property gain is the estimated appreciation in home value over the horizon. This is a simplified model — it excludes taxes, transaction costs, and returns on investing the down payment elsewhere.
              </div>
            </div>
          </div>
        )}

        {tool === "eligibility" && (
          <div className="nb-panel" key="eligibility">
            <h1 className="nb-title">Loan Eligibility Calculator</h1>
            <p className="nb-desc">
              Estimate how much you may be able to borrow, based on your income, existing obligations, and a typical lender affordability ratio.
            </p>
            <div className="nb-card">
              <div className="nb-card-row">
                <div>
                  <Field label="Net monthly income" value={fmtINR(elIncome)}>
                    <Range min={20000} max={1000000} step={5000} value={elIncome} onChange={(e) => setElIncome(+e.target.value)} />
                  </Field>
                  <Field label="Existing monthly EMIs" value={fmtINR(elExisting)}>
                    <Range min={0} max={200000} step={1000} value={elExisting} onChange={(e) => setElExisting(+e.target.value)} />
                  </Field>
                  <Field label="Affordability ratio (FOIR)" value={elFoir + "%"}>
                    <Range min={30} max={65} step={5} value={elFoir} onChange={(e) => setElFoir(+e.target.value)} />
                  </Field>
                </div>
                <div>
                  <Field label="Interest rate (p.a.)" value={elRate + "%"}>
                    <Range min={6} max={14} step={0.1} value={elRate} onChange={(e) => setElRate(+e.target.value)} />
                  </Field>
                  <Field label="Tenure" value={elTenure + " years"}>
                    <Range min={1} max={30} step={1} value={elTenure} onChange={(e) => setElTenure(+e.target.value)} />
                  </Field>
                  <div className="nb-hero" style={{ marginTop: 20 }}>
                    <span className="k">Est. eligible loan</span>
                    <span className="v mono"><span>₹</span> {fmtINRshort(eligibility.loan)}</span>
                  </div>
                </div>
              </div>
              <div className="ledger">
                <LedgerRow k="Maximum usable EMI" v={fmtINR(eligibility.maxEMI)} />
              </div>
              <div className="nb-note">
                FOIR (Fixed Obligation to Income Ratio) is the share of income lenders typically allow toward all EMIs combined; it varies by lender, income slab, and credit profile.
              </div>
            </div>
          </div>
        )}

        {tool === "interior" && (
          <div className="nb-panel" key="interior">
            <h1 className="nb-title">Interior Budget Estimator</h1>
            <p className="nb-desc">
              Get a category-wise budget estimate for interiors, based on carpet area and the finish level you're planning.
            </p>
            <div className="nb-card">
              <Field label="Carpet area" value={inArea.toLocaleString("en-IN") + " sq ft"}>
                <Range min={300} max={5000} step={50} value={inArea} onChange={(e) => setInArea(+e.target.value)} />
              </Field>
              <div className="field">
                <div className="field-label"><span>Finish level</span></div>
                <div className="nb-segmented">
                  {INTERIOR_LEVELS.map((l) => (
                    <button key={l.key} className={inLevel === l.key ? "active" : ""} onClick={() => setInLevel(l.key)}>
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="nb-hero" style={{ marginTop: 24 }}>
                <span className="k">Estimated total budget</span>
                <span className="v mono"><span>₹</span> {fmtINRshort(interior.total)}</span>
              </div>

              <div className="ledger">
                {interior.rows.map((c) => (
                  <LedgerRow
                    key={c.name}
                    k={<><i style={{ display: "inline-block", width: 8, height: 8, background: c.color, marginRight: 8 }} />{c.name} · {c.pct}%</>}
                    v={fmtINR(c.amount)}
                  />
                ))}
              </div>
              <div className="nb-note">Rates are illustrative averages (₹/sq ft, all-inclusive of material and labour) and vary by city, brand choice, and site conditions.</div>
            </div>
          </div>
        )}

        {tool === "stamp" && (
          <div className="nb-panel" key="stamp">
            <h1 className="nb-title">Stamp Duty &amp; Registration Calculator</h1>
            <p className="nb-desc">Estimate the stamp duty and registration charges payable on a property transaction.</p>
            <div className="nb-card">
              <div className="nb-card-row">
                <div>
                  <Field label="Property value" value={fmtINR(sdPrice)}>
                    <Range min={1000000} max={50000000} step={100000} value={sdPrice} onChange={(e) => setSdPrice(+e.target.value)} />
                  </Field>
                  <div className="field">
                    <div className="field-label"><span>State</span></div>
                    <select value={sdStateName} onChange={(e) => setSdStateName(e.target.value)}>
                      {Object.keys(STAMP_STATES).map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div className="field">
                    <div className="field-label"><span>Owner</span></div>
                    <div className="nb-segmented">
                      <button className={sdGender === "male" ? "active" : ""} onClick={() => setSdGender("male")}>Male</button>
                      <button className={sdGender === "female" ? "active" : ""} onClick={() => setSdGender("female")}>Female</button>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="ledger">
                    <LedgerRow k="Stamp duty" v={fmtINR(stamp.duty) + `  (${stamp.dutyPct}%)`} />
                    <LedgerRow k="Registration fee (1%)" v={fmtINR(stamp.reg)} />
                    <LedgerRow k="Total payable" v={fmtINR(stamp.total)} strong />
                  </div>
                </div>
              </div>
              <div className="nb-note">
                Rates shown are indicative and commonly-cited state averages — actual stamp duty depends on property type, location within the state, and current notifications. Confirm with your local sub-registrar office before transacting.
              </div>
            </div>
          </div>
        )}

        {tool === "area" && (
          <div className="nb-panel" key="area">
            <h1 className="nb-title">Area Unit Converter</h1>
            <p className="nb-desc">Convert between the area units commonly used across property listings and paperwork.</p>
            <div className="nb-card">
              <div className="nb-card-row">
                <div>
                  <div className="field">
                    <div className="field-label"><span>Value</span></div>
                    <input type="number" value={acValue} onChange={(e) => setAcValue(e.target.value)} />
                  </div>
                  <div className="field">
                    <div className="field-label"><span>From</span></div>
                    <select value={acFrom} onChange={(e) => setAcFrom(e.target.value)}>
                      {Object.keys(AREA_LABELS).map((u) => (
                        <option key={u} value={u}>{AREA_LABELS[u]}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <div className="field" style={{ marginTop: 2 }}>
                    <div className="field-label"><span>&nbsp;</span></div>
                    <div className="nb-hero" style={{ borderBottom: "none", paddingBottom: 6 }}>
                      <span className="k">Result</span>
                      <span className="v mono" style={{ fontSize: 30 }}>{acResult}</span>
                    </div>
                  </div>
                  <div className="field">
                    <div className="field-label"><span>To</span></div>
                    <select value={acTo} onChange={(e) => setAcTo(e.target.value)}>
                      {Object.keys(AREA_LABELS).map((u) => (
                        <option key={u} value={u}>{AREA_LABELS[u]}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="nb-note">1 sq yd = 9 sq ft · 1 acre = 43,560 sq ft · 1 hectare = 107,639.1 sq ft · 1 guntha = 1,089 sq ft.</div>
            </div>
          </div>
        )}

        <div className="nb-foot-disclaimer">
          All figures on this page are indicative estimates generated for planning purposes only, and do not constitute financial, legal, or investment advice. Interest rates, taxes, and construction costs vary by lender, location, and time — please verify current figures with a qualified lender, advisor, or local authority before making a decision.
        </div>
      </main>
    </div>
  );
}