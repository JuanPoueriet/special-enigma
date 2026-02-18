# Informe de Auditoría de Seguridad y Autenticación - Virteex

**Fecha:** 2025-06-03
**Auditor:** Jules (AI Software Engineer)
**Alcance:** Dominio de Identidad, Microservicio de Auth (`virteex-auth-server`), Librerías Compartidas (`libs/shared/util/auth`, `libs/kernel/auth`), Frontend Auth (`apps/virteex-web`).

---

## 1. Resumen Ejecutivo

### Calificación General: **8.5 / 10**

El sistema de autenticación de Virteex demuestra un diseño sólido, moderno y alineado con los estándares de la industria (Clean Architecture, DDD, Microservicios). Implementa características avanzadas de seguridad "out-of-the-box" como MFA (Autenticación Multifactor), Motor de Riesgo y Auditoría detallada. Sin embargo, existen vulnerabilidades específicas en la gestión de secretos criptográficos y prácticas de frontend que deben corregirse antes de un despliegue masivo en producción.

### ¿Listo para Producción?
**NO**, hasta resolver los hallazgos críticos de **Prioridad Alta**.

---

## 2. Hallazgos Críticos (Bloqueantes para Producción)

1.  **Derivación de Claves Criptográficas Débil (Hardcoded Salt)**
    *   **Ubicación:** `libs/domains/identity/infrastructure/src/lib/services/node-crypto-auth.service.ts`
    *   **Problema:** La clave de encriptación para secretos MFA se deriva usando `crypto.scryptSync(mfaKey, 'salt', 32)`. El salt es la cadena literal `'salt'`.
    *   **Riesgo:** Si un atacante compromete la base de datos y conoce este salt trivial, puede intentar ataques de diccionario precomputados (Rainbow Tables) contra la `MFA_ENCRYPTION_KEY` si esta no es rotada o es débil.
    *   **Recomendación:** Usar un salt aleatorio único por instalación o derivar la clave de forma más robusta.

2.  **Almacenamiento de Tokens en LocalStorage (Frontend)**
    *   **Ubicación:** `libs/shared/util/auth/src/lib/services/token.service.ts`
    *   **Problema:** Los tokens JWT (Access y Refresh) se almacenan en `localStorage`.
    *   **Riesgo:** Vulnerable a ataques XSS (Cross-Site Scripting). Cualquier script malicioso inyectado en la página puede robar los tokens y secuestrar la sesión.
    *   **Recomendación:** Migrar a Cookies `HttpOnly`, `Secure`, `SameSite=Strict`.

3.  **Middleware de Contexto sin Verificación de Firma**
    *   **Ubicación:** `libs/kernel/auth/src/lib/middleware/jwt-tenant.middleware.ts`
    *   **Problema:** El middleware decodifica el token (`jwt.decode`) para extraer el `tenantId` y establecer el contexto, pero **no verifica la firma**.
    *   **Riesgo:** Si un desarrollador usa `TenantGuard` en un endpoint *sin* usar también `JwtAuthGuard`, el sistema aceptará cualquier token falso con un `tenantId` válido, permitiendo suplantación de identidad completa dentro de ese tenant.
    *   **Recomendación:** El middleware debe verificar la firma del token antes de establecer el contexto, o se debe documentar/enforzar estrictamente que `TenantGuard` NUNCA debe usarse sin `JwtAuthGuard`.

---

## 3. Puntos Fuertes (Best Practices)

*   **Arquitectura Limpia (DDD):** La separación entre Entidades (`User`, `Session`), Casos de Uso (`LoginUserUseCase`) e Infraestructura es ejemplar. Permite testear la lógica de negocio sin depender de la base de datos o frameworks.
*   **Seguridad Ofensiva por Diseño:**
    *   **Hashing Robusto:** Uso de `scrypt` (memory-hard) para contraseñas, resistente a ataques por GPU/ASIC.
    *   **Encriptación Autenticada:** Uso de `AES-256-GCM` para secretos MFA, garantizando confidencialidad e integridad.
    *   **Motor de Riesgo:** Implementación de `RiskEngineService` que evalúa IP, País y User Agent antes de permitir el login.
    *   **Bloqueo Inteligente:** Sistema de bloqueo temporal tras intentos fallidos y detección de fuerza bruta.
*   **Aislamiento de Datos:** Configuración estricta de MikroORM que exige `IDENTITY_DB_NAME`, previniendo fugas de datos entre microservicios.
*   **Manejo de Contexto (AsyncLocalStorage):** El uso de `runWithTenantContext` en el Kernel permite propagar el contexto del tenant a través de toda la cadena de llamadas sin "prop drilling", ideal para aplicaciones multi-tenant.
*   **Gestión de Estado Reactivo (Frontend):** Uso de Angular Signals en `SessionService` para un manejo de estado eficiente y moderno.

---

## 4. Debilidades y Malas Prácticas (Deuda Técnica)

*   **Valores Hardcoded:**
    *   Expiración de tokens y sesiones (1 hora) está "quemada" en el código (`3600 * 1000`). Debería ser configurable por variable de entorno.
    *   Listas de dominios de email desechables en `DefaultRiskEngineService` son estáticas. Quedarán obsoletas rápidamente.
*   **Gestión de Refresh Tokens:**
    *   El `refreshToken` generado es una cadena simple (`refresh-${session.id}`). Aunque funcional, no es un JWT estándar y depende totalmente de la base de datos para validación (lo cual impacta el rendimiento en cada renovación).
*   **Retorno de Entidades de Dominio:**
    *   Los casos de uso (ej. `RegisterUserUseCase`) retornan la entidad `User` completa. Aunque NestJS puede serializarla, existe el riesgo de exponer campos internos (como `passwordHash` o `mfaSecret`) si no se usan DTOs de respuesta o interceptores de serialización (`@Exclude`) correctamente.

---

## 5. Análisis de "Fuera de Lugar" (Arquitectura)

*   **Ubicación de Guards Backend:**
    *   Los Guards de Backend (`JwtAuthGuard`, `TenantGuard`) están correctamente ubicados en `libs/kernel/auth`, separándolos de la lógica de negocio y del frontend. Esto es correcto.
*   **Lógica de Validación de NIT/RFC:**
    *   La validación de identificadores fiscales está dentro de `RegisterUserUseCase`.
    *   *Sugerencia:* Debería extraerse a un `TaxIdValidatorService` o Value Objects dedicados (`TaxId`), ya que es lógica de dominio pura reutilizable en otros contextos (ej. Facturación).

---

## 6. Conclusión y Plan de Acción

El sistema está al **85%** del camino. La base es sólida y superior a la media del mercado. Para competir con líderes (Auth0, Okta, Firebase Auth), se deben cerrar las brechas de seguridad identificadas.

### Pasos Inmediatos para "Go-Live":
1.  **Refactorizar `JwtTenantMiddleware`** para verificar la firma del token o fusionar la lógica de verificación.
2.  **Cambiar `localStorage` por Cookies HttpOnly** en el frontend.
3.  **Parametrizar el Salt** de derivación de claves en `NodeCryptoAuthService`.
4.  **Extraer configuraciones** (tiempos de expiración) a variables de entorno.

Una vez aplicados estos cambios, el sistema será **extremadamente robusto, seguro y escalable**.
