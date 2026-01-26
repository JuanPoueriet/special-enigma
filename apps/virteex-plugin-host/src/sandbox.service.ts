import ivm from 'isolated-vm';

export class SandboxService {
  private isolate: ivm.Isolate;
  private context: ivm.Context;
  private jail: ivm.Reference<any>;

  constructor() {
    this.isolate = new ivm.Isolate({ memoryLimit: 128 });
    this.context = this.isolate.createContextSync();
    this.jail = this.context.global;
    this.jail.setSync('global', this.jail.derefInto());
    this.jail.setSync('log', function(...args: any[]) {
      console.log('[SANDBOX]:', ...args);
    });
  }

  async run(code: string, timeout = 100) {
    try {
      const script = this.isolate.compileScriptSync(code);
      await script.run(this.context, { timeout });
      return true;
    } catch (err) {
      console.error('[SANDBOX ERROR]:', err);
      return false;
    }
  }

  dispose() {
    this.isolate.dispose();
  }
}
