# Cartier watch motion recreation

A responsive, locally bundled recreation of https://cartier-watches.webflow.io/ by Joseph Berry, built for the supplied reference request. Public reference visuals, fonts, markup, styles, and Webflow interaction runtime are preserved to reproduce the actual motion instead of approximating it. Asset URLs are recorded in `asset-map.json`. `motion-config.json` is the readable original interaction configuration.

Run `python3 -m http.server 4317 --directory dist` and open http://localhost:4317. No installation or build is required. Deployment uses `.openai/hosting.json`.

## Motion analysis

- A branded intro loader wipes away before the hero rises into view.
- The hero cycles through three layered scenes every 4,000 ms. Incoming and outgoing scenery and watch panels move and scale independently over 1,600 ms using `inOutQuint` easing; the background scales to 1.15 during exit. Large italic text moves behind the watch panel.
- Scroll-linked hero movement and editorial image reveals retain the reference keyframes. The apparent 3D look combines translate3d, scaling, layered clipping, and perspective; there is no WebGL model to rotate freely.
- The product carousel uses Splide 3.2.2, 800 ms slide transitions, drag interaction, and responsive per-page counts of 4 / 2 / 1.5.
- The desktop category scene pins its layout while scroll advances through three watch compositions. Mobile replaces it with stacked image and description sections.
- Product hover scaling, menu expansion, feature side panel, testimonial slider, footer reveal, and pointer-following final watch are retained.
- Original breakpoints: desktop >=992px; tablet 768–991px; small 480–767px; portrait <=479px.

## Boundaries

This is an independent visual study, not an official Cartier store. Sample product prices and testimonial copy are carried over from the reference. Checkout, orders, careers, contact service, and newsletter delivery have no backend. Newsletter submission explicitly displays a preview-only message and sends no data. Navigation and shopping CTAs link to the relevant page sections. No credentials or screen recording are included in the deployed site.
