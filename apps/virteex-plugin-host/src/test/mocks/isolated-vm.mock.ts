
class MockScript {
  constructor(private code: string) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async run(_context: any, _options: any) {
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
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  constructor(_opts: any) {}

  createContextSync() {
    return {
      global: {
        // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
        setSync: (_key: string, _val: any) => {},
        derefInto: () => ({}),
      },
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      release: () => {},
    };
  }

  compileScriptSync(code: string) {
    return new MockScript(code);
  }

  getHeapStatisticsSync() {
    return { total_heap_size: 1024 };
  }

  dispose() {
    this.isDisposed = true;
  }
}

const ivm = {
  Isolate: MockIsolate
};

export default ivm;
