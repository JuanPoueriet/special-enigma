# Changelog - Accounting Domain

All notable changes to this project will be documented in this file.

## [Unreleased]
### Fixed
- Fixed `@nx/enforce-module-boundaries` violation in `testing/contract/api-contracts.spec.ts`.

### Added
- Created mandatory directories for standard v2.0 compliance in `infrastructure`, `presentation`, and `ui` layers.
- Added minimal real implementation for `testing/e2e`, `testing/performance`, and `testing/security`.
- Formalized application ports with `UseCase` and `ExternalServicePort`.
- Added `DomainEvent` base interface in `domain` layer.
- Added `LoggerPort` and `DefaultLogger` in `infrastructure/observability`.
- Added `TenantResolver` in `infrastructure/tenancy`.

### Changed
- Improved standard v2.0 alignment for the accounting domain.
