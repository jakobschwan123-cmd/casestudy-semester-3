# RepairFlow – Fallstudie Systemanalyse (WWI25B4, Gruppe 1)

RepairFlow ist ein Software-Startup (Solution Provider), das Reparaturwerkstätten eine SaaS-Plattform mit KI-Sofortdiagnose anbietet. Pilotkunde ist die fiktive FixWerk GmbH. Stand: 05.10.2026.

## Was liegt wo

| Ordner | Inhalt |
|---|---|
| `bpmn/` | Die zehn Kollaborationsdiagramme `p01-sofortdiagnose.bpmn` … `p10-retoure.bpmn` (Camunda 8) mit PNG; die `.bpmn`-Dateien sind die Quelle |
| `uml/` | Use-Case-Diagramm, ein Klassendiagramm, sechs Sequenzdiagramme, Zustandsdiagramm (PlantUML + PNG), `modell.xmi` für Visual Paradigm, Anleitung in `uml/README.md` |
| `doku/` | `Projektdokumentation.docx/.pdf`, Projektkontext, Team und Rollen, Entscheidungslog, Dozentenfeedback, QA-Checkliste, Protokolle |
| `praesi/` | `Abschlusspraesentation.pptx/.pdf` (20 Folien) |
| `abgabe/` | Anleitung für das Moodle-Archiv |
| `claude.readme/` | Team- und Git-Regeln, Konventionen für KI-Assistenten |
| `archiv/` | Alles Ersetzte und Erledigte: alte Fassungen, Prüfprotokolle, ausführlicher Entscheidungslog, Generatoren (`archiv/tools/`) |

## Arbeitsweise

- Vor dem Arbeiten: `git switch main` und `git pull`.
- Pro Aufgabe ein eigener Branch und ein Pull Request, Commit-Stempel `[T04 2026-10-05] …`.
- BPMN nur im Camunda Modeler bearbeiten, danach das PNG neu exportieren.
- Word- und PowerPoint-Dateien lassen sich nicht mergen: vor dem Bearbeiten in der WhatsApp-Gruppe Bescheid geben.
- Entscheidungen, die mehr als eine Person betreffen, kurz in `doku/03-entscheidungen.md` eintragen.

## Offen bis zur Abgabe

| Aufgabe | Wer |
|---|---|
| `UML-WWI25B4-Gruppe1.vpp` in Visual Paradigm erstellen und in `uml/` einchecken | Kilian, David |
| Alle zehn BPMN im Camunda Modeler öffnen, prüfen, speichern und die PNGs neu exportieren | Maximilian |
| E-19 (P07/P08) bestätigen | alle |
| Gelb markierte Stellen in der Projektdokumentation füllen | Nina, Zulieferung alle |
| QA-Checkliste anwenden | Jakob |
| Generalprobe am 22.10., Präsentation am 27.10.2026, 09:00, B458 | alle |
| Abgabe bis 13.11.2026, 23:59 (Anleitung `abgabe/README.md`) | jede Person selbst |
