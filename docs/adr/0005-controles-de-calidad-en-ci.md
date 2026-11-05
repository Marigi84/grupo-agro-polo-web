# ADR 0005 · Mismos controles de calidad en local y en CI

- **Estado:** Aceptada
- **Fecha:** octubre de 2026

## Contexto

En el repositorio trabajan varias herramientas (una persona y asistentes de IA), cada una en su rama. Hacía falta un criterio objetivo e igual para todos antes de integrar un cambio.

## Decisión

- Antes de abrir un PR se corre `npm run typecheck && npm run lint && npm test && npm run build`.
- GitHub Actions (`.github/workflows/ci.yml`) repite esos mismos pasos en cada PR y en cada push a `main`. Un PR en rojo no se integra.
- Dependabot propone actualizaciones de dependencias y de acciones, agrupadas, y pasan por el mismo CI.

## Consecuencias

- Los errores de tipos, de lint o de build aparecen antes de llegar a producción.
- Cada actualización de dependencias se prueba antes de mergearse.
- El merge sigue siendo una decisión humana, con la vista previa revisada en el celular.
