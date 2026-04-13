import { motion } from 'motion/react'

export function DiagramSlide() {
  return (
    <div className="flex w-full max-w-4xl flex-col items-center gap-10">
      <h2 className="text-4xl font-semibold">Diagrams &amp; animation</h2>
      <svg viewBox="0 0 600 180" className="w-full">
        <motion.line
          x1="90"
          y1="90"
          x2="300"
          y2="90"
          stroke="#a78bfa"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        />
        <motion.line
          x1="300"
          y1="90"
          x2="510"
          y2="90"
          stroke="#a78bfa"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        />
        {[
          { cx: 90, label: 'Source' },
          { cx: 300, label: 'Transform' },
          { cx: 510, label: 'Render' },
        ].map((n, i) => (
          <motion.g
            key={n.label}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: i * 0.3 }}
          >
            <circle cx={n.cx} cy="90" r="36" fill="#1f1b2e" stroke="#a78bfa" strokeWidth="2" />
            <text x={n.cx} y="96" textAnchor="middle" fill="#e5e7eb" fontSize="14">
              {n.label}
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  )
}
