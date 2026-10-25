# Aufgaben bis zur Abgabe

Stand: 25.10.2026, nach PR #67 (Modeler-Prüfung aller zehn BPMN-Dateien, Folien 16/17/20, Foliennummern). Die Liste enthält nur offene Aufgaben, ohne Namen. Wer eine Aufgabe übernimmt, schreibt den Namen in Klammern dahinter und hakt sie nach Erledigung ab (`- [x]`). Sie ersetzt die alte TODO-Liste vom 22.10.; der Prüfbericht vom 22.10. (`5_team/pruefbericht-2026-10-22.md`) ist bis auf die unten übernommenen Punkte abgearbeitet.

Termine: Präsentation **27.10.2026, 09:00 Uhr, Raum B458**. Abgabe **13.11.2026, 23:59 Uhr** über Moodle.

Grundregeln: Jede Änderung über Branch und Pull Request, vorher `git pull`. Wer an Word- oder PowerPoint-Dateien arbeitet, sagt vorher in der WhatsApp-Gruppe Bescheid, weil diese Dateien nicht zusammengeführt werden können. Der Sprechtext steht nur in `4_praesentation/Sprechtext_Abschlusspraesentation.docx`, nicht in den Notizen der PPTX.

## Stand der Artefakte

- **BPMN:** Alle zehn Dateien am 25.10. im Camunda Modeler geprüft, korrigiert und gespeichert, PNGs neu exportiert (PR #67); bpmnlint 0 Befunde. Die Zählung blieb dabei unverändert. Zählung des aktuellen `1_bpmn/` (Aktivitäten = Tasks, Call Activities und Teilprozess im Werkstatt-Pool; automatisiert = Service, Script, Business Rule, Send, Receive; `zeebe:userTask` nicht doppelt zählen): **143 Aktivitäten (Ø 14,3), 89 automatisiert = 62 %, 34 User Tasks, 9 Manual Tasks, 10 Call Activities und 1 Teilprozess, 28 Kundenaktivitäten, 48 Nachrichtenflüsse, 58 Datenobjekte, 14 Datenspeicher.** Je Diagramm (Aktivitäten/automatisiert): 01 14/14, 02 16/7, 03 13/6, 04 12/8, 05 16/12, 06 17/11, 07 13/6, 08 17/11, 09 16/8, 10 9/6. Doku (5.1, 5.2, Tabelle 6), PPTX (Folien 12, 13, 21), Sprechtext Adrian und `1_bpmn/README.md` sind auf diesem Stand. Ändern sich Diagramme bei der BPMN-Prüfung, neu zählen.
- **UML:** Prüflisten-Punkte U1–U9, U11 und U12 sind in VP umgesetzt, zuletzt SD1 (`getBenoetigteTeile()`, `teil.getLagerbestaende()`, `res.vorreserviere()`), der SD5-Guard ohne doppelte Klammern, SD3 `reserviere()` für r und u, SD5 `new(r, kostenfrei)`. PNGs und VPP am 24.10. exportiert, Teamwork-Server committet.
- **Doku:** Fakten am 24.10. korrigiert (14-Tage-Nachfrist P06, Techniker-Satz 5.3, 14 Mitarbeiterrollen in 5.4, Tabelle 8 ohne Terminvorschlag, einheitlich „Service / Annahme“ und „Use Case“, Formatreste). Kennzahlen und Tabelle 6 auf dem Stand oben. Alle Abbildungen 1–7 stammen aus den aktuellen Exporten (Abb. 1 neu: Lieferant als Black Box, Lanes wie Tabelle 7). Inhaltsverzeichnis in LibreOffice geprüft. Am 25.10.: Tabelle 1 (David „Stellvertretende Projektleitung, UML“ wie Folie 18), Tabelle 6 (Start 05 „Teilebedarf freigegeben“, Ende 07 „Gerät abholbereit“), Absatz zum Prozessverbund in 5.1, Abbildung 3 (P04) neu.
- **Sprechtext:** ab Folie 5 überarbeitet (Dubletten, fehlende Überschrift, Foliennummern wie die PPTX vom 24.10., Adrians Fachfehler und Kennzahlen, Tippfehler, Nina Folie 19 gekürzt). Am 24./25.10.: Maximilians Text (Folien 6–9), Ninas Rollen wie Folie 18, Jakob Folie 16/17 (Prüfprogramme benannt, Lernerfahrungen statt Doppelung). Davids Teil (Folien 1–4) wird noch überarbeitet.
- **PPTX (Stand Maximilian, PR #62):** 21 Folien. Am 24.10. korrigiert: die ausgeblendeten Demo-Screens (bisher Folien 10–18) entfernt, es gibt nur die eine Demo-Folie 9; Foliennummern auf Folie 21 angepasst; Kennzahlen Folien 12, 13 und 21; Titel Folien 10/11 „KI-Sofortdiagnose“ statt „KI-Sofortanalyse“; Folie 14 Komma; Folie 16 „Jede Mitarbeiterrolle …“; Folie 19 „KI-gestützte“; Notizen der Folien 10–13 nur noch „Vortragende(r): Adrian“ (Folie 10 stand auf Maximilian, Folie 21 ordnet sie Adrian zu). Am 25.10.: Folie 16 nennt Camunda-Linter und Modeler-Prüfung, Folie 17 „Pools und Lanes“ und „Überschriebene Diagramme“ statt der Doppelungen, Foliennummern eingeschaltet, Folie 20 erklärt den digitalen Zustandsautomaten.
- **PDFs:** entstehen erst ganz am Ende.

---

## A. Vor der Präsentation am 27.10.

### Präsentation und Sprechtext

- [x] **Kennzahlen** (Stand 24.10., nach der Modeler-Prüfung am 25.10. neu gezählt und unverändert) sind überall eingetragen: Folien 12, 13 und 21, Doku 5.1/5.2, Tabelle 6, Sprechtext Adrian, `1_bpmn/README.md`. Ändert die BPMN-Prüfung noch Aktivitäten, wird einmal neu gezählt und an denselben Stellen nachgezogen.
- [ ] **Davids Teil im Sprechtext (Folien 1–4)** einfügen; dabei „Quelitätssicherung“ (Folie 1) korrigieren.
- [x] **Rollen wie Folie 18** in Ninas Sprechtext und in Doku-Tabelle 1 übernommen.
- [x] **Demo (Folie 9):** `4_praesentation/mockup/index.html` vor Beginn in einem zweiten Fenster öffnen, Wechsel mit Alt+Tab üben, Demo auf höchstens 90 Sekunden begrenzen. Es gibt keine Backup-Folien mit Screenshots.
- [x] **Generalprobe** gemacht.
- [x] **Maximilians Texte:** „T01_KI“ und „Konfidenz“ entfernt, Übergabe „Was davon heute geht, erklärt Adrian.“
- [ ] **Antworten auf mögliche Fragen bereitlegen** (Abschnitt F).

---

## B. Vor der Abgabe am 13.11.

### BPMN (Camunda Modeler)

Erledigt am 25.10. (PR #67), offen sind nur die drei Namen unten.

- [x] **P02–P05 im Modeler geprüft;** P02 „Gerät abgeben“ ist jetzt ein Manual Task.
- [x] **P07:** Ende heißt „Gerät abholbereit“ wie der Start von P08. Statt eines Aufrufs „08 Abholung abwickeln“, weil P09 die Reparatur (07) aufruft und danach selbst 08 aufruft; ein Aufruf in 07 hätte die Abholung dort doppelt gestartet.
- [x] **P08:** Lane Techniker aufgelöst, Geräteausgabe in Service / Annahme; Gateways als Fragen („Wie wird abgerechnet?“, „Welche Zahlungsart?“, „Wie wurde gezahlt?“, „Wievielte Frist abgelaufen?“); Kanten „1., 2. oder 4. Frist“ / „3. Frist“ / „5. Frist“.
- [x] **P06:** im Modeler gespeichert, PNG neu (altes PNG war beschädigt); Trennstriche in „Nachbestell-vorschläge“ und „Auftrags-bestätigung“.
- [ ] **P05 ↔ P09 (offen, Kilian):** Startereignis „KVA freigegeben“ → „Teilebedarf freigegeben“; den Service Task „Teilebedarf freigeben“ (versehentlich umbenannt) → „Freigegebene Teileliste übernehmen“. Doku Tabelle 6 und 5.1 sind schon angepasst.
- [ ] **P09 (offen, Kilian):** Name „Gerät annehmen und Mangel dokumentieren“ ohne geschützte Leerzeichen neu eintippen, Rechteck stattdessen breiter ziehen, PNG neu.
- [x] **P04:** „Erinnerung protokollieren“ gibt es im aktuellen P04 nicht mehr, entfällt.
- [ ] **P01 (offen, Kilian):** Ereignis-Teilprozess heißt „Verwerfung Verarbeiten“ → „Verwerfung verarbeiten“ (klein), PNG neu; danach Doku-Abbildung 2 tauschen.
- [x] **Alle zehn Dateien** im Modeler geprüft und gespeichert, PNGs neu exportiert, bpmnlint 0 Befunde.
- [x] **Schreibweise der Datenobjekte:** überall mit Bindestrich wie Doku 3.1 („Reparatur-auftrag“); die weichen Trennzeichen in P03–P05 sehen im Bild gleich aus und bleiben.
- [x] **Kennzahlen neu gezählt (25.10.):** unverändert, nichts nachzuziehen; `1_bpmn/README.md` mit Stand 25.10.
- [ ] **Doku Abb. 2** (P01) nach dem P01-Fix tauschen; Abb. 3 (P04) ist am 25.10. getauscht.

### Visual Paradigm

Ablauf: Teamwork Update, ändern, Commit; PNG (220 dpi, ohne Legende) und VPP neu exportieren (Anleitung `2_uml/README.md`), dann Doku-Abbildungen 4–7 tauschen. Stand 24.10.: SD2 hat den Pfad „freigegeben, aber nicht alle Teile beschaffbar“ (opt mit Ablehnung, Benachrichtigung und UC15), `Reparaturauftrag.benachrichtigeKunde()` ist entfernt, alles exportiert und committet.

- [x] **SDs gegen die BPMN-Änderungen vom 25.10. geprüft:** keine Fachlogik geändert. SD4 verweist schon auf UC15 (BPMN 08) für fertig und abgelehnt; SD3 zeigt den Normalfall nach KVA-Freigabe und bleibt gültig.
- [ ] **Optional:** ref-Beschriftungen vereinheitlichen (Verweise auf vorhandene SDs zeigen „sqd: UC09 …“, die übrigen sind Textfelder im ref-Rahmen, z. B. SD4 „UC13 Reparaturschritt und Arbeitszeit erfassen“ ohne BPMN-Nummer).
- [ ] **Gruppenentscheidung:** weitere ungenutzte Operationen streichen (Rollen-Operationen von Servicemitarbeiter, Techniker, Disponent, `KundenApp.meldeMangel()`, `Lieferant.bestaetigeBestellung()`). Doku 5.4 sagt, die Rollenklassen tragen die Operationen der Rollen; bei Streichung dort anpassen.

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
- [ ] **Abbildungen 4–7** erneut tauschen, falls sich VP-Diagramme noch ändern (Seitenverhältnis vom neuen Bild übernehmen).
- [ ] **Inhaltsverzeichnis** ganz am Ende in Word gegen das PDF prüfen (statisch; am 24.10. in LibreOffice korrigiert: 5.4 → 13, 6 → 17, 7 und 7.1 → 18).

### Präsentation

- [x] Folie 16 „Zwei Prüfprogramme: 0 Fehler“: gemeint sind Camunda-Linter (bpmnlint) und das Problems-Panel des Modelers (Doku Tabelle 2 und 3.1); bei Bedarf auf der Folie nennen.
- [x] Folien 16 und 17 sagen zweimal „gleiche Namen“ und „keine Fehler im Modeler“; auf Folie 17 dafür Lernerfahrungen aus Doku Kapitel 6 (Pools und Lanes, „KVA-Position“ statt `KvaPosition`).
- [x] Foliennummern im Master einschalten (Folie 21 verweist auf Nummern).
- [x] Folie 20 „digitaler Zustandsautomat“ wird nicht erklärt.
- [x] Folien 6 und 7 („Auftragsreise“): gewollt, Folie 7 ist die Fortsetzung.
- [ ] Optional: Backup-Folien mit Use-Case-, Klassen- und Sequenzdiagramm für Fragen.

### Arbeitslisten und Abgabe

- [ ] `0_abgabe/KI-Angabe-Moodle.md`: noch Entwurf, jede Person ergänzt ihre Werkzeuge.
- [ ] Abgabepaket nach `0_abgabe/README.md`: Doku-PDF, BPMN-ZIP (umbenannte `.bpmn`), VPP (nach dem letzten VP-Export), Präsentations-PDF mit Folie 21 (Zuordnung), dann `Fallstudie-WWI25B4-Gruppe1.zip`. Jede Person lädt selbst hoch.

---

## C. Optional

- [ ] Doku: Klassennamen in Code-Schrift (Zeichenformat „Code“), damit `Werkstattoberflaeche` als Name erkennbar ist.
- [ ] Doku: kleine Tabelle „Fristen und Grenzen“ in 5.1 (Lagergebühr nach der dritten Abholerinnerung fehlt in 5.6).
- [ ] Doku: eine Zeile Quellenverweis auf die Vorlesung (3.1 und 5.1 beziehen sich darauf).
- [ ] Sprechtext: „KVA in 60 Sekunden“ als Zielwert bezeichnen; Adrian „Das ist keine Schwäche, das war eine bewusste Entscheidung“ und „von jeder anderen Werkstattsoftware“ abschwächen.
- [ ] Mockup Schritt 8 zeigt 6 von 9 Zuständen und „KVA freigegeben“ statt „freigegeben“.

---

## E. Offene Gruppenentscheidungen

1. Inhaltliche Doku-Punkte aus Abschnitt B (Beitragsliste, Problem-Zuordnung, Begründungen, Geschäftsmodell).
2. Backup-Folien mit Diagrammen ja/nein.
3. Weitere ungenutzte Operationen im Klassendiagramm streichen ja/nein.

Bereits entschieden, bleibt so: Datenobjekte mit Bindestrich („Reparatur-auftrag“), Datumsangaben in der Doku, Format der Abbildungen 2–5, Entscheidungslog-Verweise, Klasse für den KI-Diagnosedienst, Kopf-Redezeiten im Sprechtext, Maximilians Texte, keine Zeitangaben bei Maximilians Folien, kein Sprechtext in den PPTX-Notizen.

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
