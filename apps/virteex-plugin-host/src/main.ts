import { SandboxService } from './sandbox.service';
import { PluginAdmissionService } from './services/plugin-admission.service';

async function main() {
  console.log('Starting Virteex Plugin Host...');

  const sandbox = new SandboxService();
  const admissionService = new PluginAdmissionService();

  // Simulated plugin code (could come from DB or request)
  const pluginCode = `
    log('Hello from inside the sandbox!');
    const result = 1 + 1;
    log('Result:', result);
  `;

  console.log('Validating plugin...');
  const admission = await admissionService.validate(pluginCode);

  if (!admission.approved) {
    console.error('Plugin rejected:', admission.violations);
    process.exit(1);
  }

  console.log('Plugin approved. Risk Score:', admission.riskScore);

  console.log('Running plugin...');
  const result = await sandbox.run(pluginCode);

  if (result.success) {
    console.log('Script executed successfully.');
    console.log('Logs:', result.logs);
  } else {
    console.error('Script execution failed.', result.error);
    if (result.forensicData) {
        console.error('Forensic Data available for audit.');
    }
  }

  // Keep alive or exit
  sandbox.dispose();
}

main();
