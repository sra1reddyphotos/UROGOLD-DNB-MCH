import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Bookmark, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { TOPICS } from "@/data/topics";
import { MASTERS, STATS, mastersForTopic } from "@/data/index";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const read = useProgress((s) => s.read);
  const saved = useProgress((s) => s.saved);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  const gold = MASTERS.filter((m) => m.gold).slice(0, 6);
  const repeats = [...MASTERS].sort((a, b) => b.exams.length - a.exams.length).slice(0, 8);

  return (
    <div className="px-4 pb-16 pt-8 md:px-8 md:pt-12">
      <section className="mx-auto max-w-5xl">
        <p className="text-[11px] uppercase tracking-[0.2em] text-muted">
          DrNB Super-speciality · Genitourinary surgery
        </p>
        <h1 className="mt-3 max-w-3xl font-display text-[clamp(2.4rem,7vw,4.4rem)] leading-[1.05] tracking-tight">
          The gold-medal answer atlas.
        </h1>
        <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-ink-soft">
          Every theory stem from 2011–2022, grouped into master 10-mark answers — bullets, tables,
          algorithms and examiner lines from Campbell-Walsh-Wein, EAU, AUA and Smith's.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/search"
            className="inline-flex h-11 items-center gap-2 rounded-[var(--radius-sm)] bg-accent px-5 text-sm font-medium text-accent-fg"
          >
            <Search className="size-4" />
            Search stems
          </Link>
          <Link
            to="/strategy"
            className="inline-flex h-11 items-center gap-2 rounded-[var(--radius-sm)] border border-line bg-surface px-5 text-sm font-medium"
          >
            How to write a 10-mark
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <dl className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            [String(STATS.papers), "Paper stems"],
            [String(STATS.masters), "Master answers"],
            [String(STATS.highYield), "High-yield"],
            [hydrated ? String(Object.keys(read).length) : "—", "Read here"],
          ].map(([v, k]) => (
            <div key={k} className="rounded-[var(--radius-lg)] border border-line bg-surface px-4 py-4">
              <dt className="text-[11px] uppercase tracking-[0.14em] text-muted">{k}</dt>
              <dd className="mt-1 font-display text-3xl tabular-nums">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mx-auto mt-14 max-w-5xl">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-2xl">Chapters</h2>
          <p className="text-sm text-muted">2011–2022 topic-wise bank</p>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {TOPICS.map((t) => {
            const list = mastersForTopic(t.id);
            const done = list.filter((m) => read[m.id]).length;
            return (
              <Link
                key={t.id}
                to="/topics/$topicId"
                params={{ topicId: t.id }}
                className="group rounded-[var(--radius-lg)] border border-line bg-surface p-4 shadow-[var(--shadow-soft)] transition-colors duration-150 hover:border-line-strong"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display text-xl leading-tight">{t.title}</h3>
                  <span className="font-mono text-[11px] text-muted">{list.length}</span>
                </div>
                <p className="mt-2 text-sm leading-snug text-muted">{t.blurb}</p>
                <p className="mt-3 text-[11px] uppercase tracking-[0.12em] text-faint">
                  {t.chapter}
                  {hydrated && list.length > 0 ? ` · ${done}/${list.length} read` : ""}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto mt-14 grid max-w-5xl gap-10 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl">Most repeated stems</h2>
          <ul className="mt-4 divide-y divide-line border-y border-line">
            {repeats.map((m) => (
              <li key={m.id}>
                <Link
                  to="/q/$questionId"
                  params={{ questionId: m.id }}
                  className="flex items-baseline justify-between gap-3 py-3 text-sm hover:text-accent"
                >
                  <span>{m.title}</span>
                  <span className="shrink-0 font-mono text-[11px] text-muted">{m.exams.length}×</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-display text-2xl">Start here for gold</h2>
          <ul className="mt-4 space-y-2">
            {gold.map((m) => (
              <li key={m.id}>
                <Link
                  to="/q/$questionId"
                  params={{ questionId: m.id }}
                  className="block rounded-[var(--radius-md)] border border-line bg-surface px-4 py-3 hover:border-line-strong"
                >
                  <div className="text-[11px] uppercase tracking-[0.14em] text-hy">Gold-medal</div>
                  <div className="mt-1 font-medium">{m.title}</div>
                </Link>
              </li>
            ))}
            {gold.length === 0 ? <p className="text-sm text-muted">Open Basic principles to start a gold-medal answer.</p> : null}
          </ul>
          {saved.length > 0 ? (
            <Link to="/saved" className="mt-4 inline-flex items-center gap-2 text-sm text-accent">
              <Bookmark className="size-4" />
              {saved.length} saved answers
            </Link>
          ) : null}
        </div>
      </section>
    </div>
  );
}
