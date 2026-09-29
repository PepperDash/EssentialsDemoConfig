# Tutorial 2: Explore the technician pages

The demo has a PIN-protected technician menu, the kind of tools an installer or support tech uses. In this tutorial you'll unlock it and see live device status, display control and matrix routing, all driven by the same devices the room uses.

**Before you start:** complete [Tutorial 1](01-run-the-demo.md) and have the UI open, with the room on.

## Step 1: Unlock the tech menu

1. **Press and hold** the audio icon (sliders) in the header for **3 seconds**.
2. **Enter Access Code** appears, with a keypad. Enter **1234**.

The keypad clears and flashes **Incorrect** if the code is wrong. The code comes from the room's config file (`tech.password`); you'll change it in [Tutorial 3](03-first-config-change.md).

You're now in the tech menu. The navigation on the left has **System Status**, **Displays**, **Routing**, **Volume** and **About**. **Exit Technician Controls** at the top right takes you back to the room.

## Step 2: System Status

System Status shows a health row for each device in the room: the matrix router, both displays, program audio, the four sources and the lighting. Each shows **Online**.

The status comes from each device's own communication monitor. For a real device, that's the same "is it talking?" status you'd watch in SIMPL. For the demo's simulated devices it's always online.

Along the bottom are **Rack Temp** and **Rack Humidity** from a (simulated) rack sensor. Humidity reads 10% and shows a **warning**: the page warns below 30% relative humidity and above 60%.

## Step 3: Displays

Select **Left Display**. You see its **Power State** (**Power Off**, **Power On**) and its **Inputs**.

1. Tap **Power On**. The button **pulses** for about 10 seconds while the display warms up, then stays lit.
2. Tap **Power Off**. **Power Off** pulses during cool-down.
3. Tap an input (**HDMI 1** to **HDMI 4**, **DisplayPort**) to switch it. The selected input lights up.

The simulated display has real warm-up and cool-down timers, so the UI is showing genuine device state as it changes, not a button that toggles itself.

## Step 4: Routing

The Routing page is a classic matrix-switcher tie screen for the room's matrix router:

- Across the top: the signal type to route, **Audio**, **Video** or **Audio & Video**.
- **Inputs:** the four sources, each with a signal dot, plus **None**.
- **Outputs:** **Left Display**, **Right Display** and **Program Audio**. Each shows its current audio (**A:**) and video (**V:**) input.

Make a route:

1. Select **Video**.
2. Tap **Cable TV** under Inputs.
3. Tap the **Left Display** output. Its **V:** line changes to Cable TV; **A:** doesn't.

Tap **None**, then an output, to clear that output for the selected signal type.

### See the room and the tech page stay in sync

1. Open the UI in a second browser tab. Leave this tab on the tech Routing page.
2. In the new tab, start the room if needed and switch on **Advanced Sharing**.
3. Route **Wireless Presentation** to the **Right Display** card.

Back in the first tab, the **Right Display** output now shows Wireless Presentation for both audio and video. Both pages are driven by the same matrix device, so when the room routes a source through it, the tech page shows it.

> [!NOTE]
> Routes you make *on the tech Routing page* switch the matrix directly, like a technician using the switcher's own front panel. The room's destination cards don't track those; they show what the room itself routed.

## Step 5: Volume

The Volume page has the overall **Room** volume, plus a fader and mute for each audio point in the room: **Program**, **Wireless Mic** and **Lectern Mic**. They're the same controls as the room's audio panel, laid out for a technician.

## Step 6: About

About shows the software versions: the touchpanel app, Essentials, and each loaded plugin. **Reboot** and **Program Reset** each ask you to confirm first.

> [!WARNING]
> **Reboot** restarts the whole processor. **Program Reset** restarts the program, which you'll use in the next tutorial to load config changes. Only confirm them if that's OK for your processor.

Tap **Exit Technician Controls** to go back to the room.

## What you've learned

- The tech pages show live state from the same devices the room uses: communication status, warm-up and cool-down, matrix crosspoints and sensor readings.
- Everything on these pages is configured, not hard-coded: which devices appear on System Status, which displays are listed, which matrix is routed, and the PIN are all set in the room's config.

**Next:** [Tutorial 3: Make your first config change](03-first-config-change.md)
