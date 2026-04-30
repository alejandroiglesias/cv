import { motion } from 'framer-motion'
import { Role } from './Role'
import { OlderRoles } from './OlderRoles'
import { Linkedin } from './icons'
import { Button } from '@/components/ui/button'
import type { Resume } from '@/types/resume'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface ExperienceProps {
  resume: Resume
}

export function Experience({ resume }: ExperienceProps) {
  const reduced = useReducedMotion()
  const featured = resume.roles.filter((r) => r.featured)
  const historical = resume.roles.filter((r) => !r.featured)

  return (
    <motion.section
      id="experience"
      aria-labelledby="experience-heading"
      initial={{ opacity: 0, y: reduced ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="mb-6 flex items-baseline justify-between">
        <h2 id="experience-heading" className="font-display text-3xl text-foreground">
          Experience
        </h2>
        <Button
          asChild
          variant="link"
          size="sm"
          className="text-muted-foreground"
          data-print="hidden"
        >
          <a
            href="https://www.linkedin.com/in/alegarciaiglesias"
            target="_blank"
            rel="noopener noreferrer"
          >
            Full history →
          </a>
        </Button>
      </div>

      <div>
        {featured.map((role, i) => (
          <Role key={`${role.company}-${role.start}`} role={role} index={i} />
        ))}
      </div>

      {historical.length > 0 && (
        <>
          <div className="mt-8 border-y border-border" data-print="hidden">
            <OlderRoles roles={historical} />
          </div>
          <div
            className="mt-8 hidden border-y border-border py-5 text-center text-sm font-medium text-muted-foreground"
            data-print="only"
          >
            <span>See my full experience on LinkedIn: </span>
            <span className="inline-flex items-center gap-1.5 text-foreground">
              <Linkedin className="h-3.5 w-3.5" aria-hidden />
              in/alegarciaiglesias
            </span>
          </div>
        </>
      )}
    </motion.section>
  )
}
