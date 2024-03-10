// Task.jsx
import React, { useState } from 'react';
import TaskEditor from './TaskEditor';
import { Draggable } from 'react-beautiful-dnd';

const Task = ({
  task,
  index,
  statusId,
  removeTask,
  updateTask,
  showTaskDescription,
  handleShowTaskDescription,
  handleHideTaskDescription,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [taskName, setTaskName] = useState(task.name);
  const [taskDescription, setTaskDescription] = useState(task.description);

  const handleUpdateTask = () => {
    if (taskName.trim() === '') {
      return;
    }
    updateTask(statusId, task.id, taskName, taskDescription);
    setIsEditing(false);
  };

  return (
    <Draggable draggableId={`${task.id}`} index={index}>
      {(provided) => (
        <div
          className="task"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={handleShowTaskDescription}
        >
          {isEditing ? (
            <TaskEditor
              taskName={taskName}
              setTaskName={setTaskName}
              taskDescription={taskDescription}
              setTaskDescription={setTaskDescription}
              handleUpdateTask={handleUpdateTask}
              handleCancel={() => setIsEditing(false)}
            />
          ) : (
            <div>
              <h4>{task.name}</h4>
              {showTaskDescription && <p>{task.description}</p>}
              <div className="task-actions">
                <button onClick={() => setIsEditing(true)}>Edit</button>
                <button onClick={() => removeTask(statusId, task.id)}>Remove</button>
              </div>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default Task;