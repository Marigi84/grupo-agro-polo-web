import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { unitCatalogs } from '../data/site'
import { CatalogDownload } from './CatalogDownload'

afterEach(cleanup)

describe('catálogos descargables', () => {
  it('no muestra el botón mientras no esté el PDF', () => {
    render(<CatalogDownload catalog={{ unit: '+LABS', file: null, fileName: 'x.pdf', size: null }} />)
    expect(screen.queryByRole('link', { name: /catálogo/i })).not.toBeInTheDocument()
  })

  it('descarga el PDF con su nombre y avisa el peso', () => {
    render(
      <CatalogDownload
        catalog={{ unit: '+PROTECT', file: '/catalogos/protect.pdf', fileName: 'Catalogo.pdf', size: '4 MB' }}
      />,
    )
    const link = screen.getByRole('link', { name: /descargar el catálogo de \+protect en pdf, 4 mb/i })
    expect(link).toHaveAttribute('href', '/catalogos/protect.pdf')
    expect(link).toHaveAttribute('download', 'Catalogo.pdf')
  })

  it('cada catálogo cargado existe en public', () => {
    const published = Object.keys(import.meta.glob('/public/catalogos/*.pdf', { query: '?url' }))
    for (const catalog of Object.values(unitCatalogs)) {
      if (catalog.file) expect(published).toContain(`/public${catalog.file}`)
    }
  })
})
