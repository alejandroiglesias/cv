import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemeToggle } from './ThemeToggle'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function StickyHeader({ name }: { name: string }) {
  const [visible, setVisible] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    const target = document.getElementById('hero-name')
    if (!target) return

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { rootMargin: '-40px 0px 0px 0px' }
    )
    observer.observe(target)
    return () => observer.disconnect()
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reduced ? 0 : -8 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/90 backdrop-blur-sm"
          data-print="hidden"
        >
          <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-3">
            <span className="font-display text-base font-bold text-foreground">{name}</span>
            <ThemeToggle />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
