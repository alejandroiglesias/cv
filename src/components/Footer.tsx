import { ContactList } from './ContactList'
import type { Resume } from '@/types/resume'

interface FooterProps {
  resume: Resume
}

export function Footer({ resume }: FooterProps) {
  const footerContacts = resume.contacts.filter(
    (c) => c.kind === 'email' || c.kind === 'linkedin',
  )

  return (
    <footer className="py-12" data-print="hidden">
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">Interested in working together?</strong>
          <br />
          I'm available for full-time or contract opportunities. Get in touch:
        </p>
        <ContactList contacts={footerContacts} />
      </div>
    </footer>
  )
}
