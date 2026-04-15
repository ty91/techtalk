import { useCallback, useEffect, useRef, useState } from 'react'
import { slides } from './slides'

type SyncMessage =
  | { type: 'sync'; index: number; direction: number }
  | { type: 'request' }

const CHANNEL = 'slides'

export function useSlideIndex() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const channelRef = useRef<BroadcastChannel | null>(null)
  const indexRef = useRef(index)
  indexRef.current = index

  useEffect(() => {
    const ch = new BroadcastChannel(CHANNEL)
    channelRef.current = ch
    ch.onmessage = (e: MessageEvent<SyncMessage>) => {
      const msg = e.data
      if (msg.type === 'sync') {
        setIndex(msg.index)
        setDirection(msg.direction)
      } else if (msg.type === 'request') {
        ch.postMessage({ type: 'sync', index: indexRef.current, direction: 1 } satisfies SyncMessage)
      }
    }
    ch.postMessage({ type: 'request' } satisfies SyncMessage)
    return () => {
      ch.close()
      channelRef.current = null
    }
  }, [])

  const go = useCallback((delta: number) => {
    setIndex((i) => {
      const next = Math.min(slides.length - 1, Math.max(0, i + delta))
      if (next !== i) {
        setDirection(delta)
        channelRef.current?.postMessage({
          type: 'sync',
          index: next,
          direction: delta,
        } satisfies SyncMessage)
      }
      return next
    })
  }, [])

  return { index, direction, go }
}
