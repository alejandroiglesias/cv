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
  const [primaryTitle, ...rest] = resume.title.split('|')
  const tagline = rest.join('|').trim()

  const fadeUp = {
    hidden: { opacity: 0, y: reduced ? 0 : 16 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <header className="pb-16 pt-8 sm:pt-16" data-print="layout" id="hero">
      <div data-print="main">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex flex-col items-start gap-5 sm:flex-row sm:items-center"
        >
          <img
            src="/cv/profile-picture.jpg"
            alt="Alejandro García Iglesias"
            width={144}
            height={144}
            className="h-36 w-36 shrink-0 rounded-full object-cover ring-2 ring-border"
          />

          <div className="min-w-0 max-w-full">
            <h1
              id="hero-name"
              className="max-w-full break-words font-display text-[2rem] tracking-tight text-foreground sm:text-5xl"
            >
              {resume.name}
            </h1>

            <p className="mt-2 sm:mt-4 font-mono text-sm uppercase tracking-widest text-accent">
              {primaryTitle.trim()}
            </p>
            {tagline && <p className="text-sm text-muted-foreground">{tagline}</p>}

            <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              <span>{resume.location}</span>
            </div>
          </div>
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
            <a href="/cv/alejandro-garcia-iglesias-cv.pdf" download className="gap-2">
              <Download className="h-3.5 w-3.5" />
              Download PDF
            </a>
          </Button>
        </motion.div>
      </div>
    </header>
  )
}
