# Inspect and control devices

Essentials lets you look at and drive devices directly, without the UI. There are two ways to do it, and they do the same things:

- **The processor console.** Open it over SSH or Crestron Toolbox's Text Console. The `:1` on each command below is the program slot.
- **Essentials Dev Tools**, in a browser. Open `https://<processor-ip>/cws/debug/` and sign in, as in [Tutorial 1](../tutorials/01-run-the-demo.md#step-2-open-dev-tools), then select **Devices** in the top bar. Select a device in the list to open its **Device Detail** page, which has its **Properties**, **Methods** and **Feedbacks**.

| Console command | In Dev Tools |
|---|---|
| `devlist` | The **Devices** list |
| `devprops` | The device's **Properties** table |
| `devmethods` | The device's **Methods** table |
| `devjson` | **Execute** next to a method |

## List devices

```
devlist:1
```

Lists every device the program created, with its key and type.

In Dev Tools, the **Devices** page lists every device's **Key** and **Name**.

## See a device's properties

```
devprops:1 display-1
```

Shows the device's current property values, such as power state or current input.

In Dev Tools, open the device and look at its **Properties** table. Turn on **Live updates** to have the values refresh on their own while you work.

## See what a device can do

```
devmethods:1 display-1
```

Lists the device's public methods and their parameters.

In Dev Tools, the device's **Methods** table lists the same methods, with each parameter's name and type in **Params**.

## Call a method

`devjson` calls a method on a device, with a JSON object naming the device, the method and its parameters. Parameters must be simple values (text, numbers, `true`/`false`); methods that take an object can't be called this way.

```
devjson:1 {"deviceKey":"display-1","methodName":"PowerOn","params":[]}
```

### From Dev Tools

You can call the same methods from Dev Tools without writing any JSON:

1. On the **Devices** page, select the device, for example `display-1`.
2. In its **Methods** table, find the method, for example `PowerOn`, and select **Execute**.
3. If the method takes parameters, a box appears for each one, labelled with its name and type. Type a value, such as `false` or `32768`. A method with no parameters says so.
4. Select **Execute**.

Dev Tools calls the method the same way `devjson` does, so the same limit applies: only methods with simple parameters can be called.

### Things to try

Each of these can be run from the console, or from Dev Tools by opening the device and executing the method with the value shown.

| Command | What happens |
|---|---|
| `devjson:1 {"deviceKey":"display-1","methodName":"PowerOff","params":[]}` | The Left Display cools down. The tech Displays page's **Power Off** button pulses for 10 seconds. |
| `devjson:1 {"deviceKey":"audio-wireless-mic","methodName":"MuteOn","params":[]}` | The Wireless Mic mutes: its mute icon turns red on every UI. `MuteOff` unmutes it. |
| `devjson:1 {"deviceKey":"audio-wireless-mic","methodName":"SetVolume","params":[32768]}` | Sets the Wireless Mic to half level (the range is 0 to 65535). |
| `devjson:1 {"deviceKey":"source-cable","methodName":"SetVideoSyncDetected","params":[false]}` | Cable TV loses signal on every UI. See [Simulate a lost video signal](simulate-lost-video-signal.md). |

## Check the loaded config

```
showconfig:1
```

Prints the config the program is running, which is useful for confirming that a change was loaded.

## See which device types are available

```
gettypes:1
```

Lists every device `type` the program can create, including those from plugins. Add a search term to filter it, for example `gettypes:1 display`.

## More

The Essentials [debugging guide](https://pepperdash.github.io/Essentials/docs/technical-docs/Debugging.html) covers the full command set, including log levels and communication stream debugging.

Dev Tools has more pages too. **Config File** shows the loaded config, like `showconfig`, **Types** lists the available device types, like `gettypes`, and **Debug Console** streams the program's log to your browser.
