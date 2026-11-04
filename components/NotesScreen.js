import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function NotesScreen() {
  const [task, setTask] = useState('');
  const [taskList, setTaskList] = useState([]);

  useEffect(() => { loadTasks(); }, []);

  const saveTasks = async (newTasks) => {
    try { await AsyncStorage.setItem('@tasks', JSON.stringify(newTasks)); } catch (e) { console.error(e); }
  };

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('@tasks');
      if (storedTasks !== null) setTaskList(JSON.parse(storedTasks));
    } catch (e) { console.error(e); }
  };

  const addTask = () => {
    if (task.trim().length === 0) {
      Alert.alert("Validation Error", "Task cannot be empty!");
      return;
    }
    const updated = [...taskList, { id: Date.now().toString(), text: task, completed: false }];
    setTaskList(updated);
    saveTasks(updated);
    setTask('');
  };

  const toggleTask = (id) => {
    const updated = taskList.map(item => item.id === id ? { ...item, completed: !item.completed } : item);
    setTaskList(updated);
    saveTasks(updated);
  };

  const confirmDelete = (id) => {
    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => {
          const updated = taskList.filter(item => item.id !== id);
          setTaskList(updated);
          saveTasks(updated);
        }
      }
    ]);
  };

  const activeCount = taskList.filter(item => !item.completed).length;

  const renderItem = ({ item }) => (
    <View style={styles.taskItem}>
      <TouchableOpacity onPress={() => toggleTask(item.id)} style={{ flex: 1 }}>
        <Text style={[styles.taskText, item.completed && styles.completedText]}>
          {item.text}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => confirmDelete(item.id)}>
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <Text style={styles.title}>My Todo List</Text>
      <Text style={styles.counterText}>Remaining Tasks: {activeCount}</Text>
      
      <FlatList
        data={taskList}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={<Text style={styles.emptyText}>No tasks yet. Add one above!</Text>}
        style={styles.listContainer}
      />

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
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center' },
  counterText: { textAlign: 'center', color: '#666', marginBottom: 15, fontSize: 14 },
  inputContainer: { flexDirection: 'row', marginTop: 10 },
  input: { flex: 1, backgroundColor: '#fff', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#ddd' },
  addButton: { backgroundColor: '#007AFF', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20, borderRadius: 8, marginLeft: 10 },
  addButtonText: { color: '#fff', fontWeight: 'bold' },
  listContainer: { flex: 1 },
  emptyText: { textAlign: 'center', color: '#888', marginTop: 40, fontSize: 16 },
  taskItem: { flexDirection: 'row', backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 10, justifyContent: 'space-between', alignItems: 'center' },
  taskText: { fontSize: 16 },
  completedText: { textDecorationLine: 'line-through', color: '#888' },
  deleteText: { color: '#ff3b30', fontWeight: 'bold' },
});