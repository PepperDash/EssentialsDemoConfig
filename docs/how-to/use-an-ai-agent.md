# Make config changes with an AI agent

The tutorials and how-to guides show every change by hand, so you learn what each config entry does. Once you know that, you can describe a change in plain words and let an AI agent, such as GitHub Copilot or Claude, edit the config file for you. On a real project the file runs to thousands of lines, and this is often faster.

This guide covers setting an agent up once, writing a prompt that works, and checking what it did. Each tutorial and guide that edits the config ends with example prompts for its change.

An agent edits the file on your computer. You still copy the file to the processor and restart the program, as in [Load updates onto the processor](load-updates.md), and you still check the result in the UI. The agent can't see the running system.

## What you need

- **The config file on your computer**, in a folder you can open in your editor. This repository works, or any folder holding a copy of `essentialsV3Demo-configurationFile.json`.
- **An agent that can read and edit files in that folder.** For example:
  - **GitHub Copilot** in [VS Code](https://code.visualstudio.com/): open Copilot Chat and choose **Agent** mode.
  - **Claude Code**: run `claude` in the folder from a terminal, or use its VS Code extension.

  Menu names change between releases, so check your tool's own documentation for how to start it. A chat that can't edit files can still write the JSON, but you paste it into the file yourself.
- **Git, or a copy of the file.** You want to see exactly what the agent changed and be able to undo it. If the folder is a git repository, commit or stash your own changes first so the agent's changes stand out.

## Write a prompt that works

A good prompt is specific about what you want and where it goes. These five habits cover most of it:

| Do this | Why |
|---|---|
| **Say what you want in the room's terms.** "Add a source called Guest Laptop" | The agent works out which entries that needs. |
| **Point at an existing entry to copy.** "Model it on `source-cable`" | Copying a working entry beats inventing one. |
| **Name the keys you want.** "Use the key `source-guest`" | Keys are how entries refer to each other, so you want to choose them. |
| **Set limits.** "Change nothing else." | Stops stray edits in a large file. |
| **Ask for a summary.** "List every place you changed." | Gives you a checklist to review against. |

You don't need to know where a setting lives. "Make the End Session countdown twice as long" is enough: the agent finds the setting and tells you which one it changed.

## Check what it did

1. **Read the diff.** In VS Code, open the changed file's diff from Source Control, or run `git diff`. Every changed line should be one you expected. If the summary lists five places, you should see five.
2. **Check the JSON.** One missing comma stops the program from reading the file. Your editor shows JSON errors as you type. You can also ask the agent to confirm the file is still valid JSON.
3. **Check the names match.** A key used in one place has to exist in another: a tie line names real device keys and ports, and a source's routes name real destinations. A source list's keys (`cable`) and a destination list's keys (`display1`) are separate from device keys (`source-cable`, `display-1`).
4. **Load it and check it in the UI.** Copy the file to the processor and run `progreset -p:1` (on VC-4, restart the room), then run the checks the tutorial or guide gives for that change. For routing, Dev Tools' **Routing** diagram shows whether the tie lines connect.

If a change is wrong, undo it (`git restore` on the file, or put your copy back), make the prompt more specific, and try again. That's usually quicker than asking the agent to repair its own edit.

## What to watch for

- **Invented names.** For real devices, an agent may guess a device type or a property name that doesn't exist. Compare against the plugin's README or the [Essentials configuration docs](https://pepperdash.github.io/Essentials/docs/technical-docs/ConfigurationStructure.html), and give the agent that page if it can read links.
- **Wrong port names.** Different device types name their ports differently. If a tie line names a port the device doesn't have, Essentials logs an error at startup and routes through it don't work. See [Replace a simulated device with a real one](replace-mock-with-real-device.md).
- **Secrets.** The demo's tech PIN is public. On a real project, keep real PINs, passwords and customer details out of prompts and out of any file you share, and follow your organization's policy on AI tools.
- **Keep the processor out of it.** You don't need to give an agent processor credentials for any of this. Loading the file and restarting the program stay with you.

## Optional: give the agent standing instructions

If you edit the config often, save a few rules where the agent reads them automatically: in a file named `CLAUDE.md` for Claude Code, or `.github/copilot-instructions.md` for GitHub Copilot. Then each prompt can be shorter.

```markdown
# Essentials demo config

`essentialsV3Demo-configurationFile.json` is an Essentials configuration file. Essentials
reads it at startup and builds the room from it. When you edit it:

- Keep it valid JSON. Check commas and brackets.
- Device keys (`source-cable`, `display-1`) are unique, and tie lines, the matrix, source lists
  and the room's `tech` settings refer to devices by them. Source lists and destination lists
  have their own keys (`cable`, `display1`), which are different names.
- To add something, copy an existing entry of the same kind and change only its keys, names
  and order.
- Tie lines name device ports exactly. Check the port names on both devices.
- Change only what was asked, and list every place you changed.
- Reference: https://pepperdash.github.io/Essentials/docs/technical-docs/ConfigurationStructure.html
```
