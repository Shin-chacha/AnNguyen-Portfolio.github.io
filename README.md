# An Nguyen · Finance × Data portfolio

A capability-map portfolio: every skill on the map is backed by evidence (projects, roles, competitions, certifications, coursework). Plain HTML, CSS and JavaScript, with no build step, framework or dependencies, so it runs directly on **GitHub Pages**.

```
index.html           Home: hero, capability map, milestones, about
projects.html        All projects, with search + category and skill filters
project.html         One project's case study (project.html?id=credit-risk)
404.html             Not-found page for GitHub Pages
assets/js/data.js    ← ALL CONTENT LIVES HERE
assets/js/common.js  Icons, status rules, header and footer
assets/js/map.js     Capability map, evidence drawer, mobile accordion
assets/js/projects.js / project.js
assets/css/style.css Design tokens (colours, type) and all styles
assets/img/favicon.svg
.nojekyll            Tells GitHub Pages to serve files as they are
```

---

## 1. Put the site on GitHub Pages (first time, about 5 minutes)

1. Sign in to github.com and click **New repository**.
   - Name it **`<your-username>.github.io`** for a site at `https://<your-username>.github.io`,
     or any name (e.g. `portfolio`) for `https://<your-username>.github.io/portfolio`.
   - Make it **Public**. Don't add a README (this folder already has one).
2. On the new repository page, click **uploading an existing file**, then drag **everything inside this folder**
   (including `assets/` and `.nojekyll`) into the browser. Click **Commit changes**.
   > Hidden-file tip: if `.nojekyll` doesn't show on your computer, the site still works without it.
3. Go to **Settings → Pages**. Under *Build and deployment* choose **Deploy from a branch**,
   branch **main**, folder **/ (root)**, then **Save**.
4. Wait 1–2 minutes and open the address shown at the top of the Pages settings.

Using the command line instead:

```bash
cd portfolio
git init -b main
git add .
git commit -m "Portfolio site"
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

---

## 2. Preview changes on your computer

Double-clicking `index.html` works. For the most accurate preview, run a tiny local server:

```bash
cd portfolio
python3 -m http.server 8000
# open http://localhost:8000
```

---

## 3. Update the content (all in `assets/js/data.js`)

Open `assets/js/data.js` in any text editor (VS Code is ideal: it highlights mistakes).
Keep the commas and quotes as they are: each item is `{ ... },` separated by commas.

### Add your CV download button
Put the PDF in `assets/cv/` (create the folder) and set:
```js
cvUrl: "assets/cv/An_Nguyen_CV.pdf",
```
Leave it as `""` to hide the button.

### Add a new project
Copy one project block inside `evidence: [ ... ]`, change the `id` (lowercase, no spaces) and the text:

```js
{
  id: "olist-sql",                 // used in the URL: project.html?id=olist-sql
  type: "project",
  featured: true,                  // true = Featured grid, false = Archive & experiments
  title: "Olist E-commerce SQL Analysis",
  short: "Olist SQL",              // short name for cards and the drawer
  subtitle: "SQL + Power BI",
  year: "2026",
  categories: ["analytics"],       // ids from `categories`: finance, analytics, ml, business
  summary: "One-sentence description shown on cards.",
  problem: "What business question did it answer?",
  data: "Where the data came from, tables, grain.",
  method: ["Step one.", "Step two."],
  result: ["Finding with a number.", "Recommendation."],
  contribution: ["What I did myself.", "Where AI assisted."],
  limitations: ["What could invalidate the conclusion."],
  learned: ["What I'd do differently."],
  links: [{ label: "GitHub repo", url: "https://github.com/..." }],
  skills: ["sql", "pbi", "kpi", "dash"]   // skill ids from `tree` below
},
```
Sections you leave empty (`[]` or `""`) are hidden automatically. The project then shows up on the
Projects page, on its own case-study page, and in the drawer of every skill it lists.
All the counts on the home page update by themselves.

### Project evidence: STAR summary, key results and figures
Clicking a skill opens its evidence drawer (up to three project cards), and each card opens a
project preview with the STAR summary, key results, figures and the Drive link. Shareable link:
`projects.html?project=<id>` or `index.html?project=<id>`. Add these fields to a project:

```js
role: "Team of 3",                       // shown under "My contribution"; leave "" if not stated
star: {                                   // 20–40 words each
  situation: "…", task: "…", action: "…", result: "…"
},
highlights: [                             // 2–3 headline numbers; the first one shows on cards
  { value: "7.56 days", label: "delivery-time error (MAE)" }
],
figures: [                                // first = hero; up to two more supporting figures
  { src: "assets/projects/ecommerce/last-mile-delivery.webp", w: 1600, h: 620,
    alt: "What the chart shows, for screen readers",
    caption: "The insight in one sentence, not the chart type." }
],
links: [{ label: "Slide deck (PDF, 20 slides)", url: "https://drive.google.com/file/d/…" }]
```

Figure rules: export the chart (not a whole page), save it as **WebP, about 1,200–1,600 px wide and
under ~150 KB** in `assets/projects/<project id>/`, and write `w`/`h` (the pixel size) so the page
doesn't jump while loading. The first link becomes the **View full analysis** button: point it at the
main file, not a folder, and test it in a private window without signing in to Google.

### Add a certification, role, competition or course
```js
{ id: "cert-pl300", type: "certification", title: "Power BI Data Analyst (PL-300)", subtitle: "Microsoft", year: "2027", skills: ["pbi"] },
```
`type` can be `project`, `role`, `competition`, `award`, `certification` or `course`.

### How a skill's status is decided (automatically)

| Status | Rule |
|---|---|
| **Learning** | No project, role or competition lists this skill yet (certificates and courses alone don't count) |
| **Applied** | At least 1 project, role or competition lists it |
| **Proven** | At least 2 of those **and** `proven: true` on the skill in `tree` |

So when you've rebuilt your SQL project without help, add `proven: true` to SQL, e.g.
`{ id: "sql", name: "SQL", icon: "db", proven: true, description: "..." }`.
It turns gold once two projects or roles use it.

### Add or rename a skill
In `tree`, add `{ id: "dax", name: "DAX", icon: "bars_v", description: "..." }` inside a capability's `skills: [...]`.
Keep the map to **three levels**: category → capability → skill. Icon names are listed in `assets/js/common.js` (`ICONS`).
If you mistype a skill id in a project, the browser console (F12) shows a warning naming it.

### Milestones and recommendations
Edit `milestones` and `recommendations` near the bottom of `data.js`. Use `kind: "featured"` for one milestone only.

### Publish an update
After changing any CSS or JS file, bump the `?v=` number on the `style.css` and `.js` links in
`index.html`, `projects.html` and `project.html`, so returning visitors don't mix old and new files.

Edit the file on GitHub directly (open `assets/js/data.js` → pencil icon → **Commit changes**), or upload the
changed file again. GitHub Pages refreshes in about a minute.

---

## 4. Change the look

All colours and fonts are tokens at the top of `assets/css/style.css` (`--accent-gold`, `--surface-base` …).
Change a token once and every component follows. Text colours were chosen to meet WCAG AA contrast (4.5 : 1).

### The pixel-world background
`assets/js/bg.js` draws an original pixel-art night scene (sky, mountains, hills with trees, dirt, stone,
caves and ore). Scrolling the page slowly moves the view from the surface down into the deep layers.
Tune it without touching the drawing code:

| Want | Change |
|---|---|
| More or less blur | `--bg-blur` in `style.css` (default `3px`) |
| Darker or lighter scene | `--bg-tint` in `style.css` (raise the last number to darken) |
| A different world | `SEED` at the top of `bg.js` |
| Deeper or shallower dig | `WORLD_SCREENS` in `bg.js` |
| Turn it off | remove the `bg.js` script line from the three HTML pages |

The scene's colours are kept darker than the page surface so all text stays at WCAG AA contrast;
if you brighten the palette (`C` in `bg.js`), check the text contrast again.

## 5. Accessibility and behaviour built in

- Every skill is a real button: **Tab** to move, **Enter/Space** to open details, **Esc** to close.
  Focus returns to the skill you came from.
- Hover shows a short preview on desktop; click/tap is always the main way in.
- Under 760 px the tree becomes an accordion, and details open as a bottom sheet. No horizontal scrolling.
- `prefers-reduced-motion` turns animations off.
- Deep links: `index.html?skill=py#map` opens Python's details; `projects.html?skill=py` filters projects;
  `index.html?view=finance#map` opens the Finance focus view.
