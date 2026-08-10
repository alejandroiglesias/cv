import { resume } from '@/data/resume'
import { technicalProjectAiSystemsResume } from '@/data/technical-project-ai-systems-resume'
import type { Resume } from '@/types/resume'

export const resumes = {
  'frontend-product': resume,
  'technical-project-ai-systems': technicalProjectAiSystemsResume,
} satisfies Record<string, Resume>

export function getResumeForPath(pathname: string): Resume {
  const normalizedPath = pathname.replace(/\/+$/, '')

  if (normalizedPath.endsWith('/technical-project-ai-systems')) {
    return resumes['technical-project-ai-systems']
  }

  return resumes['frontend-product']
}
