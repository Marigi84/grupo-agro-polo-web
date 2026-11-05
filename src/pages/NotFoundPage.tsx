import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <section className="page-intro">
      <div className="container narrow-container">
        <p className="eyebrow">Error 404</p>
        <h1>Página no encontrada</h1>
        <p>La dirección ingresada no corresponde a una sección disponible.</p>
        <Link className="button button-primary" to="/">
          Volver al inicio
        </Link>
      </div>
    </section>
  )
}
