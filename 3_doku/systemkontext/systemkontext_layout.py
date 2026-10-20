# -*- coding: utf-8 -*-
"""Zeichnet systemkontext.svg/.png (Abbildung 1 der Doku) im festen Raster. Inhalt wie systemkontext.puml.
Aufruf: python3 systemkontext_layout.py"""
import os, cairosvg

HERE = os.path.dirname(os.path.abspath(__file__))
FONT = "font-family='Arial, Helvetica, sans-serif'"
W, H = 1260, 680

def actor(out, x, y, lines):
    out.append(f"<circle cx='{x}' cy='{y-30}' r='9' fill='white' stroke='black' stroke-width='1.5'/>")
    out.append(f"<line x1='{x}' y1='{y-21}' x2='{x}' y2='{y+2}' stroke='black' stroke-width='1.5'/>")
    out.append(f"<line x1='{x-14}' y1='{y-12}' x2='{x+14}' y2='{y-12}' stroke='black' stroke-width='1.5'/>")
    out.append(f"<line x1='{x}' y1='{y+2}' x2='{x-12}' y2='{y+18}' stroke='black' stroke-width='1.5'/>")
    out.append(f"<line x1='{x}' y1='{y+2}' x2='{x+12}' y2='{y+18}' stroke='black' stroke-width='1.5'/>")
    for i, l in enumerate(lines):
        out.append(f"<text x='{x}' y='{y+33+13*i}' text-anchor='middle' font-size='{12 if i == 0 else 10}' {FONT}>{l}</text>")

def box(out, x, y, w, h, lines, fill='white', dashed=False, bold_first=False, size=12):
    d = " stroke-dasharray='6,4'" if dashed else ''
    out.append(f"<rect x='{x}' y='{y}' width='{w}' height='{h}' fill='{fill}' stroke='black' stroke-width='1.3'{d}/>")
    for i, l in enumerate(lines):
        fw = " font-weight='bold'" if (bold_first and i == 0) else ''
        out.append(f"<text x='{x+w/2}' y='{y+h/2+(i-(len(lines)-1)/2)*15+5}' text-anchor='middle' font-size='{size}'{fw} {FONT}>{l}</text>")

def line(out, x1, y1, x2, y2, dashed=False):
    d = " stroke-dasharray='6,4'" if dashed else ''
    out.append(f"<line x1='{x1}' y1='{y1}' x2='{x2}' y2='{y2}' stroke='black' stroke-width='1.3'{d}/>")

def label(out, x, y, lines, anchor='middle'):
    for i, l in enumerate(lines):
        out.append(f"<text x='{x}' y='{y+12*i}' text-anchor='{anchor}' font-size='10' {FONT}>{l}</text>")

def main():
    o = [f"<svg xmlns='http://www.w3.org/2000/svg' width='{W}' height='{H}' viewBox='0 0 {W} {H}'>", "<rect width='100%' height='100%' fill='white'/>",
         f"<text x='{W/2}' y='30' text-anchor='middle' font-size='15' font-weight='bold' {FONT}>Systemkontext RepairFlow (Solution Provider, Pilotkunde FixWerk GmbH)</text>"]
    # Werkstattbetrieb links
    bx, by, bw, bh = 40, 150, 300, 480
    o.append(f"<rect x='{bx}' y='{by}' width='{bw}' height='{bh}' fill='#F7F7F7' stroke='black' stroke-width='1.3'/>")
    o.append(f"<text x='{bx+bw/2}' y='{by+20}' text-anchor='middle' font-size='12' font-weight='bold' {FONT}>Werkstattbetrieb (Mandant), z. B. FixWerk GmbH</text>")
    people = [('Werkstattleiter', '(Werkstattleitung, Administration)'), ('Servicemitarbeiter', '(Service / Annahme)'),
              ('Techniker', '(Werkstatt)'), ('Disponent', '(Ersatzteil-Disposition)')]
    ys = [by + 95 + i * 105 for i in range(4)]
    for (n, r), y in zip(people, ys):
        actor(o, 130, y, [n, r])
    # Plattform Mitte
    px, py, pw, ph = 520, 150, 300, 480
    o.append(f"<rect x='{px}' y='{py}' width='{pw}' height='{ph}' fill='#EEF3FF' stroke='black' stroke-width='1.5'/>")
    o.append(f"<text x='{px+pw/2}' y='{py+ph-26}' text-anchor='middle' font-size='12' font-weight='bold' {FONT}>RepairFlow-Plattform (SaaS), RepairFlow GmbH</text>")
    o.append(f"<text x='{px+pw/2}' y='{py+ph-10}' text-anchor='middle' font-size='10' font-style='italic' {FONT}>Systemgrenze</text>")
    mods = ['Kundenportal / App', 'Auftrags- und Werkstattmodul', 'Dispositionsmodul', 'Abrechnung']
    mys = [py + 70 + i * 105 for i in range(4)]
    mx, mw, mh = px + 40, 220, 44
    for m, y in zip(mods, mys):
        box(o, mx, y, mw, mh, [m], fill='white')
    # Kunde oben links der Plattform
    kx, ky = 600, 90
    actor(o, kx, ky, [])
    label(o, kx - 22, ky - 8, ['Kunde'], anchor='end')
    o[-1] = o[-1].replace("font-size='10'", "font-size='12'")
    label(o, kx - 22, ky + 6, ['(Endkunde der Werkstatt)'], anchor='end')
    line(o, kx, ky + 18, kx, mys[0])
    label(o, kx + 10, ky + 70, ['Sofortdiagnose, Voranmeldung,', 'KVA-Freigabe, Status, Zahlung'], anchor='start')
    # Mitarbeiter -> Module (gerade Linien, Sammelpunkt am Modul)
    ym = mys[1] + mh / 2
    line(o, 146, ys[0], mx, ym)
    label(o, 350, ys[0] - 6, ['Filialen, Mitarbeiter, Termine'], anchor='start')
    line(o, 146, ys[1], mx, ym)
    line(o, 146, ys[2], mx, ym)
    line(o, 146, ys[3], mx, mys[2] + mh / 2)
    label(o, 350, mys[2] + mh / 2 + 20, ['Bestände, Reservierung,', 'Bestellung'], anchor='start')
    # extern rechts
    rx, rw = 980, 240
    box(o, rx, mys[0] - 4, rw, 52, ['KI-Diagnosedienst', '(externer Dienst)'], fill='#FFF4E5')
    line(o, mx + mw, mys[0] + mh / 2, rx, mys[0] + 22)
    label(o, (mx + mw + rx) / 2, mys[0] + 12, ['Foto / Video / Ton'])
    actor(o, rx + 60, mys[2] + 10, ['Lieferant'])
    line(o, mx + mw, mys[2] + mh / 2, rx + 44, mys[2] + 10)
    label(o, (mx + mw + rx) / 2, mys[2] - 14, ['Bestellung, Auftragsbestätigung,', 'Lieferung, Retoure'])
    box(o, rx, mys[3] - 4, rw, 52, ['Buchhaltung / DATEV', '(außerhalb der Systemgrenze)'], fill='#F5F5F5', dashed=True)
    line(o, mx + mw, mys[3] + mh / 2, rx, mys[3] + 22, dashed=True)
    label(o, (mx + mw + rx) / 2, mys[3] + 12, ['Export (Schnittstelle)'])
    o.append('</svg>')
    svg = '\n'.join(o)
    open(os.path.join(HERE, 'systemkontext.svg'), 'w', encoding='utf-8').write(svg)
    cairosvg.svg2png(bytestring=svg.encode('utf-8'), write_to=os.path.join(HERE, 'systemkontext.png'), scale=2)
    print('ok')

if __name__ == '__main__':
    main()
