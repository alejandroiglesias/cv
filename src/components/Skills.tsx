import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import type { Resume } from '@/types/resume'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface SkillsProps {
  resume: Resume
}

export function Skills({ resume }: SkillsProps) {
  const reduced = useReducedMotion()

  return (
    <motion.section
      id="skills"
      aria-labelledby="skills-heading"
      initial={{ opacity: 0, y: reduced ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <h2
        id="skills-heading"
        className="mb-4 font-display text-2xl text-foreground"
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
