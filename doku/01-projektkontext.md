# Projektkontext: Fallstudie Systemanalyse

Quellen: Ablauf-Fallstudie 2026-2 (Stand 07.07.2026), Installationsanleitung BPMN (18.07.2026), Installationsanleitung Visual Paradigm (23.07.2026), Gruppeneinteilung WWI25B4. Stand dieser Datei: 02.09.2026.

## Aufgabe

Methoden- und werkzeuggestützte Systemanalyse als Fallstudie an einem selbst gewählten Beispielprojekt, z. B. einem Startup-Szenario. Im Umfeld des Beispiels müssen Geschäftsprozesse klar erkennbar sein, die sich per Software automatisieren lassen; die Komplexität soll weder zu klein noch zu groß sein.

Unser Beispiel: **RepairFlow**, ein Software-Startup (Solution Provider), das Werkstätten für Fahrrad-, E-Bike- und Elektronikreparaturen eine SaaS-Plattform mit KI-Sofortdiagnose anbietet. Pilot- und Referenzkunde ist die fiktive FixWerk GmbH mit vier Filialen (Entscheidungen E-02 und E-03 in `03-entscheidungen.md`).

## Anforderungen an die Artefakte

### Geschäftsprozessanalyse mit BPMN (15 % der Note, Gruppenbewertung)

- 10 BPMN-2.0-Kollaborationsdiagramme mit durchschnittlich 10 Aktivitäten, vollständig und syntaktisch korrekt
- Beteiligte Ressourcen als Pools/Lanes, außerdem Datenobjekte und Datenspeicher
- Werkzeug: Camunda Modeler (Camunda 8, BPMN diagram) oder bpmn.io
- Diagrammnamen mit zweistelliger Nummer und prägnantem Namen: `01-Sofortdiagnose`, `02-Auftragsannahme` usw.
- Abgabe als ZIP aller exportierten Diagramme (XML)
- Artefakt-Repository: Der Ablauf nennt die Camunda Cloud mit separatem How-To, die Installationsanleitung empfiehlt stattdessen ein selbst gehostetes Git-Repository. Wir nutzen dieses GitHub-Repo. Beim nächsten Coaching klären, ob das reicht.

### Automatisierungspotential

Einen Aspekt im Prozessumfeld festlegen, der durch eine spezielle Software automatisiert wird. Die Software soll eine passende Komplexität und genug Originalität haben. Bei uns: der Reparaturauftrags-Lebenszyklus als Werkstatt-Management-System, mit der KI-Sofortdiagnose als Alleinstellungsmerkmal (siehe `04-dozenten-feedback.md`).

### Objektorientierte Analyse mit UML (15 % der Note, Gruppenbewertung)

- Use-Case-Diagramm mit mindestens 10 Use Cases
- Klassendiagramm mit mindestens 10 Klassen
- 5 Sequenzdiagramme zu 5 ausgewählten Use Cases; jedes als Unterdiagramm (Verfeinerungsdiagramm) des zugehörigen Use Cases anlegen, dann hängt es in VP automatisch darunter
- Werkzeug: Visual Paradigm 18.0; alle Diagramme in die Standardordner des UML-Repositories
- Abgabe als lokale Kopie der VP-Workspace-Datei (`.vpp`)

### Abschlusspräsentation (10 %, Einzelbewertung)

- Letzter Termin Mitte Oktober, 15 bis 20 Minuten im Plenum
- Alle Gruppenmitglieder wirken mit; der PDF-Export enthält, wer welchen Beitrag verantwortet

### Projektdokumentation (5 %, Gruppenbewertung)

- Rund 20 Seiten als PDF
- Titelseite mit Kurs, Gruppennummer, Projektname und vollständigen Namen aller Mitglieder
- Inhalt: Mitglieder der Gruppe, ausführliche Beschreibung des Projekts, Vorgehen bei der Umsetzung, Projektmanagement, Überblick über die erstellten Artefakte, Probleme/Herausforderungen, Feedback
- Gedacht als kompakte, anschaulich gestaltete „Visitenkarte" des Projekts: Ein Außenstehender soll schnell sehen, was von wem, mit welcher Ausgangslage, welchem Verlauf und welchem Ergebnis erarbeitet wurde

### Engagement (5 %, Einzelbewertung)

Mitarbeit während des Semesters.

Das Fallstudien-Portfolio ist Teil des Moduls „Methoden der WI" und wird 50:50 mit der Vorlesung Projektmanagement verrechnet.

## Zeitrahmen

- 2 Stunden Kickoff, 23 Stunden Arbeit in den Kleingruppen, 3 Stunden Abschlusspräsentation
- Regelmäßiges Coaching in Präsenz, meist im Planspiel-Labor oder in Gruppenräumen
- Abschlusspräsentation: laut Ablauf „Mitte Oktober 2026“, laut `Allgemeines.docx` (Moodle, Quelle Kilian) **27.10.2026, 09:00 Uhr, Raum B458**; Kilian vermutet den 22.10. – klären (E-13)
- Gruppentermine (Angabe Kilian, je 4:15 h): 02.09., 05.10., 15.10., 22.10.2026; Sprintplan in der Doku, Kapitel 4
- **Abgabe: bis 13.11.2026, 23:59 Uhr** über den Moodle-Upload-Link (genauer Termin laut Moodle). Pro Person muss eine individuelle, archivierbare Version der vollständigen Prüfungsleistung in Moodle liegen.

## Abgabeformat

Ein ZIP mit dem Namen `Fallstudie-WWI25B4-Gruppe1.zip`, darin (siehe auch `abgabe/README.md`):

| Datei | Inhalt |
|---|---|
| `Projekt-WWI25B4-Gruppe1.pdf` | Projektdokumentation |
| `BPMN-WWI25B4-Gruppe1.zip` | Export aller BPMN-Diagramme |
| `UML-WWI25B4-Gruppe1.vpp` | Lokale Kopie der Visual-Paradigm-Workspace-Datei |
| PDF der Abschlusspräsentation | mit Angabe, wer welchen Beitrag verantwortet |

## Werkzeuge und Zugänge

### Camunda Modeler

Download über camunda.com/de/download/modeler, beim Start „Camunda 8 → BPMN diagram" wählen. Alternative im Browser: bpmn.io (Dateien per Upload/Download). Kostenlose Tutorials unter academy.camunda.com (Registrierung nötig).

### Visual Paradigm 18.0

- Download aus dem Archiv unter visual-paradigm.com/download/archive, bewusst Version 18.0, auch wenn es eine neuere gibt
- Lizenz beim ersten Start: „Change License" → „Academic License" → „Academic Partner Program License"
- Activation Code aus dem Moodle-Raum, Name frei wählbar, E-Mail zwingend die DHBW-Studierendenadresse (`nachname.vorname.xxx@student.dhbw-karlsruhe.de`); der Bestätigungscode kommt per Mail

### VP-Teamwork-Server (UML-Repository)

- Nur im DHBW-Netz erreichbar. Von außerhalb vorher das Lehre-VPN über den Cisco AnyConnect Client starten.
- In VP: Team → Utilities → Open Teamwork Client → Session → Login, Option „We host Teamwork Server in our own web server" ankreuzen, Next
- Login mit dem DHBW-Account `nachname.vorname.xxx@dh-karlsruhe.de` (mit `dh-karlsruhe.de`, nicht `student.dhbw-karlsruhe.de`)
- Project → Manage Project, links unter `vp.dh-karlsruhe.de` das Repository **`WWI25B4G1 (trunk)`** markieren, mit „>" nach rechts schieben, OK, dann Checkout und Open
- Arbeitsweise wie bei Git: zu Beginn jeder Session „Update", am Ende „Commit". Ausloggen über Session → Logout.
- Regelmäßig lokale Sicherung über File → Save Project As (wird vorausgesetzt)

### Git

Das GitHub-Repo ist das Artefakt-Repository für BPMN und der Ort für alles Schriftliche. Regeln stehen in der README im Hauptverzeichnis (Branches, Pull Requests, Commit-Messages, Definition of Done).

## Fachliche Konventionen für alle Artefakte

Diese Namen gelten wortgleich in BPMN, UML und Doku (Quelle: `tools/umlmodel.py` und `bpmn/README.md`).

- Pools: Werkstattbetrieb (Pilotkunde FixWerk GmbH) · Kunde · Lieferant; Lanes: Service / Annahme · Techniker · Werkstattleitung · Ersatzteil-Disposition
- Zustandsautomat `Reparaturauftrag`: angenommen → in Diagnose → KVA offen → freigegeben | abgelehnt → Teile bestellt → in Reparatur → fertig → abgeholt
- Prozesse: 01 KI-Sofortdiagnose und Voranmeldung · 02 Auftragsannahme, Geräteregistrierung und Terminplanung · 03 Fehlerdiagnose · 04 Kostenvoranschlag und Kundenfreigabe · 05 Ersatzteil-Verfügbarkeit und Reservierung · 06 Ersatzteil-Bestellung beim Lieferanten · 07 Reparaturdurchführung und Arbeitszeiterfassung · 08 Abholung, Rechnung und Zahlung · 09 Reklamation und Gewährleistung · 10 Ersatzteil-Retoure und Lieferanten-Reklamation
- Klassen (23): Person (abstrakt), Kunde, Techniker, Werkstattbetrieb, Filiale, Lieferant, Voranmeldung, Medienanhang, KIDiagnosevorschlag, Reparaturauftrag, Geraet, Fehlerbefund, Kostenvoranschlag, KvaPosition, Reparaturschritt, Arbeitszeitbuchung, Ersatzteil, Lagerbestand, ErsatzteilReservierung, Lieferantenbestellung, Bestellposition, Rechnung, Reklamation
- Use Cases (18): UC01 Sofortdiagnose anfordern · UC02 Voranmeldung bestätigen · UC03 Reparaturauftrag anlegen · UC04 Diagnosevorschlag prüfen · UC05 Diagnosebefund erfassen · UC06 KVA erstellen · UC07 KVA freigeben / ablehnen · UC08 Ersatzteil-Verfügbarkeit prüfen · UC09 Ersatzteil reservieren · UC10 Lieferantenbestellung auslösen · UC11 Wareneingang buchen · UC12 Nachbestellvorschlag bei Meldebestand · UC13 Reparaturschritt und Arbeitszeit erfassen · UC14 Auftrag fertigmelden und Kunde benachrichtigen · UC15 Rechnung erstellen und Zahlung erfassen · UC16 Reklamation bearbeiten · UC17 Werkstatttermin planen und Techniker zuweisen · UC18 Werkstattbetrieb und Filialen verwalten
- Sequenzdiagramme: SD1 UC01 · SD2 UC07 · SD3 UC09 · SD4 UC14 · SD5 UC16

## Stand der Artefakte (02.09.2026, nach Zusammenführung mit Kilians V2)

| Artefakt | Stand | Nächster Schritt |
|---|---|---|
| BPMN `bpmn/p01-sofortdiagnose.bpmn` … `p10-retoure.bpmn` | fertig, 120 Aktivitäten (Ø 12,0), 60 % automatisiert, Camunda-Linter (8.7) und bpmnlint ohne Befund, PNG je Datei | David: im Camunda Modeler öffnen, Layout gegenlesen, speichern; ggf. Camunda Cloud |
| Use-Case-Diagramm `uml/usecase.*` | 18 UCs, 7 Akteure, auch in `uml/modell.xmi` | Maxi: XMI in VP importieren, Diagramm anlegen, ins VP-Repository committen |
| Klassendiagramm `uml/klassen.*` + 4 Fokus-Ausschnitte | 26 Klassen (mit Mitarbeiter-Hierarchie aus V2), 7 Enums, 34 Assoziationen | Maxi: in VP anlegen (Anleitung `uml/README.md`) |
| Sequenzdiagramme `uml/sequenz-01…06.*` | 6 Stück (SD6 Nachbestellvorschlag aus V2), konsistent zum Klassendiagramm | Maxi: in VP als Unterdiagramme der Use Cases zeichnen |
| Zustandsdiagramm `uml/zustand-reparaturauftrag.*` | PlantUML/PNG (Zusatz) | optional in VP |
| Projektdokumentation `doku/Projektdokumentation.docx/.pdf` | 37 Seiten (25 Haupttext + Anhang), Kapitel 4 mit Sprintplan/Trello aus V2, gelb markierte Stellen brauchen Input der Gruppe | alle: Platzhalter füllen, Jakob: Review |
| Präsentation `praesi/Abschlusspraesentation.pptx/.pdf` | 20 Folien mit Notizen und Vortragenden (Vorschlag), Termin 27.10. auf der Titelfolie | Gruppe: Zuordnung und Termin bestätigen, Probevortrag |
| Abgabe-ZIP | `abgabe/BPMN-WWI25B4-Gruppe1.zip` liegt bereit, VPP fehlt noch | Nina: Ende Oktober zusammenstellen |
| Trello-Board | Plan in Kilians `RepairFlowProjektplanSprintsTrello.md` (V2) | Kilian: Board anlegen, Karten aus dem Plan übernehmen |
