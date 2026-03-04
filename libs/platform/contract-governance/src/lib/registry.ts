import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

export interface RegistryEntry {
  version: string;
  sdlHash: string;
  manifestHash: string;
  timestamp: string;
  subgraphs: string[];
  status: 'APPROVED' | 'PENDING' | 'REJECTED';
}

export class ContractRegistry {
  private registryPath: string;

  constructor(registryPath: string = 'artifacts/contract-registry') {
    this.registryPath = registryPath;
    if (!existsSync(this.registryPath)) {
      mkdirSync(this.registryPath, { recursive: true });
    }
  }

  public async register(sdl: string, manifest: any, status: 'APPROVED' | 'PENDING' = 'APPROVED'): Promise<void> {
    const version = manifest.version || new Date().getTime().toString();
    const entryPath = join(this.registryPath, `supergraph-${version}.json`);
    const sdlPath = join(this.registryPath, `supergraph-${version}.graphql`);

    const entry: RegistryEntry = {
      version,
      sdlHash: manifest.hash,
      manifestHash: 'N/A', // Could be added if we hash the manifest itself
      timestamp: new Date().toISOString(),
      subgraphs: manifest.subgraphs || [],
      status,
    };

    writeFileSync(entryPath, JSON.stringify(entry, null, 2));
    writeFileSync(sdlPath, sdl);

    // Update index
    this.updateIndex(entry);

    console.log(`Registered supergraph version ${version} in the contract registry.`);
  }

  private updateIndex(entry: RegistryEntry): void {
    const indexPath = join(this.registryPath, 'index.json');
    let index: RegistryEntry[] = [];
    if (existsSync(indexPath)) {
      index = JSON.parse(readFileSync(indexPath, 'utf8'));
    }
    index.push(entry);
    writeFileSync(indexPath, JSON.stringify(index, null, 2));
  }
}
