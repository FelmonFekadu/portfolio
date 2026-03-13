'use client'

import { type ReactNode, useRef } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
} from 'framer-motion'

interface TiltCardProps {
  children: ReactNode
  delay?: number
}

export function TiltCard({ children, delay = 0 }: TiltCardProps) {
  const outerRef = useRef<HTMLDivElement>(null)
  const inView = useInView(outerRef, { once: true, margin: '-5%' })

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  const springCfg = { damping: 26, stiffness: 280 }
  const rotX = useSpring(useTransform(rawY, [-0.5, 0.5], [7, -7]), springCfg)
  const rotY = useSpring(useTransform(rawX, [-0.5, 0.5], [-7, 7]), springCfg)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = outerRef.current?.getBoundingClientRect()
    if (!rect) return
    rawX.set((e.clientX - rect.left) / rect.width - 0.5)
    rawY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    rawX.set(0)
    rawY.set(0)
  }

  return (
    <div
      ref={outerRef}
      style={{ perspective: '1200px' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' }}
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
        transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: 1.014 }}
        className="tilt-inner"
      >
        {children}
      </motion.div>
    </div>
  )
}

export default TiltCard
