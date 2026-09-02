# Entscheidungslog

Jede Entscheidung, die mehr als eine Person betrifft, kommt hier rein: was entschieden wurde, warum, und was sich dadurch ändert. Offene Entscheidungen stehen oben, damit sie nicht untergehen.

## Offen

### E-07 Bestätigung von E-02, E-03, E-05 und E-08 durch die Gruppe

David hat am 02.09.2026 Perspektive, Gimmick, Prozessliste und Ablagestruktur festgelegt, damit die Artefakte gebaut werden konnten. Adrian (Owner) und die Gruppe sollten das beim nächsten Treffen bestätigen oder kippen, solange Änderungen noch billig sind. Ebenfalls zu bestätigen: die Zuordnung der Vortragenden (`02-team-und-rollen.md`) und ob der Absatz zum KI-Einsatz in Kapitel 1 der Doku bleibt.

### E-14 Bestätigung durch den Dozenten

Offen: Wechsel der Ansprechperson (Maximilian → Nina) mitteilen; Camunda Cloud als Pflicht-Repository oder Git ausreichend; Gruppentermine 05.10., 15.10., 22.10. gegen Rapla prüfen.

## Entschieden

### E-13 Rollenverteilung, Präsentationstermin und Gruppentermine

Datum: 02.09.2026 (Gruppentermin, Sprint 1).
Entscheidung: (a) Rollen nach Kilians Liste: Nina Projektleitung, David stellvertretende Projektleitung und Backup-Beauftragter, Adrian Product Owner, Kilian Scrum Master und UML-Verantwortlicher, Maxi BPMN-Verantwortlicher, Jakob Qualitätsmanager, Claude Dokumanager. (b) Abschlusspräsentation am 27.10.2026, 09:00 Uhr, Raum B458 laut `Allgemeines.docx`; der 22.10. ist der letzte Gruppentermin und dient als Generalprobe. (c) Sprint-Takt = Gruppentermine 02.09., 05.10., 15.10., 22.10. (je 4:15 h); Trello-Board mit einer Liste je Termin.
Auswirkung (umgesetzt): Doku Kapitel 1 und 4, `02-team-und-rollen.md`, Folie 16 und 20 der Präsentation (Sprecherzuordnung: Nina 1–2/18–19, David 3/16, Adrian 4–6/11, Maxi 7–10, Kilian 12–14, Jakob 15/17), README-Dateien in `bpmn/`, `uml/`, `abgabe/`.

### E-01 Projektthema RepairFlow

Datum: vor dem 02.09.2026 (Konzept wurde dem Dozenten vorgestellt).
Entscheidung: Werkstatt-Management-System RepairFlow für Fahrrad-, E-Bike- und Elektronikreparaturen; Referenzszenario FixWerk GmbH mit vier Filialen.
Begründung: Klar erkennbare Geschäftsprozesse (Annahme, Diagnose, KVA, Beschaffung, Reparatur, Abrechnung, Reklamation), Automatisierungspotential im Auftrags-Lebenszyklus und in der filialübergreifenden Ersatzteil-Disposition.

### E-02 Perspektive: Solution Provider

Datum: 02.09.2026 (David, vorläufig bis Bestätigung durch die Gruppe, siehe E-07). Frage kam vom Dozenten bei der Konzeptvorstellung.
Entscheidung: Wir sind das Startup RepairFlow, das Werkstätten eine Software- und Workflow-Lösung als SaaS anbietet. Die FixWerk GmbH (vier Filialen) ist unser Pilot- und Referenzkunde, an dem die Prozesse analysiert wurden.
Begründung: Echtes Startup-Szenario; Mitbewerber sind greifbar (Fahrrad: fixdesk, RO App, Repero, MCA Bike; Elektronik: RepairDesk, RepairShopr); das Gimmick ist ein Produkt-Feature; die Frage „warum kauft ihr keine fertige Werkstattsoftware?" stellt sich nicht.
Verworfen: Betreiber-Perspektive (FixWerk führt ein eigenes System ein): schwacher Startup-Charakter, Mitbewerber wären andere Werkstätten.
Auswirkung (umgesetzt): Texte in Doku und Präsentation; im Klassendiagramm `Werkstattbetrieb` (Mandant) über `Filiale` und `Techniker`; Use Case UC18 Werkstattbetrieb und Filialen verwalten mit Akteur Werkstattinhaber; Kapitel Markt und Wettbewerb in der Doku.

### E-03 Gimmick: KI-Sofortdiagnose

Datum: 02.09.2026 (David, vorläufig, siehe E-07).
Entscheidung: Hauptfeature „KI-Sofortdiagnose": Der Kunde lädt in der RepairFlow-App Foto, Video oder eine Tonaufnahme des defekten Geräts hoch. Die KI erstellt einen Diagnosevorschlag mit wahrscheinlicher Ursache, benötigten Ersatzteilen und einem vorläufigen Kostenvoranschlag, prüft die Teileverfügbarkeit über alle Filialen und schlägt Filiale und Termin vor. Der Techniker bestätigt oder korrigiert den Vorschlag bei der Annahme. Slogan: „KVA in 60 Sekunden".
Verworfen bzw. zurückgestellt: G2 Predictive Disposition (als Ausblick erwähnt), G3 Techniker-Copilot, G4 digitale Geräteakte.
Begründung: Hängt direkt am Kernproblem (Kundenkommunikation, KVA-Freigabe), ist heute nur teilweise realisierbar (genau das wollte der Dozent) und liefert von allein einen Prozess, Use Cases und ein Sequenzdiagramm.
Auswirkung (umgesetzt): Prozess 01 KI-Sofortdiagnose und Voranmeldung; Use Cases UC01 Sofortdiagnose anfordern, UC02 Voranmeldung bestätigen, UC04 Diagnosevorschlag prüfen; Akteur KI-Diagnosedienst; Klassen `Voranmeldung`, `Medienanhang`, `KIDiagnosevorschlag`; Sequenzdiagramm SD1.

### E-04 GitHub als gemeinsamer Ablageort für Doku und Entscheidungen

Datum: 02.09.2026 (Vorschlag Claude/David, gilt bis jemand widerspricht).
Entscheidung: Alles Schriftliche zum Projekt liegt im Repo (seit E-11 in `doku/`, vorher `docs/`), Änderungen über `docs/…`-Branch und Pull Request wie in der README beschrieben.
Begründung: Alle arbeiten ohnehin im Repo; das Repo ist in Davids Claude-Projekt eingebunden, damit hat der Dokumanager automatisch den aktuellen Stand.

### E-05 Prozessliste mit 10 Diagrammen

Datum: 02.09.2026 (David/Claude, vorläufig, siehe E-07).
Entscheidung: Die Terminplanung ist kein eigener Prozess mehr, sondern eine Lane „Werkstattleitung" innerhalb der Auftragsannahme (Kapazität prüfen, Techniker zuweisen, Termin bestätigen). Dafür kommt die KI-Sofortdiagnose als neuer Prozess 01 hinzu, es bleibt bei genau 10 Diagrammen:

| Nr | Diagramm | Pools |
|---|---|---|
| 01 | KI-Sofortdiagnose und Voranmeldung | Kunde, Werkstattbetrieb |
| 02 | Auftragsannahme, Geräteregistrierung und Terminplanung | Kunde, Werkstattbetrieb |
| 03 | Fehlerdiagnose | Kunde, Werkstattbetrieb |
| 04 | Kostenvoranschlag und Kundenfreigabe | Kunde, Werkstattbetrieb |
| 05 | Ersatzteil-Verfügbarkeit und Reservierung (filialübergreifend) | Kunde, Werkstattbetrieb |
| 06 | Ersatzteil-Bestellung beim Lieferanten | Lieferant, Werkstattbetrieb, Kunde |
| 07 | Reparaturdurchführung und Arbeitszeiterfassung | Kunde, Werkstattbetrieb |
| 08 | Abholung, Rechnung und Zahlung | Kunde, Werkstattbetrieb |
| 09 | Reklamation und Gewährleistung | Kunde, Werkstattbetrieb |
| 10 | Ersatzteil-Retoure und Lieferanten-Reklamation | Werkstattbetrieb, Lieferant |

Begründung: Die Terminplanung war der einzige Prozess ohne zweiten Pool und damit das schwächste Kollaborationsdiagramm; die Sofortdiagnose ist das Aushängeschild und braucht ein eigenes Diagramm. Stand 02.09.2026: alle zehn Diagramme liegen in `bpmn/`.

### E-06 Modellierungskonventionen BPMN (nach Vorlesung SYAN-04, Prof. Freytag)

Datum: 02.09.2026 (Claude/David).
Entscheidung: Pool = Unternehmen (Werkstattbetrieb, Kunde, Lieferant), Lanes = Rollen im Werkstattbetrieb (Service / Annahme, Techniker, Werkstattleitung, Ersatzteil-Disposition). Keine „System-Lane": Computer sind laut Vorlesung keine Ressource. RepairFlow wird über die Aktivitätstypen sichtbar: automatisierte Aktivität (Service Task) = RepairFlow erledigt den Schritt allein, Benutzer-Aktivität = Mensch mit RepairFlow-Oberfläche, sendende/empfangende Aktivität = Nachricht über RepairFlow an Kunde oder Lieferant, Geschäftsregel-Aktivität = KI- oder Regelentscheidung, manuelle Aktivität = außerhalb der Systemgrenze (physische Reparatur, Übergabe). Kunde und Lieferant sind Empty Pools (Black Box) mit Nachrichtenflüssen. Je Diagramm ein Start- und ein Endereignis (Best Practice aus der Vorlesung), Ereignisse im Partizip Perfekt („Auftrag angenommen"), Aktivitäten als Verb mit Objekt („Kundendaten erfassen"). Datenobjekte tragen Klassennamen aus dem Klassendiagramm, ggf. mit Zustand in eckigen Klammern; RepairFlow-Datenbank als Datenspeicher.
Ergänzung 02.09.2026: Die Diagramme sind für Camunda 8 „engine-ready" angereichert (Task-Definitionen, Message-Subscriptions, Timer-Dauern, FEEL-Bedingungen, Formular-IDs), damit das Problems-Panel des Camunda Modelers leer bleibt. Loops enthalten immer einen Wartezustand (User Task, Receive Task oder Timer), weil der Camunda-Linter sonst eine Endlosschleife meldet.

### E-08 Ablagestruktur im Repository

Datum: 02.09.2026 (Claude/David, vorläufig, siehe E-07).
Entscheidung: `bpmn/` (Diagramme + PNG), `uml/` (PlantUML, PNG, XMI), `doku/` (docx + PDF), `praesentation/` (pptx + PDF), `abgabe/` (ZIPs für Moodle), `tools/` (Generatoren), `docs/` (Doku des Teams), `archiv/repairflow-v1/` (erste Fassung der Projektgrundlagen). Dateinamen der Abgabe nach Ablauf: `Projekt-WWI25B4-Gruppe1.pdf`, `BPMN-WWI25B4-Gruppe1.zip`, `UML-WWI25B4-Gruppe1.vpp`, `Praesentation-WWI25B4-Gruppe1.pdf`.
Begründung: Ein Ordner je Artefakttyp, Verantwortliche sind in der README zugeordnet, die Abgabenamen stehen früh fest.

### E-09 Umfang der UML-Modelle

Datum: 02.09.2026 (Claude/David, vorläufig).
Entscheidung: 18 Use Cases in vier Bereichen mit sieben Akteuren (davon zwei sekundär: Lieferant, KI-Diagnosedienst); 23 Klassen mit sieben Aufzählungen; Sequenzdiagramme zu UC01, UC07, UC09, UC14 und UC16; zusätzlich ein Zustandsdiagramm für Reparaturauftrag.
Begründung: Die Mindestanforderungen (10 UCs, 10 Klassen, 5 SDs) sind deutlich erfüllt, ohne dass das Modell unübersichtlich wird; die fünf Sequenzdiagramme sind die interaktionsreichsten Use Cases und decken Sofortdiagnose, KVA, Disposition, Fertigmeldung und Reklamation ab.

### E-10 Zusammenführung der beiden Entwürfe (Kilian V2 und Claude/David)

Datum: 02.09.2026 (Claude/David, vorläufig bis Bestätigung durch die Gruppe).
Entscheidung: Basis ist der Solution-Provider-Entwurf mit KI-Sofortdiagnose (Camunda 8, Linter ohne Befund). Aus Kilians V2 übernommen: Rollenklassen `Mitarbeiter` → `Techniker`/`Disponent`/`Werkstattleiter` und `Kunde.meldeMangel()` im Klassendiagramm (jetzt 26 Klassen, 34 Assoziationen), Datenspeicher `Technikerplan` (P02) und `Buchhaltung (DATEV-Export)` (P08), Sequenzdiagramm SD6 Nachbestellvorschlag, Doku-Kapitel 3.3 Qualitätssicherung und 4 Projektmanagement (Scrum, Sprintplan, Trello, Git-Regeln), Abschnitt 5.4 Konsistenz, KI-Nutzungshinweis.
Begründung: siehe `05-vergleich-und-zusammenfuehrung.md`. Beide Entwürfe haben Stärken; die Zusammenführung erhält das Dozentenfeedback (Perspektive, Gimmick) und ergänzt das, was bei uns Platzhalter war (Projektmanagement).
Auswirkung: E-09 ist überholt (26 Klassen, sechs Sequenzdiagramme statt fünf), E-08 wird durch E-11 ersetzt.

### E-11 Ablagestruktur nach Jakobs neuem `main` (ersetzt E-08)

Datum: 02.09.2026 (Jakob per Commit `bf9b448`/`3f437f3`, von Claude/David übernommen).
Entscheidung: Ordner `bpmn/`, `uml/`, `doku/`, `praesi/`, `claude.readme/` (dazu `abgabe/` und `tools/` aus E-08). Dateinamen ohne Umlaute und ohne Projekt-Präfix; Quelle und Bild mit gleichem Basisnamen (`klassen.puml` ↔ `klassen.png`, `p01-sofortdiagnose.bpmn` ↔ `p01-sofortdiagnose.png`). Commit-Nachrichten mit Termin-Stempel `[T<nn> <JJJJ-MM-TT>] <typ>: <beschreibung>` (T03 = 02.09.2026), kein direkter Commit auf `main`, Pull Request mit Review. Team-Doku (`docs/`) wandert nach `doku/`.
Begründung: Ein Layout für alle; Jakobs Struktur ist bereits auf `main`, die Konventionen stehen in `claude.readme/README.md`.
Auswirkung: Kilians V1-Dateien auf `main` (`bpmn/p01.bpmn` …, `uml/klassen.puml` mit 18 Klassen, `doku/00…04-*.md`) werden durch diesen Stand ersetzt (Vorgehen in `README.md` des FINAL-Ordners).

### E-12 Vorgehensmodell und Sprintplan

Datum: 02.09.2026 (Kilian in V2, von Claude/David in Doku Kapitel 4 übernommen; Termine vorläufig, siehe E-13).
Entscheidung: Scrum mit Product Owner (Adrian), Scrum Master (Kilian) und Projektleitung (Nina) als Ansprechpartnerin des Dozenten; Sprint-Takt = Gruppentermine. Sprint 0 (02.09.) Setup und Konventionen, Sprint 1 (03.09.–05.10.) Erstfassung aller Modelle, Sprint 2 (05.10.–15.10.) Review und Verhalten (Sequenz-/Zustandsdiagramm), Sprint 3 (15.10.–22.10.) Freeze und Generalprobe, Abschluss 27.10. Präsentation und 13.11. Abgabe. Trello-Board „RepairFlow – Fallstudie SYAN WWI25B4 G1" mit Listen Info & Regeln, Product Backlog, Sprint 0–3, Abschluss, In Arbeit, Review/QA, Done.
Begründung: Der Ablauf verlangt ein Kapitel Projektmanagement; Kilians Plan ist konkret und passt zu den Rollen.

