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
