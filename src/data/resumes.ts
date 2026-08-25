import { appliedAiResume } from '@/data/applied-ai-resume'
import { appliedAiEsResume } from '@/data/applied-ai-es-resume'
import { frontendResume } from '@/data/frontend-resume'
import { generalResume } from '@/data/general-resume'
import { productResume } from '@/data/product-resume'
import { technicalProjectAiSystemsResume } from '@/data/technical-project-ai-systems-resume'
import type { Resume } from '@/types/resume'

export const resumes = {
  general: generalResume,
  frontend: frontendResume,
  product: productResume,
  ai: appliedAiResume,
  aiEs: appliedAiEsResume,
  tpm: technicalProjectAiSystemsResume,
} satisfies Record<string, Resume>

export function getResumeForPath(pathname: string): Resume {
  const normalizedPath = pathname.split(/[?#]/, 1)[0].replace(/\/+$/, '') || '/'

  switch (normalizedPath) {
    case '/cv/frontend':
      return resumes.frontend
    case '/cv/product':
      return resumes.product
    case '/cv/ai/es':
      return resumes.aiEs
    case '/cv/ai':
      return resumes.ai
    case '/cv/tpm':
    case '/cv/technical-project-ai-systems':
    case '/technical-project-ai-systems':
      return resumes.tpm
    case '/cv':
    case '/cv/general':
    default:
      return resumes.general
  }
}
