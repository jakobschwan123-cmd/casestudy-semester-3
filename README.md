# RepairFlow – Fallstudie Systemanalyse (WWI25B4, Gruppe 1)

RepairFlow ist ein Software-Startup (Solution Provider), das Reparaturwerkstätten eine SaaS-Plattform mit KI-Sofortdiagnose anbietet. Pilotkunde ist die fiktive FixWerk GmbH. Stand: 15.10.2026.

**Was jetzt zu tun ist, steht in [`TODO.md`](TODO.md).**

## Ordner

| Ordner | Inhalt | Wer arbeitet darin |
|---|---|---|
| [`0_abgabe/`](0_abgabe/) | Anleitung für das Moodle-Archiv und die KI-Angabe | alle (am Ende) |
| [`1_bpmn/`](1_bpmn/) | Die zehn Kollaborationsdiagramme `p01` … `p10` als `.bpmn` (Quelle, nur im Camunda Modeler bearbeiten) und PNG | Maximilian |
| [`2_uml/`](2_uml/) | Visual-Paradigm-Projekt (`UML-WWI25B4-Gruppe1.vpp`, kommt), `modell.xmi` für den Import, Anleitung; Vorlagen als PlantUML in `entwurf-plantuml/` | Kilian (verantwortlich), alle mit ihren Sequenzdiagrammen |
| [`3_doku/`](3_doku/) | `Projektdokumentation.docx` und `.pdf` | Nina, alle |
| [`4_praesentation/`](4_praesentation/) | `Abschlusspraesentation.pptx` und `.pdf` | alle |
| [`5_team/`](5_team/) | Arbeitsunterlagen: Projektkontext, Team und Rollen, Entscheidungslog, Dozentenfeedback, QA-Checkliste, Protokolle, Git-Regeln | alle |
| [`9_archiv/`](9_archiv/) | Frühere Stände, versioniert nach Datum; hier wird nicht mehr gearbeitet | – |

## Arbeitsweise

- Vor dem Arbeiten: `git switch main` und `git pull`.
- Pro Aufgabe ein eigener Branch und ein Pull Request, Commit-Stempel `[T05 2026-10-15] …` für Arbeit zum Termin am 15.10. Details in [`5_team/git-workflow.md`](5_team/git-workflow.md).
- BPMN nur im Camunda Modeler bearbeiten, danach das PNG neu exportieren.
- Word- und PowerPoint-Dateien lassen sich nicht zusammenführen: vor dem Bearbeiten in der WhatsApp-Gruppe Bescheid geben.
- Entscheidungen, die mehr als eine Person betreffen, kurz in [`5_team/03-entscheidungen.md`](5_team/03-entscheidungen.md) eintragen.
- Ersetzte Dateien nicht löschen, sondern in einen neuen Versionsordner unter `9_archiv/` verschieben.
