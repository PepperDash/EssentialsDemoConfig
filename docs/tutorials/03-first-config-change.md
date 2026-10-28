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

<!-- TODO(verify): confirm where the bundled .cpz places the config. -->

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

## Step 4: Rename the room

Find the room in `rooms`. Its `name` is shown on the splash screen and in the header. Change it:

```json
"key": "room1",
"name": "Huddle Room",
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
2. Restart the program. In the processor console, run:

   ```
   progreset -p:1
   ```

   On VC-4, restart the room from the web interface instead.

3. When it has started again, refresh the UI in your browser.

## Step 7: Check your changes

- **Help:** tap the help icon. You see your new message.
- **Lighting:** tap the lighting icon. **Presentation** is in the list, between Conference and Default.
- **Shutdown:** start the room, tap **End Session**, and watch the countdown start from 10 seconds. Tap **Cancel**.
- **Room name:** the splash screen and the header show **Huddle Room**.

> [!TIP]
> If the program doesn't start or the room is missing, the config file probably has a JSON error. The console shows the error at startup. Fix the file, copy it again and run `progreset -p:1` again.

## Step 8: Make the same kind of changes with an AI agent

You've made four changes by hand, so you know what each one does. You can also describe changes to an AI agent, such as GitHub Copilot or Claude, and let it edit the file. On a real project the config is thousands of lines long, and this is often how you'd work.

1. **Set up an agent.** Follow [Make config changes with an AI agent](../how-to/use-an-ai-agent.md), which covers the tools, how to review what an agent does, and what to watch for. Open the folder with your config file in your editor.
2. **Ask for four more changes.** Use different values from Steps 2 to 5, so you can tell the agent's work from your own. Give it this prompt:

   ```text
   In essentialsV3Demo-configurationFile.json, make these four changes and nothing else:

   1. Change the room's help message to "Call the AV team on x5555".
   2. Change shutdownPromptSeconds to 15.
   3. Change the room's name to "Training Room".
   4. Add a "Movie" scene, with the id "movie", to the lighting-1 device's scenes, just before the "Default" scene.

   Keep the file valid JSON. When you're done, list each line you changed.
   ```

3. **Review what it did.** The agent's list should show four places, and the diff should show the same four. Check that the new scene is in the `scenes` list with commas in the right places, and that no other part of the file changed. [How to check an agent's work](../how-to/use-an-ai-agent.md#check-what-it-did) has the full checklist.
4. **Load and check it.** Repeat [Step 6](#step-6-load-the-changes), then check the new values: your help message, **Movie** in the lighting list, a 15-second countdown, and **Training Room** in the header.

You don't have to know where a setting lives to ask for it. Try this prompt, which names no keys:

```text
Make the End Session countdown in essentialsV3Demo-configurationFile.json 20 seconds. Tell me which setting you changed and what its old value was.
```

The agent finds `shutdownPromptSeconds` itself. Because you read the diff, you still know exactly what changed.

## What you've learned

- Essentials reads the room, its devices and its settings from one config file at startup.
- Changing the config and restarting the program is all it takes. The compiled program didn't change.
- The same program can run a different room just by being given a different config file. That's how one Essentials build runs many rooms.
- An AI agent can make config changes from a plain description. You still review its diff and check the result in the UI.

**Next:** [Tutorial 4: Add a source without writing code](04-add-a-source.md)
