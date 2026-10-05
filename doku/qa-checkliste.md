# QA-Checkliste (Definition of Done)

Entwurf vom 05.10.2026 für Jakob (Qualitätsmanager), abgeleitet aus Doku Kapitel 3.3 und den Konventionen in `bpmn/README.md`, `uml/README.md` und `claude.readme/CLAUDE.md`. Jakob bestätigt oder ändert die Liste am 15.10.; danach gilt sie für jedes Artefakt vor dem Merge auf `main`.

## Für jedes Artefakt

- [ ] Änderung liegt in einem Branch, Pull Request mit Review durch eine zweite Person
- [ ] Namenskonventionen eingehalten (Dateinamen ohne Umlaute, Quelle und Bild mit gleichem Basisnamen)
- [ ] Betroffene Texte nachgezogen (Doku, Folien, READMEs, Entscheidungslog)
- [ ] Ablage im Fach-Repository (Camunda Cloud bzw. VP-Teamwork-Server) erledigt

## BPMN (je Diagramm)

- [ ] Im Camunda Modeler (Camunda 8) geöffnet, Problems-Panel leer, gespeichert
- [ ] `python3 tools/check_layout.py bpmn` und beide Linter ohne Befund
- [ ] Ein Start- und ein Endereignis je Prozessebene, Ereignisse im Partizip Perfekt, Aktivitäten als Verb + Objekt
- [ ] XOR-Gateways mit Frage und beschrifteten Ausgängen, jede Warteschleife mit Ausstieg (Timer oder Zähler)
- [ ] Kommunikation zwischen Pools nur über Nachrichtenflüsse; jeder Send Task und jedes Nachrichtenereignis hat ein Gegenstück
- [ ] Datenobjekte tragen Klassennamen aus `tools/umlmodel.py`, Zustände sind Werte der zugehörigen Aufzählung
- [ ] Aufruf-Aktivitäten verweisen auf den richtigen Prozess, Start des aufgerufenen Prozesses passt zur Aufrufsituation
- [ ] Kennzahlen neu gezählt (`python3 tools/mkstats.py`), ZIP neu gepackt (`python3 tools/pack_bpmn.py`)

## UML

- [ ] Genau ein aktives vollständiges Klassendiagramm (`uml/klassen.puml/.png`), keine Fokusvarianten
- [ ] `python3 tools/check_uml.py` ohne Befund; fachlichen BPMN-Abgleich aus E-18 mitprüfen

- [ ] Jede Botschaft an eine Klassen-Lebenslinie ist eine Operation dieser Klasse (`tools/umlmodel.py`)
- [ ] Jede Lebenslinie ist eine Klasse oder ein Akteur des Modells; ref-Fragmente verweisen auf existierende Use Cases
- [ ] include/extend-Richtung stimmt (Basis → inkludiert, erweiternd → Basis) und ist fachlich begründet
- [ ] Zustandsdiagramm nutzt nur Zustände der Aufzählung AuftragStatus und Operationen der Klasse Reparaturauftrag
- [ ] Statuswechsel in BPMN, Sequenzdiagramm und Zustandsdiagramm stimmen überein
- [ ] XMI neu erzeugt (`python3 tools/umlmodel.py uml`), in Visual Paradigm importiert, `.vpp` gesichert

## Doku und Präsentation

- [ ] Zahlen (Aktivitäten, Klassen, Use Cases, Assoziationen) gegen `tools/process_stats.json` und `tools/umlmodel.py` geprüft
- [ ] Keine gelben Platzhalter mehr; Titelseite vollständig; Sprecherzuordnung auf der letzten Folie aktuell
- [ ] PDF neu exportiert, Dateinamen nach Ablauf (`Projekt-WWI25B4-Gruppe1.pdf`, `BPMN-…zip`, `UML-…vpp`, `Fallstudie-…zip`)
