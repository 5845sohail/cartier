# Cartier watch showcase

A static, responsive recreation of the [Cartier Webflow reference](https://cartier-watches.webflow.io/) by Joseph Berry. It includes the three-scene hero, product carousels, editorial image reveals, category sequence, feature panel, and footer motion.

## Run locally

From this folder:

```sh
npm start
```

Open **http://127.0.0.1:4317**. Node.js and Python 3 are required for the provided commands. There are no packages to install and no build step. You can also serve the folder directly with `python3 -m http.server 4317`.

## Project layout

```text
index.html                Page markup, grouped by section
css/
  styles.css              Layout, typography, components, and breakpoints
  global.css              Fluid sizing and page-wide presentation
  carousel.css            Product carousel styling
  animation-states.css    Initial states before animations start
  accessibility.css       Focus and reduced-motion adjustments
  startup.css             Black loading screen and first-paint hero states
js/
  main.js                 Navigation, keyboard controls, and newsletter demo
  carousel.js             Shared product carousel options
  animations.js           Editable motion timelines and initialization
  detect-browser.js       Early browser capability classes
  startup.js              Logo fade, curtain reveal, and hero entrance
assets/
  images/                 Watch photos, cutouts, and responsive variants
  icons/                  Logo, controls, and browser icons
  fonts/                  Local display and body fonts
  video/                  Watch film and poster
vendor/                   Third-party runtime and base styles
scripts/check-assets.py   Local file and animation-binding checks
docs/                     Motion notes and asset attribution
```

## Editing

- Change content and section order in `index.html`.
- Edit layouts and responsive rules in `css/styles.css`; page-wide type sizing lives in `css/global.css`.
- Adjust carousel speed and visible card counts in `js/carousel.js`.
- Update page behavior in `js/main.js`.
- Adjust the opening sequence using the named timing values in `js/startup.js`. Its first-paint states live in `css/startup.css`.
- Motion is defined in `js/animations.js`. Keep the `data-w-id` attributes and animation selector classes in the HTML: the timelines bind to them. Inline transform styles are intentional starting states, not leftover layout styling.
- Leave `vendor/` unchanged unless upgrading a library. Minified vendor code is separate from the readable site code.

Run `npm run check` after moving files or editing scripts. Source formatting follows `.prettierrc.json`; Prettier is optional and isn't required to run the site.

## Demo boundaries

This is an independent visual study, not an official Cartier store. Sample prices and testimonial content come from the reference. Checkout, order tracking, careers, and customer service have no backend. Newsletter submission displays a preview message and sends no email address anywhere.

All runtime assets are local. See [asset sources](docs/asset-sources.json) and [motion notes](docs/motion.md) for the reference details. No hosting configuration or deployment tooling is included.
