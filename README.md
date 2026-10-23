# Essentials Demo

A complete, simulated meeting-room system built on [PepperDash Essentials](https://github.com/PepperDash/Essentials). Load one program onto a Crestron 4-series processor or a VC-4 server, open the touchpanel UI in a browser, and explore. No hardware needed.

**Documentation: https://pepperdash.github.io/EssentialsDemoConfig/**

Start with [Tutorial 1: Run the demo](https://pepperdash.github.io/EssentialsDemoConfig/tutorials/01-run-the-demo.html).

## This repository

- `essentialsV3Demo-configurationFile.json`: the config file that defines the demo room and its devices.
- `docs/`: the documentation site ([docfx](https://dotnet.github.io/docfx/)), published to GitHub Pages on each push to `main`.
- `artifacts/cpz/`: the demo program, a single `.cpz` that holds the latest build.
- `scripts/update-cpz-links.mjs`: points the docs' download links at that `.cpz` (see below).
- [`docs/media/essentials-3-frameworks-update.pdf`](docs/media/essentials-3-frameworks-update.pdf): overview slides on what's new in Essentials 3.0 and Dev Tools 1.6.

To preview the docs locally:

```
dotnet tool update -g docfx
docfx docs/docfx.json --serve
```

Then open http://localhost:8080.

### Updating the demo bundle

The `.cpz`'s file name includes the Essentials version, so the docs' download links go stale when you add a new bundle. After you put the new `.cpz` in `artifacts/cpz/` (and move or delete the old one), run:

```
node scripts/update-cpz-links.mjs
```

It rewrites the links, and the "about N MB" note, in `docs/` to match the file in `artifacts/cpz/`. It needs [Node.js](https://nodejs.org/) 18 or later, and works the same on macOS and Windows. Run it with `--check` to see whether the links are up to date without changing anything. Then commit the docs changes together with the new bundle.

## The other demo repositories

| Repository | Contents |
|---|---|
| [EssentialsDemoRoom](https://github.com/PepperDash/EssentialsDemoRoom) | The Essentials plugin with the demo room type and simulated devices |
| [EssentialsDemoReactApp](https://github.com/PepperDash/EssentialsDemoReactApp) | The touchpanel UI, a React web app |

## License

MIT. See [LICENSE](LICENSE).
