/*
 * Post-build: fold the Vite output (dist/) into ONE self-contained
 * HTML file with all CSS and JS inlined and no external requests.
 * Produces dist-single/portal-preview.html — used for a hosted
 * preview (e.g. a Claude Artifact) so the app runs with zero setup.
 *
 * Run after `vite build`:  node scripts/inline-build.mjs
 */
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'

const dist = 'dist'
const outDir = 'dist-single'
const assetsDir = join(dist, 'assets')

let html = readFileSync(join(dist, 'index.html'), 'utf8')

const files = readdirSync(assetsDir)
const cssFile = files.find((f) => f.endsWith('.css'))
const jsFile = files.find((f) => f.endsWith('.js'))

const css = cssFile ? readFileSync(join(assetsDir, cssFile), 'utf8') : ''
const js = jsFile ? readFileSync(join(assetsDir, jsFile), 'utf8') : ''

// Drop external font <link>s (blocked under strict artifact CSP; fonts fall back).
html = html.replace(/<link[^>]*fonts\.(googleapis|gstatic)\.com[^>]*>/g, '')
// Drop the favicon link (references a public asset path we don't inline here).
html = html.replace(/<link[^>]*rel="icon"[^>]*>/g, '')
// Drop modulepreload hints (they point at the external JS we inline below).
html = html.replace(/<link[^>]*rel="modulepreload"[^>]*>/g, '')

// Replace the stylesheet <link> with an inline <style> (function form so
// any "$" in the CSS isn't treated as a replacement pattern).
html = html.replace(/<link[^>]*rel="stylesheet"[^>]*>/g, () => `<style>${css}</style>`)

// Escape any "</script>" / "<!--" inside the bundle so it can't break
// out of the inline <script> element.
const safeJs = js.replace(/<\/script/gi, '<\\/script').replace(/<!--/g, '<\\!--')

// Replace the module <script src=...> with the inlined bundle.
// Use a function replacement so `$` sequences in the JS aren't treated
// as regex replacement patterns.
html = html.replace(
  /<script[^>]*type="module"[^>]*src="[^"]*"[^>]*><\/script>/,
  () => `<script type="module">${safeJs}</script>`,
)

mkdirSync(outDir, { recursive: true })
const outPath = join(outDir, 'portal-preview.html')
writeFileSync(outPath, html)
console.log(`Wrote ${outPath} (${(html.length / 1024).toFixed(0)} KB)`)
