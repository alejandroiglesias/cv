import { appliedAiResume } from '@/data/applied-ai-resume'
import { productResume } from '@/data/product-resume'
import { resume } from '@/data/resume'
import { technicalProjectAiSystemsResume } from '@/data/technical-project-ai-systems-resume'
import type { Resume } from '@/types/resume'

export const resumes = {
  frontend: resume,
  product: productResume,
  ai: appliedAiResume,
  'applied-ai': appliedAiResume,
  tpm: technicalProjectAiSystemsResume,
  // Compatibility keys retained for callers that used the previous IDs.
  'frontend-product': resume,
  'technical-project-ai-systems': technicalProjectAiSystemsResume,
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
