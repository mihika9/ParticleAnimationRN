# Android Mapbox Particle Implementation

## Current Status
Android support is currently **not included** in this initial phase of `particle-animation-rn`. The current implementation prioritizes iOS Mapbox v11 `RasterParticleLayer` rendering via SwiftUI and Fabric bindings.

## Platform Separation & Future Android Roadmap
When Android support is added, it will live inside this directory (`android/`).

### Proposed Architecture for Android:
1. **Mapbox Android Maps SDK v11 Dependency**:
   Include `com.mapbox.maps:android:11.x.x` in `android/build.gradle`.
2. **Android ViewManager**:
   Create `MapboxParticleViewManager.kt` extending `SimpleViewManager<MapboxParticleView>` or `ViewGroupManager<MapView>`.
3. **Mapbox Raster Particle Layer Setup**:
   ```kotlin
   val mapboxMap = mapView.mapboxMap
   mapboxMap.loadStyle(Style.STANDARD) { style ->
       val source = rasterArraySource("wind-source") {
           url("mapbox://mapbox.gfs-winds")
       }
       style.addSource(source)

       val layer = rasterParticleLayer("particles", "wind-source") {
           sourceLayer("10winds")
           rasterParticleCount(particleCount)
           rasterParticleSpeedFactor(particleSpeed)
           rasterParticleFadeOpacityFactor(fadeOpacity)
           rasterParticleResetRateFactor(resetRate)
       }
       style.addLayer(layer)
   }
   ```
4. **React Native Package Export**:
   Expose `MapboxParticlePackage` implementing `ReactPackage` and register `MapboxParticleViewManager`.

For now, when running on Android, the React Native component gracefully renders a fallback container view without throwing runtime crashes.
