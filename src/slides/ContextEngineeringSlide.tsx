import { useEffect, useState } from 'react'
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

const HUB_W = 760
const HUB_H = 460
const LLM_CX = 380
const LLM_CY = 230
const LLM_R = 68

const ITEM_W = 136
const ITEM_H = 40

function pos(cx: number, cy: number) {
  return { x: cx - ITEM_W / 2, y: cy - ITEM_H / 2 }
}

type Item = {
  label: string
  ordered: { x: number; y: number }
  messy: { x: number; y: number; rot: number }
}

const ITEMS: Item[] = [
  {
    label: '지침',
    ordered: pos(380, 60),
    messy: { ...pos(140, 360), rot: -14 },
  },
  {
    label: '유저 프롬프트',
    ordered: pos(566, 125),
    messy: { ...pos(520, 50), rot: 9 },
  },
  {
    label: '대화 히스토리',
    ordered: pos(610, 263),
    messy: { ...pos(70, 170), rot: -6 },
  },
  {
    label: '장기 메모리',
    ordered: pos(481, 370),
    messy: { ...pos(620, 360), rot: 18 },
  },
  {
    label: '검색된 정보',
    ordered: pos(279, 370),
    messy: { ...pos(400, 400), rot: -9 },
  },
  {
    label: '도구',
    ordered: pos(150, 263),
    messy: { ...pos(250, 70), rot: 22 },
  },
  {
    label: '출력 형식',
    ordered: pos(194, 125),
    messy: { ...pos(560, 290), rot: -16 },
  },
]

const ORGANIZE_DELAY_MS = 1600

export function ContextEngineeringSlide() {
  const [organized, setOrganized] = useState(false)

  useEffect(() => {
    const t = window.setTimeout(() => setOrganized(true), ORGANIZE_DELAY_MS)
    return () => window.clearTimeout(t)
  }, [])

  return (
    <SlideLayout
      title="컨텍스트 엔지니어링"
      subtitle="LLM을 둘러싼 시스템을 어떻게 구성하고, LLM에게는 어떤 정보를 주어야 할까요?"
    >
      <div className="relative" style={{ width: HUB_W, height: HUB_H }}>
        <motion.div
          className="absolute z-20 flex flex-col items-center justify-center rounded-full border-2 border-violet-400/70 bg-violet-500/15 text-violet-100 shadow-[0_0_36px_rgba(167,139,250,0.25)]"
          style={{
            left: LLM_CX - LLM_R,
            top: LLM_CY - LLM_R,
            width: LLM_R * 2,
            height: LLM_R * 2,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <BrainIcon className="h-11 w-11" />
          <div className="mt-1 text-sm font-semibold tracking-wide">LLM</div>
        </motion.div>

        {ITEMS.map((item, i) => (
          <motion.div
            key={item.label}
            className="absolute z-10 flex items-center justify-center whitespace-nowrap rounded-xl border border-emerald-400/30 bg-emerald-400/10 text-sm text-emerald-50"
            style={{
              left: 0,
              top: 0,
              width: ITEM_W,
              height: ITEM_H,
            }}
            initial={{
              x: item.messy.x,
              y: item.messy.y,
              rotate: item.messy.rot,
              opacity: 0,
              scale: 0.85,
            }}
            animate={
              organized
                ? {
                    x: item.ordered.x,
                    y: item.ordered.y,
                    rotate: 0,
                    opacity: 1,
                    scale: 1,
                  }
                : {
                    x: item.messy.x,
                    y: item.messy.y,
                    rotate: item.messy.rot,
                    opacity: 1,
                    scale: 1,
                  }
            }
            transition={
              organized
                ? {
                    duration: 0.75,
                    delay: i * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }
                : {
                    duration: 0.4,
                    delay: 0.3 + i * 0.08,
                    ease: 'easeOut',
                  }
            }
          >
            {item.label}
          </motion.div>
        ))}
      </div>
    </SlideLayout>
  )
}
