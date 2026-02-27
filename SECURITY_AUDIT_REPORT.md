# Auditoría de Seguridad: Virteex ERP

## 1. Calificación de Robustez de Seguridad: **8.5/10**

## 2. Justificación de la Calificación (Brechas detectadas)
El proyecto presenta una arquitectura de seguridad excepcional, muy superior al estándar de la industria para aplicaciones ERP, especialmente en el manejo de multi-tenancy y aislamiento de procesos. Sin embargo, no es un 10 debido a las siguientes observaciones:

*   **Inconsistencia en Gateways:** Mientras que `virteex-api-gateway` aplica correctamente los headers de seguridad (`helmet`) a través de `setupGlobalConfig`, el gateway de GraphQL (`virteex-gateway`) carece de esta inicialización en su `main.ts`, dejando las peticiones GraphQL sin protecciones estándar de cabeceras HTTP.
*   **Vulnerabilidad de CSRF en GraphQL:** El `CsrfMiddleware` tiene un bypass explícito para la ruta `/graphql`. Si el frontend de Angular utiliza cookies de sesión para estas peticiones, el sistema es vulnerable a ataques de Cross-Site Request Forgery en toda la capa de datos de GraphQL.
*   **Deuda Técnica en Suministros (SCA):** El análisis de dependencias (`npm audit`) reveló **92 vulnerabilidades**, de las cuales **49 son de alta severidad** y **4 críticas**. Esto incluye riesgos de escritura arbitraria de archivos y ejecución en herramientas como `tar`, `rollup` y `qs`.
*   **Permisividad en RLS Interceptor:** El `TenantRlsInterceptor` permite que las peticiones `GET` continúen incluso si falta el contexto del tenant. Sin una política de "Deny by Default" más estricta, podría derivar en fugas de datos si una entidad privada no está correctamente filtrada.

## 3. Mejoras Específicas y Mejores Prácticas Recomendadas

### A. Hardening de Infraestructura y Gateways:
1.  **Unificación de Seguridad:** Forzar que todos los microservicios y gateways llamen a `setupGlobalConfig(app)` en su arranque.
2.  **Protección de GraphQL:** Eliminar el bypass de CSRF para `/graphql`. Exigir el header `X-XSRF-TOKEN` también en las mutaciones de GraphQL. Implementar **Depth Limiting** y **Query Cost Analysis**.

### B. Gestión de Dependencias (Supply Chain):
1.  **Remediación Urgente:** Ejecutar `npm audit fix` y evaluar la actualización o sustitución de `xlsx` y `tar`.
2.  **Integración de SCA en CI/CD:** Implementar herramientas como Snyk o Trivy en el pipeline para bloquear PRs con vulnerabilidades críticas.

### C. Aislamiento de Datos (Multi-tenancy):
1.  **RLS Estricto:** Modificar el `TenantRlsInterceptor` para que sea "Closed by Default".
2.  **Auditoría de Sesión:** Implementar rotación de Refresh Tokens (RT Rotation).

### D. Mejoras en Sandboxing (Plugins):
1.  **Límites de Recursos:** Añadir límites de tiempo de CPU acumulados por ventana de tiempo.
2.  **Egress Filtering:** Implementar un Proxy de Salida con Allowlist para el `plugin-host`.

---
*Informe generado por Jules (AI Security Auditor)*
