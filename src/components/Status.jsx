// Status.jsx
import React, { useState } from 'react';
import Task from './Task';
import TaskEditor from './TaskEditor';
import { Droppable } from 'react-beautiful-dnd';

const Status = ({ status, addTask, removeTask, updateTask, removeStatus }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [showTaskDescription, setShowTaskDescription] = useState(null);

  const handleAddTask = () => {
    if (taskName.trim() === '') {
      return;
    }
    addTask(status.id, taskName, taskDescription);
    setTaskName('');
    setTaskDescription('');
    setIsEditing(false);
  };

  const handleEditTask = (taskId, newName, newDescription) => {
    updateTask(status.id, taskId, newName, newDescription);
    setIsEditing(false);
  };

  const handleShowTaskDescription = (taskId) => {
    setShowTaskDescription(taskId);
  };

  const handleHideTaskDescription = () => {
    setShowTaskDescription(null);
  };

  const getStatusColor = () => {
    const colors = ['#F5B041', '#D35400', '#2E8B57'];
    return colors[status.id - 1];
  };

  return (
    <div className="status">
      <div className="status-header">
        <div className="status-title-container" style={{ backgroundColor: getStatusColor() }}>
          <h3 className="status-name">{status.title}</h3>
        </div>
        <span className="task-count">{status.tasks.length}</span>
        <button className="remove-status-button" onClick={() => removeStatus(status.id)}>
          Remove
        </button>
      </div>
      <Droppable droppableId={`${status.id}`}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {status.tasks.map((task, index) => (
              <Task
                key={task.id}
                task={task}
                index={index}
                statusId={status.id}
                removeTask={removeTask}
                updateTask={updateTask}
                showTaskDescription={showTaskDescription === task.id}
                handleShowTaskDescription={() => handleShowTaskDescription(task.id)}
                handleHideTaskDescription={handleHideTaskDescription}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      {isEditing ? (
        <TaskEditor
          taskName={taskName}
          setTaskName={setTaskName}
          taskDescription={taskDescription}
          setTaskDescription={setTaskDescription}
          handleAddTask={handleAddTask}
          handleCancel={() => setIsEditing(false)}
        />
      ) : (
        <button className="add-task-button" onClick={() => setIsEditing(true)}>
          + Add Task
        </button>
      )}
    </div>
  );
};

export default Status;