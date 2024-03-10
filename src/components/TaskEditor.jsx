// TaskEditor.jsx
import React from 'react';

const TaskEditor = ({
  taskName,
  setTaskName,
  taskDescription,
  setTaskDescription,
  handleAddTask,
  handleUpdateTask,
  handleCancel,
}) => {
  return (
    <div className="task-editor">
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Task Name"
      />
      <textarea
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
        placeholder="Task Description"
      />
      <div className="task-editor-actions">
        <button onClick={handleAddTask || handleUpdateTask}>
          {handleAddTask ? 'Add Task' : 'Update Task'}
        </button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default TaskEditor;