# Architecture: Mapbox Native Particle Animation in React Native

This document explains the architecture and approach for bridging the native Mapbox `RasterParticleLayer` into a React Native application.

## 1. Integration Approach: Native UI Component

**Why a Native UI Component?**
The goal is to render a native visual element (a Mapbox Map) inside the React Native view hierarchy.
React Native offers two main bridging mechanisms:
- **Turbo Modules:** Primarily used for logic and function calls without UI.
- **Fabric / Native UI Components:** Used for returning native UI (`UIView` on iOS) that React Native can render on screen.

We selected a standard **Native UI Component** (View Manager) approach because:
1. It perfectly suits the requirement of returning a native visual map view.
2. It allows passing dynamic props (particle count, speed) from JavaScript down to the native layer.
3. It seamlessly supports wrapping `UIHostingController`, enabling the use of SwiftUI, which is the recommended way to use the modern Mapbox v11 iOS SDK.

## 2. Rendering Pipeline

The visual data flows through several stages before appearing on screen:

1. **Data Source Fetching:** The `RasterArraySource` fetches multidimensional raster data (like wind fields) directly from Mapbox servers (`mapbox://mapbox.gfs-winds`).
2. **Layer Configuration:** The `RasterParticleLayer` is added to the Map, configured with properties like particle count, speed factor, and color gradients.
3. **GPU Simulation:** The underlying Mapbox native engine processes the raster data and computes particle movements entirely on the GPU.
4. **Metal Rendering:** Mapbox v11 utilizes Apple's Metal framework for high-performance rendering. The particles are drawn directly by the Metal renderer.
5. **UIHostingController:** The SwiftUI `Map` view is wrapped inside a `UIHostingController`, translating the SwiftUI view into a UIKit `UIView`.
6. **React Native Bridge:** The `UIView` is passed to the `RCTViewManager`, which mounts it into the React Native shadow tree and renders it on screen alongside standard RN components.

## 3. File Responsibilities

### Native iOS
- **`MapboxParticleView.swift`:** The core SwiftUI component. It initializes the Mapbox `Map`, sets up the `RasterArraySource` to load wind data, and adds the `RasterParticleLayer`. It binds state variables to its particle properties.
- **`MapboxParticleRNView.swift`:** A custom `UIView` subclass that serves as the wrapper for the SwiftUI `UIHostingController`. It receives prop updates from React Native and forwards them to the SwiftUI bindings.
- **`MapboxParticleViewManager.swift`:** The Swift class inheriting from `RCTViewManager`. It tells React Native to render `MapboxParticleRNView`.
- **`MapboxParticleViewManager.m`:** The Objective-C macro file that exports the ViewManager module and its props (`particleCount`, `particleSpeed`, etc.) to the JavaScript bridge.

### React Native
- **`MapboxParticleView.tsx`:** The JavaScript component wrapper that uses `requireNativeComponent` to load the native iOS view safely.
- **`App.tsx`:** The main screen of the application. It renders the map component and provides UI controls (state) that update the map properties dynamically.

## 4. Mapbox APIs Used

* **`Map` (SwiftUI):** The foundational container for rendering a Mapbox map in SwiftUI.
* **`RasterArraySource`:** Loads the `mapbox://mapbox.gfs-winds` texture array that drives the wind logic.
* **`RasterParticleLayer`:** An experimental layer that uses the raster array source to animate particles. 
* **`Exp` (Expressions):** Used to map the particle speed to a specific RGBA color dynamically based on velocity.

## 5. Performance Considerations
* **Metal Optimization:** Since `RasterParticleLayer` uses Metal to run the simulation on the GPU, it is highly performant. However, high particle counts (>8192) may impact frame rates on older iOS devices.
* **Bridge Overhead:** The property updates (like changing slider values) pass asynchronously over the React Native bridge. Since the animation itself is handled natively, the bridge overhead only affects the responsiveness of the property changes, not the animation smoothness.

## 6. Known Limitations
* **Experimental API:** The `RasterParticleLayer` is currently marked as `@_spi(Experimental)`. The API signature could change in future Mapbox versions.
* **iOS Only (in this PoC):** This implementation currently only supports iOS. To support Android, a parallel implementation using Mapbox SDK for Android and a Java/Kotlin ViewManager would be necessary.
