import { useEffect, useState } from 'react'
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

function Typewriter({
  text,
  startMs,
  speed,
}: {
  text: string
  startMs: number
  speed: number
}) {
  const [shown, setShown] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    let tickId: number | undefined
    let i = 0
    const startId = window.setTimeout(() => {
      const tick = () => {
        i += 1
        setShown(text.slice(0, i))
        if (i < text.length) {
          tickId = window.setTimeout(tick, speed)
        } else {
          setDone(true)
        }
      }
      tick()
    }, startMs)

    return () => {
      window.clearTimeout(startId)
      if (tickId !== undefined) window.clearTimeout(tickId)
    }
  }, [text, startMs, speed])

  return (
    <span>
      {shown}
      {!done && (
        <span className="ml-0.5 inline-block h-[1em] w-[2px] animate-pulse bg-current align-[-2px]" />
      )}
    </span>
  )
}

const USER_TEXT = 'LLM의 원리에 대해 설명해줘'
const AGENT_TEXT =
  'LLM은 지금까지 주어진 토큰 시퀀스를 바탕으로, 다음에 올 토큰의 확률 분포를 계산합니다. 그 분포에서 토큰을 하나 뽑고, 뽑힌 토큰을 다시 입력에 이어 붙여 또 다음 토큰을 예측하는 과정을 반복하죠. 즉, 주어진 컨텍스트 위에 가장 그럴듯한 다음 토큰을 계속 이어 붙이는 기계라고 할 수 있습니다...'

const USER_BUBBLE_DELAY_S = 0.2
const USER_TYPE_START_MS = 700
const USER_TYPE_SPEED_MS = 45

const userTypingEndMs =
  USER_TYPE_START_MS + USER_TEXT.length * USER_TYPE_SPEED_MS
const AGENT_BUBBLE_DELAY_S = (userTypingEndMs + 1000) / 1000
const AGENT_TYPE_START_MS = AGENT_BUBBLE_DELAY_S * 1000 + 350
const AGENT_TYPE_SPEED_MS = 22

export function LLMPrincipleSlide() {
  return (
    <SlideLayout title="LLM의 원리를 되짚어봅시다">
      <div className="flex w-full max-w-4xl flex-col gap-6">
        <motion.div
          className="flex items-start justify-end gap-3"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: USER_BUBBLE_DELAY_S }}
        >
          <motion.div
            layoutId="user-prompt-bubble"
            className="max-w-2xl rounded-2xl rounded-tr-sm border border-sky-400/30 bg-sky-500/10 px-5 py-4 text-lg leading-relaxed"
          >
            <Typewriter
              text={USER_TEXT}
              startMs={USER_TYPE_START_MS}
              speed={USER_TYPE_SPEED_MS}
            />
          </motion.div>
          <div className="shrink-0 rounded-full bg-white/10 p-2 text-neutral-300">
            <UserIcon className="h-8 w-8" />
          </div>
        </motion.div>

        <motion.div
          className="flex items-start gap-3"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: AGENT_BUBBLE_DELAY_S }}
        >
          <motion.div
            layoutId="agent-icon"
            className="shrink-0 rounded-2xl border border-violet-400/50 bg-violet-500/10 p-2 text-violet-200"
          >
            <AgentIcon className="h-8 w-8" />
          </motion.div>
          <div className="max-w-2xl rounded-2xl rounded-tl-sm border border-violet-400/40 bg-violet-500/10 px-5 py-4 text-lg leading-relaxed text-neutral-100">
            <Typewriter
              text={AGENT_TEXT}
              startMs={AGENT_TYPE_START_MS}
              speed={AGENT_TYPE_SPEED_MS}
            />
          </div>
        </motion.div>
      </div>
    </SlideLayout>
  )
}
