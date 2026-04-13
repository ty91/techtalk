import { motion } from 'motion/react'
import { SlideLayout } from './SlideLayout'

function BrainIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none">
      <path
        d="M 22 16 C 14 16 10 22 12 30 C 8 34 10 42 16 44 C 18 50 26 52 32 48 C 38 52 46 50 48 44 C 54 42 56 34 52 30 C 54 22 50 16 42 16 C 38 10 26 10 22 16 Z"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <line
        x1={32}
        y1={14}
        x2={32}
        y2={50}
        stroke="currentColor"
        strokeWidth={1.5}
      />
      <path
        d="M 20 24 Q 25 26 22 30 Q 19 34 26 36"
        stroke="currentColor"
        strokeWidth={1.3}
        strokeLinecap="round"
      />
      <path
        d="M 44 24 Q 39 26 42 30 Q 45 34 38 36"
        stroke="currentColor"
        strokeWidth={1.3}
        strokeLinecap="round"
      />
    </svg>
  )
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="currentColor" className={className}>
      <circle cx={20} cy={14} r={6} />
      <path d="M 6 38 Q 6 22 20 22 Q 34 22 34 38 Z" />
    </svg>
  )
}

function Lines({ widths }: { widths: string[] }) {
  return (
    <div className="space-y-1.5">
      {widths.map((w, i) => (
        <div
          key={i}
          className="h-1 rounded-full bg-white/25"
          style={{ width: w }}
        />
      ))}
    </div>
  )
}

const HUB_W = 600
const HUB_H = 420
const LLM_CX = 300
const LLM_CY = 210
const LLM_R = 66

const COMPONENTS = [
  { label: 'Tools', x: 60, y: 60 },
  { label: 'Memory', x: 300, y: 36 },
  { label: 'Web Search', x: 540, y: 60 },
  { label: 'Code Exec', x: 540, y: 360 },
  { label: 'Files', x: 300, y: 384 },
  { label: 'Database', x: 60, y: 360 },
]

const BOX_HW = 60
const BOX_HH = 22

function computeSegment(cx: number, cy: number) {
  const dx = cx - LLM_CX
  const dy = cy - LLM_CY
  const dist = Math.hypot(dx, dy)
  const startT = LLM_R / dist
  const kx = BOX_HW / Math.abs(dx || 1)
  const ky = BOX_HH / Math.abs(dy || 1)
  const endT = 1 - Math.min(kx, ky)
  return {
    x1: LLM_CX + dx * startT,
    y1: LLM_CY + dy * startT,
    x2: LLM_CX + dx * endT,
    y2: LLM_CY + dy * endT,
  }
}

export function SystemBrainSlide() {
  return (
    <SlideLayout
      title="시스템의 두뇌와 인터페이스가 된 LLM"
      subtitle="LLM이 충분히 똑똑해지면서, 어느 시점부터 LLM에게 진짜 일을 시켜볼 수 있게 되었어요"
    >
      <div className="flex w-full max-w-6xl items-center justify-center gap-8">
        <motion.div
          className="flex flex-col items-center gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="rounded-full bg-white/10 p-3 text-neutral-300">
            <UserIcon className="h-9 w-9" />
          </div>
          <div className="flex w-48 flex-col gap-2 rounded-2xl border border-white/15 bg-white/5 p-4">
            <div className="self-end rounded-lg rounded-tr-sm border border-sky-400/30 bg-sky-500/10 px-3 py-2">
              <Lines widths={['3rem', '2.2rem']} />
            </div>
            <div className="self-start rounded-lg rounded-tl-sm border border-violet-400/30 bg-violet-500/10 px-3 py-2">
              <Lines widths={['4rem', '3rem', '2rem']} />
            </div>
            <div className="self-end rounded-lg rounded-tr-sm border border-sky-400/30 bg-sky-500/10 px-3 py-2">
              <Lines widths={['3.5rem']} />
            </div>
          </div>
          <div className="text-xs uppercase tracking-wider text-neutral-500">
            Chat
          </div>
        </motion.div>

        <motion.svg
          viewBox="0 0 60 20"
          width={60}
          height={20}
          className="shrink-0 text-sky-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          <line
            x1={2}
            y1={10}
            x2={48}
            y2={10}
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
          />
          <polygon points="58,10 46,5 46,15" fill="currentColor" />
        </motion.svg>

        <div
          className="relative shrink-0"
          style={{ width: HUB_W, height: HUB_H }}
        >
          <svg
            className="absolute inset-0"
            viewBox={`0 0 ${HUB_W} ${HUB_H}`}
            width={HUB_W}
            height={HUB_H}
          >
            {COMPONENTS.map((c, i) => {
              const seg = computeSegment(c.x, c.y)
              return (
                <motion.line
                  key={c.label}
                  x1={seg.x1}
                  y1={seg.y1}
                  x2={seg.x2}
                  y2={seg.y2}
                  stroke="rgb(167 139 250 / 0.45)"
                  strokeWidth={1.4}
                  strokeDasharray="5 4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.55, delay: 1.1 + i * 0.09 }}
                />
              )
            })}
          </svg>

          <motion.div
            className="absolute flex flex-col items-center justify-center rounded-full border-2 border-violet-400/70 bg-violet-500/15 text-violet-100 shadow-[0_0_36px_rgba(167,139,250,0.25)]"
            style={{
              left: LLM_CX - LLM_R,
              top: LLM_CY - LLM_R,
              width: LLM_R * 2,
              height: LLM_R * 2,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.85 }}
          >
            <BrainIcon className="h-11 w-11" />
            <div className="mt-1 text-sm font-semibold tracking-wide">
              LLM
            </div>
          </motion.div>

          {COMPONENTS.map((c, i) => (
            <motion.div
              key={c.label}
              className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-neutral-200"
              style={{ left: c.x, top: c.y }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 1.1 + i * 0.09 }}
            >
              {c.label}
            </motion.div>
          ))}
        </div>
      </div>
    </SlideLayout>
  )
}
