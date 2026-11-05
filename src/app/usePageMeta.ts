import { useEffect } from 'react'
import { absoluteUrl, getPageMeta, normalizePath } from '../data/seo'

function setHeadTag(selector: string, tag: 'meta' | 'link', attributes: Record<string, string>) {
  let element = document.head.querySelector<HTMLElement>(selector)
  if (!element) {
    element = document.createElement(tag)
    document.head.appendChild(element)
  }
  for (const [key, value] of Object.entries(attributes)) element.setAttribute(key, value)
}

/** Actualiza el título y la descripción de la pestaña al navegar entre páginas */
export function usePageMeta(pathname: string) {
  useEffect(() => {
    const meta = getPageMeta(pathname)
    const url = absoluteUrl(normalizePath(pathname))

    document.title = meta.title
    setHeadTag('meta[name="description"]', 'meta', { name: 'description', content: meta.description })
    setHeadTag('link[rel="canonical"]', 'link', { rel: 'canonical', href: url })
    setHeadTag('meta[property="og:title"]', 'meta', { property: 'og:title', content: meta.title })
    setHeadTag('meta[property="og:description"]', 'meta', { property: 'og:description', content: meta.description })
    setHeadTag('meta[property="og:url"]', 'meta', { property: 'og:url', content: url })
    setHeadTag('meta[property="og:image"]', 'meta', { property: 'og:image', content: absoluteUrl(meta.image) })
    setHeadTag('meta[property="og:image:alt"]', 'meta', { property: 'og:image:alt', content: meta.imageAlt })

    const robots = document.head.querySelector('meta[name="robots"]')
    if (meta.noindex) setHeadTag('meta[name="robots"]', 'meta', { name: 'robots', content: 'noindex' })
    else robots?.remove()
  }, [pathname])
}
