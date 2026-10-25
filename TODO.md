# Aufgaben bis zur Abgabe

Stand: 25.10.2026, nach PR #70 (Modeler-Prüfung und Namenskorrekturen aller zehn BPMN-Dateien, Folien 16/17/20, Foliennummern). Die Liste enthält nur offene Aufgaben (Erledigtes wird gestrichen, nicht abgehakt), ohne Namen. Wer eine Aufgabe übernimmt, schreibt den Namen in Klammern dahinter und hakt sie nach Erledigung ab (`- [x]`). Sie ersetzt die alte TODO-Liste vom 22.10.; der Prüfbericht vom 22.10. (`5_team/pruefbericht-2026-10-22.md`) ist bis auf die unten übernommenen Punkte abgearbeitet.

Termine: Präsentation **27.10.2026, 09:00 Uhr, Raum B458**. Abgabe **13.11.2026, 23:59 Uhr** über Moodle.

Grundregeln: Jede Änderung über Branch und Pull Request, vorher `git pull`. Wer an Word- oder PowerPoint-Dateien arbeitet, sagt vorher in der WhatsApp-Gruppe Bescheid, weil diese Dateien nicht zusammengeführt werden können. Der Sprechtext steht nur in `4_praesentation/Sprechtext_Abschlusspraesentation.docx`, nicht in den Notizen der PPTX.

## Stand der Artefakte

- **BPMN:** Alle zehn Dateien am 25.10. im Camunda Modeler geprüft, korrigiert und gespeichert, PNGs neu exportiert (PR #67); bpmnlint 0 Befunde. Namen in P01, P05 und P09 am 25.10. nachkorrigiert (PR #69/#70). Die Zählung blieb dabei unverändert. Zählung des aktuellen `1_bpmn/` (Aktivitäten = Tasks, Call Activities und Teilprozess im Werkstatt-Pool; automatisiert = Service, Script, Business Rule, Send, Receive; `zeebe:userTask` nicht doppelt zählen): **143 Aktivitäten (Ø 14,3), 89 automatisiert = 62 %, 34 User Tasks, 9 Manual Tasks, 10 Call Activities und 1 Teilprozess, 28 Kundenaktivitäten, 48 Nachrichtenflüsse, 58 Datenobjekte, 14 Datenspeicher.** Je Diagramm (Aktivitäten/automatisiert): 01 14/14, 02 16/7, 03 13/6, 04 12/8, 05 16/12, 06 17/11, 07 13/6, 08 17/11, 09 16/8, 10 9/6. Doku (5.1, 5.2, Tabelle 6), PPTX (Folien 12, 13, 21), Sprechtext Adrian und `1_bpmn/README.md` sind auf diesem Stand. Ändern sich Diagramme bei der BPMN-Prüfung, neu zählen.
- **UML:** Prüflisten-Punkte U1–U9, U11 und U12 sind in VP umgesetzt, zuletzt SD1 (`getBenoetigteTeile()`, `teil.getLagerbestaende()`, `res.vorreserviere()`), der SD5-Guard ohne doppelte Klammern, SD3 `reserviere()` für r und u, SD5 `new(r, kostenfrei)`. PNGs und VPP am 24.10. exportiert, Teamwork-Server committet.
- **Doku:** Fakten am 24.10. korrigiert (14-Tage-Nachfrist P06, Techniker-Satz 5.3, 14 Mitarbeiterrollen in 5.4, Tabelle 8 ohne Terminvorschlag, einheitlich „Service / Annahme“ und „Use Case“, Formatreste). Kennzahlen und Tabelle 6 auf dem Stand oben. Alle Abbildungen 1–7 stammen aus den aktuellen Exporten (Abb. 1 neu: Lieferant als Black Box, Lanes wie Tabelle 7). Inhaltsverzeichnis in LibreOffice geprüft. Am 25.10.: Tabelle 1 (David „Stellvertretende Projektleitung, UML“ wie Folie 18), Tabelle 6 (Start 05 „Teilebedarf freigegeben“, Ende 07 „Gerät abholbereit“), Absatz zum Prozessverbund in 5.1, Abbildungen 2 (P01) und 3 (P04) neu.
- **Sprechtext:** ab Folie 5 überarbeitet (Dubletten, fehlende Überschrift, Foliennummern wie die PPTX vom 24.10., Adrians Fachfehler und Kennzahlen, Tippfehler, Nina Folie 19 gekürzt). Am 24./25.10.: Maximilians Text (Folien 6–9), Ninas Rollen wie Folie 18, Jakob Folie 16/17 (Prüfprogramme benannt, Lernerfahrungen statt Doppelung). Davids Teil (Folien 1–4) wird noch überarbeitet.
- **PPTX (Stand Maximilian, PR #62):** 21 Folien. Am 24.10. korrigiert: die ausgeblendeten Demo-Screens (bisher Folien 10–18) entfernt, es gibt nur die eine Demo-Folie 9; Foliennummern auf Folie 21 angepasst; Kennzahlen Folien 12, 13 und 21; Titel Folien 10/11 „KI-Sofortdiagnose“ statt „KI-Sofortanalyse“; Folie 14 Komma; Folie 16 „Jede Mitarbeiterrolle …“; Folie 19 „KI-gestützte“; Notizen der Folien 10–13 nur noch „Vortragende(r): Adrian“ (Folie 10 stand auf Maximilian, Folie 21 ordnet sie Adrian zu). Am 25.10.: Folie 16 nennt Camunda-Linter und Modeler-Prüfung, Folie 17 „Pools und Lanes“ und „Überschriebene Diagramme“ statt der Doppelungen, Foliennummern eingeschaltet, Folie 20 erklärt den digitalen Zustandsautomaten.
- **PDFs:** entstehen erst ganz am Ende.

---

## A. Vor der Präsentation am 27.10.

### Präsentation und Sprechtext

- [ ] **Davids Teil im Sprechtext (Folien 1–4)** einfügen; dabei „Quelitätssicherung“ (Folie 1) korrigieren.
- [ ] **Antworten auf mögliche Fragen bereitlegen** (Abschnitt F).

---

## B. Vor der Abgabe am 13.11.

### Projektdokumentation (`3_doku/Projektdokumentation.docx`)

Inhaltliche Punkte, die die Gruppe entscheiden soll; die Vorschläge stammen aus der Prüfung vom 24.10.

- [ ] **Kapitel 1, Beitragsliste:** Tabelle 1 ordnet das Klassendiagramm Kilian zu, die Beitragsliste David. Prozess 06 wird drei Personen zugeschrieben. Kilians Zeile „Erstellung der Diagramme mit Korrekturen (…)“ ist unklar. Adrian: „Zustandsautomat“ kommt in der Doku nicht mehr vor, besser „Statusmodell des Reparaturauftrags“. Liste nicht wie eine Kapitel-Autorenangabe formulieren.
- [ ] **2.2, Problem → Modul → Prozess/Use Case:** Es fehlt die Zuordnung der vier Probleme aus 2.1. Vorschlag (Absatz am Ende von 2.2): „Jedes der vier Probleme aus Abschnitt 2.1 greift ein Modul auf. Die fehlende Kundeninformation löst das Kundenportal: Der Kunde gibt den KVA in der App frei und wird benachrichtigt, sobald sein Gerät abholbereit ist (Prozesse 04 und 08, UC07 und UC15). Den fehlenden zentralen Status ersetzt der Reparaturauftrag im Auftrags- und Werkstattmodul, dessen Zustände alle Prozesse teilen (Abschnitt 2.4, UC03 und UC14). Gegen getrennte Bestellungen je Filiale prüft das Dispositionsmodul zuerst die Bestände aller Filialen und bestellt nur Fehlteile (Prozesse 05 und 06, UC08 bis UC10). Die Auslastung der Techniker macht die Terminplanung sichtbar, in der die Werkstattleitung Termine vergibt und Techniker zuweist (Prozess 02, UC17).“
- [ ] **2.2, letzter Satz** „Einen belegten Funktionsvergleich … haben wir nicht erstellt.“ lädt ohne Begründung zur Abwertung ein. Vorschlag: „… war nicht Gegenstand der Fallstudie; das Alleinstellungsmerkmal begründen wir in Abschnitt 2.5.“
- [ ] **5.2, Begründung der manuellen Aktivitäten:** Vorschlag (Absatz nach der Aufzählung): „Manuell bleiben bewusst die Arbeiten am Gerät und an der Ware, etwa Sichtprüfung und Einlagerung bei der Annahme, die Reparatur und Nacharbeit selbst, die Übergabe an den Kunden und der Versand einer Retoure. Sie liegen nach Abschnitt 2.3 außerhalb der Systemgrenze; RepairFlow erfasst nur ihr Ergebnis, zum Beispiel den Reparaturschritt mit Arbeitszeit.“ Erst nach der BPMN-Prüfung, falls sich die Manual Tasks ändern.
- [ ] **5.4, Oberflächenklassen:** Satz ergänzen, warum sie im Analysemodell stehen: „In der Analyse sind die Oberflächen Boundary-Klassen: Sie nehmen die Aktion des Benutzers entgegen, die fachlichen Operationen liegen bei den Fach- und Rollenklassen.“
- [ ] **Tabelle 3 (Sprints):** Sprint 4 (16.10.–22.10.) nennt als Ergebnis den „UI-Umbau nach dem Gespräch am 22.10.“ (letzter Tag), „Weitere Anpassungen in VP“ in der Zeile Abschluss liest sich wie offen, 7.1 sagt „Coaching“, Tabelle 3 „Gespräch“. Datumsangaben bleiben (Team-Entscheidung).
- [ ] **3.2, Entscheidungslog:** wird mehrfach als Beleg genannt, ist aber nicht Teil der Abgabe. Halbsatz „(im Projekt-Repository, nicht Teil der Abgabe)“.
- [ ] **Kapitel 6:** „Die Konflikte wurden an zwei Stellen gleichzeitig gelöst.“ ist unverständlich (streichen oder sagen, wer was gemacht hat); „Repo“ → „Repository“.
- [ ] **Geschäftsmodell und Ausblick:** Folie 19 (Abo, KI-gestützte Disposition, Techniker-Copilot, Geräteakte) steht nur knapp in 2.2, der Ausblick gar nicht in der Doku. Kurzer Absatz in Kapitel 2 oder 7.
- [ ] **Inhaltsverzeichnis** ganz am Ende in Word gegen das PDF prüfen (statisch; am 24.10. in LibreOffice korrigiert: 5.4 → 13, 6 → 17, 7 und 7.1 → 18).

### Arbeitslisten und Abgabe

- [ ] `0_abgabe/KI-Angabe-Moodle.md`: noch Entwurf, jede Person ergänzt ihre Werkzeuge.
- [ ] Abgabepaket nach `0_abgabe/README.md`: Doku-PDF, BPMN-ZIP (umbenannte `.bpmn`), VPP (nach dem letzten VP-Export), Präsentations-PDF mit Folie 21 (Zuordnung), dann `Fallstudie-WWI25B4-Gruppe1.zip`. Jede Person lädt selbst hoch.

---

## E. Gruppenentscheidungen

Offen: die inhaltlichen Doku-Punkte aus Abschnitt B (Beitragsliste, Problem-Zuordnung, Begründungen, Geschäftsmodell).

Entschieden, bleibt so: keine Backup-Folien; P09 „Gerät annehmen und Mangel dokumentieren“ bleibt in der Form vom 25.10.; ref-Beschriftungen in den Sequenzdiagrammen bleiben; Klassendiagramm ohne weitere Streichungen; Datenobjekte mit Bindestrich („Reparatur-auftrag“); Klassennamen in der Doku ohne Code-Schrift, keine Tabelle „Fristen und Grenzen“, kein eigener Quellenverweis; „KVA in 60 Sekunden“ im Sprechtext und Mockup Schritt 8 bleiben; Datumsangaben in der Doku, Format der Abbildungen 2–5, Entscheidungslog-Verweise, Klasse für den KI-Diagnosedienst, Kopf-Redezeiten im Sprechtext, Maximilians Texte, kein Sprechtext in den PPTX-Notizen.

---

## Vor dem PDF-Export der Doku (Checkliste)

- [ ] Abbildungen 1–7 sind die aktuellen Exporte.
- [ ] Kennzahlen entsprechen der letzten Zählung (5.1, 5.2, Tabelle 6).
- [ ] Inhaltsverzeichnis in Word gegen das PDF geprüft.
- [ ] Suche nach „E-[0-9]“, „Claude“, „KI-Werkzeug“, „Maxi“, „Prüfbericht“, „Session“, „OFFEN“ ergibt nichts.

---

## F. Mögliche Fragen am 27.10.

1. „Zeigen Sie das Use-Case- oder Klassendiagramm.“ (Kein Bild in der Präsentation; Doku oder VP bereithalten.)
2. „Welche Use Cases haben ein Sequenzdiagramm, und warum diese?“ SD1 = UC01, SD2 = UC07, SD3 = UC09, SD4 = UC14, SD5 = UC16, SD6 = UC10.
3. „Was sind die zwei Prüfprogramme?“ (Folie 16: Camunda-Linter und Problems-Panel des Modelers)
4. „Warum ist der Kunde ein eigener Pool mit Ablauf, der Lieferant aber eine Black Box?“ (Doku Kapitel 6)
5. „Wie kommt die Oberfläche an das richtige Objekt?“ (Suche über den Werkstattbetrieb, SD1)
6. „Warum ist P02 am niedrigsten automatisiert?“
7. „Wo stehen Geschäftsmodell und Ausblick in der Dokumentation?“
8. „Warum 15 Rollen, aber nur vier Mitarbeiterklassen?“
9. „Wie ist ‚KVA in 60 Sekunden‘ belegt?“ (Annahme, Zielwert)
10. „Was passiert nach der zweiten gescheiterten Nacharbeit?“ Status abgelehnt; Prozess 07 endet mit „Gerät abholbereit“, die Rückgabe läuft über Prozess 08.
11. „Warum eine Rolle je Use Case? Warum Komposition beim Befund, nicht beim Gerät? Was ist automatisiert, was nicht?“
