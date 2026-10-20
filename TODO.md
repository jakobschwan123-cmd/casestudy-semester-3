# Aufgaben bis zur Abgabe

Stand: 20.10.2026. Diese Liste sammelt alle offenen Aufgaben mit Erklärung, ohne Namen. Die Zuteilung erfolgt nach den Zuständigkeiten in `5_team/02-team-und-rollen.md` (E-23). Wer eine Aufgabe übernimmt, schreibt den Namen in Klammern hinter den Punkt und hakt ihn nach Erledigung ab (`- [x]`).

Termine: Generalprobe **22.10.2026**. Präsentation **27.10.2026, 09:00 Uhr, Raum B458**. Abgabe **13.11.2026, 23:59 Uhr** über Moodle.

Grundregeln: Jede Änderung über Branch und Pull Request, Commit-Stempel `[T05 2026-10-20] …`. Wer an Word- oder PowerPoint-Dateien arbeitet, sagt vorher in der WhatsApp-Gruppe Bescheid, weil diese Dateien nicht zusammengeführt werden können.

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

- [x] PNGs aller zehn Diagramme am 20.10. in hoher Auflösung neu exportiert (PR #35). Die `.bpmn`-Dateien haben sich dabei nicht geändert, die Kennzahlen bleiben gültig.
- [ ] **Ergebnis der Modeler-Prüfung bestätigen:** Zeigt das Problems-Panel bei allen zehn Dateien keine Fehler? Kurz in die WhatsApp-Gruppe schreiben. Falls Fehler: Screenshot, nicht selbst umbauen. Falls die Dateien dafür im Modeler gespeichert werden mussten (P06, P10), per Pull Request einreichen.
- [ ] **Ergebnis der Modeler-Prüfung in die Doku:** gelber Hinweis in 3.1/Tabelle 2 Schritt 4 durch einen Satz ersetzen, z. B. „Alle zehn Dateien zeigen im Problems-Panel keine Fehler.“
- [x] Kennzahlen abgeglichen: 133 Aktivitäten, Ø 13,3, 81 automatisiert (61 %), 26 beim Kunden, 42 Nachrichtenflüsse, 51 Datenobjekte, 12 Datenspeicher; P05 15/12, P06 15/9. Doku 5.1/5.2/Tabelle 6 und `1_bpmn/README.md` stimmen überein; die Folien sind seit PR #36 wieder veraltet (siehe D). Nach der Modeler-Prüfung nur dann neu zählen, wenn sich Aktivitäten geändert haben.
- [x] E-26 in der Doku: Abb. 2 (P01) und Abb. 3 (P04) eingefügt, seit 20.10. mit den hochaufgelösten PNGs; Beschreibung P03 und P05 in 5.1 angepasst. Weitere BPMN-Bilder kommen nicht in die Doku, alle zehn Diagramme liegen als `.bpmn` in der Abgabe.

## C. Projektdokumentation (`3_doku/Projektdokumentation.docx`)

Offene Stellen sind gelb markiert. Mit Strg+F nach „[“ suchen.

- [x] Abb. 4–7 eingefügt (VP-Exporte aus `2_uml/`), Klassendiagramm auf einer Querformatseite. Im PDF ist es durch Hineinzoomen lesbar, das Bild ist in voller Auflösung eingebettet.
- [ ] **Gelbe Hinweise abarbeiten:** Tabelle 2 Schritt 4 (Ergebnis der Modeler-Prüfung, Aufgabe B), Tabelle 3 Sprint 4 (Ergebnis vom 22.10.), 7.1 (Hinweise aus dem Coaching am 22.10. mit Umsetzung, sonst löschen). 3.1 und 5.6 sind erledigt.
- [ ] **Kapitel 1 prüfen:** Jede Person liest ihre Zeile in Tabelle 1 und in der Beitragsliste. Kapitel- und Foliennummern sowie Verweise auf das Entscheidungslog (E-Nummern) werden gestrichen, weil das Entscheidungslog nicht abgegeben wird.
- [ ] **Abbildung 1 (Systemkontext) ersetzen** durch `3_doku/systemkontext/systemkontext.png` (Stand 20.10.: vier Mitarbeitertypen, Werkstattleitung mit Administration).
- [ ] **Abschluss:** Titelseite „Bearbeitungsstand“ auf das aktuelle Datum, kein „[“ mehr im Text, als PDF speichern (`3_doku/Projektdokumentation.pdf`), Seitenzahlen im Inhaltsverzeichnis im PDF prüfen (statisches Verzeichnis).

## D. Präsentation (`4_praesentation/Abschlusspraesentation.pptx`)

Seit E-30 ist die `.pptx` das Original, es gibt keinen Generator mehr. Änderungen direkt in PowerPoint; Sprechtext in den Notizen und in `Sprechtext_Abschlusspraesentation.docx` gleich halten.

Stand 20.10.: 18 Folien (17 plus Anhang), alle eingeblendet. Die Nummern unten beziehen sich auf diesen Stand.

- [x] Doppelte Auftragsreise entfernt, Folie 6 so skaliert, dass alle sechs Phasen auf eine Folie passen.
- [x] Kennzahlen auf Folien 8 und 9 samt Notizen auf den Stand von `1_bpmn/README.md` und Doku 5.1 gebracht (133 Aktivitäten, Ø 13,3, 61 %, 42 Nachrichtenflüsse, 51 Datenobjekte, P05 15/80 %, P06 15/60 %).
- [x] Zustandsdiagramm von Folie 8 und 12 gestrichen (E-30).
- [x] Redezeit neu verteilt: Nina 2:50, David 3:20, Adrian 3:10, Maximilian 3:20, Kilian 3:10, Jakob 2:20, gesamt 18:10. Notizen aller Folien und Word-Datei sind wortgleich.
- [x] Folien 13 bis 15 eingeblendet. Folie 13 und 14 ohne Datumsliste, stattdessen der Ablauf je Diagramm (Entwurf im Zweierteam, Review, Abstimmung im Gruppentermin, Pull Request).
- [x] Agenda (Folie 2) und Zuordnung (Folie 18) passen zur Folienfolge: Nina 1–2 und 16–17, David 3, 6 und 11, Adrian 4–5 und 7, Maximilian 8–10, Kilian 12–13, Jakob 14–15.
- [x] Mockup (`4_praesentation/mockup/`) an das Modell angeglichen: Voranmeldung statt Auftrag, Teile vorreserviert, Preis vorläufig, KVA-Freigabe im Status-Tracking.
- [ ] **Festlegen, ob und wo das Mockup gezeigt wird** (Vorschlag: Folie 7, KI-Sofortdiagnose) und die Zeit dafür einplanen.
- [ ] **Sprechtext eigener Folien überarbeiten:** Jede Person formuliert ihren Teil so um, dass er zu ihr passt, und hält die Zeitangabe grob ein (gesamt etwa 18 Minuten). Danach die Notiz in der PPTX und die Word-Datei gleich halten.
- [ ] **Generalprobe 22.10.:** komplett durchsprechen, Zeit messen (Ziel 15–20 Minuten), Übergaben üben, Fragen üben (Warum eine Rolle je Use Case? Warum ist der Lieferant kein Akteur? Warum Komposition beim Befund, nicht beim Gerät? Was ist automatisiert, was nicht? Wie wurde Konsistenz gesichert? Warum ist der Auftrag nach zwei gescheiterten Nacharbeiten abgelehnt?).
- [ ] **PDF exportieren** nach der Generalprobe (`4_praesentation/Abschlusspraesentation.pdf`). Die Folie mit der Zuordnung der Vortragenden muss enthalten sein (Pflicht laut Ablauf).

## E. Qualitätssicherung

- [ ] Jeden Pull Request gegen `5_team/qa-checkliste.md` prüfen, erst dann mergen.
- [ ] Nach Abschluss von A und B einmal die Konsistenz prüfen: Datenobjekte in BPMN = Klassennamen, Rollen im Use-Case-Diagramm = Tabelle 7 der Doku, SD-Botschaften = Operationen, Statuswerte = `AuftragStatus`, Kennzahlen in Doku und Folien gleich.

## F. Abgabe (bis 13.11.2026, jede Person einzeln)

Anleitung: `0_abgabe/README.md`.

- [ ] Die vier Dateien zusammenstellen (Projekt-PDF, BPMN-ZIP mit umbenannten `.bpmn`-Dateien, VPP, Präsentations-PDF) und als `Fallstudie-WWI25B4-Gruppe1.zip` packen; das fertige Archiv in der WhatsApp-Gruppe bereitstellen.
- [ ] Angabe zu den genutzten Werkzeugen aus `0_abgabe/KI-Angabe-Moodle.md` vervollständigen (jede Person ergänzt ihre Werkzeuge) und beim Upload angeben.
- [ ] Jede Person lädt das Archiv selbst in Moodle hoch.
