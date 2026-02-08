import os
import json

# Define Templates
DOMAIN_ROOT_TEMPLATE = """# {domain_name} Domain

## 🌐 Overview
The **{domain_name}** domain is a core business module of the Virteex ERP system. It follows a strict **Clean Architecture** and **Domain-Driven Design (DDD)** approach, separated into distinct layers to ensure scalability, maintainability, and testability.

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
"""

DOMAIN_LAYER_TEMPLATE = """# {project_name} (Domain Layer)

## 🧠 Core Logic
This library contains the **Pure Business Logic** for the **{domain_name}** domain. It is the heart of the bounded context.

## 📦 Contents
- **Entities:** Rich domain models with behavior (DDD).
- **Value Objects:** Immutable objects defined by their attributes.
- **Domain Services:** Logic spanning multiple entities.
- **Ports (Interfaces):** Secondary ports for repositories and services (implemented in Infrastructure).

## 🚫 Constraints
- **Zero Dependencies:** Must NOT depend on Application, Infrastructure, or Presentation layers.
- **Framework Agnostic:** No NestJS, MikroORM, or external library dependencies (except utility libraries).
"""

APPLICATION_LAYER_TEMPLATE = """# {project_name} (Application Layer)

## 🎯 Purpose
This library implements the **Use Cases** and orchestrates the flow of data for the **{domain_name}** domain. It acts as the glue between the Presentation layer and the Domain layer.

## 🏗 Architecture
- **Use Cases (Interactors):** Specific business actions (e.g., `CreateOrder`, `ProcessPayment`).
- **DTOs (Data Transfer Objects):** Input/Output structures for use cases.
- **Ports (Interfaces):** Secondary ports for Infrastructure implementations.

## 🤝 Dependencies
- Depends on **Domain** layer.
- Depends on **Contracts** (Shared Kernel).
- **No direct dependency** on Infrastructure (Dependency Inversion Principle).

## 🧪 Testing
- **Unit Tests:** Mocking domain services and repositories.
- **Integration Tests:** Verifying use case flows.
"""

INFRASTRUCTURE_LAYER_TEMPLATE = """# {project_name} (Infrastructure Layer)

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
"""

PRESENTATION_LAYER_TEMPLATE = """# {project_name} (Presentation Layer)

## 🎮 Interface
This library serves as the **Entry Point** for the **{domain_name}** domain. It handles incoming requests (HTTP, GraphQL, Events) and delegates them to the Application layer.

## 📡 Components
- **Controllers:** REST API endpoints (NestJS).
- **Resolvers:** GraphQL resolvers (if applicable).
- **Consumers:** Event listeners (RabbitMQ/Redis/Kafka).
- **Modules:** NestJS Modules for dependency injection wiring.

## 🔌 Wiring
- Acts as the **Composition Root** for the domain module.
- Injects **Infrastructure** implementations into **Application** use cases.
"""

CONTRACTS_LAYER_TEMPLATE = """# {project_name} (Contracts)

## 📜 Shared Agreement
This library defines the **Public Contract** for the **{domain_name}** domain. It is safe to be shared with other domains or external consumers.

## 📦 Contents
- **DTOs:** Data Transfer Objects used in public APIs.
- **Events:** Integration Events published by this domain.
- **Enums/Types:** Shared constants and type definitions.

## ⚠️ Guidelines
- **Stable:** Changes here affect external consumers.
- **No Logic:** Pure data structures only.
"""

UI_LAYER_TEMPLATE = """# {project_name} (UI Library)

## 🎨 User Interface
This Angular library contains the **Frontend Components** for the **{domain_name}** domain.

## 🧩 Components
- **Smart Components:** Containers connected to state/services.
- **Dumb Components:** Presentational components (Inputs, Cards).
- **Services:** API Clients for communicating with the backend.

## 📱 Features
- Implements the UI/UX for {domain_name} workflows.
- Lazy-loaded via the main application router.
"""

KERNEL_TEMPLATE = """# {project_name} (Kernel)

## ☢️ Core Kernel
This library is part of the **Shared Kernel** of Virteex ERP. It contains fundamental building blocks used across all domains.

## 🧱 Scope
- Base Classes (Entity, AggregateRoot, ValueObject).
- Common Utilities & Helpers.
- Cross-cutting Concerns (Logging, Exception Handling).

## ⚠️ Stability
- **High Stability Required:** Changes here propagate to ALL domains.
"""

SHARED_TEMPLATE = """# {project_name} (Shared)

## 🤝 Shared Library
This library provides reusable functionality for multiple parts of the system.

## 📦 Scope
- UI Kits / Component Libraries.
- Shared Utilities.
- API Client Generators.
"""

APP_TEMPLATE = """# {project_name} (Application)

## 🚀 Application
This is a deployable application in the Virteex ERP ecosystem.

## 🏗 Type
- **{app_type}**

## 🏃 Running
Check the root `package.json` for start scripts (e.g., `nx serve {project_name}`).
"""

def get_layer_type(path):
    if "apps/" in path:
        return "app"
    if "libs/kernel" in path:
        return "kernel"
    if "libs/shared" in path:
        return "shared"
    if "libs/domains" in path:
        path_parts = path.split("/")
        last_part = path_parts[-1]

        if last_part == "domain":
            return "domain_layer"
        if last_part == "application":
            return "application_layer"
        if last_part == "infrastructure":
            return "infrastructure_layer"
        if last_part == "presentation":
            return "presentation_layer"
        if last_part == "contracts":
            return "contracts_layer"
        if last_part == "ui":
            return "ui_layer"

    return "unknown"

def generate_readme(project_path, project_name):
    layer_type = get_layer_type(project_path)
    domain_name = "Unknown"

    if "libs/domains" in project_path:
        try:
             # project_path usually looks like ./libs/domains/accounting/application
             # split by libs/domains/ and get the next part
             parts = project_path.split("libs/domains/")
             if len(parts) > 1:
                 domain_part = parts[1].split("/")[0]
                 domain_name = domain_part.replace("-", " ").title()
        except:
             pass

    content = None
    if layer_type == "domain_layer":
        content = DOMAIN_LAYER_TEMPLATE.format(project_name=project_name, domain_name=domain_name)
    elif layer_type == "application_layer":
        content = APPLICATION_LAYER_TEMPLATE.format(project_name=project_name, domain_name=domain_name)
    elif layer_type == "infrastructure_layer":
        content = INFRASTRUCTURE_LAYER_TEMPLATE.format(project_name=project_name, domain_name=domain_name)
    elif layer_type == "presentation_layer":
        content = PRESENTATION_LAYER_TEMPLATE.format(project_name=project_name, domain_name=domain_name)
    elif layer_type == "contracts_layer":
        content = CONTRACTS_LAYER_TEMPLATE.format(project_name=project_name, domain_name=domain_name)
    elif layer_type == "ui_layer":
        content = UI_LAYER_TEMPLATE.format(project_name=project_name, domain_name=domain_name)
    elif layer_type == "kernel":
        content = KERNEL_TEMPLATE.format(project_name=project_name)
    elif layer_type == "shared":
        content = SHARED_TEMPLATE.format(project_name=project_name)
    elif layer_type == "app":
        app_type = "Backend Service" if "api" in project_name or "service" in project_name else "Frontend App"
        content = APP_TEMPLATE.format(project_name=project_name, app_type=app_type)

    return content

def main():
    root_dir = "."
    # Use os.walk to traverse directories
    for dirpath, dirnames, filenames in os.walk(root_dir):
        # Skip node_modules, .git, dist
        if "node_modules" in dirpath or ".git" in dirpath or "dist" in dirpath:
            continue

        # 1. Handle Domain Roots (libs/domains/xxx)
        # Check if current dir is a domain root
        if "libs/domains" in dirpath:
            rel_path = os.path.relpath(dirpath, root_dir)
            if rel_path.startswith("./"):
                rel_path = rel_path[2:]

            parts = rel_path.split(os.sep)
            # Correct path structure: libs/domains/accounting -> length 3
            if len(parts) == 3 and parts[0] == "libs" and parts[1] == "domains":
                domain_name = parts[2].replace("-", " ").title()
                readme_path = os.path.join(dirpath, "README.md")
                content = DOMAIN_ROOT_TEMPLATE.format(domain_name=domain_name)
                print(f"Updating Domain Root: {readme_path}")
                with open(readme_path, "w") as f:
                    f.write(content)

        # 2. Handle Projects (with project.json)
        if "project.json" in filenames:
            try:
                with open(os.path.join(dirpath, "project.json"), "r") as f:
                    data = json.load(f)
                    project_name = data.get("name", "unknown")

                # Check if we should skip existing App READMEs
                readme_path = os.path.join(dirpath, "README.md")
                if "apps/" in dirpath and os.path.exists(readme_path):
                     print(f"Skipping existing App README: {readme_path}")
                     continue

                content = generate_readme(dirpath, project_name)
                if content:
                    readme_path = os.path.join(dirpath, "README.md")
                    print(f"Updating Project: {readme_path}")
                    with open(readme_path, "w") as f:
                        f.write(content)
            except Exception as e:
                print(f"Error processing {dirpath}: {e}")

if __name__ == "__main__":
    main()
