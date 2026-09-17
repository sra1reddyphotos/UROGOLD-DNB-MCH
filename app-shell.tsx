import { Link, useRouterState } from "@tanstack/react-router";
import { Bookmark, BookOpen, Compass, Menu, Search, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { TOPICS } from "@/data/topics";
import { STATS } from "@/data/index";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/cn";

const NAV = [
  { to: "/", label: "Atlas", icon: Compass },
  { to: "/search", label: "Search", icon: Search },
  { to: "/high-yield", label: "High-yield", icon: BookOpen },
  { to: "/saved", label: "Saved", icon: Bookmark },
  { to: "/strategy", label: "Gold method", icon: BookOpen },
];

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const saved = useProgress((s) => s.saved.length);
  const read = useProgress((s) => Object.keys(s.read).length);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  return (
    <div className="min-h-dvh bg-bg text-ink">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-white/6 bg-nav text-nav-fg lg:flex">
        <Brand />
        <NavList pathname={pathname} saved={saved} />
        <TopicRail pathname={pathname} />
        <p className="mt-auto px-5 pb-5 text-[11px] leading-relaxed text-nav-muted">
          {STATS.masters} topics · {STATS.papers} paper stems
          <br />
          {hydrated ? `${read} read · ${saved} saved` : "Progress on this device"}
        </p>
      </aside>

      {open ? (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            className="absolute inset-0 bg-ink/50"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <div className="relative flex h-full w-[min(20rem,86vw)] flex-col bg-nav text-nav-fg">
            <div className="flex items-center justify-between pr-2">
              <Brand />
              <button
                className="mr-3 size-10 text-nav-fg"
                onClick={() => setOpen(false)}
                aria-label="Close"
              >
                <X className="mx-auto size-5" />
              </button>
            </div>
            <NavList pathname={pathname} saved={saved} onClick={() => setOpen(false)} />
            <TopicRail pathname={pathname} onClick={() => setOpen(false)} />
          </div>
        </div>
      ) : null}

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-line bg-bg/90 px-4 backdrop-blur-md lg:hidden">
          <button
            className="flex size-10 items-center justify-center rounded-[var(--radius-sm)] text-ink"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </button>
          <Link to="/" className="font-display text-lg tracking-tight">
            UroAtlas
          </Link>
          <Link
            to="/search"
            className="ml-auto flex size-10 items-center justify-center text-muted"
            aria-label="Search"
          >
            <Search className="size-5" />
          </Link>
        </header>
        <main className="min-h-dvh">{children}</main>
      </div>
    </div>
  );
}

function Brand() {
  return (
    <Link to="/" className="block px-5 pb-4 pt-6">
      <div className="font-display text-[1.65rem] leading-none tracking-tight text-nav-fg">
        UroAtlas
      </div>
      <div className="mt-1 text-[11px] uppercase tracking-[0.18em] text-nav-muted">
        DrNB gold companion
      </div>
    </Link>
  );
}

function NavList({
  pathname,
  saved,
  onClick,
}: {
  pathname: string;
  saved: number;
  onClick?: () => void;
}) {
  return (
    <nav className="flex flex-col gap-0.5 px-3">
      {NAV.map((item) => {
        const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
        const Icon = item.icon;
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={onClick}
            className={cn(
              "flex h-10 items-center gap-3 rounded-[var(--radius-sm)] px-3 text-sm transition-colors duration-150",
              active ? "bg-white/8 text-nav-fg" : "text-nav-muted hover:bg-white/5 hover:text-nav-fg",
            )}
          >
            <Icon className="size-4 shrink-0" />
            <span>{item.label}</span>
            {item.to === "/saved" && saved > 0 ? (
              <span className="ml-auto font-mono text-[11px] tabular-nums text-nav-fg/70">
                {saved}
              </span>
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}

function TopicRail({ pathname, onClick }: { pathname: string; onClick?: () => void }) {
  return (
    <div className="mt-6 min-h-0 flex-1 overflow-y-auto px-3 pb-4">
      <p className="px-3 pb-2 text-[10px] uppercase tracking-[0.16em] text-nav-muted">Chapters</p>
      <div className="flex flex-col">
        {TOPICS.map((t) => {
          const to = `/topics/${t.id}`;
          const active = pathname === to;
          return (
            <Link
              key={t.id}
              to="/topics/$topicId"
              params={{ topicId: t.id }}
              onClick={onClick}
              className={cn(
                "rounded-[var(--radius-sm)] px-3 py-1.5 text-[13px] leading-snug transition-colors duration-150",
                active ? "bg-white/8 text-nav-fg" : "text-nav-muted hover:text-nav-fg",
              )}
            >
              {t.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
