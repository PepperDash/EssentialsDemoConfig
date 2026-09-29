# Essentials Demo

A complete, simulated meeting-room system built on [PepperDash Essentials](https://github.com/PepperDash/Essentials). Load one program onto a Crestron 4-series processor or VC-4, open the touchpanel UI in a browser, and explore. No hardware needed.

**Documentation: https://pepperdash.github.io/EssentialsDemoConfig/**

Start with [Tutorial 1: Run the demo](https://pepperdash.github.io/EssentialsDemoConfig/tutorials/01-run-the-demo.html).

## This repository

- `essentialsV3Demo-configurationFile.json`: the config file that defines the demo room and its devices.
- `docs/`: the documentation site ([docfx](https://dotnet.github.io/docfx/)), published to GitHub Pages on each push to `main`.
- [`docs/media/essentials-3-frameworks-update.pdf`](docs/media/essentials-3-frameworks-update.pdf): overview slides on what's new in Essentials 3.0 and Dev Tools 1.6.

To preview the docs locally:

```
dotnet tool update -g docfx
docfx docs/docfx.json --serve
```

Then open http://localhost:8080.

## The other demo repositories

| Repository | Contents |
|---|---|
| [EssentialsDemoRoom](https://github.com/PepperDash/EssentialsDemoRoom) | The Essentials plugin with the demo room type and simulated devices |
| [EssentialsDemoReactApp](https://github.com/PepperDash/EssentialsDemoReactApp) | The touchpanel UI, a React web app |

## License

MIT. See [LICENSE](LICENSE).
