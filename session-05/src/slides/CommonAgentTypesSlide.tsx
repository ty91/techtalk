import type { ReactNode } from "react";
import { motion } from "motion/react";
import { SlideLayout } from "./SlideLayout";

type Tone = "amber" | "cyan" | "violet" | "emerald" | "rose" | "sky";

const TONE: Record<
  Tone,
  {
    border: string;
    bg: string;
    iconBg: string;
    iconText: string;
    title: string;
    glow: string;
  }
> = {
  amber: {
    border: "border-amber-400/50",
    bg: "bg-amber-500/8",
    iconBg: "bg-amber-500/20 border-amber-400/50",
    iconText: "text-amber-200",
    title: "text-amber-100",
    glow: "shadow-[0_0_22px_rgba(251,191,36,0.18)]",
  },
  cyan: {
    border: "border-cyan-400/50",
    bg: "bg-cyan-500/8",
    iconBg: "bg-cyan-500/20 border-cyan-400/50",
    iconText: "text-cyan-200",
    title: "text-cyan-100",
    glow: "shadow-[0_0_22px_rgba(103,232,249,0.18)]",
  },
  violet: {
    border: "border-violet-400/50",
    bg: "bg-violet-500/8",
    iconBg: "bg-violet-500/20 border-violet-400/50",
    iconText: "text-violet-200",
    title: "text-violet-100",
    glow: "shadow-[0_0_22px_rgba(167,139,250,0.18)]",
  },
  emerald: {
    border: "border-emerald-400/50",
    bg: "bg-emerald-500/8",
    iconBg: "bg-emerald-500/20 border-emerald-400/50",
    iconText: "text-emerald-200",
    title: "text-emerald-100",
    glow: "shadow-[0_0_22px_rgba(52,211,153,0.18)]",
  },
  rose: {
    border: "border-rose-400/50",
    bg: "bg-rose-500/8",
    iconBg: "bg-rose-500/20 border-rose-400/50",
    iconText: "text-rose-200",
    title: "text-rose-100",
    glow: "shadow-[0_0_22px_rgba(244,63,94,0.18)]",
  },
  sky: {
    border: "border-sky-400/50",
    bg: "bg-sky-500/8",
    iconBg: "bg-sky-500/20 border-sky-400/50",
    iconText: "text-sky-200",
    title: "text-sky-100",
    glow: "shadow-[0_0_22px_rgba(56,189,248,0.18)]",
  },
};

type AgentType = {
  id: string;
  name: string;
  desc: string;
  tone: Tone;
  icon: ReactNode;
};

const iconProps = {
  fill: "none",
  stroke: "currentColor" as const,
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

const TYPES: AgentType[] = [
  {
    id: "planner",
    name: "계획 에이전트",
    desc: "요구사항을 분석해 실행 단계와 파일 변경 계획을 세움",
    tone: "amber",
    icon: (
      <svg {...iconProps}>
        <rect x={4} y={4} width={16} height={16} rx={2} />
        <path d="M8 9h8" />
        <path d="M8 13h6" />
        <path d="M8 17h4" />
      </svg>
    ),
  },
  {
    id: "researcher",
    name: "리서치 에이전트",
    desc: "코드베이스·외부 문서·베스트 프랙티스를 조사해 정리",
    tone: "cyan",
    icon: (
      <svg {...iconProps}>
        <circle cx={11} cy={11} r={6} />
        <path d="M16 16l4 4" />
      </svg>
    ),
  },
  {
    id: "analyst",
    name: "데이터 분석 에이전트",
    desc: "SQL 작성·데이터 탐색·리포트 생성을 전담",
    tone: "violet",
    icon: (
      <svg {...iconProps}>
        <path d="M4 20h16" />
        <rect x={6} y={12} width={3} height={7} />
        <rect x={11} y={7} width={3} height={12} />
        <rect x={16} y={15} width={3} height={4} />
      </svg>
    ),
  },
  {
    id: "engineer",
    name: "엔지니어 에이전트",
    desc: "계획·스펙에 따라 실제 코드를 작성·편집",
    tone: "emerald",
    icon: (
      <svg {...iconProps}>
        <path d="M9 7l-5 5 5 5" />
        <path d="M15 7l5 5-5 5" />
      </svg>
    ),
  },
  {
    id: "tester",
    name: "테스터 에이전트",
    desc: "테스트 케이스 설계·실행·실패 원인 추적",
    tone: "rose",
    icon: (
      <svg {...iconProps}>
        <path d="M10 3v6l-5 10a2 2 0 002 3h10a2 2 0 002-3l-5-10V3" />
        <path d="M9 3h6" />
      </svg>
    ),
  },
  {
    id: "reviewer",
    name: "리뷰어 에이전트",
    desc: "변경사항을 검토해 버그·단순성·가독성 피드백",
    tone: "sky",
    icon: (
      <svg {...iconProps}>
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
        <circle cx={12} cy={12} r={3} />
      </svg>
    ),
  },
];

const T_CARD_START = 0.3;
const CARD_STAGGER = 0.1;

function AgentCard({ type, idx }: { type: AgentType; idx: number }) {
  const t = TONE[type.tone];
  return (
    <motion.div
      className={`flex h-full flex-col gap-3 rounded-2xl border ${t.border} ${t.bg} ${t.glow} px-5 py-4`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: T_CARD_START + idx * CARD_STAGGER,
        ease: "easeOut",
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${t.iconBg} ${t.iconText}`}
        >
          <span className="[&_svg]:h-5 [&_svg]:w-5">{type.icon}</span>
        </div>
        <div className={`text-[17px] font-semibold ${t.title}`}>
          {type.name}
        </div>
      </div>
      <p className="text-[13px] leading-relaxed text-neutral-300">
        {type.desc}
      </p>
    </motion.div>
  );
}

export function CommonAgentTypesSlide() {
  return (
    <SlideLayout title="주로 사용되는, 흔한 에이전트 유형">
      <div className="grid w-full max-w-5xl grid-cols-3 gap-5">
        {TYPES.map((type, i) => (
          <AgentCard key={type.id} type={type} idx={i} />
        ))}
      </div>
    </SlideLayout>
  );
}
