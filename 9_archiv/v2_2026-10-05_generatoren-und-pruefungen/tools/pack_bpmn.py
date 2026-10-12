# -*- coding: utf-8 -*-
"""Packt die zehn BPMN-Dateien fuer die Abgabe: abgabe/BPMN-WWI25B4-Gruppe1.zip.

Im ZIP heissen die Dateien nach Ablauf "zweistellige Nummer + praegnanter Modellname"
(01-Sofortdiagnose.bpmn ... 10-Retoure.bpmn); im Repository bleiben die Namen p01-... (E-11/E-15).
Aufruf aus dem Repo-Wurzelordner:  python3 tools/pack_bpmn.py
"""
import glob, os, re, zipfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "abgabe", "BPMN-WWI25B4-Gruppe1.zip")

files = sorted(glob.glob(os.path.join(ROOT, "bpmn", "p[0-9][0-9]-*.bpmn")))
assert len(files) == 10, "erwartet 10 BPMN-Dateien, gefunden %d" % len(files)
if os.path.exists(OUT):
    os.remove(OUT)
with zipfile.ZipFile(OUT, "w", zipfile.ZIP_DEFLATED) as z:
    for f in files:
        num, slug = re.match(r"p(\d\d)-(.+)\.bpmn$", os.path.basename(f)).groups()
        name = "%s-%s.bpmn" % (num, slug[:1].upper() + slug[1:])
        z.write(f, name)
        print(name)
print("->", os.path.relpath(OUT, ROOT))
