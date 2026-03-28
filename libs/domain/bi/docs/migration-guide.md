# Guía de Migración del Dominio BI

## Estado de la Migración
- [x] Estructura de carpetas inicial.
- [x] Documentación base (README, OWNERS, CHANGELOG).
- [x] Migración de la capa Domain.
- [x] Migración de la capa Application.
- [x] Migración de la capa Contracts.
- [x] Migración de la capa Infrastructure.
- [x] Migración de la capa Presentation.

## Cambios Realizados
- Siguiendo el INFORME ARQUITECTÓNICO DEFINITIVO v2.0.
- Perfil asignado: `service-domain`.
- Implementación de Clean Architecture + DDD.
- Organización por Bounded Contexts internos (Reporting, Dashboard).
- Implementación de Handlers con comandos y consultas (CQRS).
- Configuración de módulos NestJS para cada capa.
- Mapeo de persistencia con MikroORM decorado en la entidad.
- Definición de contratos versionados (v1).
