# Migration Guide: Accounting Domain

## Context
This domain is being migrated to the standardized architecture defined in `docs/architecture/GUIA_MIGRACION_DOMINIOS_V2.md`.

## Progress
- [x] Phase 1: Structural Alignment
  - [x] Metadata files (README, OWNERS, CHANGELOG)
  - [ ] Canonical folder structure for Domain
  - [ ] Canonical folder structure for Application
  - [ ] Canonical folder structure for Contracts
  - [ ] Canonical folder structure for Infrastructure
  - [ ] Canonical folder structure for Presentation
  - [ ] Canonical folder structure for UI
- [ ] Phase 2: Enforcement
- [ ] Phase 3: Hardening

## Specific Notes
- Migrated from a flatter structure to the new layered approach.
- MikroORM schemas moved to Infrastructure.
- DTOs moved to Contracts.
