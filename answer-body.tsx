import { Link } from "@tanstack/react-router";
import { Bookmark, Check } from "lucide-react";
import { useEffect } from "react";
import { Diagram } from "@/components/diagrams";
import { Button } from "@/components/ui/button";
import { getMaster, topicById } from "@/data/index";
import type { Block, FlowNode, Master } from "@/data/types";
import { cn } from "@/lib/cn";
import { useProgress } from "@/lib/progress";

export function AnswerPage({ master }: { master: Master }) {
  const markRead = useProgress((s) => s.markRead);
  const toggleSaved = useProgress((s) => s.toggleSaved);
  const saved = useProgress((s) => s.saved.includes(master.id));
  const note = useProgress((s) => s.notes[master.id] ?? "");
  const setNote = useProgress((s) => s.setNote);
  const topic = topicById(master.topicId);

  useEffect(() => {
    markRead(master.id);
  }, [master.id, markRead]);

  return (
    <article className="mx-auto max-w-3xl px-4 py-8 md:py-12">
      <p className="text-[11px] uppercase tracking-[0.16em] text-muted">
        <Link to="/topics/$topicId" params={{ topicId: master.topicId }} className="hover:text-accent">
          {topic?.title}
        </Link>
        {master.highYield ? " · High-yield" : ""}
        {master.gold ? " · Gold-medal stem" : ""}
      </p>
      <div className="mt-2 flex flex-wrap items-start justify-between gap-4">
        <h1 className="font-display text-[clamp(1.8rem,4vw,2.6rem)] leading-[1.12] tracking-tight">
          {master.title}
        </h1>
        <Button variant={saved ? "mark" : "secondary"} onClick={() => toggleSaved(master.id)}>
          {saved ? <Check className="size-4" /> : <Bookmark className="size-4" />}
          {saved ? "Saved" : "Save"}
        </Button>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {master.exams.map((e, i) => (
          <span
            key={`${e.year}-${e.session}-${i}`}
            className="rounded-full border border-line bg-surface px-3 py-1 font-mono text-[11px] text-ink-soft"
          >
            {e.session} {e.year} · {e.marks}
          </span>
        ))}
      </div>

      <section className="mt-8 rounded-[var(--radius-lg)] border border-line bg-surface p-5 shadow-[var(--shadow-soft)]">
        <h2 className="text-[11px] uppercase tracking-[0.16em] text-muted">Exam stems</h2>
        <ol className="mt-3 space-y-3">
          {master.exams.map((e, i) => (
            <li key={i} className="text-[15px] leading-relaxed text-ink-soft">
              <span className="font-mono text-xs text-accent">
                {e.session} {e.year}
              </span>{" "}
              {e.stem}
            </li>
          ))}
        </ol>
      </section>

      <div className="prose-atlas mt-10 space-y-5">
        {master.answer.map((b, i) => (
          <BlockView key={i} block={b} />
        ))}
      </div>

      <section className="mt-12 border-t border-line pt-8">
        <h2 className="font-display text-xl">Standard references</h2>
        <ul className="mt-3 space-y-1.5 text-sm text-ink-soft">
          {master.references.map((r) => (
            <li key={r}>— {r}</li>
          ))}
        </ul>
      </section>

      {master.related.length > 0 ? (
        <section className="mt-8">
          <h2 className="font-display text-xl">Related</h2>
          <div className="mt-3 flex flex-col gap-2">
            {master.related.map((id) => {
              const rel = getMaster(id);
              if (!rel) return null;
              return (
                <Link
                  key={id}
                  to="/q/$questionId"
                  params={{ questionId: id }}
                  className="rounded-[var(--radius-md)] border border-line bg-surface px-4 py-3 text-sm hover:border-line-strong"
                >
                  {rel.title}
                </Link>
              );
            })}
          </div>
        </section>
      ) : null}

      <section className="mt-10">
        <label className="text-[11px] uppercase tracking-[0.16em] text-muted" htmlFor={`note-${master.id}`}>
          Your note
        </label>
        <textarea
          id={`note-${master.id}`}
          value={note}
          onChange={(e) => setNote(master.id, e.target.value)}
          rows={4}
          placeholder="Mnemonics, examiner comments, local protocols…"
          className="mt-2 w-full rounded-[var(--radius-md)] border border-line bg-surface px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent/30"
        />
      </section>
    </article>
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block.t) {
    case "p":
      return <p className="text-[16.5px] leading-[1.65] text-ink-soft">{block.v}</p>;
    case "h":
      return (
        <h2
          className={cn(
            "font-display tracking-tight text-ink",
            (block.l ?? 2) === 3 ? "pt-2 text-lg" : "pt-4 text-[1.35rem]",
          )}
        >
          {block.v}
        </h2>
      );
    case "ul":
      return block.n ? (
        <ol className="list-decimal space-y-1.5 pl-5 text-[15.5px] leading-relaxed text-ink-soft">
          {block.v.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      ) : (
        <ul className="list-disc space-y-1.5 pl-5 text-[15.5px] leading-relaxed text-ink-soft">
          {block.v.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "tbl":
      return (
        <div className="overflow-x-auto rounded-[var(--radius-md)] border border-line">
          {block.c ? (
            <div className="border-b border-line bg-surface-2 px-3 py-2 text-xs font-medium text-muted">
              {block.c}
            </div>
          ) : null}
          <table className="w-full min-w-[28rem] text-left text-sm">
            <thead className="bg-bg-2 text-ink">
              <tr>
                {block.h.map((h) => (
                  <th key={h} className="px-3 py-2 font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.r.map((row, i) => (
                <tr key={i} className="border-t border-line align-top">
                  {row.map((cell, j) => (
                    <td key={j} className="px-3 py-2 text-ink-soft">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "flow":
      return <Flow title={block.title} nodes={block.nodes} />;
    case "tip":
      return (
        <aside
          className={cn(
            "rounded-[var(--radius-md)] border px-4 py-3 text-sm leading-relaxed",
            block.k === "gold" && "border-hy/30 bg-hy-bg text-hy",
            block.k === "exam" && "border-accent/25 bg-ok-bg text-ok",
            block.k === "warn" && "border-mark/25 bg-warn-bg text-warn",
            block.k === "book" && "border-line bg-surface-2 text-ink-soft",
          )}
        >
          <div className="text-[10px] uppercase tracking-[0.16em] opacity-80">
            {block.title ?? (block.k === "gold" ? "Gold line" : block.k === "exam" ? "Examiner" : block.k === "warn" ? "Caveat" : "Book")}
          </div>
          <p className="mt-1">{block.v}</p>
        </aside>
      );
    case "dia":
      return <Diagram id={block.id} cap={block.cap} />;
    case "refs":
      return (
        <ul className="space-y-1 text-sm text-muted">
          {block.v.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      );
    case "kpi":
      return (
        <dl className="grid grid-cols-2 gap-2 md:grid-cols-4">
          {block.items.map((it) => (
            <div key={it.k} className="rounded-[var(--radius-md)] border border-line bg-surface px-3 py-3">
              <dt className="text-[10px] uppercase tracking-[0.14em] text-muted">{it.k}</dt>
              <dd className="mt-1 font-display text-lg leading-tight">{it.v}</dd>
            </div>
          ))}
        </dl>
      );
    default:
      return null;
  }
}

function Flow({ title, nodes }: { title?: string; nodes: FlowNode[] }) {
  return (
    <div className="rounded-[var(--radius-lg)] border border-line bg-surface p-4">
      {title ? <h3 className="mb-4 font-display text-lg">{title}</h3> : null}
      <ol className="space-y-2">
        {nodes.map((n, i) => (
          <li key={n.id} className="flex gap-3">
            <div className="flex w-6 flex-col items-center">
              <span
                className={cn(
                  "mt-1 size-2.5 rounded-full",
                  n.kind === "decision" && "bg-hy",
                  n.kind === "warn" && "bg-mark",
                  n.kind === "end" && "bg-accent",
                  (!n.kind || n.kind === "action" || n.kind === "start") && "bg-accent-2",
                )}
              />
              {i < nodes.length - 1 ? <span className="w-px flex-1 bg-line" /> : null}
            </div>
            <div className="mb-2 rounded-[var(--radius-sm)] border border-line bg-bg px-3 py-2">
              <p className="text-sm leading-snug text-ink">{n.label}</p>
              {n.note ? <p className="mt-1 text-xs text-muted">{n.note}</p> : null}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
