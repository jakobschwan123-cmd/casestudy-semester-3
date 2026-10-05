# BPMN-Modelle (Geschäftsprozessanalyse)

Zehn Kollaborationsdiagramme im BPMN-2.0-Format für den **Camunda Modeler (Camunda 8)**. Die `.bpmn`-Datei ist die Quelle; das PNG mit gleichem Basisnamen ist der Bildexport für Doku und Präsentation. Bearbeitet wird nur im Camunda Modeler, danach das PNG neu exportieren (E-20).

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

Für die Abgabe werden die Dateien nach Ablauf benannt (`01-Sofortdiagnose.bpmn` … `10-Retoure.bpmn`), siehe `abgabe/README.md`.

## Konventionen (Vorlesung SYAN-04, E-06)

- Pool = Unternehmen: „Werkstattbetrieb (Pilotkunde FixWerk GmbH)“ mit dem ausführbaren Prozess, „Kunde“ mit eigenem, nicht ausführbarem Prozess (E-16), „Lieferant“ als Black Box. Zwischen Pools nur Nachrichtenflüsse.
- Lanes = Rollen: Service / Annahme, Techniker, Werkstattleitung, Ersatzteil-Disposition. Keine Lane für die Software.
- Automatisierung über den Aktivitätstyp: Service Task = RepairFlow allein, Business Rule Task = Regel oder KI, Send/Receive Task = Nachricht über RepairFlow, User Task = Mensch mit RepairFlow, Manual Task = außerhalb der Software.
- Aufrufe zwischen Prozessen: 04 → 05, 05 → 06, 07 → 05 (Nachtrag), 09 → 07, 06/09 → 10, 03/04/09 → 08 (Rückgabe des Geräts immer über 08).
- Je Prozessebene ein Start- und ein Endereignis; Ereignisse im Partizip Perfekt, Aktivitäten als Verb + Objekt.
- Datenobjekte tragen die Klassennamen des Klassendiagramms, der Zustand in eckigen Klammern ist ein Wert der zugehörigen Aufzählung.

## Kennzahlen (Stand E-19)

130 Aktivitäten im Werkstatt-Pool (Ø 13,0 je Diagramm), davon 79 automatisiert (61 %); 26 Aktivitäten in den Kundenabläufen; 39 Nachrichtenflüsse; 59 Datenobjekte und -speicher. Ändert sich ein Diagramm, die Zahlen in Doku 5.1 und auf den Folien prüfen.
