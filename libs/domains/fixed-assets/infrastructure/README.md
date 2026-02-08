# fixed-assets-infrastructure (Infrastructure Layer)

## ⚙️ Implementation

This library provides the **technical implementation** of the interfaces (Ports) defined in the Domain and Application layers. It handles persistence, external APIs, and system interactions.

## 🛠 Contents

- **Repositories:** MikroORM implementations of domain repositories.
- **Adapters:** Implementations of external services (e.g., EmailService, PaymentGateway).
- **Configuration:** Database connections, Environment variables validation.

## 🔗 Dependencies

- Depends on **Domain** (for Entities/Repositories interfaces).
- Depends on **Application** (for Use Case ports).
- **Platform Dependencies:** MikroORM, NestJS, Postgres, Redis, etc.
