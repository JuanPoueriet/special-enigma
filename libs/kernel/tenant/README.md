# tenant (Kernel - Tenant)

## 🎯 Purpose
This library manages **Multi-Tenancy** context and isolation strategies.

## 🔑 Key Features
- **Context:** AsyncLocalStorage wrapper for Tenant ID.
- **Resolution:** Strategy to resolve tenant from headers/subdomains.
- **Isolation:** Utilities for RLS (Row Level Security) and Schema switching.
