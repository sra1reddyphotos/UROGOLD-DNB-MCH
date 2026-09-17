# UroAtlas

**DrNB Super-speciality (Genitourinary Surgery) gold-medal companion.**

Every theory stem from 2011–2022, grouped into master 10-mark answers — bullets, tables, algorithms and examiner lines from Campbell-Walsh-Wein, EAU, AUA and Smith's.

Built with **TanStack Start + React + TypeScript + Tailwind CSS v4**.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:8080

## Deploy (free)

This project is ready for **Vercel** (recommended free hosting):

1. Push this repository to GitHub
2. Go to [vercel.com](https://vercel.com) → Import Project → select this repo
3. Deploy (no extra configuration needed — Nitro preset is already set to `vercel`)

Alternative free hosts that also work: Netlify, Cloudflare Pages.

## Layout

| Path | What it is |
|---|---|
| `src/routes/` | Pages (home, chapters, answers, search, gold method) |
| `src/data/answers/` | 10-mark model answers (Campbell-Walsh-Wein, EAU, AUA) |
| `src/data/topics.ts` | Chapter list |
| `src/components/` | Atlas shell, answer renderer, diagrams |
| `src/styles.css` | Design tokens (paper, ink, surgical teal) |
| `public/` | Favicon, Open Graph card, X banner |

## Notes

- Bookmarks, read state and notes persist in the browser (`localStorage`).
- The app is fully open — no login required to read the content.
