import { motion } from 'framer-motion'
import { MapPin, Download } from './icons'
import { ContactList } from './ContactList'
import { Button } from '@/components/ui/button'
import type { Resume } from '@/types/resume'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface HeroProps {
  resume: Resume
}

export function Hero({ resume }: HeroProps) {
  const reduced = useReducedMotion()

  const fadeUp = {
    hidden: { opacity: 0, y: reduced ? 0 : 16 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <header className="relative overflow-hidden pb-16 pt-20" data-print="layout">
      {/* Warm accent glow — decorative */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-80 bg-gradient-to-b from-accent/8 to-transparent"
        aria-hidden="true"
        data-print="hidden"
      />

      <div data-print="main">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span>{resume.location}</span>
          </div>

          <h1 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {resume.name}
          </h1>

          <p className="mt-2 font-mono text-sm uppercase tracking-widest text-accent">
            {resume.title}
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
          className="mt-6"
        >
          <ContactList contacts={resume.contacts} />
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.25, ease: 'easeOut' }}
          className="mt-6"
          data-print="hidden"
        >
          <Button asChild size="sm" variant="outline">
            <a
              href="/cv/alejandro-garcia-iglesias-cv.pdf"
              download
              className="gap-2"
            >
              <Download className="h-3.5 w-3.5" />
              Download PDF
            </a>
          </Button>
        </motion.div>
      </div>
    </header>
  )
}
