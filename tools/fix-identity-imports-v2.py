import os
import re

def main():
    replacements = [
        # Fix components relative path (one level deeper needed)
        (r'from\s*[\'"]\.\./components/', r"from '../../components/"),

        # Fix shared/core services to point to shared-ui
        (r'from\s*[\'"]\.\./\.\./\.\./core/services/auth[\'"]', r"from '@virteex/shared-ui'"),
        (r'from\s*[\'"]\.\./\.\./\.\./core/services/notification[\'"]', r"from '@virteex/shared-ui'"),
        (r'from\s*[\'"]\.\./\.\./\.\./core/services/language[\'"]', r"from '@virteex/shared-ui'"),
        (r'from\s*[\'"]\.\./\.\./\.\./core/services/country\.service[\'"]', r"from '@virteex/shared-ui'"),
        (r'from\s*[\'"]\.\./\.\./\.\./core/services/websocket\.service[\'"]', r"from '@virteex/shared-ui'"),
        (r'from\s*[\'"]\.\./\.\./\.\./core/api/users\.service[\'"]', r"from '@virteex/shared-ui'"),
        (r'from\s*[\'"]\.\./\.\./\.\./core/api/roles\.service[\'"]', r"from '@virteex/shared-ui'"),
        (r'from\s*[\'"]\.\./\.\./\.\./core/api/security\.service[\'"]', r"from '@virteex/shared-ui'"),

        # Fix deep relative paths in specs
        (r'from\s*[\'"]\.\./\.\./\.\./\.\./core/services/auth[\'"]', r"from '@virteex/shared-ui'"),
        (r'from\s*[\'"]\.\./\.\./\.\./\.\./core/services/language[\'"]', r"from '@virteex/shared-ui'"),
        (r'from\s*[\'"]\.\./\.\./\.\./\.\./\.\./core/services/country\.service[\'"]', r"from '@virteex/shared-ui'"),

        # Fix HasPermissionDirective
        (r'from\s*[\'"]\.\./\.\./\.\./shared/directives/has-permission\.directive[\'"]', r"from '@virteex/shared-ui'"),

        # Fix OtpComponent
        (r'from\s*[\'"]\.\./\.\./\.\./shared/components/otp/otp\.component[\'"]', r"from '@virteex/shared-ui'"),
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
