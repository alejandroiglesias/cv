import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Role } from './Role'
import { ChevronDown } from './icons'
import type { Role as RoleType } from '@/types/resume'
import { cn } from '@/lib/utils'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface OlderRolesProps {
  roles: RoleType[]
}

export function OlderRoles({ roles }: OlderRolesProps) {
  const [open, setOpen] = useState(false)
  const reduced = useReducedMotion()

  if (roles.length === 0) return null

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger
        className={cn(
          'flex w-full cursor-pointer items-center justify-center gap-2 rounded-md py-5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          open && 'border-b border-border',
        )}
        aria-expanded={open}
      >
        <ChevronDown
          className={cn('h-4 w-4 transition-transform duration-200', open && 'rotate-180')}
        />
        {open ? 'Show less' : `Show ${roles.length} earlier roles`}
      </CollapsibleTrigger>

      <CollapsibleContent className="overflow-hidden">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: reduced ? 0 : 0.3, ease: 'easeInOut' }}
              className="py-8"
            >
              {roles.map((role, i) => (
                <Role
                  key={`${role.company}-${role.start}`}
                  role={role}
                  index={i}
                  isLast={i === roles.length - 1}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </CollapsibleContent>
    </Collapsible>
  )
}
