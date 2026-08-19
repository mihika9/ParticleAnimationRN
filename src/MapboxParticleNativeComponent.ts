import { requireNativeComponent, ViewProps } from 'react-native';

export interface NativeProps extends ViewProps {
  particleCount?: number;
  particleSpeed?: number;
  speedFactor?: number;
  fadeOpacity?: number;
  resetRate?: number;
}

const ComponentName = 'MapboxParticleView';

export default requireNativeComponent<NativeProps>(ComponentName);
