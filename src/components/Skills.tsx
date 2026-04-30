import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import type { Resume } from '@/types/resume'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface SkillsProps {
  resume: Resume
}

export function Skills({ resume }: SkillsProps) {
  const reduced = useReducedMotion()
  const isMobile = useMediaQuery('(max-width: 639px)')
  const viewportMargin = isMobile ? '0px 0px 120px 0px' : '-80px'

  return (
    <motion.section
      id="skills"
      aria-labelledby="skills-heading"
      initial={{ opacity: 0, y: reduced ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: viewportMargin }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <h2
        id="skills-heading"
        className="mb-4 font-display text-3xl text-foreground"
      >
        Skills
      </h2>

      <div className="flex flex-wrap gap-2">
        {resume.skills.map((skill) => (
          <Badge key={skill} variant="secondary">
            {skill}
          </Badge>
        ))}
      </div>
    </motion.section>
  )
}
