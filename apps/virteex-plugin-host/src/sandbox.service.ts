import ivm from 'isolated-vm';

export interface SandboxResult {
  success: boolean;
  logs: string[];
  error?: string;
  forensicData?: {
    code: string;
    stack?: string;
  };
}

export class SandboxService {
  private isolate: ivm.Isolate;
  private context: ivm.Context;
  private jail: ivm.Reference<any>;
  private logs: string[] = [];
  private readonly MAX_LOGS = 100;

  constructor() {
    this.isolate = new ivm.Isolate({ memoryLimit: 128 });
    this.context = this.isolate.createContextSync();
    this.jail = this.context.global;
    this.jail.setSync('global', this.jail.derefInto());

    this.jail.setSync('log', (...args: any[]) => {
      if (this.logs.length < this.MAX_LOGS) {
         this.logs.push(args.map(a => String(a)).join(' '));
      }
    });
  }

  async run(code: string, timeout = 100): Promise<SandboxResult> {
    this.logs = []; // Reset logs
    try {
      const script = this.isolate.compileScriptSync(code);
      await script.run(this.context, { timeout });
      return { success: true, logs: this.logs };
    } catch (err: any) {
      // Forensic Mode
      const forensicData = {
        code,
        stack: err?.stack || String(err)
      };

      console.error('[SANDBOX FORENSIC]', forensicData);

      return {
        success: false,
        logs: this.logs,
        error: String(err),
        forensicData
      };
    }
  }

  dispose() {
    this.isolate.dispose();
  }
}
