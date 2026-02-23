# Auditoría Arquitectónica - Virteex Monorepo

## 🧠 Diagnóstico Ejecutivo

La arquitectura base del proyecto demuestra una intención clara de seguir **Domain-Driven Design (DDD)** y **Microservicios** utilizando **Nx**, **NestJS** y **Angular**. La estructura de directorios (`libs/domains`, `apps/backend`) es sólida y facilita la separación de contextos.

Sin embargo, la salud arquitectónica está comprometida por **violaciones críticas de límites (boundaries)**. El acoplamiento entre Frontend y Backend es excesivamente alto debido a importaciones directas de lógica de aplicación en el cliente. Además, se detecta un patrón de **Anemic Domain Model**, donde la lógica de negocio reside en servicios y no en entidades, y una **fuga de modelos de dominio** hacia la capa de presentación (API), exponiendo detalles de persistencia e infraestructura.

La configuración de **Nx Boundaries** es estricta en teoría (`eslint.config.mjs`), pero ineficaz en la práctica para librerías clave (`libs/domains/identity/ui`) debido a la falta de etiquetas (`tags`), permitiendo que el código "spaghetti" cruce capas arquitectónicas sin control.

## 🔎 Hallazgos Críticos

1.  **Violación de Frontera Frontend-Backend (Severidad: Crítica)**
    *   **Evidencia**: `libs/domains/identity/ui/src/lib/services/auth.service.ts` importa DTOs y lógica desde `@virteex/identity-application`.
    *   **Impacto**: El bundle del frontend incluye código del backend. Cualquier refactorización en el backend rompe el frontend. Acoplamiento total.
2.  **Fuga de Entidades de Dominio en API (Severidad: Alta)**
    *   **Evidencia**: `UsersController` retorna `Promise<User>` directamente, donde `User` es una entidad de MikroORM.
    *   **Impacto**: Se expone la estructura de base de datos y campos sensibles (passwordHash, salt) al cliente. Se viola el contrato de API explícito.
3.  **Falta de Tags en Nx (Severidad: Alta)**
    *   **Evidencia**: `libs/domains/identity/ui/project.json` no tiene `tags`.
    *   **Impacto**: Las reglas de `eslint` (`@nx/enforce-module-boundaries`) no aplican, permitiendo importaciones ilegales (como la del punto 1).
4.  **Modelo de Dominio Anémico (Severidad: Media)**
    *   **Evidencia**: `User.ts` es un contenedor de datos con decoradores de ORM. La lógica de negocio (ej. `updateProfile`) vive en `UpdateUserProfileUseCase`.
    *   **Impacto**: Baja cohesión. La lógica está dispersa en servicios en lugar de encapsulada en la entidad experta.

## 📦 Problemas por Categoría

### 1️⃣ COHERENCIA SEMÁNTICA (Naming & Intent)
*   **Semantic Drift en Auth**: Existe `libs/kernel/auth` (Infraestructura, Guards) y lógica de autenticación en `libs/domains/identity` (Controller, UseCases). Aunque la separación es defensible, puede causar confusión sobre dónde vive la "verdad" de la autenticación.
*   **Shared UI Dumping Ground**: `libs/shared/ui` contiene `pages`, `services`, `interceptors`. El nombre `ui` sugiere componentes tontos (dumb components), pero contiene lógica de aplicación y enrutamiento.

### 2️⃣ RESPONSABILIDAD Y COHESIÓN
*   **SRP Violation en Controladores**: `UsersController` maneja lógica de validación manual (`if (!file) throw...`) y extracción de usuario (`req.user.sub`). Debería delegar en Pipes y Decoradores (`@CurrentUser`).
*   **Low Cohesion en Servicios de Aplicación**: Los casos de uso actúan como "Transaction Scripts", operando sobre entidades pasivas. Esto aleja el comportamiento de los datos.

### 3️⃣ ARQUITECTURA FRONTEND (Angular)
*   **Acoplamiento a Backend**: Como se mencionó, el Frontend importa librerías de Backend.
*   **Lógica en Servicios de UI**: `AuthService` en `libs/domains/identity/ui` hace llamadas HTTP pero depende de tipos de backend. Debería depender de contratos compartidos agnósticos (`libs/shared/contracts`).

### 4️⃣ ARQUITECTURA BACKEND (NestJS)
*   **Acoplamiento a Infraestructura**: Las Entidades de Dominio (`User.ts`) están contaminadas con decoradores de `@mikro-orm`. Esto hace que el Dominio dependa de la Infraestructura, violando Clean Architecture estricta (aunque es un compromiso pragmático común en NestJS).
*   **Retorno de Entidades**: Los controladores no mapean a `ResponseDTOs` o `ViewModels`.

### 5️⃣ ESTRUCTURA DE MONOREPO (Nx)
*   **Etiquetado Incompleto**: Librerías críticas sin tags (`identity-ui`).
*   **Shared Kernel**: `libs/kernel` parece bien estructurado, pero debe vigilarse para no convertirse en un "cajón de sastre".

### 6️⃣ ABSTRACCIONES Y MODELADO DE DOMINIO
*   **Wrong Abstractions**: El uso de `User` (Entidad ORM) como `User` (Dominio) y como `UserResponse` (API) es una abstracción colapsada que causa rigidez.
*   **Anemia**: Falta de métodos de negocio en entidades (`activate()`, `changePassword()`).

### 7️⃣ ACOPLAMIENTO Y ESCALABILIDAD
*   **Alto Acoplamiento Frontend-Backend**: Impide desplegar o refactorizar el backend independientemente del frontend.
*   **Escalabilidad de Equipo**: Sin límites estrictos (tags), los desarrolladores nuevos introducirán dependencias circulares o prohibidas fácilmente.

## 🏗 Recomendación de Estructura Ideal

### Reorganización de Librerías
1.  **Crear Capa de Contratos**:
    *   Mover DTOs compartidos a `libs/domains/identity/contracts` (o `shared`).
    *   Estas deben ser interfaces puras o clases sin dependencias de NestJS/ORM.
2.  **Aislar el Frontend**:
    *   `libs/domains/identity/ui` solo debe depender de `contracts` y `shared/ui`. NUNCA de `application` o `domain`.
3.  **Enriquecer el Dominio**:
    *   Mover lógica de validación y estado a `User.entity.ts`.
    *   Usar `UseCases` solo para orquestar (cargar, ejecutar método de dominio, guardar).

### Refactorización de API
1.  **Implementar DTOs de Respuesta**:
    *   Crear `UserResponseDto`.
    *   Usar un `UserMapper` en el controlador o servicio para transformar `UserEntity` -> `UserResponseDto`.
2.  **Decoradores Custom**:
    *   Implementar `@CurrentUser()` para extraer el usuario del request de forma tipada y limpia.

### Nx Boundaries
1.  **Etiquetar Todo**:
    *   Asignar `scope:identity`, `type:ui` a `libs/domains/identity/ui`.
    *   Actualizar `eslint.config.mjs` para permitir que `type:ui` dependa solo de `type:contract` y `type:util`, no de `type:application`.
