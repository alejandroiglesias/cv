export type ContactKind =
  | 'email'
  | 'site'
  | 'linkedin'
  | 'github'
  | 'stackoverflow'
  | 'x'

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
  location: string
  start: string
  end: string
  bullets: string[]
  /** true = shown by default; false = hidden behind "Show more" */
  featured: boolean
}

export interface Resume {
  name: string
  title: string
  location: string
  summary: string[]
  interests: string[]
  skills: string[]
  contacts: ContactLink[]
  roles: Role[]
}
