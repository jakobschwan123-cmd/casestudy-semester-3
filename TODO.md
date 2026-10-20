# Aufgaben bis zur Abgabe

Stand: 20.10.2026. Diese Liste sammelt alle offenen Aufgaben mit Erklärung, ohne Namen. Die Zuteilung erfolgt nach den Zuständigkeiten in `5_team/02-team-und-rollen.md` (E-23). Wer eine Aufgabe übernimmt, schreibt den Namen in Klammern hinter den Punkt und hakt ihn nach Erledigung ab (`- [x]`).

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

- [x] PNGs aller zehn Diagramme am 20.10. in hoher Auflösung neu exportiert (PR #35). Die `.bpmn`-Dateien haben sich dabei nicht geändert, die Kennzahlen bleiben gültig.
- [ ] **Ergebnis der Modeler-Prüfung bestätigen:** Zeigt das Problems-Panel bei allen zehn Dateien keine Fehler? Kurz in die WhatsApp-Gruppe schreiben. Falls Fehler: Screenshot, nicht selbst umbauen. Falls die Dateien dafür im Modeler gespeichert werden mussten (P06, P10), per Pull Request einreichen.
- [ ] **Ergebnis der Modeler-Prüfung in die Doku:** gelber Hinweis in 3.1/Tabelle 2 Schritt 4 durch einen Satz ersetzen, z. B. „Alle zehn Dateien zeigen im Problems-Panel keine Fehler.“
- [x] Kennzahlen abgeglichen: 133 Aktivitäten, Ø 13,3, 81 automatisiert (61 %), 26 beim Kunden, 42 Nachrichtenflüsse, 51 Datenobjekte, 12 Datenspeicher; P05 15/12, P06 15/9. Doku 5.1/5.2/Tabelle 6 und `1_bpmn/README.md` stimmen überein; die Folien sind seit PR #36 wieder veraltet (siehe D). Nach der Modeler-Prüfung nur dann neu zählen, wenn sich Aktivitäten geändert haben.
- [x] E-26 in der Doku: Abb. 2 (P01) und Abb. 3 (P04) eingefügt, seit 20.10. mit den hochaufgelösten PNGs; Beschreibung P03 und P05 in 5.1 angepasst. Weitere BPMN-Bilder kommen nicht in die Doku, alle zehn Diagramme liegen als `.bpmn` in der Abgabe.

## C. Projektdokumentation (`3_doku/Projektdokumentation.docx`)

Offene Stellen sind gelb markiert. Mit Strg+F nach „[“ suchen.

- [x] Abb. 4–7 eingefügt (VP-Exporte aus `2_uml/`), Klassendiagramm auf einer Querformatseite. Im PDF ist es durch Hineinzoomen lesbar, das Bild ist in voller Auflösung eingebettet.
- [ ] **Gelbe Hinweise abarbeiten:** Tabelle 2 Schritt 4 (Ergebnis der Modeler-Prüfung, Aufgabe B), Tabelle 3 Sprint 4 (Ergebnis vom 22.10.), 7.1 (Hinweise aus dem Coaching am 22.10. mit Umsetzung, sonst löschen). 3.1 und 5.6 sind erledigt.
- [ ] **Kapitel 1 prüfen:** Jede Person liest ihre Zeile in Tabelle 1 und in der Beitragsliste. Falls die Folien 14–16 ausgeblendet bleiben, Foliennummern anpassen (siehe D).
- [ ] **Abschluss:** Titelseite „Bearbeitungsstand“ auf das aktuelle Datum, kein „[“ mehr im Text, als PDF speichern (`3_doku/Projektdokumentation.pdf`), Seitenzahlen im Inhaltsverzeichnis im PDF prüfen (statisches Verzeichnis).

## D. Präsentation (`4_praesentation/Abschlusspraesentation.pptx`)

Seit E-30 ist die `.pptx` das Original, es gibt keinen Generator mehr. Änderungen direkt in PowerPoint; Sprechtext in den Notizen und in `Sprechtext_Abschlusspraesentation.docx` gleich halten.

Mit PR #36 (20.10.) hat die Präsentation 19 Folien. Die Nummern unten beziehen sich auf diesen Stand. Dabei sind ältere Inhalte zurückgekommen, die schon korrigiert waren:

- [ ] **Folie 6 und 7 sind identisch** (Auftragsreise doppelt, gleiche Notiz von David). Eine löschen; danach stimmen auch die Seitenzahlen unten rechts wieder (Folie 8 zeigt zurzeit „7“).
- [ ] **Kennzahlen wieder auf den alten Stand gefallen (Folien 9 und 10 samt Notizen):** 131 → 133 Aktivitäten, Ø 13,1 → 13,3, 60 % → 61 % (auch im Titel von Folie 10 und in der Notiz von Folie 9), 41 → 42 Nachrichtenflüsse, 48 → 51 Datenobjekte, Tabelle P05 14/79 % → 15/80 % und P06 14/57 % → 15/60 %. Quelle: `1_bpmn/README.md`, Doku 5.1.
- [ ] **Folien 9 und 13 ohne Zustandsdiagramm (E-30):** Folie 9: Kachel „Sequenzdiagramme + Zustandsdiagramm“ → „Sequenzdiagramme“; Karte „Objektorientierte Analyse“: „, Zustandsdiagramm des Reparaturauftrags“ streichen; Notiz: „und als Zugabe ein Zustandsdiagramm für den Reparaturauftrag“ streichen. Folie 13, Karte „Botschaft = Operation“: „, das Zustandsdiagramm beschreibt seine Übergänge“ → „; seine Übergänge zeigen die Prozesse 02 bis 08“. Die Word-Datei mit dem Sprechtext ist schon angepasst.
- [ ] **Redezeit neu verteilt (20.10.):** Kilian übernimmt Datenmodell und Vorgehen/PM ganz (100 s + 90 s), dafür kürzen David (Auftragsreise 75 → 55 s) und Adrian (Lösung 70 → 50 s). Neu je Person: Nina 2:50, David 3:20, Adrian 3:10, Maximilian 3:20, Kilian 3:10, Jakob 2:20, gesamt 18:10. Die Word-Datei mit dem Sprechtext ist angepasst. In der PPTX: Folie 14 „Vorgehen und Projektmanagement“ einblenden und die Notizen der Folien 4, 6, 13 und 14 aus der Word-Datei übernehmen (dort Folie 4, 6, 12 und 13). Damit ist auch die alte Pull-Request-Zahl in der Notiz von Folie 14 („zehn“) ersetzt.
- [ ] **Folien 15–16 (ausgeblendet, Jakob):** Überarbeitung abschließen oder bewusst ausgeblendet lassen. Bleiben beide ausgeblendet, hat Jakob keine Redezeit. Danach Agenda (Folie 2), Zuordnung auf Folie 19, Sprechtext-Datei und Doku Kapitel 1 an die endgültige Folienfolge angleichen.
- [ ] **Mockup (`4_praesentation/mockup/`) mit dem Modell abgleichen, falls es in der Präsentation gezeigt wird:** Nach dem Annehmen des Vorab-KVA steht „Festpreis“, „Reparaturauftrag angelegt“, „Teile reserviert“ und „Status: Freigegeben“. Im Modell bleibt der KVA aus der Sofortdiagnose vorläufig, der Kunde bestätigt nur die Voranmeldung, die Teile sind vorreserviert, und der Auftrag entsteht erst bei der Annahme in der Filiale (P02, Status angenommen). Vorschlag: „Voranmeldung bestätigt“, „Teile vorreserviert“, „vorläufiger Preis, final nach Prüfung durch den Techniker“. Außerdem festlegen, auf welcher Folie und von wem die Demo gezeigt wird (Zeit einplanen).
- [ ] **Sprechtext eigener Folien überarbeiten:** Jede Person formuliert ihren Teil so um, dass er zu ihr passt, und hält die Zeitangabe grob ein (gesamt etwa 18 Minuten).
- [x] Lieferant als Black Box (Folie 12 und Notiz), Prüfrunden (Folie 15).
- [ ] **Generalprobe 22.10.:** komplett durchsprechen, Zeit messen (Ziel 15–20 Minuten), Übergaben üben, Fragen üben (Warum eine Rolle je Use Case? Warum ist der Lieferant kein Akteur? Warum Komposition beim Befund, nicht beim Gerät? Was ist automatisiert, was nicht? Wie wurde Konsistenz gesichert? Warum ist der Auftrag nach zwei gescheiterten Nacharbeiten abgelehnt?).
- [ ] **PDF exportieren** nach der Generalprobe (`4_praesentation/Abschlusspraesentation.pdf`, nur sichtbare Folien). Die Folie mit der Zuordnung der Vortragenden muss enthalten sein (Pflicht laut Ablauf).

## E. Qualitätssicherung

- [ ] Jeden Pull Request gegen `5_team/qa-checkliste.md` prüfen, erst dann mergen.
- [ ] Nach Abschluss von A und B einmal die Konsistenz prüfen: Datenobjekte in BPMN = Klassennamen, Rollen im Use-Case-Diagramm = Tabelle 7 der Doku, SD-Botschaften = Operationen, Statuswerte = `AuftragStatus`, Kennzahlen in Doku und Folien gleich.

## F. Abgabe (bis 13.11.2026, jede Person einzeln)

Anleitung: `0_abgabe/README.md`.

- [ ] Die vier Dateien zusammenstellen (Projekt-PDF, BPMN-ZIP mit umbenannten `.bpmn`-Dateien, VPP, Präsentations-PDF) und als `Fallstudie-WWI25B4-Gruppe1.zip` packen; das fertige Archiv in der WhatsApp-Gruppe bereitstellen.
- [ ] Angabe zu den genutzten Werkzeugen aus `0_abgabe/KI-Angabe-Moodle.md` vervollständigen (jede Person ergänzt ihre Werkzeuge) und beim Upload angeben.
- [ ] Jede Person lädt das Archiv selbst in Moodle hoch.
