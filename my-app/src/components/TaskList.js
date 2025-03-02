import React, { useState, useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './TaskList.css'; // Import the CSS file for animations

// TaskList component to display and manage tasks
const TaskList = ({ tasks, updateTask, deleteTask, toggleTaskCompletion }) => {
  // State to manage the currently editing task ID
  const [editingTaskId, setEditingTaskId] = useState(null);
  // State to manage the details of the task being edited
  const [taskDetails, setTaskDetails] = useState({ name: '', description: '', dueDate: '', dueTime: '' });
  // State to manage the current filter for tasks
  const [filter, setFilter] = useState('all');
  // State to manage the sort order of tasks
  const [sortOrder, setSortOrder] = useState('asc');
  // State to manage the date filter for tasks
  const [dateFilter, setDateFilter] = useState('');
  // State to manage the search term for tasks
  const [searchTerm, setSearchTerm] = useState('');

  // Ref to manage node references for CSSTransition
  const nodeRefs = useRef({});

  // Function to handle the edit button click
  const handleEditClick = (task) => {
    setEditingTaskId(task.id);
    setTaskDetails({ name: task.name, description: task.description, dueDate: task.dueDate, dueTime: task.dueTime });
  };

  // Function to handle input changes in the edit form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskDetails({ ...taskDetails, [name]: value });
  };

  // Function to handle updating a task
  const handleUpdateTask = () => {
    updateTask({ id: editingTaskId, ...taskDetails });
    setEditingTaskId(null);
  };

  // Filter tasks based on the current filter, date filter, and search term
  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'active') return !task.completed;
    if (dateFilter && task.dueDate !== dateFilter) return false;
    if (searchTerm && !task.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  // Sort tasks based on the current sort order
  const sortedTasks = filteredTasks.sort((a, b) => {
    if (sortOrder === 'asc') return a.name.localeCompare(b.name);
    return b.name.localeCompare(a.name);
  });

  return (
    <div className="task-list-container">
      <div className="task-controls">
        <label>
          Search:
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search tasks..."
          />
        </label>
        <label>
          Filter:
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="active">Active</option>
          </select>
        </label>
        <label>
          Sort:
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
        <label>
          Due Date:
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />
        </label>
      </div>
      <TransitionGroup className="task-list">
        {sortedTasks.map(task => {
          if (!nodeRefs.current[task.id]) {
            nodeRefs.current[task.id] = React.createRef();
          }
          return (
            <CSSTransition key={task.id} nodeRef={nodeRefs.current[task.id]} timeout={500} classNames="task">
              <div ref={nodeRefs.current[task.id]} className={`task-card ${task.completed ? 'completed' : 'active'}`}>
                {editingTaskId === task.id ? (
                  <div className="task-edit-form">
                    <input
                      type="text"
                      name="name"
                      value={taskDetails.name}
                      onChange={handleInputChange}
                    />
                    <input
                      type="text"
                      name="description"
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
                    <button onClick={handleUpdateTask}>Save</button>
                    <button onClick={() => setEditingTaskId(null)}>Cancel</button>
                  </div>
                ) : (
                  <div className="task-view">
                    <span onClick={() => toggleTaskCompletion(task.id)}>
                      {task.completed ? <s>{task.name}</s> : task.name}
                    </span>
                    <span className="task-description">{task.description}</span>
                    <span>{task.dueDate} {task.dueTime}</span>
                    <button onClick={() => handleEditClick(task)}>Edit</button>
                    <button onClick={() => deleteTask(task.id)}>Delete</button>
                    <button onClick={() => toggleTaskCompletion(task.id)}>
                      {task.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
                    </button>
                  </div>
                )}
              </div>
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    </div>
  );
};

export default TaskList;
