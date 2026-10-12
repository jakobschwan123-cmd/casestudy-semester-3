"""Render BPMN files to SVG + PNG with bpmn-js (headless Chromium via Playwright)."""
import asyncio, glob, os, sys, json
from playwright.async_api import async_playwright

HERE = os.path.dirname(os.path.abspath(__file__))
VIEWER = os.path.join(HERE, "node_modules/bpmn-js/dist/bpmn-viewer.production.min.js")
CSS = os.path.join(HERE, "node_modules/bpmn-js/dist/assets/bpmn-js.css")
HTML = """<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="file://%s">
<style>html,body{margin:0;padding:0;background:#fff}#c{width:%dpx;height:%dpx;background:#fff}
.djs-container .djs-label{font-family:Arial,Helvetica,sans-serif}</style>
<script src="file://%s"></script></head><body><div id="c"></div></body></html>"""


async def main(src_dir, out_dir, scale=2):
    os.makedirs(out_dir, exist_ok=True)
    files = sorted(glob.glob(os.path.join(src_dir, "*.bpmn")))
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        for f in files:
            xml = open(f, encoding="utf-8").read()
            # rough size from DI bounds
            import re
            xs = [int(m.group(1)) + int(m.group(3)) for m in re.finditer(r'x="(-?\d+)" y="(-?\d+)" width="(\d+)" height="(\d+)"', xml)]
            ys = [int(m.group(2)) + int(m.group(4)) for m in re.finditer(r'x="(-?\d+)" y="(-?\d+)" width="(\d+)" height="(\d+)"', xml)]
            W, H = max(xs) + 40, max(ys) + 40
            page = await browser.new_page(viewport={"width": W, "height": H}, device_scale_factor=scale)
            html_path = os.path.abspath(os.path.join(out_dir, "_viewer.html"))
            with open(html_path, "w", encoding="utf-8") as fh:
                fh.write(HTML % (CSS, W, H, VIEWER))
            await page.goto("file://" + html_path)
            await page.wait_for_function("typeof BpmnJS !== 'undefined'")
            res = await page.evaluate("""async (xml) => {
                const viewer = new BpmnJS({ container: '#c' });
                const r = await viewer.importXML(xml);
                viewer.get('canvas').zoom(1.0);
                viewer.get('canvas').viewbox({ x: 0, y: 0, width: %d, height: %d });
                const { svg } = await viewer.saveSVG();
                return { warnings: r.warnings.map(w => String(w.message || w)), svg };
            }""" % (W, H), xml)
            base = os.path.splitext(os.path.basename(f))[0]
            with open(os.path.join(out_dir, base + ".svg"), "w", encoding="utf-8") as fh:
                fh.write(res["svg"])
            await page.screenshot(path=os.path.join(out_dir, base + ".png"), full_page=True)
            print("%s  %dx%d  warnings=%s" % (base, W, H, res["warnings"]))
            await page.close()
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main(sys.argv[1], sys.argv[2], float(sys.argv[3]) if len(sys.argv) > 3 else 2))
