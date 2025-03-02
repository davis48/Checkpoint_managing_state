import React, { useState } from 'react';

// TaskForm component to add new tasks
const TaskForm = ({ addTask }) => {
  // State to manage the details of the new task
  const [taskDetails, setTaskDetails] = useState({ name: '', description: '', dueDate: '', dueTime: '' });

  // Function to handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskDetails({ ...taskDetails, [name]: value });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskDetails.name.trim()) {
      addTask(taskDetails);
      setTaskDetails({ name: '', description: '', dueDate: '', dueTime: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Task Name"
        value={taskDetails.name}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="description"
        placeholder="Task Description"
        value={taskDetails.description}
        onChange={handleInputChange}
      />
      <input
        type="date"
        name="dueDate"
        value={taskDetails.dueDate}
        onChange={handleInputChange}
      />
      <input
        type="time"
        name="dueTime"
        value={taskDetails.dueTime}
        onChange={handleInputChange}
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
