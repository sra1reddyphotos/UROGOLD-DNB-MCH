import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { searchMasters } from "@/data/index";

export const Route = createFileRoute("/search")({ component: SearchPage });

function SearchPage() {
  const [q, setQ] = useState("");
  const hits = useMemo(() => searchMasters(q), [q]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-display text-3xl">Search the bank</h1>
      <p className="mt-2 text-sm text-muted">Stems, titles, tags, years — e.g. “PUV valve bladder”, “IVC thrombus”.</p>
      <input
        autoFocus
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Type a stem, topic or trial…"
        className="mt-6 h-12 w-full rounded-[var(--radius-md)] border border-line bg-surface px-4 text-base outline-none focus:ring-2 focus:ring-accent/30"
      />
      <p className="mt-3 font-mono text-xs text-muted">
        {q.trim() ? `${hits.length} match${hits.length === 1 ? "" : "es"}` : "Waiting for a query"}
      </p>
      <ul className="mt-6 divide-y divide-line">
        {hits.map((m) => (
          <li key={m.id}>
            <Link
              to="/q/$questionId"
              params={{ questionId: m.id }}
              className="block py-3 hover:text-accent"
            >
              <div className="font-medium">{m.title}</div>
              <div className="mt-1 line-clamp-2 text-sm text-muted">{m.exams[0]?.stem}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
