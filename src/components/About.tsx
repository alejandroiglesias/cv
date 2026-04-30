import { motion } from 'framer-motion'
import type { Resume } from '@/types/resume'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface AboutProps {
  resume: Resume
}

export function About({ resume }: AboutProps) {
  const reduced = useReducedMotion()

  return (
    <motion.section
      id="about"
      aria-labelledby="about-heading"
      initial={{ opacity: 0, y: reduced ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <h2 id="about-heading" className="mb-4 font-display text-3xl text-foreground">
        About
      </h2>

      <div className="space-y-3 text-muted-foreground">
        {resume.summary.map((para, i) => (
          <p key={i}>{para}</p>
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

      {/* <p className="mt-4 text-sm text-muted-foreground">
        Currently exploring opportunities as a Tech Lead or Senior Engineer with strong ownership
        over frontend architecture and system direction.
      </p> */}
    </motion.section>
  )
}
