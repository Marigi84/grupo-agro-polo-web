import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { tourSignup, tourSignupHref } from '../data/site'

const steps = [
  { title: 'Nace', text: 'alrededor del polo', image: '/images/tour-gallery-bayer.webp', alt: 'Encuentro bajo un árbol junto a la cancha', tilt: '2deg' },
  { title: 'Crece', text: 'con cada encuentro', image: '/images/tour-gallery-01.webp', alt: 'Un jugador prepara su casco antes del partido', tilt: '-3deg' },
  { title: 'Continúa', text: 'en cada relación', image: '/images/tour-gallery-02.webp', alt: 'Una jugadora galopa por la cancha', tilt: '2deg' },
]

// Fotos de la galería con flechas (las de marketing, con su logo). Para sumar fotos alcanza con
// agregarlas acá con su proporción (ancho / alto) para que se vean enteras.
const gallery = [
  { image: '/images/tour-album-hero.webp', alt: 'Jugadores del Agro Polo Tour en plena jugada', tilt: '-2deg', ratio: '4 / 5' },
  { image: '/images/tour-album-noche.webp', alt: 'Invitados reunidos de noche bajo un árbol con guirnaldas de luces', tilt: '1.5deg', ratio: '1 / 1' },
  { image: '/images/tour-album-jugada.webp', alt: 'Dos jugadores disputan la pelota en el Agro Polo Tour', tilt: '-1deg', ratio: '2 / 3' },
  { image: '/images/tour-album-casco.webp', alt: 'Un jugador sonriente acomoda su casco y su taco', tilt: '2deg', ratio: '1 / 1' },
]

// Cada sección marcada con data-scroll recibe --p (0 a 1) según cuánto se recorrió.
// Con eso se dibujan las líneas, se desliza el texto gigante y se mueven las fotos.
function useScrollProgress() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
    const sections = Array.from(root.querySelectorAll<HTMLElement>('[data-scroll]'))
    const stepItems = Array.from(root.querySelectorAll<HTMLElement>('.polo-tour-step'))
    const clamp = (value: number) => Math.min(1, Math.max(0, value))
    let frame = 0

    const update = () => {
      frame = 0
      const viewport = window.innerHeight
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        const isHero = section.dataset.scroll === 'hero'
        const progress = reduceMotion
          ? isHero ? 0 : 1
          : clamp(isHero ? -rect.top / rect.height : (viewport * 0.85 - rect.top) / (rect.height * 0.9))
        section.style.setProperty('--p', progress.toFixed(3))
      })
      stepItems.forEach((step) => {
        const rect = step.getBoundingClientRect()
        step.classList.toggle('is-active', reduceMotion || rect.top + rect.height / 2 < viewport * 0.62)
      })
    }

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return rootRef
}

export function TourPage() {
  const rootRef = useScrollProgress()
  const [current, setCurrent] = useState(0)
  const total = gallery.length
  const touchStart = useRef<number | null>(null)
  const go = (step: number) => setCurrent((index) => (index + step + total) % total)

  // Lugar de cada foto respecto de la protagonista: entra por la derecha, pasa al centro y sale por la izquierda
  const slotOf = (index: number) => {
    const offset = (index - current + total) % total
    if (offset === 0) return 'center'
    if (offset === 1) return 'right'
    if (offset === total - 1) return 'left'
    return offset === total - 2 ? 'gone' : 'waiting'
  }

  return (
    <div className="polo-tour" ref={rootRef}>
      <section className="polo-tour-hero" data-scroll="hero" aria-labelledby="polo-tour-title">
        <div className="container polo-tour-hero-grid">
          <div>
            <h1 id="polo-tour-title">Todo empezó en <span>movimiento</span></h1>
            <p className="polo-tour-lead">El polo fue el punto de partida<br />La comunidad es lo que nos impulsa</p>
            <a className="button polo-tour-dark-button" href="#historia">Seguí la historia <span aria-hidden="true">↓</span></a>
          </div>
          <div className="polo-tour-hero-photos">
            <figure className="polo-tour-photo polo-tour-hero-main">
              <picture className="photo-source">
                <source media="(max-width: 620px)" srcSet="/images/tour-main-celu.webp" />
                <img src="/images/tour-main.webp" alt="Jugadores del Agro Polo Tour en plena jugada" fetchPriority="high" />
              </picture>
              <img className="polo-tour-hero-logo" src="/images/agro-polo-tour-logo.svg" alt="" />
            </figure>
            <figure className="polo-tour-photo polo-tour-hero-small">
              <img src="/images/tour-gallery-01.webp" alt="" />
            </figure>
          </div>
        </div>
        <p className="polo-tour-giant" aria-hidden="true">AGRO POLO TOUR</p>
      </section>

      <section className="polo-tour-story" id="historia" data-scroll aria-labelledby="polo-tour-story-title">
        <div className="container">
          <h2 id="polo-tour-story-title">Una historia que no se quedó quieta</h2>
          <p className="polo-tour-lead">
            Nació alrededor del polo y fue creciendo con cada persona que encontró en el Tour un lugar para compartir
          </p>
          <div className="polo-tour-timeline">
            <svg viewBox="0 0 120 1000" preserveAspectRatio="none" aria-hidden="true">
              <path className="polo-tour-timeline-guide" d="M 60 0 C 0 200, 120 330, 60 500 S 0 820, 60 1000" />
              <path className="polo-tour-draw" pathLength={1} d="M 60 0 C 0 200, 120 330, 60 500 S 0 820, 60 1000" />
            </svg>
            <ol>
              {steps.map((step) => (
                <li className="polo-tour-step" key={step.title}>
                  <div className="polo-tour-step-text">
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                  <figure className="polo-tour-photo" style={{ '--tilt': step.tilt } as CSSProperties}>
                    <img src={step.image} alt={step.alt} loading="lazy" />
                  </figure>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="polo-tour-after" data-scroll aria-labelledby="polo-tour-after-title">
        <div className="container polo-tour-after-head">
          <h2 id="polo-tour-after-title">Lo que queda después del encuentro</h2>
          <p>Conversaciones que continúan<br />Relaciones que vuelven a encontrarse</p>
        </div>
        <div
          className="polo-tour-carousel"
          role="region"
          aria-roledescription="carrusel"
          aria-label="Fotos del Agro Polo Tour"
          onTouchStart={(event) => { touchStart.current = event.touches[0].clientX }}
          onTouchEnd={(event) => {
            if (touchStart.current === null) return
            const distance = event.changedTouches[0].clientX - touchStart.current
            touchStart.current = null
            if (Math.abs(distance) > 40) go(distance < 0 ? 1 : -1)
          }}
          onKeyDown={(event) => {
            if (event.key === 'ArrowRight') go(1)
            if (event.key === 'ArrowLeft') go(-1)
          }}
        >
          {gallery.map((photo, index) => {
            const slot = slotOf(index)
            return (
              <figure
                key={photo.image}
                className={`polo-tour-photo polo-tour-slide is-${slot}`}
                style={{ '--tilt': photo.tilt, aspectRatio: photo.ratio } as CSSProperties}
                aria-hidden={slot !== 'center' || undefined}
              >
                <img src={photo.image} alt={slot === 'center' ? photo.alt : ''} loading="lazy" />
              </figure>
            )
          })}
          <button type="button" className="polo-tour-carousel-arrow is-prev" aria-label="Foto anterior" onClick={() => go(-1)}>
            <span aria-hidden="true">‹</span>
          </button>
          <button type="button" className="polo-tour-carousel-arrow is-next" aria-label="Foto siguiente" onClick={() => go(1)}>
            <span aria-hidden="true">›</span>
          </button>
        </div>
      </section>

      <section className="polo-tour-close" data-scroll aria-labelledby="polo-tour-close-title">
        <img className="polo-tour-close-symbol" src="/images/agro-polo-isotipo.svg" alt="" aria-hidden="true" />
        <div className="container polo-tour-close-grid">
          <div>
            <h2 id="polo-tour-close-title">El Tour termina<br />La comunidad continúa</h2>
            <p>Cada encuentro amplía la conversación y fortalece los vínculos que sostienen a Grupo Agro Polo</p>
            <p className="polo-tour-signup-note">Ya estamos armando la edición 2027</p>
            <div className="polo-tour-close-actions">
              {tourSignup.whatsapp ? (
                <a className="button button-pink" href={tourSignupHref()} target="_blank" rel="noreferrer">
                  Anotate a la edición 2027 <span aria-hidden="true">→</span>
                </a>
              ) : (
                <Link className="button button-pink" to="/contacto">
                  Anotate a la edición 2027 <span aria-hidden="true">→</span>
                </Link>
              )}
              <a className="button button-ghost" href="https://www.instagram.com/agropolotour/" target="_blank" rel="noreferrer">
                Seguí @agropolotour <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
          <figure className="polo-tour-photo polo-tour-close-photo">
            <picture className="photo-source">
              <source media="(max-width: 620px)" srcSet="/images/tour-main-celu.webp" />
              <img src="/images/tour-main.webp" alt="Partido del Agro Polo Tour" loading="lazy" />
            </picture>
          </figure>
        </div>
      </section>
    </div>
  )
}
