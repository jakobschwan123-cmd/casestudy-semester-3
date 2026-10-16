# Konsistenzcheck 15.10.2026 (Stand main `fd0f5dc`)

Geprüft von Kilian mit KI-Unterstützung: `3_doku/Projektdokumentation.docx` (Stand Nina, 15.10.) gegen die zehn BPMN-Dateien (Stand E-27), das UML-Modell (`2_uml/`, Stand E-28), die Präsentation (E-25) und den Ablauf der Fallstudie. Zahlen sind aus den Dateien gezählt, nicht abgeschrieben.

## Was passt

- BPMN: alle zehn Dateien haben genau ein Start- und ein Endereignis je Prozessebene, Pool „Werkstattbetrieb" mit den vier Lanes, Kunde mit eigenem Ablauf in 01–09, Lieferant als Black Box in 06 und 10, Aufrufe 04→05, 05→06, 07→05, 09→07/10/08, 03/04→08. Timer und Fristen (3 Tage KVA, dritte Frist, zwei Mahnungen, 14 Tage Abholung, dritte Mahnung → Inkasso, 5 Tage Retoure) entsprechen den Texten in Doku 5.1 und auf Folie 10.
- Datenobjekte tragen Klassennamen, ihre Zustände sind Werte der Aufzählungen (AuftragStatus, KvaStatus, ReservierungStatus, BestellStatus, ZahlungStatus). Die neun Auftragszustände in Doku 2.4, Klassendiagramm, Zustandsdiagramm und Folie 6 sind identisch.
- Tabelle 6: Auslöser, Ergebnisse und Pools stimmen; acht von zehn Zeilen haben die richtigen Aktivitätszahlen.
- UML: 19 Use Cases, 17 Akteure (Kunde 3×, 15 Rollen, KI-Diagnosedienst), 2 include, 6 extend mit Bedingung; 27 Klassen, 7 Aufzählungen, 36 Assoziationen (davon 8 Kompositionen), 6 Generalisierungen. Tabelle 7 (Rolle → Klasse → Lane) stimmt mit den Lanes in den BPMN-Dateien überein. Tabelle 9 (Prozess → UC → Klassen → SD) stimmt.
- Sequenzdiagramme: alle Botschaften an Objekte sind Operationen der Klasse (nach der Korrektur in SD5, siehe unten).
- Präsentation: Folie 2, Folie 18 und Sprechernotizen sind untereinander konsistent (Nina 1–2, 16–17; David 3, 6, 11; Adrian 4, 5, 7; Maximilian 8–10; Kilian 12–13; Jakob 14–15).
- Ablauf: Dateinamen in Tabelle 5, Titelseite (Kurs, Gruppe, Projektname, alle Namen), Kapitelstruktur 1–7, Ø 13,3 Aktivitäten (gefordert ≈ 10), 19 UC (≥ 10), 27 Klassen (≥ 10), 6 SD (≥ 5), Pflichtangabe der Vortragenden auf Folie 18.

## Falsch oder veraltet (gibt Abzug, wenn es so bleibt)

| Nr | Stelle | Ist | Soll | Wer |
|---|---|---|---|---|
| 1 | Doku Kap. 1, Beitragsliste | Folien 1–2/18–19 (Nina), 3/12/15 (David), 4–6/11 (Adrian), 13/14/16 (Kilian), 7/9/10 (Maximilian), 8/17 (Jakob) – altes 19-Folien-Schema | Nina 1–2, 16–17; David 3, 6, 11; Adrian 4, 5, 7; Maximilian 8–10; Kilian 12, 13; Jakob 14, 15 (wie Folie 2/18 und `02-team-und-rollen.md`) | Nina |
| 2 | Doku 5.1 Absatz 1, Tabelle 6, 5.2 | 131 Aktivitäten, Ø 13,1, 41 Nachrichtenflüsse, 48 Datenobjekte; P05 14/11 (79 %), P06 14/8 (57 %); 79 automatisiert (60 %) | 133, Ø 13,3, 42, 51 Datenobjekte, 12 Datenspeicher; P05 15/12 (80 %), P06 15/9 (60 %); 81 automatisiert (61 %). Rest von 5.2 (33 Benutzer, 9 manuell, 9 Aufrufe, 1 Teilprozess) stimmt | Nina (Zahlen von Maximilian bestätigen lassen) |
| 3 | Folie 8, 9 und Sprechtexte 8/9 | 131 Aktivitäten, 13,1, 60 %, 18 Rollen und Akteure, 41/48/12 | 133, 13,3, 61 %, 17 Rollen und Akteure, 42/51/12 | Maximilian (`tools/pres.js`, `tools/sprechtext.py`) |
| 4 | Doku 5.3 Absatz 1, Tabelle 7, 7.1 | „18 Akteure … Lieferant und KI-Diagnosedienst", „Kunde und Lieferant sind mehrfach dargestellt", Tabellenzeile „Lieferant (extern)" | 17 Akteure, Lieferant ist Black Box ohne Akteur (E-24), Zeile löschen, Dozentenhinweis in 7.1 ergänzen (Text steht in TODO D) | Nina |
| 5 | Folie 11 und Sprechtext 11 | „extern: Lieferant", „zwei externe Akteure, der Lieferant und der KI-Diagnosedienst" | „Lieferant: Black Box, kein Akteur"; ein externer Akteur (KI-Diagnosedienst) | Maximilian |
| 6 | Doku 5.5 Absatz 1 und Tabelle 8 (SD3) | „parallele Prüfungen (par)"; SD3 „Parallele Prüfung je Teil" | Fragmente alt, opt, loop, break, ref; SD3 „Prüfung je Teil in einer Schleife: eigener Bestand, andere Filiale oder Fehlteil; Vorreservierung aus der Sofortdiagnose; Meldebestand; Fehlteile → UC10" (E-28) | Nina |
| 7 | Doku 3.2 Absatz 2 (neu seit 15.10.) | „In Sprint 1 haben wir die Diagramme (E-15 bis E-20) im Zweierteam erstellt" | E-15 bis E-20 sind die Korrekturen aus den Prüfrunden am 26.09. und 05.10. (so steht es in Tabelle 3, Sprint 2). Vorschlag: „In Sprint 1 haben wir die Diagramme im Zweierteam erstellt und geprüft. Die Gesamtprüfung am 26.09.2026 und der Komplettcheck am 05.10.2026 ergaben fachliche Korrekturen (E-15 bis E-20), die wir gegenseitig überarbeitet haben." | Nina |
| 8 | Doku 4.3 | „Entscheidungslog (E-01 bis E-22)" | E-01 bis E-28 | Nina |
| 9 | SD5-Vorlage | `erfasseReklamation(a, grund)` und `entscheideReklamation(r)` als Botschaften an das Objekt Reklamation – das sind Operationen von Servicemitarbeiter bzw. Werkstattleiter, verstößt gegen „Botschaft = Operation der Klasse" (Doku 3.2) | Erzeugung als `new(auftrag, grund)` mit Notiz, Freigabe als Antwort Werkstattleiter → Diagnostiker. Vorlage korrigiert (dieser Branch) | David zeichnet nach der neuen Vorlage |
| 10 | SD2- und SD5-Vorlage | Erste Lebenslinie war Kalkulator (SD2) bzw. Kunde (SD5); Doku 5.5 und E-28 sagen „Erste Lebenslinie ist die Rolle des Use Case" | Kunde zuerst in SD2, Reklamationsbearbeiter zuerst in SD5. Vorlagen korrigiert (dieser Branch) | David |

## Überarbeiten (kein Fehler, aber vor der Abgabe)

| Nr | Stelle | Was | Wer |
|---|---|---|---|
| 11 | Doku Abb. 2–7 | Sechs gelbe Platzhalter statt Bilder. Abb. 2/3 aus `1_bpmn/p01-sofortdiagnose.png` und `p04-kostenvoranschlag.png`, Abb. 4 aus `2_uml/usecase-diagramm.png` (liegt auf main), Abb. 5 Klassendiagramm und Abb. 7 SD3 (David, VP-Export), Abb. 6 SD1 (Kilian, VP-Export) | Nina, David, Kilian |
| 12 | Doku 3.1 und Tabelle 2 Schritt 4 | Zwei gelbe Hinweise („Nach dem 15.10. ergänzen", „Nach Fertigstellung prüfen") | Maximilian meldet Ergebnis der Modeler-Prüfung, Nina trägt ein |
| 13 | Doku 5.6 letzter Absatz, Tabelle 3 Sprint 4 | Gelbe Hinweise (Bestätigung E-19/E-20/E-22, Ergebnis 22.10.) | Gruppe am 22.10., Nina |
| 14 | Doku Kap. 1, Tabelle 1 vs. Liste | Tabelle 1 sagt „Redaktion der Projektdokumentation (Kapitel 1, 4 und 7 …)", die Liste „Redaktion der gesamten Projektdokumentation" | Einheitlich „Redaktion der gesamten Projektdokumentation"; Kapitelangaben in Klammern lassen | Nina |
| 15 | Doku Kap. 1, Beiträge | Fehleranalyse und Korrektur P01–P05 (E-26, Jakob) und Überarbeitung P06 (E-27, Adrian/Jakob) vom 15.10. fehlen in den Beitragslisten | Ergänzen bei Jakob („Fehleranalyse und Korrektur der Prozesse 01 bis 05, E-26; Logikfehler in 06, E-27") und Adrian („Überarbeitung von Prozess 06, E-27") | Nina |
| 16 | Doku 5.3 | „Unsere erste Fassung hatte sechs Akteure mit bis zu acht Verbindungen" | Es waren acht Akteure (sechs Personen/Rollen, Lieferant, KI-Dienst); Kunde und Techniker hatten je acht Verbindungen. „acht Akteure" | Nina |
| 17 | Sprechtext Folie 13 | „bisher zehn gemergte Pull Requests" | Zahl am Ende aktualisieren (Stand 15.10.: 25) oder streichen | Kilian |
| 18 | Abb. 1 Systemkontext | Lieferant als Strichmännchen (Akteur) gezeichnet, obwohl seit E-24 Black Box ohne Systemzugang | Optional: als Kasten „Lieferant (externer Partner)" wie den KI-Dienst zeichnen, damit der Dozent nicht nachfragt | Kilian |
| 19 | Zustandsdiagramm | Übergang „Teile bestellt → abgelehnt" (Folgeaufgabe aus E-27: Teil nicht beschaffbar) fehlt | In `zustand-reparaturauftrag.puml` ergänzen, falls das Diagramm in VP gezeichnet wird; es ist keine Pflichtabgabe | Kilian |
| 20 | VPP und Tabelle 5 | `UML-WWI25B4-Gruppe1.vpp` liegt noch nicht in `2_uml/`; Tabelle 5 und 4.3 behaupten es | Nach SD1/SD4: Project → Save Project As | Kilian |

Nicht geprüft: Rechtschreibung, Seitenzahlen des Inhaltsverzeichnisses (statisch), Bildqualität.
