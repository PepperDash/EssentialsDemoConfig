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

## Do it with an AI agent

Once you've made the edits by hand, you can describe the same change to an AI agent instead. [Make config changes with an AI agent](use-an-ai-agent.md) covers setting one up and checking its work. To try it with a different display, such as `display-4`, **Lobby Display**, use a prompt that names every place a display appears:

```text
Add a fourth display called "Lobby Display" (key display-4) to essentialsV3Demo-configurationFile.json, modeled on display-3 and wired the same way. It needs:

1. a mockdisplay device in `devices`;
2. an output on the matrix-router device, in its outputPorts;
3. a tie line from that matrix output to the display's hdmiIn1 input;
4. an entry in destinationLists > default, with the key display4 and the next order number;
5. a route to display4 added to every source's routeList in sourceLists > default, including roomOff, using each entry's own sourceKey;
6. display-4 added to the room's tech settings, in `displays` and in systemStatusDeviceKeys.

Change nothing else. Keep the file valid JSON, and list every place you changed.
```

(If you haven't added `display-3` yet, say "modeled on display-2" instead.)

Review the diff against the six items. The one most often missed is item 5: count the routes, which should be one new route for each entry in the source list. Check that the source routes and the destination list use the destination-list key `display4`, and that the tie line and the `tech` settings use the device key `display-4`. Then load the config and run `progreset -p:1`.
