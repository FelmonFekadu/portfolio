'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function CustomCursor() {
  const [isFine, setIsFine] = useState(false)
  const mx = useMotionValue(-200)
  const my = useMotionValue(-200)

  const dotX = useSpring(mx, { damping: 40, stiffness: 1200 })
  const dotY = useSpring(my, { damping: 40, stiffness: 1200 })
  const ringX = useSpring(mx, { damping: 22, stiffness: 350 })
  const ringY = useSpring(my, { damping: 22, stiffness: 350 })

  useEffect(() => {
    setIsFine(window.matchMedia('(pointer: fine)').matches)
  }, [])

  useEffect(() => {
    if (!isFine) return
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX)
      my.set(e.clientY)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [isFine, mx, my])

  if (!isFine) return null

  return (
    <>
      <motion.span className="cursor-dot" style={{ x: dotX, y: dotY }} aria-hidden="true" />
      <motion.span className="cursor-ring" style={{ x: ringX, y: ringY }} aria-hidden="true" />
    </>
  )
}

export default CustomCursor
