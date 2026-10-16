# Abschlusspräsentation

`Abschlusspraesentation.pptx` und `.pdf`: 17 Folien plus Anhang, Pitch und Zusammenfassung ohne Diagrammbilder (E-25). Die Diagramme liegen in der Projektdokumentation und im Abgabepaket.

| Datei | Inhalt |
|---|---|
| `Abschlusspraesentation.pptx` / `.pdf` | die Präsentation; Sprechtext je Folie in den Notizen, Zuordnung der Vortragenden auf Folie 2 und 18 |
| `Sprechtext_Abschlusspraesentation.docx` | Sprechtexte mit Zeitangaben, zum Ausdrucken für die Generalprobe |
| `tools/pres.js` | Generator (pptxgenjs); liest `tools/sprechtext.json` und `tools/process_stats.json` |
| `tools/sprechtext.py` | Sprechtexte als Quelle; schreibt `sprechtext.json` und die Word-Datei |

Neu erzeugen: `cd 4_praesentation/tools && python3 sprechtext.py && NODE_PATH=<pfad zu node_modules> node pres.js`, dann die pptx als PDF exportieren. Wer direkt in PowerPoint ändert, sagt in der WhatsApp-Gruppe Bescheid, damit die Änderung nicht beim nächsten Erzeugen verloren geht.
