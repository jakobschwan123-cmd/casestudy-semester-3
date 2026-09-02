# Kontext für KI-Assistenten (Case Study S3 — RepairFlow)

> Fachliche Fakten stehen in [`../doku/00-readme.md`](../doku/00-readme.md) und
> [`../doku/01-doku-bpmn.md`](../doku/01-doku-bpmn.md). Team-/Git-Regeln in
> [`README.md`](README.md). Diese Datei enthält nur, was dort nicht steht:
> bindende Konventionen für die Arbeit am Repo.

## Was das Projekt ist

Systemanalyse-Ausarbeitung (DHBW, Methoden der WI, S3) für **RepairFlow**, ein
Werkstatt-Management-System der fiktiven FixWerk GmbH (vier Filialen, Reparatur
von Fahrrädern/E-Bikes und Consumer-Elektronik). Automatisiert wird der
Reparaturauftrags-Lebenszyklus samt filialübergreifender Ersatzteil-Disposition.

Bewusst **außerhalb der Systemgrenze**: die physische Reparatur, die Systeme der
Lieferanten, Buchhaltung/DATEV. Diese Grenze ist die Grundlage des
Use-Case-Diagramms — nicht aufweichen.

## Abgabekriterien (Mindestumfang)

| Artefakt | Kriterium | Ist | Ort |
|----------|-----------|-----|-----|
| BPMN-Kollaborationsdiagramme | 10 Prozesse, ~10 Aktivitäten | 10 | `bpmn/` |
| Use-Case-Diagramm | ≥ 10 Use Cases | 14 | `uml/usecase.puml` |
| Klassendiagramm | ≥ 10 Klassen | 18 | `uml/klassen.puml` |
| Sequenzdiagramme | 5 | 5 | `uml/sequenz-01..05.puml` |

## Unumstößliche Konventionen

- **Namens-Konsistenz über alle Artefakte.** Rollen/Pools, Klassennamen,
  Use-Case-Namen und Statuswerte sind über Doku, BPMN, Use-Case-, Klassen- und
  Sequenzdiagramme **wortgleich** zu halten. Single Source of Truth ist der
  Abschnitt „Namenskonventionen" in `../doku/01-doku-bpmn.md` — Änderungen dort
  zuerst, dann in allen abhängigen Artefakten nachziehen.
- **Rollen/Pools (4):** `Kunde`, `Werkstatt/Techniker`, `Ersatzteil-Disposition`,
  `Lieferant`.
- **Zustandsautomat `Reparaturauftrag`:** `angenommen` → `in Diagnose` →
  `KVA offen` → `freigegeben` | `abgelehnt` → `Teile bestellt` →
  `in Reparatur` → `fertig` → `abgeholt`. Diese Statuswerte sind auch das
  `AuftragStatus`-Enum im Klassendiagramm.
- **Mermaid ist kein BPMN-Ersatz.** Die Mermaid-`flowchart`-Skizzen in der Doku
  sind Denkstützen für den Kontrollfluss. Mermaid kennt keine Pools und keine
  Message-Flows — die abgabefähigen Kollaborationsdiagramme entstehen in
  Camunda Modeler / bpmn.io und liegen als `.bpmn` in `bpmn/`.
- **Werkzeuge:** BPMN in **Camunda/bpmn.io**, UML in **Visual Paradigm**. Die
  `.puml`-Dateien liefern validen PlantUML-Code zum Übernehmen; die `.png` sind
  Renderings, keine Quellen. Quelle ändern → Rendering neu erzeugen, nie nur das
  PNG austauschen.
- **PNG und PUML gehören zusammen.** Beide liegen in `uml/` mit identischem
  Basisnamen (`klassen.puml` ↔ `klassen.png`). Namensschema nicht brechen.

## Fallstricke

- **Doppelte Präfixe vermeiden.** Dateinamen tragen den Projektnamen nicht mehr
  (früher `repairflow-klassen.puml`) — der Ordner sagt schon, was es ist.
- **Wikilinks.** Die Markdown-Dateien nutzen Obsidian-`[[wikilinks]]` ohne Pfad
  und ohne Endung (`[[03-klassen]]`). Beim Umbenennen einer Datei **alle**
  Wikilinks und Backtick-Referenzen mitziehen — `grep -rn '\[\[' --include='*.md'`.
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
