# Abgabe (bis 13.11.2026, 23:59 Uhr über Moodle)

Das Moodle-Archiv heißt `Fallstudie-WWI25B4-Gruppe1.zip` und enthält:

| Datei | Quelle im Repo | Stand |
|---|---|---|
| Projekt-WWI25B4-Gruppe1.pdf | doku/Projektdokumentation.pdf (beim Packen umbenennen) | Entwurf, offene Stellen gelb markiert |
| BPMN-WWI25B4-Gruppe1.zip | abgabe/ (aus bpmn/*.bpmn) | fertig, nach Nacharbeit im Modeler neu packen |
| UML-WWI25B4-Gruppe1.vpp | aus Visual Paradigm (File → Save Project As) | offen, Kilian |
| Praesentation-WWI25B4-Gruppe1.pdf | praesi/Abschlusspraesentation.pdf (beim Packen umbenennen) | Entwurf, Zuordnung der Vortragenden auf der letzten Folie |

Packen (macOS/Linux):

```bash
cp doku/Projektdokumentation.pdf /tmp/Projekt-WWI25B4-Gruppe1.pdf
cp praesi/Abschlusspraesentation.pdf /tmp/Praesentation-WWI25B4-Gruppe1.pdf
zip -j Fallstudie-WWI25B4-Gruppe1.zip /tmp/Projekt-WWI25B4-Gruppe1.pdf abgabe/BPMN-WWI25B4-Gruppe1.zip <Pfad zur VPP> /tmp/Praesentation-WWI25B4-Gruppe1.pdf
```

`BPMN-WWI25B4-Gruppe1.zip` enthält nur die zehn .bpmn-Dateien (XML-Export, wie im Ablauf gefordert); die PNG-Renderings liegen im Repository unter `bpmn/`. Nach der Nacharbeit im Camunda Modeler neu packen: `cd bpmn && zip ../abgabe/BPMN-WWI25B4-Gruppe1.zip p*.bpmn`.

Jede Person lädt das vollständige Archiv selbst in Moodle hoch.
