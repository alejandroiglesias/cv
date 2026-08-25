import { Button } from '@/components/ui/button'
import { Linkedin } from './icons'
import { OlderRoles } from './OlderRoles'
import type { Resume } from '@/types/resume'
import { formatEarlierRolesLabel, getResumeCopy } from '@/data/resume-copy'
import { Role } from './Role'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useRevealViewport } from '@/hooks/useRevealViewport'

interface ExperienceProps {
  resume: Resume
}

export function Experience({ resume }: ExperienceProps) {
  const reduced = useReducedMotion()
  const viewport = useRevealViewport()
  const copy = getResumeCopy(resume)
  const featured = resume.roles.filter((r) => r.featured)
  const historical = resume.roles.filter((r) => !r.featured)

  return (
    <motion.section
      id="experience"
      aria-labelledby="experience-heading"
      initial={{ opacity: 0, y: reduced ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="mb-6 flex items-baseline justify-between">
        <h2 id="experience-heading" className="font-display text-3xl text-foreground">
          {copy.experience}
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
            {copy.fullHistoryOnLinkedIn}
          </a>
        </Button>
      </div>

      <div>
        {featured.map((role, i) => (
          <Role
            key={`${role.company}-${role.start}`}
            role={role}
            index={i}
            isLast={historical.length === 0 && i === featured.length - 1}
          />
        ))}
      </div>

      <div
        className="print-experience-summary-linkedin mt-3 mb-0 px-4 text-center text-sm text-muted-foreground sm:px-16 md:px-28 print:border-b print:border-border print:px-16"
        data-print-group="experience-summary-linkedin"
      >
        <p>{resume.earlierExperienceSummary}</p>
        <div className="hidden py-2 text-center" data-print="only">
          <span className="inline-flex items-center gap-1.5 leading-none">
            <Linkedin className="h-3.5 w-3.5 text-foreground" aria-hidden />
            <span>{copy.seeFullExperienceOnLinkedIn}</span>
            <span className="text-foreground">in/alegarciaiglesias</span>
          </span>
        </div>
      </div>

      {historical.length > 0 && (
        <div className="border-b border-border" data-print="hidden">
          <OlderRoles
            roles={historical}
            showLess={copy.showLess}
            showEarlierRoles={formatEarlierRolesLabel(copy, historical.length)}
          />
        </div>
      )}
    </motion.section>
  )
}
