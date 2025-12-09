#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Top-level await is allowed in ESM
try {
  // prefer global fetch (Node 18+); otherwise dynamically import node-fetch
  let fetchFn = globalThis.fetch;
  if (!fetchFn) {
    try {
      const mod = await import('node-fetch');
      fetchFn = mod.default ?? mod;
    } catch (e) {
      console.error('No fetch available. Please run with Node 18+ or `npm install node-fetch`');
      process.exit(1);
    }
  }

  const res = await fetchFn('https://ezhomes.co/shop/');
  const html = await res.text();

  // Extract anchor links that point to /shop/
  const anchorRegex = /<a[^>]+href=["']([^"']*\/shop\/[^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi;
  const anchors = new Map();
  let m;
  while ((m = anchorRegex.exec(html)) !== null) {
    const href = m[1];
    let inner = m[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    // filter out short/boilerplate links
    if (inner && inner.length > 3 && inner.length < 200) {
      // normalize URL to absolute
      const url = href.startsWith('http') ? href : new URL(href, 'https://ezhomes.co').href;
      anchors.set(url, inner);
    }
  }

  const externalProducts = Array.from(anchors.entries()).map(([url, title]) => ({ title, url }));

  // Read local products.ts and extract titles
  const localPath = path.resolve(__dirname, '../src/data/products.ts');
  if (!fs.existsSync(localPath)) {
    console.error('Local products file not found at', localPath);
    process.exit(1);
  }
  const localRaw = fs.readFileSync(localPath, 'utf8');

  const titleRegex = /title:\s*"([^"]+)"/g;
  const localTitles = [];
  while ((m = titleRegex.exec(localRaw)) !== null) {
    localTitles.push(m[1]);
  }

  function normalize(s) {
    return (s || '')
      .toLowerCase()
      .replace(/[\u2018\u2019\u201c\u201d']/g, '')
      .replace(/[^a-z0-9 ]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  const localNorm = localTitles.map(t => ({ title: t, norm: normalize(t) }));

  const results = externalProducts.map(ext => {
    const extNorm = normalize(ext.title);
    let best = { score: 0, localIndex: -1 };
    localNorm.forEach((loc, idx) => {
      if (!loc.norm) return;
      if (loc.norm === extNorm) {
        best = { score: 1, localIndex: idx };
        return;
      }
      if (extNorm.includes(loc.norm) || loc.norm.includes(extNorm)) {
        best = { score: 0.9, localIndex: idx };
        return;
      }
      const locWords = loc.norm.split(' ');
      const common = locWords.filter(w => extNorm.includes(w)).length;
      const score = common / Math.max(locWords.length, 1);
      if (score > best.score) best = { score, localIndex: idx };
    });
    return {
      externalTitle: ext.title,
      url: ext.url,
      matchedLocalTitle: best.localIndex >= 0 ? localTitles[best.localIndex] : null,
      matchedLocalIndex: best.localIndex >= 0 ? best.localIndex : null,
      score: best.score,
    };
  });

  const outPath = path.resolve(__dirname, 'ezhomes-match.json');
  fs.writeFileSync(outPath, JSON.stringify(results, null, 2));
  console.log('Wrote mapping to', outPath);
  console.log('Total external products found:', externalProducts.length);
} catch (err) {
  console.error('Error:', err);
  process.exit(1);
}

