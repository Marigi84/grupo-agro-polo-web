import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CatalogDownload } from '../components/CatalogDownload'
import { SolutionExplorer, type ExplorerItem } from '../components/SolutionExplorer'
import { unitCatalogs } from '../data/site'

// Mismo formato de lista que el explorador de +LABS (pedido de marketing)
const coverages: ExplorerItem[] = [
  {
    id: 'cultivos',
    label: '01',
    title: 'Cultivos',
    description: 'Granizo, viento, heladas y resiembra.',
    image: '/images/protect-cultivos.webp',
    alt: 'Espigas de trigo al atardecer',
    lightOverlay: true,
  },
  {
    id: 'maquinaria',
    label: '02',
    title: 'Maquinaria',
    description: 'Tractores, cosechadoras, pulverizadoras y otros equipos.',
    image: '/images/protect-maquinaria.webp',
    alt: 'Cosechadora trabajando en un lote de trigo',
    lightOverlay: true,
  },
  {
    id: 'drones',
    label: '03',
    title: 'Drones',
    description: 'Robo, roturas, responsabilidad civil y daños a terceros.',
    image: '/images/protect-drones.webp',
    alt: 'Vista aérea de un lote de girasol',
    lightOverlay: true,
  },
  {
    id: 'depositos',
    label: '04',
    title: 'Depósitos',
    description: 'Depósitos de fitosanitarios: instalaciones, mercadería y riesgos asociados.',
    image: '/images/protect-depositos.webp',
    alt: 'Silos de una planta de acopio junto a un lote',
    lightOverlay: true,
  },
  {
    id: 'personal',
    label: '05',
    title: 'Personal',
    description: 'Accidentes personales y ART. También coberturas para petiseros, pilotos y domadores.',
    image: '/images/protect-personal.webp',
    alt: 'Dos hombres trabajando la tierra con palas',
    lightOverlay: true,
  },
  {
    id: 'ganado',
    label: '06',
    title: 'Ganado y equinos',
    description:
      'Hacienda: incendios, rayos, inundaciones, intoxicación, empaste y enfermedades. Caballos: muerte, enfermedades, accidentes, cólicos, cesáreas y transporte.',
    image: '/images/protect-ganado-equinos.webp',
    alt: 'Vacas mirando a cámara detrás de un alambrado',
    lightOverlay: true,
  },
]

const processSteps = [
  { title: 'Comprendemos', text: 'La actividad, el contexto y aquello que necesitás proteger.' },
  { title: 'Asesoramos', text: 'Buscamos una cobertura adecuada para cada situación.' },
  { title: 'Acompañamos', text: 'Mantenemos un seguimiento cercano durante todo el proceso.' },
]

export function ProtectPage() {
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>(
        '.protect-intro, .protect-process, .protect-support, .protect-contact',
      ),
    )

    if (!('IntersectionObserver' in window)) {
      sections.forEach((section) => section.classList.add('is-in-view'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-in-view')
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <section className="protect-hero" aria-labelledby="protect-title">
        <div className="protect-hero-photo" aria-hidden="true">
          <picture className="photo-source">
            <source media="(max-width: 620px)" srcSet="/images/protect-hero-celu.webp" />
            <img src="/images/protect-hero.webp" alt="" fetchPriority="high" />
          </picture>
          <img className="protect-hero-logo" src="/images/gap-protect-logo.svg" alt="" />
        </div>
        <div className="container protect-hero-content">
          <p className="protect-unit-name">+PROTECT</p>
          <h1 id="protect-title">
            Protección <span>para cada actividad</span>
          </h1>
          <p>
            Seguros para cultivos, maquinaria, drones, ganado, depósitos, personal y equinos, con
            asesoramiento y seguimiento durante todo el proceso.
          </p>
          <a className="button button-pink" href="#mapa-protect">
            Explorar coberturas <span aria-hidden="true">→</span>
          </a>
          <span className="protect-hero-topics">
            Cercanía <i aria-hidden="true" /> Respaldo <i aria-hidden="true" /> Seguimiento
          </span>
        </div>
      </section>

      <section className="protect-intro" id="protect-mirada" aria-labelledby="protect-intro-title">
        <div className="container protect-intro-grid">
          <div>
            <p className="protect-eyebrow">Coberturas pensadas para cada actividad</p>
            <h2 id="protect-intro-title">Cada actividad tiene riesgos diferentes</h2>
          </div>
          <div>
            <p>
              La actividad cambia, el contexto cambia y la cobertura también. Por eso, el punto de
              partida es comprender qué necesitás proteger.
            </p>
            <span>Una propuesta pensada desde tu realidad</span>
          </div>
        </div>
      </section>

      <SolutionExplorer
        id="mapa-protect"
        title="¿Qué necesitás proteger?"
        items={coverages}
        footer={
          <Link className="protect-map-link" to="/contacto">
            Consultar por una cobertura <span aria-hidden="true">→</span>
          </Link>
        }
      />

      <section className="protect-process protect-process-plain" aria-labelledby="protect-process-title">
        <div className="container">
          <div className="protect-process-heading">
            <div>
              <p className="protect-eyebrow">Acompañamiento de principio a fin</p>
              <h2 id="protect-process-title">La cobertura es parte de un proceso</h2>
            </div>
            <p>Estamos presentes desde la cotización y durante la vigencia del seguro.</p>
          </div>
          <ol className="protect-process-steps">
            {processSteps.map((step, index) => (
              <li key={step.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="protect-support protect-support-plain" aria-labelledby="protect-support-title">
        <div className="protect-support-image">
          <img src="/images/protect-cercania-respaldo.webp" alt="+Cercanía +Respaldo, sobre un jugador de polo en plena jugada" loading="lazy" />
        </div>
        <div className="protect-support-copy">
          <p className="protect-eyebrow">Cercanía + respaldo</p>
          <h2 id="protect-support-title">Estar cubierto también es sentirse acompañado</h2>
          <p>Una propuesta cercana para elegir con claridad y contar con seguimiento en cada etapa.</p>
          <Link className="button labs-dark-button" to="/contacto">
            Conversemos <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section className="protect-contact" aria-labelledby="protect-contact-title">
        <img className="protect-contact-symbol" src="/images/agro-polo-isotipo.svg" alt="" aria-hidden="true" />
        <div className="container protect-contact-grid">
          <h2 id="protect-contact-title">Contanos qué necesitás proteger</h2>
          <div>
            <p>Empecemos por conocer tu actividad y tu necesidad.</p>
            <div className="catalog-actions">
              <Link className="button button-pink" to="/contacto">
                Contactanos <span aria-hidden="true">→</span>
              </Link>
              <CatalogDownload catalog={unitCatalogs.protect} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
