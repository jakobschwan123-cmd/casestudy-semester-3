# UML-Modelle (objektorientierte Analyse)

Die PlantUML-Quellen (`.puml`) und `modell.xmi` sind der aktuelle Stand; die PNGs sind daraus gerendert. Das Ziel für die Abgabe ist `UML-WWI25B4-Gruppe1.vpp` aus Visual Paradigm.

| Datei | Inhalt |
|---|---|
| modell.xmi | XMI 2.1 (UML 2.x) mit Klassenmodell (27 Klassen, 7 Aufzählungen, 36 Assoziationen) und Anwendungsfallmodell (19 Use Cases, 8 Akteure, 2 include, 6 bedingte extend) zum Import in Visual Paradigm |
| klassen.puml / .png | einziges vollständiges Klassendiagramm; alle Klassen, Operationen und Beziehungen innerhalb einer Abbildung |
| usecase.puml / .png | Use-Case-Diagramm |
| sequenz-01-sofortdiagnose … sequenz-06-nachbestellvorschlag.puml / .png | sechs Sequenzdiagramme (UC01, UC07, UC09, UC14, UC16, UC10 mit Verweisen auf UC11/UC19; UC12 liefert den Bestellbedarf); gefordert sind fünf |
| zustand-reparaturauftrag.puml / .png | Zustandsdiagramm der Klasse Reparaturauftrag (Zusatz, nicht gefordert) |
| systemkontext.puml / .png | Systemkontext für die Doku |

## Vorgehen für Kilian (UML-Verantwortlicher) in Visual Paradigm 18

1. Lehre-VPN starten, Visual Paradigm öffnen, Teamwork Client anmelden, Repository **WWI25B4G1 (trunk)** auschecken und öffnen (Anleitung in `doku/01-projektkontext.md`).
2. **Modell importieren:** Project → Import → XMI…, Datei `modell.xmi` wählen. Im Model Explorer erscheinen die Pakete Datentypen, Klassenmodell und Anwendungsfallmodell mit allen Elementen. Falls der Import Fehler meldet: Meldung notieren und in `doku/protokolle/` ablegen, dann Klassen nach dem PNG von Hand anlegen (die Attribute und Operationen stehen komplett in `klassen.puml`).
3. **Klassendiagramm anlegen:** neues Class Diagram „cd RepairFlow" in den Standardordner, Klassen und Aufzählungen aus dem Model Explorer auf die Fläche ziehen (mehrere markieren und gemeinsam ziehen). Assoziationen und Generalisierungen werden automatisch mitgezeichnet. Layout nach dem PNG ordnen: links Mandant, Personen und Mitarbeiter-Rollen (Servicemitarbeiter, Techniker, Disponent, Werkstattleiter), Mitte Auftrag, rechts Disposition, Aufzählungen am Rand.
4. **Use-Case-Diagramm anlegen:** neues Use Case Diagram „ud RepairFlow", Systemgrenze „RepairFlow" zeichnen, Use Cases aus dem Model Explorer hineinziehen, Akteure links (primär) und rechts (Lieferant, KI-Diagnosedienst). include/extend kommen aus dem Modell mit.
5. **Sequenzdiagramme als Unterdiagramme:** im Use-Case-Diagramm den Use Case rechtsklicken → Sub Diagrams → New Diagram → Sequence Diagram. So verlangt es der Ablauf („Verfeinerungsdiagramm"). Je Use Case eines: UC01 Sofortdiagnose anfordern (SD1), UC07 KVA freigeben / ablehnen (SD2), UC09 Ersatzteile disponieren und reservieren (SD3), UC14 Auftrag fertigmelden (SD4), UC16 Reklamation bearbeiten (SD5), UC10 Lieferantenbestellung auslösen (SD6, Bestellbedarf aus UC12; ref auf UC11/UC19). Lebenslinien: Akteure als Actor, Objekte als „: Klassenname" mit der Klasse aus dem Modell verknüpfen (dann bietet VP die Operationen zur Auswahl an). Fragmente alt/opt/loop/par/break und ref wie in den PNGs.
6. Optional: Zustandsdiagramm „stm Reparaturauftrag" als Unterdiagramm der Klasse Reparaturauftrag.
7. Die Stereotypen «mandant» (Werkstattbetrieb) und «stammdaten» (Filiale, Lieferant, Ersatzteil) überträgt die XMI nicht; in VP von Hand setzen. Die extend-Beziehungen enthalten jetzt Erweiterungspunkte und Bedingungen; nach dem Import gegen `usecase.puml` prüfen.
8. Wer das XMI schon vor dem 05.10.2026 importiert hat: neu importieren (einfacher) oder die Änderungen aus E-15, E-17 und E-18 (`archiv/doku/03-entscheidungen-bis-2026-10-05.md`) von Hand nachziehen (Servicemitarbeiter, UC19, include/extend, neue Operationen und Assoziationen).
9. Nach jeder Sitzung Commit in den Teamwork-Server und zusätzlich File → Save Project As als lokale Sicherung `UML-WWI25B4-Gruppe1.vpp` (die Datei kommt so in die Abgabe).

## Herkunft

Zusammenführung aus dem Solution-Provider-Entwurf und Kilians V2 (E-10), korrigiert in E-15, E-17 und E-18. Der Generator (`archiv/tools/umlmodel.py`) und das Prüfprotokoll des UML-BPMN-Abgleichs (`archiv/doku/protokolle/2026-10-05-uml-bpmn-abgleich.md`) liegen im Archiv. Ab jetzt wird direkt in Visual Paradigm bzw. in den `.puml`-Dateien gearbeitet.

## Namensregeln

- Klassen in UpperCamelCase ohne Umlaute (Geraet, KvaPosition, KIDiagnosevorschlag), Attribute und Operationen in lowerCamelCase.
- Multiplizitäten in UML-Schreibweise (0..*, 1..*), Kompositionen nur dort, wo Teile ohne das Ganze nicht existieren.
- Die BPMN-Datenobjekte verwenden dieselben Namen, zur besseren Lesbarkeit im Diagramm mit Bindestrich getrennt („Kosten-voranschlag [vorläufig]").
