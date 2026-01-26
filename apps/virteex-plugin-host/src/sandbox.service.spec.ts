import { SandboxService } from './sandbox.service';

describe('SandboxService', () => {
  let sandbox: SandboxService;

  beforeEach(() => {
    sandbox = new SandboxService();
  });

  afterEach(() => {
    sandbox.dispose();
  });

  it('should execute valid code', async () => {
    const success = await sandbox.run('const a = 1; const b = 2;');
    expect(success).toBe(true);
  });

  it('should handle errors gracefully', async () => {
    const success = await sandbox.run('throw new Error("Boom");');
    expect(success).toBe(false);
  });

  it('should timeout infinite loops', async () => {
    const success = await sandbox.run('while(true) {}', 50); // Short timeout
    expect(success).toBe(false);
  });
});
