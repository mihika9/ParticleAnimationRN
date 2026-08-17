import React from 'react';
import { requireNativeComponent, ViewStyle, Platform, View } from 'react-native';

type MapboxParticleViewProps = {
  style?: ViewStyle;
  particleCount?: number;
  particleSpeed?: number;
  fadeOpacity?: number;
  resetRate?: number;
};

// Check platform to prevent crashes on Android since we only implemented iOS
const ComponentName = 'MapboxParticleView';
const NativeMapboxParticleView = Platform.OS === 'ios' ? requireNativeComponent<MapboxParticleViewProps>(ComponentName) : null;

export const MapboxParticleView: React.FC<MapboxParticleViewProps> = (props) => {
  if (!NativeMapboxParticleView) {
    return <View style={props.style} />; // Placeholder for non-iOS platforms
  }
  return <NativeMapboxParticleView {...props} />;
};
