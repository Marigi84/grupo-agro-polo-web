# Requisitos del sitio institucional

| | |
|---|---|
| **Proyecto** | Sitio institucional de Grupo Agro Polo |
| **Responsable** | Marina Giselle Cordero |
| **Versión** | 1.4 · 5 de noviembre de 2026 |
| **Estado** | Versión 1.0 del sitio publicada en grupoagropolo.com |

Este documento define qué tiene que cumplir el sitio para considerarlo listo para publicar. Lo uso como referencia para tres cosas: alinear con Marketing qué se construye y qué no, revisar cada pull request (propio o de otra herramienta) contra un criterio explícito, y decidir cuándo una ampliación de alcance necesita una conversación aparte.

El cómo (stack, arquitectura, scripts y flujo de ramas) está en el [README](../README.md). Acá solo va el qué y el criterio con el que lo acepto.

---

## Índice

1. [Convenciones](#1-convenciones)
2. [Objetivo y audiencia](#2-objetivo-y-audiencia)
3. [Alcance](#3-alcance)
4. [Requisitos funcionales](#4-requisitos-funcionales)
5. [Requisitos de contenido](#5-requisitos-de-contenido)
6. [Requisitos no funcionales](#6-requisitos-no-funcionales)
7. [Criterios de aceptación de un cambio](#7-criterios-de-aceptación-de-un-cambio)
8. [Pendientes de Marketing](#8-pendientes-de-marketing)
9. [Estado actual frente a los requisitos](#9-estado-actual-frente-a-los-requisitos)
10. [Control de cambios](#10-control-de-cambios)

---

## 1. Convenciones

- Cada requisito tiene un identificador estable (`RF-` funcional, `RC-` contenido, `RNF-` no funcional) para poder citarlo en issues y PRs.
- La prioridad sigue MoSCoW:
  - **Debe**: sin esto el sitio no se publica.
  - **Debería**: importante, pero no bloquea la publicación.
  - **Podría**: mejora deseable si el tiempo y el material lo permiten.
- **⏳ Pendiente** marca un dato o una decisión que depende de Marketing. No se completa con supuestos (ver [RC-03](#5-requisitos-de-contenido)).

## 2. Objetivo y audiencia

**Objetivo.** Que un productor o una empresa del agro conozca a Grupo Agro Polo, entienda qué resuelve cada unidad y pueda iniciar una conversación con el equipo en pocos toques. El sitio no vende online: genera confianza y contacto.

**Audiencia principal.** Productor agropecuario de 40 a 60 años que decide por confianza y recomendación, consulta mayormente desde el celular y muchas veces en el campo (sol directo, conexión irregular). De ese perfil derivo tres prioridades que atraviesan todo el documento:

1. Contacto directo y visible, con WhatsApp como canal principal.
2. Lectura cómoda en el celular: letra grande, textos breves y jerarquía clara.
3. Prueba social: testimonios, aliados y trayectoria verificables.

**Audiencia secundaria.** Frigoríficos y plantas agroindustriales, a los que se dirige **+CLEAN** con un registro más técnico.

**Partes interesadas.**

| Rol | Responsabilidad |
|---|---|
| Responsable del proyecto (yo) | Define prioridades, revisa cada vista previa y aprueba cada merge |
| Marketing | Fuente de verdad de textos, fotografías, logotipos y datos; valida el resultado |
| Herramientas de IA (Claude, ChatGPT) | Implementan cambios en ramas propias, siempre sujetos a revisión |

## 3. Alcance

### Incluido en la primera versión

- Inicio institucional.
- Una página por unidad de negocio: +LABS, +PROTECT, +CLEAN, +EVENTS y +FARMS.
- Agro Polo Tour.
- Información institucional y alianzas.
- Contacto con formulario y WhatsApp.
- Descargables provistos por Marketing.
- SEO y analítica básicos.
- Diseño responsive y animaciones sutiles.

### Fuera de alcance

Precios, e-commerce, cotizador, CMS, blog, buscador, CRM, área de clientes y versiones en otros idiomas. Cualquiera de estos temas se evalúa por separado, con su propio análisis de costo y mantenimiento, y no entra por la puerta de atrás en un PR de otro tema.

## 4. Requisitos funcionales

### Navegación y estructura

| ID | Requisito | Prioridad |
|---|---|---|
| RF-01 | El sitio expone las rutas `/`, `/labs`, `/protect`, `/clean`, `/events`, `/farms`, `/agro-polo-tour` y `/contacto`, más una página 404 para cualquier otra ruta | Debe |
| RF-02 | Toda ruta funciona con acceso directo y al recargar (por ejemplo, un link compartido por WhatsApp), sin devolver 404 del servidor | Debe |
| RF-03 | Header común con navegación principal y submenús Nosotros y Unidades, operable con mouse, toque y teclado | Debe |
| RF-04 | En el celular, el menú ocupa todo el ancho, los submenús se despliegan y se cierran, y el botón indica si el menú está abierto o cerrado | Debe |
| RF-05 | Footer común con navegación, datos de contacto y enlaces a redes | Debe |
| RF-06 | Los enlaces internos navegan sin recargar el sitio completo | Debería |

### Contacto

| ID | Requisito | Prioridad |
|---|---|---|
| RF-10 | Acceso a WhatsApp visible en todas las páginas, con el número comercial y un mensaje precargado | Debe |
| RF-11 | Mientras no haya número confirmado, el botón de WhatsApp no se muestra como un control roto o desactivado | Debe |
| RF-12 | Página de Contacto con WhatsApp, teléfono con enlace `tel:`, correo y un formulario corto: nombre, teléfono, unidad de interés y mensaje | Debe |
| RF-13 | El formulario valida los campos obligatorios, informa el error junto al campo y confirma el envío. ⏳ Pendiente: destino de los envíos | Debe |
| RF-14 | Cada página de unidad cierra con una llamada a la acción que lleva al contacto | Debe |
| RF-15 | Nombres y foto de las personas de contacto comercial. ⏳ Pendiente: autorización | Debería |

### Unidades de negocio

| ID | Requisito | Prioridad |
|---|---|---|
| RF-20 | Cada página de unidad presenta su propuesta, sus soluciones u opciones, la forma de trabajo y el contacto | Debe |
| RF-21 | Las secciones de opciones de +LABS, +PROTECT, +EVENTS y +FARMS usan el mismo componente de lista desplegable (`SolutionExplorer`), con un comportamiento consistente entre páginas | Debe |
| RF-22 | +CLEAN mantiene una estructura propia y un tono técnico, orientado a planta industrial | Debe |
| RF-23 | Cada unidad muestra a su aliado cuando Marketing lo autorice. ✅ AKO (+LABS) y LM Seguros (+PROTECT) en la sección Alianzas del inicio | Debería |

### Agro Polo Tour

| ID | Requisito | Prioridad |
|---|---|---|
| RF-30 | Página con la historia del Tour (Nace / Crece / Continúa) y galería de fotos | Debe |
| RF-31 | La galería muestra únicamente fotos aprobadas por Marketing, cada una completa y en su proporción original | Debe |
| RF-32 | La galería admite sumar fotos sin cambios de diseño | Podría |

### Descargables, SEO y analítica

| ID | Requisito | Prioridad |
|---|---|---|
| RF-40 | Descarga de los materiales que Marketing provea (brochure institucional y fichas por unidad). Marketing solo tiene catálogos de +PROTECT y +LABS (30/10/2026) | Debería |
| RF-41 | Cada ruta tiene título y descripción propios | Debe |
| RF-42 | Favicon y vista previa al compartir (Open Graph) con imagen y logo, para que el link se vea bien en WhatsApp | Debe |
| RF-43 | Analítica básica de visitas y de clics en WhatsApp y en el envío del formulario. ⏳ Pendiente: herramienta y cuenta | Debería |
| RF-44 | `sitemap.xml` y `robots.txt` publicados con el dominio final. ⏳ Pendiente: dominio | Debería |

## 5. Requisitos de contenido

| ID | Requisito | Prioridad |
|---|---|---|
| RC-01 | Marketing es la fuente de verdad de textos, fotos, logotipos y datos. El material de base es el de la carpeta de Marketing en Google Drive: brochure comentado, buyer personas, manual de identidad y estrategia de comunicación | Debe |
| RC-02 | Cada página respeta el prototipo o la referencia visual aprobada, sin reinterpretaciones | Debe |
| RC-03 | No se publican datos sin confirmar. Cifras, aliados, nombres y contactos pendientes se marcan como tales y no se completan con supuestos | Debe |
| RC-04 | Ante un cambio de cifra pedido por Marketing se modifica solo el dato, sin reescribir el texto que lo contiene | Debe |
| RC-05 | Tono cercano, claro y concreto, en español rioplatense con voseo, sin tecnicismos innecesarios ni promesas de resultados. +CLEAN es la excepción en el registro técnico | Debe |
| RC-06 | Títulos y slogans sin punto final. El slogan es "Ser cliente suma+ / Ser parte suma+", en dos líneas | Debe |
| RC-07 | Fotografías y logotipos se muestran completos, sin recortes; la proporción de cada pieza define su contenedor | Debe |
| RC-08 | Fotografías principales y logotipos de cada unidad son los provistos por Marketing, en WebP y SVG respectivamente | Debe |
| RC-09 | Ninguna imagen se elimina hasta contar con su reemplazo definitivo | Debe |
| RC-10 | Sin líneas fucsias sobre fotografías o secciones, sin fondos beige rosados y con uso medido del rosa | Debe |
| RC-11 | No se usan el isotipo animado, el isotipo 3D con scroll ni el semicírculo en Alianzas | Debe |
| RC-12 | El público no ve carteles de "en construcción" ni textos internos. Mientras falte contenido, la sección se oculta o se reduce al contacto | Debe |
| RC-13 | Testimonios breves de productores, con nombre y zona. ⏳ Pendiente: textos y autorización | Debería |
| RC-14 | El sitio no promete un lugar en el Agro Polo Tour por ser cliente. La mención de beneficios exclusivos queda sujeta a confirmación. ⏳ Pendiente | Debe |

## 6. Requisitos no funcionales

### Legibilidad y diseño responsive

| ID | Requisito | Criterio de verificación | Prioridad |
|---|---|---|---|
| RNF-01 | Diseño mobile first, sin desplazamiento horizontal | Sin scroll horizontal entre 360 px y 1920 px de ancho | Debe |
| RNF-02 | Tamaño de letra legible en el celular | Texto de lectura y botones ≥ 16 px; etiquetas y textos secundarios ≥ 13 px | Debe |
| RNF-03 | Áreas táctiles cómodas | Botones y enlaces principales ≥ 44 × 44 px | Debe |
| RNF-04 | El hero de cada página entra en la primera pantalla | Sin superar un 10 % adicional del alto visible, en celular y escritorio | Debería |
| RNF-05 | Los elementos flotantes no tapan contenido | El botón de WhatsApp no superpone texto de lectura en 360 px | Debe |

### Accesibilidad

Objetivo: WCAG 2.1 nivel AA.

| ID | Requisito | Prioridad |
|---|---|---|
| RNF-10 | HTML semántico: un `h1` por página, jerarquía de títulos sin saltos y landmarks (`header`, `nav`, `main`, `footer`) | Debe |
| RNF-11 | Contraste mínimo de 4,5:1 en texto normal y 3:1 en texto grande, también sobre fotografías | Debe |
| RNF-12 | Navegación completa con teclado y foco siempre visible | Debe |
| RNF-13 | Desplegables y menús con `aria-expanded` y `aria-controls`; acordeones con contenido oculto también para lectores de pantalla | Debe |
| RNF-14 | Imágenes informativas con texto alternativo descriptivo; las decorativas con `alt=""` | Debe |
| RNF-15 | Animaciones sutiles que respetan `prefers-reduced-motion`; nada que se mueva indefinidamente en primer plano | Debe |
| RNF-16 | Campos del formulario con etiqueta visible y mensajes de error asociados al campo | Debe |

### Rendimiento

Medido con Lighthouse en modo celular sobre la vista previa de Vercel.

| ID | Requisito | Prioridad |
|---|---|---|
| RNF-20 | Largest Contentful Paint ≤ 2,5 s, Cumulative Layout Shift ≤ 0,1 e Interaction to Next Paint ≤ 200 ms | Debería |
| RNF-21 | Fotografías en WebP, dimensionadas para su uso y con `width` y `height` declarados; carga diferida fuera de la primera pantalla | Debe |
| RNF-22 | Tipografía servida desde el propio sitio y precargada desde `index.html`, no con `@import` en CSS | Debería |
| RNF-23 | JavaScript inicial ≤ 150 KB comprimido | Debería |

### Compatibilidad

| ID | Requisito | Prioridad |
|---|---|---|
| RNF-30 | Últimas dos versiones de Chrome, Safari, Edge y Firefox, en escritorio y celular | Debe |
| RNF-31 | Validación final en un celular real con Chrome para Android | Debe |

### Calidad, seguridad y operación

| ID | Requisito | Prioridad |
|---|---|---|
| RNF-40 | Typecheck, lint, tests y build sin errores antes de abrir cada PR | Debe |
| RNF-46 | GitHub Actions corre typecheck, lint, tests y build en cada PR y en cada push a `main` (`.github/workflows/ci.yml`) | Debe |
| RNF-41 | Cada PR genera una vista previa en Cloudflare Pages (`*.pages.dev`) accesible sin autenticación | Debe |
| RNF-42 | Tests de comportamiento para lo que impacta en el contacto: link de WhatsApp, formulario y navegación del menú | Debe |
| RNF-43 | Sitio servido solo por HTTPS | Debe |
| RNF-44 | Ninguna credencial ni dato personal versionado en el repositorio | Debe |
| RNF-45 | El formulario incluye protección básica contra spam y avisa qué se hace con los datos enviados, conforme a la Ley 25.326 de Protección de Datos Personales | Debe |

## 7. Criterios de aceptación de un cambio

Un PR está listo para merge cuando cumple todo lo siguiente. Aplica a cualquier autor, persona o herramienta.

- [ ] Resuelve un solo tema y cita los requisitos que toca (por ejemplo, `RF-12`, `RNF-02`).
- [ ] Respeta el prototipo o la referencia aprobada y los requisitos de contenido de la sección 5.
- [ ] No introduce datos sin confirmar ni elimina imágenes sin reemplazo.
- [ ] Pasa `npm run typecheck && npm run lint && npm test && npm run build`, y el check de CI del PR está en verde.
- [ ] Incluye el link a la vista previa de Cloudflare Pages y fue revisado en un celular real.
- [ ] No suma funcionalidades fuera de alcance.
- [ ] Tiene mi aprobación explícita para ese PR en particular.

Si un PR de ChatGPT o de otra herramienta no cumple alguno de estos puntos, se comenta con el ID del requisito incumplido en lugar de reescribirlo en otra rama.

## 8. Pendientes de Marketing

| Tema | Detalle | Requisitos afectados |
|---|---|---|
| Contactos comerciales | ✅ Resuelto (04/11/2026): el sitio usa solo el número y el correo de la empresa, sin contactos personales | RF-15 |
| Correos y redes | ✅ Resuelto (04/11/2026): `info@grupoagropolo.com` funciona con el dominio de la empresa | RF-05, RF-12 |
| Destino del formulario | ✅ Resuelto (04/11/2026): el formulario arma la consulta y abre WhatsApp | RF-13 |
| Aliados | AKO y LM Seguros confirmados (29/10/2026). Falta Bayer (+EVENTS) | RF-23 |
| Hectáreas | El sitio dice 500.000; otro documento interno menciona 600.000 | RC-03, RC-04 |
| Trayectoria de LM Seguros | Su presentación y su web dicen más de 45 años (se usa 45); el brochure decía 40 | RC-03 |
| Dominio final | ✅ Resuelto (04/11/2026): `grupoagropolo.com`, de la empresa, servido por Cloudflare Pages | RF-44, RNF-43 |
| Testimonios | Frases de productores con nombre, zona y autorización | RC-13 |
| Beneficios del Tour | Qué se puede decir sobre beneficios para clientes | RC-14 |
| Fotos definitivas | +CLEAN: antes/después (2 de 2560 × 1090 px) y Dónde trabajamos (1920 × 1200 px). +EVENTS no suma más fotos (30/10/2026) | RC-08 |
| Analítica | Se usa Cloudflare Web Analytics. Si Marketing quiere medir clics en WhatsApp y en el formulario, se suma Google Analytics con cuenta de la empresa y aviso de privacidad | RF-43 |

## 9. Estado actual frente a los requisitos

Relevado sobre `main` al 5 de noviembre de 2026.

| Área | Estado | Comentario |
|---|---|---|
| Rutas, 404 y acceso directo (RF-01, RF-02) | ✅ Cumple | El build genera un HTML por ruta que Cloudflare Pages sirve sin barra final, y `404.html` devuelve estado 404 |
| Menú en el celular (RF-04) | ✅ Cumple | Submenús que se despliegan y cierran (#34) |
| Páginas de unidades y Tour (RF-20 a RF-31) | ✅ Cumple | Con la devolución de Marketing de octubre aplicada (#27 a #37) |
| Contenido y estilo (RC-02, RC-06 a RC-11) | ✅ Cumple | Sin líneas fucsias, fotos y logotipos completos |
| WhatsApp (RF-10, RF-11) | ✅ Cumple | El botón flotante abre el chat con el número de la empresa (+54 9 351 572-1881, Marketing 04/11/2026) con un mensaje precargado; si se borra el número, el botón no se muestra |
| Contacto (RF-12, RF-13) | ✅ Cumple | WhatsApp y teléfono de la empresa (+54 9 351 572-1881), correo info@grupoagropolo.com, los dos Instagram y formulario de 4 campos con errores junto a cada campo. Solo datos de la empresa, sin contactos personales. El formulario abre WhatsApp con la consulta armada, sin envío a info@ (decisión del 04/11/2026). Sin mapa ni texto de confirmación propio (Marketing, 04/11/2026) |
| Carteles internos (RC-12) | ✅ Cumple | Alianzas muestra AKO y LM Seguros (#56) y se borró la página provisoria que ya no usaba ninguna ruta. |
| Letra en el celular (RNF-02) | ✅ Cumple | Hasta 900 px de ancho, botones y texto de lectura en 16 px y etiquetas en 13 px como mínimo |
| SEO por ruta y vista previa al compartir (RF-41, RF-42) | ✅ Cumple | Título, descripción e imagen para compartir por ruta, favicon, con las URLs en el dominio final |
| Tipografía (RNF-22) | ✅ Cumple | Montserrat se sirve desde `/fonts` y se precarga desde `index.html`, sin esperar a Google Fonts |
| Descargables (RF-40) | ✅ Cumple | Catálogos PDF de +PROTECT y +LABS en el cierre de cada página (#57). Las demás unidades no tienen |
| Fotos de Marketing (RC-08) | ⏳ Parcial | Fotos nuevas en Inicio, +LABS, +PROTECT, +EVENTS, +FARMS y Tour (#59 a #62). Faltan las de +CLEAN |
| Analítica y sitemap (RF-43, RF-44) | ✅ Cumple | `sitemap.xml` y `robots.txt` con el dominio final y Search Console dado de alta (#70). La política de seguridad habilita Cloudflare Web Analytics |
| Contraste (RNF-11) | ✅ Cumple | Auditoría Lighthouse en celular del 20/10/2026: pie de página y etiqueta de +FARMS corregidos; accesibilidad 100 en todas las páginas salvo el Tour (96, por la palabra gigante decorativa de fondo) |
| Fotos para celular (RNF-21) | ✅ Cumple | Las fotos principales tienen una versión liviana para pantallas de hasta 620 px |
| Velocidad (RNF-20) | ⏳ Parcial | Rendimiento entre 89 y 99. La foto o el título principal aparece entre 1,9 y 3,4 s; para bajar de 2,5 s en todas haría falta que el texto llegue armado en el HTML y no esperar al JavaScript |

Lo que queda pendiente depende del material de Marketing (fotos de +CLEAN, testimonios) o es una mejora de velocidad.

## 10. Control de cambios

Este documento se versiona junto con el código. Todo cambio de alcance o de prioridad pasa por un PR que modifica este archivo, con su motivo.

| Versión | Fecha | Cambio |
|---|---|---|
| 1.0 | 13/10/2026 | Primera versión |
| 1.1 | 13/10/2026 | Agrego RNF-46: integración continua con GitHub Actions |
| 1.2 | 20/10/2026 | RNF-22: la tipografía pasa a servirse desde el propio sitio, porque Google Fonts frenaba la primera pantalla 1,2 s en celular |
| 1.3 | 30/10/2026 | Estado al 30/10: RC-12 y RF-40 cumplidos; pendientes de Marketing actualizados (dominio `.com.ar`, correo, Cloudflare, analítica, fotos de +CLEAN) |
| 1.4 | 05/11/2026 | Estado al publicar la versión 1.0: dominio, correo, contacto y sitemap resueltos |

---

**Autora:** Marina Giselle Cordero
