# Análisis de Frameworks de Testing: Vitest vs Jest

## 1. Estado Actual del Proyecto

El proyecto Virteex es un monorepo Nx que actualmente utiliza una arquitectura híbrida de testing. Tras un análisis exhaustivo de los 146 proyectos (apps y libs), se ha determinado la siguiente distribución:

- **Vitest:** 129 proyectos (Ejecutor: `@nx/vitest:test`)
- **Jest:** 17 proyectos (Ejecutor: `@nx/jest:jest`)

### Hallazgos Críticos
Se han detectado **15 proyectos E2E** que presentan una configuración errónea (bugs de configuración):
- **Ejecutor declarado:** `@nx/vitest:test`
- **Archivo de configuración apuntado:** `jest.config.cts`
- **Impacto:** Estos tests podrían no estar ejecutándose correctamente o estar usando un puente de compatibilidad ineficiente, lo que compromete la robustez del CI/CD.

## 2. Comparativa Técnica

| Característica | Jest | Vitest |
| :--- | :--- | :--- |
| **Velocidad** | Más lento (basado en transformaciones pesadas). | Extremadamente rápido (usa Vite y ESM nativo). |
| **DX (Developer Experience)** | Modo watch estándar. | Modo watch instantáneo y UI integrada. |
| **Compatibilidad ESM** | Requiere configuraciones complejas (`ts-jest`, transformIgnorePatterns). | Soporte nativo y transparente. |
| **Integración Nx** | Excelente soporte histórico. | Integración moderna y optimizada para monorepos grandes. |
| **Stack (Angular/NestJS)** | El estándar tradicional para NestJS. | Compatible con ambos, especialmente potente en Angular con Vite. |

## 3. Diagnóstico y Recomendación

### ¿Por qué mantener ambos temporalmente?
Actualmente, los **BFFs (NestJS)** y ciertos proyectos **E2E** están fuertemente ligados a Jest debido a transformaciones específicas y setups de `@nestjs/testing`. Migrar estos a Vitest requiere una refactorización de los archivos de soporte (`global-setup.ts`, etc.) que debe hacerse con cautela.

### ¿Cuál es la mejor opción para la robustez del proyecto?
**La recomendación de oro es estandarizar hacia Vitest.**

**Razones:**
1. **Rendimiento:** En un monorepo de este tamaño, el tiempo de ejecución es crítico. Vitest reduce significativamente el tiempo de feedback.
2. **Consistencia:** El 88% del proyecto ya usa Vitest. Mantener Jest solo para casos residuales aumenta la carga cognitiva del equipo.
3. **Modernidad:** Con Angular 21 y NestJS 11, el ecosistema se mueve hacia ESM, donde Vitest brilla.

## 4. Plan de Acción Inmediato

1. **Corrección de Inconsistencias:** Cambiar el ejecutor de los 15 proyectos E2E a `@nx/jest:jest` para que coincida con sus archivos de configuración actuales. Esto asegura que los tests sean **robustos y confiables** hoy mismo.
2. **Roadmap de Migración:**
   - Migrar gradualmente los BFFs a Vitest.
   - Actualizar el `AGENTS.md` para reflejar que Vitest es el estándar del proyecto, corrigiendo la instrucción obsoleta que mencionaba Jest para las libs de dominio.

## 5. Conclusión
El proyecto debe tender a la **unificación en Vitest**. Sin embargo, la prioridad inmediata es arreglar las configuraciones "rotas" detectadas para garantizar la integridad de las pruebas actuales.
