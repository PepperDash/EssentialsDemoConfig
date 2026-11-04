# Run the UI on a TSW panel

A browser is all you need to use the demo. To run the same UI on a Crestron TSW touchpanel, load the **Mobile Control touchpanel wrapper app** onto the panel and point the panel at the processor. The wrapper is a small CH5 project. When the panel connects, Essentials sends it the UI's address, and the wrapper opens the demo UI full screen.

**You'll need:**

- the demo running (see [Tutorial 1](../tutorials/01-run-the-demo.md));
- a TSW-x60, x70 or x80 series panel on the same network as the processor or VC-4 server;
- the wrapper app: [download the `.ch5z`](https://github.com/PepperDash/EssentialsDemoConfig/raw/main/artifacts/ch5z/Mobile-Control-Touchpanel-Wrapper-App-1.3.0.ch5z) (about 320 KB). It's kept in this repo's `artifacts/ch5z/` folder.

The wrapper only hosts the UI, so updating the demo or its UI doesn't mean reloading the panel. Load the wrapper again only when a new version of it is added to `artifacts/ch5z/`.

## Step 1: Load the wrapper app onto the panel

On VC-4, first add the `.ch5z` to the demo's **Program Library** entry in the VC-4 web interface, as the program's touch panel project (see [Tutorial 1](../tutorials/01-run-the-demo.md), Step 1). Then load it onto the panel:

1. Copy the `.ch5z` to the panel's `/display/` folder, using Crestron Toolbox's file manager or any SFTP client. Sign in with the panel's admin account.
2. Open the panel's console (SSH, or Toolbox's Text Console) and run:

   ```
   projectload
   ```

The panel restarts its project and shows the wrapper's waiting screen until a processor sends it a UI.

<!-- TODO(verify): projectload steps on TSW-x70 firmware, and whether Toolbox's "Send Project" is the simpler route. -->

## Step 2: Point the panel at the processor

The demo's config already has a panel for this, the **Test TSW** (`tsw1070`) at IP ID **04**:

```json
{
  "name": "Test TSW",
  "key": "tsw1070",
  "type": "mctsw1070",
  "properties": {
    "control": { "ipid": "04", "method": "ipid" },
    "defaultRoomKey": "room1",
    "useDirectServer": true,
    "theme": "midnight",
    "buttonToolbarTimeoutInS": 30
  }
}
```

In the panel's setup (its **Settings** screen, or Toolbox), set the control system connection:

# [4-series processor](#tab/4series)

| Setting | Value |
|---|---|
| Control system address | the processor's IP address or hostname |
| IP ID | `04` |

# [VC-4](#tab/vc4)

| Setting | Value |
|---|---|
| Control system address | the VC-4 server's IP address or hostname |
| IP ID | `04` |
| Room ID | the demo room's ID, as shown in the VC-4 web interface |

The panel also loads the UI from port **50002** on the server, so that port must be open in the server's firewall (see [Tutorial 1](../tutorials/01-run-the-demo.md), Step 1).

---

<!-- TODO(verify): setup screen and field names on TSW-x70 firmware. -->

Once the panel is online, Essentials sends it the UI's address, with a token for `room1`, and the wrapper opens the demo UI. That takes a few seconds.

## Use a different panel model

The device's `type` tells Essentials which panel model to expect, and the model has to match. For a model other than a TSW-1070, change `type` in the `tsw1070` entry, then restart the program. For example, use `mctsw770` for a TSW-770, or `mctsw1080` for a TSW-1080. Essentials 3.0 supports:

`mctsw550`, `mctsw560`, `mctsw570`, `mctsw750`, `mctsw760`, `mctsw770`, `mcts770`, `mctsw1050`, `mctsw1060`, `mctsw1070`, `mcts1070`, `mctsw1080`, `mcts1080` and `mcdge1000`.

For a second panel, copy the entry and give the copy its own `key` and `ipid`. See [Tutorial 3](../tutorials/03-first-config-change.md) for editing the config.

## If the UI doesn't appear

- **The panel stays on the waiting screen.** The panel isn't online with the program. Check its address and IP ID. On a 4-series processor, run `ipt -p:1` in the console and look for IP ID `04`. If another program on the processor already uses IP ID `04`, give the `tsw1070` entry a different `ipid`, and set the panel to match.
- **The panel shows an error loading the page.** The panel can't reach port 50002. On VC-4, check the server's firewall.
