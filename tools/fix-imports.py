import json
import os
import re

def load_tsconfig():
    with open('tsconfig.base.json', 'r') as f:
        # Remove comments if any (simple approach)
        content = re.sub(r'//.*', '', f.read())
        return json.loads(content)

def get_paths(tsconfig):
    paths = tsconfig.get('compilerOptions', {}).get('paths', {})
    mapping = {}
    for alias, locs in paths.items():
        if not locs: continue
        if alias.endswith('/*'):
            alias_base = alias[:-2]
            loc_base = locs[0].replace('/*', '')
            mapping[alias_base] = loc_base
        else:
             # handle index imports if needed, but the issue is mostly deep imports
             alias_base = alias
             loc_base = os.path.dirname(locs[0]) # Assuming src/index.ts -> src/
             mapping[alias_base] = loc_base
    return mapping

def resolve_relative_path(current_file, target_path):
    # current_file: libs/kernel/finops/src/lib/finops.module.ts
    # target_path: libs/kernel/finops/src/lib/finops.service

    current_dir = os.path.dirname(current_file)
    rel_path = os.path.relpath(target_path, current_dir)

    if not rel_path.startswith('.'):
        rel_path = './' + rel_path

    # remove extension if present (imports usually don't have .ts)
    if rel_path.endswith('.ts'):
        rel_path = rel_path[:-3]

    return rel_path

def main():
    tsconfig = load_tsconfig()
    mapping = get_paths(tsconfig)

    # Sort mapping by length descending to match longest prefix first
    sorted_aliases = sorted(mapping.keys(), key=len, reverse=True)

    for root, dirs, files in os.walk('.'):
        if 'node_modules' in root or '.git' in root or 'dist' in root:
            continue

        for file in files:
            if not file.endswith('.ts'):
                continue

            filepath = os.path.join(root, file)
            # Normalise path
            filepath = filepath.replace('\\', '/')
            if filepath.startswith('./'):
                filepath = filepath[2:]

            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
            except UnicodeDecodeError:
                continue

            new_content = content
            modified = False

            def replacer(match):
                nonlocal modified
                quote = match.group(1)
                import_path = match.group(2)

                # Check if import matches any alias
                for alias in sorted_aliases:
                    if import_path.startswith(alias + '/'):
                        # Found a matching alias.
                        lib_root = mapping[alias]
                        # Assume lib_root is relative to project root, e.g. libs/kernel/finops/src/

                        if filepath.startswith(lib_root):
                            # It is a self-reference!
                            # Construct absolute target path
                            suffix = import_path[len(alias)+1:]
                            target_path = os.path.join(lib_root, suffix)

                            # Convert to relative
                            rel_path = resolve_relative_path(filepath, target_path)

                            # Log only if changing
                            # print(f"  {import_path} -> {rel_path}")

                            modified = True
                            return f'{quote}{rel_path}{quote}'

                    elif import_path == alias:
                         # import from index
                        lib_root = mapping[alias] # e.g. libs/kernel/finops/src/
                        if filepath.startswith(lib_root):
                             # importing index from within lib? quirky but possible.
                             # usually index is parent.
                             target_path = lib_root + 'index' # approximate
                             rel_path = resolve_relative_path(filepath, target_path)
                             modified = True
                             return f'{quote}{rel_path}{quote}'

                return match.group(0)

            # Regex for imports: import ... from '...' or import '...' or export ... from '...'
            # We want to capture the quote and the path
            # Simple regex: (['"])(@virteex/[^'"]+)\1

            new_content = re.sub(r'([\'"])(@virteex/[^\'"]+)\1', replacer, content)

            if modified:
                print(f"Fixing {filepath}")
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)

if __name__ == '__main__':
    main()
