# QA-Checkliste (Definition of Done)

Gültig ab 05.10.2026 (Jakob, Qualitätsmanager). Abgeleitet aus Doku Kapitel 3.3, den Konventionen in `bpmn/README.md`, `uml/README.md`, `claude.readme/CLAUDE.md` und dem Gruppenbeschluss E-21. Jeder Pull Request wird vor dem Merge auf `main` gegen die passenden Abschnitte geprüft; gemergt wird durch Jakob. Änderungen an der Liste bitte per Pull Request.

## Für jedes Artefakt

- [ ] Änderung liegt in einem eigenen Branch, Pull Request mit Review durch eine zweite Person
- [ ] Branch vor dem Merge mit dem aktuellen `main` abgeglichen, keine Konflikte
- [ ] Namenskonventionen eingehalten (Dateinamen ohne Umlaute, Quelle und Bild mit gleichem Basisnamen), Commit-Stempel `[T<nn> JJJJ-MM-TT]`
- [ ] Betroffene Texte nachgezogen (Doku, Folien, READMEs, Entscheidungslog)
- [ ] Neue Entscheidung: vorher `main` pullen und die nächste freie E-Nummer nehmen (am 05.10. war E-20 doppelt vergeben)
- [ ] UML: Commit auf dem VP-Teamwork-Server erledigt

## BPMN (je Diagramm)

- [ ] Im Camunda Modeler (Camunda 8) geöffnet, Problems-Panel leer, gespeichert
- [ ] PNG nach dem Speichern neu exportiert (gleicher Basisname wie die `.bpmn`-Datei)
- [ ] Ein Start- und ein Endereignis je Prozessebene, Ereignisse im Partizip Perfekt, Aktivitäten als Verb + Objekt
- [ ] XOR-Gateways mit Frage und beschrifteten Ausgängen, jede Warteschleife mit Ausstieg (Timer oder Zähler)
- [ ] Kommunikation zwischen Pools nur über Nachrichtenflüsse; jeder Send Task und jedes Nachrichtenereignis hat ein Gegenstück
- [ ] Datenobjekte tragen Klassennamen aus dem Klassendiagramm, Zustände sind Werte der zugehörigen Aufzählung
- [ ] Aufruf-Aktivitäten verweisen auf den richtigen Prozess, Start des aufgerufenen Prozesses passt zur Aufrufsituation
- [ ] Kennzahlen in `bpmn/README.md`, Doku 5.1 und auf den Folien noch korrekt

## UML

- [ ] Genau ein aktives vollständiges Klassendiagramm (`uml/klassen.puml/.png`), keine Fokusvarianten
- [ ] PNG nach jeder Änderung der `.puml` neu gerendert
- [ ] Use Cases und Sequenzdiagramme passen zu den BPMN-Prozessen (Zuordnung siehe E-18, auch nach späteren BPMN-Änderungen)
- [ ] Jede Botschaft an eine Klassen-Lebenslinie ist eine Operation dieser Klasse im Klassendiagramm
- [ ] Jede Lebenslinie ist eine Klasse oder ein Akteur des Modells; ref-Fragmente verweisen auf existierende Use Cases
- [ ] include/extend-Richtung stimmt (Basis → inkludiert, erweiternd → Basis) und ist fachlich begründet
- [ ] Zustandsdiagramm nutzt nur Zustände der Aufzählung AuftragStatus und Operationen der Klasse Reparaturauftrag
- [ ] Statuswechsel in BPMN, Sequenzdiagramm und Zustandsdiagramm stimmen überein
- [ ] In Visual Paradigm committet, `.vpp` gesichert und in `uml/` eingecheckt

## Doku und Präsentation

- [ ] Zahlen (Aktivitäten, Klassen, Use Cases, Assoziationen) gegen `bpmn/README.md` und das Klassendiagramm geprüft
- [ ] Bilder entsprechen dem aktuellen Stand der Quellen
- [ ] Keine gelben Platzhalter mehr; Titelseite vollständig; Sprecherzuordnung auf der letzten Folie aktuell
- [ ] Kein KI-Absatz in der Doku; KI-Einsatz beim Moodle-Upload angegeben (E-21)
- [ ] PDF neu exportiert, BPMN-ZIP von Hand gepackt, Dateinamen nach Ablauf (`Projekt-WWI25B4-Gruppe1.pdf`, `BPMN-…zip` mit `01-Sofortdiagnose.bpmn` …, `UML-…vpp`, `Fallstudie-…zip`)

## Prüfstand 05.10.2026

Geprüft von Jakob (mit KI-Unterstützung) auf `main` nach PR #4: das Abgleich-Protokoll `archiv/doku/protokolle/2026-10-05-uml-bpmn-abgleich.md` gegen die damaligen BPMN-Dateien und PNGs, dazu die Bildstände. Die automatische UML-Prüfung (`archiv/tools/check_uml.py`) lief für diesen Stand ohne Befund (109 BPMN-Anker).

Aktualisierung nach PR #6 (`main` auf `cc329e1`): Q4 und Q5 sind erledigt. Alle 20 Diagrammbilder der Projektdokumentation entsprechen den aktuellen PNGs im Repository. Beim Dokumentationsabgleich wurde außerdem der oben abgeschnittene Use-Case-Export aus der unveränderten `.puml` vollständig neu gerendert (Q8). Die Kennzahlen wurden aus den aktuellen BPMN-XML nachgezählt: 131 Werkstatt-Aktivitäten, davon 79 automatisiert, sowie 26 Kundenaktivitäten. Q1 bis Q3 bleiben offen; zusätzlich ist der fehlende Empfang einer Ersatzlieferung in P10 zu klären (B12, siehe offene Frage zu E-20). Die abschließende Prüfung im Camunda Modeler und die VPP-Datei stehen weiterhin aus.

| Nr. | Befund | Wer |
|---|---|---|
| Q1 | P06: Die Warteschleife Lieferung → „14 Tage verstrichen" → „Lieferung anmahnen" hat keinen Ausstieg (verstößt gegen „jede Warteschleife mit Ausstieg"). Grenze und Folge (Storno, alternativer Lieferant) festlegen, siehe offene Frage zu E-20. | Maximilian, David |
| Q2 | SD4 (UC14): Die Schleife „Endkontrolle bis Qualität in Ordnung" kennt den Abbruch nach der zweiten erfolglosen Nacharbeit nicht (P07 `GW07_Grenze`, `T07_Abbruch`, Zustandsdiagramm in Reparatur → abgelehnt, E-19). | David (SD4 in VP) |
| Q3 | SD4: Der ref auf UC13 nennt für einen freigegebenen Nachtrag nur „weitere Schritte"; seit E-19 werden die Teile vorher über P05 disponiert (`T07_Teile`). | David |
| Q4 | Erledigt durch PR #6: PNGs von P05/P06, SD3/SD6 und Use-Case-Diagramm aktualisiert; die Bilder in der Projektdokumentation stimmen mit den eingecheckten PNGs überein. | erledigt |
| Q5 | Erledigt durch PR #6: Doku und Folien nennen 131 Aktivitäten (Ø 13,1). Die Aktivitäten der Doku wurden erneut gegen die aktuellen BPMN-XML geprüft. | erledigt |
| Q6 | Protokoll vom UML-Abgleich ist durch E-19/E-20 teilweise überholt: `GW05_Bedarf`, `T06_AB`, `T06_Lieferung` gibt es nicht mehr (jetzt `GW05_Fehlteile`, `GW06_AB`/`E06_AB`/`E06_ABTimer`, `E06_Lieferung`); UC09 jetzt mit Servicemitarbeiter statt Techniker, UC10 nur bei Fehlteilen; neue Pfade in P07/P08 (Abbruch, Verwertung, Inkasso) fehlen in der Tabelle. Die UML-Quellen sind für P05/P06 bereits nachgezogen; das Protokoll bleibt als archivierter Stand, kein Handlungsbedarf außer Q2/Q3. | – |
| Q7 | Zuständigkeit BPMN 09/10 ist durch E-21 geklärt (Maximilian, BPMN inklusive 09/10). | erledigt |
| Q8 | Erledigt beim Dokumentationsabgleich: Das Use-Case-PNG war oben abgeschnitten. Vollständiger Neu-Export mit PlantUML 1.2026.8 aus der unveränderten Quelle, mit allen acht Akteuren; PNG im Repository und Bild in der Doku ersetzt. | erledigt |
