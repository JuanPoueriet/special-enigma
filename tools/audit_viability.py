import os
import re

IGNORE_DIRS = {'node_modules', '.git', 'dist', 'coverage', '.nx', 'tmp'}
IGNORE_EXTS = {'.spec.ts', '.test.ts', '.e2e-spec.ts', '.json', '.md', '.png', '.jpg', '.svg'}

PATTERNS = [
    (r'class .*Mock.*', 'Mock Class Definition'),
    (r'TODO', 'TODO Comment'),
    (r'FIXME', 'FIXME Comment'),
    (r'NotImplemented', 'Not Implemented Error'),
    (r'return \[\];', 'Potential Stub (Empty Array)'),
    (r'return true;', 'Potential Stub (True)'),
    (r'return null;', 'Potential Stub (Null)'),
    (r'console\.log', 'Console Log'),
    (r'import .*faker.*', 'Faker Import'),
    (r'const data = \[', 'Hardcoded Data Array'),
    (r'const MOCK_DATA', 'Explicit Mock Data Variable')
]

def scan_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            lines = f.readlines()
            for i, line in enumerate(lines):
                for pattern, description in PATTERNS:
                    if re.search(pattern, line):
                        # Filter out common false positives for 'return true' inside validation functions
                        if "Potential Stub" in description and "validate" in filepath.lower():
                            continue
                        print(f"[{description}] {filepath}:{i+1} -> {line.strip()[:100]}")
    except Exception as e:
        pass

def main():
    root_dir = '.'
    for root, dirs, files in os.walk(root_dir):
        # Filter directories
        dirs[:] = [d for d in dirs if d not in IGNORE_DIRS]

        for file in files:
            if any(file.endswith(ext) for ext in IGNORE_EXTS):
                continue

            filepath = os.path.join(root, file)
            scan_file(filepath)

if __name__ == "__main__":
    main()
