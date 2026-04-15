import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { SlideLayout } from './SlideLayout'

type Candidate = { token: string; prob: string }

const INPUT_TOKENS = ['다음', '에', '올', '토큰', '의', '확률', '분포', '를']

const ROUND_1: Candidate[] = [
  { token: '추정', prob: '0.04' },
  { token: '유추', prob: '0.05' },
  { token: '파악', prob: '0.07' },
  { token: '분석', prob: '0.12' },
  { token: '계산', prob: '0.38' },
  { token: '예측', prob: '0.15' },
  { token: '산출', prob: '0.08' },
  { token: '도출', prob: '0.06' },
  { token: '추론', prob: '0.05' },
]
const PICK_1 = 4

const ROUND_2: Candidate[] = [
  { token: '하기도', prob: '0.02' },
  { token: '해서', prob: '0.04' },
  { token: '하며', prob: '0.06' },
  { token: '하는', prob: '0.11' },
  { token: '합니다', prob: '0.41' },
  { token: '하죠', prob: '0.14' },
  { token: '하게', prob: '0.09' },
  { token: '하고', prob: '0.07' },
  { token: '함이', prob: '0.03' },
]
const PICK_2 = 4

const ROW_H = 40
const ROW_GAP = 4
const ROW_STEP = ROW_H + ROW_GAP
const ROW_COUNT = ROUND_1.length + 2 // two ellipsis rows
const LIST_HEIGHT = ROW_COUNT * ROW_H + (ROW_COUNT - 1) * ROW_GAP

const CARET_SIZE = 20
const SCAN_STEP_MS = 130
const SETTLE_DWELL_MS = 260
const BOUNCE_MS = 520
const MOVE_MS = 720
const BETWEEN_ROUNDS_MS = 420

const REVEAL_INPUT_ARROW_MS = 450
const REVEAL_FAN_MS = 500
const REVEAL_TOKENS_MS = 800
const REVEAL_TO_SCAN_MS = 600
const RESET_FADE_MS = 420
const AFTER_SWAP_MS = 180

export function TokenGenerationSlide() {
  const [round, setRound] = useState<0 | 1 | 2>(0)
  const [pickerIndex, setPickerIndex] = useState<number | null>(null)
  const [settled, setSettled] = useState(false)
  const [committed, setCommitted] = useState(0)
  const [reveal, setReveal] = useState(0)

  useEffect(() => {
    let cancelled = false
    const delay = (ms: number) =>
      new Promise<void>((r) => window.setTimeout(r, ms))

    const runRound = async (list: Candidate[], target: number) => {
      for (let i = 0; i < list.length; i++) {
        if (cancelled) return false
        setPickerIndex(i)
        await delay(SCAN_STEP_MS)
      }
      await delay(160)
      if (cancelled) return false
      setPickerIndex(target)
      await delay(SETTLE_DWELL_MS)
      setSettled(true)
      await delay(BOUNCE_MS)
      if (cancelled) return false
      setSettled(false)
      setCommitted((c) => c + 1)
      await delay(MOVE_MS)
      setPickerIndex(null)
      return true
    }

    const revealFanAndTokens = async () => {
      setReveal(2)
      await delay(REVEAL_TOKENS_MS)
      if (cancelled) return
      setReveal(3)
      await delay(REVEAL_TO_SCAN_MS)
    }

    const run = async () => {
      await delay(REVEAL_INPUT_ARROW_MS)
      if (cancelled) return
      setReveal(1)
      await delay(REVEAL_FAN_MS)
      if (cancelled) return
      await revealFanAndTokens()
      const ok1 = await runRound(ROUND_1, PICK_1)
      if (!ok1 || cancelled) return

      await delay(BETWEEN_ROUNDS_MS)
      setReveal(1)
      await delay(RESET_FADE_MS)
      if (cancelled) return
      setRound(1)
      await delay(AFTER_SWAP_MS)
      if (cancelled) return
      await revealFanAndTokens()

      const ok2 = await runRound(ROUND_2, PICK_2)
      if (!ok2 || cancelled) return
      setRound(2)
    }

    run()
    return () => {
      cancelled = true
    }
  }, [])

  const activeRoundIdx = round >= 1 ? 1 : 0
  const activeList = activeRoundIdx === 1 ? ROUND_2 : ROUND_1
  const activePick = activeRoundIdx === 1 ? PICK_2 : PICK_1
  const chosenHidden =
    activeRoundIdx === 0 ? committed >= 1 : committed >= 2
  const chosenLayoutId = activeRoundIdx === 1 ? 'chosen-2' : 'chosen-1'

  return (
    <SlideLayout title={'토큰 하나하나는 이렇게 "생성"해요'}>
      <div className="flex w-full max-w-6xl items-center justify-center gap-5">
        <div className="flex flex-1 flex-wrap items-center justify-end gap-1.5 self-center">
          <span className="mr-1 text-xl text-neutral-600">…</span>
          {INPUT_TOKENS.map((t, i) => (
            <TokenBox key={`fixed-${i}`}>{t}</TokenBox>
          ))}
          {committed >= 1 && (
            <TokenBox layoutId="chosen-1" variant="chosen">
              {ROUND_1[PICK_1].token}
            </TokenBox>
          )}
          {committed >= 2 && (
            <TokenBox layoutId="chosen-2" variant="chosen">
              {ROUND_2[PICK_2].token}
            </TokenBox>
          )}
        </div>

        <motion.div
          className="shrink-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: reveal >= 1 ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ArrowRight className="h-6 w-12 text-sky-400" />
        </motion.div>

        <div
          className="flex shrink-0 items-center justify-center rounded-2xl border border-violet-400/60 bg-violet-500/10 text-2xl font-semibold text-violet-200"
          style={{ width: 112, height: 112 }}
        >
          LLM
        </div>

        <FanArrows
          height={LIST_HEIGHT}
          count={ROW_COUNT}
          visible={reveal >= 2}
        />

        <motion.div
          className="relative shrink-0"
          style={{ width: 220, height: LIST_HEIGHT }}
          initial={{ opacity: 0 }}
          animate={{ opacity: reveal >= 3 ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex flex-col" style={{ gap: ROW_GAP }}>
            <EllipsisRow />
            {activeList.map((c, i) => {
              const isPick = i === activePick
              const hide = isPick && chosenHidden
              const active = pickerIndex === i
              return (
                <div
                  key={`${activeRoundIdx}-${i}`}
                  className="flex items-center justify-between pl-7 pr-1"
                  style={{ height: ROW_H }}
                >
                  {hide ? (
                    <span />
                  ) : (
                    <TokenBox
                      layoutId={isPick ? chosenLayoutId : undefined}
                      variant={
                        active && settled
                          ? 'settled'
                          : active
                          ? 'active'
                          : 'idle'
                      }
                      bounce={isPick && settled}
                    >
                      {c.token}
                    </TokenBox>
                  )}
                  {!hide && (
                    <span className="font-mono text-xs text-neutral-500">
                      {c.prob}
                    </span>
                  )}
                </div>
              )
            })}
            <EllipsisRow />
          </div>

          <motion.div
            key={`picker-${activeRoundIdx}`}
            className="pointer-events-none absolute left-1 text-amber-300"
            initial={{ opacity: 0, y: ROW_H }}
            animate={{
              opacity: pickerIndex === null ? 0 : 1,
              y:
                pickerIndex === null
                  ? ROW_H
                  : ROW_STEP * (pickerIndex + 1) +
                    (ROW_H - CARET_SIZE) / 2,
            }}
            transition={{ type: 'spring', stiffness: 340, damping: 30 }}
            style={{ top: 0 }}
          >
            <svg
              viewBox="0 0 24 24"
              width={CARET_SIZE}
              height={CARET_SIZE}
            >
              <polygon points="4,4 20,12 4,20" fill="currentColor" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </SlideLayout>
  )
}

function TokenBox({
  children,
  layoutId,
  variant = 'idle',
  bounce = false,
}: {
  children: ReactNode
  layoutId?: string
  variant?: 'idle' | 'active' | 'settled' | 'chosen'
  bounce?: boolean
}) {
  const variantCls = {
    idle: 'border-neutral-700 bg-neutral-800/60 text-neutral-200',
    active: 'border-amber-400/70 bg-amber-500/10 text-amber-100',
    settled:
      'border-amber-300 bg-amber-400/25 text-amber-50 shadow-[0_0_22px_rgba(251,191,36,0.28)]',
    chosen: 'border-amber-400/60 bg-amber-500/15 text-amber-100',
  }[variant]
  return (
    <motion.span
      layoutId={layoutId}
      className={`inline-flex items-center whitespace-pre rounded-md border px-2.5 py-1 text-base leading-none ${variantCls}`}
      animate={bounce ? { scale: [1, 1.25, 1] } : { scale: 1 }}
      transition={
        bounce
          ? { duration: 0.5, times: [0, 0.4, 1] }
          : { duration: 0.2 }
      }
    >
      {children}
    </motion.span>
  )
}

function EllipsisRow() {
  return (
    <div
      className="flex items-center justify-center text-xl text-neutral-600"
      style={{ height: ROW_H }}
    >
      ⋮
    </div>
  )
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 20" className={className}>
      <line
        x1={2}
        y1={10}
        x2={40}
        y2={10}
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <polygon points="46,10 36,5 36,15" fill="currentColor" />
    </svg>
  )
}

function FanArrows({
  height,
  count,
  visible,
}: {
  height: number
  count: number
  visible: boolean
}) {
  const w = 84
  const startX = 4
  const startY = height / 2
  const tipX = w - 2
  const headLen = 10
  return (
    <svg
      viewBox={`0 0 ${w} ${height}`}
      width={w}
      height={height}
      className="shrink-0 text-violet-400/55"
    >
      {Array.from({ length: count }, (_, i) => {
        const y = ((i + 0.5) / count) * height
        const endX = tipX - headLen
        const c1x = startX + (endX - startX) * 0.45
        const c2x = startX + (endX - startX) * 0.75
        return (
          <motion.g
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: visible ? 1 : 0 }}
            transition={{
              duration: 0.25,
              delay: visible ? i * 0.045 : 0,
            }}
          >
            <path
              d={`M ${startX},${startY} C ${c1x},${startY} ${c2x},${y} ${endX},${y}`}
              fill="none"
              stroke="currentColor"
              strokeWidth={1.3}
              strokeLinecap="round"
            />
            <polygon
              points={`${tipX},${y} ${endX},${y - 3.5} ${endX},${y + 3.5}`}
              fill="currentColor"
            />
          </motion.g>
        )
      })}
    </svg>
  )
}
