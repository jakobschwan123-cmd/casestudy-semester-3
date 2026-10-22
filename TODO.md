# Aufgaben bis zur Abgabe

Stand: 22.10.2026. Diese Liste enthält nur noch die offenen Aufgaben, ohne Namen. Die Zuteilung erfolgt nach den Zuständigkeiten in `5_team/02-team-und-rollen.md`. Wer eine Aufgabe übernimmt, schreibt den Namen in Klammern hinter den Punkt und hakt ihn nach Erledigung ab (`- [x]`).

Termine: Präsentation **27.10.2026, 09:00 Uhr, Raum B458**. Abgabe **13.11.2026, 23:59 Uhr** über Moodle.

Grundregeln: Jede Änderung über Branch und Pull Request (oder nach Absprache direkt auf `main`), vorher `git pull`. Wer an Word- oder PowerPoint-Dateien arbeitet, sagt vorher in der WhatsApp-Gruppe Bescheid, weil diese Dateien nicht zusammengeführt werden können. Die `.pptx` ist das Original der Präsentation; Sprechtext in den Notizen und in `4_praesentation/Sprechtext_Abschlusspraesentation.docx` gleich halten.

Stand der Artefakte:
- **BPMN:** zehn Dateien mit PNG in `1_bpmn/`, Stand E-33 (P01 von Adrian übernommen). bpmnlint (Camunda 8.7) ohne Befund.
- **UML:** Use-Case-, Klassen- und sechs Sequenzdiagramme nach dem UI-Umbau (KundenApp, Werkstattoberflaeche, Suche über den Werkstattbetrieb) als PNG und VPP in `2_uml/`, VP-Teamwork-Server committet.
- **Doku, Präsentation (19 Folien) und Sprechtext** sind auf einem Stand und untereinander abgeglichen: Kennzahlen (136 Aktivitäten, Ø 13,6, 84 automatisiert = 62 %, 27 Kundenaktivitäten, 45 Nachrichtenflüsse, 53 Datenobjekte, 12 Datenspeicher; 29 Klassen, 40 Assoziationen, 7 Aufzählungen), Sprechtexte zu Folien, Doku und Diagrammen.
- **PDFs:** Doku- und Präsentations-PDF sind bewusst gelöscht und werden erst ganz am Ende exportiert.

Folienfolge: Nina 1–2 und 16–18, David 3–5, Kilian 6 und 12–13, Maximilian 7–9, Adrian 10–11, Jakob 14–15, Folie 19 Anhang. Redezeit: Nina 3:45, David 3:15, Kilian 4:00, Maximilian 3:40, Adrian 1:50, Jakob 2:10, gesamt 18:40.

---

## A. BPMN und Entscheidungslog

- [ ] **Modeler-Prüfung:** Alle zehn `.bpmn`-Dateien im Camunda Modeler (Camunda 8) öffnen, vor allem P01 (E-33) und P06–P10 (E-32), und prüfen, ob das Problems-Panel keine Fehler zeigt. Ergebnis kurz in die WhatsApp-Gruppe. Falls Fehler: Screenshot, nicht selbst umbauen. Mussten Dateien gespeichert werden, per Pull Request einreichen und die Kennzahlen nur neu zählen, wenn sich Aktivitäten geändert haben.
- [ ] **Entscheidungen bestätigen:** E-31, E-32 und E-33 in der Gruppe bestätigen und in `5_team/03-entscheidungen.md` von „Offen“ nach „Entschieden“ verschieben.

## B. Projektdokumentation (`3_doku/Projektdokumentation.docx`)

- [ ] **Kapitel 1 prüfen:** Jede Person liest ihre Zeile in Tabelle 1 und in der Beitragsliste und meldet Korrekturen.
- [ ] **Abschluss:** als PDF speichern (`3_doku/Projektdokumentation.pdf`) und Seitenzahlen im Inhaltsverzeichnis gegen das PDF prüfen (statisches Verzeichnis; jede Ergänzung kann die Nummern verschieben).

## C. Präsentation (`4_praesentation/Abschlusspraesentation.pptx`)

- [ ] **Eigene Folien lesen:** Jede Person liest ihre Folien und ihren Sprechtext. Geändert wurden am 22.10. unter anderem Folie 2 (Agenda), 6 (Status „abgelehnt“), 7 (Freigabe der Nacharbeit), 9 (Vorreservierung erst nach Bestätigung), 10/11 (Kennzahlen, 62 %), 13 (Oberflächen), 14 (Reviews) und 15 (Coaching-Hinweise). Wer umformuliert, hält Notiz und Word-Datei gleich und die Zeit grob ein.
- [ ] **Demo vorbereiten (Folie 8):** `4_praesentation/mockup/index.html` vor der Präsentation im Browser öffnen (Vollbild, hineinzoomen), Wechsel von Folie 8 zum Browser und zurück üben. Fallback sind die Screenshots auf Folie 8.
- [ ] **Generalprobe:** komplett durchsprechen, Zeit messen (Ziel 15–20 Minuten, Plan 18:40), Übergaben üben, Fragen üben (Warum eine Rolle je Use Case? Warum ist der Lieferant kein Akteur? Warum Komposition beim Befund, nicht beim Gerät? Wie kommt die Oberfläche an das richtige Objekt? Was ist automatisiert, was nicht? Wie wurde Konsistenz gesichert? Warum ist der Auftrag nach zwei gescheiterten Nacharbeiten abgelehnt?).
- [ ] **PDF exportieren** nach der Generalprobe aus PowerPoint (`4_praesentation/Abschlusspraesentation.pdf`). Die Folie mit der Zuordnung der Vortragenden muss enthalten sein (Pflicht laut Ablauf).

## D. Abgabe (bis 13.11.2026, jede Person einzeln)

Anleitung: `0_abgabe/README.md`.

- [ ] Die vier Dateien zusammenstellen (Projekt-PDF, BPMN-ZIP mit umbenannten `.bpmn`-Dateien, VPP, Präsentations-PDF) und als `Fallstudie-WWI25B4-Gruppe1.zip` packen; das fertige Archiv in der WhatsApp-Gruppe bereitstellen.
- [ ] Angabe zu den genutzten Werkzeugen aus `0_abgabe/KI-Angabe-Moodle.md` vervollständigen (jede Person ergänzt ihre Werkzeuge) und beim Upload angeben.
- [ ] Jede Person lädt das Archiv selbst in Moodle hoch.
