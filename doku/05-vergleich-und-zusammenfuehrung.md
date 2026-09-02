# Vergleich der beiden Entwürfe und Zusammenführung

> Nachtrag 02.09.2026: Die offenen Punkte Rollen und Präsentationstermin sind entschieden (E-13), siehe `02-team-und-rollen.md`. Die Rollen folgen Kilians Liste; alle Artefakte wurden darauf umgestellt.

Datum: 02.09.2026. Verglichen wurden Kilians Entwurf V2 (`/Users/david/CLAUDE/V2`, entstanden mit KI-Unterstützung aus der Betreiber-Perspektive) und der Entwurf von Claude/David (Solution Provider mit KI-Sofortdiagnose, entstanden nach dem Dozentenfeedback vom Konzept-Pitch). Ergebnis ist der Ordner `FINAL`, dessen Struktur Jakobs neuem `main` folgt.

## Kurzfassung

| Artefakt | Basis | Aus V2 übernommen |
|---|---|---|
| BPMN (10 Diagramme) | Claude/David (Camunda 8, engine-ready, Linter 0 Befunde) | Datenspeicher `Technikerplan` (Prozess 02) und `Buchhaltung (DATEV-Export)` (Prozess 08); Prüfliste der Qualitätssicherung |
| Use-Case-Diagramm | Claude/David (18 UCs, 7 Akteure, Sofortdiagnose) | – |
| Klassendiagramm | Claude/David (23 → 26 Klassen) | Rollen als Klassen: abstrakte Klasse `Mitarbeiter` mit `Techniker`, `Disponent`, `Werkstattleiter` und ihren Operationen; `Kunde.meldeMangel()`; Assoziation `Mitarbeiter arbeitet in Filiale` |
| Sequenzdiagramme | Claude/David (SD1–SD5) | SD6 „Nachbestellvorschlag bei Meldebestand / Lieferantenbestellung auslösen" (Kilians sqd-03, auf unsere Operationen umgeschrieben) |
| Zustandsdiagramm | beide gleichwertig, Claude/David behalten | Erläuterungstext (Übergänge = Ereignis + Operation) |
| Projektdokumentation | Claude/David (Solution Provider, KI-Kapitel, 37 Seiten) | Kapitel 3.3 Qualitätssicherung, Kapitel 4 (Scrum-Vorgehen, Sprintplan Sprint 0–3 mit Terminen, Trello-Board, Repository-Regeln), Abschnitt 5.4 Konsistenz zwischen den Modellen, Herausforderung „Pool- und Lane-Struktur", KI-Nutzungshinweis in Kapitel 1 |
| Präsentation | Claude/David (20 Folien, Notizen, Vortragende) | Termin auf der Titelfolie, Sprintplan und Trello auf der PM-Folie |
| Projektmanagement | – | Sprintplan, Gruppentermine, Trello-Listen/Labels/Karten (`RepairFlowProjektplanSprintsTrello.md` in V2 bleibt die ausführliche Quelle) |
| Ablagestruktur | Jakobs neues `main` | Ordnernamen `bpmn/`, `uml/`, `doku/`, `praesi/`, `claude.readme/`, Commit-Stempel `[T<nn> <JJJJ-MM-TT>] <typ>: …`, keine Umlaute und kein Projekt-Präfix in Dateinamen |

## Warum die Solution-Provider-Fassung die Basis ist

1. Sie setzt das Dozentenfeedback um: Perspektive geklärt (Solution Provider, FixWerk als Pilotkunde) und ein Alleinstellungsmerkmal ergänzt (KI-Sofortdiagnose). Kilians V2 bleibt Betreiber ohne Gimmick.
2. Die BPMN-Dateien sind für Camunda 8 angereichert und passieren beide Linter ohne Befund. Kilians V2 ist als Camunda 7 mit `isExecutable="false"` gespeichert; der Camunda-Linter prüft solche Diagramme nicht, `bpmnlint` meldet 2 Fehler und 6 Warnungen (unter anderem mehrere Endereignisse, fehlende Bedingungen). Beim Öffnen im Camunda Modeler (Camunda 8) würden fehlende Task-Definitionen als Fehler erscheinen.
3. Die Diagramme von V2 haben in den Renderings überlappende Beschriftungen (zum Beispiel „Kostenvoranschl ag [Entwurf]"), Kreuzungen und je Prozess zwei bis drei Endereignisse; die Layouts von Claude/David sind rasterbasiert ohne Kreuzungen und mit je einem Start- und Endereignis (Vorlesungs-Best-Practice).
4. Das UML-Modell von Claude/David hat mit Voranmeldung, Medienanhang, KIDiagnosevorschlag und Werkstattbetrieb (Mandant) die Klassen, die die gewählte Perspektive braucht, dazu vier Fokus-Ausschnitte für Doku und Folien und eine XMI-Datei für Visual Paradigm.
5. Doku und Präsentation von Claude/David sind umfangreicher (37 Seiten mit allen Diagrammen, 20 Folien) und enthalten das Marktkapitel und die Machbarkeitsdiskussion zur KI.

## Was an Kilians V2 besser war und deshalb übernommen wurde

- **Rollen als Klassen.** `Mitarbeiter` (abstrakt) mit `Techniker`, `Disponent`, `Werkstattleiter` bildet die BPMN-Lanes und die Akteure des Use-Case-Diagramms im Klassenmodell ab. Operationen wie `weiseTechnikerZu()`, `pruefeAuslastung()`, `gibBestellungFrei()`, `loeseBestellungAus()` machen die Sequenzdiagramme sauberer, weil Akteure jetzt Klassen mit Operationen sind.
- **Datenspeicher mit Fachbezug.** `Technikerplan` (Kapazitäts- und Terminplanung) und `Buchhaltung (DATEV-Export)` zeigen die Systemgrenze im Diagramm: Buchhaltung liegt außerhalb, es wird nur übergeben.
- **Sequenzdiagramm Nachbestellvorschlag.** Der Zusammenhang Meldebestand → Vorschlag → Bestellung (mit Freigabe des Werkstattleiters über der Freigabegrenze) war bei uns nur in Prozess 06 sichtbar; jetzt auch als SD6.
- **Projektmanagement mit echten Terminen.** Sprint 0 (02.09.), Sprint 1 (03.09.–05.10.), Sprint 2 (05.10.–15.10.), Sprint 3 (15.10.–22.10.), Abschluss 27.10./13.11.; Trello-Board mit Listen, Labels und Karten; Definition of Done; Git-Regeln. Unser Kapitel 4 hatte nur Platzhalter.
- **Konsistenz-Abschnitt.** Die „drei Klammern" (Datenobjekte = Klassennamen, Lanes = Akteure = Mitarbeiter-Unterklassen, ein Zustandsautomat) als eigener Abschnitt 5.4, ergänzt um eine Zuordnungstabelle Prozess ↔ Use Cases ↔ Klassen ↔ Sequenzdiagramm.
- **KI-Nutzungshinweis.** Ein klarer Absatz, was mit KI-Unterstützung entstanden ist und was das Team verantwortet, mit Platzhalter für eine eventuell geforderte Erklärung.

## Was bewusst nicht übernommen wurde

- Kilians Rollenverteilung (Maxi BPMN, Kilian UML, David Projektleitung/Backup) widerspricht Davids Liste vom 02.09.; Doku und Folien stehen auf Davids Liste, die Stelle ist gelb markiert. Entscheidung am Gruppentermin.
- Kilians Prozessliste (Terminplanung als eigener Prozess 09, keine Sofortdiagnose) – unsere Liste (E-05) integriert die Terminplanung in Prozess 02 und nutzt den freien Platz für die KI-Sofortdiagnose.
- Kilians Pool-Name „FixWerk GmbH" – bei uns „Werkstattbetrieb (Pilotkunde FixWerk GmbH)", weil RepairFlow als Solution Provider viele Werkstätten bedient.
- Camunda 7 als Zielplattform – Tool-Installation und Vorlesung arbeiten mit dem aktuellen Camunda Modeler; Camunda 8 ist dort Standard.
- Kilians Klassenoperationen mit anderen Namen (`fuegePositionHinzu`, `bestaetigeBestellung`): unsere Namen (`addPosition`, `uebermittle`) sind bereits in fünf Sequenzdiagrammen und der XMI verwendet.

## Offene Punkte (siehe auch E-07 im Entscheidungslog)

1. Rollen bestätigen (oben).
2. Präsentationstermin 22.10. oder 27.10.2026 klären (`Allgemeines.docx` aus Moodle nennt 27.10., 09:00, B458; Ablauf sagt „Mitte Oktober").
3. Gruppentermine 05.10., 15.10., 22.10. gegen Rapla prüfen.
4. Kilians `RepairFlowProjektplanSprintsTrello.md` als Trello-Board anlegen (Kilian als Scrum Master) und Screenshot in Kapitel 4.3 einfügen.
5. Maxi: `uml/modell.xmi` in Visual Paradigm importieren, Sequenzdiagramme als Unterdiagramme der Use Cases anlegen (Anleitung `uml/README.md`).
6. David: die zehn BPMN-Dateien im Camunda Modeler öffnen, Problems-Panel prüfen, speichern.
