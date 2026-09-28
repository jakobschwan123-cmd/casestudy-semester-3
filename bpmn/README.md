# BPMN-Modelle (Geschäftsprozessanalyse)

Zehn Kollaborationsdiagramme im BPMN-2.0-Format, erstellt für den **Camunda Modeler (Camunda 8)**. Dateiname = `p` + zweistellige Nummer + Prozessname in Kleinbuchstaben ohne Umlaute (Repo-Konvention, `claude.readme/CLAUDE.md`); das PNG mit gleichem Basisnamen liegt daneben. Für Abgabe und Camunda Cloud gilt der Ablauf: zweistellige Nummer + prägnanter Modellname (`01-Sofortdiagnose` … `10-Retoure`); `python3 tools/pack_bpmn.py` erzeugt das Abgabe-ZIP mit diesen Namen.

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

- Pool = Unternehmen: „Werkstattbetrieb (Pilotkunde FixWerk GmbH)" mit dem ausmodellierten Prozess, „Kunde" mit eigenem, nicht ausführbarem Prozess (Start, Aktivitäten, Ende; E-16), „Lieferant" als Empty Pool (Black Box). Kommunikation zwischen den Pools nur über Nachrichtenflüsse, die an konkreten Elementen beginnen und enden.
- Lanes = Rollen im Werkstattbetrieb: Service / Annahme, Techniker, Werkstattleitung, Ersatzteil-Disposition. Keine Lane für die Software.
- Automatisierung steckt im Aktivitätstyp: Service Task = RepairFlow allein, Business Rule Task = Regel oder KI, Send/Receive Task = Nachricht über RepairFlow, User Task = Mensch mit RepairFlow-Oberfläche, Manual Task = außerhalb der Software.
- Je Diagramm (Prozessebene) ein Start- und ein Endereignis; eingebettete Teilprozesse (p05) haben ihr eigenes Start-/Endereignis. Ereignisse im Partizip Perfekt, Aktivitäten als Verb + Objekt.
- Datenobjekte tragen die Klassennamen des Klassendiagramms (Bindestrich nur als Zeilenumbruch, z. B. „Kosten-voranschlag"), der Zustand in eckigen Klammern ist ein Wert der zugehörigen Aufzählung (AuftragStatus, KvaStatus, ReservierungStatus, BestellStatus, ZahlungStatus). Datenspeicher: „RepairFlow-Datenbank" (Aufträge, Bestände), „Technikerplan" (Prozess 02, Kapazität und Termine) und „Buchhaltung (DATEV-Export)" (Prozess 08, Übergabe an die Buchhaltung außerhalb der Systemgrenze) – die beiden letzten aus Kilians V2 übernommen.
- Camunda-8-Anreicherung, damit das Problems-Panel leer bleibt: `zeebe:taskDefinition` an Service-/Send-/Business-Rule-Tasks, `zeebe:userTask` + Formular-ID an User Tasks, Message-Subscriptions mit Correlation Key, ISO-Dauern an Timern, FEEL-Bedingungen an allen XOR-Ausgängen, `zeebe:calledElement` an Call Activities, `zeebe:loopCharacteristics` am Mehrfach-Teilprozess.

## Prüfstand (28.09.2026, nach E-15 und E-16)

- `@camunda/linting` (Regeln des Problems-Panels im Camunda Modeler, Camunda 8): 0 Befunde in allen zehn Dateien. Geprüft per Skript, nicht im Modeler selbst. Der Kunden-Prozess ist `isExecutable="false"` und hat keine Camunda-Anreicherung; der Modeler prüft ihn nur syntaktisch.
- `bpmnlint` (recommended): 0 Befunde.
- Import mit bpmn-js: 0 Warnungen; keine Sequenz- oder Nachrichtenflüsse durch fremde Elemente (per Skript geprüft).
- Aktivitäten im Werkstatt-Pool: 121 gesamt, im Schnitt 12,1 je Diagramm, 74 davon automatisiert (61 %); dazu 24 Aktivitäten in den Kundenabläufen (P01–P09); 32 Nachrichtenflüsse, 48 Datenobjekte und -speicher (`python3 tools/mkstats.py` zählt nach und schreibt `tools/process_stats.json`).
- Ergänzt am 28.09. (E-16): Kunde mit eigenem Ablauf in P01–P09, z. B. P01 Foto/Video/Ton aufnehmen → Anfrage senden → Rückfrage oder Diagnose abwarten → Termin annehmen → Ende; Nachrichtenflüsse verbinden jetzt Elemente beider Pools. Lieferant bleibt Black Box.
- Korrigiert am 26.09.: P02 (Umleitung an andere Filiale mit Techniker und Termin), P05 (Reservierungen und Meldebestand immer, danach Fehlteilbestellung), P03 (Status „abgelehnt" bei Totalschaden), P06 (nach Retoure: Ersatz zuordnen oder neu bestellen), P08 (Zahlungseingang bei Rechnung), P09 (Nacharbeitsauftrag, Aufrufname), P10 (ohne „07 Reparatur fortsetzen"); Details in `doku/03-entscheidungen.md`, E-15.

## Aufgaben für Maxi (BPMN-Verantwortlicher)

1. Jede Datei im Camunda Modeler öffnen (Camunda 8), Problems-Panel prüfen, einmal speichern (dann steht der Modeler als Exporter in der Datei).
2. Layout gegenlesen: Beschriftungen, Kreuzungen, Lane-Höhen. Bei Bedarf Elemente verschieben, die Semantik bleibt unberührt.
3. Fachlich prüfen, ob Bezeichnungen und Reihenfolgen zum Verständnis der Gruppe passen. Änderungen bitte auch in `doku/03-entscheidungen.md` bzw. in der Doku nachziehen, wenn sie Namen betreffen.
4. Die zehn Dateien in die vorbereiteten Unterordner der Camunda Cloud hochladen (Pflicht laut Ablauf), Namen `01-Sofortdiagnose` … `10-Retoure`.
5. Für die Abgabe: `python3 tools/pack_bpmn.py` ausführen, falls sich Dateien geändert haben (erzeugt `abgabe/BPMN-WWI25B4-Gruppe1.zip` mit den Ablauf-Namen).

Die Diagramme wurden aus einer strukturierten Prozessspezifikation erzeugt (`tools/diagrams.py`, Generator `tools/bpmngen.py`). Wer die Rohfassung neu erzeugen will: siehe `tools/README.md`.

Kilians frühere Fassung (Camunda 7, Betreiber-Perspektive, `isExecutable="false"`) liegt unter `archiv/alte-versionen/bpmn/` und ist nicht Teil dieses Stands; Begründung in `doku/05-vergleich-und-zusammenfuehrung.md`.
