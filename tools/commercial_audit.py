import os
import re

def scan_codebase(root_dir):
    report = []

    # Patterns to search for
    patterns = {
        "Hardcoded MXN Currency": r"['\"]MXN['\"]",
        "Hardcoded USD Currency": r"['\"]USD['\"]",
        "Hardcoded Tax Rate (16%)": r"0\.16",
        "Hardcoded Tax Name (IVA)": r"['\"]IVA['\"]",
        "Hardcoded RFC (Mexico ID)": r"['\"]RFC['\"]",
        "Explicit TODOs": r"TODO",
        "Explicit FIXMEs": r"FIXME",
        "Mock Return (Empty List)": r"return\s*\[\]",
        "Mock Return (True)": r"return\s*true",
        "Console Log": r"console\.log",
        "Alert": r"window\.alert"
    }

    # Files/Dirs to ignore
    ignore_dirs = {'.git', 'node_modules', 'dist', 'coverage', '.nx', 'tools'}
    ignore_files = {'commercial_audit.py', 'audit_viability.py', 'audit_codebase_v2.py', 'package-lock.json', 'yarn.lock'}

    for root, dirs, files in os.walk(root_dir):
        # Filter directories
        dirs[:] = [d for d in dirs if d not in ignore_dirs]

        for file in files:
            if file in ignore_files or file.endswith('.spec.ts') or file.endswith('.md') or file.endswith('.txt'):
                continue

            filepath = os.path.join(root, file)

            # Check filename for "mock"
            if "mock" in file.lower():
                report.append(f"[MOCK FILE] Found mock file: {filepath}")

            try:
                with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()

                    for name, pattern in patterns.items():
                        matches = re.findall(pattern, content, re.IGNORECASE)
                        if matches:
                            # Context extraction (first match)
                            match_obj = re.search(pattern, content, re.IGNORECASE)
                            start = max(0, match_obj.start() - 30)
                            end = min(len(content), match_obj.end() + 30)
                            context = content[start:end].replace('\n', ' ').strip()

                            report.append(f"[{name}] in {filepath}: ...{context}...")

            except Exception as e:
                report.append(f"[ERROR] Could not read {filepath}: {str(e)}")

    return report

if __name__ == "__main__":
    print("Starting Commercial Audit Scan...")
    findings = scan_codebase(".")

    with open("audit_results.txt", "w") as f:
        for item in findings:
            f.write(item + "\n")
            print(item)

    print(f"\nScan complete. {len(findings)} issues found. Saved to audit_results.txt")
