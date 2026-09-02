# BPMN-Modelle (Geschäftsprozessanalyse)

Zehn Kollaborationsdiagramme im BPMN-2.0-Format, erstellt für den **Camunda Modeler (Camunda 8)**. Dateiname = `p` + zweistellige Nummer + Prozessname in Kleinbuchstaben ohne Umlaute (Repo-Konvention, `claude.readme/CLAUDE.md`); das PNG mit gleichem Basisnamen liegt daneben.

| Datei | Prozess | Pools |
|---|---|---|
| p01-sofortdiagnose.bpmn | KI-Sofortdiagnose und Voranmeldung | Kunde, Werkstattbetrieb |
| p02-auftragsannahme.bpmn | Auftragsannahme, Geräteregistrierung und Terminplanung | Kunde, Werkstattbetrieb |
| p03-fehlerdiagnose.bpmn | Fehlerdiagnose | Kunde, Werkstattbetrieb |
| p04-kostenvoranschlag.bpmn | Kostenvoranschlag und Kundenfreigabe | Kunde, Werkstattbetrieb |
| p05-ersatzteilreservierung.bpmn | Ersatzteil-Verfügbarkeit und Reservierung (filialübergreifend) | Kunde, Werkstattbetrieb |
| p06-ersatzteilbestellung.bpmn | Ersatzteil-Bestellung beim Lieferanten | Lieferant, Werkstattbetrieb, Kunde |
| p07-reparaturdurchfuehrung.bpmn | Reparaturdurchführung und Arbeitszeiterfassung | Kunde, Werkstattbetrieb |
| p08-abholung.bpmn | Abholung, Rechnung und Zahlung | Kunde, Werkstattbetrieb |
| p09-reklamation.bpmn | Reklamation und Gewährleistung | Kunde, Werkstattbetrieb |
| p10-retoure.bpmn | Ersatzteil-Retoure und Lieferanten-Reklamation | Werkstattbetrieb, Lieferant |

Die PNG-Dateien (bpmn-js-Rendering, 2-fach) sind Bildexporte für Doku und Präsentation; Quelle ist immer die .bpmn-Datei.

## Konventionen (aus Vorlesung SYAN-04 und Entscheidung E-06)

- Pool = Unternehmen: „Werkstattbetrieb (Pilotkunde FixWerk GmbH)" mit dem ausmodellierten Prozess, „Kunde" und „Lieferant" als Empty Pools (Black Box). Kommunikation nach außen nur über Nachrichtenflüsse.
- Lanes = Rollen im Werkstattbetrieb: Service / Annahme, Techniker, Werkstattleitung, Ersatzteil-Disposition. Keine Lane für die Software.
- Automatisierung steckt im Aktivitätstyp: Service Task = RepairFlow allein, Business Rule Task = Regel oder KI, Send/Receive Task = Nachricht über RepairFlow, User Task = Mensch mit RepairFlow-Oberfläche, Manual Task = außerhalb der Software.
- Je Diagramm ein Start- und ein Endereignis; Ereignisse im Partizip Perfekt, Aktivitäten als Verb + Objekt.
- Datenobjekte tragen die Klassennamen des Klassendiagramms (mit Zustand in eckigen Klammern). Datenspeicher: „RepairFlow-Datenbank" (Aufträge, Bestände), „Technikerplan" (Prozess 02, Kapazität und Termine) und „Buchhaltung (DATEV-Export)" (Prozess 08, Übergabe an die Buchhaltung außerhalb der Systemgrenze) – die beiden letzten aus Kilians V2 übernommen.
- Camunda-8-Anreicherung, damit das Problems-Panel leer bleibt: `zeebe:taskDefinition` an Service-/Send-/Business-Rule-Tasks, `zeebe:userTask` + Formular-ID an User Tasks, Message-Subscriptions mit Correlation Key, ISO-Dauern an Timern, FEEL-Bedingungen an allen XOR-Ausgängen, `zeebe:calledElement` an Call Activities, `zeebe:loopCharacteristics` am Mehrfach-Teilprozess.

## Prüfstand (02.09.2026, Stand FINAL)

- `@camunda/linting` (derselbe Linter wie im Camunda Modeler, Konfiguration Camunda 8.7): 0 Befunde in allen zehn Dateien.
- `bpmnlint` (recommended): 0 Befunde.
- Import mit bpmn-js: 0 Warnungen.
- Aktivitäten: 120 gesamt, im Schnitt 12,0 je Diagramm, 60 % automatisiert.

## Aufgaben für Maxi (BPMN-Verantwortlicher)

1. Jede Datei im Camunda Modeler öffnen (Camunda 8), Problems-Panel prüfen, einmal speichern (dann steht der Modeler als Exporter in der Datei).
2. Layout gegenlesen: Beschriftungen, Kreuzungen, Lane-Höhen. Bei Bedarf Elemente verschieben, die Semantik bleibt unberührt.
3. Fachlich prüfen, ob Bezeichnungen und Reihenfolgen zum Verständnis der Gruppe passen. Änderungen bitte auch in `doku/03-entscheidungen.md` bzw. in der Doku nachziehen, wenn sie Namen betreffen.
4. Falls der Dozent die Camunda Cloud als Repository verlangt: die zehn Dateien dort in die vorbereiteten Unterordner hochladen (Frage steht in `doku/04-dozenten-feedback.md`).
5. Für die Abgabe: `abgabe/BPMN-WWI25B4-Gruppe1.zip` neu packen, falls sich Dateien geändert haben.

Die Diagramme wurden aus einer strukturierten Prozessspezifikation erzeugt (`tools/diagrams.py`, Generator `tools/bpmngen.py`). Wer die Rohfassung neu erzeugen will: siehe `tools/README.md`.

Kilians V2-Fassung (Camunda 7, Betreiber-Perspektive, `isExecutable="false"`) liegt unter `/Users/david/CLAUDE/V2/bpmn` und ist nicht Teil dieses Stands; Begründung in `doku/05-vergleich-und-zusammenfuehrung.md`.
