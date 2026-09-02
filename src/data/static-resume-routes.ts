export const staticResumeRoutes = [
  { input: 'main', source: 'index.html', output: 'index.html', pathname: '/cv/' },
  {
    input: 'general',
    source: 'general/index.html',
    output: 'general/index.html',
    pathname: '/cv/general/',
  },
  {
    input: 'frontend',
    source: 'frontend/index.html',
    output: 'frontend/index.html',
    pathname: '/cv/frontend/',
  },
  {
    input: 'product',
    source: 'product/index.html',
    output: 'product/index.html',
    pathname: '/cv/product/',
  },
  { input: 'ai', source: 'ai/index.html', output: 'ai/index.html', pathname: '/cv/ai/' },
  {
    input: 'aiEs',
    source: 'ai/es/index.html',
    output: 'ai/es/index.html',
    pathname: '/cv/ai/es/',
  },
  { input: 'fde', source: 'fde/index.html', output: 'fde/index.html', pathname: '/cv/fde/' },
  { input: 'tpm', source: 'tpm/index.html', output: 'tpm/index.html', pathname: '/cv/tpm/' },
  {
    input: 'technicalProjectAiSystems',
    source: 'technical-project-ai-systems/index.html',
    output: 'technical-project-ai-systems/index.html',
    pathname: '/cv/technical-project-ai-systems/',
  },
] as const
