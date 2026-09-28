# -*- coding: utf-8 -*-
"""Zaehlt die Kennzahlen der zehn BPMN-Dateien und schreibt tools/process_stats.json.

Aktivitaeten = alle Task-Typen, Aufruf-Aktivitaeten und Teilprozesse (die Tasks im
Mehrfach-Teilprozess zaehlen mit), gezaehlt nur im ausfuehrbaren Werkstatt-Prozess;
die Aktivitaeten des modellierten Kunden-Prozesses stehen getrennt in kunde_activities. Automatisiert = Service-, Sende-, Empfangs-,
Geschaeftsregel- und Skript-Aktivitaeten. Namen, Lanes, Pools und Beschreibung kommen
aus tools/diagrams.py. Aufruf aus dem Repo-Wurzelordner: python3 tools/mkstats.py
"""
import collections, json, os, sys
import xml.etree.ElementTree as ET

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import diagrams  # noqa: E402

NS = "{http://www.omg.org/spec/BPMN/20100524/MODEL}"
ACT = {"task": "task", "userTask": "user", "serviceTask": "service", "sendTask": "send", "receiveTask": "receive",
       "manualTask": "manual", "businessRuleTask": "businessRule", "scriptTask": "script", "callActivity": "call",
       "subProcess": "subprocess"}
AUTO = {"service", "send", "receive", "businessRule", "script"}


def kinds_of(proc):
    return collections.Counter(ACT[e.tag[len(NS):]] for e in proc.iter() if e.tag.startswith(NS) and e.tag[len(NS):] in ACT)


def count(path):
    root = ET.parse(path).getroot()
    col = root.find(NS + "collaboration")
    procs = root.findall(NS + "process")
    proc = next(p for p in procs if p.get("isExecutable") == "true")
    kinds = kinds_of(proc)
    kunde = collections.Counter()
    for p in procs:
        if p is not proc:
            kunde += kinds_of(p)
    return {
        "activities": sum(kinds.values()),
        "kinds": dict(kinds),
        "auto": sum(v for k, v in kinds.items() if k in AUTO),
        "kunde_activities": sum(kunde.values()),
        "kunde_kinds": dict(kunde),
        "msgflows": len(col.findall(NS + "messageFlow")),
        "data": len([e for e in root.iter() if e.tag in (NS + "dataObjectReference", NS + "dataStoreReference")]),
        "start": proc.find(NS + "startEvent").get("name"),
        "end": proc.find(NS + "endEvent").get("name"),
    }


out = []
for d in diagrams.DIAGRAMS:
    slug = diagrams.SLUGS[d.num].lower()
    fname = "p%s-%s" % (d.num, slug)
    pools = ["Werkstattbetrieb"] + [p for p in list(getattr(d, "pools_top", [])) + list(getattr(d, "pools_bottom", []))]
    entry = {"num": d.num, "slug": slug, "file": fname, "name": d.name, "lanes": list(d.lanes), "pools": pools}
    entry.update(count(os.path.join(HERE, "..", "bpmn", fname + ".bpmn")))
    entry["doc"] = d.doc
    out.append(entry)
with open(os.path.join(HERE, "process_stats.json"), "w", encoding="utf-8") as fh:
    json.dump(out, fh, ensure_ascii=False, indent=1)
t = lambda k: sum(e[k] for e in out)
print("Aktivitaeten %d (Schnitt %.1f), automatisiert %d (%d %%), Kunde %d, Nachrichtenfluesse %d, Daten %d"
      % (t("activities"), t("activities") / 10, t("auto"), round(100 * t("auto") / t("activities")),
         t("kunde_activities"), t("msgflows"), t("data")))
