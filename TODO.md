# Aufgaben bis zur Abgabe

Stand: 25.10.2026, nach den Modell-Anpassungen vom 25.10. (P02–P04 im Modeler, SD3, SD5, SD6 und Klassendiagramm in VP, Doku nachgezogen). Die Liste enthält nur offene Aufgaben; Erledigtes wird gestrichen, nicht abgehakt.

Termine: Präsentation **27.10.2026, 09:00 Uhr, Raum B458**. Abgabe **13.11.2026, 23:59 Uhr** über Moodle.

Grundregeln: Jede Änderung über Branch und Pull Request, vorher `git pull`. Wer an Word- oder PowerPoint-Dateien arbeitet, sagt vorher in der WhatsApp-Gruppe Bescheid, weil diese Dateien nicht zusammengeführt werden können. Der Sprechtext steht nur in `4_praesentation/Sprechtext_Abschlusspraesentation.docx`, nicht in den Notizen der PPTX.

## Stand der Artefakte

- **BPMN:** Alle zehn Dateien im Camunda Modeler geprüft und gespeichert, PNGs neu exportiert (PR #67, #69, #70, #79); bpmnlint 0 Befunde. Zählung (Aktivitäten = Tasks, Call Activities und Teilprozess im Werkstatt-Pool; automatisiert = Service, Script, Business Rule, Send, Receive; `zeebe:userTask` nicht doppelt zählen): **143 Aktivitäten (Ø 14,3), 89 automatisiert = 62 %, 34 User Tasks, 9 Manual Tasks, 10 Call Activities und 1 Teilprozess, 29 Kundenaktivitäten, 48 Nachrichtenflüsse, 58 Datenobjekte, 14 Datenspeicher.** Je Diagramm (Aktivitäten/automatisiert): 01 14/14, 02 16/7, 03 13/6, 04 12/8, 05 16/12, 06 17/11, 07 13/6, 08 17/11, 09 16/8, 10 9/6. Doku (5.1, 5.2, Tabelle 6), PPTX (Folien 15 und 16), Sprechtext Adrian und `1_bpmn/README.md` sind auf diesem Stand.
- **UML:** Use-Case-, Klassen- und sechs Sequenzdiagramme fertig. Am 25.10. an die Prozesse angeglichen: SD3 (andere Filialen nur bei zu wenig eigenem Bestand, Reparaturbeginn nur bei der ersten Disposition), SD5 (Ablehnung durch den Kunden über die KundenApp, bei Fristablauf oder fehlenden Teilen über die Werkstattoberfläche), SD6 (Bestätigung, Mahnung, Storno und Statuswechsel automatisch, ohne Einkäufer), `wechsleStatus(...)` überall ohne Parameternamen; Klassendiagramm ohne die nicht mehr genutzten Operationen `bestaetigeBestellung`, `mahneBestellung`, `storniereBestellung`, `oeffneBestellung` (Werkstattoberflaeche) und `sucheBestellung` (Werkstattbetrieb). Nach der Diagrammprüfung vom 25.10. außerdem: SD1 Botschaft 27 hinter das alt, SD2 Reparaturabsage auch beim dritten Fristablauf, SD5 Benachrichtigungen an die KundenApp (Nacharbeit, Absage) und Diagnostiker freigestellt, Klassendiagramm „nutzt“ mit Multiplizität 1 an der KundenApp. PNGs und VPP exportiert, Teamwork-Server committet.
- **Doku:** Inhaltlich fertig (PR #72), am 25.10. an die Modelle angepasst: 5.1 (29 Kundenaktivitäten, Prozess 04 mit Reparaturabsage), Tabelle 6 Zeile 02 „Auftrag eingeplant“, Tabelle 7 (KI-Diagnosedienst als Business Rule Task in Prozess 01), Tabelle 8 (SD2, SD3, SD5, SD6), 5.4 (Werkstattbetrieb), Abb. 3, 5, 6 und 7 neu.
- **PPTX:** 24 Folien (PR #73): David 1–7, Kilian 8 und 17–18, Maximilian 9–12, Adrian 13–16, Jakob 19–20, Nina 21–23, Folie 24 Beiträge der Vortragenden. Notizen enthalten nur die Vortragenden.
- **Sprechtext:** vollständig für die Folien 1–23, Überschriften mit den Foliennummern der PPTX. Folie 18 am 25.10. an das Klassendiagramm angepasst (Werkstattbetrieb kennt Aufträge und Reklamationen).
- **PDFs:** entstehen erst ganz am Ende.

---

## B. Vor der Abgabe am 13.11.

- [ ] **PPTX vor dem PDF-Export:** Datei → Auf Probleme überprüfen → Dokument prüfen (Notizen behalten), Autor „Gruppe 1 WWI25B4“.
- [ ] **Inhaltsverzeichnis der Doku** ganz am Ende in Word gegen das PDF prüfen (statisch; nach dem neuen Abschnitt 2.6 alle Seitenzahlen prüfen).
- [ ] `0_abgabe/KI-Angabe-Moodle.md`: noch Entwurf, jede Person ergänzt ihre Werkzeuge (Titelbild ist eingetragen).
- [ ] Abgabepaket nach `0_abgabe/README.md`: Doku-PDF, BPMN-ZIP (umbenannte `.bpmn`), VPP, Präsentations-PDF mit Folie 24 (Zuordnung der Vortragenden), dann `Fallstudie-WWI25B4-Gruppe1.zip`. Jede Person lädt selbst hoch.

---

## E. Gruppenentscheidungen (entschieden, bleibt so)

Keine Backup-Folien; keine sichtbaren Foliennummern in der PPTX; KI-generiertes Titelbild bleibt und steht in der KI-Angabe; Folien 17 und 21 am Vortragsrechner geprüft, passt; Mockup zeigt Filiale und Terminvorschlag vor dem Bestätigen (Termin 28.10.2026); P09 „Gerät annehmen und Mangel dokumentieren“ bleibt in der Form vom 25.10.; ref-Beschriftungen in den Sequenzdiagrammen bleiben; Klassendiagramm: außer den fünf Bestell-Operationen nach SD6 keine weiteren Streichungen; Sprechtext: Gedankenstriche, Kontrastsätze und Wiederholungen bleiben, Folien 9–12 ohne Zeitangaben; Folie 21 und Bild auf Folien 9/10 bleiben; BPMN-PNG-Labels (p05, p07, p08, p09) bleiben; Datenobjekt „Gerät“ mit Umlaut; Schrift Calibri/Segoe UI bleibt; Doku Abb. 6/7 im aktuellen Format; Multiplizität „1“ im Use-Case-Diagramm; VP-Lizenzkennung in den UML-PNGs; Mockup-Details (Persona, „Sonstiges“, Reihenfolge) bleiben; Datenobjekte mit Bindestrich („Reparatur-auftrag“); kein Hinweis in 3.2, dass das Entscheidungslog nicht abgegeben wird; kein Satz zu Boundary-Klassen in 5.4; Klassennamen in der Doku ohne Code-Schrift, keine Tabelle „Fristen und Grenzen“, kein eigener Quellenverweis; „KVA in 60 Sekunden“ im Sprechtext und Mockup Schritt 8 bleiben; Datumsangaben in der Doku, Format der Abbildungen 2–5, Klasse für den KI-Diagnosedienst, kein Sprechtext in den PPTX-Notizen.

---

## Vor dem PDF-Export der Doku (Checkliste)

- [ ] Abbildungen 1–7 sind die aktuellen Exporte.
- [ ] Kennzahlen entsprechen der letzten Zählung (5.1, 5.2, Tabelle 6).
- [ ] Inhaltsverzeichnis in Word gegen das PDF geprüft.
- [ ] Suche nach „E-[0-9]“, „Claude“, „KI-Werkzeug“, „Maxi“, „Prüfbericht“, „Session“, „OFFEN“ ergibt nichts.

---

## F. Mögliche Fragen am 27.10. (durchgegangen)

1. „Zeigen Sie das Use-Case- oder Klassendiagramm.“ (Kein Bild in der Präsentation; Doku oder VP bereithalten.)
2. „Welche Use Cases haben ein Sequenzdiagramm, und warum diese?“ SD1 = UC01, SD2 = UC07, SD3 = UC09, SD4 = UC14, SD5 = UC16, SD6 = UC10.
3. „Was sind die zwei Prüfprogramme?“ (Folie 19: Camunda-Linter und Problems-Panel des Modelers)
4. „Warum ist der Kunde ein eigener Pool mit Ablauf, der Lieferant aber eine Black Box?“ (Doku Kapitel 6)
5. „Wie kommt die Oberfläche an das richtige Objekt?“ (Suche über den Werkstattbetrieb, SD1; wie das Webportal-Beispiel der Vorlesung)
6. „Warum ist P02 am niedrigsten automatisiert?“
7. „Wo stehen Geschäftsmodell und Ausblick in der Dokumentation?“ (2.2 und 2.6)
8. „Warum 15 Rollen, aber nur vier Mitarbeiterklassen?“
9. „Wie ist ‚KVA in 60 Sekunden‘ belegt?“ (Annahme, Zielwert)
10. „Was passiert nach der zweiten gescheiterten Nacharbeit?“ Status abgelehnt; Prozess 07 endet mit „Gerät abholbereit“, die Rückgabe läuft über Prozess 08.
11. „Warum eine Rolle je Use Case? Warum Komposition beim Befund, nicht beim Gerät? Was ist automatisiert, was nicht?“
12. „Warum bleiben neun Aktivitäten manuell?“ (Arbeiten am Gerät und an der Ware liegen außerhalb der Systemgrenze, Doku 5.2)
