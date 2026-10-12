# Werkzeuge zur Erzeugung der Artefakte

Alles hier ist optional: Die abzugebenden Artefakte liegen fertig in `bpmn/`, `uml/`, `doku/` und `praesi/`. Die Skripte zeigen, wie sie entstanden sind, und erlauben eine Neuerzeugung nach Änderungen an der Spezifikation.

| Skript | Zweck |
|---|---|
| `bpmngen.py` | Generator für BPMN-2.0-XML mit Diagram Interchange aus einer Rasterbeschreibung (Lane, Spalte, Zeile je Element) |
| `diagrams.py` | Inhalt und Layout der zehn Prozesse; `python3 diagrams.py out` schreibt `p01-sofortdiagnose.bpmn` … |
| `lint.mjs` | Prüfung mit `@camunda/linting` (Camunda-Modeler-Regeln); mit esbuild bündeln, dann `node lint.bundle.cjs out` |
| `render.py` | Rendert .bpmn mit bpmn-js in Chromium (Playwright) zu SVG/PNG: `python3 render.py out png 1.5` |
| `umlmodel.py` | Klassen- und Use-Case-Modell; erzeugt genau eine `klassen.puml`, `usecase.puml`, `modell.xmi`: `python3 tools/umlmodel.py uml`; Sequenz-, Zustands- und Systemkontext-PUML sind handgeschrieben; Bilder mit `java -jar plantuml.jar -tpng 'uml/*.puml'` |
| `check_uml.py` | Prüft das aktive UML-Modell, Operationsaufrufe und Statuswerte der sechs Sequenzdiagramme, BPMN-Anker sowie XMI-Referenzen: `python3 tools/check_uml.py` |
| `doc.js` | Projektdokumentation mit docx-js; zwei Durchläufe vom Repository-Wurzelordner: `node tools/doc.js`, dann `python3 tools/mktoc.py doku/Projektdokumentation.docx toc.json` (Seitenzahlen über LibreOffice/pdftotext), dann `node tools/doc.js toc.json` |
| `mktoc.py` | ermittelt die Seitenzahlen für das statische Inhaltsverzeichnis |
| `pres.js` | Abschlusspräsentation mit pptxgenjs |
| `pack_bpmn.py` | packt `abgabe/BPMN-WWI25B4-Gruppe1.zip` mit den Dateinamen nach Ablauf (`01-Sofortdiagnose.bpmn` …): `python3 tools/pack_bpmn.py` |
| `check_layout.py` | Layout-Prüfung: Flüsse durch fremde Elemente oder deckungsgleiche Flüsse: `python3 tools/check_layout.py bpmn` |
| `process_stats.json` | Kennzahlen je Prozess (Aktivitäten, Automatisierungsgrad, Datenobjekte), von Doku und Präsentation gelesen |

Die Doku- und Präsentationsgeneratoren verwenden direkt `../uml`, `../bpmn` und `tools/pres` über den Repository-Wurzelordner. `imgdims.json` enthält Bildgrößen mit Schlüsseln relativ zum Repository (z. B. `uml/klassen.png`) und muss nach neuem Rendern aktualisiert werden. `node tools/doc.js [toc.json] [ausgabe.docx]` schreibt standardmäßig nach `doku/`; die TOC-Einträge werden neben der gewählten Ausgabedatei gespeichert. `python3 tools/mktoc.py ausgabe.docx toc.json` liest diese Einträge von dort; für eine bestimmte LibreOffice-Laufzeit kann `REPAIRFLOW_SOFFICE` gesetzt werden. Danach Doku erneut mit `toc.json` bauen und PDF exportieren. `node tools/pres.js` schreibt nach `praesi/`. Die PlantUML-Quellen von Klassen und Use Cases nutzen Smetana und benötigen für diese beiden Diagramme keine externe Graphviz-Installation. `process_stats.json` wird mit `python3 tools/mkstats.py` aus den BPMN-Dateien gezählt (Aktivitäten = alle Task-Typen, Aufruf-Aktivitäten und Teilprozesse; automatisiert = Service-, Sende-, Empfangs-, Geschäftsregel- und Skript-Aktivitäten; gezählt wird nur der ausführbare Werkstatt-Prozess, die Aktivitäten im Kunden-Pool stehen getrennt in `kunde_activities`). Partner-Pools: `d.partner(KUNDE)` und `d.pnode(...)` modellieren einen eigenen, nicht ausführbaren Prozess im Pool; ohne `partner` bleibt ein Pool leer (Black Box). `d.msg(..., snap=False)` führt einen Nachrichtenfluss mit Knick zwischen den Pools, wenn am Ziel schon ein Sequenzfluss an derselben Stelle ansetzt. Kreuzungsprüfung: `python3 tools/check_layout.py bpmn` meldet Sequenz- und Nachrichtenflüsse, die durch fremde Elemente laufen oder deckungsgleich mit einem anderen Fluss verlaufen.

Abhängigkeiten: Python 3 mit Pillow und Playwright (Chromium), Node.js mit `bpmn-js`, `bpmnlint`, `bpmn-moddle`, `@camunda/linting`, `esbuild`, `docx`, `pptxgenjs`, `react-icons`, `sharp`; PlantUML (plantuml.jar, Java) mit Graphviz für die UML-Bilder; LibreOffice für die PDF-Exporte.
