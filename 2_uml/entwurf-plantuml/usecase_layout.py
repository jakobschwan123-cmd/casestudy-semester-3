# -*- coding: utf-8 -*-
"""Zeichnet usecase.svg/.png als Vorlage für Visual Paradigm: je Use Case genau eine Rolle (Dozentenhinweis 15.10.2026).
Der PlantUML-Automatiklayout liefert bei 1:1-Verbindungen kein lesbares Bild, deshalb ein festes Raster.
Aufruf: python3 usecase_layout.py  (schreibt usecase.svg und usecase.png in dieses Verzeichnis)."""
import os, cairosvg

HERE = os.path.dirname(os.path.abspath(__file__))

# Reihenfolge der Zeilen = Reihenfolge im Diagramm. (Bereich, UC-Nr, Name, Rolle links, externer Akteur rechts)
ROWS = [
    ('Kundenportal (App)', 'UC01', 'Sofortdiagnose anfordern', 'Kunde', 'KI-Diagnosedienst'),
    ('Kundenportal (App)', 'UC02', 'Voranmeldung bestätigen', 'Kunde', None),
    ('Kundenportal (App)', 'UC07', 'KVA freigeben / ablehnen', 'Kunde', None),
    ('Auftrag und Werkstatt', 'UC03', 'Reparaturauftrag anlegen', 'Serviceannahme', None),
    ('Auftrag und Werkstatt', 'UC04', 'Diagnosevorschlag prüfen', 'Diagnoseprüfer', None),
    ('Auftrag und Werkstatt', 'UC05', 'Diagnosebefund erfassen', 'Diagnostiker', None),
    ('Auftrag und Werkstatt', 'UC06', 'KVA erstellen', 'Kalkulator', None),
    ('Auftrag und Werkstatt', 'UC17', 'Werkstatttermin planen und Techniker zuweisen', 'Werkstattplaner', None),
    ('Auftrag und Werkstatt', 'UC13', 'Reparaturschritt und Arbeitszeit erfassen', 'Reparateur', None),
    ('Auftrag und Werkstatt', 'UC14', 'Auftrag fertigmelden', 'Endkontrolleur', None),
    ('Auftrag und Werkstatt', 'UC15', 'Abholung und Abrechnung abwickeln', 'Geräteausgabe', None),
    ('Auftrag und Werkstatt', 'UC16', 'Reklamation bearbeiten', 'Reklamationsbearbeiter', None),
    ('Ersatzteil-Disposition', 'UC19', 'Retoure abwickeln', 'Retourenbearbeiter', 'Lieferant'),
    ('Ersatzteil-Disposition', 'UC11', 'Wareneingang buchen', 'Wareneingang', 'Lieferant'),
    ('Ersatzteil-Disposition', 'UC10', 'Lieferantenbestellung auslösen', 'Einkäufer', 'Lieferant'),
    ('Ersatzteil-Disposition', 'UC09', 'Ersatzteile disponieren und reservieren', 'Teiledisponent', None),
    ('Ersatzteil-Disposition', 'UC12', 'Nachbestellvorschlag erzeugen', 'Bestandsplaner', None),
    ('Ersatzteil-Disposition', 'UC08', 'Ersatzteil-Verfügbarkeit prüfen', None, None),
    ('Administration', 'UC18', 'Werkstattbetrieb und Filialen verwalten', 'Betriebsadministrator', None),
]
# (von, nach, Art, Bedingung (Zeilen), Spur, Spur für die Beschriftung)
RELS = [
    ('UC02', 'UC01', 'extend', ['[Kunde bestätigt Voranmeldung]'], 0, 0),
    ('UC01', 'UC08', 'include', [], 3, 3),
    ('UC03', 'UC16', 'extend', ['[Nacharbeit freigegeben', 'oder Angebot angenommen]'], 2, 3),
    ('UC19', 'UC16', 'extend', ['[Lieferantenteil defekt]'], 0, 0),
    ('UC19', 'UC11', 'extend', ['[Lieferung mangelhaft]'], 0, 0),
    ('UC10', 'UC09', 'extend', ['[Fehlteile vorhanden]'], 0, 0),
    ('UC12', 'UC09', 'extend', ['[Meldebestand', 'unterschritten]'], 0, 0),
    ('UC09', 'UC08', 'include', [], 2, 2),
]

ROW_H, HEAD_H, TOP, LEFT = 78, 46, 70, 40
X_ACT, X_UC, UC_W, UC_H, X_LANE0, LANE_GAP, X_EXT = 150, 640, 330, 56, 850, 62, 1310
FONT = "font-family='Arial, Helvetica, sans-serif'"

def actor(x, y, name, extern=False):
    s = []
    s.append(f"<circle cx='{x}' cy='{y-30}' r='9' fill='white' stroke='black' stroke-width='1.5'/>")
    s.append(f"<line x1='{x}' y1='{y-21}' x2='{x}' y2='{y+2}' stroke='black' stroke-width='1.5'/>")
    s.append(f"<line x1='{x-14}' y1='{y-12}' x2='{x+14}' y2='{y-12}' stroke='black' stroke-width='1.5'/>")
    s.append(f"<line x1='{x}' y1='{y+2}' x2='{x-12}' y2='{y+18}' stroke='black' stroke-width='1.5'/>")
    s.append(f"<line x1='{x}' y1='{y+2}' x2='{x+12}' y2='{y+18}' stroke='black' stroke-width='1.5'/>")
    label = f"«extern» {name}" if extern else name
    s.append(f"<text x='{x}' y='{y+33}' text-anchor='middle' font-size='12' {FONT}>{label}</text>")
    return '\n'.join(s)

def main():
    y = TOP + 26
    rows_y, area_span = {}, {}
    cur = None
    for area, uc, name, role, ext in ROWS:
        if area != cur:
            y += HEAD_H
            cur = area
            area_span[area] = [y - HEAD_H + 10, None]
        rows_y[uc] = y + ROW_H // 2
        area_span[area][1] = y + ROW_H
        y += ROW_H
    height = y + 40
    width = X_EXT + 120
    out = [f"<svg xmlns='http://www.w3.org/2000/svg' width='{width}' height='{height}' viewBox='0 0 {width} {height}'>",
           "<rect width='100%' height='100%' fill='white'/>",
           "<defs><marker id='arr' markerWidth='10' markerHeight='10' refX='9' refY='5' orient='auto'>"
           "<path d='M0,0 L9,5 L0,10' fill='none' stroke='black' stroke-width='1.2'/></marker></defs>",
           f"<text x='{width/2}' y='34' text-anchor='middle' font-size='15' font-weight='bold' {FONT}>ud : RepairFlow – Use-Case-Diagramm (je Use Case eine Rolle)</text>"]
    # Systemgrenze
    sx0, sx1 = X_UC - UC_W // 2 - 40, X_LANE0 + 4 * LANE_GAP + 30
    sy0, sy1 = TOP + 12, height - 24
    out.append(f"<rect x='{sx0}' y='{sy0}' width='{sx1-sx0}' height='{sy1-sy0}' fill='none' stroke='black' stroke-width='1.5'/>")
    out.append(f"<text x='{sx0+10}' y='{sy0+18}' font-size='13' font-weight='bold' {FONT}>RepairFlow</text>")
    # Bereiche
    for area, (a0, a1) in area_span.items():
        ax0, ax1 = X_UC - UC_W // 2 - 20, X_UC + UC_W // 2 + 20
        out.append(f"<rect x='{ax0}' y='{a0+16}' width='{ax1-ax0}' height='{a1-a0-20}' fill='none' stroke='#555' stroke-dasharray='4,3'/>")
        out.append(f"<text x='{ax0+8}' y='{a0+32}' font-size='12' font-weight='bold' fill='#333' {FONT}>{area}</text>")
    # Use Cases, Rollen, externe Akteure
    for area, uc, name, role, ext in ROWS:
        cy = rows_y[uc]
        out.append(f"<ellipse cx='{X_UC}' cy='{cy}' rx='{UC_W//2}' ry='{UC_H//2}' fill='#f4f4f4' stroke='black' stroke-width='1.3'/>")
        out.append(f"<text x='{X_UC}' y='{cy-4}' text-anchor='middle' font-size='11' {FONT}>{uc}</text>")
        out.append(f"<text x='{X_UC}' y='{cy+12}' text-anchor='middle' font-size='12' {FONT}>{name}</text>")
        if role:
            out.append(actor(X_ACT, cy, role))
            out.append(f"<line x1='{X_ACT+16}' y1='{cy}' x2='{X_UC-UC_W//2}' y2='{cy}' stroke='black' stroke-width='1.3'/>")
        if ext:
            out.append(actor(X_EXT, cy, ext, extern=True))
            out.append(f"<line x1='{X_UC+UC_W//2}' y1='{cy}' x2='{X_EXT-16}' y2='{cy}' stroke='black' stroke-width='1.3'/>")
    # include / extend
    seen = {}
    for src, dst, kind, cond, lane, llane in RELS:
        ys, yd = rows_y[src], rows_y[dst]
        xl = X_LANE0 + lane * LANE_GAP
        xt = X_LANE0 + llane * LANE_GAP + 5
        xe = X_UC + UC_W // 2
        off = 14 if ys < yd else -14  # Andockpunkt leicht versetzt, damit Linien nicht übereinanderliegen
        k = (dst, off)
        doff = off * (1 - 0.6 * seen.get(k, 0))  # mehrere Pfeile von derselben Seite auf ein Ziel: Andockpunkte spreizen
        seen[k] = seen.get(k, 0) + 1
        p = f"M{xe},{ys+off} L{xl},{ys+off} L{xl},{yd-doff} L{xe+2},{yd-doff}"
        out.append(f"<path d='{p}' fill='none' stroke='black' stroke-width='1.2' stroke-dasharray='6,4' marker-end='url(#arr)'/>")
        ym = (ys + yd) / 2 - 6 * len(cond)
        out.append(f"<text x='{xt}' y='{ym}' font-size='11' {FONT}>«{kind}»</text>")
        for i, c in enumerate(cond):
            out.append(f"<text x='{xt}' y='{ym+13+12*i}' font-size='10' {FONT}>{c}</text>")
    out.append("</svg>")
    svg = '\n'.join(out)
    open(os.path.join(HERE, 'usecase.svg'), 'w', encoding='utf-8').write(svg)
    cairosvg.svg2png(bytestring=svg.encode('utf-8'), write_to=os.path.join(HERE, 'usecase.png'), scale=2)
    print('ok', width, height)

if __name__ == '__main__':
    main()
