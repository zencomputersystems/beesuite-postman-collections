import json
import os
from pathlib import Path
from typing import Dict, List, Any, Optional


def load_json_file(path: Path) -> Dict[str, Any]:
    """Load and parse a JSON file."""
    with open(path, 'r', encoding='utf-8') as f:
        return json.load(f)


def extract_import_info(description: str) -> Optional[str]:
    """
    Extract file path from description like:
    'Import from: individual_collections/xxx.json - SectionName'
    Returns path string or None if not an import reference.
    """
    if not description or not description.startswith("Import from:"):
        return None
    # Split off the part after "Import from: "
    rest = description[len("Import from:"):].strip()
    # Take only up to first " - " (section name)
    if " - " in rest:
        file_part = rest.split(" - ")[0].strip()
    else:
        file_part = rest
    return file_part.strip()


def merge_collections(main_collection: Dict[str, Any], base_dir: Path) -> Dict[str, Any]:
    """
    Recursively replace items that reference external collections
    with the actual content from those files.
    """
    # Work on a deep copy to avoid modifying original input
    merged = json.loads(json.dumps(main_collection))

    def process_item(item: Dict[str, Any], current_dir: Path) -> None:
        # If item is a folder (has 'item' list), process its children
        if 'item' in item and isinstance(item['item'], list):
            # First pass: resolve and collect imports
            new_items = []
            for sub_item in item['item']:
                # Check if it's an import placeholder
                desc = sub_item.get('description', '')
                import_path = extract_import_info(desc)

                if import_path:
                    # Resolve path relative to current_dir
                    full_path = (current_dir / import_path).resolve()
                    if not full_path.exists():
                        raise FileNotFoundError(f"Referenced file not found: {full_path}")
                    print(f"Importing: {import_path} → {full_path.name}")
                    imported_coll = load_json_file(full_path)
                    imported_items = imported_coll.get('item', [])
                    # Recursively process imported items
                    for imported_item in imported_items:
                        process_item(imported_item, full_path.parent)
                    new_items.extend(imported_items)
                else:
                    # Regular item — process its children recursively
                    process_item(sub_item, current_dir)
                    new_items.append(sub_item)

            item['item'] = new_items
        else:
            # Leaf node or non-folder — nothing to expand here
            pass

    # Start processing from top-level items
    for main_item in merged.get('item', []):
        process_item(main_item, base_dir)

    return merged


def main():
    # Get the directory where the script is located
    script_dir = Path(__file__).parent.resolve()
    
    # Path to your main collection file
    main_collection_path = script_dir / "main_collection.json"

    if not main_collection_path.exists():
        # Try to use beeSuite.postman_collection.json from parent directory
        main_collection_path = script_dir.parent / "beeSuite.postman_collection.json"

    if not main_collection_path.exists():
        raise FileNotFoundError(f"Main collection file not found: {main_collection_path}")

    base_dir = main_collection_path.parent
    print(f"Processing main collection: {main_collection_path}")
    print(f"Base directory: {base_dir}")

    # Load main collection
    main_coll = load_json_file(main_collection_path)

    # Merge in all referenced collections
    merged_coll = merge_collections(main_coll, base_dir)

    # Save result
    output_path = script_dir / "merged_collection.json"
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(merged_coll, f, indent=2, ensure_ascii=False)

    print(f"\n✅ Merged collection saved to: {output_path}")
    print(f"   Total root items: {len(merged_coll.get('item', []))}")


if __name__ == "__main__":
    main()
