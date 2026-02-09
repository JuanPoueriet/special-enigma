
export interface MockContext {
  global: {
    setSync: (key: string, val: unknown) => void;
    derefInto: () => Record<string, unknown>;
  };
  release: () => void;
}

export interface MockScriptOptions {
  filename?: string;
}

export interface MockIsolateOptions {
  memoryLimit?: number;
}

class MockScript {
  constructor(private code: string) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async run(_context: MockContext, _options?: Record<string, unknown>): Promise<boolean> {
    if (this.code.includes('throw')) {
      throw new Error('Boom');
    }
    if (this.code.includes('while(true)')) {
       throw new Error('Script execution timed out.');
    }
    return true;
  }
}

class MockIsolate {
  public isDisposed = false;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(_opts?: MockIsolateOptions) {
    // Intentional no-op
  }

  createContextSync(): MockContext {
    return {
      global: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        setSync: (_key: string, _val: unknown) => { /* no-op */ },
        derefInto: () => ({}),
      },
      release: () => { /* no-op */ },
    };
  }

  compileScriptSync(code: string): MockScript {
    return new MockScript(code);
  }

  getHeapStatisticsSync(): { total_heap_size: number } {
    return { total_heap_size: 1024 };
  }

  dispose(): void {
    this.isDisposed = true;
  }
}

export const Isolate = MockIsolate;
