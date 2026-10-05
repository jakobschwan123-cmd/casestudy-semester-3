"""Check the active UML model, XMI references and BPMN anchors without extra dependencies."""
from pathlib import Path
import importlib.util
import re
import sys
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("umlmodel", ROOT / "tools/umlmodel.py")
model = importlib.util.module_from_spec(spec)
spec.loader.exec_module(model)
errors = []


def check(condition, message):
    if not condition:
        errors.append(message)


classes = {c[0]: c for c in model.CLASSES}
actors = {a[0]: a[1] for a in model.ACTORS}
usecases = dict(model.USECASES)
parents = dict(model.GENERALIZATIONS)


def operations(class_name):
    result = {}
    while class_name in classes:
        for _, name, params, _ in classes[class_name][4]:
            result[name] = len(params.split(',')) if params else 0
        class_name = parents.get(class_name)
    return result


check(sorted(p.name for p in (ROOT / 'uml').glob('klassen*.puml')) == ['klassen.puml'],
      'Exactly one active class-diagram source is required')
check(sorted(p.name for p in (ROOT / 'uml').glob('klassen*.png')) == ['klassen.png'],
      'Exactly one active class-diagram image is required')
check((ROOT / 'uml/klassen.puml').read_text() == model.class_puml(), 'Class diagram differs from generator')
check((ROOT / 'uml/usecase.puml').read_text() == model.usecase_puml(), 'Use-case diagram differs from generator')
check((ROOT / 'uml/modell.xmi').read_text() == model.xmi(), 'XMI differs from generator')
check(set(model.EXTENDS) == set(model.EXTEND_CONDITIONS), 'Every extend relation needs a condition')
check(sorted(n for _, members in model.PACKAGES for n in members) == sorted(classes),
      'Class-diagram packages must contain each class exactly once')
for actor, cases in model.ACTOR_UC:
    check(actor in actors and all(c in usecases for c in cases), f'Unknown actor/use case: {actor} {cases}')
for pair in model.INCLUDES + model.EXTENDS:
    check(all(c in usecases for c in pair), f'Unknown use-case relation: {pair}')

tree = ET.parse(ROOT / 'uml/modell.xmi')
xmi = '{http://schema.omg.org/spec/XMI/2.1}'
elements = list(tree.getroot().iter())
ids = [e.get(xmi + 'id') for e in elements if e.get(xmi + 'id')]
check(len(ids) == len(set(ids)), 'XMI contains duplicate IDs')
reference_keys = {'type', 'general', 'addition', 'extendedCase', 'subject', 'extensionLocation',
                  'memberEnd', 'association', 'client', 'supplier'}
for element in elements:
    for key, value in element.attrib.items():
        if key in reference_keys:
            for target in value.split():
                check(target in ids, f'Unresolved XMI reference: {key}={target}')
for kind, expected in [('Class', set(classes)), ('Actor', set(actors.values())),
                       ('UseCase', set(usecases.values())), ('Enumeration', set(model.ENUMS))]:
    actual = {e.get('name') for e in elements if e.get(xmi + 'type') == 'uml:' + kind}
    check(actual == expected, f'XMI {kind} elements differ from model')
for element in elements:
    if element.tag == 'extend':
        check(element.find('condition/specification') is not None, 'XMI extend condition missing')

sequences = sorted((ROOT / 'uml').glob('sequenz-*.puml'))
check(len(sequences) == 6, 'Expected all six active sequence diagrams')
calls = 0
anchors = 0
for source in sequences:
    text = source.read_text()
    lifelines = {}
    for name, alias in re.findall(r'^participant\s+"[^"\n]*:\s*(\w+)"\s+as\s+(\w+)', text, re.M):
        check(name in classes, f'{source.name}: unknown class {name}')
        lifelines[alias] = name
    for declaration in re.findall(r'^actor\s+(.+)$', text, re.M):
        parts = declaration.split(' as ')
        name = parts[0].strip('"')
        alias = parts[-1] if len(parts) > 1 else name
        check(name in actors.values(), f'{source.name}: unknown actor {name}')
        lifelines[alias] = name if name in classes else None
    for line in text.splitlines():
        message = re.match(r'\s*(\w+)\s*(->|-->)\s*(\w+)\s*:\s*(.+)', line)
        if not message:
            continue
        sender, arrow, receiver, body = message.groups()
        check(sender in lifelines and receiver in lifelines, f'{source.name}: unknown lifeline in {line}')
        if arrow != '->' or not lifelines.get(receiver):
            continue
        call = re.search(r'(\w+)\(([^()]*)\)', body)
        if call:
            method, args = call.groups()
            available = operations(lifelines[receiver])
            check(method in available, f'{source.name}: {lifelines[receiver]}.{method} is not an operation')
            if method in available:
                check(available[method] == (len(args.split(',')) if args else 0),
                      f'{source.name}: wrong argument count for {method}')
            if method == 'wechsleStatus':
                check(args in model.ENUMS['AuftragStatus'], f'{source.name}: invalid order state {args}')
            calls += 1
        elif '<<create>>' not in body and receiver not in actors:
            # Messages to human actors may use their role aliases (SM/WL).
            check(lifelines[receiver] in actors.values(), f'{source.name}: class message lacks operation: {line}')
    for case in set(re.findall(r'UC\d{2}', text)):
        check(case in usecases, f'{source.name}: unknown ref/use case {case}')
    bpmn = re.search(r"^' BPMN: ([\w-]+\.bpmn)$", text, re.M)
    nodes = re.search(r"^' BPMN-Nodes: (.+)$", text, re.M)
    check(bpmn is not None and nodes is not None, f'{source.name}: BPMN traceability header missing')
    if bpmn and nodes:
        document = ET.parse(ROOT / 'bpmn' / bpmn.group(1))
        bpmn_ids = {e.get('id') for e in document.getroot().iter()}
        for node in nodes.group(1).split():
            check(node in bpmn_ids, f'{source.name}: missing BPMN node {node}')
            anchors += 1
    check(source.with_suffix('.png').exists(), f'{source.name}: PNG missing')

if errors:
    print('\n'.join(errors), file=sys.stderr)
    raise SystemExit(1)
print(f'OK: one class diagram, {len(classes)} classes, {len(model.ENUMS)} enums, '
      f'{len(model.ASSOCIATIONS)} associations; {len(usecases)} use cases, '
      f'{len(model.INCLUDES)} include, {len(model.EXTENDS)} conditional extend; '
      f'{len(sequences)} sequences, {calls} operation calls, {anchors} BPMN anchors; '
      f'{len(ids)} XMI IDs with resolved references')
