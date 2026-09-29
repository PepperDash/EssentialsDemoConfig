# Add a display

This guide adds a third display, **Center Display**, fed from a new matrix output. The example uses key `display-3`.

1. **Device**, in `devices`. `mockdisplay` is a simulated display with power, warm-up and cool-down, and inputs:

   ```json
   { "key": "display-3", "name": "Center Display", "type": "mockdisplay", "properties": {} },
   ```

2. **Matrix output**, in the `matrix-router` device's `outputPorts`:

   ```json
   { "name": "display-3", "label": "Center Display", "signalType": "AudioVideo" }
   ```

3. **Tie line**, in `tieLines`, from the matrix output to the display's first HDMI input (`hdmiIn1`):

   ```json
   { "SourceKey": "matrix-router", "SourcePort": "display-3", "DestinationKey": "display-3", "DestinationPort": "hdmiIn1" },
   ```

4. **Destination-list entry**, in `destinationLists` → `default`. This makes it a card on the advanced sharing page:

   ```json
   "display3": {
     "sinkKey": "display-3",
     "name": "Center Display",
     "order": 3,
     "sinkType": "audioVideo",
     "includeInDestinationList": true,
     "isProgramAudioDestination": false
   },
   ```

5. **Basic sharing**: so that picking a source on the basic screen also sends it to the new display, add a route to each source's `routeList` in `sourceLists` → `default`:

   ```json
   { "sourceKey": "source-laptop", "destinationKey": "display3", "type": "audioVideo" },
   ```

   Use each entry's own `sourceKey`. Add the same route to `roomOff` too, so that ending the session clears the new display as well.

6. **Tech pages** (optional), in the room's `tech` settings:
   - add `{ "deviceKey": "display-3" }` to `displays` to list it on the Displays page;
   - add `"display-3"` to `systemStatusDeviceKeys` to give it a row on System Status.

Load the config and run `progreset -p:1`. The display appears on the advanced sharing page, as an output on the tech Routing page, and on the tech Displays page.

> [!NOTE]
> Destination-list keys (`display3`) and device keys (`display-3`) are separate names. Source routes and the destination list use the destination-list key; tie lines and the `tech` settings use the device key.
