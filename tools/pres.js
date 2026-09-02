// Abschlusspräsentation RepairFlow – pptxgenjs
const fs = require('fs');
const path = require('path');
const pptxgen = require('pptxgenjs');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const sharp = require('sharp');
const Fa = require('react-icons/fa');

const HERE = __dirname;
const STATS = JSON.parse(fs.readFileSync(path.join(HERE, 'process_stats.json'), 'utf8'));
const TOTAL_ACT = STATS.reduce((a, s) => a + s.activities, 0);
const TOTAL_AUTO = STATS.reduce((a, s) => a + s.auto, 0);

// palette: deep teal dominant, amber accent, charcoal text
const C = { teal: '0E5E5E', teal2: '147A7A', amber: 'F2A900', dark: '1B2430', grey: '5F6B7A', light: 'EEF4F4', white: 'FFFFFF', line: 'D5DEDE' };
const FONT = 'Calibri';

async function icon(name, color, size = 256) {
  const Comp = Fa[name];
  const svg = ReactDOMServer.renderToStaticMarkup(React.createElement(Comp, { color: '#' + color, size }));
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  return 'image/png;base64,' + buf.toString('base64');
}
function imgSize(file) {
  const dims = JSON.parse(fs.readFileSync(path.join(HERE, 'imgdims.json'), 'utf8'));
  return dims[path.resolve(HERE, file)];
}
function fit(file, maxW, maxH) {
  let [w, h] = imgSize(file) || [1000, 600];
  let W = maxW, H = h * maxW / w;
  if (H > maxH) { H = maxH; W = w * maxH / h; }
  return { w: W, h: H };
}

(async () => {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9';
  pres.author = 'Gruppe 1 WWI25B4';
  pres.title = 'RepairFlow – Abschlusspräsentation Fallstudie Systemanalyse';

  const icons = {};
  for (const [k, c] of [['FaTools', C.white], ['FaMobileAlt', C.white], ['FaWarehouse', C.white], ['FaRobot', C.white], ['FaProjectDiagram', C.white],
    ['FaUsers', C.white], ['FaGitAlt', C.white], ['FaClipboardCheck', C.white], ['FaBell', C.white], ['FaEuroSign', C.white], ['FaExchangeAlt', C.white],
    ['FaChartLine', C.white], ['FaLightbulb', C.white], ['FaSitemap', C.white], ['FaBolt', C.white], ['FaCamera', C.white], ['FaCalendarCheck', C.white],
    ['FaQuestionCircle', C.white], ['FaFlagCheckered', C.white], ['FaBalanceScale', C.white]]) {
    icons[k] = await icon(k, c);
  }

  let slideNo = 0;
  function base(title, opts = {}) {
    const s = pres.addSlide();
    slideNo += 1;
    s.background = { color: opts.dark ? C.teal : C.white };
    if (title) {
      s.addText(title, { x: 0.5, y: 0.3, w: 9.0, h: 0.7, fontFace: FONT, fontSize: 28, bold: true, color: opts.dark ? C.white : C.teal, isTextBox: true, margin: 0 });
    }
    s.addText('RepairFlow · Fallstudie Systemanalyse · WWI25B4 Gruppe 1', { x: 0.5, y: 5.2, w: 6, h: 0.3, fontFace: FONT, fontSize: 9, color: opts.dark ? 'CFE3E3' : C.grey, isTextBox: true, margin: 0 });
    s.addText(String(slideNo), { x: 9.0, y: 5.2, w: 0.5, h: 0.3, fontFace: FONT, fontSize: 9, color: opts.dark ? 'CFE3E3' : C.grey, align: 'right', isTextBox: true, margin: 0 });
    if (opts.speaker) s.addNotes('Vortragende(r): ' + opts.speaker + (opts.notes ? '\n\n' + opts.notes : ''));
    return s;
  }
  function iconCircle(s, name, x, y, d = 0.55, fill = C.teal) {
    s.addShape(pres.ShapeType.ellipse, { x, y, w: d, h: d, fill: { color: fill }, line: { color: fill } });
    s.addImage({ data: icons[name], x: x + d * 0.25, y: y + d * 0.25, w: d * 0.5, h: d * 0.5 });
  }
  function card(s, x, y, w, h, iconName, head, text, fill = C.light) {
    s.addShape(pres.ShapeType.roundRect, { x, y, w, h, fill: { color: fill }, line: { color: fill }, rectRadius: 0.08 });
    iconCircle(s, iconName, x + 0.2, y + 0.2, 0.5);
    s.addText(head, { x: x + 0.85, y: y + 0.18, w: w - 1.0, h: 0.5, fontFace: FONT, fontSize: 14, bold: true, color: C.dark, isTextBox: true, margin: 0, valign: 'middle' });
    s.addText(text, { x: x + 0.2, y: y + 0.8, w: w - 0.4, h: h - 0.95, fontFace: FONT, fontSize: 11.5, color: C.dark, isTextBox: true, margin: 0, valign: 'top' });
  }
  function bulletsBox(s, items, x, y, w, h, size = 14) {
    s.addText(items.map((t, i) => ({ text: t, options: { bullet: true, breakLine: i < items.length - 1, paraSpaceAfter: 6 } })),
      { x, y, w, h, fontFace: FONT, fontSize: size, color: C.dark, isTextBox: true, valign: 'top', margin: 0 });
  }
  function stat(s, x, y, value, label, w = 2.0) {
    s.addText(value, { x, y, w, h: 0.8, fontFace: FONT, fontSize: 40, bold: true, color: C.amber, isTextBox: true, margin: 0, align: 'center' });
    s.addText(label, { x, y: y + 0.8, w, h: 0.5, fontFace: FONT, fontSize: 11, color: C.dark, isTextBox: true, margin: 0, align: 'center' });
  }
  function picture(s, file, x, y, maxW, maxH, caption) {
    const { w, h } = fit(file, maxW, maxH);
    s.addImage({ path: path.join(HERE, file), x: x + (maxW - w) / 2, y, w, h });
    if (caption) s.addText(caption, { x, y: y + h + 0.05, w: maxW, h: 0.3, fontFace: FONT, fontSize: 9, italic: true, color: C.grey, align: 'center', isTextBox: true, margin: 0 });
    return h;
  }

  // ---------------- 1 Titel
  {
    const s = base(null, { dark: true, speaker: 'Nina' });
    s.addShape(pres.ShapeType.ellipse, { x: 7.2, y: -1.2, w: 4.5, h: 4.5, fill: { color: C.teal2 }, line: { color: C.teal2 } });
    s.addText('RepairFlow', { x: 0.6, y: 1.3, w: 8, h: 1.1, fontFace: FONT, fontSize: 54, bold: true, color: C.white, isTextBox: true, margin: 0 });
    s.addText('Werkstatt-Management als SaaS-Plattform mit KI-Sofortdiagnose', { x: 0.6, y: 2.4, w: 7.5, h: 0.6, fontFace: FONT, fontSize: 20, color: 'CFE3E3', isTextBox: true, margin: 0 });
    s.addText('Fallstudie Systemanalyse · Methoden der WI · DHBW Karlsruhe', { x: 0.6, y: 3.3, w: 8, h: 0.4, fontFace: FONT, fontSize: 14, color: C.white, isTextBox: true, margin: 0 });
    s.addText('Kurs WWI25B4 · Gruppe 1: Maximilian Ewald, David Leismann, Kilian Platter, Nina Sattler, Jakob Schwan, Adrian Wenzler', { x: 0.6, y: 3.75, w: 8.6, h: 0.6, fontFace: FONT, fontSize: 12, color: 'CFE3E3', isTextBox: true, margin: 0 });
    s.addText('Abschlusspräsentation · 27.10.2026 · Raum B458 (Termin bestätigen)', { x: 0.6, y: 4.35, w: 8.6, h: 0.4, fontFace: FONT, fontSize: 12, color: C.amber, isTextBox: true, margin: 0 });
    iconCircle(s, 'FaTools', 8.0, 1.2, 1.0, C.amber);
  }
  // ---------------- 2 Agenda
  {
    const s = base('Agenda', { speaker: 'Nina' });
    const items = [['1', 'Ausgangslage und Problem', 'Nina, David'], ['2', 'Das Startup RepairFlow und der Markt', 'Adrian'], ['3', 'Geschäftsprozesse (BPMN)', 'Maxi'],
      ['4', 'Automatisierung und KI-Sofortdiagnose', 'Adrian'], ['5', 'Objektorientierte Analyse (UML)', 'Kilian'], ['6', 'Vorgehen und Projektmanagement', 'David'],
      ['7', 'Herausforderungen und Fazit', 'Jakob, Nina']];
    items.forEach((it, i) => {
      const y = 1.15 + i * 0.47;
      s.addShape(pres.ShapeType.ellipse, { x: 0.6, y, w: 0.42, h: 0.42, fill: { color: C.teal }, line: { color: C.teal } });
      s.addText(it[0], { x: 0.6, y, w: 0.42, h: 0.42, fontFace: FONT, fontSize: 14, bold: true, color: C.white, align: 'center', valign: 'middle', isTextBox: true, margin: 0 });
      s.addText(it[1], { x: 1.2, y, w: 5.5, h: 0.42, fontFace: FONT, fontSize: 16, color: C.dark, valign: 'middle', isTextBox: true, margin: 0 });
      s.addText(it[2], { x: 6.8, y, w: 2.5, h: 0.42, fontFace: FONT, fontSize: 12, color: C.grey, valign: 'middle', isTextBox: true, margin: 0 });
    });
    s.addText('15 bis 20 Minuten · alle Gruppenmitglieder tragen vor', { x: 0.6, y: 4.7, w: 8, h: 0.3, fontFace: FONT, fontSize: 11, italic: true, color: C.grey, isTextBox: true, margin: 0 });
  }
  // ---------------- 3 Ausgangslage
  {
    const s = base('Werkstätten heute: Papier, Excel und Telefon', { speaker: 'David', notes: 'Pilotkunde FixWerk GmbH: vier Filialen, Fahrrad, E-Bike und Elektronik.' });
    s.addText('Unabhängige Reparaturwerkstätten für Fahrräder, E-Bikes und Elektronik wachsen, ihre Abläufe nicht. Unser Pilotkunde FixWerk GmbH (vier Filialen) zeigt die typischen Probleme:',
      { x: 0.5, y: 1.05, w: 9, h: 0.7, fontFace: FONT, fontSize: 13, color: C.dark, isTextBox: true, margin: 0 });
    card(s, 0.5, 1.9, 4.35, 1.45, 'FaBell', 'Kunden hören nichts', 'Keine zuverlässige Info, wann ein Kostenvoranschlag freizugeben oder das Gerät abholbereit ist. Rückfragen per Telefon, Geräte stehen wochenlang im Lager.');
    card(s, 5.15, 1.9, 4.35, 1.45, 'FaQuestionCircle', 'Kein Auftragsstatus', 'Wer wissen will, wo ein Gerät steht, fragt in der Werkstatt nach. Papierzettel und Excel-Listen laufen auseinander.');
    card(s, 0.5, 3.5, 4.35, 1.45, 'FaWarehouse', 'Teile doppelt bestellt', 'Jede Filiale bestellt für sich, obwohl das Teil in der Nachbarfiliale liegt. Das kostet Zeit und Geld.');
    card(s, 5.15, 3.5, 4.35, 1.45, 'FaCalendarCheck', 'Auslastung intransparent', 'Termine werden nach Gefühl zugesagt, die Kapazität der Techniker kennt niemand genau.');
  }
  // ---------------- 4 Startup
  {
    const s = base('RepairFlow: Solution Provider für Werkstätten', { speaker: 'Adrian' });
    bulletsBox(s, ['Wir sind das Software-Startup, nicht die Werkstatt: RepairFlow ist eine Cloud-Plattform für den gesamten Reparatur-Lebenszyklus.',
      'Vier Module: Kundenportal mit App, Auftrags- und Werkstattmodul, Dispositionsmodul, Abrechnung.',
      'Zielkunden: unabhängige Werkstätten und kleine Ketten mit 2 bis 10 Filialen im DACH-Raum.',
      'Geschäftsmodell: monatliches Abo je Filiale, Stufen Basis und Pro (Disposition und KI-Sofortdiagnose).',
      'Pilotkunde FixWerk GmbH: an ihren Prozessen haben wir die Plattform entworfen.'], 0.5, 1.15, 4.3, 3.9, 13);
    picture(s, 'uml2/systemkontext.png', 5.0, 1.15, 4.5, 3.6, 'Systemkontext: Plattform, Mandant, Kunde, Lieferant, KI-Dienst');
  }
  // ---------------- 5 Markt
  {
    const s = base('Markt und Wettbewerb: drei Unterschiede', { speaker: 'Adrian', notes: 'Fahrrad: fixdesk, RO App, Repero. Elektronik: RepairDesk, RepairShopr. Stand der Recherche September 2026.' });
    s.addText('Werkstattsoftware gibt es, aber getrennt nach Welten: Fahrrad (fixdesk, RO App, Repero) oder Elektronik (RepairDesk, RepairShopr).',
      { x: 0.5, y: 1.05, w: 9, h: 0.5, fontFace: FONT, fontSize: 13, color: C.dark, isTextBox: true, margin: 0 });
    card(s, 0.5, 1.75, 2.9, 3.2, 'FaTools', 'Eine Plattform', 'Fahrrad, E-Bike und Elektronik auf einer Plattform, mit gemeinsamer Kundenbasis und gemeinsamem Ersatzteillager.');
    card(s, 3.55, 1.75, 2.9, 3.2, 'FaExchangeAlt', 'Filialübergreifend', 'Bestände, Reservierungen und Umlagerungen über alle Standorte. Bestellt wird nur, was nirgends liegt.');
    card(s, 6.6, 1.75, 2.9, 3.2, 'FaRobot', 'KI-Sofortdiagnose', 'Diagnosevorschlag, vorläufiger Kostenvoranschlag und Termin, bevor der Kunde die Werkstatt betritt.', 'FFF4D6');
  }
  // ---------------- 6 Zustandsautomat
  {
    const s = base('Der Reparaturauftrag als Zustandsautomat', { speaker: 'Adrian', notes: 'Der Automat ist der gemeinsame Nenner aller Modelle: BPMN-Prozesse sind seine Übergänge, das Klassendiagramm führt ihn als Attribut status, die Sequenzdiagramme markieren die Wechsel.' });
    picture(s, 'uml2/zustand-reparaturauftrag.png', 0.5, 1.05, 4.2, 4.0);
    bulletsBox(s, ['angenommen → in Diagnose → KVA offen → freigegeben | abgelehnt → Teile bestellt → in Reparatur → fertig → abgeholt',
      'Die zehn BPMN-Prozesse sind die Übergänge dieses Automaten.',
      'Das Klassendiagramm führt ihn als Attribut status : AuftragStatus.',
      'Die Sequenzdiagramme markieren jeden Statuswechsel.',
      'Reklamation im Gewährleistungsfall startet einen neuen, kostenfreien Zyklus.'], 5.0, 1.3, 4.5, 3.7, 13);
  }
  // ---------------- 7 Prozesslandkarte
  {
    const s = base('Zehn Geschäftsprozesse als Kollaborationsdiagramme', { speaker: 'Maxi' });
    const rows = [[{ text: 'Nr', options: { bold: true, color: C.white, fill: { color: C.teal } } }, { text: 'Prozess', options: { bold: true, color: C.white, fill: { color: C.teal } } }, { text: 'Pools', options: { bold: true, color: C.white, fill: { color: C.teal } } }, { text: 'Akt.', options: { bold: true, color: C.white, fill: { color: C.teal } } }, { text: 'autom.', options: { bold: true, color: C.white, fill: { color: C.teal } } }]];
    for (const st of STATS) rows.push([st.num, st.name, st.pools.join(', '), String(st.activities), Math.round(100 * st.auto / st.activities) + ' %']);
    s.addTable(rows, { x: 0.5, y: 1.05, w: 6.3, colW: [0.4, 3.2, 1.6, 0.5, 0.6], fontFace: FONT, fontSize: 9.5, color: C.dark, border: { type: 'solid', color: C.line, pt: 0.5 }, rowH: 0.31, valign: 'middle' });
    stat(s, 7.1, 1.3, String(TOTAL_ACT), 'Aktivitäten, im Schnitt ' + (TOTAL_ACT / 10).toFixed(0) + ' je Diagramm', 2.3);
    stat(s, 7.1, 2.9, Math.round(100 * TOTAL_AUTO / TOTAL_ACT) + ' %', 'davon führt RepairFlow ohne manuelle Arbeit aus', 2.3);
    s.addText('Prozesse 01 bis 08: durchgehende Auftragsreise · 09 und 10: Reklamation und Retoure', { x: 0.5, y: 4.75, w: 9, h: 0.3, fontFace: FONT, fontSize: 10, italic: true, color: C.grey, isTextBox: true, margin: 0 });
  }
  // ---------------- 8 Konventionen
  {
    const s = base('So lesen sich unsere BPMN-Diagramme', { speaker: 'Maxi', notes: 'Regeln aus der Vorlesung: Pool = Unternehmen, Lane = Rolle, keine Lane für Software. Automatisierung zeigt der Aktivitätstyp.' });
    card(s, 0.5, 1.1, 4.35, 1.4, 'FaSitemap', 'Pools und Lanes', 'Pool = Unternehmen: Werkstattbetrieb (Mandant), Kunde und Lieferant als Empty Pools. Lanes = Rollen: Service, Techniker, Werkstattleitung, Disposition.');
    card(s, 5.15, 1.1, 4.35, 1.4, 'FaBolt', 'Automatisierung als Aktivitätstyp', 'Service Task = RepairFlow allein, Business Rule Task = Regel oder KI, Send/Receive = Nachricht, User Task = Mensch mit RepairFlow, Manual = außerhalb.');
    card(s, 0.5, 2.65, 4.35, 1.4, 'FaExchangeAlt', 'Nachrichtenflüsse und Daten', 'Kommunikation mit Kunde und Lieferant nur als Nachrichtenfluss. Datenobjekte tragen Klassennamen mit Zustand, z. B. Reparaturauftrag [freigegeben].');
    card(s, 5.15, 2.65, 4.35, 1.4, 'FaClipboardCheck', 'Ein Start, ein Ende, Linter sauber', 'Je Diagramm ein Start- und ein Endereignis. Camunda-8-Anreicherung: Task-Definitionen, Subscriptions, Timer, FEEL-Bedingungen. Problems-Panel: 0 Befunde.');
    picture(s, 'pres/crop-05-links.png', 0.5, 4.15, 9.0, 0.78, 'Ausschnitt Prozess 05: paralleler Mehrfach-Teilprozess je Ersatzteil');
  }
  // ---------------- 9 Prozess 01
  {
    const s = base('Prozess 01: KI-Sofortdiagnose und Voranmeldung', { speaker: 'Maxi', notes: 'Message-Start aus der App, Medienprüfung mit Rückfrageschleife, KI als Business Rule Task, Vorab-KVA, Verfügbarkeit über alle Filialen, Terminvorschlag, ereignisbasiertes Gateway: Bestätigung oder 7-Tage-Timer.' });
    picture(s, 'pres/crop-01-links.png', 0.5, 1.05, 9.0, 2.7, 'Linker Teil des Diagramms: Anfrage, Medienprüfung mit Rückfrage, KI-Diagnosevorschlag, Vorab-KVA, Verfügbarkeit');
    bulletsBox(s, ['Auslöser: Nachricht aus der App mit Foto, Video oder Ton', 'Rückfrageschleife bei nicht auswertbaren Medien', 'KI-Diagnosevorschlag als Geschäftsregel-Aktivität, danach Vorab-KVA, Verfügbarkeitsprüfung und Terminvorschlag', 'Warten auf Bestätigung oder 7-Tage-Timer, dann Voranmeldung mit Vorreservierung'], 0.5, 4.15, 9, 1.0, 11);
  }
  // ---------------- 10 Prozess 04
  {
    const s = base('Prozess 04: Kostenvoranschlag und Kundenfreigabe', { speaker: 'Maxi', notes: 'Ereignisbasiertes Gateway: Freigabe, Ablehnung oder Timer. Die Erinnerung protokollieren und den KVA erneut senden statt einer separaten Nachricht, damit das Diagramm ohne Kreuzungen bleibt.' });
    picture(s, 'pres/crop-04-mitte.png', 0.5, 1.05, 9.0, 2.65, 'Mittlerer Teil: Senden, ereignisbasiertes Gateway mit Freigabe, Ablehnung und Timer, Erinnerungsschleife');
    bulletsBox(s, ['Techniker erfasst Positionen, RepairFlow übernimmt Ersatzteilpreise und berechnet den KVA', 'Ereignisbasiertes Gateway: Freigabe erhalten, Ablehnung erhalten oder 3 Tage keine Reaktion', 'Freigabe ruft Prozess 05 (Ersatzteile disponieren) als Call Activity auf; Ablehnung führt zur Diagnosepauschale und Abholaufforderung'], 0.5, 4.1, 9, 1.0, 11);
  }
  // ---------------- 11 Automatisierung + KI
  {
    const s = base('KVA in 60 Sekunden: die KI-Sofortdiagnose', { speaker: 'Adrian', notes: 'Rückmeldung des Dozenten: ein Gimmick, das uns abhebt, darf visionär sein. Heute machbar: sichtbare Schäden per Bildanalyse. Vision: Geräuschanalyse, Aufwandsschätzung aus Video. Deshalb: Vorschlag bleibt vorläufig, Techniker bestätigt.' });
    const steps = [['FaCamera', 'Aufnehmen', 'Kunde lädt Foto, Video oder Ton in der App hoch'], ['FaRobot', 'Erkennen', 'KI-Dienst nennt Gerätetyp, Ursache und Ersatzteile'], ['FaEuroSign', 'Kalkulieren', 'RepairFlow berechnet einen vorläufigen KVA'], ['FaWarehouse', 'Reservieren', 'Verfügbarkeit in allen Filialen, Teile vorreserviert'], ['FaCalendarCheck', 'Termin', 'Filiale und Termin vorgeschlagen, Kunde bestätigt']];
    steps.forEach((st, i) => {
      const x = 0.5 + i * 1.84;
      s.addShape(pres.ShapeType.roundRect, { x, y: 1.15, w: 1.7, h: 2.1, fill: { color: i === 1 ? 'FFF4D6' : C.light }, line: { color: i === 1 ? 'FFF4D6' : C.light }, rectRadius: 0.08 });
      iconCircle(s, st[0], x + 0.55, 1.3, 0.6, i === 1 ? C.amber : C.teal);
      s.addText(st[1], { x, y: 2.0, w: 1.7, h: 0.35, fontFace: FONT, fontSize: 13, bold: true, color: C.dark, align: 'center', isTextBox: true, margin: 0 });
      s.addText(st[2], { x: x + 0.1, y: 2.35, w: 1.5, h: 0.85, fontFace: FONT, fontSize: 10, color: C.dark, align: 'center', isTextBox: true, margin: 0 });
    });
    s.addText('Heute machbar', { x: 0.5, y: 3.5, w: 4.3, h: 0.3, fontFace: FONT, fontSize: 13, bold: true, color: C.teal, isTextBox: true, margin: 0 });
    bulletsBox(s, ['Sichtbare Schäden per Bildanalyse: gebrochenes Display, gerissene Kette', 'Vorab-KVA aus Teilepreisen und Aufwandsrichtwerten', 'Verfügbarkeitsprüfung und Vorreservierung'], 0.5, 3.85, 4.3, 1.3, 11);
    s.addText('Vision und Absicherung', { x: 5.2, y: 3.5, w: 4.3, h: 0.3, fontFace: FONT, fontSize: 13, bold: true, color: C.amber, isTextBox: true, margin: 0 });
    bulletsBox(s, ['Geräuschanalyse von E-Bike-Motoren, Aufwand aus Video', 'Vorschlag bleibt vorläufig, der Techniker bestätigt oder korrigiert', 'Medien nur mit Einwilligung, Löschung nach Abschluss'], 5.2, 3.85, 4.3, 1.3, 11);
  }
  // ---------------- 12 Use Cases
  {
    const s = base('Use-Case-Diagramm: was RepairFlow leistet', { speaker: 'Kilian', notes: '18 Use Cases in vier Bereichen, sieben Akteure. include = immer, extend = bedingt.' });
    picture(s, 'uml2/usecase.png', 0.4, 1.05, 5.6, 4.1);
    bulletsBox(s, ['18 Use Cases in vier Bereichen: Kundenportal, Auftrag und Werkstatt, Ersatzteil-Disposition, Administration',
      'Primäre Akteure: Kunde, Techniker, Disponent, Werkstattleiter, Werkstattinhaber',
      'Sekundär und extern: Lieferant, KI-Diagnosedienst',
      '«include» für Pflicht-Teilschritte, z. B. KVA erstellen → Diagnosebefund erfassen',
      '«extend» für bedingtes Verhalten, z. B. Voranmeldung bestätigen → Sofortdiagnose anfordern'], 6.2, 1.2, 3.3, 3.9, 11.5);
  }
  // ---------------- 13 Klassen
  {
    const s = base('Klassendiagramm: 26 Klassen, ein Zustandsautomat', { speaker: 'Kilian', notes: 'Entwurfsentscheidungen: Reparaturauftrag als Aggregatwurzel, Lagerbestand je Filiale, Reservierung als eigene Klasse, Werkstattbetrieb als Mandant, Rollen als Unterklassen von Mitarbeiter, drei KI-Klassen.' });
    picture(s, 'uml2/klassen-fokus-1-sofortdiagnose.png', 0.4, 1.05, 5.6, 4.1, 'Ausschnitt: Kundenkontakt und KI-Sofortdiagnose (vollständiges Diagramm in der Dokumentation)');
    bulletsBox(s, ['Reparaturauftrag als Aggregatwurzel: Gerät, Befund, KVA und Reparaturschritte sind Kompositionen',
      'Lagerbestand als eigene Klasse zwischen Ersatzteil und Filiale: nur so geht filialübergreifende Verfügbarkeit',
      'ErsatzteilReservierung mit eigenem Lebenszyklus: vorreserviert, reserviert, entnommen, storniert',
      'Werkstattbetrieb als Mandant; Rollen Techniker, Disponent, Werkstattleiter als Unterklassen von Mitarbeiter – wie die Lanes im BPMN',
      'Voranmeldung, Medienanhang, KIDiagnosevorschlag tragen die Sofortdiagnose'], 6.2, 1.2, 3.3, 3.9, 11.5);
  }
  // ---------------- 14 SD1
  {
    const s = base('Sequenzdiagramm SD1: Sofortdiagnose anfordern', { speaker: 'Kilian', notes: 'Lebenslinien sind Klassen, Botschaften sind Operationen. Fragmente: loop je Medienanhang, alt auswertbar/nicht, loop je Teil und Filiale, alt Bestätigung/Timer, opt Reservierung.' });
    picture(s, 'uml2/sequenz-01-sofortdiagnose.png', 0.4, 1.05, 6.4, 4.1);
    bulletsBox(s, ['Voranmeldung lässt jeden Medienanhang analysieren (loop)', 'alt: Medien nicht auswertbar → Rückfrage; sonst KIDiagnosevorschlag und vorläufiger KVA', 'loop je Ersatzteil und Filiale über Lagerbestand', 'alt: Kunde bestätigt → opt Vorreservierung; sonst Timer → verwerfen', 'Alle Botschaften sind Operationen des Klassendiagramms'], 7.0, 1.2, 2.5, 3.9, 10.5);
  }
  // ---------------- 15 SD3
  {
    const s = base('Sequenzdiagramm SD3: Ersatzteil filialübergreifend reservieren', { speaker: 'Jakob', notes: 'Fachlicher Mehrwert der Disposition. Verschachteltes alt, loop über die anderen Filialen, opt Nachbestellvorschlag.' });
    picture(s, 'uml2/sequenz-03-reservierung.png', 0.4, 1.05, 6.4, 4.1);
    bulletsBox(s, ['Erst der eigene Lagerbestand, dann loop über die anderen Filialen', 'Verschachteltes alt: lokal reservieren, extern reservieren mit Umlagerung oder Fehlteil melden (→ Prozess 06)', 'opt: Meldebestand unterschritten → Nachbestellvorschlag', 'Reservierung mindert den verfügbaren Bestand, entnommen wird erst beim Einbau'], 7.0, 1.2, 2.5, 3.9, 10.5);
  }
  // ---------------- 16 Vorgehen & PM
  {
    const s = base('Vorgehen und Projektmanagement', { speaker: 'David' });
    const phases = ['Themenwahl', 'Konzept + Feedback', 'Prozessanalyse', 'BPMN', 'OOA (UML)', 'Doku + Präsentation'];
    phases.forEach((p, i) => {
      const x = 0.5 + i * 1.5;
      s.addShape(pres.ShapeType.chevron, { x, y: 1.1, w: 1.5, h: 0.6, fill: { color: i % 2 ? C.teal2 : C.teal }, line: { color: C.white } });
      s.addText(p, { x: x + 0.15, y: 1.1, w: 1.25, h: 0.6, fontFace: FONT, fontSize: 10, bold: true, color: C.white, align: 'center', valign: 'middle', isTextBox: true, margin: 0 });
    });
    card(s, 0.5, 1.95, 2.9, 3.1, 'FaUsers', 'Rollen', 'Projektleitung Nina (Stellvertretung und Backups David), Product Owner Adrian, Scrum Master und UML Kilian, BPMN Maxi, Qualität Jakob, Dokumanager: KI-Werkzeug Claude.');
    card(s, 3.55, 1.95, 2.9, 3.1, 'FaGitAlt', 'Zusammenarbeit', 'Scrum im Takt der vier Gruppentermine, Trello-Board mit einer Liste je Termin und einer Karte je Person und Aufgabe, Prüfung jedes Diagramms im Zweierteam, GitHub mit Branches, Pull Requests und Review.');
    card(s, 6.6, 1.95, 2.9, 3.1, 'FaFlagCheckered', 'Meilensteine', '02.09. alle Diagramme erstellt und geprüft, 05.10. Korrekturen und Sequenzdiagramme, 15.10. Modelle, Doku und Folien fertig, 22.10. Generalprobe, 27.10. Präsentation, 13.11. Abgabe.');
  }
  // ---------------- 17 Herausforderungen
  {
    const s = base('Herausforderungen und was wir gelernt haben', { speaker: 'Jakob' });
    card(s, 0.5, 1.1, 4.35, 1.9, 'FaBalanceScale', 'Perspektive klären', 'Werkstatt oder Softwareanbieter? Die Rückfrage des Dozenten hat uns zur klaren Entscheidung gezwungen: Solution Provider, FixWerk als Pilotkunde. Prozesse blieben, Texte und Klassenmodell zogen nach.');
    card(s, 5.15, 1.1, 4.35, 1.9, 'FaProjectDiagram', 'Drei Modelle, ein Vokabular', 'Datenobjekte, Klassen, Lebenslinien und Statuswerte müssen wortgleich sein. Eine gemeinsame Modellbeschreibung als Single Source of Truth hat die Abweichungen beseitigt.');
    card(s, 0.5, 3.15, 4.35, 1.9, 'FaClipboardCheck', 'Engine-ready statt Fehlerliste', 'Der Camunda Modeler meldet für Camunda 8 fehlende technische Details als Fehler. Wir haben die Diagramme angereichert, bis das Problems-Panel leer war.');
    card(s, 5.15, 3.15, 4.35, 1.9, 'FaLightbulb', 'Vision mit Absicherung', 'Die KI-Sofortdiagnose soll beeindrucken, aber glaubwürdig bleiben: klare Trennung von heute Machbarem und Vision, Vorschlag bleibt vorläufig.');
  }
  // ---------------- 18 Fazit
  {
    const s = base('Fazit und Ausblick', { dark: true, speaker: 'Nina' });
    stat(s, 0.5, 1.2, '10', 'BPMN-Kollaborationsdiagramme, ' + TOTAL_ACT + ' Aktivitäten', 2.2);
    stat(s, 2.9, 1.2, '18', 'Use Cases, 7 Akteure', 2.2);
    stat(s, 5.3, 1.2, '23', 'Klassen, 33 Assoziationen', 2.2);
    stat(s, 7.7, 1.2, '5', 'Sequenzdiagramme + Zustandsdiagramm', 2.2);
    s.addText([{ text: 'RepairFlow löst den Medienbruch aus Papier, Excel und Telefon und macht den Reparaturauftrag zum zentralen Zustandsautomaten. ', options: { breakLine: true } },
      { text: 'Der fachliche Mehrwert liegt in der filialübergreifenden Disposition und in der KI-Sofortdiagnose, die dem Kunden Klarheit gibt, bevor er die Werkstatt betritt.', options: { breakLine: true } },
      { text: 'Ausblick: Predictive Disposition (Bedarfsprognose je Filiale und Saison), Techniker-Copilot und digitale Geräteakte.', options: {} }],
      { x: 0.5, y: 3.0, w: 9, h: 1.9, fontFace: FONT, fontSize: 14, color: C.white, isTextBox: true, margin: 0, paraSpaceAfter: 8, valign: 'top' });
  }
  // ---------------- 19 Danke
  {
    const s = base(null, { dark: true, speaker: 'alle' });
    s.addText('Vielen Dank', { x: 0.6, y: 1.8, w: 8, h: 1.0, fontFace: FONT, fontSize: 48, bold: true, color: C.white, isTextBox: true, margin: 0 });
    s.addText('Fragen?', { x: 0.6, y: 2.8, w: 8, h: 0.6, fontFace: FONT, fontSize: 24, color: 'CFE3E3', isTextBox: true, margin: 0 });
    s.addText('Gruppe 1 · WWI25B4 · RepairFlow', { x: 0.6, y: 3.6, w: 8, h: 0.4, fontFace: FONT, fontSize: 14, color: C.white, isTextBox: true, margin: 0 });
    iconCircle(s, 'FaTools', 8.0, 1.6, 1.0, C.amber);
  }
  // ---------------- 20 Anhang: Beiträge
  {
    const s = base('Anhang: Beiträge der Vortragenden', { speaker: '-', notes: 'Pflichtangabe für den PDF-Export laut Ablauf: welche/r Vortragende welchen Beitrag verantwortet.' });
    const hdr = (t) => ({ text: t, options: { bold: true, color: C.white, fill: { color: C.teal } } });
    const rows = [[hdr('Vortragende(r)'), hdr('Folien'), hdr('Verantworteter Beitrag')],
      ['Nina Sattler', '1–2, 18–19', 'Einleitung und Agenda, Fazit und Ausblick; Projektleitung'],
      ['David Leismann', '3, 16', 'Ausgangslage und Problem; Vorgehen und Projektmanagement; stellvertretende Projektleitung, Backups'],
      ['Adrian Wenzler', '4–6, 11', 'Startup und Markt, Zustandsautomat, KI-Sofortdiagnose; Product Owner'],
      ['Maximilian Ewald', '7–10', 'Geschäftsprozessmodell: Prozesslandkarte, Konventionen, Prozesse 01 und 04; BPMN-Modellierung im Camunda Modeler'],
      ['Kilian Platter', '12–14', 'Use-Case-Diagramm, Klassendiagramm, Sequenzdiagramm SD1; UML-Modellierung in Visual Paradigm, Scrum Master'],
      ['Jakob Schwan', '15, 17', 'Sequenzdiagramm SD3, Herausforderungen; Qualitätssicherung und Konsistenz']];
    s.addTable(rows, { x: 0.5, y: 1.1, w: 9.0, colW: [1.8, 1.2, 6.0], fontFace: FONT, fontSize: 11, color: C.dark, border: { type: 'solid', color: C.line, pt: 0.5 }, rowH: 0.45, valign: 'middle' });
    s.addText('Zuordnung nach der Rollenverteilung vom Gruppentermin 02.09.2026.', { x: 0.5, y: 4.5, w: 9, h: 0.3, fontFace: FONT, fontSize: 10, italic: true, color: C.grey, isTextBox: true, margin: 0 });
  }

  const out = path.join(HERE, 'praesi2', 'Abschlusspraesentation.pptx');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  await pres.writeFile({ fileName: out });
  console.log('written', out, 'slides', slideNo);
})();
