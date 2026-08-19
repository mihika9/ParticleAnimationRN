# Mapbox Particle Animation PoC

This project is a Proof of Concept (PoC) demonstrating how to implement Mapbox's `RasterParticleLayer` natively in SwiftUI and integrate it seamlessly into a React Native application.

## Requirements

* **React Native:** 0.87.0
* **Mapbox Maps SDK for iOS:** ~> 11.9.2
* **iOS Target:** iOS 14.0+
* **Swift:** 5.9+

## Mapbox Token Setup

To run this application, you **must** have a valid Mapbox Public Access Token and a Mapbox Secret Access Token (with `Downloads:Read` scope).

1. **Configure `.netrc` for SDK Download:**
   Create a `~/.netrc` file in your home directory to allow CocoaPods to download the Mapbox SDK.
   ```
   machine api.mapbox.com
     login mapbox
     password <YOUR_MAPBOX_SECRET_TOKEN>
   ```

2. **Configure Mapbox Public Token in the App:**
   Add your Mapbox Public Access Token to your `ios/ParticleAnimationRN/Info.plist`:
   ```xml
   <key>MBXAccessToken</key>
   <string>YOUR_MAPBOX_PUBLIC_TOKEN</string>
   ```

## Installation and Build Steps

1. **Install Node Dependencies:**
   ```bash
   npm install
   ```

2. **Install iOS Dependencies:**
   ```bash
   cd ios
   pod install
   cd ..
   ```

3. **Run the App:**
   ```bash
   npx react-native run-ios
   ```

## Project Structure

```
ParticleAnimationRN/
│
├── App.tsx                     // React Native entry point, renders MapboxParticleView
├── MapboxParticleView.tsx      // RN Bridge Component mapping to the native ViewManager
│
├── ios/
│   ├── Podfile                 // Configured to pull MapboxMaps ~> 11.9.2
│   └── ParticleAnimationRN/
│       ├── MapboxParticleView.swift          // Native SwiftUI component using Mapbox
│       ├── MapboxParticleRNView.swift        // UIView wrapper for the UIHostingController
│       ├── MapboxParticleViewManager.swift   // Swift ViewManager exposing it to RN
│       └── MapboxParticleViewManager.m       // Obj-C RCTViewManager export
```

## Troubleshooting

* **Mapbox SDK fails to install:** Ensure your `~/.netrc` file is correctly configured with the secret token, not the public token.
* **Map doesn't load or shows white screen:** Ensure your `MBXAccessToken` is present in `Info.plist` and the token has the necessary scopes.
* **Build errors regarding experimental API:** `RasterParticleLayer` is marked as experimental (`@_spi(Experimental)`). Ensure you are importing MapboxMaps correctly with the SPI attribute.
