# RepairFlow – UML-Paket v1 (Stand 02.09.2026)

Vorlagen für die Umsetzung in **Visual Paradigm 18.0** (Pflichtwerkzeug). PlantUML-Quellen + gerenderte PNG/SVG. Diagrammnamen nach VL-Konvention (`ud`, `cd`, `sqd`, `sd`).

| Datei | Diagramm | Anforderung |
|---|---|---|
| `ud-RepairFlow.puml/.png` | Use-Case-Diagramm, 14 Use Cases, 6 Aktoren (Kunde, Serviceannahme, Techniker, Disponent, Werkstattleiter, Lieferant «extern») | ≥ 10 Use Cases ✔ |
| `cd-RepairFlow.puml/.png` | Klassendiagramm, 22 Klassen (inkl. abstrakte `Person`, `Mitarbeiter`) + 6 Enums | ≥ 10 Klassen ✔ |
| `sqd-01` … `sqd-05` | 5 Sequenzdiagramme zu den Use Cases „KVA freigeben/ablehnen", „Ersatzteil-Verfügbarkeit prüfen + reservieren", „Nachbestellvorschlag + Lieferantenbestellung", „Auftrag fertigmelden + Kunde benachrichtigen", „Reklamation bearbeiten" | 5 SDs ✔ – in VP **als Unterdiagramm des jeweiligen Use Case** anlegen |
| `sd-Reparaturauftrag.puml/.png` | Zustandsdiagramm der Klasse `Reparaturauftrag` (optional, VL Kap. 5-57 ff.) | Bonus |
| `RepairFlow-UML2-XMI21.xmi` | **XMI 2.1 (UML 2.x)** mit Klassenmodell **und** Use-Case-Modell – für den Import in Visual Paradigm (Anleitung unten). Referenzen maschinell geprüft (0 fehlende IDs). |
| `cd-RepairFlow.xmi` | Zweite Variante nur für das Klassenmodell (PlantUML-Export, XMI 1.x) – nur probieren, falls die 2.1-Datei nicht geht. |

## Änderungen gegenüber der KI-Vorlage im Repo

1. Use-Case: Doppelkante `Lieferantenbestellung auslösen → Ersatzteil reservieren` (include **und** extend) entfernt – nur `<<include>>`.
2. Aktor `Serviceannahme` ergänzt (entspricht der BPMN-Lane); `Werkstattleiter` und `Disponent` sind jetzt auch **Klassen** (Hierarchie `Person ← Mitarbeiter ← Techniker | Werkstattleiter | Disponent`), damit UC-Aktoren, BPMN-Lanes und Klassen dieselben Begriffe verwenden.
3. Sequenzdiagramme benutzen ausschließlich Klassennamen und Operationen aus `cd` (`wechsleStatus`, `fuegePositionHinzu`, `berechneSumme`, `versendeAnKunde`, `pruefeVerfuegbarkeit`, `bucheAbgang`, `reserviere`, `istMeldebestandUnterschritten`, `bestaetigeBestellung`, `markiereErledigt`, `fertigmelden`, `alleSchritteAbgeschlossen`, `benachrichtigeKunde`, `pruefeGewaehrleistung`, `legeNachbesserungAn`, `schliesseAb`). Fehlende Operationen wurden im Klassendiagramm ergänzt (VL 5-61: Diagrammkonsistenz).
4. Lebenslinien in VP-Notation `: Klasse` (anonyme Objekte) bzw. `eigene : Filiale` / `andere : Filiale`.
5. Zustandsdiagramm neu.

## XMI-Import in Visual Paradigm – Schritt für Schritt (Kilian)

Ziel: Klassen, Enums, Assoziationen, Aktoren, Use Cases und include/extend kommen fertig ins Modell; du zeichnest nur noch die beiden Diagramme per Drag & Drop. Ich konnte den Import nicht selbst in VP ausprobieren – die Datei ist Standard-XMI 2.1, wie es VP laut Dokumentation liest; die Fallbacks stehen unten.

1. Teamwork-Client: **Update** (Repo `WWI25B4G1`), damit du auf dem aktuellen Stand arbeitest.
2. Menü **Project → Import → XMI…** (ältere VP-Versionen: **File → Import → XMI…**). Datei `RepairFlow-UML2-XMI21.xmi` wählen, Optionen auf Standard lassen, **Import**.
3. Im **Model Explorer** (links; falls ausgeblendet: View → Panes → Model Explorer) erscheint das Modell `RepairFlow` mit drei Paketen: `Datentypen`, `Klassenmodell (cd RepairFlow)`, `Use-Case-Modell (ud RepairFlow)`. Kurz aufklappen und prüfen: 22 Klassen, 6 Enumerationen, 6 Aktoren, 14 Use Cases.
4. **Klassendiagramm anlegen:** Diagram → New → Class Diagram, Name `cd : RepairFlow`. Im Model Explorer das Paket `Klassenmodell` aufklappen, alle Klassen und Enums markieren (erste anklicken, Shift + letzte) und auf die Zeichenfläche ziehen. Die Assoziationen, Kompositionen und Vererbungen werden zwischen platzierten Elementen automatisch eingeblendet; falls eine Linie fehlt: Klasse rechtsklicken → **Related Elements → Show Relationships** (Bezeichnung kann je nach Version leicht abweichen). Danach Layout: Rechtsklick auf die leere Fläche → Layout → Auto Layout, dann von Hand nachschieben (Vorlage: `cd-RepairFlow.png`).
5. **Use-Case-Diagramm anlegen:** Diagram → New → Use Case Diagram, Name `ud : RepairFlow`. Aus dem Paket `Use-Case-Modell` alle Aktoren und Use Cases auf die Fläche ziehen; Mitwirkungen, include und extend werden eingeblendet. Systemgrenze: Werkzeug **System** aus der Palette aufziehen, Titel `RepairFlow`, alle 14 Use Cases hineinschieben (Aktoren bleiben außerhalb). Vorlage: `ud-RepairFlow.png`.
6. Beide Diagramme prüfen gegen die QA-Checkliste UML, dann **Commit** auf den Teamwork-Server und **File → Save Project As → `UML-WWI25B4-Gruppe1.vpp`** nach `/uml`.

**Wenn der Import Fehler meldet:**
- Meldung „unsupported version / invalid XMI": zuerst `cd-RepairFlow.xmi` (XMI 1.x) probieren – dann fehlt nur das Use-Case-Modell, das du in 20 Minuten von Hand zeichnest (6 Aktoren, 14 Use Cases, 4 include, 3 extend, alles aus `ud-RepairFlow.puml` ablesbar).
- Import läuft, aber Attribute/Operationen fehlen: Klassen bleiben im Modell, du ergänzt die Attribute aus `cd-RepairFlow.puml` (Copy-Paste in den Klassen-Editor).
- Gar nichts geht: Schick mir die Fehlermeldung (Screenshot), ich passe das XMI-Format an.

## Vorgehen ohne Import (manuell)

1. Teamwork-Client: Update. Im Projekt-Explorer die Standardordner nutzen.
2. `ud : RepairFlow` zeichnen (Diagram → New → Use Case Diagram), Aktoren + Use Cases + include/extend, Systemgrenze „RepairFlow".
3. `cd : RepairFlow` (Class Diagram): Klassen mit Attributen (Sichtbarkeit + Typ) und Operationen (Signatur), Enums als `<<enumeration>>`, Assoziationen mit Rollenname/Kardinalität, Komposition (gefüllte Raute) bei Geraet/Fehlerbefund/Kostenvoranschlag/Reparaturschritt/KvaPosition/Bestellposition.
4. Je Use Case: Rechtsklick → **Sub Diagrams → New Sequence Diagram** → `sqd : <Use Case>`; Lebenslinien per Drag & Drop der Klassen aus dem Model-Explorer (dann sind Botschaften direkt aus den Operationen wählbar); Fragmente `alt/opt/loop` über die Toolbar „Combined Fragment".
5. Klasse `Reparaturauftrag` → Sub Diagrams → State Machine Diagram → `sd : Reparaturauftrag`.
6. Commit nach jedem Diagramm; `File → Save Project As` → `UML-WWI25B4-Gruppe1.vpp` in `/uml`.
