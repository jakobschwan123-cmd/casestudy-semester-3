---
type: syan-fallstudie
projekt: repairflow
teil: readme
gehoert-zu: fach-syan-fallstudie
---

# SYAN-Fallstudie: RepairFlow — Werkstatt-Management (FixWerk GmbH)

Vollständige Systemanalyse-Ausarbeitung als Vorlage für die DHBW-Fallstudie (Methoden der WI, S3). Kilian zeichnet die finalen Diagramme in **Camunda/BPMN.io** (BPMN) bzw. **Visual Paradigm** (UML) — die Dateien hier liefern Plan + validen PlantUML/Mermaid-Code zum Übernehmen.

## Erfüllung der Abgabekriterien
- **10 BPMN-Kollaborationsdiagramme** (~10 Aktivitäten) → `repairflow-01-doku-bpmn.md`
- **Use-Case-Diagramm ≥10 Use Cases** → `repairflow-02-usecase.md`
- **Klassendiagramm ≥10 Klassen** → `repairflow-03-klassen.md`
- **5 Sequenzdiagramme** → `repairflow-04-sequenzdiagramme.md`

## Teile
1. [[repairflow-01-doku-bpmn|Projektdoku + BPMN-Prozessspezifikation (10 Prozesse)]]
2. [[repairflow-02-usecase|Use-Case-Diagramm (PlantUML)]]
3. [[repairflow-03-klassen|Klassendiagramm (PlantUML)]]
4. [[repairflow-04-sequenzdiagramme|5 Sequenzdiagramme (PlantUML)]]

## Szenario
Die "FixWerk GmbH" betreibt vier Werkstatt-Filialen, die sowohl Fahrraeder (inkl. E-Bikes) als auch Consumer-Elektronik (Smartphones, Laptops, Kleingeraete) reparieren. Kernproblem: Auftragsannahme, Diagnose, Kostenvoranschlag und Ersatzteil-Beschaffung laufen heute ueber Papier-Auftragszettel, Excel und Telefon — Kunden werden nicht zuverlaessig ueber Freigaben und Fertigstellung informiert, Ersatzteile werden filial-lokal doppelt bestellt, und die Auslastung der Techniker ist intransparent. RepairFlow digitalisiert den durchgehenden Reparatur-Lebenszyklus vom Wareneingang bis zur Abholung und verbindet ihn mit einer zentralen Ersatzteil-Disposition.

## Automatisierungs-Kern (OOA-Fokus)
Automatisiert wird der Reparaturauftrags-Lebenszyklus als zentrales Werkstatt-Management-System: die Software fuehrt den Auftrag durch definierte Statusuebergaenge (angenommen -> in Diagnose -> KVA offen -> freigegeben -> Teile bestellt -> in Reparatur -> fertig -> abgeholt), erzeugt und versendet Kostenvoranschlaege, verwaltet die filialuebergreifende Ersatzteil-Disposition (Bestandsfuehrung, Reservierung, automatische Nachbestellvorschlaege bei Meldebestand) und triggert Kundenbenachrichtigungen. NICHT automatisiert (bewusst ausserhalb der Systemgrenze): die physische Reparatur selbst, die Lieferanten-eigenen Systeme und die Buchhaltung/DATEV — an diese wird nur ueber definierte Schnittstellen uebergeben. Diese klare Systemgrenze liefert die Grundlage fuer das Use-Case-Diagramm.
