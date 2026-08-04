import type { ReactNode } from 'react'

const ANCHOR_RE = /<a\s+href="([^"]+)">([^<]*)<\/a>/g

/** Renders a string that may contain simple `<a href="...">label</a>` tags as React nodes. */
export function InlineHtml({ html }: { html: string }): ReactNode {
  const nodes: ReactNode[] = []
  let lastIndex = 0
  let key = 0

  for (const match of html.matchAll(ANCHOR_RE)) {
    const index = match.index ?? 0
    if (index > lastIndex) {
      nodes.push(html.slice(lastIndex, index))
    }

    nodes.push(
      <a
        key={key++}
        href={match[1]}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-foreground underline underline-offset-2 transition-colors hover:text-accent"
      >
        {match[2]}
      </a>,
    )

    lastIndex = index + match[0].length
  }

  if (lastIndex === 0) return html
  if (lastIndex < html.length) nodes.push(html.slice(lastIndex))

  return nodes
}
