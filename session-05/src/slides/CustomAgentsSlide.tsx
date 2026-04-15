import { motion } from "motion/react";
import { SlideLayout } from "./SlideLayout";

type AgentEntry = {
  name: string;
  desc: string;
};

const AGENTS: AgentEntry[] = [
  {
    name: "best-practices-researcher.md",
    desc: "외부 베스트 프랙티스·문서·예제 조사",
  },
  {
    name: "code-flow-researcher.md",
    desc: "코드 구조와 실행 흐름 분석",
  },
  {
    name: "code-simplicity-reviewer.md",
    desc: "구현 후 단순성·YAGNI 리뷰",
  },
  {
    name: "conventions-researcher.md",
    desc: "프로젝트 코드 스타일·패턴 발굴",
  },
  {
    name: "git-history-analyzer.md",
    desc: "git 히스토리 기반 코드 진화 분석",
  },
  {
    name: "readability-reviewer.md",
    desc: "인지 부하 관점 가독성 리뷰",
  },
  {
    name: "frontend-engineer.md",
    desc: "프론트엔드 UI·상태 관리 구현",
  },
  {
    name: "backend-engineer.md",
    desc: "백엔드 API·데이터 모델 구현",
  },
  {
    name: "data-analyst.md",
    desc: "데이터 분석·SQL 쿼리 작성",
  },
];

const T_HEADER = 0.25;
const T_PATH = T_HEADER + 0.2;
const T_ROW_START = T_PATH + 0.25;
const ROW_STAGGER = 0.09;

function DocIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3.5 2h6l3 3v9h-9z" />
      <path d="M9.5 2v3h3" />
    </svg>
  );
}

function TreePrefix({ isLast }: { isLast: boolean }) {
  return (
    <span className="shrink-0 select-none font-mono text-[13px] text-neutral-600">
      {isLast ? "└─" : "├─"}
    </span>
  );
}

function AgentRow({
  agent,
  isLast,
  delay,
}: {
  agent: AgentEntry;
  isLast: boolean;
  delay: number;
}) {
  return (
    <motion.div
      className="flex items-center gap-3 rounded-md pl-3 pr-3.5 py-2"
      initial={{ opacity: 0, x: -4 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.32, delay, ease: "easeOut" }}
    >
      <TreePrefix isLast={isLast} />
      <DocIcon className="h-4 w-4 shrink-0 text-sky-300/80" />
      <span className="shrink-0 font-mono text-[14px] text-sky-100">
        {agent.name}
      </span>
      <span className="truncate text-[12.5px] text-neutral-400">
        {agent.desc}
      </span>
    </motion.div>
  );
}

export function CustomAgentsSlide() {
  return (
    <SlideLayout title="커스텀 서브에이전트도 만들 수 있어요">
      <div className="w-full max-w-4xl">
        <motion.div
          className="overflow-hidden rounded-2xl border border-white/15 bg-neutral-950/85 shadow-[0_0_34px_rgba(0,0,0,0.5)]"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: T_HEADER, ease: "easeOut" }}
        >
          <div className="flex items-center gap-2 border-b border-white/10 bg-white/3 px-4 py-2.5">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
            </div>
            <span className="ml-3 font-mono text-[11.5px] text-neutral-400">
              <span className="text-emerald-300">~</span> ls ~/.claude/agents
            </span>
          </div>

          <div className="px-4 pt-3 pb-4">
            <motion.div
              className="px-2 pb-1 font-mono text-[13px] text-violet-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: T_PATH }}
            >
              ~/.claude/agents/
            </motion.div>
            <div className="flex flex-col gap-0.5">
              {AGENTS.map((agent, i) => (
                <AgentRow
                  key={agent.name}
                  agent={agent}
                  isLast={i === AGENTS.length - 1}
                  delay={T_ROW_START + i * ROW_STAGGER}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </SlideLayout>
  );
}
