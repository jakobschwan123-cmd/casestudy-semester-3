# Dateiübersicht – RepairFlow (Fallstudie Systemanalyse, WWI25B4 Gruppe 1)

Stand 02.09.2026. Diese Datei erklärt jede Datei im Repository: wo sie liegt, wie sie heißt, wofür sie da ist und wer sie pflegt. Ordnerstruktur = Jakobs `main` (`bpmn/`, `uml/`, `doku/`, `praesi/`, `abgabe/`, `tools/`, `archiv/`, `claude.readme/`).

## Wurzelverzeichnis

| Datei | Wofür | Pflege |
|---|---|---|
| `README.md` | Einstieg: was der Stand ist, wie er entstanden ist (Zusammenführung der zwei Entwürfe), wie er per Branch `feature/final-merge` ins Repo kommt, was entschieden und was noch offen ist | David |
| `DATEIUEBERSICHT.md` | diese Datei | Claude / Kilian |
| `.gitignore` | schließt macOS-/Windows-Metadaten (`._*`, `.DS_Store`, `Thumbs.db`), Build-Zwischenstände der Generatoren und Transfer-ZIPs vom Commit aus | Jakob |

## `bpmn/` – Geschäftsprozessmodelle (Abgabekriterium: 10 Kollaborationsdiagramme)

Dateiname = `p` + zweistellige Nummer + Prozessname, keine Umlaute. Quelle ist immer die `.bpmn`-Datei, das `.png` mit gleichem Namen ist nur das Bild für Doku und Folien.

| Datei | Prozess | Pools / Lanes |
|---|---|---|
| `p01-sofortdiagnose.bpmn/.png` | KI-Sofortdiagnose und Voranmeldung (Alleinstellungsmerkmal) | Kunde, Werkstattbetrieb (Service/Annahme, Disposition, Werkstattleitung) |
| `p02-auftragsannahme.bpmn/.png` | Auftragsannahme, Geräteregistrierung und Terminplanung | Kunde, Werkstattbetrieb (Service/Annahme, Werkstattleitung) |
| `p03-fehlerdiagnose.bpmn/.png` | Fehlerdiagnose | Kunde, Werkstattbetrieb (Service/Annahme, Techniker) |
| `p04-kostenvoranschlag.bpmn/.png` | Kostenvoranschlag und Kundenfreigabe (ereignisbasiertes Gateway mit Timer) | Kunde, Werkstattbetrieb (Service/Annahme, Techniker) |
| `p05-ersatzteilreservierung.bpmn/.png` | Ersatzteil-Verfügbarkeit und Reservierung, filialübergreifend | Kunde, Werkstattbetrieb (Techniker, Disposition) |
| `p06-ersatzteilbestellung.bpmn/.png` | Ersatzteil-Bestellung beim Lieferanten, Wareneingang | Lieferant, Werkstattbetrieb, Kunde (3 Pools) |
| `p07-reparaturdurchfuehrung.bpmn/.png` | Reparaturdurchführung und Arbeitszeiterfassung | Kunde, Werkstattbetrieb (Service/Annahme, Techniker) |
| `p08-abholung.bpmn/.png` | Abholung, Rechnung und Zahlung (DATEV-Übergabe) | Kunde, Werkstattbetrieb (Service/Annahme, Techniker) |
| `p09-reklamation.bpmn/.png` | Reklamation und Gewährleistung | Kunde, Werkstattbetrieb (Techniker, Service/Annahme, Werkstattleitung) |
| `p10-retoure.bpmn/.png` | Ersatzteil-Retoure und Lieferanten-Reklamation | Werkstattbetrieb (Werkstattleitung, Disposition), Lieferant |
| `README.md` | Konventionen (Pool = Unternehmen, Lanes = Rollen, Aktivitätstypen, Datenobjekte), Prüfstand (Linter 0 Befunde, Ø 12,0 Aktivitäten), Aufgaben für Maxi (im Camunda Modeler öffnen, speichern, Camunda Cloud) | Maxi |

Verantwortlich: **Maxi** (BPMN). Nächster Schritt: jede Datei im Camunda Modeler öffnen, Problems-Panel prüfen, speichern, in die Camunda Cloud laden.

## `uml/` – Objektorientierte Analyse (Abgabekriterium: Use-Case-, Klassen-, 5 Sequenzdiagramme)

`.puml` = PlantUML-Quelle, `.png` = Bild. `modell.xmi` ist die Datei für den Import in Visual Paradigm.

| Datei | Wofür |
|---|---|
| `usecase.puml/.png` | Use-Case-Diagramm `ud : RepairFlow` – 18 Use Cases, 7 Akteure, include/extend, Systemgrenze |
| `klassen.puml/.png` | Vollständiges Klassendiagramm `cd : RepairFlow` – 26 Klassen, 7 Enums, 34 Assoziationen |
| `klassen-fokus-1-sofortdiagnose.puml/.png` | Ausschnitt Kundenkontakt und KI-Sofortdiagnose (in Doku und Folien) |
| `klassen-fokus-2-auftrag.puml/.png` | Ausschnitt Auftragsabwicklung (in der Doku) |
| `klassen-fokus-3-disposition.puml/.png` | Ausschnitt Ersatzteil-Disposition |
| `klassen-fokus-4-organisation.puml/.png` | Ausschnitt Mandant, Filialen und Rollen |
| `sequenz-01-sofortdiagnose.puml/.png` | SD1 zu UC01 Sofortdiagnose anfordern |
| `sequenz-02-kva-freigabe.puml/.png` | SD2 zu UC07 KVA freigeben/ablehnen |
| `sequenz-03-reservierung.puml/.png` | SD3 zu UC09 Ersatzteil reservieren (filialübergreifend) |
| `sequenz-04-fertigmeldung.puml/.png` | SD4 zu UC14 Auftrag fertigmelden und Kunde benachrichtigen |
| `sequenz-05-reklamation.puml/.png` | SD5 zu UC16 Reklamation bearbeiten |
| `sequenz-06-nachbestellvorschlag.puml/.png` | SD6 zu UC12/UC10 Nachbestellvorschlag und Lieferantenbestellung (sechstes SD, Bonus) |
| `zustand-reparaturauftrag.puml/.png` | Zustandsdiagramm `sd : Reparaturauftrag` (Bonus; der Zustandsautomat, der alle Modelle verbindet) |
| `systemkontext.puml/.png` | Systemkontext-Skizze für Doku Kapitel 2.4 |
| `modell.xmi` | Klassen- und Use-Case-Modell als XMI 2.1 für **Visual Paradigm** (Project → Import → XMI) |
| `README.md` | Vorgehen für Kilian in Visual Paradigm 18: XMI importieren, Diagramme aus dem Modell ziehen, Sequenzdiagramme als Unterdiagramme der Use Cases anlegen, Commit auf den Teamwork-Server, `.vpp` sichern | Kilian |

Verantwortlich: **Kilian** (UML). Nächster Schritt: `UML-WWI25B4-Gruppe1.vpp` in Visual Paradigm erzeugen – die Datei existiert noch nicht und ist Pflicht für die Abgabe.

## `doku/` – Projektdokumentation und Projektwissen

| Datei | Wofür |
|---|---|
| `Projektdokumentation.docx` | Die Projektdokumentation (Word): Titelseite mit Kurs, Gruppe, Namen; Kapitel 1 Mitglieder und Rollen, 2 Projekt, 3 Vorgehen, 4 Projektmanagement, 5 Artefakte, 6 Probleme, 7 Feedback, Anhang A Abgabestruktur, Anhang B die zehn BPMN-Diagramme. 24 Seiten Haupttext + 10 Seiten Anhang. Offene Stellen sind gelb als `[Gruppe: …]` markiert (Trello-Screenshot, echte Sprint-Ergebnisse, Kapitel 6/7 nach der Präsentation). Wird bei der Abgabe zu `Projekt-WWI25B4-Gruppe1.pdf` |
| `Projektdokumentation.pdf` | PDF-Export der Word-Datei (nach jeder Änderung neu erzeugen) |
| `00-uebersicht.md` | Inhaltsverzeichnis des Ordners `doku/` |
| `01-projektkontext.md` | Fachliche Fakten: Szenario FixWerk, Perspektive Solution Provider, Prozessliste, Systemgrenze, Zustandsautomat – Nachschlagewerk für alle |
| `02-team-und-rollen.md` | Rollen (Stand 02.09.: Nina PL, David Stellvertretung/Backups, Adrian PO, Kilian SM + UML, Maxi BPMN, Jakob QM), Zweierteams, Sprecherzuordnung der Präsentation, Präsentationstermin |
| `03-entscheidungen.md` | Entscheidungslog E-01 … E-14: was, wann, warum, Auswirkung. Offene Entscheidungen stehen oben |
| `04-dozenten-feedback.md` | Rückmeldungen des Dozenten (Perspektive klären, KI-Gimmick) und offene Fragen fürs nächste Coaching |
| `05-vergleich-und-zusammenfuehrung.md` | Warum der Solution-Provider-Entwurf die Basis ist und was aus Kilians Betreiber-Entwurf übernommen wurde |
| `protokolle/_vorlage.md` | Vorlage für Sprint-Protokolle |
| `protokolle/2026-09-02-sprint1.md` | Protokoll des ersten Gruppentermins (Entscheidungen, Aufgaben je Person, offene Punkte, Retrospektive – zwei Stellen vom Team zu füllen) |

Verantwortlich: **Claude** (Dokumanager) über Kilian/David; Kapitel 4 und Protokolle: **Kilian** (Scrum Master), Abgabe-PDF: **Nina**.

## `praesi/` – Abschlusspräsentation (27.10.2026)

| Datei | Wofür |
|---|---|
| `Abschlusspraesentation.pptx` | 20 Folien mit Sprechernotizen. Sprecherzuordnung: Nina 1–2 und 18–19, David 3 und 16, Adrian 4–6 und 11, Maxi 7–10, Kilian 12–14, Jakob 15 und 17; Folie 20 = Pflichtangabe „wer verantwortet welchen Beitrag". Folie 16 enthält eine rote Stelle für den Trello-Screenshot |
| `Abschlusspraesentation.pdf` | PDF-Export; wird bei der Abgabe zu `Praesentation-WWI25B4-Gruppe1.pdf` |

Verantwortlich: **Jakob** (Folien), jede Person für den eigenen Block.

## `abgabe/` – was in Moodle hochgeladen wird (bis 13.11.2026, 23:59)

| Datei | Wofür |
|---|---|
| `BPMN-WWI25B4-Gruppe1.zip` | Die zehn `.bpmn`-Dateien als XML-Export (nur XML, keine Bilder). Nach der Nacharbeit im Camunda Modeler neu packen: `cd bpmn && zip ../abgabe/BPMN-WWI25B4-Gruppe1.zip p*.bpmn` |
| `README.md` | Anleitung, wie das Gesamtarchiv `Fallstudie-WWI25B4-Gruppe1.zip` gebaut wird (Doku-PDF, BPMN-ZIP, VPP, Präsentations-PDF, jeweils mit den vorgeschriebenen Dateinamen) |

Noch nicht vorhanden: `UML-WWI25B4-Gruppe1.vpp` (Kilian, aus Visual Paradigm) und das Gesamtarchiv (Nina, nach der Präsentation).

## `tools/` – Generatoren (nicht Teil der Abgabe)

Damit wurden die Rohartefakte erzeugt. Nur anfassen, wenn man etwas neu bauen will; die Abgabe-Dateien liegen fertig in den Ordnern oben.

| Datei | Wofür |
|---|---|
| `diagrams.py` + `bpmngen.py` | Prozessinhalte (diagrams.py) und BPMN-XML-Generator mit Layout (bpmngen.py) → `bpmn/*.bpmn` |
| `render.py` | rendert `.bpmn` mit bpmn-js zu PNG |
| `lint.mjs` | Prüfung mit dem Camunda-Linter |
| `umlmodel.py` | Single Source of Truth für Klassen, Operationen, Use Cases → `uml/klassen*.puml`, `uml/usecase.puml`, `uml/modell.xmi` |
| `doc.js` + `mktoc.py` | erzeugen `doku/Projektdokumentation.docx` (zwei Durchläufe wegen Inhaltsverzeichnis) |
| `pres.js` | erzeugt `praesi/Abschlusspraesentation.pptx` |
| `process_stats.json` | Kennzahlen je Prozess (Aktivitäten, Automatisierungsgrad), von Doku und Folien gelesen |
| `imgdims.json` | Bildgrößen für doc.js/pres.js |
| `pres/crop-*.png` | drei Diagramm-Ausschnitte für die Folien 9, 10 und 8 |
| `README.md` | Aufrufe und Abhängigkeiten der Skripte |

## `archiv/` – ersetzt, nur zur Nachvollziehbarkeit

| Ordner | Wofür |
|---|---|
| `uml-v1-betreiber/` | Kilians erstes UML-Paket (Betreiber-Perspektive, 22 Klassen, eigenes XMI, README). Ersetzt durch `uml/`; nichts davon in die Abgabe |

## `claude.readme/` – Regeln für Team und KI-Assistenten

| Datei | Wofür |
|---|---|
| `README.md` | Jakobs Team- und Git-Regeln (Branches `feature/…`, Pull Requests, Review, Commit-Nachrichten, Definition of Done) |
| `CLAUDE.md` | Bindende Konventionen für die Arbeit am Repo (Namen, Pools, Lanes, Zustandsautomat, Werkzeuge) – Kontext für KI-Assistenten |

## Was fehlt noch bis zur Abgabe

1. `UML-WWI25B4-Gruppe1.vpp` aus Visual Paradigm (Kilian) – Pflicht.
2. Alle zehn BPMN einmal im Camunda Modeler geöffnet und gespeichert, in die Camunda Cloud geladen (Maxi); danach `abgabe/BPMN-WWI25B4-Gruppe1.zip` neu packen.
3. Doku: Trello-Screenshot in Kapitel 4.3, Kapitel 6/7 nach der Präsentation, PDF neu exportieren und als `Projekt-WWI25B4-Gruppe1.pdf` ins Gesamtarchiv (Nina).
4. Präsentation: Trello-Screenshot auf Folie 16, PDF-Export als `Praesentation-WWI25B4-Gruppe1.pdf`.
5. Dozent informieren: Ansprechperson Nina, Frage Camunda Cloud vs. Git.
