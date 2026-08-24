import { useEffect } from 'react'
import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { Skills } from '@/components/Skills'
import { Experience } from '@/components/Experience'
import { Footer } from '@/components/Footer'
import { StickyHeader } from '@/components/StickyHeader'
import { ThemeToggle } from '@/components/ThemeToggle'
import { frontendResume } from '@/data/frontend-resume'
import { initAnalytics } from '@/lib/analytics'
import type { Resume } from '@/types/resume'

interface AppProps {
  resume?: Resume
}

export function App({ resume: selectedResume = frontendResume }: AppProps) {
  useEffect(() => {
    initAnalytics()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <StickyHeader name={selectedResume.name} />

      <main className="mx-auto max-w-3xl px-6 pb-8">
        <div className="flex justify-end py-3" data-print="hidden">
          <ThemeToggle />
        </div>

        <Hero resume={selectedResume} />
        <div className="space-y-16">
          <About resume={selectedResume} />
          <Skills resume={selectedResume} />
          <Experience resume={selectedResume} />
        </div>
      </main>

      <div className="mx-auto max-w-3xl px-6" data-print="hidden">
        <Footer resume={selectedResume} />
      </div>
    </div>
  )
}

export default App
