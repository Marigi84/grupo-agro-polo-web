import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { SolutionExplorer, type ExplorerItem } from '../components/SolutionExplorer'

// Mismo formato de lista que el explorador de +LABS (pedido de marketing)
const criteria: ExplorerItem[] = [
  {
    id: 'ubicacion',
    label: '01',
    title: 'Ubicación',
    description: 'Dónde está el campo, sus accesos y su entorno productivo.',
    image: '/images/farms-ubicacion.webp',
    alt: 'Vista aérea de lotes y caminos rurales al atardecer',
    lightOverlay: true,
  },
  {
    id: 'superficie',
    label: '02',
    title: 'Superficie',
    description: 'Cuántas hectáreas tiene y cómo se distribuyen.',
    image: '/images/farms-superficie.webp',
    alt: 'Rollo de pasto sobre un lote cosechado',
    lightOverlay: true,
  },
  {
    id: 'infraestructura',
    label: '03',
    title: 'Infraestructura',
    description: 'Mejoras, instalaciones y servicios con los que cuenta.',
    image: '/images/farms-infraestructura.webp',
    alt: 'Vista aérea de lotes divididos por cortinas de árboles',
    lightOverlay: true,
  },
  {
    id: 'tasacion',
    label: '04',
    title: 'Tasación',
    description: 'Una referencia de valor según el mercado de la zona.',
    image: '/images/farms-tasacion.webp',
    alt: 'Productor que recorre un lote de maíz',
    lightOverlay: true,
  },
  {
    id: 'aptitud',
    label: '05',
    title: 'Aptitud productiva',
    description: 'El potencial del campo dentro de la operación.',
    image: '/images/farms-apreton.webp',
    alt: 'Dos personas se dan la mano frente a un cultivo',
    lightOverlay: true,
  },
]

const steps = [
  { title: 'Entendemos', text: 'Qué necesitás y qué tipo de oportunidad estás buscando.' },
  { title: 'Analizamos', text: 'Ubicación, superficie, aptitud productiva e infraestructura.' },
  { title: 'Acompañamos', text: 'Durante todo el proceso de compra o venta.' },
]

export function FarmsPage() {
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
      <section className="farms-hero" aria-labelledby="farms-title">
        <div className="container farms-hero-content">
          <p className="farms-unit-name">+FARMS</p>
          <h1 id="farms-title">Operaciones de campo bien acompañadas</h1>
          <p>
            Asesoramiento integral en compra y venta de campos con la mirada de quienes conocen el agro desde
            adentro.
          </p>
          <a className="button button-pink farms-hero-button" href="#farms-criterios">
            Conocer +FARMS <span aria-hidden="true">→</span>
          </a>
          <span className="farms-hero-topics">
            Cercanía <i aria-hidden="true" /> Criterio <i aria-hidden="true" /> Acompañamiento
          </span>
        </div>
        <div className="farms-hero-photo" aria-hidden="true">
          <picture className="photo-source">
            <source media="(max-width: 620px)" srcSet="/images/farms-hero-celu.webp" />
            <img src="/images/farms-hero.webp" alt="" fetchPriority="high" />
          </picture>
          <img className="farms-hero-logo" src="/images/gap-farms-logo.svg" alt="" />
        </div>
      </section>

      <section className="protect-intro farms-intro" aria-labelledby="farms-intro-title">
        <div className="container protect-intro-grid">
          <div>
            <h2 id="farms-intro-title">Conocer el agro cambia la forma de mirar un campo</h2>
          </div>
          <div>
            <p>
              Entendemos qué busca un productor, qué preguntas hacer sobre el potencial productivo y cómo
              acompañar cada etapa de una operación de esta magnitud.
            </p>
            <span>Una mirada productiva y comercial</span>
          </div>
        </div>
      </section>

      <SolutionExplorer
        id="farms-criterios"
        title="¿Qué miramos en cada oportunidad?"
        items={criteria}
        footer={<p className="labs-explorer-note">La información orienta la decisión. La experiencia ayuda a interpretarla.</p>}
      />

      <section className="protect-process protect-process-plain farms-process" aria-labelledby="farms-process-title">
        <div className="container">
          <div className="protect-process-heading">
            <h2 id="farms-process-title">Una operación se construye paso a paso</h2>
            <p>Criterio profesional y acompañamiento cercano.</p>
          </div>
          <ol className="protect-process-steps">
            {steps.map((step, index) => (
              <li key={step.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="protect-support protect-support-plain farms-support" aria-labelledby="farms-support-title">
        <div className="protect-support-image">
          <img src="/images/farms-apreton.webp" alt="Dos personas se dan la mano frente a un cultivo" loading="lazy" />
        </div>
        <div className="protect-support-copy">
          <h2 id="farms-support-title">Respaldo para una decisión importante</h2>
          <p>Trayectoria en el mercado de tierras y una mirada profesional para acompañar cada operación.</p>
          <p>
            Además, la red de Grupo Agro Polo permite conectar la nueva propiedad con seguros y soluciones para
            ponerla en producción.
          </p>
          <Link className="button labs-dark-button" to="/contacto">
            Conversemos <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section className="protect-contact" aria-labelledby="farms-contact-title">
        <img className="protect-contact-symbol" src="/images/agro-polo-isotipo.svg" alt="" aria-hidden="true" />
        <div className="container protect-contact-grid">
          <div>
            <h2 id="farms-contact-title">Contanos qué campo estás buscando</h2>
            <p className="farms-contact-sub">O si necesitás acompañamiento para vender</p>
          </div>
          <div>
            <p>Empecemos por conocer tu necesidad.</p>
            <Link className="button button-pink" to="/contacto">
              Contactar a +FARMS <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
