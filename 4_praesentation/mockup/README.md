# RepairFlow – Kunden-App Mockup (Live-Demo)

Interaktives Mockup der Kunden-App für die **Abschlusspräsentation** (Folie 12, Live-Demo). Zeigt die
Customer Journey von der Sofortdiagnose (inkl. KI-Assistent) über den vorläufigen
Kostenvoranschlag und die Voranmeldung bis zum Auftragsstatus.

## Starten

Einfach **`index.html` im Browser öffnen** (Doppelklick). Keine Installation,
kein Internet, kein Build nötig – läuft komplett offline.

> Tipp für die Präsentation: Browser-Vollbild (F11 / Cmd-Strg-F) und ggf.
> hineinzoomen (Cmd/Strg +), damit der Phone-Frame groß auf der Leinwand steht.

## Bedienung

- **„Weiter"-Button** (unten): klickt durch die 8 Schritte der Journey.
- **Pfeiltasten** ← / → : vor und zurück (praktisch beim Vortragen).
- **„Demo neu starten"**: setzt die Journey auf Schritt 1 zurück –
  für mehrfaches Vorführen.

## Die 8 Schritte (Customer Journey)

1. **Start / Login** – Begrüßung, Einstieg
2. **Geräteauswahl** – Fahrrad / E-Bike / Elektronik (Enum `GeraeteTyp`)
3. **Problem + Foto** – Symptombeschreibung & Medien-Upload (`Voranmeldung`)
4. **KI-Assistent analysiert** – inszenierte Analyse-Animation (`T01_KI`)
5. **KI-Diagnose** – Ursache, Konfidenz 92 %, Aufwand, Teile (`KIDiagnosevorschlag`)
6. **Angebot / Kostenvoranschlag** – Positionen + Gesamtpreis, Filiale und Terminvorschlag; Button „Voranmeldung bestätigen“ (`Kostenvoranschlag`)
7. **Bestätigung + Termin** – Voranmeldung, Filiale, Termin; Preis vorläufig, Teile vorreserviert (Prozess 01, UC02)
8. **Status-Tracking** – Fortschritt entlang der `AuftragStatus`-Kette

## Hinweise

- Die KI-Diagnose ist **simuliert** (scripted) – keine echte LLM-Anbindung,
  damit die Live-Demo zuverlässig und offline funktioniert.
- Begriffe und Werte entsprechen dem UML-Modell der Fallstudie
  (`KIDiagnosevorschlag`, `KvaPosition`, `AuftragStatus`, `KvaStatus`).
- Es ist ein **Mockup zur Veranschaulichung**, keine lauffähige Produktversion.
