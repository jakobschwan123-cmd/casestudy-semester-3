# Aufgaben bis zur Abgabe

Stand: 20.10.2026. Diese Liste enthält nur noch die offenen Aufgaben, ohne Namen. Die Zuteilung erfolgt nach den Zuständigkeiten in `5_team/02-team-und-rollen.md`. Wer eine Aufgabe übernimmt, schreibt den Namen in Klammern hinter den Punkt und hakt ihn nach Erledigung ab (`- [x]`).

Termine: Generalprobe **22.10.2026**. Präsentation **27.10.2026, 09:00 Uhr, Raum B458**. Abgabe **13.11.2026, 23:59 Uhr** über Moodle.

Grundregeln: Jede Änderung über Branch und Pull Request, Commit-Stempel `[T05 2026-10-20] …`. Wer an Word- oder PowerPoint-Dateien arbeitet, sagt vorher in der WhatsApp-Gruppe Bescheid, weil diese Dateien nicht zusammengeführt werden können. Die `.pptx` ist das Original der Präsentation; Sprechtext in den Notizen und in `4_praesentation/Sprechtext_Abschlusspraesentation.docx` gleich halten.

Stand der Artefakte: UML (Use-Case-, Klassen-, sechs Sequenzdiagramme) ist fertig und als PNG und VPP in `2_uml/` abgelegt. Die zehn BPMN-Dateien liegen mit aktuellen PNG-Exporten in `1_bpmn/`. Doku, Präsentation (19 Folien, alle eingeblendet) und Sprechtext sind auf einem Stand; Kennzahlen in Doku und Folien stimmen mit den BPMN-Dateien überein.

---

## A. BPMN im Camunda Modeler

- [ ] **Modeler-Prüfung durchführen:** Alle zehn `.bpmn`-Dateien im Camunda Modeler (Camunda 8) öffnen und prüfen, ob das Problems-Panel keine Fehler zeigt. Ergebnis kurz in die WhatsApp-Gruppe. Falls Fehler: Screenshot, nicht selbst umbauen. Falls die Dateien dafür im Modeler gespeichert werden mussten: per Pull Request einreichen und die Kennzahlen nur dann neu zählen, wenn sich Aktivitäten geändert haben.
- [ ] **Ergebnis in die Doku:** gelben Hinweis in Tabelle 2 Schritt 4 durch einen Satz ersetzen, z. B. „Alle zehn Dateien zeigen im Problems-Panel keine Fehler.“

## B. Projektdokumentation (`3_doku/Projektdokumentation.docx`)

Offene Stellen sind gelb markiert. Mit Strg+F nach „[“ suchen.

- [ ] **Gelbe Hinweise abarbeiten:** Tabelle 2 Schritt 4 (Ergebnis der Modeler-Prüfung, Aufgabe A), Tabelle 3 Sprint 4 (Ergebnis vom 22.10.), 7.1 (Hinweise aus dem Coaching am 22.10. mit Umsetzung, sonst löschen).
- [ ] **Kapitel 1 prüfen:** Jede Person liest ihre Zeile in Tabelle 1 und in der Beitragsliste und meldet Korrekturen.
- [ ] **Abschluss:** kein „[“ mehr im Text, als PDF speichern (`3_doku/Projektdokumentation.pdf`), Seitenzahlen im Inhaltsverzeichnis im PDF prüfen (statisches Verzeichnis; Seite 3 ist voll, jede Ergänzung dort verschiebt die Nummern).

## C. Präsentation (`4_praesentation/Abschlusspraesentation.pptx`)

Folienfolge: Nina 1–2 und 17–18, David 3, 6 und 12, Adrian 4–5 und 7–8, Maximilian 9–11, Kilian 13–14, Jakob 15–16, Folie 19 Anhang. Redezeit: Nina 2:50, David 3:20, Adrian 4:10, Maximilian 3:20, Kilian 3:10, Jakob 2:20, gesamt 19:10.

- [ ] **Sprechtext eigener Folien überarbeiten:** Jede Person formuliert ihren Teil so um, dass er zu ihr passt, und hält die Zeitangabe grob ein. Danach die Notiz in der PPTX und die Word-Datei gleich halten.
- [ ] **Demo vorbereiten (Folie 8):** `4_praesentation/mockup/index.html` vor der Präsentation im Browser öffnen (Vollbild, hineinzoomen), Wechsel von Folie 8 zum Browser und zurück üben. Fallback sind die Screenshots auf Folie 8.
- [ ] **Generalprobe 22.10.:** komplett durchsprechen, Zeit messen (Ziel 15–20 Minuten, Plan 19:10 ohne Puffer; Reserve: Folie 7 um etwa 20 s kürzen), Übergaben üben, Fragen üben (Warum eine Rolle je Use Case? Warum ist der Lieferant kein Akteur? Warum Komposition beim Befund, nicht beim Gerät? Was ist automatisiert, was nicht? Wie wurde Konsistenz gesichert? Warum ist der Auftrag nach zwei gescheiterten Nacharbeiten abgelehnt?).
- [ ] **PDF exportieren** nach der Generalprobe aus PowerPoint (`4_praesentation/Abschlusspraesentation.pdf`). Die Folie mit der Zuordnung der Vortragenden muss enthalten sein (Pflicht laut Ablauf).

## D. Abgabe (bis 13.11.2026, jede Person einzeln)

Anleitung: `0_abgabe/README.md`.

- [ ] Die vier Dateien zusammenstellen (Projekt-PDF, BPMN-ZIP mit umbenannten `.bpmn`-Dateien, VPP, Präsentations-PDF) und als `Fallstudie-WWI25B4-Gruppe1.zip` packen; das fertige Archiv in der WhatsApp-Gruppe bereitstellen.
- [ ] Angabe zu den genutzten Werkzeugen aus `0_abgabe/KI-Angabe-Moodle.md` vervollständigen (jede Person ergänzt ihre Werkzeuge) und beim Upload angeben.
- [ ] Jede Person lädt das Archiv selbst in Moodle hoch.
