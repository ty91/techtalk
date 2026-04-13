import { motion } from 'motion/react'
import { SlideLayout } from './SlideLayout'

function Lines({ widths }: { widths: string[] }) {
  return (
    <div className="space-y-2">
      {widths.map((w, i) => (
        <div
          key={i}
          className="h-1.5 rounded-full bg-white/25"
          style={{ width: w }}
        />
      ))}
    </div>
  )
}

export function PromptIsContextSlide() {
  return (
    <SlideLayout
      title="프롬프트도 결국 컨텍스트"
      subtitle="컨텍스트에 대해 잘 이해해야 좋은 프롬프팅을 할 수 있어요"
    >
      <motion.div
        className="relative w-full max-w-4xl rounded-3xl border border-emerald-400/40 bg-emerald-400/5 p-8 pt-10"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, delay: 0.2 }}
      >
        <div className="absolute -top-3 left-6 rounded-full bg-neutral-950 px-3 font-mono text-sm font-medium tracking-wide text-emerald-300">
          CONTEXT
        </div>

        <div className="flex flex-col gap-4">
          <motion.div
            className="w-[58%] self-start rounded-xl border border-white/15 bg-white/5 p-4"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <div className="mb-3 font-mono text-sm font-medium tracking-wide text-violet-300">
              SYSTEM:
            </div>
            <Lines widths={['100%', '92%', '78%']} />
          </motion.div>

          <motion.div
            className="w-[52%] self-end rounded-xl border border-white/10 bg-white/5 p-4"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            <Lines widths={['100%', '86%', '68%']} />
          </motion.div>

          <motion.div
            className="w-[48%] self-end rounded-xl border border-white/10 bg-white/5 p-4"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.8 }}
          >
            <Lines widths={['100%', '74%']} />
          </motion.div>

          <motion.div
            className="w-[55%] self-start rounded-xl border border-sky-400/30 bg-sky-500/10 p-4"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 1.0 }}
          >
            <div className="mb-3 font-mono text-sm font-medium tracking-wide text-sky-300">
              USER:
            </div>
            <Lines widths={['88%', '72%']} />
          </motion.div>
        </div>
      </motion.div>
    </SlideLayout>
  )
}
