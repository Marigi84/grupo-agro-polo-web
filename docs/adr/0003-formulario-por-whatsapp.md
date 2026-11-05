# ADR 0003 · El formulario de contacto abre WhatsApp en vez de enviar un correo

- **Estado:** Aceptada
- **Fecha:** noviembre de 2026

## Contexto

El público principal son productores agropecuarios de 40 a 60 años que prefieren el contacto directo, y la empresa atiende las consultas por WhatsApp. Mandar el formulario por correo requiere un backend o un servicio de terceros (con claves, límites y mantenimiento) para un sitio que por lo demás es estático.

## Decisión

El formulario valida los campos en el navegador, arma un mensaje con la consulta y abre `wa.me` con el número de la empresa. No se envía nada a un servidor.

## Alternativas descartadas

- **Servicios de formularios por correo (Web3Forms, Resend, etc.):** suman una dependencia externa y una clave para algo que el público no usa como canal principal.

## Consecuencias

- No hay backend, ni secretos, ni datos personales guardados por el sitio.
- La consulta llega al mismo canal donde la empresa ya responde.
- Quien no tenga WhatsApp tiene a la vista el teléfono y el correo.
