# Load updates onto the processor

Once the demo is running, you can update any one of its parts without reloading the whole program. Each part has its own place on the processor.

| To update | Put this file | Here (4-series processor) | Then |
|---|---|---|---|
| The room config | `essentialsV3Demo-configurationFile.json` | `/user/program1/` | `progreset -p:1` |
| A plugin, such as the demo room plugin | its `.cplz` | `/user/program1/plugins/` | `progreset -p:1` |
| The touchpanel app | a `.zip` of the app's built files | `/user/program1/mcUserApp/` | `progreset -p:1` |
| Everything | the [demo `.cpz`](https://github.com/PepperDash/EssentialsDemoConfig/raw/main/artifacts/cpz/PepperDashEssentials.3.0.0-rc.7.net8_EssentialsDemoConfig-v1.0.0.cpz) | `/program01/` | `progload -p:1` |

<!-- TODO(verify): VC-4 equivalents of each path. -->

For the touchpanel app, zip the *contents* of the React app's `dist/` folder, after `npm run build`. At startup, Essentials unzips it into place, replacing the previous app. The app's connection settings are written by the processor itself, so you don't need to edit them.

## With PD Toolkit

The **PD Toolkit** extension for VS Code loads files onto a processor from the editor, and restarts the program for you. See the [PD Toolkit documentation](#) for setup and use. <!-- TODO(user): link to the PD Toolkit docs. -->

## By hand

Copy the file with any SFTP client or Crestron Toolbox's file manager, then run the command from the table in the processor console.
