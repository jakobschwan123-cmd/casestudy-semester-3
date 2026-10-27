# BPMN-Modelle (Geschäftsprozessanalyse)

Zehn Kollaborationsdiagramme im BPMN-2.0-Format für den **Camunda Modeler (Camunda 8)**. Die `.bpmn`-Datei ist die Quelle; das PNG mit gleichem Basisnamen ist der Bildexport für Doku und Präsentation. Bearbeitet wird nur im Camunda Modeler, danach das PNG neu exportieren (E-21).

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

Für die Abgabe werden die Dateien nach Ablauf benannt (`01-Sofortdiagnose.bpmn` … `10-Retoure.bpmn`), siehe `0_abgabe/README.md`.

## Konventionen (Vorlesung SYAN-04, E-06)

- Pool = Unternehmen: „Werkstattbetrieb (Pilotkunde FixWerk GmbH)“ mit dem ausführbaren Prozess, „Kunde“ mit eigenem, nicht ausführbarem Prozess (E-16), „Lieferant“ als Black Box. Zwischen Pools nur Nachrichtenflüsse.
- Lanes = Rollen: Service / Annahme, Techniker, Werkstattleitung, Ersatzteil-Disposition. Keine Lane für die Software.
- Automatisierung über den Aktivitätstyp: Service Task = RepairFlow allein, Business Rule Task = Regel oder KI, Send/Receive Task = Nachricht über RepairFlow, User Task = Mensch mit RepairFlow, Manual Task = außerhalb der Software.
- Aufrufe zwischen Prozessen: 04 → 05, 05 → 06, 07 → 05 (Nachtrag), 09 → 05 → 07 (Nacharbeit; Kunde erst nach „Alle Teile beschaffbar?“ informiert), 06/09 → 10, 03/04/09 → 08 (Rückgabe des Geräts immer über 08). 07 endet mit „Gerät abholbereit“, dem Start von 08. 05 startet mit „Teilebedarf freigegeben“, weil es aus 04 (KVA) und aus 09 (Nacharbeit ohne KVA) aufgerufen wird.
- Zeitüberschreitungen nur über ein ereignisbasiertes Gateway mit Zeit-Zwischenereignis im Fluss (Vorlesung 4-36), keine an Aktivitäten angehefteten Ereignisse.
- Je Prozessebene ein Start- und ein Endereignis; Ereignisse im Partizip Perfekt, Aktivitäten als Verb + Objekt, Verzweigungen als Frage.
- Datenobjekte tragen die Klassennamen des Klassendiagramms, im Diagramm zur Lesbarkeit mit Bindestrich getrennt („Reparatur-auftrag [freigegeben]“); der Zustand in eckigen Klammern ist ein Wert der zugehörigen Aufzählung.

## Kennzahlen (Stand 27.10.2026, nach der Modeler-Prüfung aller zehn Dateien am 25.10.)

143 Aktivitäten im Werkstatt-Pool (Ø 14,3 je Diagramm), davon 89 automatisiert (62 %); 29 Aktivitäten in den Kundenabläufen; 49 Nachrichtenflüsse; 58 Datenobjekte und 14 Datenspeicher (72). Je Diagramm (Akt./autom.): 01 14/14, 02 16/7, 03 13/6, 04 12/8, 05 16/12, 06 17/11, 07 13/6, 08 17/11, 09 16/8, 10 9/6. Alle zehn Dateien sind im Camunda Modeler gespeichert; bpmnlint (`recommended` + Camunda 8.7) meldet 0 Befunde. Ändert sich ein Diagramm, die Zahlen in Doku 5.1/5.2, Tabelle 6 und auf den Folien 15 und 16 prüfen.
