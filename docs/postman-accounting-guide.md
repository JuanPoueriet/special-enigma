# Guía de Pruebas con Postman: Servicio de Accounting

Esta guía detalla cómo probar los endpoints del servicio de Contabilidad (Accounting) utilizando Postman.

## Prerrequisitos y Ejecución

Para poder probar el servicio, es necesario que la infraestructura base y el Gateway de la API estén en ejecución.

### 1. Levantar Infraestructura (Docker)

El proyecto utiliza Docker Compose para gestionar las bases de datos y servicios de mensajería. Ejecuta:

```bash
docker-compose up -d postgres redis kafka zookeeper
```

### 2. Ejecutar el API Gateway

El API Gateway agrupa los controladores de los diferentes dominios (incluyendo Accounting) en modo desarrollo.

```bash
npm run dev:backend
# O alternativamente usando Nx directamente:
# npx nx serve api-gateway-app
```

> **Nota:** No es estrictamente necesario ejecutar el microservicio `accounting-service` de forma independiente si estás probando los endpoints REST a través del `api-gateway-app`, ya que este último importa el módulo de presentación de contabilidad directamente.

## Configuración Inicial en Postman

### URL Base

La URL base por defecto para el Gateway de la API es:
`http://localhost:3000/api`

### Cabeceras (Headers) Requeridas

Para todas las peticiones, se deben incluir las siguientes cabeceras:

| Cabecera              | Valor                   | Descripción                                    |
| :-------------------- | :---------------------- | :--------------------------------------------- |
| `Content-Type`        | `application/json`      | Formato de los datos                           |
| `Authorization`       | `Bearer <TU_TOKEN_JWT>` | Token de autenticación                         |
| `x-virteex-tenant-id` | `<TENANT_ID>`           | ID del inquilino (debe coincidir con el token) |

---

## 1. Cuentas (Accounts)

### Crear una nueva cuenta

- **Método:** `POST`
- **URL:** `{{base_url}}/accounting/accounts`
- **Cuerpo (JSON):**

```json
{
  "tenantId": "tenant-123",
  "code": "1101",
  "name": "Caja General",
  "type": "ASSET",
  "parentId": null
}
```

#### Tipos de Cuenta Disponibles (`AccountType`):

- `ASSET` (Activo)
- `LIABILITY` (Pasivo)
- `EQUITY` (Patrimonio)
- `REVENUE` (Ingresos)
- `EXPENSE` (Gastos)

### Obtener todas las cuentas

- **Método:** `GET`
- **URL:** `{{base_url}}/accounting/accounts?tenantId=tenant-123`

---

## 2. Asientos Contables (Journal Entries)

### Registrar un nuevo asiento

- **Método:** `POST`
- **URL:** `{{base_url}}/accounting/journal-entries`
- **Cuerpo (JSON):**

```json
{
  "tenantId": "tenant-123",
  "date": "2023-10-27T10:00:00Z",
  "description": "Pago de servicios básicos",
  "lines": [
    {
      "accountId": "uuid-cuenta-gasto",
      "debit": "150.00",
      "credit": "0.00",
      "description": "Gasto de luz"
    },
    {
      "accountId": "uuid-cuenta-caja",
      "debit": "0.00",
      "credit": "150.00",
      "description": "Salida de efectivo"
    }
  ]
}
```

> **Nota:** La suma de los débitos (`debit`) debe ser igual a la suma de los créditos (`credit`) para que el asiento sea válido.

### Obtener todos los asientos contables

- **Método:** `GET`
- **URL:** `{{base_url}}/accounting/journal-entries?tenantId=tenant-123`

---

## Tips Pro en Postman

1. **Variables de Entorno:** Crea un entorno en Postman y define `base_url`, `token` y `tenantId` para reutilizarlos fácilmente.
2. **Scripts de Pre-solicitud:** Si tienes un endpoint de login, puedes configurar un script para actualizar automáticamente el `token` en las variables de entorno.
3. **Validaciones:** En la pestaña "Tests", puedes añadir validaciones básicas como:
   ```javascript
   pm.test('Status code is 201', function () {
     pm.response.to.have.status(201);
   });
   ```
