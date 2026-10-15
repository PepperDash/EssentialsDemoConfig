# Simulate a lost video signal

The demo's sources report whether they have video signal. When a source loses signal, the UI shows it:

- The source's dot turns from green to red.
- Basic sharing and the advanced destination cards show **No Signal** under the source.
- The matching input on the tech Routing page shows the loss too.

You can break a source's signal at startup or while the program runs.

## At startup

In the source's device entry, set `startsWithSync` to `false`:

```json
{ "key": "source-cable", "name": "Cable TV", "type": "mockHdmiSource", "properties": { "startsWithSync": false } },
```

Run `progreset -p:1`. Cable TV starts with no signal.

## While the program runs

Call the source's `SetVideoSyncDetected` method, from the console or from Essentials Dev Tools.

# [Console](#tab/console)

In the processor console, run:

```
devjson:1 {"deviceKey":"source-cable","methodName":"SetVideoSyncDetected","params":[false]}
```

Every connected UI updates immediately. Restore the signal with `true`:

```
devjson:1 {"deviceKey":"source-cable","methodName":"SetVideoSyncDetected","params":[true]}
```

# [Dev Tools](#tab/devtools)

1. In Dev Tools, select **Devices** in the top bar, then select `source-cable`.
2. In the **Methods** table, find `SetVideoSyncDetected` and select **Execute**.
3. Enter `false` and select **Execute**.

Every connected UI updates immediately. To restore the signal, execute the method again with `true`.

---

Both call the same method, and both can call any public method on any device. See [Inspect and control devices](inspect-devices-from-console.md).

## Do the startup change with an AI agent

Once you've made the startup edit by hand, you can describe it to an AI agent instead. [Make config changes with an AI agent](use-an-ai-agent.md) covers setting one up and checking its work.

```text
In essentialsV3Demo-configurationFile.json, make the source-cable device start with no video signal. Change nothing else, and show me the line you changed.
```

The diff should show one change: `startsWithSync` set to `false` in the `source-cable` entry's `properties`. Load the config and run `progreset -p:1`. To make the change permanent, ask the agent to set `startsWithSync` back to `true`, load the config and restart the program. To restore the signal right now without a restart, call `SetVideoSyncDetected` with `true` as described above, which lasts until the next restart.
