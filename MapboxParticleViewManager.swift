import Foundation
import React

@objc(MapboxParticleViewManager)
class MapboxParticleViewManager: RCTViewManager {
    
    override func view() -> UIView! {
        return MapboxParticleRNView()
    }
    
    override class func requiresMainQueueSetup() -> Bool {
        return true
    }
}
