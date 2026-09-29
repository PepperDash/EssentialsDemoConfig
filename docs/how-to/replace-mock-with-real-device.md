# Replace a simulated device with a real one

Every device in the demo is simulated, but the room doesn't know or care. It talks to devices through standard interfaces (routing, power, volume and so on), so you can swap a simulated device for real hardware by changing its config entry. The room logic, UI and other config stay the same.

## 1. Find a device type

A real device's `type` comes from one of two places:

- **Built into Essentials.** See [supported devices](https://pepperdash.github.io/Essentials/docs/technical-docs/Supported-Devices.html). To list every type the running program can create, run `gettypes:1` in the console.
- **A plugin.** Most device support lives in plugins, such as the [LG display plugin](https://github.com/PepperDash/epi-display-lg). Each plugin's README gives its type name and properties. Load the plugin's `.cplz` into the program's `plugins` folder (`/user/program1/plugins/` on a 4-series processor), then restart the program.

## 2. Change the device entry

Keep the device's **`key`** the same, so everything that refers to it (tie lines, source lists, tech settings) still works. Change its `type`, and give it the `properties` that type needs, usually a `control` block with its connection details.

For example, to replace the simulated **Media Player** with an Apple TV controlled by IR from the processor's first IR port:

```json
{
  "key": "source-media",
  "name": "Media Player",
  "type": "appletv",
  "properties": {
    "control": {
      "method": "ir",
      "controlPortDevKey": "processor",
      "controlPortNumber": 1,
      "irFile": "Apple_AppleTV_4th_Gen.ir"
    }
  }
},
```

The IR file goes in the program's `IR` folder (`/user/program1/IR/` on a 4-series processor). <!-- TODO(verify): confirm this example on hardware, including the IR file name. -->

Other connection methods (serial, TCP/IP, SSH) use the same `control` block with different fields. See [the device object](https://pepperdash.github.io/Essentials/docs/technical-docs/ConfigurationStructure.html) in the Essentials configuration docs.

## 3. Check the port names

A tie line refers to a device's ports by name, and different device types name their ports differently. The demo's simulated sources have one output, `anyOut`; the Apple TV's is `hdmiOut`. Update the tie line to match:

```json
{ "SourceKey": "source-media", "SourcePort": "hdmiOut", "DestinationKey": "matrix-router", "DestinationPort": "source-media" },
```

To see a device's ports once the program is running, run `devprops:1 source-media` and look for its input and output ports.

If a tie line names a port the device doesn't have, Essentials logs an error at startup and routes through that tie line won't work.

## 4. Load and check

Run `progreset -p:1`, then:

- `devlist:1`: the device is listed with its new type.
- Route the source from the UI and confirm the hardware responds.

## Things that change with the device

The UI shows what a device actually supports. Features that the simulated device had but the real one lacks disappear, or show as unknown:

- **System Status** shows communication status only for devices that report it. A one-way IR device has no status to report and shows **Device never online**. Remove its key from `tech.systemStatusDeviceKeys` if you'd rather not list it.
- **Signal dots** follow a source only if the source reports whether it has signal. The simulated sources do; many real ones don't.
