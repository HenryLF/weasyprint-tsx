import { join } from "path";

export const DEV_SCRIPT = `<script>var _t=null;setInterval(function(){fetch('/__dev_ping').then(function(r){return r.text();}).then(function(s){if(_t!==null&&s!==_t)location.reload();_t=s;}).catch(function(){});},1000);</script>`;

let pingCounter = 0;

export function bumpPing(): void {
  pingCounter++;
}

export function startServer(port: number, buildDir: string): void {
  Bun.serve({
    port,
    fetch(req) {
      const url = new URL(req.url);

      if (url.pathname === "/__dev_ping") {
        return new Response(String(pingCounter), {
          headers: { "Cache-Control": "no-store" },
        });
      }
      const pathname = url.pathname === "/" ? "/index.html" : url.pathname;
      if (pathname == "/favicon.ico") return new Response(null);
      const file = Bun.file(join(process.cwd(), buildDir, pathname));
      return new Response(file);
    },
  });
}

export async function injectDevScript(htmlPath: string): Promise<void> {
  let html = await Bun.file(htmlPath).text();
  if (!html.includes("/__dev_ping")) {
    await Bun.write(htmlPath, html);
  }
}
