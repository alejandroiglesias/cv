import { appliedAiResume } from '@/data/applied-ai-resume'
import { frontendResume } from '@/data/frontend-resume'
import { productResume } from '@/data/product-resume'
import { technicalProjectAiSystemsResume } from '@/data/technical-project-ai-systems-resume'
import type { Resume } from '@/types/resume'

export const resumes = {
  frontend: frontendResume,
  product: productResume,
  ai: appliedAiResume,
  tpm: technicalProjectAiSystemsResume,
} satisfies Record<string, Resume>

export function getResumeForPath(pathname: string): Resume {
  const normalizedPath = pathname.split(/[?#]/, 1)[0].replace(/\/+$/, '') || '/'

  switch (normalizedPath) {
    case '/cv':
    case '/cv/frontend':
      return resumes.frontend
    case '/cv/product':
      return resumes.product
    case '/cv/ai':
      return resumes.ai
    case '/cv/tpm':
    case '/cv/technical-project-ai-systems':
    case '/technical-project-ai-systems':
      return resumes.tpm
    default:
      return resumes.frontend
  }
}
