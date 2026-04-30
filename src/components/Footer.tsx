import { ContactList } from './ContactList'
import type { Resume } from '@/types/resume'

interface FooterProps {
  resume: Resume
}

export function Footer({ resume }: FooterProps) {
  return (
    <footer className="border-t border-border py-12" data-print="hidden">
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">Interested in working together?</strong>
          <br />
          I'm available for full-time or contract opportunities. Get in touch:
        </p>
        <ContactList contacts={resume.contacts} />
      </div>
    </footer>
  )
}
