import { createFileRoute, Link } from "@tanstack/react-router";
import { MASTERS } from "@/data/index";
import { topicById } from "@/data/index";

export const Route = createFileRoute("/high-yield")({ component: HighYield });

function HighYield() {
  const list = MASTERS.filter((m) => m.highYield || m.gold).sort(
    (a, b) => b.exams.length - a.exams.length || Number(b.gold) - Number(a.gold),
  );

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-display text-3xl">High-yield tray</h1>
      <p className="mt-2 text-sm text-muted">
        Recycled stems and gold-medal topics. If you can write these cold, you are in the medal conversation.
      </p>
      <ol className="mt-8 divide-y divide-line border-y border-line">
        {list.map((m, i) => (
          <li key={m.id}>
            <Link
              to="/q/$questionId"
              params={{ questionId: m.id }}
              className="flex gap-4 py-4 hover:text-accent"
            >
              <span className="w-6 font-mono text-sm text-faint">{i + 1}</span>
              <div>
                <div className="font-medium">{m.title}</div>
                <div className="mt-1 text-xs text-muted">
                  {topicById(m.topicId)?.title} · {m.exams.length} papers
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
