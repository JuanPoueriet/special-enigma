#!/usr/bin/env python3
from __future__ import annotations

import argparse
import os
import re
from pathlib import Path

PATTERN = re.compile(r"virt(?:e){2}x", re.IGNORECASE)
REPLACEMENT = "virtex"
SKIP_DIRS = {".git"}


def replace_in_file(file_path: Path) -> bool:
    try:
        content = file_path.read_text(encoding="utf-8")
    except (UnicodeDecodeError, OSError):
        return False

    updated = PATTERN.sub(REPLACEMENT, content)
    if updated == content:
        return False

    file_path.write_text(updated, encoding="utf-8")
    return True


def replace_in_name(name: str) -> str:
    return PATTERN.sub(REPLACEMENT, name)


def process_tree(root: Path) -> tuple[int, int, int]:
    files_updated = 0
    paths_renamed = 0

    for current_root, dirs, files in os.walk(root, topdown=False):
        root_path = Path(current_root)

        if any(part in SKIP_DIRS for part in root_path.parts):
            continue

        for filename in files:
            file_path = root_path / filename
            if replace_in_file(file_path):
                files_updated += 1

        for dirname in dirs:
            old_dir = root_path / dirname
            if dirname in SKIP_DIRS:
                continue
            new_name = replace_in_name(dirname)
            if new_name != dirname:
                new_dir = root_path / new_name
                old_dir.rename(new_dir)
                paths_renamed += 1

        for filename in files:
            old_file = root_path / filename
            if not old_file.exists():
                continue
            new_name = replace_in_name(filename)
            if new_name != filename:
                new_file = root_path / new_name
                old_file.rename(new_file)
                paths_renamed += 1

    root_new_name = replace_in_name(root.name)
    if root_new_name != root.name:
        root.rename(root.with_name(root_new_name))
        paths_renamed += 1

    return files_updated, paths_renamed


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Reemplaza todas las variantes del nombre legado por 'virtex' en contenidos y rutas."
    )
    parser.add_argument(
        "root",
        nargs="?",
        default=".",
        help="Ruta raíz del proyecto (por defecto: directorio actual)",
    )
    args = parser.parse_args()

    root = Path(args.root).resolve()
    files_updated, paths_renamed = process_tree(root)
    print(f"Archivos actualizados: {files_updated}")
    print(f"Rutas renombradas: {paths_renamed}")


if __name__ == "__main__":
    main()
