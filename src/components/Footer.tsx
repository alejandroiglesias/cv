import { ContactList } from './ContactList'
import type { Resume } from '@/types/resume'
import { getResumeCopy } from '@/data/resume-copy'

interface FooterProps {
  resume: Resume
}

export function Footer({ resume }: FooterProps) {
  const copy = getResumeCopy(resume)
  const footerContacts = resume.contacts.filter(
    (c) => c.kind === 'email' || c.kind === 'linkedin',
  )

  return (
    <footer className="py-12" data-print="hidden">
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">{copy.footerLead}</strong>
          <br />
          {copy.footerBody}
        </p>
        <ContactList contacts={footerContacts} />
      </div>
    </footer>
  )
}
