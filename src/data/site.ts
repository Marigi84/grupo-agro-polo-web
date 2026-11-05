export type NavigationItem = {
  label: string
  path: string
}

export type UnitPage = NavigationItem & {
  headline: string
  description: string
  kicker: string
  image?: string
  tone: 'green' | 'brown' | 'sand' | 'pink'
}

export const unitPages: UnitPage[] = [
  {
    label: '+LABS',
    path: 'labs',
    kicker: 'Cercanía + tecnología',
    headline: 'Nutrición y aplicación con asesoramiento técnico.',
    description:
      'Coadyuvantes y fertilizantes líquidos, acompañados por un asesoramiento técnico de las condiciones y necesidades de cada producción.',
    image: '/images/labs-hero.webp',
    tone: 'green',
  },
  {
    label: '+PROTECT',
    path: 'protect',
    kicker: 'Cercanía + respaldo',
    headline: 'Coberturas pensadas para cada actividad.',
    description:
      'Seguros para cultivos, maquinaria, drones, ganado, depósitos, personal y equinos, con asesoramiento y seguimiento durante todo el proceso.',
    image: '/images/protect-hero.webp',
    tone: 'brown',
  },
  {
    label: '+CLEAN',
    path: 'clean',
    kicker: 'Cercanía + calidad',
    headline: 'Soluciones de limpieza para cada instalación.',
    description:
      'Productos de limpieza y desinfección para frigoríficos y establecimientos agroindustriales, definidos según cada planta.',
    image: '/images/clean-hero.webp',
    tone: 'green',
  },
  {
    label: '+EVENTS',
    path: 'events',
    kicker: 'Cercanía + comunidad',
    headline: 'Encuentros que fortalecen relaciones.',
    description:
      'Diseño, producción y realización de eventos que reúnen personas, empresas y oportunidades dentro de la comunidad.',
    image: '/images/events-hero.webp',
    tone: 'sand',
  },
  {
    label: '+FARMS',
    path: 'farms',
    kicker: 'Cercanía + alcance',
    headline: 'Operaciones de campo bien acompañadas.',
    description:
      'Acompañamiento en la compra y venta de campos, vinculando oportunidades en diferentes puntos del país.',
    image: '/images/farms-hero.webp',
    tone: 'brown',
  },
]

export type Alliance = {
  name: string
  unit: string
  unitPath: string
  logo: string
  logoWidth: number
  logoHeight: number
  description: string
}

// Aliados que se pueden nombrar (confirmado por Marina el 29/10/2026). Logos y datos sacados
// de las presentaciones de cada empresa en el Drive de marketing.
export const alliances: Alliance[] = [
  {
    name: 'AKO Agro Laboratorio',
    unit: '+LABS',
    unitPath: '/labs',
    logo: '/images/ako-logo.svg',
    logoWidth: 173,
    logoHeight: 100,
    description:
      'Laboratorio de Villa Allende, Córdoba, en la química desde 1970 y en el agro desde 1997, especializado en coadyuvantes y fertilizantes.',
  },
  {
    name: 'LM Seguros',
    unit: '+PROTECT',
    unitPath: '/protect',
    logo: '/images/lm-seguros-logo.png',
    logoWidth: 148,
    logoHeight: 54,
    description:
      'Organización de seguros con más de 45 años de experiencia, casa central en Córdoba y más de 35 compañías para elegir la cobertura de cada actividad.',
  },
]

export type UnitCatalog = {
  unit: string
  // Ruta del PDF dentro de public/catalogos. Mientras sea null, el botón no se muestra.
  file: string | null
  fileName: string
  // Peso aproximado para avisar antes de descargar (ej. '4 MB').
  size: string | null
}

// Catálogos descargables: Marketing solo tiene los de +PROTECT y +LABS (Marina, 29/10/2026).
// Son los brochures 2026 de Marketing, achicados para la web (sin datos de edición de Illustrator).
export const unitCatalogs: Record<'protect' | 'labs', UnitCatalog> = {
  protect: {
    unit: '+PROTECT',
    file: '/catalogos/agro-polo-protect.pdf',
    fileName: 'Catalogo-Agro-Polo-PROTECT.pdf',
    size: '2,6 MB',
  },
  labs: {
    unit: '+LABS',
    file: '/catalogos/agro-polo-labs.pdf',
    fileName: 'Catalogo-Agro-Polo-LABS.pdf',
    size: '2,3 MB',
  },
}

export const companyNavigation: NavigationItem[] = [
  { label: 'Qué es Grupo Agro Polo', path: '/#nosotros' },
  { label: 'Nuestra forma de trabajar', path: '/#diferencial' },
  { label: 'Alianzas', path: '/#alianzas' },
]

// Número único de Grupo Agro Polo para teléfono y WhatsApp (Marketing, 04/11/2026).
// Sin nombres de personas: se publica solo el número de la empresa.
export const contactPhone = {
  display: '+54 9 351 572-1881',
  tel: '+5493515721881',
}

// Correo de la empresa: también recibe las consultas del formulario (Marketing, 04/11/2026).
export const contactEmail = 'info@grupoagropolo.com'

// WhatsApp comercial del botón flotante y de Contacto: el número de la empresa.
// Formato internacional sin signos. Si se vacía, el botón flotante deja de mostrarse.
export const contactWhatsapp = {
  number: '5493515721881',
  message: 'Hola, quiero hacer una consulta sobre Grupo Agro Polo',
}

export function contactWhatsappHref() {
  return `https://wa.me/${contactWhatsapp.number}?text=${encodeURIComponent(contactWhatsapp.message)}`
}

// Inscripción al Agro Polo Tour por WhatsApp, al mismo número de la empresa.
// Formato internacional sin signos. Si se vacía, el botón lleva a Contacto en lugar de mostrarse roto.
export const tourSignup = {
  whatsapp: '5493515721881',
  message: 'Hola, quiero anotarme a la edición 2027 del Agro Polo Tour',
}

export function tourSignupHref() {
  return `https://wa.me/${tourSignup.whatsapp}?text=${encodeURIComponent(tourSignup.message)}`
}
