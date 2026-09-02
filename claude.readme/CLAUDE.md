# Kontext für KI-Assistenten (Case Study S3 — RepairFlow)

> Fachliche Fakten stehen in [`../doku/01-projektkontext.md`](../doku/01-projektkontext.md),
> Entscheidungen in [`../doku/03-entscheidungen.md`](../doku/03-entscheidungen.md),
> Team-/Git-Regeln in [`README.md`](README.md). Diese Datei enthält nur, was dort
> nicht steht: bindende Konventionen für die Arbeit am Repo.
> Aktualisiert am 02.09.2026 nach der Zusammenführung der Entwürfe (E-10/E-11).

## Was das Projekt ist

Systemanalyse-Ausarbeitung (DHBW, Methoden der WI, S3) für **RepairFlow**, eine
SaaS-Plattform für Werkstätten (Fahrrad, E-Bike, Consumer-Elektronik). Perspektive
laut Dozentenfeedback und Entscheidung E-02: **Solution Provider** — RepairFlow ist
das Startup, die fiktive FixWerk GmbH (vier Filialen) ist Pilotkunde und Mandant.
Alleinstellungsmerkmal (E-03): die **KI-Sofortdiagnose** (Prozess 01, UC01/UC02,
Klassen Voranmeldung, Medienanhang, KIDiagnosevorschlag). Automatisiert wird der
Reparaturauftrags-Lebenszyklus samt filialübergreifender Ersatzteil-Disposition.

Bewusst **außerhalb der Systemgrenze**: die physische Reparatur, die Systeme der
Lieferanten, Buchhaltung/DATEV (nur Export, Datenspeicher in Prozess 08). Diese
Grenze ist die Grundlage des Use-Case-Diagramms — nicht aufweichen.

## Abgabekriterien (Mindestumfang)

| Artefakt | Kriterium | Ist | Ort |
|----------|-----------|-----|-----|
| BPMN-Kollaborationsdiagramme | 10 Prozesse, ~10 Aktivitäten | 10 (Ø 12,0; Linter 0 Befunde) | `bpmn/p01-…p10-*.bpmn` |
| Use-Case-Diagramm | ≥ 10 Use Cases | 18 | `uml/usecase.puml` |
| Klassendiagramm | ≥ 10 Klassen | 26 (+ 7 Enums) | `uml/klassen.puml`, Ausschnitte `klassen-fokus-1..4-*.puml` |
| Sequenzdiagramme | 5 | 6 | `uml/sequenz-01..06-*.puml` |
| Zustandsdiagramm (Zusatz) | – | 1 | `uml/zustand-reparaturauftrag.puml` |

## Unumstößliche Konventionen

- **Namens-Konsistenz über alle Artefakte.** Rollen/Pools, Klassennamen,
  Use-Case-Namen und Statuswerte sind über Doku, BPMN, Use-Case-, Klassen- und
  Sequenzdiagramme **wortgleich** zu halten. Single Source of Truth für Klassen,
  Operationen und Use Cases ist `tools/umlmodel.py` (erzeugt `klassen*.puml`,
  `usecase.puml`, `modell.xmi`); für die Prozesse `tools/diagrams.py`. Änderungen
  dort zuerst, dann Bilder, Doku und Folien nachziehen.
- **Pools (3):** `Werkstattbetrieb (Pilotkunde FixWerk GmbH)` mit dem
  ausmodellierten Prozess, `Kunde` und `Lieferant` als Empty Pools. **Lanes (4)
  = Rollen:** `Service / Annahme`, `Techniker`, `Werkstattleitung`,
  `Ersatzteil-Disposition`. Keine Lane für die Software; Automatisierung steckt
  im Aktivitätstyp (E-06). Im Klassenmodell sind die Rollen die Unterklassen von
  `Mitarbeiter`: `Techniker`, `Disponent`, `Werkstattleiter`.
- **Zustandsautomat `Reparaturauftrag`:** `angenommen` → `in Diagnose` →
  `KVA offen` → `freigegeben` | `abgelehnt` → `Teile bestellt` →
  `in Reparatur` → `fertig` → `abgeholt`. Diese Statuswerte sind auch das
  `AuftragStatus`-Enum im Klassendiagramm.
- **BPMN-Dateien sind Camunda-8-Modelle** (`executionPlatform="Camunda Cloud"`,
  `isExecutable="true"`), angereichert mit `zeebe:taskDefinition`, `zeebe:userTask`
  + Formular-ID, Message-Subscriptions, ISO-Timern und FEEL-Bedingungen, damit das
  Problems-Panel des Camunda Modelers leer bleibt. Beim Bearbeiten im Modeler
  diese Anreicherung nicht entfernen; nach Änderungen `@camunda/linting` und
  `bpmnlint` laufen lassen (`tools/lint.mjs`). Je Diagramm genau ein Start- und
  ein Endereignis, Ereignisse im Partizip Perfekt, Aktivitäten Verb + Objekt.
- **Werkzeuge:** BPMN in **Camunda Modeler (Camunda 8)**, UML in **Visual
  Paradigm 18** (Import über `uml/modell.xmi`). Die `.puml`-Dateien liefern
  validen PlantUML-Code; die `.png` sind Renderings, keine Quellen. Quelle
  ändern → Rendering neu erzeugen, nie nur das PNG austauschen.
- **PNG und Quelle gehören zusammen.** Beide liegen im selben Ordner mit
  identischem Basisnamen (`klassen.puml` ↔ `klassen.png`,
  `p01-sofortdiagnose.bpmn` ↔ `p01-sofortdiagnose.png`). Namensschema nicht brechen.
- **Datenobjekte in BPMN tragen Klassennamen**, ggf. mit Zustand in eckigen
  Klammern und Bindestrich für den Umbruch („Kosten-voranschlag [vorläufig]").
  Datenspeicher: `RepairFlow-Datenbank`, `Technikerplan`, `Buchhaltung (DATEV-Export)`.

## Fallstricke

- **Doppelte Präfixe vermeiden.** Dateinamen tragen den Projektnamen nicht mehr
  (früher `repairflow-klassen.puml`) — der Ordner sagt schon, was es ist.
- **Zwei Entwürfe, ein Stand.** Kilians V2 (Betreiber-Perspektive, Camunda 7,
  ohne KI) und der Solution-Provider-Entwurf wurden am 02.09.2026 zusammengeführt
  (`doku/05-vergleich-und-zusammenfuehrung.md`). Nicht wieder auf die
  Betreiber-Fassung zurückfallen; offene Punkte stehen in E-07/E-13.
- **Keine Umlaute in Ordner-/Dateinamen.** macOS (NFD) und Linux (NFC)
  normalisieren Umlaute unterschiedlich; das erzeugt im Team Phantom-Änderungen.
  Deshalb `praesi/`, nicht `präsi/`.
- **Office-Dateien sind Binärdateien.** `.docx`/`.pptx` lassen sich nicht mergen.
  Vor dem Bearbeiten im Team abstimmen, wer sie anfasst.
- **Keine Zugangsdaten committen** — keine Tokens, Keys oder Passwörter.

## Git

- Remote: `https://github.com/jakobschwan123-cmd/casestudy-semester-3.git`, Branch `main`.
- **Keine Direkt-Commits auf `main`.** Branch + Pull Request, Review durch ein
  anderes Teammitglied. Details in [`README.md`](README.md).
- Commit-Messages englisch, mit Termin-Stempel und Conventional-Commit-Präfix:
  `[T<nn> <JJJJ-MM-TT>] <typ>: <beschreibung>`, z. B.
  `[T03 2026-09-02] docs: update class diagram`. Typen: `feat`, `fix`, `docs`,
  `refactor`, `test`. Das Datum ist das **Termin**-Datum, nicht das Commit-Datum —
  Nacharbeit gehört zum Termin, an dem die Aufgabe gestellt wurde. Termin-Nummern
  und -Daten stehen in der Termin-Tabelle in [`README.md`](README.md); bei einem
  neuen Termin dort zuerst eine Zeile ergänzen.
