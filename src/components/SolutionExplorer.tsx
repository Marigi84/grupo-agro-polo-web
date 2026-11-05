import { useEffect, useRef, useState, type ReactNode } from 'react'

export type ExplorerItem = {
  id: string
  label: string
  title: string
  description: string
  image: string
  alt: string
  // Fotos que ya vienen oscurecidas: el velo de la sección se baja para no apagarlas de más
  lightOverlay?: boolean
}

type SolutionExplorerProps = {
  id: string
  title: string
  items: ExplorerItem[]
  footer?: ReactNode
}

// Listado con foto que usan todas las unidades (formato del explorador de +LABS)
export function SolutionExplorer({ id, title, items, footer }: SolutionExplorerProps) {
  const [activeId, setActiveId] = useState(items[0].id)
  const sectionRef = useRef<HTMLElement>(null)
  const active = items.find((item) => item.id === activeId) ?? items[0]
  const titleId = `${id}-title`

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    if (!('IntersectionObserver' in window)) {
      section.classList.add('is-in-view')
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        section.classList.add('is-in-view')
        observer.disconnect()
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' },
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      className={`labs-explorer ${items.length > 4 ? 'labs-explorer-compact' : ''}`}
      id={id}
      aria-labelledby={titleId}
      ref={sectionRef}
    >
      <div className="container labs-explorer-grid">
        <div className="labs-explorer-copy">
          <h2 id={titleId}>{title}</h2>

          <div className="labs-solution-list">
            {items.map((item) => {
              const isActive = item.id === activeId
              return (
                <div className={`labs-solution-item ${isActive ? 'is-active' : ''}`} key={item.id}>
                  <h3>
                    <button
                      type="button"
                      id={`${id}-toggle-${item.id}`}
                      aria-expanded={isActive}
                      aria-controls={`${id}-panel-${item.id}`}
                      onClick={() => setActiveId(item.id)}
                    >
                      <span>{item.label}</span>
                      <strong>{item.title}</strong>
                      <b aria-hidden="true">
                        {isActive ? (
                          <>
                            <i className="labs-icon-desktop">→</i>
                            <i className="labs-icon-mobile">−</i>
                          </>
                        ) : (
                          '+'
                        )}
                      </b>
                    </button>
                  </h3>
                  <div
                    className={`labs-solution-panel ${item.lightOverlay ? 'is-light-overlay' : ''}`}
                    id={`${id}-panel-${item.id}`} hidden={!isActive}>
                    <img src={item.image} alt={item.alt} loading="lazy" />
                    <div>
                      <p>{item.description}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {footer}
        </div>

        <div className={`labs-solution-stage ${active.lightOverlay ? 'is-light-overlay' : ''}`} aria-hidden="true">
          <div className="labs-solution-images">
            {items.map((item) => (
              <img
                className={item.id === activeId ? 'is-active' : ''}
                src={item.image}
                alt=""
                key={item.id}
                loading="lazy"
              />
            ))}
          </div>
          <div className="labs-solution-caption" key={active.id}>
            <span>{active.label}</span>
            <strong>{active.title}</strong>
            <p>{active.description}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
