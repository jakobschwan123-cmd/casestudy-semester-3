# Use-Case-Diagramm RepairFlow – Anordnung und Begründung

Kontext für ein Sprachmodell: DHBW-Fallstudie Systemanalyse (WWI25B4, Gruppe 1). Das Projekt RepairFlow ist eine SaaS-Plattform für Reparaturwerkstätten mit KI-Sofortdiagnose. Das Use-Case-Diagramm „ud: RepairFlow“ wird in Visual Paradigm 18 gezeichnet. Das Modell stammt aus einem XMI-Import und ist fachlich fertig. Dieses Dokument beschreibt nur die **Anordnung** im Diagramm und warum sie so gewählt ist.

Grundlage ist die Vorlesung (Prof. Freytag, VL 6, Folien 5-53 bis 5-56): Akteure stehen außerhalb der (optionalen) Systemgrenze, die Use Cases innerhalb. Akteur und Use Case verbindet eine Assoziation („Mitwirkung“). «include» bedeutet, ein Use Case umfasst einen anderen vollständig. «extend» bedeutet, ein Use Case erweitert einen anderen logisch bzw. bedingt. Diagrammname nach Vorlesungsbeispiel: `ud : Name`. Konkrete Layoutregeln (Spalten, Kreuzungen) enthält die Vorlesung nicht. Die folgenden Regeln sind allgemeine Modellierungspraxis.

## 1. Inhalt des Diagramms (fest, nicht ändern)

- 1 Systemgrenze „RepairFlow“
- 19 Use Cases, 8 Akteure
- 2 «include», 6 «extend»
- 38 Assoziationen Akteur – Use Case

### include/extend (Pfeil zeigt immer von „von“ nach „nach“)

| Typ | von | nach | Bedingung |
|---|---|---|---|
| «include» | Sofortdiagnose anfordern | Ersatzteil-Verfügbarkeit prüfen | – |
| «include» | Ersatzteile disponieren und reservieren | Ersatzteil-Verfügbarkeit prüfen | – |
| «extend» | Voranmeldung bestätigen | Sofortdiagnose anfordern | Kunde bestätigt Voranmeldung |
| «extend» | Reparaturauftrag anlegen | Reklamation bearbeiten | Nacharbeit freigegeben oder Angebot angenommen |
| «extend» | Lieferantenbestellung auslösen | Ersatzteile disponieren und reservieren | Fehlteile vorhanden |
| «extend» | Nachbestellvorschlag erzeugen | Ersatzteile disponieren und reservieren | Meldebestand unterschritten |
| «extend» | Retoure abwickeln | Wareneingang buchen | Lieferung mangelhaft |
| «extend» | Retoure abwickeln | Reklamation bearbeiten | Lieferantenteil defekt |

### Akteur – Use Case (38 Linien)

| Akteur | Use Cases |
|---|---|
| Kunde (8) | Sofortdiagnose anfordern, Voranmeldung bestätigen, Reparaturauftrag anlegen, KVA freigeben / ablehnen, Ersatzteile disponieren und reservieren, Lieferantenbestellung auslösen, Abholung und Abrechnung abwickeln, Reklamation bearbeiten |
| Servicemitarbeiter (7) | Reparaturauftrag anlegen, KVA erstellen, KVA freigeben / ablehnen, Ersatzteile disponieren und reservieren, Lieferantenbestellung auslösen, Abholung und Abrechnung abwickeln, Reklamation bearbeiten |
| Techniker (8) | Reparaturauftrag anlegen, Diagnosevorschlag prüfen, Diagnosebefund erfassen, KVA erstellen, Reparaturschritt und Arbeitszeit erfassen, Auftrag fertigmelden, Reklamation bearbeiten, Retoure abwickeln |
| Disponent (6) | Ersatzteil-Verfügbarkeit prüfen, Ersatzteile disponieren und reservieren, Lieferantenbestellung auslösen, Wareneingang buchen, Nachbestellvorschlag erzeugen, Retoure abwickeln |
| Werkstattleiter (4) | Lieferantenbestellung auslösen, Reklamation bearbeiten, Werkstatttermin planen und Techniker zuweisen, Retoure abwickeln |
| Werkstattinhaber (1) | Werkstattbetrieb und Filialen verwalten |
| Lieferant (3) | Lieferantenbestellung auslösen, Wareneingang buchen, Retoure abwickeln |
| KI-Diagnosedienst (1) | Sofortdiagnose anfordern |

## 2. Gewählte Anordnung

### Use Cases in drei Spalten innerhalb der Systemgrenze (jeweils von oben nach unten)

| Spalte links: Kunde/Service | Spalte Mitte: Werkstatt | Spalte rechts: Disposition/Admin |
|---|---|---|
| Voranmeldung bestätigen | Sofortdiagnose anfordern | Ersatzteil-Verfügbarkeit prüfen |
| KVA freigeben / ablehnen | Diagnosevorschlag prüfen | Ersatzteile disponieren und reservieren |
| Abholung und Abrechnung abwickeln | Diagnosebefund erfassen | Nachbestellvorschlag erzeugen |
| Reparaturauftrag anlegen | KVA erstellen | Lieferantenbestellung auslösen |
| Reklamation bearbeiten | Reparaturschritt und Arbeitszeit erfassen | Wareneingang buchen |
|  | Auftrag fertigmelden | Retoure abwickeln |
|  | Werkstatttermin planen und Techniker zuweisen | Werkstattbetrieb und Filialen verwalten |

### Akteure außerhalb der Systemgrenze

| Links (von oben nach unten) | Rechts (von oben nach unten) |
|---|---|
| Kunde | KI-Diagnosedienst (auf Höhe „Sofortdiagnose anfordern“) |
| Servicemitarbeiter | Disponent (auf Höhe „Ersatzteile disponieren und reservieren“) |
| Techniker | Lieferant (auf Höhe „Wareneingang buchen“) |
| Werkstattleiter | Werkstattinhaber (auf Höhe „Werkstattbetrieb und Filialen verwalten“) |

## 3. Warum diese Anordnung

1. **Akteure außen, Use Cases innen.** Das entspricht dem Vorlesungsbeispiel (VL 6, 5-56) und trennt das System klar von seiner Umgebung.
2. **Primäre Akteure links, externe bzw. sekundäre rechts.** Links stehen die Menschen, die die Abläufe anstoßen (Kunde, Service, Techniker, Werkstattleiter). Rechts stehen externe Systeme und Partner (KI-Diagnosedienst, Lieferant) sowie die Rollen, deren Use Cases rechts liegen (Disponent, Werkstattinhaber). Die Leserichtung ist damit links „wer will etwas“, rechts „wer liefert zu“.
3. **Spalten nach Fachbereich.**
   - Links liegt, was Kunde und Service direkt betrifft: Kundenportal, Annahme, Abrechnung, Reklamation.
   - Die Mitte bildet den Werkstattablauf ab (Diagnose → KVA → Reparatur → Fertigmeldung).
   - Rechts liegt die Ersatzteil-Disposition samt Lieferant, unten die Administration.
   - Jede Spalte liegt so nah an den Akteuren, die sie am meisten nutzen. Das verkürzt die Linien.
4. **Von oben nach unten im Prozessablauf.** Die Reihenfolge folgt grob den BPMN-Prozessen P01 → P10: Sofortdiagnose oben, Abholung und Reklamation bzw. Retoure unten. Man kann das Diagramm wie den Lebenszyklus eines Reparaturauftrags lesen.
5. **include/extend als kurze Nachbarpfeile.** Beteiligte Use Cases liegen direkt neben- oder untereinander:
   - Voranmeldung → Sofortdiagnose waagerecht oben
   - Sofortdiagnose → Verfügbarkeit waagerecht oben
   - Disponieren → Verfügbarkeit senkrecht rechts
   - Nachbestellvorschlag und Lieferantenbestellung → Disponieren senkrecht rechts
   - Reparaturauftrag → Reklamation senkrecht links
   - Retoure → Wareneingang senkrecht rechts

   Nur Retoure → Reklamation muss quer laufen. Das ist fachlich bedingt, denn ein defektes Lieferantenteil wird aus der Reklamation heraus retourniert.
6. **Akteure mit vielen Linien mittig zu ihren Use Cases.** Kunde, Techniker und Servicemitarbeiter haben je 7–8 Linien. Sie stehen etwa auf mittlerer Höhe ihrer Use Cases, damit die Linien fächerförmig auslaufen statt sich zu bündeln.
7. **Unvermeidbare Kreuzungen.** Kunde und Servicemitarbeiter sind auch mit Disposition-Use-Cases rechts verbunden (Kundeninformation über Reparaturbeginn und Lieferverzug). Diese Linien kreuzen das Diagramm, und das ist fachlich richtig. Bei 38 Assoziationen sind Kreuzungen normal.

## 4. Konventionen für Linien

- **Gerade (schräge) Verbindungslinien**, wie im Vorlesungsbeispiel, keine rechtwinklige Linienführung. Rechtwinklige Linien legen sich über lange Strecken übereinander, und dann ist nicht mehr erkennbar, welcher Akteur zu welchem Use Case gehört.
- **Kreuzungen sind erlaubt.** Vermeiden sollte man Linien, die durch einen Use Case oder Akteur laufen, deckungsgleiche bzw. übereinanderliegende Linien und Linien durch Beschriftungen.
- **Beschriftungen «include»/«extend»** stehen neben dem Pfeil, nicht auf einem Use-Case-Namen.
- **Multiplizitäten („1“) an Akteur-Assoziationen** sind in UML erlaubt, aber im Use-Case-Diagramm unüblich. Wenn möglich ausblenden, sonst stehen lassen. Fachlich sind sie nicht falsch.

## 5. Prüfliste

- [ ] 19 Use Cases in der Systemgrenze, 8 Akteure außerhalb
- [ ] genau 8 gestrichelte Pfeile mit der Richtung aus Abschnitt 1
- [ ] 38 Akteur-Linien, keine doppelt (z. B. Lieferant → „Wareneingang buchen“ genau eine, Werkstattleiter genau vier)
- [ ] keine Linie läuft durch ein Oval oder einen Akteur
- [ ] Diagrammname „ud: RepairFlow“
