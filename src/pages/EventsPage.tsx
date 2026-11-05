import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { SolutionExplorer, type ExplorerItem } from '../components/SolutionExplorer'

// Mismo formato de lista que el explorador de +LABS (pedido de marketing)
const goals: ExplorerItem[] = [
  {
    id: 'vinculos',
    label: '01',
    title: 'Vínculos',
    description: 'Relaciones que se construyen cara a cara.',
    image: '/images/unit-events.webp',
    alt: 'Invitados reunidos durante la jornada del Tour',
  },
  {
    id: 'experiencias',
    label: '02',
    title: 'Experiencias',
    description: 'Jornadas pensadas para disfrutar y compartir.',
    image: '/images/tour-gallery-02.webp',
    alt: 'Una jugadora galopa por la cancha',
  },
  {
    id: 'hospitalidad',
    label: '03',
    title: 'Hospitalidad',
    description: 'Cada invitado se siente bien recibido.',
    image: '/images/tour-gallery-01.webp',
    alt: 'Un jugador prepara su casco antes del partido',
  },
  {
    id: 'comunidad',
    label: '04',
    title: 'Comunidad',
    description: 'Personas que se conocen y vuelven a encontrarse.',
    image: '/images/tour-gallery-bayer.webp',
    alt: 'Personas que se reencuentran junto a la cancha',
  },
  {
    id: 'oportunidades',
    label: '05',
    title: 'Oportunidades',
    description: 'Conversaciones que abren nuevos negocios.',
    image: '/images/tour-main.webp',
    alt: 'Jugadores del Agro Polo Tour en plena jugada',
  },
]

const steps = [
  { title: 'Pensamos', text: 'Definimos el objetivo, el formato y la experiencia del evento.' },
  { title: 'Producimos', text: 'Coordinamos proveedores, tiempos y todos los detalles necesarios.' },
  { title: 'Ejecutamos', text: 'Acompañamos la jornada para que vos te enfoques en disfrutar el resultado.' },
]

export function EventsPage() {
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
      <section className="events-hero" aria-labelledby="events-title">
        <div className="events-hero-photo" aria-hidden="true">
          <picture className="photo-source">
            <source media="(max-width: 620px)" srcSet="/images/events-hero-celu.webp" />
            <img src="/images/events-hero.webp" alt="" fetchPriority="high" />
          </picture>
          <img className="events-hero-logo" src="/images/gap-events-logo.svg" alt="" />
        </div>
        <div className="container events-hero-content">
          <p className="events-unit-name">+EVENTS</p>
          <h1 id="events-title">Encuentros que fortalecen relaciones</h1>
          <p>Diseñamos, producimos y ejecutamos experiencias para el mundo del agro y del polo.</p>
          <a className="button button-pink events-hero-button" href="#events-red">
            Conocer +EVENTS <span aria-hidden="true">→</span>
          </a>
          <span className="events-hero-topics">
            Vínculos <i aria-hidden="true" /> Comunidad <i aria-hidden="true" /> Oportunidades
          </span>
        </div>
      </section>

      <section className="protect-intro events-intro" id="events-intencion" aria-labelledby="events-intro-title">
        <div className="container protect-intro-grid">
          <div>
            <h2 id="events-intro-title">Cada encuentro necesita una intención clara</h2>
          </div>
          <div>
            <p>
              Diseñamos un evento con el propósito de conectar a las personas y construir relaciones
              de confianza.
            </p>
            <span>Una experiencia pensada de principio a fin</span>
          </div>
        </div>
      </section>

      <SolutionExplorer id="events-red" title="¿Qué querés generar?" items={goals} />

      <section className="protect-process protect-process-plain events-process" aria-labelledby="events-process-title">
        <div className="container">
          <div className="protect-process-heading">
            <h2 id="events-process-title">La experiencia es parte de un proceso</h2>
            <p>Del concepto a la ejecución, cuidamos cada etapa.</p>
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

      <section className="protect-support protect-support-plain events-tour" aria-labelledby="events-tour-title">
        <div className="protect-support-image">
          <img src="/images/events-tour.webp" alt="Dos personas conversando al aire libre durante el Agro Polo Tour" loading="lazy" />
        </div>
        <div className="protect-support-copy">
          <h2 id="events-tour-title">Agro Polo Tour</h2>
          <p className="events-tour-subtitle">Nuestra carta de presentación</p>
          <p>
            Un encuentro propio que reúne productores y empresas del agro alrededor del polo.
          </p>
          <p>Cada aprendizaje se transforma en experiencia para producir nuevos eventos.</p>
          <Link className="button labs-dark-button" to="/agro-polo-tour">
            Conocer el tour <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section className="protect-contact" aria-labelledby="events-contact-title">
        <img className="protect-contact-symbol" src="/images/agro-polo-isotipo.svg" alt="" aria-hidden="true" />
        <div className="container protect-contact-grid">
          <h2 id="events-contact-title">Contanos qué querés generar</h2>
          <div>
            <p>Empecemos por conocer tu idea.</p>
            <Link className="button button-pink" to="/contacto">
              Hablemos de tu evento <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
