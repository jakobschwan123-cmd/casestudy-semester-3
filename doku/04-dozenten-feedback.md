# Dozenten-Feedback

Rückmeldungen aus Kickoff und Coaching-Terminen, jeweils mit dem, was daraus folgt. Neueste Einträge oben.

## Konzeptvorstellung RepairFlow (vor dem 02.09.2026)

Notiert von David am 02.09.2026.

**1. Gimmick obendrauf.** Das Projekt braucht etwas, das uns von Mitbewerbern unterscheidet, zum Beispiel KI-Features. Das darf technisch heute noch nicht realisierbar sein.

Folgt daraus: Entscheidung E-03 (KI-Sofortdiagnose). Umgesetzt als Prozess 01, Use Cases UC01/UC02/UC04, Klassen Voranmeldung, Medienanhang, KIDiagnosevorschlag, Sequenzdiagramm SD1, Kapitel 2.6 der Doku und Folie 11 der Präsentation.

**2. Perspektive klären.** Sind wir Betreiber des Startups (die Werkstatt selbst) oder Solution Provider mit Software- und Workflow-Lösungen für Kunden? Tendenz: eher Solution Provider.

Folgt daraus: Entscheidung E-02 (Solution Provider, FixWerk als Pilotkunde). Umgesetzt in Doku (Kapitel 2.2, 2.3), Klassenmodell (Werkstattbetrieb als Mandant), Use Case UC18 (Werkstattbetrieb und Filialen verwalten) und Präsentation (Folien 4 und 5).

## Offene Fragen für das nächste Coaching

- Reicht unser GitHub-Repo als Artefakt-Repository für BPMN, oder ist die Camunda Cloud Pflicht (der Ablauf nennt sie, die Installationsanleitung empfiehlt Git)?
- Wechsel der Ansprechperson von Maximilian (Gruppeneinteilung) zu Nina (Projektleitung) mitteilen.
- Zählt bei „durchschnittlich 10 Aktivitäten" pro Diagramm nur der ausmodellierte Pool oder alle Pools zusammen? (Unsere Diagramme haben 11 bis 13 Aktivitäten im Werkstatt-Pool, im Schnitt 12.)
- Ist die Camunda-8-Anreicherung (Task-Definitionen, Subscriptions, FEEL-Bedingungen) erwünscht oder soll rein fachlich modelliert werden? Wir haben angereichert, damit das Problems-Panel leer ist.
- Sind 23 Klassen und 18 Use Cases im Rahmen, oder soll das Modell für die Abgabe verkleinert werden?
