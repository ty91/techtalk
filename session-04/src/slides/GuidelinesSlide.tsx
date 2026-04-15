import { motion } from 'motion/react'
import { SlideLayout } from './SlideLayout'

const guidelines = [
  '역할을 부여해보세요',
  '미사여구를 최소화하고 쉽고 간결하게 표현해야 해요',
  '열린 질문보다 닫힌 지시문이 좋아요',
  '지시문과 맥락을 구체적으로 명시해야 해요',
  '내용을 강조해야 할 땐 XML을 쓰세요',
]

export function GuidelinesSlide() {
  return (
    <SlideLayout title="프롬프트 엔지니어링의 각종 가이드라인들">
      <div className="flex w-full max-w-5xl flex-col gap-10">
        {guidelines.map((text, i) => {
          const left = i % 2 === 0
          return (
            <motion.div
              key={text}
              className={`relative max-w-2xl rounded-3xl border border-white/10 bg-white/5 px-14 py-5 ${
                left ? 'self-start' : 'self-end'
              }`}
              initial={{ opacity: 0, x: left ? -60 : 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.12, ease: 'easeOut' }}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -top-2 left-2 font-serif text-7xl leading-none text-violet-400/70 select-none"
              >
                ❝
              </span>
              <span
                aria-hidden
                className="pointer-events-none absolute -bottom-6 right-3 font-serif text-7xl leading-none text-violet-400/70 select-none"
              >
                ❞
              </span>
              <p className="relative z-10 text-2xl text-neutral-50">{text}</p>
            </motion.div>
          )
        })}
      </div>
    </SlideLayout>
  )
}
