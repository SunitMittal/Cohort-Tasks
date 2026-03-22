# Chai Tailwind — CSS utility classes (runtime)
A small **Tailwind-inspired** utility system for plain HTML. You add `chai-*` classes to elements; **`script.js`** reads those classes on load and applies matching styles (inline). No build step and no separate CSS file.

## What’s included
| File | Role |
|------|------|
| `index.html` | Demo page using `chai-*` classes |
| `script.js` | Parser and applier for utility classes; watches the DOM for new nodes and `class` changes |

## How to run
1. Open `index.html` in a browser **or** serve the folder with any static server (e.g. `npx serve .`).
2. Ensure `script.js` loads (it is included at the bottom of `body`).

## How it works
1. On `DOMContentLoaded`, every element with a `class` containing `chai-` is processed.
2. For each `chai-*` token, the script maps the name to CSS properties and sets them on `element.style`.
3. A `MutationObserver` re-runs processing when the DOM changes or when an element’s `class` attribute changes.

Utilities are **prefixed with `chai-`**. Only classes starting with `chai-` are handled.

## Class naming (overview)
Naming follows Tailwind-style tokens after the prefix, for example:
- **Text color:** `chai-color-<name>` or `chai-color-<name>-<shade>` — e.g. `chai-color-blue`, `chai-color-red-500`. Shorthand: `chai-text-<name>` also sets color (see `script.js` for `text` + size vs alignment vs color).
- **Background:** `chai-bg-<name>` or `chai-bg-<name>-<shade>` — e.g. `chai-bg-yellow-300`.
- **Typography:** `chai-font-bold`, `chai-italic`, `chai-text-center` / `left` / `right` / `justify`, `chai-text-sm` (and other sizes from the scale), `chai-underline`, `chai-tracking-*`, `chai-leading-*`, `chai-uppercase`, etc.
- **Spacing:** `chai-p-<scale>`, `chai-px-*`, `chai-py-*`, `chai-pt-*`, … and `chai-m-*`, `chai-mx-*`, `chai-my-*`, … using the built-in spacing map (Tailwind-like rem scale).
- **Layout:** `chai-flex`, `chai-flex-row`, `chai-flex-col`, `chai-block`, `chai-inline-block`, positioning helpers, `chai-w-full`, `chai-h-full`, borders/radius, `chai-opacity-*`, `chai-z-*`, etc.

Color names and shades match the palettes defined in `script.js` (e.g. red, orange, yellow, green, blue, slate, gray, … with shades like `50`–`950`).

For the full set of supported tokens, see the `applyOneClass` logic and lookup tables (`COLORS`, `SPACING`, `FONT_SIZES`, …) in `script.js`.

## API exposed on `window`

After load, **`window.chaiUtils`** provides:
- `scan(root)` — process a subtree for `chai-*` classes  
- `processElement(el)` — process a single element  

Useful if you update markup outside the observer’s normal paths and need a manual refresh.

## Browser support
Uses modern DOM APIs (`MutationObserver`, inline styles). Any current evergreen browser is fine for local demos.

**Sunit Mittal**
GitHub: *https://github.com/SunitMittal*