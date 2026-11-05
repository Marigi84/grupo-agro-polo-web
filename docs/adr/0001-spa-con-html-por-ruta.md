# ADR 0001 · SPA con React y un HTML por ruta generado en el build

- **Estado:** Aceptada
- **Fecha:** octubre de 2026

## Contexto

El sitio tiene ocho páginas, sin datos dinámicos ni área privada. Necesita algo fácil de mantener sin CMS. Cada página tiene que tener su propio título, su descripción y su imagen para compartir, porque los enlaces circulan por WhatsApp y los buscadores tienen que indexarlas. En una SPA pura, todas las rutas devuelven el mismo `index.html`, así que la vista previa de WhatsApp muestra siempre los datos del inicio.

## Decisión

- React 19 + TypeScript con Vite y React Router.
- Un plugin propio de Vite (`vite.config.ts`) toma los datos de `src/data/seo.ts` al terminar el build y escribe un HTML por ruta (`labs.html`, `protect.html`…), cada uno con sus metaetiquetas. También genera `404.html`, `sitemap.xml` y `robots.txt`.
- Un test controla que toda ruta nueva tenga su título, su descripción y su imagen.

## Alternativas descartadas

- **Next.js o Astro con SSR/SSG:** resuelven lo mismo, pero suman un framework y un runtime para un sitio de ocho páginas.
- **Prerender con navegador headless:** es más pesado en CI y más frágil.

## Consecuencias

- El hosting sirve archivos estáticos, sin servidor.
- Sumar una ruta implica agregarla en `seo.ts`, y el test lo recuerda.
- El contenido se dibuja con JavaScript. Para bajar el tiempo de la primera pintura en todas las páginas haría falta prerenderizar el HTML del contenido (queda como mejora futura).
