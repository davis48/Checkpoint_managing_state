import React, { useState } from 'react';

// TaskItem component to display and manage a single task
function TaskItem({ task, updateTask, deleteTask, toggleTaskCompletion }) {
  // State to manage whether the task is being edited
  const [isEditing, setIsEditing] = useState(false);
  // State to manage the task name during editing
  const [taskName, setTaskName] = useState(task.name);
  // State to manage the task description during editing
  const [taskDescription, setTaskDescription] = useState(task.description);

  // Function to handle updating the task
  const handleUpdate = () => {
    updateTask({ ...task, name: taskName, description: taskDescription });
    setIsEditing(false);
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      {isEditing ? (
        <>
          <input 
            type="text" 
            value={taskName} 
            onChange={(e) => setTaskName(e.target.value)} 
          />
          <input 
            type="text" 
            value={taskDescription} 
            onChange={(e) => setTaskDescription(e.target.value)} 
          />
          <button onClick={handleUpdate}>Save</button>
        </>
      ) : (
        <>
          <h3>{task.name}</h3>
          <p>{task.description}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => deleteTask(task.id)}>Delete</button>
          <button onClick={() => toggleTaskCompletion(task.id)}>
            {task.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
          </button>
        </>
      )}
    </div>
  );
}

export default TaskItem;
