import { motion } from 'framer-motion'
import type { Resume } from '@/types/resume'
import { useRevealViewport } from '@/hooks/useRevealViewport'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface AboutProps {
  resume: Resume
}

export function About({ resume }: AboutProps) {
  const reduced = useReducedMotion()
  const viewport = useRevealViewport()

  return (
    <motion.section
      id="about"
      aria-labelledby="about-heading"
      initial={{ opacity: 0, y: reduced ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <h2 id="about-heading" className="mb-4 font-display text-3xl text-foreground">
        About
      </h2>

      <div className="space-y-3 text-muted-foreground">
        {resume.summary.map((para) => (
          <p key={para}>{para}</p>
        ))}
      </div>

      <p className="mt-6 text-xs font-medium uppercase tracking-widest text-muted-foreground">
        Interests
      </p>

      <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
        {resume.interests.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted" aria-hidden />
            {item}
          </li>
        ))}
      </ul>

    </motion.section>
  )
}
