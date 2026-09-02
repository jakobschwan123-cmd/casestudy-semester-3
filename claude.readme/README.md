# Git Case Study – Semester 3

Dieses Repository enthält die gemeinsame Bearbeitung unserer Case Study im 3. Semester.  
Ziel ist eine nachvollziehbare, sichere und konfliktarme Zusammenarbeit mit Git und GitHub.

## Teamregeln

- Jede Person arbeitet mit dem eigenen GitHub-Account.
- Änderungen werden regelmäßig gepusht, damit alle mit dem aktuellen Stand arbeiten.
- Keine Zugangsdaten, API-Keys oder Passwörter committen.
- Änderungen anderer Teammitglieder werden nicht ohne Absprache überschrieben.
- Bei Unklarheiten oder Merge-Konflikten zuerst im Team abstimmen.

## Branch-Strategie

Der Branch `main` enthält ausschließlich einen stabilen, funktionsfähigen Stand.

Direkte Commits auf `main` sind nicht erlaubt. Für jede Aufgabe wird ein eigener Branch erstellt:

```text
feature/<kurze-beschreibung>
fix/<kurze-beschreibung>
docs/<kurze-beschreibung>
```

Beispiele:

```text
feature/login
feature/database-schema
docs/presentation
fix/validation-error
```

Neuen Branch erstellen:

```bash
git switch main
git pull origin main
git switch -c feature/meine-aufgabe
```

## Arbeitsablauf

1. Vor Beginn immer den aktuellen Stand von `main` laden:

```bash
git switch main
git pull origin main
```

2. Eigenen Arbeits-Branch erstellen oder auswählen.

3. Änderungen lokal umsetzen und testen.

4. Geänderte Dateien prüfen:

```bash
git status
git diff
```

5. Änderungen mit einer klaren Nachricht committen:

```bash
git add .
git commit -m "[T03 2026-09-02] feat: add login validation"
```

6. Eigenen Branch auf GitHub pushen:

```bash
git push -u origin feature/meine-aufgabe
```

7. Auf GitHub einen Pull Request von dem eigenen Branch nach `main` erstellen.

8. Ein anderes Teammitglied prüft die Änderungen. Erst danach wird der Pull Request gemergt.

## Commit-Nachrichten

Jede Commit-Nachricht beginnt mit dem Termin-Stempel, damit im Log sofort
erkennbar ist, zu welchem Termin ein Stand entstanden ist:

```text
[T<nn> <JJJJ-MM-TT>] <typ>: <kurze beschreibung auf englisch>
```

Beispiele:

```text
[T03 2026-09-02] feat: add customer entity
[T03 2026-09-02] docs: update class diagram
[T04 2026-09-16] fix: handle empty input
[T04 2026-09-16] refactor: simplify validation logic
[T05 2026-09-30] test: add service unit tests
```

Regeln:

- **Termin-Nummer** zweistellig (`T03`, nicht `T3`), aus der Termin-Tabelle unten.
- **Datum** im Format `JJJJ-MM-TT` — das Datum des Termins, nicht das des Commits.
  So gehören alle Commits eines Termins zusammen, auch wenn du abends nacharbeitest.
- **Typ** aus: `feat`, `fix`, `docs`, `refactor`, `test`.
- **Beschreibung** kurz, eindeutig und auf Englisch, Kleinbuchstaben, kein Punkt am Ende.

Das aktuelle Datum bekommst du mit:

```bash
date +%F
```

### Termin-Tabelle

Vom Team zu pflegen — beim ersten Commit eines neuen Termins hier eine Zeile ergänzen.

| Termin | Datum | Schwerpunkt |
|--------|------------|-------------|
| T01 | _tbd_ | Projektgrundlagen, Repo-Setup |
| T02 | _tbd_ | BPMN-Prozesse |
| T03 | 2026-09-02 | Repo-Umstrukturierung, Use-Case-Korrektur |

### Warum der Stempel, obwohl Git das Datum kennt

Git speichert Autor- und Commit-Datum ohnehin (`git log --date=short`). Der Stempel
macht die Zuordnung aber im `--oneline`-Log und in der GitHub-Commit-Liste direkt
sichtbar und ordnet Nacharbeit dem richtigen Termin zu, statt dem Kalendertag:

```bash
git log --oneline
```

```text
bf9b448 [T03 2026-09-02] refactor: reorganise repository into folders
abaedfd [T02 2026-08-26] docs: update project description
```

## Pull-Request-Regeln

Jeder Pull Request sollte enthalten:

- Eine kurze Beschreibung der Änderung.
- Den Bezug zur bearbeiteten Aufgabe.
- Einen Hinweis, ob Tests durchgeführt wurden.
- Keine unnötigen oder fremden Änderungen.

Beispiel:

```text
## Änderung
Erstellt die Datenbankstruktur für Kunden und Kontakte.

## Getestet
Anwendung startet, Tabellen werden erfolgreich angelegt.
```

## Merge-Konflikte

Bei einem Merge-Konflikt:

1. Nicht blind Dateien überschreiben.
2. Den aktuellen Stand von `main` in den eigenen Branch holen.
3. Konfliktstellen sorgfältig vergleichen und gemeinsam klären.
4. Projekt nach der Lösung erneut testen.
5. Erst dann den Pull Request aktualisieren.

## Definition of Done

Eine Aufgabe gilt als fertig, wenn:

- Der Code bzw. Inhalt vollständig ist.
- Die Anwendung oder betroffene Funktion getestet wurde.
- Keine sensiblen Daten enthalten sind.
- Die Änderungen verständlich dokumentiert sind.
- Ein Pull Request erstellt und geprüft wurde.
- Die Änderung sauber in `main` gemergt wurde.
