# Aufgaben bis zur Abgabe

Stand: 19.10.2026. Diese Liste sammelt alle offenen Aufgaben mit Erklärung, ohne Namen. Die Zuteilung erfolgt nach den Zuständigkeiten in `5_team/02-team-und-rollen.md` (E-23). Wer eine Aufgabe übernimmt, schreibt den Namen in Klammern hinter den Punkt und hakt ihn nach Erledigung ab (`- [x]`).

Termine: Generalprobe **22.10.2026**. Präsentation **27.10.2026, 09:00 Uhr, Raum B458**. Abgabe **13.11.2026, 23:59 Uhr** über Moodle.

Grundregeln: Jede Änderung über Branch und Pull Request, Commit-Stempel `[T05 2026-10-19] …`. Wer an Word- oder PowerPoint-Dateien arbeitet, sagt vorher in der WhatsApp-Gruppe Bescheid, weil diese Dateien nicht zusammengeführt werden können.

Alle Entscheidungen E-19 bis E-29 sind festgelegt (E-30, `5_team/03-entscheidungen.md`). Offene Entscheidungen gibt es keine.

---

## A. Visual Paradigm (nur mit VP-Zugang)

Lehre-VPN starten, im Teamwork Client vor jeder Sitzung **Update**, nach jeder Änderung **Commit**.

- [x] Use-Case-Diagramm nach E-24 (15 Rollen, Kunde einmal mit drei Verbindungen, Lieferant ohne Akteur, extend ohne sichtbare Bedingungen, einspaltig).
- [x] Klassendiagramm „cd : RepairFlow“ mit allen 27 Klassen und 7 Aufzählungen, Stereotypen, E-29-Ergänzungen, Layout ohne Überschneidungen.
- [x] Sechs Sequenzdiagramme als Unterdiagramme (SD1 UC01, SD2 UC07, SD3 UC09, SD4 UC14, SD5 UC16, SD6 UC10) nach E-28, refs verlinkt.
- [x] Konsistenzprüfung Botschaft = Operation (inklusive `mahne()` in SD6 nach E-29).
- [x] Letzter Stand im Teamwork-Server (Revision 91): Klassendiagramm neu angeordnet, Rückgabetypen korrigiert (`[*]` bei Listen), ref-Rahmen in SD2, SD4, SD5 und SD6 beschriftet. Stereotypen «mandant» und «stammdaten» nach dem Commit geprüft.
- [x] Diagramme exportiert (220 dpi) nach `2_uml/`: `usecase-diagramm.png`, `klassendiagramm.png`, `sequenz-01-sofortdiagnose.png` … `sequenz-06-nachbestellvorschlag.png`.
- [x] VPP-Datei `2_uml/UML-WWI25B4-Gruppe1.vpp` exportiert (Project → Export → Visual Paradigm Project). Bei späteren Änderungen in VP: Commit, PNG neu exportieren, VPP neu exportieren.

## B. BPMN im Camunda Modeler

- [ ] **Alle zehn Dateien `p01` bis `p10` prüfen und exportieren:** Datei öffnen, unten den Reiter **Problems** öffnen (keine Fehler; falls doch Screenshot in die WhatsApp-Gruppe, nicht selbst umbauen), Strg+S, File → Export as image → PNG mit gleichem Dateinamen in `1_bpmn/` überschreiben. P06 und P10 unbedingt im Modeler speichern (E-22, E-27). Dann per Branch und Pull Request einreichen.
- [ ] **Ergebnis der Modeler-Prüfung in die Doku:** gelber Hinweis in 3.1/Tabelle 2 Schritt 4 durch einen Satz ersetzen, z. B. „Alle zehn Dateien zeigen im Problems-Panel keine Fehler.“
- [x] Kennzahlen abgeglichen: 133 Aktivitäten, Ø 13,3, 81 automatisiert (61 %), 26 beim Kunden, 42 Nachrichtenflüsse, 51 Datenobjekte, 12 Datenspeicher; P05 15/12, P06 15/9. Doku 5.1/5.2/Tabelle 6, `1_bpmn/README.md`, Folien 8/9 stimmen überein. Nach der Modeler-Prüfung nur dann neu zählen, wenn sich Aktivitäten geändert haben.
- [x] E-26 in der Doku: Abb. 2 (P01) und Abb. 3 (P04) eingefügt, Beschreibung P03 und P05 in 5.1 angepasst.

## C. Projektdokumentation (`3_doku/Projektdokumentation.docx`)

Offene Stellen sind gelb markiert. Mit Strg+F nach „[“ suchen.

- [x] Abb. 4–7 eingefügt (VP-Exporte aus `2_uml/`), Klassendiagramm auf einer Querformatseite. Im PDF ist es durch Hineinzoomen lesbar, das Bild ist in voller Auflösung eingebettet.
- [ ] **Gelbe Hinweise abarbeiten:** Tabelle 2 Schritt 4 (Ergebnis der Modeler-Prüfung, Aufgabe B), Tabelle 3 Sprint 4 (Ergebnis vom 22.10.), 7.1 (Hinweise aus dem Coaching am 22.10. mit Umsetzung, sonst löschen). 3.1 und 5.6 sind erledigt.
- [ ] **Kapitel 1 prüfen:** Jede Person liest ihre Zeile in Tabelle 1 und in der Beitragsliste. Falls die Folien 13–15 ausgeblendet bleiben, Foliennummern anpassen (siehe D).
- [ ] **Abschluss:** Titelseite „Bearbeitungsstand“ auf das aktuelle Datum, kein „[“ mehr im Text, als PDF speichern (`3_doku/Projektdokumentation.pdf`), Seitenzahlen im Inhaltsverzeichnis im PDF prüfen (statisches Verzeichnis).

## D. Präsentation (`4_praesentation/Abschlusspraesentation.pptx`)

Seit E-30 ist die `.pptx` das Original, es gibt keinen Generator mehr. Änderungen direkt in PowerPoint; Sprechtext in den Notizen und in `Sprechtext_Abschlusspraesentation.docx` gleich halten.

- [ ] **Folien 13–15 (ausgeblendet):** Die Überarbeitung läuft. Danach Agenda (Folie 2), Zuordnung auf Folie 18, Sprechtext-Datei und Doku Kapitel 1 an die endgültige Folienfolge angleichen.
- [ ] **Folien 8 und 12 ohne Zustandsdiagramm (E-30):** Kachel „Sequenzdiagramme + Zustandsdiagramm“ → „Sequenzdiagramme“; Karte „Objektorientierte Analyse“: „, Zustandsdiagramm des Reparaturauftrags“ streichen; Notiz: „und als Zugabe ein Zustandsdiagramm für den Reparaturauftrag“ streichen. Folie 12, Karte „Botschaft = Operation“: „, das Zustandsdiagramm beschreibt seine Übergänge“ → „; seine Übergänge zeigen die Prozesse 02 bis 08“. Die Word-Datei mit dem Sprechtext ist schon angepasst.
- [ ] **Sprechtext eigener Folien überarbeiten:** Jede Person formuliert ihren Teil so um, dass er zu ihr passt, und hält die Zeitangabe grob ein (gesamt etwa 18 Minuten).
- [x] Zahlen auf Folie 8/9, Lieferant als Black Box (Folie 11 und Notiz), Pull-Request-Zahl (Folie 13), Prüfrunden (Folie 14).
- [ ] **Generalprobe 22.10.:** komplett durchsprechen, Zeit messen (Ziel 15–20 Minuten), Übergaben üben, Fragen üben (Warum eine Rolle je Use Case? Warum ist der Lieferant kein Akteur? Warum Komposition beim Befund, nicht beim Gerät? Was ist automatisiert, was nicht? Wie wurde Konsistenz gesichert?).
- [ ] **PDF exportieren** nach der Generalprobe (`4_praesentation/Abschlusspraesentation.pdf`, nur sichtbare Folien). Die Folie mit der Zuordnung der Vortragenden muss enthalten sein (Pflicht laut Ablauf).

## E. Qualitätssicherung

- [ ] Jeden Pull Request gegen `5_team/qa-checkliste.md` prüfen, erst dann mergen.
- [ ] Nach Abschluss von A und B einmal die Konsistenz prüfen: Datenobjekte in BPMN = Klassennamen, Rollen im Use-Case-Diagramm = Tabelle 7 der Doku, SD-Botschaften = Operationen, Statuswerte = `AuftragStatus`, Kennzahlen in Doku und Folien gleich.

## F. Abgabe (bis 13.11.2026, jede Person einzeln)

Anleitung: `0_abgabe/README.md`.

- [ ] Die vier Dateien zusammenstellen (Projekt-PDF, BPMN-ZIP mit umbenannten `.bpmn`-Dateien, VPP, Präsentations-PDF) und als `Fallstudie-WWI25B4-Gruppe1.zip` packen; das fertige Archiv in der WhatsApp-Gruppe bereitstellen.
- [ ] Angabe zu den genutzten Werkzeugen aus `0_abgabe/KI-Angabe-Moodle.md` vervollständigen (jede Person ergänzt ihre Werkzeuge) und beim Upload angeben.
- [ ] Jede Person lädt das Archiv selbst in Moodle hoch.
