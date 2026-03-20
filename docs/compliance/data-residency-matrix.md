# Data Residency & Sovereignty Matrix

## Regional Hosting & Sovereignty Controls

| Data Category | US Tenants | BR Tenants | CO Tenants | MX Tenants |
|---|---|---|---|---|
| PII (Personal Info) | us-east-1 | sa-east-1 | us-east-1 (LatAm Hub) | sa-east-1 (LatAm Hub) |
| Fiscal/Tax Records | us-east-1 | sa-east-1 | sa-east-1 | sa-east-1 |
| Banking/Transactions | us-east-1 | sa-east-1 | sa-east-1 | sa-east-1 |
| Backups | us-east-1 / us-west-2 | sa-east-1 | sa-east-1 | sa-east-1 |

## Compliance Profiles

- **US**: SOC2-ready, HIPAA-capable.
- **Brazil**: LGPD strict compliance.
- **Colombia**: DIAN Circular 042 compliance.
- **Mexico**: LFPDPPP compliance.

## Cross-Region Transfer Policy

- **Encryption**: All cross-region data is encrypted with AES-256 and signed via HMAC.
- **Masking**: PII is masked by default during replication unless explicitly authorized for a `compliance:fiscal-critical` scope.
- **Audit**: Every cross-region request generates a signed provenance record in the audit ledger.
