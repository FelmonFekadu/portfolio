'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

export function CountUp({ value }: { value: string }) {
  // Parse "3+" → { num: 3, suffix: "+" }  or  "2" → { num: 2, suffix: "" }
  const match = value.match(/^(\d+)(.*)$/)
  const num = match ? parseInt(match[1]) : NaN
  const suffix = match ? match[2] : ''

  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref as React.RefObject<Element>, { once: true })
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (!inView) return
    if (isNaN(num)) {
      setDisplay(value)
      return
    }
    const duration = 1400
    let start: number | null = null
    const tick = (ts: number) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(eased * num).toString() + suffix)
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, num, suffix, value])

  return <span ref={ref}>{display}</span>
}

export default CountUp
