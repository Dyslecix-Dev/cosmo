#!/usr/bin/env node
import { mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(__dirname, "../src/assets");

const placeholders = [
  { name: "placeholder-home-hero.png", width: 1920, height: 1080, fill: "#1f2937" },
  { name: "placeholder-blog-hero.png", width: 1200, height: 630, fill: "#374151" },
  { name: "placeholder-og-fallback.png", width: 1200, height: 630, fill: "#111827" },
];

await mkdir(outDir, { recursive: true });

for (const { name, width, height, fill } of placeholders) {
  const out = resolve(outDir, name);
  await sharp({
    create: { width, height, channels: 3, background: fill },
  })
    .png()
    .toFile(out);
  console.log(`wrote ${out} (${width}x${height} ${fill})`);
}
