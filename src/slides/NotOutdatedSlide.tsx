import { motion } from 'motion/react'
import { SlideLayout } from './SlideLayout'

export function NotOutdatedSlide() {
  return (
    <SlideLayout
      title="그렇지 않습니다!"
      subtitle="오늘 다룰 컨텍스트 엔지니어링은 프롬프트 엔지니어링을 포함하는 개념이에요"
    >
      <svg viewBox="0 0 600 460" className="w-full max-w-3xl">
        <motion.circle
          cx="300"
          cy="250"
          r="200"
          fill="rgba(167, 139, 250, 0.10)"
          stroke="#a78bfa"
          strokeWidth="2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
        <motion.text
          x="300"
          y="98"
          textAnchor="middle"
          fill="#c4b5fd"
          fontSize="22"
          fontWeight="600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.25 }}
        >
          컨텍스트 엔지니어링
        </motion.text>

        <motion.circle
          cx="370"
          cy="300"
          r="95"
          fill="rgba(251, 146, 60, 0.18)"
          stroke="#fb923c"
          strokeWidth="2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.55, ease: 'easeOut' }}
        />
        <motion.text
          x="370"
          y="306"
          textAnchor="middle"
          fill="#fed7aa"
          fontSize="16"
          fontWeight="600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.8 }}
        >
          프롬프트 엔지니어링
        </motion.text>
      </svg>
    </SlideLayout>
  )
}
