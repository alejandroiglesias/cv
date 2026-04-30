import { motion } from 'framer-motion'
import type { Role as RoleType } from '@/types/resume'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils'

interface RoleProps {
  role: RoleType
  index?: number
}

export function Role({ role, index = 0 }: RoleProps) {
  const reduced = useReducedMotion()

  return (
    <motion.article
      aria-labelledby={`role-${role.company.toLowerCase().replace(/\s+/g, '-')}`}
      initial={{ opacity: 0, y: reduced ? 0 : 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: 'easeOut' }}
      className={cn(index > 0 && 'mt-6 border-t border-border/40 pt-6')}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <h3
          id={`role-${role.company.toLowerCase().replace(/\s+/g, '-')}`}
          className="font-semibold text-foreground"
        >
          {role.company}
        </h3>
        <span className="text-xs text-muted-foreground tabular-nums">
          {role.start} – {role.end}
        </span>
      </div>

      <p className="mb-2 text-sm text-accent">
        {role.title}
        {role.location && (
          <span className="text-muted-foreground"> · {role.location}</span>
        )}
      </p>

      <ul className="space-y-1.5">
        {role.bullets.map((bullet, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted" aria-hidden />
            {bullet}
          </li>
        ))}
      </ul>
    </motion.article>
  )
}
