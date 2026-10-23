# Tutorial 4: Add a source without writing code

In this tutorial you'll add a fifth source, a **Guest Laptop**, to the room, and route it through the matrix switcher to both displays. It will appear on the source tabs, on the advanced routing page, on the tech Routing page and on System Status, all without any code changes.

In SIMPL terms, adding a source means adding the device, wiring it to the switcher, and adding it to the UI's source list and routing logic. You'll do the same four things here, as four small config entries.

**Before you start:** complete [Tutorial 3](03-first-config-change.md), so you know how to get the config file on and off the processor and restart the program.

## Step 1: Add the device

In `devices`, add an entry for the new source, next to the other sources (for example, after `source-cable`):

```json
{
  "key": "source-guest",
  "name": "Guest Laptop",
  "type": "mockHdmiSource",
  "properties": {}
},
```

- **`key`** is the device's unique name in the system. Everything else in the config refers to it by this key.
- **`type`** chooses which kind of device Essentials creates. `mockHdmiSource` is a simulated HDMI source from the demo plugin, the same type as the other four sources.
- **`name`** is what people see.

This is like dropping a module into a SIMPL program. The difference is that you choose the module by type name, in data.

## Step 2: Add a matrix input

The sources are wired to the matrix switcher, `matrix-router`. Find it in `devices` and add a fifth input to its `inputPorts`:

```json
"inputPorts": [
  { "name": "source-laptop", "label": "Laptop", "signalType": "AudioVideo", "txDeviceKey": "source-laptop" },
  { "name": "source-wireless", "label": "Wireless Presentation", "signalType": "AudioVideo", "txDeviceKey": "source-wireless" },
  { "name": "source-media", "label": "Media Player", "signalType": "AudioVideo", "txDeviceKey": "source-media" },
  { "name": "source-cable", "label": "Cable TV", "signalType": "AudioVideo", "txDeviceKey": "source-cable" },
  { "name": "source-guest", "label": "Guest Laptop", "signalType": "AudioVideo", "txDeviceKey": "source-guest" }
],
```

`label` is the name the tech Routing page shows. `txDeviceKey` tells the input which device is plugged into it, so the input's signal dot can follow that source's signal.

## Step 3: Connect them with a tie line

A **tie line** is a cable in the system drawing: it connects one device's output port to another device's input port. Add one to the top-level `tieLines` list, from the new source's output to the new matrix input:

```json
{ "SourceKey": "source-guest", "SourcePort": "anyOut", "DestinationKey": "matrix-router", "DestinationPort": "source-guest" },
```

`anyOut` is the output port every `mockHdmiSource` has. The matrix's outputs are already tied to the displays, so with this cable in place Essentials can find a path from Guest Laptop to either display by itself.

## Step 4: Add it to the source list

In `sourceLists` → `default`, add an entry after `cable`:

```json
"guest": {
  "sourceKey": "source-guest",
  "name": "Guest Laptop",
  "order": 5,
  "includeInSourceList": true,
  "isAudioSource": true,
  "type": "route",
  "routeList": [
    { "sourceKey": "source-guest", "destinationKey": "display1", "type": "audioVideo" },
    { "sourceKey": "source-guest", "destinationKey": "display2", "type": "audioVideo" },
    { "sourceKey": "source-guest", "destinationKey": "programAudio", "type": "audio" }
  ]
},
```

`routeList` is what happens when someone picks this source on the basic sharing screen: its audio and video go to both displays, and its audio to the room's program audio. Notice that you name the *destinations*, not the switcher inputs and outputs. Essentials works out the switching from the tie lines.

## Step 5: Show it on System Status

In the room's `tech` settings, add the new device to `systemStatusDeviceKeys`:

```json
"systemStatusDeviceKeys": [
  "matrix-router",
  "display-1",
  "display-2",
  "audio-room",
  "source-laptop",
  "source-wireless",
  "source-media",
  "source-cable",
  "source-guest",
  "lighting-1"
],
```

## Step 6: Load and try it

Copy the file to the processor, run `progreset -p:1` (on VC-4, restart the room), and refresh the UI once the program has restarted. Then:

1. **Basic sharing:** start the room. **Guest Laptop** is the fifth source tab. Tap it: both displays switch to it.
2. **Advanced sharing:** turn on **Advanced Sharing**. Guest Laptop is in the source tabs. Route it to just the **Left Display**.
3. **Tech Routing:** open the tech menu and go to **Routing**. **Guest Laptop** is a fifth input, with a signal dot, and the **Left Display** output shows it.
4. **System Status:** **Guest Laptop** has its own row, showing **Online**.
5. **Dev Tools:** open Essentials Dev Tools and select **Routing**. The diagram has a new **Guest Laptop** box, tied into the **Matrix Router**'s new input, and the path to the **Left Display** is drawn through the matrix. You didn't change anything to make that happen: Dev Tools draws the diagram from the same devices and tie lines Essentials loaded from your config.

## Step 7: Add another source with an AI agent

Adding a source by hand took five edits in five places. An agent can make all five from one description, and because Guest Laptop now exists as a working example, you can point it at that. Try it with a sixth source, a **Document Camera**.

1. **Set up an agent**, if you haven't. See [Make config changes with an AI agent](../how-to/use-an-ai-agent.md).
2. **Give it this prompt:**

   ```text
   In essentialsV3Demo-configurationFile.json, add a sixth source called "Document Camera"
   with the key source-doccam, modeled on source-guest. It needs five entries:

   1. a device in `devices`, type mockHdmiSource;
   2. an input in the matrix-router device's inputPorts, with txDeviceKey source-doccam;
   3. a tie line from source-doccam's anyOut port to that matrix input;
   4. an entry in sourceLists > default with order 6, routed to display1, display2 and
      programAudio the same way source-guest is;
   5. source-doccam added to the room's tech.systemStatusDeviceKeys.

   Change nothing else. Keep the file valid JSON, and list every place you changed.
   ```

3. **Review what it did.** The agent's list and the diff should both show exactly five places, matching Steps 1 to 5. Check that the same key, `source-doccam`, is used in all five, that the tie line's `DestinationPort` matches the new input's `name`, and that the new source-list entry's routes use the destination-list keys `display1` and `display2`, not the device keys `display-1` and `display-2`.
4. **Load and try it.** Repeat [Step 6](#step-6-load-and-try-it). **Document Camera** is the sixth source tab, with a sixth input on the tech Routing page, a row on System Status, and a new box in Dev Tools' **Routing** diagram.

Once you've shown the agent a working example, a much shorter prompt does the same job:

```text
Add a source called "Document Camera" (key source-doccam) to essentialsV3Demo-configurationFile.json, wired and routed the same way as source-guest. List every place you changed.
```

To take the source out again, ask for the opposite:

```text
Remove source-doccam from essentialsV3Demo-configurationFile.json, along with everything that refers to it. List every place you removed it from.
```

## What you've learned

- A device, a port on the switcher, a tie line and a source-list entry are all it takes to add a source. Every screen that shows sources picked it up without any UI or program change.
- Routes are described by *destination*. Essentials finds the physical path through the tie lines, so moving a cable means changing one tie line rather than rewriting routing logic.
- An AI agent can make all of a source's edits from one description, especially if you point it at a working source to copy. You still review the diff and check the UI.
- Replacing a simulated device with real hardware works the same way: change the device's `type` and give it connection details. See [Replace a simulated device with a real one](../how-to/replace-mock-with-real-device.md).

## Where to go next

- [How-to guides](../how-to/index.md) for other tasks, such as adding a display.
- [How the demo fits together](../explanation/how-the-demo-fits-together.md) for what's happening under the hood.
