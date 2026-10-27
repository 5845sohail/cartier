from html.parser import HTMLParser
from pathlib import Path
import re,json
root=Path(__file__).parent
base=root/'dist';html=(base/'index.html').read_text();refs=[]
class Audit(HTMLParser):
 def handle_starttag(self,tag,attrs):
  d=dict(attrs)
  for key in ['src','href']:
   if d.get(key) and not d[key].startswith(('#','http','//','data:')): refs.append((base,d[key]))
  if d.get('srcset'):
   refs.extend((base,x.strip().split()[0]) for x in d['srcset'].split(','))
Audit().feed(html)
for p in (base/'assets').glob('*.css'):
 for m in re.finditer(r'url\((?:"([^"]+)"|\x27([^\x27]+)\x27|([^)]*))\)',p.read_text()):
  u=next(x for x in m.groups() if x is not None)
  if not u.startswith(('data:','http')):refs.append((p.parent,u))
missing=[str(p/u) for p,u in refs if not (p/u).is_file()]
assert not missing,missing
assert len(list((base/'assets').iterdir()))==63
assert html.count('class="slider-background-wrapper hero-wrapper"')==3
assert 'id="mobile-categories"' in html and 'id="categories"' in html
assert len(json.loads((root/'motion-config.json').read_text())['actionLists']) >= 30
assert 'event.stopImmediatePropagation()' in (base/'enhancements.js').read_text()
print(f'PASS: {len(refs)} local asset references; 63 bundled assets; hero scenes, responsive category sections, original motion configuration, and local-only form handler.')
