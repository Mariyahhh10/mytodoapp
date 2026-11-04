import React from 'react';
import { StyleSheet, View } from 'react-native';
import { registerRootComponent } from 'expo';
import NotesScreen from './components/NotesScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <NotesScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

// This line registers your main component for Expo
registerRootComponent(App);