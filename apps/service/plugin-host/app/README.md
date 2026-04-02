# virtex Plugin Host (Secure Sandbox)

## 🎯 Purpose
The **virtex Plugin Host** is the **Secure Execution Environment** for untrusted third-party code (plugins/extensions). It allows tenants to extend the ERP's functionality (e.g., custom tax calculators, report generators) without compromising the security or stability of the core system.

## 🛡 Security & Isolation
The application implements strict isolation using **isolated-vm** (V8 Isolates) or a carefully configured **Node.js VM** fallback.

### Key Security Features:
- **Memory Limits:** Each plugin execution is capped (e.g., 128MB).
- **Execution Timeouts:** Scripts are terminated if they exceed the allotted time (e.g., 100ms).
- **Restricted Access:** Plugins have **zero access** to the host filesystem, network, or environment variables.
- **Controlled I/O:** Communication is strictly through defined input/output channels.

## 🏗 Architecture
- **Sandbox Service:** Manages the lifecycle of isolates.
- **Admission Service:** Validates plugin code before execution (SAST/Regex checks).
- **Forensic Logging:** Captures detailed metrics (CPU time, memory usage) for auditing.

## ⚠️ Important Notes
- This service must run with the **lowest possible privileges** (non-root user).
- `node-gyp` is required for `isolated-vm`. If installation fails, the system falls back to a mock implementation (dev only).

## 🚀 Running the Application

### Development
```bash
npx nx serve virtex-plugin-host
```

### Production Build
```bash
npx nx build virtex-plugin-host
node dist/apps/virtex-plugin-host/main.js
```

## 🧪 Testing
We use fuzzing and adversarial testing to verify the sandbox escape prevention.

```bash
# Run Security Tests (if configured)
npm run test:security
```
