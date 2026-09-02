---
type: syan-fallstudie
projekt: repairflow
teil: sequenz
gehoert-zu: fach-syan-fallstudie
---

# RepairFlow — Teil 4: Sequenzdiagramme (UML)

> **Werkzeug-Hinweis:** Der Kurs zeichnet UML mit **Visual Paradigm**. Der PlantUML-Code unten ist dein Konstruktionsplan — er ist valide/renderbar (z. B. auf plantuml.com oder via PlantUML-Plugin) und du überträgst die Interaktionen 1:1 ins finale VP-Sequenzdiagramm.

## Konventionen (Konsistenz mit Klassen- und Use-Case-Diagramm)

- **Lebenslinien = Klassen** aus dem Klassendiagramm (Teil: Klassen). Exakt gleiche Namen: `Kunde`, `Reparaturauftrag`, `Geraet`, `Diagnose`, `Kostenvoranschlag`, `KVAPosition`, `Reparaturschritt`, `Arbeitszeitbuchung`, `Techniker`, `Filiale`, `Ersatzteil`, `Lagerbestand`, `Reservierung`, `Lieferantenbestellung`, `Bestellposition`, `Lieferant`, `Rechnung`, `Reklamation`.
- **Rollen/Pools (BPMN)** = die menschlichen/externen Akteure `Kunde`, `Techniker` (Werkstatt), `Disposition` (Ersatzteil-Disposition), `Lieferant`. In den Sequenzdiagrammen erscheinen sie als `actor`.
- **Statusautomat des Reparaturauftrags** (durchgängig referenziert): `angenommen → in Diagnose → KVA offen → freigegeben | abgelehnt → Teile bestellt → in Reparatur → fertig → abgeholt`. Statuswechsel werden per `note` an der `Reparaturauftrag`-Lebenslinie markiert.
- **Kombinierte Fragmente:** `alt` (Verzweigung), `opt` (optional), `loop` (Wiederholung) — wie in der Aufgabe gefordert.

Die fünf gewählten Use Cases sind die interaktionsreichsten (kein reiner Getter/Setter):

| Nr | Use Case (identisch zum UC-Diagramm) | Kernfragment |
|----|--------------------------------------|--------------|
| 1  | KVA freigeben/ablehnen (Kunde) mit Freigabeschleife | `loop` + `alt` |
| 2  | Ersatzteil-Verfügbarkeit prüfen + reservieren (filialübergreifend) | `loop` + `alt` |
| 3  | Nachbestellvorschlag bei Meldebestand → Lieferantenbestellung auslösen | `opt` + `alt` |
| 4  | Auftrag fertigmelden + Kunde benachrichtigen (Statuswechsel) | `alt` + `opt` |
| 5  | Reklamation bearbeiten mit Gewährleistungsentscheidung | `alt` (verschachtelt) |

---

## SD 1 — KVA-Freigabe mit Kundenschleife (Use Case: „KVA freigeben/ablehnen")

**Kontext:** Der `Kostenvoranschlag` ist erstellt (Status `KVA offen`). Der `Kunde` muss ihn freigeben oder ablehnen. Die `loop` bildet die Erinnerungs-/Warteschleife ab (Kunde reagiert nicht sofort); das `alt` verzweigt in **freigegeben** (→ Statuswechsel, weiter Richtung Teile/Reparatur) vs. **abgelehnt** (Auftrag endet, Gerät zur Abholung).

```plantuml
@startuml
title SD1 - KVA-Freigabe mit Kundenschleife

actor Techniker
participant Reparaturauftrag as RA
participant Kostenvoranschlag as KVA
participant KVAPosition as Pos
actor Kunde

Techniker -> KVA : erstelleKVA(auftrag)
activate KVA
loop je Diagnose-/Ersatzteil-Bedarf
    KVA -> Pos : addPosition(bezeichnung, menge, preis)
    activate Pos
    Pos --> KVA : positionHinzugefuegt
    deactivate Pos
end
KVA -> KVA : berechneGesamtsumme()
KVA --> Techniker : kvaFertig(summe)
deactivate KVA

Techniker -> RA : setStatus("KVA offen")
note right of RA : Status: KVA offen
Techniker -> Kunde : sendeKVAzurFreigabe(kva)

loop solange keine Kundenreaktion (max. Frist)
    Kunde --> Techniker : keineReaktion
    Techniker -> Kunde : erinnereAnFreigabe(kva)
end

alt Kunde gibt frei
    Kunde -> KVA : freigeben()
    activate KVA
    KVA -> RA : setStatus("freigegeben")
    note right of RA : Status: freigegeben
    KVA --> Kunde : freigabeBestaetigt
    deactivate KVA
    RA --> Techniker : starteBeschaffung()
else Kunde lehnt ab
    Kunde -> KVA : ablehnen(grund)
    activate KVA
    KVA -> RA : setStatus("abgelehnt")
    note right of RA : Status: abgelehnt (Endzustand)
    KVA --> Kunde : ablehnungBestaetigt
    deactivate KVA
    RA -> Kunde : benachrichtigeAbholungOhneReparatur()
end
@enduml
```

**Prüfungserklärung:** Der Statusautomat springt genau an der `alt`-Verzweigung: `freigegeben` triggert die Ersatzteil-Beschaffung (Übergang zu SD 2), `abgelehnt` ist ein Endzustand — das Gerät wird unrepariert zur Abholung freigegeben. Die `loop` modelliert die reale Erinnerungsschleife, kein Fachschritt.

---

## SD 2 — Filialübergreifende Ersatzteil-Reservierung (Use Case: „Ersatzteil-Verfügbarkeit prüfen" + „Ersatzteil reservieren")

**Kontext:** Nach KVA-Freigabe braucht der `Reparaturauftrag` bestimmte `Ersatzteil`e. Die `Disposition` prüft den `Lagerbestand` zuerst in der **eigenen Filiale**, dann per `loop` über die **anderen Filialen**. Das `alt` verzweigt: lokal vorhanden → sofort reservieren; nur extern vorhanden → in anderer Filiale reservieren + Umlagerung; nirgends → Trigger Lieferantenbestellung (Übergang zu SD 3).

```plantuml
@startuml
title SD2 - Filialuebergreifende Ersatzteil-Reservierung

actor Disposition
participant Reparaturauftrag as RA
participant Ersatzteil as ET
participant Lagerbestand as LB
participant Filiale
participant Reservierung as Res

RA -> Disposition : ermittleBenoetigteTeile()
activate Disposition

Disposition -> ET : getBenoetigteMenge()
ET --> Disposition : menge

Disposition -> LB : pruefeBestand(teil, eigeneFiliale)
activate LB
LB --> Disposition : verfuegbarLokal(anzahl)
deactivate LB

alt lokal ausreichend verfuegbar
    Disposition -> Res : reserviere(teil, menge, eigeneFiliale)
    activate Res
    Res -> LB : mindereVerfuegbar(menge)
    Res --> Disposition : reserviertLokal
    deactivate Res
else lokal nicht ausreichend
    loop fuer jede andere Filiale (bis Bedarf gedeckt)
        Disposition -> Filiale : pruefeBestand(teil)
        activate Filiale
        Filiale -> LB : pruefeBestand(teil, filiale)
        LB --> Filiale : verfuegbar(anzahl)
        Filiale --> Disposition : bestandMeldung(anzahl)
        deactivate Filiale
    end
    alt in anderer Filiale gefunden
        Disposition -> Res : reserviere(teil, menge, andereFiliale)
        activate Res
        Res -> LB : mindereVerfuegbar(menge)
        Res --> Disposition : reserviertExtern
        deactivate Res
        Disposition -> Filiale : loeseUmlagerungAus(teil, menge, zielFiliale)
    else nirgends verfuegbar
        Disposition -> RA : meldeNachbestellbedarf(teil, menge)
        note right of RA : -> loest SD3 (Lieferantenbestellung) aus
    end
end

Disposition --> RA : reservierungsErgebnis()
deactivate Disposition
@enduml
```

**Prüfungserklärung:** Zwei verschachtelte Fragmente: das äußere `alt` (lokal vs. nicht lokal), im Else-Zweig die `loop` über die Filialen und ein inneres `alt` (extern gefunden vs. nirgends). Wichtig für die Klausur: die `Reservierung` ist eine eigene Klasse (Zuordnung Auftrag ↔ Ersatzteil ↔ Filiale), sie mindert den `Lagerbestand.verfuegbar`, ohne ihn physisch abzubuchen — die Abbuchung passiert erst bei Einbau (SD-übergreifend).

---

## SD 3 — Nachbestell-Trigger bei Meldebestand → Lieferantenbestellung (Use Case: „Nachbestellvorschlag bei Meldebestand" + „Lieferantenbestellung auslösen")

**Kontext:** Sinkt der `Lagerbestand` eines `Ersatzteil`s unter den Meldebestand (z. B. nach einer Reservierung aus SD 2), erzeugt die `Disposition` einen Nachbestellvorschlag. Das `opt` bildet die optionale manuelle Freigabe ab; das `alt` unterscheidet, ob eine offene `Lieferantenbestellung` beim `Lieferant` bereits existiert (dann Position ergänzen) oder eine neue angelegt wird.

```plantuml
@startuml
title SD3 - Nachbestell-Trigger bei Meldebestand

participant Lagerbestand as LB
actor Disposition
participant Ersatzteil as ET
participant Lieferant
participant Lieferantenbestellung as LBest
participant Bestellposition as BPos

LB -> LB : pruefeMeldebestand()
alt Bestand < Meldebestand
    LB -> Disposition : erzeugeNachbestellvorschlag(teil, fehlmenge)
    activate Disposition
    Disposition -> ET : getVorzugslieferant()
    ET --> Disposition : lieferant

    opt manuelle Freigabe erforderlich
        Disposition -> Disposition : pruefeUndFreigebeVorschlag()
    end

    alt offene Bestellung beim Lieferant vorhanden
        Disposition -> LBest : ergaenzePosition(teil, menge)
        activate LBest
        LBest -> BPos : addPosition(teil, menge)
        LBest --> Disposition : positionErgaenzt
        deactivate LBest
    else keine offene Bestellung
        Disposition -> LBest : erstelleBestellung(lieferant)
        activate LBest
        LBest -> BPos : addPosition(teil, menge)
        LBest -> Lieferant : uebermittleBestellung()
        activate Lieferant
        Lieferant --> LBest : bestellungBestaetigt(liefertermin)
        deactivate Lieferant
        LBest --> Disposition : bestellungAngelegt(termin)
        deactivate LBest
    end
    Disposition --> LB : nachbestellungAusgeloest()
    deactivate Disposition
else Bestand ausreichend
    LB -> LB : keineAktion()
end
@enduml
```

**Prüfungserklärung:** Der Trigger ist ereignisgesteuert — der `Lagerbestand` selbst prüft gegen den Meldebestand. Klausur-Falle: das innere `alt` (offene Bestellung ergänzen vs. neu anlegen) verhindert Sammelbestellungs-Dubletten. `Bestellposition` ist die n:m-Auflösung zwischen `Lieferantenbestellung` und `Ersatzteil` — konsistent zum Klassendiagramm.

---

## SD 4 — Reparatur fertigmelden + Kundenbenachrichtigung + Statuswechsel (Use Case: „Auftrag fertigmelden + Kunde benachrichtigen")

**Kontext:** Der `Techniker` schließt den letzten `Reparaturschritt` ab und bucht die `Arbeitszeitbuchung`. Das `alt` prüft, ob alle Schritte abgeschlossen sind (nur dann Statuswechsel auf `fertig`); das `opt` deckt den bevorzugten Benachrichtigungskanal ab (E-Mail/SMS je nach Kundenpräferenz).

```plantuml
@startuml
title SD4 - Fertigmeldung + Kundenbenachrichtigung

actor Techniker
participant Reparaturschritt as Schritt
participant Arbeitszeitbuchung as AZB
participant Reparaturauftrag as RA
actor Kunde

Techniker -> Schritt : schliesseAb(schrittId)
activate Schritt
Schritt -> AZB : buche(techniker, dauer)
activate AZB
AZB --> Schritt : zeitGebucht
deactivate AZB
Schritt --> Techniker : schrittAbgeschlossen
deactivate Schritt

Techniker -> RA : pruefeVollstaendigkeit()
activate RA
RA -> Schritt : alleSchritteAbgeschlossen()
activate Schritt
Schritt --> RA : true/false
deactivate Schritt

alt alle Schritte abgeschlossen
    RA -> RA : setStatus("fertig")
    note right of RA : Status: in Reparatur -> fertig
    RA -> Kunde : benachrichtigeFertigstellung()
    opt Kunde hat Benachrichtigungskanal hinterlegt
        RA -> Kunde : sendeNachricht(kanal, "Geraet abholbereit")
        Kunde --> RA : nachrichtZugestellt
    end
    RA --> Techniker : fertiggemeldet
else noch offene Schritte
    RA --> Techniker : nochOffeneSchritte(anzahl)
    note right of RA : Status bleibt: in Reparatur
end
deactivate RA
@enduml
```

**Prüfungserklärung:** Der Statuswechsel `in Reparatur → fertig` ist an eine Bedingung geknüpft (`alt`: alle Schritte fertig) — das verhindert eine verfrühte Fertigmeldung. Die `Arbeitszeitbuchung` hängt am einzelnen `Reparaturschritt`, nicht am Auftrag — so bleibt die Nachkalkulation je Schritt möglich (konsistent zum Klassendiagramm).

---

## SD 5 — Reklamationsbearbeitung mit Gewährleistungsentscheidung (Use Case: „Reklamation bearbeiten")

**Kontext:** Der `Kunde` meldet nach Abholung einen Mangel. Der `Techniker` legt eine `Reklamation` an und prüft, ob sie in die **Gewährleistung** fällt. Verschachteltes `alt`: (a) innerhalb Gewährleistung → kostenlose Nachbesserung (neuer Reparaturauftrag-Zyklus); (b) außerhalb → neuer kostenpflichtiger `Kostenvoranschlag`; das innere `opt` deckt eine strittige Fallweiterleitung ab.

```plantuml
@startuml
title SD5 - Reklamationsbearbeitung mit Gewaehrleistungsentscheidung

actor Kunde
actor Techniker
participant Reklamation as Rekl
participant Reparaturauftrag as RA
participant Rechnung
participant Kostenvoranschlag as KVA

Kunde -> Techniker : meldeMangel(auftrag, beschreibung)
Techniker -> Rekl : erstelle(auftrag, beschreibung)
activate Rekl
Rekl -> RA : ladeUrsprungsauftrag()
activate RA
RA --> Rekl : auftragsdaten(reparaturdatum)
deactivate RA
Rekl -> Rechnung : ladeRechnung(auftrag)
activate Rechnung
Rechnung --> Rekl : rechnungsdatum
deactivate Rechnung

Rekl -> Rekl : pruefeGewaehrleistung(mangel, datum)

alt innerhalb Gewaehrleistung
    Rekl -> RA : legeNachbesserungAn(kostenlos)
    activate RA
    RA -> RA : setStatus("angenommen")
    note right of RA : neuer Zyklus, kostenlos
    RA --> Rekl : nachbesserungAngelegt
    deactivate RA
    Rekl -> Kunde : bestaetigeKostenloseNachbesserung()
else ausserhalb Gewaehrleistung
    Rekl -> Kunde : informiereKostenpflicht()
    opt Kunde widerspricht Entscheidung
        Kunde -> Techniker : eskaliere(reklamation)
        Techniker -> Rekl : setzeStatus("in Pruefung")
    end
    alt Kunde akzeptiert Kostenpflicht
        Rekl -> KVA : erstelleKVA(neuerAuftrag)
        activate KVA
        KVA --> Rekl : kvaErstellt
        note right of Rekl : -> weiter mit SD1 (KVA-Freigabe)
        deactivate KVA
    else Kunde lehnt ab
        Rekl -> Rekl : setzeStatus("abgeschlossen ohne Reparatur")
    end
end
Rekl --> Techniker : reklamationBearbeitet
deactivate Rekl
@enduml
```

**Prüfungserklärung:** Kern ist die **Gewährleistungsentscheidung** (`pruefeGewaehrleistung` anhand Reparaturdatum vs. Frist). Der Gewährleistungsfall startet einen neuen, kostenlosen Auftragszyklus (Status zurück auf `angenommen`); der Nicht-Gewährleistungsfall mündet in einen neuen `Kostenvoranschlag` und schleift damit zurück in SD 1. Das verschachtelte `alt` + `opt` bildet die Eskalationsmöglichkeit ab — typische Klausur-Anforderung „mehrere Fragmenttypen kombinieren".

---

## Konsistenz-Check (für die Abgabe)

- Alle Lebenslinien-Namen kommen 1:1 aus dem Klassendiagramm.
- Jeder Statuswechsel (`note right of RA`) liegt auf einem Wert des Statusautomaten.
- Cross-Referenzen zwischen den Diagrammen sind explizit markiert (SD1↔SD2, SD2→SD3, SD5→SD1).
- Rollen (`actor`) = BPMN-Pools: `Kunde`, `Techniker`, `Disposition`, `Lieferant`.
