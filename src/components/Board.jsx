// Board.js
import React, { useState } from 'react';
import Status from './Status';
import { DragDropContext } from 'react-beautiful-dnd';

const Board = ({ data, addTask, removeTask, updateTask, moveTask, addStatus, removeStatus }) => {
  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      // Reordering tasks within the same status
      return;
    }

    const sourceStatusId = parseInt(source.droppableId);
    const destinationStatusId = parseInt(destination.droppableId);
    const taskId = parseInt(draggableId);

    moveTask(sourceStatusId, destinationStatusId, taskId, destination.index);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="board-container">
        <div className="board">
          {data.statuses.map((status) => (
            <Status
              key={status.id}
              status={status}
              addTask={addTask}
              removeTask={removeTask}
              updateTask={updateTask}
              removeStatus={removeStatus}
            />
          ))}
        </div>
        <div className="add-status-container">
          <button className="add-status-button" onClick={addStatus}>
            Add Status
          </button>
        </div>
      </div>
    </DragDropContext>
  );
};

export default Board;