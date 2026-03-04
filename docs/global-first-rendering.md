# Global-First Rendering: Why Server Components Serve Everyone

**Governing principle:** PRI-05 (Progressive Enhancement) — 2G connections work; luxuries degrade gracefully.

## The Problem

2.7 billion people access the internet primarily through low-cost Android devices on 2G/3G connections (effective throughput: 20–50 KB/s). Client-rendered web applications require multiple round trips before content appears:

1. HTML shell arrives (~5 KB)
2. JavaScript bundle downloads (50–200 KB compressed, 150–600 KB uncompressed)
3. JS parses and executes (1–5 seconds on low-end devices)
4. JS makes API call to fetch content (another round trip)
5. Content renders

On a 2G connection, steps 2–5 take 15–45 seconds. The user stares at a blank page or a loading spinner for half a minute before reading a single word.

**This is not a performance optimization problem. It is an access problem.** The design language exists to carry Yogananda's teachings to anyone who seeks them. A rendering architecture that excludes billions of people by requiring fast connections and modern devices contradicts the mission at the deepest level.

## The Solution: Server-Rendered Content

React Server Components render content on the server and send complete HTML to the browser. The critical path becomes:

1. Browser requests the page
2. Server renders full HTML — text, typography, attribution, motifs, everything
3. **One response arrives. The user is reading.**

No JavaScript is required to display content. The entire reading surface — Yogananda's words, drop capitals, scene breaks, lotus dividers, commentary hierarchy, attribution — arrives as semantic HTML styled by CSS. On a 2G connection, a complete chapter (~30–50 KB of HTML) arrives in 1–2 seconds.

Interactive features (theme switching, dwell mode, keyboard navigation, reader settings) hydrate as "client islands" — small JavaScript modules that enhance the page after content is already readable. If JavaScript never loads (Save-Data mode, failed download, JavaScript disabled), the content remains fully accessible.

## How This Serves the Design Language

### Streaming Renders the Bindu First

React 18+ Server Components support **streaming** — HTML is sent in chunks as it renders. The server sends the opening paragraphs while still rendering the chapter's end. On slow connections, the user begins reading the first words (the bindu — the gravitational center of the composition) while the rest of the page streams in. The most important content arrives first because it's rendered first.

### CSS-Only Visual Language

The design system's entire visual expression is CSS custom properties, utility classes, and data-attribute selectors. None of it requires JavaScript. Theme switching uses `data-theme` on `<html>` — a single attribute change that CSS handles natively. Motifs use CSS `mask-image`. Attention gradients use CSS opacity. Print stylesheets, high-contrast overrides, reduced-motion respect — all pure CSS.

This means: **the design language works at full fidelity on zero JavaScript.** A 2G user who receives only the HTML and CSS sees the same typographic care, the same theme, the same motif placement, the same accessibility as a user on fiber.

### Progressive Enhancement Is Sahṛdaya

The design principle of sahṛdaya (the prepared reader) means designing for depth over breadth — for the reader who stays, not who bounces. Server-rendered content respects this: the words arrive immediately, without delay, without loading states. The reader's first experience is the teaching itself, not a skeleton loader or a progress bar.

Interactive features enhance progressively:

| Feature | Without JS | With JS |
|---|---|---|
| Reading content | Full fidelity | Same |
| Theme | Server-selected default | User switches themes |
| Typography | Full design system | Font size/spacing adjustable |
| Motifs | Fully rendered | Same |
| Print | Full print stylesheet | Same |
| Dwell mode | Not available | Paragraph focus |
| Keyboard nav | Browser default | Arrow keys, shortcuts |
| Reader settings | Not available | Font, spacing, text-only |
| Search | Form submission + results | Combobox with suggestions |

The left column is a complete, dignified reading experience. The right column adds convenience. Neither is broken without the other.

### Save-Data and Data-Constrained Mode

The design system provides `.data-constrained` CSS (from `calm.css`) that activates when the server detects the `Save-Data: 1` HTTP header — common on low-resource devices. In this mode:

- Decorative elements are suppressed
- Web fonts are deferred (system fonts used initially)
- Images are lazy-loaded with low-resolution placeholders
- Motifs render but at smallest possible byte cost (inline SVG, no external requests)

Server Components enable this naturally: the server reads the `Save-Data` header before rendering and adjusts the HTML output accordingly. No client-side JavaScript needed to detect and respond to data constraints.

### Font Loading Strategy

The design system specifies `font-display: swap` for all `@font-face` declarations. This means:

1. Text renders immediately in the system font stack (Georgia for reading, system-ui for UI)
2. Web fonts download in the background
3. When web fonts arrive, text swaps seamlessly

On 2G connections, the user reads comfortably in Georgia (which ships with every operating system) for the first 5–15 seconds, then Merriweather appears. The reading experience is never blocked by font loading.

## What Server Components Are Not

Server Components are not server-side rendering (SSR) in the traditional sense. Key distinctions:

- **No full-page hydration.** Traditional SSR sends HTML, then re-executes everything in JavaScript to make it interactive. Server Components send HTML that stays as HTML — only explicitly marked client components hydrate.
- **No client-side routing penalty.** Subsequent navigations fetch only the server-rendered diff, not full pages. On slow connections, this means page transitions are smaller payloads than initial loads.
- **Not mutually exclusive with caching.** Server-rendered pages can be cached at the CDN edge (Vercel, Cloudflare), so repeated visits to the same chapter hit the cache — zero server rendering, zero database queries, just cached HTML from the nearest edge node.

## The Arithmetic

| Metric | Client-Rendered | Server Components |
|---|---|---|
| Round trips to readable content | 3–4 | 1 |
| JS required for content | 50–200 KB | 0 KB |
| Time to first word (2G) | 15–45s | 1–3s |
| Time to interactive (2G) | 20–60s | 5–15s |
| Works without JavaScript | No | Yes |
| Works with Save-Data | Requires JS detection | Server-side detection |

The difference is not incremental. It is the difference between access and exclusion.

## In This Ecosystem

The Yogananda teachings portal serves a global audience. India alone has 500+ million internet users, the majority on budget Android devices with intermittent 2G/3G connectivity. Hindi is planned (PRO-043). Tamil, Telugu, Kannada may follow via YSS. The rendering architecture must serve these users with the same dignity and care as users on modern devices with fast connections.

Server Components are not a technical preference. They are the architectural expression of PRI-05: **2G connections work; luxuries degrade gracefully.** The teaching arrives first. Everything else enhances.
