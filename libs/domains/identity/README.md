# Identity Domain

## 🌐 Overview
The **Identity** domain is a core business module of the Virteex ERP system. It follows a strict **Clean Architecture** and **Domain-Driven Design (DDD)** approach, separated into distinct layers to ensure scalability, maintainability, and testability.

## 📂 Layer Structure

### 1. [Domain Layer](./domain)
- **Role:** Pure Business Logic & Rules.
- **Content:** Entities, Value Objects, Domain Services, Ports.
- **Dependencies:** None.

### 2. [Application Layer](./application)
- **Role:** Orchestration & Use Cases.
- **Content:** Interactors (Use Cases), DTOs, Input Ports.
- **Dependencies:** Domain.

### 3. [Infrastructure Layer](./infrastructure)
- **Role:** Persistence & External Adapters.
- **Content:** Repositories (MikroORM), API Clients, Configurations.
- **Dependencies:** Domain, Application.

### 4. [Presentation Layer](./presentation)
- **Role:** Entry Points & API.
- **Content:** NestJS Controllers, GraphQL Resolvers, Event Consumers.
- **Dependencies:** Application.

### 5. [Contracts](./contracts)
- **Role:** Shared Schemas.
- **Content:** Public DTOs, Integration Events.
- **Dependencies:** None (Shared).

## 🚀 Getting Started
To work on this domain, ensure you understand the boundaries. Do not import Infrastructure code into the Domain layer.
