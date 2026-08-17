import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { MapboxParticleView } from './MapboxParticleView';

function App(): React.JSX.Element {
  const [particleCount, setParticleCount] = useState(2048);
  const [particleSpeed, setParticleSpeed] = useState(0.4);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <View style={styles.mapContainer}>
        <MapboxParticleView
          style={StyleSheet.absoluteFillObject}
          particleCount={particleCount}
          particleSpeed={particleSpeed}
          fadeOpacity={0.9}
          resetRate={0.4}
        />
      </View>
      <View style={styles.controls}>
        <Text style={styles.title}>Mapbox Particles PoC</Text>
        <Text>Particle Count: {particleCount}</Text>
        <Text>Speed Factor: {particleSpeed}</Text>
        <Text style={styles.infoText}>
          (In a real app, use @react-native-community/slider to adjust these values dynamically)
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mapContainer: {
    flex: 1,
    width: '100%',
  },
  controls: {
    padding: 20,
    backgroundColor: '#f8f8f8',
    borderTopWidth: 1,
    borderColor: '#e0e0e0',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoText: {
    marginTop: 10,
    color: '#666',
    fontSize: 12,
  }
});

export default App;
