import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { SlideLayout } from './SlideLayout'

const USER_LINES = [
  '카페에 사과 23개가 있었다. 점심에 20개를 사용하고 6개를 더 샀다면 사과는 몇 개야?',
  "Let's think step by step.",
]

const ASSISTANT_LINES = [
  '처음에 23개가 있었고, 20개를 사용했으니 23 - 20 = 3개가 남습니다.',
  '그 다음 6개를 더 샀으니 3 + 6 = 9개입니다.',
  '정답: 9개입니다.',
]

const USER_REVEAL_MS = 400
const ASSISTANT_BUBBLE_MS = 1100
const ASSISTANT_START_MS = 1600
const ASSISTANT_STEP_MS = 900

export function CoaxingLLMSlide() {
  const [assistantCount, setAssistantCount] = useState(0)

  useEffect(() => {
    const timers: number[] = []
    for (let i = 0; i < ASSISTANT_LINES.length; i++) {
      timers.push(
        window.setTimeout(
          () => setAssistantCount(i + 1),
          ASSISTANT_START_MS + i * ASSISTANT_STEP_MS
        )
      )
    }
    return () => timers.forEach((t) => window.clearTimeout(t))
  }, [])

  return (
    <SlideLayout title="차근차근 생각해보게 한다든지요">
      <div className="flex w-full max-w-3xl flex-col gap-5">
        <motion.div
          className="max-w-[85%] self-start rounded-2xl rounded-tl-sm border border-sky-400/30 bg-sky-500/10 px-6 py-4"
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, delay: USER_REVEAL_MS / 1000 }}
        >
          <div className="mb-2 font-mono text-xs font-medium tracking-wide text-sky-300">
            USER
          </div>
          <div className="space-y-1.5 text-base leading-relaxed text-neutral-100">
            {USER_LINES.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="max-w-[85%] self-end rounded-2xl rounded-tr-sm border border-violet-400/30 bg-violet-500/10 px-6 py-4"
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, delay: ASSISTANT_BUBBLE_MS / 1000 }}
        >
          <div className="mb-2 font-mono text-xs font-medium tracking-wide text-violet-300">
            ASSISTANT
          </div>
          <div className="min-h-[5.5rem] space-y-1.5 text-base leading-relaxed text-neutral-100">
            {ASSISTANT_LINES.map((line, i) => (
              <motion.p
                key={line}
                initial={{ opacity: 0, y: 6 }}
                animate={
                  assistantCount > i ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }
                }
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                {line}
              </motion.p>
            ))}
          </div>
        </motion.div>
      </div>
    </SlideLayout>
  )
}
