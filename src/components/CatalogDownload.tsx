import type { UnitCatalog } from '../data/site'

type CatalogDownloadProps = {
  catalog: UnitCatalog
}

export function CatalogDownload({ catalog }: CatalogDownloadProps) {
  if (!catalog.file) return null

  return (
    <a
      className="button button-ghost catalog-download"
      href={catalog.file}
      download={catalog.fileName}
      aria-label={`Descargar el catálogo de ${catalog.unit} en PDF${catalog.size ? `, ${catalog.size}` : ''}`}
    >
      Descargar catálogo
      <small>
        PDF{catalog.size && <span className="catalog-download-size"> · {catalog.size}</span>}
      </small>
      <span aria-hidden="true">↓</span>
    </a>
  )
}
