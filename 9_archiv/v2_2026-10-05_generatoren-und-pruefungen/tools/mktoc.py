"""2-pass TOC: build docx (pass 1, entries only) -> PDF -> page numbers -> toc.json -> build again."""
import json, subprocess, re, sys, os, tempfile
from pathlib import Path
docx = sys.argv[1]; out_toc = sys.argv[2]
entries = json.load(open(Path(docx).parent / 'toc_entries.json'))
with tempfile.TemporaryDirectory(prefix='repairflow-toc-') as build:
    office = os.environ.get('REPAIRFLOW_SOFFICE', 'soffice')
    subprocess.run([office, '-env:UserInstallation=' + Path(build, 'profile').as_uri(), '--headless',
                    '--convert-to', 'pdf', '--outdir', build, docx], check=True, capture_output=True)
    pdf = str(Path(build, Path(docx).with_suffix('.pdf').name))
    txt = subprocess.run(['pdftotext','-layout',pdf,'-'], check=True, capture_output=True, text=True).stdout
pages = txt.split('\f')
# page numbering starts at 1 on the TOC page (section 2); title page is unnumbered
# find TOC page index: first page that contains 'Inhaltsverzeichnis'
toc_idx = next(i for i,p in enumerate(pages) if 'Inhaltsverzeichnis' in p)
res = {}
for e in entries:
    t = e['text']
    for i in range(toc_idx+1, len(pages)):
        for line in pages[i].splitlines():
            if line.strip() == t or line.strip().startswith(t + ' ') and len(line.strip()) < len(t)+3:
                res[t] = i - toc_idx + 1  # TOC page = 1
                break
        if t in res: break
    if t not in res:
        # fallback: substring search (headings can wrap)
        for i in range(toc_idx+1, len(pages)):
            if t[:40] in pages[i].replace('\n',' '):
                res[t] = i - toc_idx + 1; break
missing = [e['text'] for e in entries if e['text'] not in res]
print('pages:', len(pages), 'toc at', toc_idx, 'missing:', missing)
json.dump({'entries': entries, 'pages': res}, open(out_toc,'w'), ensure_ascii=False, indent=1)
