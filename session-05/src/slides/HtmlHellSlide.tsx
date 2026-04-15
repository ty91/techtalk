import { useMemo } from "react";
import { motion } from "motion/react";
import { SlideLayout } from "./SlideLayout";

const HTML_LINES = [
  '<!DOCTYPE html>',
  '<html lang="en">',
  '<head>',
  '  <meta charset="utf-8">',
  '  <meta name="viewport" content="width=device-width, initial-scale=1">',
  '  <meta name="description" content="Example page">',
  '  <meta property="og:title" content="Example">',
  '  <meta property="og:image" content="/og.png">',
  '  <link rel="icon" href="/favicon.ico">',
  '  <link rel="preconnect" href="https://fonts.gstatic.com">',
  '  <link rel="stylesheet" href="/assets/main.css">',
  '  <link rel="stylesheet" href="/assets/theme.css">',
  '  <script src="/assets/vendor.js" defer></script>',
  '  <script src="/assets/app.js" defer></script>',
  '  <title>Example - Welcome</title>',
  '</head>',
  '<body class="theme-dark">',
  '  <div id="__next">',
  '    <div class="layout">',
  '      <header class="site-header">',
  '        <nav class="nav" role="navigation">',
  '          <a href="/" class="logo"><img src="/logo.svg" alt="Logo"></a>',
  '          <ul class="nav__list">',
  '            <li class="nav__item"><a href="/products">Products</a></li>',
  '            <li class="nav__item"><a href="/pricing">Pricing</a></li>',
  '            <li class="nav__item"><a href="/docs">Docs</a></li>',
  '            <li class="nav__item"><a href="/blog">Blog</a></li>',
  '          </ul>',
  '          <div class="nav__cta">',
  '            <button type="button" class="btn btn--ghost">Sign in</button>',
  '            <button type="button" class="btn btn--primary">Get started</button>',
  '          </div>',
  '        </nav>',
  '      </header>',
  '      <main class="content">',
  '        <section class="hero">',
  '          <div class="hero__inner">',
  '            <h1 class="hero__title">Build faster with Example</h1>',
  '            <p class="hero__subtitle">The fastest way to ship your next product.</p>',
  '            <div class="hero__actions">',
  '              <a href="/signup" class="btn btn--primary btn--lg">Start free</a>',
  '              <a href="/demo" class="btn btn--link">Watch demo →</a>',
  '            </div>',
  '            <img src="/hero.png" alt="Dashboard screenshot" loading="lazy">',
  '          </div>',
  '        </section>',
  '        <section class="features">',
  '          <div class="container">',
  '            <div class="feature-grid">',
  '              <article class="feature-card">',
  '                <svg class="icon"><use href="#icon-zap"/></svg>',
  '                <h3>Fast by default</h3>',
  '                <p>Zero-config edge delivery.</p>',
  '              </article>',
  '              <article class="feature-card">...</article>',
  '              <article class="feature-card">...</article>',
  '            </div>',
  '          </div>',
  '        </section>',
  '      </main>',
  '      <footer class="site-footer">...</footer>',
  '    </div>',
  '  </div>',
  '  <script>window.__DATA__ = {"user":null,"flags":{...}};</script>',
  '  <script src="https://cdn.analytics.example.com/track.js"></script>',
  '</body>',
  '</html>',
];

const LINE_STAGGER = 0.04;

function colorFor(line: string): string {
  const trimmed = line.trimStart();
  if (
    trimmed.startsWith('<!') ||
    trimmed.startsWith('<script') ||
    trimmed.startsWith('<link')
  )
    return 'text-amber-300/80';
  if (trimmed.startsWith('</')) return 'text-rose-300/80';
  if (trimmed.startsWith('<')) return 'text-sky-300/80';
  return 'text-neutral-300/80';
}

const MINIMAP_ROWS = 140;
const MEANINGFUL_RANGES: [number, number][] = [
  [14, 15],
  [24, 27],
  [38, 40],
  [54, 57],
  [72, 75],
  [88, 92],
  [104, 107],
  [118, 120],
];

function seededRandom(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

type MinimapRow = {
  i: number;
  isGreen: boolean;
  width: number;
  shade: number;
};

function buildMinimap(): MinimapRow[] {
  const rand = seededRandom(97);
  return Array.from({ length: MINIMAP_ROWS }, (_, i) => {
    const isGreen = MEANINGFUL_RANGES.some(([a, b]) => i >= a && i <= b);
    const width = 45 + rand() * 50;
    const shade = 0.55 + rand() * 0.4;
    return { i, isGreen, width, shade };
  });
}

export function HtmlHellSlide() {
  const minimapRows = useMemo(buildMinimap, []);
  const meaningfulCount = minimapRows.filter((r) => r.isGreen).length;
  const meaningfulPct = Math.round((meaningfulCount / MINIMAP_ROWS) * 100);

  return (
    <SlideLayout title="HTML 지옥에서 벗어나기">
      <div className="flex w-full max-w-5xl flex-col items-center">
        <motion.div
          className="z-10 flex items-center gap-2 rounded-full border border-white/20 bg-neutral-900/90 px-4 py-2"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
          <span className="ml-3 font-mono text-xs text-neutral-400">
            https://example.com
          </span>
          <motion.span
            className="ml-3 rounded-full border border-violet-400/60 bg-violet-500/20 px-2 py-0.5 font-mono text-[10px] font-semibold text-violet-200"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            fetch()
          </motion.span>
        </motion.div>

        <div className="mt-6 flex w-full items-stretch gap-4">
          <div className="flex h-[480px] flex-1 flex-col overflow-hidden rounded-xl border border-white/10 bg-neutral-950/80 font-mono text-[12px] leading-[1.55]">
            <div className="flex items-center gap-1.5 border-b border-white/10 bg-neutral-900/60 px-3 py-1.5">
              <span className="h-2 w-2 rounded-full bg-neutral-700" />
              <span className="h-2 w-2 rounded-full bg-neutral-700" />
              <span className="h-2 w-2 rounded-full bg-neutral-700" />
              <span className="ml-2 text-[10px] uppercase tracking-wider text-neutral-500">
                response body
              </span>
            </div>
            <div className="flex flex-1 overflow-hidden">
              <div className="select-none border-r border-white/5 bg-neutral-900/40 px-3 py-3 text-right text-neutral-600">
                {HTML_LINES.map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 0.2,
                      delay: 0.6 + i * LINE_STAGGER,
                    }}
                  >
                    {i + 1}
                  </motion.div>
                ))}
              </div>
              <div className="flex-1 overflow-hidden whitespace-pre px-4 py-3">
                {HTML_LINES.map((line, i) => (
                  <motion.div
                    key={i}
                    className={colorFor(line)}
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.22,
                      delay: 0.6 + i * LINE_STAGGER,
                      ease: 'easeOut',
                    }}
                  >
                    {line}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <motion.div
            className="flex h-[480px] w-[220px] flex-col overflow-hidden rounded-xl border border-white/10 bg-neutral-950/80"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <div className="flex items-center justify-between border-b border-white/10 bg-neutral-900/60 px-3 py-1.5">
              <span className="text-[10px] uppercase tracking-wider text-neutral-500">
                웹페이지 전체
              </span>
              <span className="rounded-full bg-emerald-500/15 px-1.5 py-0.5 font-mono text-[9px] font-semibold text-emerald-300">
                의미 {meaningfulPct}%
              </span>
            </div>
            <div className="flex flex-1 flex-col justify-between gap-[2px] px-3 py-2.5">
              {minimapRows.map((r) => (
                <motion.div
                  key={r.i}
                  className={`h-[1.5px] rounded-[1px] ${
                    r.isGreen ? 'bg-emerald-400' : 'bg-rose-500'
                  }`}
                  style={{
                    width: `${r.width}%`,
                    opacity: r.isGreen ? 1 : r.shade,
                    boxShadow: r.isGreen
                      ? '0 0 6px rgba(52,211,153,0.7)'
                      : undefined,
                  }}
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    duration: 0.18,
                    delay: 0.7 + (r.i / MINIMAP_ROWS) * 2.2,
                    ease: 'easeOut',
                  }}
                />
              ))}
            </div>
            <div className="flex flex-col gap-1 border-t border-white/10 bg-neutral-900/50 px-3 py-2 text-[10px]">
              <div className="flex items-center gap-2 text-rose-200/80">
                <span className="h-2 w-4 rounded-sm bg-rose-500" />
                <span>HTML 태그·보일러플레이트</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-200">
                <span className="h-2 w-4 rounded-sm bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.7)]" />
                <span>실제 의미있는 내용</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </SlideLayout>
  );
}
