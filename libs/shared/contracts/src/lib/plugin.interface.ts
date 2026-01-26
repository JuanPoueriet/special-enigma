export interface IPluginContext {
  tenantId: string;
  config: Record<string, any>;
  logger: {
    log: (message: string) => void;
    error: (message: string) => void;
  };
}

export interface IPlugin {
  name: string;
  version: string;
  onInit(context: IPluginContext): Promise<void>;
  execute(input: any): Promise<any>;
  onDestroy(): Promise<void>;
}

export interface IPluginManifest {
  name: string;
  version: string;
  permissions: string[];
  entryPoint: string;
}
