import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { mastersForTopic, topicById } from "@/data/index";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/topics/$topicId")({
  component: TopicPage,
});

function TopicPage() {
  const { topicId } = Route.useParams();
  const topic = topicById(topicId);
  if (!topic) throw notFound();
  const list = mastersForTopic(topic.id);
  const read = useProgress((s) => s.read);
  const saved = useProgress((s) => s.saved);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:py-14">
      <p className="text-[11px] uppercase tracking-[0.16em] text-muted">{topic.chapter}</p>
      <h1 className="mt-2 font-display text-[clamp(2rem,5vw,3.2rem)] leading-[1.1]">{topic.title}</h1>
      <p className="mt-3 max-w-2xl text-[16.5px] leading-relaxed text-ink-soft">{topic.blurb}</p>
      <p className="mt-4 font-mono text-xs text-muted">
        {list.length} master answers · {list.reduce((n, m) => n + m.exams.length, 0)} paper stems
      </p>

      {list.length === 0 ? (
        <p className="mt-10 rounded-[var(--radius-lg)] border border-dashed border-line-strong bg-surface px-5 py-8 text-sm text-muted">
          This chapter is compiling into the atlas. Open Basic principles or Drugs — those 10-mark
          answers are live — and return here in a moment.
        </p>
      ) : (
        <ol className="mt-8 divide-y divide-line border-y border-line">
          {list.map((m, i) => (
            <li key={m.id}>
              <Link
                to="/q/$questionId"
                params={{ questionId: m.id }}
                className="flex gap-4 py-4 hover:bg-surface/80"
              >
                <span className="w-8 shrink-0 font-mono text-sm text-faint">{String(i + 1).padStart(2, "0")}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-medium leading-snug">{m.title}</h2>
                    {m.gold ? (
                      <span className="rounded-full bg-hy-bg px-2 py-0.5 text-[10px] uppercase tracking-wider text-hy">
                        Gold
                      </span>
                    ) : null}
                    {m.highYield ? (
                      <span className="text-[10px] uppercase tracking-wider text-muted">High-yield</span>
                    ) : null}
                    {read[m.id] ? <span className="text-[10px] text-ok">Read</span> : null}
                    {saved.includes(m.id) ? <span className="text-[10px] text-accent">Saved</span> : null}
                  </div>
                  <p className="mt-1 text-sm text-muted">
                    {m.exams.map((e) => `${e.session} ${e.year}`).join(" · ")}
                  </p>
                </div>
                <span className="shrink-0 font-mono text-xs text-faint">{m.exams.length}×</span>
              </Link>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
