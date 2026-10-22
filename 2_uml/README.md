# UML-Modelle (objektorientierte Analyse)

Das UML-Modell liegt in Visual Paradigm 18 auf dem Teamwork-Server der DHBW (Repository **WWI25B4G1**, trunk). Abgegeben wird der Export `UML-WWI25B4-Gruppe1.vpp` (Stand 22.10.2026, nach dem Umbau auf Oberflächenklassen). Die PNGs sind Exporte aus VP und Quelle für die Abbildungen der Doku.

| Datei | Inhalt |
|---|---|
| UML-WWI25B4-Gruppe1.vpp | Visual-Paradigm-Projekt mit Use-Case-Diagramm, Klassendiagramm und sechs Sequenzdiagrammen als Unterdiagramme der Use Cases (Abgabedatei) |
| usecase-diagramm.png | ud : RepairFlow, 19 Use Cases, 17 Akteure (Abb. 4) |
| klassendiagramm.png | cd : RepairFlow, 29 Klassen (inkl. KundenApp und Werkstattoberflaeche), 7 Aufzählungen, 40 Assoziationen (Abb. 5) |
| sequenz-01-sofortdiagnose.png … sequenz-06-nachbestellvorschlag.png | SD1 (UC01), SD2 (UC07), SD3 (UC09), SD4 (UC14), SD5 (UC16), SD6 (UC10, Datei heißt aus historischen Gründen nachbestellvorschlag); SD1 und SD3 sind Abb. 6 und 7. Stand der PNGs: 22.10.2026 (Oberflächenklassen und Objektsuche) |

Die früheren PlantUML-Vorlagen und XMI-Importdateien sind seit dem 19.10.2026 entfernt, weil das VP-Modell vollständig ist. Sie stehen in der Git-Historie.

## Änderungen am Modell

1. Lehre-VPN starten, Visual Paradigm öffnen, im Teamwork Client **Update**.
2. Ändern, danach **Commit** (Team → Commit).
3. Betroffene Diagramme exportieren: Project → Export → Active Diagram as Image → PNG, 220 dpi, ohne Legende, Dateiname wie oben (überschreiben).
4. VPP neu exportieren: Project → Export → Visual Paradigm Project, alle Diagramme, `2_uml/UML-WWI25B4-Gruppe1.vpp` überschreiben.
5. PNGs und VPP per Branch und Pull Request einchecken; Doku-Abbildungen bei Bedarf ersetzen.

Bekannte Eigenheit: Stereotypen («mandant» bei Werkstattbetrieb, «stammdaten» bei Filiale, Lieferant, Ersatzteil), ausgeblendete Rollennamen und Fit Size können nach einem Update verloren gehen. Nach jedem Update im Klassendiagramm kurz prüfen.

## Namensregeln

- Klassen in UpperCamelCase ohne Umlaute (Geraet, KvaPosition, KIDiagnosevorschlag), Attribute und Operationen in lowerCamelCase.
- Multiplizitäten in UML-Schreibweise (0..*, 1..*), Kompositionen nur dort, wo Teile ohne das Ganze nicht existieren.
- Jede Botschaft an eine Klassen-Lebenslinie ist eine Operation dieser Klasse.
- Die BPMN-Datenobjekte verwenden dieselben Namen, zur besseren Lesbarkeit im Diagramm mit Bindestrich getrennt („Kosten-voranschlag [vorläufig]").
