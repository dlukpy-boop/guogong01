#!/usr/bin/env python3
"""Simple local relative-asset existence and manifest integrity check."""
from pathlib import Path
import hashlib, json, re, sys
root=Path(__file__).resolve().parent.parent
s=(root/'index.html').read_text(encoding='utf-8')
links=re.findall(r'(?:src|href)="([^"]+)"',s)
missing=[v for v in links if v and not (v.startswith(('http://','https://','#','data:','mailto:'))) and not (root/v).is_file()]
manifest=json.loads((root/'assets/MANIFEST.json').read_text(encoding='utf-8'))
changed=[v['path'] for v in manifest['assets'] if hashlib.sha256((root/v['path']).read_bytes()).hexdigest()!=v['sha256']]
print('assets:',len(manifest['assets']),'missing local references:',missing,'asset checksums changed:',changed)
sys.exit(bool(missing or changed))
