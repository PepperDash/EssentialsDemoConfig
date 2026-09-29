---
_layout: landing
---

# Essentials Demo

A complete, working room system built on [PepperDash Essentials](https://pepperdash.github.io/Essentials/), the open-source framework for Crestron 4-series processors and Crestron Virtual Control (VC-4).

Every device in the demo is simulated. Load one program file, start it, and you have a two-display meeting room you can use from a browser:

- Source selection, with per-display routing through a matrix switcher.
- Lighting scenes, help and volume.
- A technician menu with system status, display power and input control, matrix routing, volume and version info.

Nothing needs to be wired up. Once you've seen it run, you can change it: the room is defined by a JSON config file, not a compiled program.

## Start here

**New to Essentials?** Work through the tutorials in order. They take you from loading the program to adding a new source to the system, with no code.

> [!div class="nextstepaction"]
> [Tutorial 1: Run the demo](tutorials/01-run-the-demo.md)

**Know what you want to do?** Go straight to the [how-to guides](how-to/index.md).

**Want to know how it works?** Read [how the demo fits together](explanation/how-the-demo-fits-together.md).

**What's new in Essentials 3.0?** See the [Essentials 3.0 and Dev Tools 1.6 overview slides](media/essentials-3-frameworks-update.pdf) (PDF).

## What you need

- A Crestron 4-series processor or a VC-4 server you can load programs onto.
- The demo program file (`.cpz`). <!-- TODO(user): link to the published .cpz, e.g. a GitHub release -->
- A web browser on the same network as the processor.
- An SSH client or Crestron Toolbox, for the processor console.

You don't need a touchpanel, displays or any other hardware.

## What's in the demo

The demo is built from three open-source repositories, all MIT licensed:

| Repository | What it contains |
|---|---|
| [EssentialsDemoConfig](https://github.com/PepperDash/EssentialsDemoConfig) | The configuration file that defines the room, and this documentation |
| [EssentialsDemoRoom](https://github.com/PepperDash/EssentialsDemoRoom) | An Essentials plugin (C#) containing the room's logic and a few simulated devices |
| [EssentialsDemoReactApp](https://github.com/PepperDash/EssentialsDemoReactApp) | The touchpanel user interface, a React web app served by the processor |

The framework itself is at [PepperDash/Essentials](https://github.com/PepperDash/Essentials).
