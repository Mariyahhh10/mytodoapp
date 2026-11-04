import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; // or from 'react-native'
import { registerRootComponent } from 'expo';
import NotesScreen from './components/NotesScreen';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NotesScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

registerRootComponent(App);