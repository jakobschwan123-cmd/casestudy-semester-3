"""
BPMN 2.0 generator for the RepairFlow case study.

Produces Camunda-Modeler-compatible collaboration diagrams (Camunda 8 flavour)
including diagram interchange (DI) from a compact grid-based description:
each flow node gets a lane, a column and a row inside that lane; the generator
computes coordinates, lane heights, pool sizes and edge waypoints.
"""
from xml.sax.saxutils import escape, quoteattr

# ---------------------------------------------------------------- geometry
POOL_X = 120
HEADER = 30           # width of the rotated pool / lane label strip
COL_W = 190
ROW_H = 115
TASK_W, TASK_H = 130, 80
GW = 50
EV = 36
DO_W, DO_H = 36, 50
DS_W, DS_H = 50, 50
TOP_STRIP_DATA = 80
TOP_STRIP_PLAIN = 25
BOTTOM_PAD = 30
LOOP_PAD = 55
BOTTOM_STRIP = 80
EMPTY_POOL_H = 60
POOL_GAP = 95
SUB_PAD_X, SUB_PAD_TOP, SUB_PAD_BOTTOM = 30, 45, 25

TASK_TYPES = {"user", "service", "send", "receive", "manual", "businessRule", "task", "call"}


def cx_of(col):
    return POOL_X + HEADER + 95 + col * COL_W


class Node:
    def __init__(self, id, kind, name, lane, col, row=0, **kw):
        self.id, self.kind, self.name = id, kind, name
        self.lane, self.col, self.row = lane, col, row
        self.kw = kw
        self.parent = kw.get("parent")           # enclosing subprocess id
        self.cx = self.cy = None
        self.w, self.h = self.size()

    def size(self):
        if self.kind in TASK_TYPES or self.kind == "subprocess":
            return TASK_W, TASK_H
        if self.kind in ("xor", "and", "event", "or"):
            return GW, GW
        if self.kind in ("start", "end", "catch", "throw"):
            return EV, EV
        raise ValueError(self.kind)

    @property
    def left(self):
        return self.cx - self.w / 2

    @property
    def right(self):
        return self.cx + self.w / 2

    @property
    def top(self):
        return self.cy - self.h / 2

    @property
    def bottom(self):
        return self.cy + self.h / 2

    @property
    def is_gateway(self):
        return self.kind in ("xor", "and", "event", "or")


class Diagram:
    def __init__(self, num, name, lanes, pools_top=(), pools_bottom=(), doc=""):
        self.num, self.name, self.doc = num, name, doc
        self.lanes = list(lanes)
        self.pools_top, self.pools_bottom = list(pools_top), list(pools_bottom)
        self.nodes = {}
        self.order = []
        self.flows = []            # (src, tgt, name, cond, loop, kw)
        self.msgs = []             # (src, tgt, name)  src/tgt: node id or pool name
        self.datas = []            # dict(node, name, dir, pos)
        self.stores = []           # dict(node, name, dir)
        self.messages = {}         # message name -> id
        self.annotations = []      # (node, text)
        self.slug = name

    # ---- building -------------------------------------------------------
    def node(self, id, kind, name, lane, col, row=0, **kw):
        assert id not in self.nodes, id
        n = Node(id, kind, name, lane, col, row, **kw)
        self.nodes[id] = n
        self.order.append(id)
        return n

    def flow(self, src, tgt, name=None, cond=None, loop=False, **kw):
        self.flows.append((src, tgt, name, cond, loop, kw))

    def msg(self, src, tgt, name):
        self.msgs.append((src, tgt, name))

    def data(self, node, name, dir="out", pos=None):
        self.datas.append(dict(node=node, name=name, dir=dir, pos=pos))

    def store(self, node, name="RepairFlow-Datenbank", dir="out"):
        self.stores.append(dict(node=node, name=name, dir=dir))

    def note(self, node, text):
        self.annotations.append((node, text))

    # ---- layout ---------------------------------------------------------
    def layout(self):
        L = len(self.lanes)
        lane_rows = [0] * L
        lane_has_top = [False] * L
        lane_has_bottom = [False] * L
        lane_has_loop = [False] * L
        for n in self.nodes.values():
            lane_rows[n.lane] = max(lane_rows[n.lane], n.row + 1)
        for d in self.datas:
            n = self.nodes[d["node"]]
            pos = d["pos"] or ("top" if n.row == 0 else "bottom")
            d["pos"] = pos
            if pos == "top":
                lane_has_top[n.lane] = True
            else:
                lane_has_bottom[n.lane] = True
        for s in self.stores:
            lane_has_bottom[self.nodes[s["node"]].lane] = True
        for (src, tgt, name, cond, loop, kw) in self.flows:
            if loop:
                lane_has_loop[self.nodes[src].lane] = True
                lane_has_loop[self.nodes[tgt].lane] = True

        # vertical layout of lanes
        pool_top = POOL_GAP + (EMPTY_POOL_H + POOL_GAP) * len(self.pools_top) if self.pools_top else 60
        self.pool_top = pool_top
        y = pool_top
        self.lane_geo = []
        for i in range(L):
            top_strip = TOP_STRIP_DATA if lane_has_top[i] else TOP_STRIP_PLAIN
            h = top_strip + max(lane_rows[i], 1) * ROW_H + BOTTOM_PAD
            if lane_has_loop[i]:
                h += LOOP_PAD
            if lane_has_bottom[i]:
                h += BOTTOM_STRIP
            self.lane_geo.append(dict(top=y, h=h, strip=top_strip, rows=lane_rows[i]))
            y += h
        self.pool_bottom = y
        self.pool_h = y - pool_top

        maxcol = max(n.col for n in self.nodes.values())
        self.pool_w = cx_of(maxcol) + 110 - POOL_X
        self.pool_right = POOL_X + self.pool_w

        for n in self.nodes.values():
            g = self.lane_geo[n.lane]
            n.cx = cx_of(n.col)
            n.cy = g["top"] + g["strip"] + ROW_H / 2 + n.row * ROW_H

        # expanded subprocesses: bounding box of children
        for n in self.nodes.values():
            if n.kind == "subprocess":
                kids = [k for k in self.nodes.values() if k.parent == n.id]
                x1 = min(k.left for k in kids) - SUB_PAD_X
                x2 = max(k.right for k in kids) + SUB_PAD_X
                y1 = min(k.top for k in kids) - SUB_PAD_TOP
                y2 = max(k.bottom for k in kids) + SUB_PAD_BOTTOM
                n.cx, n.cy, n.w, n.h = (x1 + x2) / 2, (y1 + y2) / 2, x2 - x1, y2 - y1

        # empty pools
        self.pool_geo = {}
        for i, p in enumerate(self.pools_top):
            self.pool_geo[p] = dict(x=POOL_X, y=POOL_GAP + i * (EMPTY_POOL_H + POOL_GAP) - 40,
                                    w=self.pool_w, h=EMPTY_POOL_H)
        for i, p in enumerate(self.pools_bottom):
            self.pool_geo[p] = dict(x=POOL_X, y=self.pool_bottom + POOL_GAP + i * (EMPTY_POOL_H + POOL_GAP),
                                    w=self.pool_w, h=EMPTY_POOL_H)

        # data objects / stores
        for d in self.datas:
            n = self.nodes[d["node"]]
            g = self.lane_geo[n.lane]
            if d["pos"] == "top":
                d["x"], d["y"] = n.cx + 34, g["top"] + 12
            else:
                d["x"], d["y"] = n.cx + 34, g["top"] + g["h"] - BOTTOM_STRIP + 18
        for s in self.stores:
            n = self.nodes[s["node"]]
            g = self.lane_geo[n.lane]
            s["x"], s["y"] = n.cx - 40 - 60, g["top"] + g["h"] - BOTTOM_STRIP + 18

    # ---- routing ----------------------------------------------------------
    def route(self, src, tgt, loop, via=None):
        s, t = self.nodes[src], self.nodes[tgt]
        if via == "top":
            # return path through the lane above: leave left, run back, enter from above
            return [(s.left, s.cy), (t.cx, s.cy), (t.cx, t.top)]
        if via == "up":
            # leave upwards, then run horizontally into the target's left side
            return [(s.cx, s.top), (s.cx, t.cy), (t.left, t.cy)]
        if via == "right":
            # leave to the right, then vertically into the target
            return [(s.right, s.cy), (t.cx, s.cy), (t.cx, t.top if t.cy > s.cy else t.bottom)]
        if loop:
            if loop >= 3:
                g = self.lane_geo[max(s.lane, t.lane)]
                yl = g["top"] + g["strip"] + max(g["rows"], 1) * ROW_H + 28
            else:
                yl = max(s.cy, t.cy) + ROW_H / 2 + 28 + (loop - 1) * 30
            return [(s.cx, s.bottom), (s.cx, yl), (t.cx, yl), (t.cx, t.bottom)]
        if t.kind == "subprocess":
            return [(s.right, s.cy), (t.left, s.cy)]
        if s.kind == "subprocess":
            return [(s.right, t.cy), (t.left, t.cy)]
        if abs(s.cy - t.cy) < 1:
            if t.cx > s.cx:
                return [(s.right, s.cy), (t.left, t.cy)]
            return [(s.left, s.cy), (t.right, t.cy)]
        if abs(s.cx - t.cx) < 1:
            if t.cy > s.cy:
                return [(s.cx, s.bottom), (t.cx, t.top)]
            return [(s.cx, s.top), (t.cx, t.bottom)]
        down = t.cy > s.cy
        if s.is_gateway and t.cx > s.cx:
            # split: leave vertically, then horizontally into the target
            return [(s.cx, s.bottom if down else s.top), (s.cx, t.cy), (t.left, t.cy)]
        # default: leave horizontally, then vertically into the target
        if t.cx < s.cx:
            return [(s.left, s.cy), (t.cx, s.cy), (t.cx, t.top if down else t.bottom)]
        return [(s.right, s.cy), (t.cx, s.cy), (t.cx, t.top if down else t.bottom)]

    # ---- xml --------------------------------------------------------------
    def message_id(self, name):
        if name not in self.messages:
            self.messages[name] = "Msg_%02d_%d" % (int(self.num), len(self.messages) + 1)
        return self.messages[name]

    def to_xml(self):
        self.layout()
        num = self.num
        pid = "Proc_%s" % num
        collab = "Collab_%s" % num
        part_main = "Part_%s_Werkstatt" % num
        X = []
        A = X.append
        A('<?xml version="1.0" encoding="UTF-8"?>')
        A('<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" '
          'xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" '
          'xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" '
          'xmlns:di="http://www.omg.org/spec/DD/20100524/DI" '
          'xmlns:zeebe="http://camunda.org/schema/zeebe/1.0" '
          'xmlns:modeler="http://camunda.org/schema/modeler/1.0" '
          'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" '
          'id="Definitions_%s" targetNamespace="http://repairflow.example/bpmn" '
          'exporter="RepairFlow BPMN Generator" exporterVersion="1.0" '
          'modeler:executionPlatform="Camunda Cloud" modeler:executionPlatformVersion="8.7.0">' % num)

        # ---------------- collaboration
        A('  <bpmn:collaboration id="%s">' % collab)
        A('    <bpmn:documentation>%s</bpmn:documentation>' % escape(self.doc))
        A('    <bpmn:participant id="%s" name="Werkstattbetrieb (Pilotkunde FixWerk GmbH)" processRef="%s" />' % (part_main, pid))
        pool_ids = {}
        for p in self.pools_top + self.pools_bottom:
            pool_ids[p] = "Part_%s_%s" % (num, p)
            A('    <bpmn:participant id="%s" name="%s" />' % (pool_ids[p], escape(p)))
        mf_ids = []
        for i, (src, tgt, name) in enumerate(self.msgs):
            mid = "MsgFlow_%s_%d" % (num, i + 1)
            s = pool_ids.get(src, src)
            t = pool_ids.get(tgt, tgt)
            A('    <bpmn:messageFlow id="%s" name="%s" sourceRef="%s" targetRef="%s" />' % (mid, escape(name), s, t))
            mf_ids.append(mid)
        A('  </bpmn:collaboration>')

        # ---------------- process
        A('  <bpmn:process id="%s" name="%s" isExecutable="true">' % (pid, escape("%s %s" % (num, self.name))))
        A('    <bpmn:laneSet id="LaneSet_%s">' % num)
        for li, lname in enumerate(self.lanes):
            A('      <bpmn:lane id="Lane_%s_%d" name="%s">' % (num, li + 1, escape(lname)))
            for nid in self.order:
                n = self.nodes[nid]
                if n.lane == li and n.parent is None:
                    A('        <bpmn:flowNodeRef>%s</bpmn:flowNodeRef>' % nid)
            A('      </bpmn:lane>')
        A('    </bpmn:laneSet>')

        # incoming / outgoing maps
        inc, out = {}, {}
        flow_ids = []
        for i, (src, tgt, name, cond, loop, kw) in enumerate(self.flows):
            fid = "Flow_%s_%d" % (num, i + 1)
            flow_ids.append(fid)
            out.setdefault(src, []).append(fid)
            inc.setdefault(tgt, []).append(fid)

        # message flow attachment for message events / receive tasks
        msg_by_node = {}
        for (src, tgt, name) in self.msgs:
            if tgt in self.nodes:
                msg_by_node[tgt] = name

        data_by_node = {}
        for di, d in enumerate(self.datas):
            d["id"] = "DataObjRef_%s_%d" % (num, di + 1)
            d["obj"] = "DataObj_%s_%d" % (num, di + 1)
            data_by_node.setdefault(d["node"], []).append(d)
        for si, s in enumerate(self.stores):
            s["id"] = "DataStore_%s_%d" % (num, si + 1)
            data_by_node.setdefault(s["node"], []).append(s)

        def node_xml(n, indent):
            sp = " " * indent
            lines = []
            name = escape(n.name)
            k = n.kind
            tag = {"user": "userTask", "service": "serviceTask", "send": "sendTask", "receive": "receiveTask",
                   "manual": "manualTask", "businessRule": "businessRuleTask", "task": "task",
                   "call": "callActivity", "subprocess": "subProcess", "xor": "exclusiveGateway",
                   "and": "parallelGateway", "event": "eventBasedGateway", "or": "inclusiveGateway",
                   "start": "startEvent", "end": "endEvent", "catch": "intermediateCatchEvent",
                   "throw": "intermediateThrowEvent"}[k]
            attrs = 'id="%s" name="%s"' % (n.id, name)
            if k == "receive":
                mname = n.kw.get("msg") or msg_by_node.get(n.id) or n.name
                attrs += ' messageRef="%s"' % self.message_id(mname)
            if k == "subprocess":
                attrs += ' triggeredByEvent="false"'
            lines.append('%s<bpmn:%s %s>' % (sp, tag, attrs))
            ext = []
            if k in ("service", "send", "businessRule"):
                ext.append('<zeebe:taskDefinition type="%s" />' % n.kw.get("type", "repairflow." + n.id.lower()))
            if k == "user":
                ext.append('<zeebe:userTask />')
                ext.append('<zeebe:formDefinition formId="form-%s" />' % n.id.lower())
            if k == "call":
                ext.append('<zeebe:calledElement processId="%s" propagateAllChildVariables="false" />' % n.kw.get("called", "Proc_00"))
            if k in ("end", "throw") and n.kw.get("trigger") == "message":
                ext.append('<zeebe:taskDefinition type="%s" />' % n.kw.get("type", "repairflow." + n.id.lower()))
            if ext:
                lines.append('%s  <bpmn:extensionElements>' % sp)
                for e in ext:
                    lines.append('%s    %s' % (sp, e))
                lines.append('%s  </bpmn:extensionElements>' % sp)
            for f in inc.get(n.id, []):
                lines.append('%s  <bpmn:incoming>%s</bpmn:incoming>' % (sp, f))
            for f in out.get(n.id, []):
                lines.append('%s  <bpmn:outgoing>%s</bpmn:outgoing>' % (sp, f))
            # data associations
            for d in data_by_node.get(n.id, []):
                if d["dir"] == "out":
                    lines.append('%s  <bpmn:dataOutputAssociation id="%s_out_%s">' % (sp, n.id, d["id"]))
                    lines.append('%s    <bpmn:targetRef>%s</bpmn:targetRef>' % (sp, d["id"]))
                    lines.append('%s  </bpmn:dataOutputAssociation>' % sp)
                else:
                    lines.append('%s  <bpmn:property id="%s_prop_%s" name="__targetRef_placeholder" />' % (sp, n.id, d["id"]))
                    lines.append('%s  <bpmn:dataInputAssociation id="%s_in_%s">' % (sp, n.id, d["id"]))
                    lines.append('%s    <bpmn:sourceRef>%s</bpmn:sourceRef>' % (sp, d["id"]))
                    lines.append('%s    <bpmn:targetRef>%s_prop_%s</bpmn:targetRef>' % (sp, n.id, d["id"]))
                    lines.append('%s  </bpmn:dataInputAssociation>' % sp)
            if k in ("start", "catch", "end", "throw") and n.kw.get("trigger") == "message":
                lines.append('%s  <bpmn:messageEventDefinition id="%s_def" messageRef="%s" />' % (sp, n.id, self.message_id(n.kw.get("msg") or msg_by_node.get(n.id) or n.name)))
            if k == "catch" and n.kw.get("trigger") == "timer":
                lines.append('%s  <bpmn:timerEventDefinition id="%s_def">' % (sp, n.id))
                lines.append('%s    <bpmn:timeDuration xsi:type="bpmn:tFormalExpression">%s</bpmn:timeDuration>' % (sp, n.kw.get("duration", "P3D")))
                lines.append('%s  </bpmn:timerEventDefinition>' % sp)
            if k == "subprocess":
                if n.kw.get("multi"):
                    lines.append('%s  <bpmn:multiInstanceLoopCharacteristics isSequential="false">' % sp)
                    lines.append('%s    <bpmn:extensionElements>' % sp)
                    lines.append('%s      <zeebe:loopCharacteristics inputCollection="%s" inputElement="%s" />' % (sp, n.kw.get("collection", "=liste"), n.kw.get("element", "element")))
                    lines.append('%s    </bpmn:extensionElements>' % sp)
                    lines.append('%s  </bpmn:multiInstanceLoopCharacteristics>' % sp)
                for kid in self.order:
                    kn = self.nodes[kid]
                    if kn.parent == n.id:
                        lines.extend(node_xml(kn, indent + 2))
                for i, (src, tgt, fname, cond, loop, kw) in enumerate(self.flows):
                    if self.nodes[src].parent == n.id:
                        lines.append(flow_xml(i, src, tgt, fname, cond, kw, indent + 2))
            lines.append('%s</bpmn:%s>' % (sp, tag))
            return lines

        def flow_xml(i, src, tgt, fname, cond, kw, indent):
            sp = " " * indent
            fid = flow_ids[i]
            s = '%s<bpmn:sequenceFlow id="%s" sourceRef="%s" targetRef="%s"' % (sp, fid, src, tgt)
            if fname:
                s += ' name="%s"' % escape(fname)
            if cond:
                s += '>\n%s  <bpmn:conditionExpression xsi:type="bpmn:tFormalExpression">%s</bpmn:conditionExpression>\n%s</bpmn:sequenceFlow>' % (sp, escape(cond), sp)
            else:
                s += ' />'
            return s

        for nid in self.order:
            n = self.nodes[nid]
            if n.parent is None:
                X.extend(node_xml(n, 4))
        for i, (src, tgt, fname, cond, loop, kw) in enumerate(self.flows):
            if self.nodes[src].parent is None:
                A(flow_xml(i, src, tgt, fname, cond, kw, 4))
        for d in self.datas:
            A('    <bpmn:dataObjectReference id="%s" name="%s" dataObjectRef="%s" />' % (d["id"], escape(d["name"]), d["obj"]))
            A('    <bpmn:dataObject id="%s" />' % d["obj"])
        for s in self.stores:
            A('    <bpmn:dataStoreReference id="%s" name="%s" />' % (s["id"], escape(s["name"])))
        for ai, (nid, text) in enumerate(self.annotations):
            A('    <bpmn:textAnnotation id="Note_%s_%d">' % (num, ai + 1))
            A('      <bpmn:text>%s</bpmn:text>' % escape(text))
            A('    </bpmn:textAnnotation>')
            A('    <bpmn:association id="Assoc_%s_%d" associationDirection="None" sourceRef="%s" targetRef="Note_%s_%d" />' % (num, ai + 1, nid, num, ai + 1))
        A('  </bpmn:process>')

        # ---------------- messages
        for mname, mid in self.messages.items():
            # start events do not need a correlation key, everything else does
            A('  <bpmn:message id="%s" name="%s">' % (mid, escape(mname)))
            A('    <bpmn:extensionElements>')
            A('      <zeebe:subscription correlationKey="=vorgangId" />')
            A('    </bpmn:extensionElements>')
            A('  </bpmn:message>')

        # ---------------- DI
        A('  <bpmndi:BPMNDiagram id="Diagram_%s">' % num)
        A('    <bpmndi:BPMNPlane id="Plane_%s" bpmnElement="%s">' % (num, collab))

        def shape(elid, x, y, w, h, extra="", label=None):
            A('      <bpmndi:BPMNShape id="%s_di" bpmnElement="%s"%s>' % (elid, elid, extra))
            A('        <dc:Bounds x="%d" y="%d" width="%d" height="%d" />' % (round(x), round(y), round(w), round(h)))
            if label:
                lx, ly, lw, lh = label
                A('        <bpmndi:BPMNLabel>')
                A('          <dc:Bounds x="%d" y="%d" width="%d" height="%d" />' % (round(lx), round(ly), round(lw), round(lh)))
                A('        </bpmndi:BPMNLabel>')
            A('      </bpmndi:BPMNShape>')

        def edge(elid, pts, label=None):
            A('      <bpmndi:BPMNEdge id="%s_di" bpmnElement="%s">' % (elid, elid))
            for (x, y) in pts:
                A('        <di:waypoint x="%d" y="%d" />' % (round(x), round(y)))
            if label:
                lx, ly, lw, lh = label
                A('        <bpmndi:BPMNLabel>')
                A('          <dc:Bounds x="%d" y="%d" width="%d" height="%d" />' % (round(lx), round(ly), round(lw), round(lh)))
                A('        </bpmndi:BPMNLabel>')
            A('      </bpmndi:BPMNEdge>')

        for (src, tgt, fname, cond, loop, kw) in self.flows:
            pts = self.route(src, tgt, loop, kw.get("via"))
            (ax, ay), (bx, by) = pts[0], pts[1]
            s_ = self.nodes[src]
            if abs(ax - bx) < 1:
                s_.kw["_vtop" if by < ay else "_vbottom"] = True
            (cx_, cy_), (dx_, dy_) = pts[-2], pts[-1]
            t_ = self.nodes[tgt]
            if abs(cx_ - dx_) < 1:
                t_.kw["_vtop" if cy_ < dy_ else "_vbottom"] = True
        for (src, tgt, name) in self.msgs:
            nid = tgt if src in self.pool_geo else src
            pool = src if src in self.pool_geo else tgt
            n_ = self.nodes[nid]
            n_.kw["_mtop" if self.pool_geo[pool]["y"] < n_.cy else "_mbottom"] = True
        shape(part_main, POOL_X, self.pool_top, self.pool_w, self.pool_h, ' isHorizontal="true"')
        for li, g in enumerate(self.lane_geo):
            shape("Lane_%s_%d" % (num, li + 1), POOL_X + HEADER, g["top"], self.pool_w - HEADER, g["h"], ' isHorizontal="true"')
        for p, g in self.pool_geo.items():
            shape(pool_ids[p], g["x"], g["y"], g["w"], g["h"], ' isHorizontal="true"')

        # subprocesses first (so that they lie below their children in z-order)
        for nid in self.order:
            n = self.nodes[nid]
            if n.kind == "subprocess":
                shape(nid, n.left, n.top, n.w, n.h, ' isExpanded="true"')
        for nid in self.order:
            n = self.nodes[nid]
            if n.kind == "subprocess":
                continue
            label = None
            if n.is_gateway and n.name:
                lw = 150
                pos = n.kw.get("label")
                if not pos:
                    up, down = n.kw.get("_vtop"), n.kw.get("_vbottom")
                    pos = "left" if (up and down) else ("below" if up else "above")
                if pos == "below":
                    label = (n.cx - lw / 2, n.bottom + 6, lw, 27)
                elif pos == "left":
                    lw = 120
                    label = (n.left - 8 - lw, n.top - 30, lw, 27)
                else:
                    label = (n.cx - lw / 2, n.top - 34, lw, 27)
            elif n.kind in ("start", "end", "catch", "throw") and n.name:
                lw = 110
                pos = n.kw.get("label")
                if not pos:
                    busy_bottom = n.kw.get("_vbottom") or n.kw.get("_mbottom")
                    busy_top = n.kw.get("_vtop") or n.kw.get("_mtop")
                    pos = "below" if not busy_bottom else ("above" if not busy_top else "right")
                if pos == "above":
                    label = (n.cx - lw / 2, n.top - 34, lw, 27)
                elif pos == "right":
                    label = (n.right + 6, n.cy - 13, lw, 27)
                else:
                    label = (n.cx - lw / 2, n.bottom + 6, lw, 27)
            shape(nid, n.left, n.top, n.w, n.h, "", label)
        for d in self.datas:
            n = self.nodes[d["node"]]
            side = "right" if n.kw.get("_vtop" if d["pos"] == "top" else "_vbottom") else "left"
            if side == "left":
                lb = (d["x"] - 4 - 120, d["y"] + DO_H / 2 - 13, 120, 27)
            else:
                lb = (d["x"] + DO_W + 4, d["y"] + DO_H / 2 - 13, 120, 27)
            shape(d["id"], d["x"], d["y"], DO_W, DO_H, "", lb)
        for s in self.stores:
            shape(s["id"], s["x"], s["y"], DS_W, DS_H, "", (s["x"] - 120 - 4, s["y"] + DS_H / 2 - 13, 120, 27))
        for ai, (nid, text) in enumerate(self.annotations):
            n = self.nodes[nid]
            shape("Note_%s_%d" % (num, ai + 1), n.right + 20, n.top - 60, 160, 50)
            edge("Assoc_%s_%d" % (num, ai + 1), [(n.right, n.top), (n.right + 20, n.top - 35)])

        for i, (src, tgt, fname, cond, loop, kw) in enumerate(self.flows):
            pts = self.route(src, tgt, loop, kw.get("via"))
            label = None
            if fname:
                (x1, y1), (x2, y2) = pts[0], pts[1]
                if abs(y1 - y2) < 1:      # horizontal first segment
                    label = (x1 + 6, y1 - 24, 60, 18)
                else:                     # vertical first segment
                    label = (x1 + 7, y1 + (10 if y2 > y1 else -28), 60, 18)
            edge(flow_ids[i], pts, label)

        # message flows
        mf_count = {}
        for i, (src, tgt, name) in enumerate(self.msgs):
            if src in self.pool_geo:      # from empty pool to node
                g = self.pool_geo[src]
                n = self.nodes[tgt]
                x = n.cx + (30 if n.kind in TASK_TYPES else 0)
                if g["y"] < n.cy:
                    pts = [(x, g["y"] + g["h"]), (x, n.top)]
                else:
                    pts = [(x, g["y"]), (x, n.bottom)]
            else:                         # from node to empty pool
                n = self.nodes[src]
                g = self.pool_geo[tgt]
                x = n.cx + (30 if n.kind in TASK_TYPES else 0)
                if g["y"] < n.cy:
                    pts = [(x, n.top), (x, g["y"] + g["h"])]
                else:
                    pts = [(x, n.bottom), (x, g["y"])]
            (x1, y1), (x2, y2) = pts
            ly = (y1 + y2) / 2 - 10
            edge(mf_ids[i], pts, (x1 + 8, ly, 130, 20))

        # data associations
        for d in self.datas:
            n = self.nodes[d["node"]]
            dcx, dtop, dbot = d["x"] + DO_W / 2, d["y"], d["y"] + DO_H
            if d["pos"] == "top":
                a, b = (n.cx + 40, n.top), (dcx, dbot)
            else:
                a, b = (n.cx + 40, n.bottom), (dcx, dtop)
            pts = [a, b] if d["dir"] == "out" else [b, a]
            edge("%s_%s_%s" % (n.id, "out" if d["dir"] == "out" else "in", d["id"]), pts)
        for s in self.stores:
            n = self.nodes[s["node"]]
            scx, stop = s["x"] + DS_W / 2, s["y"]
            a, b = (n.cx - 40, n.bottom), (scx, stop)
            pts = [a, b] if s["dir"] == "out" else [b, a]
            edge("%s_%s_%s" % (n.id, "out" if s["dir"] == "out" else "in", s["id"]), pts)

        A('    </bpmndi:BPMNPlane>')
        A('  </bpmndi:BPMNDiagram>')
        A('</bpmn:definitions>')
        return "\n".join(X) + "\n"

    def activity_count(self):
        return sum(1 for n in self.nodes.values() if n.kind in TASK_TYPES or n.kind == "subprocess")
