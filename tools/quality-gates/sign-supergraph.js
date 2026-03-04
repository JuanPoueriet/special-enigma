const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

function registerInContractRegistry(sdl, manifest, registryPath = 'artifacts/contract-registry') {
  if (!fs.existsSync(registryPath)) {
    fs.mkdirSync(registryPath, { recursive: true });
  }

  const version = manifest.version || new Date().getTime().toString();
  const entryPath = path.join(registryPath, `supergraph-${version}.json`);
  const sdlPath = path.join(registryPath, `supergraph-${version}.graphql`);

  const entry = {
    version,
    sdlHash: manifest.hash,
    timestamp: new Date().toISOString(),
    subgraphs: manifest.subgraphs || [],
    status: 'APPROVED',
  };

  fs.writeFileSync(entryPath, JSON.stringify(entry, null, 2));
  fs.writeFileSync(sdlPath, sdl);

  // Update index
  const indexPath = path.join(registryPath, 'index.json');
  let index = [];
  if (fs.existsSync(indexPath)) {
    index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
  }
  index.push(entry);
  fs.writeFileSync(indexPath, JSON.stringify(index, null, 2));

  console.log(`Registered supergraph version ${version} in the contract registry.`);
}

function signSupergraph(sdlPath, manifestPath, privateKeyPath, owner, subgraphs) {
  if (!fs.existsSync(privateKeyPath)) {
    console.error(`Private key not found at ${privateKeyPath}. For local development, generate one using openssl. For CI, it should be provided via environment secret.`);
    process.exit(1);
  }

  const sdl = fs.readFileSync(sdlPath, 'utf8');
  const hash = crypto.createHash('sha256').update(sdl).digest('hex');

  const privateKey = fs.readFileSync(privateKeyPath, 'utf8');
  const sign = crypto.createSign('SHA256');
  sign.update(sdl);
  sign.end();
  const signature = sign.sign(privateKey, 'hex');

  const manifest = {
    version: new Date().getTime().toString(),
    hash,
    signature,
    date: new Date().toISOString(),
    owner,
    subgraphs,
  };

  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log('Supergraph manifest created at ' + manifestPath);

  // Auto-register in the registry
  registerInContractRegistry(sdl, manifest);
}

const args = process.argv.slice(2);
if (args.length < 5) {
  console.error('Usage: node sign-supergraph.js <sdlPath> <manifestPath> <privateKeyPath> <owner> <subgraph1,subgraph2,...>');
  process.exit(1);
}
const [sdlPath, manifestPath, privateKeyPath, owner, subgraphsRaw] = args;
signSupergraph(sdlPath, manifestPath, privateKeyPath, owner, subgraphsRaw.split(','));
