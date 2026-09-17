import { createFileRoute, Link } from "@tanstack/react-router";
import { getMaster } from "@/data/index";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/saved")({ component: SavedPage });

function SavedPage() {
  const ids = useProgress((s) => s.saved);
  const items = ids.map(getMaster).filter(Boolean);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-display text-3xl">Saved answers</h1>
      <p className="mt-2 text-sm text-muted">Stored on this device. Use it as your last-week revision tray.</p>
      {items.length === 0 ? (
        <p className="mt-10 text-sm text-muted">Nothing saved yet. Open an answer and tap Save.</p>
      ) : (
        <ul className="mt-8 divide-y divide-line border-y border-line">
          {items.map((m) =>
            m ? (
              <li key={m.id}>
                <Link
                  to="/q/$questionId"
                  params={{ questionId: m.id }}
                  className="block py-4 hover:text-accent"
                >
                  {m.title}
                </Link>
              </li>
            ) : null,
          )}
        </ul>
      )}
    </div>
  );
}
