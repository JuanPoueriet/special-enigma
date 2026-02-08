
class MockScript {
  constructor(private code: string) {}
  async run(context: any, options: any) {
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
  constructor(opts: any) {}

  createContextSync() {
    return {
      global: {
        setSync: (key: string, val: any) => {},
        derefInto: () => ({}),
      },
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
