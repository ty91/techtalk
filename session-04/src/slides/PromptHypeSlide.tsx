import { motion } from 'motion/react'
import { SlideLayout } from './SlideLayout'

const books = [
  { src: '/images/01/book1.jpg', x: '4%', y: '6%', rot: -12 },
  { src: '/images/01/book2.jpg', x: '62%', y: '2%', rot: 9 },
  { src: '/images/01/book3.jpg', x: '34%', y: '20%', rot: -5 },
  { src: '/images/01/book4.jpg', x: '10%', y: '52%', rot: 14 },
  { src: '/images/01/book5.jpg', x: '50%', y: '50%', rot: -18 },
  { src: '/images/01/book6.jpg', x: '76%', y: '38%', rot: 7 },
]

export function PromptHypeSlide() {
  return (
    <SlideLayout title="한동안 유행의 도가니였던 프롬프트 엔지니어링">
      <div className="relative h-[520px] w-full max-w-6xl">
        {books.map((b, i) => (
          <motion.img
            key={b.src}
            src={b.src}
            alt=""
            className="absolute w-40 rounded-sm shadow-2xl shadow-black/60"
            style={{ left: b.x, top: b.y }}
            initial={{ opacity: 0, scale: 0.3, rotate: 0, y: -120 }}
            animate={{ opacity: 1, scale: 1, rotate: b.rot, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 + i * 0.08, ease: 'easeOut' }}
          />
        ))}
      </div>
    </SlideLayout>
  )
}
