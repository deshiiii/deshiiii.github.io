# Project website

A minimal static site that hosts links to the user's projects as a tree of collapsible folders. No build step, no dependencies, no framework.

## Files

- `index.html` – page shell; loads `projects.js` then `script.js`.
- `projects.js` – **the content**. Defines `const PROJECTS = [...]`, a nested tree:
  - folder: `{ name, children: [...], open?: true }`
  - link: `{ name, href }` – a web page URL or a relative path to a PDF.
  - pop-up: `{ name, text }` – opens a `<dialog>` showing `text` (blank lines = new paragraphs; `==words==` are highlighted with `<mark>`). Used for About Me → READ ME.
- `script.js` – renders `PROJECTS` into nested `<details>/<summary>` elements. Remembers which folders are open in `localStorage` (falls back to each folder's `open` flag). Links open in a new tab; hrefs ending in `.pdf` get a PDF icon and open in an in-page viewer (`#pdf-viewer` dialog with an `<iframe>`, using the browser's built-in PDF viewer); on narrow screens or browsers without inline PDF support (`navigator.pdfViewerEnabled === false`) they open in a new tab instead.
- `style.css` – styling via CSS variables. Layout: `<main>` is a bordered box filling the viewport height (flex column); the header stays put and only `#tree` scrolls inside it. Dark theme (near-black background, off-white text, amber `#ffb454` links, grey box border/glow, amber highlights) is the default on `:root`; light theme applies with `<html data-theme="light">`. The header toggle (`#theme-toggle` in `script.js`) sets `data-theme` and saves it in `localStorage` under `theme`; an inline script in `<head>` re-applies it before paint.
- Font: Chakra Petch (free, OFL), loaded from Google Fonts via `<link>` in `index.html`.
- `fonts/tt_octosquares/` – TT Octosquares trial font files, kept locally only (git-ignored, not used by the site).
- `files/` – PDFs and other hosted documents, linked as `files/<name>.pdf`.

## Conventions

- To add/remove/reorganise projects, edit only `projects.js`. Keep the data as a `.js` file (not JSON) so the site works when opened directly via `file://` without a server.
- TT Octosquares is a **trial licence** (TypeType): testing/student use only, and it may not be used on a publicly accessible page without TypeType's written consent. It must not be used on the published site; that's why the site uses Chakra Petch instead.
- Keep it dependency-free and plain HTML/CSS/JS.

## Running / deploying

- Local: open `index.html` in a browser, or `python3 -m http.server` in this directory.
- Deploy: GitHub Pages (push the repo; Pages serves the root of the default branch).
- Hosts are case-sensitive: `href` paths in `projects.js` must match file/folder names exactly.
