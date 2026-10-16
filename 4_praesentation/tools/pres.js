// Abschlusspräsentation RepairFlow (Pitch und Zusammenfassung, ohne Diagrammbilder) – pptxgenjs
// Aufruf: cd 4_praesentation/tools && python3 sprechtext.py && node pres.js
// Erzeugt ../Abschlusspraesentation.pptx. Sprechtexte kommen aus sprechtext.json in die Notizen.
const fs = require('fs');
const path = require('path');
const pptxgen = require('pptxgenjs');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const sharp = require('sharp');
const Fa = require('react-icons/fa');

const HERE = __dirname;
const TEXT = JSON.parse(fs.readFileSync(path.join(HERE, 'sprechtext.json'), 'utf8'));
const STATS = JSON.parse(fs.readFileSync(path.join(HERE, 'process_stats.json'), 'utf8'));
const TOTAL_ACT = STATS.reduce((a, s) => a + s.activities, 0);
const TOTAL_AUTO = STATS.reduce((a, s) => a + s.auto, 0);

const C = { teal: '0E5E5E', teal2: '147A7A', amber: 'F2A900', dark: '1B2430', grey: '5F6B7A', light: 'EEF4F4', white: 'FFFFFF', line: 'D5DEDE', warm: 'FFF4D6' };
const FONT = 'Calibri';

async function icon(name, color, size = 256) {
  const Comp = Fa[name];
  if (!Comp) throw new Error('icon fehlt: ' + name);
  const svg = ReactDOMServer.renderToStaticMarkup(React.createElement(Comp, { color: '#' + color, size }));
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  return 'image/png;base64,' + buf.toString('base64');
}

(async () => {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9';
  pres.author = 'Gruppe 1 WWI25B4';
  pres.title = 'RepairFlow – Abschlusspräsentation Fallstudie Systemanalyse';

  const names = ['FaTools', 'FaMobileAlt', 'FaWarehouse', 'FaRobot', 'FaProjectDiagram', 'FaUsers', 'FaGitAlt', 'FaClipboardCheck', 'FaBell', 'FaEuroSign',
    'FaExchangeAlt', 'FaLightbulb', 'FaSitemap', 'FaBolt', 'FaCamera', 'FaCalendarCheck', 'FaQuestionCircle', 'FaFlagCheckered', 'FaBalanceScale',
    'FaSearch', 'FaWrench', 'FaCheckCircle', 'FaBoxOpen', 'FaUndo', 'FaStore', 'FaCubes', 'FaDatabase', 'FaHandshake', 'FaShieldAlt', 'FaUserTie',
    'FaTruck', 'FaClipboardList', 'FaCogs', 'FaFileInvoiceDollar', 'FaRocket', 'FaComments', 'FaLayerGroup', 'FaMoneyBillWave', 'FaChartLine', 'FaTasks',
    'FaCodeBranch', 'FaRedo', 'FaStopwatch', 'FaCloud', 'FaUserCheck'];
  const icons = {};
  for (const n of names) icons[n] = await icon(n, C.white);

  let slideNo = 0;
  function notesFor(no) {
    const t = TEXT.find((x) => x.folie === no);
    return t ? 'Vortragende(r): ' + t.wer + ' (' + t.sek + ' s)\n\n' + t.text : null;
  }
  function base(title, opts = {}) {
    const s = pres.addSlide();
    slideNo += 1;
    s.background = { color: opts.dark ? C.teal : C.white };
    if (title) {
      s.addText(title, { x: 0.5, y: 0.3, w: 9.0, h: 0.7, fontFace: FONT, fontSize: 28, bold: true, color: opts.dark ? C.white : C.teal, isTextBox: true, margin: 0 });
    }
    s.addText('RepairFlow · Fallstudie Systemanalyse · WWI25B4 Gruppe 1', { x: 0.5, y: 5.2, w: 6, h: 0.3, fontFace: FONT, fontSize: 9, color: opts.dark ? 'CFE3E3' : C.grey, isTextBox: true, margin: 0 });
    s.addText(String(slideNo), { x: 9.0, y: 5.2, w: 0.5, h: 0.3, fontFace: FONT, fontSize: 9, color: opts.dark ? 'CFE3E3' : C.grey, align: 'right', isTextBox: true, margin: 0 });
    const n = opts.notes !== undefined ? opts.notes : notesFor(slideNo);
    if (n) s.addNotes(n);
    return s;
  }
  function iconCircle(s, name, x, y, d = 0.55, fill = C.teal) {
    s.addShape(pres.ShapeType.ellipse, { x, y, w: d, h: d, fill: { color: fill }, line: { color: fill } });
    s.addImage({ data: icons[name], x: x + d * 0.25, y: y + d * 0.25, w: d * 0.5, h: d * 0.5 });
  }
  function card(s, x, y, w, h, iconName, head, text, fill = C.light, iconFill = C.teal, size = 11.5, headSize = 14) {
    s.addShape(pres.ShapeType.roundRect, { x, y, w, h, fill: { color: fill }, line: { color: fill }, rectRadius: 0.08 });
    iconCircle(s, iconName, x + 0.2, y + 0.2, 0.5, iconFill);
    s.addText(head, { x: x + 0.85, y: y + 0.18, w: w - 1.0, h: 0.5, fontFace: FONT, fontSize: headSize, bold: true, color: C.dark, isTextBox: true, margin: 0, valign: 'middle' });
    s.addText(text, { x: x + 0.2, y: y + 0.8, w: w - 0.4, h: h - 0.95, fontFace: FONT, fontSize: size, color: C.dark, isTextBox: true, margin: 0, valign: 'top' });
  }
  function bulletsBox(s, items, x, y, w, h, size = 14, color = C.dark) {
    s.addText(items.map((t, i) => ({ text: t, options: { bullet: true, breakLine: i < items.length - 1, paraSpaceAfter: 6 } })),
      { x, y, w, h, fontFace: FONT, fontSize: size, color, isTextBox: true, valign: 'top', margin: 0 });
  }
  function stat(s, x, y, value, label, w = 2.0, valueColor = C.amber, labelColor = C.dark) {
    s.addText(value, { x, y, w, h: 0.8, fontFace: FONT, fontSize: 40, bold: true, color: valueColor, isTextBox: true, margin: 0, align: 'center' });
    s.addText(label, { x, y: y + 0.8, w, h: 0.55, fontFace: FONT, fontSize: 11, color: labelColor, isTextBox: true, margin: 0, align: 'center' });
  }
  function lead(s, text, y = 1.05, h = 0.6) {
    s.addText(text, { x: 0.5, y, w: 9, h, fontFace: FONT, fontSize: 13, color: C.dark, isTextBox: true, margin: 0 });
  }

  // 1 Titel
  {
    const s = base(null, { dark: true });
    s.addShape(pres.ShapeType.ellipse, { x: 7.2, y: -1.2, w: 4.5, h: 4.5, fill: { color: C.teal2 }, line: { color: C.teal2 } });
    s.addText('RepairFlow', { x: 0.6, y: 1.3, w: 8, h: 1.1, fontFace: FONT, fontSize: 54, bold: true, color: C.white, isTextBox: true, margin: 0 });
    s.addText('Werkstatt-Management als SaaS-Plattform mit KI-Sofortdiagnose', { x: 0.6, y: 2.4, w: 7.5, h: 0.6, fontFace: FONT, fontSize: 20, color: 'CFE3E3', isTextBox: true, margin: 0 });
    s.addText('Fallstudie Systemanalyse · Methoden der WI · DHBW Karlsruhe', { x: 0.6, y: 3.3, w: 8, h: 0.4, fontFace: FONT, fontSize: 14, color: C.white, isTextBox: true, margin: 0 });
    s.addText('Kurs WWI25B4 · Gruppe 1: Maximilian Ewald, David Leismann, Kilian Platter, Nina Sattler, Jakob Schwan, Adrian Wenzler', { x: 0.6, y: 3.75, w: 8.6, h: 0.6, fontFace: FONT, fontSize: 12, color: 'CFE3E3', isTextBox: true, margin: 0 });
    s.addText('Abschlusspräsentation · 27.10.2026, 09:00 Uhr · Raum B458', { x: 0.6, y: 4.35, w: 8.6, h: 0.4, fontFace: FONT, fontSize: 12, color: C.amber, isTextBox: true, margin: 0 });
    iconCircle(s, 'FaTools', 8.0, 1.2, 1.0, C.amber);
  }
  // 2 Agenda
  {
    const s = base('Agenda');
    const items = [['1', 'Das Problem: Werkstätten heute', 'David'], ['2', 'RepairFlow: Lösung, Nutzen, Auftragsreise, KI-Sofortdiagnose', 'Adrian'],
      ['3', 'Ergebnisse: zehn Geschäftsprozesse', 'Maximilian'], ['4', 'Ergebnisse: Rollen, Use Cases und Datenmodell', 'David, Kilian'],
      ['5', 'Vorgehen und Projektmanagement', 'Kilian'], ['6', 'Qualität, Herausforderungen und Lernerfahrungen', 'Jakob'], ['7', 'Geschäftsmodell, Ausblick und Fazit', 'Nina']];
    s.addText('Teil 1: der Pitch', { x: 0.6, y: 1.0, w: 4, h: 0.3, fontFace: FONT, fontSize: 11, bold: true, color: C.amber, isTextBox: true, margin: 0 });
    items.forEach((it, i) => {
      const y = 1.35 + i * 0.47 + (i >= 2 ? 0.3 : 0);
      if (i === 2) s.addText('Teil 2: was dahintersteckt', { x: 0.6, y: y - 0.32, w: 4, h: 0.3, fontFace: FONT, fontSize: 11, bold: true, color: C.amber, isTextBox: true, margin: 0 });
      s.addShape(pres.ShapeType.ellipse, { x: 0.6, y, w: 0.42, h: 0.42, fill: { color: C.teal }, line: { color: C.teal } });
      s.addText(it[0], { x: 0.6, y, w: 0.42, h: 0.42, fontFace: FONT, fontSize: 14, bold: true, color: C.white, align: 'center', valign: 'middle', isTextBox: true, margin: 0 });
      s.addText(it[1], { x: 1.2, y, w: 5.6, h: 0.42, fontFace: FONT, fontSize: 15, color: C.dark, valign: 'middle', isTextBox: true, margin: 0 });
      s.addText(it[2], { x: 6.9, y, w: 2.5, h: 0.42, fontFace: FONT, fontSize: 12, color: C.grey, valign: 'middle', isTextBox: true, margin: 0 });
    });
    s.addText('15 bis 20 Minuten · alle Gruppenmitglieder tragen vor · Diagramme in Dokumentation und Abgabepaket', { x: 0.6, y: 4.8, w: 8.5, h: 0.3, fontFace: FONT, fontSize: 11, italic: true, color: C.grey, isTextBox: true, margin: 0 });
  }
  // 3 Problem
  {
    const s = base('Das Problem: Werkstätten heute');
    lead(s, 'Unser Szenario: Die Werkstattkette FixWerk GmbH (vier Filialen, Fahrrad, E-Bike und Elektronik) arbeitet mit Papier, Excel-Listen und Telefon. Daraus folgen vier Probleme:', 1.05, 0.7);
    card(s, 0.5, 1.9, 4.35, 1.45, 'FaBell', 'Kunden hören nichts', 'Keine zuverlässige Info, wann ein Kostenvoranschlag freizugeben oder das Gerät abholbereit ist. Rückfragen per Telefon, Geräte stehen wochenlang im Lager.');
    card(s, 5.15, 1.9, 4.35, 1.45, 'FaQuestionCircle', 'Kein Auftragsstatus', 'Wer wissen will, wo ein Gerät steht, fragt in der Werkstatt nach. Papierzettel und Excel-Listen laufen auseinander.');
    card(s, 0.5, 3.5, 4.35, 1.45, 'FaWarehouse', 'Teile doppelt bestellt', 'Jede Filiale bestellt für sich, obwohl das Teil in der Nachbarfiliale liegt. Das kostet Lieferzeit und Geld.');
    card(s, 5.15, 3.5, 4.35, 1.45, 'FaCalendarCheck', 'Auslastung unsichtbar', 'Termine werden nach Gefühl zugesagt, die Kapazität der Techniker kennt niemand genau.');
  }
  // 4 Lösung
  {
    const s = base('RepairFlow: die Lösung');
    s.addShape(pres.ShapeType.roundRect, { x: 0.5, y: 1.05, w: 9, h: 0.85, fill: { color: C.teal }, line: { color: C.teal }, rectRadius: 0.08 });
    s.addText('Eine Cloud-Plattform für den gesamten Reparatur-Lebenszyklus: von der Anfrage per App bis zur Abholung und Reklamation. Wir sind das Software-Startup, FixWerk ist unser Pilotkunde.',
      { x: 0.7, y: 1.05, w: 8.6, h: 0.85, fontFace: FONT, fontSize: 14, bold: true, color: C.white, isTextBox: true, margin: 0, valign: 'middle' });
    const mods = [['FaMobileAlt', 'Kundenportal', 'App mit Sofortdiagnose, Voranmeldung, KVA-Freigabe und Statusmeldungen'], ['FaWrench', 'Auftrag und Werkstatt', 'Auftragsstatus, Diagnose, Kostenvoranschlag, Reparaturschritte, Endkontrolle'],
      ['FaWarehouse', 'Disposition', 'Bestände aller Filialen, Reservierung, Umlagerung, Bestellung, Retoure'], ['FaFileInvoiceDollar', 'Abrechnung', 'Rechnung, Zahlung, Übergabe an die Buchhaltung']];
    mods.forEach((m, i) => card(s, 0.5 + i * 2.3, 2.1, 2.15, 1.95, m[0], m[1], m[2], C.light, C.teal, 10.5));
    bulletsBox(s, ['Zielkunden: unabhängige Werkstätten und kleine Ketten mit 2 bis 10 Filialen im DACH-Raum',
      'Außerhalb der Plattform: physische Reparatur, Lieferantensysteme, Buchhaltung (nur Schnittstellen)'], 0.5, 4.25, 9, 0.8, 12);
  }
  // 5 Nutzen
  {
    const s = base('Drei Nutzenversprechen');
    lead(s, 'Was die Werkstatt davon hat:', 1.05, 0.4);
    card(s, 0.5, 1.55, 2.9, 2.6, 'FaTools', 'Eine Plattform', 'Fahrrad, E-Bike und Elektronik mit einer Kundenbasis und einem gemeinsamen Ersatzteillager. Ein Auftragsstatus für alle.');
    card(s, 3.55, 1.55, 2.9, 2.6, 'FaExchangeAlt', 'Filialübergreifend', 'Bestände, Reservierungen und Umlagerungen über alle Standorte. Bestellt wird nur, was nirgends liegt.');
    card(s, 6.6, 1.55, 2.9, 2.6, 'FaRobot', 'Klarheit vor dem Besuch', 'Foto aus der App, Diagnosevorschlag, vorläufiger Kostenvoranschlag und Termin, bevor der Kunde die Werkstatt betritt.', C.warm, C.amber);
    s.addShape(pres.ShapeType.roundRect, { x: 0.5, y: 4.35, w: 9, h: 0.65, fill: { color: C.light }, line: { color: C.light }, rectRadius: 0.08 });
    s.addText('Für die Werkstatt: weniger Telefon, weniger Standzeit im Lager, sichtbare Auslastung. Für den Kunden: Antwort in einer Minute statt in einer Woche.',
      { x: 0.7, y: 4.35, w: 8.6, h: 0.65, fontFace: FONT, fontSize: 12, color: C.dark, isTextBox: true, margin: 0, valign: 'middle' });
  }
  // 6 Auftragsreise
  {
    const s = base('Die Auftragsreise mit RepairFlow');
    const steps = [['FaCamera', 'Anfrage per App', 'KI-Vorschlag, Vorab-KVA, Termin', 'P01'], ['FaStore', 'Annahme', 'Gerät registriert, Auftrag angelegt', 'P02'],
      ['FaSearch', 'Diagnose und KVA', 'Techniker prüft, Kunde gibt frei', 'P03, P04'], ['FaWarehouse', 'Teile disponieren', 'alle Filialen, Fehlteile bestellen', 'P05, P06'],
      ['FaWrench', 'Reparatur', 'Schritte, Arbeitszeit, Endkontrolle', 'P07'], ['FaCheckCircle', 'Abholung', 'Benachrichtigung, Rechnung, Zahlung', 'P08']];
    steps.forEach((st, i) => {
      const x = 0.5 + i * 1.52;
      s.addShape(pres.ShapeType.chevron, { x, y: 1.1, w: 1.55, h: 0.55, fill: { color: i % 2 ? C.teal2 : C.teal }, line: { color: C.white } });
      s.addText(st[3], { x: x + 0.2, y: 1.1, w: 1.15, h: 0.55, fontFace: FONT, fontSize: 10, bold: true, color: C.white, align: 'center', valign: 'middle', isTextBox: true, margin: 0 });
      s.addShape(pres.ShapeType.roundRect, { x, y: 1.8, w: 1.42, h: 2.0, fill: { color: i === 0 ? C.warm : C.light }, line: { color: i === 0 ? C.warm : C.light }, rectRadius: 0.08 });
      iconCircle(s, st[0], x + 0.43, 1.92, 0.55, i === 0 ? C.amber : C.teal);
      s.addText(st[1], { x: x + 0.05, y: 2.55, w: 1.32, h: 0.4, fontFace: FONT, fontSize: 11, bold: true, color: C.dark, align: 'center', isTextBox: true, margin: 0 });
      s.addText(st[2], { x: x + 0.08, y: 2.95, w: 1.26, h: 0.8, fontFace: FONT, fontSize: 9.5, color: C.dark, align: 'center', isTextBox: true, margin: 0 });
    });
    s.addText('Status des Reparaturauftrags:', { x: 0.5, y: 3.95, w: 3, h: 0.3, fontFace: FONT, fontSize: 11, bold: true, color: C.teal, isTextBox: true, margin: 0 });
    const states = ['angenommen', 'in Diagnose', 'KVA offen', 'freigegeben', 'Teile bestellt', 'in Reparatur', 'fertig', 'abgeholt'];
    states.forEach((st, i) => {
      const x = 0.5 + i * 1.13;
      s.addShape(pres.ShapeType.roundRect, { x, y: 4.28, w: 1.05, h: 0.36, fill: { color: C.white }, line: { color: C.teal, width: 1 }, rectRadius: 0.18 });
      s.addText(st, { x, y: 4.28, w: 1.05, h: 0.36, fontFace: FONT, fontSize: 9, color: C.teal, align: 'center', valign: 'middle', isTextBox: true, margin: 0 });
    });
    s.addText('Reklamation (P09) und Retoure (P10) sind Folgeprozesse; im Gewährleistungsfall startet ein kostenfreier Nacharbeitsauftrag.', { x: 0.5, y: 4.75, w: 9, h: 0.3, fontFace: FONT, fontSize: 10, italic: true, color: C.grey, isTextBox: true, margin: 0 });
  }
  // 7 KI
  {
    const s = base('KI-Sofortdiagnose: KVA in 60 Sekunden');
    const steps = [['FaCamera', 'Aufnehmen', 'Kunde lädt Foto, Video oder Ton in der App hoch'], ['FaRobot', 'Erkennen', 'KI-Dienst nennt Gerätetyp, Ursache und Ersatzteile'], ['FaEuroSign', 'Kalkulieren', 'RepairFlow berechnet einen vorläufigen KVA'], ['FaWarehouse', 'Reservieren', 'Verfügbarkeit in allen Filialen, Teile vorreserviert'], ['FaCalendarCheck', 'Termin', 'Filiale und Termin vorgeschlagen, Kunde bestätigt']];
    steps.forEach((st, i) => {
      const x = 0.5 + i * 1.84;
      s.addShape(pres.ShapeType.roundRect, { x, y: 1.15, w: 1.7, h: 2.1, fill: { color: i === 1 ? C.warm : C.light }, line: { color: i === 1 ? C.warm : C.light }, rectRadius: 0.08 });
      iconCircle(s, st[0], x + 0.55, 1.3, 0.6, i === 1 ? C.amber : C.teal);
      s.addText(st[1], { x, y: 2.0, w: 1.7, h: 0.35, fontFace: FONT, fontSize: 13, bold: true, color: C.dark, align: 'center', isTextBox: true, margin: 0 });
      s.addText(st[2], { x: x + 0.1, y: 2.35, w: 1.5, h: 0.85, fontFace: FONT, fontSize: 10, color: C.dark, align: 'center', isTextBox: true, margin: 0 });
    });
    s.addText('Heute machbar', { x: 0.5, y: 3.5, w: 4.3, h: 0.3, fontFace: FONT, fontSize: 13, bold: true, color: C.teal, isTextBox: true, margin: 0 });
    bulletsBox(s, ['Sichtbare Schäden per Bildanalyse: gebrochenes Display, gerissene Kette', 'Vorab-KVA aus Teilepreisen und Aufwandsrichtwerten', 'Verfügbarkeitsprüfung und Vorreservierung'], 0.5, 3.85, 4.3, 1.3, 11);
    s.addText('Vision und Absicherung', { x: 5.2, y: 3.5, w: 4.3, h: 0.3, fontFace: FONT, fontSize: 13, bold: true, color: C.amber, isTextBox: true, margin: 0 });
    bulletsBox(s, ['Geräuschanalyse von E-Bike-Motoren, Aufwand aus Video', 'Vorschlag bleibt vorläufig, der Techniker bestätigt oder korrigiert', 'Medien nur mit Einwilligung, Löschung nach Abschluss'], 5.2, 3.85, 4.3, 1.3, 11);
  }
  // 8 Ergebnisse in Zahlen
  {
    const s = base('Was wir gebaut haben: Ergebnisse in Zahlen');
    stat(s, 0.5, 1.2, '10', 'BPMN-Kollaborationsdiagramme\n' + TOTAL_ACT + ' Aktivitäten im Werkstatt-Pool', 2.2);
    stat(s, 2.9, 1.2, '19', 'Use Cases\n18 Rollen und Akteure', 2.2);
    stat(s, 5.3, 1.2, '27', 'Klassen\n36 Assoziationen, 7 Aufzählungen', 2.2);
    stat(s, 7.7, 1.2, '6', 'Sequenzdiagramme\n+ Zustandsdiagramm', 2.2);
    card(s, 0.5, 2.95, 2.9, 2.05, 'FaProjectDiagram', 'Geschäftsprozesse', 'Camunda Modeler, BPMN 2.0, angereichert für Camunda 8. Zehn Prozesse vom ersten Foto bis zur Retoure. 41 Nachrichtenflüsse, 48 Datenobjekte, 12 Datenspeicher.', C.light, C.teal, 10.5);
    card(s, 3.55, 2.95, 2.9, 2.05, 'FaSitemap', 'Objektorientierte Analyse', 'Visual Paradigm: Use-Case-Diagramm, ein vollständiges Klassendiagramm, sechs Sequenzdiagramme als Unterdiagramme der Use Cases, Zustandsdiagramm des Reparaturauftrags.', C.light, C.teal, 10.5);
    card(s, 6.6, 2.95, 2.9, 2.05, 'FaClipboardList', 'Dokumentation', 'Rund 20 Seiten: Projekt, Vorgehen, Projektmanagement, alle Artefakte, Konsistenz der Modelle, Herausforderungen und Feedback.', C.light, C.teal, 10.5);
  }
  // 9 Prozesse
  {
    const s = base('Zehn Prozesse, ' + Math.round(100 * TOTAL_AUTO / TOTAL_ACT) + ' Prozent automatisiert');
    const hdr = (t) => ({ text: t, options: { bold: true, color: C.white, fill: { color: C.teal } } });
    const rows = [[hdr('Nr'), hdr('Prozess'), hdr('Akt.'), hdr('autom.')]];
    for (const st of STATS) rows.push([st.num, st.name, String(st.activities), Math.round(100 * st.auto / st.activities) + ' %']);
    s.addTable(rows, { x: 0.5, y: 1.05, w: 5.6, colW: [0.45, 3.9, 0.55, 0.7], fontFace: FONT, fontSize: 9.5, color: C.dark, border: { type: 'solid', color: C.line, pt: 0.5 }, rowH: 0.3, valign: 'middle' });
    stat(s, 6.5, 1.15, String(TOTAL_ACT), 'Aktivitäten im Werkstatt-Pool, im Schnitt ' + (TOTAL_ACT / 10).toFixed(1).replace('.', ',') + ' je Diagramm', 3.0);
    stat(s, 6.5, 2.65, Math.round(100 * TOTAL_AUTO / TOTAL_ACT) + ' %', 'davon führt RepairFlow ohne manuelle Arbeit aus: Status, Benachrichtigung, Prüfung, Berechnung, Regel', 3.0);
    s.addText('Handwerk bleibt Handwerk: Diagnose, Reparatur und Endkontrolle sind Aktivitäten des Technikers mit Unterstützung durch das System.', { x: 6.5, y: 4.2, w: 3.0, h: 0.8, fontFace: FONT, fontSize: 10, italic: true, color: C.grey, isTextBox: true, margin: 0 });
    s.addText('01 bis 08: durchgehende Auftragsreise · 09 und 10: Reklamation und Retoure · Pool Werkstattbetrieb mit Lanes Service, Techniker, Werkstattleitung, Disposition; Kunde mit eigenem Ablauf, Lieferant als Black Box', { x: 0.5, y: 4.45, w: 5.6, h: 0.6, fontFace: FONT, fontSize: 9.5, italic: true, color: C.grey, isTextBox: true, margin: 0 });
  }
  // 10 Highlights
  {
    const s = base('Drei Prozess-Highlights');
    card(s, 0.5, 1.1, 2.9, 3.9, 'FaStopwatch', 'KVA-Freigabe (P04)', 'Nach dem Versand wartet ein ereignisbasiertes Gateway auf Freigabe, Ablehnung oder drei Tage Frist.\n\nBei Fristablauf erinnert RepairFlow, höchstens zweimal. Nach dem dritten Fristablauf ohne Antwort gilt der KVA als abgelehnt, das Gerät geht mit Diagnosepauschale zur Abholung.\n\nKein Auftrag bleibt liegen.');
    card(s, 3.55, 1.1, 2.9, 3.9, 'FaExchangeAlt', 'Disposition (P05)', 'Je Teil läuft parallel eine Prüfung: erst das eigene Lager, dann die anderen Filialen.\n\nLokal vorhanden: reservieren. Anderswo vorhanden: umlagern. Nirgends: als Fehlteil markieren und erst dann bestellen (P06).\n\nMeldebestand unterschritten: Nachbestellvorschlag.');
    card(s, 6.6, 1.1, 2.9, 3.9, 'FaRedo', 'Reklamation (P09)', 'Techniker prüft den Mangel, eine Geschäftsregel entscheidet über Gewährleistung.\n\nGewährleistung: kostenfreier Nacharbeitsauftrag, der durch die normale Auftragsreise läuft. Sonst: kostenpflichtiges Angebot.\n\nDas Modell bleibt schlank, weil die Reklamation keine eigene Reparaturlogik braucht.');
  }
  // 11 Rollen & Use Cases
  {
    const s = base('Wer macht was im System: Rollen und Use Cases');
    lead(s, '19 Use Cases in vier Bereichen. Jeder Use Case hat genau eine Rolle (Hinweis aus dem Coaching): lesbar, und die Rollen kehren in den Sequenzdiagrammen wieder.', 1.05, 0.6);
    card(s, 0.5, 1.75, 2.15, 3.25, 'FaMobileAlt', 'Kundenportal', '3 Use Cases\n\nKunde: Sofortdiagnose anfordern, Voranmeldung bestätigen, KVA freigeben / ablehnen\n\nextern: KI-Diagnosedienst', C.warm, C.amber, 10, 12);
    card(s, 2.8, 1.75, 2.15, 3.25, 'FaWrench', 'Auftrag und Werkstatt', '9 Use Cases\n\nServiceannahme, Diagnoseprüfer, Diagnostiker, Kalkulator, Werkstattplaner, Reparateur, Endkontrolleur, Geräteausgabe, Reklamationsbearbeiter', C.light, C.teal, 10, 12);
    card(s, 5.1, 1.75, 2.15, 3.25, 'FaWarehouse', 'Ersatzteil-Disposition', '6 Use Cases\n\nTeiledisponent, Bestandsplaner, Einkäufer, Wareneingang, Retourenbearbeiter\n\nextern: Lieferant', C.light, C.teal, 10, 12);
    card(s, 7.4, 1.75, 2.1, 3.25, 'FaUserTie', 'Administration', '1 Use Case\n\nBetriebsadministrator: Werkstattbetrieb und Filialen verwalten (Mandant)\n\nRolle → Mitarbeitertyp → Lane: Tabelle 7 der Doku', C.light, C.teal, 10, 12);
  }
  // 12 Datenmodell
  {
    const s = base('Das Datenmodell: fünf Entwurfsentscheidungen');
    const items = [['FaDatabase', 'Reparaturauftrag als Aggregatwurzel', 'Befund und Reparaturschritte sind Kompositionen; KVA und Gerät nur zugeordnet, weil der Vorab-KVA vor dem Auftrag entsteht.'],
      ['FaCubes', 'Lagerbestand je Filiale', 'Eigene Klasse zwischen Ersatzteil und Filiale. Nur so lässt sich die Verfügbarkeit über alle Filialen prüfen.'],
      ['FaBoxOpen', 'Reservierung mit Lebenszyklus', 'vorreserviert, reserviert, entnommen, storniert: eine Beziehung mit eigenen Daten wird zur Klasse.'],
      ['FaUsers', 'Mandant und Mitarbeitertypen', 'Werkstattbetrieb als Mandant; Servicemitarbeiter, Techniker, Disponent, Werkstattleiter als Unterklassen von Mitarbeiter, passend zu Lanes und Rollen.'],
      ['FaRobot', 'Drei Klassen für die Sofortdiagnose', 'Voranmeldung, Medienanhang und KIDiagnosevorschlag tragen das Alleinstellungsmerkmal im Modell.']];
    items.forEach((it, i) => {
      const col = i % 2, row = Math.floor(i / 2);
      const x = 0.5 + col * 4.65, y = 1.1 + row * 1.33;
      card(s, x, y, 4.4, 1.22, it[0], it[1], it[2], C.light, C.teal, 10);
    });
    s.addShape(pres.ShapeType.roundRect, { x: 5.15, y: 3.76, w: 4.35, h: 1.22, fill: { color: C.teal }, line: { color: C.teal }, rectRadius: 0.08 });
    s.addText([{ text: '27 Klassen · 36 Assoziationen · 7 Aufzählungen', options: { bold: true, breakLine: true } },
      { text: 'Botschaft = Operation: Die sechs Sequenzdiagramme verwenden ausschließlich Operationen dieser Klassen. Der Reparaturauftrag führt den Status als Attribut, das Zustandsdiagramm beschreibt seine Übergänge.', options: {} }],
      { x: 5.35, y: 3.8, w: 4.0, h: 1.15, fontFace: FONT, fontSize: 10.5, color: C.white, isTextBox: true, margin: 0, valign: 'middle' });
  }
  // 13 Vorgehen & PM
  {
    const s = base('Vorgehen und Projektmanagement');
    const phases = ['Themenwahl', 'Konzept + Feedback', 'Prozessanalyse', 'BPMN', 'OOA (UML)', 'Doku + Präsentation'];
    phases.forEach((p, i) => {
      const x = 0.5 + i * 1.5;
      s.addShape(pres.ShapeType.chevron, { x, y: 1.1, w: 1.5, h: 0.6, fill: { color: i % 2 ? C.teal2 : C.teal }, line: { color: C.white } });
      s.addText(p, { x: x + 0.12, y: 1.1, w: 1.3, h: 0.6, fontFace: FONT, fontSize: 9, bold: true, color: C.white, align: 'center', valign: 'middle', isTextBox: true, margin: 0 });
    });
    card(s, 0.5, 1.95, 2.9, 3.1, 'FaUsers', 'Rollen', 'Projektleitung Nina (Stellvertretung und Backups David), Product Owner Adrian, Scrum Master Kilian, UML Kilian und David, BPMN Maximilian, Qualität Jakob.');
    card(s, 3.55, 1.95, 2.9, 3.1, 'FaGitAlt', 'Zusammenarbeit', 'Scrum im Takt der vier Gruppentermine, Trello-Board mit einer Liste je Termin und einer Karte je Person und Aufgabe, Prüfung jedes Diagramms im Zweierteam, GitHub mit Branches, Pull Requests und Review.');
    card(s, 6.6, 1.95, 2.9, 3.1, 'FaFlagCheckered', 'Meilensteine', '02.09. alle Diagramme im Entwurf, 05.10. Korrekturen aus zwei Gesamtprüfungen, 15.10. Rollenstruktur und Zuständigkeiten, 22.10. Generalprobe, 27.10. Präsentation, 13.11. Abgabe.');
  }
  // 14 Qualität
  {
    const s = base('Qualität: Konventionen, Linter, Konsistenz');
    card(s, 0.5, 1.1, 2.9, 2.5, 'FaClipboardList', 'Konventionen', 'Datenobjekte tragen Klassennamen. Aktivität = Verb + Objekt, Ereignis im Partizip Perfekt. Jede Rolle gehört zu genau einer Lane und einer Klasse. Statuswerte in allen Modellen identisch.', C.light, C.teal, 10.5);
    card(s, 3.55, 1.1, 2.9, 2.5, 'FaShieldAlt', 'Werkzeuge', 'BPMN-Dateien angereichert für Camunda 8: Task-Definitionen, Subscriptions, Timer, FEEL-Bedingungen. Camunda-Linter und bpmnlint: 0 Befunde.', C.light, C.teal, 10.5);
    card(s, 6.6, 1.1, 2.9, 2.5, 'FaTasks', 'Prüfrunden', 'Gesamtprüfung 26.09., Komplettcheck 05.10. (39 Befunde), QA-Abgleich 08.10. Jeder Pull Request wird gegen die QA-Checkliste geprüft, bevor er gemergt wird.', C.light, C.teal, 10.5);
    s.addShape(pres.ShapeType.roundRect, { x: 0.5, y: 3.75, w: 9, h: 1.25, fill: { color: C.warm }, line: { color: C.warm }, rectRadius: 0.08 });
    iconCircle(s, 'FaLightbulb', 0.7, 3.95, 0.5, C.amber);
    s.addText([{ text: 'Beispiel: ', options: { bold: true } }, { text: 'Als die Nacharbeit in Prozess 07 auf zwei Durchläufe begrenzt wurde, musste Sequenzdiagramm SD4 nachziehen (loop 0..2, danach Status abgelehnt). Genau solche Stellen findet die Checkliste: Botschaft = Operation, Lebenslinie = Rolle oder Klasse, Zustand = AuftragStatus.', options: {} }],
      { x: 1.35, y: 3.8, w: 8.0, h: 1.15, fontFace: FONT, fontSize: 11, color: C.dark, isTextBox: true, margin: 0, valign: 'middle' });
  }
  // 15 Herausforderungen
  {
    const s = base('Herausforderungen und Lernerfahrungen');
    card(s, 0.5, 1.1, 4.35, 1.9, 'FaBalanceScale', 'Perspektive klären', 'Werkstatt oder Softwareanbieter? Die Rückfrage des Dozenten hat uns zur klaren Entscheidung gezwungen: Solution Provider, FixWerk als Pilotkunde. Prozesse blieben, Texte und Klassenmodell zogen nach.');
    card(s, 5.15, 1.1, 4.35, 1.9, 'FaProjectDiagram', 'Drei Modelle, ein Vokabular', 'Datenobjekte, Klassen, Lebenslinien und Statuswerte müssen wortgleich sein. Gemeinsame Namensregeln und ein Abgleich nach jeder Änderung halten die Modelle zusammen.');
    card(s, 0.5, 3.15, 4.35, 1.9, 'FaClipboardCheck', 'Engine-ready statt Fehlerliste', 'Der Camunda Modeler meldet für Camunda 8 fehlende technische Details als Fehler. Wir haben die Diagramme angereichert, bis der Linter keine Befunde mehr meldete.');
    card(s, 5.15, 3.15, 4.35, 1.9, 'FaLightbulb', 'Hinweise von außen nutzen', 'Die KI-Vision glaubwürdig halten (heute machbar vs. Vision) und das Use-Case-Diagramm nach dem Coaching auf eine Rolle je Use Case umbauen: Beides hat die Arbeit deutlich besser gemacht.');
  }
  // 16 Geschäftsmodell & Ausblick
  {
    const s = base('Geschäftsmodell und Ausblick');
    card(s, 0.5, 1.1, 4.35, 1.75, 'FaMoneyBillWave', 'Abo je Filiale', 'Basis: Auftrags- und Kundenverwaltung mit Kundenportal. Pro: zusätzlich filialübergreifende Disposition und KI-Sofortdiagnose.');
    card(s, 5.15, 1.1, 4.35, 1.75, 'FaStore', 'Zielkunden', 'Unabhängige Werkstätten und kleine Ketten mit 2 bis 10 Filialen im DACH-Raum, für die ein großes Werkstattsystem zu schwer ist.');
    s.addText('Ausblick (Vision, nicht modelliert)', { x: 0.5, y: 3.0, w: 9, h: 0.3, fontFace: FONT, fontSize: 13, bold: true, color: C.amber, isTextBox: true, margin: 0 });
    card(s, 0.5, 3.35, 2.9, 1.65, 'FaChartLine', 'Predictive Disposition', 'Bedarfsprognose je Filiale und Saison, damit Teile vor der Nachfrage im Lager liegen.', C.warm, C.amber, 10.5);
    card(s, 3.55, 3.35, 2.9, 1.65, 'FaCogs', 'Techniker-Copilot', 'Reparaturschritte und Aufwand aus der Historie ähnlicher Aufträge vorschlagen.', C.warm, C.amber, 10.5);
    card(s, 6.6, 3.35, 2.9, 1.65, 'FaLayerGroup', 'Digitale Geräteakte', 'Jedes Gerät behält seine Reparaturgeschichte über alle Filialen und Besitzer.', C.warm, C.amber, 10.5);
  }
  // 17 Fazit & Danke
  {
    const s = base('Fazit', { dark: true });
    s.addText([{ text: 'RepairFlow löst den Medienbruch aus Papier, Excel und Telefon und macht den Reparaturauftrag zum zentralen Zustandsautomaten.', options: { breakLine: true } },
      { text: 'Der fachliche Mehrwert liegt in der filialübergreifenden Disposition und in der KI-Sofortdiagnose, die dem Kunden Klarheit gibt, bevor er die Werkstatt betritt.', options: {} }],
      { x: 0.6, y: 1.2, w: 8.6, h: 1.7, fontFace: FONT, fontSize: 16, color: C.white, isTextBox: true, margin: 0, paraSpaceAfter: 10, valign: 'top' });
    s.addText('Vielen Dank', { x: 0.6, y: 3.1, w: 8, h: 0.8, fontFace: FONT, fontSize: 40, bold: true, color: C.white, isTextBox: true, margin: 0 });
    s.addText('Fragen?', { x: 0.6, y: 3.9, w: 8, h: 0.5, fontFace: FONT, fontSize: 22, color: 'CFE3E3', isTextBox: true, margin: 0 });
    s.addText('Gruppe 1 · WWI25B4 · RepairFlow · Diagramme und Details in der Projektdokumentation', { x: 0.6, y: 4.5, w: 8, h: 0.4, fontFace: FONT, fontSize: 12, color: C.white, isTextBox: true, margin: 0 });
    iconCircle(s, 'FaTools', 8.0, 3.1, 1.0, C.amber);
  }
  // 18 Anhang
  {
    const s = base('Anhang: Beiträge der Vortragenden', { notes: 'Vortragende(r): -\n\nPflichtangabe für den PDF-Export laut Ablauf: welche/r Vortragende welchen Beitrag verantwortet.' });
    const hdr = (t) => ({ text: t, options: { bold: true, color: C.white, fill: { color: C.teal } } });
    const rows = [[hdr('Vortragende(r)'), hdr('Folien'), hdr('Verantworteter Beitrag')],
      ['Nina Sattler', '1–2, 16–17', 'Einleitung und Agenda, Geschäftsmodell und Ausblick, Fazit, Moderation der Fragerunde; Projektleitung, Redaktion der Dokumentation, Abgabe-Archiv'],
      ['David Leismann', '3, 6, 11', 'Das Problem, Auftragsreise, Rollen und Use Cases; Use-Case-Diagramm und Sequenzdiagramme SD2, SD3, SD5, SD6 in Visual Paradigm, stellvertretende Projektleitung'],
      ['Adrian Wenzler', '4–5, 7', 'Lösung, Nutzenversprechen, KI-Sofortdiagnose; Product Owner, Fachkonzept und Entscheidungslog'],
      ['Maximilian Ewald', '8–10', 'Ergebnisse in Zahlen, Prozesslandkarte, Prozess-Highlights; BPMN-Modellierung der zehn Prozesse im Camunda Modeler'],
      ['Kilian Platter', '12–13', 'Datenmodell, Vorgehen und Projektmanagement; Klassendiagramm, SD1, SD4 und VP-Projekt, Scrum Master'],
      ['Jakob Schwan', '14–15', 'Qualität, Herausforderungen; Qualitätssicherung, Reviews und Konsistenz der Modelle']];
    s.addTable(rows, { x: 0.5, y: 1.1, w: 9.0, colW: [1.7, 1.1, 6.2], fontFace: FONT, fontSize: 10.5, color: C.dark, border: { type: 'solid', color: C.line, pt: 0.5 }, rowH: 0.5, valign: 'middle' });
    s.addText('Zuordnung nach der Zuständigkeitsverteilung vom Gruppentermin 15.10.2026 (E-23): Jede Person trägt vor, was sie verantwortet.', { x: 0.5, y: 4.65, w: 9, h: 0.3, fontFace: FONT, fontSize: 10, italic: true, color: C.grey, isTextBox: true, margin: 0 });
  }

  const out = path.join(HERE, '..', 'Abschlusspraesentation.pptx');
  await pres.writeFile({ fileName: out });
  console.log('written', out, 'slides', slideNo);
})();
