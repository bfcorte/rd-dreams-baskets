import { useEffect, useState } from 'react'

/**
 * Animates a number from 0 to `target` over `duration` ms.
 * Starts only when `start` is true — pair with useInView for scroll-triggered counters.
 */
export function useCountUp(target: number, duration = 1500, start = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) return

    const startTime = performance.now()
    let rafId: number

    const step = () => {
      const progress = Math.min((performance.now() - startTime) / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) {
        rafId = requestAnimationFrame(step)
      }
    }

    rafId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafId)
  }, [target, duration, start])

  return count
}
