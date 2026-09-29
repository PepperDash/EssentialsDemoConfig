# Tutorial 3: Make your first config change

In SIMPL Windows, changing a room's behavior usually means editing the program, recompiling and reloading. In Essentials, most of it is **data**: the program reads a JSON config file at startup and builds the room from it.

In this tutorial you'll change four things about the room by editing that file, then restart the program to see them take effect. You won't compile anything.

**Before you start:** complete [Tutorial 1](01-run-the-demo.md) and [Tutorial 2](02-explore-tech-pages.md). You'll need to copy files to and from the processor (SFTP or Crestron Toolbox's file manager), and a text editor. [VS Code](https://code.visualstudio.com/) is a good choice because it checks JSON as you type.

## Step 1: Get the config file

The running config file is `essentialsV3Demo-configurationFile.json`. Copy it from the processor to your computer:

# [4-series processor](#tab/4series)

`/user/program1/essentialsV3Demo-configurationFile.json`

# [VC-4](#tab/vc4)

`/opt/crestron/virtualcontrol/RunningPrograms/<room-id>/User/essentialsV3Demo-configurationFile.json`

---

<!-- TODO(verify): confirm where the bundled .cpz places the config on each platform. -->

Open it. It has a few top-level sections:

| Section | What it holds |
|---|---|
| `devices` | Every device in the system: displays, sources, the matrix switcher, audio, lighting, touchpanels |
| `sourceLists` | The sources a room offers, and where each one is routed |
| `destinationLists` | The displays and outputs a room routes to |
| `audioControlPointLists` | The faders the room shows |
| `tieLines` | How device ports are connected |
| `rooms` | The room itself, and its settings |

For this tutorial you'll only touch the `rooms` section and one device.

## Step 2: Change the help message

Find the room's `help` setting, near the end of the file:

```json
"help": {
  "message": "Dial x12345 to reach the Help Desk"
},
```

Change the message:

```json
"help": {
  "message": "Need help? Call the AV team on x4242"
},
```

## Step 3: Shorten the shutdown countdown

A few lines above, change the End Session countdown from 30 seconds to 10:

```json
"shutdownPromptSeconds": 10,
```

## Step 4: Change the tech PIN

Inside `tech`, change the password:

```json
"tech": {
  "password": "2468",
```

## Step 5: Add a lighting scene

Find the `lighting-1` device in `devices`. Its scenes are listed in its `properties`. Add a **Presentation** scene after **Conference**:

```json
"scenes": [
  { "id": "allOn", "name": "All On" },
  { "id": "high", "name": "High" },
  { "id": "conference", "name": "Conference" },
  { "id": "presentation", "name": "Presentation" },
  { "id": "default", "name": "Default" },
  { "id": "low", "name": "Low" },
  { "id": "allOff", "name": "All Off" }
]
```

Watch the commas: each entry except the last ends with one. A JSON mistake means the program can't read the file, so check that your editor shows no errors before you continue.

## Step 6: Load the changes

1. Copy the file back to the processor, to the same folder, replacing the original.
2. In the processor console, restart the program:

   ```
   progreset -p:1
   ```

3. When it has started again, refresh the UI in your browser.

## Step 7: Check your changes

- **Help:** tap the help icon. You see your new message.
- **Lighting:** tap the lighting icon. **Presentation** is in the list, between Conference and Default.
- **Shutdown:** start the room, tap **End Session**, and watch the countdown start from 10 seconds. Tap **Cancel**.
- **PIN:** hold the audio icon for 3 seconds. **1234** is now **Incorrect**; **2468** opens the tech menu.

> [!TIP]
> If the program doesn't start or the room is missing, the config file probably has a JSON error. The console shows the error at startup. Fix the file, copy it again and run `progreset -p:1` again.

## What you've learned

- Essentials reads the room, its devices and its settings from one config file at startup.
- Changing the config and restarting the program is all it takes. The compiled program didn't change.
- The same program can run a different room just by being given a different config file. That's how one Essentials build runs many rooms.

**Next:** [Tutorial 4: Add a source without writing code](04-add-a-source.md)
