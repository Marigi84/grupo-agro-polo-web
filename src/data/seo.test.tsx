import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import cloudflare from '../../public/_headers?raw'
import { AppRoutes } from '../app/AppRouter'
import { pageMeta, renderRobots, renderSeoTags, renderSitemap } from './seo'

describe('título y vista previa al compartir', () => {
  it.each(Object.entries(pageMeta))('la ruta %s tiene su propio título y descripción', (path, meta) => {
    render(
      <MemoryRouter initialEntries={[path]}>
        <AppRoutes />
      </MemoryRouter>,
    )

    expect(document.title).toBe(meta.title)
    expect(document.querySelector('meta[name="description"]')).toHaveAttribute('content', meta.description)
    expect(document.querySelector('meta[property="og:image"]')?.getAttribute('content')).toMatch(/^https:\/\/.+\.jpg$/)
  })

  it('no repite títulos entre rutas', () => {
    const titles = Object.values(pageMeta).map((meta) => meta.title)
    expect(new Set(titles).size).toBe(titles.length)
  })

  it('marca la página no encontrada para que no se indexe', () => {
    render(
      <MemoryRouter initialEntries={['/ruta-inexistente']}>
        <AppRoutes />
      </MemoryRouter>,
    )

    expect(document.title).toMatch(/página no encontrada/i)
    expect(document.querySelector('meta[name="robots"]')).toHaveAttribute('content', 'noindex')
  })

  it('genera etiquetas Open Graph con URL absoluta y texto escapado', () => {
    const tags = renderSeoTags('/labs')
    expect(tags).toContain('<meta property="og:url" content="https://grupoagropolo.com/labs" />')
    expect(tags).toContain('<meta property="og:image" content="https://grupoagropolo.com/images/og/labs.jpg" />')
    expect(tags).not.toMatch(/content="[^"]*[<>]/)
  })

  it('cada ruta tiene su imagen para compartir', () => {
    const images = Object.keys(import.meta.glob('../../public/images/og/*.jpg')).map((file) => file.replace('../../public', ''))
    for (const meta of Object.values(pageMeta)) {
      expect(images).toContain(meta.image)
    }
  })

  it('Cloudflare Pages envía los encabezados de seguridad', () => {
    const headers = {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()',
    }
    for (const [key, value] of Object.entries(headers)) {
      expect(cloudflare).toContain(`  ${key}: ${value}`)
    }
    expect(cloudflare).toMatch(/Content-Security-Policy: default-src 'self';.*frame-ancestors 'none'/)
    expect(cloudflare).not.toContain('vercel.live')
  })

  it('el sitemap lista todas las rutas reales con el dominio definitivo sin www', () => {
    const sitemap = renderSitemap()
    const locs = [...sitemap.matchAll(/<loc>(.+?)<\/loc>/g)].map(([, loc]) => loc)
    expect(locs).toEqual(Object.keys(pageMeta).map((path) => `https://grupoagropolo.com${path}`))
    expect(sitemap).not.toContain('www.grupoagropolo')
    expect(sitemap).not.toContain('pages.dev')
  })

  it('robots.txt permite todo y anuncia el sitemap', () => {
    const robots = renderRobots()
    expect(robots).toContain('User-agent: *\nAllow: /')
    expect(robots).not.toMatch(/Disallow/)
    expect(robots).toContain('Sitemap: https://grupoagropolo.com/sitemap.xml')
  })
})
