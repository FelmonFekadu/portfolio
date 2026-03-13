'use client'

import { useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export function HeroAurora() {
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)

  const sx = useSpring(mx, { damping: 50, stiffness: 70 })
  const sy = useSpring(my, { damping: 50, stiffness: 70 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth)
      my.set(e.clientY / window.innerHeight)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [mx, my])

  const goldX = useTransform(sx, [0, 1], ['-15%', '15%'])
  const goldY = useTransform(sy, [0, 1], ['-12%', '12%'])
  const steelX = useTransform(sx, [0, 1], ['12%', '-12%'])
  const steelY = useTransform(sy, [0, 1], ['10%', '-10%'])

  return (
    <div className="h-aurora-wrap" aria-hidden="true">
      <motion.div className="h-aurora h-aurora--gold" style={{ x: goldX, y: goldY }} />
      <motion.div className="h-aurora h-aurora--steel" style={{ x: steelX, y: steelY }} />
      <motion.div
        className="h-aurora h-aurora--pulse"
        animate={{ scale: [1, 1.22, 1], opacity: [0.35, 0.62, 0.35] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}
