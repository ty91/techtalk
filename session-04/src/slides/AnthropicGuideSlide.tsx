import { motion } from "motion/react";
import { SlideLayout } from "./SlideLayout";

type Pillar = {
  title: string;
  caption: string;
  accent: string;
  icon: React.ReactNode;
};

const iconStroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const pillars: Pillar[] = [
  {
    title: "시스템 프롬프트",
    caption: "에이전트의 역할과 행동 원칙을\n명확하고 간결하게 설계하기",
    accent: "text-yellow-200",
    icon: (
      <svg viewBox="0 0 48 48" className="h-12 w-12 text-yellow-300" {...iconStroke}>
        <rect x={8} y={10} width={32} height={28} rx={4} />
        <line x1={8} y1={18} x2={40} y2={18} />
        <circle cx={12} cy={14} r={1} fill="currentColor" stroke="none" />
        <circle cx={16} cy={14} r={1} fill="currentColor" stroke="none" />
        <line x1={14} y1={26} x2={34} y2={26} />
        <line x1={14} y1={32} x2={28} y2={32} />
      </svg>
    ),
  },
  {
    title: "도구",
    caption: "최소한의 고품질 도구만 노출하고\n기능 중복을 피하기",
    accent: "text-violet-200",
    icon: (
      <svg viewBox="0 0 48 48" className="h-12 w-12 text-violet-300" {...iconStroke}>
        <path d="M30 6 L42 18 L34 26 L28 20 L16 32 L10 38 L6 34 L12 28 L24 16 L18 10 Z" />
        <line x1={22} y1={18} x2={30} y2={26} />
      </svg>
    ),
  },
  {
    title: "맥락 검색",
    caption: "필요할 때 필요한 정보만\njust-in-time으로 가져오기",
    accent: "text-sky-200",
    icon: (
      <svg viewBox="0 0 48 48" className="h-12 w-12 text-sky-300" {...iconStroke}>
        <circle cx={21} cy={21} r={11} />
        <line x1={29} y1={29} x2={40} y2={40} />
        <line x1={16} y1={21} x2={26} y2={21} />
        <line x1={21} y1={16} x2={21} y2={26} />
      </svg>
    ),
  },
  {
    title: "압축",
    caption: "컨텍스트가 길어지면 요약으로\n핵심만 남기고 부피 줄이기",
    accent: "text-emerald-200",
    icon: (
      <svg viewBox="0 0 48 48" className="h-12 w-12 text-emerald-300" {...iconStroke}>
        <path d="M8 14 L20 14" />
        <path d="M8 20 L28 20" />
        <path d="M8 26 L24 26" />
        <path d="M8 32 L18 32" />
        <path d="M32 16 L40 24 L32 32" />
        <path d="M40 24 L26 24" />
      </svg>
    ),
  },
];

export function AnthropicGuideSlide() {
  return (
    <SlideLayout
      title="Anthropic의 컨텍스트 엔지니어링 가이드"
      subtitle={"2025년 9월, Anthropic에서 공식적인 컨텍스트 엔지니어링 가이드를 발표했어요"}
    >
      <div className="grid w-full max-w-6xl grid-cols-4 gap-5">
        {pillars.map((p, i) => (
          <motion.article
            key={p.title}
            className="flex flex-col items-center gap-5 rounded-2xl border border-white/10 bg-white/5 px-6 py-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 + i * 0.12, ease: "easeOut" }}
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
              {p.icon}
            </div>
            <h3 className={`text-2xl font-semibold ${p.accent}`}>{p.title}</h3>
            <p className="whitespace-pre-line text-sm leading-relaxed text-neutral-400">
              {p.caption}
            </p>
          </motion.article>
        ))}
      </div>
    </SlideLayout>
  );
}
