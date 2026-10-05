# RepairFlow – Fallstudie Systemanalyse (WWI25B4, Gruppe 1)

Stand: 05.10.2026. Zusammengeführter Stand der Fallstudie RepairFlow
(Solution-Provider-Perspektive mit KI-Sofortdiagnose, BPMN für Camunda 8).
Was aus welchem der beiden ursprünglichen Entwürfe übernommen wurde und warum,
steht in `doku/05-vergleich-und-zusammenfuehrung.md`; die Korrekturen der
Gesamtprüfung vom 26.09.2026 in `doku/03-entscheidungen.md` (E-15), der Kunden-Pool
vom 28.09. in E-16 und die Korrekturen des Komplettchecks vom 05.10.2026 in E-17
(Befundliste: `doku/protokolle/2026-10-05-komplettcheck.md`). Der erneute UML-Abgleich gegen alle zehn BPMN-Prozesse und die Zusammenführung auf ein Klassendiagramm stehen in E-18 und `doku/protokolle/2026-10-05-uml-bpmn-abgleich.md`.

## Repository-Stand

Der Merge auf `main` ist erledigt. Kilians erste Betreiber-Fassung liegt zur
Nachvollziehbarkeit unter `archiv/uml-v1-betreiber/` bzw.
`archiv/alte-versionen/`; nichts davon geht in die Abgabe.

Prüfstand 26.09.2026: `@camunda/linting` (Camunda 8) und `bpmnlint`
(recommended) melden für alle zehn BPMN-Dateien 0 Befunde; alle PlantUML-Quellen
bestehen die Syntaxprüfung; `uml/modell.xmi` ist wohlgeformt, alle Referenzen
lösen auf.

## Inhalt

| Ordner | Inhalt | Abgabekriterium |
|---|---|---|
| `bpmn/` | 10 Kollaborationsdiagramme `p01-sofortdiagnose.bpmn` … `p10-retoure.bpmn` (Camunda 8) + PNG mit gleichem Basisnamen, `README.md` | 10 Prozesse, 131 Aktivitäten im Werkstatt-Pool (Ø 13,1), 60 % automatisiert, Kunde mit eigenem Ablauf |
| `uml/` | `klassen.puml/.png` (ein vollständiges Klassendiagramm mit 27 Klassen und 36 Assoziationen), `usecase.puml/.png` (19 Use Cases, 8 Akteure), `sequenz-01…06`, `zustand-reparaturauftrag`, `systemkontext`, `modell.xmi` für Visual Paradigm, `README.md` | ≥ 10 UCs, ≥ 10 Klassen, 5 Sequenzdiagramme (wir haben 6) |
| `doku/` | `Projektdokumentation.docx/.pdf` (offene Stellen gelb markiert), Projektkontext, Team und Rollen, Entscheidungslog, Dozentenfeedback, Vergleichsnotiz, Protokolle | Projektdokumentation |
| `praesi/` | `Abschlusspraesentation.pptx/.pdf` (20 Folien, Vortragende je Folie) | Präsentation |
| `abgabe/` | `BPMN-WWI25B4-Gruppe1.zip` (die zehn BPMN-Dateien, benannt nach Ablauf: `01-Sofortdiagnose.bpmn` … `10-Retoure.bpmn`) + Anleitung für das Moodle-Archiv | Abgabeformat |
| `tools/` | Generatoren (BPMN, UML, Doku, Präsentation), Linter-Skript | – |
| `claude.readme/` | Team-/Git-Regeln (`README.md`) und `CLAUDE.md` (Konventionen für KI-Assistenten) | – |
| `archiv/` | ersetzte Vorfassungen, nur zur Nachvollziehbarkeit | – |

## Bereits entschieden (02.09.2026, E-13)

1. **Rollen**: Nina Projektleitung, David stellvertretende Projektleitung/Backups,
   Adrian Product Owner, Kilian Scrum Master + UML, Maxi BPMN, Jakob Qualität.
2. **Präsentationstermin**: 27.10.2026, 09:00, B458 (laut `Allgemeines.docx`);
   22.10. = Generalprobe.
3. **Sprint-Takt**: Gruppentermine 02.09., 05.10., 15.10., 22.10.; Trello-Board
   mit einer Liste je Termin.

## Nächste Schritte (bis zum Gruppentermin 15.10.2026)

Die vollständige Aufgabenliste mit Verantwortlichen und Terminen steht in `doku/protokolle/2026-10-05-todo.md` (auch als Word-Datei).

| # | Aufgabe | Verantwortlich | Status |
|---|---|---|---|
| 1 | Korrekturen vom 26.09. (E-15), 28.09. (E-16) und 05.10. (E-17) in der Gruppe bestätigen – betrifft alle BPMN und das UML-Modell; Lagergebühr/Mahnung in Prozess 08 entscheiden | alle, Abnahme Adrian | offen |
| 2 | Alle zehn BPMN im Camunda Modeler (Camunda 8) öffnen, Problems-Panel prüfen, speichern; in die vorbereiteten Unterordner der Camunda Cloud hochladen (Namen `01-Sofortdiagnose` … `10-Retoure`); danach `abgabe/BPMN-WWI25B4-Gruppe1.zip` neu packen (`abgabe/README.md`) | Maxi | offen – die Dateien tragen noch `exporter="RepairFlow BPMN Generator"` |
| 3 | `uml/modell.xmi` in Visual Paradigm importieren, Klassen- und Use-Case-Diagramm aufziehen, die Sequenzdiagramme als Unterdiagramme der Use Cases anlegen, `UML-WWI25B4-Gruppe1.vpp` sichern und einchecken (Anleitung: `uml/README.md`). Wer vor dem 26.09. schon importiert hat: neu importieren oder die Änderungen aus E-15 von Hand nachziehen | Kilian | offen – `.vpp` fehlt im Repo (Pflicht-Abgabedatei) |
| 4 | Trello-Board anlegen; Screenshot in Doku 4.3 und auf Präsentations-Folie 16 einfügen | Kilian / Jakob | offen |
| 5 | Dozent informieren: Ansprechperson Maximilian → Nina; Termine 05.10./15.10./22.10. gegen Rapla prüfen | Nina | offen |
| 6 | Doku: echte Sprint-Ergebnisse, Beiträge je Person und Trello-Screenshot ergänzen, Kapitel 6/7 nach der Präsentation, PDF neu erzeugen | Nina / Kilian | teilweise offen (gelb markierte Stellen) |
| 7 | Präsentation: Trello-Screenshot Folie 16, Sprechernotizen ergänzen, PDF-Export | Jakob | offen |

## Offene Entscheidungen (siehe `doku/03-entscheidungen.md`)

- **E-07**: Adrian (Product Owner) und die Gruppe bestätigen Perspektive (E-02),
  KI-Gimmick (E-03), Prozessliste (E-05) und die Korrekturen aus E-15, E-16 und E-17.
- **E-14**: Dozent informieren (Ansprechperson, Termine).
- **Zuständigkeit BPMN 09/10**: Drei Dokumente weisen die Prüfung unterschiedlich
  zu (Maxi vs. Jakob) – in der Review-Runde klären und in `03-entscheidungen.md`
  festhalten (siehe `doku/protokolle/2026-09-02-review-bpmn-09-10.md`).

## Hinweis zur Abgabe

Die vier Abgabedateien (`Projekt-…pdf`, `BPMN-…zip`, `UML-…vpp`,
`Praesentation-…pdf`) und das Gesamtarchiv `Fallstudie-WWI25B4-Gruppe1.zip`
werden nach der Präsentation gepackt (Anleitung: `abgabe/README.md`).
Frist: 13.11.2026, 23:59 Uhr über Moodle. Jede Person lädt das vollständige
Archiv selbst hoch.
