# Michelego

> Turn a photo into a buildable LEGO mosaic.

Michelego is a small, privacy-friendly, client-side web application that converts an image into a LEGO mosaic preview. It maps each pixel of the generated grid to the nearest color in the configured LEGO palette and produces a parts list for the build.

## Features

- Upload an image by browsing or dragging and dropping it into the app.
- Preserve the source image's aspect ratio while changing the mosaic size.
- Generate a live mosaic preview from **12 to 96 studs** on the longest side.
- Use a palette based on real LEGO parts and colors.
- Show a bill of materials with part images, element IDs, colors, and quantities.
- Open each part directly in LEGO Pick a Brick.
- Export the bill of materials as:
  - a generic CSV;
  - a Rebrickable-compatible inventory CSV.
- Run entirely in the browser: uploaded images are processed locally and are not sent to a Michelego backend.

## Screenshots

_Add screenshots or a demo GIF here when they are available._

## Quick start with Docker

The repository includes a multi-stage Dockerfile that builds the Vite application and serves the static files with Nginx.

```bash
docker build -t michelego .
docker run --rm -p 8080:80 michelego
```

Open [http://localhost:8080](http://localhost:8080).

To run it on another host port, for example `3000`:

```bash
docker run --rm -p 3000:80 michelego
```

Then open [http://localhost:3000](http://localhost:3000).

## Local development

### Requirements

- Node.js 22 or newer
- npm

### Install and run

```bash
npm ci
npm run dev
```

Vite will print the local development URL, usually [http://localhost:5173](http://localhost:5173).

### Production build

```bash
npm run build
npm run preview
```

The production files are generated in `dist/`.

## How it works

1. The browser reads the selected image with the File API.
2. The image is resized to the selected mosaic dimensions using an HTML canvas.
3. Each sampled RGB value is matched to the nearest configured LEGO color using RGB distance.
4. The resulting color grid is rendered as the mosaic preview.
5. The grid is counted by color and LEGO element to create the bill of materials.

No database, account, API key, or server-side image-processing service is required.

## Project structure

```text
.
├── src/
│   ├── main.tsx              # Application and mosaic generation logic
│   ├── legoParts.ts          # LEGO part and color data
│   ├── rebrickableColors.ts  # Rebrickable color ID mapping
│   ├── types.ts              # Shared TypeScript types
│   └── styles.css             # Application styles
├── Dockerfile                # Production container image
├── nginx.conf                # Nginx configuration
├── index.html
├── package.json
└── vite.config.ts
```

## Limitations and known behavior

- The current implementation uses a simple RGB nearest-color match. It does not yet apply perceptual color correction, dithering, or error diffusion.
- The height follows the source image ratio and cannot currently be adjusted independently.
- The generated BOM is based on the configured part catalog. Check availability and current prices on LEGO Pick a Brick before purchasing.
- The Rebrickable export is intended for inventory import workflows; verify the color and part mapping in Rebrickable before ordering.
- The default preview image is a remote demo image. Uploaded images remain local to the browser.

## Contributing

Contributions are welcome. Before opening a pull request:

1. Create a focused branch from the default branch.
2. Install dependencies with `npm ci`.
3. Run the production build with `npm run build`.
4. Keep changes focused and explain user-visible behavior in the pull request.
5. Do not commit generated files, secrets, `.env` files, or `node_modules/`.

For larger changes, open an issue first so the approach can be discussed.

## Roadmap ideas

- Perceptual color matching and optional dithering.
- Manual palette selection and color exclusion.
- Printable build instructions with row-by-row placement.
- PNG/SVG export of the mosaic.
- More plate and brick configurations.
- Optional Docker Compose and health-check documentation.
- Automated tests for color matching, dimensions, and CSV exports.

## Privacy

Michelego is designed to process images locally in the browser. Self-hosting the static application does not require storing user images or creating user accounts.

## License

No license has been declared yet. Until a license is added to this repository, the source code should not be assumed to be freely redistributable. Add a `LICENSE` file before publishing the project as an officially open-source release.
