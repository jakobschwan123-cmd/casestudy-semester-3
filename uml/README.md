# UML-Modelle (objektorientierte Analyse)

Quelle aller Namen ist `tools/umlmodel.py`. Daraus entstehen das Klassendiagramm, das Use-Case-Diagramm und die XMI-Datei; die Sequenzdiagramme und das Zustandsdiagramm sind von Hand in PlantUML geschrieben und verwenden dieselben Klassen- und Operationsnamen.

| Datei | Inhalt |
|---|---|
| modell.xmi | XMI 2.1 (UML 2.x) mit Klassenmodell (26 Klassen, 7 Aufzählungen, 34 Assoziationen) und Anwendungsfallmodell (18 Use Cases, 7 Akteure, include/extend) zum Import in Visual Paradigm |
| klassen.puml / .png | vollständiges Klassendiagramm |
| klassen-fokus-1…4-*.puml / .png | vier Ausschnitte für Doku und Präsentation (Sofortdiagnose, Auftrag, Disposition, Organisation/Rollen) |
| usecase.puml / .png | Use-Case-Diagramm |
| sequenz-01-sofortdiagnose … sequenz-06-nachbestellvorschlag.puml / .png | sechs Sequenzdiagramme (UC01, UC07, UC09, UC14, UC16, UC12/UC10); gefordert sind fünf |
| zustand-reparaturauftrag.puml / .png | Zustandsdiagramm der Klasse Reparaturauftrag (Zusatz, nicht gefordert) |
| systemkontext.puml / .png | Systemkontext für die Doku |

## Vorgehen für Kilian (UML-Verantwortlicher) in Visual Paradigm 18

1. Lehre-VPN starten, Visual Paradigm öffnen, Teamwork Client anmelden, Repository **WWI25B4G1 (trunk)** auschecken und öffnen (Anleitung in `doku/01-projektkontext.md`).
2. **Modell importieren:** Project → Import → XMI…, Datei `modell.xmi` wählen. Im Model Explorer erscheinen die Pakete Datentypen, Klassenmodell und Anwendungsfallmodell mit allen Elementen. Falls der Import Fehler meldet: Meldung notieren und in `doku/protokolle/` ablegen, dann Klassen nach dem PNG von Hand anlegen (die Attribute und Operationen stehen komplett in `klassen.puml`).
3. **Klassendiagramm anlegen:** neues Class Diagram „cd RepairFlow" in den Standardordner, Klassen und Aufzählungen aus dem Model Explorer auf die Fläche ziehen (mehrere markieren und gemeinsam ziehen). Assoziationen und Generalisierungen werden automatisch mitgezeichnet. Layout nach dem PNG ordnen: links Mandant, Personen und Mitarbeiter-Rollen (Techniker, Disponent, Werkstattleiter), Mitte Auftrag, rechts Disposition, Aufzählungen am Rand.
4. **Use-Case-Diagramm anlegen:** neues Use Case Diagram „ud RepairFlow", Systemgrenze „RepairFlow" zeichnen, Use Cases aus dem Model Explorer hineinziehen, Akteure links (primär) und rechts (Lieferant, KI-Diagnosedienst). include/extend kommen aus dem Modell mit.
5. **Sequenzdiagramme als Unterdiagramme:** im Use-Case-Diagramm den Use Case rechtsklicken → Sub Diagrams → New Diagram → Sequence Diagram. So verlangt es der Ablauf („Verfeinerungsdiagramm"). Je Use Case eines: UC01 Sofortdiagnose anfordern (SD1), UC07 KVA freigeben / ablehnen (SD2), UC09 Ersatzteil reservieren (SD3), UC14 Auftrag fertigmelden und Kunde benachrichtigen (SD4), UC16 Reklamation bearbeiten (SD5), UC12 Nachbestellvorschlag bei Meldebestand (SD6, zusammen mit UC10). Lebenslinien: Akteure als Actor, Objekte als „: Klassenname" mit der Klasse aus dem Modell verknüpfen (dann bietet VP die Operationen zur Auswahl an). Fragmente alt/opt/loop wie in den PNGs.
6. Optional: Zustandsdiagramm „sd Reparaturauftrag" als Unterdiagramm der Klasse Reparaturauftrag.
7. Nach jeder Sitzung Commit in den Teamwork-Server und zusätzlich File → Save Project As als lokale Sicherung `UML-WWI25B4-Gruppe1.vpp` (die Datei kommt so in die Abgabe).

## Herkunft

Das Modell ist die Zusammenführung aus dem Solution-Provider-Entwurf (Claude/David) und Kilians V2: Die Rollenklassen `Mitarbeiter` → `Techniker`/`Disponent`/`Werkstattleiter`, `Kunde.meldeMangel()` und SD6 stammen aus V2 (`/Users/david/CLAUDE/V2/uml`), siehe `doku/05-vergleich-und-zusammenfuehrung.md`.

## Namensregeln

- Klassen in UpperCamelCase ohne Umlaute (Geraet, KvaPosition, KIDiagnosevorschlag), Attribute und Operationen in lowerCamelCase.
- Multiplizitäten in UML-Schreibweise (0..*, 1..*), Kompositionen nur dort, wo Teile ohne das Ganze nicht existieren.
- Die BPMN-Datenobjekte verwenden dieselben Namen, zur besseren Lesbarkeit im Diagramm mit Bindestrich getrennt („Kosten-voranschlag [vorläufig]").
