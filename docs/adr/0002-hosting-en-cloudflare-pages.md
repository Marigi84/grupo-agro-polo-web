# ADR 0002 · Hosting en Cloudflare Pages en lugar de Vercel

- **Estado:** Aceptada (reemplaza el uso de Vercel durante el desarrollo)
- **Fecha:** noviembre de 2026

## Contexto

Durante el desarrollo el sitio se publicó en Vercel, con una vista previa por pull request para que Marketing revisara cada cambio. Pero el plan gratuito de Vercel (Hobby) no permite uso comercial, y el sitio es de una empresa. Además, el dominio definitivo se administra en Cloudflare.

## Decisión

Publicar en Cloudflare Pages, conectado al repositorio:

- `main` se despliega en producción (`grupoagropolo.com`, con redirección 301 de `www` al dominio raíz).
- Cada pull request genera una vista previa en `*.pages.dev`, marcada con `X-Robots-Tag: noindex`.
- Los encabezados de seguridad (CSP, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`) se definen en `public/_headers`.
- Cloudflare sirve `labs.html` en `/labs` sin reglas de reescritura, así que se eliminó `vercel.json`.

## Consecuencias

- Sin costo de hosting para la clienta, y el DNS y el sitio quedan en el mismo proveedor.
- Se mantiene el circuito de revisión con vista previa por PR.
- La analítica puede ser Cloudflare Web Analytics, sin cookies.
