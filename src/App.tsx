import { useEffect } from 'react'
import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { Skills } from '@/components/Skills'
import { Experience } from '@/components/Experience'
import { Footer } from '@/components/Footer'
import { ThemeToggle } from '@/components/ThemeToggle'
import { resume } from '@/data/resume'
import { initAnalytics } from '@/lib/analytics'

export function App() {
  useEffect(() => {
    initAnalytics()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <div
        className="sticky top-0 z-50 flex justify-end px-6 py-3 backdrop-blur-sm"
        data-print="hidden"
      >
        <ThemeToggle />
      </div>

      <main className="mx-auto max-w-3xl px-6 pb-8">
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
