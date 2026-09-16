# Nithiya D — Portfolio

A premium, animated personal portfolio built with plain HTML5, CSS3 and vanilla JavaScript — no frameworks, no build step.

## 1. Folder structure

```
portfolio/
├── index.html
├── 404.html
├── README.md
├── css/
│   └── style.css
├── js/
│   └── script.js
└── assets/
    ├── images/
    │   ├── profile-placeholder.svg      ← swap for your real photo
    │   └── project-*.svg                ← swap for real project screenshots
    ├── icons/
    │   └── favicon.svg
    └── resume/
        └── Nithiya_D_Resume.pdf         ← currently your AIDS-focused resume
```

## 2. Colour palette — "Royal Ledger"

| Token | Hex | Use |
|---|---|---|
| `--bg-deep` | `#081B14` | Page background (deep emerald-black) |
| `--bg-surface` / `--bg-elevated` | `#0F2A20` / `#16392B` | Cards, nav, elevated panels |
| `--gold` | `#D4AF37` | Primary accent, borders |
| `--gold-bright` | `#F1D273` | Highlights, hover states, headings accent |
| `--emerald` | `#1F6F54` | Secondary accent, gradients |
| `--ivory` | `#F3EFE3` | Primary text on dark |
| `--ivory-muted` | `#A9BFB2` | Body text on dark |

A light theme (toggle in the navbar, sun/moon icon) swaps these to a cream/gold/emerald variant automatically — see `[data-theme="light"]` in `css/style.css`.

## 3. Fonts (Google Fonts, loaded via CDN)

- **Fraunces** — display serif for headings and the hero name (the "royal" character of the site)
- **Manrope** — body copy
- **JetBrains Mono** — labels, tags, dates, stats (the "ledger" utility voice)

## 4. Replacing placeholder content

1. **Profile photo** — replace `assets/images/profile-placeholder.svg` with your photo, saved as `assets/images/profile.jpg` (or keep the `.svg` name and overwrite it), then update the `src` on `#crestPhoto` in `index.html`. The circular gold frame, rotating rings and shine sweep are pure CSS/SVG, so any photo you drop in will automatically get the interactive treatment.
2. **Project screenshots** — replace each `assets/images/project-*.svg` with a real screenshot (same filename, or update the `image` field in the `PROJECTS` array at the top of `js/script.js`).
3. **Project links** — update `github` and `demo` URLs in the same `PROJECTS` array.
4. **Resume** — drop your latest PDF into `assets/resume/` as `Nithiya_D_Resume.pdf` (or update the two `download` links in `index.html` and the FAB menu).
5. **Testimonials** — currently placeholders, clearly marked in the code (`#testimonials` section). Replace with real quotes once you have them.
6. **Contact form** — the form validates client-side and is EmailJS-ready. To go live: include the EmailJS SDK in `index.html`, then uncomment and fill in the `emailjs.sendForm(...)` block inside the `contact form submit` handler in `js/script.js`.
7. **Map** — the contact section has a stylised placeholder card instead of a live embed (no API key required). Swap `.contact-map-placeholder` for a real Google Maps iframe if you want one.

## 5. Skills & tech marquee

Both are driven by the `SKILLS` and `TECH_MARQUEE` arrays at the top of `js/script.js` — add, remove or re-percentage skills there and the cards/bars regenerate automatically.

## 6. Deployment — GitHub Pages

1. Create a new GitHub repository (e.g. `nithiya-portfolio`).
2. Push this folder's contents to the repository root (or a `docs/` folder — your choice):
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/Nithiya17006/nithiya-portfolio.git
   git push -u origin main
   ```
3. In the repo: **Settings → Pages → Source** → select the `main` branch and `/ (root)` folder → **Save**.
4. Your site will be live at `https://nithiya17006.github.io/nithiya-portfolio/` within a minute or two.
5. Optional: add a `CNAME` file in the root if you connect a custom domain.

## 7. Notes

- Fully responsive down to small mobile widths; test with your browser's device toolbar.
- Respects `prefers-reduced-motion` — animations are minimised for users who request it.
- Keyboard shortcuts: `/` focuses the project search; `g` then `h/a/s/p/c` jumps to Home/About/Skills/Projects/Contact.
- No external JS frameworks or libraries are used — everything in `js/script.js` is plain, dependency-free JavaScript.
