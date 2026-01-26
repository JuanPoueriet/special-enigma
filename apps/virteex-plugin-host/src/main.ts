import { SandboxService } from './sandbox.service';

async function main() {
  console.log('Starting Virteex Plugin Host...');

  const sandbox = new SandboxService();

  console.log('Running test script...');
  const success = await sandbox.run(`
    log('Hello from inside the sandbox!');
    const result = 1 + 1;
    log('Result:', result);
  `);

  if (success) {
    console.log('Script executed successfully.');
  } else {
    console.error('Script execution failed.');
  }

  // Keep alive or exit
  // process.exit(0);
}

main();
