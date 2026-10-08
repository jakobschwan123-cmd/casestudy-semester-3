# Entscheidungslog

Kurzfassung der gültigen Entscheidungen. Der vollständige Verlauf mit Begründungen (E-01 bis E-20) liegt in `archiv/doku/03-entscheidungen-bis-2026-10-05.md`. Neue Entscheidungen kommen oben als E-23, E-24 … dazu, jeweils mit Datum, Entscheidung und Auswirkung in wenigen Zeilen.

## Offen

- **E-19 bestätigen** (Jakob, P07/P08): Fristen bis zur Verwertung (vierte Abhol-Erinnerung) und bis zum Inkasso (dritte Mahnung) sowie die Frage, ob `AuftragStatus` einen Wert für verwertete Geräte braucht.
- **E-20 bestätigen** (David, P05/P06).
- **E-22 bestätigen** (Kilian, P06/P10/SD4): Storno nach der zweiten erfolglosen Lieferungs-Mahnung; Empfang der Ersatzlieferung in P10.

## E-22 Abschluss der QA-Befunde Q1–Q3 und B12 (08.10.2026)

Vorschlag von Kilian (umgesetzt mit KI-Unterstützung), Bestätigung durch die Gruppe offen.

- **P06 (Q1):** Nach „14 Tage verstrichen“ fragt das neue Gateway „Bereits zweimal angemahnt?“. Nein → „Lieferung anmahnen“ und weiter warten, ja → derselbe Weg wie ohne Auftragsbestätigung: „Bestellung stornieren“ → „Alternativen Lieferanten suchen“. Damit hat jede Warteschleife einen Ausstieg. Die Zahl zwei ist ein Vorschlag (analog zur einmaligen Eskalation in P10) und kann am 15.10. geändert werden.
- **P10 (B12):** Vor „Ersatzlieferung buchen“ steht das Nachrichten-Zwischenereignis „Ersatzlieferung erhalten“ mit Nachrichtenfluss vom Lieferanten.
- **SD4 (Q2, Q3):** ref auf UC13 nennt die Teile-Disposition über UC09/P05 bei freigegebenem Nachtrag; nach der Endkontrolle `loop 0..2` für Nacharbeit, danach alt: fertigmelden oder `wechsleStatus(ABGELEHNT)`.
- **Kennzahlen:** 131 Aktivitäten (unverändert, Gateway und Ereignis zählen nicht), 41 Nachrichtenflüsse. Beide Linter ohne Befund. Doku (5.1, 5.1.2, 5.3.3, 5.4, Kapitel 6) und Bilder angepasst; P06/P10 wurden aus dem archivierten Generator erzeugt, der P03–P10 bis dahin unverändert reproduzierte. Maximilian prüft beide Dateien bei der Modeler-Prüfung mit.

## E-21 Gruppenbeschluss vom 05.10.2026

Beschlossen von der ganzen Gruppe am Gruppentermin; Eintrag mit KI-Unterstützung (Claude) vorbereitet.

- **Bestätigt:** Perspektive Solution Provider (E-02), KI-Sofortdiagnose (E-03), Prozessliste (E-05), Ablagestruktur (E-11), Korrekturen E-15, Kunde als eigener Prozess (E-16), E-17 vollständig (Rückgabe über P08, Lagergebühr nach der dritten Abhol-Erinnerung, Mahnung nach 14 Tagen, Akteur Servicemitarbeiter, UC19 Retoure), E-18 mit genau einem Klassendiagramm und UC04 als eigenständigem Use Case. Damit sind E-07 und E-14 erledigt.
- **KI-Nutzung:** Kein KI-Absatz in der Projektdokumentation; den KI-Einsatz geben wir beim Moodle-Upload gesondert an. Absatz in Kapitel 1 und „Dokumanager“ auf Folie 16 entfernt.
- **Modellierung:** Aktivitäten zählen nur im Werkstatt-Pool (Ø 13,1); Camunda-8-Anreicherung bleibt; Modellgröße bleibt (27 Klassen, 19 Use Cases); UC18 bleibt als Administration außerhalb der zehn Prozesse; Startereignis P09 bleibt „Mangel gemeldet“.
- **Werkzeuge:** Keine Camunda Cloud, die BPMN-Modelle liegen nur im Git-Repository. Quelle der BPMN-Diagramme sind ab jetzt die `.bpmn`-Dateien (Camunda Modeler); die Generatoren liegen in `archiv/tools/`. Das BPMN-Abgabe-ZIP wird zur Abgabe von Hand gepackt.
- **Organisation:** Keine feste Ansprechperson für den Dozenten, Abstimmung im Coaching. Zuständigkeiten bleiben wie in `02-team-und-rollen.md` (Maximilian BPMN inklusive 09/10). Kommunikation über WhatsApp, Dateien nur über das GitHub-Repository. Kein Trello-Screenshot in Doku und Folien. In allen Dokumenten heißt es „Maximilian“.
- **Repository:** Prüfprotokolle, alte Befunde, die To-do-Liste vom 05.10., die Vergleichsnotiz, die alte Dateiübersicht und der ausführliche Entscheidungslog liegen in `archiv/`.

## Gültige Entscheidungen im Überblick

| Nr. | Inhalt |
|---|---|
| E-01 | Projektthema RepairFlow: Werkstatt-Management für Fahrrad-, E-Bike- und Elektronikreparaturen |
| E-02 | Perspektive Solution Provider (SaaS-Startup), FixWerk GmbH als Pilot- und Referenzkunde |
| E-03 | Alleinstellungsmerkmal KI-Sofortdiagnose (Prozess 01, UC01/UC02/UC04, SD1) |
| E-04 | Alles Schriftliche liegt im GitHub-Repository, Änderungen über Branch und Pull Request |
| E-05 | Zehn Prozesse P01 Sofortdiagnose bis P10 Retoure |
| E-06 | BPMN-Konventionen nach Vorlesung (Pool je Unternehmen, Lanes je Rolle, Verb + Objekt, Partizip Perfekt) |
| E-10 | Zusammenführung von Kilians Entwurf V2 und dem Solution-Provider-Entwurf |
| E-11 | Ablagestruktur `bpmn/`, `uml/`, `doku/`, `praesi/`, `abgabe/`, `archiv/` |
| E-12 | Scrum im Takt der Gruppentermine, Sprintplan in Doku Kapitel 4 |
| E-13 | Rollen, Gruppentermine 02.09./05.10./15.10./22.10., Präsentation 27.10.2026, 09:00, B458 |
| E-15 | Korrekturen der Gesamtprüfung vom 26.09. (BPMN-Fehler, Botschaft = Operation) |
| E-16 | Kunde als eigener, nicht ausführbarer Prozess; Lieferant bleibt Black Box |
| E-17 | Korrekturen des Komplettchecks vom 05.10. (Rückgabe über P08, Schleifenausstiege, Servicemitarbeiter, UC19) |
| E-18 | Ein vollständiges Klassendiagramm; Use Cases und Sequenzdiagramme mit BPMN abgeglichen |
| E-19 | Logikfehler in P07/P08 behoben (Nachtrag über P05, begrenzte Nacharbeit, Verwertung, Inkasso) – Bestätigung offen |
| E-20 | P05/P06 überarbeitet (Bestellung nur bei Fehlteilen, Kundeninfo durch Service, Warten mit Timer und Mahnung in P06) – Bestätigung offen |
| E-21 | Gruppenbeschluss vom 05.10.2026 (siehe oben) |
| E-22 | Ausstieg der Liefermahnung in P06, Empfang der Ersatzlieferung in P10, SD4 an P07 angeglichen – Bestätigung offen |
