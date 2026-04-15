import { motion } from "motion/react";
import { SlideLayout } from "./SlideLayout";

const iconStroke = {
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function ContextToAgentVisual() {
  return (
    <div className="flex items-center justify-center gap-3">
      <div className="relative rounded-xl border border-emerald-400/50 bg-emerald-400/5 px-3 pt-4 pb-3">
        <div className="absolute -top-2 left-3 rounded-full bg-neutral-950 px-2 font-mono text-[8px] font-semibold uppercase tracking-wider text-emerald-300">
          CONTEXT
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="h-1.5 w-28 rounded-sm bg-yellow-400/60" />
          <div className="h-1.5 w-20 rounded-sm bg-violet-400/60" />
          <div className="h-1.5 w-24 rounded-sm bg-sky-400/60" />
          <div className="h-1.5 w-16 rounded-sm bg-rose-400/70" />
        </div>
      </div>
      <svg
        viewBox="0 0 40 14"
        width={32}
        height={14}
        className="shrink-0 text-neutral-500"
      >
        <line
          x1={2}
          y1={7}
          x2={30}
          y2={7}
          stroke="currentColor"
          strokeWidth={1.8}
          strokeLinecap="round"
        />
        <polygon points="38,7 28,3 28,11" fill="currentColor" />
      </svg>
      <div className="rounded-full border border-violet-400/60 bg-violet-500/15 p-2 text-violet-100 shadow-[0_0_24px_rgba(167,139,250,0.25)]">
        <svg
          viewBox="0 0 80 80"
          className="h-9 w-9"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.6}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx={40} cy={10} r={3} fill="currentColor" />
          <line x1={40} y1={14} x2={40} y2={22} />
          <rect x={16} y={22} width={48} height={42} rx={10} />
          <circle cx={30} cy={40} r={4} fill="currentColor" stroke="none" />
          <circle cx={50} cy={40} r={4} fill="currentColor" stroke="none" />
          <rect
            x={32}
            y={52}
            width={16}
            height={4}
            rx={2}
            fill="currentColor"
            stroke="none"
          />
        </svg>
      </div>
    </div>
  );
}

function WarningChipsVisual() {
  const chips = [
    {
      label: "Context Rot",
      sub: "핵심 정보가 묻힘",
      cls: "border-rose-400/50 bg-rose-500/10 text-rose-100",
      tagCls: "text-rose-300",
    },
    {
      label: "지시 이탈",
      sub: "시스템 프롬프트 무력화",
      cls: "border-orange-400/50 bg-orange-500/10 text-orange-100",
      tagCls: "text-orange-300",
    },
    {
      label: "비용 ↑",
      sub: "토큰 = 돈",
      cls: "border-yellow-400/50 bg-yellow-500/10 text-yellow-100",
      tagCls: "text-yellow-300",
    },
  ];
  return (
    <div className="flex w-full max-w-[240px] flex-col gap-1.5">
      {chips.map((c) => (
        <div
          key={c.label}
          className={`flex items-center justify-between rounded-lg border px-3 py-1.5 ${c.cls}`}
        >
          <div className="flex flex-col leading-tight">
            <span className="text-[13px] font-semibold">{c.label}</span>
            <span className={`text-[10px] ${c.tagCls}`}>{c.sub}</span>
          </div>
          <span className="font-mono text-sm opacity-80">⚠</span>
        </div>
      ))}
    </div>
  );
}

function FourPillarsVisual() {
  const pillars = [
    {
      label: "시스템\n프롬프트",
      cls: "border-yellow-400/50 bg-yellow-500/10 text-yellow-200",
      icon: (
        <svg viewBox="0 0 32 32" className="h-5 w-5" {...iconStroke}>
          <rect x={5} y={6} width={22} height={20} rx={3} />
          <line x1={5} y1={12} x2={27} y2={12} />
          <line x1={9} y1={18} x2={23} y2={18} />
          <line x1={9} y1={22} x2={19} y2={22} />
        </svg>
      ),
    },
    {
      label: "도구",
      cls: "border-violet-400/50 bg-violet-500/10 text-violet-200",
      icon: (
        <svg viewBox="0 0 32 32" className="h-5 w-5" {...iconStroke}>
          <path d="M20 4 L28 12 L22 18 L18 14 L11 21 L7 25 L5 23 L9 19 L16 12 L12 8 Z" />
        </svg>
      ),
    },
    {
      label: "맥락 검색",
      cls: "border-sky-400/50 bg-sky-500/10 text-sky-200",
      icon: (
        <svg viewBox="0 0 32 32" className="h-5 w-5" {...iconStroke}>
          <circle cx={14} cy={14} r={7} />
          <line x1={19} y1={19} x2={26} y2={26} />
        </svg>
      ),
    },
    {
      label: "압축",
      cls: "border-emerald-400/50 bg-emerald-500/10 text-emerald-200",
      icon: (
        <svg viewBox="0 0 32 32" className="h-5 w-5" {...iconStroke}>
          <path d="M6 9 L14 9" />
          <path d="M6 14 L20 14" />
          <path d="M6 19 L17 19" />
          <path d="M6 23 L12 23" />
          <path d="M23 11 L28 16 L23 21" />
          <path d="M28 16 L18 16" />
        </svg>
      ),
    },
  ];
  return (
    <div className="grid w-full max-w-[240px] grid-cols-2 gap-2">
      {pillars.map((p) => (
        <div
          key={p.label}
          className={`flex items-center gap-2 rounded-lg border px-2.5 py-2 ${p.cls}`}
        >
          {p.icon}
          <span className="whitespace-pre-line text-[11px] font-medium leading-tight">
            {p.label}
          </span>
        </div>
      ))}
    </div>
  );
}

type Point = {
  number: string;
  accent: string;
  headline: string;
  visual: React.ReactNode;
};

const points: Point[] = [
  {
    number: "01",
    accent: "text-emerald-300",
    headline: "모델이 아는 건 컨텍스트 뿐",
    visual: <ContextToAgentVisual />,
  },
  {
    number: "02",
    accent: "text-rose-300",
    headline: "컨텍스트를 무작정 채우면 안 돼요",
    visual: <WarningChipsVisual />,
  },
  {
    number: "03",
    accent: "text-violet-300",
    headline: "똑똑하게 컨텍스트 채우기",
    visual: <FourPillarsVisual />,
  },
];

export function ContextManagementSlide() {
  return (
    <SlideLayout title="컨텍스트는 잘 관리해야 한다">
      <div className="grid w-full max-w-6xl grid-cols-3 gap-6">
        {points.map((p, i) => (
          <motion.article
            key={p.number}
            className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-white/5 px-7 py-7"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.45,
              delay: 0.3 + i * 0.18,
              ease: "easeOut",
            }}
          >
            <div className="flex items-baseline gap-3">
              <span
                className={`font-mono text-5xl font-semibold ${p.accent}`}
              >
                {p.number}
              </span>
            </div>
            <h3 className="text-xl font-semibold leading-snug text-neutral-50">
              {p.headline}
            </h3>
            <div className="flex min-h-[150px] flex-1 items-center justify-center rounded-xl border border-white/5 bg-neutral-900/40 px-4 py-5">
              {p.visual}
            </div>
          </motion.article>
        ))}
      </div>
    </SlideLayout>
  );
}
