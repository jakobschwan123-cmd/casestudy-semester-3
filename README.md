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
git commit -m "feat: add login validation"
```

6. Eigenen Branch auf GitHub pushen:

```bash
git push -u origin feature/meine-aufgabe
```

7. Auf GitHub einen Pull Request von dem eigenen Branch nach `main` erstellen.

8. Ein anderes Teammitglied prüft die Änderungen. Erst danach wird der Pull Request gemergt.

## Commit-Nachrichten

Commit-Nachrichten sollen kurz, eindeutig und auf Englisch sein:

```text
feat: add customer entity
fix: handle empty input
docs: update project description
refactor: simplify validation logic
test: add service unit tests
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
