# Aufgaben bis zur Abgabe

Stand: 24.10.2026, nach PR #60 (P02–P05 von Adrian) und der Überarbeitung vom 24.10. Die Liste enthält nur offene Aufgaben, ohne Namen. Wer eine Aufgabe übernimmt, schreibt den Namen in Klammern dahinter und hakt sie nach Erledigung ab (`- [x]`). Sie ersetzt die alte TODO-Liste vom 22.10.; der Prüfbericht vom 22.10. (`5_team/pruefbericht-2026-10-22.md`) ist bis auf die unten übernommenen Punkte abgearbeitet.

Termine: Präsentation **27.10.2026, 09:00 Uhr, Raum B458**. Abgabe **13.11.2026, 23:59 Uhr** über Moodle.

Grundregeln: Jede Änderung über Branch und Pull Request, vorher `git pull`. Wer an Word- oder PowerPoint-Dateien arbeitet, sagt vorher in der WhatsApp-Gruppe Bescheid, weil diese Dateien nicht zusammengeführt werden können. Der Sprechtext steht nur in `4_praesentation/Sprechtext_Abschlusspraesentation.docx`, nicht in den Notizen der PPTX.

## Stand der Artefakte

- **BPMN:** P01 und P06–P10 Stand 22.10., P02–P05 überarbeitet (PR #60). Zählung des aktuellen `1_bpmn/` (Aktivitäten = Tasks, Call Activities und Teilprozess im Werkstatt-Pool; automatisiert = Service, Script, Business Rule, Send, Receive; `zeebe:userTask` nicht doppelt zählen): **143 Aktivitäten (Ø 14,3), 89 automatisiert = 62 %, 34 User Tasks, 9 Manual Tasks, 10 Call Activities und 1 Teilprozess, 28 Kundenaktivitäten, 48 Nachrichtenflüsse, 58 Datenobjekte, 14 Datenspeicher.** Je Diagramm (Aktivitäten/automatisiert): 01 14/14, 02 16/7, 03 13/6, 04 12/8, 05 16/12, 06 17/11, 07 13/6, 08 17/11, 09 16/8, 10 9/6. Doku (5.1, 5.2, Tabelle 6), PPTX (Folien 12, 13, 21), Sprechtext Adrian und `1_bpmn/README.md` sind auf diesem Stand. Ändern sich Diagramme bei der BPMN-Prüfung, neu zählen.
- **UML:** Prüflisten-Punkte U1–U9, U11 und U12 sind in VP umgesetzt, zuletzt SD1 (`getBenoetigteTeile()`, `teil.getLagerbestaende()`, `res.vorreserviere()`), der SD5-Guard ohne doppelte Klammern, SD3 `reserviere()` für r und u, SD5 `new(r, kostenfrei)`. PNGs und VPP am 24.10. exportiert, Teamwork-Server committet.
- **Doku:** Fakten am 24.10. korrigiert (14-Tage-Nachfrist P06, Techniker-Satz 5.3, 14 Mitarbeiterrollen in 5.4, Tabelle 8 ohne Terminvorschlag, einheitlich „Service / Annahme“ und „Use Case“, Formatreste). Kennzahlen und Tabelle 6 auf dem Stand oben. Alle Abbildungen 1–7 stammen aus den aktuellen Exporten (Abb. 1 neu: Lieferant als Black Box, Lanes wie Tabelle 7). Inhaltsverzeichnis in LibreOffice geprüft.
- **Sprechtext:** ab Folie 5 überarbeitet (Dubletten, fehlende Überschrift, Foliennummern wie die PPTX vom 24.10., Adrians Fachfehler und Kennzahlen, Tippfehler, Nina Folie 19 gekürzt). Davids Teil (Folien 1–4) wird noch überarbeitet.
- **PPTX (Stand Maximilian, PR #62):** 21 Folien. Am 24.10. korrigiert: die ausgeblendeten Demo-Screens (bisher Folien 10–18) entfernt, es gibt nur die eine Demo-Folie 9; Foliennummern auf Folie 21 angepasst; Kennzahlen Folien 12, 13 und 21; Titel Folien 10/11 „KI-Sofortdiagnose“ statt „KI-Sofortanalyse“; Folie 14 Komma; Folie 16 „Jede Mitarbeiterrolle …“; Folie 19 „KI-gestützte“; Notizen der Folien 10–13 nur noch „Vortragende(r): Adrian“ (Folie 10 stand auf Maximilian, Folie 21 ordnet sie Adrian zu).
- **PDFs:** entstehen erst ganz am Ende.

---

## A. Vor der Präsentation am 27.10.

### Präsentation und Sprechtext

- [x] **Kennzahlen** (Stand 24.10., alle zehn BPMN-Dateien) sind überall eingetragen: Folien 12, 13 und 21, Doku 5.1/5.2, Tabelle 6, Sprechtext Adrian, `1_bpmn/README.md`. Ändert die BPMN-Prüfung noch Aktivitäten, wird einmal neu gezählt und an denselben Stellen nachgezogen.
- [ ] **Davids Teil im Sprechtext (Folien 1–4)** einfügen; dabei „Quelitätssicherung“ (Folie 1) korrigieren.
- [ ] **Rollen auf Folie 18 und im Sprechtext (Nina) angleichen:** Folie 18 sagt „David: Stellvertretung und UML“, „Kilian: Scrum Master und UML“, der Sprechtext „David die Stellvertretung und die Sicherungen“ und „Kilian Scrum Master“; Doku Tabelle 1 mitprüfen.
- [ ] **Sprecherzuteilung** in `5_team/02-team-und-rollen.md` an Folie 21 angleichen: David 1–4, Kilian 5 und 14–15, Maximilian 6–9, Adrian 10–13, Jakob 16–17, Nina 18–20, Folie 21 Anhang.
- [ ] **Demo (Folie 9):** `4_praesentation/mockup/index.html` vor Beginn in einem zweiten Fenster öffnen, Wechsel mit Alt+Tab üben, Demo auf höchstens 90 Sekunden begrenzen. Es gibt keine Backup-Folien mit Screenshots.
- [ ] **Generalprobe mit Stoppuhr.** Rechnerisch rund 19 Minuten reine Sprechzeit plus Demo, Ziel 15–20 Minuten. Größte Hebel: Nacherzählung der Demo (Folie 9), Beispiel auf Folie 10 (E-Bike/Batterie passt nicht zum Demo-Gerät Smartphone), Wiederholung des KI-Ablaufs auf den Folien 5, 6, 9, 10 und 20.
- [ ] **Optional, Maximilians Texte:** Modell-ID „T01_KI“ und „Konfidenz“ aus dem Demo-Text nehmen; Übergabe „Was technisch dahintersteckt, erklärt Adrian.“ passt nicht zu Adrians Folie, besser „Was davon heute geht, erklärt Adrian.“
- [ ] **Antworten auf mögliche Fragen bereitlegen** (Abschnitt F).

---

## B. Vor der Abgabe am 13.11.

### BPMN (Camunda Modeler)

Reihenfolge: erst prüfen und ändern, dann **einmal** zählen und überall nachziehen.

- [ ] **P02–P05 (PR #60) im Modeler prüfen:** Problems-Panel ohne Fehler, Beschriftungen, Datenobjekte. P02 „Gerät abgeben“ ist noch ein Send Task, gehört als Manual Task in den Kundenpool.
- [ ] **P07:** Call Activity „08 Abholung abwickeln“ im Pfad „abgelehnt“ (`T07_Abbruch → Merge_07z → End_07`) ergänzen. P03, P04 und P09 rufen 08 bei Ablehnung schon auf, Doku und SD4-Notiz sagen „Rückgabe immer über 08“. Kein SD betroffen, aber +1 Aktivität und elf Call Activities.
- [ ] **P08:** `T08_Holen`, `GW08_Faellig`, `Join_08a`, `T08_Uebergabe` liegen in der Lane Techniker; Tabelle 7 ordnet die Geräteausgabe Service / Annahme zu. Elemente verschieben. Gateways als Fragen („Wie wird abgerechnet?“, „Wie wurde gezahlt?“), auch im Kundenpool; Kantenbeschriftung „< 3 oder = 4“ verständlich machen.
- [ ] **P06:** Beschriftungen „Nachbestellvorschlä/ge“ und „Ersatzlieferun/g“: Elemente verbreitern, PNG neu.
- [ ] **P05 ↔ P09:** P05 startet mit „KVA freigegeben“, bei der Nacharbeit aus P09 gibt es keinen KVA; „Teileliste aus KVA übernehmen“ liest „Kostenvoranschlag [freigegeben]“. Start allgemeiner benennen (z. B. „Teilebedarf freigegeben“), dann Tabelle 6 Zeile 05, `1_bpmn/README.md` und Kurztext 5.1 nachziehen. Optional in SD5 ein ref „UC09 Ersatzteile disponieren (BPMN 05)“ vor dem Nacharbeit-ref.
- [ ] **P09:** Task „Gerät annehmen und Mangel dokumentieren“ auf ca. 150 px verbreitern (Symbol überdeckt Text), PNG neu.
- [ ] **P04:** „Erinnerung protokollieren“ → „Fristablauf protokollieren“ (läuft auch beim dritten Fristablauf). SD2 kann `protokolliereErinnerung()` behalten.
- [ ] **P01:** Kundenpool „Verwerfung der Voranmeldung“ als Ereignis benennen.
- [ ] **Alle zehn Dateien** im Modeler öffnen, Problems-Panel prüfen, speichern (setzt den Exporter; Doku 3.1 sagt „im Camunda Modeler erstellt“). PNGs neu exportieren.
- [ ] **Schreibweise der Datenobjekte** vereinheitlichen (Gruppenentscheidung, siehe E): P02–P05 von Adrian nutzen weiche Trennzeichen bzw. „Reparaturauftrag“, die übrigen „Reparatur-auftrag“. Danach Doku 3.1 und `2_uml/README.md` (Namensregel) anpassen.
- [ ] **Kennzahlen einmal zählen und nachziehen:** Doku 5.1 (Absatz 1), 5.2 (Absatz 1, „zehn rufen …“), Tabelle 6, `1_bpmn/README.md`, Folien 12, 13 und 21, Sprechtext Adrian, diese Datei.
- [ ] **Doku Abb. 2 und 3** (P01, P04) ersetzen, falls sich diese PNGs noch ändern.

### Visual Paradigm

Ablauf: Teamwork Update, ändern, Commit; PNG (220 dpi, ohne Legende) und VPP neu exportieren (Anleitung `2_uml/README.md`), dann Doku-Abbildungen 4–7 tauschen. Stand 24.10.: SD2 hat den Pfad „freigegeben, aber nicht alle Teile beschaffbar“ (opt mit Ablehnung, Benachrichtigung und UC15), `Reparaturauftrag.benachrichtigeKunde()` ist entfernt, alles exportiert und committet.

- [ ] **SDs nachziehen, falls BPMN-Änderungen die Fachlogik betreffen** (neuer Pfad, Frist, Status, Call Activity im SD-Ausschnitt). SD1 ↔ P01, SD2 ↔ P04, SD3 ↔ P05, SD4 ↔ P07, SD5 ↔ P09, SD6 ↔ P06. Umbenennungen, Lanes und Layout betreffen die SDs nicht.
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

### Präsentation, nach Rückmeldung aus dem 27.10.

- [ ] Folie 16 „Zwei Prüfprogramme: 0 Fehler“: gemeint sind Camunda-Linter (bpmnlint) und das Problems-Panel des Modelers (Doku Tabelle 2 und 3.1); bei Bedarf auf der Folie nennen.
- [ ] Folien 16 und 17 sagen zweimal „gleiche Namen“ und „keine Fehler im Modeler“; auf Folie 17 dafür Lernerfahrungen aus Doku Kapitel 6 (Pools und Lanes, „KVA-Position“ statt `KvaPosition`).
- [ ] Foliennummern im Master einschalten (Folie 21 verweist auf Nummern).
- [ ] Folie 20 „digitaler Zustandsautomat“ wird nicht erklärt.
- [ ] Folien 6 und 7 haben denselben Text („Auftragsreise“); prüfen, ob gewollt.
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

1. Schreibweise der Datenobjekte in allen zehn BPMN-Dateien („Reparatur-auftrag“ oder „Reparaturauftrag“/weiche Trennung).
2. Inhaltliche Doku-Punkte aus Abschnitt B (Beitragsliste, Problem-Zuordnung, Begründungen, Geschäftsmodell).
3. Backup-Folien mit Diagrammen ja/nein.
4. Weitere ungenutzte Operationen im Klassendiagramm streichen ja/nein.

Bereits entschieden, bleibt so: Datumsangaben in der Doku, Format der Abbildungen 2–5, Entscheidungslog-Verweise, Klasse für den KI-Diagnosedienst, Kopf-Redezeiten im Sprechtext, Maximilians Texte, keine Zeitangaben bei Maximilians Folien, kein Sprechtext in den PPTX-Notizen.

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
10. „Was passiert nach der zweiten gescheiterten Nacharbeit?“ Status abgelehnt, Rückgabe über P08; P07 ruft 08 noch nicht auf (siehe B), daher nicht selbst ansprechen.
11. „Warum eine Rolle je Use Case? Warum Komposition beim Befund, nicht beim Gerät? Was ist automatisiert, was nicht?“
