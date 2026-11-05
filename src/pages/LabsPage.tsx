import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CatalogDownload } from '../components/CatalogDownload'
import { SolutionExplorer, type ExplorerItem } from '../components/SolutionExplorer'
import { unitCatalogs } from '../data/site'

const solutions: ExplorerItem[] = [
  {
    id: 'aplicacion',
    label: 'Aplicación',
    title: 'Coadyuvantes',
    description: 'Asesoramiento según las condiciones y necesidades de cada campaña.',
    image: '/images/labs-coadyuvantes.webp',
    alt: 'Manos que plantan un plantín en la tierra',
    lightOverlay: true,
  },
  {
    id: 'nutricion',
    label: 'Nutrición',
    title: 'Fertilizantes líquidos',
    description: 'Alternativas acompañadas por un asesoramiento técnico de cada campaña.',
    image: '/images/labs-fertilizantes.webp',
    alt: 'Pulverizadora aplicando sobre un cultivo al atardecer',
    lightOverlay: true,
  },
  {
    id: 'agua',
    label: 'Agua',
    title: 'El agua también define el resultado',
    description: 'Su calidad y sus condiciones también forman parte del análisis.',
    image: '/images/labs-agua.webp',
    alt: 'Aspersor de riego trabajando sobre un lote',
    lightOverlay: true,
  },
]

const workingSteps = [
  {
    title: 'Comprender',
    text: 'Las condiciones y la necesidad concreta.',
  },
  {
    title: 'Recomendar',
    text: 'Una alternativa adecuada para la producción.',
  },
  {
    title: 'Acompañar',
    text: 'Con cercanía antes, durante y después.',
  },
]

export function LabsPage() {
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('.labs-question, .labs-method, .labs-contact'),
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
      <section className="labs-hero" aria-labelledby="labs-title">
        <div className="labs-hero-photo" aria-hidden="true">
          <img src="/images/labs-hero.webp" alt="" fetchPriority="high" />
          <img className="labs-hero-logo" src="/images/gap-labs-logo.svg" alt="" />
        </div>
        <div className="container labs-hero-content">
          <p className="labs-unit-name">+LABS</p>
          <h1 id="labs-title">Nutrición y aplicación con asesoramiento técnico</h1>
          <p>
            Coadyuvantes y fertilizantes líquidos, acompañados por un asesoramiento técnico de las
            condiciones y necesidades de cada producción.
          </p>
          <a className="button button-pink" href="#explorador-labs">
            Explorar soluciones <span aria-hidden="true">→</span>
          </a>
          <span className="labs-hero-topics">
            Coadyuvantes <i aria-hidden="true" /> Fertilizantes líquidos <i aria-hidden="true" />
            Asesoramiento técnico
          </span>
        </div>
        <a className="labs-hero-scroll" href="#labs-necesidad" aria-label="Bajar a la siguiente sección">
          <span aria-hidden="true">↓</span>
        </a>
      </section>

      <section className="labs-question" id="labs-necesidad" aria-labelledby="labs-question-title">
        <div className="container labs-question-grid">
          <h2 id="labs-question-title">¿Qué necesitás mejorar en tu producción?</h2>
          <div>
            <p>
              Cada campaña plantea condiciones distintas. Analizamos cada situación para recomendar
              una estrategia adecuada.
            </p>
            <span>Elegí un área para explorarla</span>
          </div>
        </div>
      </section>

      <SolutionExplorer
        id="explorador-labs"
        title="Nuestras soluciones"
        items={solutions}
        footer={
          <p className="labs-explorer-note">
            Un recorrido simple para pasar de la necesidad a una conversación técnica.
          </p>
        }
      />

      <section className="labs-method" aria-labelledby="labs-method-title">
        <div className="container">
          <div className="labs-method-heading">
            <div>
              <p>Cercanía + tecnología</p>
              <h2 id="labs-method-title">
                <span className="labs-method-title-desktop">Una forma de trabajar que acompaña cada decisión</span>
                <span className="labs-method-title-mobile">Comprender, recomendar y acompañar</span>
              </h2>
            </div>
          </div>
          <div className="labs-method-steps">
            {workingSteps.map((step) => (
              <article key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="labs-contact" aria-labelledby="labs-contact-title">
        <img src="/images/agro-polo-isotipo.svg" alt="" aria-hidden="true" />
        <div className="container labs-contact-grid">
          <h2 id="labs-contact-title">Contanos qué necesitás mejorar</h2>
          <div>
            <div className="catalog-actions">
              <Link className="button button-pink" to="/contacto">
                Contactanos <span aria-hidden="true">→</span>
              </Link>
              <CatalogDownload catalog={unitCatalogs.labs} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
