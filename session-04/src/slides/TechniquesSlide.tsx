import { motion } from 'motion/react'
import { SlideLayout } from './SlideLayout'

const STROKE = '#a78bfa'
const FILL = '#1f1b2e'
const TEXT = '#e5e7eb'

function Node({
  x,
  y,
  label,
  small,
}: {
  x: number
  y: number
  label: string
  small?: boolean
}) {
  const w = small ? 26 : 38
  const h = small ? 22 : 28
  const fontSize = small ? 10 : 12
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="6"
        fill={FILL}
        stroke={STROKE}
        strokeWidth="1.3"
      />
      <text
        x={x + w / 2}
        y={y + h / 2 + fontSize / 3}
        textAnchor="middle"
        fill={TEXT}
        fontSize={fontSize}
      >
        {label}
      </text>
    </g>
  )
}

function HArrow({ x1, x2, y }: { x1: number; x2: number; y: number }) {
  return (
    <g>
      <line x1={x1} y1={y} x2={x2 - 5} y2={y} stroke={STROKE} strokeWidth="1.3" />
      <polygon
        points={`${x2},${y} ${x2 - 6},${y - 3} ${x2 - 6},${y + 3}`}
        fill={STROKE}
      />
    </g>
  )
}

function StepDot({ cx }: { cx: number }) {
  return (
    <circle
      cx={cx}
      cy={30}
      r={8}
      fill={FILL}
      stroke={STROKE}
      strokeWidth="1.3"
      strokeDasharray="2 2"
    />
  )
}

const ZeroShot = (
  <svg viewBox="0 0 260 60" className="w-full max-w-[260px]">
    <Node x={90} y={16} label="Q" />
    <HArrow x1={132} x2={158} y={30} />
    <Node x={162} y={16} label="A" />
  </svg>
)

const OneShot = (
  <svg viewBox="0 0 260 60" className="w-full max-w-[260px]">
    <Node x={44} y={19} small label="ex" />
    <Node x={90} y={16} label="Q" />
    <HArrow x1={132} x2={158} y={30} />
    <Node x={162} y={16} label="A" />
  </svg>
)

const FewShot = (
  <svg viewBox="0 0 260 60" className="w-full max-w-[260px]">
    <Node x={10} y={19} small label="ex" />
    <Node x={42} y={19} small label="ex" />
    <Node x={74} y={19} small label="ex" />
    <Node x={116} y={16} label="Q" />
    <HArrow x1={158} x2={188} y={30} />
    <Node x={192} y={16} label="A" />
  </svg>
)

const CoT = (
  <svg viewBox="0 0 260 60" className="w-full max-w-[260px]">
    <Node x={14} y={16} label="Q" />
    <HArrow x1={56} x2={78} y={30} />
    <StepDot cx={92} />
    <HArrow x1={104} x2={120} y={30} />
    <StepDot cx={136} />
    <HArrow x1={148} x2={164} y={30} />
    <StepDot cx={180} />
    <HArrow x1={192} x2={212} y={30} />
    <Node x={216} y={16} label="A" />
  </svg>
)

const techniques = [
  { name: 'Zero Shot Prompting', diagram: ZeroShot },
  { name: 'One-Shot Prompting', diagram: OneShot },
  { name: 'Few-Shot Prompting', diagram: FewShot },
  { name: 'CoT (Chain-of-Thought)', diagram: CoT },
]

export function TechniquesSlide() {
  return (
    <SlideLayout title="좀 더 심화 버전의 프롬프팅 기법들도 있었죠">
      <div className="grid w-full max-w-4xl grid-cols-2 gap-6">
        {techniques.map((t, i) => (
          <motion.div
            key={t.name}
            className="flex flex-col items-center gap-5 rounded-2xl border border-white/10 bg-white/5 px-6 py-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 + i * 0.12, ease: 'easeOut' }}
          >
            <div className="flex h-20 w-full items-center justify-center">
              {t.diagram}
            </div>
            <h3 className="text-xl font-medium text-neutral-100">{t.name}</h3>
          </motion.div>
        ))}
      </div>
    </SlideLayout>
  )
}
