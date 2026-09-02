// Projektdokumentation RepairFlow – Fallstudie Systemanalyse (docx-js)
// Aufruf: node doc.js [toc.json]   – toc.json enthält Seitenzahlen für das statische Inhaltsverzeichnis (2. Durchlauf)
const fs = require('fs');
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, WidthType, AlignmentType,
  ImageRun, PageBreak, Header, Footer, PageNumber, PageOrientation, LevelFormat, BorderStyle, ShadingType,
  VerticalAlign, TabStopType, TabStopPosition, PositionalTab, PositionalTabAlignment, PositionalTabLeader,
  PositionalTabRelativeTo, LeaderType,
} = require('docx');

const HERE = __dirname;
const DIMS = JSON.parse(fs.readFileSync(path.join(HERE, 'imgdims.json'), 'utf8'));
const STATS = JSON.parse(fs.readFileSync(path.join(HERE, 'process_stats.json'), 'utf8'));
const TOC = fs.existsSync(process.argv[2] || '') ? JSON.parse(fs.readFileSync(process.argv[2], 'utf8')) : {};

// ------------------------------------------------------------------ helpers
const FONT = 'Calibri';
const BLUE = '1F3864';
const GREY = '595959';
const tocEntries = [];        // {level, text}

function run(text, opts = {}) { return new TextRun({ text, font: FONT, size: 22, ...opts }); }
function P(text, opts = {}) {
  const runs = Array.isArray(text) ? text : [run(text)];
  return new Paragraph({ spacing: { after: 120, line: 276 }, alignment: AlignmentType.JUSTIFIED, ...opts, children: runs });
}
function PL(text, opts = {}) { return P(text, { alignment: AlignmentType.LEFT, ...opts }); }
function B(text) { return run(text, { bold: true }); }
function I(text) { return run(text, { italics: true }); }
function TODO(text) { return run('[Gruppe: ' + text + ']', { italics: true, shading: { type: ShadingType.CLEAR, fill: 'FFF2A8', color: 'auto' } }); }
function H(level, text) {
  tocEntries.push({ level, text });
  const hl = { 1: HeadingLevel.HEADING_1, 2: HeadingLevel.HEADING_2, 3: HeadingLevel.HEADING_3 }[level];
  return new Paragraph({ heading: hl, spacing: { before: level === 1 ? 360 : 240, after: 120 }, keepNext: true,
    children: [new TextRun({ text, font: FONT })] });
}
function bullets(items) {
  return items.map(t => new Paragraph({ numbering: { reference: 'bullets', level: 0 }, spacing: { after: 60, line: 264 },
    children: Array.isArray(t) ? t : [run(t)] }));
}
function numbered(items) {
  return items.map(t => new Paragraph({ numbering: { reference: 'numbers', level: 0 }, spacing: { after: 60, line: 264 },
    children: Array.isArray(t) ? t : [run(t)] }));
}
function caption(text) {
  return new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 60, after: 200 },
    children: [new TextRun({ text, font: FONT, size: 18, italics: true, color: GREY })] });
}
let figNo = 0;
function figure(file, title, maxW, maxH) {
  const abs = path.resolve(HERE, file);
  const [w, h] = DIMS[abs];
  let W = maxW, Hh = Math.round(h * maxW / w);
  if (maxH && Hh > maxH) { Hh = maxH; W = Math.round(w * maxH / h); }
  figNo += 1;
  return [
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 120, after: 0 }, keepNext: true,
      children: [new ImageRun({ type: 'png', data: fs.readFileSync(abs), transformation: { width: W, height: Hh } })] }),
    caption('Abbildung ' + figNo + ': ' + title),
  ];
}
function cell(content, opts = {}) {
  const { width, header = false, shade, align } = opts;
  const paras = (Array.isArray(content) ? content : [content]).map(c =>
    c instanceof Paragraph ? c : new Paragraph({ spacing: { after: 40, line: 252 }, alignment: align || AlignmentType.LEFT,
      children: Array.isArray(c) ? c : (c instanceof TextRun ? [c] : [new TextRun({ text: String(c), font: FONT, size: header ? 19 : 19, bold: header, color: header ? 'FFFFFF' : '000000' })]) }));
  return new TableCell({ width: { size: width, type: WidthType.DXA }, verticalAlign: VerticalAlign.TOP,
    shading: header ? { type: ShadingType.CLEAR, fill: BLUE, color: 'auto' } : (shade ? { type: ShadingType.CLEAR, fill: shade, color: 'auto' } : undefined),
    margins: { top: 50, bottom: 50, left: 90, right: 90 }, children: paras });
}
function table(widths, header, rows, opts = {}) {
  const border = { style: BorderStyle.SINGLE, size: 4, color: 'BFBFBF' };
  const total = widths.reduce((a, b) => a + b, 0);
  return new Table({
    width: { size: total, type: WidthType.DXA }, columnWidths: widths,
    borders: { top: border, bottom: border, left: border, right: border, insideHorizontal: border, insideVertical: border },
    rows: [
      new TableRow({ tableHeader: true, children: header.map((h, i) => cell(h, { width: widths[i], header: true })) }),
      ...rows.map((r, ri) => new TableRow({ cantSplit: true, children: r.map((c, i) => cell(c, { width: widths[i], shade: opts.zebra && ri % 2 === 1 ? 'F2F2F2' : undefined })) })),
    ],
  });
}
function spacer(after = 160) { return new Paragraph({ spacing: { after }, children: [] }); }
function pageBreak() { return new Paragraph({ children: [new PageBreak()] }); }

// ------------------------------------------------------------------ content
const MEMBERS = [
  ['Nina Sattler', 'Projektleiterin', 'Ansprechpartnerin für den Dozenten, Gesamtplanung, Termine, Abgabe-Archiv'],
  ['David Leismann', 'Stellvertretende Projektleitung, Backup-Beauftragter', 'Sicherung der Repositories (Git, Camunda, VP-Server), Termine, Abgabe-Check'],
  ['Adrian Wenzler', 'Product Owner', 'Fachliche Entscheidungen zum Produkt: Umfang, Prioritäten, KI-Sofortdiagnose; Abnahme im Sprint Review'],
  ['Kilian Platter', 'Scrum Master und UML-Verantwortlicher', 'Sprint-Rituale und Trello-Board; Use-Case-, Klassen- und Sequenzdiagramme in Visual Paradigm, VP-Repository'],
  ['Maximilian Ewald', 'BPMN-Verantwortlicher', 'Die zehn Kollaborationsdiagramme im Camunda Modeler, Camunda-Repository, BPMN-Export'],
  ['Jakob Schwan', 'Qualitätsmanager', 'Review der Artefakte gegen die Anforderungen, Konsistenz zwischen BPMN, UML und Dokumentation, Präsentation'],
];

const PROCESS_TEXT = {
  '01': 'Der Kunde lädt in der App Foto, Video oder eine Tonaufnahme hoch. RepairFlow prüft die Medien, lässt sie vom KI-Dienst auswerten, berechnet einen vorläufigen Kostenvoranschlag, prüft die Teileverfügbarkeit in allen Filialen und schlägt Filiale und Termin vor. Bestätigt der Kunde, entsteht eine Voranmeldung mit vorreservierten Teilen.',
  '02': 'Der Kunde bringt das Gerät in die Filiale. Liegt eine Voranmeldung vor, werden ihre Daten übernommen, sonst werden Kundendaten erfasst. Gerät, Symptome und Sichtprüfung werden dokumentiert, der Reparaturauftrag wird angelegt. Die Werkstattleitung prüft die Auslastung, weist einen Techniker zu und legt den Werkstatttermin fest.',
  '03': 'Der Techniker sichtet den KI-Diagnosevorschlag, führt Funktionstest und Messung durch und dokumentiert den Fehlerbefund samt Ersatzteilbedarf. RepairFlow bewertet die Wirtschaftlichkeit der Reparatur; bei einem wirtschaftlichen Totalschaden wird der Kunde informiert und der Auftrag geschlossen.',
  '04': 'Aus dem Befund entsteht der Kostenvoranschlag mit Positionen und übernommenen Ersatzteilpreisen. RepairFlow sendet ihn an den Kunden und wartet mit einem ereignisbasierten Gateway auf Freigabe, Ablehnung oder Fristablauf. Bleibt die Reaktion aus, wird der KVA mit Erinnerung erneut gesendet. Nach Freigabe startet die Disposition, nach Ablehnung die Abrechnung der Diagnosepauschale.',
  '05': 'Je Ersatzteil prüft RepairFlow in einem parallelen Mehrfach-Teilprozess zuerst den Bestand der eigenen Filiale, dann den der anderen Filialen. Teile werden reserviert oder per Umlagerung angefordert, Fehlteile für die Bestellung markiert. Ein unterschrittener Meldebestand erzeugt einen Nachbestellvorschlag. Der Kunde erhält den voraussichtlichen Reparaturbeginn.',
  '06': 'Fehlteile werden gebündelt und beim Lieferanten bestellt, bei Überschreitung der Freigabegrenze nach Freigabe durch die Werkstattleitung. Nach Auftragsbestätigung wird der Liefertermin am Auftrag hinterlegt und der Kunde bei Verzögerung informiert. Der Wareneingang wird geprüft und gebucht, mangelhafte Lieferungen gehen in die Retoure.',
  '07': 'Der Techniker entnimmt die reservierten Teile und arbeitet die Reparaturschritte in einer Schleife mit Zeiterfassung ab. Ein Zusatzbefund führt zu einem Nachtrags-KVA, den der Kunde freigeben muss. Nach Endkontrolle und Prüfprotokoll wird der Auftrag auf „fertig" gesetzt, bei Mängeln folgt Nacharbeit.',
  '08': 'RepairFlow erstellt die Rechnung aus KVA und Arbeitszeiten und benachrichtigt den Kunden. Wird das Gerät nicht abgeholt, erinnert das System nach 14 Tagen. Bei der Abholung werden Gerät und Rechnung übergeben, die Zahlung erfasst, der Auftrag geschlossen und die Bestände abgeschlossen. Zum Schluss bittet RepairFlow um eine Bewertung.',
  '09': 'Meldet der Kunde nach der Abholung einen Mangel, wird die Reklamation dem Ursprungsauftrag zugeordnet. Der Techniker prüft den Mangel, RepairFlow bewertet den Gewährleistungsfall. Im Gewährleistungsfall gibt die Werkstattleitung die kostenfreie Nacharbeit frei, sonst erhält der Kunde ein kostenpflichtiges Angebot. Defekte Lieferantenteile gehen in die Retoure.',
  '10': 'Defekte oder falsche Lieferantenteile werden beim Lieferanten angemeldet. Bleibt die RMA-Freigabe aus, eskaliert die Werkstattleitung. Nach der Freigabe wird das Teil versendet, der Bestand korrigiert und je nach Rückmeldung eine Ersatzlieferung gebucht oder eine Gutschrift verbucht. Wartet eine Reparatur auf das Teil, wird sie fortgesetzt.',
};

const KIND_LABEL = { user: 'Benutzer', service: 'automatisiert', send: 'sendend', receive: 'empfangend', manual: 'manuell', businessRule: 'Geschäftsregel', call: 'Aufruf', subprocess: 'Teilprozess' };

function processMapTable() {
  const widths = [450, 2100, 1500, 1500, 1750, 1150, 1350];
  const rows = STATS.map(s => [
    s.num, s.name, s.start, s.end, s.pools.join(', '), String(s.activities), String(s.auto) + ' (' + Math.round(100 * s.auto / s.activities) + ' %)',
  ]);
  return table(widths, ['Nr', 'Prozess', 'Auslöser (Start)', 'Ergebnis (Ende)', 'Pools', 'Aktivi-täten', 'davon auto-matisiert'], rows, { zebra: true });
}

const TOTAL_ACT = STATS.reduce((a, s) => a + s.activities, 0);
const TOTAL_AUTO = STATS.reduce((a, s) => a + s.auto, 0);
const TOTAL_MSG = STATS.reduce((a, s) => a + s.msgflows, 0);
const TOTAL_DATA = STATS.reduce((a, s) => a + s.data, 0);

// ------------------------------------------------------------------ title page
function titlePage() {
  const c = (text, size, opts = {}) => new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 120 },
    children: [new TextRun({ text, font: FONT, size, ...opts })] });
  return [
    spacer(600),
    c('Duale Hochschule Baden-Württemberg Karlsruhe', 24, { color: GREY }),
    c('Studiengang Wirtschaftsinformatik · Modul Methoden der Wirtschaftsinformatik', 22, { color: GREY }),
    c('Fallstudie Systemanalyse · 3. Semester', 22, { color: GREY }),
    spacer(900),
    c('RepairFlow', 64, { bold: true, color: BLUE }),
    c('Werkstatt-Management als SaaS-Plattform mit KI-Sofortdiagnose', 30, { color: BLUE }),
    spacer(400),
    c('Projektdokumentation', 28, { bold: true }),
    spacer(900),
    c('Kurs WWI25B4 · Gruppe 1', 26, { bold: true }),
    spacer(200),
    c('Maximilian Ewald · David Leismann · Kilian Platter', 24),
    c('Nina Sattler · Jakob Schwan · Adrian Wenzler', 24),
    spacer(900),
    c('Betreuender Dozent: Prof. Dr. Thomas Freytag', 22),
    c('Abgabe: 13. November 2026', 22),
    pageBreak(),
  ];
}

// ------------------------------------------------------------------ static TOC
function tocPage() {
  const out = [new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { after: 240 }, children: [new TextRun({ text: 'Inhaltsverzeichnis', font: FONT })] })];
  const entries = TOC.entries || tocEntriesPlan();
  for (const e of entries) {
    const page = (TOC.pages && TOC.pages[e.text]) || '';
    out.push(new Paragraph({ spacing: { after: 40 }, indent: { left: e.level === 1 ? 0 : (e.level === 2 ? 400 : 800) },
      tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX, leader: LeaderType.DOT }],
      children: [new TextRun({ text: e.text + '\t' + String(page), font: FONT, size: e.level === 1 ? 22 : 20, bold: e.level === 1 })] }));
  }
  out.push(pageBreak());
  return out;
}
function tocEntriesPlan() { return []; }

// ------------------------------------------------------------------ chapters
function chapter1() {
  return [
    H(1, '1 Mitglieder der Gruppe und Rollen'),
    P('Die Fallstudie wurde von sechs Studierenden des Kurses WWI25B4 bearbeitet. Das Team hat sich zu Beginn des Semesters konstituiert und die Zuständigkeiten nach dem Scrum-Vorgehensmodell verteilt (Kapitel 4): Jedes Artefakt hat eine verantwortliche Person, die Projektleitung ist Ansprechpartnerin für den Dozenten, und die Qualitätssicherung übernimmt eine Person, die nicht selbst modelliert.'),
    table([2200, 2200, 4960], ['Name', 'Rolle', 'Zuständigkeit'], MEMBERS, { zebra: true }),
    spacer(),
    P([run('Als „Dokumanager" haben wir zusätzlich das KI-Werkzeug Claude (Anthropic) eingesetzt: für Struktur und Formulierungsvorschläge dieser Dokumentation, für die Pflege des Entscheidungslogs im Git-Repository, für Konsistenzprüfungen zwischen den Modellen und für die Erzeugung der BPMN-Rohdiagramme aus unserer Prozessspezifikation. Die fachlichen Modellierungsentscheidungen, die finalen Modelle in Camunda Modeler und Visual Paradigm und die Präsentation hat das Team erarbeitet und verantwortet es. '), TODO('Falls eine KI-Nutzungserklärung verlangt wird: geforderten Wortlaut einsetzen')]),
  ];
}

function chapter2() {
  return [
    H(1, '2 Das Projekt RepairFlow'),
    H(2, '2.1 Ausgangslage und Problem'),
    P('Unabhängige Reparaturwerkstätten für Fahrräder, E-Bikes und Consumer-Elektronik arbeiten heute oft mit Papier-Auftragszetteln, Excel-Listen und Telefon. Das Reparaturgeschäft wächst, weil E-Bikes wartungsintensiv sind und das Recht auf Reparatur die Nachfrage nach Elektronikreparaturen stützt. Die Abläufe in den Werkstätten halten damit nicht Schritt.'),
    P('Als Referenz dient uns die FixWerk GmbH, eine fiktive Werkstattkette mit vier Filialen in der Region Karlsruhe, die sowohl Fahrräder und E-Bikes als auch Smartphones, Laptops und Kleingeräte repariert. Aus Gesprächen mit dem Werkstattleiter und aus dem Ist-Ablauf ergeben sich vier wiederkehrende Probleme:'),
    ...bullets([
      'Kunden werden nicht zuverlässig informiert, wenn ein Kostenvoranschlag freizugeben oder ein Gerät abholbereit ist. Die Folge sind Rückfragen per Telefon und Geräte, die wochenlang im Lager stehen.',
      'Es gibt keinen zentralen Status je Auftrag. Wer wissen will, wo ein Gerät steht, fragt in der Werkstatt nach.',
      'Ersatzteile werden je Filiale bestellt, obwohl das Teil in einer Nachbarfiliale liegt. Das kostet Zeit und Geld.',
      'Die Auslastung der Techniker ist intransparent, Termine werden nach Gefühl zugesagt.',
    ]),
    H(2, '2.2 Das Startup RepairFlow'),
    P('RepairFlow ist ein Software-Startup, das Werkstätten eine Cloud-Plattform für den gesamten Reparatur-Lebenszyklus anbietet: von der Anfrage des Kunden über Diagnose, Kostenvoranschlag, Ersatzteil-Disposition und Reparatur bis zu Abholung, Rechnung und Reklamation. Wir treten also nicht als Werkstatt auf, sondern als Solution Provider. Die FixWerk GmbH ist unser Pilotkunde, an dessen Prozessen wir die Plattform entwickelt haben.'),
    P('Die Plattform besteht aus vier Modulen: dem Kundenportal mit App, dem Auftrags- und Werkstattmodul, dem Dispositionsmodul für die filialübergreifende Ersatzteilversorgung und der Abrechnung mit Schnittstelle zur Buchhaltung. Zielkunden sind unabhängige Werkstätten und kleine Ketten mit zwei bis zehn Filialen im deutschsprachigen Raum. Das Geschäftsmodell ist ein monatliches Abonnement je Filiale in zwei Stufen: Basis mit Auftragsverwaltung und Kundenkommunikation, Pro mit filialübergreifender Disposition und KI-Sofortdiagnose. ' ),
    H(2, '2.3 Markt und Wettbewerb'),
    P('Werkstattsoftware gibt es bereits, meist entweder für Fahrradwerkstätten (fixdesk, RO App, Repero) oder für Elektronikreparaturen (RepairDesk, RepairShopr). Keine der verbreiteten Lösungen kombiniert beide Reparaturwelten oder deckt die Ersatzteilversorgung über mehrere Filialen ab. RepairFlow unterscheidet sich in drei Punkten: eine Plattform für Fahrrad, E-Bike und Elektronik mit gemeinsamem Ersatzteillager; eine filialübergreifende Ersatzteil-Disposition mit Beständen, Reservierungen und Umlagerungen über alle Standorte; und die KI-Sofortdiagnose, die dem Kunden einen Diagnosevorschlag mit vorläufigem Kostenvoranschlag liefert, bevor er die Werkstatt betritt (Abschnitt 2.6).'),
    H(2, '2.4 Systemkontext und Systemgrenze'),
    P('Abbildung 1 zeigt den Systemkontext. Innerhalb der Systemgrenze liegt die RepairFlow-Plattform mit ihren vier Modulen. Der Werkstattbetrieb ist als Mandant angebunden; seine Rollen Service/Annahme, Techniker, Werkstattleitung und Ersatzteil-Disposition arbeiten in der Oberfläche der Plattform. Der Kunde nutzt das Kundenportal, der Lieferant tauscht Bestellungen, Bestätigungen, Lieferungen und Retouren aus. Der KI-Diagnosedienst ist ein externer Dienst, den die Plattform für die Auswertung von Foto, Video und Ton aufruft.'),
    ...figure('uml2/systemkontext.png', 'Systemkontext der RepairFlow-Plattform', 600),
    P('Bewusst außerhalb der Systemgrenze liegen die physische Reparatur selbst, die Systeme der Lieferanten und die Buchhaltung. An die Buchhaltung wird nur über eine Exportschnittstelle übergeben. Diese Abgrenzung ist die Grundlage für das Use-Case-Diagramm in Abschnitt 5.3.'),
    H(2, '2.5 Der Reparaturauftrag als Zustandsautomat'),
    P('Kern der Plattform ist der Reparaturauftrag. Er durchläuft einen festen Lebenszyklus, den alle Modelle gemeinsam verwenden: angenommen, in Diagnose, KVA offen, freigegeben oder abgelehnt, Teile bestellt, in Reparatur, fertig, abgeholt. Die zehn Geschäftsprozesse in Kapitel 5 sind die Übergänge dieses Automaten, das Klassendiagramm führt ihn als Attribut status mit der Aufzählung AuftragStatus, und die Sequenzdiagramme markieren jeden Statuswechsel. Abbildung 2 zeigt den Zustandsautomaten als UML-Zustandsdiagramm.'),
    ...figure('uml2/zustand-reparaturauftrag.png', 'Zustandsdiagramm der Klasse Reparaturauftrag', 430),
    H(2, '2.6 Alleinstellungsmerkmal: die KI-Sofortdiagnose'),
    P('Der Dozent hat uns bei der Konzeptvorstellung geraten, dem Produkt etwas hinzuzufügen, das es von Mitbewerbern abhebt und ruhig visionär sein darf. Wir haben uns für die KI-Sofortdiagnose entschieden, weil sie genau an dem Punkt ansetzt, der Werkstattkunden am meisten stört: der Ungewissheit, was die Reparatur kostet und wie lange sie dauert.'),
    P('So funktioniert sie: Der Kunde lädt in der RepairFlow-App ein Foto des Schadens, ein Video oder eine Tonaufnahme hoch, etwa das Klackern eines E-Bike-Motors, und beschreibt die Symptome. Der KI-Diagnosedienst erkennt Gerätetyp und wahrscheinliche Fehlerursache und nennt die vermutlich benötigten Ersatzteile. RepairFlow berechnet daraus einen vorläufigen Kostenvoranschlag, prüft die Teileverfügbarkeit in allen Filialen und schlägt Filiale und Termin vor. Bestätigt der Kunde, entsteht eine Voranmeldung, und die benötigten Teile werden bereits vorreserviert. Bei der Annahme in der Werkstatt werden die Daten übernommen, der Techniker prüft den Vorschlag und bestätigt oder korrigiert ihn. Unser Slogan dafür: KVA in 60 Sekunden.'),
    P('Technisch ist ein Teil davon heute machbar, etwa die Erkennung sichtbarer Schäden wie eines gebrochenen Displays oder einer abgerissenen Kette per Bildanalyse. Die Auswertung von Motorgeräuschen oder die Schätzung von Arbeitszeiten aus einem Video sind dagegen Vision. Deshalb bleibt der Vorschlag im Modell ausdrücklich unverbindlich: Der Kostenvoranschlag trägt den Status „vorläufig", der Techniker muss ihn bestätigen, und bei nicht auswertbaren Medien fragt das System nach einer besseren Aufnahme. Medien werden nur mit Einwilligung des Kunden verarbeitet und nach Abschluss des Auftrags gelöscht.'),
    P('In den Modellen findet sich das Feature als Prozess 01 (KI-Sofortdiagnose und Voranmeldung), als Use Cases „Sofortdiagnose anfordern", „Voranmeldung bestätigen" und „Diagnosevorschlag prüfen", als Klassen Voranmeldung, Medienanhang und KIDiagnosevorschlag sowie als Sequenzdiagramm SD1.'),
  ];
}

function chapter3() {
  return [
    H(1, '3 Vorgehen bei der Umsetzung'),
    P('Wir sind in sechs Schritten vorgegangen, die sich an der in der Vorlesung vermittelten Reihenfolge Geschäftsprozessanalyse, Automatisierungspotential und objektorientierte Analyse orientieren.'),
    table([600, 2600, 6160], ['Schritt', 'Phase', 'Inhalt und Ergebnis'], [
      ['1', 'Themenfindung', 'Sammlung von Startup-Ideen, Bewertung nach Prozessreichtum und Automatisierungspotential, Entscheidung für das Werkstatt-Szenario mit der FixWerk GmbH als Referenz.'],
      ['2', 'Konzeptvorstellung', [[run('Vorstellung des Konzepts beim Dozenten im Kickoff-Pitch am 31.08.2026. Rückmeldung: Perspektive klären (Betreiber oder Solution Provider) und ein Alleinstellungsmerkmal ergänzen. Entscheidung für Solution Provider und KI-Sofortdiagnose, dokumentiert im Entscheidungslog. ', { size: 19 }), TODO('Datum des Pitches prüfen')]]],
      ['3', 'Prozessanalyse', 'Aufnahme der Ist-Abläufe beim Pilotkunden, Ableitung der Soll-Prozesse mit RepairFlow, Festlegung der Prozessliste mit zehn Kollaborationsdiagrammen und der Namenskonventionen als Single Source of Truth.'],
      ['4', 'BPMN-Modellierung', 'Modellierung der zehn Prozesse nach den Regeln der Vorlesung: Pool je Unternehmen, Lanes je Rolle, Automatisierung über Aktivitätstypen, Empty Pools für Kunde und Lieferant, Datenobjekte und Datenspeicher. Prüfung mit dem Linter des Camunda Modelers.'],
      ['5', 'Objektorientierte Analyse', 'Use-Case-Diagramm aus der Systemgrenze, Klassendiagramm aus den Datenobjekten der Prozesse, fünf Sequenzdiagramme zu den interaktionsreichsten Use Cases, Zustandsdiagramm des Reparaturauftrags. Umsetzung in Visual Paradigm mit Teamwork-Server.'],
      ['6', 'Dokumentation und Präsentation', 'Projektdokumentation, Abschlusspräsentation mit Zuordnung der Vortragenden, Zusammenstellung des Abgabe-Archivs.'],
    ], { zebra: true }),
    spacer(),
    H(2, '3.1 Werkzeuge'),
    ...bullets([
      [B('Camunda Modeler (Camunda 8) '), run('für die BPMN-Kollaborationsdiagramme. Die Diagramme sind so angereichert, dass das Problems-Panel des Modelers keine Fehler meldet: Task-Definitionen für automatisierte Aktivitäten, Message-Subscriptions für empfangende Elemente, ISO-Dauern für Timer und FEEL-Bedingungen an allen Gateway-Ausgängen.')],
      [B('Visual Paradigm 18 '), run('für Use-Case-, Klassen- und Sequenzdiagramme, mit dem Teamwork-Server der DHBW als gemeinsamem Repository (WWI25B4G1). Das Klassen- und Use-Case-Modell haben wir zusätzlich als XMI vorgehalten, damit es tool-unabhängig importierbar bleibt.')],
      [B('GitHub '), run('als gemeinsames Repository für BPMN-Dateien, Dokumentation, Entscheidungslog und Präsentation, mit Branches, Pull Requests und Review durch ein anderes Teammitglied.')],
      [B('PlantUML '), run('als textuelle Zwischenform der UML-Modelle. Aus einer gemeinsamen Modellbeschreibung entstehen Diagrammbilder für Dokumentation und Präsentation sowie die XMI-Datei für Visual Paradigm; so bleiben Klassennamen, Attribute und Operationen an allen Stellen identisch.')],
      [B('Trello '), run('für Product Backlog, Sprint Backlogs und den Bearbeitungsstatus der Aufgaben (Abschnitt 4.3).')],
    ]),
    H(2, '3.2 Konventionen'),
    P('Damit die drei Modelle zusammenpassen, haben wir uns früh auf Regeln festgelegt, die im Repository dokumentiert sind:'),
    ...bullets([
      'Datenobjekte in BPMN tragen die Klassennamen des Klassendiagramms, bei Bedarf mit Zustand in eckigen Klammern, zum Beispiel „Reparaturauftrag [freigegeben]".',
      'Aktivitäten sind als Verb mit Objekt benannt („Kundendaten erfassen"), Ereignisse im Partizip Perfekt („Auftrag angenommen").',
      'Je Diagramm gibt es ein Start- und ein Endereignis; alternative Ausgänge werden vor dem Ende zusammengeführt.',
      'Die Rollen Kunde, Techniker, Disponent und Werkstattleiter sind in BPMN Lanes beziehungsweise Pools, im Use-Case-Diagramm Akteure und in den Sequenzdiagrammen Akteure.',
      'Die Statuswerte des Reparaturauftrags sind in allen Modellen identisch mit der Aufzählung AuftragStatus.',
      'Dateien im Repository tragen keine Umlaute und keinen Projekt-Präfix; Diagrammquelle (.puml, .bpmn) und Bild (.png) haben denselben Basisnamen, und ein Bild wird nie ohne seine Quelle ausgetauscht.',
    ]),
    H(2, '3.3 Qualitätssicherung'),
    P('Jedes Artefakt durchläuft eine Definition of Done: Ablage im Git-Repository über einen Pull Request mit Review durch eine zweite Person, Ablage im jeweiligen Fach-Repository (Camunda beziehungsweise VP-Teamwork-Server), Einhaltung der Namens- und Modellierungskonventionen und Abnahme über die QA-Checkliste des Qualitätsmanagers. Die BPMN-Dateien prüfen wir zusätzlich automatisiert mit zwei Werkzeugen: dem Linter des Camunda Modelers (Problems-Panel, Regelsatz Camunda 8.7) und dem allgemeinen bpmnlint-Regelsatz „recommended". Geprüft werden unter anderem: genau ein Startereignis, kein Flussobjekt ohne Ein- und Ausgang, Bedingungen an allen Ausgängen exklusiver Gateways, keine Zusammenführung mit einem Verzweigungs-Gateway, Beschriftung aller Aktivitäten und Ereignisse, gültige Endpunkte aller Nachrichtenflüsse. Beide Prüfungen laufen für alle zehn Diagramme ohne Befund.'),
    P('Für die UML-Modelle gilt die Konsistenzregel „Botschaft = Operation der Klasse": Jede Lebenslinie eines Sequenzdiagramms ist eine Klasse oder ein Akteur des Klassen- beziehungsweise Use-Case-Diagramms, jede Botschaft eine dort definierte Operation. Die Prüfung erfolgt beim Review, die Abweichungen und ihre Korrekturen stehen in Kapitel 6.'),
    P([TODO('Nach Sprint 2 ergänzen, wie die Reviews tatsächlich abgelaufen sind: Anzahl der Befunde, typische Fehler')]),
  ];
}

function chapter4() {
  return [
    H(1, '4 Projektmanagement'),
    H(2, '4.1 Vorgehensmodell und Arbeitsweise'),
    P('Das Projekt ist nach Scrum organisiert (Vorlesung Kapitel 2): Der Product Owner priorisiert den Product Backlog und nimmt Ergebnisse im Sprint Review ab, der Scrum Master moderiert die Rituale und pflegt das Board, das Projektteam bearbeitet den Sprint Backlog, wobei jede Aufgabe genau einer Person zugeordnet ist. Abweichend vom reinen Scrum gibt es eine Projektleitung als Ansprechpartnerin für den Dozenten, wie es die Aufgabenstellung verlangt.'),
    P([run('Als Sprint-Takt dienen die Gruppentermine in Präsenz (jeweils 4:15 Stunden): Jeder Termin beginnt mit Sprint Review und Retrospektive des vorangegangenen Sprints und dem Sprint Planning des nächsten; das Feedback des Dozenten aus dem Coaching wird direkt im Planning eingeplant. Zwischen den Terminen arbeiten wir asynchron über das Repository und stimmen uns in einem wöchentlichen Kurz-Meeting online ab. '), TODO('Kommunikationskanal und Wochentag des Online-Meetings eintragen')]),
    H(2, '4.2 Sprintplan und Meilensteine'),
    table([1300, 2000, 2000, 4060], ['Sprint', 'Zeitraum', 'Ziel', 'Ergebnisse'], [
      ['Sprint 1', '02.09.2026 (Gruppentermin)', 'Alle Diagramme erstellen und im Zweierteam prüfen', 'Rollen und Konventionen festgelegt, Entscheidung Solution Provider und KI-Sofortdiagnose, Repository-Struktur, Trello-Board; zehn BPMN-Diagramme je zwei Personen zugeordnet und vom Teampartner gegen die QA-Checkliste geprüft; Use-Case- und Klassendiagramm für Visual Paradigm vorbereitet; Dokumentationsgerüst'],
      ['Sprint 2', '03.09. bis 05.10.2026', 'Korrekturen und Verhalten', 'Review-Befunde in den BPMN-Dateien einarbeiten, Modelle im Camunda Modeler nachziehen, Sequenzdiagramme als Unterdiagramme der Use Cases in Visual Paradigm, Dokumentationskapitel 1 bis 4'],
      ['Sprint 3', '06.10. bis 15.10.2026', 'Fertigstellung', 'BPMN-Freeze mit BPMN-Archiv, UML-Freeze mit VPP-Datei, Dokumentation fertig, Folien mit finalen Diagrammen, Sprechtexte'],
      ['Sprint 4', '16.10. bis 22.10.2026', 'Generalprobe', 'Kompletter Probedurchlauf mit Zeitmessung und Fragenrunde, letzte Korrekturen, Retrospektive'],
      ['Abschluss', '27.10.2026, 09:00 Uhr, Raum B458; Abgabe bis 13.11.2026, 23:59 Uhr', 'Präsentation und Abgabe', '15 bis 20 Minuten im Plenum, alle Gruppenmitglieder tragen vor; Kapitel 6 und 7 abschließen; Abgabe-Archiv Fallstudie-WWI25B4-Gruppe1.zip über Moodle, jede Person lädt es selbst hoch'],
    ], { zebra: true }),
    spacer(),
    P('Fixpunkte des Zeitplans sind die vier Gruppentermine am 02.09., 05.10., 15.10. und 22.10.2026 (jeweils 4:15 Stunden), die Abschlusspräsentation am 27.10.2026 laut Moodle-Ankündigung und die Abgabe am 13.11.2026.'),
    H(2, '4.3 Aufgabensteuerung mit Trello'),
    P('Das Trello-Board der Gruppe ist bewusst einfach gehalten: Eine Liste je Termin (02.09., 05.10., 15.10., 22.10., 27.10. und 13.11.2026) enthält die Karten, die bis zu diesem Termin erledigt sein müssen. Jede Karte nennt genau eine verantwortliche Person und, wo ein Diagramm entsteht, den Teampartner als Prüfer (Vier-Augen-Prinzip). Am ersten Gruppentermin waren das zehn Karten für die BPMN-Diagramme (je zwei pro Person), je eine Karte für Use-Case- und Klassendiagramm, Dokumentationsgerüst, QA-Checkliste und Sprint-Protokoll; die folgenden Listen enthalten die Korrekturen, Sequenzdiagramme, Dokumentation, Folien, Generalprobe, Präsentation und Abgabe. Erledigte Karten werden abgehakt, sodass der Dozent den Stand je Termin auf einen Blick sieht.'),
    P([TODO('Screenshot des Trello-Boards (Stand 05.10.) einfügen; tatsächliche Sprint-Ergebnisse und Abweichungen vom Plan beschreiben')]),
    H(2, '4.4 Zusammenarbeit im Repository'),
    P('Änderungen am gemeinsamen Stand laufen über einen Git-Workflow, den wir in der README des Repositories festgehalten haben: keine direkten Commits auf main, ein Branch je Aufgabe, Pull Request mit Beschreibung, Review durch ein anderes Teammitglied, Definition of Done. Commit-Nachrichten tragen einen Termin-Stempel und ein Conventional-Commit-Präfix nach dem Muster [T03 2026-09-02] docs: update class diagram, damit im Log erkennbar bleibt, zu welchem Gruppentermin ein Stand gehört. Das Repository ist nach Artefakten gegliedert (bpmn, uml, doku, praesi); Entscheidungen, die mehr als eine Person betreffen, stehen mit Datum, Begründung und Auswirkung im Entscheidungslog, Rückmeldungen des Dozenten in einer eigenen Datei.'),
    P('Die Modellierungswerkzeuge haben jeweils ein eigenes Repository (Camunda beziehungsweise VP-Teamwork-Server); zusätzlich liegen Exporte und lokale Sicherungen (BPMN-XML, PlantUML, XMI, VPP) im Git, damit jederzeit ein vollständiger Stand wiederhergestellt werden kann. Office-Dateien lassen sich nicht mergen; wer Dokumentation oder Folien bearbeitet, stimmt das vorher im Team ab.'),
    H(2, '4.5 Risiken und Gegenmaßnahmen'),
    table([3000, 1600, 4760], ['Risiko', 'Bewertung', 'Gegenmaßnahme'], [
      ['Modelle laufen auseinander (Namen, Status, Rollen)', 'hoch', 'Namenskonventionen als Single Source of Truth, Konsistenzprüfung durch den Qualitätsmanager vor jedem Merge, Konsistenztabelle in Abschnitt 5.4'],
      ['Parallel entstandene Entwürfe (mehrere Fassungen der Modelle)', 'hoch', 'Ein Stand im Repository ist verbindlich; abweichende Entwürfe werden verglichen, die besseren Teile übernommen und die Entscheidung im Entscheidungslog festgehalten'],
      ['VP-Teamwork-Server nur im DHBW-Netz erreichbar', 'mittel', 'Lehre-VPN eingerichtet, regelmäßige lokale Sicherung der VPP-Datei über „Save Project As", XMI-Export im Git'],
      ['Umfang der zehn Diagramme unterschätzt', 'mittel', 'Prozessspezifikation vor der Modellierung, Generierung der Rohdiagramme, Nacharbeit im Modeler, Sprint 0 für das Setup'],
      ['Ausfall eines Gruppenmitglieds vor der Präsentation', 'niedrig', 'Jeder Teil der Präsentation hat eine Vertretung, Folien liegen im Repository'],
      ['KI-Feature wirkt unrealistisch', 'niedrig', 'Klare Trennung von heute Machbarem und Vision in Dokumentation und Präsentation'],
    ], { zebra: true }),
    spacer(),
  ];
}

function chapter5() {
  const out = [
    H(1, '5 Überblick über die erstellten Artefakte'),
    H(2, '5.1 Geschäftsprozessmodell (BPMN)'),
    P('Wir haben zehn Soll-Prozesse unserer Kunden als BPMN-2.0-Kollaborationsdiagramme modelliert. Die Prozesse 01 bis 08 bilden die durchgehende Auftragsreise entlang des Zustandsautomaten, 09 und 10 sind angebundene Teilprozesse für Reklamation und Retoure. Tabelle 1 fasst die Prozesse zusammen, Anhang B zeigt alle Diagramme in voller Größe. Die Diagramme liegen im Repository unter bpmn/p01-sofortdiagnose.bpmn bis bpmn/p10-retoure.bpmn und als XML-Export in BPMN-WWI25B4-Gruppe1.zip.'),
    processMapTable(),
    caption('Tabelle 1: Prozesslandkarte mit Kennzahlen der zehn Kollaborationsdiagramme'),
    P('Insgesamt enthalten die zehn Diagramme ' + TOTAL_ACT + ' Aktivitäten, im Durchschnitt also ' + (TOTAL_ACT / 10).toFixed(1) + ' je Diagramm, dazu ' + TOTAL_MSG + ' Nachrichtenflüsse zwischen den Pools und ' + TOTAL_DATA + ' Datenobjekte und Datenspeicher. Jeder Prozess hat genau ein Start- und ein Endereignis; alternative Ausgänge werden mit exklusiven Gateways zusammengeführt.'),
    H(3, '5.1.1 Modellierungskonventionen'),
    P('Der Pool ist der Werkstattbetrieb, in dem die Plattform läuft, mit dem Pilotkunden FixWerk als Beispiel. Seine Lanes sind die Rollen Service/Annahme, Techniker, Werkstattleitung und Ersatzteil-Disposition; je Diagramm sind nur die beteiligten Lanes gezeichnet. Kunde und Lieferant sind eigene Unternehmen und deshalb eigene Pools, als Empty Pools ohne innere Logik, mit denen ausschließlich über Nachrichtenflüsse kommuniziert wird. Eine Lane für die Software gibt es bewusst nicht, weil Rechenleistung keine Ressource im Sinne der Prozessmodellierung ist. Wo RepairFlow arbeitet, zeigt stattdessen der Aktivitätstyp:'),
    table([2400, 6960], ['Aktivitätstyp', 'Bedeutung in RepairFlow'], [
      ['Automatisierte Aktivität (Service Task)', 'RepairFlow erledigt den Schritt ohne menschliches Zutun, zum Beispiel Statuswechsel, KVA-Berechnung, Verfügbarkeitsprüfung, Rechnungserstellung.'],
      ['Geschäftsregel-Aktivität (Business Rule Task)', 'Eine regelbasierte oder KI-gestützte Entscheidung, zum Beispiel KI-Diagnosevorschlag, Wirtschaftlichkeitsprüfung, Gewährleistungsbewertung, Meldebestandsprüfung.'],
      ['Sendende / empfangende Aktivität', 'Nachricht an Kunde oder Lieferant über RepairFlow beziehungsweise Warten auf eine Antwort, zum Beispiel KVA senden, Auftragsbestätigung empfangen.'],
      ['Benutzer-Aktivität (User Task)', 'Ein Mitarbeiter arbeitet in der RepairFlow-Oberfläche, zum Beispiel Kundendaten erfassen, Fehlerbefund dokumentieren, Wareneingang buchen.'],
      ['Manuelle Aktivität', 'Außerhalb der Software, zum Beispiel Sichtprüfung, Reparaturschritt ausführen, Gerät übergeben.'],
      ['Aufruf-Aktivität (Call Activity)', 'Verweis auf einen anderen der zehn Prozesse, zum Beispiel „05 Ersatzteile disponieren" aus dem KVA-Prozess.'],
    ], { zebra: true }),
    spacer(),
    P('Datenobjekte hängen an den Aktivitäten, die sie erzeugen oder lesen, und tragen die Klassennamen des Klassendiagramms mit dem jeweiligen Zustand. Datenspeicher stehen für Objektmengen: die RepairFlow-Datenbank für Aufträge und Bestände, der Technikerplan für die Kapazitäts- und Terminplanung (Prozess 02) und die Buchhaltung, an die bezahlte Rechnungen per DATEV-Export übergeben werden (Prozess 08). Wartesituationen mit mehreren möglichen Ereignissen, etwa Freigabe, Ablehnung oder Fristablauf beim Kostenvoranschlag, modellieren wir mit ereignisbasierten Gateways; die Prüfung je Ersatzteil in Prozess 05 ist ein paralleler Mehrfach-Teilprozess.'),
    H(3, '5.1.2 Die zehn Prozesse'),
  ];
  for (const s of STATS) {
    out.push(P([B(s.num + ' ' + s.name + '. '), run(PROCESS_TEXT[s.num])]));
  }
  out.push(
    H(2, '5.2 Automatisierungspotential'),
    P('Von den ' + TOTAL_ACT + ' Aktivitäten sind ' + TOTAL_AUTO + ' automatisierte, regelbasierte, sendende oder empfangende Aktivitäten, also ' + Math.round(100 * TOTAL_AUTO / TOTAL_ACT) + ' Prozent, die RepairFlow ohne manuelle Arbeit ausführt. Weitere ' + STATS.reduce((a, s) => a + (s.kinds.user || 0), 0) + ' Benutzer-Aktivitäten laufen in der Oberfläche der Plattform. Nur ' + STATS.reduce((a, s) => a + (s.kinds.manual || 0), 0) + ' Aktivitäten sind manuell und liegen außerhalb der Systemgrenze. Die Software, die wir in der objektorientierten Analyse entwerfen, automatisiert damit den Reparaturauftrags-Lebenszyklus als zentrales Werkstatt-Management-System:'),
    ...bullets([
      'Statusführung des Reparaturauftrags über alle Übergänge des Zustandsautomaten, inklusive Fristen und Erinnerungen.',
      'Kundenkommunikation an jedem Statusübergang: Sofortdiagnose, Annahmebeleg, Kostenvoranschlag, Lieferverzögerung, Reparaturbeginn, Abholung, Rechnung, Bewertung.',
      'Berechnung von Kostenvoranschlägen und Rechnungen aus Positionen, Ersatzteilpreisen und Arbeitszeitbuchungen.',
      'Filialübergreifende Ersatzteil-Disposition mit Verfügbarkeitsprüfung, Reservierung, Umlagerung, Nachbestellvorschlag bei Meldebestand und Lieferantenbestellung.',
      'Regelbasierte Entscheidungen: Wirtschaftlichkeit der Reparatur, Gewährleistungsfall, Freigabegrenze für Bestellungen.',
      'KI-Sofortdiagnose als vorgelagerter Prozess mit Diagnosevorschlag, vorläufigem Kostenvoranschlag und Vorreservierung.',
    ]),
    H(2, '5.3 Objektorientierte Analyse (UML)'),
    P('Die objektorientierte Analyse folgt der Reihenfolge aus der Vorlesung: Use-Case-Diagramm, je Use Case ein Interaktionsdiagramm, Klassendiagramm, Zustandsdiagramm je Klasse mit Lebenszyklus. Alle Diagramme liegen im Visual-Paradigm-Projekt UML-WWI25B4-Gruppe1.vpp; die Sequenzdiagramme sind dort als Unterdiagramme der zugehörigen Use Cases angelegt.'),
    H(3, '5.3.1 Use-Case-Diagramm'),
    P('Das Use-Case-Diagramm beschreibt, was RepairFlow aus Sicht seiner Benutzer leistet. Es enthält 18 Use Cases in vier Bereichen (Kundenportal, Auftrag und Werkstatt, Ersatzteil-Disposition, Administration) und sieben Akteure. Primäre Akteure sind Kunde, Techniker, Disponent, Werkstattleiter und Werkstattinhaber; Lieferant und KI-Diagnosedienst sind sekundäre, externe Akteure.'),
    ...figure('uml2/usecase.png', 'Use-Case-Diagramm RepairFlow', 600, 560),
    P('Die Beziehungen zwischen den Use Cases folgen der Regel: include für einen Teilschritt, der immer ausgeführt wird, extend für bedingtes Verhalten. So schließt „KVA erstellen" immer „Diagnosebefund erfassen" ein, „Ersatzteil reservieren" immer „Ersatzteil-Verfügbarkeit prüfen" und „Rechnung erstellen und Zahlung erfassen" immer die Fertigmeldung. „Voranmeldung bestätigen" erweitert die Sofortdiagnose nur dann, wenn der Kunde den Vorschlag annimmt; „Diagnosevorschlag prüfen" erweitert die Befunderfassung nur, wenn ein KI-Vorschlag vorliegt; „Nachbestellvorschlag bei Meldebestand" erweitert die Verfügbarkeitsprüfung nur bei unterschrittenem Meldebestand; „Reklamation bearbeiten" erweitert den Abschluss nur im Ausnahmefall.'),
    H(3, '5.3.2 Klassendiagramm'),
    P('Das Klassendiagramm umfasst 26 Klassen, darunter die abstrakten Klassen Person und Mitarbeiter, sowie sieben Aufzählungen und 34 Assoziationen. Das vollständige Diagramm liegt im Repository (uml/klassen.png) und im Visual-Paradigm-Projekt; die folgenden zwei Abbildungen zeigen die Ausschnitte Kundenkontakt und Auftragsabwicklung. Die wichtigsten Entwurfsentscheidungen:'),
    ...bullets([
      [B('Reparaturauftrag als Aggregatwurzel. '), run('Gerät, Fehlerbefund, Kostenvoranschlag und Reparaturschritte existieren nur mit ihrem Auftrag und sind deshalb Kompositionen. Der Auftrag hält den Status und damit die Methode wechsleStatus(); die Statuswerte sind die Aufzählung AuftragStatus.')],
      [B('Lagerbestand je Filiale. '), run('Ein Ersatzteil ist ein Stammdatum, sein Bestand aber je Filiale verschieden. Erst die eigene Klasse Lagerbestand zwischen Ersatzteil und Filiale macht die filialübergreifende Verfügbarkeitsprüfung möglich: Man iteriert über alle Lagerbestände desselben Teils.')],
      [B('ErsatzteilReservierung als eigene Klasse. '), run('Eine Reservierung hat Menge, Datum und einen eigenen Lebenszyklus (vorreserviert, reserviert, entnommen, storniert). Sie hängt an einem Lagerbestand und wahlweise an einem Reparaturauftrag oder, bei der Sofortdiagnose, an einer Voranmeldung.')],
      [B('Werkstattbetrieb als Mandant. '), run('Als Solution Provider bedienen wir viele Werkstätten. Der Werkstattbetrieb steht als Mandant über seinen Filialen und Technikern; jedes Datum der Plattform gehört zu genau einem Mandanten.')],
      [B('Voranmeldung, Medienanhang und KIDiagnosevorschlag. '), run('Diese drei Klassen tragen die KI-Sofortdiagnose. Der Vorschlag erzeugt einen vorläufigen Kostenvoranschlag, verweist auf die vermutlich benötigten Ersatzteile und wird durch den Fehlerbefund des Technikers bestätigt oder korrigiert.')],
      [B('Rollen als Klassen. '), run('Die abstrakte Klasse Mitarbeiter mit den Unterklassen Techniker, Disponent und Werkstattleiter entspricht den Lanes der Prozessmodelle und den Akteuren des Use-Case-Diagramms. Jede Rolle trägt die Operationen, die sie in den Prozessen ausführt, zum Beispiel weiseTechnikerZu() und gibBestellungFrei() beim Werkstattleiter oder loeseBestellungAus() beim Disponenten.')],
      [B('Zuständigkeitsprinzip. '), run('Methoden liegen bei der Klasse, die die Daten besitzt: berechneSumme() beim Kostenvoranschlag, pruefeVerfuegbarkeit() beim Lagerbestand, pruefeGewaehrleistung() bei der Reklamation, gibKvaFrei() und meldeMangel() beim Kunden.')],
    ]),
    ...figure('uml2/klassen-fokus-1-sofortdiagnose.png', 'Klassendiagramm, Ausschnitt Kundenkontakt und KI-Sofortdiagnose', 600, 520),
    ...figure('uml2/klassen-fokus-2-auftrag.png', 'Klassendiagramm, Ausschnitt Auftragsabwicklung', 600, 520),
    H(3, '5.3.3 Sequenzdiagramme'),
    P('Für sechs Use Cases mit vielen Interaktionen haben wir Sequenzdiagramme erstellt (gefordert waren fünf). Die Lebenslinien sind Objekte der Klassen aus dem Klassendiagramm, die Botschaften entsprechen deren Operationen, und die kombinierten Fragmente alt, opt und loop bilden Verzweigungen, optionale Schritte und Schleifen ab.'),
    ...figure('uml2/sequenz-01-sofortdiagnose.png', 'SD1 – Sofortdiagnose anfordern (UC01)', 600, 520),
    P('SD1 zeigt den Kern des Alleinstellungsmerkmals: Die Voranmeldung lässt jeden Medienanhang analysieren, erzeugt über den KIDiagnosevorschlag einen vorläufigen Kostenvoranschlag, prüft je Ersatzteil und Filiale den Lagerbestand und holt freie Termine der Filiale. Das äußere alt unterscheidet auswertbare von nicht auswertbaren Medien, das innere alt die Bestätigung des Kunden vom Fristablauf; das opt reserviert Teile nur, wenn sie verfügbar sind.'),
    ...figure('uml2/sequenz-02-kva-freigabe.png', 'SD2 – KVA freigeben / ablehnen (UC07)', 600, 480),
    P('SD2 beschreibt die Freigabeschleife: Der Techniker baut den Kostenvoranschlag aus Positionen auf, der Auftrag wechselt auf „KVA offen", die loop erinnert den Kunden bis zur Reaktion, und das alt verzweigt in Freigabe (Start der Disposition) oder Ablehnung (Abholaufforderung ohne Reparatur).'),
    ...figure('uml2/sequenz-03-reservierung.png', 'SD3 – Ersatzteil reservieren, filialübergreifend (UC09)', 600, 520),
    P('SD3 ist der fachliche Mehrwert der Disposition: Je Teil prüft der Disponent zuerst den eigenen Lagerbestand, dann in einer Schleife die anderen Filialen. Das verschachtelte alt entscheidet zwischen lokaler Reservierung, Reservierung mit Umlagerung und Fehlteilmeldung; das opt erzeugt bei unterschrittenem Meldebestand einen Nachbestellvorschlag.'),
    ...figure('uml2/sequenz-04-fertigmeldung.png', 'SD4 – Auftrag fertigmelden und Kunde benachrichtigen (UC14)', 600, 440),
    P('SD4 knüpft den Statuswechsel auf „fertig" an die Bedingung, dass alle Reparaturschritte abgeschlossen sind. Erst dann entsteht die Rechnung und der Kunde wird benachrichtigt, wahlweise zusätzlich per Push-Nachricht der App.'),
    ...figure('uml2/sequenz-05-reklamation.png', 'SD5 – Reklamation bearbeiten (UC16)', 600, 480),
    P('SD5 zeigt die Gewährleistungsentscheidung anhand von Reparatur- und Rechnungsdatum. Im Gewährleistungsfall startet ein neuer, kostenfreier Auftragszyklus; sonst erhält der Kunde ein Angebot, das in einen neuen Kostenvoranschlag und damit zurück in SD2 mündet oder zur Schließung ohne Reparatur führt.'),
    ...figure('uml2/sequenz-06-nachbestellvorschlag.png', 'SD6 – Nachbestellvorschlag bei Meldebestand und Lieferantenbestellung auslösen (UC12, UC10)', 600, 480),
    P('SD6 verbindet Disposition und Beschaffung: Ein Abgang am Lagerbestand löst die Meldebestandsprüfung aus. Ist der Meldebestand unterschritten, erhält der Disponent einen Nachbestellvorschlag, ermittelt den Vorzugslieferanten und ergänzt entweder eine offene Bestellung oder löst eine neue aus. Das opt holt oberhalb der Freigabegrenze die Freigabe des Werkstattleiters ein, bevor die Bestellung übermittelt und mit dem Liefertermin des Lieferanten bestätigt wird; das entspricht Prozess 06.'),
    H(2, '5.4 Konsistenz zwischen den Modellen'),
    P('Die drei Modelle sind über drei Klammern verbunden: Erstens tragen die Datenobjekte der BPMN-Diagramme die Klassennamen des Klassendiagramms, teilweise mit dem Zustand in eckigen Klammern. Zweitens entsprechen die Lanes und Pools der Prozesse den Akteuren des Use-Case-Diagramms und den Unterklassen von Mitarbeiter beziehungsweise der Klasse Kunde. Drittens folgen Sequenzdiagramme, Datenobjekt-Zustände und Zustandsdiagramm demselben Zustandsautomaten, sodass jeder Statuswechsel in genau einem Prozess, einer Operation und einem Zustandsübergang wiederzufinden ist. Tabelle 2 zeigt die Zuordnung.'),
    table([1900, 2200, 3100, 2160], ['Prozess (BPMN)', 'Use Cases', 'Zentrale Klassen', 'Sequenzdiagramm'], [
      ['01 KI-Sofortdiagnose und Voranmeldung', 'UC01, UC02, UC08', 'Kunde, Voranmeldung, Medienanhang, KIDiagnosevorschlag, Kostenvoranschlag [vorläufig]', 'SD1'],
      ['02 Auftragsannahme und Terminplanung', 'UC03, UC17', 'Reparaturauftrag [angenommen], Geraet, Filiale, Werkstattleiter', '–'],
      ['03 Fehlerdiagnose', 'UC04, UC05', 'Fehlerbefund, Techniker, KIDiagnosevorschlag', '–'],
      ['04 Kostenvoranschlag und Kundenfreigabe', 'UC06, UC07', 'Kostenvoranschlag, KvaPosition, Reparaturauftrag [KVA offen, freigegeben, abgelehnt]', 'SD2'],
      ['05 Ersatzteil-Verfügbarkeit und Reservierung', 'UC08, UC09, UC12', 'Disponent, Lagerbestand, ErsatzteilReservierung, Reparaturauftrag [Teile bestellt]', 'SD3'],
      ['06 Ersatzteil-Bestellung', 'UC10, UC11, UC12', 'Lieferantenbestellung, Bestellposition, Lieferant, Werkstattleiter', 'SD6'],
      ['07 Reparaturdurchführung', 'UC13, UC14', 'Reparaturschritt, Arbeitszeitbuchung, Reparaturauftrag [in Reparatur, fertig]', 'SD4'],
      ['08 Abholung, Rechnung und Zahlung', 'UC14, UC15', 'Rechnung, Reparaturauftrag [abgeholt]', 'SD4'],
      ['09 Reklamation und Gewährleistung', 'UC16', 'Reklamation, Kunde, Werkstattleiter', 'SD5'],
      ['10 Ersatzteil-Retoure', 'UC10, UC11', 'Lieferantenbestellung, Lagerbestand, Lieferant', '–'],
    ], { zebra: true }),
    caption('Tabelle 2: Zuordnung von Prozessen, Use Cases, Klassen und Sequenzdiagrammen'),
  );
  return out;
}

function chapter6() {
  return [
    H(1, '6 Probleme und Herausforderungen'),
    P([B('Zwei parallel entstandene Entwürfe. '), run('Zu Beginn des Semesters sind zwei vollständige Entwürfe entstanden: einer aus der Betreiber-Perspektive (FixWerk GmbH als Betreiber, ohne KI-Feature, Camunda 7) und einer aus der Solution-Provider-Perspektive mit KI-Sofortdiagnose (Camunda 8). Statt einen davon zu verwerfen, haben wir beide Artefakt für Artefakt verglichen und zusammengeführt: Grundlage sind die Solution-Provider-Diagramme, weil sie das Dozentenfeedback umsetzen und beide Linter ohne Befund passieren; aus dem Betreiber-Entwurf übernommen wurden die Rollenklassen Mitarbeiter, Disponent und Werkstattleiter, die Datenspeicher Technikerplan und Buchhaltung, das Sequenzdiagramm zum Nachbestellvorschlag, der Abschnitt zur Konsistenz der Modelle sowie Sprintplan und Trello-Board. Die Gegenüberstellung steht im Repository (doku/05-vergleich-und-zusammenfuehrung.md).')]),
    P([B('Pool- und Lane-Struktur. '), run('Ein erster Entwurf modellierte Werkstatt und Ersatzteil-Disposition als getrennte Pools. Nach der Vorlesungsregel „Pool = Unternehmen, Lanes = Rollen" wurde auf einen Pool mit Lanes umgestellt; Kunde und Lieferant blieben eigene Pools. Erst dadurch wurden die Nachrichtenflüsse eindeutig.')]),
    P([B('Perspektive und Zuschnitt. '), run('In der ersten Fassung waren wir gleichzeitig Werkstatt und Softwareanbieter. Die Rückfrage des Dozenten hat uns gezwungen, das zu klären. Die Entscheidung für den Solution Provider hat sich gelohnt: Die Prozesse blieben gültig, aber Texte, Use Cases (Onboarding) und das Klassenmodell (Mandant) mussten nachziehen.')]),
    P([B('Zehn Kollaborationsdiagramme mit je zehn Aktivitäten. '), run('Unsere ursprüngliche Prozessliste enthielt die Terminplanung als eigenen Prozess; sie hatte aber nur einen Pool und wenige Schritte. Wir haben sie als Lane Werkstattleitung in die Auftragsannahme integriert und dafür die KI-Sofortdiagnose als neuen Prozess 01 aufgenommen.')]),
    P([B('Konsistenz über drei Modelle. '), run('Datenobjekte, Klassen, Lebenslinien und Statuswerte müssen wortgleich sein. Frühere Fassungen der Sequenzdiagramme verwendeten „Diagnose" und „Reservierung", das Klassendiagramm „Fehlerbefund" und „ErsatzteilReservierung". Wir haben eine gemeinsame Modellbeschreibung eingeführt, aus der Klassendiagramm, XMI und die Namen in den anderen Modellen stammen.')]),
    P([B('Werkzeuge. '), run('Der Teamwork-Server von Visual Paradigm ist nur über das Lehre-VPN erreichbar, und der Camunda Modeler meldet für Camunda-8-Diagramme technische Details als Fehler, etwa fehlende Task-Definitionen oder Message-Subscriptions. Wir haben uns entschieden, die Diagramme „engine-ready" anzureichern, statt die Fehler zu ignorieren; das entspricht dem in der Vorlesung beschriebenen Weg vom fachlichen zum ausführbaren Modell.')]),
    P([B('Layout großer Diagramme. '), run('Zwölf Aktivitäten, drei Lanes und mehrere Nachrichtenflüsse lassen sich schwer ohne Kreuzungen zeichnen. Wir haben für jedes Diagramm ein Raster festgelegt, in dem Nachrichtenflüsse nur aus der obersten Zeile einer Lane nach außen laufen und Schleifen unterhalb der Zeilen zurückgeführt werden.')]),
    P([B('Vision gegen Machbarkeit. '), run('Die KI-Sofortdiagnose soll beeindrucken, aber nicht unglaubwürdig wirken. Wir trennen deshalb in Modell und Text zwischen dem, was heute mit Bildanalyse geht, und dem, was Vision ist, und halten den Vorschlag im Prozess ausdrücklich unverbindlich.')]),
    P([TODO('Ergänzen: Herausforderungen in der Gruppenarbeit, zum Beispiel Terminfindung, Aufteilung, Git-Konflikte')]),
  ];
}

function chapter7() {
  return [
    H(1, '7 Feedback'),
    H(2, '7.1 Feedback des Dozenten und Umsetzung'),
    P('Bei der Konzeptvorstellung bekamen wir zwei Hinweise: erstens die Perspektive zu klären, zweitens dem Produkt ein Alleinstellungsmerkmal hinzuzufügen, das ruhig visionär sein darf, zum Beispiel KI-Funktionen. Beides haben wir umgesetzt (Abschnitte 2.2 und 2.6) und im Entscheidungslog festgehalten. '),
    P([TODO('Weitere Rückmeldungen aus den Coaching-Terminen und deren Umsetzung ergänzen')]),
    H(2, '7.2 Unser Feedback zur Fallstudie'),
    P('Die Fallstudie hat uns gezeigt, wie viel Abstimmung nötig ist, damit Prozessmodell, Use Cases und Klassenmodell zusammenpassen. Das Wechselspiel aus Coaching-Terminen und eigenständiger Arbeit hat gut funktioniert, weil wir das Feedback direkt einarbeiten konnten. Hilfreich wäre aus unserer Sicht eine frühere Klarstellung gewesen, wie streng die Vorgabe „durchschnittlich zehn Aktivitäten" gemeint ist und ob die Camunda Cloud als Repository verpflichtend ist oder ein eigenes Git-Repository genügt.'),
    P([TODO('Ergänzen: Was hat euch am meisten gebracht, was war zu viel oder zu wenig, was würdet ihr beim nächsten Mal anders machen')]),
  ];
}

function appendixA() {
  return [
    H(1, 'Anhang A: Abgabestruktur'),
    P('Das Abgabe-Archiv Fallstudie-WWI25B4-Gruppe1.zip enthält:'),
    table([3400, 5960], ['Datei', 'Inhalt'], [
      ['Projekt-WWI25B4-Gruppe1.pdf', 'Diese Projektdokumentation (im Repository: doku/Projektdokumentation.docx und .pdf)'],
      ['BPMN-WWI25B4-Gruppe1.zip', 'Die zehn Kollaborationsdiagramme als BPMN-2.0-XML (p01-sofortdiagnose.bpmn bis p10-retoure.bpmn), Export aus dem Camunda Modeler (im Repository: bpmn/)'],
      ['UML-WWI25B4-Gruppe1.vpp', 'Visual-Paradigm-Projekt mit Use-Case-, Klassen-, sechs Sequenz- und einem Zustandsdiagramm (im Repository: uml/ als PlantUML, PNG und XMI)'],
      ['Praesentation-WWI25B4-Gruppe1.pdf', 'PDF-Export der Abschlusspräsentation mit Angabe der Vortragenden je Teil (im Repository: praesi/Abschlusspraesentation.pptx)'],
    ], { zebra: true }),
  ];
}

function appendixB() {
  const out = [H(1, 'Anhang B: Die zehn BPMN-Kollaborationsdiagramme')];
  let first = true;
  for (const s of STATS) {
    if (!first) out.push(pageBreak());
    first = false;
    out.push(...figure('png2_15/' + s.file + '.png', 'Prozess ' + s.num + ' ' + s.name + ' (Pools: ' + s.pools.join(', ') + ')', 960, 560));
  }
  return out;
}

// ------------------------------------------------------------------ assemble
const headerText = 'RepairFlow · Fallstudie Systemanalyse · WWI25B4 · Gruppe 1';
function header() { return new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: 'BFBFBF', space: 4 } }, children: [new TextRun({ text: headerText, font: FONT, size: 18, color: GREY })] })] }); }
function footer() { return new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ children: ['Seite ', PageNumber.CURRENT], font: FONT, size: 18, color: GREY })] })] }); }

const body = [...chapter1(), ...chapter2(), ...chapter3(), ...chapter4(), ...chapter5(), ...chapter6(), ...chapter7(), ...appendixA()];
const appendix = appendixB();
const toc = tocPage();

const doc = new Document({
  creator: 'Gruppe 1 WWI25B4', title: 'RepairFlow – Projektdokumentation Fallstudie Systemanalyse',
  styles: {
    default: { document: { run: { font: FONT, size: 22 } } },
    paragraphStyles: [
      { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { size: 32, bold: true, color: BLUE, font: FONT }, paragraph: { spacing: { before: 360, after: 160 }, outlineLevel: 0 } },
      { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { size: 26, bold: true, color: BLUE, font: FONT }, paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 1 } },
      { id: 'Heading3', name: 'Heading 3', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { size: 23, bold: true, color: '2F5496', font: FONT }, paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 2 } },
    ],
  },
  numbering: {
    config: [
      { reference: 'bullets', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 540, hanging: 270 } } } }] },
      { reference: 'numbers', levels: [{ level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 540, hanging: 270 } } } }] },
    ],
  },
  sections: [
    { properties: { page: { margin: { top: 1300, bottom: 1200, left: 1400, right: 1400 } } }, children: [...titlePage()] },
    { properties: { page: { margin: { top: 1300, bottom: 1200, left: 1400, right: 1400 }, pageNumbers: { start: 1 } } }, headers: { default: header() }, footers: { default: footer() }, children: [...toc, ...body] },
    { properties: { page: { size: { orientation: PageOrientation.LANDSCAPE }, margin: { top: 1000, bottom: 900, left: 1100, right: 1100 } } }, headers: { default: header() }, footers: { default: footer() }, children: appendix },
  ],
});

Packer.toBuffer(doc).then(buf => {
  const out = process.argv[3] || path.join(HERE, 'doku2', 'Projektdokumentation.docx');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, buf);
  fs.writeFileSync(path.join(HERE, 'toc_entries.json'), JSON.stringify(tocEntries, null, 1));
  console.log('written', out, 'headings', tocEntries.length, 'figures', figNo);
});
