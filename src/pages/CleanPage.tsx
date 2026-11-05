import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'

type Variable = {
  title: string
  text: string
}

const variables: Variable[] = [
  { title: 'Calidad del agua', text: 'El origen de una limpieza eficaz.' },
  { title: 'Sarro', text: 'Remoción específica, sin improvisar.' },
  { title: 'Grasas', text: 'Producto y concentración adecuados.' },
  { title: 'Residuos orgánicos', text: 'Método de aplicación según el proceso.' },
]

const steps = [
  { title: 'Analizamos', text: 'Las condiciones reales de cada planta.' },
  { title: 'Definimos', text: 'Producto y concentración para el problema.' },
  { title: 'Aplicamos', text: 'El método adecuado en cada sector.' },
  { title: 'Acompañamos', text: 'Antes, durante y después.' },
]

const places = ['Frigoríficos', 'Tambos', 'Plantas de procesamiento', 'Establecimientos ganaderos', 'Industrias']

const AUTOPLAY_MS = 3800

export function CleanPage() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const [split, setSplit] = useState(50)
  const diagnosisRef = useRef<HTMLElement>(null)

  function selectVariable(index: number) {
    setAutoplay(false)
    setActiveIndex(index)
  }

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>(
        '.clean-intro, .clean-diagnosis, .clean-steps, .clean-compare, .clean-places, .protect-contact',
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

  // El diagnóstico recorre las variables mientras está a la vista y nadie lo tocó
  useEffect(() => {
    if (!autoplay || typeof window.matchMedia !== 'function') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const section = diagnosisRef.current
    if (!section || !('IntersectionObserver' in window)) return

    let timer: number | undefined
    let paused = false
    const pause = () => { paused = true }
    const resume = () => { paused = false }
    section.addEventListener('pointerenter', pause)
    section.addEventListener('pointerleave', resume)
    section.addEventListener('focusin', pause)
    section.addEventListener('focusout', resume)

    const observer = new IntersectionObserver(([entry]) => {
      window.clearInterval(timer)
      if (!entry.isIntersecting) return
      timer = window.setInterval(() => {
        if (paused) return
        setActiveIndex((current) => (current + 1) % variables.length)
      }, AUTOPLAY_MS)
    }, { threshold: 0.4 })
    observer.observe(section)

    return () => {
      window.clearInterval(timer)
      observer.disconnect()
      section.removeEventListener('pointerenter', pause)
      section.removeEventListener('pointerleave', resume)
      section.removeEventListener('focusin', pause)
      section.removeEventListener('focusout', resume)
    }
  }, [autoplay])

  return (
    <>
      <section className="clean-hero" aria-labelledby="clean-title">
        <div className="clean-hero-photo" aria-hidden="true">
          <picture className="photo-source">
            <source media="(max-width: 620px)" srcSet="/images/clean-hero-celu.webp" />
            <img src="/images/clean-hero.webp" alt="" fetchPriority="high" />
          </picture>
          <img className="clean-hero-logo" src="/images/gap-clean-logo.svg" alt="" />
        </div>
        <div className="container clean-hero-content">
          <p className="clean-unit-name">+CLEAN · Grupo Agro Polo</p>
          <h1 id="clean-title">Higiene que responde a cada proceso</h1>
          <p>Productos profesionales de limpieza y desinfección para frigoríficos y establecimientos agroindustriales.</p>
          <a className="button button-pink" href="#clean-diagnostico">
            Explorar soluciones <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      <section className="clean-intro" aria-labelledby="clean-intro-title">
        <div className="container clean-intro-grid">
          <div>
            <p className="clean-eyebrow">El punto de partida</p>
            <h2 id="clean-intro-title">La limpieza empieza por comprender el problema</h2>
          </div>
          <p>
            Cada planta tiene condiciones diferentes. Analizamos el agua, el sarro, las grasas y los
            residuos para recomendar una solución eficiente.
          </p>
        </div>
      </section>

      <section
        className="clean-diagnosis"
        id="clean-diagnostico"
        aria-labelledby="clean-diagnosis-title"
        ref={diagnosisRef}
      >
        <div className="container">
          <p className="clean-eyebrow">¿Qué necesitás resolver?</p>
          <h2 id="clean-diagnosis-title">Un diagnóstico. Cuatro variables</h2>
          <ol
            className="clean-variables"
            style={{ '--active': activeIndex, '--count': variables.length } as CSSProperties}
          >
            {variables.map((variable, index) => (
              <li className={index === activeIndex ? 'is-active' : ''} key={variable.title}>
                <button type="button" aria-pressed={index === activeIndex} onClick={() => selectVariable(index)}>
                  <span className="clean-variable-number">{String(index + 1).padStart(2, '0')}</span>
                  <strong>{variable.title}</strong>
                  <span className="clean-variable-text">{variable.text}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="clean-steps" aria-labelledby="clean-steps-title">
        <div className="container">
          <p className="clean-eyebrow">Acompañamiento técnico</p>
          <h2 id="clean-steps-title">Una solución para cada etapa</h2>
          <ol className="clean-step-list">
            {steps.map((step, index) => (
              <li key={step.title}>
                <span aria-hidden="true">{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="clean-compare" aria-labelledby="clean-compare-title">
        <div className="container">
          <p className="clean-eyebrow">Resultado visible</p>
          <h2 id="clean-compare-title">Mismo proceso. Otra condición</h2>
          <div className="clean-compare-frame" style={{ '--split': `${split}%` } as CSSProperties}>
            <img
              className="clean-compare-after"
              src="/images/clean-despues.webp"
              alt="Piso de una planta industrial limpio y brillante después de la limpieza"
              loading="lazy"
            />
            <img className="clean-compare-before" src="/images/clean-antes.webp" alt="" aria-hidden="true" loading="lazy" />
            <span className="clean-compare-label clean-compare-label-before" aria-hidden="true">Antes</span>
            <span className="clean-compare-label clean-compare-label-after" aria-hidden="true">Después</span>
            <span className="clean-compare-handle" aria-hidden="true">↔</span>
            <input
              type="range"
              min={0}
              max={100}
              value={split}
              onChange={(event) => setSplit(Number(event.target.value))}
              aria-label="Comparar antes y después"
            />
          </div>
        </div>
      </section>

      <section className="clean-places" aria-labelledby="clean-places-title">
        <div className="clean-places-copy">
          <h2 className="clean-eyebrow" id="clean-places-title">Dónde trabajamos</h2>
          <ul>
            {places.map((place) => <li key={place}>{place}</li>)}
          </ul>
          <p>Soluciones para instalaciones, áreas de producción, equipos y superficies.</p>
        </div>
        <div className="clean-places-image">
          <img src="/images/clean-agua.webp" alt="Lavado de una canaleta de acero inoxidable en planta" loading="lazy" />
        </div>
      </section>

      <section className="protect-contact" aria-labelledby="clean-contact-title">
        <img className="protect-contact-symbol" src="/images/agro-polo-isotipo.svg" alt="" aria-hidden="true" />
        <div className="container protect-contact-grid">
          <h2 id="clean-contact-title">Contanos qué necesitás resolver</h2>
          <div>
            <p>Empecemos por conocer tu planta y tu proceso.</p>
            <Link className="button button-pink" to="/contacto">
              Hablemos de tu planta <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
