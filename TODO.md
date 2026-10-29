# Aufgaben bis zur Abgabe

Stand: 29.10.2026, nach der Abschlusspräsentation, der Umsetzung der Prüfung vom 27.10. (PR #91 bis #95) und der Nachprüfungen vom 28.10. (P04, SD5, SD6) und 29.10. (Doku wiederhergestellt, P05/SD3). Die Liste enthält nur offene Aufgaben; Erledigtes wird gestrichen, nicht abgehakt.

Termin: Abgabe **13.11.2026, 23:59 Uhr** über Moodle. Die Präsentation am 27.10.2026 ist gehalten.

Grundregeln: Jede Änderung über Branch und Pull Request, vorher `git pull`. Wer an Word- oder PowerPoint-Dateien arbeitet, sagt vorher in der WhatsApp-Gruppe Bescheid, weil diese Dateien nicht zusammengeführt werden können. Der Sprechtext steht nur in `4_praesentation/Sprechtext_Abschlusspraesentation.docx`, nicht in den Notizen der PPTX.

## Stand der Artefakte

- **BPMN:** Alle zehn Dateien am 25.10. im Camunda Modeler geprüft und gespeichert; bpmnlint 0 Befunde. Am 27.10. geändert: P04 (Kunde wartet nach der Freigabe auf „Reparaturbeginn erhalten“ oder „Reparaturabsage erhalten“, zweiter Nachrichtenfluss „Reparaturabsage“), Aufrufe von Prozess 05 übergeben `ersteDisposition` (P04 `true`, P07 und P09 `false`), P09 (Gateway „Kunde antwortet?“ im Kundenablauf; „Lieferantenteil defekt?“ und „10 Retoure abwickeln“ erst nach „08 Abholung abwickeln“, der Kunde wartet nicht auf die Retoure), Beschreibungen P09 und P10. PNGs von P04 und P09 im Modeler neu exportiert. Am 28.10. in P04 der Ereignis-Teilprozess „Reparaturabsage verarbeiten“ im Kundenablauf durch ein unterbrechendes Nachrichten-Randereignis „Reparaturabsage erhalten“ an „KVA in der App prüfen“ ersetzt (Ende „KVA verfallen“), damit die Reparaturabsage nach der Freigabe nur noch einen Empfänger hat. Am 29.10. in P05 „Erste Disposition und alle Teile beschaffbar?“ mit „Reparaturbeginn ermitteln/informieren“ hinter „06 Ersatzteile bestellen“ verschoben, damit der Kunde in P04 nicht vor einer späten Reparaturabsage endet; Kennzahlen unverändert. P05-PNG am 29.10. neu exportiert. Ebenfalls am 29.10.: P04-Kundenablauf wieder mit einem Ende (Randereignis läuft ins Join vor „KVA entschieden“, wie Doku 3.1), P09 übergibt `abrechnung` an 08 (Gewährleistung kostenfrei, angenommenes Angebot Reparatur, sonst Pauschale). P04-PNG neu exportiert und als Abb. 3 eingesetzt. Am 29.10. in 5.2 ergänzt, dass die 62 % ein ungewichteter Anteil ohne Häufigkeit, Dauer oder gemessene Zeitersparnis sind. Ebenfalls am 29.10.: Tabelle 8 Zeile SD1 gestrafft; P03 „KVA angestoßen“ verweist auf die Nachricht „KVA angestoßen“, P09-Kundengateway „Kunde antwortet?“ mit Bedingungen (beides ohne Änderung am Bild). Zählung (Aktivitäten = Tasks, Call Activities und Teilprozess im Werkstatt-Pool; automatisiert = Service, Script, Business Rule, Send, Receive; `zeebe:userTask` nicht doppelt zählen): **143 Aktivitäten (Ø 14,3), 89 automatisiert = 62 %, 34 User Tasks, 9 Manual Tasks, 10 Call Activities und 1 Teilprozess, 28 Kundenaktivitäten (inkl. Ereignis-Teilprozess in P01), 49 Nachrichtenflüsse, 58 Datenobjekte, 14 Datenspeicher.** Je Diagramm (Aktivitäten/automatisiert): 01 14/14, 02 16/7, 03 13/6, 04 12/8, 05 16/12, 06 17/11, 07 13/6, 08 17/11, 09 16/8, 10 9/6. Doku (5.1, 5.2, Tabelle 6) und `1_bpmn/README.md` sind auf diesem Stand; die Folien nennen keine Zahl der Nachrichtenflüsse.
- **UML:** Use-Case-, Klassen- und sechs Sequenzdiagramme fertig. Am 27.10. nach der Vorlesung (Fragmente nur alt, opt, loop, ref) und den Prozessen angepasst: SD1 ohne break (opt „Medien nicht auswertbar“ mit innerem alt „neue Aufnahme innerhalb von 7 Tagen“ / „7 Tage ohne neue Aufnahme“ → `verwerfen()`, danach opt „Medien auswertbar oder neu aufgenommen“), SD5 wie P09 (alt „Angebot angenommen“ / „Angebot abgelehnt“ / „3 Tage ohne Antwort“, danach opt Nacharbeit mit ref UC09 und alt „alle Teile beschaffbar“ / „Teile nicht beschaffbar“; die Reklamation kommt über `Werkstattbetrieb.sucheReklamation()`; seit 28.10. ohne diesen Abruf im Zweig „Angebot angenommen“, weil die Werkstattoberfläche die Reklamation danach selbst öffnet), SD6 Auftragsbestätigung im ersten Zweig (seit 28.10. Bedingung „innerhalb von 3 Tagen bestätigt und lieferbar“ wie P06), `Reparaturauftrag.getAktuellenKva()` im Klassendiagramm und in SD2/SD3. Am 29.10. SD3 wie P05: opt „erste Teiledisposition und alle Teile beschaffbar“ steht nach ref UC10. SD1 behält die Create-Botschaften `erstellen(...)` und `auswerten(...)`, weil sich eine an eine Operation gebundene Create-Botschaft in VP nicht lösen lässt. PNGs und VPP exportiert, Teamwork-Server committet.
- **Doku:** Am 27.10. an die Modelle angepasst: 5.1 (Absätze 04, 09, 10; 49 Nachrichtenflüsse), 5.5 ohne break, Tabelle 8 (SD1, SD5, SD6), Abb. 3, 5, 6 und 7 neu. Am 28.10.: 5.1 „28 Aktivitäten in den Abläufen des Kunden“, Tabelle 8 SD6 mit „bei nicht lieferbaren Teilen“. P04-PNG im Modeler neu exportiert und als Abb. 3 eingesetzt. Am 29.10. Doku auf den Stand von `17956fc` zurückgesetzt (Commit `bbe0967` hatte eine alte Fassung eingecheckt), Abb. 3 und 7 neu, Tabelle 8 SD3 angepasst; alle sieben Abbildungen gegen die Quellen geprüft. Inhaltsverzeichnis (statisch) gegen die Seitenzahlen in Word geprüft und ab 4.2 korrigiert. Keine Kommentare, Platzhalter oder Arbeitsnotizen.
- **PPTX:** 24 Folien (PR #73): David 1–7, Kilian 8 und 17–18, Maximilian 9–12, Adrian 13–16, Jakob 19–20, Nina 21–23, Folie 24 Beiträge der Vortragenden. Notizen enthalten nur die Vortragenden. Am 26.10. Dokument geprüft: persönliche Angaben entfernt, Autor „Gruppe 1 WWI25B4“, Notizen behalten.
- **Team-Unterlagen:** `5_team/02-team-und-rollen.md` enthält nur noch die Zuständigkeiten ab 15.10. (E-23); im Entscheidungslog ist nichts mehr offen (E-31 bis E-33 abgeschlossen).
- **PDFs:** entstehen erst ganz am Ende.

---

## B. Vor der Abgabe am 13.11.

- [ ] Inhaltsverzeichnis der Doku in Word gegen die Seitenzahlen prüfen (Abb. 7 ist am 29.10. knapp 1 cm höher geworden).
- [ ] `0_abgabe/KI-Angabe-Moodle.md`: noch Entwurf, jede Person ergänzt ihre Werkzeuge (Titelbild ist eingetragen).
- [ ] Doku: vor dem PDF-Export in Word Datei → Auf Probleme überprüfen → Dokument prüfen (in den Eigenschaften steht unter „Zuletzt geändert von“ ein Name), danach die Checkliste unten.
- [ ] PPTX: Wird sie noch einmal in PowerPoint gespeichert, vor dem PDF-Export erneut Dokument prüfen (Notizen behalten).
- [ ] Abgabepaket nach `0_abgabe/README.md`: Doku-PDF, BPMN-ZIP (umbenannte `.bpmn`), VPP, Präsentations-PDF mit Folie 24 (Zuordnung der Vortragenden), dann `Fallstudie-WWI25B4-Gruppe1.zip`. Jede Person lädt selbst hoch und gibt die KI-Angabe mit.

---

## E. Gruppenentscheidungen (entschieden, bleibt so)

Keine Backup-Folien; keine sichtbaren Foliennummern in der PPTX; KI-generiertes Titelbild bleibt und steht in der KI-Angabe; Folien 17 und 21 am Vortragsrechner geprüft, passt; Mockup zeigt Filiale und Terminvorschlag vor dem Bestätigen (Termin 28.10.2026); P09 „Gerät annehmen und Mangel dokumentieren“ bleibt; ref-Beschriftungen in den Sequenzdiagrammen bleiben; Klassendiagramm: außer den fünf Bestell-Operationen nach SD6 keine weiteren Streichungen, ungenutzte Operationen wie `erstellen`/`auswerten` bleiben; Sprechtext: Gedankenstriche, Kontrastsätze und Wiederholungen bleiben, Folien 9–12 ohne Zeitangaben; Folie 21 und Bild auf Folien 9/10 bleiben; BPMN-PNG-Labels (p05, p07, p08, p09) bleiben; Datenobjekt „Gerät“ mit Umlaut; Schrift Calibri/Segoe UI bleibt; Doku Abb. 6/7 im aktuellen Format; Multiplizität „1“ im Use-Case-Diagramm; VP-Lizenzkennung in den UML-PNGs; Mockup-Details (Persona, „Sonstiges“, Reihenfolge) bleiben; Datenobjekte mit Bindestrich („Reparatur-auftrag“); kein Hinweis in 3.2, dass das Entscheidungslog nicht abgegeben wird; kein Satz zu Boundary-Klassen in 5.4; Klassennamen in der Doku ohne Code-Schrift, keine Tabelle „Fristen und Grenzen“, kein eigener Quellenverweis; „KVA in 60 Sekunden“ im Sprechtext und Mockup Schritt 8 bleiben; Datumsangaben in der Doku, Format der Abbildungen 2–5, Klasse für den KI-Diagnosedienst, kein Sprechtext in den PPTX-Notizen; UC12 mit dem Bestandsplaner als Hauptakteur; verwaiste Clipboard-Bilder in der VPP; Rollen in Tabelle 1, Tabelle 3 und Kapitel 6/7 der Doku bleiben (26.10.).

Am 27.10. entschieden (Prüfung vom 27.10.): SD1 mit alt statt break; SD5 nach P09 umgebaut (ersetzt „drei Zweige im unteren alt“ vom 25.10.); Getter durch `sucheReklamation()` und `getAktuellenKva()` ersetzt; Retoure in P09 erst nach der Abholung, der Kunde wartet nicht darauf; P04-Kundenablauf wartet nach der Freigabe auf Reparaturbeginn oder Reparaturabsage.

Am 28.10. entschieden (Nachprüfung): SD5 ohne Abruf 16/17 im Zweig „Angebot angenommen“ (keine neue Operation); SD6-Bedingung „innerhalb von 3 Tagen bestätigt und lieferbar“; P04 Randereignis statt Ereignis-Teilprozess.

Am 29.10. entschieden (Nachprüfung David): P05 informiert über den Reparaturbeginn erst nach der Bestellung und nur, wenn alle Teile beschaffbar sind (SD3 entsprechend); SD1 bleibt ohne erneute Medienprüfung; Team-Datei und BPMN-Konventionen korrigiert.

---

## Vor dem PDF-Export der Doku (Checkliste)

- [ ] Abbildungen 1–7 sind die aktuellen Exporte.
- [ ] Kennzahlen entsprechen der letzten Zählung (5.1, 5.2, Tabelle 6).
- [ ] Inhaltsverzeichnis in Word gegen das PDF geprüft (nur nötig, wenn sich der Text noch ändert).
- [ ] Suche nach „E-[0-9]“, „Claude“, „KI-Werkzeug“, „Maxi“, „Prüfbericht“, „Session“, „OFFEN“ ergibt nichts.
