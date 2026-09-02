# Werkzeuge zur Erzeugung der Artefakte

Alles hier ist optional: Die abzugebenden Artefakte liegen fertig in `bpmn/`, `uml/`, `doku/` und `praesi/`. Die Skripte zeigen, wie sie entstanden sind, und erlauben eine Neuerzeugung nach Änderungen an der Spezifikation.

| Skript | Zweck |
|---|---|
| `bpmngen.py` | Generator für BPMN-2.0-XML mit Diagram Interchange aus einer Rasterbeschreibung (Lane, Spalte, Zeile je Element) |
| `diagrams.py` | Inhalt und Layout der zehn Prozesse; `python3 diagrams.py out` schreibt `p01-sofortdiagnose.bpmn` … |
| `lint.mjs` | Prüfung mit `@camunda/linting` (Camunda-Modeler-Regeln); mit esbuild bündeln, dann `node lint.bundle.cjs out` |
| `render.py` | Rendert .bpmn mit bpmn-js in Chromium (Playwright) zu SVG/PNG: `python3 render.py out png 1.5` |
| `umlmodel.py` | Klassen- und Use-Case-Modell; erzeugt `klassen*.puml`, `usecase.puml`, `modell.xmi`: `python3 umlmodel.py ../uml`; Sequenz-, Zustands- und Systemkontext-PUML sind handgeschrieben; Bilder mit `java -jar plantuml.jar -tpng *.puml` |
| `doc.js` | Projektdokumentation mit docx-js; zwei Durchläufe: `node doc.js`, dann `python3 mktoc.py doku/Projektdokumentation.docx toc.json` (Seitenzahlen über LibreOffice/pdftotext), dann `node doc.js toc.json` |
| `mktoc.py` | ermittelt die Seitenzahlen für das statische Inhaltsverzeichnis |
| `pres.js` | Abschlusspräsentation mit pptxgenjs |
| `process_stats.json` | Kennzahlen je Prozess (Aktivitäten, Automatisierungsgrad, Datenobjekte), von Doku und Präsentation gelesen |

Die Skripte erwarten die Bilder unter `uml2/`, `png2/`, `png2_15/` und `pres/` relativ zum Skriptordner (so hießen die Arbeitsordner beim Bauen); beim Neubau entweder die Pfade in `doc.js`/`pres.js` anpassen oder Symlinks auf `../uml` und `../bpmn` setzen. `imgdims.json` (Bildgrößen) wird mit Pillow erzeugt.

Abhängigkeiten: Python 3 mit Pillow und Playwright (Chromium), Node.js mit `bpmn-js`, `bpmnlint`, `bpmn-moddle`, `@camunda/linting`, `esbuild`, `docx`, `pptxgenjs`, `react-icons`, `sharp`; PlantUML (plantuml.jar, Java) mit Graphviz für die UML-Bilder; LibreOffice für die PDF-Exporte.
