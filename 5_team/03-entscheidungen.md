# Entscheidungslog

Kurzfassung der gültigen Entscheidungen. Der vollständige Verlauf mit Begründungen (E-01 bis E-20) liegt in `9_archiv/v2_2026-10-05_generatoren-und-pruefungen/doku/03-entscheidungen-bis-2026-10-05.md`. Neue Entscheidungen kommen oben als E-23, E-24 … dazu, jeweils mit Datum, Entscheidung und Auswirkung in wenigen Zeilen.

## Offen

- **E-19 bestätigen** (Adrian holt die Bestätigung ein, P07/P08): Fristen bis zur Verwertung (vierte Abhol-Erinnerung) und bis zum Inkasso (dritte Mahnung) sowie die Frage, ob `AuftragStatus` einen Wert für verwertete Geräte braucht.
- **E-20 bestätigen** (Adrian, P05/P06).
- **E-22 bestätigen** (Adrian, P06/P10/SD4/SD6): Storno nach der zweiten erfolglosen Lieferungs-Mahnung; Empfang der Ersatzlieferung in P10.
- **E-23 bestätigen** (alle, 15.10.): Zuständigkeiten für die Fertigstellung.
- **E-24 bestätigen** (alle, 15.10.): Use-Case-Diagramm mit einer Rolle je Use Case.
- **E-25 bestätigen** (alle, 15.10.): Präsentation als Pitch und Zusammenfassung ohne Diagrammbilder.
- **E-26 bestätigen** (alle, Modeler-Prüfung Maximilian): Korrekturen P01–P05.

## E-26 Fehleranalyse und Korrekturen P01–P05 (15.10.2026)

Vorschlag von Jakob (Analyse und Umsetzung mit KI-Unterstützung), Bestätigung durch die Gruppe offen.

- **P03:** Neues Gateway „KI-Vorschlag vorhanden?“ vor „KI-Diagnosevorschlag sichten“, weil Aufträge ohne Voranmeldung (P02, Zweig „nein“) keinen KI-Vorschlag haben. Nach „Erweiterte Prüfung durchführen“ fragt „Fehler gefunden?“; bei „nein“ geht es wie bei Unwirtschaftlichkeit zur Reparaturabsage (die Nachricht nennt „kein Befund“ schon bisher).
- **P04:** Gateway heißt „Dritte Frist verstrichen?“ statt „Dritte Erinnerung ohne Antwort?“ (KVA plus höchstens zwei Erinnerungen, abgelehnt nach dem dritten Fristablauf), Documentation entsprechend. Bei Freigabe und Ablehnung entsteht zusätzlich „Kostenvoranschlag [freigegeben]“ bzw. „[abgelehnt]“, weil P05 den freigegebenen KVA als Eingabe liest. Datenobjekt „KvaPosition“ statt „Kva-Position“.
- **P05:** Neue Aktivität „Vorreservierungen übernehmen“ (Service Task) vor der Teileprüfung; Vorreservierungen aus P01 werden zu Reservierungen, die Mehrfachinstanz prüft nur noch die offenen Teile (`offeneErsatzteile`). Vorher wurden vorreservierte Teile ein zweites Mal reserviert. Startereignis im Kunden-Pool „Reparaturbeginn erhalten“. SD3 hat dafür einen opt-Block.
- **P01/P02:** Nachrichtenfluss „Diagnose, Vorab-KVA, Termin“ wie die Nachricht; Datenobjekt „Geraet“ (Klassenname).
- **Darstellung:** XOR-Gateways in P03–P05 mit X-Markierung wie in P01/P02.
- **Kennzahlen:** 132 Aktivitäten (Ø 13,2), 80 automatisiert (61 %), 41 Nachrichtenflüsse, 63 Datenobjekte und -speicher. Camunda-Linter ohne Befund. PNGs von P01–P05 mit bpmn-js (Renderer des Modelers) neu erzeugt; die Modeler-Prüfung aller zehn Dateien bleibt bei Maximilian (TODO B).
- **Nicht geändert:** Im Kunden-Pool von P01 gibt es keinen Ausstieg, falls die Werkstatt die Voranmeldung nach Fristablauf verwirft; der Kundenablauf modelliert nur das Antworten, daher kein Deadlock im Modell.

## E-25 Präsentation als Pitch und Zusammenfassung (15.10.2026)

Vorschlag von Kilian (vorbereitet mit KI-Unterstützung), Bestätigung durch die Gruppe offen.

- **Aufbau:** 17 Folien plus Anhang. Teil 1 ist der Pitch (Problem, Lösung, Nutzen, Auftragsreise, KI-Sofortdiagnose), Teil 2 die Zusammenfassung der Ergebnisse (Kennzahlen, Prozesse, Rollen und Use Cases, Datenmodell, Vorgehen, Qualität, Herausforderungen), zum Schluss Geschäftsmodell, Ausblick und Fazit.
- **Keine Diagrammbilder:** Die Diagramme liegen in der Projektdokumentation und im Abgabepaket (BPMN-ZIP, VPP). In den Folien stehen Ergebnisse als Zahlen, Rollen, Entwurfsentscheidungen und Prozess-Highlights. Damit entfallen die Bildaufgaben für die Folien.
- **Sprechtexte:** je Folie in den PowerPoint-Notizen und in `4_praesentation/Sprechtext_Abschlusspraesentation.docx` mit Zeitangaben (gesamt etwa 18 Minuten); jede Person passt ihren Teil an.
- **Quelle:** `4_praesentation/tools/pres.js` (pptxgenjs) und `tools/sprechtext.py` erzeugen die Datei; Änderungen am Text dort, nicht in der pptx, sonst gehen sie beim nächsten Erzeugen verloren. Wer direkt in PowerPoint ändert, sagt es in der WhatsApp-Gruppe.

## E-24 Use-Case-Diagramm: je Use Case eine Rolle (15.10.2026)

Umsetzung des Dozentenhinweises aus dem Coaching am 15.10. (`04-dozenten-feedback.md`), vorbereitet mit KI-Unterstützung, Bestätigung durch die Gruppe offen.

- **Diagramm:** Jeder Use Case hat genau eine Rolle als primären Akteur. Aus Servicemitarbeiter, Techniker, Disponent, Werkstattleiter und Werkstattinhaber werden 15 Mitarbeiterrollen (Serviceannahme, Diagnoseprüfer, Diagnostiker, Kalkulator, Werkstattplaner, Reparateur, Endkontrolleur, Geräteausgabe, Reklamationsbearbeiter, Teiledisponent, Bestandsplaner, Einkäufer, Wareneingang, Retourenbearbeiter, Betriebsadministrator). Der Kunde (UC01, UC02, UC07) bleibt ein Akteur, dreimal dargestellt. Der Lieferant ist kein Akteur mehr (Black Box ohne Systemzugang, Dozentenhinweis vom 15.10.); er kommt wie in BPMN nur über Nachrichten vor. Der KI-Diagnosedienst bleibt als externes System an UC01. UC08 wird nur per include erreicht und hat keinen Akteur. include/extend bleiben wie bisher (2 include, 6 extend). Zählung: 19 Use Cases, 17 Akteure, 19 Akteur-Verbindungen (vorher 35).
- **Organigramm:** Die Zuordnung Rolle → Klasse (Unterklassen von Mitarbeiter) → BPMN-Lane steht in Doku Tabelle 7. Das Klassendiagramm ändert sich nicht.
- **Sequenzdiagramme:** Die erste Lebenslinie ist die Rolle des Use Case (SD2 Kalkulator/Serviceannahme/Kunde, SD3 Teiledisponent, SD4 Endkontrolleur, SD5 Reklamationsbearbeiter/Diagnostiker/Werkstattleiter, SD6 Einkäufer). Wer im Use-Case-Diagramm keine Rolle hat, behält den Mitarbeitertyp (Werkstattleiter). Der Lieferant bleibt in SD6 als externe Lebenslinie, weil die Nachrichten an ihn Teil des Ablaufs sind; das entspricht dem Black-Box-Pool in BPMN.
- **Dateien:** `2_uml/entwurf-plantuml/usecase.puml` (Modell), `usecase_layout.py` → `usecase.png/.svg` (Vorlage mit festem Raster), `modell.xmi` und neu `modell-usecase.xmi` (nur Anwendungsfallmodell, für den Neuimport in VP), SD-Vorlagen und PNGs, Doku 3.1/5.3/5.5/5.6/7.1, Folien 12 und 18.
- **Visual Paradigm:** Paket „Anwendungsfallmodell“ löschen, `modell-usecase.xmi` importieren, Diagramm neu aufziehen (Anleitung in `2_uml/README.md`). Nicht die ganze `modell.xmi` erneut importieren, sonst gibt es die Klassen doppelt.

## E-23 Zuständigkeiten für die Fertigstellung (15.10.2026)

Vorschlag von Kilian (vorbereitet mit KI-Unterstützung), Bestätigung durch die Gruppe am 15.10. offen.

- **Grundsatz:** Nur Kilian und David haben Zugriff auf Visual Paradigm, deshalb liegen alle VP-Diagramme bei ihnen. Die übrigen Arbeiten (BPMN-Abschluss, Dokumentation, Fachkonzept, Entscheidungen, Qualitätssicherung, Präsentation) sind so verteilt, dass jede Person im Gesamtprojekt einen vergleichbaren Anteil verantwortet. Die Zuständigkeiten stehen in Doku Kapitel 1 und `02-team-und-rollen.md`.
- **Visual Paradigm:** Kilian Klassendiagramm, SD1, SD4, VPP-Datei und Konsistenzprüfung; David Use-Case-Diagramm (E-24), SD2, SD3, SD5, SD6.
- **Übrige:** Nina Redaktion der Dokumentation (Abbildungen, gelbe Hinweise, Kapitel 1/4/7, PDF) und Abgabe-Archiv; Adrian Fachkonzept (Kapitel 2), Entscheidungslog, Bestätigung E-19/E-20/E-22, Abschnitt 5.2 und Kapitel 6; Maximilian alle zehn BPMN-Dateien im Modeler, Kennzahlen, Abschnitt 5.1; Jakob QA-Checkliste, Reviews, 3.2 und 5.6, Präsentations-PDF.
- **Präsentation:** Jede Person trägt vor, was sie verantwortet (Foliennummern nach E-25): Nina 1–2, 16–17; David 3, 6, 11; Adrian 4, 5, 7; Maximilian 8–10; Kilian 12, 13; Jakob 14, 15. Folie 2, Folie 18, Sprechernotizen und Doku Kapitel 1 sind angepasst.
- **Offene Aufgaben:** `TODO.md` listet alle Aufgaben ohne Namen; die Zuteilung erfolgt im Gruppentermin nach den Zuständigkeiten oben.

## E-22 Abschluss der QA-Befunde Q1–Q3 und B12 (08.10.2026)

Vorschlag von Kilian (umgesetzt mit KI-Unterstützung), Bestätigung durch die Gruppe offen.

- **P06 (Q1):** Nach „14 Tage verstrichen“ fragt das neue Gateway „Bereits zweimal angemahnt?“. Nein → „Lieferung anmahnen“ und weiter warten, ja → derselbe Weg wie ohne Auftragsbestätigung: „Bestellung stornieren“ → „Alternativen Lieferanten suchen“. Damit hat jede Warteschleife einen Ausstieg. Die Zahl zwei ist ein Vorschlag (analog zur einmaligen Eskalation in P10) und kann am 15.10. geändert werden.
- **P10 (B12):** Vor „Ersatzlieferung buchen“ steht das Nachrichten-Zwischenereignis „Ersatzlieferung erhalten“ mit Nachrichtenfluss vom Lieferanten.
- **SD4 (Q2, Q3):** ref auf UC13 nennt die Teile-Disposition über UC09/P05 bei freigegebenem Nachtrag; nach der Endkontrolle `loop 0..2` für Nacharbeit, danach alt: fertigmelden oder `wechsleStatus(ABGELEHNT)`.
- **SD6:** nach der Bestellbestätigung alt „Lieferung eingetroffen (nach höchstens zwei Mahnungen)“ / „auch nach der zweiten Mahnung keine Lieferung“ → `storniere()`, weiter wie ohne Auftragsbestätigung.
- **Kennzahlen:** 131 Aktivitäten (unverändert, Gateway und Ereignis zählen nicht), 41 Nachrichtenflüsse. Beide Linter ohne Befund. Doku (1, 3.3, 4.3, 5.1, 5.1.2, 5.3.3, 5.4, 6, 7) und Bilder angepasst.
- **Abweichung vom Werkzeugweg aus E-21:** P06 und P10 wurden ausnahmsweise mit dem archivierten Generator neu erzeugt statt im Camunda Modeler geändert, weil er P03–P10 bis dahin byte-gleich reproduzierte und so das Layout erhalten blieb. Maximilian öffnet beide Dateien bei der Modeler-Prüfung, speichert sie dort und exportiert die PNGs neu; danach gilt wieder nur der Modeler.

## E-21 Gruppenbeschluss vom 05.10.2026

Beschlossen von der ganzen Gruppe am Gruppentermin; Eintrag mit KI-Unterstützung (Claude) vorbereitet.

- **Bestätigt:** Perspektive Solution Provider (E-02), KI-Sofortdiagnose (E-03), Prozessliste (E-05), Ablagestruktur (E-11), Korrekturen E-15, Kunde als eigener Prozess (E-16), E-17 vollständig (Rückgabe über P08, Lagergebühr nach der dritten Abhol-Erinnerung, Mahnung nach 14 Tagen, Akteur Servicemitarbeiter, UC19 Retoure), E-18 mit genau einem Klassendiagramm und UC04 als eigenständigem Use Case. Damit sind E-07 und E-14 erledigt.
- **KI-Nutzung:** Kein KI-Absatz in der Projektdokumentation; den KI-Einsatz geben wir beim Moodle-Upload gesondert an. Absatz in Kapitel 1 und „Dokumanager“ auf Folie 16 entfernt.
- **Modellierung:** Aktivitäten zählen nur im Werkstatt-Pool (Ø 13,1); Camunda-8-Anreicherung bleibt; Modellgröße bleibt (27 Klassen, 19 Use Cases); UC18 bleibt als Administration außerhalb der zehn Prozesse; Startereignis P09 bleibt „Mangel gemeldet“.
- **Werkzeuge:** Keine Camunda Cloud, die BPMN-Modelle liegen nur im Git-Repository (mit dem Dozenten abgeklärt, für ihn in Ordnung). Quelle der BPMN-Diagramme sind ab jetzt die `.bpmn`-Dateien (Camunda Modeler); die Generatoren liegen in `9_archiv/v2_2026-10-05_generatoren-und-pruefungen/tools/`. Das BPMN-Abgabe-ZIP wird zur Abgabe von Hand gepackt.
- **Organisation:** Keine feste Ansprechperson für den Dozenten, Abstimmung im Coaching. Zuständigkeiten bleiben wie in `02-team-und-rollen.md` (Maximilian BPMN inklusive 09/10). Kommunikation über WhatsApp, Dateien nur über das GitHub-Repository. Kein Trello-Screenshot in Doku und Folien. In allen Dokumenten heißt es „Maximilian“.
- **Repository:** Prüfprotokolle, alte Befunde, die To-do-Liste vom 05.10., die Vergleichsnotiz, die alte Dateiübersicht und der ausführliche Entscheidungslog liegen in `9_archiv/`.

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
| E-11 | Ablagestruktur `1_bpmn/`, `2_uml/`, `3_doku/`, `4_praesentation/`, `0_abgabe/`, `9_archiv/` |
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
| E-23 | Zuständigkeiten für die Fertigstellung, Vortrag folgt der Verantwortung – Bestätigung offen |
| E-24 | Use-Case-Diagramm mit einer Rolle je Use Case, 15 Mitarbeiterrollen, Lieferant als Black Box ohne Akteur, Zuordnung in Doku Tabelle 7 – Bestätigung offen |
| E-25 | Präsentation als Pitch und Zusammenfassung ohne Diagrammbilder, Sprechtexte je Folie – Bestätigung offen |
| E-26 | Korrekturen P01–P05 (KI-Vorschlag optional, kein Befund, KVA-Status, Vorreservierungen in P05) – Bestätigung offen |
