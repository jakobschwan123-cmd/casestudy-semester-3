# -*- coding: utf-8 -*-
"""Layout-Pruefung der BPMN-Dateien anhand der Diagram-Interchange-Daten.

Meldet (1) Sequenz- und Nachrichtenfluesse, deren Segmente durch ein fremdes Element
(Aktivitaet, Ereignis, Gateway) laufen, und (2) Fluesse, die ueber eine Strecke
deckungsgleich mit einem anderen Fluss verlaufen (ausser bei gemeinsamer Quelle oder
gemeinsamem Ziel). Aufruf: python3 tools/check_layout.py bpmn
Rueckgabewert 1, wenn etwas gefunden wurde.
"""
import glob
import os
import sys
import xml.etree.ElementTree as ET

NS = {"bpmndi": "http://www.omg.org/spec/BPMN/20100524/DI",
      "dc": "http://www.omg.org/spec/DD/20100524/DC",
      "di": "http://www.omg.org/spec/DD/20100524/DI"}
SKIP_SHAPES = {"participant", "lane", "subProcess", "dataObjectReference", "dataStoreReference", "textAnnotation"}
FLOWS = {"sequenceFlow", "messageFlow"}


def check(path):
    root = ET.parse(path).getroot()
    kind, ends = {}, {}
    for e in root.iter():
        i = e.get("id")
        if i:
            kind[i] = e.tag.split("}")[1]
        if e.get("sourceRef"):
            ends[i] = (e.get("sourceRef"), e.get("targetRef"))
    shapes = {}
    for s in root.iter("{%s}BPMNShape" % NS["bpmndi"]):
        el = s.get("bpmnElement")
        if kind.get(el) in SKIP_SHAPES:
            continue
        b = s.find("dc:Bounds", NS)
        shapes[el] = tuple(float(b.get(a)) for a in ("x", "y", "width", "height"))
    segs = []
    for e in root.iter("{%s}BPMNEdge" % NS["bpmndi"]):
        el = e.get("bpmnElement")
        if kind.get(el) not in FLOWS:
            continue
        pts = [(float(w.get("x")), float(w.get("y"))) for w in e.findall("di:waypoint", NS)]
        segs += [(el, a, b) for a, b in zip(pts, pts[1:])]
    found = []
    m = 2
    for el, (x1, y1), (x2, y2) in segs:
        for sid, (x, y, w, h) in shapes.items():
            if sid in ends[el]:
                continue
            if x1 == x2 and x + m < x1 < x + w - m and max(min(y1, y2), y + m) < min(max(y1, y2), y + h - m):
                found.append("%s läuft durch %s" % (el, sid))
            elif y1 == y2 and y + m < y1 < y + h - m and max(min(x1, x2), x + m) < min(max(x1, x2), x + w - m):
                found.append("%s läuft durch %s" % (el, sid))
    for i, (e1, a1, b1) in enumerate(segs):
        for e2, a2, b2 in segs[i + 1:]:
            if e1 == e2 or ends[e1][0] == ends[e2][0] or ends[e1][1] == ends[e2][1]:
                continue
            for k in (0, 1):
                o = 1 - k
                if a1[k] == b1[k] == a2[k] == b2[k]:
                    lo = max(min(a1[o], b1[o]), min(a2[o], b2[o]))
                    hi = min(max(a1[o], b1[o]), max(a2[o], b2[o]))
                    if hi - lo > 5:
                        found.append("%s und %s verlaufen deckungsgleich" % (e1, e2))
    return sorted(set(found))


if __name__ == "__main__":
    folder = sys.argv[1] if len(sys.argv) > 1 else "bpmn"
    total = 0
    for f in sorted(glob.glob(os.path.join(folder, "*.bpmn"))):
        res = check(f)
        total += len(res)
        print("%s: %s" % (os.path.basename(f), "ok" if not res else "; ".join(res)))
    print("Befunde: %d" % total)
    sys.exit(1 if total else 0)
