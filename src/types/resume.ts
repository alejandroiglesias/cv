export type ContactKind = 'email' | 'site' | 'linkedin' | 'github' | 'stackoverflow' | 'x'

export interface ContactLink {
  kind: ContactKind
  label: string
  href: string
  /** Raw email value for obfuscation — only set when kind === 'email' */
  obfuscated?: string
}

export interface Role {
  company: string
  title: string
  location?: string
  start: string
  end: string
  bullets: string[]
  /** true = shown by default; false = hidden behind "Show more" */
  featured: boolean
  /** true = force a page break before this role when printing */
  printBreakBefore?: boolean
}

export interface ResumeSeo {
  title: string
  description: string
  canonicalPath: string
}

export interface Resume {
  id: string
  name: string
  title: string
  location: string
  pdfPath: string
  seo: ResumeSeo
  summary: string[]
  earlierExperienceSummary: string
  interests: string[]
  skills: string[]
  contacts: ContactLink[]
  roles: Role[]
}
