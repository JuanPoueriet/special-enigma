import os
import re

def main():
    replacements = [
        (r'import\s+{\s*([^}]+)\s*}\s*from\s*[\'"]\.\./\.\./\.\./core/services/auth[\'"]', r"import { \1 } from '@virteex/shared-ui'"),
        (r'import\s+{\s*([^}]+)\s*}\s*from\s*[\'"]\.\./\.\./\.\./core/services/notification[\'"]', r"import { \1 } from '@virteex/shared-ui'"),
        (r'import\s+{\s*([^}]+)\s*}\s*from\s*[\'"]\.\./\.\./\.\./core/services/language[\'"]', r"import { \1 } from '@virteex/shared-ui'"),
        (r'import\s+{\s*([^}]+)\s*}\s*from\s*[\'"]\.\./\.\./\.\./core/services/country\.service[\'"]', r"import { \1 } from '@virteex/shared-ui'"),
        (r'import\s+{\s*([^}]+)\s*}\s*from\s*[\'"]\.\./\.\./\.\./core/services/websocket\.service[\'"]', r"import { \1 } from '@virteex/shared-ui'"),
        (r'import\s+{\s*([^}]+)\s*}\s*from\s*[\'"]\.\./\.\./\.\./core/api/users\.service[\'"]', r"import { \1 } from '@virteex/shared-ui'"),
        (r'import\s+{\s*([^}]+)\s*}\s*from\s*[\'"]\.\./\.\./\.\./core/api/roles\.service[\'"]', r"import { \1 } from '@virteex/shared-ui'"),
        (r'import\s+{\s*([^}]+)\s*}\s*from\s*[\'"]\.\./\.\./\.\./core/api/security\.service[\'"]', r"import { \1 } from '@virteex/shared-ui'"),
        # deeper relative paths in specs
        (r'import\s+{\s*([^}]+)\s*}\s*from\s*[\'"]\.\./\.\./\.\./\.\./core/services/auth[\'"]', r"import { \1 } from '@virteex/shared-ui'"),
        (r'import\s+{\s*([^}]+)\s*}\s*from\s*[\'"]\.\./\.\./\.\./\.\./core/services/language[\'"]', r"import { \1 } from '@virteex/shared-ui'"),
        # step-configuration spec
        (r'import\s+{\s*([^}]+)\s*}\s*from\s*[\'"]\.\./\.\./\.\./\.\./\.\./core/services/country\.service[\'"]', r"import { \1 } from '@virteex/shared-ui'"),
    ]

    target_dir = 'libs/domains/identity/ui/src/lib'

    for root, dirs, files in os.walk(target_dir):
        for file in files:
            if file.endswith('.ts'):
                filepath = os.path.join(root, file)
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()

                new_content = content
                for pattern, replacement in replacements:
                    new_content = re.sub(pattern, replacement, new_content)

                if new_content != content:
                    print(f"Updating {filepath}")
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(new_content)

if __name__ == '__main__':
    main()
