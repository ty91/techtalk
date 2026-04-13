import { motion } from 'motion/react'
import { SlideLayout } from './SlideLayout'

function UserIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="currentColor" className={className}>
      <circle cx={20} cy={14} r={6} />
      <path d="M 6 38 Q 6 22 20 22 Q 34 22 34 38 Z" />
    </svg>
  )
}

function AgentIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className}>
      <rect
        x={8}
        y={12}
        width={24}
        height={20}
        rx={4}
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
      />
      <circle cx={15} cy={20} r={2} fill="currentColor" />
      <circle cx={25} cy={20} r={2} fill="currentColor" />
      <line
        x1={14}
        y1={27}
        x2={26}
        y2={27}
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
      />
      <line
        x1={20}
        y1={12}
        x2={20}
        y2={6}
        stroke="currentColor"
        strokeWidth={2}
      />
      <circle cx={20} cy={5} r={1.8} fill="currentColor" />
    </svg>
  )
}

function Lines({ widths }: { widths: string[] }) {
  return (
    <div className="space-y-2">
      {widths.map((w, i) => (
        <div
          key={i}
          className="h-1.5 rounded-full bg-white/25"
          style={{ width: w }}
        />
      ))}
    </div>
  )
}

export function UserVsSystemSlide() {
  return (
    <SlideLayout
      title="유저 프롬프트 vs 시스템 프롬프트"
      subtitle="LLM 챗봇들에게는 우리가 입력하는 프롬프트 전에 시스템 프롬프트가 먼저 입력되어 있습니다."
    >
      <div className="flex w-full max-w-5xl items-center gap-6">
        <div className="flex flex-1 flex-col gap-6">
          <motion.div
            className="rounded-xl border border-white/15 bg-white/5 p-5"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.3 }}
          >
            <div className="mb-3 font-mono text-sm font-medium tracking-wide text-violet-300">
              SYSTEM:
            </div>
            <Lines widths={['100%', '92%', '96%', '68%']} />
          </motion.div>

          <motion.div
            className="flex items-start gap-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.55 }}
          >
            <div className="shrink-0 rounded-full bg-white/10 p-2 text-neutral-300">
              <UserIcon className="h-8 w-8" />
            </div>
            <div className="flex-1 rounded-2xl rounded-tl-sm border border-sky-400/30 bg-sky-500/10 p-5">
              <Lines widths={['88%', '72%']} />
            </div>
          </motion.div>
        </div>

        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.85 }}
        >
          <svg
            viewBox="0 0 72 16"
            className="w-20 shrink-0 text-violet-400/60"
          >
            <line
              x1={0}
              y1={8}
              x2={60}
              y2={8}
              stroke="currentColor"
              strokeWidth={2}
              strokeDasharray="4 4"
            />
            <polygon points="72,8 60,3 60,13" fill="currentColor" />
          </svg>
          <div className="flex flex-col items-center gap-2">
            <div className="rounded-2xl border border-violet-400/50 bg-violet-500/10 p-3 text-violet-200">
              <AgentIcon className="h-12 w-12" />
            </div>
            <span className="text-sm text-neutral-400">Agent</span>
          </div>
        </motion.div>
      </div>
    </SlideLayout>
  )
}
