# Virteex ERP (Enterprise Resource Planning)

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Coverage](https://img.shields.io/badge/coverage-80%25-green)
![Architecture](https://img.shields.io/badge/architecture-certified-blue)
![Version](https://img.shields.io/badge/version-13.0.0-orange)

Virteex ERP is a next-generation, cloud-native Enterprise Resource Planning system designed for high-performance multi-tenancy and scalability. Built with a strict **Clean Architecture** and **Domain-Driven Design (DDD)** approach, it powers mission-critical operations for enterprise clients across the Americas.

## 📚 Documentation & Architecture

> **Note:** For the complete Architectural Standards, Governance policies, and Operational Runbooks, please refer to [AGENTS.md](./AGENTS.md) (Spanish).

This project follows a strict **Hexagonal Architecture (Ports & Adapters)**:
- **Domain:** Pure business logic, no external dependencies.
- **Application:** Use cases and orchestration.
- **Infrastructure:** Adapters for databases (MikroORM), external APIs, and messaging.
- **Presentation:** Entry points (REST, GraphQL, CLI).

## 🛠 Technology Stack

- **Backend:** [NestJS](https://nestjs.com/) (Node.js), Fastify
- **Frontend:** [Angular](https://angular.io/), Ionic (Mobile)
- **Database:** PostgreSQL 16 (Multi-tenant via RLS), Redis (Caching)
- **ORM:** MikroORM v6
- **Messaging:** Kafka / RabbitMQ
- **Infrastructure:** Docker, Kubernetes, Terraform

## 📦 Core Modules

| Module | Status | Description |
| :--- | :--- | :--- |
| **Identity** | ✅ Stable | Authentication, Authorization (RBAC), Multi-tenancy context. |
| **Inventory** | ✅ Stable | Warehouse management, Stock movements, Valuation. |
| **Billing** | 🚧 Beta | Invoicing, Fiscal compliance (CFDI/NFe). |
| **Accounting** | 🚧 Beta | General Ledger, Journal Entries. |
| **Purchasing** | ✅ Stable | Supplier management, Purchase Orders. |
| **Catalog** | ✅ Stable | Products, Services, Price Lists. |

## 🚀 Getting Started

### Prerequisites
- Node.js v20+
- Docker & Docker Compose
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone git@github.com:virteex/erp.git

# Install dependencies
npm install
```

### Running the Environment

Start the infrastructure (Postgres, Redis, etc.):

```bash
docker-compose up -d
```

### Running Applications

```bash
# Start the API Gateway
npx nx serve virteex-api-gateway

# Start the Web Portal
npx nx serve virteex-web
```

## 🧪 Testing

We enforce a strict testing pyramid:

```bash
# Run Unit Tests
npx nx run-many --target=test --all

# Run E2E Tests
npx nx e2e virteex-web-e2e
```

## 🤝 Contributing

Please read [AGENTS.md](./AGENTS.md) before submitting any Pull Requests. All contributions must adhere to the defined architectural boundaries.

## 📄 License

Copyright © 2024 Virteex Inc. All rights reserved.
Proprietary software. Unauthorized copying of this file, via any medium is strictly prohibited.
