import json
import re
from html.parser import HTMLParser
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parents[1]


class PageReferences(HTMLParser):
    def __init__(self):
        super().__init__()
        self.files = []
        self.section_ids = set()
        self.hero_scene_count = 0

    def handle_starttag(self, tag, attrs):
        attributes = dict(attrs)
        self.section_ids.add(attributes.get("id"))

        for key in ("src", "href"):
            value = attributes.get(key, "")
            if value and not value.startswith(("#", "http", "//", "data:")):
                self.files.append((PROJECT_ROOT, value))

        for candidate in attributes.get("srcset", "").split(","):
            if candidate.strip():
                self.files.append((PROJECT_ROOT, candidate.strip().split()[0]))

        classes = attributes.get("class", "").split()
        if "slider-background-wrapper" in classes and "hero-wrapper" in classes:
            self.hero_scene_count += 1


def check_assets():
    page = PageReferences()
    page.feed((PROJECT_ROOT / "index.html").read_text())

    # CSS paths are relative to each stylesheet, not index.html.
    css_url = re.compile(r'url\((?:"([^"]+)"|\x27([^\x27]+)\x27|([^)]*))\)')
    for stylesheet in (PROJECT_ROOT / "css").glob("*.css"):
        for match in css_url.finditer(stylesheet.read_text()):
            value = next(part for part in match.groups() if part is not None)
            if not value.startswith(("data:", "http")):
                page.files.append((stylesheet.parent, value))

    sources = json.loads((PROJECT_ROOT / "docs/asset-sources.json").read_text())
    page.files.extend((PROJECT_ROOT, asset["file"]) for asset in sources)
    missing = [str(base / filename) for base, filename in page.files if not (base / filename).is_file()]
    if missing:
        raise SystemExit("Missing local files:\n" + "\n".join(missing))

    assert page.hero_scene_count == 3, "The hero must retain all three scenes."
    assert {"home", "collection", "categories", "mobile-categories", "footer"} <= page.section_ids

    # Confirm that separating the runtime didn't discard the reference timelines.
    animation_script = (PROJECT_ROOT / "js/animations.js").read_text()
    assert "events:" in animation_script and "actionLists:" in animation_script
    assert "Webflow.require('ix2').init(watchAnimations)" in animation_script

    print(f"Checked {len(page.files)} file references, three hero scenes, and both category layouts.")
    print("All local assets and animation configuration are present.")


if __name__ == "__main__":
    check_assets()
