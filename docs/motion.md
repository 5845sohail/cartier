# Motion and responsive behavior

The visual effect is built from layered images, clipping, transforms, and a short watch film. There is no freely rotatable 3D model.

## Opening sequence

`js/startup.js` handles the intro once per page load. A black curtain covers the page immediately. The centered logo fades in after 400 ms over 1 second, then fades out over 1 second. At 1.8 seconds the curtain slides up and the hero rises from a 50% vertical offset, both over 1.2 seconds. The caption begins its 2-second fade at 2.8 seconds. The logo is loaded eagerly so it cannot miss its fade while hidden. Reduced-motion preferences use a brief logo screen and dissolve instead of the moving reveal and does not replay when resizing.

## Hero

The branded loading transition reveals a three-scene carousel. Slides advance every 4 seconds. The scenery, watch panel, and background lettering move independently, with 1.6-second transitions and `inOutQuint` easing. The outgoing background scales to 1.15.

## Collection and editorial sections

The two product carousels share an 800 ms slide transition. Desktop shows four cards, tablets show two, and portrait phones show one and a half. Image reveals and parallax movement follow the original scroll timelines.

## Categories

Desktop pins the two-column composition while scrolling advances through three watch scenes. Smaller screens replace that scene with stacked watch images and descriptions. These are separate markup sections; keep both when editing the page.

## Other interactions

The original runtime controls product hover effects, menu expansion, the feature side panel, testimonial slider, footer reveal, and the pointer-following watch in the final call to action. `js/main.js` adds section navigation, keyboard activation, Escape handling, and the local newsletter demo.

## Breakpoints

| View            | Width            |
| --------------- | ---------------- |
| Desktop         | 992 px and above |
| Tablet          | 768–991 px       |
| Small screens   | 480–767 px       |
| Portrait phones | 479 px and below |

## Animation bindings

`js/animations.js` contains readable timeline data followed by its initialization call. The engine in `vendor/webflow-runtime.min.js` reads that data. Its target IDs, action IDs, and selector classes are retained from the reference, so changing them independently will break animation bindings.
