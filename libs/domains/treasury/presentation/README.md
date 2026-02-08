# treasury-presentation (Presentation Layer)

## 🎮 Interface
This library serves as the **Entry Point** for the **Treasury** domain. It handles incoming requests (HTTP, GraphQL, Events) and delegates them to the Application layer.

## 📡 Components
- **Controllers:** REST API endpoints (NestJS).
- **Resolvers:** GraphQL resolvers (if applicable).
- **Consumers:** Event listeners (RabbitMQ/Redis/Kafka).
- **Modules:** NestJS Modules for dependency injection wiring.

## 🔌 Wiring
- Acts as the **Composition Root** for the domain module.
- Injects **Infrastructure** implementations into **Application** use cases.
