import { useEffect } from 'react'
import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { Skills } from '@/components/Skills'
import { Experience } from '@/components/Experience'
import { Footer } from '@/components/Footer'
import { StickyHeader } from '@/components/StickyHeader'
import { ThemeToggle } from '@/components/ThemeToggle'
import { resume } from '@/data/resume'
import { initAnalytics } from '@/lib/analytics'

export function App() {
  useEffect(() => {
    initAnalytics()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Scroll-triggered sticky header — hidden until hero name scrolls past */}
      <StickyHeader name={resume.name} />

      <main className="mx-auto max-w-3xl px-6 pb-8">
        {/* Inline theme toggle — not sticky, lives at the top of the page */}
        <div className="flex justify-end py-3" data-print="hidden">
          <ThemeToggle />
        </div>

        <Hero resume={resume} />
        <div className="space-y-16">
          <About resume={resume} />
          <Skills resume={resume} />
          <Experience resume={resume} />
        </div>
      </main>

      <div className="mx-auto max-w-3xl px-6">
        <Footer resume={resume} />
      </div>
    </div>
  )
}

export default App
