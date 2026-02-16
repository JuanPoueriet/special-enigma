import os
import re

def audit_directory(root_dir):
    findings = []

    # Patterns to search for
    patterns = {
        'TODO_FIXME': re.compile(r'(TODO|FIXME|HACK|XXX)', re.IGNORECASE),
        'MOCK_STUB': re.compile(r'(mock|stub|fake)', re.IGNORECASE),
        'HARDCODED_ARRAY': re.compile(r'const\s+\w+\s*=\s*\[.*\];', re.DOTALL), # Simplified detection
        'STUBBED_RETURN': re.compile(r'return\s+(true|false|null|undefined|\{\}|\[\])\s*;'),
        'CONSOLE_LOG': re.compile(r'console\.log\('),
        'ALERT': re.compile(r'alert\('),
        'SECRETS': re.compile(r'(key|secret|token|password)\s*[:=]\s*[\'"][^\'"]+[\'"]', re.IGNORECASE)
    }

    # Files to ignore
    ignore_files = ['deep_audit.py', 'audit_results.txt', 'package-lock.json', 'yarn.lock', '.git', 'node_modules', 'dist', 'coverage']
    ignore_extensions = ['.spec.ts', '.test.ts', '.txt', '.md', '.json', '.js', '.map'] # Focusing on source code implementation

    for subdir, dirs, files in os.walk(root_dir):
        # Filter directories
        dirs[:] = [d for d in dirs if d not in ignore_files]

        for file in files:
            if file in ignore_files:
                continue

            # Check extension (we primarily want .ts, .html, .scss for source code)
            _, ext = os.path.splitext(file)
            if ext not in ['.ts', '.html', '.scss']:
                continue

            # Skip test files if strict
            if file.endswith('.spec.ts') or file.endswith('.test.ts'):
                continue

            filepath = os.path.join(subdir, file)

            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    lines = f.readlines()

                for i, line in enumerate(lines):
                    line_content = line.strip()

                    for key, pattern in patterns.items():
                        if pattern.search(line_content):
                            # Refine 'HARDCODED_ARRAY' to avoid false positives in configs or small lists
                            if key == 'HARDCODED_ARRAY':
                                if len(line_content) < 50: # Ignore short arrays
                                    continue

                            # Refine 'SECRETS' to avoid env vars usage like process.env.SECRET
                            if key == 'SECRETS':
                                if 'process.env' in line_content or 'ConfigService' in line_content:
                                    continue

                            findings.append({
                                'type': key,
                                'file': filepath,
                                'line': i + 1,
                                'content': line_content[:100] # Truncate for report
                            })

            except Exception as e:
                # print(f"Could not read {filepath}: {e}")
                pass

    return findings

def print_report(findings):
    print("VIRTEEX CODEBASE AUDIT REPORT")
    print("===========================")

    # Group by Type
    from collections import defaultdict
    grouped = defaultdict(list)
    for f in findings:
        grouped[f['type']].append(f)

    for type_name, items in grouped.items():
        print(f"\n--- {type_name} ({len(items)}) ---")
        # Limit to top 20 per category to avoid spamming stdout, but listing crucial ones
        for item in items[:20]:
            print(f"{item['file']}:{item['line']} -> {item['content']}")
        if len(items) > 20:
            print(f"... and {len(items) - 20} more.")

if __name__ == "__main__":
    # Audit apps and libs
    root_dirs = ['apps', 'libs']
    all_findings = []

    for d in root_dirs:
        if os.path.exists(d):
            all_findings.extend(audit_directory(d))

    print_report(all_findings)
