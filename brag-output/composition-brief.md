# Hyperframes Composition Brief: Michelego

## Objective
Create a 20-second polished launch video for Michelego, showing the real product idea: photo to LEGO mosaic to build list.

## Output
- Composition directory: `brag-output/composition/`
- Rendered video: `brag-output/brag.mp4`
- Format: landscape 1920x1080
- Duration: 20 seconds

## Source Material
- Project root: `/root/Michelego`
- Primary files: `index.html`, `src/main.tsx`, `src/styles.css`, `README.md`
- Product name: Michelego
- Strongest claim: "Upload a photo, tune the grid, and get a buildable parts list using real LEGO colours and 1x1 plates."
- Key UI: source image dropzone, dark mosaic grid, dimensions counter, BOM rows and export actions.
- Copy to use: "What if your photo was buildable?" / "48 x 36" / "1,728 plates" / "Upload a memory. Build it one brick at a time."

## Creative Direction
- Tone: polished, warm product film
- Angle: make the transformation feel tactile and precise without pretending the app is more complex than it is.
- Hook: a photo becomes a grid of LEGO studs.
- Outro: upload a memory, build it one brick at a time.
- Avoid generic SaaS language, abstract filler, and unrelated redesign.

## Visual Identity
- Background: warm off-white `#f5f1ea`
- Text: near-black `#171717`
- Accent: LEGO-inspired saturated colour blocks
- Display font: Georgia fallback
- Body font: system sans-serif
- References: real mosaic grid, dimension controls, BOM rows.

## Storyboard
1. The premise — 3s — photo tile and hook.
2. The transformation — 5s — grid resolves from the photo.
3. Tune the build — 4s — dimensions and plate count.
4. The build list — 5s — BOM rows and export buttons.
5. Outro — 3s — full mosaic and final line.

## Audio
- Audio role: warm upbeat bed with sparse tactile UI accents.
- Audio arc: curiosity, lift on reveal, clean final resolve.
- Music: bundled Happy Beats track.
- Music treatment: low start, lift at mosaic reveal, fade under final mark.
- Music cue guidance: detect at composition time; target major reveals around 7s and 13s.
- Audio-reactive treatment: subtle glow/depth response only.
- Audio-coupled moments: upload click, grid resolve, count-up, BOM rows, final logo.
- SFX: motion-matched and restrained.

## Hyperframes Instructions
Use actual Michelego copy and UI motifs. Keep all text readable. Include a local music track and sparse SFX. Run `npx hyperframes check` before rendering. The composition must be deterministic and seek-safe.
