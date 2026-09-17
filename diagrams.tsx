import type { ReactNode } from "react";

const wrap = (title: string, children: ReactNode) => (
  <figure className="my-5 overflow-hidden rounded-[var(--radius-lg)] border border-line bg-surface">
    <div className="border-b border-line bg-surface-2 px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted">
      {title}
    </div>
    <div className="px-3 py-4">{children}</div>
  </figure>
);

export function Diagram({ id, cap }: { id: string; cap?: string }) {
  const map: Record<string, () => ReactNode> = {
    micturition: Micturition,
    mcneal: McNeal,
    raas: Raas,
    aast: AastKidney,
    adrenal: AdrenalZones,
    vur: VurGrades,
    bosniak: Bosniak,
    ivc: IvcLevels,
    pcnl: PcnlPuncture,
  };
  const Node = map[id] ?? Fallback;
  return (
    <div>
      <Node />
      {cap ? <p className="mt-2 text-center text-xs text-muted">{cap}</p> : null}
    </div>
  );
}

function Fallback() {
  return wrap(
    "Schema",
    <p className="px-2 text-sm text-muted">See the table and flowchart in the answer for the working diagram.</p>,
  );
}

function Micturition() {
  return wrap(
    "Storage–voiding switch",
    <svg viewBox="0 0 560 220" className="h-auto w-full" aria-hidden>
      <rect x="20" y="20" width="120" height="52" rx="8" fill="#fcfaf6" stroke="#1e4d4a" />
      <text x="80" y="42" textAnchor="middle" fontSize="11" fill="#141a1f">Cortex / PAG</text>
      <text x="80" y="58" textAnchor="middle" fontSize="10" fill="#5c676f">permission</text>
      <path d="M140 46 H210" stroke="#1e4d4a" fill="none" />
      <rect x="210" y="16" width="140" height="60" rx="8" fill="#1e4d4a" />
      <text x="280" y="42" textAnchor="middle" fontSize="11" fill="#f4efe4">PMC (Barrington)</text>
      <text x="280" y="58" textAnchor="middle" fontSize="10" fill="#dceae3">voiding on</text>
      <path d="M280 76 V110" stroke="#1e4d4a" fill="none" />
      <rect x="20" y="118" width="160" height="72" rx="8" fill="#fcfaf6" stroke="#d8d0c4" />
      <text x="100" y="146" textAnchor="middle" fontSize="11" fill="#141a1f">S2–4 parasymp</text>
      <text x="100" y="164" textAnchor="middle" fontSize="10" fill="#5c676f">M3 detrusor +</text>
      <rect x="210" y="118" width="160" height="72" rx="8" fill="#fcfaf6" stroke="#d8d0c4" />
      <text x="290" y="146" textAnchor="middle" fontSize="11" fill="#141a1f">Onuf / pudendal</text>
      <text x="290" y="164" textAnchor="middle" fontSize="10" fill="#5c676f">sphincter −</text>
      <rect x="400" y="118" width="140" height="72" rx="8" fill="#fcfaf6" stroke="#d8d0c4" />
      <text x="470" y="146" textAnchor="middle" fontSize="11" fill="#141a1f">T10–L2 sympathetics</text>
      <text x="470" y="164" textAnchor="middle" fontSize="10" fill="#5c676f">storage β3 / α1</text>
    </svg>,
  );
}

function McNeal() {
  return wrap(
    "McNeal zonal anatomy",
    <svg viewBox="0 0 420 260" className="mx-auto h-auto w-full max-w-md" aria-hidden>
      <ellipse cx="210" y="140" rx="150" ry="100" fill="#ebe4d6" stroke="#1e4d4a" />
      <ellipse cx="210" y="168" rx="78" ry="52" fill="#dceae3" stroke="#1e4d4a" />
      <text x="210" y="172" textAnchor="middle" fontSize="12" fill="#141a1f">TZ (BPH)</text>
      <rect x="198" y="40" width="24" height="130" rx="8" fill="#1e4d4a" />
      <text x="210" y="78" textAnchor="middle" fontSize="10" fill="#f4efe4">U</text>
      <text x="318" y="100" textAnchor="middle" fontSize="12" fill="#141a1f">PZ (70% CaP)</text>
      <text x="210" y="44" textAnchor="middle" fontSize="11" fill="#141a1f">CZ / ejaculatory ducts</text>
      <text x="80" y="230" fontSize="11" fill="#5c676f">AFMS anterior · veru at TZ/CZ junction</text>
    </svg>,
  );
}

function Raas() {
  return wrap(
    "Renin–angiotensin–aldosterone",
    <svg viewBox="0 0 560 160" className="h-auto w-full" aria-hidden>
      {[
        ["20", "Juxtaglomerular renin"],
        ["160", "Angiotensinogen → I"],
        ["310", "ACE (lung) → II"],
        ["450", "AT1 → aldo / VC"],
      ].map(([x, label], i) => (
        <g key={label}>
          <rect x={x} y="48" width="128" height="56" rx="8" fill={i === 3 ? "#1e4d4a" : "#fcfaf6"} stroke="#1e4d4a" />
          <text x={Number(x) + 64} y="80" textAnchor="middle" fontSize="11" fill={i === 3 ? "#f4efe4" : "#141a1f"}>
            {label}
          </text>
          {i < 3 ? <path d={`M${Number(x) + 128} 76 H${Number(x) + 140}`} stroke="#1e4d4a" markerEnd="url(#a)" /> : null}
        </g>
      ))}
    </svg>,
  );
}

function AastKidney() {
  return wrap(
    "AAST kidney injury (simplified)",
    <div className="grid grid-cols-2 gap-2 text-sm md:grid-cols-5">
      {[
        ["I", "Contusion / subcapsular, no laceration"],
        ["II", "Laceration <1 cm cortex, no urine leak"],
        ["III", "Laceration >1 cm, no collecting system"],
        ["IV", "Collecting system or segmental vessel"],
        ["V", "Shattered / avulsed hilum / main vessel"],
      ].map(([g, t]) => (
        <div key={g} className="rounded-[var(--radius-md)] border border-line bg-bg px-3 py-3">
          <div className="font-mono text-xs text-accent">G{g}</div>
          <p className="mt-1 text-[13px] leading-snug text-ink-soft">{t}</p>
        </div>
      ))}
    </div>,
  );
}

function AdrenalZones() {
  return wrap(
    "Adrenal cortex zones — GFR",
    <svg viewBox="0 0 520 180" className="h-auto w-full" aria-hidden>
      <rect x="40" y="30" width="440" height="40" fill="#f1e4c4" stroke="#6b4e16" />
      <text x="260" y="55" textAnchor="middle" fontSize="13">Glomerulosa — mineralocorticoids (aldo)</text>
      <rect x="40" y="70" width="440" height="40" fill="#dceae3" stroke="#215c45" />
      <text x="260" y="95" textAnchor="middle" fontSize="13">Fasciculata — glucocorticoids (cortisol)</text>
      <rect x="40" y="110" width="440" height="40" fill="#f3e1cf" stroke="#7a3f12" />
      <text x="260" y="135" textAnchor="middle" fontSize="13">Reticularis — androgens (DHEA)</text>
    </svg>,
  );
}

function VurGrades() {
  return wrap(
    "International (IRSC) VUR grades",
    <div className="grid grid-cols-5 gap-2 text-center text-[12px]">
      {["I ureter only", "II to pelvis, no dilatation", "III mild calyceal blunting", "IV tortuous, papillae blunt", "V massive, intra-renal"].map(
        (t, i) => (
          <div key={t} className="rounded-[var(--radius-md)] border border-line px-2 py-3">
            <div className="font-mono text-accent">G{i + 1}</div>
            <p className="mt-1 text-ink-soft">{t}</p>
          </div>
        ),
      )}
    </div>,
  );
}

function Bosniak() {
  return wrap(
    "Bosniak (2019) — action",
    <div className="grid gap-2 text-sm md:grid-cols-4">
      {[
        ["I–II", "Benign simple / few hairline septa", "Leave"],
        ["IIF", "Minimally complex, follow", "US/CT 6–12 mo"],
        ["III", "Thick enhancing septa / wall", "Surgery / biopsy"],
        ["IV", "Enhancing nodule", "Treat as cystic RCC"],
      ].map(([k, a, b]) => (
        <div key={k} className="rounded-[var(--radius-md)] border border-line px-3 py-3">
          <div className="font-display text-base">{k}</div>
          <p className="mt-1 text-ink-soft">{a}</p>
          <p className="mt-2 text-xs uppercase tracking-wider text-accent">{b}</p>
        </div>
      ))}
    </div>,
  );
}

function IvcLevels() {
  return wrap(
    "IVC thrombus levels (Mayo / Neves–Zincke)",
    <svg viewBox="0 0 240 280" className="mx-auto h-64 w-auto" aria-hidden>
      <rect x="100" y="10" width="40" height="250" rx="16" fill="#ebe4d6" stroke="#1e4d4a" />
      <line x1="70" y1="40" x2="180" y2="40" stroke="#1e4d4a" />
      <text x="188" y="44" fontSize="11">III hepatic / suprahepatic</text>
      <line x1="70" y1="110" x2="180" y2="110" stroke="#1e4d4a" />
      <text x="188" y="114" fontSize="11">II infrahepatic over 2 cm</text>
      <line x1="70" y1="170" x2="180" y2="170" stroke="#1e4d4a" />
      <text x="188" y="174" fontSize="11">I renal vein / ostium</text>
      <text x="20" y="30" fontSize="11" fill="#5c676f">RA / IV</text>
      <text x="20" y="260" fontSize="11" fill="#5c676f">RV</text>
    </svg>,
  );
}

function PcnlPuncture() {
  return wrap(
    "PCNL puncture — Brodel avascular plane",
    <p className="px-2 text-sm leading-relaxed text-ink-soft">
      Posterior calyx along Brodel's line (between anterior and posterior segmental arteries),
      below the 12th rib when possible. Bull's-eye on fluoro; needle toward infundibulum, not
      infundibular neck. Upper pole: supra-11 risk of pleura. Tract through papilla, never infundibulum,
      to spare interlobar vessels.
    </p>,
  );
}
