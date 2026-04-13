import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { SlideLayout } from './SlideLayout'

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

function Arrow({
  active,
  className,
}: {
  active: boolean
  className?: string
}) {
  return (
    <motion.svg
      viewBox="0 0 20 40"
      className={className}
      animate={{ opacity: active ? 1 : 0.22, scale: active ? 1.15 : 1 }}
      transition={{ duration: 0.18 }}
    >
      <line
        x1={10}
        y1={2}
        x2={10}
        y2={28}
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
      />
      <polygon points="10,38 3,27 17,27" fill="currentColor" />
    </motion.svg>
  )
}

const USER_TEXT = 'LLM의 원리에 대해 설명해줘'
const TOKENS = [
  'LLM',
  '은',
  ' 지금까지',
  ' 주어진',
  ' 토큰',
  ' 시퀀스',
  '를',
  ' 바탕',
  '으로',
  ',',
  ' 다음',
  '에',
  ' 올',
  ' 토큰',
  '의',
  ' 확률',
  ' 분포',
  '를',
]

const INITIAL_DELAY_MS = 1400
const INPUT_ARROW_MS = 220
const GAP_BETWEEN_ARROWS_MS = 80
const OUTPUT_ARROW_MS = 220
const FADE_IN_MS = 160
const AFTER_MOVE_GAP_MS = 520

export function NextTokenPredictorSlide() {
  const [settledCount, setSettledCount] = useState(0)
  const [pendingIndex, setPendingIndex] = useState<number | null>(null)
  const [inputArrowActive, setInputArrowActive] = useState(false)
  const [outputArrowActive, setOutputArrowActive] = useState(false)

  useEffect(() => {
    let cancelled = false
    const delay = (ms: number) =>
      new Promise<void>((r) => window.setTimeout(r, ms))

    const run = async () => {
      await delay(INITIAL_DELAY_MS)
      for (let i = 0; i < TOKENS.length; i++) {
        if (cancelled) return

        setInputArrowActive(true)
        await delay(INPUT_ARROW_MS)
        setInputArrowActive(false)
        await delay(GAP_BETWEEN_ARROWS_MS)

        setOutputArrowActive(true)
        await delay(OUTPUT_ARROW_MS)

        setPendingIndex(i)
        await delay(FADE_IN_MS)
        setOutputArrowActive(false)

        setSettledCount((c) => c + 1)
        setPendingIndex(null)
        await delay(AFTER_MOVE_GAP_MS)
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <SlideLayout title="LLM은 본질적으로 다음 토큰 예측기입니다">
      <div className="flex flex-col items-center gap-3">
        <div className="flex min-h-[3.5rem] w-full max-w-4xl flex-wrap items-center justify-center gap-x-3 gap-y-2">
          <motion.div
            layoutId="user-prompt-bubble"
            className="max-w-xl rounded-2xl rounded-tr-sm border border-sky-400/30 bg-sky-500/10 px-5 py-3 text-lg leading-relaxed"
          >
            {USER_TEXT}
          </motion.div>
          <div className="whitespace-pre text-lg leading-relaxed">
            <motion.span
              className="font-mono text-violet-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35, delay: 0.8 }}
            >
              {'ASSISTANT: '}
            </motion.span>
            {Array.from({ length: settledCount }, (_, i) => (
              <motion.span
                key={i}
                layoutId={`token-${i}`}
                className="inline-block text-neutral-100"
              >
                {TOKENS[i]}
              </motion.span>
            ))}
          </div>
        </div>

        <Arrow
          active={inputArrowActive}
          className="h-9 w-5 text-sky-400"
        />

        <motion.div
          layoutId="agent-icon"
          className="shrink-0 rounded-2xl border border-violet-400/50 bg-violet-500/10 p-2 text-violet-200"
        >
          <AgentIcon className="h-9 w-9" />
        </motion.div>

        <Arrow
          active={outputArrowActive}
          className="h-9 w-5 text-violet-400"
        />

        <div className="flex h-8 items-center justify-center">
          {pendingIndex !== null && (
            <motion.span
              key={pendingIndex}
              layoutId={`token-${pendingIndex}`}
              className="inline-block whitespace-pre text-lg text-neutral-100"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.16 }}
            >
              {TOKENS[pendingIndex]}
            </motion.span>
          )}
        </div>
      </div>
    </SlideLayout>
  )
}
