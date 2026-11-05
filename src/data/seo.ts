// Título, descripción y vista previa al compartir (Open Graph) de cada ruta.
// Lo usan la app (cambia el título al navegar) y el build (genera un HTML por ruta
// para que WhatsApp y los buscadores lean los datos sin ejecutar JavaScript).

// Dominio definitivo, publicado en Cloudflare Pages.
export const siteUrl = 'https://grupoagropolo.com'
export const siteName = 'Grupo Agro Polo'

export type PageMeta = {
  title: string
  description: string
  /** Imagen 1200 × 630 para la vista previa al compartir */
  image: string
  imageAlt: string
  noindex?: boolean
}

const homeMeta: PageMeta = {
  title: 'Grupo Agro Polo | Soluciones para el agro',
  description:
    'Grupo Agro Polo: soluciones, servicios y conocimiento especializado para productores y empresas del agro.',
  image: '/images/og/home.jpg',
  imageAlt: 'Grupo Agro Polo: soluciones para el agro, relaciones que generan oportunidades',
}

export const pageMeta: Record<string, PageMeta> = {
  '/': homeMeta,
  '/labs': {
    title: '+LABS | Nutrición y aplicación | Grupo Agro Polo',
    description:
      'Coadyuvantes y fertilizantes líquidos, acompañados por un asesoramiento técnico de las condiciones y necesidades de cada producción.',
    image: '/images/og/labs.jpg',
    imageAlt: '+LABS de Grupo Agro Polo: nutrición y aplicación con asesoramiento técnico',
  },
  '/protect': {
    title: '+PROTECT | Seguros para el agro | Grupo Agro Polo',
    description:
      'Seguros para cultivos, maquinaria, drones, ganado, depósitos, personal y equinos, con asesoramiento y seguimiento durante todo el proceso.',
    image: '/images/og/protect.jpg',
    imageAlt: '+PROTECT de Grupo Agro Polo: protección para cada actividad',
  },
  '/clean': {
    title: '+CLEAN | Higiene para la industria | Grupo Agro Polo',
    description:
      'Productos profesionales de limpieza y desinfección para frigoríficos y establecimientos agroindustriales.',
    image: '/images/og/clean.jpg',
    imageAlt: '+CLEAN de Grupo Agro Polo: higiene que responde a cada proceso',
  },
  '/events': {
    title: '+EVENTS | Encuentros del agro y el polo | Grupo Agro Polo',
    description: 'Diseñamos, producimos y ejecutamos experiencias para el mundo del agro y del polo.',
    image: '/images/og/events.jpg',
    imageAlt: '+EVENTS de Grupo Agro Polo: encuentros que fortalecen relaciones',
  },
  '/farms': {
    title: '+FARMS | Compra y venta de campos | Grupo Agro Polo',
    description:
      'Asesoramiento integral en compra y venta de campos con la mirada de quienes conocen el agro desde adentro.',
    image: '/images/og/farms.jpg',
    imageAlt: '+FARMS de Grupo Agro Polo: operaciones de campo bien acompañadas',
  },
  '/agro-polo-tour': {
    title: 'Agro Polo Tour | Grupo Agro Polo',
    description:
      'El polo fue el punto de partida y la comunidad es lo que nos impulsa. Conocé la historia del Agro Polo Tour.',
    image: '/images/og/tour.jpg',
    imageAlt: 'Agro Polo Tour: todo empezó en movimiento',
  },
  '/contacto': {
    ...homeMeta,
    title: 'Contacto | Grupo Agro Polo',
    description:
      '¿Buscás una solución? Conversemos. Escribinos por WhatsApp o dejanos tu consulta y te respondemos de forma directa.',
  },
}

export const notFoundMeta: PageMeta = {
  ...homeMeta,
  title: 'Página no encontrada | Grupo Agro Polo',
  description: 'La dirección ingresada no corresponde a una sección disponible.',
  noindex: true,
}

export function normalizePath(pathname: string) {
  const path = pathname.replace(/\/+$/, '')
  return path === '' ? '/' : path
}

export function getPageMeta(pathname: string) {
  return pageMeta[normalizePath(pathname)] ?? notFoundMeta
}

export function absoluteUrl(path: string, origin = siteUrl) {
  return `${origin}${path}`
}

function escapeHtml(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

/**
 * Etiquetas del <head> para una ruta, tal como las lee WhatsApp sin ejecutar JavaScript.
 * `origin` permite que las vistas previas muestren sus propias imágenes.
 */
export function renderSeoTags(path: string, origin = siteUrl) {
  const meta = getPageMeta(path)
  const url = absoluteUrl(normalizePath(path), origin)
  const tags: [string, Record<string, string>][] = [
    ['meta', { name: 'description', content: meta.description }],
    ['link', { rel: 'canonical', href: absoluteUrl(normalizePath(path)) }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: siteName }],
    ['meta', { property: 'og:locale', content: 'es_AR' }],
    ['meta', { property: 'og:title', content: meta.title }],
    ['meta', { property: 'og:description', content: meta.description }],
    ['meta', { property: 'og:url', content: url }],
    ['meta', { property: 'og:image', content: absoluteUrl(meta.image, origin) }],
    ['meta', { property: 'og:image:type', content: 'image/jpeg' }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],
    ['meta', { property: 'og:image:alt', content: meta.imageAlt }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
  ]

  return [
    `<title>${escapeHtml(meta.title)}</title>`,
    ...tags.map(
      ([tag, attributes]) =>
        `<${tag} ${Object.entries(attributes)
          .map(([key, value]) => `${key}="${escapeHtml(value)}"`)
          .join(' ')} />`,
    ),
  ].join('\n    ')
}

/** Rutas que Google puede indexar: todas las de pageMeta salvo las marcadas noindex. */
export function indexablePaths() {
  return Object.entries(pageMeta)
    .filter(([, meta]) => !meta.noindex)
    .map(([path]) => path)
}

/**
 * sitemap.xml con las direcciones definitivas (siempre el dominio sin www, que es el canónico).
 * Sin <lastmod>: Google lo ignora si no es exacto, y la fecha de build no dice cuándo cambió cada página.
 */
export function renderSitemap() {
  const urls = indexablePaths()
    .map((path) => `  <url>\n    <loc>${absoluteUrl(path)}</loc>\n  </url>`)
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}

/**
 * robots.txt: permite todo y avisa dónde está el sitemap.
 * En Cloudflare, "Bot Preference Sync" (robots.txt administrado) antepone sus propias reglas
 * para bots de IA a este archivo; no lo reemplaza, así que estas líneas siguen valiendo.
 * Las previews *.pages.dev no se bloquean acá sino con X-Robots-Tag: noindex (public/_headers):
 * si robots.txt las bloqueara, Google no podría leer ese noindex.
 */
export function renderRobots() {
  return `User-agent: *\nAllow: /\n\nSitemap: ${absoluteUrl('/sitemap.xml')}\n`
}
