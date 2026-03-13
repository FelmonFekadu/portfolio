'use client'

import { type CSSProperties, type ReactNode, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const motionTags = {
  div: motion.div,
  article: motion.article,
  section: motion.section,
  li: motion.li,
  header: motion.header,
  footer: motion.footer,
} as const

type Tag = keyof typeof motionTags

interface AnimateInProps {
  children: ReactNode
  delay?: number
  className?: string
  direction?: 'up' | 'left' | 'right' | 'fade'
  as?: Tag
  style?: CSSProperties
}

export function AnimateIn({
  children,
  delay = 0,
  className,
  direction = 'up',
  as = 'div',
  style,
}: AnimateInProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-6% 0px' })

  const initial = {
    opacity: 0,
    y: direction === 'up' ? 36 : 0,
    x: direction === 'left' ? -36 : direction === 'right' ? 36 : 0,
  }

  const Tag = motionTags[as]

  return (
    <Tag
      ref={ref}
      className={className}
      style={style}
      initial={initial}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : initial}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  )
}
