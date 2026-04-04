# Informe Detallado del Módulo de Autenticación y Seguridad - Virtex ERP

Este documento detalla las características, mecanismos de seguridad y funcionalidades implementadas en el ecosistema de autenticación de Virtex ERP, abarcando tanto el núcleo (`kernel/auth`) como el dominio de identidad (`domain/identity`).

## 1. Gestión Avanzada de Tokens (JWT)

El sistema utiliza JSON Web Tokens (JWT) para el manejo de la identidad y la autorización, con capacidades robustas:

- **Tipos de Tokens Especializados:** El sistema distingue entre diferentes contextos de uso:
  - `access`: Para acceso general a la API.
  - `refresh`: Para renovar sesiones sin requerir credenciales.
  - `service`: Comunicación segura entre microservicios.
  - `plugin`: Tokens restringidos para extensiones de terceros.
  - `stepup`: Tokens de elevación de privilegios tras una verificación MFA.
- **Revocación de Tokens:** Implementada mediante una capa de persistencia en Redis (Fail-Closed). Permite invalidar JTIs (JWT ID) específicos antes de su expiración natural.
- **Detección de Replay:** Capacidad de forzar el uso de tokens de un solo uso (`enforceOneTime`), detectando y bloqueando intentos de reutilización mediante el registro en Redis.
- **Infraestructura de Llaves (JWKS):** Soporte para JSON Web Key Sets, permitiendo la rotación dinámica de llaves y el uso de múltiples llaves activas para validación.
- **Políticas de Algoritmos:** Validación estricta que bloquea algoritmos inseguros como `none` y restringe el uso de `HMAC (HS*)` en entornos de producción a menos que se use un modo de "break-glass" auditado.

## 2. Manejo Seguro de Cookies y Sesiones

La seguridad en el transporte y almacenamiento en el cliente es prioritaria:

- **Atributos de Seguridad:** Todas las cookies de sesión se emiten con:
  - `HttpOnly`: Previene el acceso mediante JavaScript (mitigación de XSS).
  - `Secure`: Asegura que solo se envíen sobre HTTPS.
  - `SameSite (Lax/Strict/None)`: Configurable para mitigar ataques de falsificación de peticiones.
- **Protección CSRF (Cross-Site Request Forgery):**
  - Implementación de un Middleware de CSRF que utiliza el patrón de "Double Submit Cookie".
  - Generación de tokens `XSRF-TOKEN` criptográficamente seguros.
  - Validación obligatoria para métodos mutativos (POST, PUT, DELETE), incluyendo mutaciones de GraphQL.
- **Gestión de Sesiones:**
  - **Listado de Sesiones:** Los usuarios pueden ver todos sus dispositivos y sesiones activas.
  - **Cierre de Sesión Global y Remoto:** Capacidad de revocar sesiones individuales o forzar el cierre de todas las sesiones de un usuario.
  - **Detección de Inactividad:** Mecanismos en el cliente para cerrar sesiones tras periodos prolongados de inactividad.

## 3. Autenticación de Múltiples Factores (MFA) y Step-Up

Virtex implementa una defensa en profundidad mediante MFA:

- **TOTP (Time-based One-Time Password):** Integración con aplicaciones como Google Authenticator o Microsoft Authenticator.
- **Métodos Alternativos:** Soporte para verificación mediante Email y SMS.
- **Códigos de Respaldo:** Generación de códigos únicos de recuperación para casos donde el dispositivo MFA no esté disponible.
- **Step-Up Authentication:** Permite requerir un segundo factor de autenticación solo para operaciones altamente sensibles (ej. transferencias bancarias, cambios de configuración crítica), incluso si el usuario ya ha iniciado sesión.

## 4. Control de Acceso y Multi-Tenancy

El sistema de autorización es granular y jerárquico:

- **RBAC (Role Based Access Control):** Asignación de permisos basada en roles predefinidos y personalizados.
- **ABAC (Attribute Based Access Control):** Capacidad de definir políticas basadas en atributos del usuario y del recurso (ej. "el usuario solo puede editar facturas si es el dueño de la cuenta").
- **Aislamiento de Tenants (Multi-tenancy):**
  - **Integridad de Contexto:** Cada petición es validada contra un `TenantID` obligatorio.
  - **Firmado de Contexto:** Las comunicaciones internas entre servicios incluyen un contexto de tenant firmado para evitar suplantaciones.
  - **Guards de Seguridad:** Interceptores que aseguran que un usuario no pueda acceder a datos de un tenant al que no pertenece.

## 5. Autenticación Moderna y Social

- **Passkeys (WebAuthn):** Soporte nativo para autenticación biométrica y llaves físicas de seguridad (FIDO2), eliminando la dependencia de contraseñas.
- **Social Login (Federación):** Integración con proveedores de identidad externos como Google, Microsoft y Okta.
- **Impersonación (Ghost Mode):** Permite a administradores de soporte autorizados actuar en nombre de un usuario para diagnóstico, con auditoría estricta y rastro de seguridad.

## 6. Infraestructura de Secretos y Auditoría

- **Secret Manager:** Capa de abstracción que permite obtener llaves y secretos desde AWS KMS, HashiCorp Vault o variables de entorno seguras.
- **Telemetría de Seguridad:** Registro automático de eventos críticos:
  - Intentos de inicio de sesión fallidos.
  - Cambios de contraseña y configuración de seguridad.
  - Detección de ataques de replay o tokens revocados.
  - Uso de modos de emergencia o bypass auditados.
- **Rate Limiting:** Protección contra ataques de fuerza bruta en los endpoints de autenticación.
