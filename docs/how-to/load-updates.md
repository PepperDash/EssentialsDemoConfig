# Load updates onto the processor

Once the demo is running, you can update any one of its parts without reloading the whole program. Each part has its own place on the processor.

# [4-series processor](#tab/4series)

| To update | Put this file | Here | Then |
|---|---|---|---|
| The room config | `essentialsV3Demo-configurationFile.json` | `/user/program1/` | `progreset -p:1` |
| A plugin, such as the demo room plugin | its `.cplz` | `/user/program1/plugins/` | `progreset -p:1` |
| The touchpanel app | a `.zip` of the app's built files | `/user/program1/mcUserApp/` | `progreset -p:1` |
| Everything | the [demo `.cpz`](https://github.com/PepperDash/EssentialsDemoConfig/raw/main/artifacts/cpz/PepperDashEssentials.3.0.0-rc.20.net8_EssentialsDemoConfig-v1.1.0.cpz) | `/program01/` | `progload -p:1` |

# [VC-4](#tab/vc4)

On the VC-4 server, each room's files are under `/opt/crestron/virtualcontrol/RunningPrograms/<room-id>/User/`. Copy files there over SFTP, then restart the room from the VC-4 web interface.

| To update | Put this file | Here (under the room's `User/` folder) | Then |
|---|---|---|---|
| The room config | `essentialsV3Demo-configurationFile.json` | `User/` | Restart the room |
| A plugin, such as the demo room plugin | its `.cplz` | `User/plugins/` | Restart the room |
| The touchpanel app | a `.zip` of the app's built files | `User/mcUserApp/` | Restart the room |
| Everything | the [demo `.cpz`](https://github.com/PepperDash/EssentialsDemoConfig/raw/main/artifacts/cpz/PepperDashEssentials.3.0.0-rc.20.net8_EssentialsDemoConfig-v1.1.0.cpz) | The web interface's **Program Library** | Update the program, then restart the room |

<!-- TODO(verify): VC-4 web interface steps for updating a program and restarting a room. -->

---

For the touchpanel app, zip the *contents* of the React app's `dist/` folder, after `npm run build`. At startup, Essentials unzips it into place, replacing the previous app. The app's connection settings are written by the processor itself, so you don't need to edit them.

## With PD Toolkit

The **PD Toolkit** extension for VS Code loads files onto a processor from the editor, and restarts the program for you. See the [PD Toolkit documentation](#) for setup and use. <!-- TODO(user): link to the PD Toolkit docs. -->

## By hand

Copy the file with any SFTP client or Crestron Toolbox's file manager, then run the command from the table in the processor console. On VC-4, restart the room from the web interface instead.
