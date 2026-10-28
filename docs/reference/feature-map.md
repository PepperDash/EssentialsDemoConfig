# Feature map

Each feature of the demo UI, and what's behind it:

- **Component:** the React file, under `src/components/` in [EssentialsDemoReactApp](https://github.com/PepperDash/EssentialsDemoReactApp).
- **Hook:** the React hook the component uses to read state and send commands. Hooks starting `use` without a path are from the `@pepperdash/mobile-control-react-app-core` library; paths starting `hooks/` are the app's own, under `src/hooks/`.
- **Interface:** the Essentials interface the device or room implements for this feature.
- **Configured by:** where in the config file the feature is set up.

## Room screens

| Feature | Component | Hook | Interface | Configured by |
|---|---|---|---|---|
| Splash screen: start the room | `RoomBusiness/SplashScreen.tsx` | `useWebsocketContext` (sends `/room/{key}/defaultsource`) | room: `IRunDefaultPresentRoute` | room `defaultSourceItem` |
| Basic sharing: pick a source for every display | `RoomBusiness/SourceSelection/BasicSourceSelection.tsx`, `SourceTabs.tsx` | `useIRunRouteAction`, `useRoomSourceList` | room: `IRunRouteAction` | `sourceLists` entries and their `routeList` |
| Advanced sharing: route one display | `RoomBusiness/SourceSelection/AdvancedSourceSelection.tsx`, `DestinationCard.tsx` | `useIRunDirectRouteAction`, `useRoomDestinationList`, `hooks/useCurrentSourceForDestination` | room: `IRunDirectRouteAction`; displays: `ICurrentSources` | `destinationLists`, `tieLines` |
| Program audio button on a destination card | `RoomBusiness/SourceSelection/DestinationCard.tsx` | `hooks/useProgramAudioDestinationKey` | room: `IRunDirectRouteAction` | destination with `isProgramAudioDestination`; room `enableAudioFollowsVideo` |
| Signal dot and **No Signal** | `shared/SyncStatusDot/SyncStatusDot.tsx` | `hooks/useVideoSyncDetected` | source: `IVideoSync` (implemented by the demo's `mockHdmiSource`) | source device `startsWithSync` |
| Room volume fader | `shared/Fader/Fader.tsx` | `useRoomIBasicVolumeWithFeedback` | room: `IHasCurrentVolumeControls` | room `defaultAudioKey` |
| Lighting scenes | `shared/HeaderModal/LightingModal/LightingModal.tsx` | `useILightingScenes`, `hooks/useLightingDeviceKey` | lighting: `ILightingScenes` | lighting device `scenes`; room `environment.deviceKeys` |
| Help message | `shared/HeaderModal/HelpModal/HelpModal.tsx` | `useRoomConfiguration` | room config | room `help.message` |
| Audio panel faders and mutes | `shared/HeaderModal/AudioControlsModal/AudioControlsModal.tsx`, `shared/Fader/LevelFader.tsx` | `useRoomAudioControlPointList`, `useDeviceIBasicVolumeWithFeedback` | audio: `IBasicVolumeWithFeedback` | `audioControlPointLists` |
| Settings: theme, accent color, light mode | `shared/HeaderModal/SettingsModal/SettingsModal.tsx`, `src/theme/theme.ts` | none (kept per panel in the browser, or in the page URL where storage is blocked) | none | touchpanel device `theme` (the default theme) |
| End Session and shutdown countdown | `shared/ActivityFooter/ActivityFooter.tsx`, `shared/ShutdownPrompt/ShutdownPrompt.tsx` | `useIShutdownPromptTimer`, `hooks/useShutdownPromptActive` | room: `IShutdownPromptTimer` | room `shutdownPromptSeconds` |

## Technician pages

| Feature | Component | Hook | Interface | Configured by |
|---|---|---|---|---|
| Open the tech pages | `shared/HeaderModal/SettingsModal/SettingsModal.tsx` (**Technician Controls**) | `hooks/useHeaderModal` | none | none |
| System Status health rows | `TechControls/SystemStatus/SystemStatusPage.tsx`, `HealthItem.tsx` | `useICommunicationMonitor`, `hooks/useTechSystemStatus` | each device: `ICommunicationMonitor` | room `tech.systemStatusDeviceKeys` |
| Rack temperature and humidity | `TechControls/SystemStatus/RackReadingItem.tsx`, `rackReadingHealth.ts` | `useITemperatureSensor`, `hooks/useDeviceHumidity` | sensor: `ITemperatureSensor`, `IHumiditySensor` | room `tech.rackSensorDeviceKey`; sensor device's starting values |
| Display power, with warm-up and cool-down | `TechControls/Displays/DisplayControls.tsx` | `useIHasPowerControl`, `useTwoWayDisplayBase` | display: `IHasPowerControlWithFeedback`, `IWarmingCooling` | room `tech.displays` |
| Display inputs | `TechControls/Displays/DisplayControls.tsx` | `useIHasSelectableItems` | display: `IHasInputs` | room `tech.displays` |
| Projector screen and lift | `TechControls/Displays/DisplayControls.tsx` | `useIProjectorScreenLiftControl` | screen/lift: `IProjectorScreenLiftControl` | `tech.displays[].screenDeviceKey`, `liftDeviceKey` |
| Routing, Matrix mode | `TechControls/Routing/RoutingPage.tsx` | `useINamedRoutingSlots`, `hooks/useTechRoutingDeviceKey` | matrix: `IHasNamedRoutingSlots` | room `tech.routingDeviceKey`; matrix `inputPorts`/`outputPorts` |
| Routing, Graph mode | `TechControls/Routing/Graph/RoutingGraphView.tsx` | `TechControls/Routing/Graph/useRoutingGraph.ts` (the app's own) | Essentials `RoutingGraphMessenger` (`/device/routingGraph`) over every device's routing ports | `tieLines`; each device's ports |
| Volume page | `TechControls/Volume/VolumePage.tsx` | `useRoomAudioControlPointList` | audio: `IBasicVolumeWithFeedback` | `audioControlPointLists` |
| Versions, reboot, program reset | `TechControls/About/AboutPage.tsx` | `useRuntimeInfo`, `useSystemControl` | framework | none |

## Demo device types

| Type | From | Simulates |
|---|---|---|
| `essentialsDemoRoom` | demo plugin | The room: routing, volume, shutdown, tech page settings |
| `mockHdmiSource` | demo plugin | A source with video signal detection |
| `mockRackSensor` | demo plugin | A rack temperature and humidity sensor |
| `mockProjectorDisplay` | demo plugin | A projector with configurable inputs |
| `mockProjectorScreenLiftController` | demo plugin | A projector screen or lift |
| `mockdisplay` | Essentials | A display with power, warm-up and cool-down, inputs and volume |
| `mockmidpoint` | Essentials | A matrix switcher with named inputs and outputs |
| `mockaudiodevice` | Essentials | A volume and mute point, such as a DSP channel |
| `mockLightingDevice` | Essentials | A lighting system with scenes |
| `genericaudiooutwithvolume` | Essentials | An audio output that routing can target |
