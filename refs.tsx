import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/refs")({ component: RefsPage });

function RefsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-display text-3xl">Reference shelf</h1>
      <p className="mt-3 text-sm text-muted">
        Answers are synthesised from standard postgraduate sources. They are a study scaffold, not a
        substitute for the primary text or current guidelines on the day of the exam.
      </p>
      <ul className="mt-6 list-disc space-y-2 pl-5 text-sm leading-relaxed text-ink-soft">
        <li>Campbell-Walsh-Wein Urology, 12th edition</li>
        <li>EAU Guidelines (Urolithiasis, Oncologic, Infections, Paediatric, Incontinence, Transplant)</li>
        <li>AUA Guidelines and Best Practice Statements</li>
        <li>Smith's Textbook of Endourology</li>
        <li>Hinman's Atlas of Urologic Surgery; Glenn's Urologic Surgery</li>
        <li>WHO Classification of Urinary and Male Genital Tumours</li>
        <li>AJCC Cancer Staging Manual, 8th ed.; ISUP grading</li>
        <li>ICS Glossary; Wein's Urodynamics</li>
        <li>KDIGO CKD and kidney donor evaluation</li>
        <li>COG / SIOP Wilms protocols</li>
      </ul>
    </div>
  );
}
