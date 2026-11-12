// esbuild 打包：lit 与源码打成单文件 ESM，不依赖 CDN
import { build } from "esbuild";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.dirname(fileURLToPath(import.meta.url));
const outfile = path.join(root, "..", "ha-music.js");

await build({
  entryPoints: [path.join(root, "src", "index.js")],
  bundle: true,
  format: "esm",
  target: ["es2020", "chrome100", "safari15"],
  outfile,
  minify: true,
  legalComments: "none",
  logLevel: "info",
  define: {
    "process.env.NODE_ENV": '"production"',
  },
});

console.log("bundle written:", outfile);
