# Aufgaben bis zur Abgabe

Stand: 27.10.2026, nach der Abschlusspräsentation und der Umsetzung der Prüfung vom 27.10. (PR #91 bis #94: P04, UML, BPMN P04/P07/P09/P10, Doku, Team-Unterlagen). Die Liste enthält nur offene Aufgaben; Erledigtes wird gestrichen, nicht abgehakt.

Termin: Abgabe **13.11.2026, 23:59 Uhr** über Moodle. Die Präsentation am 27.10.2026 ist gehalten.

Grundregeln: Jede Änderung über Branch und Pull Request, vorher `git pull`. Wer an Word- oder PowerPoint-Dateien arbeitet, sagt vorher in der WhatsApp-Gruppe Bescheid, weil diese Dateien nicht zusammengeführt werden können. Der Sprechtext steht nur in `4_praesentation/Sprechtext_Abschlusspraesentation.docx`, nicht in den Notizen der PPTX.

## Stand der Artefakte

- **BPMN:** Alle zehn Dateien am 25.10. im Camunda Modeler geprüft und gespeichert; bpmnlint 0 Befunde. Am 27.10. geändert: P04 (Kunde wartet nach der Freigabe auf „Reparaturbeginn erhalten“ oder „Reparaturabsage erhalten“, zweiter Nachrichtenfluss „Reparaturabsage“), Aufrufe von Prozess 05 übergeben `ersteDisposition` (P04 `true`, P07 und P09 `false`), P09 (Gateway „Kunde antwortet?“ im Kundenablauf; „Lieferantenteil defekt?“ und „10 Retoure abwickeln“ erst nach „08 Abholung abwickeln“, der Kunde wartet nicht auf die Retoure), Beschreibungen P09 und P10. PNGs von P04 und P09 im Modeler neu exportiert. Zählung (Aktivitäten = Tasks, Call Activities und Teilprozess im Werkstatt-Pool; automatisiert = Service, Script, Business Rule, Send, Receive; `zeebe:userTask` nicht doppelt zählen): **143 Aktivitäten (Ø 14,3), 89 automatisiert = 62 %, 34 User Tasks, 9 Manual Tasks, 10 Call Activities und 1 Teilprozess, 29 Kundenaktivitäten, 49 Nachrichtenflüsse, 58 Datenobjekte, 14 Datenspeicher.** Je Diagramm (Aktivitäten/automatisiert): 01 14/14, 02 16/7, 03 13/6, 04 12/8, 05 16/12, 06 17/11, 07 13/6, 08 17/11, 09 16/8, 10 9/6. Doku (5.1, 5.2, Tabelle 6) und `1_bpmn/README.md` sind auf diesem Stand; die Folien nennen keine Zahl der Nachrichtenflüsse.
- **UML:** Use-Case-, Klassen- und sechs Sequenzdiagramme fertig. Am 27.10. nach der Vorlesung (Fragmente nur alt, opt, loop, ref) und den Prozessen angepasst: SD1 ohne break (opt „Medien nicht auswertbar“ mit innerem alt „neue Aufnahme innerhalb von 7 Tagen“ / „7 Tage ohne neue Aufnahme“ → `verwerfen()`, danach opt „Medien auswertbar oder neu aufgenommen“), SD5 wie P09 (alt „Angebot angenommen“ / „Angebot abgelehnt“ / „3 Tage ohne Antwort“, danach opt Nacharbeit mit ref UC09 und alt „alle Teile beschaffbar“ / „Teile nicht beschaffbar“; die Reklamation kommt über `Werkstattbetrieb.sucheReklamation()`), SD6 Auftragsbestätigung im ersten Zweig, `Reparaturauftrag.getAktuellenKva()` im Klassendiagramm und in SD2/SD3. SD1 behält die Create-Botschaften `erstellen(...)` und `auswerten(...)`, weil sich eine an eine Operation gebundene Create-Botschaft in VP nicht lösen lässt. PNGs und VPP exportiert, Teamwork-Server committet.
- **Doku:** Am 27.10. an die Modelle angepasst: 5.1 (Absätze 04, 09, 10; 49 Nachrichtenflüsse), 5.5 ohne break, Tabelle 8 (SD1, SD5, SD6), Abb. 3, 5, 6 und 7 neu. Inhaltsverzeichnis (statisch) gegen die Seitenzahlen in Word geprüft und ab 4.2 korrigiert. Keine Kommentare, Platzhalter oder Arbeitsnotizen.
- **PPTX:** 24 Folien (PR #73): David 1–7, Kilian 8 und 17–18, Maximilian 9–12, Adrian 13–16, Jakob 19–20, Nina 21–23, Folie 24 Beiträge der Vortragenden. Notizen enthalten nur die Vortragenden. Am 26.10. Dokument geprüft: persönliche Angaben entfernt, Autor „Gruppe 1 WWI25B4“, Notizen behalten.
- **Team-Unterlagen:** `5_team/02-team-und-rollen.md` enthält nur noch die Zuständigkeiten ab 15.10. (E-23); im Entscheidungslog ist nichts mehr offen (E-31 bis E-33 abgeschlossen).
- **PDFs:** entstehen erst ganz am Ende.

---

## B. Vor der Abgabe am 13.11.

- [ ] `0_abgabe/KI-Angabe-Moodle.md`: noch Entwurf, jede Person ergänzt ihre Werkzeuge (Titelbild ist eingetragen).
- [ ] Doku: vor dem PDF-Export in Word Datei → Auf Probleme überprüfen → Dokument prüfen (in den Eigenschaften steht unter „Zuletzt geändert von“ ein Name), danach die Checkliste unten.
- [ ] PPTX: Wird sie noch einmal in PowerPoint gespeichert, vor dem PDF-Export erneut Dokument prüfen (Notizen behalten).
- [ ] Abgabepaket nach `0_abgabe/README.md`: Doku-PDF, BPMN-ZIP (umbenannte `.bpmn`), VPP, Präsentations-PDF mit Folie 24 (Zuordnung der Vortragenden), dann `Fallstudie-WWI25B4-Gruppe1.zip`. Jede Person lädt selbst hoch und gibt die KI-Angabe mit.

---

## E. Gruppenentscheidungen (entschieden, bleibt so)

Keine Backup-Folien; keine sichtbaren Foliennummern in der PPTX; KI-generiertes Titelbild bleibt und steht in der KI-Angabe; Folien 17 und 21 am Vortragsrechner geprüft, passt; Mockup zeigt Filiale und Terminvorschlag vor dem Bestätigen (Termin 28.10.2026); P09 „Gerät annehmen und Mangel dokumentieren“ bleibt; ref-Beschriftungen in den Sequenzdiagrammen bleiben; Klassendiagramm: außer den fünf Bestell-Operationen nach SD6 keine weiteren Streichungen, ungenutzte Operationen wie `erstellen`/`auswerten` bleiben; Sprechtext: Gedankenstriche, Kontrastsätze und Wiederholungen bleiben, Folien 9–12 ohne Zeitangaben; Folie 21 und Bild auf Folien 9/10 bleiben; BPMN-PNG-Labels (p05, p07, p08, p09) bleiben; Datenobjekt „Gerät“ mit Umlaut; Schrift Calibri/Segoe UI bleibt; Doku Abb. 6/7 im aktuellen Format; Multiplizität „1“ im Use-Case-Diagramm; VP-Lizenzkennung in den UML-PNGs; Mockup-Details (Persona, „Sonstiges“, Reihenfolge) bleiben; Datenobjekte mit Bindestrich („Reparatur-auftrag“); kein Hinweis in 3.2, dass das Entscheidungslog nicht abgegeben wird; kein Satz zu Boundary-Klassen in 5.4; Klassennamen in der Doku ohne Code-Schrift, keine Tabelle „Fristen und Grenzen“, kein eigener Quellenverweis; „KVA in 60 Sekunden“ im Sprechtext und Mockup Schritt 8 bleiben; Datumsangaben in der Doku, Format der Abbildungen 2–5, Klasse für den KI-Diagnosedienst, kein Sprechtext in den PPTX-Notizen; UC12 mit dem Bestandsplaner als Hauptakteur; verwaiste Clipboard-Bilder in der VPP; Rollen in Tabelle 1, Tabelle 3 und Kapitel 6/7 der Doku bleiben (26.10.).

Am 27.10. entschieden (Prüfung vom 27.10.): SD1 mit alt statt break; SD5 nach P09 umgebaut (ersetzt „drei Zweige im unteren alt“ vom 25.10.); Getter durch `sucheReklamation()` und `getAktuellenKva()` ersetzt; Retoure in P09 erst nach der Abholung, der Kunde wartet nicht darauf; P04-Kundenablauf wartet nach der Freigabe auf Reparaturbeginn oder Reparaturabsage.

---

## Vor dem PDF-Export der Doku (Checkliste)

- [ ] Abbildungen 1–7 sind die aktuellen Exporte.
- [ ] Kennzahlen entsprechen der letzten Zählung (5.1, 5.2, Tabelle 6).
- [ ] Inhaltsverzeichnis in Word gegen das PDF geprüft (nur nötig, wenn sich der Text noch ändert).
- [ ] Suche nach „E-[0-9]“, „Claude“, „KI-Werkzeug“, „Maxi“, „Prüfbericht“, „Session“, „OFFEN“ ergibt nichts.
