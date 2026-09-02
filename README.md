# FINAL – zusammengeführter Stand der Fallstudie RepairFlow (WWI25B4, Gruppe 1)

Stand: 02.09.2026. Dieser Ordner ist die Zusammenführung aus zwei parallel entstandenen Entwürfen:

- **Kilians V2** (`/Users/david/CLAUDE/V2`): Betreiber-Perspektive (FixWerk GmbH), Camunda 7, ohne KI-Feature, mit Sprint-/Trello-Plan und echten Terminen.
- **Claude/David** (`casestudy-semester-3`, Ordner `bpmn/`, `uml/`, `doku/`, `praesentation/`): Solution-Provider-Perspektive mit KI-Sofortdiagnose (Dozentenfeedback), Camunda 8, Linter ohne Befund.

Was aus welchem Entwurf übernommen wurde und warum, steht in `doku/05-vergleich-und-zusammenfuehrung.md`. Die Ordnerstruktur folgt dem neuen `main` von Jakob (`bpmn/`, `uml/`, `doku/`, `praesi/`, `claude.readme/`), damit der Stand ohne Umbenennen ins Repository kann.

## Inhalt

| Ordner | Inhalt | Abgabekriterium |
|---|---|---|
| `bpmn/` | 10 Kollaborationsdiagramme `p01-sofortdiagnose.bpmn` … `p10-retoure.bpmn` (Camunda 8, Linter 0 Befunde) + PNG mit gleichem Basisnamen, `README.md` | 10 Prozesse, Ø 12,0 Aktivitäten, 60 % automatisiert |
| `uml/` | `klassen.puml/.png` (26 Klassen), vier Fokus-Ausschnitte, `usecase.puml/.png` (18 Use Cases), `sequenz-01…06`, `zustand-reparaturauftrag`, `systemkontext`, `modell.xmi` für Visual Paradigm, `README.md` | ≥ 10 UCs, ≥ 10 Klassen, 5 Sequenzdiagramme (wir haben 6) |
| `doku/` | `Projektdokumentation.docx/.pdf` (37 Seiten, offene Stellen gelb markiert), Projektkontext, Team und Rollen, Entscheidungslog, Dozentenfeedback, Vergleichsnotiz, Protokollvorlage | Projektdokumentation |
| `praesi/` | `Abschlusspraesentation.pptx/.pdf` (20 Folien, Notizen, Vortragende je Folie) | Präsentation |
| `abgabe/` | `BPMN-WWI25B4-Gruppe1.zip` (bpmn + png), Anleitung für das Moodle-Archiv | Abgabeformat |
| `tools/` | Generatoren (BPMN, UML, Doku, Präsentation), Linter-Skript | – |
| `claude.readme/` | Jakobs Team-/Git-Regeln (`README.md`) und ein aktualisierter `CLAUDE.md` mit den Fakten dieses Stands | – |

## So kommt der Stand ins Repository (David)

Jakob hat `main` am 02.09.2026 umgebaut (Commits `bf9b448`, `3f437f3`); dort liegen noch Kilians V1-Dateien (`bpmn/p01.bpmn` …, `uml/klassen.puml` mit 18 Klassen, Betreiber-Doku). Der eigene Klon ist dahinter. Vorgehen:

```bash
cd casestudy-semester-3
git fetch origin
git switch -c feature/final-merge origin/main          # auf Jakobs neuem main aufsetzen
git rm -r --quiet bpmn uml doku praesi                  # V1-Stand entfernen (bleibt in der Historie)
cp -R /Users/david/CLAUDE/FINAL/{bpmn,uml,doku,praesi,abgabe,tools} .
cp /Users/david/CLAUDE/FINAL/claude.readme/CLAUDE.md claude.readme/CLAUDE.md
cp /Users/david/CLAUDE/FINAL/README.md README-FINAL.md   # oder Inhalt in README.md übernehmen
git add -A
git commit -m "[T03 2026-09-02] feat: merge solution-provider artefacts with v2 pm content"
git push -u origin feature/final-merge
```

Dann Pull Request auf `main`, Review durch Jakob (Qualitätsmanager). Die alten Ordner `praesentation/`, `docs/`, `archiv/` aus dem eigenen Klon nicht mitnehmen, sie sind hier in `praesi/` und `doku/` aufgegangen.

Kilians UML-Paket der Betreiber-Variante (22 Klassen, eigenes XMI) liegt unter `archiv/uml-v1-betreiber/` und ist durch `uml/` ersetzt.

## Am Gruppentermin 02.09. entschieden (E-13)

1. **Rollen**: Nina Projektleitung, David stellvertretende Projektleitung/Backups, Adrian Product Owner, Kilian Scrum Master + UML, Maxi BPMN, Jakob Qualität. Doku, Folien und READMEs sind darauf umgestellt.
2. **Präsentationstermin**: 27.10.2026, 09:00, B458 (laut `Allgemeines.docx`); 22.10. = Generalprobe.
3. **Sprint-Takt**: Trello-Board mit einer Liste je Termin (02.09., 05.10., 15.10., 22.10., 27.10., 13.11.), eine Karte je Person und Aufgabe, Teampartner als Prüfer.

## Noch offen

1. **Perspektive und KI-Feature** (E-02/E-03) von Adrian als Product Owner bestätigen lassen.
2. **Dozent informieren**: Ansprechperson Nina statt Maximilian; Camunda Cloud Pflicht oder Git ausreichend.
3. **UML-WWI25B4-Gruppe1.vpp**: `uml/modell.xmi` in Visual Paradigm importieren (Kilian), Sequenzdiagramme als Unterdiagramme anlegen, Commit auf den Teamwork-Server.
4. **BPMN im Camunda Modeler** öffnen, prüfen, speichern (Maxi), dann Camunda Cloud und `abgabe/BPMN-WWI25B4-Gruppe1.zip` neu packen.
5. Doku: Trello-Screenshot, Kapitel 6/7 nach der Präsentation.
