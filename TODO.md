# To-do bis zur Abgabe

Stand: 15.10.2026, Verteilung nach E-23 (offene Aufgaben nach Aufwand verteilt, je Person etwa 4 Stunden, Übersicht in `5_team/02-team-und-rollen.md`). Generalprobe: **22.10.2026**. Präsentation: **27.10.2026, 09:00 Uhr, Raum B458**. Abgabe: **13.11.2026, 23:59 Uhr** über Moodle.

Abhaken, wenn erledigt (`- [x]`), und die Änderung wie immer über Branch und Pull Request einreichen. Wer an Word- oder PowerPoint-Dateien arbeitet, sagt vorher in der WhatsApp-Gruppe Bescheid. Wer merklich mehr oder weniger Zeit braucht als geschätzt, sagt es am 22.10., dann wird nachjustiert.

**Regeln für Visual Paradigm (alle):** Lehre-VPN starten, im Teamwork Client vor jeder Sitzung **Update**, nach jedem fertigen Diagramm sofort **Commit**. Jeder bearbeitet nur seine eigenen Diagramme. Sequenzdiagramme immer als Unterdiagramm des Use Case anlegen (im Use-Case-Diagramm den Use Case rechtsklicken → Sub Diagrams → New Diagram → Sequence Diagram). Vorlagen in `2_uml/entwurf-plantuml/`, Lebenslinien als „: Klassenname“ mit der Klasse aus dem Modell verknüpfen, Botschaften nur aus den Operationen des Klassendiagramms wählen. Jedes fertige Diagramm als PNG exportieren (File → Export → Active Diagram as Image) und mit dem Namen der Vorlage nach `2_uml/` legen. Geprüft wird im Zweierteam (in Klammern).

---

## Bis 22.10.2026 (Generalprobe)

### Kilian (≈ 4 h): Klassendiagramm, Konsistenz, VPP

- [ ] Klassendiagramm „cd : RepairFlow“ fertigstellen: alle 27 Klassen und 7 Aufzählungen aus dem Paket Klassenmodell auf die Fläche, nach Zonen anordnen, Stereotypen «mandant» und «stammdaten» setzen, Abstraktheit, Kompositionen und Multiplizitäten prüfen (Prüfung: Jakob).
- [ ] Nachdem alle Sequenzdiagramme committet sind: jedes SD gegen das Klassendiagramm prüfen (Botschaft = Operation, Lebenslinien mit Klasse verknüpft, als Unterdiagramm des richtigen Use Case).
- [ ] File → Save Project As → `2_uml/UML-WWI25B4-Gruppe1.vpp`, per Branch und Pull Request einchecken.
- [ ] PNG des Klassendiagramms nach `2_uml/klassendiagramm.png`; Bild auf Folie 13 ersetzen.
- [ ] Doku Tabelle 3: Ergebnis Sprint 3 (15.10.) und Sprint 4 (22.10.) eintragen.

### David (≈ 4 h): Use-Case-Diagramm, SD2, SD4

- [ ] Use-Case-Diagramm überarbeiten: weniger Kreuzungen, gerade Linien (Connector → Oblique), Akteure neben ihren Use Cases, Systemgrenze nur „RepairFlow“. Use Cases nur verschieben, nicht löschen, sonst hängen die Sequenzdiagramme nicht mehr daran (Prüfung: Maximilian).
- [ ] PNG nach `2_uml/usecase-diagramm.png`; Bild auf Folie 12 ersetzen.
- [ ] SD2 unter UC07 „KVA freigeben / ablehnen“ nach `sequenz-02-kva-freigabe.png` (Prüfung: Maximilian).
- [ ] SD4 unter UC14 „Auftrag fertigmelden“ nach `sequenz-04-fertigmeldung.png`. Achtung, neue Fassung (E-22): Teile-Disposition über UC09 im ref-Kasten, Schleife „0..2“ für Nacharbeit, danach fertigmelden oder Status ABGELEHNT (Prüfung: Maximilian).

### Maximilian (≈ 4–4,5 h): BPMN-Abschluss und SD1

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

**Außerdem:**

- [ ] Doku 3.2 und Tabelle 2, Schritt 4: Ergebnis der Modeler-Prüfung eintragen, zum Beispiel „Alle zehn Dateien zeigen im Problems-Panel keine Fehler.“
- [ ] Folien 9 und 10: Ausschnitte aus P01 und P04 durch Ausschnitte aus dem neuen Modeler-Export ersetzen.
- [ ] SD1 unter UC01 „Sofortdiagnose anfordern“ nach `sequenz-01-sofortdiagnose.png` (Prüfung: David). PNG nach `2_uml/`, Bild auf Folie 14 ersetzen.

### Jakob (≈ 4 h): Qualitätssicherung und SD3

- [ ] Jeden Pull Request gegen `5_team/qa-checkliste.md` prüfen.
- [ ] Nach allen Änderungen die Kennzahlen in Doku 5.1, `1_bpmn/README.md` und Folie 7 vergleichen (131 Aktivitäten, 79 automatisiert, 41 Nachrichtenflüsse).
- [ ] SD3 unter UC09 „Ersatzteile disponieren und reservieren“ nach `sequenz-03-reservierung.png` (Prüfung: Kilian). PNG nach `2_uml/`, Bild auf Folie 15 ersetzen.

### Adrian (≈ 4 h): Entscheidungen, Kapitel 6, SD5, SD6

- [ ] Am 15.10. abstimmen und das Ergebnis in `5_team/03-entscheidungen.md` unter „Offen“ eintragen (bestätigt oder geändert):
  - **E-19** (P07/P08): Verwertung des Geräts nach der vierten Abhol-Erinnerung? Inkasso nach der dritten erfolglosen Mahnung? Braucht `AuftragStatus` einen eigenen Wert für verwertete Geräte?
  - **E-20** (P05/P06): Bestellung nur bei Fehlteilen, Kunde wird vorher vom Service informiert, Warten auf Lieferung mit Timer und Mahnung.
  - **E-22** (P06/P10/SD4/SD6): Storno nach der **zweiten** erfolglosen Liefermahnung (oder andere Zahl?), Empfang der Ersatzlieferung in P10.
  - **E-23**: diese Aufgabenverteilung.
- [ ] Wenn sich eine Frist ändert: Maximilian (BPMN) und David (SD4) informieren, SD6 selbst anpassen.
- [ ] Doku 5.6: gelben Hinweis durch einen Satz mit dem Ergebnis von E-19/E-20/E-22 ersetzen.
- [ ] Doku Kapitel 6: weitere Herausforderungen bei allen einsammeln und ausformulieren, dann den Hinweis löschen.
- [ ] SD5 unter UC16 „Reklamation bearbeiten“ nach `sequenz-05-reklamation.png` (Prüfung: Nina).
- [ ] SD6 unter UC10 „Lieferantenbestellung auslösen“ nach `sequenz-06-nachbestellvorschlag.png`. Achtung, neue Fassung (E-22): Storno nach der zweiten erfolglosen Mahnung (Prüfung: Nina).

### Nina (≈ 4 h): Projektdokumentation fertigstellen

Datei: `3_doku/Projektdokumentation.docx`. Alle offenen Stellen sind gelb markiert.

- [ ] **Sechs Abbildungen einfügen** (gelbe gestrichelte Kästen; Bild einfügen, Breite wie im Kasten, Kasten löschen). Die PNGs liegen im Repository, sobald die anderen fertig sind:
  - Abb. 2 Prozess 01 und Abb. 3 Prozess 04: `1_bpmn/p01-sofortdiagnose.png`, `1_bpmn/p04-kostenvoranschlag.png` (von Maximilian)
  - Abb. 4 Use-Case-Diagramm: `2_uml/usecase-diagramm.png` (von David)
  - Abb. 5 Klassendiagramm: `2_uml/klassendiagramm.png` (von Kilian)
  - Abb. 6 SD1 und Abb. 7 SD3: `2_uml/sequenz-01-sofortdiagnose.png` (von Maximilian), `2_uml/sequenz-03-reservierung.png` (von Jakob)
- [ ] Hinweis 3.1 löschen, sobald Kilian die VPP eingecheckt hat.
- [ ] 7.1: Hinweise aus den Coachings am 15.10. und 22.10. mit Umsetzung, sonst Hinweis löschen.
- [ ] Prüfen, dass die anderen ihre gelben Stellen erledigt haben (3.2, Tabelle 2 und 3, 5.6, Kapitel 6).
- [ ] Titelseite: „Bearbeitungsstand“ auf das aktuelle Datum setzen.
- [ ] Mit Strg+F nach „[“ suchen: Es darf kein gelber Hinweis mehr übrig sein.
- [ ] Als PDF speichern (`3_doku/Projektdokumentation.pdf`) und im PDF die Seitenzahlen im Inhaltsverzeichnis prüfen. Das Verzeichnis ist statisch, verschobene Seiten von Hand anpassen.
- [ ] Nach der Generalprobe die Präsentation als PDF exportieren (`4_praesentation/Abschlusspraesentation.pdf`). Folie 20 mit der Zuordnung der Vortragenden muss drin sein.

### Alle

- [ ] In der Doku, Kapitel 1: eigene Zeile in Tabelle 1 und in der Beitragsliste prüfen. Stehen bleibt nur, was du tatsächlich gemacht hast.
- [ ] 7.2: den Entwurf gemeinsam lesen und so umschreiben, dass er eure Meinung wiedergibt.
- [ ] Eigene Folien vorbereiten (Zuordnung auf Folie 2 und 20).
- [ ] Generalprobe am 22.10.: komplett durchsprechen, Zeit messen (Ziel 15–20 Minuten), Fragen üben.

---

## 27.10.2026: Präsentation

09:00 Uhr, Raum B458, alle tragen ihren Teil vor:

| Folien | Vortragende(r) |
|---|---|
| 1–2, 18–19 | Nina |
| 3, 12 | David |
| 4–6, 11 | Adrian |
| 7–10, 14 | Maximilian |
| 13, 16 | Kilian |
| 15, 17 | Jakob |

---

## Bis 13.11.2026: Abgabe (jede Person einzeln)

Anleitung: `0_abgabe/README.md`.

- [ ] Die vier Dateien zusammenstellen und ins Archiv `Fallstudie-WWI25B4-Gruppe1.zip` packen (Nina stellt die fertigen Dateien bereit).
- [ ] KI-Angabe aus `0_abgabe/KI-Angabe-Moodle.md` vervollständigen (jede Person ergänzt die Werkzeuge, die sie genutzt hat) und beim Upload angeben.
- [ ] Jede Person lädt das Archiv selbst in Moodle hoch.
