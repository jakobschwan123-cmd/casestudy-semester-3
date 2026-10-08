# Abgabe-Status (Stand 08.10.2026)

Abgabe bis 13.11.2026, 23:59 Uhr über Moodle. Jede Person lädt `Fallstudie-WWI25B4-Gruppe1.zip` selbst hoch.

## Was fertig ist

| Datei im Archiv | Stand | Quelle im Repo |
|---|---|---|
| `Projekt-WWI25B4-Gruppe1.pdf` | 38 Seiten (Haupttext bis Seite 25, danach Anhang A–C), keine Platzhalter mehr | `doku/Projektdokumentation.docx` / `.pdf` |
| `BPMN-WWI25B4-Gruppe1.zip` | zehn `.bpmn`, umbenannt `01-Sofortdiagnose.bpmn` … `10-Retoure.bpmn`; XML wohlgeformt, Camunda-Linter und bpmnlint ohne Befund | `bpmn/p01-…` bis `bpmn/p10-…` |
| `Praesentation-WWI25B4-Gruppe1.pdf` | 20 Folien, Sprecherzuordnung auf Folie 20 und in den Notizen | `praesi/Abschlusspraesentation.pptx` / `.pdf` |
| `UML-WWI25B4-Gruppe1.vpp` | **fehlt noch**, entsteht in Visual Paradigm | `uml/` |

## Was nur die Gruppe erledigen kann

| Aufgabe | Wer | bis |
|---|---|---|
| VPP: Klassendiagramm, SD1, SD3 (Kilian); SD2, SD4, SD5, SD6 als Unterdiagramme ihrer Use Cases (David). SD4 nach der neuen `uml/sequenz-04-fertigmeldung.png` (E-22). Danach File → Save Project As `UML-WWI25B4-Gruppe1.vpp`, in `uml/` einchecken | Kilian, David | 15.10. |
| Alle zehn BPMN im Camunda Modeler öffnen, Problems-Panel prüfen, speichern, PNG exportieren (P06 und P10 sind am 08.10. geändert) | Maximilian | 15.10. |
| E-19, E-20 und E-22 bestätigen oder ändern (Fristen, Storno nach der zweiten Liefermahnung, Status für verwertete Geräte) | alle, Adrian trägt ein | 15.10. |
| Kapitel 1 „Beiträge“: jede Person prüft ihre Zeile | jede Person | 15.10. |
| Kapitel 7.2 ist ein Entwurf aus unseren dokumentierten Erfahrungen. Bitte in der Gruppe lesen und so ändern, dass es eure Meinung ist | alle | 22.10. |
| Kapitel 4.3 und 7.1 nach dem 15.10./22.10. um tatsächliche Sprint-Ergebnisse und Coaching-Rückmeldungen ergänzen, falls es welche gibt | Nina | 13.11. |
| KI-Angabe für den Moodle-Upload (Entwurf: `KI-Angabe-Moodle.md`) abstimmen und ergänzen | alle | 13.11. |

## Sätze, die nach VPP und Modeler-Prüfung geändert werden müssen

In `doku/Projektdokumentation.docx` (danach PDF neu exportieren und Inhaltsverzeichnis prüfen):

- 3.1 Camunda Modeler: „Die abschließende Prüfung aller zehn Dateien im Modeler ist noch offen.“ → streichen
- 3.1 Visual Paradigm: „die abzugebende VPP-Datei liegt noch nicht vor.“ → „die VPP-Datei liegt in uml/.“
- 3.3: „Für den aktuellen Stand sind das Öffnen, Prüfen und Speichern … noch ausstehend.“ → streichen
- 4.3 letzter Satz: „…folgen bis zum 15.10.2026.“ → tatsächliches Ergebnis
- 4.4: „die lokale VPP-Sicherung wird nach der Fertigstellung ergänzt“ → streichen
- 5.3: „UML-WWI25B4-Gruppe1.vpp ist noch zu erstellen und in uml/ zu sichern.“ → streichen
- 5.4: „Von der Gruppe zu bestätigen sind noch …“ → Ergebnis der Bestätigung
- Kapitel 3, Tabelle der sechs Schritte (Schritt 4 und 5), und Sprintplan in 4.2 (Sprint 3): „wird vor der Abgabe … geprüft“, „steht noch aus“, „Geplant:“ → Ist-Stand
- Anhang A, Zeile VPP: „Noch zu erstellendes …“ → „Visual-Paradigm-Projekt mit …“

## Archiv packen

```
Fallstudie-WWI25B4-Gruppe1.zip
├── Projekt-WWI25B4-Gruppe1.pdf
├── BPMN-WWI25B4-Gruppe1.zip
├── UML-WWI25B4-Gruppe1.vpp
└── Praesentation-WWI25B4-Gruppe1.pdf
```

Ändert sich ein BPMN nach dem 08.10., das BPMN-ZIP neu packen (Namen wie oben, nur `.bpmn`, keine PNGs).
