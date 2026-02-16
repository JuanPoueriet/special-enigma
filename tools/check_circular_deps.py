import os
import re
import json
import sys

# Load tsconfig paths
try:
    with open('tsconfig.base.json', 'r') as f:
        tsconfig = json.load(f)
except Exception as e:
    print(f"Error reading tsconfig.base.json: {e}")
    sys.exit(1)

paths = tsconfig.get('compilerOptions', {}).get('paths', {})

def resolve_alias(import_path):
    for alias, targets in paths.items():
        # strict match for exact alias (e.g. "@virteex/auth")
        if alias == import_path:
            return targets[0] # Take the first target
        # match wildcard alias (e.g. "@virteex/auth/*")
        if alias.endswith('*') and import_path.startswith(alias[:-1]):
            suffix = import_path[len(alias)-1:]
            target_base = targets[0][:-1]
            return target_base + suffix
    return None

def resolve_file(base_dir, import_path):
    # returns absolute path or relative from root
    # 1. Check alias
    resolved = resolve_alias(import_path)
    if resolved:
        return os.path.normpath(resolved)

    # 2. Relative path
    if import_path.startswith('.'):
        abs_path = os.path.normpath(os.path.join(base_dir, import_path))
        # Try extensions
        for ext in ['.ts', '.tsx', '/index.ts', '/index.tsx']:
             if os.path.exists(abs_path + ext):
                 return os.path.normpath(abs_path + ext)
             if os.path.exists(abs_path) and os.path.isdir(abs_path):
                 if os.path.exists(os.path.join(abs_path, 'index.ts')):
                      return os.path.normpath(os.path.join(abs_path, 'index.ts'))

        # Fallback assumption for missing files
        if not abs_path.endswith('.ts'):
             return abs_path + '.ts'
        return abs_path

    return None # External dependency or unresolvable

# Build Graph
graph = {} # file -> list of dependencies
files_to_scan = []

print("Scanning for .ts/.tsx files in apps/ and libs/...")
for root, dirs, files in os.walk('.'):
    if 'node_modules' in dirs: dirs.remove('node_modules')
    if '.git' in dirs: dirs.remove('.git')

    for file in files:
        if file.endswith('.ts') or file.endswith('.tsx'):
            # Only scan libs and apps
            rel_path = os.path.relpath(os.path.join(root, file), '.')
            if rel_path.startswith('libs') or rel_path.startswith('apps'):
                files_to_scan.append(rel_path)

print(f"Scanning {len(files_to_scan)} files...")

for file_path in files_to_scan:
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except:
        continue

    deps = []
    # Regex for imports: import ... from '...' or import ... from "..."
    # Also export ... from '...'
    # Use [\s\S]*? to match across newlines for multiline imports
    imports = re.findall(r'(?:import|export)\s+[\s\S]*?from\s+[\'"](.*?)[\'"]', content)

    base_dir = os.path.dirname(file_path)
    for imp in imports:
        resolved = resolve_file(base_dir, imp)
        # Check if resolved file is within our scan scope (internal source)
        if resolved:
            # We need to normalize resolved path to match file_path format (relative to root)
            if resolved.startswith('./'):
                resolved = resolved[2:]

            if resolved in files_to_scan:
                 deps.append(resolved)
            # Handle case where file exists but wasn't in scan list (unlikely if scan is correct)
            elif os.path.exists(resolved) and (resolved.startswith('libs') or resolved.startswith('apps')):
                 deps.append(resolved)

    graph[file_path] = deps

# Find Cycles (DFS)
cycles = []
visited = set()
stack = []
on_stack = set()

def dfs(u, path):
    visited.add(u)
    stack.append(u)
    on_stack.add(u)

    for v in graph.get(u, []):
        if v in on_stack:
            # Cycle found!
            cycle = stack[stack.index(v):]
            # Normalize cycle representation (start with smallest path for consistency)
            cycles.append(list(cycle))
        elif v not in visited:
            dfs(v, path)

    on_stack.remove(u)
    stack.pop()

# Sort keys to make DFS deterministic
sorted_nodes = sorted(list(graph.keys()))

for node in sorted_nodes:
    if node not in visited:
        dfs(node, [])

# Deduplicate cycles (since A->B->A is same as B->A->B)
unique_cycles = []
seen_cycle_sets = set()

for cycle in cycles:
    cycle_set = frozenset(cycle)
    if cycle_set not in seen_cycle_sets:
        seen_cycle_sets.add(cycle_set)
        unique_cycles.append(cycle)

print(f"Found {len(unique_cycles)} unique circular dependency chains.")

# Report
with open('REPORTE_DEPENDENCIAS_CIRCULARES.txt', 'w') as f:
    if unique_cycles:
        f.write(f"Se encontraron {len(unique_cycles)} cadenas de dependencias circulares:\n\n")
        for i, cycle in enumerate(unique_cycles):
            f.write(f"Ciclo {i+1}:\n")
            for node in cycle:
                f.write(f"  -> {node}\n")
            f.write(f"  -> {cycle[0]} (cierra el ciclo)\n\n")
    else:
        f.write("No se encontraron dependencias circulares en el código analizado (apps/ y libs/).\n")
