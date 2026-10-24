// Usage: npm run dev -- <demo>   (a file in demos/ whose default export is a component)
import react from "@vitejs/plugin-react";
import { existsSync, readdirSync } from "node:fs";
import { relative, resolve } from "node:path";
import { createServer } from "vite";

const demosDir = resolve(import.meta.dirname, "demos");
const demos = readdirSync(demosDir).filter((f) => f.endsWith(".tsx")).map((f) => f.slice(0, -4));
const arg = process.argv[2];
if (!arg) {
  console.error(`Pass a demo to run, e.g. npm run dev -- ${demos[0]}\n\nAvailable:\n  ${demos.join("\n  ")}`);
  process.exit(1);
}
// Accept a demo name ("props-and-one-way-data-flow") or a path to any .tsx file
const asPath = resolve(process.env.INIT_CWD ?? process.cwd(), arg);
const app = existsSync(asPath) ? asPath : resolve(demosDir, arg.endsWith(".tsx") ? arg : `${arg}.tsx`);
if (!existsSync(app)) {
  console.error(`No demo "${arg}". Available:\n  ${demos.join("\n  ")}`);
  process.exit(1);
}
const rel = relative(import.meta.dirname, app);
const src = rel.startsWith("..") ? `/@fs${app}` : `/${rel}`;

// Serve the page and mount code from memory, so each demo is just one .tsx file
const html = `<!doctype html>
<html>
  <head><link rel="icon" href="data:," /></head>
  <body>
    <div id="root"></div>
    <script type="module">
      import { createElement } from "react";
      import { createRoot } from "react-dom/client";
      import App from ${JSON.stringify(src)};
      createRoot(document.getElementById("root")).render(createElement(App));
    </script>
  </body>
</html>`;

const page = {
  name: "learning-page",
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      if (req.url !== "/" && req.url !== "/index.html") return next();
      res.setHeader("Content-Type", "text/html");
      res.end(await server.transformIndexHtml(req.url, html));
    });
  },
};

const server = await createServer({ plugins: [react(), page], server: { open: true } });
await server.listen();
console.log(`Running ${rel}`);
server.printUrls();
