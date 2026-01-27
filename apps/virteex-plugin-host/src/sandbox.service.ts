import ivm from 'isolated-vm';

export interface SandboxResult {
  success: boolean;
  logs: string[];
  error?: string;
  executionTimeMs?: number;
  forensicData?: {
    code: string;
    stack?: string;
    memoryUsage?: number;
  };
}

export class SandboxService {
  private isolate: ivm.Isolate;
  private context: ivm.Context;
  private jail: ivm.Reference<any>;
  private logs: string[] = [];
  private readonly MAX_LOGS = 100;
  // Hard limits
  private readonly MEMORY_LIMIT_MB = 128;
  private readonly DEFAULT_TIMEOUT_MS = 100;

  constructor() {
    // Enforce strict memory limit
    this.isolate = new ivm.Isolate({
      memoryLimit: this.MEMORY_LIMIT_MB
    });
    this.context = this.isolate.createContextSync();
    this.jail = this.context.global;

    // Secure the global scope - deny default access
    this.jail.setSync('global', this.jail.derefInto());

    // Controlled Logging Interface
    this.jail.setSync('log', (...args: any[]) => {
      if (this.logs.length < this.MAX_LOGS) {
         this.logs.push(args.map(a => String(a)).join(' '));
      }
    });

    // NOTE: Network access is strictly denied by default.
    // No 'fetch', 'XMLHttpRequest', or 'axios' are injected into the context.
  }

  async run(code: string, timeout = this.DEFAULT_TIMEOUT_MS): Promise<SandboxResult> {
    this.logs = []; // Reset logs
    const start = Date.now();

    try {
      const script = this.isolate.compileScriptSync(code);

      // Execute with strict timeout enforcement
      await script.run(this.context, {
        timeout: timeout,
        release: true // Release the script after execution to free memory
      });

      const duration = Date.now() - start;

      return {
        success: true,
        logs: this.logs,
        executionTimeMs: duration
      };

    } catch (err: any) {
      const duration = Date.now() - start;

      // Forensic Mode: Capture details for security audit
      const forensicData = {
        code,
        stack: err?.stack || String(err),
        memoryUsage: this.isolate.getHeapStatisticsSync().total_heap_size
      };

      console.error('[SANDBOX FORENSIC] Execution failed or violated limits:', forensicData);

      return {
        success: false,
        logs: this.logs,
        error: String(err),
        executionTimeMs: duration,
        forensicData
      };
    }
  }

  dispose() {
    if (!this.isolate.isDisposed) {
      this.context.release();
      this.isolate.dispose();
    }
  }
}
