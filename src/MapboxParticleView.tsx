import React from 'react';
import { ViewStyle, Platform, View, StyleSheet } from 'react-native';
import MapboxParticleNativeComponent from './MapboxParticleNativeComponent';

export interface MapboxParticleViewProps {
  style?: ViewStyle;
  /** Total number of particles rendered on the map GPU layer (default: 2048) */
  particleCount?: number;
  /** Particle speed factor multiplier (default: 0.4) */
  particleSpeed?: number;
  /** Alias for particleSpeed multiplier (default: 0.4) */
  speedFactor?: number;
  /** Particle trailing fade opacity factor between 0.0 and 1.0 (default: 0.9) */
  fadeOpacity?: number;
  /** Particle position reset rate factor between 0.0 and 1.0 (default: 0.4) */
  resetRate?: number;
}

export const MapboxParticleView: React.FC<MapboxParticleViewProps> = ({
  style,
  particleCount = 2048,
  particleSpeed = 0.4,
  speedFactor,
  fadeOpacity = 0.9,
  resetRate = 0.4,
  ...rest
}) => {
  const effectiveSpeed = speedFactor !== undefined ? speedFactor : particleSpeed;

  if (Platform.OS !== 'ios') {
    return <View style={[style, styles.fallback]} />;
  }

  return (
    <MapboxParticleNativeComponent
      style={style}
      particleCount={particleCount}
      particleSpeed={effectiveSpeed}
      speedFactor={effectiveSpeed}
      fadeOpacity={fadeOpacity}
      resetRate={resetRate}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  fallback: {
    backgroundColor: '#0f172a',
  },
});
