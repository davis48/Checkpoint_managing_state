import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './App.css';

// Main App component
function App() {
  // State to manage the list of tasks
  const [tasks, setTasks] = useState([]);

  // Load tasks from localStorage when the component mounts
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  // Save tasks to localStorage whenever the tasks state changes
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Function to add a new task
  const addTask = (task) => {
    const newTask = {
      ...task,
      dueDate: task.dueDate // Assuming task object contains dueDate property
    };
    setTasks([...tasks, newTask]);
  };

  // Function to update an existing task
  const updateTask = (updatedTask) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
  };

  // Function to delete a task
  const deleteTask = (taskId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (confirmDelete) {
      setTasks(tasks.filter(task => task.id !== taskId));
    }
  };

  // Function to toggle the completion status of a task
  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, completed: !task.completed } : task));
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <TaskForm addTask={addTask} />
      <TaskList 
        tasks={tasks} 
        updateTask={updateTask} 
        deleteTask={deleteTask} 
        toggleTaskCompletion={toggleTaskCompletion} 
      />
    </div>
  );
}

export default App;
