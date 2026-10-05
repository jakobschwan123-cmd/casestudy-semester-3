# Entscheidungslog

Jede Entscheidung, die mehr als eine Person betrifft, kommt hier rein: was entschieden wurde, warum, und was sich dadurch ändert. Offene Entscheidungen stehen oben, damit sie nicht untergehen.

## Offen

### E-07 Bestätigung von E-02, E-03, E-05 und E-11 durch die Gruppe

David hat am 02.09.2026 Perspektive, Gimmick, Prozessliste und Ablagestruktur (E-08, ersetzt durch E-11) festgelegt, damit die Artefakte gebaut werden konnten. Adrian (Owner) und die Gruppe sollten das beim nächsten Treffen bestätigen oder kippen, solange Änderungen noch billig sind. Ebenfalls zu bestätigen: ob der Absatz zum KI-Einsatz in Kapitel 1 der Doku bleibt, die Korrekturen aus E-15, der ausmodellierte Kunden-Pool aus E-16 und die Korrekturen des Komplettchecks aus E-17 (Abholung über Prozess 08, Schleifen-Ausstiege, Lagergebühr und Mahnung, Akteur Servicemitarbeiter, UC19 Retoure) sowie der UML-Abgleich aus E-18, die Logik-Korrekturen in P07/P08 aus E-19 und die Überarbeitung von P05 und P06 aus E-20.

### E-14 Bestätigung durch den Dozenten

Offen: Wechsel der Ansprechperson (Maximilian → Nina) mitteilen; Gruppentermine 05.10., 15.10., 22.10. gegen Rapla prüfen. Zur Camunda Cloud: Der Ablauf verlangt die Ablage der BPMN-Modelle „in die vorbereiteten Unterordner im Camunda Cloud Repository"; wir laden deshalb hoch, ohne auf eine Antwort zu warten (Git bleibt zusätzlich die Arbeitsgrundlage).

## Entschieden

### E-20 Überarbeitung von Prozess 05 und 06 (05.10.2026)

Datum: 05.10.2026 (David, umgesetzt mit KI-Unterstützung in `tools/diagrams.py`, nur `p05` und `p06` neu erzeugt; Bestätigung durch die Gruppe siehe E-07).
Entscheidung und Auswirkung:
- **Lagernachschub hält die Reparatur nicht mehr auf:** P05 ruft „06 Ersatzteile bestellen" nur noch auf, wenn Fehlteile vorhanden sind (vorher auch bei reinem Nachbestellvorschlag; als Call Activity wartete P05 dann bis zur Lieferung, und P07 startete erst danach). Der Nachbestellvorschlag bleibt im Status Vorschlag und wird in P06 mit der nächsten Bestellung gebündelt. In P06 werden nur die Fehlteile dem Reparaturauftrag zugeordnet („Fehlteile dem Reparaturauftrag zuordnen"), Nachbestellteile gehen über den Wareneingang ins Lager.
- **P05 Lanes:** „Voraussichtlichen Reparaturbeginn ermitteln" und „Kunde über Reparaturbeginn informieren" liegen in der Lane Service / Annahme statt Techniker (Befund B8 aus dem Komplettcheck; der Techniker hatte in P05 keine Tätigkeit, Vorlesung 4-14, 4-64). Die Lane Techniker entfällt in P05.
- **P05 Teilprozess:** „Umlagerung anfordern und Teil reservieren" ist in „Teil in anderer Filiale reservieren" (Service Task) und „Umlagerung anfordern" (User Task) geteilt (ein Verb + Objekt je Aktivität, Vorlesung 4-21). Gateway heißt „Meldebestand unterschritten?" (vorher mit Trennstrich), Gateway „Bestellbedarf vorhanden?" heißt „Fehlteile vorhanden?". „Meldebestand prüfen" liest jetzt das Datenobjekt Lagerbestand.
- **P06 Warten mit Ausstieg:** Statt der Empfangsaktivitäten wartet P06 an ereignisbasierten Gateways (Vorlesung 4-36): Auftragsbestätigung oder „3 Tage verstrichen" (dann Storno und alternativer Lieferant wie bei „nicht lieferbar"); Lieferung oder „14 Tage verstrichen" (dann „Lieferung anmahnen" und erneut warten). Offen für die Gruppe: Nach wie vielen Mahnungen wird storniert?
- **P06 Ersatzlieferung prüfen:** Nach der Retoure (P10) wird eine Ersatzlieferung erst geprüft („Ersatzlieferung prüfen"), bevor die Teile zugeordnet werden (Befund B12, P06-Teil). Der P10-Teil von B12 („Ersatzlieferung buchen" ohne Empfang) ist offen.
- **P06 Benennung:** „Liefertermin hinterlegen und Status 'Teile bestellt' setzen" heißt „Liefertermin hinterlegen"; der Statuswechsel steht im Datenobjekt „Reparatur-auftrag [Teile bestellt]".
- **UML nachgezogen:** SD3 – Reparaturbeginn und Kundeninformation durch den Servicemitarbeiter statt Techniker, Bestellung nur „opt Fehlteile vorhanden", Hinweis zum Nachbestellvorschlag, BPMN-Anker `GW05_Fehlteile`/`S05_ResAndere`. SD6 – Vorbedingung, Timeout der Auftragsbestätigung, Mahnung, Prüfung der Ersatzlieferung, BPMN-Anker auf die neuen Elemente. Use Cases (`tools/umlmodel.py`, neu erzeugt): Servicemitarbeiter statt Techniker an UC09; extend UC10 → UC09 mit Bedingung „Fehlteile vorhanden". Texte in `tools/doc.js` und `tools/pres.js` angepasst. `tools/check_uml.py` ohne Befund (109 BPMN-Anker).
Kennzahlen nach E-19 und E-20 zusammen (mit `tools/mkstats.py`): 131 Aktivitäten im Werkstatt-Pool (Ø 13,1), 79 automatisiert (60 %), 26 Aktivitäten beim Kunden, 40 Nachrichtenflüsse, 60 Datenobjekte und -speicher. Layout-Prüfung 0 Befunde.
Noch offen: `@camunda/linting`/`bpmnlint` für P05/P06; PNG-Export von `p05`/`p06` (bpmn-js) sowie `sequenz-03`, `sequenz-06` und `usecase` (PlantUML); danach Doku und Folien neu erzeugen (Kennzahlen, Texte). Auf diesem Rechner fehlten Node.js und ein lauffähiges Java.
Begründung: Fachliche Lücke (Reparatur wartete auf Lagernachschub), Warteschritte ohne Ausstieg, Konsistenz mit P06 (Kundeninfo in Service / Annahme) und Vorlesung (4-14, 4-21, 4-36, 4-64).

### E-19 Logikfehler in Prozess 07 und 08 (05.10.2026)

Datum: 05.10.2026 (Jakob, Prüfung mit KI-Unterstützung; Bestätigung durch die Gruppe siehe E-07).
Befund: P08 hatte zwei Warteschleifen ohne Ausstieg (Abhol-Erinnerung mit wiederholter Lagergebühr, Mahnung), entgegen E-17; der Nachrichtenfluss „Mahnung" endete an der Sende-Aktivität „Rechnungsbetrag überweisen" des Kunden. In P07 gab es für einen freigegebenen Nachtrag keine Disposition der zusätzlichen Ersatzteile, und der Nachtrag bekam bei Ablehnung oder Timeout keinen KvaStatus.
Entscheidung und Auswirkung (umgesetzt in `tools/diagrams.py`, BPMN, PNG, ZIP und `tools/process_stats.json` neu erzeugt):
- **P07:** Freigegebener Nachtrag → Call Activity „05 Ersatzteile disponieren" → zurück vor „Reservierte Ersatzteile entnehmen". Ablehnung und 3-Tage-Timer laufen über „Nachtrag auf 'abgelehnt' setzen" (Datenobjekt „Kosten-voranschlag [abgelehnt]") in die Endkontrolle.
- **P08 Abholung:** Gateway „Anzahl Erinnerungen?": < 3 erneut benachrichtigen, = 3 Lagergebühr aufnehmen und benachrichtigen, > 3 „Verwertung des Geräts einleiten". Die Lagergebühr fällt damit nur einmal an.
- **P08 Zahlung:** Gateway „Dritte Mahnung erfolglos?" nach dem 14-Tage-Timer: nein → Mahnung senden, ja → „Forderung an Inkasso übergeben". Verwertung und Inkasso enden über Merges im einzigen Endereignis „Auftrag abgeschlossen" (Konvention aus E-15). Die Mahnung geht als Nachrichtenfluss an den Kunden-Pool, da der Kunde sie zu keinem festen Zeitpunkt seines Ablaufs erhält.
- **P07 Nacharbeit:** Die Schleife Endkontrolle → Nacharbeit war unbegrenzt. Jetzt prüft „Zweite Nacharbeit erfolglos?“: nein → Nacharbeit, ja → „Auftragsstatus auf 'abgelehnt' setzen“ (Datenobjekt „Reparatur-auftrag [abgelehnt]“), danach über einen Merge zum einzigen Ende; die Rückgabe läuft wie bei jedem abgelehnten Auftrag über Prozess 08. Zustandsdiagramm: neuer Übergang in Reparatur → abgelehnt.
- `tools/bpmngen.py`: Beschriftung nach links abgehender Flüsse links vom Gateway statt darüber (betrifft nur P08).
Kennzahlen: 130 Aktivitäten im Werkstatt-Pool (Ø 13,0), 79 automatisiert (61 %), 26 beim Kunden, 39 Nachrichtenflüsse, 59 Datenobjekte und -speicher. `uml/zustand-reparaturauftrag.png` ist noch nicht neu gerendert (PlantUML fehlte). Projektdokumentation und Folien enthalten noch die Zahlen und Bilder aus E-17 und müssen neu erzeugt werden.
Offen für die Gruppe (15.10.): Fristen (vierte Erinnerung bis zur Verwertung, drei Mahnungen bis Inkasso) und ob AuftragStatus einen Wert für verwertete Geräte braucht.

### E-18 Ein Klassendiagramm und erneuter UML-Abgleich mit BPMN (05.10.2026)

Datum: 05.10.2026 (David, auf seinen Arbeitsauftrag hin mit KI-Unterstützung umgesetzt; Teamreview über Pull Request).
Grundlage sind die zehn vorhandenen BPMN-Dateien unter `bpmn/`. Prüfprotokoll mit Element-IDs und vollständiger Zuordnung: `doku/protokolle/2026-10-05-uml-bpmn-abgleich.md`.

- **Genau ein aktives Klassendiagramm:** `uml/klassen.puml/.png` enthält alle 27 Klassen, 7 Aufzählungen und 36 Assoziationen. Die vier Fokusdiagramme entfallen; Generator, Verweise, Doku und Folien verwenden nur das vollständige Diagramm. Historische Modelle im Archiv bleiben als Vorgeschichte erkennbar.
- **Use Cases:** UC09 heißt „Ersatzteile disponieren und reservieren", UC14 „Auftrag fertigmelden", UC15 „Abholung und Abrechnung abwickeln". Die Kundennachricht gehört zu P08/UC15. Nacharbeitsauftrag UC03 erweitert UC16 nur bei Freigabe oder angenommenem Angebot; die bisherige unbedingte include-Beziehung entfällt. UC19 erweitert sowohl UC11 (mangelhafte Lieferung) als auch UC16 (defektes Lieferantenteil). UC10 erweitert UC09 bei Fehlteilen **oder** Nachbestellvorschlag. UC04 bleibt eigenständig: P03 hat vor der Befunderfassung keine optionale Verzweigung zur Prüfung des KI-Vorschlags. Akteure wurden an die tatsächlichen Rollen und Nachrichten in BPMN angeglichen. Stand: 19 Use Cases, 8 Akteure, 2 include, 6 bedingte extend; Bedingungen und Erweiterungspunkte auch in der XMI.
- **SD1:** Medienqualität vor KI-Auswertung; Schleife für neue Aufnahmen mit Sieben-Tage-Abbruch; Terminablehnung und Entscheidungstimeout getrennt; Vorreservierung nur nach Bestätigung.
- **SD2:** Positionen und Preise vor Serviceprüfung; drei Fristabläufe gemäß P04; echte Ablehnung und systemseitiger Timeout getrennt; Folgeprozesse 05 bzw. 08 als ref.
- **SD3:** parallele Teileprüfung, Fehlteile zunächst markieren; danach Reservierungen bestätigen, Meldebestand prüfen, Reparaturbeginn ermitteln und Kunde informieren; erst anschließend Bestellung auslösen.
- **SD4:** keine Kundennachricht und keine Rechnung; abgeschlossene Reparaturschritte sowie bestandene Endkontrolle als Bedingungen; Nacharbeit mit erneuter Endkontrolle und Verweis auf Nachtrags-KVA in UC13.
- **SD5:** Techniker für Mangelprüfung und Anlage der Nacharbeit; Geräteannahme, Angebotsablehnung ohne neuen Auftrag, Reparatur, gegebenenfalls Retoure und in allen Pfaden Abholung vor Reklamationsabschluss.
- **SD6:** Bestellbedarf aus P05 bündeln; Lieferant wählen, Bestellung anlegen, gegebenenfalls freigeben; nur bestätigte und lieferbare Bestellung setzt „Teile bestellt". Storno, alternative Lieferanten, Verzögerungsinformation und Wareneingang/Retoure mit bedarfsabhängiger Neubestellung sind abgebildet. Der bislang gezeigte Pfad „offene Bestellung ergänzen" entfällt, da P06 ihn nicht enthält.
- **Operationsmodell:** benötigte Operationen für Mediennachreichung, KI-Auswertung, Erinnerung, Fehlteile, Reservierungsbestätigung, Reparaturbeginn, Endkontrolle, Bestellbestätigung und Reklamationsablehnung ergänzt; PNGs und XMI aus den Quellen neu erzeugt. `tools/check_uml.py` prüft den Generatorstand, Operationsaufrufe, Statuswerte, BPMN-Anker und XMI-Referenzen.

Die Änderungen setzen den Arbeitsauftrag um. Ein Import und das Speichern des verpflichtenden `.vpp`-Projekts in Visual Paradigm sowie das Teamreview bleiben gesonderte Arbeitsschritte; dieser Abgleich bestätigt sie nicht.

### E-17 Korrekturen nach dem Komplettcheck (05.10.2026)

Datum: 05.10.2026 (Kilian, Prüfung mit KI-Unterstützung gegen Ablauf und Vorlesung; Bestätigung durch die Gruppe siehe E-07). Vollständige Befundliste: `doku/protokolle/2026-10-05-komplettcheck.md`.
Entscheidung und Auswirkung (umgesetzt in `tools/diagrams.py`, `tools/bpmngen.py`, `tools/umlmodel.py`, `uml/*.puml`, Doku und Folien neu erzeugt):
- **Abholung abgelehnter und reklamierter Aufträge (B1/B2/B3/B7):** Prozess 08 startet jetzt mit „Gerät abholbereit" und unterscheidet die Abrechnung (Reparatur, Diagnosepauschale, kostenfrei). Prozess 03 (Totalschaden/kein Befund), 04 (KVA abgelehnt, auch nach dritter Erinnerung) und 09 (Nacharbeit, abgelehntes Angebot) rufen „08 Abholung abwickeln" als Call Activity auf; damit ist der Übergang abgelehnt → abgeholt des Zustandsdiagramms erstmals in einem Prozess abgebildet. Die Nacharbeit in 09 läuft über „07 Reparatur durchführen"; das Zustandsdiagramm erhält den Übergang angenommen → in Reparatur [Nacharbeit].
- **Schleifen mit Ausstieg (B6):** P01 Rückfrage mit ereignisbasiertem Gateway (neue Aufnahme oder 7 Tage), Termin kann abgelehnt werden; P03 ohne Diagnoseschleife (erweiterte Prüfung einmal, Befund immer dokumentiert); P04 nach der dritten Erinnerung „abgelehnt"; P06 Bestellung stornieren und alternativen Lieferanten suchen, sonst Ende ohne Teile; P07 Nachtrag ohne Antwort nach 3 Tagen abgelehnt; P08 Lagergebühr nach der dritten Abhol-Erinnerung, Mahnung 14 Tage nach Rechnung; P10 Teil abschreiben nach der zweiten Eskalation.
- **Nachrichtenflüsse (B5):** P08 Zahlungsart, Bar-/Kartenzahlung, Geräteübergabe, Zahlung und Mahnung; P09 Geräteabgabe; P10 Eskalation und Rücksendung an den Lieferanten. Kommunikation zwischen Pools nur noch über Nachrichtenflüsse (Vorlesung 4-43).
- **Prozessübergänge und Datenobjekte (B4/B9/B10):** P05 informiert den Kunden vor der Bestellung; P06 startet mit „Bestellbedarf gemeldet" und verarbeitet auch Nachbestellvorschläge; Startereignis P04 „KVA angestoßen", P07 „Ersatzteile disponiert"; neue Datenobjekte Reparaturauftrag [KVA offen]/[abgelehnt], Kostenvoranschlag [Entwurf]/[versendet]/[freigegeben], Lieferantenbestellung [storniert]/[Retoure]/[Gutschrift], Rechnung [Mahnung]; Datenspeicher mit `dataStore`-Element, mehrfache Referenzen zählen einmal.
- **Use-Case-Diagramm (C1–C6):** include UC15→UC14 und UC06→UC05 entfernt; extend UC16→UC15 ersetzt durch include UC16→UC03 (Nacharbeitsauftrag); extend UC12→UC09 statt UC08; UC12 heißt „Nachbestellvorschlag erzeugen"; neuer Akteur Servicemitarbeiter (Lane Service / Annahme) mit UC03, UC07, UC15, UC16; neuer UC19 „Retoure abwickeln" (Disponent, Lieferant; extend UC11). Jetzt 19 Use Cases, 8 Akteure, 3 include, 5 extend.
- **Klassendiagramm (C7–C9, C13):** Klasse Servicemitarbeiter (Mitarbeiter); Reparaturauftrag–Kostenvoranschlag ist Assoziation statt Komposition; neue Assoziation Reklamation → Reparaturauftrag „führt zu Nacharbeit" und Attribut `Reparaturauftrag.kostenfrei`; `ErsatzteilReservierung.vorreserviere()`, `Reklamation.legeNacharbeitAn()`, `Lieferantenbestellung.storniere()/meldeRetoure()/retourengrund`, `Lieferant.bestaetigeBestellung()` statt `erstelleBestellung()`; `Mitarbeiter.rolle` und `Kostenvoranschlag.vorlaeufig` entfernt (Vererbung bzw. KvaStatus reichen); Mitarbeiter 0..* je Filiale; BestellStatus um RETOURE und GUTSCHRIFT ergänzt. Jetzt 27 Klassen, 36 Assoziationen.
- **Sequenz- und Zustandsdiagramm (C10–C14):** SD2 mit Servicemitarbeiter (Status und Versand) und maximal drei Erinnerungen; SD3 ohne Statuswechsel „Teile bestellt" (jetzt in SD6/UC10); SD4 ohne Rechnung (entsteht in UC15) und mit Endkontrolle als Bedingung; SD5 mit `Kunde.meldeMangel()`, Servicemitarbeiter und Werkstattleiter-Freigabe; SD6 nur noch UC10 mit `ref` auf UC12 und Bestellung im Status Vorschlag; Zustandsdiagramm „stm", Übergang „KVA geprüft" statt „KVA versendet", Nacharbeit-Übergang, Endkontrolle in der Bedingung. In Prozess 01 wird die Voranmeldung mit der Anfrage angelegt und am Ende bestätigt oder verworfen – passend zur Komposition Voranmeldung ◆ Medienanhang und zu SD1.
- **Texte:** OOA-Reihenfolge in Doku 5.3 (UC → Klassen → Interaktion → Zustand), KI-Diagnosedienst als Geschäftsregel statt Pool erklärt, Konsistenzaussage in 5.4 präzisiert, Klassendiagramm als Anhang C, Sprint-Zählung in `05-vergleich` angeglichen, QA-Checkliste `doku/qa-checkliste.md` angelegt (Entwurf für Jakob), Stand-Daten aktualisiert.
Kennzahlen: 125 Aktivitäten im Werkstatt-Pool (Ø 12,5), 77 automatisiert (62 %), 26 Aktivitäten beim Kunden, 39 Nachrichtenflüsse, 57 Datenobjekte und -speicher; beide Linter und die Layout-Prüfung ohne Befund.
Begründung: Aufgabenstellung (vollständige, syntaktisch korrekte Modelle) und Vorlesung (4-43 Nachrichtenflüsse, 4-50 Start/Ende, 5-54 include/extend, 5-60 Zustandsdiagramm nutzt Klassenoperationen). Die Entscheidung, ob Lagergebühr und Mahnung so gewollt sind, trifft die Gruppe am 15.10.

### E-16 Kunde als eigener Prozess statt Black Box (28.09.2026)

Datum: 28.09.2026 (Kilian, umgesetzt mit KI-Unterstützung; Bestätigung durch die Gruppe siehe E-07).
Entscheidung: Der Pool „Kunde" ist in P01–P09 kein Empty Pool mehr, sondern enthält einen eigenen, nicht ausführbaren Prozess (`isExecutable="false"`, ohne Camunda-Anreicherung) mit Start- und Endereignis. Die Nachrichtenflüsse enden an konkreten Elementen beider Pools statt am Pool-Rand. Beispiele: P01 – „Foto, Video oder Ton aufnehmen" → „Anfrage in der App senden" → ereignisbasiertes Warten auf Rückfrage (neue Aufnahme senden, Schleife) oder Diagnose → „Diagnose und Vorab-KVA prüfen" → Termin annehmen oder verfallen lassen → „Anfrage erledigt". P04 – KVA prüfen, freigeben oder ablehnen (bei Ablehnung Warten auf die Abholaufforderung). P08 – Gerät abholen, Zahlungsart wählen, bei Rechnung Überweisung senden. P09 – Mangel melden, Kulanzangebot annehmen oder ablehnen (Schleife), Ergebnis empfangen. P03, P05, P06, P07 haben kurze Kundenabläufe (Nachricht erhalten → zur Kenntnis nehmen bzw. entscheiden → Ende). Der Lieferant bleibt ein Empty Pool (Black Box, Vorlesung 4-44): Seine internen Abläufe kennen wir nicht und die Werkstatt kann sie nicht beeinflussen. P10 hat keinen Kunden-Pool.
Begründung: Beim Kunden war der Ablauf bekannt und fachlich relevant (Antworten, Entscheidungen, Wartezustände); als Black Box blieb unsichtbar, wann der Kunde was tut und wie ein Ablauf für ihn endet. Die Vorlesung erlaubt beides; ein ausmodellierter Partner-Pool zeigt die Kollaboration vollständiger.
Auswirkung (umgesetzt): `tools/bpmngen.py` (Partner-Pools mit eigenem Prozess, Nachrichtenflüsse Element ↔ Element), `tools/diagrams.py` (Kundenabläufe), alle Diagramme und Bilder neu erzeugt. Kennzahlen: Die Aktivitäten je Diagramm zählen weiterhin nur den Werkstatt-Prozess (121, Ø 12,1; 74 automatisiert); dazu kommen 24 Aktivitäten im Kunden-Prozess (`kunde_activities` in `tools/process_stats.json`). Beide Linter weiterhin ohne Befund. E-06 ist entsprechend angepasst.

### E-15 Korrekturen nach Gesamtprüfung (26.09.2026)

Datum: 26.09.2026 (Kilian, Prüfung mit KI-Unterstützung gegen Ablauf und Vorlesung; Bestätigung durch die Gruppe siehe E-07).
Entscheidung und Auswirkung (umgesetzt in `tools/diagrams.py`, `tools/umlmodel.py`, `uml/*.puml`, neu erzeugt):
- **BPMN, fachliche Fehler behoben:** P02 – nach „Auftrag an andere Filiale umleiten" werden jetzt auch Techniker und Termin festgelegt (vorher ging der Umleitungspfad ohne Termin direkt zum Annahmebeleg). P05 – „Reservierungen bestätigen" und die Meldebestandsprüfung laufen immer, erst danach werden Fehlteile über Prozess 06 bestellt (vorher entfielen beide, sobald ein Fehlteil vorhanden war). P06 – nach einer Retoure (Prozess 10) entscheidet P06: Ersatz geliefert → Teile dem Auftrag zuordnen; Gutschrift und Teil weiterhin benötigt → neu beim Lieferanten bestellen (Schleife in P06); sonst Ende ohne Teile. Das Endereignis heißt deshalb „Bestellung abgeschlossen" statt „Ersatzteile eingegangen" (vorher meldete P06 nach jeder Retoure „Ersatzteile eingegangen", auch ohne Teile). P08 – bei Zahlung auf Rechnung wartet der Prozess auf den Zahlungseingang, bevor die Zahlung verbucht wird (vorher wurde „Rechnung [bezahlt]" ohne Zahlung gesetzt); die Nachrichtenflüsse gehen nur noch von der obersten Zeile aus. P09 – die Nacharbeit wird als neuer Reparaturauftrag angelegt („Nacharbeitsauftrag anlegen", Datenobjekt „Reparatur-auftrag [angenommen]"), passend zu SD5 und Zustandsdiagramm. P10 – der Aufruf „07 Reparatur fortsetzen" ist entfallen (er hätte auch bei Gutschrift, also ohne Teil, die Reparatur fortgesetzt); P10 wickelt nur noch die Retoure ab. P03 – „Auftragsstatus auf 'abgelehnt' setzen" mit Datenobjekt „Reparatur-auftrag [abgelehnt]" statt „Auftrag als nicht reparierbar schließen" (Übergang in Diagnose → abgelehnt im Zustandsdiagramm).
- **BPMN, Konsistenz:** Datenobjekt „Reparatur-auftrag [eingeplant]" entfernt (EINGEPLANT ist kein Wert von AuftragStatus); „Gerät" → „Geraet", „KVA-Position" → „Kva-Position" (Klassennamen); Reservierungen mit Status [vorreserviert]/[reserviert]; Timer im Partizip Perfekt („3/5/7 Tage verstrichen"); Aufruf in P09 heißt wie in P06 „10 Retoure abwickeln". Konvention präzisiert: ein Start- und ein Endereignis je Prozessebene, eingebettete Teilprozesse haben ihr eigenes (der p05-Befund vom 02.09. war ein False Positive).
- **BPMN, Abgabe:** Die Dateien im ZIP heißen nach Ablauf „zweistellige Nummer + prägnanter Modellname" (`01-Sofortdiagnose.bpmn` … `10-Retoure.bpmn`); im Repository bleiben die Namen `p01-…` (E-11).
- **UML:** Botschaften in SD1, SD2, SD4, SD5, SD6 sind jetzt Operationen der Empfängerklasse (Regel „Botschaft = Operation"); SD3 und SD5 ohne Freitext-Botschaften, SD5 mit getrennten Lebenslinien für Ursprungs-, Nacharbeits- und Neuauftrag; KI-Diagnosedienst in SD1. Klassenmodell: neue Operationen `Reparaturauftrag.getRechnung()`, `Rechnung.getRechnungsdatum()`, `Lieferantenbestellung.freigeben()`, `Lagerbestand.reserviere(anzahl)`; `Medienanhang.analysieren()` liefert `boolean`; Multiplizitäten KIDiagnosevorschlag–Kostenvoranschlag 0..1:0..1 und Reparaturauftrag◆Kostenvoranschlag 0..1 (Vorab-KVA existiert vor dem Auftrag); Reparaturauftrag–Geraet ist Assoziation statt Komposition; neue Assoziation Ersatzteil–Lieferant „Vorzugslieferant" (35 Assoziationen). Use Cases: UC10 erweitert UC09 (extend statt include); Akteurzuordnung an die Sequenzdiagramme angepasst (Kunde–UC14, Techniker–UC07/UC16, Werkstattleiter–UC10). Zustandsdiagramm: Zustandsnamen wortgleich zu AuftragStatus, jeder Übergang mit `wechsleStatus(…)`, „nicht reparierbar" führt nach abgelehnt, Reklamation startet einen neuen Auftrag statt eines Rücksprungs, kein Übergang „in Reparatur → KVA offen" mehr (der Nachtrags-KVA hat seinen eigenen KvaStatus, der Auftrag bleibt in Reparatur – wie in P07). XMI: `List<…>`-Parameter mit Multiplizität 0..*.
Begründung: Aufgabenstellung (syntaktisch korrekte, vollständige Modelle) und Vorlesung (Kap. 4 Best Practices, Kap. 5 Konsistenzregeln).

### E-13 Rollenverteilung, Präsentationstermin und Gruppentermine

Datum: 02.09.2026 (Gruppentermin, Sprint 1).
Entscheidung: (a) Rollen nach Kilians Liste: Nina Projektleitung, David stellvertretende Projektleitung und Backup-Beauftragter, Adrian Product Owner, Kilian Scrum Master und UML-Verantwortlicher, Maxi BPMN-Verantwortlicher, Jakob Qualitätsmanager, Claude Dokumanager. (b) Abschlusspräsentation am 27.10.2026, 09:00 Uhr, Raum B458 laut `Allgemeines.docx`; der 22.10. ist der letzte Gruppentermin und dient als Generalprobe. (c) Sprint-Takt = Gruppentermine 02.09., 05.10., 15.10., 22.10. (je 4:15 h); Trello-Board mit einer Liste je Termin.
Auswirkung (umgesetzt): Doku Kapitel 1 und 4, `02-team-und-rollen.md`, Folie 16 und 20 der Präsentation (Sprecherzuordnung: Nina 1–2/18–19, David 3/16, Adrian 4–6/11, Maxi 7–10, Kilian 12–14, Jakob 15/17), README-Dateien in `bpmn/`, `uml/`, `abgabe/`.

### E-01 Projektthema RepairFlow

Datum: vor dem 02.09.2026 (Konzept wurde dem Dozenten vorgestellt).
Entscheidung: Werkstatt-Management-System RepairFlow für Fahrrad-, E-Bike- und Elektronikreparaturen; Referenzszenario FixWerk GmbH mit vier Filialen.
Begründung: Klar erkennbare Geschäftsprozesse (Annahme, Diagnose, KVA, Beschaffung, Reparatur, Abrechnung, Reklamation), Automatisierungspotential im Auftrags-Lebenszyklus und in der filialübergreifenden Ersatzteil-Disposition.

### E-02 Perspektive: Solution Provider

Datum: 02.09.2026 (David, vorläufig bis Bestätigung durch die Gruppe, siehe E-07). Frage kam vom Dozenten bei der Konzeptvorstellung.
Entscheidung: Wir sind das Startup RepairFlow, das Werkstätten eine Software- und Workflow-Lösung als SaaS anbietet. Die FixWerk GmbH (vier Filialen) ist unser Pilot- und Referenzkunde, an dem die Prozesse analysiert wurden.
Begründung: Echtes Startup-Szenario; Mitbewerber sind greifbar (Fahrrad: fixdesk, RO App, Repero, MCA Bike; Elektronik: RepairDesk, RepairShopr); das Gimmick ist ein Produkt-Feature; die Frage „warum kauft ihr keine fertige Werkstattsoftware?" stellt sich nicht.
Verworfen: Betreiber-Perspektive (FixWerk führt ein eigenes System ein): schwacher Startup-Charakter, Mitbewerber wären andere Werkstätten.
Auswirkung (umgesetzt): Texte in Doku und Präsentation; im Klassendiagramm `Werkstattbetrieb` (Mandant) über `Filiale` und `Mitarbeiter`; Use Case UC18 Werkstattbetrieb und Filialen verwalten mit Akteur Werkstattinhaber; Kapitel Markt und Wettbewerb in der Doku.

### E-03 Gimmick: KI-Sofortdiagnose

Datum: 02.09.2026 (David, vorläufig, siehe E-07).
Entscheidung: Hauptfeature „KI-Sofortdiagnose": Der Kunde lädt in der RepairFlow-App Foto, Video oder eine Tonaufnahme des defekten Geräts hoch. Die KI erstellt einen Diagnosevorschlag mit wahrscheinlicher Ursache, benötigten Ersatzteilen und einem vorläufigen Kostenvoranschlag, prüft die Teileverfügbarkeit über alle Filialen und schlägt Filiale und Termin vor. Der Techniker bestätigt oder korrigiert den Vorschlag bei der Annahme. Slogan: „KVA in 60 Sekunden".
Verworfen bzw. zurückgestellt: G2 Predictive Disposition (als Ausblick erwähnt), G3 Techniker-Copilot, G4 digitale Geräteakte.
Begründung: Hängt direkt am Kernproblem (Kundenkommunikation, KVA-Freigabe), ist heute nur teilweise realisierbar (genau das wollte der Dozent) und liefert von allein einen Prozess, Use Cases und ein Sequenzdiagramm.
Auswirkung (umgesetzt): Prozess 01 KI-Sofortdiagnose und Voranmeldung; Use Cases UC01 Sofortdiagnose anfordern, UC02 Voranmeldung bestätigen, UC04 Diagnosevorschlag prüfen; Akteur KI-Diagnosedienst; Klassen `Voranmeldung`, `Medienanhang`, `KIDiagnosevorschlag`; Sequenzdiagramm SD1.

### E-04 GitHub als gemeinsamer Ablageort für Doku und Entscheidungen

Datum: 02.09.2026 (Vorschlag Claude/David, gilt bis jemand widerspricht).
Entscheidung: Alles Schriftliche zum Projekt liegt im Repo (seit E-11 in `doku/`, vorher `docs/`), Änderungen über `docs/…`-Branch und Pull Request wie in der README beschrieben.
Begründung: Alle arbeiten ohnehin im Repo; das Repo ist in Davids Claude-Projekt eingebunden, damit hat der Dokumanager automatisch den aktuellen Stand.

### E-05 Prozessliste mit 10 Diagrammen

Datum: 02.09.2026 (David/Claude, vorläufig, siehe E-07).
Entscheidung: Die Terminplanung ist kein eigener Prozess mehr, sondern eine Lane „Werkstattleitung" innerhalb der Auftragsannahme (Kapazität prüfen, Techniker zuweisen, Termin bestätigen). Dafür kommt die KI-Sofortdiagnose als neuer Prozess 01 hinzu, es bleibt bei genau 10 Diagrammen:

| Nr | Diagramm | Pools |
|---|---|---|
| 01 | KI-Sofortdiagnose und Voranmeldung | Kunde, Werkstattbetrieb |
| 02 | Auftragsannahme, Geräteregistrierung und Terminplanung | Kunde, Werkstattbetrieb |
| 03 | Fehlerdiagnose | Kunde, Werkstattbetrieb |
| 04 | Kostenvoranschlag und Kundenfreigabe | Kunde, Werkstattbetrieb |
| 05 | Ersatzteil-Verfügbarkeit und Reservierung (filialübergreifend) | Kunde, Werkstattbetrieb |
| 06 | Ersatzteil-Bestellung beim Lieferanten | Lieferant, Werkstattbetrieb, Kunde |
| 07 | Reparaturdurchführung und Arbeitszeiterfassung | Kunde, Werkstattbetrieb |
| 08 | Abholung, Rechnung und Zahlung | Kunde, Werkstattbetrieb |
| 09 | Reklamation und Gewährleistung | Kunde, Werkstattbetrieb |
| 10 | Ersatzteil-Retoure und Lieferanten-Reklamation | Werkstattbetrieb, Lieferant |

Begründung: Die Terminplanung war der einzige Prozess ohne zweiten Pool und damit das schwächste Kollaborationsdiagramm; die Sofortdiagnose ist das Aushängeschild und braucht ein eigenes Diagramm. Stand 02.09.2026: alle zehn Diagramme liegen in `bpmn/`.

### E-06 Modellierungskonventionen BPMN (nach Vorlesung SYAN-04, Prof. Freytag)

Datum: 02.09.2026 (Claude/David).
Entscheidung: Pool = Unternehmen (Werkstattbetrieb, Kunde, Lieferant), Lanes = Rollen im Werkstattbetrieb (Service / Annahme, Techniker, Werkstattleitung, Ersatzteil-Disposition). Keine „System-Lane": Computer sind laut Vorlesung keine Ressource. RepairFlow wird über die Aktivitätstypen sichtbar: automatisierte Aktivität (Service Task) = RepairFlow erledigt den Schritt allein, Benutzer-Aktivität = Mensch mit RepairFlow-Oberfläche, sendende/empfangende Aktivität = Nachricht über RepairFlow an Kunde oder Lieferant, Geschäftsregel-Aktivität = KI- oder Regelentscheidung, manuelle Aktivität = außerhalb der Systemgrenze (physische Reparatur, Übergabe). Kunde und Lieferant sind eigene Pools mit Nachrichtenflüssen; seit E-16 hat der Kunde einen eigenen, nicht ausführbaren Prozess, der Lieferant bleibt ein Empty Pool (Black Box). Je Diagramm ein Start- und ein Endereignis (Best Practice aus der Vorlesung), Ereignisse im Partizip Perfekt („Auftrag angenommen"), Aktivitäten als Verb mit Objekt („Kundendaten erfassen"). Datenobjekte tragen Klassennamen aus dem Klassendiagramm, ggf. mit Zustand in eckigen Klammern; RepairFlow-Datenbank als Datenspeicher.
Ergänzung 02.09.2026: Die Diagramme sind für Camunda 8 „engine-ready" angereichert (Task-Definitionen, Message-Subscriptions, Timer-Dauern, FEEL-Bedingungen, Formular-IDs), damit das Problems-Panel des Camunda Modelers leer bleibt. Loops enthalten immer einen Wartezustand (User Task, Receive Task oder Timer), weil der Camunda-Linter sonst eine Endlosschleife meldet.

### E-08 Ablagestruktur im Repository (ersetzt durch E-11)

Datum: 02.09.2026 (Claude/David, vorläufig, siehe E-07).
Entscheidung: `bpmn/` (Diagramme + PNG), `uml/` (PlantUML, PNG, XMI), `doku/` (docx + PDF), `praesentation/` (pptx + PDF), `abgabe/` (ZIPs für Moodle), `tools/` (Generatoren), `docs/` (Doku des Teams), `archiv/repairflow-v1/` (erste Fassung der Projektgrundlagen). Dateinamen der Abgabe nach Ablauf: `Projekt-WWI25B4-Gruppe1.pdf`, `BPMN-WWI25B4-Gruppe1.zip`, `UML-WWI25B4-Gruppe1.vpp`, `Praesentation-WWI25B4-Gruppe1.pdf`.
Begründung: Ein Ordner je Artefakttyp, Verantwortliche sind in der README zugeordnet, die Abgabenamen stehen früh fest.

### E-09 Umfang der UML-Modelle (überholt durch E-10, E-15 und E-17: 27 Klassen, 36 Assoziationen, 19 Use Cases, sechs Sequenzdiagramme)

Datum: 02.09.2026 (Claude/David, vorläufig).
Entscheidung: 18 Use Cases in vier Bereichen mit sieben Akteuren (davon zwei sekundär: Lieferant, KI-Diagnosedienst); 23 Klassen mit sieben Aufzählungen; Sequenzdiagramme zu UC01, UC07, UC09, UC14 und UC16; zusätzlich ein Zustandsdiagramm für Reparaturauftrag.
Begründung: Die Mindestanforderungen (10 UCs, 10 Klassen, 5 SDs) sind deutlich erfüllt, ohne dass das Modell unübersichtlich wird; die fünf Sequenzdiagramme sind die interaktionsreichsten Use Cases und decken Sofortdiagnose, KVA, Disposition, Fertigmeldung und Reklamation ab.

### E-10 Zusammenführung der beiden Entwürfe (Kilian V2 und Claude/David)

Datum: 02.09.2026 (Claude/David, vorläufig bis Bestätigung durch die Gruppe).
Entscheidung: Basis ist der Solution-Provider-Entwurf mit KI-Sofortdiagnose (Camunda 8, Linter ohne Befund). Aus Kilians V2 übernommen: Rollenklassen `Mitarbeiter` → `Techniker`/`Disponent`/`Werkstattleiter` und `Kunde.meldeMangel()` im Klassendiagramm (jetzt 26 Klassen, 34 Assoziationen; seit E-15: 35), Datenspeicher `Technikerplan` (P02) und `Buchhaltung (DATEV-Export)` (P08), Sequenzdiagramm SD6 Nachbestellvorschlag, Doku-Kapitel 3.3 Qualitätssicherung und 4 Projektmanagement (Scrum, Sprintplan, Trello, Git-Regeln), Abschnitt 5.4 Konsistenz, KI-Nutzungshinweis.
Begründung: siehe `05-vergleich-und-zusammenfuehrung.md`. Beide Entwürfe haben Stärken; die Zusammenführung erhält das Dozentenfeedback (Perspektive, Gimmick) und ergänzt das, was bei uns Platzhalter war (Projektmanagement).
Auswirkung: E-09 ist überholt (26 Klassen, sechs Sequenzdiagramme statt fünf), E-08 wird durch E-11 ersetzt.

### E-11 Ablagestruktur nach Jakobs neuem `main` (ersetzt E-08)

Datum: 02.09.2026 (Jakob per Commit `bf9b448`/`3f437f3`, von Claude/David übernommen).
Entscheidung: Ordner `bpmn/`, `uml/`, `doku/`, `praesi/`, `claude.readme/` (dazu `abgabe/` und `tools/` aus E-08). Dateinamen ohne Umlaute und ohne Projekt-Präfix; Quelle und Bild mit gleichem Basisnamen (`klassen.puml` ↔ `klassen.png`, `p01-sofortdiagnose.bpmn` ↔ `p01-sofortdiagnose.png`). Commit-Nachrichten mit Termin-Stempel `[T<nn> <JJJJ-MM-TT>] <typ>: <beschreibung>` (T03 = 02.09.2026), kein direkter Commit auf `main`, Pull Request mit Review. Team-Doku (`docs/`) wandert nach `doku/`.
Begründung: Ein Layout für alle; Jakobs Struktur ist bereits auf `main`, die Konventionen stehen in `claude.readme/README.md`.
Auswirkung (umgesetzt): Der Merge auf `main` ist erledigt; Kilians V1-Dateien (`bpmn/p01.bpmn` …, `uml/klassen.puml` mit 18 Klassen, alte Doku) liegen unter `archiv/alte-versionen/`, sein UML-Paket der Betreiber-Variante unter `archiv/uml-v1-betreiber/`.

### E-12 Vorgehensmodell und Sprintplan

Datum: 02.09.2026 (Kilian in V2, von Claude/David in Doku Kapitel 4 übernommen; Termine vorläufig, siehe E-13).
Entscheidung: Scrum mit Product Owner (Adrian), Scrum Master (Kilian) und Projektleitung (Nina) als Ansprechpartnerin des Dozenten; Sprint-Takt = Gruppentermine. Ursprünglich Sprint 0 (02.09.) bis Sprint 3; durch E-13 ersetzt durch die Zählung der Doku (Kapitel 4.2): Sprint 1 (02.09.) Setup und Konventionen, Sprint 2 (03.09.–05.10.) Korrekturen und Verhalten, Sprint 3 (06.10.–15.10.) Fertigstellung, Sprint 4 (16.10.–22.10.) Freeze und Generalprobe; Abschluss 27.10. Präsentation und 13.11. Abgabe. Trello-Board „RepairFlow – Fallstudie SYAN WWI25B4 G1" mit einer Liste je Termin (02.09., 05.10., 15.10., 22.10., 27.10., 13.11.) sowie Product Backlog, In Arbeit, Review/QA, Done.
Begründung: Der Ablauf verlangt ein Kapitel Projektmanagement; Kilians Plan ist konkret und passt zu den Rollen.
