import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { usePageMeta } from '../../app/usePageMeta'
import { companyNavigation, contactEmail, contactPhone, contactWhatsapp, contactWhatsappHref, unitPages } from '../../data/site'

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle className="icon-fill" cx="17.4" cy="6.8" r="1" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.5 11.7a8.45 8.45 0 0 1-12.42 7.45L3.5 20.5l1.34-4.43A8.5 8.5 0 1 1 20.5 11.7Z" />
      <path d="M8.1 7.7c.2-.45.42-.46.72-.47h.6c.18 0 .35.08.45.34l.7 1.7c.1.24.05.43-.08.62l-.55.7c-.14.16-.14.3-.03.5.62 1.08 1.52 1.96 2.62 2.56.2.11.34.09.5-.09l.72-.83c.17-.2.37-.25.62-.15l1.7.8c.25.12.36.29.33.52-.12.86-.6 1.57-1.25 1.82-.56.22-1.3.31-2.77-.3-1.3-.54-2.58-1.47-3.56-2.56-.88-.98-1.7-2.27-2.02-3.38-.3-1.04.02-1.55.34-1.78Z" />
    </svg>
  )
}

export function SiteLayout() {
  const location = useLocation()
  usePageMeta(location.pathname)
  const [scrolled, setScrolled] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  // Después de elegir una opción, el desplegable se oculta hasta que el mouse sale de él
  const [dropdownsHidden, setDropdownsHidden] = useState(false)
  // En el menú del celular, Nosotros y Unidades se abren y cierran como acordeón
  const [expandedDropdown, setExpandedDropdown] = useState<string | null>(null)
  // Páginas con hero oscuro a pantalla completa: la barra arranca transparente
  const hasOverlayHeader = ['/', '/labs', '/protect', '/clean', '/events', '/farms', '/agro-polo-tour', '/contacto'].includes(location.pathname)
  // Páginas con hero claro: la barra transparente usa el logo y los textos oscuros
  const hasLightHero = location.pathname === '/agro-polo-tour'
  const isOverlay = hasOverlayHeader && !scrolled && !(hasLightHero && menuOpen)
  const isLightOverlay = isOverlay && hasLightHero

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
      setShowBackToTop(window.scrollY > 500)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [location.pathname])

  function toggleDropdown(name: string) {
    setExpandedDropdown((current) => (current === name ? null : name))
  }

  function closePanels() {
    setMenuOpen(false)
    setExpandedDropdown(null)
    setDropdownsHidden(true)
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur()
  }

  return (
    <div className="site-shell">
      <header className={`site-header ${isOverlay ? 'is-overlay' : 'is-solid'}${isLightOverlay ? ' is-overlay-light' : ''}`}>
        <div className="container header-inner">
          <Link className="wordmark" to="/" aria-label="Grupo Agro Polo, inicio">
            <img src={isLightOverlay ? '/images/agro-polo-logo-dark.svg' : '/images/agro-polo-logo-light.svg'} alt="Grupo Agro Polo" />
          </Link>

          <button
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
            onClick={() => {
              setMenuOpen((open) => !open)
              setExpandedDropdown(null)
            }}
          >
            <span />
            <span />
            <span />
            <span className="sr-only">Abrir menú</span>
          </button>

          <nav id="main-navigation" className={menuOpen ? 'is-open' : ''} aria-label="Navegación principal">
            <ul className="navigation-list">
              <li><NavLink className="navigation-link" to="/" end onClick={closePanels}>Inicio</NavLink></li>
              <li className={`navigation-dropdown${dropdownsHidden ? ' is-hidden' : ''}${expandedDropdown === 'nosotros' ? ' is-expanded' : ''}`} onMouseLeave={() => setDropdownsHidden(false)}>
                <button
                  className="navigation-link dropdown-trigger"
                  type="button"
                  aria-expanded={expandedDropdown === 'nosotros'}
                  aria-controls="menu-nosotros"
                  onClick={() => toggleDropdown('nosotros')}
                >
                  Nosotros <span aria-hidden="true">⌄</span>
                </button>
                <div className="dropdown-panel" id="menu-nosotros">
                  <p>Grupo Agro Polo</p>
                  {companyNavigation.map((item) => (
                    <a href={item.path} key={item.path} onClick={closePanels}>{item.label}<ArrowIcon /></a>
                  ))}
                </div>
              </li>
              <li className={`navigation-dropdown${dropdownsHidden ? ' is-hidden' : ''}${expandedDropdown === 'unidades' ? ' is-expanded' : ''}`} onMouseLeave={() => setDropdownsHidden(false)}>
                <button
                  className="navigation-link dropdown-trigger"
                  type="button"
                  aria-expanded={expandedDropdown === 'unidades'}
                  aria-controls="menu-unidades"
                  onClick={() => toggleDropdown('unidades')}
                >
                  Unidades <span aria-hidden="true">⌄</span>
                </button>
                <div className="dropdown-panel units-dropdown" id="menu-unidades">
                  <p>Nuestro ecosistema</p>
                  {unitPages.map((unit) => (
                    <Link to={`/${unit.path}`} key={unit.path} onClick={closePanels}>{unit.label}<ArrowIcon /></Link>
                  ))}
                </div>
              </li>
              <li><NavLink className="navigation-link" to="/agro-polo-tour" onClick={closePanels}>Agro Polo Tour</NavLink></li>
              <li><NavLink className="navigation-link" to="/contacto" onClick={closePanels}>Contacto</NavLink></li>
            </ul>
          </nav>

          <div className="header-tools">
            <a className="icon-button" href="https://www.instagram.com/grupoagropolo/" target="_blank" rel="noreferrer" aria-label="Instagram de Grupo Agro Polo">
              <InstagramIcon />
            </a>
          </div>
        </div>
      </header>

      <main id="contenido-principal"><Outlet /></main>

      {contactWhatsapp.number && (
        <a
          className="whatsapp-button"
          href={contactWhatsappHref()}
          target="_blank"
          rel="noreferrer"
          aria-label="Escribinos por WhatsApp"
        >
          <WhatsAppIcon />
          <span>Escribinos por WhatsApp</span>
        </a>
      )}

      <button
        className={`back-to-top ${showBackToTop ? 'is-visible' : ''}`}
        type="button"
        aria-label="Volver al inicio de la página"
        title="Volver arriba"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <span aria-hidden="true">↑</span>
      </button>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <img src="/images/agro-polo-logo-light.svg" alt="Grupo Agro Polo" />
            <p>Soluciones para el agro. Relaciones que generan oportunidades.</p>
          </div>
          <div className="footer-column">
            <p className="footer-title">Explorá</p>
            <a href="/#nosotros">Nosotros</a>
            <a href="/#unidades">Unidades</a>
            <Link to="/agro-polo-tour">Agro Polo Tour</Link>
            <Link to="/contacto">Contacto</Link>
          </div>
          <div className="footer-column">
            <p className="footer-title">Conectá</p>
            <a href={`tel:${contactPhone.tel}`}>{contactPhone.display}</a>
            <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
            <a href="https://www.instagram.com/grupoagropolo/" target="_blank" rel="noreferrer">@grupoagropolo</a>
            <a href="https://www.instagram.com/agropolotour/" target="_blank" rel="noreferrer">@agropolotour</a>
          </div>
        </div>
        <div className="container footer-bottom">
          <p>© {new Date().getFullYear()} Grupo Agro Polo</p>
          <a href="#contenido-principal">Volver arriba ↑</a>
        </div>
      </footer>
    </div>
  )
}
