# cv

My personal online resume — a static site built with a Gulp pipeline, Pug templates, and Stylus.

---

## Tech stack

| Layer | Tool |
|---|---|
| Templates | [Pug](https://pugjs.org) (formerly Jade) |
| Styles | [Stylus](https://stylus-lang.com) + [Lost Grid](https://github.com/peterramsing/lost) + [Rupture](https://github.com/jescalan/rupture) + [Rucksack](https://www.rucksackcss.org) |
| Scripts | ES6 via [Babel](https://babeljs.io) |
| Build | [Gulp 4](https://gulpjs.com) |
| Dev server | [BrowserSync](https://browsersync.io) with live reload |
| Icons | Font Awesome (via Bower) |

---

## Getting started

### Prerequisites

- Node.js
- npm

### Install

```bash
npm install
npx bower install
```

> `bower install` is needed for Font Awesome, which is managed separately from npm packages.

### Run locally

```bash
npx gulp serve
```

Opens at **http://localhost:9000** with live reload — the browser refreshes automatically as you edit `.jade` or `.styl` files.

---

## Available tasks

| Command | Description |
|---|---|
| `npx gulp serve` | Start dev server with live reload |
| `npx gulp build` | Compile and optimize everything into `public/` |
| `npx gulp deploy` | Deploy `public/` to GitHub Pages |
| `npx gulp clean` | Delete `.tmp/` and `public/` |

---

## Project structure

```
src/
├── index.jade        # Resume content and markup
├── styles/
│   └── main.styl     # Styles (imports vendor libs via bower:styl block)
├── scripts/          # JavaScript
├── images/           # Static images
└── fonts/            # Custom fonts

public/               # Production build output (git-ignored)
.tmp/                 # Dev build output (git-ignored)
bower_components/     # Bower-managed frontend deps (git-ignored)
```

---

## Publishing to GitHub Pages

Changes to `src/` are not automatically live — you need to build and deploy explicitly.

```bash
# 1. Make your changes in src/
# 2. Commit them to master
git add .
git commit -m "your message"

# 3. Build the production bundle
npx gulp build

# 4. Push the build to the gh-pages branch
npx gulp deploy
```

`gulp deploy` pushes the contents of `public/` to the `gh-pages` branch of the repo. GitHub Pages serves from that branch, so the site goes live within seconds.

> **Note:** always run `gulp build` before `gulp deploy` — deploying without rebuilding will publish whatever was last compiled to `public/`, which may be stale.

---

## How the build works

1. **Pug** compiles `src/index.jade` → `.tmp/index.html`
2. **Stylus** compiles `src/styles/main.styl` → `.tmp/styles/main.css`, using Lost for the grid, Rupture for breakpoints, and Axis + Rucksack for utilities
3. **Babel** transpiles `src/scripts/**/*.js` → `.tmp/scripts/`
4. **BrowserSync** serves from `.tmp/` and `src/`, watching for changes
5. On `gulp build`, everything is minified and written to `public/`
