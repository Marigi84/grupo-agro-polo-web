import { readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import { notFoundMeta, pageMeta, renderRobots, renderSeoTags, renderSitemap, siteUrl } from './src/data/seo.ts'

const seoPlaceholder = '<!-- seo -->'
// En las vistas previas (de Cloudflare Pages o de Vercel), la vista previa al compartir
// usa las imágenes de esa misma preview y no las del dominio definitivo.
function previewOrigin() {
  const { CF_PAGES_BRANCH, CF_PAGES_URL, VERCEL_ENV, VERCEL_BRANCH_URL } = process.env
  if (CF_PAGES_BRANCH && CF_PAGES_BRANCH !== 'main' && CF_PAGES_URL) return CF_PAGES_URL
  if (VERCEL_ENV === 'preview' && VERCEL_BRANCH_URL) return `https://${VERCEL_BRANCH_URL}`
  return undefined
}
const seoOrigin = previewOrigin() ?? siteUrl

// Escribe un HTML por ruta (labs.html, protect.html…) con su título, descripción y vista previa
// al compartir, porque WhatsApp y los buscadores leen el HTML sin ejecutar JavaScript.
// Cloudflare Pages sirve labs.html en /labs tal cual, sin agregar la barra final.
// También escribe sitemap.xml y robots.txt (para Google) y 404.html: Cloudflare lo devuelve con estado 404 para cualquier dirección
// que no exista, y la app muestra ahí su página de "no encontrada".
function seoPages(): Plugin {
  return {
    name: 'seo-pages',
    transformIndexHtml(html) {
      return html.replace(seoPlaceholder, renderSeoTags('/', seoOrigin))
    },
    async writeBundle({ dir = 'dist' }) {
      const html = await readFile(join(dir, 'index.html'), 'utf8')
      const homeTags = renderSeoTags('/', seoOrigin)
      if (!html.includes(homeTags)) throw new Error('seo-pages: no se encontraron las etiquetas del inicio')

      for (const path of Object.keys(pageMeta).filter((path) => path !== '/')) {
        await writeFile(join(dir, `${path.slice(1)}.html`), html.replace(homeTags, renderSeoTags(path, seoOrigin)))
      }

      const notFoundTags = [`<title>${notFoundMeta.title}</title>`, '<meta name="robots" content="noindex" />'].join('\n    ')
      await writeFile(join(dir, '404.html'), html.replace(homeTags, notFoundTags))

      // Para Google: sitemap con todas las rutas indexables y robots.txt que lo anuncia.
      await writeFile(join(dir, 'sitemap.xml'), renderSitemap())
      await writeFile(join(dir, 'robots.txt'), renderRobots())
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), seoPages()],
})
