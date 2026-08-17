#import <React/RCTViewManager.h>

@interface RCT_EXTERN_MODULE(MapboxParticleViewManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(particleCount, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(particleSpeed, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(fadeOpacity, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(resetRate, NSNumber)

@end
