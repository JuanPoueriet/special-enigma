import { SandboxService } from './sandbox.service';

describe('SandboxService', () => {
  let sandbox: SandboxService;

  beforeEach(() => {
    sandbox = new SandboxService();
  });

  it('should execute valid code', async () => {
    const result = await sandbox.run('const a = 1; const b = 2;');
    expect(result.success).toBe(true);
  });

  it('should handle errors gracefully', async () => {
    const result = await sandbox.run('throw new Error("Boom");');
    expect(result.success).toBe(false);
    expect(result.error).toContain('Boom');
    expect(result.forensicData).toBeDefined();
  });

  it('should timeout infinite loops', async () => {
    const result = await sandbox.run('while(true) {}', 50); // Short timeout
    expect(result.success).toBe(false);
    expect(result.error).toContain('timed out');
    expect(result.forensicData).toBeDefined();
  });
});
