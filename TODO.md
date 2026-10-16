# Aufgaben bis zur Abgabe

Stand: 15.10.2026. Diese Liste sammelt alle offenen Aufgaben mit Erklärung, ohne Namen. Die Zuteilung erfolgt im Gruppentermin nach den Zuständigkeiten in `5_team/02-team-und-rollen.md` (E-23). Wer eine Aufgabe übernimmt, schreibt den Namen in Klammern hinter den Punkt und hakt ihn nach Erledigung ab (`- [x]`).

Termine: Generalprobe **22.10.2026**. Präsentation **27.10.2026, 09:00 Uhr, Raum B458**. Abgabe **13.11.2026, 23:59 Uhr** über Moodle.

Grundregeln: Jede Änderung über Branch und Pull Request, Commit-Stempel `[T05 2026-10-15] …`. Wer an Word- oder PowerPoint-Dateien arbeitet, sagt vorher in der WhatsApp-Gruppe Bescheid, weil diese Dateien nicht zusammengeführt werden können.

---

## A. Visual Paradigm (nur mit VP-Zugang)

Lehre-VPN starten, im Teamwork Client vor jeder Sitzung **Update**, nach jedem fertigen Diagramm sofort **Commit**. Jeder bearbeitet nur seine eigenen Diagramme. Anleitung mit Klickschritten in `2_uml/README.md`, Vorlagen (PlantUML-Quelle und PNG) in `2_uml/entwurf-plantuml/`.

- [ ] **Use-Case-Diagramm nach E-24 neu aufbauen.** Das importierte Modell hat noch die alten acht Akteure. Erst Commit, dann im Model Explorer nur das Paket „Anwendungsfallmodell“ löschen, `2_uml/modell-usecase.xmi` importieren (nicht die ganze `modell.xmi`, sonst Klassen doppelt), neues Diagramm „ud : RepairFlow“ anlegen und nach `usecase.png` anordnen: Rollen links, Use Cases in den vier Bereichen, KI-Diagnosedienst rechts neben UC01. Den Kunden dreimal aus dem Model Explorer ziehen (weitere Ansichten desselben Elements). UC08 bekommt keinen Akteur, der Lieferant ist kein Akteur (Black Box, E-24). Muss fertig sein, bevor Sequenzdiagramme angelegt werden, weil die als Unterdiagramme an den Use Cases hängen.
- [ ] **Klassendiagramm „cd : RepairFlow“ fertigstellen.** Alle 27 Klassen und 7 Aufzählungen aus dem Paket „Klassenmodell“ auf die Fläche (Paket „Datentypen“ nicht), nach Zonen anordnen (Organisation links, Filiale oben Mitte, Sofortdiagnose links unten, Auftrag Mitte, Disposition rechts, Aufzählungen unten), Stereotypen «mandant» (Werkstattbetrieb) und «stammdaten» (Filiale, Lieferant, Ersatzteil) setzen, prüfen: Person und Mitarbeiter abstrakt (kursiv), 8 Kompositionen mit gefüllter Raute, Multiplizitäten an allen 36 Assoziationen. Keine Klasse umbenennen, keine Operation löschen.
- [ ] **Änderungen E-29 im Klassendiagramm nachtragen** (von Hand in VP, kein Neuimport): Bild `2_uml/entwurf-plantuml/klassen-aenderungen-2026-10-16.png`, rot = neu. Techniker: `erstelleKva(a : Reparaturauftrag) : Kostenvoranschlag`, `fuehreEndkontrolleDurch(a : Reparaturauftrag) : boolean`. Disponent: `pruefeMeldebestand(l : Lagerbestand) : Lieferantenbestellung`, `wickleRetoureAb(b : Lieferantenbestellung, grund : String) : void`. Lieferantenbestellung: Attribute `anzahlMahnungen : int`, `anzahlErsatzlieferungen : int`, Operation `mahne() : void`. Rechnung: Attribut `mahnungen : int`, Operationen `addLagergebuehr(betrag : double) : void`, `mahne() : void`. KIDiagnosevorschlag: Attribut `vermuteterGeraetetyp : GeraeteTyp`. Multiplizität Voranmeldung–Filiale auf Filialseite `0..1`, Lieferant–Lieferantenbestellung auf Lieferantenseite `0..1`. Attribute/Operationen in VP: Klasse rechtsklicken → Add → Attribute/Operation, Typ im Dropdown wählen.
- [ ] **Sechs Sequenzdiagramme als Unterdiagramme anlegen** (Use Case rechtsklicken → Sub Diagrams → New Diagram → Sequence Diagram): SD1 unter UC01, SD2 unter UC07, SD3 unter UC09, SD4 unter UC14, SD5 unter UC16, SD6 unter UC10. Vorlagen `sequenz-01…06.png`. Lebenslinien: erste Lebenslinie ist die Rolle des Use Case (z. B. Teiledisponent, Endkontrolleur), Objekte als „: Klassenname“ mit der Klasse aus dem Modell verknüpfen, Botschaften nur aus den Operationen des Klassendiagramms wählen. Fragmente alt/opt/loop/par/break/ref wie in den Vorlagen. SD4 und SD6 in der Fassung nach E-22 (Nacharbeitsschleife 0..2, Storno nach der zweiten Mahnung).
- [ ] **Konsistenzprüfung** nach Fertigstellung aller SD: Botschaft = Operation, Lebenslinien mit Klasse verknüpft, SD hängt am richtigen Use Case, Rollennamen wie im Use-Case-Diagramm.
- [ ] **Diagramme exportieren** (File → Export → Active Diagram as Image → PNG, hohe Auflösung): Use-Case-Diagramm → `2_uml/usecase-diagramm.png`, Klassendiagramm → `2_uml/klassendiagramm.png`, SD1 → `2_uml/sequenz-01-sofortdiagnose.png`, SD3 → `2_uml/sequenz-03-reservierung.png`. Diese vier Bilder braucht die Doku (Abb. 4–7).
- [ ] **VPP-Datei speichern:** File → Save Project As → `2_uml/UML-WWI25B4-Gruppe1.vpp`, per Branch und Pull Request einchecken. Erst, wenn alle Diagramme committet sind. Die Datei kommt so in die Abgabe.

## B. BPMN im Camunda Modeler

- [x] **Korrektur in `1_bpmn/p04-kostenvoranschlag.bpmn`:** (erledigt mit E-26) Auf eine freie Stelle außerhalb der Pools klicken, rechts im Properties Panel unter **Documentation** den Text `nach der dritten Erinnerung gilt er als abgelehnt.` ersetzen durch `nach dem dritten Fristablauf ohne Antwort gilt er als abgelehnt.` Grund: Das Modell sendet den KVA und höchstens zwei Erinnerungen, abgelehnt wird nach dem dritten Fristablauf.
- [x] **Korrektur in `1_bpmn/p02-auftragsannahme.bpmn`:** (erledigt mit E-26) Das Datenobjekt „Gerät“ an der Aktivität „Gerät registrieren“ in „Geraet“ umbenennen. Grund: Datenobjekte tragen den Klassennamen, die Klasse heißt `Geraet`. Aktivitätsnamen mit „Gerät“ bleiben.
- [ ] **Alle zehn Dateien `p01` bis `p10` prüfen und exportieren:** Datei öffnen, unten den Reiter **Problems** öffnen (es dürfen keine Fehler stehen; falls doch Screenshot in die WhatsApp-Gruppe, nicht selbst umbauen), Strg+S, File → Export as image → PNG mit gleichem Dateinamen in `1_bpmn/` überschreiben. P06 und P10 unbedingt im Modeler speichern (E-22). Dann per Branch und Pull Request einreichen.
- [ ] **Kennzahlen abgleichen** nach allen Änderungen: Doku 5.1, `1_bpmn/README.md` und Folie 9 müssen dieselben Zahlen zeigen (133 Aktivitäten, Ø 13,3, 81 automatisiert = 61 %, 42 Nachrichtenflüsse, 63 Datenobjekte und -speicher; Stand E-27). `1_bpmn/README.md` ist nachgezogen, Doku 5.1/5.2/Tabelle 6 und die Folien 8/9 nennen noch 131/79 (60 %), P05 mit 14 statt 15 und P06 mit 14 statt 15 Aktivitäten.
- [ ] **E-26 in der Doku nachziehen** (Folien zeigen seit E-25 keine Diagrammbilder): Abb. 2 (P01) und Abb. 3 (P04) neu einfügen, Beschreibung von P03 (neue Gateways „KI-Vorschlag vorhanden?“ und „Fehler gefunden?“) und P05 („Vorreservierungen übernehmen“) in Kapitel 5 prüfen.
- [ ] **SD3 neu rendern und in VP übernehmen:** `2_uml/entwurf-plantuml/sequenz-03-reservierung.puml` hat einen neuen opt-Block „Vorreservierung aus der Sofortdiagnose“ (E-26); PNG mit PlantUML neu erzeugen, in Visual Paradigm beim Anlegen von SD3 mit übernehmen.

## C. Entscheidungen (Gruppentermin 15.10.)

Ergebnis in `5_team/03-entscheidungen.md` unter „Offen“ eintragen (bestätigt oder geändert):

- [ ] **E-19** (P07/P08): Verwertung des Geräts nach der vierten Abhol-Erinnerung? Inkasso nach der dritten erfolglosen Mahnung? Braucht `AuftragStatus` einen eigenen Wert für verwertete Geräte?
- [ ] **E-20** (P05/P06): Bestellung nur bei Fehlteilen, Kunde wird vorher vom Service informiert, Warten auf Lieferung mit Timer und Mahnung.
- [ ] **E-22** (P06/P10/SD4/SD6): Storno nach der zweiten erfolglosen Liefermahnung (oder andere Zahl?), Empfang der Ersatzlieferung in P10.
- [ ] **E-23**: Zuständigkeiten für die Fertigstellung (`5_team/02-team-und-rollen.md`).
- [ ] **E-24**: Use-Case-Diagramm mit einer Rolle je Use Case; Rollennamen in Doku Tabelle 7 durchsehen (passen sie zur Werkstatt?).
- [ ] Wenn sich eine Frist ändert: BPMN-Modell und betroffenes SD (SD4, SD6) anpassen, Doku 5.6 und `1_bpmn/README.md` nachziehen.

## D. Projektdokumentation (`3_doku/Projektdokumentation.docx`)

Alle offenen Stellen sind gelb markiert. Kapitel 1 enthält die Zuständigkeiten nach E-23; vor der Abgabe prüft jede Person ihre Zeile und lässt nur stehen, was sie tatsächlich gemacht hat.

- [ ] **Sechs Abbildungen einfügen** (gelbe gestrichelte Kästen; Bild einfügen mit der angegebenen Breite, Kasten löschen): Abb. 2 Prozess 01 und Abb. 3 Prozess 04 aus `1_bpmn/p01-sofortdiagnose.png` und `p04-kostenvoranschlag.png` (Modeler-Export), Abb. 4 Use-Case-Diagramm, Abb. 5 Klassendiagramm, Abb. 6 SD1, Abb. 7 SD3 aus den VP-Exporten (Aufgabe A).
- [ ] **Lieferant als Black Box nachziehen (E-24):** 5.3 erster Absatz: „19 Use Cases und 17 Akteure: den Kunden, 15 Mitarbeiterrollen und den KI-Diagnosedienst als externes System“; „Kunde und Lieferant sind mehrfach dargestellt“ → „Der Kunde ist dreimal dargestellt“; am Absatzende ergänzen: „Der Lieferant ist kein Akteur: Er hat keinen Zugang zu RepairFlow und bleibt, wie im Prozessmodell, eine Black Box, mit der Bestellung, Lieferung und Retoure nur als Nachrichten ausgetauscht werden (Hinweis des Dozenten).“ In Tabelle 7 die Zeile „Lieferant (extern)“ löschen. In 7.1 den Dozentenhinweis um den Lieferanten ergänzen.
- [ ] **Sequenzdiagramme in der Doku nachziehen (E-28):** 5.5 erster Absatz: Fragmente sind jetzt alt, opt, loop, break und ref (kein par mehr); Tabelle 8 „Kernidee“ je SD gegen die neuen Bilder in `2_uml/entwurf-plantuml/` prüfen und kürzen.
- [ ] **Gelbe Hinweise abarbeiten:** Kapitel 1 (Zeilen geprüft → löschen), 3.1 (VPP und SD als Unterdiagramme fertig → löschen), 3.2 und Tabelle 2 Schritt 4 (Ergebnis der Modeler-Prüfung eintragen, z. B. „Alle zehn Dateien zeigen im Problems-Panel keine Fehler.“), Tabelle 3 Sprint 3 und 4 (Ergebnis vom 15.10. und 22.10.), 5.6 (Ergebnis zu E-19/E-20/E-22 in einem Satz), Kapitel 6 (weitere Herausforderungen ergänzen oder löschen), 7.1 (Hinweise aus dem Coaching am 22.10. mit Umsetzung, sonst löschen), 7.2 (Entwurf gemeinsam lesen und so umschreiben, dass er die Meinung der Gruppe wiedergibt).
- [ ] **Abschluss:** Titelseite „Bearbeitungsstand“ auf das aktuelle Datum, mit Strg+F nach „[“ suchen (kein gelber Hinweis darf übrig sein), als PDF speichern (`3_doku/Projektdokumentation.pdf`), im PDF die Seitenzahlen im Inhaltsverzeichnis prüfen (statisches Verzeichnis, verschobene Seiten von Hand anpassen).

## E. Präsentation (`4_praesentation/Abschlusspraesentation.pptx`)

Die Präsentation ist seit 15.10. ein Pitch mit Ergebniszusammenfassung ohne Diagrammbilder (E-25). Quelle ist `4_praesentation/tools/pres.js` mit `tools/sprechtext.py`; wer Text ändert, ändert ihn dort und erzeugt die Datei neu (`python3 sprechtext.py && node pres.js`), oder sagt in der WhatsApp-Gruppe Bescheid, dass direkt in PowerPoint geändert wurde.

- [ ] **Sprechtext eigener Folien überarbeiten.** Entwurf in `4_praesentation/Sprechtext_Abschlusspraesentation.docx` und in den Notizen. Jede Person formuliert ihren Teil so um, dass er zu ihr passt, und hält die Zeitangabe grob ein (gesamt etwa 18 Minuten). Zuordnung auf Folie 2 und Folie 18.
- [ ] **Lieferant als Black Box nachziehen (E-24):** Folie 8 „17 Rollen und Akteure“; Folie 11 dritte Karte „Lieferant: Black Box, kein Akteur“ statt „extern: Lieferant“ und rechter Punkt 3 „Kunde mehrfach dargestellt, Lieferant als Black Box ohne Akteur“; Sprechtext Folie 8 (17 Akteure) und Folie 11 (Lieferant ist bewusst kein Akteur, weil er keinen Zugang zu RepairFlow hat). Änderungen in `tools/pres.js` und `tools/sprechtext.py`, dann neu erzeugen.
- [ ] **Inhalte gegenlesen:** Zahlen auf Folie 8 und 9 (seit E-27: 133 Aktivitäten, 61 %, 19 Use Cases, 17 Akteure, 27 Klassen, 36 Assoziationen) nach den letzten Modelländerungen prüfen; Rollennamen auf Folie 11 gegen Doku Tabelle 7.
- [ ] **Generalprobe 22.10.:** komplett durchsprechen, Zeit messen (Ziel 15–20 Minuten), Übergaben üben, Fragen üben (Warum eine Rolle je Use Case? Warum Komposition beim Befund, nicht beim Gerät? Was ist automatisiert, was nicht? Wie wurde Konsistenz gesichert?).
- [ ] **PDF exportieren** nach der Generalprobe (`4_praesentation/Abschlusspraesentation.pdf`). Folie 18 mit der Zuordnung der Vortragenden muss enthalten sein (Pflicht laut Ablauf).

## F. Qualitätssicherung

- [ ] Jeden Pull Request gegen `5_team/qa-checkliste.md` prüfen, erst dann mergen.
- [ ] Nach Abschluss von A und B einmal die Konsistenz prüfen: Datenobjekte in BPMN = Klassennamen, Rollen im Use-Case-Diagramm = Tabelle 7 der Doku, SD-Botschaften = Operationen, Statuswerte = `AuftragStatus`.

## G. Abgabe (bis 13.11.2026, jede Person einzeln)

Anleitung: `0_abgabe/README.md`.

- [ ] Die vier Dateien zusammenstellen (Projekt-PDF, BPMN-ZIP mit umbenannten `.bpmn`-Dateien, VPP, Präsentations-PDF) und als `Fallstudie-WWI25B4-Gruppe1.zip` packen; das fertige Archiv in der WhatsApp-Gruppe bereitstellen.
- [ ] KI-Angabe aus `0_abgabe/KI-Angabe-Moodle.md` vervollständigen (jede Person ergänzt die Werkzeuge, die sie genutzt hat) und beim Upload angeben.
- [ ] Jede Person lädt das Archiv selbst in Moodle hoch.
