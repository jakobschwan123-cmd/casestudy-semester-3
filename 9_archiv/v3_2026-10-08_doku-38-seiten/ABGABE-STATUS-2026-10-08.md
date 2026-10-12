# Abgabe-Status (Stand 12.10.2026)

Abgabe bis 13.11.2026, 23:59 Uhr über Moodle. Jede Person lädt `Fallstudie-WWI25B4-Gruppe1.zip` selbst hoch.

## Was fertig ist

| Datei im Archiv | Stand | Quelle im Repo |
|---|---|---|
| `Projekt-WWI25B4-Gruppe1.pdf` | Neufassung vom 12.10.: 18 Seiten (Ablauf: ca. 20), ohne Anhänge; **6 Abbildungs-Platzhalter und 10 gelbe Hinweise** müssen noch erledigt werden (siehe unten) | `doku/Projektdokumentation.docx` / `.pdf` |
| `BPMN-WWI25B4-Gruppe1.zip` | zehn `.bpmn`, umbenannt `01-Sofortdiagnose.bpmn` … `10-Retoure.bpmn`; XML wohlgeformt, Camunda-Linter und bpmnlint ohne Befund | `bpmn/p01-…` bis `bpmn/p10-…` |
| `Praesentation-WWI25B4-Gruppe1.pdf` | 20 Folien, Sprecherzuordnung auf Folie 20 und in den Notizen | `praesi/Abschlusspraesentation.pptx` / `.pdf` |
| `UML-WWI25B4-Gruppe1.vpp` | **fehlt noch**, entsteht in Visual Paradigm | `uml/` |

## Was nur die Gruppe erledigen kann

| Aufgabe | Wer | bis |
|---|---|---|
| VPP: Klassendiagramm, SD1, SD3 (Kilian); SD2, SD4, SD5, SD6 als Unterdiagramme ihrer Use Cases (David). SD4 nach der neuen `uml/sequenz-04-fertigmeldung.png` (E-22). Danach File → Save Project As `UML-WWI25B4-Gruppe1.vpp`, in `uml/` einchecken | Kilian, David | 15.10. |
| Alle zehn BPMN im Camunda Modeler öffnen, Problems-Panel prüfen, speichern, PNG exportieren (P06 und P10 sind am 08.10. geändert) | Maximilian | 15.10. |
| E-19, E-20 und E-22 bestätigen oder ändern (Fristen, Storno nach der zweiten Liefermahnung, Status für verwertete Geräte) | alle, Adrian trägt ein | 15.10. |
| Gelbe Hinweise in der Projektdokumentation abarbeiten (siehe unten) und den Text gegenlesen; die Neufassung vom 12.10. ist mit KI-Unterstützung aus Protokollen, Entscheidungslog und Git-Historie geschrieben | alle, Nina koordiniert | 22.10. |
| KI-Angabe für den Moodle-Upload (Entwurf: `KI-Angabe-Moodle.md`) abstimmen und ergänzen | alle | 13.11. |

## Offene Stellen in der Projektdokumentation

Alle offenen Stellen sind im Dokument gelb markiert (Suche nach „[“). Danach PDF neu exportieren und die Seitenzahlen im Inhaltsverzeichnis prüfen (statisch).

Abbildungen (gestrichelte gelbe Kästen, jeweils mit Exportanweisung):

- Abb. 2 Prozess 01 und Abb. 3 Prozess 04: Camunda Modeler → File → Export as Image (nach Maximilians Modeler-Prüfung)
- Abb. 4 Use-Case-Diagramm, Abb. 5 Klassendiagramm, Abb. 6 SD1, Abb. 7 SD3: Visual Paradigm → File → Export → Active Diagram as Image

Gelbe Hinweise im Text:

- Kapitel 1: jede Person prüft ihre Zeile in Tabelle 1 und in der Beitragsliste
- 3.1: VPP und Sequenzdiagramme als Unterdiagramme fertig? (betrifft auch 4.3 und Tabelle 5)
- 3.2 und Tabelle 2: Ergebnis der Prüfung im Camunda Modeler
- Tabelle 3: Ergebnisse von Sprint 3 und Sprint 4
- 5.6: Bestätigung von E-19, E-20, E-22 und Status für verwertete Geräte
- Kapitel 6: weitere Herausforderungen der Gruppe
- 7.1: Hinweise aus den Coachings am 15.10. und 22.10.
- 7.2: Entwurf, an die Meinung der Gruppe anpassen
- Titelseite: „Bearbeitungsstand“ auf das Abgabedatum setzen

## Archiv packen

```
Fallstudie-WWI25B4-Gruppe1.zip
├── Projekt-WWI25B4-Gruppe1.pdf
├── BPMN-WWI25B4-Gruppe1.zip
├── UML-WWI25B4-Gruppe1.vpp
└── Praesentation-WWI25B4-Gruppe1.pdf
```

Ändert sich ein BPMN nach dem 08.10., das BPMN-ZIP neu packen (Namen wie oben, nur `.bpmn`, keine PNGs).
