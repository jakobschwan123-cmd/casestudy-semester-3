# UML-Modelle (objektorientierte Analyse)

Abgegeben wird `UML-WWI25B4-Gruppe1.vpp` aus Visual Paradigm; sie kommt in diesen Ordner. `modell.xmi` ist die Importdatei für Klassen- und Use-Case-Modell. Die Vorlagen zum Nachzeichnen (PlantUML-Quelle und PNG) liegen in `entwurf-plantuml/`.

| Datei | Inhalt |
|---|---|
| modell.xmi | XMI 2.1 (UML 2.x) mit Klassenmodell (27 Klassen, 7 Aufzählungen, 36 Assoziationen) und Anwendungsfallmodell (19 Use Cases, 17 Akteure, 19 Akteur-Verbindungen, 2 include, 6 bedingte extend; Lieferant ist Black Box, kein Akteur) für einen kompletten Neuimport in Visual Paradigm |
| modell-usecase.xmi | nur das Anwendungsfallmodell (Stand E-24, je Use Case eine Rolle), zum Neuimport, wenn das Klassenmodell schon in VP liegt |
| entwurf-plantuml/klassen.puml / .png | einziges vollständiges Klassendiagramm; alle Klassen, Operationen und Beziehungen innerhalb einer Abbildung |
| entwurf-plantuml/usecase.puml, usecase_layout.py / usecase.png, .svg | Use-Case-Diagramm mit einer Rolle je Use Case (E-24). Das PNG erzeugt `usecase_layout.py` (festes Raster: Rollen links, Use Cases nach Bereichen, externe Akteure rechts), weil das PlantUML-Automatiklayout bei 1:1-Verbindungen unlesbar wird; die `.puml` bleibt die Modellquelle |
| entwurf-plantuml/sequenz-01-sofortdiagnose … sequenz-06-nachbestellvorschlag.puml / .png | sechs Sequenzdiagramme (UC01, UC07, UC09, UC14, UC16, UC10), seit 15.10. auf den Kernablauf gekürzt (E-28): je 7 bis 16 Botschaften, höchstens fünf Fragmente, Ausnahmen als ref; gefordert sind fünf |
| entwurf-plantuml/zustand-reparaturauftrag.puml / .png | Zustandsdiagramm der Klasse Reparaturauftrag (Zusatz, nicht gefordert) |
| entwurf-plantuml/systemkontext.puml, systemkontext_layout.py / .png, .svg | Systemkontext für die Doku (Abbildung 1); das PNG erzeugt `systemkontext_layout.py` im festen Raster, die `.puml` beschreibt denselben Inhalt |

## Vorgehen in Visual Paradigm 18

Zuständig seit 15.10.2026 (E-23): Kilian Klassendiagramm, SD1, SD4, Konsistenzprüfung und VPP-Datei; David Use-Case-Diagramm, SD2, SD3, SD5 und SD6. Der Import (Schritt 2) ist erledigt, das Klassendiagramm ist angelegt. Vor jeder Sitzung **Update**, nach jedem fertigen Diagramm **Commit**, jeder bearbeitet nur seine eigenen Diagramme.

**Use-Case-Diagramm neu aufbauen (E-24):** Das importierte Anwendungsfallmodell hat noch die alten acht Akteure. Vorgehen: (1) Commit, damit nichts verloren geht. (2) Im Model Explorer nur das Paket „Anwendungsfallmodell“ löschen (aus dem Modell); „Klassenmodell“ und „Datentypen“ bleiben. Das geht gefahrlos, solange noch keine Sequenzdiagramme als Unterdiagramme an den Use Cases hängen. (3) Project → Import → XMI → `modell-usecase.xmi`. Nicht die komplette `modell.xmi`, sonst gibt es alle Klassen doppelt. (4) Neues Use Case Diagram „ud : RepairFlow“, Systemgrenze „RepairFlow“ mit den vier Bereichen als Pakete oder Rechtecke, Elemente aus dem Paket hineinziehen und nach `usecase.png` anordnen: Rollen links, Use Cases in der Mitte, KI-Diagnosedienst rechts neben UC01. Den Kunden dreimal aus dem Model Explorer ziehen; VP legt weitere Ansichten desselben Elements an. Der Lieferant ist kein Akteur (Black Box, E-24). UC08 bekommt keinen Akteur. (5) Commit.

1. Lehre-VPN starten, Visual Paradigm öffnen, Teamwork Client anmelden, Repository **WWI25B4G1 (trunk)** auschecken und öffnen (Anleitung in `5_team/01-projektkontext.md`).
2. **Modell importieren:** Project → Import → XMI…, Datei `modell.xmi` wählen. Im Model Explorer erscheinen die Pakete Datentypen, Klassenmodell und Anwendungsfallmodell mit allen Elementen. Falls der Import Fehler meldet: Meldung notieren und in `5_team/protokolle/` ablegen, dann Klassen nach dem PNG von Hand anlegen (die Attribute und Operationen stehen komplett in `klassen.puml`).
3. **Klassendiagramm anlegen:** neues Class Diagram „cd RepairFlow" in den Standardordner, Klassen und Aufzählungen aus dem Model Explorer auf die Fläche ziehen (mehrere markieren und gemeinsam ziehen). Assoziationen und Generalisierungen werden automatisch mitgezeichnet. Layout nach dem PNG ordnen: links Mandant, Personen und Mitarbeiter-Rollen (Servicemitarbeiter, Techniker, Disponent, Werkstattleiter), Mitte Auftrag, rechts Disposition, Aufzählungen am Rand.
4. **Use-Case-Diagramm anlegen:** neues Use Case Diagram „ud RepairFlow", Systemgrenze „RepairFlow" zeichnen, Use Cases aus dem Model Explorer hineinziehen, Akteure links (primär) und rechts (Lieferant, KI-Diagnosedienst). include/extend kommen aus dem Modell mit.
5. **Sequenzdiagramme als Unterdiagramme:** im Use-Case-Diagramm den Use Case rechtsklicken → Sub Diagrams → New Diagram → Sequence Diagram. So verlangt es der Ablauf („Verfeinerungsdiagramm"). Je Use Case eines: UC01 Sofortdiagnose anfordern (SD1, Kilian), UC07 KVA freigeben / ablehnen (SD2, David), UC09 Ersatzteile disponieren und reservieren (SD3, David), UC14 Auftrag fertigmelden (SD4, Kilian), UC16 Reklamation bearbeiten (SD5, David), UC10 Lieferantenbestellung auslösen (SD6, David, Bestellbedarf aus UC12; ref auf UC11/UC19). Lebenslinien: Akteure als Actor, Objekte als „: Klassenname" mit der Klasse aus dem Modell verknüpfen (dann bietet VP die Operationen zur Auswahl an). Fragmente alt/opt/loop/break und ref wie in den PNGs. Objekterzeugung mit dem Werkzeug **Create Message** auf den Kopfkasten der Lebenslinie (gestrichelt, Kasten sitzt dann auf Nachrichtenhöhe – Notation VL 6 Folie 5-70); die PNGs zeigen das seit 15.10. genauso, ein «create»-Text wird nicht eingetragen. Diagrammname `sqd: UCxx Name`, im Diagramm Presentation Options → Message Display Options → Parameter Types ausblenden.
6. Optional: Zustandsdiagramm „stm Reparaturauftrag" als Unterdiagramm der Klasse Reparaturauftrag.
7. Die Stereotypen «mandant» (Werkstattbetrieb) und «stammdaten» (Filiale, Lieferant, Ersatzteil) überträgt die XMI nicht; in VP von Hand setzen. Die extend-Beziehungen enthalten in `usecase.puml` Erweiterungspunkte und Bedingungen; im VP-Diagramm sind sie bewusst nicht eingetragen (E-24-Nachtrag 16.10.).
8. Wer das XMI schon vor dem 05.10.2026 importiert hat: neu importieren (einfacher) oder die Änderungen aus E-15, E-17 und E-18 (Entscheidungslog in der Git-Historie) von Hand nachziehen (Servicemitarbeiter, UC19, include/extend, neue Operationen und Assoziationen).
9. Nach jeder Sitzung Commit in den Teamwork-Server und zusätzlich File → Save Project As als lokale Sicherung `UML-WWI25B4-Gruppe1.vpp` (die Datei kommt so in die Abgabe).

## Herkunft

Zusammenführung aus den beiden Entwürfen vom 02.09.2026 (E-10), korrigiert in E-15, E-17 und E-18. Gearbeitet wird direkt in Visual Paradigm bzw. in den `.puml`-Dateien.

## Namensregeln

- Klassen in UpperCamelCase ohne Umlaute (Geraet, KvaPosition, KIDiagnosevorschlag), Attribute und Operationen in lowerCamelCase.
- Multiplizitäten in UML-Schreibweise (0..*, 1..*), Kompositionen nur dort, wo Teile ohne das Ganze nicht existieren.
- Die BPMN-Datenobjekte verwenden dieselben Namen, zur besseren Lesbarkeit im Diagramm mit Bindestrich getrennt („Kosten-voranschlag [vorläufig]").
