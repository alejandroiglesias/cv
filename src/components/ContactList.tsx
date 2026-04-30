import { Github, Linkedin, Globe, StackOverflow, Twitter } from './icons'
import { ObfuscatedEmail } from './ObfuscatedEmail'
import type { ContactLink } from '@/types/resume'
import { cn } from '@/lib/utils'

const iconMap = {
  email: null,
  site: Globe,
  linkedin: Linkedin,
  github: Github,
  stackoverflow: StackOverflow,
  x: Twitter,
}

interface ContactListProps {
  contacts: ContactLink[]
  className?: string
}

export function ContactList({ contacts, className }: ContactListProps) {
  return (
    <ul className={cn('flex flex-wrap gap-x-4 gap-y-2', className)} role="list">
      {contacts.map((c) => {
        const Icon = iconMap[c.kind]
        return (
          <li key={c.kind} className="flex items-center gap-1.5 text-sm text-muted-foreground">
            {Icon && <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden />}
            {c.kind === 'email' && c.obfuscated ? (
              <ObfuscatedEmail
                obfuscated={c.obfuscated}
                className="hover:text-accent transition-colors"
              />
            ) : (
              <a
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
              >
                {c.label}
              </a>
            )}
          </li>
        )
      })}
    </ul>
  )
}
