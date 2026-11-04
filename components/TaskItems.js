import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function TaskItem({ item, onDelete }) {
  return (
    <TouchableOpacity style={styles.item} onPress={() => onDelete(item.id)}>
      <Text style={styles.text}>{item.text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#eee',
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
});
