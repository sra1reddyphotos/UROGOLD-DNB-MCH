import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/strategy")({ component: Strategy });

function Strategy() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:py-14">
      <p className="text-[11px] uppercase tracking-[0.16em] text-muted">Method</p>
      <h1 className="mt-2 font-display text-[clamp(2rem,5vw,3.2rem)] leading-[1.1]">
        How a gold-medal 10-mark is written
      </h1>
      <p className="mt-4 text-[16.5px] leading-relaxed text-ink-soft">
        NBE theory rewards structure, named eponyms, and a drawing. Content without a skeleton
        scores 5–6. The same content in the frame below scores 8–9.
      </p>

      <h2 className="mt-10 font-display text-2xl">The 12-minute frame</h2>
      <div className="mt-4 overflow-x-auto rounded-[var(--radius-md)] border border-line">
        <table className="w-full min-w-[32rem] text-left text-sm">
          <thead className="bg-bg-2">
            <tr>
              <th className="px-3 py-2">Minutes</th>
              <th className="px-3 py-2">On paper</th>
              <th className="px-3 py-2">Marks captured</th>
            </tr>
          </thead>
          <tbody className="text-ink-soft">
            {[
              ["0–1", "Underline command words (define / enumerate / outline / discuss). Split marks in the margin.", "Does not miss a part"],
              ["1–2", "One-line definition + classification table stub.", "1–2"],
              ["2–6", "Pathophysiology / anatomy as numbered bullets or a labelled diagram.", "3–4"],
              ["6–10", "Evaluation algorithm then management flowchart. Name trials/guidelines.", "3–4"],
              ["10–12", "Complications, recent advance, one gold line. Box the take-home.", "1"],
            ].map((r) => (
              <tr key={r[0]} className="border-t border-line align-top">
                {r.map((c) => (
                  <td key={c} className="px-3 py-2">
                    {c}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="mt-10 font-display text-2xl">What examiners tick</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-[15.5px] leading-relaxed text-ink-soft">
        <li>A definition that could be quoted (not a paragraph).</li>
        <li>A classification that is named (AAST, Bosniak 2019, IGCCCG, EORTC/CUETO, Clavien–Dindo).</li>
        <li>One diagram: McNeal, RAAS, Brodel line, IVC levels, PMC, inguinal nodes.</li>
        <li>An algorithm with a decision diamond (sepsis? solitary kidney? CIS? PSMA-avid?).</li>
        <li>A trial or guideline year: STAMPEDE, KEYNOTE-045, VISION, EV-302, CheckMate-274, EAU 2024.</li>
        <li>A complication / caveat so the answer is not a brochure.</li>
      </ul>

      <h2 className="mt-10 font-display text-2xl">Standard books — cite these</h2>
      <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[15.5px] text-ink-soft">
        <li>Campbell-Walsh-Wein Urology, 12th ed. — default for physiology, oncology, trauma, paeds.</li>
        <li>EAU Guidelines (current year on the day of the paper) — NMIBC, MIBC, PCa, RCC, stones, infections, incontinence.</li>
        <li>AUA / SUFU best-practice statements where EAU differs (biopsy route, ASB, BPH).</li>
        <li>Smith's Textbook of Endourology — ESWL physics, PCNL, lasers, RIRS.</li>
        <li>Hinman's Atlas / Glenn's Urologic Surgery — steps and approaches.</li>
        <li>WHO GU tumours, AJCC 8th, ISUP — histology and TNM.</li>
        <li>ICS standardisation, Wein urodynamics — functional papers.</li>
        <li>KDIGO CKD / living donor; COG & SIOP for Wilms.</li>
      </ul>

      <h2 className="mt-10 font-display text-2xl">Paper tactics</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-[15.5px] leading-relaxed text-ink-soft">
        <li>Four 10-mark questions per paper, ~3 hours. Do not spend 25 minutes on one favourite.</li>
        <li>Attempt all parts. A blank 4-mark section costs more than a thin 10.</li>
        <li>Repeated 2011–2022 clusters: POD, hyponatraemia, pneumoperitoneum, PUV/valve bladder, VUR, sepsis/EPN/chyluria/GUTB, PCNL bleeding, SWL physics, RCC/IVC/VHL, NMIBC/BCG, Studer, mpMRI/PSMA, CRPC, MUS, trauma kidney, transplant oliguria.</li>
        <li>
          Drill them in the{" "}
          <Link to="/high-yield" className="text-accent underline-offset-2 hover:underline">
            high-yield tray
          </Link>
          .
        </li>
      </ul>
    </div>
  );
}
