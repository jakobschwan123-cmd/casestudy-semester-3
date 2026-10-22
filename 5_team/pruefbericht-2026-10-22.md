# Prüfbericht RepairFlow – Stand 22.10.2026

Geprüft wurde der Stand auf `main` (Commit 686100f) im Ordner `SYAN/02.09.26`:

- **BPMN:** P01, P02 und P06–P10. P03–P05 sind ausgenommen, weil Adrian sie noch prüft.
- **UML:** Use-Case-Diagramm, Klassendiagramm und die sechs Sequenzdiagramme. Ich habe die PNG-Exporte angesehen und das VP-Modell direkt aus der `.vpp` ausgelesen: Klassen, Operationen, Botschaften und Lebenslinien.
- **Texte:** Doku, Präsentation und Sprechtext gegen die Diagramme.

Prioritäten:

- **Hoch:** sichtbarer Fehler oder Widerspruch zur Coaching-Vorgabe („wie kommt die UI an das Objekt“).
- **Mittel:** fachlich angreifbar, ein Dozent könnte nachfragen.
- **Niedrig:** Kosmetik oder Feinschliff.

---

## Kurzfazit

- **BPMN P01, P02, P06–P10:**
  - bpmnlint (`recommended` + Camunda 8.7) meldet für alle sieben Dateien 0 Befunde.
  - Strukturell geprüft, ohne Fehler: jeder Knoten hat Ein- und Ausgang, jede Ebene ein Start und ein Ende, alle XOR-Splits tragen eine Frage und beschriftete Kanten, alle Datenobjekte entsprechen Klassen, jede Aktivität liegt in genau einer Lane.
  - Ablauf und Fristen passen zu den Prozesstexten in Doku 5.1 und zu 5.6. Nachgerechnet: Verwertung nach der vierten Erinnerung, Inkasso nach der dritten Mahnung, Storno nach zwei Liefermahnungen.
  - **Einziger echter Fehler:** Der PNG-Export von P06 ist kaputt (siehe H1).
- **Klassendiagramm:**
  - Zahlen bestätigt: 29 Klassen, 7 Aufzählungen, 40 Assoziationen, 6 Generalisierungen.
  - Jede Botschaft in den SDs, die mit einer Operation verknüpft ist, gehört zur Klasse des Empfängers. Es gibt keine verwaisten Botschaften im Modell.
- **Sequenzdiagramme:** Das Muster Akteur → Oberfläche → Suche über Werkstattbetrieb (bzw. `:Kunde`) → Objekt ist in SD2, SD4, SD5 und SD6 sauber umgesetzt. Lücken gibt es in **SD3** und **SD1** (H2, H3) und eine kleine in SD5 (M1).
- **Doku, Präsentation und Sprechtext:**
  - Zahlen und Aussagen stimmen mit den Diagrammen überein, Notizen und Word-Sprechtext sind wortgleich.
  - Offen ist eine Formulierung auf Folie 13 (M4) und die Abhängigkeit der Kennzahlen von Adrians P03–P05 (H4).

---

## Hoch

### H1 – PNG von P06 ist beschädigt

- **Befund:** `1_bpmn/p06-ersatzteilbestellung.png` (18720 × 4545 px):
  - Ab etwa x = 15500 beginnt rechts noch einmal der Anfang des Diagramms (zweiter Startknoten „Bestellbedarf gemeldet“, zweite Lane „Werkstattleitung“).
  - Unterhalb von y ≈ 3450 ist das Bild leer. Die Lane „Service / Annahme“ mit „Kunde über Verzögerung informieren“ und der Kundenpool sind abgeschnitten.
- **Warum:** Laut `1_bpmn/README.md` ist das PNG der Bildexport für Doku und Präsentation. Wer es öffnet, sieht ein falsches Diagramm. Die `.bpmn`-Datei selbst ist in Ordnung (Lint ohne Befund).
- **Vorschlag:** P06 im Camunda Modeler öffnen und neu als PNG exportieren. Das passt zur Modeler-Prüfung von Maximilian. P07–P10 sind korrekt exportiert.

### H2 – SD3: Die Oberfläche greift auf `:ErsatzteilReservierung` und die Lagerbestände zu, ohne dass sichtbar ist, woher sie diese Objekte hat

- **Befund (UC09):**
  - `eigen : Lagerbestand`, `andere : Lagerbestand` und `: ErsatzteilReservierung` sind einfach da. Es gibt keine Suche und kein `get…()`, und die Reservierung wird nicht erzeugt.
  - Botschaft 9 (`reserviere()` im opt „Vorreservierung vorhanden“) und die Botschaften 12/15 (`reserviere()` in den alt-Zweigen) gehen an dieselbe anonyme Lebenslinie. Bei 12/15 entsteht fachlich aber eine **neue** Reservierung.
- **Warum:** Genau das war der Hinweis aus dem Coaching: Es muss überall erkennbar sein, wie die UI an das Objekt kommt. SD3 ist zudem als Abbildung 7 in der Doku abgebildet.
- **Vorschlag (VP):**
  1. Nach `getPositionen()` je Position das Ersatzteil bzw. den Lagerbestand holen, zum Beispiel `sucheErsatzteil(artikelnummer)` am Werkstattbetrieb (wie in SD6) und danach den Lagerbestand der Filiale. Alternativ eine Operation wie `Ersatzteil.getLagerbestand(filiale)` ergänzen.
  2. Im opt-Zweig die vorhandene Vorreservierung holen, zum Beispiel über `a.getReservierungen()` oder die Voranmeldung, und dann `reserviere()` aufrufen.
  3. In den alt-Zweigen 12/15 die Reservierung als **create**-Botschaft erzeugen (`new(teil, menge)` an eine neue Lebenslinie `r : ErsatzteilReservierung`), dann `reserviere()`.
  4. Danach Abbildung 7 in der Doku neu einsetzen.

### H3 – SD1: Die Vorreservierung umgeht die Klasse ErsatzteilReservierung

- **Befund (UC01, Botschaft 18):** `:Voranmeldung → :Lagerbestand.reserviere(anzahl)`.
  - Im Klassendiagramm gibt es dafür `ErsatzteilReservierung.vorreserviere()` (wird nirgends benutzt) und die Assoziation „vorreserviert für“ zur Voranmeldung.
  - Die Doku sagt in 5.4: „ErsatzteilReservierung … hängt bei der Sofortdiagnose an einer Voranmeldung“, ReservierungStatus enthält VORRESERVIERT.
- **Warum:** Das SD widerspricht damit Klassendiagramm und Doku. SD1 ist Abbildung 6 der Doku.
- **Vorschlag:** In SD1 nach `bestaetigen()` eine create-Botschaft `new(teil, menge)` an `: ErsatzteilReservierung` setzen, dann `vorreserviere()` und darin `Lagerbestand.reserviere(anzahl)`. Danach Abbildung 6 neu einsetzen.

### H4 – Kennzahlen hängen an P03–P05

- **Befund:** Diese Werte enthalten P03–P05 mit dem heutigen Stand:
  - 136 Aktivitäten, Ø 13,6, 84 automatisiert = 62 %, 27 Kundenaktivitäten, 45 Nachrichtenflüsse, 53 Datenobjekte.
  - Tabelle 6, Zeilen 03–05.
  - Abbildung 3 (P04).
- **Warum:** Wenn Adrian dort Aktivitäten ändert, stimmen Doku 5.1/5.2, Tabelle 6, Abbildung 3, Folien 10/11 und Adrians Sprechtext nicht mehr.
- **Vorschlag:** Nach Adrians Abschluss neu zählen lassen (kurz Bescheid geben) und die genannten Stellen nachziehen. Das geht in wenigen Minuten.

---

## Mittel

### M1 – SD5: „meldeMangel“ endet in der KundenApp

- **Befund (UC16, Botschaft 1):** `Kunde → :KundenApp.meldeMangel(beschreibung)`. Danach macht die KundenApp nichts. Die Reklamation entsteht erst durch den Reklamationsbearbeiter (5/6).
- **Warum:** Ausgerechnet hier kommt die UI bei keinem Objekt an. In P09 startet die Mangelmeldung aus der App aber den Prozess.
- **Vorschlag:** Entweder Botschaft 1 streichen, weil die Mangelmeldung in P09 ohnehin vor dem SD liegt, oder die KundenApp sucht über `:Kunde.sucheAuftrag(auftragsnummer)` den Auftrag und legt eine Mangelmeldung an.

### M2 – SD5: Notiz ist veraltet

- **Befund:** „erfasseReklamation() des Servicemitarbeiters erzeugt das Objekt“. Tatsächlich erzeugt `: Werkstattoberflaeche` das Objekt (Botschaft 6).
- **Vorschlag:** Text ändern in „erfasseReklamation() der Werkstattoberfläche erzeugt das Objekt“ oder die Notiz löschen.

### M3 – SD2 und SD1: uneinheitliche Notation der create-Botschaften

- **Befund:**
  - SD2, SD5 und SD6 erzeugen Objekte mit `new(…)`.
  - SD1 benutzt Operationsnamen als create-Botschaft: `erstellen(…)` an `:Voranmeldung`, `auswerten(medien)` an `:KIDiagnosevorschlag` und **`berechneSumme()` an `:Kostenvoranschlag`**.
  - Gerade der letzte Fall ist fachlich schief: Eine Summe zu berechnen erzeugt kein Objekt.
- **Vorschlag:** In SD1 Botschaft 13 als `new(status = VORLAEUFIG)` beschriften (KvaStatus hat VORLAEUFIG) und danach `berechneSumme()` als normale Botschaft. Optional 2 und 9 ebenfalls als `new(…)`.

### M4 – Folie 13, Sprechtext: „nie direkt mit den Fachobjekten“

- **Befund:** Der Sprechtext sagt, die Mitarbeiter arbeiten „wie der Kunde nie direkt mit den Fachobjekten, sondern über zwei Oberflächenklassen“. In SD6 ruft aber `: Werkstattleiter` direkt `Lieferantenbestellung.freigeben()` auf (Botschaft 10), in SD5 entscheidet er die Reklamation als Objekt.
- **Warum:** Doku 5.5 erklärt die Ausnahme („der Werkstattleiter, der dort keine Rolle hat, erscheint als Objekt seiner Klasse“). Folie und Sprechtext sagen dagegen „nie“. Bei einer Rückfrage wirkt das widersprüchlich.
- **Vorschlag:** Im Sprechtext „die Rollen aus dem Use-Case-Diagramm arbeiten wie der Kunde nie direkt …“ statt „die Mitarbeiter“. Zur Begründung bereithalten: Die Freigabe durch den Werkstattleiter ist eine Operation seiner Klasse, kein eigener Use Case.

### M5 – SD2: Fristablauf als Aktion des Kunden dargestellt

- **Befund:** Der zweite alt-Zweig heißt „[Ablehnung erhalten oder dritter Fristablauf]“. Darin steht `Kunde → lehneKvaAb(grund)`. Beim Fristablauf handelt der Kunde aber gerade nicht.
- **Vorschlag:** Guard auf „[Ablehnung erhalten]“ kürzen und den Fristablauf als eigenen Zweig darstellen: `: Werkstattoberflaeche → kva.ablehnen()` bzw. `wechsleStatus(ABGELEHNT)`. Oder einen kurzen Hinweis in den Guard schreiben, dass dann das System `ablehnen()` aufruft.

### M6 – SD1: Ablehnung durch den Kunden fehlt nach der Überarbeitung von P01

- **Befund:** In P01 kann der Kunde die Voranmeldung jetzt aktiv ablehnen. In SD1 ruft der zweite alt-Zweig „[Ablehnung oder 7 Tage ohne Antwort]“ nur `verwerfen()` auf, ohne Botschaft vom Kunden über die KundenApp.
- **Vorschlag:** Im Zweig `Kunde → :KundenApp.lehneVoranmeldungAb()` → `:Voranmeldung.verwerfen()`. Die Operation `lehneVoranmeldungAb()` in der KundenApp neu anlegen. Den Hinweis auf Nachbestellung aus P01 („Alle Teile vorreserviert? nein“) kann man als opt ergänzen, das ist aber nicht nötig.

### M7 – P02: Übergabe am Tresen als Send Task

- **Befund:** Im Kundenpool von P02 ist „Gerät abgeben und Auftrag erteilen“ ein **Send Task**.
- **Warum:** In P08/P09 sind solche Übergaben bewusst **Manual Tasks**, mit der Regel „Send Task = Nachricht über RepairFlow“. P02 ist der einzige Prozess, der davon abweicht. Der Nachrichtenfluss „Gerät + Auftragswunsch“ zum Startereignis kann bleiben.
- **Vorschlag:** Den Typ im Modeler auf Manual Task ändern. Die Kennzahlen ändern sich dadurch nicht, weil es nur der Typ einer Kundenaktivität ist.

### M8 – Rollenklassen tragen Operationen, die kein SD mehr benutzt

- **Befund:**
  - Servicemitarbeiter, Techniker und Disponent haben zusammen 15 Operationen (zum Beispiel `versendeKva`, `erstelleKva`, `erfasseReklamation`), die nach dem UI-Umbau in keinem SD mehr vorkommen.
  - Mehrere davon existieren doppelt auch in der Werkstattoberflaeche.
  - Zusätzlich gibt es noch `Reparaturauftrag.benachrichtigeKunde()`, obwohl die SDs einheitlich `KundenApp.benachrichtige()` verwenden.
- **Warum:** Die Doku begründet die Rollen-Operationen („tragen die Operationen dieser Rollen“). Der Dozent könnte fragen, wozu dieselbe Operation an zwei Stellen steht.
- **Vorschlag:** Mindestens `Reparaturauftrag.benachrichtigeKunde()` entfernen, weil sie durch die Vereinheitlichung überflüssig ist. Für die Rollenklassen eine Antwort bereithalten: Die Rollen-Operation beschreibt die Zuständigkeit bzw. Berechtigung, die Oberfläche die Bedienaktion. Wenn Zeit ist, die Doppelungen in den Rollenklassen streichen. Dann ändert sich die Doku-Aussage in 5.4 („tragen die Operationen dieser Rollen“).

---

## Niedrig

| Nr. | Wo | Befund | Vorschlag |
|---|---|---|---|
| N1 | SD5 | Der `ref`-Rahmen „UC13 / UC14 Nacharbeit durchführen“ überdeckt die create-Botschaft 26 `new()` und den Kopf `nacharbeit : Reparaturauftrag`. | Den ref-Rahmen unter die create-Botschaft schieben, neu exportieren. |
| N2 | SD2 | Der `ref`-Rahmen „sqd: UC09 …“ und Botschaft 29 `anzeigenErgebnis()` liegen übereinander, die Lebenslinie des Kalkulators läuft durch den ref-Text. | Ref-Rahmen etwas nach rechts unten schieben. |
| N3 | SD2, SD6 (VP) | Botschaften `wechsleStatus(FREIGEGEBEN)`, `wechsleStatus(ABGELEHNT)` (SD2) und `mahne()` (SD6) sind im Modell nur als Text beschriftet, nicht mit der Operation verknüpft. Im Bild sieht man keinen Unterschied, beim Öffnen des VP-Projekts schon. | In VP die Botschaft öffnen und die Operation `Reparaturauftrag.wechsleStatus` bzw. `Lieferantenbestellung.mahne` auswählen, Argument eintragen. |
| N4 | SD5 | Antwort 14 heißt „Nacharbeit freigeben“ (Befehl statt Ergebnis). | z. B. „freigegeben“. |
| N5 | SD6 | Antwort 5 „Lieferant“ ist großgeschrieben, alle anderen Rückgaben heißen wie Objekte (a, b, kva, r, teil). | „lieferant“. |
| N6 | SD6 | Unter Botschaft 33 ist etwa ein Fünftel des Bildes leer. | Lebenslinien in VP kürzen, neu exportieren. |
| N7 | P01 | Der Ereignis-Teilprozess im Kundenpool heißt „Verwerfung der Voranmeldung“ (Substantiv), alle anderen Aktivitäten folgen Verb + Objekt. | z. B. „Verwerfung verarbeiten“ oder so lassen, weil er nur aus Start und Ende besteht. |
| N8 | P09 | Die Pfeilspitze des Nachrichtenflusses „Gerät“ überdeckt den Anfang der Beschriftung „Gerät annehmen und Mangel dokumentieren“ (liest sich als „‘uerät …“). | Andockpunkt des Nachrichtenflusses verschieben, PNG neu exportieren. |
| N9 | P08 | Gateway-Beschriftung „< 3 oder = 4“ ist korrekt (Verwertung nach der 4. Erinnerung), aber schwer lesbar. | z. B. „1., 2. oder 4. Frist“ / „3. Frist“ / „5. Frist“. |
| N10 | Use-Case-Diagramm | „Wareneingang buchen“ wird von „Retoure abwickeln“ erweitert. Nach der Änderung in P06 wird mangelhafte Ware aber gar nicht mehr gebucht, die Retoure zweigt bei der Prüfung ab. | UC11 in „Wareneingang prüfen und buchen“ umbenennen (dann auch Tabelle 7/9, Doku 5.3 und Folie 12 anpassen) oder so lassen und bei Nachfrage erklären. |
| N11 | Use-Case-Diagramm | Die Linien von Werkstattplaner, Wareneingang und „Voranmeldung bestätigen“ beginnen sichtbar neben dem Akteur. | Linien an den Akteur andocken, neu exportieren (das PNG ist vom 19.10.). |
| N12 | Doku Abb. 6 | Eingebettet ist noch der vorletzte SD1-Export (nur minimale Darstellungsunterschiede zum aktuellen PNG). | Erledigt sich mit H3, sonst beim Neu-Einsetzen mitnehmen. |
| N13 | Doku Abb. 1 | Der Systemkontext ist in niedrigerer Auflösung eingebettet (1422 px) als `3_doku/systemkontext/systemkontext.png` (2520 px). | Vor dem PDF-Export das größere PNG einsetzen, sieht im Druck schärfer aus. |
| N14 | Folie 7 | „Je Teil läuft parallel eine Prüfung“. SD3 zeigt eine Schleife (`loop`). Ob P05 parallel oder sequenziell ist, klärt Adrians Prüfung. | Wenn P05 sequenziell ist, „parallel“ streichen. |
| N15 | `2_uml/` | `sequenz-06-nachbestellvorschlag.png` enthält UC10 Lieferantenbestellung. Steht so im README, der Dateiname führt aber in die Irre. | Optional umbenennen in `sequenz-06-lieferantenbestellung.png` (README und Verweise anpassen). |

---

## Ohne Befund geprüft

- **BPMN P01, P02, P06–P10:**
  - bpmnlint ohne Befund.
  - Zeitüberschreitungen nur über ereignisbasierte Gateways (keine angehefteten Ereignisse).
  - Datenobjekte und Zustände in eckigen Klammern entsprechen den Klassen und Aufzählungen (AuftragStatus, KvaStatus, BestellStatus, ReservierungStatus, ZahlungStatus).
  - Kundenpools enden immer, P09 wartet nach der Angebotsantwort korrekt weiter auf Nacharbeit oder Absage.
- **P01 (Adrian):** Vorreservierung erst nach Bestätigung, Verwerfung mit Hinweis an den Kunden nur bei Fristablauf, Ereignis-Teilprozess im Kundenpool unterbricht korrekt.
- **Use-Case-Diagramm:** 19 Use Cases, 17 Akteure, 2 include, 6 extend. Jeder Use Case außer UC08 hat genau eine Rolle (UC08 nur über include, so beschrieben in 5.3).
- **Klassendiagramm:** Zahlen wie in Doku und Folien. KundenApp, Werkstattoberflaeche und die Suchoperationen am Werkstattbetrieb und an `Kunde` sind vorhanden und werden genutzt.
- **SD4 und SD6:** vollständig nach dem Muster mit erneuter Suche nach Nacharbeit bzw. Wartezeit. SD6 nutzt Lost und Found Messages wie in 5.5 beschrieben.
- **Doku:**
  - Prozesstexte 01, 02 und 06–10 passen zu den BPMN-Dateien.
  - Tabelle 8 (Kurzbeschreibung der SDs) passt zu den Diagrammen.
  - Abbildungen 2–5 und 7 entsprechen den aktuellen PNGs.
  - 21 Seiten.
- **Präsentation und Sprechtext:**
  - Notizen und Word-Datei wortgleich, Redezeit 18:40.
  - Kennzahlen identisch mit der Doku.
  - Statuswerte im Demo-Mockup entsprechen AuftragStatus.

## Empfohlene Reihenfolge

1. **H1** P06 neu exportieren (Maximilian, zusammen mit der Modeler-Prüfung).
2. **H2, H3, M3, M5, M6, M1, M2, N1–N6** in VP in einem Durchgang. Danach SD-PNGs neu exportieren und Abbildungen 6 und 7 in der Doku ersetzen (Kilian, ca. 45–60 min).
3. **H4** Kennzahlen nach Adrians P03–P05 nachziehen.
4. **M4** einen Satz im Sprechtext Folie 13 ändern (Notiz und Word).
5. **M7, N7–N9** bei der Modeler-Prüfung mitnehmen.
6. **M8, N10, N15** nur nach Absprache in der Gruppe.
