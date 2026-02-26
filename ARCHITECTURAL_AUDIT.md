# Auditoría Arquitectónica - Proyecto Virteex

**Contexto:** Auditoría realizada sobre el estado actual del repositorio (rama principal), analizando específicamente los directorios `apps/` y `libs/` bajo la estructura de monorepo Nx.

## 🧠 Diagnóstico Ejecutivo

La arquitectura del monorepo presenta una **base sólida** alineada con los principios de **Domain-Driven Design (DDD)** y **Clean Architecture**. La separación de capas en las librerías de dominio (`domain`, `application`, `infrastructure`, `ui`) demuestra una intención clara de desacoplamiento y testabilidad. El frontend utiliza lazy loading correctamente, delegando la responsabilidad a librerías de características (feature libs).

Sin embargo, se detectan **grietas arquitectónicas significativas** que amenazan la mantenibilidad a largo plazo. La más crítica es la **contaminación de la capa compartida de UI (`shared-ui`)** con lógica de negocio y acceso a datos, lo que crea un acoplamiento oculto y viola los límites del contexto. Además, en el backend, aunque la estructura es correcta, la implementación de los Casos de Uso (como `LoginUserUseCase`) tiende a la complejidad excesiva ("God Method"), mezclando orquestación con reglas de negocio de bajo nivel que deberían pertenecer al Dominio.

**Salud General:** 🟡 **Moderada (Riesgo de Deuda Técnica)**

---

## 🔎 Hallazgos Críticos

1.  **Violación de Límites en `shared-ui` (Dumping Ground)**
    *   **Severidad:** 🔴 **Crítica**
    *   **Evidencia:** `libs/shared/ui/src/lib/services/organization.service.ts` realiza llamadas HTTP directas a `/organizations/profile`.
    *   **Impacto:** Cualquier consumidor de componentes UI (botones, inputs) hereda implícitamente dependencias de `HttpClient` y configuración de API. Rompe la separación entre "Presentación" y "Acceso a Datos".

2.  **Violación de SRP en Casos de Uso (God Method)**
    *   **Severidad:** 🟠 **Alta**
    *   **Evidencia:** `LoginUserUseCase` maneja validación de contraseñas, lógica de bloqueo de cuenta, cálculo de riesgo, MFA, generación de tokens y auditoría, todo en un solo método `execute`.
    *   **Impacto:** Dificulta las pruebas unitarias (setup complejo) y la reutilización. La lógica de negocio (ej. "bloquear cuenta tras 3 intentos") está atrapada en el servicio de aplicación en lugar de la entidad.

3.  **Fuga de Infraestructura en Entidades de Dominio**
    *   **Severidad:** 🟡 **Media**
    *   **Evidencia:** La entidad `User` (`user.entity.ts`) importa e instancia `uuidv4` directamente en la propiedad.
    *   **Impacto:** El dominio deja de ser puro y depende de una librería externa para la generación de identidad. Dificulta la persistencia si el ID debe venir de la base de datos.

---

## 📦 Problemas por Categoría

### 1️⃣ COHERENCIA SEMÁNTICA (Naming & Intent)
*   **Problema:** Semantic Drift en `shared-ui`.
*   **Evidencia:** La librería contiene carpetas como `services`, `pages`, `interceptors`. El nombre `ui` sugiere componentes visuales puros (Dumb Components), pero el contenido incluye lógica de aplicación y enrutamiento (`pages`).
*   **Recomendación:** Renombrar/dividir. Mover `pages` a `feature-shell` o librerías específicas. Mover `services` de dominio a `data-access`.

### 2️⃣ RESPONSABILIDAD Y COHESIÓN
*   **Problema:** Lógica de Dominio Anémica vs Servicio Gordo.
*   **Evidencia:** En `LoginUserUseCase`, la lógica `if (user.failedLoginAttempts >= 3)` manipula el estado del usuario directamente.
*   **Refactorización:** Mover esta lógica a `User.registerFailedLogin()`. El Caso de Uso solo debería llamar al método de la entidad y persistir el resultado.

### 3️⃣ ARQUITECTURA FRONTEND (Angular)
*   **Problema:** Acoplamiento de UI con Infraestructura.
*   **Evidencia:** `OrganizationService` inyecta `HttpClient` dentro de una librería clasificada como UI.
*   **Impacto:** Imposible usar la librería de UI en un entorno sin `HttpClientModule` configurado o en pruebas aisladas sin mockear toda la capa de red.

### 4️⃣ ARQUITECTURA BACKEND (NestJS)
*   **Problema:** Boilerplate innecesario en Apps.
*   **Evidencia:** `apps/backend/virteex-identity-service` contiene `AppService` y `AppController` con "Hello API", mientras la lógica real está en las libs.
*   **Refactorización:** Eliminar estos archivos por defecto y dejar que el `AppModule` solo importe los módulos de dominio/infraestructura necesarios.

### 5️⃣ ESTRUCTURA DE MONOREPO (Nx)
*   **Problema:** Librería Monolítica `shared-ui`.
*   **Evidencia:** `libs/shared/ui` actúa como un cajón de sastre.
*   **Recomendación:** Atomizar.
    *   `libs/shared/ui-components` (Botones, Inputs)
    *   `libs/shared/util-formatting` (Pipes, Directivas)
    *   `libs/shared/data-access-organization` (Servicios API)

### 6️⃣ ABSTRACCIONES Y MODELADO DE DOMINIO
*   **Problema:** Entidades con dependencias directas.
*   **Evidencia:** `uuid` en `user.entity.ts`.
*   **Refactorización:** Pasar el ID en el constructor o usar un `IdGenerator` (puerto) inyectado si es absolutamente necesario (aunque el ID debería generarse antes o en persistencia).

### 7️⃣ ACOPLAMIENTO Y ESCALABILIDAD
*   **Nivel:** Medio-Alto (debido a `shared-ui`).
*   **Riesgo:** Si `shared-ui` crece, los tiempos de build afectados aumentarán drásticamente porque casi todas las apps dependen de ella.

---

## 🏗 Recomendación de Estructura Ideal

Se propone la siguiente reorganización para mitigar los hallazgos:

### Refactorización de `shared-ui`
Dividir en librerías especializadas por alcance y tipo:

- `libs/shared/ui/design-system`: Componentes visuales puros (Button, Card). Sin dependencias de servicios.
- `libs/shared/data-access/organization`: `OrganizationService` y modelos relacionados.
- `libs/shared/util/common`: Validadores, helpers puros.

### Refactorización de Dominio (Identity)
Limpiar la arquitectura hexagonal:

- **Dominio:** Enriquecer `User` entity con métodos de negocio (`lock()`, `unlock()`, `registerLoginAttempt()`). Eliminar dependencia de `uuid`.
- **Aplicación:** Simplificar `LoginUserUseCase`. Delegar lógica de negocio a la entidad y lógica de seguridad (MFA, Risk) a servicios de dominio dedicados, orquestando solo el flujo.

### Estructura de Directorios Propuesta

```text
libs/
  domains/
    identity/
      domain/       # Entidades puras, Puertos (Repository Interfaces)
      application/  # Casos de Uso (Orquestación ligera)
      infrastructure/# Implementaciones (MikroORM, HTTP Adapters)
      ui/           # Componentes específicos de Identity (Login Form)
  shared/
    ui/
      design-system/# Componentes atómicos reutilizables
    data-access/
      organization/ # Cliente API para Organizaciones
    util/
      auth/         # Guards, Interceptors
```
