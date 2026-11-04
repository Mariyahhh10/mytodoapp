import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';

export default function NotesScreen() {
  const [task, setTask] = useState('');
  const [taskList, setTaskList] = useState([]);

  const addTask = () => {
    if (task.trim().length === 0) {
      Alert.alert("Validation Error", "Task cannot be empty!");
      return;
    }
    setTaskList([...taskList, { id: Date.now().toString(), text: task, completed: false }]);
    setTask('');
  };

  const toggleTask = (id) => {
    setTaskList(taskList.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
  };

  const deleteTask = (id) => {
    setTaskList(taskList.filter((item) => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Todo List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task..."
          value={task}
          onChangeText={setTask}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.listContainer}>
        {taskList.map((item) => (
          <View key={item.id} style={styles.taskItem}>
            <TouchableOpacity onPress={() => toggleTask(item.id)} style={{ flex: 1 }}>
              <Text style={[styles.taskText, item.completed && styles.completedText]}>
                {item.text}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteTask(item.id)}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  inputContainer: { flexDirection: 'row', marginBottom: 20 },
  input: { flex: 1, backgroundColor: '#fff', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#ddd' },
  addButton: { backgroundColor: '#007AFF', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20, borderRadius: 8, marginLeft: 10 },
  addButtonText: { color: '#fff', fontWeight: 'bold' },
  listContainer: { flex: 1 },
  taskItem: { flexDirection: 'row', backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 10, justifyContent: 'space-between', alignItems: 'center' },
  taskText: { fontSize: 16 },
  completedText: { textDecorationLine: 'line-through', color: '#888' },
  deleteText: { color: '#ff3b30', fontWeight: 'bold' },
});