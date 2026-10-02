# Tutorial 1: Run the demo

In this tutorial you'll load the demo onto a processor, open its touchpanel UI in a web browser, and use the room the way a meeting-room user would.

**You'll need:** a 4-series processor, the [demo `.cpz`](https://github.com/PepperDash/EssentialsDemoConfig/raw/main/artifacts/cpz/PepperDashEssentials.3.0.0-rc.10.net8_EssentialsDemoConfig-v1.0.1.cpz), and a browser on the same network.

## Step 1: Load the program

The `.cpz` contains everything: Essentials, the demo room plugin, the room's config file, the touchpanel app and Essentials Dev Tools. You load it the same way as any other program.

1. Copy the `.cpz` to the processor's `/program01/` folder. You can use Crestron Toolbox's file manager or any SFTP client.
2. Open the processor console (SSH, or Toolbox's Text Console) and run:

   ```
   progload -p:1
   ```

<!-- TODO(verify): confirm the exact upload steps and whether progload is needed after an SFTP copy of the bundled .cpz. -->

The program takes a minute or two to start. When it's ready, the console shows Essentials' startup messages, finishing with the devices it created.

To check it's running, run this in the console:

```
devlist:1
```

You should see a list of devices, including `display-1`, `display-2`, `matrix-router` and `room1`. Each of these was created from an entry in the config file. You'll edit that file in Tutorial 3.

## Step 2: Open Dev Tools

Essentials has its own browser-based developer tools, **Essentials Dev Tools**, and the demo `.cpz` installs them. When Essentials starts, it unpacks them into the processor's own web server. You'll use them to open the UI, and later to watch routing happen.

1. In your browser, go to:

   ```
   https://<processor-ip>/cws/debug/
   ```

   The processor uses a self-signed certificate, so your browser shows a security warning the first time. Accept it to continue.
2. On the **Sign In** page, enter the processor's username and password, the same account you use for SSH or Toolbox, and select **Sign In**.

Dev Tools finds the Essentials programs running on the processor and opens the first one on the **Versions** page. Select **Devices** to see the same devices `devlist` listed in Step 1; selecting one shows its properties and lets you call its methods (see [Inspect and control devices](../how-to/inspect-devices-from-console.md)). The drop-down menu in the top bar shows which program you're looking at: **app01** is the demo in program slot 1. The links along the top bar are the rest of the tools. This tutorial uses **Mobile Control** and **Routing**.

## Step 3: Open the UI

The touchpanel UI is served by the processor itself, by Essentials' Mobile Control web server on port **50002**. Each UI client connects with a token that ties it to a room. You can get a client's address from Dev Tools or from the console.

# [Dev Tools](#tab/devtools)

1. In Dev Tools, select **Mobile Control** in the top bar.
2. The **Direct Server** section shows the Mobile Control server's **User App URL** and **Server Port** (50002), and how many clients are defined and connected.
3. The **Clients** table has a row for each UI client, with its **Room Key**, **Token** and **URL**. Find a row whose **Room Key** is `room1` and select its **URL**.

The UI opens in a new tab. To open it on another device, right-click the link and copy its address.

> [!TIP]
> To make a new client, select **Add +** above the table, enter `room1` as the **Room Key**, and select **Create**. The new row has its own token and URL.

# [Console](#tab/console)

1. In the console, run:

   ```
   mobilegetclientinfo:1
   ```

   It lists the clients the program has set up, one per line:

   ```
   RoomKey: room1 Token: 3f2c9a1e-...
   ```

2. Copy the token, then in your browser go to:

   ```
   http://<processor-ip>:50002/mc/app?token=<token>
   ```

<!-- TODO(verify): command name casing/slot suffix, and that the "browser" (mcxpanel) device's token appears here after a fresh load. -->

---

After a moment of "syncing", you'll see the **Demo Room** splash screen, with the PepperDash logo and **Touch Screen to Begin**.

> [!TIP]
> Size the browser window to a touchpanel's landscape shape (roughly 16:10) for the intended layout.

## Step 4: Start the room

Tap **Touch Screen to Begin**.

The room turns on and routes its default source, **Laptop**, to both displays. You're now on the room's home screen:

- The **header** shows the room name, the time, and three icons: lighting, help and audio.
- The **center** shows **Select a source below**, with a row of source tabs.
- A **volume fader** is on the right.
- The **footer** shows **Sharing** and **End Session**.

The green dot next to the current source means the source has signal. The demo's sources are simulated, so they always do, unless you break one (see [Simulate a lost video signal](../how-to/simulate-lost-video-signal.md)).

## Step 5: Share a source

Tap **Media Player**.

The selected source changes. Behind the scenes Essentials has just done three things:

1. Routed Media Player's video and audio through the matrix switcher to both displays.
2. Routed its audio to the room's program audio output.
3. Recorded the new current source on each display.

You didn't write any of that logic. The room's config lists which destinations each source goes to, and Essentials works out the path through the switcher from the config's *tie lines*, the equivalent of the cable runs on a wiring diagram.

### See the route in Dev Tools

Switch to your Dev Tools tab and select **Routing** in the top bar. It draws the demo's wiring as a diagram: each device is a box with its input and output ports, and each tie line is a line between them, coloured by signal type. The **Live** badge in the toolbar means the diagram is getting route changes from the processor as they happen.

Inside the **Matrix Router** box you can see which input each output is currently switched to: **Media Player** to both displays and to program audio. Select a tie line or a device to highlight the whole signal path, and select an empty part of the diagram to clear it.

Keep the Routing tab open while you do the next step. The diagram changes as you route.

> [!TIP]
> If the badge shows **Offline** and a banner says the live feedback connection failed, open the address in the banner in a new tab, accept its certificate, then reload the Routing page.

## Step 6: Route each display separately

Turn on the **Advanced Sharing** switch on the left.

The center now shows two destination cards, **Left Display** and **Right Display**, each showing what's on it. To route one display:

1. Tap a source tab at the bottom, for example **Cable TV**.
2. Tap the **Right Display** card.

Only the right display changes. The small speaker button on each card makes that display's source the one the room *hears* (program audio). It lights up on the card whose source is currently heard.

Turn **Advanced** off again to return to basic sharing.

## Step 7: Try the header controls

- **Lighting** (bulb icon): six scenes, from **All On** to **All Off**. Tap one.
- **Help** (question mark): shows the room's help message.
- **Audio** (sliders icon): tap briefly to open volume and mute controls for **Program**, **Wireless Mic** and **Lectern Mic**, with the overall **Room** volume on the right. Mute one and its icon turns red and its fader dims.

Tap outside a panel to close it.

## Step 8: End the session

Tap **End Session** in the footer.

A confirmation appears, with a progress bar counting down from 30 seconds. You can:

- tap **Cancel** to keep the room on,
- tap **End Session** to shut down now, or
- wait for the countdown to finish.

When the room shuts down, it clears the routes and you're back at the splash screen.

> [!NOTE]
> Open the UI in a second browser tab before you tap End Session: the prompt appears in both. Every UI connected to the room shares the same live state from the processor, just as two touchpanels on one SIMPL program would.

## What you've learned

- The whole demo system, including the UI, runs from one program file.
- The UI is a web app served by the processor. Any browser with a token can be a touchpanel.
- Essentials Dev Tools, also served by the processor, gives you each UI client's address and a live diagram of the system's routing.
- Routing, audio-follows-video and shutdown come from the framework and the room's config, not from custom code.

**Next:** [Tutorial 2: Explore the technician pages](02-explore-tech-pages.md)
