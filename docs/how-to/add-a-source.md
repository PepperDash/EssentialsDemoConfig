# Add or remove a source

A source needs up to five config entries. The example adds a source with key `source-guest`; [Tutorial 4](../tutorials/04-add-a-source.md) walks through the same steps with explanations.

## Add a source

1. **Device**, in `devices`:

   ```json
   { "key": "source-guest", "name": "Guest Laptop", "type": "mockHdmiSource", "properties": {} },
   ```

   For a real device, use its type and connection properties instead. See [Replace a simulated device with a real one](replace-mock-with-real-device.md).

2. **Matrix input**, in the `matrix-router` device's `inputPorts`:

   ```json
   { "name": "source-guest", "label": "Guest Laptop", "signalType": "AudioVideo", "txDeviceKey": "source-guest" }
   ```

3. **Tie line**, in `tieLines`, from the source's output port to that input. The demo's sources all have an output port named `anyOut`; other device types name theirs differently.

   ```json
   { "SourceKey": "source-guest", "SourcePort": "anyOut", "DestinationKey": "matrix-router", "DestinationPort": "source-guest" },
   ```

4. **Source-list entry**, in `sourceLists` → `default`. `order` sets its position among the source tabs; `routeList` sets where basic sharing sends it.

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

5. *Optional:* add `"source-guest"` to the room's `tech.systemStatusDeviceKeys` to give it a row on System Status.

Load the config and run `progreset -p:1`.

## Remove a source

Delete the same entries: the source-list entry, the tie line, the matrix input, the device, and its key in `tech.systemStatusDeviceKeys`.

If the removed source was the room's `defaultSourceItem`, point `defaultSourceItem` at another source-list key, such as `"media"`.

## Hide a source without removing it

Set `"includeInSourceList": false` on its source-list entry. The device and its wiring stay in place, so it can still be routed from the tech Routing page.

## Do it with an AI agent

Once you've made the edits by hand, you can describe the same change to an AI agent instead. [Make config changes with an AI agent](use-an-ai-agent.md) covers setting one up and checking its work. These prompts use a Document Camera, `source-doccam`, so they don't collide with the `source-guest` example above.

**Add a source.** Pointing at an existing source to copy is the most reliable way:

```text
Add a source called "Document Camera" (key source-doccam) to essentialsV3Demo-configurationFile.json, modeled on source-cable. It needs a device, a matrix-router input, a tie line, a source-list entry in sourceLists > default (order 5, routed to display1, display2 and programAudio like source-cable), and an entry in tech.systemStatusDeviceKeys. Change nothing else, and list every place you changed.
```

Review the diff for the five entries described above, with the same key in each.

**Remove a source:**

```text
Remove source-doccam from essentialsV3Demo-configurationFile.json: its device, its matrix-router input, its tie line, its source-list entry and its tech.systemStatusDeviceKeys entry. If it was the room's defaultSourceItem, set that to "media" instead. List every place you removed it from.
```

**Hide a source without removing it:**

```text
In essentialsV3Demo-configurationFile.json, set includeInSourceList to false on the source-list entry for source-doccam. Change nothing else.
```

Then load the config and run `progreset -p:1`, as above.
