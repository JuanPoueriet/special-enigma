# sample-domain (Domain Layer)

## 🧠 Core Logic

This library contains the **Pure Business Logic** for the **Sample** domain. It is the heart of the bounded context.

## 📦 Contents

- **Entities:** Rich domain models with behavior (DDD).
- **Value Objects:** Immutable objects defined by their attributes.
- **Domain Services:** Logic spanning multiple entities.
- **Ports (Interfaces):** Secondary ports for repositories and services (implemented in Infrastructure).

## 🚫 Constraints

- **Zero Dependencies:** Must NOT depend on Application, Infrastructure, or Presentation layers.
- **Framework Agnostic:** No NestJS, MikroORM, or external library dependencies (except utility libraries).
