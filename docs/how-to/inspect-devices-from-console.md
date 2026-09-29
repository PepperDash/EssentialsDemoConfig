# Inspect and control devices from the console

Essentials adds console commands for looking at and driving devices directly, without the UI. Open the processor console over SSH or Crestron Toolbox's Text Console. The `:1` on each command is the program slot.

## List devices

```
devlist:1
```

Lists every device the program created, with its key and type.

## See a device's properties

```
devprops:1 display-1
```

Shows the device's current property values, such as power state or current input.

## See what a device can do

```
devmethods:1 display-1
```

Lists the device's public methods and their parameters.

## Call a method

`devjson` calls a method on a device, with a JSON object naming the device, the method and its parameters. Parameters must be simple values (text, numbers, `true`/`false`); methods that take an object can't be called this way.

```
devjson:1 {"deviceKey":"display-1","methodName":"PowerOn","params":[]}
```

Some things to try on the demo:

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
