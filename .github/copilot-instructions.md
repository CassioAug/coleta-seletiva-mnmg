Project: Coleta Seletiva — quick notes for AI coding agents

This is a small static website (HTML/CSS/JS) that documents and shows voluntary
recycling collection points for Morada Nova de Minas. The site is intentionally
simple: no build system, no backend in this repo, and most logic lives in
plain ES modules-style scripts loaded as globals.

Key files to read before editing

- `index.html` — main layout, loads CSS and scripts via CDN and local files.
- `js/marcadores.js` — canonical source of map data: a `pontosColeta` array.
  To add/remove points update this array (each item: id, nome, endereco,
  coordenadas, materiais[], horario).
- `js/scripts.js` — site behavior: Leaflet map init, marker rendering, form
  submission (posts to a Google Form via a hidden iframe), smooth navigation
  and back-to-top behavior.
- `css/styles.css` — site styles and CSS variables; Bootstrap is used from CDN.

Big-picture architecture and important constraints

- Static SPA-like site: all dynamic behavior runs client-side. There is no
  server code in this repo. Changes to `pontosColeta` or the form target are
  how new data is surfaced.
- External deps are loaded from CDNs in `index.html`: Bootstrap, Bootstrap
  Icons, Leaflet, Google Fonts. Agents should avoid replacing CDN usage with a
  bundler or new package manager without explicit instruction from maintainers.
- Data flow for user-submitted points: `#volunteer-form` is serialized and
  POSTed to a Google Forms `formResponse` URL via a temporary hidden form and
  iframe (`hiddenIframe`). The repo does not store submissions — they go to
  Google Forms. Do not change input `name` attributes (they map to Google
  Forms entry IDs) unless you also update the target Google Form.

Project-specific patterns and examples

- Markers: `js/marcadores.js` exports a global array `pontosColeta`. `scripts.js`
  iterates `pontosColeta.forEach(ponto => { L.marker(ponto.coordenadas)... })`.
  Keep that shape when adding points. Example item:

  { id: 3, nome: "Supermercado Local", endereco: "Avenida...", coordenadas: [-18.6, -45.36], materiais: ["Papel","Plástico"], horario: "Todos os dias" }

- Map initialization: `initMap()` in `js/scripts.js` sets view to [-18.611, -45.361],
  zoom 14 and adds OpenStreetMap tiles. If you change the map center/zoom, update
  the same function in `scripts.js`.
- Form submission: code creates a temporary `<form>` with method POST to the
  Google Forms URL. It uses `FormData` and `URLSearchParams` to gather values.
  The UI displays `#form-status` messages; classes used are `info`, `success`,
  `error` (see `css/styles.css`).

Developer workflows (quick commands)

- No build step. To preview locally open `index.html` in a browser. For a
  reliable local test (recommended), run a small static server from repo root.
  Example (PowerShell):

  ```powershell
  # serve on http://localhost:8000
  python -m http.server 8000
  ```

- If you prefer an editor live-preview, use VS Code Live Server extension.

Testing and editing notes for agents

- Keep global names stable: `pontosColeta`, `initMap`, `hiddenIframe`. Other
  code depends on these globals being present and on scripts being loaded in
  the order in `index.html` (`marcadores.js` before `scripts.js`).
- Avoid introducing module loaders or changing <script> tags to `type="module"`
  without updating dependent code and load order.
- Network failure handling: many resources (Leaflet, Bootstrap) are CDN-hosted.
  When coding, consider graceful fallbacks (e.g., detect `L` undefined) but
  keep changes minimal and documented in the PR.

Edge cases and gotchas discovered in code

- `js/scripts.js` uses `document.addEventListener('DOMContentLoaded', ...)`
  twice (map init and nav smooth scroll). That works, but if you centralize
  initialization prefer a single DOMContentLoaded handler to avoid duplication.
- Google Form field names in the HTML (`name="entry.1704902272"`, etc.) map
  to the external form — changing them will break submissions.

When to ask the maintainers before changing things

- If you want to replace CDN usage with a packaging system (npm, bundler), ask
  first — maintainers expect a single-file static site and may not want extra
  complexity.
- If you intend to store submissions in this repo (or add a backend), confirm
  data/privacy policy and where form responses should be stored.

If anything in this file is unclear or you want more examples (e.g. how to
add a new map marker with a custom icon), tell me which area you'd like
expanded and I'll iterate.
