import Foundation
import UIKit
import SwiftUI
import React

@objc(MapboxParticleRNView)
class MapboxParticleRNView: UIView {
    var hostingController: UIHostingController<MapboxParticleView>?

    // React Native Props
    @objc var particleCount: NSNumber? {
        didSet {
            updateProps()
        }
    }
    @objc var particleSpeed: NSNumber? {
        didSet {
            updateProps()
        }
    }
    @objc var fadeOpacity: NSNumber? {
        didSet {
            updateProps()
        }
    }
    @objc var resetRate: NSNumber? {
        didSet {
            updateProps()
        }
    }

    // Bindings
    @State private var boundParticleCount: Double = 2048.0
    @State private var boundParticleSpeed: Double = 0.4
    @State private var boundFadeOpacity: Double = 0.9
    @State private var boundResetRate: Double = 0.4

    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupView()
    }

    private func setupView() {
        let particleView = MapboxParticleView(
            particleCount: $boundParticleCount,
            particleSpeed: $boundParticleSpeed,
            fadeOpacity: $boundFadeOpacity,
            resetRate: $boundResetRate
        )
        
        hostingController = UIHostingController(rootView: particleView)
        if let hc = hostingController {
            hc.view.translatesAutoresizingMaskIntoConstraints = false
            hc.view.backgroundColor = .clear
            addSubview(hc.view)
            
            NSLayoutConstraint.activate([
                hc.view.topAnchor.constraint(equalTo: self.topAnchor),
                hc.view.bottomAnchor.constraint(equalTo: self.bottomAnchor),
                hc.view.leadingAnchor.constraint(equalTo: self.leadingAnchor),
                hc.view.trailingAnchor.constraint(equalTo: self.trailingAnchor)
            ])
        }
    }

    private func updateProps() {
        if let count = particleCount?.doubleValue {
            boundParticleCount = count
        }
        if let speed = particleSpeed?.doubleValue {
            boundParticleSpeed = speed
        }
        if let fade = fadeOpacity?.doubleValue {
            boundFadeOpacity = fade
        }
        if let reset = resetRate?.doubleValue {
            boundResetRate = reset
        }
    }
}
