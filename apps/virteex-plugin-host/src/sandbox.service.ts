
// eslint-disable-next-line @typescript-eslint/no-var-requires
let ivm: any;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  ivm = require('isolated-vm');
} catch (_e) {
  console.warn('isolated-vm not found, using mock implementation for development/environment safety');
  ivm = {
    Isolate: class {
      isDisposed = false;
      // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
      constructor(_opts: any) {}
      createContextSync() {
        return {
          global: {
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            setSync: () => {},
            derefInto: () => ({}),
          },
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          release: () => {},
        };
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      compileScriptSync(_code: string) {
        return {
          run: async () => ({})
        };
      }
      getHeapStatisticsSync() {
        return { total_heap_size: 0 };
      }
      dispose() {
        this.isDisposed = true;
      }
    }
  };
}

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
  private readonly MEMORY_LIMIT_MB = 128;
  private readonly DEFAULT_TIMEOUT_MS = 100;

  async run(code: string, timeout = this.DEFAULT_TIMEOUT_MS): Promise<SandboxResult> {
    let isolate: any = null;
    let context: any = null;
    const logs: string[] = [];

    const start = Date.now();

    try {
      // Create a fresh isolate for every execution (Strict Isolation)
      isolate = new ivm.Isolate({
        memoryLimit: this.MEMORY_LIMIT_MB
      });
      context = isolate.createContextSync();

      const jail = context.global;

      // Secure the global scope - deny default access
      jail.setSync('global', jail.derefInto());

      // Controlled Logging Interface
      jail.setSync('log', (...args: any[]) => {
        if (logs.length < 100) {
           logs.push(args.map(a => String(a)).join(' '));
        }
      });

      // Compile and Run
      const script = isolate.compileScriptSync(code);
      await script.run(context, {
        timeout: timeout,
        release: true
      });

      return {
        success: true,
        logs: logs,
        executionTimeMs: Date.now() - start
      };

    } catch (err: any) {
      const duration = Date.now() - start;
      const memoryUsage = isolate ? isolate.getHeapStatisticsSync().total_heap_size : 0;

      const forensicData = {
        code,
        stack: err?.stack || String(err),
        memoryUsage
      };

      return {
        success: false,
        logs: logs,
        error: String(err),
        executionTimeMs: duration,
        forensicData
      };

    } finally {
      // Cleanup
      if (context) context.release();
      if (isolate && !isolate.isDisposed) isolate.dispose();
    }
  }
}
