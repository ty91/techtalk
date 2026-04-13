import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { SlideLayout } from './SlideLayout'

type Role = 'user' | 'assistant'

const MESSAGES: { role: Role; text: string }[] = [
  {
    role: 'user',
    text: '카페에 사과 23개가 있었다. 점심에 20개를 사용하고 6개를 더 샀다면 사과는 몇 개야?',
  },
  { role: 'assistant', text: '14개입니다!' },
  { role: 'user', text: '뭔 소리야' },
  { role: 'assistant', text: '죄송합니다. 다시 계산해보니 6개네요.' },
  { role: 'user', text: '...' },
]

const START_MS = 400
const STEP_MS = 1100

export function CoaxingFailSlide() {
  const [visibleCount, setVisibleCount] = useState(0)

  useEffect(() => {
    const timers: number[] = []
    for (let i = 0; i < MESSAGES.length; i++) {
      timers.push(
        window.setTimeout(
          () => setVisibleCount(i + 1),
          START_MS + i * STEP_MS
        )
      )
    }
    return () => timers.forEach((t) => window.clearTimeout(t))
  }, [])

  return (
    <SlideLayout
      title="LLM을 살살 달래기 위해 필요했던 프롬프트 엔지니어링"
      subtitle="LLM이 충분히 똑똑하지 않은 시절 필요했던 기법이에요"
    >
      <div className="flex w-full max-w-3xl flex-col gap-5">
        {MESSAGES.map((msg, i) => {
          const isUser = msg.role === 'user'
          return (
            <motion.div
              key={i}
              className={
                isUser
                  ? 'max-w-[85%] self-start rounded-2xl rounded-tl-sm border border-sky-400/30 bg-sky-500/10 px-6 py-4'
                  : 'max-w-[85%] self-end rounded-2xl rounded-tr-sm border border-violet-400/30 bg-violet-500/10 px-6 py-4'
              }
              initial={{ opacity: 0, x: isUser ? -16 : 16 }}
              animate={
                visibleCount > i
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: isUser ? -16 : 16 }
              }
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <div
                className={
                  isUser
                    ? 'mb-2 font-mono text-xs font-medium tracking-wide text-sky-300'
                    : 'mb-2 font-mono text-xs font-medium tracking-wide text-violet-300'
                }
              >
                {isUser ? 'USER' : 'ASSISTANT'}
              </div>
              <div className="text-base leading-relaxed text-neutral-100">
                {msg.text}
              </div>
            </motion.div>
          )
        })}
      </div>
    </SlideLayout>
  )
}
