import { useEffect, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { alliances, unitPages } from '../data/site'

const workingPrinciples = [
  {
    number: '01',
    title: 'Comprender',
    text: 'Conocer la actividad, el contexto y la necesidad concreta antes de proponer una alternativa.',
  },
  {
    number: '02',
    title: 'Asesorar',
    text: 'Combinar el conocimiento de nuestras unidades con el respaldo de especialistas para ofrecer una respuesta adecuada.',
  },
  {
    number: '03',
    title: 'Acompañar',
    text: 'Realizar un seguimiento cercano antes, durante y después de cada operación.',
  },
]

export function HomePage() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('[data-reveal]')
    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.14 },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])


  return (
    <>
      <section className="hero-section" aria-labelledby="hero-title">
        <picture>
          <source media="(max-width: 620px)" srcSet="/images/home-hero.webp" />
          <img className="hero-background" src="/images/home-hero-wide.webp" alt="Cultivo de maíz con el isotipo de Grupo Agro Polo" fetchPriority="high" />
        </picture>
        <div className="hero-overlay" />
        <div className="container hero-content">
          <h1
            id="hero-title"
            className="hero-enter hero-enter-delay-1"
            aria-label="Soluciones para el agro Relaciones que generan oportunidades"
          >
            <span className="hero-title-primary">Soluciones para<br />el agro</span>
            <span className="hero-title-secondary">Relaciones que generan oportunidades</span>
          </h1>
          <p className="hero-summary hero-enter hero-enter-delay-2">
            Productos, servicios y conocimiento especializado para acompañar las necesidades de productores y empresas.
          </p>
          <div className="hero-actions hero-enter hero-enter-delay-3">
            <a className="button button-pink" href="#unidades">Conocé nuestras soluciones <span aria-hidden="true">→</span></a>
            <a className="button button-ghost" href="#tour">Descubrí Agro Polo Tour</a>
          </div>
          <p className="hero-pill hero-enter hero-enter-delay-3">+ Soluciones · + Relaciones · + Oportunidades</p>
        </div>
        <a className="scroll-cue" href="#nosotros" aria-label="Ir a la siguiente sección"><span>Descubrí</span><i aria-hidden="true" /></a>
      </section>

      <section className="about-section" id="nosotros" aria-labelledby="about-title">
        <div className="about-watermark" aria-hidden="true"><img src="/images/agro-polo-isotipo.svg" alt="" /></div>
        <div className="container about-grid" data-reveal>
          <div className="section-heading">
            <p className="eyebrow">Grupo Agro Polo</p>
            <h2 id="about-title">
              <span className="about-title-primary">Soluciones concretas</span>
              <span className="about-title-secondary">Acompañamiento cercano</span>
            </h2>
          </div>
          <div className="about-copy">
            <p>En Grupo Agro Polo nos enfocamos en comprender las necesidades de cada cliente para vincularlo con la solución o el aliado ideal dentro de nuestra red.</p>
            <p>Nuestro propósito es ser un puente estratégico, facilitando conexiones de valor y generando oportunidades basadas en la confianza y el entendimiento mutuo.</p>
          </div>
        </div>
      </section>

      <section className="units-section" id="unidades" aria-labelledby="units-title">
        <div className="container units-heading" data-reveal>
          <div>
            <p className="eyebrow">Nuestro ecosistema</p>
            <h2 id="units-title">Diferentes soluciones<br />para cada necesidad</h2>
          </div>
        </div>
        <div className="container unit-grid">
          {unitPages.map((unit, index) => (
            <Link
              className={`unit-card unit-card-${unit.tone} ${!unit.image ? 'unit-card-graphic' : ''}`}
              to={`/${unit.path}`}
              key={unit.path}
              data-reveal
              style={{ '--reveal-delay': `${index * 70}ms` } as CSSProperties}
            >
              {unit.image ? <img src={unit.image} alt="" loading="lazy" /> : (
                <div className="clean-graphic" aria-hidden="true"><span>+</span><i /><i /><i /></div>
              )}
              <div className="unit-card-overlay" />
              <div className="unit-card-copy">
                <p className="unit-kicker">{unit.kicker}</p>
                <h3><img className="unit-card-logo" src={`/images/gap-${unit.path}-logo.svg`} alt={`GAP ${unit.label}`} /></h3>
                <span className="unit-link">Conocer {unit.label} <b aria-hidden="true">→</b></span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="method-section" id="diferencial" aria-labelledby="method-title">
        <div className="method-image" data-reveal><img src="/images/home-diferencial.webp" alt="Dos hombres conversando junto a la cancha de polo" loading="lazy" /></div>
        <div className="method-copy" data-reveal>
          <p className="eyebrow eyebrow-light">Nuestra forma de trabajar</p>
          <h2 id="method-title">El diferencial<br />está en el vínculo</h2>
          <p className="method-lead">Nuestro trabajo comienza por comprender cada necesidad, brindar asesoramiento y mantenernos presentes durante todo el proceso.</p>
          <div className="principles">
            {workingPrinciples.map((principle) => (
              <article key={principle.title}><span>{principle.number}</span><div><h3>{principle.title}</h3><p>{principle.text}</p></div></article>
            ))}
          </div>
          <p className="method-closing">Una red de soluciones que te acompaña de principio a fin</p>
        </div>
      </section>

      <section className="alliances-section" id="alianzas" aria-labelledby="alliances-title">
        <img className="alliances-symbol" src="/images/agro-polo-isotipo.svg" alt="" aria-hidden="true" />
        <div className="container alliances-inner" data-reveal>
          <div><p className="eyebrow">Alianzas estratégicas</p><h2 id="alliances-title">Una red que suma<br />experiencia y respaldo</h2></div>
          <div className="alliances-copy">
            <p>Grupo Agro Polo trabaja junto a especialistas y empresas del sector para fortalecer sus unidades de negocio y brindar soluciones con conocimiento técnico y acompañamiento.</p>
          </div>
        </div>
        <ul className="container alliance-list" data-reveal>
          {alliances.map((alliance) => (
            <li className="alliance-card" key={alliance.name}>
              <div className="alliance-logo">
                <img src={alliance.logo} alt={alliance.name} width={alliance.logoWidth} height={alliance.logoHeight} loading="lazy" />
              </div>
              <div className="alliance-body">
                <p className="alliance-unit">Aliado de {alliance.unit}</p>
                <h3>{alliance.name}</h3>
                <p>{alliance.description}</p>
                <Link className="alliance-link" to={alliance.unitPath}>Conocé {alliance.unit} <span aria-hidden="true">→</span></Link>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="tour-section" id="tour" aria-labelledby="tour-title">
        <div className="container tour-intro" data-reveal>
          <div className="tour-copy">
            <p className="eyebrow eyebrow-light">Agro Polo Tour</p>
            <h2 id="tour-title">El punto de encuentro<br />de nuestra comunidad</h2>
            <p>Una iniciativa propia que nació alrededor del polo y se convirtió en un espacio de encuentro para productores, empresas y referentes del sector.</p>
            <p>Un lugar para compartir experiencias, construir relaciones de confianza y acercar nuevas oportunidades dentro de la comunidad.</p>
            <blockquote>El polo fue el punto de partida. La comunidad es lo que nos impulsa</blockquote>
            <Link className="button button-pink" to="/agro-polo-tour">Conocé Agro Polo Tour <span aria-hidden="true">→</span></Link>
          </div>
          <div className="tour-main-image"><img src="/images/tour-album-hero.webp" alt="Partido del Agro Polo Tour" loading="lazy" /></div>
        </div>
        <div className="container community-row" data-reveal>
          <div>
            <p className="eyebrow eyebrow-light">Una comunidad activa</p>
            <h3 className="community-slogan"><span>Ser cliente suma+</span><span>Ser parte suma+</span></h3>
          </div>
          <p>Grupo Agro Polo reúne productores, empresas y especialistas y hoy alcanza más de <strong>500.000 hectáreas conectadas</strong>. Cada encuentro amplía la comunidad y acerca nuevas oportunidades.</p>
        </div>
        <div className="tour-gallery" data-reveal aria-label="Galería de Agro Polo Tour">
          <figure><img src="/images/tour-album-noche.webp" alt="Encuentro nocturno del Agro Polo Tour bajo guirnaldas de luces" loading="lazy" /></figure>
          <figure><img src="/images/tour-album-jugada.webp" alt="Jugada de polo durante el Agro Polo Tour" loading="lazy" /></figure>
          <figure><img src="/images/tour-album-casco.webp" alt="Jugador del Agro Polo Tour con su casco y su taco" loading="lazy" /></figure>
        </div>
      </section>

      <section className="contact-cta" aria-labelledby="contact-title">
        <img className="cta-symbol" src="/images/agro-polo-isotipo.svg" alt="" />
        <div className="container cta-inner" data-reveal>
          <div className="cta-primary">
            <h2 id="contact-title">¿Buscás una solución?<br />Hablemos</h2>
            <div className="cta-actions">
              <Link className="button button-pink" to="/contacto">Contactanos <span aria-hidden="true">→</span></Link>
              <a className="button button-ghost" href="#unidades">Ver nuestras soluciones</a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
