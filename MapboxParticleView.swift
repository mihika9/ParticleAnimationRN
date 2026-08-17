import SwiftUI
@_spi(Experimental) import MapboxMaps

struct MapboxParticleView: View {
    @Binding var particleCount: Double
    @Binding var particleSpeed: Double
    @Binding var fadeOpacity: Double
    @Binding var resetRate: Double
    
    // We define a speed-based color gradient as shown in the Mapbox examples
    let speedGradient = Exp(
        parameters: [
            "interpolate",
            ["linear"],
            ["raster-particle-speed"],
            0.0, ["rgba", 255, 255, 255, 0.0],
            2.0, ["rgba", 200, 200, 255, 0.5],
            5.0, ["rgba", 100, 100, 255, 0.8],
            10.0, ["rgba", 255, 0, 0, 1.0]
        ]
    )

    var body: some View {
        Map {
            RasterArraySource(id: "wind-source")
                .url("mapbox://mapbox.gfs-winds")

            RasterParticleLayer(id: "particles", source: "wind-source")
                .sourceLayer("10winds")
                .rasterParticleCount(particleCount)
                .rasterParticleSpeedFactor(particleSpeed)
                .rasterParticleFadeOpacityFactor(fadeOpacity)
                .rasterParticleResetRateFactor(resetRate)
                .rasterParticleColor(Value.expression(speedGradient))
        }
        .mapStyle(.standard) // Using standard map style
    }
}
