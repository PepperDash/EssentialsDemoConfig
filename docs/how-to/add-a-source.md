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
