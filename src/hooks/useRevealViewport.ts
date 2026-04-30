import { useMediaQuery } from '@/hooks/useMediaQuery'

export function useRevealViewport() {
  const isMobile = useMediaQuery('(max-width: 639px)')

  return {
    once: true,
    margin: isMobile ? '0px 0px 120px 0px' : '-80px',
  }
}
