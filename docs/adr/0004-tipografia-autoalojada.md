# ADR 0004 · Tipografía alojada en el propio sitio

- **Estado:** Aceptada
- **Fecha:** octubre de 2026

## Contexto

La identidad de marca usa Montserrat. Cargarla desde Google Fonts sumaba conexiones a otros dominios, y en las mediciones con Lighthouse en celular demoraba la primera pantalla alrededor de 1,2 s.

## Decisión

Servir Montserrat desde `public/fonts` (un solo archivo WOFF2 con el subconjunto latino) y precargarla desde `index.html`.

## Consecuencias

- La primera pantalla carga más rápido en celular y no depende de un tercero.
- Para actualizar la fuente hay que reemplazar el archivo a mano.
