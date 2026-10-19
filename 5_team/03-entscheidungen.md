# Entscheidungslog

Kurzfassung der gültigen Entscheidungen. Der vollständige Verlauf mit Begründungen (E-01 bis E-20) liegt in der Git-Historie (Stand vor dem 16.10.2026). Neue Entscheidungen kommen oben als E-31, E-32 … dazu, jeweils mit Datum, Entscheidung und Auswirkung in wenigen Zeilen.

## Offen

Keine. E-19 bis E-29 sind am 19.10.2026 festgelegt (E-30); die Gruppe nimmt sie am 22.10. zur Kenntnis.

## E-30 Festlegung der offenen Entscheidungen (19.10.2026)

Festgelegt von Kilian (Scrum Master) am 19.10.2026, Kenntnisnahme der Gruppe am 22.10.

- **E-19 bestätigt:** Ein nicht abgeholtes Gerät wird nach der vierten Erinnerung verwertet, eine offene Rechnung nach der dritten erfolglosen Mahnung an das Inkasso übergeben. `AuftragStatus` bekommt keinen Wert für verwertete Geräte; die Verwertung ist ein Prozessende in P08, kein Zustand des Auftrags. Die neun Zustände bleiben.
- **E-20 bestätigt:** Bestellung nur bei Fehlteilen, Nachbestellvorschlag wird gebündelt, Warten auf die Auftragsbestätigung 3 Tage, auf die Lieferung je 14 Tage.
- **E-22 bestätigt:** Storno nach der zweiten erfolglosen Liefermahnung.
- **E-23 bis E-29 bestätigt** wie beschrieben. E-27 einschließlich der PO-Entscheidung: Ist ein Teil nicht beschaffbar, wird der Auftrag abgelehnt und das Gerät über P08 zurückgegeben.
- **Folgeaufgaben aus E-27:** Das Gateway „Alle Teile verfügbar?“ in P05 entfällt, „Fehlteile vorhanden?“ (E-20) deckt den Fall ab. Das Zustandsdiagramm des Reparaturauftrags war ein Zusatz ohne Abgabe und wird nicht weitergeführt; die Entwurfsdatei ist gelöscht, die Zustände beschreibt Doku 2.4.
- **E-24:** Das Use-Case-Diagramm bleibt einspaltig (Abbildung 4).
- **Präsentation (ersetzt die Quellenregel aus E-25):** Die `.pptx` ist das Original, der Generator in `4_praesentation/tools/` ist gelöscht. Die Folien 13–15 bleiben vorerst ausgeblendet; Maximilian überarbeitet die Präsentation und gleicht danach Agenda, Folie 18 und Doku Kapitel 1 an.
- **Repository:** `9_archiv/` ist gelöscht, frühere Stände liegen nur noch in der Git-Historie. `5_team/CLAUDE.md` bleibt.
- **Moodle-Angabe:** Der Entwurf in `0_abgabe/KI-Angabe-Moodle.md` bleibt; jede Person ergänzt ihre Werkzeuge.
- **Folgt daraus:** Doku 5.1 (Beschreibung P03/P05 nach E-26) und 5.6 (Ergebnis der Fristen) angepasst, Sprechtext Folie 8 ohne Zustandsdiagramm. In der `.pptx` streicht Maximilian auf Folie 8 „+ Zustandsdiagramm“ und „Zustandsdiagramm des Reparaturauftrags“ sowie den Satz im Sprechtext.

## E-29 Klassendiagramm: Operationen je Rolle, Mahnungen, Gerätetyp (16.10.2026)

Vorschlag von Kilian (Prüfung des Klassendiagramms gegen Tabelle 7, BPMN und Doku), bestätigt am 19.10.2026 (E-30). Änderungsbild: `2_uml/entwurf-plantuml/klassen-aenderungen-2026-10-16.png` (rot = neu).

- **Warum:** Doku 5.4 sagt, die Unterklassen von Mitarbeiter „tragen die Operationen dieser Rollen“ (Tabelle 7). Vier der 15 Rollen hatten keine Operation in ihrer Klasse: Kalkulator (UC06) und Endkontrolleur (UC14) bei Techniker, Bestandsplaner (UC12) und Retourenbearbeiter (UC19) bei Disponent. Prozess 06 (E-27) zählt Mahnungen und Ersatzlieferungen, Prozess 08 mahnt Rechnungen und bucht Lagergebühren – das Klassenmodell kannte dafür weder Attribut noch Operation, obwohl der KVA für dieselbe Logik `erinnerungen`/`protokolliereErinnerung()` hat. Doku 2.5 und Folie 7 sagen, der KI-Dienst schlägt den Gerätetyp vor; KIDiagnosevorschlag hatte kein Feld dafür.
- **Neu:** Techniker `erstelleKva(a)`, `fuehreEndkontrolleDurch(a)`; Disponent `pruefeMeldebestand(l)`, `wickleRetoureAb(b, grund)`; Lieferantenbestellung `anzahlMahnungen`, `anzahlErsatzlieferungen`, `mahne()`; Rechnung `mahnungen`, `addLagergebuehr(betrag)`, `mahne()`; KIDiagnosevorschlag `vermuteterGeraetetyp : GeraeteTyp`.
- **Multiplizitäten:** Voranmeldung – Filiale „0..1“ statt „1“ (die Filiale wird erst nach der KI-Auswertung vorgeschlagen); Lieferant – Lieferantenbestellung „0..1“ statt „1“ (ein Nachbestellvorschlag hat noch keinen Lieferanten, Status VORSCHLAG).
- **Nicht geändert:** 27 Klassen, 7 Aufzählungen, 36 Assoziationen, 8 Kompositionen – die Zahlen in Doku 5.4 und auf Folie 8 bleiben. Keine Umbenennung, keine Löschung, Sequenzdiagramme unverändert gültig.
- **Dateien:** `klassen.puml/.png`, `modell.xmi` (nur als Quelle; kein Neuimport in VP), `klassen-aenderungen-2026-10-16.puml/.png`.
- **Folgt daraus:** David trägt die 13 Einträge und die zwei Multiplizitäten im VP-Klassendiagramm von Hand nach (TODO A); kein Neuimport, sonst gibt es Dubletten. Erledigt am 16.10.

## E-28 Sequenzdiagramme auf den Kernablauf gekürzt (15.10.2026)

Vorschlag von Kilian, bestätigt am 19.10.2026 (E-30).

- **Warum:** Die bisherigen Vorlagen hatten bis zu 35 Botschaften und 10 Fragmente je Diagramm und wiederholten die Ausnahmen aus den Prozessmodellen. Die Beispiele der Vorlesung (VL 5-71, 5-89 bis 5-91) kommen mit wenigen Lebenslinien und unter zehn Botschaften aus. Gefordert ist je Use Case ein Sequenzdiagramm, kein Umfang.
- **Neu:** Je Diagramm 2 bis 7 Lebenslinien, 7 bis 16 Botschaften, höchstens fünf Fragmente. Erste Lebenslinie ist die Rolle des Use Case, Botschaften an Objekte bleiben Operationen des Klassendiagramms, Ausnahmen und Folgeprozesse stehen als ref. Fachliche Festlegungen bleiben: SD4 loop 0..2 und Abbruch (E-22), SD3 Vorreservierung aus der Sofortdiagnose (E-26), SD6 höchstens zwei Mahnungen, Storno an den Lieferanten (E-27).
- **Dateien:** `2_uml/entwurf-plantuml/sequenz-01 … 06.puml/.png` überschrieben. Die alten Fassungen stehen in der Git-Historie (Stand vor diesem Commit).
- **Darstellung:** Objekterzeugung wie in Visual Paradigm und VL 6 Folie 5-70: gestrichelter Pfeil auf den Kopfkasten, Kasten auf Nachrichtenhöhe, kein «create»-Stereotyp; Botschaften nummeriert. In SD3 ist die Reservierung deshalb ein vorhandenes Objekt (eine Lebenslinie kann nur einmal erzeugt werden).
- **Nachtrag 16.10. (SD5/SD6):** Der Werkstattleiter ist seit E-24 keine Rolle im Use-Case-Diagramm mehr (dort Werkstattplaner), bleibt aber Klasse (Unterklasse von Mitarbeiter) und Lane „Werkstattleitung“. In SD5 und SD6 ist er deshalb kein Akteur, sondern das Objekt `: Werkstattleiter`, und die Botschaften sind seine Operationen `entscheideReklamation(r)` bzw. `gibBestellungFrei(b)`. So entsteht kein Akteur ohne Gegenstück im Use-Case-Diagramm, und „Botschaft = Operation der Klasse“ gilt auch hier.
- **Nachtrag 16.10. (SD6):** Der Lieferant ist seit E-24 kein Akteur mehr (Black Box ohne Systemzugang). In SD6 sind Bestellung, Mahnung und Stornierung deshalb **Lost Messages** (Empfänger außerhalb des Systems, in VP ein Pfeil mit Punkt am Ende), die Auftragsbestätigung ist eine **Found Message** (Absender außerhalb). Gates am Rahmen lassen sich in VP nicht zuverlässig anbinden. Die Mahnung löst der Einkäufer mit `mahne()` an der Lieferantenbestellung aus (E-29).
- **Folgt daraus:** Nina prüft Doku 5.5 und Tabelle 8 (Beschreibung der sechs SD; „par“ kommt nicht mehr vor). Für Visual Paradigm gilt die neue Vorlage. Erledigt am 16.10.

## E-27 Überarbeitung von Prozess 06 (15.10.2026)

Adrian (PO, Upload mit bpmn-js) und Jakob (QA). bestätigt am 19.10.2026 (E-30).

- **Adrian:** „Bestellung stornieren“ sendet die Stornierung an den Lieferanten. Der Timer „Lieferfrist überschritten“ wartet zuerst bis zum Liefertermin, nach jeder Mahnung 14 Tage (`nachfrist`). `anzahlMahnungen` wird beim Anlegen der Bestellung auf 0 gesetzt und bei jeder Mahnung erhöht. Neues Gateway „Ersatzlieferung mangelfrei?“. Ohne Teile endet P06 über „Fehlteil als nicht beschaffbar markieren“ (`teileVollstaendig = false`). PO-Entscheidung: Ist ein Teil nicht beschaffbar, wird der Auftrag abgelehnt und das Gerät über P08 zurückgegeben.
- **Jakob, Logikfehler 1:** Eine mangelhafte Ersatzlieferung ging ohne Grenze erneut in „10 Retoure abwickeln“. Jetzt zählt „Ersatzlieferung prüfen“ `anzahlErsatzlieferungen` hoch (Start 0 beim Anlegen der Bestellung); das neue Gateway „Zweite Ersatzlieferung mangelhaft?“ führt bei ja zu „Teil weiterhin benötigt?“ (neuer Lieferant oder nicht beschaffbar), bei nein in die zweite Retoure.
- **Jakob, Logikfehler 2:** „Teil weiterhin benötigt? nein“ lief in „Fehlteil als nicht beschaffbar markieren“, sodass der Auftrag abgelehnt worden wäre, obwohl das Teil nur nicht mehr gebraucht wird. Jetzt führt nein zu „Fehlteile dem Reparaturauftrag zuordnen“ (`teileVollstaendig = true`). Der überflüssige Merge vor „nicht beschaffbar“ entfällt.
- **Prüfung:** Struktur (Erreichbarkeit, ein Ende, kein Gateway mit Join und Split), bpmn-js-Import ohne Warnung, `bpmnlint:recommended` und `camunda-compat/camunda-cloud-8-7` ohne Befund für alle zehn Dateien; PNG mit bpmn-js neu gerendert.
- **Kennzahlen:** 133 Aktivitäten (Ø 13,3), 81 automatisiert (61 %), 42 Nachrichtenflüsse, 63 Datenobjekte und -speicher.

## E-26 Fehleranalyse und Korrekturen P01–P05 (15.10.2026)

Vorschlag von Jakob, bestätigt am 19.10.2026 (E-30).

- **P03:** Neues Gateway „KI-Vorschlag vorhanden?“ vor „KI-Diagnosevorschlag sichten“, weil Aufträge ohne Voranmeldung (P02, Zweig „nein“) keinen KI-Vorschlag haben. Nach „Erweiterte Prüfung durchführen“ fragt „Fehler gefunden?“; bei „nein“ geht es wie bei Unwirtschaftlichkeit zur Reparaturabsage (die Nachricht nennt „kein Befund“ schon bisher).
- **P04:** Gateway heißt „Dritte Frist verstrichen?“ statt „Dritte Erinnerung ohne Antwort?“ (KVA plus höchstens zwei Erinnerungen, abgelehnt nach dem dritten Fristablauf), Documentation entsprechend. Bei Freigabe und Ablehnung entsteht zusätzlich „Kostenvoranschlag [freigegeben]“ bzw. „[abgelehnt]“, weil P05 den freigegebenen KVA als Eingabe liest. Datenobjekt „KvaPosition“ statt „Kva-Position“.
- **P05:** Neue Aktivität „Vorreservierungen übernehmen“ (Service Task) vor der Teileprüfung; Vorreservierungen aus P01 werden zu Reservierungen, die Mehrfachinstanz prüft nur noch die offenen Teile (`offeneErsatzteile`). Vorher wurden vorreservierte Teile ein zweites Mal reserviert. Startereignis im Kunden-Pool „Reparaturbeginn erhalten“. SD3 hat dafür einen opt-Block.
- **P01/P02:** Nachrichtenfluss „Diagnose, Vorab-KVA, Termin“ wie die Nachricht; Datenobjekt „Geraet“ (Klassenname).
- **Darstellung:** XOR-Gateways in P03–P05 mit X-Markierung wie in P01/P02.
- **Kennzahlen:** 132 Aktivitäten (Ø 13,2), 80 automatisiert (61 %), 41 Nachrichtenflüsse, 63 Datenobjekte und -speicher. Camunda-Linter ohne Befund. PNGs von P01–P05 mit bpmn-js (Renderer des Modelers) neu erzeugt; die Modeler-Prüfung aller zehn Dateien bleibt bei Maximilian (TODO B).
- **Nicht geändert:** Im Kunden-Pool von P01 gibt es keinen Ausstieg, falls die Werkstatt die Voranmeldung nach Fristablauf verwirft; der Kundenablauf modelliert nur das Antworten, daher kein Deadlock im Modell.

## E-25 Präsentation als Pitch und Zusammenfassung (15.10.2026)

Vorschlag von Kilian, bestätigt am 19.10.2026 (E-30).

- **Aufbau:** 17 Folien plus Anhang. Teil 1 ist der Pitch (Problem, Lösung, Nutzen, Auftragsreise, KI-Sofortdiagnose), Teil 2 die Zusammenfassung der Ergebnisse (Kennzahlen, Prozesse, Rollen und Use Cases, Datenmodell, Vorgehen, Qualität, Herausforderungen), zum Schluss Geschäftsmodell, Ausblick und Fazit.
- **Keine Diagrammbilder:** Die Diagramme liegen in der Projektdokumentation und im Abgabepaket (BPMN-ZIP, VPP). In den Folien stehen Ergebnisse als Zahlen, Rollen, Entwurfsentscheidungen und Prozess-Highlights. Damit entfallen die Bildaufgaben für die Folien.
- **Sprechtexte:** je Folie in den PowerPoint-Notizen und in `4_praesentation/Sprechtext_Abschlusspraesentation.docx` mit Zeitangaben (gesamt etwa 18 Minuten); jede Person passt ihren Teil an.
- **Quelle (aufgehoben durch E-30):** Früher erzeugten `4_praesentation/tools/pres.js` und `tools/sprechtext.py` die Datei; Änderungen am Text dort, nicht in der pptx, sonst gehen sie beim nächsten Erzeugen verloren. Wer direkt in PowerPoint ändert, sagt es in der WhatsApp-Gruppe.

## E-24 Use-Case-Diagramm: je Use Case eine Rolle (15.10.2026)

Umsetzung des Dozentenhinweises aus dem Coaching am 15.10. (`04-dozenten-feedback.md`), bestätigt am 19.10.2026 (E-30).

- **Diagramm:** Jeder Use Case hat genau eine Rolle als primären Akteur. Aus Servicemitarbeiter, Techniker, Disponent, Werkstattleiter und Werkstattinhaber werden 15 Mitarbeiterrollen (Serviceannahme, Diagnoseprüfer, Diagnostiker, Kalkulator, Werkstattplaner, Reparateur, Endkontrolleur, Geräteausgabe, Reklamationsbearbeiter, Teiledisponent, Bestandsplaner, Einkäufer, Wareneingang, Retourenbearbeiter, Betriebsadministrator). Der Kunde (UC01, UC02, UC07) bleibt ein Akteur. *Nachtrag 16.10.:* In Visual Paradigm wird er einmal gezeichnet, mit drei Verbindungen (statt dreimal wie in der PlantUML-Vorlage); die Zählung ändert sich dadurch nicht (17 Akteure = 15 Rollen + Kunde + KI-Diagnosedienst, 19 Akteur-Verbindungen). Die extend-Bedingungen aus `usecase.puml` werden in VP nicht als Extension Points eingetragen (Aufwand, kein Pflichtbestandteil); Doku 5.3 sagt deshalb nur noch „sechs extend-Beziehungen“, die Bedingungen stehen im Text. Der Lieferant ist kein Akteur mehr (Black Box ohne Systemzugang, Dozentenhinweis vom 15.10.); er kommt wie in BPMN nur über Nachrichten vor. Der KI-Diagnosedienst bleibt als externes System an UC01. UC08 wird nur per include erreicht und hat keinen Akteur. include/extend bleiben wie bisher (2 include, 6 extend). Zählung: 19 Use Cases, 17 Akteure, 19 Akteur-Verbindungen (vorher 35).
- **Organigramm:** Die Zuordnung Rolle → Klasse (Unterklassen von Mitarbeiter) → BPMN-Lane steht in Doku Tabelle 7. Das Klassendiagramm ändert sich nicht.
- **Sequenzdiagramme:** Die erste Lebenslinie ist die Rolle des Use Case (SD2 Kalkulator/Serviceannahme/Kunde, SD3 Teiledisponent, SD4 Endkontrolleur, SD5 Reklamationsbearbeiter/Diagnostiker/Werkstattleiter, SD6 Einkäufer). Wer im Use-Case-Diagramm keine Rolle hat, behält den Mitarbeitertyp (Werkstattleiter). Der Lieferant bleibt in SD6 als externe Lebenslinie, weil die Nachrichten an ihn Teil des Ablaufs sind; das entspricht dem Black-Box-Pool in BPMN.
- **Dateien:** `2_uml/entwurf-plantuml/usecase.puml` (Modell), `usecase_layout.py` → `usecase.png/.svg` (Vorlage mit festem Raster), `modell.xmi` und neu `modell-usecase.xmi` (nur Anwendungsfallmodell, für den Neuimport in VP), SD-Vorlagen und PNGs, Doku 3.1/5.3/5.5/5.6/7.1, Folien 12 und 18.
- **Visual Paradigm:** Paket „Anwendungsfallmodell“ löschen, `modell-usecase.xmi` importieren, Diagramm neu aufziehen (Anleitung in `2_uml/README.md`). Nicht die ganze `modell.xmi` erneut importieren, sonst gibt es die Klassen doppelt.

## E-23 Zuständigkeiten für die Fertigstellung (15.10.2026)

Vorschlag von Kilian, bestätigt am 19.10.2026 (E-30).

- **Grundsatz:** Nur Kilian und David haben Zugriff auf Visual Paradigm, deshalb liegen alle VP-Diagramme bei ihnen. Die übrigen Arbeiten (BPMN-Abschluss, Dokumentation, Fachkonzept, Entscheidungen, Qualitätssicherung, Präsentation) sind so verteilt, dass jede Person im Gesamtprojekt einen vergleichbaren Anteil verantwortet. Die Zuständigkeiten stehen in Doku Kapitel 1 und `02-team-und-rollen.md`.
- **Visual Paradigm:** Kilian Klassendiagramm, SD1, SD4, VPP-Datei und Konsistenzprüfung; David Use-Case-Diagramm (E-24), SD2, SD3, SD5, SD6.
- **Übrige:** Nina Redaktion der Dokumentation (Abbildungen, gelbe Hinweise, Kapitel 1/4/7, PDF) und Abgabe-Archiv; Adrian Fachkonzept (Kapitel 2), Entscheidungslog, Bestätigung E-19/E-20/E-22, Abschnitt 5.2 und Kapitel 6; Maximilian alle zehn BPMN-Dateien im Modeler, Kennzahlen, Abschnitt 5.1; Jakob QA-Checkliste, Reviews, 3.2 und 5.6, Präsentations-PDF.
- **Präsentation:** Jede Person trägt vor, was sie verantwortet (Foliennummern nach E-25): Nina 1–2, 16–17; David 3, 6, 11; Adrian 4, 5, 7; Maximilian 8–10; Kilian 12, 13; Jakob 14, 15. Folie 2, Folie 18, Sprechernotizen und Doku Kapitel 1 sind angepasst.
- **Offene Aufgaben:** `TODO.md` listet alle Aufgaben ohne Namen; die Zuteilung erfolgt im Gruppentermin nach den Zuständigkeiten oben.

## E-22 Abschluss der QA-Befunde Q1–Q3 und B12 (08.10.2026)

Vorschlag von Kilian, bestätigt am 19.10.2026 (E-30).

- **P06 (Q1):** Nach „14 Tage verstrichen“ fragt das neue Gateway „Bereits zweimal angemahnt?“. Nein → „Lieferung anmahnen“ und weiter warten, ja → derselbe Weg wie ohne Auftragsbestätigung: „Bestellung stornieren“ → „Alternativen Lieferanten suchen“. Damit hat jede Warteschleife einen Ausstieg. Die Zahl zwei ist ein Vorschlag (analog zur einmaligen Eskalation in P10) und kann am 15.10. geändert werden.
- **P10 (B12):** Vor „Ersatzlieferung buchen“ steht das Nachrichten-Zwischenereignis „Ersatzlieferung erhalten“ mit Nachrichtenfluss vom Lieferanten.
- **SD4 (Q2, Q3):** ref auf UC13 nennt die Teile-Disposition über UC09/P05 bei freigegebenem Nachtrag; nach der Endkontrolle `loop 0..2` für Nacharbeit, danach alt: fertigmelden oder `wechsleStatus(ABGELEHNT)`.
- **SD6:** nach der Bestellbestätigung alt „Lieferung eingetroffen (nach höchstens zwei Mahnungen)“ / „auch nach der zweiten Mahnung keine Lieferung“ → `storniere()`, weiter wie ohne Auftragsbestätigung.
- **Kennzahlen:** 131 Aktivitäten (unverändert, Gateway und Ereignis zählen nicht), 41 Nachrichtenflüsse. Beide Linter ohne Befund. Doku (1, 3.3, 4.3, 5.1, 5.1.2, 5.3.3, 5.4, 6, 7) und Bilder angepasst.
- **Abweichung vom Werkzeugweg aus E-21:** P06 und P10 wurden ausnahmsweise mit dem früheren Erzeugungsskript neu erzeugt statt im Camunda Modeler geändert, weil er P03–P10 bis dahin byte-gleich reproduzierte und so das Layout erhalten blieb. Maximilian öffnet beide Dateien bei der Modeler-Prüfung, speichert sie dort und exportiert die PNGs neu; danach gilt wieder nur der Modeler.

## E-21 Gruppenbeschluss vom 05.10.2026

Beschlossen von der ganzen Gruppe am Gruppentermin.

- **Bestätigt:** Perspektive Solution Provider (E-02), KI-Sofortdiagnose (E-03), Prozessliste (E-05), Ablagestruktur (E-11), Korrekturen E-15, Kunde als eigener Prozess (E-16), E-17 vollständig (Rückgabe über P08, Lagergebühr nach der dritten Abhol-Erinnerung, Mahnung nach 14 Tagen, Akteur Servicemitarbeiter, UC19 Retoure), E-18 mit genau einem Klassendiagramm und UC04 als eigenständigem Use Case. Damit sind E-07 und E-14 erledigt.
- **KI-Nutzung:** Kein KI-Absatz in der Projektdokumentation; den KI-Einsatz geben wir beim Moodle-Upload gesondert an. Absatz in Kapitel 1 und „Dokumanager“ auf Folie 16 entfernt.
- **Modellierung:** Aktivitäten zählen nur im Werkstatt-Pool (Ø 13,1); Camunda-8-Anreicherung bleibt; Modellgröße bleibt (27 Klassen, 19 Use Cases); UC18 bleibt als Administration außerhalb der zehn Prozesse; Startereignis P09 bleibt „Mangel gemeldet“.
- **Werkzeuge:** Keine Camunda Cloud, die BPMN-Modelle liegen nur im Git-Repository (mit dem Dozenten abgeklärt, für ihn in Ordnung). Quelle der BPMN-Diagramme sind ab jetzt die `.bpmn`-Dateien (Camunda Modeler); die früheren Erzeugungsskripte werden nicht mehr genutzt. Das BPMN-Abgabe-ZIP wird zur Abgabe von Hand gepackt.
- **Organisation:** Keine feste Ansprechperson für den Dozenten, Abstimmung im Coaching. Zuständigkeiten bleiben wie in `02-team-und-rollen.md` (Maximilian BPMN inklusive 09/10). Kommunikation über WhatsApp, Dateien nur über das GitHub-Repository. Kein Trello-Screenshot in Doku und Folien. In allen Dokumenten heißt es „Maximilian“.
- **Repository:** Prüfprotokolle, alte Befunde, die To-do-Liste vom 05.10., die Vergleichsnotiz, die alte Dateiübersicht und der ausführliche Entscheidungslog wurden archiviert (seit 16.10.2026 nur noch in der Git-Historie).

## Gültige Entscheidungen im Überblick

| Nr. | Inhalt |
|---|---|
| E-01 | Projektthema RepairFlow: Werkstatt-Management für Fahrrad-, E-Bike- und Elektronikreparaturen |
| E-02 | Perspektive Solution Provider (SaaS-Startup), FixWerk GmbH als Pilot- und Referenzkunde |
| E-03 | Alleinstellungsmerkmal KI-Sofortdiagnose (Prozess 01, UC01/UC02/UC04, SD1) |
| E-04 | Alles Schriftliche liegt im GitHub-Repository, Änderungen über Branch und Pull Request |
| E-05 | Zehn Prozesse P01 Sofortdiagnose bis P10 Retoure |
| E-06 | BPMN-Konventionen nach Vorlesung (Pool je Unternehmen, Lanes je Rolle, Verb + Objekt, Partizip Perfekt) |
| E-10 | Zusammenführung von Kilians Entwurf V2 und dem Solution-Provider-Entwurf |
| E-11 | Ablagestruktur `1_bpmn/`, `2_uml/`, `3_doku/`, `4_praesentation/`, `0_abgabe/` |
| E-12 | Scrum im Takt der Gruppentermine, Sprintplan in Doku Kapitel 4 |
| E-13 | Rollen, Gruppentermine 02.09./05.10./15.10./22.10., Präsentation 27.10.2026, 09:00, B458 |
| E-15 | Korrekturen der Gesamtprüfung vom 26.09. (BPMN-Fehler, Botschaft = Operation) |
| E-16 | Kunde als eigener, nicht ausführbarer Prozess; Lieferant bleibt Black Box |
| E-17 | Korrekturen des Komplettchecks vom 05.10. (Rückgabe über P08, Schleifenausstiege, Servicemitarbeiter, UC19) |
| E-18 | Ein vollständiges Klassendiagramm; Use Cases und Sequenzdiagramme mit BPMN abgeglichen |
| E-19 | Logikfehler in P07/P08 behoben (Nachtrag über P05, begrenzte Nacharbeit, Verwertung, Inkasso) – bestätigt 19.10. (E-30) |
| E-20 | P05/P06 überarbeitet (Bestellung nur bei Fehlteilen, Kundeninfo durch Service, Warten mit Timer und Mahnung in P06) – bestätigt 19.10. (E-30) |
| E-21 | Gruppenbeschluss vom 05.10.2026 (siehe oben) |
| E-22 | Ausstieg der Liefermahnung in P06, Empfang der Ersatzlieferung in P10, SD4 an P07 angeglichen – bestätigt 19.10. (E-30) |
| E-23 | Zuständigkeiten für die Fertigstellung, Vortrag folgt der Verantwortung – bestätigt 19.10. (E-30) |
| E-24 | Use-Case-Diagramm mit einer Rolle je Use Case, 15 Mitarbeiterrollen, Lieferant als Black Box ohne Akteur, Zuordnung in Doku Tabelle 7 – bestätigt 19.10. (E-30) |
| E-25 | Präsentation als Pitch und Zusammenfassung ohne Diagrammbilder, Sprechtexte je Folie – bestätigt 19.10. (E-30) |
| E-26 | Korrekturen P01–P05 (KI-Vorschlag optional, kein Befund, KVA-Status, Vorreservierungen in P05) – bestätigt 19.10. (E-30) |
| E-27 | Überarbeitung P06 (Storno an Lieferanten, Nachfrist, nicht beschaffbar, begrenzte Retoure) – bestätigt 19.10. (E-30) |
| E-28 | Sequenzdiagramme auf den Kernablauf gekürzt (7 bis 16 Botschaften, Ausnahmen als ref) – bestätigt 19.10. (E-30) |
| E-29 | Klassendiagramm: Operation je Rolle, Mahnungen an Bestellung und Rechnung, Gerätetyp im KI-Vorschlag, zwei Multiplizitäten – bestätigt 19.10. (E-30) |
| E-30 | Festlegung von E-19 bis E-29; Fristen bleiben; kein Zustand „verwertet“; Zustandsdiagramm und Präsentations-Generator entfallen; `9_archiv/` gelöscht |
