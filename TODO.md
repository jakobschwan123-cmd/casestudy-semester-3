# To-do bis zur Abgabe

Stand: 12.10.2026. Nächster Gruppentermin: **15.10.2026**. Generalprobe: **22.10.2026**. Präsentation: **27.10.2026, 09:00 Uhr, Raum B458**. Abgabe: **13.11.2026, 23:59 Uhr** über Moodle.

Abhaken, wenn erledigt (`- [x]`), und die Änderung wie immer über Branch und Pull Request einreichen. Wer an Word- oder PowerPoint-Dateien arbeitet, sagt vorher in der WhatsApp-Gruppe Bescheid.

---

## Bis 15.10.2026

### Kilian: Visual Paradigm (Klassendiagramm, SD1, SD3, VPP-Datei)

Vorlagen liegen in `2_uml/entwurf-plantuml/`. Die genauen Klickschritte stehen in `2_uml/README.md`.

- [ ] Lehre-VPN starten, Visual Paradigm öffnen, im Teamwork Client **Update** auf das Projekt WWI25B4G1 machen.
- [ ] Klassendiagramm „cd : RepairFlow“ anlegen: alle 27 Klassen und 7 Aufzählungen aus dem Model Explorer auf die Fläche ziehen, nach `klassen.png` anordnen.
- [ ] SD1 als Unterdiagramm von UC01 „Sofortdiagnose anfordern“ anlegen (Use Case rechtsklicken → Sub Diagrams → New Diagram → Sequence Diagram), nach `sequenz-01-sofortdiagnose.png` zeichnen.
- [ ] SD3 als Unterdiagramm von UC09 „Ersatzteile disponieren und reservieren“ anlegen, nach `sequenz-03-reservierung.png`.
- [ ] Im Teamwork Client **Commit**.
- [ ] Nachdem auch Davids Diagramme committet sind: File → Save Project As → `2_uml/UML-WWI25B4-Gruppe1.vpp`, per Branch und Pull Request einchecken.

### David: Visual Paradigm (SD2, SD4, SD5, SD6)

Jedes Sequenzdiagramm als Unterdiagramm seines Use Case anlegen (Use Case rechtsklicken → Sub Diagrams → New Diagram → Sequence Diagram). Vorlagen in `2_uml/entwurf-plantuml/`.

- [ ] SD2 unter UC07 „KVA freigeben / ablehnen“ nach `sequenz-02-kva-freigabe.png`.
- [ ] SD4 unter UC14 „Auftrag fertigmelden“ nach `sequenz-04-fertigmeldung.png`. Achtung, neue Fassung (E-22): Teile-Disposition über UC09 im ref-Kasten, Schleife „0..2“ für Nacharbeit, danach fertigmelden oder Status ABGELEHNT.
- [ ] SD5 unter UC16 „Reklamation bearbeiten“ nach `sequenz-05-reklamation.png`.
- [ ] SD6 unter UC10 „Lieferantenbestellung auslösen“ nach `sequenz-06-nachbestellvorschlag.png`. Achtung, neue Fassung (E-22): Storno nach der zweiten erfolglosen Mahnung.
- [ ] Im Teamwork Client **Commit** und Kilian Bescheid geben.

### Maximilian: Camunda Modeler (alle zehn BPMN-Dateien plus zwei Korrekturen)

**Zwei Korrekturen, bevor gespeichert wird:**

- [ ] **`1_bpmn/p04-kostenvoranschlag.bpmn`, Beschreibungstext:** Auf eine freie Stelle der Arbeitsfläche außerhalb der Pools klicken. Rechts im Properties Panel unter **Documentation** steht ein Text. Darin
  `nach der dritten Erinnerung gilt er als abgelehnt.`
  ersetzen durch
  `nach dem dritten Fristablauf ohne Antwort gilt er als abgelehnt.`
  Grund: Das Modell sendet den KVA und höchstens zwei Erinnerungen. Abgelehnt wird nach dem dritten Fristablauf.
- [ ] **`1_bpmn/p02-auftragsannahme.bpmn`, Datenobjekt:** Das Datenobjekt **„Gerät“** an der Aktivität „Gerät registrieren“ anklicken und den Namen in **„Geraet“** ändern. Grund: Datenobjekte tragen den Klassennamen aus dem Klassendiagramm, und die Klasse heißt `Geraet`. Die Aktivitätsnamen mit „Gerät“ bleiben unverändert.

**Danach für jede der zehn Dateien `p01` bis `p10`:**

- [ ] Datei öffnen (File → Open File… → `1_bpmn/p0X-….bpmn`).
- [ ] Unten den Reiter **Problems** öffnen. Es dürfen keine Fehler stehen. Falls doch: Screenshot in die WhatsApp-Gruppe, nicht selbst umbauen.
- [ ] Speichern (Strg+S).
- [ ] File → **Export as image** → PNG, gleicher Dateiname wie die `.bpmn`-Datei, in `1_bpmn/` überschreiben.
- [ ] Alles per Branch und Pull Request einreichen.

### Adrian: Entscheidungen bestätigen lassen

Im Gruppentermin am 15.10. abstimmen und das Ergebnis in `5_team/03-entscheidungen.md` unter „Offen“ eintragen (bestätigt oder geändert):

- [ ] **E-19** (P07/P08): Verwertung des Geräts nach der vierten Abhol-Erinnerung? Inkasso nach der dritten erfolglosen Mahnung? Braucht `AuftragStatus` einen eigenen Wert für verwertete Geräte?
- [ ] **E-20** (P05/P06): Bestellung nur bei Fehlteilen, Kunde wird vorher vom Service informiert, Warten auf Lieferung mit Timer und Mahnung.
- [ ] **E-22** (P06/P10/SD4/SD6): Storno nach der **zweiten** erfolglosen Liefermahnung (oder andere Zahl?), Empfang der Ersatzlieferung in P10.
- [ ] Wenn sich eine Frist ändert: Maximilian und David Bescheid geben (Modell und SD anpassen) und den gelben Hinweis in Abschnitt 5.6 der Doku durch einen Satz mit dem Ergebnis ersetzen.

### Alle: eigene Zeile in der Projektdokumentation prüfen

- [ ] In `3_doku/Projektdokumentation.docx`, Kapitel 1: die eigene Zeile in Tabelle 1 und in der Beitragsliste prüfen und ergänzen.

---

## Bis 22.10.2026 (Generalprobe)

### Projektdokumentation fertigstellen (Nina koordiniert, alle liefern zu)

Datei: `3_doku/Projektdokumentation.docx`. Alle offenen Stellen sind gelb markiert.

**Sechs Abbildungen einfügen** (gelbe gestrichelte Kästen, Anweisung steht jeweils im Kasten; Bild einfügen, Breite wie angegeben, Kasten löschen):

- [ ] Abb. 2 Prozess 01 und Abb. 3 Prozess 04: Export aus dem Camunda Modeler (**Maximilian**, nach seinen Korrekturen).
- [ ] Abb. 4 Use-Case-Diagramm, Abb. 5 Klassendiagramm, Abb. 6 SD1, Abb. 7 SD3: in Visual Paradigm File → Export → Active Diagram as Image → PNG (**Kilian**).

**Zehn gelbe Hinweise abarbeiten** (Text ergänzen oder Hinweis löschen):

- [ ] Kapitel 1: alle haben ihre Zeile geprüft (siehe oben) → Hinweis löschen.
- [ ] 3.1: VPP und die sechs Sequenzdiagramme als Unterdiagramme sind fertig → Hinweis löschen (**Kilian**).
- [ ] 3.2: Ergebnis der Modeler-Prüfung eintragen, zum Beispiel „Alle zehn Dateien zeigen im Problems-Panel keine Fehler.“ (**Maximilian**).
- [ ] Tabelle 2, Schritt 4: dasselbe kurz in der Zelle (**Maximilian**).
- [ ] Tabelle 3, Sprint 3: Ergebnis vom 15.10. eintragen (**Kilian** als Scrum Master).
- [ ] Tabelle 3, Sprint 4: Ergebnis vom 22.10. eintragen (**Kilian**).
- [ ] 5.6: Ergebnis der Bestätigung E-19/E-20/E-22 in einem Satz (**Adrian**).
- [ ] Kapitel 6: weitere Herausforderungen ergänzen oder Hinweis löschen (**alle**, Nina sammelt).
- [ ] 7.1: Hinweise aus den Coachings am 15.10. und 22.10. mit Umsetzung, sonst Hinweis löschen (**Nina**).
- [ ] 7.2: Den Entwurf gemeinsam lesen und so umschreiben, dass er eure Meinung wiedergibt (**alle**).

**Zum Schluss:**

- [ ] Titelseite: „Bearbeitungsstand“ auf das aktuelle Datum setzen.
- [ ] Mit Strg+F nach „[“ suchen: Es darf kein gelber Hinweis mehr übrig sein.
- [ ] Als PDF speichern (`3_doku/Projektdokumentation.pdf`) und im PDF die Seitenzahlen im Inhaltsverzeichnis prüfen. Das Verzeichnis ist statisch, verschobene Seiten von Hand anpassen.

### Präsentation

Datei: `4_praesentation/Abschlusspraesentation.pptx`.

- [ ] Folien 12–14 (**Kilian**) und 15 (**Jakob**): Die Diagrammbilder durch die Exporte aus Visual Paradigm ersetzen, damit sie zur VPP-Datei passen.
- [ ] Folien 9 und 10 (**Maximilian**): Die Ausschnitte aus P01 und P04 durch Ausschnitte aus dem neuen Modeler-Export ersetzen.
- [ ] Generalprobe am 22.10.: komplett durchsprechen, Zeit messen (Ziel 15–20 Minuten), Fragen üben (**alle**).
- [ ] Danach als PDF exportieren (`4_praesentation/Abschlusspraesentation.pdf`). Folie 20 mit der Zuordnung der Vortragenden muss drin sein.

### Qualitätssicherung (Jakob)

- [ ] Jeden Pull Request gegen `5_team/qa-checkliste.md` prüfen.
- [ ] Nach allen Änderungen einmal die Kennzahlen in Doku 5.1, `1_bpmn/README.md` und Folie 7 vergleichen (131 Aktivitäten, 79 automatisiert, 41 Nachrichtenflüsse).

---

## 27.10.2026: Präsentation

- [ ] 09:00 Uhr, Raum B458, alle tragen ihren Teil vor (Zuordnung auf Folie 20).

---

## Bis 13.11.2026: Abgabe (jede Person einzeln)

Anleitung: `0_abgabe/README.md`.

- [ ] Die vier Dateien zusammenstellen und ins Archiv `Fallstudie-WWI25B4-Gruppe1.zip` packen.
- [ ] KI-Angabe aus `0_abgabe/KI-Angabe-Moodle.md` vervollständigen (jede Person ergänzt die Werkzeuge, die sie genutzt hat) und beim Upload angeben.
- [ ] Jede Person lädt das Archiv selbst in Moodle hoch.
