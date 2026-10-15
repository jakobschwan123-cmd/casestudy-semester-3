# Use-Case-Diagramme – allgemeine Konventionen für Darstellung und Aufbau

Kontext für ein Sprachmodell: Die Regeln gelten für UML-Use-Case-Diagramme in einer DHBW-Fallstudie (Systemanalyse, Prof. Freytag, Werkzeug Visual Paradigm 18). Abschnitt 1 enthält, was die Vorlesung (VL 6, Folien 5-52 bis 5-56) vorgibt, und hat Vorrang. Die Abschnitte 2–6 sind allgemeine Modellierungspraxis. Sie gelten nur, solange sie der Vorlesung nicht widersprechen.

## 1. Vorgaben der Vorlesung (VL 6)

- **Zweck:** Das Use-Case-Diagramm zeigt die Menge der Anwendungsfälle eines Systems aus Sicht eines oder mehrerer Akteure. Es beantwortet die Frage „Was soll das System leisten?“. Die Notation ist einfach und semiformal, funktionale Details werden weggelassen. Es ist der ideale erste Schritt der objektorientierten Analyse (5-52).
- **Elemente (5-53 bis 5-56):**
  - **Akteur:** beteiligte Person und/oder ihre Rolle (Strichmännchen).
  - **Use Case:** elementarer Geschäftsprozess (Ellipse).
  - **Mitwirkung:** Assoziation Akteur → Use Case. Ein oder mehrere Akteure nehmen an einem Use Case teil.
  - **«include» (Komposition):** Ein Use Case umfasst einen anderen Use Case vollständig.
  - **«extend» (Erweiterung):** Ein Use Case erweitert einen anderen Use Case logisch.
  - **Vererbung:** Ein Use Case ist ein Spezialfall eines anderen. Das gilt auch zwischen Akteuren.
  - **Systemgrenze:** optional, ein Rechteck um die Use Cases.
- **Benennung des Diagramms:** wie im Beispiel `ud : Flugbuchung`, also `ud : <Name>`.
- **Darstellung im Beispiel (5-56):** Akteure außerhalb der Systemgrenze, Use Cases innerhalb, Verbindungen als gerade Linien.

## 2. Semantik der Beziehungen (häufige Fehlerquelle)

| Beziehung | Bedeutung | Pfeilrichtung | Linienart |
|---|---|---|---|
| Assoziation | Akteur wirkt am Use Case mit | keine Pfeilspitze nötig | durchgezogen |
| «include» | Teilschritt, der **immer** ausgeführt wird | vom **Basis**-Use-Case zum **inkludierten** | gestrichelt, offener Pfeil |
| «extend» | Verhalten, das nur **unter einer Bedingung** eingefügt wird | vom **erweiternden** Use Case zum **Basis**-Use-Case | gestrichelt, offener Pfeil |
| Generalisierung | Spezialisierung (Use Case oder Akteur) | vom Speziellen zum Allgemeinen | durchgezogen, geschlossene Dreieckspitze |

- **Merkhilfe:** Bei include zeigt der Pfeil vom Ganzen zum Teil. Bei extend zeigt er vom Zusatz zum Grundfall.
- Zu einem extend gehören idealerweise eine **Bedingung** in eckigen Klammern und ein **Erweiterungspunkt** am Basis-Use-Case.
- include und extend **nicht** für Abläufe bzw. Reihenfolgen verwenden („erst A, dann B“). Reihenfolgen gehören in BPMN- oder Sequenzdiagramme.

## 3. Benennung der Elemente

- **Use Case:** Objekt + Verb im Infinitiv, aus Sicht des Akteurs, z. B. „Reparaturauftrag anlegen“ oder „KVA freigeben / ablehnen“. Er beschreibt ein abgeschlossenes Ergebnis mit Nutzen, keinen einzelnen Klick.
- **Akteur:** Rolle im Singular, z. B. „Disponent“, „Kunde“. Keine Personennamen und keine Abteilungen. Externe Systeme als Akteur sind erlaubt, z. B. „KI-Diagnosedienst“.
- **Systemgrenze:** Name des betrachteten Systems.
- Gleiche Begriffe wie in BPMN und Klassendiagramm verwenden (Namenskonsistenz über alle Modelle).

## 4. Aufbau und Anordnung

1. **Akteure außerhalb, Use Cases innerhalb der Systemgrenze.**
2. **Primäre Akteure links, sekundäre bzw. externe rechts.** Primäre Akteure stoßen Use Cases an. Sekundäre Akteure werden vom System angesprochen (Lieferant, externe Dienste).
3. **Use Cases nach Fachbereich gruppieren.** Spalten oder Bereiche bilden und sie nahe an die Akteure legen, die sie am meisten nutzen.
4. **Grobe Leserichtung von oben nach unten** entlang des fachlichen Ablaufs (Beginn oben, Abschluss bzw. Nachsorge unten).
5. **include/extend-Partner nebeneinander legen,** damit die gestrichelten Pfeile kurz bleiben und möglichst waagerecht oder senkrecht verlaufen.
6. **Akteure mit vielen Use Cases mittig** zu diesen Use Cases ausrichten, damit die Linien auffächern.
7. **Allgemeine Akteure** (z. B. „Mitarbeiter“) kann man über Generalisierung oben darüberstellen. Das spart Linien, ändert aber das Modell und muss mit dem Klassendiagramm zusammenpassen.
8. **Ein Diagramm ist üblich.** Wird es zu groß, kann man es nach Teilsystemen oder Paketen in mehrere Diagramme aufteilen. Wenn die Aufgabenstellung „ein Use-Case-Diagramm“ verlangt, bleibt es bei einem.

## 5. Linien und Lesbarkeit

- **Gerade bzw. schräge Linien** verwenden, keine rechtwinklige (orthogonale) Linienführung. Rechtwinklige Linien legen sich über lange Strecken übereinander, und dann ist die Zuordnung nicht mehr lesbar.
- **Kreuzungen sind erlaubt und bei vielen Akteuren unvermeidbar.** Ziel ist „so wenige wie sinnvoll“, nicht null.
- **Vermeiden:**
  - Linien, die durch einen Use Case oder Akteur laufen
  - deckungsgleiche bzw. übereinanderliegende Linien
  - doppelte Linien zwischen denselben Elementen (das ist meist ein Modellfehler, kein Darstellungsproblem)
  - Beschriftungen („«extend»“, Bedingungen), die auf Use-Case-Namen liegen
- **Multiplizitäten** an Akteur-Assoziationen sind in UML erlaubt, im Use-Case-Diagramm aber unüblich. Wenn das Werkzeug es erlaubt, ausblenden.
- **Größen einheitlich halten:** Ovale ungefähr gleich groß und Abstände gleichmäßig. Optional am Raster ausrichten.

## 6. Häufige Fehler

- include und extend verwechselt, oder die Pfeilrichtung ist falsch.
- Use Cases als einzelne Arbeitsschritte statt als abgeschlossene Ziele formuliert.
- Ablauf bzw. Reihenfolge über include/extend modelliert.
- Akteur innerhalb der Systemgrenze, oder das System selbst als Akteur.
- Software- bzw. Systemkomponenten als Akteure, obwohl sie Teil des betrachteten Systems sind.
- Akteur ohne Verbindung, oder Use Case ohne Akteur und ohne include/extend-Bezug.
- Doppelte Beziehungen nach mehrfachem Import oder Kopieren.
- Namen weichen von BPMN bzw. Klassendiagramm ab.

## 7. Kurz-Prüfliste

- [ ] Jeder Use Case: Objekt + Verb, liegt in der Systemgrenze, hat mindestens einen Akteur oder einen include/extend-Bezug
- [ ] Jeder Akteur: Rolle im Singular, außerhalb der Systemgrenze, mindestens eine Linie
- [ ] include: Basis → Teil, immer ausgeführt
- [ ] extend: Zusatz → Basis, mit Bedingung
- [ ] keine doppelten Linien, keine Linie durch fremde Elemente
- [ ] gerade Linien, Beschriftungen frei lesbar
- [ ] Diagrammname `ud : <Name>`
- [ ] Begriffe identisch mit BPMN und Klassendiagramm
