import { readFileSync, readdirSync } from 'node:fs';
import { Linter } from './node_modules/@camunda/linting/lib/Linter.js';
import { BpmnModdle } from 'bpmn-moddle';

const dir = process.argv[2] || 'out';
const files = readdirSync(dir).filter(f => f.endsWith('.bpmn')).sort();

const camunda = new Linter({ modeler: 'desktop', type: 'cloud' });
const moddle = new BpmnModdle();

async function main() {
let total = 0;
for (const f of files) {
  const xml = readFileSync(`${dir}/${f}`, 'utf8');
  const reports = await camunda.lint(xml);
  const { rootElement } = await moddle.fromXML(xml);
  const all = reports.map(r => ({ src: 'camunda', ...r }));
  total += all.length;
  console.log(`\n== ${f}: ${all.length} finding(s)`);
  for (const r of all) {
    console.log(`  [${r.src}] ${r.category || ''} ${r.rule || ''} ${r.id || ''}: ${r.message}`);
  }
}
console.log(`\nTOTAL findings: ${total}`);
}
main().catch(e => { console.error(e); process.exit(1); });
